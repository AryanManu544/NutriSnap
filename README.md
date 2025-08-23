🍲 NutriSnap

A full-stack web application for classifying food images using deep learning.
Frontend built with React, backend powered by Flask + TensorFlow, and containerized with Docker.

📂 Project Structure
Food_Classification/
├── backend/                  # Flask API server
│   ├── app.py                # Main backend application
│   ├── requirements.txt      # Backend dependencies
│   ├── Dockerfile            # Docker configuration
│   ├── test_image.jpg        # Sample test image
│   └── .gitignore
│
├── frontend/                 # React frontend application
│   ├── public/               # Static assets
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   ├── robots.txt
│   │   ├── style.css
│   │   └── script.js
│   │
│   ├── src/                  # React source code
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   ├── index.css
│   │   ├── logo.svg
│   │   └── reportWebVitals.js
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── .env
│   └── .gitignore
│
├── .gitattributes
└── README.md                 # Main documentation


⚙️ Technology Stack

Frontend

React.js

CSS / Custom styling

Create React App (CRA)

Backend

Python 3 + Flask

TensorFlow / Keras

REST API (JSON)

Docker support

✨ Key Features

🍽️ Classify food images using a deep learning model

🌐 User-friendly web interface for uploads

⚡ Real-time predictions via Flask API

🐳 Dockerized backend for easy deployment

🔑 Environment variable support

🚀 Getting Started
Prerequisites

Node.js (v14+)

Python (3.8+)

pip

Docker (optional)

Installation

1️⃣ Clone the repository

git clone <repository-url>
cd Food_Classification


2️⃣ Backend Setup

cd backend
pip install -r requirements.txt
python app.py


3️⃣ Frontend Setup

cd frontend
npm install
npm start


4️⃣ Access Application

Frontend → http://localhost:3000

Backend API → http://localhost:5000

🤝 Contributing

Fork the repository

Create a feature branch

Commit your changes

Push to your branch

Open a Pull Request
