
import uvicorn
from fastapi import FastAPI
from brainStroke import BrainStroke
import numpy as np
import pickle
import pandas as pd

app= FastAPI()
pickle_in = open("classifier.pkl","rb")
classifier = pickle.load(pickle_in)

@app.get('/')
def index():
    return {'message':'hello world'}

@app.post('/predict')
def predict_BrainStroke(data:BrainStroke):
    data =data.dict()
    gender=data['gender']
    age=data['age']
    print(age)
    hypertension= data['hypertension']
    heart_disease= data['heart_disease']
    ever_married= data['ever_married']
    work_type = data['work_type']
    Residence_type = data['Residence_type']
    avg_glucose_level = data['avg_glucose_level']
    bmi = data['bmi']
    smoking_status = data['smoking_status']
    prediction = classifier.predict([[gender,age,hypertension,heart_disease,  ever_married,work_type,Residence_type,avg_glucose_level,bmi,smoking_status]])
    if (prediction[0] == 0):
        prediction = "brain stroke negative"

    else:
        prediction = "brain stroke positive"
    return{
        'prediction':prediction
    }


if __name__ == '__main__':
    uvicorn.run(app,host='127.0.0.1',port=9000)
