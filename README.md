# 🍲 Food Classification Project

## 📁 Project Overview

Food_Classification/
├── 📂 backend/ # Flask API server for food classification
│ ├── 📄 app.py # Main backend application
│ ├── 📄 requirements.txt # Backend dependencies
│ ├── 📄 Dockerfile # Docker configuration
│ ├── 📄 test_image.jpg # Sample test image
│ ├── 📄 .gitignore # Ignore files for backend
│
├── 📂 frontend/ # React frontend application
│ ├── 📂 public/ # Public static files
│ │ ├── 📄 index.html
│ │ ├── 📄 favicon.ico
│ │ ├── 📄 logo192.png
│ │ ├── 📄 logo512.png
│ │ ├── 📄 manifest.json
│ │ ├── 📄 robots.txt
│ │ ├── 📄 style.css # Extra CSS
│ │ └── 📄 script.js # Custom JS
│ │
│ ├── 📂 src/ # React source code
│ │ ├── 📄 App.js # Main React component
│ │ ├── 📄 App.css # Component-specific CSS
│ │ ├── 📄 index.js # React entry point
│ │ ├── 📄 index.css # Global styles
│ │ ├── 📄 logo.svg
│ │ └── 📄 reportWebVitals.js # Performance reporting
│ │
│ ├── 📄 package.json # Frontend dependencies
│ ├── 📄 package-lock.json # Lock file
│ ├── 📄 .env # Environment variables
│ ├── 📄 .gitignore
│ └── 📄 README.md # Frontend documentation
│
├── 📄 .gitattributes
├── 📄 README.md # Main project documentation

css
Copy
Edit

---

## 🔄 Application Flow

### System Architecture

```mermaid
graph TB
    subgraph "Frontend (React)"
        A[User Interface] --> B[React Components]
        B --> C[API Calls]
    end
    
    subgraph "Backend (Flask)"
        D[app.py] --> E[Model Prediction]
        E --> F[Return JSON Response]
    end
    
    subgraph "External"
        G[Pre-trained Food Model]
    end
    
    C --> D
    E --> G
    
    style A fill:#e1f5fe
    style D fill:#f3e5f5
    style G fill:#fff3e0
🏗️ Component Structure
Frontend (React)
yaml
Copy
Edit
Frontend Structure:
├── App.js              # Main App component
├── index.js            # React entry point
├── App.css             # App styling
├── index.css           # Global styles
├── reportWebVitals.js  # Performance logs
└── Assets (logo.svg, icons)
Backend (Flask)
yaml
Copy
Edit
Backend Structure:
├── app.py              # Flask app entry point
├── requirements.txt    # Dependencies (Flask, TensorFlow, etc.)
├── Dockerfile          # Containerization setup
└── test_image.jpg      # Test image for inference
🚀 Data Flow
Prediction Flow
mermaid
Copy
Edit
sequenceDiagram
    participant U as User
    participant F as Frontend (React)
    participant B as Backend (Flask)
    participant M as Food Classification Model
    
    U->>F: Upload food image
    F->>B: POST /predict (image file)
    B->>M: Run inference on image
    M-->>B: Predicted food class + confidence
    B-->>F: JSON response
    F-->>U: Display classification results
🛠️ Technology Stack
Frontend
Framework: React.js

Styling: CSS

Build Tool: CRA (Create React App)

Backend
Runtime: Python 3

Framework: Flask

ML/DL: TensorFlow / Keras

Containerization: Docker support

API: REST (JSON responses)

📋 Key Features
🍽️ Food image classification using deep learning

🌐 Web interface (React) for uploading and viewing results

⚡ Real-time predictions via Flask API

🐳 Dockerized backend for portability

🔑 Environment variable support

🚦 Getting Started
Prerequisites
Node.js (v14+)

Python (3.8+)

pip

Docker (optional)

Installation & Setup
Clone the repository

bash
Copy
Edit
git clone <repository-url>
cd Food_Classification
Backend Setup

bash
Copy
Edit
cd backend
pip install -r requirements.txt
python app.py
Frontend Setup

bash
Copy
Edit
cd frontend
npm install
npm start
Access Application

Frontend: http://localhost:3000

Backend API: http://localhost:5000

🤝 Contributing
Fork the repository

Create a feature branch

Commit your changes

Push to your branch

Open a Pull Request
