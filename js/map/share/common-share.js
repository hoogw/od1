

// only for map ajax, can be longer time
var _timeout = 13000; 




var layerID_NAME_separator = ' &#x21E2; '


// default, 
var objectid_field_name = "OBJECTID" // FID ...

// token
var arcgis_online_token = ''           
var param_arcgis_online_token 



var ftOpacity = 0.7 // default

var current_geometryType

// only for init_globle_var()
var param_search
var param_select_level_1
var param_select_level_2
var param_select_level_3

var zoom_to_1st_feature = true;


var param_attachment_image_size
var attachment_image_width_small = 200  // arcgis server will always output 200, even you set w=150 
var attachment_image_width_medium = 600 // arcgis server will always output 600, even you set w=500
var attachment_image_width_large = 1080


var _total_count_of_feature = -2;
    var _current_count_of_feature = -1;

var ___bgurl
var ___bgprotocol
var ___bghostname
var ___bgpathname
var ___bgpathArray
var param_background_layer_url
var param_layer_id
var param_background_mapserver_url
var param_background_type
var param_filter_inVisibleViewOrOverall

var param_overlayOpacity
var param_symbolType  // only for color style   'native'( original ArcMap has whatever color, then default has same color) or  'customized'
var param_labelType    // only for label style   'native'( original ArcMap has label, then default has same label) or  'customized'

var param_strokeColor
var param_strokeWeight
var param_fillColor
var param_pointRadius
var param_outlinePattern
var param_simplefillPattern
var param_simpleMarker

var param_polygonFillBy
var param_click_or_hover
var param_zoom_to_feature_or_not
var param_filterType
var param_pagingFeatureTable
var param_dynamicLabel
var param_quantityFieldName 
var param_colorScale

var param_searchByField


var _center_radius_in_meter

var search_poi_keyword
var param_search_poi_keyword

var _current_location_input_text
var param_current_location_input_text 


  var your_google_api_key
  var param_your_google_api_key
  var your_esrilocation_key
  var param_your_esrilocation_key
  var your_microsoft_api_key
  var param_your_microsoft_api_key

// --- end --- only for init_globle_var()



var input_geocode_endpoint_url = ''
var param_input_geocode_endpoint_url = ''
var input_naserver_endpoint_url = ''
var param_input_naserver_endpoint_url = ''


var esri_dark_theme_white = '#adadad'  // esri dark theme white 
var esri_dark_theme_black = '#242424' // esri dark theme black 


//  --- zoom to feature or not radio button     --- 
var zoom_to_feature_or_not = 'zoom_to_feature'   // 'not_zoom2feature'
var default_zoom_level_for_point = 19
//  --- end  ---  zoom to feature or not radio button    --- 


  var default_opacity = 0.6
  var _opacity = default_opacity
  var param_opacity

  var widget_opacity = 0.91 // 0.7 for on-map widget, off-map, outside map widget must redefine to 0.97
  var param_widget_opacity

 var legend_position =  'outside_mapview' // 'on_mapview' // currently removed option for 'off'
 var printer_position =  'outside_mapview' // 'on_mapview' // currently removed option for 'off'

  var background_mapserver_url // = "https://gisportal.hrsa.gov/server/rest/services/AnalyzerTool/AnalyzerTool/MapServer"
  var layer_id // = 0
  var background_layer_url // = background_mapserver_url + '/' +  layer_id


        /**/
        // ----- feature layer -----  ----- 
        /**/
              var current_feature_rendered
              var total_feature_count
             
        /**/
        // ----- end  -----  feature layer -----  ----- 
        /**/


var original_color_or_yellow = 'yellow' // 'original_color'
var param_original_color_or_yellow


var options = {};
          
var input = {};



var layers_flat;


  var current_url;
  var current_pathname;
  var current_pathArray;
  var linkToPathname = "";
  
  
  var urlParams;
  var ___url_string;
  var ___portal_id;
  
  
  //var _center={"_center_lat": ... , "_center_long": ...};
  var _center={};
    
    
  
var page_size = 10;         // for search result only
var page_sources = [];
var page_size_valueList = 50;         // for value list only
var page_sources_valueList = [];

  // current window protocol is not reliable as true value, because, if mixed content(http img + https), chrome will automatically convert https to http, this cause all down stream template use wrong port
  // template port (http 3000, https 3200) should not binding with current window protocol, instead should binding to target url 
  // not use, but need here, old, history file will use it
    var ____current_window_protocol = window.location.protocol
    
 

  // for example target url = https://geohub.lacity.org,  template protocol should always be https, no matter what
  var template_protocol = 'https:'  // by default, later will adjust as template_protocol = _targetURL_protocol
 




 var  proxyurl_https = "https://transparentgov.net:7200/";
 var  proxyurl_http = "http://transparentgov.net:7000/";  

    
    
 var mouse_pointed_feature_highlight_handle 
 var mouse_pointed_graphic_highlight_handle
    

 var _selected_graphic_in_geojson
 

 

 var radiusMeterForSinglePOI = 30


/**/

                                                // --------- add proxy  --------- 
                                                              var ____current_window_protocol = window.location.protocol

                                                              // default http
                                                              var proxyurl = "http://transparentgov.net:7000/";  

                                                              console.log('____current_window_protocol', ____current_window_protocol)

                                                              if (____current_window_protocol == 'https:') {
                                                              
                                                                proxyurl = "https://transparentgov.net:7200/";
                                                                
                                                              }
                                                  // --------- end  ---------  add proxy  --------- 




/**/





                  /**/
                  // .. - .. - ... scan root or mapserver only   ... - .. - .. 
                  /**/                             
                  var scan_root_or_mapserver_only = 'scan_root'   // default 
                  var param_scan_root_or_mapserver_only                   
                                                  
                  /**/                           
                  // ... - .. - ..  end .. - .. - ... scan root or mapserver only    ... - .. - .. 
                  /**/






                  /**/
                  //  .. - .. - ... zoom to extent or 1st feature   ... - .. - .. 
                  /**/
                  var zoom_to_extent_or_1st_feature = 'zoom_to_1st_feature_of_this_layer'   // default 
                  var param_zoom_to_extent_or_1st_feature 
                  
                  /**/
                  //     ... - .. - ..  end .. - .. - ... zoom to extent or 1st feature    ... - .. - .. 
                  /**/



       
  // .....url parameter ..... global .......     
  var _organization = 'Arcgis Server';   
  var _center_lat = 33.9288;
  var param_center_lat
  var _center_long = -118.2468 ;
  var param_center_long
  var _center_zoom = 13;
  var param_center_zoom


  
  var ___url;
  var ___protocol  // this is means url paramter protocol  ?..&url=https://....
  var ___hostname 
  var ___pathname 
  var ___urlParams        
  var ___pathArray
  var ___service
  
  
  var _layer
  var _layer_id
  var _layer_name
  

