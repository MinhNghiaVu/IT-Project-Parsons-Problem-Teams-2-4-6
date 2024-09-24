import pandas as pd
data = pd.read_csv('iris_data.csv')
average_sepal_length = data['SepalLengthCm'].mean()
smallest_petal_width_row = data['PetalWidthCm'].idxmin()
smallest_petal_width_species = data.loc[smallest_petal_width_row, 'Species']
std_petal_length_virginica = data[data['Species'] == 'Iris-virginica']['PetalLengthCm'].std()
data['SepalArea'] = data['SepalLengthCm'] * data['SepalWidthCm']
average_sepal_area_by_species = data.groupby('Species')['SepalArea'].mean()
sorted_by_petal_width = data.sort_values('PetalWidthCm')
bottom_5_smallest_petal_width = sorted_by_petal_width.head(5)
correlation_sepal_width_petal_width = data['SepalWidthCm'].corr(data['PetalWidthCm'])
large_petal_length_count = len(data[data['PetalLengthCm'] > 5])
print('Average sepal length:', average_sepal_length)
print('Species of iris with the smallest petal width:', smallest_petal_width_species)
print('Standard deviation of petal length for Iris-virginica:', std_petal_length_virginica)
print('Average sepal area by species:', average_sepal_area_by_species)
print('Bottom 5 irises with the smallest petal width:', bottom_5_smallest_petal_width)
print('Correlation between sepal width and petal width:', correlation_sepal_width_petal_width)
print('Number of irises with a petal length greater than 5 cm:', large_petal_length_count)