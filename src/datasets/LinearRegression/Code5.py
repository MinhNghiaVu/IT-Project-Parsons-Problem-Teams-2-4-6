import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score
from sklearn.preprocessing import LabelEncoder
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
X = df[['sepal_length', 'sepal_width', 'petal_length', 'petal_width']]
y = df['species']
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(y)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
r_squared = r2_score(y_test, y_pred)
print(f'R-squared score: {r_squared}')