import os
import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import pickle

# Import your existing BrainStroke model class
import sys
brain_stroke_path = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))),
    "brain stroke"
)
sys.path.append(brain_stroke_path)
from brainStroke import BrainStroke

# Define the input model
class StrokeInput(BaseModel):
    gender: int
    age: float
    hypertension: int
    heart_disease: int
    ever_married: int
    work_type: int
    Residence_type: int
    avg_glucose_level: float
    bmi: float
    smoking_status: int

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Conversion mappings
gender_map = {'Male': 1, 'Female': 0}
married_map = {'Yes': 1, 'No': 0}
work_type_map = {
    'Private': 0,
    'Self-employed': 1,
    'Govt_job': 2,
    'children': 3,
    'Never_worked': 4
}
residence_map = {'Urban': 1, 'Rural': 0}
smoking_map = {
    'formerly smoked': 1,
    'never smoked': 2,
    'smokes': 3,
    'Unknown': 0
}

# Load Brain Stroke model
model = None

# Enable CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5000",
    "http://127.0.0.1:8000",
    "*"  # Be careful with this in production
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def load_model():
    global model
    if model is None:
        # Path to your trained model
        model_path = os.path.join(
            os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))),
            "brain stroke",
            "brainStroke.py"
        )
        print(f"Loading model from: {model_path}")
        
        # Import the brain stroke prediction function
        import sys
        sys.path.append(os.path.dirname(model_path))
        from brainStroke import predict_stroke
        global predict_stroke_fn
        predict_stroke_fn = predict_stroke
        try:
            if not os.path.exists(model_path):
                print(f"Model file not found at: {model_path}")
                # For testing purposes, create a simple model
                model = tf.keras.Sequential([
                    tf.keras.layers.Dense(64, activation='relu', input_shape=(10,)),
                    tf.keras.layers.Dense(32, activation='relu'),
                    tf.keras.layers.Dense(1, activation='sigmoid')
                ])
                model.compile(optimizer='adam', loss='binary_crossentropy')
                print("Created a temporary test model")
            else:
                model = tf.keras.models.load_model(model_path)
                print("Brain Stroke model loaded successfully")
        except Exception as e:
            print(f"Error loading model: {str(e)}")
            raise

@app.post("/predict/stroke")
async def predict_brain_stroke(data: StrokeInput):
    try:
        # Ensure model/function is loaded
        if 'predict_stroke_fn' not in globals():
            load_model()
        
        # Create input data dictionary matching your trained model's expectations
        input_data = {
            'gender': data.gender,
            'age': data.age,
            'hypertension': data.hypertension,
            'heart_disease': data.heart_disease,
            'ever_married': data.ever_married,
            'work_type': data.work_type,
            'Residence_type': data.Residence_type,
            'avg_glucose_level': data.avg_glucose_level,
            'bmi': data.bmi,
            'smoking_status': data.smoking_status
        }
        
        # Make prediction using your trained model's function
        prediction = predict_stroke_fn(input_data)
        
        return {
            "prediction": "Stroke Risk Detected" if prediction == 1 else "No Stroke Risk Detected",
            "probability": float(prediction)
        }
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return {"error": str(e)}

@app.on_event("startup")
async def startup_event():
    try:
        load_model()
        print("Model loaded successfully on startup")
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        raise

if __name__ == "__main__":
    try:
        print("Starting Brain Stroke Detection server...")
        # Run the server
        uvicorn.run("stroke_server:app", host="0.0.0.0", port=5003, reload=False, workers=1)
    except KeyboardInterrupt:
        print("Server stopped by user")
    except Exception as e:
        print(f"Error starting server: {str(e)}")
        raise