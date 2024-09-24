import pandas as pd
import scipy.stats as stats
data = pd.read_csv('kangaroo_data.csv')
correlation_pearson = data['Hop Length (cm)'].corr(data['Body Weight (kg)'], method='pearson')
print(f'Pearson correlation between hop length and body weight: {correlation_pearson}')
p_value_pearson = stats.pearsonr(data['Hop Length (cm)'], data['Body Weight (kg)'])[1]
print(f'P-value for Pearson correlation between hop length and body weight: {p_value_pearson}')
correlation_spearman = data['Tail Length (cm)'].corr(data['Body Weight (kg)'], method='spearman')
print(f'Spearman correlation between tail length and body weight: {correlation_spearman}')
p_value_spearman = stats.spearmanr(data['Tail Length (cm)'], data['Body Weight (kg)'])[1]
print(f'P-value for Spearman correlation between tail length and body weight: {p_value_spearman}')