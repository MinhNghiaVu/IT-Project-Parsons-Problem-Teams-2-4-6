import pandas as pd
data = pd.read_csv('kangaroo_data.csv')
correlation_matrix = data.corr()
print(correlation_matrix)
correlation = correlation_matrix.loc['Hop Length (cm)', 'Body Weight (kg)']
print(f'Correlation between hop length and body weight: {correlation}')
correlation = correlation_matrix.loc['Tail Length (cm)', 'Body Weight (kg)']
print(f'Correlation between tail length and body weight: {correlation}')
correlation = correlation_matrix.loc['Hop Frequency (Hz)', 'Body Weight (kg)']
print(f'Correlation between hop frequency and body weight: {correlation}')