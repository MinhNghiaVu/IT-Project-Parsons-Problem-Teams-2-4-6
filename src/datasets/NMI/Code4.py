import pandas as pd
iris_df = pd.read_csv('NMI_Iris_Data.csv')
mean_features = iris_df.groupby('Species').mean()
std_features = iris_df.groupby('Species').std()
cv_features = std_features / mean_features
print(cv_features)