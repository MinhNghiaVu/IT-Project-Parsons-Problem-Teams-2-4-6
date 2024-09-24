import pandas as pd
data = pd.read_csv('population_data.csv')
total_population = data['Population'].sum()
average_density = data['Population'].sum() / data['Area'].sum()
highest_population_country = data['Country'].loc[data['Population'].idxmax()]
asia_population_percentage = data[data['Continent'] == 'Asia']['Population'].sum() / total_population * 100
lowest_density_country = data['Country'].loc[data['Population'] / data['Area'] == (data['Population'] / data['Area']).min()]
continent_population = data.groupby('Continent')['Population'].sum()
sorted_by_density = data.sort_values('Population', ascending=False)
top_5_countries = sorted_by_density.head(5)
print('Total population:', total_population)
print('Average population density:', average_density)
print('Country with the highest population:', highest_population_country)
print('Percentage of world population in Asia:', asia_population_percentage)
print('Country with the lowest population density:', lowest_density_country)
print('Population by continent:', continent_population)