# Optimizing Tea Production to Maximize Foreging Exchange Earnings in Sri Lanka 🍃

## Step 1: Data Preprocessing

### 1.1 Load the Data

Load the dataset into a pandas DataFrame. Ensure the data includes the following columns:

- `Year-Month`
- `High-Grown-Production`
- `Mid-Grown-Production`
- `Low-Grown-Production`
- `Total-Export-Quantity`
- `Unit-Price`
- `Exchange-Rate`

```python
import pandas as pd

# Load the dataset
data = pd.read_csv('tea_production_data.csv')

# Display the first few rows
print(data.head())
```

### 1.2 Handle Missing Values

Check for missing values and handle them (e.g., using interpolation or forward/backward fill).

```python
# Check for missing values
print(data.isnull().sum())

# Fill missing values (if any)
data.fillna(method='ffill', inplace=True)  # Forward fill
```

### 1.3 Convert `Year-Month` to DateTime

Convert the `Year-Month` column to a datetime format and set it as the index.

```python
# Convert to datetime
data['Year-Month'] = pd.to_datetime(data['Year-Month'])

# Set 'Year-Month' as the index
data.set_index('Year-Month', inplace=True)
```

### 1.4 Split Data into Training and Testing Sets

Split the data into training and testing sets (e.g., 80% training, 20% testing).

```python
# Split data
train_size = int(len(data) * 0.8)
train_data, test_data = data.iloc[:train_size], data.iloc[train_size:]
```

## Step 2: Build ARIMA Models for Tea Production

### 2.1 Fit ARIMA Models for Each Growing Area

Use the `auto_arima` function from the `pmdarima` library to automatically find the best ARIMA parameters and fit the models.

```python
from pmdarima import auto_arima

# Fit ARIMA models for each growing area
high_grown_model = auto_arima(train_data['High-Grown-Production'], seasonal=False, trace=True)
mid_grown_model = auto_arima(train_data['Mid-Grown-Production'], seasonal=False, trace=True)
low_grown_model = auto_arima(train_data['Low-Grown-Production'], seasonal=False, trace=True)
```

### 2.2 Predict Future Production

Use the trained ARIMA models to predict tea production for the test period.

```python
# Predict future production
high_grown_pred = high_grown_model.predict(n_periods=len(test_data))
mid_grown_pred = mid_grown_model.predict(n_periods=len(test_data))
low_grown_pred = low_grown_model.predict(n_periods=len(test_data))
```

## Step 3: Predict Export Quantity, Unit Price, and Exchange Rate

### 3.1 Fit ARIMA Models for Other Variables

Fit ARIMA models for `Total-Export-Quantity`, `Unit-Price`, and `Exchange-Rate`.

```python
# Fit ARIMA models for other variables
export_qty_model = auto_arima(train_data['Total-Export-Quantity'], seasonal=False, trace=True)
unit_price_model = auto_arima(train_data['Unit-Price'], seasonal=False, trace=True)
exchange_rate_model = auto_arima(train_data['Exchange-Rate'], seasonal=False, trace=True)
```

### 3.2 Predict Future Values

Use the trained models to predict future values of these variables.

```python
# Predict future values
export_qty_pred = export_qty_model.predict(n_periods=len(test_data))
unit_price_pred = unit_price_model.predict(n_periods=len(test_data))
exchange_rate_pred = exchange_rate_model.predict(n_periods=len(test_data))
```

## Step 4: Optimization to Maximize FEE

### 4.1 Define the Objective Function

The objective is to maximize FEE, where:

_**FEE = Total-Export x Quantity × Unit Price × Exchange-Rate**_

```python
def fee_calculation(production, export_qty, unit_price, exchange_rate):
    return export_qty * unit_price * exchange_rate

def objective_function(production):
    return -fee_calculation(production, export_qty_pred.mean(), unit_price_pred.mean(), exchange_rate_pred.mean())
```

### 4.2 Define Constraints

Add constraints for production limits for each growing area.

```python
# Define constraints
min_high_grown = 10000  # Example minimum production for High Grown
max_high_grown = 50000  # Example maximum production for High Grown
min_mid_grown = 8000    # Example minimum production for Mid Grown
max_mid_grown = 40000   # Example maximum production for Mid Grown
min_low_grown = 12000   # Example minimum production for Low Grown
max_low_grown = 60000   # Example maximum production for Low Grown

constraints = (
    {'type': 'ineq', 'fun': lambda x: x[0] - min_high_grown},  # High Grown >= min
    {'type': 'ineq', 'fun': lambda x: max_high_grown - x[0]},  # High Grown <= max
    {'type': 'ineq', 'fun': lambda x: x[1] - min_mid_grown},    # Mid Grown >= min
    {'type': 'ineq', 'fun': lambda x: max_mid_grown - x[1]},    # Mid Grown <= max
    {'type': 'ineq', 'fun': lambda x: x[2] - min_low_grown},    # Low Grown >= min
    {'type': 'ineq', 'fun': lambda x: max_low_grown - x[2]},    # Low Grown <= max
)
```

### 4.3 Run Optimization

Use the `minimize` function from `scipy.optimize` to solve the optimization problem.

```python
from scipy.optimize import minimize

# Initial guess (mean predicted production for each growing area)
initial_guess = [high_grown_pred.mean(), mid_grown_pred.mean(), low_grown_pred.mean()]

# Run optimization
result = minimize(objective_function, initial_guess, constraints=constraints)

# Extract results
optimal_production = result.x
max_fee = -result.fun
```

## Step 5: Output Results

### 5.1 Predicted Tea Production

Print the predicted tea production for each growing area.

```python
print("Predicted High-Grown Production:", high_grown_pred.mean())
print("Predicted Mid-Grown Production:", mid_grown_pred.mean())
print("Predicted Low-Grown Production:", low_grown_pred.mean())
```

### 5.2 Optimal Production and Maximum FEE

```python
print("Optimal High-Grown Production:", optimal_production[0])
print("Optimal Mid-Grown Production:", optimal_production[1])
print("Optimal Low-Grown Production:", optimal_production[2])
print("Maximum FEE:", max_fee)
```

### Summary

1. Preprocess the data (handle missing values, convert to datetime, split into train/test sets).

2. Build ARIMA models for tea production and other variables.

3. Predict future values using the ARIMA models.

4. Formulate and solve the optimization problem to maximize FEE.

5. Output the predicted and optimal production values along with the maximum FEE.
