import pandas as pd
kangaroo_df = pd.DataFrame({
    'Region': ['Region A', 'Region B', 'Region C', 'Region D', 'Region E', 'Region F', 'Region G', 'Region H', 'Region I', 'Region J'],
    'Kangaroo Population': [1200, 1500, 1300, 900, 1700, 1100, 1400, 1000, 1600, 1200],
    'Average Weight (kg)': [55, 60, 58, 52, 62, 54, 59, 50, 61, 56],
    'Grassland Area (sq km)': [2500, 3000, 2700, 2000, 3500, 2200, 2900, 2100, 3200, 2400]
})
kangaroo_df['Kangaroo Density'] = kangaroo_df['Kangaroo Population'] / kangaroo_df['Grassland Area (sq km)']
average_density = kangaroo_df['Kangaroo Density'].mean()
print(average_density)