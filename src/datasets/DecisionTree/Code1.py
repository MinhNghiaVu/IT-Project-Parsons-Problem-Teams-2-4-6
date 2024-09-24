import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeRegressor
from sklearn.metrics import mean_squared_error
data = pd.read_csv('population_data.csv')
X = data[['Birth Rate', 'Death Rate', 'Net Migration Rate', 'Urbanization Rate', 'Literacy Rate', 'GDP Per Capita']]
y = data['Population Growth Rate']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = DecisionTreeRegressor()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
rmse = mean_squared_error(y_test, y_pred, squared=False)
print(f'RMSE: {rmse}')