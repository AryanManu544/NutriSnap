import os
import cv2
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import h5py 

from tensorflow.keras import layers, models
from tensorflow.keras.applications import Xception

app = Flask(__name__)
CORS(app, origins=[
    "https://nutrisnap-frontend.vercel.app", 
    "http://localhost:3000"    
])

IMG_HEIGHT = 224
IMG_WIDTH = 224
NUM_CLASSES = 15

FOOD_CLASSES = ['biryani', 'chole-bhature', 'chole_bhature', 'dabeli', 'dal', 'dhokla', 'dosa', 'jalebi', 'kofta', 'naan', 'paneer-tikka', 'pani-puri', 'pav-bhaji', 'vada_pav', 'vadapav']

def create_xception_model(num_classes):
    """Recreates the exact model structure from your training notebook."""
    base_model = Xception(
        weights='imagenet',
        include_top=False,
        input_shape=(IMG_HEIGHT, IMG_WIDTH, 3)
    )
    base_model.trainable = True
    for layer in base_model.layers[:-20]:
        layer.trainable = False
        
    model = models.Sequential([
        base_model,
        layers.GlobalAveragePooling2D(),
        layers.BatchNormalization(),
        layers.Dropout(0.3),
        layers.Dense(512, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.5),
        layers.Dense(256, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.3),
        layers.Dense(num_classes, activation='softmax')
    ])
    return model

MODEL_WEIGHTS_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "xception_final.h5")

print("--- Building model structure... ---")
model = create_xception_model(num_classes=NUM_CLASSES)

print(f"--- Loading weights from {MODEL_WEIGHTS_PATH} ... ---")
model.load_weights(MODEL_WEIGHTS_PATH)

print("✅ Model and weights loaded successfully")
print("🔹 Model input shape:", model.input_shape)
print("🔹 Model output shape:", model.output_shape)

def preprocess_image(image_array):
    if image_array.shape[-1] != 3:
        raise ValueError(f"Image must have 3 channels, got {image_array.shape[-1]}")
    image_resized = cv2.resize(image_array, (IMG_WIDTH, IMG_HEIGHT))
    image_expanded = np.expand_dims(image_resized, axis=0)
    return tf.keras.applications.xception.preprocess_input(image_expanded.copy())

def predict_food_with_nutrition(image_array, top_k=3):
    nutrition_db = {
        'biryani': {'calories': 290, 'protein': 'medium', 'carbs': 'high', 'fat': 'medium', 'fiber': 'low'},
        'chole-bhature': {'calories': 400, 'protein': 'medium', 'carbs': 'high', 'fat': 'high', 'fiber': 'low'},
        'dabeli': {'calories': 250, 'protein': 'low', 'carbs': 'high', 'fat': 'medium', 'fiber': 'low'},
        'dal': {'calories': 150, 'protein': 'medium', 'carbs': 'medium', 'fat': 'low', 'fiber': 'high'},
        'dhokla': {'calories': 160, 'protein': 'low', 'carbs': 'high', 'fat': 'low', 'fiber': 'medium'},
        'dosa': {'calories': 168, 'protein': 'medium', 'carbs': 'high', 'fat': 'low', 'fiber': 'medium'},
        'jalebi': {'calories': 150, 'protein': 'low', 'carbs': 'high', 'fat': 'high', 'fiber': 'low'},
        'kofta': {'calories': 300, 'protein': 'high', 'carbs': 'medium', 'fat': 'high', 'fiber': 'low'},
        'naan': {'calories': 262, 'protein': 'medium', 'carbs': 'high', 'fat': 'medium', 'fiber': 'low'},
        'paneer-tikka': {'calories': 250, 'protein': 'high', 'carbs': 'low', 'fat': 'high', 'fiber': 'low'},
        'pani-puri': {'calories': 30, 'protein': 'low', 'carbs': 'medium', 'fat': 'low', 'fiber': 'low'},
        'pav-bhaji': {'calories': 300, 'protein': 'low', 'carbs': 'high', 'fat': 'medium', 'fiber': 'low'},
        'vadapav': {'calories': 286, 'protein': 'medium', 'carbs': 'high', 'fat': 'medium', 'fiber': 'low'}
    }
    processed = preprocess_image(image_array)
    preds = model.predict(processed).squeeze()
    top_indices = np.argsort(preds)[-top_k:][::-1]
    results = []
    for i, idx in enumerate(top_indices):
        food_name = FOOD_CLASSES[idx]
        confidence = float(preds[idx])
        results.append({
            'rank': i + 1,
            'food_name': food_name,
            'confidence': f"{confidence*100:.2f}%",
            'nutrition': nutrition_db.get(food_name, {})
        })
    return results

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "message": "NutriSnap API is running"})

@app.route("/predict", methods=["POST"])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    file = request.files['file']
    if not file.filename:
        return jsonify({"error": "No file selected for uploading"}), 400

    try:
        image_bytes = file.read()
        pil_image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        image_array = np.array(pil_image)
        predictions = predict_food_with_nutrition(image_array)
        return jsonify(predictions)
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    
if __name__ == "__main__":
    port = int(os.environ.get('PORT', 10000))
    app.run(host="0.0.0.0", port=port, debug=False)