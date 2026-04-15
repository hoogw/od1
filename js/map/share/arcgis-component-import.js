

// dynamic import is async(return promise)
// case 1. even use "a w a i t     a r c g i s _ i m p o r t ()" also put it inside a s y n c function, sometime still cause module not define error,
// case 2. self-run this function, sometime still cause module not define error,
// case 3. use this function without await, will always cause module not define error,
// self-run
(async function arcgis_import(){ 


    
    esriConfig = await $arcgis.import("@arcgis/core/config.js");
    // keep here, do not place in a r c g i s _ c o m m o n, because only geocoding, search POI etc need key, without these, no need key
    esriConfig.apiKey = current_in_use_esriConfigaApiKey;
    geocodingServiceUrl = "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";
    apiKey = esriConfig.apiKey;



    // must at top to load first,
    request = await $arcgis.import("@arcgis/core/request.js");
    promiseUtils = await $arcgis.import("@arcgis/core/core/promiseUtils.js");

    

    // layer 
    
    // f e a t u r e    l a y e r     must use array [] for multiple export item  
    [FeatureLayer] = await $arcgis.import(["@arcgis/core/layers/FeatureLayer.js"]);
    GeoJSONLayer = await $arcgis.import("@arcgis/core/layers/GeoJSONLayer.js");
    ImageryLayer = await $arcgis.import("@arcgis/core/layers/ImageryLayer.js");
    

    
    

    //geometry
    Circle = await $arcgis.import("@arcgis/core/geometry/Circle.js");
    Graphic = await $arcgis.import("@arcgis/core/Graphic.js");
    GraphicsLayer = await $arcgis.import("@arcgis/core/layers/GraphicsLayer.js");
   
   
    // place poi
    places = await $arcgis.import("@arcgis/core/rest/places.js");
    FetchPlaceParameters = await $arcgis.import("@arcgis/core/rest/support/FetchPlaceParameters.js");
    PlacesQueryParameters = await $arcgis.import("@arcgis/core/rest/support/PlacesQueryParameters.js");
   

    // base-map 
    // these import must move to base map function 
    // because sometime, not always, get error as webTileLayer not available
    
    Field = await $arcgis.import("@arcgis/core/layers/support/Field.js");


    
    // sample  https://developers.arcgis.com/javascript/latest/sample-code/client-projection/                             
    SpatialReference = await $arcgis.import("@arcgis/core/geometry/SpatialReference.js");
    shapePreservingProjectOperator  = await $arcgis.import("@arcgis/core/geometry/operators/shapePreservingProjectOperator");
    

})(); // self-run





     
