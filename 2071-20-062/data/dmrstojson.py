import pandas as pd
import geopandas as gpd

#Read Tabular Data
df = pd.read_excel(r"sampling.xlsx")
#df.rename(columns={'EXTERNAL_PERMIT_NMBR':'PMTNBR'}, inplace=True)
df['TSS'].fillna(' ', inplace=True)
df['LEAD'].fillna(' ', inplace=True)
df['PH'].fillna(' ', inplace=True)


#Read and rename columns on Spatial Data
sample_locations = gpd.read_file(r"sampling.shp")


json = (df.groupby(['NAME'], as_index=True)
    .apply(lambda x: x[[
        "DATE",
        "LEAD",
        "TSS",
        'PH',
        ]].astype(str).to_dict('r'))
    .reset_index()
    .rename(columns={0:'Event'}))



merged = sample_locations.merge(json, on='NAME')
merged['Event'] = merged['Event'].astype(str)


merged.to_file(r"sampling.geojson", driver="GeoJSON")
