from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Load and preprocess the data
def prepare_data():
    try:
        # Replace 'heart_disease_dataset.csv' with your actual CSV file path
        df = pd.read_csv('heart_disease_dataset.csv')
        logger.info("Successfully loaded dataset")
        
        X = df.drop('target', axis=1)
        y = df['target']
        
        # Split the data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # Scale the features
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)
        
        # Train the model
        model = RandomForestClassifier(
            n_estimators=100,
            max_depth=10,
            min_samples_split=5,
            min_samples_leaf=2,
            random_state=42
        )
        model.fit(X_train_scaled, y_train)
        
        # Save the model and scaler
        joblib.dump(model, 'heart_disease_model.joblib')
        joblib.dump(scaler, 'scaler.joblib')
        
        # Calculate and print accuracy metrics
        y_pred = model.predict(X_test_scaled)
        accuracy = accuracy_score(y_test, y_pred)
        report = classification_report(y_test, y_pred)
        
        logger.info(f"Model Accuracy: {accuracy:.2f}")
        logger.info("Classification Report:\n" + report)
        
        # Get feature importance
        feature_importance = pd.DataFrame({
            'feature': X.columns,
            'importance': model.feature_importances_
        }).sort_values('importance', ascending=False)
        
        logger.info("Feature Importance:\n" + str(feature_importance))
        
        return model, scaler
        
    except Exception as e:
        logger.error(f"Error in prepare_data: {str(e)}")
        raise

# Load the model and scaler
def load_model():
    try:
        model = joblib.load('heart_disease_model.joblib')
        scaler = joblib.load('scaler.joblib')
        logger.info("Successfully loaded existing model and scaler")
        return model, scaler
    except Exception as e:
        logger.info("Training new model as existing model not found")
        return prepare_data()

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the input data
        data = request.json
        logger.info("Received prediction request")
        
        # Convert input data to DataFrame
        input_data = pd.DataFrame([{
            'age': float(data['age']),
            'sex': float(data['sex']),
            'cp': float(data['cp']),
            'trestbps': float(data['trestbps']),
            'chol': float(data['chol']),
            'fbs': float(data['fbs']),
            'restecg': float(data['restecg']),
            'thalach': float(data['thalach']),
            'exang': float(data['exang']),
            'oldpeak': float(data['oldpeak']),
            'slope': float(data['slope']),
            'ca': float(data['ca']),
            'thal': float(data['thal'])
        }])
        
        # Load the model and scaler
        model, scaler = load_model()
        
        # Scale the input data
        input_scaled = scaler.transform(input_data)
        
        # Make prediction
        prediction_proba = model.predict_proba(input_scaled)[0][1]
        prediction_percentage = round(prediction_proba * 100, 2)
        
        # Get feature importances for this prediction
        feature_importance = dict(zip(
            input_data.columns,
            model.feature_importances_
        ))
        
        response = {
            'prediction': prediction_percentage,
            'feature_importance': feature_importance,
            'confidence': 'high' if abs(prediction_percentage - 50) > 25 else 'medium' if abs(prediction_percentage - 50) > 10 else 'low'
        }
        
        logger.info(f"Prediction made: {prediction_percentage}%")
        return jsonify(response)
    
    except Exception as e:
        logger.error(f"Error in prediction: {str(e)}")
        return jsonify({
            'error': 'Failed to make prediction',
            'message': str(e)
        }), 500

@app.route('/model-info', methods=['GET'])
def model_info():
    try:
        model, _ = load_model()
        return jsonify({
            'model_type': 'Random Forest Classifier',
            'n_estimators': model.n_estimators,
            'max_depth': model.max_depth,
            'feature_importance': dict(zip(
                ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 
                 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'],
                model.feature_importances_
            ))
        })
    except Exception as e:
        logger.error(f"Error in model-info: {str(e)}")
        return jsonify({
            'error': 'Failed to get model info',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    # Load model at startup
    try:
        load_model()
        logger.info("Model loaded successfully at startup")
    except Exception as e:
        logger.error(f"Error loading model at startup: {str(e)}")
    
    # Run the app
    app.run(debug=True)
