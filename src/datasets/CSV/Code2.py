import pandas as pd
data = pd.read_csv('koala_data.csv')
average_age = data['Age'].mean()
oldest_koala_id = data['ID'].loc[data['Age'].idxmax()]
percentage_males = len(data[data['Sex'] == 'Male']) / len(data) * 100
total_offspring = data['Offspring'].sum()
average_weight_by_sex = data.groupby('Sex')['Weight'].mean()
lowest_weight_koala_id = data['ID'].loc[data['Weight'].idxmin()]
weight_std = data['Weight'].std()
weight_categories = pd.cut(data['Weight'], bins=[0, 6, 8, 10, float('inf')], labels=['Small', 'Medium', 'Large', 'Extra Large'])
data['Weight_Category'] = weight_categories
weight_category_counts = data['Weight_Category'].value_counts()
average_offspring_per_female = data[data['Sex'] == 'Female']['Offspring'].mean()
print('Average age of koalas:', average_age)
print('ID of the oldest koala:', oldest_koala_id)
print('Percentage of male koalas:', percentage_males)
print('Total number of offspring:', total_offspring)
print('Average weight by sex:', average_weight_by_sex)
print('ID of the koala with the lowest weight:', lowest_weight_koala_id)
print('Standard deviation of weight:', weight_std)
print('Weight category counts:', weight_category_counts)
print('Average number of offspring per female:', average_offspring_per_female)