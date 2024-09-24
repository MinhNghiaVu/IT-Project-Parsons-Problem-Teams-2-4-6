import pandas as pd
data = pd.read_csv('kangaroo_data.csv')
correlation_pearson = data['Hop Length (cm)'].corr(data['Body Weight (kg)'], method='pearson')
print(f'Pearson correlation between hop length and body weight: {correlation_pearson}')
correlation_spearman = data['Hop Length (cm)'].corr(data['Body Weight (kg)'], method='spearman')
print(f'Spearman correlation between hop length and body weight: {correlation_spearman}')
correlation_kendall = data['Hop Length (cm)'].corr(data['Body Weight (kg)'], method='kendall')
print(f'Kendall correlation between hop length and body weight: {correlation_kendall}')