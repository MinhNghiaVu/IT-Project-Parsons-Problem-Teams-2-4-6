import pandas as pd
data = pd.read_csv('kangaroo_data.csv')
average_weight = data['Weight (kg)'].mean()
highest_hop_length_row = data['Hop Length (m)'].idxmax()
highest_hop_length_age = data.loc[highest_hop_length_row, 'Age (years)']
std_pouch_young_age = data['Pouch Young Age (months)'].std()
data['Body Mass Index'] = data['Weight (kg)'] / (data['Height (cm)'] / 100) ** 2
average_bmi_older_kangaroos = data[data['Age (years)'] > 5]['Body Mass Index'].mean()
sorted_by_weight = data.sort_values('Weight (kg)', ascending=False)
top_5_heaviest_kangaroos = sorted_by_weight.head(5)
correlation_weight_hop_length = data['Weight (kg)'].corr(data['Hop Length (m)'])
kangaroos_with_pouch_young = len(data[data['Pouch Young Age (months)'] > 0])
print('Average weight of kangaroos:', average_weight)
print('Age of the kangaroo with the highest hop length:', highest_hop_length_age)
print('Standard deviation of pouch young age:', std_pouch_young_age)
print('Average body mass index for kangaroos older than 5 years:', average_bmi_older_kangaroos)
print('Top 5 heaviest kangaroos:', top_5_heaviest_kangaroos)
print('Correlation between weight and hop length:', correlation_weight_hop_length)
print('Number of kangaroos with a pouch young:', kangaroos_with_pouch_young)