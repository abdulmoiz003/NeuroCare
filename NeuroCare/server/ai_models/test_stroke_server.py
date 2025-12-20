import requests
import json

def test_stroke_prediction():
    # Test case data
    test_data = {
        "gender": "Male",
        "age": 67.0,
        "hypertension": 1,
        "heart_disease": 1,
        "ever_married": "Yes",
        "work_type": "Private",
        "residence_type": "Urban",
        "avg_glucose_level": 228.69,
        "bmi": 36.6,
        "smoking_status": "formerly smoked"
    }

    # Send POST request to the stroke prediction endpoint
    url = "http://localhost:5003/predict/stroke"
    try:
        response = requests.post(url, json=test_data)
        
        # Check if request was successful
        if response.status_code == 200:
            result = response.json()
            print("\nTest Case Results:")
            print("------------------")
            print(f"Input Data: {json.dumps(test_data, indent=2)}")
            print(f"\nPrediction Result: {json.dumps(result, indent=2)}")
        else:
            print(f"Error: Request failed with status code {response.status_code}")
            print(f"Response: {response.text}")
    
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to the server. Make sure the stroke_server.py is running on port 5003")
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    print("Running Brain Stroke Prediction Test...")
    test_stroke_prediction()