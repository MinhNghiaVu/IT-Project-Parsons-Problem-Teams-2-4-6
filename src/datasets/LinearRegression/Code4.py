import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
data = {'Year': [2010 + i for i in range(15)],'Koala_Population': [10000 + i * 500 + i * (i - 1) * 20 for i in range(15)]}
df = pd.DataFrame(data)
X = df[['Year']]
y = df['Koala_Population']
model = LinearRegression()
model.fit(X, y)
y_pred = model.predict(X)
mse = mean_squared_error(y, y_pred)
print(f'Mean Squared Error: {mse}')