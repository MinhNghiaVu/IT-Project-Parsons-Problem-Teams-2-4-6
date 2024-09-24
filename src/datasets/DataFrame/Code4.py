import pandas as pd
population_df = pd.read_csv('population.csv')
sorted_df = population_df.sort_values(by='Population', ascending=False)
top_10_countries = sorted_df.head(10)
average_density = top_10_countries['PopulationDensity'].mean()
print(f'Average population density for the top 10 most populous countries: {average_density:.2f}')