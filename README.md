# Heart Disease Prediction Web Application

This application predicts the likelihood of heart disease based on various health indicators. It uses a machine learning model trained on the Heart Disease Dataset and provides an easy-to-use web interface for users to input their health data.

## Features

- User-friendly form interface for inputting health data
- Real-time validation of input values
- Machine learning model based on Random Forest Classifier
- Responsive design with modern UI components
- Clear prediction results with percentage likelihood

## Tech Stack

### Frontend
- Next.js with TypeScript
- Tailwind CSS for styling
- shadcn/ui components
- React Hook Form for form handling

### Backend
- Flask (Python)
- scikit-learn for machine learning
- pandas for data processing
- joblib for model persistence

## Setup Instructions

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the Flask server:
   ```bash
   python app.py
   ```

## Model Details

The prediction model is built using the Random Forest Classifier algorithm, which was chosen for its:
- High accuracy on medical prediction tasks
- Ability to handle both numerical and categorical features
- Resistance to overfitting
- Feature importance capabilities

The model is trained on the Heart Disease Dataset with the following features:
- Age
- Sex
- Chest Pain Type
- Resting Blood Pressure
- Cholesterol Level
- Fasting Blood Sugar
- Resting ECG Results
- Maximum Heart Rate
- Exercise Induced Angina
- ST Depression
- Slope of Peak Exercise ST Segment
- Number of Major Vessels
- Thalassemia

## Usage

1. Start both the frontend and backend servers following the setup instructions above.
2. Open your browser and navigate to `http://localhost:3000`
3. Fill in all the required health indicators in the form
4. Click "Get Prediction" to see your results
5. The prediction will be displayed as a percentage likelihood of heart disease

## API Endpoints

### POST /predict
Accepts JSON data with all health indicators and returns a prediction probability.

Example request body:
```json
{
  "age": 63,
  "sex": 1,
  "cp": 3,
  "trestbps": 145,
  "chol": 233,
  "fbs": 1,
  "restecg": 0,
  "thalach": 150,
  "exang": 0,
  "oldpeak": 2.3,
  "slope": 0,
  "ca": 0,
  "thal": 1
}
```

Example response:
```json
{
  "prediction": 85.5
}
```

## Deployment

The application can be deployed using various platforms:

### Frontend
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify

### Backend
- Heroku
- AWS Elastic Beanstalk
- Google Cloud Platform

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
