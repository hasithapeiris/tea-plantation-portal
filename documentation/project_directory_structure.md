### **1. Overall Project Directory Structure**

```plaintext
tea-plantation-support-system/
├── backend/              # Node.js backend (API, middleware, business logic)
│   ├── controllers/      # Handles request logic
│   ├── routes/           # Defines API routes
│   ├── services/         # External services (e.g., ML service integration)
│   ├── models/           # Database models
│   ├── utils/            # Utility functions
│   ├── config/           # Configuration files (e.g., env variables, DB connection)
│   ├── index.js          # Entry point for the Node.js backend
│   ├── package.json      # Node.js dependencies
├── ml-service/           # Python ML REST API service
│   ├── models/           # Saved ML models
│   ├── scripts/          # Training scripts for building/updating models
│   ├── app.py            # Entry point for Flask/FastAPI server
│   ├── requirements.txt  # Python dependencies
├── frontend/             # React frontend
│   ├── src/              # Source code for React app
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components (e.g., Home, Dashboard)
│   │   ├── services/     # Axios services for API calls
│   │   ├── styles/       # Styling files (e.g., TailwindCSS or CSS modules)
│   │   ├── App.js        # Main app component
│   │   ├── index.js      # Entry point for React app
│   ├── public/           # Static assets
│   ├── package.json      # React dependencies
├── docker-compose.yml    # Docker Compose file for multi-container setup
└── README.md             # Project documentation
```

---

### **2. Backend File Structure (Node.js + Express)**

```plaintext
backend/
├── controllers/
│   ├── teaController.js     # Business logic for tea data and predictions
│   ├── userController.js    # Business logic for user-related operations
├── routes/
│   ├── teaRoutes.js         # Routes for tea-related endpoints
│   ├── userRoutes.js        # Routes for user-related endpoints
├── services/
│   ├── mlService.js         # Handles requests to the Python ML REST API
│   ├── dbService.js         # Handles database queries
├── models/
│   ├── TeaModel.js          # Mongoose schema for tea data
│   ├── UserModel.js         # Mongoose schema for user accounts
├── utils/
│   ├── errorHandler.js      # Centralized error handling logic
│   ├── logger.js            # Logging service
├── config/
│   ├── db.js                # MongoDB connection setup
│   ├── environment.js       # Environment variables (e.g., API keys)
├── index.js                 # Entry point for Express server
```

#### Example Files:

1. **`mlService.js`** (Backend Integration with ML Service)

```javascript
const axios = require("axios");
const { ML_SERVICE_URL } = process.env;

const getPrediction = async (inputData, endpoint) => {
  try {
    const response = await axios.post(
      `${ML_SERVICE_URL}/${endpoint}`,
      inputData
    );
    return response.data;
  } catch (error) {
    console.error("Error connecting to ML service:", error.message);
    throw new Error("Failed to fetch prediction from ML service");
  }
};

module.exports = { getPrediction };
```

2. **`teaController.js`** (Handling Prediction Requests)

```javascript
const { getPrediction } = require("../services/mlService");

const predictForeignExchange = async (req, res) => {
  try {
    const { productionData } = req.body;
    const prediction = await getPrediction(
      productionData,
      "predict-foreign-exchange"
    );
    res.status(200).json({ prediction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { predictForeignExchange };
```

3. **`teaRoutes.js`**

```javascript
const express = require("express");
const { predictForeignExchange } = require("../controllers/teaController");
const router = express.Router();

router.post("/predict-foreign-exchange", predictForeignExchange);

module.exports = router;
```

---

### **3. ML Service File Structure (Python + Flask/FastAPI)**

```plaintext
ml-service/
├── models/
│   ├── foreign_exchange_model.joblib   # Trained model for foreign exchange prediction
│   ├── price_model.joblib              # Trained model for price prediction
├── scripts/
│   ├── train_foreign_exchange.py       # Training script for foreign exchange model
│   ├── train_price_model.py            # Training script for price prediction
├── app.py                              # Main Flask/FastAPI server
├── requirements.txt                    # Python dependencies
```

#### Example Files:

1. **`app.py`** (Python REST API for ML Models)

```python
from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Load Models
foreign_exchange_model = joblib.load('models/foreign_exchange_model.joblib')
price_model = joblib.load('models/price_model.joblib')

@app.route('/predict-foreign-exchange', methods=['POST'])
def predict_foreign_exchange():
    data = request.json
    prediction = foreign_exchange_model.predict([data['productionData']])
    return jsonify({'prediction': prediction[0]})

@app.route('/predict-price', methods=['POST'])
def predict_price():
    data = request.json
    prediction = price_model.predict([data['marketData']])
    return jsonify({'prediction': prediction[0]})

if __name__ == '__main__':
    app.run(port=5000)
```

---

### **4. Frontend File Structure (React)**

```plaintext
frontend/src/
├── components/
│   ├── PredictionForm.js      # Form to submit data for predictions
│   ├── PredictionResult.js    # Displays prediction results
├── pages/
│   ├── Home.js                # Home page
│   ├── Dashboard.js           # Dashboard with predictions and insights
├── services/
│   ├── api.js                 # Axios configuration and API calls
├── styles/
│   ├── App.css                # Global styles
├── App.js                     # Main app component
├── index.js                   # Entry point
```

#### Example File:

1. **`api.js`** (Frontend Axios Service)

```javascript
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const predictForeignExchange = async (productionData) => {
  const response = await axios.post(`${API_URL}/tea/predict-foreign-exchange`, {
    productionData,
  });
  return response.data;
};
```

---

### **5. How Components are Connected**

1. **Frontend → Backend**: React uses Axios to send requests to the Node.js backend.
2. **Backend → ML Service**: Backend routes make Axios calls to the Flask/FastAPI ML service.
3. **ML Service → Models**: The Flask/FastAPI service loads trained models and generates predictions.
4. **Database**: Backend connects to MongoDB for storing user data, logs, and historical predictions.

---

### **6. Docker Compose (Optional for Multi-Container Setup)**

**`docker-compose.yml`**

```yaml
version: "3.8"
services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/tea_db
      - ML_SERVICE_URL=http://ml-service:5000
    depends_on:
      - mongo
      - ml-service

  ml-service:
    build: ./ml-service
    ports:
      - "5000:5000"

  mongo:
    image: mongo
    ports:
      - "27017:27017"
```
