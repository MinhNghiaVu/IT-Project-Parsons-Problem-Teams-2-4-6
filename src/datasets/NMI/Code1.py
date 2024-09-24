import pandas as pd
koala_data = {
    'Location': ['Forest A', 'Forest B', 'Forest C', 'Forest D', 'Forest E', 'Forest F', 'Forest G', 'Forest H', 'Forest I', 'Forest J'],
    'Number of Koalas': [150, 200, 180, 120, 250, 160, 190, 140, 220, 170],
    'Average Age (years)': [4.5, 3.8, 4.2, 3.5, 4.8, 4.0, 4.3, 3.7, 4.6, 3.9],
    'Eucalyptus Trees': [1200, 1500, 1300, 900, 1700, 1100, 1400, 1000, 1600, 1200]
}
koala_df = pd.DataFrame(koala_data)
correlation = koala_df['Number of Koalas'].corr(koala_df['Eucalyptus Trees'])
print(correlation)