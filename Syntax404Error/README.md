# MedSphere - Smart Healthcare Platform

MedSphere is a HIPAA-compliant web application that simplifies and enhances patient care through AI-powered risk prediction, secure medical record management, and seamless doctor-patient interaction.

## Features

- **Smart Health Tracking:** Automatically track symptoms, medical history, and upload reports for assessment.
- **Secure Medical Records:** Store and manage patient data safely with encryption and cloud processing.
- **Verified Doctors:** Access certified and trusted medical professionals for consultations.
- **AI-Based Risk Prediction:** Predict health risks intelligently from patient data using machine learning models.
- **Appointment \& Consultation Management:** Schedule, connect, and consult with doctors through an online dashboard.
- **Multi-step Patient Onboarding:** Guided steps for patients to enter history, upload reports, and describe symptoms.
- **Role-Based Authentication:** Google OAuth for secure login as patient or doctor.
- **Dynamic Patient Prioritization:** Dashboard prioritizes patients based on symptom severity and AI risk scores.
- **Responsive UI:** Built with Next.js and Tailwind CSS for seamless web experience on desktop and mobile.
- **Backend:** Flask API handling authentication, data storage in MongoDB, and AI inference.


## Getting Started

### Prerequisites

- Node.js (16+)
- Python (3.8+)
- MongoDB instance or URI
- `.env` file with necessary environment variables for backend and OAuth


### Installation

1. Clone the repository and navigate to the `syntax404error` folder:

```bash
git clone <repository-url>
cd syntax404error
```

2. Backend Setup:
    - Navigate to `Backend` folder.
    - Create and activate a virtual environment.
    - Install dependencies:

```bash
pip install -r requirements.txt
```

    - Create `.env` file with variables:

```
MONGODB_URI=your_mongodb_uri
SECRET_KEY=your_jwt_secret
JWT_EXP_SECONDS=86400
FRONTEND_ORIGIN=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
PORT=5000
```

    - Start the Flask backend API:

```bash
flask run
```

3. Frontend Setup:
    - Navigate to `frontend` folder.
    - Install dependencies:

```bash
npm install
```

    - Run the frontend development server:

```bash
npm run dev
```

4. Access the app via [http://localhost:3000](http://localhost:3000).

## Usage Overview

- Patients can sign up/login with Google, onboard their medical info, upload reports, describe symptoms, and view AI risk predictions.
- Doctors sign up/login to access patient queues prioritized by severity, view patient history, and start consultations.
- Real-time AI models predict risk scores for cardiovascular or other health conditions based on collected data.
- The app UI includes navigation to Features, How It Works, Contact pages, login/signup for patients and doctors, and a report page displaying prediction results.


## Project Structure

- `/syntax404error/Backend/`: Flask backend API with JWT auth, Google OAuth, MongoDB integration, and risk prediction ML model.
- `/syntax404error/frontend/`: Next.js React frontend with Tailwind CSS, pages for onboarding, login/signup, dashboards, reporting, and common UI components.
- `/syntax404error/frontend/app/`: React components and pages including Navbar, Footer, Features, HowItWorks, Contact, Patient onboarding, Doctor dashboard, and patient queue.
- `/syntax404error/Backend/model1.ipynb`: Jupyter notebook for training and fine-tuning entity recognition models.
- `/syntax404error/Backend/model3_final.pkl`: Pre-trained ML model for risk prediction.


## Technologies Used

- Frontend: Next.js, React, Tailwind CSS, Framer Motion
- Backend: Flask, PyMongo (MongoDB), JWT, Authlib (OAuth)
- Machine Learning: scikit-learn, joblib, Transformers (BioBERT, GLiNER)
- Database: MongoDB
- Authentication: Google OAuth
- Charting: Chart.js


## Contributing

Contributions are welcome. Please fork the repo, create a feature branch, and submit a pull request.