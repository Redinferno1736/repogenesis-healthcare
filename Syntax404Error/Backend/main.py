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

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
JWT_SECRET = os.getenv("SECRET_KEY", "dev_jwt_secret")
JWT_EXP_SECONDS = int(os.getenv("JWT_EXP_SECONDS", 86400))
FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")

if not MONGODB_URI :
    raise RuntimeError("Please set MONGODB_URI in your .env")

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": [FRONTEND_ORIGIN]}})
app.secret_key = JWT_SECRET

client = MongoClient(MONGODB_URI, tls=True, tlsAllowInvalidCertificates=False)
db = client['userinfo']
users_col = db['users']

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

def upsert_oauth_user(email: str, name: str = None, provider: str = "google", extra: dict = None) -> dict:
    query = {"email": email}
    update = {
        "$set": {
            "username": name,
            "email": email,
            "name": name,
        },
    }
    users_col.update_one(query, update, upsert=True)
    user = users_col.find_one(query)
    if user:
        user["user_id"] = user.get("username")
        user.pop("_id", None)
    return user

def create_jwt_for_user(user_doc: dict) -> str:
    payload = {
        "sub": str(user_doc.get("user_id", user_doc.get("username"))),
        "email": user_doc.get("email"),
        "name": user_doc.get("name"),
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")
    if isinstance(token, bytes):
        token = token.decode("utf-8")
    return token

@app.route("/auth/google", methods=["GET"])
def auth_google():
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
    user = upsert_oauth_user(email=email, name=name, provider="google")
    jwt_token = create_jwt_for_user(user)
    redirect_url = FRONTEND_ORIGIN.rstrip("/") + "/invest?token=" + urllib_parse.quote(jwt_token)
    return redirect(redirect_url)