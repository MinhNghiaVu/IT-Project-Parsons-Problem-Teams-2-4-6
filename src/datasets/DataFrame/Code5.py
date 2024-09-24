import pandas as pd
kangaroos_df = pd.read_csv('kangaroos.csv')
avg_weight_by_region = kangaroos_df.groupby('Region')['Weight'].mean()
highest_avg_weight_region = avg_weight_by_region.idxmax()
highest_weight_kangaroos = kangaroos_df[kangaroos_df['Region'] == highest_avg_weight_region]
std_age_highest_weight = highest_weight_kangaroos['Age'].std()
print(f'Standard deviation of age for kangaroos in {highest_avg_weight_region}: {std_age_highest_weight:.2f}')