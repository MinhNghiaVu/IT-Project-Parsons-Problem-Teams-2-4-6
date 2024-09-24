import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error
data = {'Year': [2000 + i for i in range(25)],
        'Population': [6070.5 + i * 50 + i * (i - 1) * 0.5 for i in range(25)]}
df = pd.DataFrame(data)
X = df[['Year']]
y = df['Population']
model = LinearRegression()
model.fit(X, y)
y_pred = model.predict(X)
mae = mean_absolute_error(y, y_pred)
print(f'Mean Absolute Error: {mae}')