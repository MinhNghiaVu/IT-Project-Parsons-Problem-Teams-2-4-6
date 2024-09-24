import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import roc_auc_score
data = pd.read_csv('iris.csv')
X = data[['SepalLengthCm', 'SepalWidthCm', 'PetalLengthCm', 'PetalWidthCm']]
y = data['Species']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = DecisionTreeClassifier(max_depth=3)
model.fit(X_train, y_train)
y_pred_proba = model.predict_proba(X_test)
roc_auc = roc_auc_score(y_test == 'Iris-setosa', y_pred_proba[:, 0])
print(f'ROC AUC: {roc_auc}')