import os
import requests
import json
from flask import Flask, jsonify, request, redirect, url_for, session
from flask_cors import CORS
from pymongo import MongoClient, ASCENDING
from dotenv import load_dotenv
import jwt
from authlib.integrations.flask_client import OAuth
from concurrent.futures import ThreadPoolExecutor
from urllib import parse as urllib_parse
import joblib
import numpy as np

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
JWT_SECRET = os.getenv("SECRET_KEY", "dev_jwt_secret")
JWT_EXP_SECONDS = int(os.getenv("JWT_EXP_SECONDS", 86400))
FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")
PORT = os.getenv("PORT", 5000)

if not MONGODB_URI:
    raise RuntimeError("Please set MONGODB_URI in your .env")

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": [FRONTEND_ORIGIN]}})
app.secret_key = JWT_SECRET

client = MongoClient(MONGODB_URI, tls=True, tlsAllowInvalidCertificates=False)
db = client['healthcare_app']
patients_col = db['patients']
hospitals_col = db['hospitals']

oauth = OAuth(app)
google = oauth.register(
    name="google",
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"},
)

try:
    app.logger.info("Loaded Google server_metadata keys: %s", list(google.server_metadata.keys()))
    app.logger.info("Google userinfo_endpoint: %s", google.server_metadata.get("userinfo_endpoint"))
except Exception:
    app.logger.exception("Unable to read google.server_metadata (discovery may have failed)")

# Helper Functions

def upsert_user(email: str, name: str = None, provider: str = "google", role: str = "patient", extra: dict = None) -> dict:
    user_col = patients_col if role == "patient" else hospitals_col
    query = {"email": email}
    update = {
        "$set": {
            "username": name,
            "email": email,
            "name": name,
            "role": role
        }
    }
    user_col.update_one(query, update, upsert=True)
    user = user_col.find_one(query)
    if user:
        user["user_id"] = user.get("username")
        user.pop("_id", None)
    return user

def create_jwt_for_user(user_doc: dict) -> str:
    payload = {
        "sub": str(user_doc.get("user_id", user_doc.get("username"))),
        "email": user_doc.get("email"),
        "name": user_doc.get("name"),
        "role": user_doc.get("role")
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")
    if isinstance(token, bytes):
        token = token.decode("utf-8")
    return token

@app.route("/auth/google", methods=["GET"])
def auth_google():
    role = request.args.get("role", "patient")  # Default role if not specified
    session["login_role"] = role
    redirect_uri = url_for("auth_google_callback", _external=True)
    app.logger.info("auth_google redirect_uri: %s", redirect_uri)
    return google.authorize_redirect(redirect_uri)

@app.route("/auth/google/callback", methods=["GET"])
def auth_google_callback():
    token = google.authorize_access_token()
    userinfo = google.get("https://www.googleapis.com/oauth2/v2/userinfo").json()
    email = userinfo.get("email")
    name = userinfo.get("name") or userinfo.get("given_name") or (email.split("@")[0] if email else None)
    if not email:
        return jsonify({"error": "No email returned"}), 400
    role = session.get("login_role", "patient")
    user = upsert_user(email=email, name=name, provider="google", role=role)
    jwt_token = create_jwt_for_user(user)
    if role == "doctor":
        redirect_url = FRONTEND_ORIGIN.rstrip("/") + "/doc-dashboard?token=" + urllib_parse.quote(jwt_token)
    else:
        redirect_url = FRONTEND_ORIGIN.rstrip("/") + "/patient-onboarding?token=" + urllib_parse.quote(jwt_token)
    return redirect(redirect_url)

# API
@app.route('/api/predict-risk', methods=['POST'])
def predict_risk():
    # Load the model (dict or model object)
    obj = joblib.load("model3_final.pkl")
    if isinstance(obj, dict) and "model" in obj:
        model = obj["model"]
    else:
        model = obj
    data = request.json

    # Example mappings; adapt to your actual pipeline!
    gender_map = {'Male': 0, 'Female': 1, 'Other': 2}
    race_map = {'Asian': 0, 'White': 1, 'Black': 2, 'Other': 3}
    surgery_name_map = {'CABG': 0, 'Angioplasty': 1, 'Other': 2}
    surgery_code_map = {'I20.0': 0, 'I25.1': 1, 'Other': 2}

    # Ensure all expected features are taken from data and mapped
    input_features = [
        data.get('AGE', 0),
        gender_map.get(data.get('GENDER', 'Other'), 2),
        race_map.get(data.get('RACE', 'Other'), 3),
        surgery_name_map.get(data.get('SURGERY_NAME', 'Other'), 2),
        surgery_code_map.get(data.get('SURGERY_CODE', 'Other'), 2)
    ]

    # Call model predict and convert to native python type for JSON
    risk_prob = model.predict_proba([input_features])[0][1]  # Probability of class 1
    risk_label_py = float(f"{risk_prob:.4f}")  # Ensure JSON serialization
    print(f"Returning risk_label: {risk_label_py}")
    return jsonify({'risk_label': risk_label_py,
                    'name':"pranav"})

if __name__ == "__main__":
    print(f"Starting Flask app on port {PORT}")
    app.run(host="0.0.0.0", port=int(PORT), debug=True)
