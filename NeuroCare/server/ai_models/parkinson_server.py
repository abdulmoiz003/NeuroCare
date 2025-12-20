import os
import tensorflow as tf
import numpy as np
from PIL import Image
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Parkinson's model
base_path = r"C:\Users\abdul\OneDrive\AppData\Desktop\NeuroCare Code"
park_model_path = os.path.join(base_path, "Park", "models", "1.keras")
print(f"Loading Parkinson's model from: {park_model_path}")

try:
    park_model = tf.keras.models.load_model(park_model_path)
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {str(e)}")
    raise

def preprocess_image(image, target_size=(224, 224)):
    # Convert to RGB if needed
    if image.mode != 'RGB':
        image = image.convert('RGB')
    
    # Resize image
    image = image.resize(target_size)
    
    # Convert to array and normalize
    img_array = tf.keras.preprocessing.image.img_to_array(image)
    img_array = tf.expand_dims(img_array, 0)
    img_array = img_array / 255.0
    
    return img_array

@app.post("/predict/parkinson")
async def predict_parkinson(file: UploadFile = File(...)):
    try:
        # Read and preprocess image
        image = Image.open(file.file)
        processed_image = preprocess_image(image)
        
        # Make prediction
        prediction = park_model.predict(processed_image)
        
        # Get result
        result = "Parkinson's Detected" if prediction[0][0] > 0.5 else "No Parkinson's Detected"
        confidence = float(prediction[0][0])
        
        return {
            "prediction": result,
            "confidence": confidence,
            "raw_score": float(prediction[0][0])
        }
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return {"error": str(e)}

if __name__ == "__main__":
    print("Starting Parkinson's Disease Detection server...")
    uvicorn.run(app, host="0.0.0.0", port=5002)