var clicked_graphic_index
var current_queryFeatureResultsAsGraphic_length

							                /**/
                              // ----- color style setting ----- 
                              /**/  
        

                            //--------------- overwrite the mysql theme table id=yellow --------------------
                            /**/


                            // feature layer view higlight option  https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#HighlightOptions
                            var featureLayerView_higlightOption_fillColor = [255, 255, 255, 0.22]
                            var featureLayerView_higlightOption_haloColor =  [0,0,255, 0.95] //blue [244, 187, 68, 0.95] orange, not use this [223, 255, 0, 0.95]yellow 
                            var featureLayerView_higlightOption_haloOpacity = 0.9
                            var featureLayerView_higlightOption_fillOpacity = 0.6

                            // inactive is for easy find overlapping polygon, has thin black stroke line, gray tint fill, like default google geojson  
                            var _inactive_fillColor    =   'rgba(0,0,0,  0.2)';
                            var _inactive_fillOpacity    =  0.8  // must set 1,  because fill color channel '4' already has opacity value, if not set 1, will cause color not solid
                            var _inactive_strokeColor    =  'rgba(0,0,0, 0.95)';   //'black'
                            var _inactive_strokeWeight   =  1
                            var _inactive_pointRadius = 12 
                            var _inactive_pointRadius_px = '12px' // Simple Markerpoint size must be string format '100px'


                                        
                                  // always all time transparent
                                  var  _default_fillColor    =   'rgba(255, 255,255, 0)';   // hex code format NOT support transparency "#00FFFFFF" will not transparent.  
                                        
                                  // azure fill patthern, size must be 2,4, 8, 16, ..
                                  // https://learn.microsoft.com/en-us/javascript/api/azure-maps-control/atlas.polygonlayeroptions?view=azure-maps-typescript-latest#azure-maps-control-atlas-polygonlayeroptions-fillpattern
                                  var _default_fillPattern_svg = '<svg width="8px" height="8px" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg"><path d="M2 2v20h20V2zm19 6h-5V3h5zm-6-5v5H9V3zM3 9h5v6H3zm6 0h6v6H9zM8 3v5H3V3zM3 21v-5h5v5zm6-5h6v5H9zm12 5h-5v-5h5zm-5-6V9h5v6z"/><path fill="none" d="M0 0h24v24H0z"/></svg>'
                                  

                                  var   _default_fillOpacity    =  1  // must set 1,  because fill color channel '4' already has opacity value, if not set 1, will cause color not solid
                                  var   _default_strokeColor    =  'rgba(255,255,0, 0.95)';   //'yellow'
                                  var   _default_strokeWeight   =  2
                                  
                                  var   _highlight_color =       'rgba(255,0,0, 0.75)';   //'red'
                                  var   _highlight_color_for_esri = [255,0,0, 0.75];   //'red'
                                  var   _highlight_fillOpacity  =  0
                                  var   _highlight_strokeColor  =  'rgba(255,0,0, 0.75)';   //'red'
                                  var   _highlight_strokeWeight =  5
                                  
                                  var   _classfiy_color = 'rgba(0,0,255, 0.75)';   //'blue'
                                  var  _classfiy_fillOpacity   =  0
                                  var  _classfiy_strokeColor   =  'rgba(0,0,255, 0.65)';   //'blue'
                                  var   _classfiy_strokeWeight  =  8
                                  
                                  
                                  var  _font_size = "0.7em";  
                                  var  _thicker_wider_line_over_polygonOrPointOutline = 3

                                  var _default_pointStrokeOpacity = 0.8;

                                  var _default_pointRadius = 4 
                                  var _default_pointRadius_px = '4px' // Simple Markerpoint size must be string format '100px'
                                  
                                  var _highlight_pointRadius = 8  
                                  var _highlight_pointRadius_px = '8px' // Simple Markerpoint size must be string format '100px'
                            
                                  var _classfiy_pointRadius = 12; 
                                  var _classfiy_pointRadius_px = '12px' // Simple Markerpoint size must be string format '100px'
                            
                            
                            //--------------- End ------- overwrite the mysql theme table id=yellow --------------------
                            
 



                            /**/
                           // . . .. . map image layer click square box  . . .. .
                            var square_graphic
                            var square_graphic_geometry
                            var square_graphic_symbol = {
                                                            type: "simple-line", // autocasts as SimpleLineSymbol()
                                                            color: [226, 119, 40, 0.9],
                                                            width: 3,
                                                            style: "short-dot",  // https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleLineSymbol.html#style
                                                          };
                               
                           
                            var SWlong 
                            var SWlat 
                            var NElong 
                            var NElat 
                            var NW
                            var SW
                            var NE
                            var SE


                            //       - -  -  -  core 16x   - -  -  -
                            var NW_center_lat
                            var NW_center_long
                            var SE_center_lat
                            var SE_center_long


                            var square_graphic_southWest 
                            var square_graphic_southEast 
                            var square_graphic_northEast  
                            var square_graphic_northWest 

                            var zoom_adjust_by   
                            var buffer_tolerance_lat_degree
                            var buffer_tolerance_lng_degree
                            var lat_tolerance_degree_base = 0.000003 // 1 lat degree = 111.32km(always) = 111 319m, 0.0001 lat degree = 11m(always),   precision can tell different home address point. 
                            var lng_tolerance_degree_base = 0.000004 // 1 lng degree = 111km(at lat is 0, equator) = 0km (at lat 90, pole), 0.0001 lng degree = (between 11m - 0m, from equator-pole),   precision can tell different home address point. 
                                 // lat 45 degree, 1 lng degree is 5m, at lat 22.5 degree, 1 lng degree is 2.5m


                            //  . . .. . end . . .. . map image layer click square box  . . .. .
                             /**/
                            





          /**/
          //================================== renderer for graphic =================================================
          /**/


          //  - - - - - inactive   - - - - -
            // polygon
            var inactive_polygon_symbol = {
              type: "simple-fill",  // autocasts as new SimpleFillSymbol()
              color:   _inactive_fillColor,  
              outline: {  // autocasts as new SimpleLineSymbol()
                width: _inactive_strokeWeight,
                color: _inactive_strokeColor,
              }
          };
          // line
          var inactive_polyline_symbol =  {
              type: "simple-line",  // autocasts as new SimpleFillSymbol()
              color: _inactive_strokeColor,
              width: _inactive_strokeWeight
            // style: "short-dot"
          };
          // point
          var inactive_point_symbol = {
              type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
              style: "square",
              color: _inactive_fillColor,
              size: _inactive_pointRadius_px, // Simple Markerpoint size must be string format '100px'
              outline: {  // autocasts as new SimpleLineSymbol()
                  width: _inactive_strokeWeight,
                  color: _inactive_strokeColor,
              }
          };


          //  - - - - - default   - - - - -
            // polygon
            var polygon_symbol = {
                type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                color:   _default_fillColor,  
                outline: {  // autocasts as new SimpleLineSymbol()
                  width:    _default_strokeWeight, // extra 3 space char, for only polygon or point outline, not for polyline
                  color: _default_strokeColor,
                }
            };
            // line
            var polyline_symbol =  {
                type: "simple-line",  // autocasts as new SimpleFillSymbol()
                color: _default_strokeColor,
                width:_default_strokeWeight * _thicker_wider_line_over_polygonOrPointOutline,  // no space between, for line only, thicker, wider, by multiple  
              // style: "short-dot"
            };
            // point
            var point_symbol = {
                type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                style: "square",
                color: _default_fillColor,
                size: _default_pointRadius_px, // Simple Markerpoint size must be string format '100px'
                outline: {  // autocasts as new SimpleLineSymbol()
                    width:    _default_strokeWeight, // extra 3 space char, for only polygon or point outline, not for polyline
                    color: _default_strokeColor,
                }
            };



              //  - - - - - highlight  - - - - -
                    // polygon
                    var highlight_polygon_symbol = {
                      type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                      color: _classfiy_color, 
                      //style: "solid",
                      outline: {  // autocasts as new SimpleLineSymbol()
                        width: _classfiy_strokeWeight,
                        color: _classfiy_strokeColor, 
                      }
                    };
                    // line
                    var highlight_polyline_symbol =  {
                        type: "simple-line",  // autocasts as new SimpleFillSymbol()
                        color: _classfiy_strokeColor, 
                        width: _classfiy_strokeWeight
                      // style: "short-dot"
                    };
                    // point
                    var highlight_point_symbol = {
                        type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                        style: "square",
                        color: _classfiy_color,
                        size:  _classfiy_pointRadius_px, // Simple Markerpoint size must be string format '100px' 
                        outline: {  // autocasts as new SimpleLineSymbol()
                            width: _classfiy_strokeWeight,
                            color: _classfiy_strokeColor, 
                        }
                    };



              // highligh client-side featurelayer by override default featurelayer renderer  https://developers.arcgis.com/javascript/latest/sample-code/layers-featurelayer-collection/
              // overrides the layer's default renderer

              var highlight_polygon_renderer = {  // overrides the layer's default renderer
                                                  type: "simple",

                                                  // not work, not sure why, outline did not show, only show fill red color
                                                  //symbol: highlight_polygon_symbol,
                                                  // fixed, just copy highlight_polygon_symbol object to here
                                                  symbol:{
                                                            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                                                            color: _classfiy_color, //[51,51, 204, 0.4],
                                                            //style: "solid",
                                                            outline: {  // autocasts as new SimpleLineSymbol()
                                                              color: _classfiy_strokeColor, //"white",
                                                              width: _classfiy_strokeWeight,// 3
                                                            }
                                                          }
                                                  


                                                }

              var highlight_line_renderer = {  // overrides the layer's default renderer
                                                  type: "simple",  //simple renderer https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-SimpleRenderer.html
                                                  
                                                  symbol: highlight_polyline_symbol,
                                                  

              }


               var highlight_point_renderer = {  // overrides the layer's default renderer
                                                type: "simple",  //simple renderer https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-SimpleRenderer.html
                                                symbol: highlight_point_symbol,

                                                /* this is picture also works, but click may not work
                                                symbol: {
                                                  type: "text",
                                                  color: "#7A003C",
                                                  text: "\ue661",
                                                  font: {
                                                    size: 60,
                                                    family: "CalciteWebCoreIcons"
                                                  }
                                                }
                                                */


                                              }


          /**/
          //===============  end =================== renderer for graphic =================================================
          /**/

            //  . . .simple fill symbol style . . .

            
                var editor_dynamicLayers_array
                var dynamicLayers_array = {} // must define as object
          

                // REST api, symbol object https://developers.arcgis.com/rest/services-reference/enterprise/symbol-objects/
                var current_outlinePattern = 12  // solid  // esriSLSDash | esriSLSDashDot | esriSLSDashDotDot | esriSLSDot | esriSLSNull | esriSLSSolid
                var pattern_simpleLineSymbol_esriSLS_js_api_array = ['dash', 'dash-dot', 'dot', 'inside-frame', 'long-dash', 'long-dash-dot', 'long-dash-dot-dot', 'none', 'short-dash', 'short-dash-dot', 'short-dash-dot-dot', 'short-dot', 'solid']
                
                var current_simplefillPattern = 7  // esriSFSSolid // esriSFSBackwardDiagonal | esriSFSCross | esriSFSDiagonalCross | esriSFSForwardDiagonal | esriSFSHorizontal | esriSFSNull | esriSFSSolid | esriSFSVertica
                var pattern_simpleFillSymbol_esriSFS_js_api_array = ['backward-diagonal', 'cross', 'diagonal-cross', 'forward-diagonal', 'horizontal', 'none', 'solid', 'vertical']
        
                var current_simpleMarker = 3 // circle   //esriSMSCircle | esriSMSCross | esriSMSDiamond | esriSMSSquare | esriSMSX | esriSMSTriangle
                var simpleMarkerSymbol_esriSMS_array = ['circle', 'cross', 'diamond', 'square', 'x', 'triangle']

   

                var overlapIdentify_counter = -1
                var overlapIdentify_pattern_simpleFillSymbol_esriSFS_js_api_array = ['horizontal',  'vertical', 'forward-diagonal', 'backward-diagonal']
                var overlapIdentify_remainder_operand = overlapIdentify_pattern_simpleFillSymbol_esriSFS_js_api_array.length
                //  most of time, only use red, blue, yellow, which can have 12 layers overlap
                var overlapIdentify_color_array = ['rgba(255, 68, 51, 0.95)',   // red
                                                   'rgba(0, 0, 255, 0.95)',     // blue
                                                   'rgba(223, 255, 0, 0.95)',   // yellow

                                                   'rgba(250, 249, 246, 0.95)', // white,
                                                   'rgba(25, 25, 112, 0.95)',   // black,

                                                   'rgba(124, 252, 0, 0.95)',   // green, 
                                                   'rgba(191, 64, 191, 0.95)',   // purple, 
                                                   'rgba(255, 172, 28, 0.95)',   // orange,
                                                   'rgba(255, 182, 193, 0.95)',   // pink,
                                                  ]
            // . . . end . . . simple fill symbol style



 							                 /**/
                              // ----- end -----  color style setting ----- 
                              /**/  



 
  
  
  // scene view camera  https://developers.arcgis.com/javascript/latest/api-reference/esri-Camera.html#position
  var _tilt = 75;    // 0 look down, 90 look parallel to surface
  var _heading = 0;  // default is 0, heading north,  90 for east
  var _altitude = 1000;  // altitude in meters
  
  

  // font and color(must have)
  var _font_size              =  "0.7em"
    


    
  
  



