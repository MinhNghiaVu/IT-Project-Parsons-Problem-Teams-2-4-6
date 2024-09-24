import pandas as pd
import numpy as np
koalas_df = pd.read_csv('koalas.csv')
avg_weight_by_region = koalas_df.groupby('Region')['Weight'].mean()
highest_avg_weight_region = avg_weight_by_region.idxmax()
highest_weight_koalas = koalas_df[koalas_df['Region'] == highest_avg_weight_region]
std_age_highest_weight = highest_weight_koalas['Age'].std()
print(f'Standard deviation of age for koalas in {highest_avg_weight_region}: {std_age_highest_weight:.2f}')