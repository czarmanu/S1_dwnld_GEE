//*******************************************************************************
// S1_download_GRD_IW
//*******************************************************************************

// Purpose:
// This file downloads Sentinel 1 (GRD product, IW swath) 
// data (VV and VH polarisations only) mosaic 
// from a selected orbit (number and type should be known beforehand)
// for a selected region of interest (bounding box)

// Author:
// Manu Tom, 2024-

// Note: The data will ve downloaded to a folder in your google drive 


//*******************************************************************************
// Set the right parameters before running the code
//*******************************************************************************

// Bounding box parameters
var ROI_BB_TL = [70.18, 42.3] // Top Left coordinates (Longitude, Latitude)
var ROI_BB_BL = [70.18, 41.76] // Bottom Left coordinates (Longitude, Latitude) 
var ROI_BB_BR = [71.28, 41.76] // Bottom Right coordinates (Longitude, Latitude) 
var ROI_BB_TR = [71.28, 42.3] // Top Right coordinates (Longitude, Latitude) 

// coordinate system
var crs = 'EPSG:32642'

// dates
var start_date = '2021-05-01' // Set the start date here
var end_date   = '2021-11-01' // Set the end date here

// orbit details
var orbit = 151 // Set the Sentinel-1 (relative) orbit number here
var orb_type = 'DESCENDING' // set the S1 orbit type here
// options:
// 'DESCENDING': descending orbit
// 'ASCENDING': ascending orbit

var res = 10 // resolution in metres

var scale = 10 // download scale


//*******************************************************************************
// function definition
//*******************************************************************************

function mosaicByDate(imcol){
  
  var imlist = imcol.toList(imcol.size())
  print(imlist)

  var unique_dates = imlist.map(function(im){
    return ee.Image(im).date().format("YYYY-MM-dd")
  }).distinct()
  
  //print(unique_dates)
  var mosaic_imlist = unique_dates.map(function(d){
    d = ee.Date(d)
    var im = imcol
      .filterDate(d, d.advance(1, "day"))
      .mosaic()
    return im.set(
        "system:time_start", d.millis(), 
        "system:id", d.format("YYYY-MM-dd")
        )
  })

  return ee.ImageCollection(mosaic_imlist)
}


//*******************************************************************************
// Geometry definition
//*******************************************************************************

var region = 
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[ROI_BB_TL,
          ROI_BB_BL,
          ROI_BB_BR,
          ROI_BB_TR]], null, false);


//*******************************************************************************
// Overlay the ROI Bounding Box on the map.
//*******************************************************************************

Map.centerObject(region);
Map.addLayer(region, {color: 'FF0000'}, 'planar polygon');


//*******************************************************************************
//
//*******************************************************************************

var batch = require('users/fitoprincipe/geetools:batch') 

var imgVV = ee.ImageCollection('COPERNICUS/S1_GRD')
        .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
        .filter(ee.Filter.eq('instrumentMode', 'IW'))
        .filter(ee.Filter.eq('relativeOrbitNumber_start', orbit))
        .filterMetadata('resolution_meters', 'equals', res)
        .select('VV')
        .filterBounds(region)
        .filterDate(start_date, end_date);

var imgVH = ee.ImageCollection('COPERNICUS/S1_GRD')
        .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
        .filter(ee.Filter.eq('instrumentMode', 'IW'))
        .filter(ee.Filter.eq('relativeOrbitNumber_start', orbit))
        .filterMetadata('resolution_meters', 'equals', res)
        .select('VH')
        .filterBounds(region)
        .filterDate(start_date, end_date);


//*******************************************************************************
//
//*******************************************************************************

var vh = imgVH.filter(ee.Filter.eq('orbitProperties_pass', orb_type));
var vv = imgVV.filter(ee.Filter.eq('orbitProperties_pass', orb_type));

vh = mosaicByDate(vh)
vv = mosaicByDate(vv)

print(vh)
print(vv)


//*******************************************************************************
// Batch download to google drive 
//*******************************************************************************

var vh_folder_name = 'S1_lakes_mosaic_vh_'+orb_type+'_orb_'+orbit
var vv_folder_name = 'S1_lakes_mosaic_vv_'+orb_type+'_orb_'+orbit

batch.Download.ImageCollection.toDrive(vh, vh_folder_name, {
  name: '{system_date}', 
  scale: scale,
  crs: crs,
  region: region
});

batch.Download.ImageCollection.toDrive(vv, vv_folder_name, {
  name: '{system_date}', 
  scale: scale,
  crs: crs,
  region: region
});