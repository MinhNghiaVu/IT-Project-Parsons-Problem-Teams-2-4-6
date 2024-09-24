import pandas as pd
population_df = pd.DataFrame({
    'City': ['City A', 'City B', 'City C', 'City D', 'City E', 'City F', 'City G', 'City H', 'City I', 'City J'],
    'Population': [120000, 150000, 130000, 90000, 170000, 110000, 140000, 100000, 160000, 120000],
    'Area (sq km)': [50, 60, 55, 40, 70, 45, 58, 42, 65, 50],
    'Growth Rate (%)': [2.5, 1.8, 2.2, 1.5, 2.8, 1.9, 2.1, 1.6, 2.6, 2.0]
})
population_df['Population Density'] = population_df['Population'] / population_df['Area (sq km)']
highest_density_city = population_df.loc[population_df['Population Density'] == population_df['Population Density'].max(), 'City'].iloc[0]
print(highest_density_city)