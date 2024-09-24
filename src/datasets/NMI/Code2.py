import pandas as pd
population_data = {
    'Year': [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
    'Population': [100000, 105000, 110000, 115000, 120000, 125000, 130000, 135000, 140000, 145000]
}
population_df = pd.DataFrame(population_data)
population_df['Growth Rate'] = population_df['Population'].pct_change()
average_growth_rate = population_df['Growth Rate'].mean()
print(average_growth_rate)