import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeRegressor
from sklearn.metrics import r2_score
data = pd.read_csv('population_data.csv')
X = data[['Birth Rate', 'Death Rate', 'Net Migration Rate', 'Urbanization Rate', 'Literacy Rate', 'GDP Per Capita']]
y = data['Population Growth Rate']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = DecisionTreeRegressor(min_samples_leaf=3)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
r_squared = r2_score(y_test, y_pred)
print(f'R-squared: {r_squared}')