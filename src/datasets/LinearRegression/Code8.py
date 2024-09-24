import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
data = {'sepal_length': [5 + i * 0.1 + (i // 50) * 0.2 for i in range(150)],
        'sepal_width': [3 + i * 0.05 + (i // 50) * 0.1 for i in range(150)],
        'petal_length': [1 + i * 0.2 + (i // 50) * 0.3 for i in range(150)],
        'petal_width': [0.2 + i * 0.05 + (i // 50) * 0.1 for i in range(150)],
        'species': ['setosa' if i < 50 else 'versicolor' if i < 100 else 'virginica' for i in range(150)]}
df = pd.DataFrame(data)
X = df[['sepal_length', 'sepal_width']]
y = df['petal_length']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f'Mean Squared Error: {mse}')