# S1_dwnld_GEE
Download Sentinel 1 Synthetic Aperture Radar (SAR) data (GRD, IW) from Google Earth Engine

Purpose: To download Sentinel-1 (GRD product, IW swath) data (VV and VH polarisations only)
mosaic from a selected orbit (number and type should be known beforehand) for a selected 
region of interest (bounding box)

Note: The data will ve downloaded to a folder in your google drive 


#### Set the right parameters before running the code

1. Bounding box parameters:
(a). ROI_BB_TL -> Top Left coordinates (Longitude, Latitude)
(b). ROI_BB_BL -> Bottom Left coordinates (Longitude, Latitude) 
(c). ROI_BB_BR -> Bottom Right coordinates (Longitude, Latitude) 
(d). ROI_BB_TR -> Top Right coordinates (Longitude, Latitude) 

2. To set the coordinate system: crs

3. To set the time period:
(a). start_date -> Set the start date
(b). end_date   -> Set the end date

4. To set the orbit details:
(a). orbit -> sets the Sentinel-1 (relative) orbit number
(b). orb_type -> sets the S1 orbit type here

5. res -> resolution in metres

6. scale -> download scale

