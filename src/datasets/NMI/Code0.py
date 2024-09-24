import pandas as pd
data = pd.read_csv('NMI_Population_Data.csv')
mean_population = data.groupby('Region')['Population'].mean()
std_population = data.groupby('Region')['Population'].std()
cv = std_population / mean_population
print(cv)