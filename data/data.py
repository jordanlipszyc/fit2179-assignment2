import pandas as pd
df = pd.read_csv('influenza.csv', dayfirst=True, parse_dates=['Date'])
df['year'] = df['Date'].dt.year

def group_subtype(s):
    if s in ['A and B']:
        return 'A and B'
    elif s in ['Untyped']:
        return 'Untyped'
    elif s.startswith('B'):
        return 'B'
    elif s.startswith('A'):
        return 'A'
    return 'Untyped'

df['Type'] = df['Type/Subtype'].apply(group_subtype)
agg = df.groupby(['year', 'Age group', 'Type']).size().reset_index(name='count')
agg['total'] = agg.groupby(['year', 'Age group'])['count'].transform('sum')
agg['proportion'] = agg['count'] / agg['total']
agg.to_csv('influenza_age.csv', index=False)