import pandas as pd
data = pd.read_csv('population_data.csv')
total_population = data['Population'].sum()
highest_density_country = data['Country'].loc[(data['Population'] / data['Area']).idxmax()]
average_population = data['Population'].mean()
average_density_by_continent = data.groupby('Continent')['Population'].sum() / data.groupby('Continent')['Area'].sum()
highest_population_continent = data.groupby('Continent')['Population'].sum().idxmax()
data['Population_Density'] = data['Population'] / data['Area']
population_density_std = data['Population_Density'].std()
sorted_by_population = data.sort_values('Population')
lowest_5_countries = sorted_by_population.head(5)
africa_population_percentage = data[data['Continent'] == 'Africa']['Population'].sum() / total_population * 100
print('Total population:', total_population)
print('Country with the highest population density:', highest_density_country)
print('Average population:', average_population)
print('Average population density by continent:', average_density_by_continent)
print('Continent with the highest total population:', highest_population_continent)
print('Standard deviation of population density:', population_density_std)
print('Bottom 5 countries with the lowest population:', lowest_5_countries)
print('Percentage of world population in Africa:', africa_population_percentage)