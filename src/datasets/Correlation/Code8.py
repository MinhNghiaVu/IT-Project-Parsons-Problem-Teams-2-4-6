import pandas as pd
data = pd.read_csv('kangaroo_data.csv')
correlation_matrix_pearson = data.corr(method='pearson')
print(f'Pearson correlation matrix:\n{correlation_matrix_pearson}')
correlation_matrix_spearman = data.corr(method='spearman')
print(f'Spearman correlation matrix:\n{correlation_matrix_spearman}')
correlation_matrix_kendall = data.corr(method='kendall')
print(f'Kendall correlation matrix:\n{correlation_matrix_kendall}')