import pandas as pd
data = pd.read_csv('population_data.csv')
total_population = data['Population'].sum()
average_density = total_population / data['Area'].sum()
lowest_population_country = data['Country'].loc[data['Population'].idxmin()]
europe_population_percentage = data[data['Continent'] == 'Europe']['Population'].sum() / total_population * 100
largest_country_by_area = data['Country'].loc[data['Area'].idxmax()]
average_population_by_continent = data.groupby('Continent')['Population'].mean()
sorted_by_area = data.sort_values('Area')
smallest_5_countries = sorted_by_area.head(5)
print('Total population:', total_population)
print('Average population density:', average_density)
print('Country with the lowest population:', lowest_population_country)
print('Percentage of world population in Europe:', europe_population_percentage)
print('Country with the highest area:', largest_country_by_area)
print('Average population by continent:', average_population_by_continent)
print('Top 5 countries with the smallest area:', smallest_5_countries)