var esri_system_managed_field_array = [
                      // possible field name in arcgis 
                      'oid','fid','objectid', 
                      'shape',                  
     ]




        /**/
        //------------ search feature --------
          var _feature_attributes =[];
          var _feature_attributes_string =[];
          var _feature_attributes_integer =[];
          var _feature_attributes_double =[];
          var _feature_attributes_date =[];
        //---------  End --- search feature --------


        var current_object_id_field_name ='OBJECTID'  

        // ... lunr.js  ... 
              var idx
              var lunr_index
              /*
                    ---In a shapefile, the 'FID' field contains the ObjectID, and the values start at zero.
                    ---In a geodatabase feature class or standalone table within a geodatabase, the 'OBJECTID' field contains the ObjectID, and the values start at one.
                    ---In a standalone dBase table, the 'OID' field contains the ObjectID, and the values start at zero.
                    if FID exist, use it, if not exist, try OID, , if not, try OBJECTID.
                    FID for shape file,
                    OBJECTID for geodatabase
                    OID for dBase table
              */  
              // case sensitive, arcgis usually use uppercase, socrata use lowercase, that is why we have all possible mix of uppercase and lowercase 
              var possible_idx_field_name_array = [
                                                    // possible field name in arcgis 
                                                    'OID','FID','OBJECTID',
                                                    'oid','fid','objectid', 
                                                    'Oid','Fid','Objectid',
                                                    'oID','fID','objectID',
                                                    'ObjectID',

                                                    // possible field name in socrata
                                                    'id', 'ID', 'Id'  
                                                  ]

              var idx_reference_field='lunr_id'; 
        //  ...  end ... lunr.js  ...  

          /**/
          //   *****  classified , filter by     *****
          
                                   

    var _supportsAdvancedQueries  = false;

    var _supportsCountDistinct  = false;
    var _supportsDistinct = false;
    var _supportsHavingClause = false;
    var _supportsOrderBy = false;
    var _supportsPagination = false;
    var _useStandardizedQueries = false;
    var _supportsStatistics = false;
    var _supportsTrueCurve = false;
    var _supportsReturningQueryExtent = false;
    var _supportsQueryWithDistance = false;

    var _supportsQueryWithResultType = false
                              
                              
                              
                var field_alias = {}
                var field_type = {}   // { 'date': 'calendar_date', 'rainfall_amount_inches': 'number',  'station':'text'   }
                var field_name = []   // [ 'date',                  'rainfall_amount_inches',            'station']
                var field_value = []
                var flatJson_item
                var fieldValue_flatjson
                var field_structure_flatjson = []


                var current_selected_field_type = 'text'
                var current_selected_field_name = 'showall'
                var current_selected_field_value = 'showall'
                var current_selected_field_name_tag_id = -2
                var current_selected_field_value_tag_id = -2


          //   *****  end     *****   classified , filter by     *****  



                        /**/
                        //  ... ... .. ... order by field name  ... ... .. ... 
                        /**/
                                
                        var field_name_order_by_alphabetic_ascending = []   // [ 'date',                  'rainfall_amount_inches',            'station']
                        var field_name_order_by_alphabetic_descending = []   // [ 'date',                  'rainfall_amount_inches',            'station']
                        var orderby_fieldname = 'orderby_fieldname_default'  // same as radio value 'orderby_fieldname_alphabetic_ascending'  'orderby_fieldname_alphabetic_descending'   
                        /**/
                        //  ... end ... ... .. ... order by field name  ... ... .. ...
                        /**/







              /**/
              //   ........... 18 color ...........

                            /* 18 color  from https://htmlcolorcodes.com/   

                            esri, color foramt "color":[51,51,51,255],  https://developers.arcgis.com/web-map-specification/objects/esriTS_symbol/
                              Color is represented as a four-element array. The four elements represent values for red, green, blue, and alpha in that order. Values range from 0 through 255. If color is undefined for a symbol, the color value is null.
                            rgba,    Alpha 0 - 255 ... where as alpha = 0 means - ---- completely transparent.  255 means complete opaque.
                            */
                          
                            var esri_rgba_color_array = [


                                          [0,0,0, 255],  // black
                                          [0, 0, 255, 255],  // blue
                                          [255, 0, 0, 255],   // red
                                          [0, 128, 0, 255],   // green
                                          [0, 0, 128, 255],   // navy
                                          [128, 0, 0, 255],   // Maroon
                                          [128, 0, 128, 255], // Purple
                                          [0, 128, 128, 255], // teal
                                          [255, 0, 255, 255], // Fuchsia
                                          [0, 255, 0, 255], // Lime
                                          [0, 255, 255, 255], // Aqua
                                                    

                                                    // popular color
                                                    [204, 204, 255, 255], // Periwinkle
                                                    [255, 191, 0, 255],   // Amber 
                                                    [159, 226, 191, 255],  // Seafoam Green
                                                    [100, 149, 237, 255],  // Cornflower Blue
                                                    [222, 49, 99, 255],    // Cerise
                                                    [64, 224, 208, 255],   // Turquoise
                                                    [255, 127, 80, 255],   // Coral
                                                    [223, 255, 0, 255],    // Chartreuse

                                          [255,255,255, 255],  // white
                                          [255,255,255, 0],  //nocolor
                                ]; 




                                var css_rgba_color_array = [


                                'rgba(0,0,0, 0.9)',  // black
                                'rgba(0, 0, 255, 0.9)',  // blue
                                'rgba(255, 0, 0, 0.9)',   // red
                                'rgba(0, 128, 0, 0.9)',   // green
                                'rgba(0, 0, 128, 0.9)',   // navy
                                'rgba(128, 0, 0, 0.9)',   // Maroon
                                'rgba(128, 0, 128, 0.9)', // Purple
                                'rgba(0, 128, 128, 0.9)', // teal
                                'rgba(255, 0, 255, 0.9)', // Fuchsia
                                'rgba(0, 255, 0, 0.9)', // Lime
                                'rgba(0, 255, 255, 0.9)', // Aqua


                                // popular color
                                'rgba(204, 204, 255, 0.9)',   // Periwinkle
                                'rgba(255, 191, 0, 0.9)',     // Amber 
                                'rgba(159, 226, 191, 0.9)',   // Seafoam Green
                                'rgba(100, 149, 237, 0.9)',   // Cornflower Blue
                                'rgba(222, 49, 99, 0.9)',     // Cerise
                                'rgba(64, 224, 208, 0.9)',    // Turquoise
                                'rgba(255, 127, 80, 0.9)',    // Coral
                                'rgba(223, 255, 0, 0.9)',     // Chartreuse

                                'rgba(255,255,255, 0.9)',  // white
                                'rgba(255,255,255, 0)',  //nocolor

                                ]; 


                                var color_name_array = [


                                  'Black',
                                  'Blue',
                                  'Red',
                                  'Green',
                                  'Navy',
                                  'Maroon',
                                  'Purple',
                                  'Teal',
                                  'Fuchsia',
                                  'Lime',
                                  'Aqua',
                                            

                                            // popular color
                                            'Periwinkle',
                                            'Amber', 
                                            'SeafoamGreen',
                                            'CornflowerBlue',
                                            'Cerise',
                                            'Turquoise',
                                            'Coral',
                                            'Chartreuse',

                                  'White',  
                                  'NoColor',          
                                ]; 

                  // ........... end  ........... 18 color ...........
                  /**/






                  /**/
                  //   --- --- --- --- color scale  --- --- --- ---
                  /**/



                  var esri_possible_numeric_field_type_array = ['esriFieldTypeBigInteger', 'esriFieldTypeDouble', 'esriFieldTypeInteger', 'esriFieldTypeSingle', 'esriFieldTypeSmallInteger']

                  // 5 class, element 0 is not used,
                  var line_stroke_weight = [1,2,5,10,15,20]
                  var point_marker_size_radius = [1,5,10,15,20,25]
                  
                                 
                  
                
                  var color_scale_outline_width = 1
                  var color_scale_outline_color = 'rgba(0,0,0, 0.9)'  // black


                  var color_scale_name_index = [
                      
                      'colorScale_red',
                      'colorScale_blue',
                      'colorScale_pink',
                      'colorScale_purple',
                      'colorScale_orange',
                      'colorScale_violet',
                      'colorScale_yellow',
                      'colorScale_slateblue',
                      'colorScale_green',
                      'colorScale_brown',
                      'colorScale_teal',
                      'colorScale_turquoise',
                      'colorScale_tan',
                      'colorScale_gray',

                  ];

                  var color_scale = {

                   
                    
                      
                      'colorScale_red': [
                              'rgba(255, 160, 122, 0.98)',   // LightSalmon
                              'rgba(250, 128, 114, 0.98)',   // Salmon
                              'rgba(205, 92, 92, 0.98)',   // IndianRed
                              'rgba(255, 0, 0, 0.98)',   // Red
                              'rgba(178, 34, 34, 0.98)',   // FireBrick
                              'rgba(139, 0, 0, 0.98)',   // DarkRed
                            ],


                      'colorScale_blue' :[
                              'rgba(135, 206, 250, 0.98)',   // LightSkyBlue
                              'rgba(135, 206, 250, 0.98)',   // LightSkyBlue
                              'rgba(0, 191, 255, 0.98)',   // DeepSkyBlue
                              'rgba(0, 0, 255, 0.98)',   // Blue
                              'rgba(0, 0, 169, 0.98)',   // DarkBlue
                              'rgba(0, 0, 98, 0.98)',   // Navy
                            ],



                      'colorScale_pink' :[
                                'rgba(255, 182, 193, 0.98)',   // LightPink
                                'rgba(255, 192, 203, 0.98)',   // Pink
                                'rgba(255, 105, 180, 0.98)',   // HotPink
                                'rgba(255, 20, 147, 0.98)',   // DeepPink
                                'rgba(219, 112, 147, 0.98)',   // PaleVioletRed
                                'rgba(199, 21, 133, 0.98)',   // MediumVioletRed
                              ], 


                     'colorScale_purple' :[
                                'rgba(230, 230, 250, 0.98)',   // Lavender
                                'rgba(230, 230, 250, 0.98)',   // Lavender
                                'rgba(221, 160, 221, 0.98)',   // Plum
                                'rgba(255, 0, 255, 0.98)',   // Fuchsia
                                'rgba(147, 112, 219, 0.98)',   // MediumPurple
                                'rgba(128, 0, 128, 0.98)',   // Purple
                              ],



                      'colorScale_orange' :[
                                    'rgba(255, 127, 80, 0.98)',   // Coral
                                    'rgba(255, 160, 122, 0.98)',   // LightSalmon
                                    'rgba(255, 165, 0, 0.98)',   // Orange
                                    
                                    'rgba(255, 140, 0, 0.98)',   // DarkOrange
                                    'rgba(255, 99, 71, 0.98)',   // Tomato
                                    'rgba(255, 69, 0, 0.98)',   // OrangeRed
                                  ],


                      'colorScale_violet' :[
                                    'rgba(230, 230, 250, 0.98)',   // Lavender
                                    'rgba(238, 130, 238, 0.98)',   // Violet
                                    'rgba(255, 0, 255, 0.98)',   // Fuchsia
                                    'rgba(138, 43, 226, 0.98)',   // BlueViolet
                                    'rgba(148, 0, 211, 0.98)',   // DarkViolet
                                    'rgba(75, 0, 130, 0.98)',   // Indigo
                                  ],

                 
                   'colorScale_yellow' :[
                                'rgba(255, 250, 205, 0.98)',   // LemonChiffon
                                'rgba(255, 255, 224, 0.98)',   // LightYellow
                                'rgba(240, 230, 140, 0.98)',   // Khaki
                                'rgba(255, 255, 0, 0.98)',   // Yellow
                                'rgba(255, 215, 0, 0.98)',   // Gold
                                'rgba(189, 183, 107, 0.98)',   // DarkKhaki
                              ],


                    'colorScale_slateblue' :[
                                  'rgba(230, 230, 250, 0.98)',   // Lavender
                                  'rgba(230, 230, 250, 0.98)',   // Lavender
                                  'rgba(255, 0, 255, 0.98)',   // Magenta
                                  'rgba(123, 104, 238, 0.98)',   // MediumSlateBlue
                                  'rgba(106, 90, 205, 0.98)',   // SlateBlue
                                  'rgba(72, 61, 139, 0.98)',   // DarkSlateBlue
                                ],

                      'colorScale_green' :[
                                  'rgba(144, 238, 144, 0.98)',   // LightGreen
                                  'rgba(144, 238, 144, 0.98)',   // LightGreen
                                  'rgba(0, 250, 154, 0.98)',   // MediumSpringGreen
                                  'rgba(60, 179, 113, 0.98)',   // MediumSeaGreen
                                  'rgba(0, 128, 0, 0.98)',   // Green
                                  'rgba(0, 100, 0, 0.98)',   // DarkGreen
                                ],

                      'colorScale_brown' :[
                                  'rgba(244, 164, 96, 0.98)',   // SandyBrown
                                  'rgba(244, 164, 96, 0.98)',   // SandyBrown
                                  'rgba(210, 105, 30, 0.98)',   // Chocolate
                                  'rgba(160, 82, 45, 0.98)',   // Sienna
                                  'rgba(165, 42, 42, 0.98)',   // Brown
                                  'rgba(128, 0, 0, 0.98)',   // Maroon
                                ],


                      'colorScale_teal' :[
                                  'rgba(0, 250, 154, 0.98)',   // MediumSpringGreen
                                  'rgba(0, 250, 154, 0.98)',   // MediumSpringGreen
                                  'rgba(102, 205, 170, 0.98)',   // MediumAquamarine
                                  'rgba(32, 178, 170, 0.98)',   // LightSeaGreen
                                  'rgba(0, 139, 139, 0.98)',   // DarkCyan
                                  'rgba(0, 98, 98, 0.98)',   // Teal
                                ],



                    

                     'colorScale_turquoise' :[
                                  'rgba(224, 255, 255, 0.98)',   // LightCyan
                                  'rgba(224, 255, 255, 0.98)',   // LightCyan
                                  'rgba(175, 238, 238, 0.98)',   // PaleTurquoise
                                  'rgba(64, 224, 208, 0.98)',   // Turquoise
                                  'rgba(0, 206, 209, 0.98)',   // DarkTurquoise
                                  'rgba(70, 130, 180, 0.98)',   // SteelBlue
                                ],


                    


                   'colorScale_tan' :[
                                  'rgba(255, 248, 220, 0.98)',   // Cornsilk
                                  'rgba(255, 248, 220, 0.98)',   // Cornsilk
                                  'rgba(245, 222, 179, 0.98)',   // Wheat
                                  'rgba(210, 180, 140, 0.98)',   // Tan
                                  'rgba(188, 143, 143, 0.98)',   // RosyBrown
                                  'rgba(139, 69, 19, 0.98)',   // SaddleBrown
                                ],



                   'colorScale_gray' :[
                                  'rgba(245, 245, 245, 0.98)',   // WhiteSmoke
                                  'rgba(245, 245, 245, 0.98)',   // WhiteSmoke
                                  'rgba(211, 211, 211, 0.98)',   // LightGray
                                  'rgba(169, 169, 169, 0.98)',   // DarkGray
                                  'rgba(112, 128, 144, 0.98)',   // SlateGray
                                  'rgba(47, 79, 79, 0.98)',   // DarkSlateGray
                                ],

                  }





                  /**/
                  //   --- --- end --- --- color scale  --- --- --- ---  
                  /**/





  /**/
  //   --- ---  --- --- e s r i C o n f i g . a p i K e y  --- --- --- ---  
  /**/

             
  // p a l m s p r i n g s a p i K e y
  //var current_in_use_esriConfigaApiKey = "AAPKbe65b7c5e8a24683919a9fa6f8b525efbL5O1P8mONb5ZUgR-tJGWJa6qDk1B_nPYWrR2gdLcJQb-JcKWTBUbeEUb8Zfte1y";
              
  // v i c t o r v i l l e
  var current_in_use_esriConfigaApiKey = "AAPK3004c40aeb344af78b019cba2ebbab17ZobssPoefVD6zUPBpyNX_pRjNU_Ol8vpU0at3jruLgpfmhgG_YeWfkZVSH-xlOz6"

  // h u n t i n g t o n p a r k  ( inuse key  expire 7/15/2035 )
  //var current_in_use_esriConfigaApiKey = 'AAPTxy8BH1VEsoebNVZXo8HurI8k1WhGeAOutUFRKKsZy85lj2DIQAe2OjCQh-tOgGrmobbuwxYLTjzDrG5EzjtOuGGR2wJR_Aa_RwahBKzBiIq9m7e3MPYzRRJGds25-tHsbW9ksA45s72iRbeb45G5M1_qvp5Ti00ckpVEGgy5x9ida4cpSFS9WZnFVJxr3jYtBIt4HSRrL8TKvQNJ3LjoVLfJmw6I0k2BnfcTkI0MJ9w.AT1_lq0Q5kHk'
  // h u n t i n g t o n p a r k, backup key, expire 7/15/2035
  //var current_in_use_esriConfigaApiKey =  'AAPTxy8BH1VEsoebNVZXo8HurI8k1WhGeAOutUFRKKsZy86drMsongHVkkwMF-HzWOJnKdRDz7J5WofJ6i-18oHDHyjie7qZ6zWoQTwTzd4zDGfNlixM74rhWD7yAB-rYcnJfJr6AKWMl1c_uZRvNJJI_PO8T-er45DUxp7nCfcl88Trkij7gIcOLF_uQ1zNN5GE20y_Qkda3UUkt_LNE9kVY-Fmau_WnCLzPN8uyshpmz8.AT1_9eLSMjiB'     



              // ( should not expire 6/1/2026 as long as renewed )
              var huntington_park_hppolice_esriConfigaApiKey ='AAPTxy8BH1VEsoebNVZXo8HurI8k1WhGeAOutUFRKKsZy85OkL4GG8sS5vgP3MHfpNrjVSQumczsy_7cQGNTCUwpul7P__ETB16L8p_aDSgLiVCS_1OS9hQ2BnA9qTOVHFn6RkySudTNEIHKG-_YaWYy9-JLoDC5SFiXqJKsXJgvGLKqurDjo7Vu9nQ-TOpFllHczIMRwLLWWpqyKGXKU_N7mdzs3UHBrld3vP8wqgw8Ifo.AT1_lq0Q5kHk'



              var nearmap_api_key = "nearmap api key" 
              //var nearmap_api_key = "ZWFkOGFhOTg. . . . . 0YTkxNTQ5"


              
              // each key subject to 500 request quota, if this key quota reached,
              // no matter how many key, all subject to 500 cap.
              // if you missing key, can go to location portal, api key item page, click generate secondary key button, or click re-generate key button
              
              //(hoogw2001, G2cg2h@40),
              // var esri_location_api_key = 'AAPTxy8BH1VEsoebNVZXo8HurP1XdWbhEQWgy-eia1C6qNR65QJ1N6ww2S3mIqnXz2VSFNw_iq7Ju5baSqPL5sDwKlk7ehym7A4FB-3Xyw2aKSBnb6VPoiQiW5BxApC6_fFPh39zn-KfFFzOtUHuV-2xZ7ZjnQLRzuVreH5Url8wvrbJzZX4TK8aAwvEpGxkxl6IrGxOsjTgkTz2waKyxc15CReqdUBnhk4SJ3kVbKmvfp41ACBGF48_r5ph4HL5btJ_AT1_Vg4RMRpo'
              var esri_location_api_key = 'AAPT85fOqywZsicJupSmVSCGriBmZSKeoedepYHKBMf9r68nWw1v39G-oBwvbeIwqc--8ATP9FD4uu1UUPA4T7LkK-UxoUVUkBFbvUhz5mrVENY-E73_p33XisU7mUP0hh5FPYaBhxl6RL2_G4e4gwNKFGa-31SZgpdkEzUOLnFSy1u_cz0Ii1Pmu5vuuNwuhYJFHlKxsSjhW6PW-5Hd6YpTTEDtG0AjwAZlNWDO2h60a3c.AT2_FLCViihn'
              
              // 500 free cap reached.(hppolice2, A3a#31). no matter what key generated, not working any more
              // future use (hoogw1, G2cg2h@40)


              
