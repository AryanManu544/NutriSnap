# 🍲 NutriSnap

NutriSnap is a full-stack web application for classifying food images using deep learning.  
The frontend is built with **React**, the backend uses **Flask** + **TensorFlow**, and the project is **containerized with Docker**.

---

## 📁 Project Structure

```bash
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
```

🚀 Features
Upload food images and get real-time classification.
Uses Xception-based CNN model for accurate predictions.
Responsive React frontend with modern UI.
Dockerized for easy deployment.

🛠️ Tech Stack
Frontend: React, HTML, CSS, JavaScript
Backend: Flask, Python, TensorFlow, Pillow
Database: Optional (can integrate if needed)
Containerization: Docker

📦 Usage
Open the frontend(https://nutrisnap-zeta.vercel.app) in your browser .
Upload an image of food.
Get instant classification results.
