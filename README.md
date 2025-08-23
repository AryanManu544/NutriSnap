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
## 🚀 Features

* 📸 **Real-Time Food Classification:** Upload food images and get instant identification.
* 🧠 **Accurate Predictions:** Powered by an Xception-based Convolutional Neural Network (CNN) model.
* 💻 **Modern UI:** A clean, responsive, and user-friendly interface built with React.
* 🐳 **Easy Deployment:** Fully containerized with Docker for simple and consistent setup.

---

## 🛠️ Tech Stack

* **Frontend:**
    * React
    * HTML/CSS
    * JavaScript
* **Backend:**
    * Flask (Python)
    * TensorFlow
    * Pillow
* **Database:**
    * Flexible (can be integrated as needed)
* **Containerization:**
    * Docker

---

## 📦 Usage
1.  Navigate to the [**NutriSnap web app**](https://nutrisnap-zeta.vercel.app).
2.  Click the upload area and select an image of a food item from your device.
3.  View the instant classification result provided by the model.
