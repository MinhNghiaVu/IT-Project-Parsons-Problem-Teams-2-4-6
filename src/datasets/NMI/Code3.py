import pandas as pd
population_df = pd.read_csv('NMI_Population_Data.csv')
population_df['Population Density'] = population_df['Population'] / population_df['Area (sq km)']
population_density_df = population_df[['Region', 'Population Density']]
sorted_population_density_df = population_density_df.sort_values(by='Population Density', ascending=False)
print(sorted_population_density_df)