import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
with open('population_data.csv', 'w') as f:
    f.write('Year,Population\n')
    for i in range(2000, 2021):
        population = 6070.5 + (i - 2000) * 50 + 10 * i * (i - 2000) / 100
        f.write(f'{i},{population}\n')
df = pd.read_csv('population_data.csv')
X = df[['Year']]
y = df['Population']
model = LinearRegression()
model.fit(X, y)
y_pred = model.predict(X)
mse = mean_squared_error(y, y_pred)
print(f'Mean Squared Error: {mse}')