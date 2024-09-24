import pandas as pd
kangaroos_df = pd.read_csv('kangaroos.csv')
avg_weight_by_region = kangaroos_df.groupby('Region')['Weight'].mean()
avg_weight_df = avg_weight_by_region.to_frame(name='AverageWeight')
avg_weight_df = avg_weight_df.reset_index()
sorted_df = avg_weight_df.sort_values(by='AverageWeight', ascending=False)
print(sorted_df)