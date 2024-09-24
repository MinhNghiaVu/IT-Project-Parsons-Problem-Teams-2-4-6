import pandas as pd
data = pd.read_csv('koala_data.csv')
mean_male_weight = data[data['Sex'] == 'Male']['Weight'].mean()
std_female_age = data[data['Sex'] == 'Female']['Age'].std()
max_offspring_koala = data['Offspring'].idxmax()
highest_offspring_weight = data.loc[max_offspring_koala, 'Weight']
weight_categories = pd.cut(data['Weight'], bins=[0, 5, 10, 15, float('inf')], labels=['Small', 'Medium', 'Large', 'Extra Large'])
data['Weight_Category'] = weight_categories
weight_category_counts = data['Weight_Category'].value_counts()
female_percentage = (data['Sex'] == 'Female').sum() / len(data) * 100
older_koalas = data[data['Age'] > 10]
correlation_age_weight = data['Age'].corr(data['Weight'])
print('Average weight of male koalas:', mean_male_weight)
print('Standard deviation of age for female koalas:', std_female_age)
print('Koala with the highest number of offspring:', max_offspring_koala)
print('Weight of the koala with the highest number of offspring:', highest_offspring_weight)
print('Weight category counts:', weight_category_counts)
print('Percentage of female koalas:', female_percentage)
print('Correlation between age and weight:', correlation_age_weight)