/**/
  //   --- --- end --- --- esriConfig.apiKey  --- --- --- ---  
  /**/








// sqaure
var mid_north
var mid_north_lat
var mid_north_lng

var mid_east
var mid_east_lat
var mid_east_lng

var mid_south
var mid_south_lat
var mid_south_lng

var mid_west
var mid_west_lat
var mid_west_lng

var zoom2diamondEdgeMeter = {
     22:4,
     21:6,
     20:8, 
     19:10,
     18:15,
     17:20,
     16:30,
     15:50,
     14:80,
     13:100,
     12:200,
     11:400,
     10:500,
     9:800,
     8:1200,
     7:1700,
     6:2300,
     5:300,
     4:3000,
     3:3000,
     2:3000,
     1:3000,
     0:3000,
}



var geojson_template = {
  type: "FeatureCollection",
  features: []
}
var geojson_feature_template = {
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": ["lng", "lat"]
  },
  "properties": {
    "name": "Dinagat Islands"
  }
}
var geojsonTemplateFeatures_array = []





  async function init_global_var(){
  
  
  //  .......... global var ..............
  
     
         // https://developer.mozilla.org/en-US/docs/Web/API/Location
  
          current_url = window.location.protocol + "//" + window.location.host + window.location.pathname;
  
          console.log('current_url ...... ',current_url);
          
          current_pathname = window.location.pathname;       //    /json2tree/arcgisServerList.html
          current_pathArray = current_pathname.split('/');   //    ["", "json2tree", "arcgisServerList.html"]
          
          
          
          
          
          
          //.......... for arcgisServerList.js only .......................
                // bug fix i start from 1 instead of 0, otherwise, has 2 //,  //json2tree/domain.html
                  for (i = 1; i < current_pathArray.length-1; i++) {
                    linkToPathname += "/";
                    linkToPathname += current_pathArray[i];
                  }
                 console.log('linkToPathname----',linkToPathname); 
          //.......... end ..............  for arcgisServerList.js only .......................
          
          
          
          
          
          
                    // ----- parse url param ?url=xxxxxxxxxx  --------

                             urlParams = new URLSearchParams(window.location.search);


                                                          
                            // token
                            // never use jquery in arcgis-common-js, because, arcgis/js3/featureTable.hmtl don't include jquery
                            param_arcgis_online_token = urlParams.get('arcgis_online_token'); 
                            if (param_arcgis_online_token){
                                                  //$('#arcgis_online_token_label').show()
                                                  //$('#arcgis_online_token').show()
                                                  if (document.getElementById("arcgis_online_token_label")){
                                                    document.getElementById("arcgis_online_token_label").style.display = "block";
                                                  }
                                                  if (document.getElementById("arcgis_online_token")){
                                                    document.getElementById("arcgis_online_token").style.display = "block";
                                                  }
                                                  
                                                  arcgis_online_token = param_arcgis_online_token
                                                  //$('#arcgis_online_token').html('&nbsp;&nbsp;<b>Arcgis Token</b> = <mark>' + arcgis_online_token + '</mark> <b>was used to access restricted content</b>')
                                                  if (document.getElementById("arcgis_online_token")){
                                                        document.getElementById("arcgis_online_token").innerHTML = '&nbsp;&nbsp;<b>Arcgis Token</b> = <mark>' + arcgis_online_token + '</mark> <b>was used to access restricted content</b>'
                                                  }
                              } else {
                              //$('#arcgis_online_token_label').hide()
                              //$('#arcgis_online_token').hide()
                              if (document.getElementById("arcgis_online_token_label")){
                                      document.getElementById("arcgis_online_token_label").style.display = "none";
                              }
                              if (document.getElementById("arcgis_online_token")){
                                      document.getElementById("arcgis_online_token").style.display = "none";
                              }
                              //$('#arcgis_online_token').html('&nbsp;&nbsp;No token was used, this content is <b>NOT</b> restricted, it is public')
                              //if (document.getElementById("arcgis_online_token")){
                                  //document.getElementById("arcgis_online_token").innerHTML = '&nbsp;&nbsp;No token was used, this content is <b>NOT</b> restricted, it is public'
                               //}
                            }




                              

                                                        
                              /**/
                              //  .. - .. - ... zoom 2 feature   ... - .. - .. 
                              /**/
                              var param_zoom2feature_noMoreThan = urlParams.get('zoom2feature_noMoreThan');
                              if (param_zoom2feature_noMoreThan){
                                                    console.log('use new zoom to feature no More Than from urlparam ',  param_zoom2feature_noMoreThan)
                                                    zoom2feature_noMoreThan = parseInt(param_zoom2feature_noMoreThan)
                              }

                              var param_zoom2feature_zoomLevel = urlParams.get('zoom2feature_zoomLevel');
                              if (param_zoom2feature_zoomLevel){
                                                    console.log('use new zoom to feature zoom Level from urlparam ',  param_zoom2feature_zoomLevel)
                                                    zoom2feature_zoomLevel = parseInt(param_zoom2feature_zoomLevel)
                              }  

                              var param_zoom2feature_yesNo = urlParams.get('zoom2feature_yesNo');
                              if (param_zoom2feature_yesNo){
                                                    console.log('use new zoom to feature yes no from urlparam ',  param_zoom2feature_yesNo)
                                                    zoom2feature_yesNo = param_zoom2feature_yesNo
                              } 
                            
                            /**/
                            //     ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - .. 
                            /**/
                            

                             

                              /**/
                              //  .. - .. - ... order by count or value for classified only   ... - .. - .. 
                              /**/

                              var param_orderby_count_or_value = urlParams.get('orderbycountorvalue');
                              if (param_orderby_count_or_value){
                                                    console.log('_orderby_count_or_value ',  param_orderby_count_or_value)
                                                    _orderby_count_or_value = param_orderby_count_or_value
                              } 

                              var param_distinct_or_groupby = urlParams.get('distinctorgroupby');
                              if (param_distinct_or_groupby){
                                                    console.log('_distinct_or_groupby ',  param_distinct_or_groupby)
                                                    _distinct_or_groupby = param_distinct_or_groupby
                              } 


                              /**/
                              //  .. - .. end  - ... order by count or value for classified only   ... - .. - .. 
                              /**/




                              /**/
                              //  ... ... .. ... order by field name  ... ... .. ... 
                              /**/

                              var param_orderby_fieldname = urlParams.get('orderbyfieldname');
                              if (param_orderby_fieldname){
                                                    console.log('param_orderby_fieldname ',  param_orderby_fieldname)
                                                    orderby_fieldname = param_orderby_fieldname
                              } 
                              /**/
                              //  ... end ... ... .. ... order by field name  ... ... .. ...
                              /**/





                             
                              /**/
                              //  ... ... .. ... search key word  ... ... .. ... 
                              /**/

                              param_search = urlParams.get('search');
                              if (param_search){ 
                                zoom_to_1st_feature = false
                              }
                              
                              /**/
                              //  ... end ... ... .. ... search key word  ... ... .. ...
                              /**/





                              /**/
                              //  --- POI point of interest search esri     --- 
                              /**/

                              param_search_poi_keyword = urlParams.get('poi');
                              console.log('url param param_search_poi_keyword',  param_search_poi_keyword)
                              if (param_search_poi_keyword){ 
                                search_poi_keyword = param_search_poi_keyword
                              }


                              param_category_string = urlParams.get('poicategory');
                              console.log('url param param_category_string',  param_category_string)
                              if (param_category_string){ 
                                _category_string = param_category_string
                                console.log("init global var, set poi category as : ", _category_string)
                              }

                              /**/
                              //  --- end  ---  POI point of interest search esri    --- 
                              /**/




                              /**/
                              //  --- use your key  --- 
                              /**/

                              // 1st time, one time
                              param_your_google_api_key = urlParams.get('yourGoogleKey'); 
                              if (param_your_google_api_key){
                                    $('#googlemap-key-input').val(param_your_google_api_key)
                                    your_google_api_key = param_your_google_api_key
                              }


                              // 1st time, one time
                              param_your_esrilocation_key = urlParams.get('youresrilocationkey'); 
                              if (param_your_esrilocation_key){
                                    $('#esrilocation-key-input').val(param_your_esrilocation_key)
                                    your_esrilocation_key = param_your_esrilocation_key
                              }

                              /**/
                              //  --- end  ---  use your key    --- 
                              /**/






                                /**/
                                // - - - search by field - - - 
                                /**/
                                param_searchByField = urlParams.get('searchByField');
                                /**/
                                // ... end ...  - - - search by field  - - -
                                /**/





                              /**/
                              //  ... ... .. ... select level 1 and 2  ... ... .. ... 
                              /**/

                              param_select_level_1 = urlParams.get('select_level1value');
                              param_select_level_2 = urlParams.get('select_level2value');
                              param_select_level_3 = urlParams.get('select_level3value');
                              if ((param_select_level_1) || (param_select_level_2) || (param_select_level_3)){ zoom_to_1st_feature = false}
                              /**/
                              //  ... end ... ... .. ... select level 1 and 2   ... ... .. ...
                              /**/

                              /**/
                              //  ... ... .. ...background layer url  ... ... .. ... 
                              /**/
                              
                              param_background_layer_url = urlParams.get('backgroundlayerurl');
                              if ((param_background_layer_url == undefined) || (param_background_layer_url == null) || (param_background_layer_url == '')){
                                  
                                  // nothing to do
                                  
                              }else{
                                  ___bgurl = new URL(param_background_layer_url);   // ?url=https://gisportal.hrsa.gov/server/rest/services/AnalyzerTool/AnalyzerTool/MapServer/0
                                  ___bgprotocol = ___bgurl.protocol; //   https:
                                  ___bghostname = ___bgurl.hostname; //    sampleserver3.arcgisonline.com
                                  ___bgpathname = ___bgurl.pathname; //    server/rest/services/AnalyzerTool/AnalyzerTool/MapServer/0
                                  ___bgpathArray = ___bgpathname.split('/');
     
                                  console.log('background layer url path array', ___bgpathArray )
     
                                    // https://gisportal.hrsa.gov/server/rest/services/AnalyzerTool/AnalyzerTool/MapServer/0  
                                   // ___pathArray = ["", "server", "rest", "services", "AnalyzerTool", "AnalyzerTool", "MapServer", '0']
                                   param_layer_id = ___bgpathArray.pop() // remove last element
                                   ___bgpathArray.shift();         // remove first element, which is empty ''
                                   param_background_mapserver_url = ___bgprotocol + '//' + ___bghostname + '/' + ___bgpathArray.join('/')
     
                                   console.log('param background mapserver url ', param_background_mapserver_url )
     
                             }// if     

                              /**/
                              //  ... end ... ... ... .. ...background layer url  ... ... .. ... 
                              /**/
                             
                             





                              /**/
                              // ----- image or tile -----  ----- 
                              /**/

                                param_background_type = urlParams.get('backgroundtype');

                              /**/
                              // ----- end  -----  image or tile -----  ----- 
                              /**/




                              /**/
                              // ----- opacity ----- widget ----- 
                              /**/
                              param_opacity  = urlParams.get('opacity');  
                              if (param_opacity){
                                _opacity = param_opacity
                              }
                              param_widget_opacity  = urlParams.get('widgetopacity');  
                              if (param_widget_opacity){
                                widget_opacity = param_widget_opacity
                              }
                              /**/
                              // ----- end  ----- opacity ----- widget ----- 
                              /**/



                             
                              /**/
                              // ----- color style setting ----- 
                              /**/  
                              param_symbolType = urlParams.get('symbolType');
                              param_labelType = urlParams.get('labelType');

                              param_overlayOpacity  = urlParams.get('overlayOpacity');  
                              param_strokeColor = urlParams.get('strokeColor');
                              param_strokeWeight = urlParams.get('strokeWeight');
                              param_fillColor = urlParams.get('fillColor');
                              param_pointRadius = urlParams.get('pointRadius');

                                //  . . .simple fill symbol style . . .
                                param_outlinePattern = urlParams.get('outlinePattern');
                                param_simplefillPattern = urlParams.get('simplefillPattern');
                                param_simpleMarker = urlParams.get('simpleMarker');
                                // . . . end . . . simple fill symbol style

                              //  . . .simple fill symbol style . . .
 
 
                                // . . . end . . . simple fill symbol style



                              /**/
                              // ----- end -----  color style setting ----- 
                              /**/  


                             


                            /**/
                            //  ---  uds only   --- 
                            /**/
                                  param_tool_type = urlParams.get('tooltype');
                              /**/
                            //  --- end  ---  uds only   --- 
                            /**/

                                           

                             /**/
                              //  ... ... .. ... geocode server endpoint url ... ... .. ... 
                              /**/

                              param_input_geocode_endpoint_url = urlParams.get('geocode');
                              if (param_input_geocode_endpoint_url){ 
                                input_geocode_endpoint_url = param_input_geocode_endpoint_url
                              }
                               // 1st time, one time
                              $("#geocode-server-url-input").val(input_geocode_endpoint_url)
          
                              /**/
                              //  ... end ... ... .. ... geocode server endpoint url  ... ... .. ...
                              /**/

                            


                              /**/
                              //  ... ... .. ... naserver endpoint url ... ... .. ... 
                              /**/

                              param_input_naserver_endpoint_url = urlParams.get('naserver');
                              if (param_input_naserver_endpoint_url){ 
                                input_naserver_endpoint_url = param_input_naserver_endpoint_url
                              }
                              // 1st time, one time
                              $("#naserver-url-input").val(input_naserver_endpoint_url)
                              
                              /**/
                              //  ... end ... ... .. ... naserver endpoint url  ... ... .. ...
                              /**/



                                /**/
                                // - - - filter in visible view oroverall - - - 
                                /**/
                                param_filter_inVisibleViewOrOverall = urlParams.get('filter_inVisibleViewOrOverall');

                                /**/
                                // ... end ...  - - - filter in visible view oroverall  - - -
                                /**/






                            /**/
                            // -- -- -- label and color  -- -- -- 

                            param_polygonFillBy = urlParams.get('polygonFillBy');
                            //. . . end  . . . -- -- -- label and color  -- -- -- 
                            /**/

                          

                            /**/
                            //  --- click or hover   --- 
                            /**/
                            param_click_or_hover = urlParams.get('clickorhover');

                            /**/
                            //  --- end  ---  click or hover   --- 
                            /**/



                                                        
                            /**/
                            //  --- zoom to feature or not radio button     --- 
                            /**/
                            param_zoom_to_feature_or_not = urlParams.get('zoomt2feature');


                            /**/
                            //  --- end  ---  zoom to feature or not radio button    --- 
                            /**/


                            /**/
                            //  --- original color or yellow   --- 
                            /**/
                            param_original_color_or_yellow = urlParams.get('original_color_or_yellow');

                            /**/
                            //  --- end  ---  original color or yellow   --- 
                            /**/






                            /**/
                            //  --- filter type   --- 
                            /**/
                            param_filterType = urlParams.get('filtertype');
                            /**/
                            //  --- end  ---  filter type   --- 
                            /**/
                            

                              /**/
                              //  --- feature table paging    --- 
                              /**/
                              param_pagingFeatureTable = urlParams.get('pagingfeaturetable');
                              /**/
                              //  --- end  ---  feature table paging    --- 
                              /**/


                            /**/
                            // -------------- attachment  --------------
                            /**/
                            param_attachment_image_size = urlParams.get('attachmentimagesize');
                           

                            /**/
                            //  -------------- end  -------------- attachment  --------------
                            /**/




                          /**/                 
                          // -- -- -- featurelayer clientside label  -- -- -- 
                          
                              param_dynamicLabel = urlParams.get('dynamicLabelField');
                         
                          //  -- -- --  end  -- -- -- featurelayer clientside label  -- -- --
                          /**/
                             





                            /**/
                            //   --- --- --- --- quantity color --- --- --- ---
                            /**/

                                param_quantityFieldName  = urlParams.get('quantityFieldName');
                                param_colorScale  = urlParams.get('colorScale');

                            /**/
                            //   --- --- end --- --- quantity color --- --- --- ---  
                            /**/




                  /**/
                  // .. - .. - ... scan root or mapserver only   ... - .. - .. 
                  /**/                             
                                                  
                  param_scan_root_or_mapserver_only = urlParams.get('rootormapserver');           
                  /**/                           
                  // ... - .. - ..  end .. - .. - ... scan root or mapserver only    ... - .. - .. 
                  /**/





                  /**/
                  //  .. - .. - ... zoom to extent or 1st feature   ... - .. - .. 
                  /**/
                  
                  param_zoom_to_extent_or_1st_feature = urlParams.get('zoom2ext1st');
                  
                  /**/
                  //     ... - .. - ..  end .. - .. - ... zoom to extent or 1st feature    ... - .. - .. 
                  /**/




                             
                             //.................. required parameter .................

                             
                                    _layer = urlParams.get('layer'); 
                                    _layer_id = urlParams.get('layer_id'); 
                                    _layer_name = urlParams.get('layer'); 
                                
                                    var param_cross = urlParams.get('cross'); 
                                    if (param_cross) {
                                                      _cross = param_cross
                                    } else {
                                                      _cross ='default' 
                                    }


                                   
                                   

                                    ___url_string = urlParams.get('url');  


                                    // only for arcgis portal item
                                    ___portal_id = urlParams.get('portal-id'); 





                                  // as long as url has lat,lng,zm, then do not pan to loc

                                  // esri lat lng can be a string,no need to convert to number
                                    param_center_lat = urlParams.get('_center_lat');  
                                    if (param_center_lat) {
                                       _center_lat = param_center_lat
                                       
                                       // as long as url has lat,lng,zm, then do not pan to loc
                                      
                                       zoom_to_1st_feature = false
                                    }
                                    param_center_long = urlParams.get('_center_long');  
                                    if (param_center_long) {
                                      _center_long = param_center_long
                                      
                                       // as long as url has lat,lng,zm, then do not pan to loc
                                      
                                      zoom_to_1st_feature = false
                                    }

                                    param_center_zoom = urlParams.get('_center_zoom');  
                                    if (param_center_zoom) {
                                      _center_zoom = param_center_zoom
                                      
                                       // as long as url has lat,lng,zm, then do not pan to loc
                                      
                                      zoom_to_1st_feature = false
                                    }


                                   // scene view camera
                                    _tilt = urlParams.get('tilt');
                                    _heading = urlParams.get('heading');
                                    _altitude = urlParams.get('altitude');


                                   
                             //.................. required parameter .................
                             
                             
                             
                             
                              _center={"_center_lat":_center_lat , "_center_long": _center_long};
                              
                             console.log('___url_string ......  ',___url_string)  
                             console.log('_center ......  ',_center)  
                                 
                                           
                         
      
      
      
      
                         if ((___url_string == undefined) || (___url_string == null) || (___url_string == ''))
                         {
                             
                             // nothing to do
                             
                         }else{
                              ___url = new URL(___url_string);   // ?url=https://sampleserver3.arcgisonline.com/ArcGIS/rest/services
                             base_url = ___url_string;

                             ___protocol = ___url.protocol; //   https:
                             ___hostname = ___url.hostname; //    sampleserver3.arcgisonline.com
                             ___pathname = ___url.pathname; //    /ArcGIS/rest/services
                             ___urlParams = new URLSearchParams(___url.search); //
                            

                            ___pathArray = ___pathname.split('/');


                               // https://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/GPServer    
                              // ___pathArray = ["", "arcgis", "rest", "services", "Mapping", "NavigateLA", "MapServer"]



                             // ___service = https://maps.lacity.org/arcgis/rest/services
                            ___service = ___protocol + '//' + ___hostname + '/' +  ___pathArray[1] + '/' +   ___pathArray[2] + '/' +   ___pathArray[3] 



                             /*
                              console.log(___url);
                              console.log(___protocol);
                              console.log(___hostname);
                             */ 
                              
                        }// if     
                 // ----- parse url param ?url=xxxxxxxxxx  --------







                          
                          // set html page title, on browser tab title
                          if (_layer) {
                            // $("#title").text(_layer)
                            // without jquery
                            document.getElementById("title").innerHTML = _layer;
                          }
                    





                          
                        // scene view camera
                        if ((_tilt) && (! isNaN(_tilt) )) {
                        } else {
                          _tilt = 75;    // 0 look down, 90 look parallel to surface
                        }

                        if ((_heading) && (! isNaN(_heading) )) {
                        } else {
                          _heading = 0;  // default is 0, heading north,  90 for east
                        }

                        if ((_altitude) && (! isNaN(_altitude) )) {
                        } else {
                          _altitude = 1000; 
                        }






  


                        console.log(' after initial globle var, zoom to layer depends on following param exist, search key words, lat, lng, zoom, select level 123, etc...', zoom_to_1st_feature)
  } // function 
  
  


  async function ajax_xml_string(_url){

    var xml_document;
    try{  

        xml_document = await $.ajax({
                        timeout:_timeout,  // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                        type: 'GET',
                        dataType: 'xml',
                        url: _url,
                        error: function (xml_error) {
                          console.log('xml_error ', xml_error)                                        
                        },                    
                        success: function (data) {                          
                        }
                    }); 
    } catch(xml_error){ 
                    console.log('catch xml error ', xml_error) 
    }// try - catch

    console.log( 'ajax xml_document response >>>>>  ', xml_document)

        const _xml_serializer = new XMLSerializer();
        var xml_string = _xml_serializer.serializeToString(xml_document);

    //console.log( 'serialize to xml_string >>>>>  ', xml_string)
    return xml_string
  }




  
