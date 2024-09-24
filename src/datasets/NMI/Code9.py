import pandas as pd
iris_df = pd.read_csv('NMI_Iris_Data.csv')
mean_features = iris_df.groupby('Species').mean()
variance_features = iris_df.groupby('Species').var()
combined_features_df = pd.concat([mean_features, variance_features], axis=1, keys=['Mean', 'Variance'])
print(combined_features_df)