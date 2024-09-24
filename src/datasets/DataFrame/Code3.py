import pandas as pd
iris_df = pd.read_csv('iris.csv')
mean_sepal_length_by_species = iris_df.groupby('Species')['SepalLengthCm'].mean()
highest_sepal_length_species = mean_sepal_length_by_species.idxmax()
highest_sepal_length_iris = iris_df[iris_df['Species'] == highest_sepal_length_species]
std_petal_width_highest_sepal_length = highest_sepal_length_iris['PetalWidthCm'].std()
print(f'Standard deviation of petal width for {highest_sepal_length_species}: {std_petal_width_highest_sepal_length:.2f}')