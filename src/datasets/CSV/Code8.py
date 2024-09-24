import pandas as pd
data = pd.read_csv('iris_data.csv')
average_petal_length = data['PetalLengthCm'].mean()
largest_sepal_length_row = data['SepalLengthCm'].idxmax()
largest_sepal_length_species = data.loc[largest_sepal_length_row, 'Species']
std_petal_width_setosa = data[data['Species'] == 'Iris-setosa']['PetalWidthCm'].std()
data['SepalRatio'] = data['SepalLengthCm'] / data['SepalWidthCm']
average_sepal_ratio_by_species = data.groupby('Species')['SepalRatio'].mean()
sorted_by_sepal_width = data.sort_values('SepalWidthCm')
bottom_5_smallest_sepal_width = sorted_by_sepal_width.head(5)
correlation_petal_length_petal_width = data['PetalLengthCm'].corr(data['PetalWidthCm'])
small_sepal_width_count = len(data[data['SepalWidthCm'] < 3])
print('Average petal length:', average_petal_length)
print('Species of iris with the largest sepal length:', largest_sepal_length_species)
print('Standard deviation of petal width for Iris-setosa:', std_petal_width_setosa)
print('Average sepal ratio by species:', average_sepal_ratio_by_species)
print('Bottom 5 irises with the smallest sepal width:', bottom_5_smallest_sepal_width)
print('Correlation between petal length and petal width:', correlation_petal_length_petal_width)
print('Number of irises with a sepal width less than 3 cm:', small_sepal_width_count)