/**/
//*************************   ajax arcgis server section ***********************************  
/**/

                      // Only for :  arcgis rest api type  ----- url + '?f=json' ----------- 
                      async function arcgis_ajax_cross_origin(_url, __cross_origin_method){

                        // Most of arcgis server support JSONP
                        // newer arcgis server support both JSONP + CORS
                        // some only support CORS, NOT JSONP



                        

                          // sample
                          // _url = 'http://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/MapServer'
                        
                          _url = _url + '?f=json';

                          // special for feature layer
                          //_url = _url + '&f=json';

                        

                          var _response_


                        switch(__cross_origin_method) {


                          case 'default':

                              _response_ = await ajax_jsonp_json_proxy(_url, _timeout)
                            

                            break;


                          case 'cors':
                              _response_ = await ajax_datatype_json(_url, _timeout)
                            break;


                            case 'jsonp':
                                _response_ = await ajax_jsonp_only(_url, _timeout)
                                break;


                          case 'proxy':
                              _response_ = await ajax_proxy_only(_url, _timeout)
                                    break;     

                          default:
                              _response_ = await ajax_jsonp_json_proxy(_url, _timeout)
                        }




                        return  _response_



                      }
           
                  
                      async function ajax_getjson(_url){

                          // this will be retired soon     
                            
                          // Most of arcgis server support JSONP
                          // newer arcgis server support both JSONP + CORS
                          // some only support CORS, NOT JSONP



                           // Only for :  arcgis rest api type  ----- url + '?f=json' -----------   
                           // fist try datatype:jsonp, if failed, try datatype:json (need cors)
                           // arcgis server rest api , usually support jsonp( because of old history reason), the newer version also support CORS.
                           
                           



                          // --------- ajax ___url_string response = input  -------------



                                                // ___url_string = 'http://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/MapServer'
                                                var ___url_getJson = _url + '?f=json';

                                                console.log('ajax-jsonp -> ',___url_getJson)   

                                               var input;


                                                try{  

                                                  input = await $.ajax({
                                                                    timeout:_timeout,  // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                                                                    type: 'GET',
                                                                    dataType: 'jsonp',
                                                                   
                                                                    url: ___url_getJson,
                                                                    
                                                                    
                                                                    error: function (jsonp_error_1) {
                                                                                                
                                                                      console.log('throw error event(ajax jsonp failed jsonp_error_1) ', jsonp_error_1)                                        
                                                                    },
                                                                                                
                                                                    success: function (data) {
                                                                      
                                                                    }
                                                                });                          


                                                    } catch(jsonp_error_2){ 

                                                                console.log('catch ( ajax jsonp failed jsonp_error_2 ) ', jsonp_error_2)    

                                                                // jsonp failed due to remote server does NOT support jsonp, try datatype:json (need cors)
                                                          

                                                                console.log('ajax-datatype:json-=======> ',___url_getJson)   
                                                                try {
                                                                
                                                                        // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                                                                        
                                                                        input = await $.ajax({
                                                                                                      timeout:_timeout,
                                                                                                      url:___url_getJson,

                                                                                                      dataType: 'json',


                                                                                                      success: function (data) {
                                                                                                        
                                                                                                      }, // success
                                                                                                      
                                                                                                      error: function (json_error_1) {
                                                                                                        
                                                                                                        console.log('throw error event (ajax datatype:json failed json_error_1)', json_error_1)                                        
                                                                                                      }
                                                                                                      
                                                                                                  });
                                                                    
                                                                    
                                                                    
                                                                    


                                                                  
                                                                } catch(json_error_2){
                                                                    
                                                                    
                                                                    // http://localhost:10/json2tree/searchlayer.html?url=https://maps.lacity.org/arcgis/rest/services
                                                                    // internal folder will failed both ajax call, jsonp and non-jsonp. must catch error.
                                                                    //The error is No 'Access-Control-Allow-Origin' header is present, but the problem is not that, 
                                                                    // the problem is internal folder is forbidden.

                                                                    
                                                                    console.log('catch( json_error_2 )', json_error_2)
                                                                    
                                                                   
                                                                    
                                                                }     
                                                            
                                                            
                                                            

                                              }// try - catch


                            
                         


                      return input
                      }// function 


                      // Only for our rest api,https://localhost:3200/restapi/rest_url?select=*&where=
                      //  without _url + '?f=json',  without jsonp
                      // return json, no need parse.
                      async function ajax_getjson_common(___url_getJson){
                        
                        console.log('ajax_getjson_common url is ',___url_getJson) 
                        var response
                        var error_response_json
                        
                        try{
                            response = await $.ajax({
                                    timeout:_timeout,
                                    type: "get",
                                    url:___url_getJson,
                                    

                                    success: function (data) { 
                                      console.log('ajax json success ', data)
                                      // return function here only return to ajax response, not return of this whole function
                                    }, // success



                                    error: function (jqXHR) {
                                      console.log('ajax json failed, jqXHR.responseJSON', jqXHR.responseJSON)
                                      // ajax failed, error
                                      error_response_json = jqXHR.responseJSON 
                                    }                                                                                              
                            });

                        } catch {

                          console.log('catch error for ajax_getjson_common ', error_response_json) 
                          return error_response_json
                        }


                        if (typeof response === 'object') {
                          // is object
                          return response 
                        } else {
                          // is string
                          return (JSON.parse(response))
                        }  
                         
                          
                      }

                      async function ajax_getjson_common_custom_timeout(___url_getJson, custom_timeout){
                        
                        console.log('ajax_getjson_common url is ',___url_getJson) 
                        var response
                        var error_response_json
                        
                        try{
                            response = await $.ajax({
                                    timeout: custom_timeout,
                                    type: "get",
                                    url:___url_getJson,
                                    

                                    success: function (data) { 
                                      console.log('ajax json success ', data)
                                      // return function here only return to ajax response, not return of this whole function
                                    }, // success



                                    error: function (jqXHR) {
                                      console.log('ajax json failed, jqXHR.responseJSON', jqXHR.responseJSON)
                                      // ajax failed, error
                                      error_response_json = jqXHR.responseJSON 
                                    }                                                                                              
                            });

                        } catch {

                          console.log('catch error for ajax_getjson_common ', error_response_json) 
                          return error_response_json
                        }


                        if (typeof response === 'object') {
                          // is object
                          return response 
                        } else {
                          // is string
                          return (JSON.parse(response))
                        }  
                      }



                      







                      function convert_to_json(response_string){

                        var response_json

                        if (typeof response_string === 'object') {
                          // is object
                          response_json = response_string
                        } else {
                            // is string
                            response_json = JSON.parse(response_string)
                        }

                        return response_json
                      }
