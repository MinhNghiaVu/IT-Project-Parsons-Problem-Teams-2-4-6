import pandas as pd
koalas_df = pd.read_csv('koalas.csv')
grouped_df = koalas_df.groupby(['Region', 'Sex'])
mean_age_by_group = grouped_df['Age'].mean()
mean_age_df = mean_age_by_group.reset_index()
sorted_df = mean_age_df.sort_values(by=['Region', 'Sex'])
print(sorted_df)