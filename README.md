# S1_dwnld_GEE
Download Sentinel 1 Synthetic Aperture Radar (SAR) data (GRD, IW) from Google Earth Engine

Purpose: To download Sentinel-1 (GRD product, IW swath) data (VV and VH polarisations only)
mosaic from a selected orbit (number and type should be known beforehand) for a selected 
region of interest (bounding box)

Note: The data will ve downloaded to a folder in your google drive 


#### Set the right parameters before running the code

Bounding box parameters:
ROI_BB_TL -> Top Left coordinates (Longitude, Latitude)
ROI_BB_BL -> Bottom Left coordinates (Longitude, Latitude) 
ROI_BB_BR -> Bottom Right coordinates (Longitude, Latitude) 
ROI_BB_TR -> Top Right coordinates (Longitude, Latitude) 

To set the coordinate system: crs

To set the time period:
start_date -> Set the start date
end_date   -> Set the end date

To set the orbit details:
orbit -> sets the Sentinel-1 (relative) orbit number
orb_type -> sets the S1 orbit type here

res -> resolution in metres

scale -> download scale