/**/
//************* end ************   ajax arcgis server section ***********************************  
/**/



                      

/**/
// ======================== standard =========  ajax fetch general use ==============================
/**/
    
      async function ajax_datatype_json(___url_getJson, _custom_timeout){
            

            //dataType: "json" same as fetch, server must support CORS,
            // if server NOT support CORS, you have to use proxy to work around 

            //dataType: "json", the result is already json, no need to JSON.parse().

            // without dataType: "json", the result is string,  need to JSON.parse().




             console.log('ajax datatype json, (timeout) ',___url_getJson, _custom_timeout)   


             var input

        try{
      
                  input  = await $.ajax({
                  
                                              timeout: _custom_timeout,
                                              url: ___url_getJson,
                                              type : 'GET',

                                              error: function (json_error_1) {
                                                                                                        
                                                              console.log('ajax datatype:json json_error_1 ',json_error_1)  
                                                              
                                                            
                                                    },


                                              success: function (data) {
                                                //console.log('success back --> ', data);

                                              },


                                            dataType: "json"


                                            // jsonp only works for arcgis server whoever support JSONP, 
                                            // jsonp NOT works for any file json, or file geojson

                                            //dataType: "jsonp"  // not work for hub    /data.json
                                            

                                            }); // await

          

                                        
                                
                                          } catch(json_error_2){
                              
                              
                                            // http://localhost:10/json2tree/searchlayer.html?url=https://maps.lacity.org/arcgis/rest/services
                                            // internal folder will failed both ajax call, jsonp and non-jsonp. must catch error.
                                            //The error is No 'Access-Control-Allow-Origin' header is present, but the problem is not that, 
                                            // the problem is internal folder is forbidden.
              
                                            
                                            console.log('catch( json_error_2 )', json_error_2)
                                            
                                           
                                            // can't return whole error object, if return whole error object, must use catch to handle it later down stream. 
                                            var error_status = {
                                              errorFrom: 'ajax_datatype_json',
                                              readyState:json_error_2.readyState,
                                              responseJSON:json_error_2.responseJSON,
                                              status:json_error_2.status,
                                              statusText: json_error_2.statusText
                                            
                                            }
              
                                             return error_status
              
                                            
                                        }     




          return input
          


      }

      // No time out, general use, no prefix for url          
          // fetch with time out option 
      async function fetch_only(___url_getJson, _custom_timeout){
              

            console.log('fetch only ',___url_getJson)   


          // get raw json = input 
          /*  
            * bug fix: 
            * No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:10' is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
            * https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
            */



               
         /*  works, but this NOT await,    
           
         
          fetch(___url_getJson)
                     .then(function(response) {
                          return response.json();
                     })
                     .then(function(data) {

                                                 
                        console.log(data);

                        
                                                  
                        return data

                    });// fetch

           */ 


        // arcgis only, when domain not exist, fetch will error, must catch, return null

          try{
          
                    var  _resp_f = await fetch(___url_getJson);

                    return _resp_f


              } catch (error) {


                      console.log('fetch Error:', error);
                    return null

              }


      }

      async function ajax_jsonp_only(___url_getJson, _custom_timeout){
            

          // jsonp only work for arcgis server who support JSONP
          // jsonp NOT work for file .json, file .geojson or any file download 


          console.log('ajax jsonp only ',___url_getJson)   
          var input;


          try{  

          input = await $.ajax({
                              timeout:_custom_timeout,  // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                              type: 'GET',


                              dataType: 'jsonp',
                             
                              url: ___url_getJson,
                              
                             
                              error: function (jsonp_error_1) {
                                                                        
                                                                     
                                                              console.log('throw event , jsonp error 1   ', jsonp_error_1)

                                                          },
                                                          
                              success: function (data) {
                                 // console.log('jsonp success : ', data);

                                 
                              }
                          });                          


            }
        catch( jsonp_error_2 ){

         
                  console.log('catch jsonp error 2    ', jsonp_error_2)

                  var error_status = {

                    errorFrom: 'ajax_jsonp_only',
                    readyState:jsonp_error_2.readyState,
                    responseJSON:jsonp_error_2.responseJSON,
                    status:jsonp_error_2.status,
                    statusText: jsonp_error_2.statusText
                  
                  }

                  return error_status

        }// try - catch




      return input
      }// function 

      async function ajax_proxy_only(___url_getJson, _custom_timeout){
            

        //dataType: "json" same as fetch, server must support CORS,
        // if server NOT support CORS, you have to use proxy to work around 

        //dataType: "json", the result is already json, no need to JSON.parse().

        // without dataType: "json", the result is string,  need to JSON.parse().




         console.log('ajax proxy, (timeout) ',___url_getJson, _custom_timeout)   

         var _proxified_url = proxify_url(___url_getJson)


         console.log('try ajax proxy =======> ',  _proxified_url)  



         var input

    try{
  
              input  = await $.ajax({
              
                                          timeout: _custom_timeout,
                                          url: _proxified_url,
                                          type : 'GET',

                                          error: function (proxy_error_1) {
                                                                                                    
                                                          console.log('ajax proxy_error_1 ',proxy_error_1)  
                                                          
                                                        
                                                },


                                          success: function (data) {
                                            //console.log('success back --> ', data);

                                          },


                                        dataType: "json"


                                        // jsonp only works for arcgis server whoever support JSONP, 
                                        // jsonp NOT works for any file json, or file geojson

                                        //dataType: "jsonp"  // not work for hub    /data.json
                                        

                                        }); // await

      

                                    
                            
                                      } catch(proxy_error_1){
                          
                          
                                        // http://localhost:10/json2tree/searchlayer.html?url=https://maps.lacity.org/arcgis/rest/services
                                        // internal folder will failed both ajax call, jsonp and non-jsonp. must catch error.
                                        //The error is No 'Access-Control-Allow-Origin' header is present, but the problem is not that, 
                                        // the problem is internal folder is forbidden.
          
                                        
                                        console.log('catch( proxy_error_1 )', proxy_error_1)
                                        
                                       
                                        // can't return whole error object, if return whole error object, must use catch to handle it later down stream. 
                                        var error_status = {
                                          errorFrom: 'ajax_proxy_only',
                                          readyState:proxy_error_1.readyState,
                                          responseJSON:proxy_error_1.responseJSON,
                                          status:proxy_error_1.status,
                                          statusText: proxy_error_1.statusText
                                        
                                        }
          
                                         return error_status
          
                                        
                                    }     




      return input
      


      }
      
      function proxify_url(_target_url){


                              // fetch + proxy (bypass cors)

                              //  ****** cors ******

                                  // some site that doesn’t send Access-Control-*, our browser will block response as No 'Access-Control-Allow-Origin' header is present on the requested resource  
                                  // https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
                                  // we must add such header via this proxy
                                  //const proxyurl = "https://cors-anywhere.herokuapp.com/";

                                  //const proxyurl = "http://localhost:7000/";
                                  //const proxyurl = "https://localhost:7200/";


                var _proxified_target;


                if (_target_url.includes('https://')){

                          _proxified_target = proxyurl_https  + _target_url;
                } else{

                          _proxified_target = proxyurl_http + _target_url;  
                }


                return _proxified_target

      }
       
  



      // jsonp > json(cors)
        async function ajax_jsonp_json_proxy(___url_getJson, _custom_timeout){
            

            // jsonp > json(cors)  ,   good for arcgis server rest api

           // first try jsonp 
           //  if jsonp failed, catch and try  datatype:json
         

          

           // always with time out option 


          console.log('ajax cross is default, 3 try, jsonp,cors (timeout)', _custom_timeout ,___url_getJson)   
          var input;


          try{  

            input = await $.ajax({
                              timeout:_custom_timeout,  // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                              type: 'GET',
                              dataType: 'jsonp',
                             
                              url: ___url_getJson,
                              
                              
                              error: function (jsonp_error_1) {
                                                          
                                console.log('throw error event(ajax jsonp failed jsonp_error_1) ', jsonp_error_1)                                        
                              },
                                                          
                              success: function (data) {
                                
                              }
                          });                          


              } catch(jsonp_error_1){ 

                          console.log('catch ( ajax jsonp failed jsonp_error_2 ) ', jsonp_error_1)  
                          
                          // not return error yet, because we will try datatype:jsonp

                          // jsonp failed due to remote server does NOT support jsonp, try datatype:json (need cors)
                    

                          console.log('ajax-datatype:json-=======> ',___url_getJson)   
                          try {
                          
                                  // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                                  
                                  input = await $.ajax({
                                                                timeout: _custom_timeout,
                                                                url:___url_getJson,

                                                                dataType: 'json',


                                                                success: function (data) {
                                                                  
                                                                }, // success
                                                                
                                                                error: function (json_error_2) {
                                                                  
                                                                  console.log('throw error event (ajax datatype:json failed json_error_2)', json_error_2)                                        
                                                                }
                                                                
                                                            });
                              
                              
                              
                              


                            
                          } catch(json_error_2){
                              
                              
                              // http://localhost:10/json2tree/searchlayer.html?url=https://maps.lacity.org/arcgis/rest/services
                              // internal folder will failed both ajax call, jsonp and non-jsonp. must catch error.
                              //The error is No 'Access-Control-Allow-Origin' header is present, but the problem is not that, 
                              // the problem is internal folder is forbidden.

                              
                              console.log('catch( json_error_2 )', json_error_2)
                              
                             

                              
                          } // try datatype:json   2
                      
                      
                      

        } // try jsonp 1






      return input
      }// function 






      async function ajax_json_proxy(___url_getJson, _custom_timeout){
            

          //  try, json ,  good for hub  /data.json


        // first try json 
    

       

        // always with time out option 


       console.log('ajax json  ',___url_getJson)   
       var input;


       try{  

         input = await $.ajax({
                           timeout:_custom_timeout,  // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                           type: 'GET',
                           dataType: 'json',
                          
                           url: ___url_getJson,
                           
                           
                           error: function (json_error_1) {
                                                       
                             console.log('throw error event(ajax json failed json_error_1) ', json_error_1)                                        
                           },
                                                       
                           success: function (data) {
                             
                           }
                       });                          


           } catch(json_error_1){ 

                       console.log('catch ( ajax jsonp failed jsonp_error_1 ) ', json_error_1)  
                       
                          
     }// try - catch






   return input
   }// function 

      
