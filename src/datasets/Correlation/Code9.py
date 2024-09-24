import pandas as pd
data = pd.read_csv('kangaroo_data.csv')
covariance_matrix = data.cov()
print(f'Covariance matrix:\n{covariance_matrix}')
covariance = covariance_matrix.loc['Hop Length (cm)', 'Body Weight (kg)']
print(f'Covariance between hop length and body weight: {covariance}')
covariance = covariance_matrix.loc['Tail Length (cm)', 'Body Weight (kg)']
print(f'Covariance between tail length and body weight: {covariance}')
covariance = covariance_matrix.loc['Hop Frequency (Hz)', 'Body Weight (kg)']
print(f'Covariance between hop frequency and body weight: {covariance}')