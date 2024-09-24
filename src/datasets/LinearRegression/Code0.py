import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
data = {'Year': [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
        'Population': [6070.5, 6120.9, 6172.2, 6224.2, 6276.9, 6330.4, 6384.6, 6439.5, 6495.1, 6551.4, 6608.5, 6666.3, 6724.8, 6784.1, 6844.1, 6904.8, 6966.2, 7028.3, 7091.1, 7154.6]}
df = pd.DataFrame(data)
X = df[['Year']]
y = df['Population']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
from sklearn.metrics import r2_score
r_squared = r2_score(y_test, y_pred)
print(f'R-squared score: {r_squared}')