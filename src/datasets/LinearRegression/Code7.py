import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import KFold
from sklearn.metrics import mean_squared_error
with open('iris_data.csv', 'w') as f:
    f.write('sepal_length,sepal_width,petal_length,petal_width,species\n')
    for i in range(150):
        if i < 50:
            species = 'setosa'
        elif i < 100:
            species = 'versicolor'
        else:
            species = 'virginica'
        sepal_length = 5 + (i % 50) * 0.1 + (i // 50) * 0.2
        sepal_width = 3 + (i % 50) * 0.05 + (i // 50) * 0.1
        petal_length = 1 + (i % 50) * 0.2 + (i // 50) * 0.3
        petal_width = 0.2 + (i % 50) * 0.05 + (i // 50) * 0.1
        f.write(f'{sepal_length},{sepal_width},{petal_length},{petal_width},{species}\n')
df = pd.read_csv('iris_data.csv')
X = df[['sepal_length', 'sepal_width', 'petal_length']]
y = df['petal_width']
kfold = KFold(n_splits=5, shuffle=True, random_state=42)
model = LinearRegression()
mse_values = []
for train_index, test_index in kfold.split(X):
    X_train, X_test = X.iloc[train_index], X.iloc[test_index]
    y_train, y_test = y.iloc[train_index], y.iloc[test_index]
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    mse_values.append(mse)
average_mse = sum(mse_values) / len(mse_values)
print(f'Average Mean Squared Error: {average_mse}')