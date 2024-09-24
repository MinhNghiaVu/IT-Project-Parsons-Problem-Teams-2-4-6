import pandas as pd
koalas_df = pd.read_csv('koalas.csv')
grouped_df = koalas_df.groupby('Region')
koala_counts = grouped_df.size()
koala_counts_df = koala_counts.to_frame(name='Count')
koala_counts_df = koala_counts_df.reset_index()
sorted_df = koala_counts_df.sort_values(by='Count', ascending=False)
print(sorted_df)