/**/
// ==============   end ========== ajax fetch general use ==============================
/**/




                                       
                        function update_url_parameter(_field, _value){
                                      
                          var _____searchParams = new URLSearchParams(window.location.search);

                          if ((_value !== 0) && ((_value == null) || (_value == '') || (_value.length == 0)) ){
//if (_value.length == 0){   // layer id could be 0,  (0 == null) (0 == '') are all true, I actually want it be false since 0 is a valid layer id.  undefined/null or empty string is invalid layer id. so use  (layer-id.length == 0)
                                   // remove this param from uRL
                                      _____searchParams.delete(_field);
                                      console.log("delete url parameter(field)-->", _field );
                          } else {
                                  // update this param from uRL
                                      _____searchParams.set(_field, _value);
                                      console.log("update url parameter(field=value)-->", _field + "="+ _value);
                          }

                          // this cause reload  https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
                          //window.location.search = searchParams.toString();

                          // instead avoid reload
                          var _____newRelativePathQuery = window.location.pathname + '?' + _____searchParams.toString();
                          history.replaceState(null, '', _____newRelativePathQuery);

                            // ...  ... ... share url  ...  ... ...
                            $('#share_url').val(window.location.href);
                            // ... end ... ... share url  ...  ... ...
                            /**/
                  }  





                  function isValidHttpUrl(string) {
                    let url;
                    
                    try {
                      url = new URL(string);
                    } catch (_) {
                      return false;  
                    }

                    return url.protocol === "http:" || url.protocol === "https:";
                  }






                        function update_center_latLngZoom_esri(view){

                             // var _map_center_point = view.center 

                          var center_latLng = view.center;   // local variable
                          _center_lat = center_latLng.latitude;     // global variable 
                          _center_long = center_latLng.longitude;    // global variable 
                          _center_zoom = parseInt(view.zoom);          // global variable 

                          console.log(' -------- update  -------- center  -------- lat  -------- Lng  -------- Zoom  -------- ', _center_lat, _center_long, _center_zoom)
                          

                          if ('URLSearchParams' in window) {
                            var searchParams = new URLSearchParams(window.location.search);
                            searchParams.set("_center_lat", _center_lat);
                            searchParams.set("_center_long", _center_long);
                            searchParams.set("_center_zoom", _center_zoom);
                            searchParams.set("panto", 0);

                            // this cause reload  https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
                            //window.location.search = searchParams.toString();

                            // instead avoid reload
                            var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
                            history.replaceState(null, '', newRelativePathQuery);
                            
                            }// if

                            var _latlngzoom_html = ''
                            //_latlngzoom_html +='visible area : '
                            _latlngzoom_html += 'center(lat:' + _center_lat.toFixed(3)
                            _latlngzoom_html += ',lng:' + _center_long.toFixed(3) + ')'
                            _latlngzoom_html += ',zoom:' + _center_zoom
                            $("#lat-lng-zoom").html(_latlngzoom_html)

                        }



                        function update_center_latLngZoom_esri_component(arcgis_map_component){

                          console.log('update center latLngZoom esri component',  arcgis_map_component)

                          
                           console.log('update center latLngZoom esri component center',  arcgis_map_component.center)
                          _center_lat = arcgis_map_component.center.latitude;     // global variable 
                          _center_long = arcgis_map_component.center.longitude;    // global variable 
                          _center_zoom = parseInt(arcgis_map_component.zoom);          // global variable 

                          console.log(' -------- update  -------- center  -------- lat  -------- Lng  -------- Zoom  -------- ', _center_lat, _center_long, _center_zoom)
                          

                          if ('URLSearchParams' in window) {
                            var searchParams = new URLSearchParams(window.location.search);
                            searchParams.set("_center_lat", _center_lat);
                            searchParams.set("_center_long", _center_long);
                            searchParams.set("_center_zoom", _center_zoom);
                            searchParams.set("panto", 0);

                            // this cause reload  https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
                            //window.location.search = searchParams.toString();

                            // instead avoid reload
                            var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
                            history.replaceState(null, '', newRelativePathQuery);
                            
                            }// if

                            var _latlngzoom_html = ''
                            //_latlngzoom_html +='visible area : '
                            _latlngzoom_html += 'center(lat:' + _center_lat.toFixed(3)
                            _latlngzoom_html += ',lng:' + _center_long.toFixed(3) + ')'
                            _latlngzoom_html += ',zoom:' + _center_zoom
                            $("#lat-lng-zoom").html(_latlngzoom_html)

                        }





        /**/
        // ----- feature layer -----  ----- 
        /**/

            
              function update_statistic_info(rendered, total){

                console.log(' update statistic info', rendered, total  )

                if (isNaN(rendered)){ rendered = '...' } // not available...
                if (isNaN(total)){ rendered = '...' } // not available...

                var statistic_info_html = '<b style="font-size:96px; color:yellow; text-shadow:5px 5px 5px #000000">' + rendered + '</b>' + '<span style="font-size:48px; color:white; text-shadow:1px 1px 1px #000000"> / ' + total + '</span>'

                $('#statistic_info').html(statistic_info_html)
                $('#statistic_info').show()
              }



              

              async function ajax_try_jsonp_cors_proxy_return_json_object(_custom_url){

                var _return_json_object
                console.log('ajax try jsonp cors proxy return json object',_custom_url)

               

                try {


                  // test only
                  // throw ' ++++++++ test only ++++++++ jsonp failed';


                  // jsonp 


                  var response_string =  await $.ajax({


                  
                                            type: 'GET',
                                            dataType: 'jsonp',
                                            data: {},
                                            url: _custom_url,
                                            error: function (jqXHR, textStatus, errorThrown) {
                                              
                                                                    var _error_status = textStatus + ' : ' + errorThrown;         
                                                                    console.log('ajax error  + ', _error_status);
                                                                
                                            },
                                            success: function (data) {
                                              console.log('ajax try jsonp cors proxy return json object --> jsonp --> success  --> ');
                                            }
                                          });  // await



                
                } catch(jsonp_failed) {


                          console.log('ajax try jsonp cors proxy return json object  --> jsonp failed !!!!!!', jsonp_failed);

                        try {

                                      



                                        // test only
                                        // throw ' ++++++++ test only ++++++++ cors failed'; 
                        
                                        // cors
                                        var response_string =  await $.ajax({
                                          type: 'GET',
                                        
                                          url: _custom_url,
                                          error: function (jqXHR, textStatus, errorThrown) {
                                            
                                                                  var _error_status = textStatus + ' : ' + errorThrown;         
                                                                  console.log('ajax error  + ', _error_status);
                                                              
                                          },
                                          success: function (data) {
                                            console.log('ajax try jsonp cors proxy return json object --> cors --> success  --> ');
                                          }
                                        });  // await




                                          
                            
                        } catch(cors_failed) {

                                                    console.log('ajax try jsonp cors proxy return json object  --> cors failed !!!!!!', cors_failed);

                                                    try {

                                                              

                                                              // proxy
                                                              // --------- add proxy  ---------
                                                              var _custom_url_proxy = proxyurl +  _custom_url

                                                              var response_string =  await $.ajax({
                                                                type: 'GET',
                                        
                                                                url: _custom_url_proxy,
                                                                error: function (jqXHR, textStatus, errorThrown) {
                                                                  
                                                                                        var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                        console.log('ajax error  + ', _error_status);
                                                                                    
                                                                },
                                                                success: function (data) {
                                                                  console.log('ajax try jsonp cors proxy return json object --> proxy --> success  --> ');
                                                                }
                                                              });  // await




                                                            } catch(proxy_failed) {


                                                              console.log('ajax try jsonp cors proxy return json object  --> proxy failed !!!!!!', proxy_failed);
                                                              return {'error':'ajax jsonp cors proxy all 3 failed'}
                                                            
                
                
                                                            } // catch proxy
                                                      
                
                                              } // catch cors
                
                
                } // catch jsonp

                

                // fix SyntaxError: Unexpected token o in JSON at position 1 at JSON.parse (<anonymous>)                      
                //is already a plain JavaScript object; no need to try to parse it.
                
                if (typeof response_string === 'object') {
                    // is object
                    _return_json_object = response_string
                } else {
                    // is string
                    _return_json_object = JSON.parse(response_string)
                }

                console.log(' ajax try jsonp cors proxy return json object  ---- ', _return_json_object)
                return _return_json_object
              }


              var spatial_reference
              var _featurelayerJSON; 
              var _feature_attributes  
              
              var maxRecordCount
              var standardMaxRecordCount
              var tileMaxRecordCount
              var standardMaxRecordCountNoGeometry
              var maxRecordCountFactor
              async function get_feature_attributes(_url, layerID){

                // must reset field name, when switch layers
                field_name = []

                try {
                                  // http://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/MapServer/333?f=pjson
                                  // layer_id is 333, 
                                  var _url_layer = _url + '/'+  layerID + '?f=pjson'


                                  // token
                                  //console.log('arcgis_online_token = = =',  arcgis_online_token)
                                  if (arcgis_online_token){
                                    _url_layer += '&token=' + arcgis_online_token
                                  }



                                  console.log('get feature attributes url layer -layerID-:',layerID, _url_layer)

                                
                                  try {
                                      // jsonp 
                                      var response_string =  await $.ajax({
                                                                type: 'GET',
                                                                dataType: 'jsonp',
                                                                data: {},
                                                                url: _url_layer,
                                                                error: function (jqXHR, textStatus, errorThrown) {
                                                                                        var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                        console.log('ajax error  + ', _error_status);
                                                                },
                                                                success: function (data) {
                                                                  console.log('get feature attributes , layer json --> jsonp --> success  --> ');
                                                                }
                                                              });  // await
                                    } catch(jsonp_failed) {
                                              console.log('get feature attributes , layer json  --> jsonp failed !!!!!!', jsonp_failed);
                                              try {
                                                            // cors
                                                            var response_string =  await $.ajax({
                                                              type: 'GET',
                                                              url: _url_layer,
                                                              error: function (jqXHR, textStatus, errorThrown) {
                                                                                      var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                      console.log('ajax error  + ', _error_status);
                                                              },
                                                              success: function (data) {
                                                                console.log('get feature attributes , layer json --> cors --> success  --> ');
                                                              }
                                                            });  // await
                                            } catch(cors_failed) {
                                                                        console.log('get feature attributes , layer json  --> cors failed !!!!!!', cors_failed);
                                                                        try {
                                                                                  // proxy
                                                                                  // --------- add proxy  ---------
                                                                                  var _url_layer_proxy = proxyurl +  _url_layer
                                                                                  var response_string =  await $.ajax({
                                                                                    type: 'GET',
                                                                                    url: _url_layer_proxy,
                                                                                    error: function (jqXHR, textStatus, errorThrown) {
                                                                                                            var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                            console.log('ajax error  + ', _error_status);
                                                                                                        
                                                                                    },
                                                                                    success: function (data) {
                                                                                      console.log('get feature attributes , layer json --> proxy --> success  --> ');
                                                                                    }
                                                                                  });  // await
                                                                        } catch(proxy_failed) {
                                                                                  console.log('get feature attributes , layer json  --> proxy failed !!!!!!', proxy_failed);
                                                                        } // catch proxy
                                                                  } // catch cors
                                    
                                    } // catch jsonp

                                   
                                    // fix SyntaxError: Unexpected token o in JSON at position 1 at JSON.parse (<anonymous>)                      
                                    //is already a plain JavaScript object; no need to try to parse it.
                                    if (typeof response_string === 'object') {
                                        // is object
                                        _featurelayerJSON = response_string
                                    } else {
                                        // is string
                                        _featurelayerJSON = JSON.parse(response_string)
                                    }
                                    console.log(' get feature attributes, advanced query support   ====  _featurelayerJSON', _featurelayerJSON)


/*
   arcgis server always response error message as 
                                                 { error:
                                                        code: 400
                                                        details: []
                                                        message: "Invalid URL
                                                 } 
*/
if (_featurelayerJSON.error) {
                                throw _featurelayerJSON.error.message;
}
                                                  
standardMaxRecordCount = _featurelayerJSON.standardMaxRecordCount
tileMaxRecordCount = _featurelayerJSON.tileMaxRecordCount
standardMaxRecordCountNoGeometry = _featurelayerJSON.standardMaxRecordCountNoGeometry
maxRecordCountFactor = _featurelayerJSON.maxRecordCountFactor
maxRecordCount = _featurelayerJSON.maxRecordCount

                                    _supportsAdvancedQueries  =  _featurelayerJSON.supportsAdvancedQueries
                                    _supportsStatistics       =  _featurelayerJSON.supportsStatistics

                                    if (_featurelayerJSON.hasOwnProperty('advancedQueryCapabilities')){
                                            _supportsCountDistinct  = _featurelayerJSON.advancedQueryCapabilities.supportsCountDistinct
                                            _supportsDistinct       = _featurelayerJSON.advancedQueryCapabilities.supportsDistinct
                                            _supportsHavingClause   = _featurelayerJSON.advancedQueryCapabilities.supportsHavingClause
                                            _supportsOrderBy        = _featurelayerJSON.advancedQueryCapabilities.supportsOrderBy
                                            _supportsPagination     = _featurelayerJSON.advancedQueryCapabilities.supportsPagination
                                            _useStandardizedQueries = _featurelayerJSON.advancedQueryCapabilities.useStandardizedQueries
                                            _supportsStatistics     = _featurelayerJSON.advancedQueryCapabilities.supportsStatistics
                                            _supportsTrueCurve      = _featurelayerJSON.advancedQueryCapabilities.supportsTrueCurve
                                            _supportsReturningQueryExtent = _featurelayerJSON.advancedQueryCapabilities.supportsReturningQueryExtent
                                            _supportsQueryWithDistance = _featurelayerJSON.advancedQueryCapabilities.supportsQueryWithDistance
                                                        _supportsQueryWithResultType = _featurelayerJSON.advancedQueryCapabilities.supportsQueryWithResultType
                                    }  


                                   
                                   if (_featurelayerJSON.hasOwnProperty("extent")){
                                    spatial_reference = _featurelayerJSON.extent.spatialReference.wkid
                                   }

                                   if (_featurelayerJSON.hasOwnProperty("fullExtent")){
                                    spatial_reference = _featurelayerJSON.fullExtent.spatialReference.wkid
                                   }

                                   if (_featurelayerJSON.hasOwnProperty("initialExtent")){
                                    spatial_reference = _featurelayerJSON.initialExtent.spatialReference.wkid
                                   }


                                    // warning:  .fields can be null, if layer is only raster image  
                                    if (_featurelayerJSON.hasOwnProperty('fields')){
                                                          _feature_attributes = _featurelayerJSON.fields
                                                          var arrayLength = _feature_attributes.length;

                                                          for (var i = 0; i < arrayLength; i++) {

                                                                  var ____fieldAlias = _feature_attributes[i].alias
                                                                  var ____fieldType = _feature_attributes[i].type
                                                                  var ____fieldName = _feature_attributes[i].name
                                                                  var ____fieldName_lowerCase  = ____fieldName.toLowerCase();
                                                                  var ____fieldType_lowerCase  = ____fieldType.toLowerCase();
                                                                  var ____fieldAlias_lowerCase  = ____fieldAlias.toLowerCase();
                                                                                                      
                                                                  if (                                              
                                                                                                        // skip geometry field "SHAPE", "SHAPE.LEN", "SHAPE.AREA"
                                                                                                        (____fieldName_lowerCase.includes('shape') ) ||
                                                                                                        (____fieldType_lowerCase.includes('geometry') ) ||

                                                                                                        // skip all ID field , esriFieldTypeOID | esriFieldTypeGlobalID | esriFieldTypeGUID  
                                                                                                        (____fieldType_lowerCase.includes('id') )  ||
                                                                                                        (____fieldName_lowerCase.includes('fid') ) ||
                                                                                                        (____fieldName_lowerCase.includes('oid') ) ||
                                                                                                        (____fieldName_lowerCase.includes('objectid') ) ||
                                                                                                        (____fieldName_lowerCase.includes('guid') ) ||
                                                                                                        (____fieldName_lowerCase.includes('globalid') ) ||

                                                                                                        // skip below field
                                                                                                        (____fieldType_lowerCase.includes('raster') )  ||
                                                                                                        (____fieldType_lowerCase.includes('blob') )  ||
                                                                                                        (____fieldType_lowerCase.includes('xml') )

                                                                  ){ 
                                                                                // skip esri geometry, shape, object-id,etc.. field
                                                                  } else {  
                                                                                    field_name.push(____fieldName)
                                                                                    // not use 0,1,2, as index key, 
                                                                                    //field_type.push(____fieldType)
                                                                                    // in use, field name as index key
                                                                                    field_type[____fieldName] = ____fieldType
                                                                                    field_alias[____fieldName] = ____fieldAlias
                                                                            
                                                                                    if (____fieldType_lowerCase.includes('string')){ 
                                                                                                              _feature_attributes_string.push(____fieldName)
                                                                                  
                                                                                    } else if (____fieldType_lowerCase.includes('integer') || 
                                                                                               ____fieldType_lowerCase.includes('double')  || 
                                                                                               ____fieldType_lowerCase.includes('single')){
                                                                                                              _feature_attributes_integer.push(____fieldName)
                                                                                  
                                                                                    } else if (____fieldType_lowerCase.includes('date') ){
                                                                                                              _feature_attributes_date.push(____fieldName)
                                                                                    }// if

                                                                }// if 

                                                                                  
                                                          }// for

                                                          console.log(' text field name array : ',   _feature_attributes_string)
                                                          console.log(' number field name array : ', _feature_attributes_integer)
                                                          console.log(' date field name array : ', _feature_attributes_date)
                                                          console.log('field type object based on field name as key : ', field_type)
                                                          console.log('all displaying mixed field name : ', field_name) 
                                    }//if fields

                           // update object id field name
                            if (_featurelayerJSON.objectIdField){
                                  objectid_field_name = _featurelayerJSON.objectIdField
                            } else {
                                     if (_featurelayerJSON.fields) {
                                      _feature_attributes = _featurelayerJSON.fields
                                      for (var i = 0; i < _feature_attributes.length; i++) {
                                        if ((_feature_attributes[i].type == 'esriFieldTypeOID')
                                            || (_feature_attributes[i].alias == 'OBJECTID')){
                                              objectid_field_name = _feature_attributes[i].name
                                              break;
                                          }//if
                                        }//for
                                      }//if
                            }//if object-id
                            


                            // update layer name           
                                  _layer = _featurelayerJSON.name   
                                  document.title = _layer  
                                  update_url_parameter('layer',_layer ) 

                                  var html_layerInfo = '<a href="' + _url_layer + '">' + '<span style="font-size:xx-large;">' + _layer + '</strong>'  + '</a>'
                                  html_layerInfo += '</br>'
                                  html_layerInfo += '<a href="' + _url_layer + '">' + '<span style="font-size:xx-small;">' + _url_layer + '</span>' +  '</a>'
                                  $('#layer-info').html(html_layerInfo)


                                  


                                  // only for vertical
                                  $('#layer-info-vertical').html('<a style="font-size:large;" target="_blank" href="' + _url +'">' + _layer + '</a>')

                        
                          } catch (error) {
                              console.error(' error on field name,  fail to get feature attribute -----> ', error);
                              //render_message_fieldName_panel(error)
                          }// try

              } 



        /**/
        // ----- end  -----  feature layer -----  ----- 
        /**/




  







                        
    function get_feature_attributes_esri_featureLayer(___feature_fields_array){

      console.log('feature fields array .....from esri feature layer ', ___feature_fields_array)
      for (var i = 0; i < ___feature_fields_array.length; i++) {
                            
            var _type = ___feature_fields_array[i].type
            var _field = ___feature_fields_array[i].name

            _type = _type.toLowerCase();
            
            //if (_type == 'esriFieldTypeString'){
           if (_type.includes('string')){
                  _feature_attributes_string.push(_field)
           } 
           if ((_type.includes('integer')) || (_type.includes('double'))){
                                  _feature_attributes_integer.push(_field)
           }

           //......  must always find the id, decide which one exist 'OID','FID','OBJECTID'...  ..........
                    if (idx_reference_field == 'lunr_id'){

                            for (h2 = 0; h2 < possible_idx_field_name_array.length; h2++) {
                              
                                    if (_field == (possible_idx_field_name_array[h2])) {
                                        

                                      idx_reference_field = possible_idx_field_name_array[h2]

                                      console.log('idx_reference_field ..... ', idx_reference_field)
                                      
                                      break;  // first use OID, if not exist, use FID, the last use OBJECTID 
                                      
                                    }//if 
                      
                            }//for
                    }
           //...... end ..............  must always find the id, decide which one exist 'OID','FID','OBJECTID'...  ..........
            
     }// for

     console.log('_feature_attributes_string ',_feature_attributes_string)
     console.log('_feature_attributes_integer ',_feature_attributes_integer)
    }


    var default_zoom_level_for_point = 18

    function goToLatLong(__lat, __long,){
      view.goTo({
        center: [__long, __lat]
      })
      .catch(function(error) {
        if (error.name != "AbortError") {
          console.error(error);
        }
      });
    }

    

    function zoomToLatLong(__lat, __long, __zoom){


      // bug fix https://community.esri.com/thread/224073-how-to-use-viewgoto
      // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#goTo

      console.log('zoom To Lat Long ', __lat, __long, __zoom)

      var esri_point = new Point({
          latitude: __lat,
          longitude: __long
        });

      var esri_goto_option = {
          animate: true,
          duration: 200, 
        };




view.goTo({
          target: esri_point,
          zoom: __zoom

        }, esri_goto_option)

      
        
        .catch(function(error) {

          if (error.name != "AbortError") {
                    console.error('zoom to real location, view goto error', error);
          }

        });



    }





        /**/
        // -- -- -- vertial adjustment  -- -- -- 
        /**/




 // skip esri system managed fields
            function json_flex_tip_viewer(object1){

              var attribute_html = ''
              var skip_yes_no = false

              console.log("object1", object1)

              for (const [key, value] of Object.entries(object1)) {
                //console.log(`${key}: ${value}`);

                if (typeof value == 'string') {
                  if (value.trim()){
                    skip_yes_no = false
                  } else {
                    skip_yes_no = true
                  }//if
                }
                
                  var fieldNameLowerCase = key.toLowerCase()
                  var _hasMatch = esri_system_managed_field_array.some(word => fieldNameLowerCase.includes(word));
                  if (_hasMatch){
                      // skip esri system managed fields
                      skip_yes_no = true
                  } 
                  
                  
                 if (skip_yes_no){

                 } else {

      
                    attribute_html += '<div>'
                    attribute_html +=   '<sup class="flex-key-for-column" style="font-size:xx-small; background-color: rgb(70, 70, 70);">' + key + '</sup>'
                    attribute_html +=   '&nbsp;'

                    if (isValidUrl(value)){
                      // http link
                      attribute_html += '<a target="_blank" href="' + value + '" class="flex-value-for-row context">' + value + '</a>'
                    } else {
                        // normal
                        attribute_html += '<span class="flex-value-for-row context">' + value + '</span>'
                    }

                    attribute_html += '&nbsp;&nbsp;'
                    attribute_html += '</div>'


                  }//if

               

              }// for 

              return attribute_html;
            }


            function highlight_keywords_markjs(_multi_keyWords_){

              console.log(' mark.js highlight keywords : ',   _multi_keyWords_)
              // $("span.context").mark(_search_keyword); // will mark the keyword "test", requires an element with class "context" to exist

              var __keywords_array = []
              if (isNaN(_multi_keyWords_)) {
                    // string, single word or multiple word
                    __keywords_array = _multi_keyWords_.split(" ");
                    // multiple string keywords
                    for (var k = 0; k < __keywords_array.length; k++) {

                      var _each_keyword_item = __keywords_array[k].trim()

                      console.log(' mark.js highlight string each keywords : ', k, _each_keyword_item)
                      $("span.context").mark(_each_keyword_item);
                    }//for

              } else {
                console.log(' mark.js highlight 1 single number  : ', _multi_keyWords_)
                $("span.context").mark(_multi_keyWords_.toString());
              }//if

            }


            


            //Check if a JavaScript string is a image URL, https://stackoverflow.com/questions/9714525/javascript-image-url-verify
            function isValidImageURL(_test_value) {
              var _test_string = String(_test_value)
              var res = _test_string.match(/\.(jpeg|jpg|gif|png)$/)
              return (res !== null)
            }

            // convert a url link to iframe (website), img tag(image)
            function json_flex_tip_viewer_urlAsIframe(object1){

              var attribute_html = ''

              for (const [key, value] of Object.entries(object1)) {
                
                // only find url link as vale, ignore other field
                if (isValidUrl(value)){
                  attribute_html +=     '<a target="_blank" href="' + value + '">' + value + '</a>' + '&nbsp;&nbsp;&nbsp;'
                

                      if (isValidImageURL(value)){

                        // image
                        attribute_html += '<a target="_blank" href="' + value + '">'
                        attribute_html +=   '<img src="' + value + '" alt="' +  value  +'"'
                        // without width,height, it shows image whatever original size, if you want to fix size, 
                        //attribute_html +=   ' width="1120px" height="800px"'  
                        attribute_html +=   '>'
                        attribute_html += '</a>'

                      } else {

                                // website 
                                attribute_html += '<iframe src="' + value + '"' + ' scrolling="auto" frameborder="0" '
                                // attribute_html += '   width="1120px" height="800px" ' 
                                // attribute_html += '  style="width: 1120px; height: 900px; display: block; padding: 0px; margin: 0px;"'
                                attribute_html +=  '  style="position: relative; height: 900px; width: 100%;" '
                                attribute_html += '>'
                                attribute_html += '</iframe>';
                                
                      }// if image

                }//if valid url
                
              }// for 

              return attribute_html;
            }

        




        

        function isValidUrl(urlString) {

          // https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url/
           var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
              '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
              '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
              '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
              '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
              '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
          
             return urlPattern.test(urlString)
        }



      

          /**/
        // -- -- -- vertial adjustment  -- -- -- 
        /**/

