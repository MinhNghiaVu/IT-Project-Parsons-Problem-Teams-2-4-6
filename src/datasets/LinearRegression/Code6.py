import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error
data = {'sepal_length': [5 + i * 0.1 + (i // 50) * 0.2 for i in range(150)],
        'sepal_width': [3 + i * 0.05 + (i // 50) * 0.1 for i in range(150)],
        'petal_length': [1 + i * 0.2 + (i // 50) * 0.3 for i in range(150)],
        'petal_width': [0.2 + i * 0.05 + (i // 50) * 0.1 for i in range(150)],
        'species': ['setosa' if i < 50 else 'versicolor' if i < 100 else 'virginica' for i in range(150)]}
df = pd.DataFrame(data)
X = df[['sepal_length', 'sepal_width', 'petal_length']]
y = df['petal_width']
model = LinearRegression()
model.fit(X, y)
y_pred = model.predict(X)
mae = mean_absolute_error(y, y_pred)
print(f'Mean Absolute Error: {mae}')