import pandas as pd
iris_df = pd.read_csv('NMI_Iris_Data.csv')
mean_features = iris_df.groupby('Species').mean()
mean_features_df = pd.DataFrame(mean_features)
transposed_mean_features_df = mean_features_df.T
print(transposed_mean_features_df)