import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import KFold
from sklearn.metrics import mean_squared_error
with open('population_data.csv', 'w') as f:
    f.write('Year,Population\n')
    for i in range(2000, 2030):
        population = 6070.5 + (i - 2000) * 50 + 10 * i * (i - 2000) / 100
        f.write(f'{i},{population}\n')
df = pd.read_csv('population_data.csv')
X = df[['Year']]
y = df['Population']
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