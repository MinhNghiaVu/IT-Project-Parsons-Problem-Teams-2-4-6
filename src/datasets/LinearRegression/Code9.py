import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error
with open('koalas_data.csv', 'w') as f:
    f.write('Year,Koala_Population\n')
    for i in range(2010, 2030):
        population = 10000 + (i - 2010) * 500 + i * (i - 2010) * 20
        f.write(f'{i},{population}\n')
df = pd.read_csv('koalas_data.csv')
X = df[['Year']]
y = df['Koala_Population']
model = LinearRegression()
model.fit(X, y)
y_pred = model.predict(X)
mae = mean_absolute_error(y, y_pred)
print(f'Mean Absolute Error: {mae}')