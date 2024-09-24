import pandas as pd
koala_df = pd.read_csv('NMI_Koala_Data.csv')
average_age = koala_df.groupby('Location')['Average Age (years)'].mean()
std_age = koala_df.groupby('Location')['Average Age (years)'].std()
cv_age = std_age / average_age
print(cv_age)