import pandas as pd
data = pd.read_csv('iris_data.csv')
mean_sepal_length_by_species = data.groupby('Species')['SepalLengthCm'].mean()
largest_petal_width_row = data['PetalWidthCm'].idxmax()
largest_petal_width_species = data.loc[largest_petal_width_row, 'Species']
std_sepal_width_versicolor = data[data['Species'] == 'Iris-versicolor']['SepalWidthCm'].std()
data['PetalArea'] = data['PetalLengthCm'] * data['PetalWidthCm']
average_petal_area_by_species = data.groupby('Species')['PetalArea'].mean()
sorted_by_sepal_length = data.sort_values('SepalLengthCm', ascending=False)
top_5_largest_sepal_length = sorted_by_sepal_length.head(5)
correlation_sepal_petal = data['SepalLengthCm'].corr(data['PetalLengthCm'])
species_counts = data['Species'].value_counts()
print('Mean sepal length by species:', mean_sepal_length_by_species)
print('Species of iris with the largest petal width:', largest_petal_width_species)
print('Standard deviation of sepal width for Iris-versicolor:', std_sepal_width_versicolor)
print('Average petal area by species:', average_petal_area_by_species)
print('Top 5 irises with the largest sepal length:', top_5_largest_sepal_length)
print('Correlation between sepal length and petal length:', correlation_sepal_petal)
print('Number of irises in each species:', species_counts)