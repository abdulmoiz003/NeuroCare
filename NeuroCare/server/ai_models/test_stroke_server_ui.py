import requests
import json

def test_stroke_prediction():
    # Test data from the UI
    test_data = {
        "gender": "Male",
        "age": 65.0,
        "hypertension": 1,
        "heart_disease": 1,
        "ever_married": "Yes",
        "work_type": "Self-employed",
        "residence_type": "Urban",
        "avg_glucose_level": 280.0,
        "bmi": 38.0,
        "smoking_status": "smokes"
    }

    url = "http://localhost:5003/predict/stroke"
    
    try:
        print("Sending request to server...")
        print(f"Request data: {json.dumps(test_data, indent=2)}")
        
        response = requests.post(url, json=test_data)
        print(f"\nResponse status code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"Response data: {json.dumps(result, indent=2)}")
        else:
            print(f"Error response: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to the server. Make sure the server is running on port 5003")
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    print("Running Brain Stroke Prediction Test with UI data...")
    test_stroke_prediction()