import pandas as pd
data = pd.read_csv('iris_data.csv')
total_irises = len(data)
smallest_sepal_length_row = data['SepalLengthCm'].idxmin()
smallest_sepal_length_species = data.loc[smallest_sepal_length_row, 'Species']
std_sepal_length_versicolor = data[data['Species'] == 'Iris-versicolor']['SepalLengthCm'].std()
data['PetalRatio'] = data['PetalLengthCm'] / data['PetalWidthCm']
average_petal_ratio_by_species = data.groupby('Species')['PetalRatio'].mean()
sorted_by_petal_length = data.sort_values('PetalLengthCm')
bottom_5_smallest_petal_length = sorted_by_petal_length.head(5)
correlation_sepal_length_sepal_width = data['SepalLengthCm'].corr(data['SepalWidthCm'])
large_petal_width_count = len(data[data['PetalWidthCm'] > 1.5])
print('Total number of irises:', total_irises)
print('Species of iris with the smallest sepal length:', smallest_sepal_length_species)
print('Standard deviation of sepal length for Iris-versicolor:', std_sepal_length_versicolor)
print('Average petal ratio by species:', average_petal_ratio_by_species)
print('Top 5 irises with the smallest petal length:', bottom_5_smallest_petal_length)
print('Correlation between sepal length and sepal width:', correlation_sepal_length_sepal_width)
print('Number of irises with a petal width greater than 1.5 cm:', large_petal_width_count)