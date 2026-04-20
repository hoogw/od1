


    
     

  zoom_to_feature_or_not = 'not_zoom2feature' //'zoom_to_feature'   // 'not_zoom2feature'

  // feature layer opacity
  var groundoverlay_opacity = 0.8

  var background_type = 'image'  // 'data' tile  tile
  var backgroundMapImageLayer
  var mapimagerlayer_sub_layer // filter map image layer, use layer definition expression
  

  // for map image layer only, do not add featurelayer to map, but still create for total count, zoom to feature 
  var backgroundFeatureLayer   
  var native_renderer

  var clicked_graphic
          
  var graphic_geometryType 

                       
              
 							                
                      

              // any document ready function is in here
              dom_ready_dojo();


                          
              // component
              
              //self-run
              (async function init_map_component_event(){ 

                // old "v i e w . xxxxxxx " must all replace with " a r c g i s M a p . xxxxxx", for example, v i e w . g r a p h i c,  v i e w . o n
                
                 
                
                
                 
                // a w a i t    a r c g i s _ i m p o r t ( ) ;
                
                arcgisMap = document.querySelector("arcgis-map")
                            arcgisMap.center = [_center_long, _center_lat]
                            arcgisMap.zoom = _center_zoom

                // component // reactive Utils . watch (
                arcgisMap.addEventListener("arcgisViewChange", (event) => {

                      console.log('arcgis View Change event',  event)
                      update_center_latLngZoom_esri_component(arcgisMap)
            
                      if (layerView){
                                  layerView.queryFeatures({
                                          // from v 4 . 3 3 ,  To only return features visible in the view, set the geometry parameter in the query object to the view's extent.
                                          // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#queryFeatures
                                          geometry: arcgisMap.extent,  // for component 

                                                  //outFields: layerView.availableFields,
                                                  //where: "DEW_POINT > 10"
                                                })
                                                  .then(function(results) {
                                                                              current_feature_rendered = results.features.length
                                                                              console.log("current features returned and rendered : ",  current_feature_rendered);
                                                                              update_statistic_info_vertical(current_feature_rendered , total_feature_count)                                          
                                                      })
                                                        .catch(function(error) {
                                                                              console.log("query failed: ", error);
                                                            });
                      }//if


                }); 
                  
                // component // view . when 
                // await arcgisMap.viewOnReady();
                arcgisMap.addEventListener("arcgisViewReadyChange", (event) => {

                     // for map image layer only, do not add featurelayer to map, but still create for total count, zoom to feature 
                      createFeatureLayer()


                      // for both image and tile
                      createMapImageLayer()
                              
                      // for map image layer only, do not add featurelayer to map, but still create for total count, zoom to feature 
                      init_feature_layer_view()
  
                     

                      // must place after  createa feature layer, other wise view is not ready, will cause error
                      init_view_ui()
                      // if don't want google map, just delete this line
                      init_base_map_radio() 
                  
                  // first time zoom to layer must wait until view is ready, otherwise, may not zoom to.
                  // pan to real location is inside function of create feature layer, at last
                   
                              
                })

             })();






               
              

              // component
               function init_view_ui(){
              
                            //  ... opacity  ...

                            if (param_overlayOpacity){
                              groundoverlay_opacity = param_overlayOpacity / 10
                            }

                            var opacity_slider = document.querySelector("#overlay_opacity_range");
                            opacity_slider.value = groundoverlay_opacity * 10

                            var opacity_value_text = document.querySelector("#opacity_value_text");
                            opacity_value_text.textContent = opacity_slider.value;
                            
                            // event handle   https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range
                            opacity_slider.addEventListener("input", (event) => {
                              var _overlay_opacity = event.target.value;
                              opacity_value_text.textContent = _overlay_opacity
                              update_url_parameter('overlayOpacity', _overlay_opacity);
                    
                                                  groundoverlay_opacity = _overlay_opacity / 10;
                    
                                                  // update overlay opacity
                                                  backgroundFeatureLayer.opacity = groundoverlay_opacity
                            });
                            // ... end ... opacity




                   


              }// init ui










          var layerView
          
          // component
           // for map image layer only, do not add featurelayer to map, but still create for total count, zoom to feature 
          async function createFeatureLayer(){
          


            if (backgroundFeatureLayer){
            } else {
                    backgroundFeatureLayer = new FeatureLayer({
                      url: background_layer_url,
                      outFields: "*",
                      opacity: groundoverlay_opacity,
                    });
            }


           
    
            // queryFeatureCount https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#queryFeatureCount
            // How To Show Total Count  https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/how-to-show-total-count/m-p/65357
            backgroundFeatureLayer.queryFeatureCount().then(function(numFeatures){
                        // prints the total count to the console
                        console.log('total count is : ', numFeatures);
                        total_feature_count = numFeatures
                        update_statistic_info_vertical(current_feature_rendered , total_feature_count)

            });

             
                // first time zoom to layer must wait until view is ready, otherwise, may not zoom to.
                  console.log(' first time zoom to layer must wait until view is ready, otherwise, may not zoom to, - - - >  zoom yes or no', zoom_to_1st_feature)
                  if (zoom_to_1st_feature){
                                              // only zoom 1 time, first time, never zoom again
                                              zoom_to_1st_feature = false; 
                                              //first time pan to real location, or zoom to last feature of max return count(zoom to 1st feature), must wait until view is ready, inside v i e w . w h e n ( ) here
                                              pan_to_real_location()
                  }//if 
          } 





                
                async function createMapImageLayer(){
                       
                      console.log("background_mapserver_url", background_mapserver_url)
                      console.log("layer_id", layer_id)

                                    backgroundMapImageLayer = new MapImageLayer({

                                          //url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",
                                          url: background_mapserver_url,
                                          
                                          sublayers: [
                                            {  // sets a definition expression on sublayer 3
                                              id: parseInt(layer_id), // warning sub layer id must be number, can't be string
                                            }],


                                          // withou this , by default, only 'name' field exported, must specify ["*"] here 
                                          outFields: ["*"],
                                          
                                          // opacitySlider, since v4.12, we use 4.11 because v4.12 have bug, failed popupTemplate.content ["*"]
                                          //https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-smartMapping-OpacitySlider.html
                                          //https://developers.arcgis.com/javascript/latest/guide/functionality-matrix/
                                          opacity: groundoverlay_opacity
                                        
                                    });

                                   

                                    
                                    // classified image only
                               backgroundMapImageLayer.when(() => {
                                // must wait until map image layer is ready
                                console.log('map Image Layer sublayer id  :   ',  layer_id, backgroundMapImageLayer)
                                mapimagerlayer_sub_layer = backgroundMapImageLayer.findSublayerById(parseInt(layer_id)); // warning sub layer id must be number, can't be string
                                console.log('map Image Layer sublayer object :   ',  mapimagerlayer_sub_layer)
                              });

                                  
                                    // must wait until promise resolved 
                                    backgroundMapImageLayer.loadAll()

                                          .catch(function(error) {
                                            // Ignore any failed resources
                                          })

                                          .then(function() {
                                                            console.log("backgroundMapImageLayer All loaded, ===  capabilities  === : === ", backgroundMapImageLayer.capabilities);
                                                            console.log('backgroundMapImageLayer , url',background_mapserver_url,  backgroundMapImageLayer)
                                                            arcgisMap.map.add(backgroundMapImageLayer)

                                                            // enforce use yellow square for point, yellow line, yellow polygon
                                                            // must be here after MapImageLayer fully loaded
                                                            enforce_yellow_linepointpolygon(backgroundMapImageLayer)
                                    });

                  }



                  
                  function pan_to_real_location(){

                    /*
                    Do not Zoom to extent of all features, bad idea, slow, bulky,  https://developers.arcgis.com/javascript/latest/sample-code/featurelayer-queryextent/
                    only zoom to first feature, good idea, fast, neat
                    does not matter you add feature layer to map or not, it can alway zoom to 1st feature
                    */
                    const  query1stFeature = {
                      
                             // query object https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-Query.html
                             where: '1=1',  // return max count of return feature

                             /*  
                                  Do not use "num" and "start", because if use any of them, will require 'paging', however, if shapefile as source, 'paging' will not be supported, will get error failed query due to paging not supported
                                  https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-Query.html#num
                                  without use them, must use "where 1=1" will return max number of return count
                                  if use "num" and "start", then do not use "where 1=1"

                                  num:1,
                                  start:0,
                             */

                             returnGeometry:true,
                           }
    
                           backgroundFeatureLayer
                           .queryFeatures(query1stFeature)
                           .then((results) => {
                                                 console.log("zoom to 1st valid feature, if not find valid, zoom to all feature array(full extent) : ",results.features)
                                                 // goto(geometry) https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#goTo
                                                 var found_1_valid_geometry = false
                                                 for (let i = 0; i < results.features.length; i++) {
                                                   if (results.features[i].geometry){
                                                    console.log(' go to the 1st valid feature, index, geometry  ', i, results.features[i].geometry)
                                                    found_1_valid_geometry = true
                                                    
                                                    arcgisMap.goTo(results.features[i].geometry)
                                                    break; // break for loop
                                                   }
                                                 }//for 
                                                 if (! found_1_valid_geometry){
                                                    console.log('not find a valid feature geometry, so zoom to all features array (full extent)')
                                                    // goto full extent, always works
                                                    arcgisMap.goTo(results.features); 
                                                 }
                           })
                           .catch(function(error) {
                                                 console.log('failed to zoom to any feature ', error); 
                           });  
                                                                           
    
                 }




                // only for :single layer, map image layer, click   
                var graphic_object_indexAsKey = {}
                function init_feature_layer_view(){


                   

        // component // view . on ( " click " , function(event){
        arcgisMap.addEventListener("arcgisViewClick", (event) => {

          console.log(' view * click * fire 1 time is fine ', event.detail)
          console.log('lat:' + event.detail.mapPoint.latitude + '      lng:' +  event.detail.mapPoint.longitude)


                      // test, because feature layer did not add to map, only map image layer add to map, so hit test map image layer will return empty, only hit test feature layer will return something. 
                      arcgisMap.hitTest(event).then(function(response){
                        if (response.results.length) {
                          let hitResult = response.results.filter(function (result) {
                                  return result.graphic.layer === backgroundFeatureLayer;
                          })
                          console.log(' test, because feature layer did not add to map, only map image layer add to map, so hit test map image layer will return empty, only hit test feature layer will return something.  ', hitResult )
                        }
                      })




                      // ... ... . only for map image layer and tile layer, click event  ... ... . 
                              console.log('view clicked, .. .. .. ',event,  event.detail.mapPoint )

                              // remove previous both inactive and highlighted graphic and square guide box 
                              clear_clicked_graphic()
                              
                        if ((background_type == 'image') || (background_type == 'tile')){
                                      
                                      console.log('Map Image Layer or tile,  get clicked, .. .. .. ',event,  event.detail.mapPoint )
                                      
                                      // https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#queryFeatures
                                      const queryParams = backgroundFeatureLayer.createQuery();
                            
                            

                                      //do not use point, because it works with polygon, but not work with line and point
                                      //queryParams.geometry = event.detail.mapPoint;
                                      // . . . use buffer  . . .
                                            zoom_adjust_by =  Math.pow(2,(23 - arcgisMap.zoom))
                                            buffer_tolerance_lat_degree = lat_tolerance_degree_base * zoom_adjust_by;
                                            buffer_tolerance_lng_degree = lng_tolerance_degree_base * zoom_adjust_by;
                                            console.log(' after zoom adjust, tolerance is ', arcgisMap.zoom, zoom_adjust_by, buffer_tolerance_lat_degree, buffer_tolerance_lng_degree)

                                            SWlong = event.detail.mapPoint.longitude - buffer_tolerance_lng_degree;
                                            SWlat  = event.detail.mapPoint.latitude - buffer_tolerance_lat_degree;
                                            NElong = event.detail.mapPoint.longitude + buffer_tolerance_lng_degree;
                                            NElat  = event.detail.mapPoint.latitude + buffer_tolerance_lat_degree;
                                            console.log(' after zoom adjust, SWlong SWlat NElong NElat', SWlong, SWlat, NElong, NElat)

                                            square_graphic_southWest = [SWlong, SWlat]
                                            square_graphic_southEast = [NElong, SWlat]
                                            square_graphic_northEast = [NElong, NElat]
                                            square_graphic_northWest = [SWlong, NElat]
                                            console.log(' after zoom adjust, square_graphic_southWest  square_graphic_southEast square_graphic_northEast square_graphic_northWest ', square_graphic_southWest, square_graphic_southEast, square_graphic_northEast, square_graphic_northWest)

                                            square_graphic_geometry = {
                                              type: "polygon", // autocasts as new Polygon()
                                              rings: [square_graphic_southWest, square_graphic_southEast, square_graphic_northEast,square_graphic_northWest,square_graphic_southWest ]
                                            }

                                            square_graphic = new Graphic({
                                              geometry: square_graphic_geometry,
                                              symbol: square_graphic_symbol,
                                            });
                                            // square guide box graphic always at collection-array index as 0 
                                            arcgisMap.graphics.add(square_graphic, 0);

                                            // not use, because it works with polygon, but line and point will not work well when zoom level is 10 or less
                                            //const ptBuff = geometryEngine.buffer(event.detail.mapPoint, 300, "feet");
                                            //queryParams.geometry = ptBuff;

                                            queryParams.geometry = square_graphic_geometry

                                      //  . . . end . . . use buffer  . . .






                            backgroundFeatureLayer.queryFeatures(queryParams).then(function(results){

                                    // prints the array of result graphics to the console
                                    console.log('.. .. .. Map view clicked, .. .. .. query feature layer result .. .. .. could be more than 1 feature', results.features);

                                    //console.log('only show 1st feature', results.features[0]);
                                    if (results.features.length){

                                        graphic_object_indexAsKey = {}
                                        let ___graphic___ 
                                        var single_layer_properties_html = ''
                                        
                                        var ___properties

                                        current_queryFeatureResultsAsGraphic_length = results.features.length
                                        
                                        let _index = 0;
                                        ___graphic___ = results.features[_index]
                                        console.log(' ! * ! click ! * ! result ! * ! add graphic ! * ! ', ___graphic___)
                                        ___properties = ___graphic___.attributes

                                        graphic_geometryType = ___graphic___.geometry.type.toLowerCase()
                                       
                                                        
                                        if (graphic_geometryType.includes('polygon')){
                                          ___graphic___.symbol = polygon_symbol
                                        } else if (graphic_geometryType.includes('line')){
                                          ___graphic___.symbol = polyline_symbol
                                        } else if (graphic_geometryType.includes('point')){  
                                          ___graphic___.symbol = point_symbol
                                        } //if 
                                          

                                        arcgisMap.graphics.add(___graphic___, _index);
                                        single_layer_properties_html = json_flex_tip_viewer(___properties)
                                         

                                          /**/
                                          //  --- zoom to feature or not radio button     --- 
                                          /**/

                                                        //if ((zoom_to_feature_or_not == 'zoom_to_feature') && (_index == 0)){
                                                        // reverse order, 1 should at bottom, last-index should be at top, because I highlight last-index graphic
                                                        if (zoom_to_feature_or_not == 'zoom_to_feature'){

                                                          // only zoom to 1st feature
                                                          console.log('zoom to feature or not', ___graphic___)
                                                          arcgisMap.goTo(___graphic___)

                                                          var ___graphic___geometry___type____ = ___graphic___.geometry.type

                                                          // point only, enforce to zoom level 18
                                                          if (___graphic___geometry___type____.includes('point')){
                                                          arcgisMap.zoom = default_zoom_level_for_point;
                                                          }

                                          } else {

                                          }//if

                                          /**/
                                          //  --- end  ---  zoom to feature or not radio button    --- 
                                          /**/

                                        $('#info_outline').show();
                                        $('#info-window-div').html(single_layer_properties_html)

                                    } 

                          });// back ground
                        }

                      // ... end ... . only for map image layer and tile layer, click event  ... ... . 



                    }); // view . on

                    // --  end  --- highlight feature on pointer-move

                }// function



               // remove previous both inactive and highlighted graphic and square guide box 
               function clear_clicked_graphic(){

                    console.log('remove all previous inactive, highlighted, square guide box, (they all are graphic), remove-all-function works')

                    arcgisMap.graphics.removeAll()

                    empty_info_outline_Tab()
               }

            
      
                       
                 
        
      

      async function dom_ready_dojo(){



        
            /**/
            //  --- esri update latlngzoom    --- 
            /**/
                  init_global_var()

            /**/
            //  --- end  ---  esri update latlngzoom    --- 
            /**/

      

        init_background_layer()
        // must await
        await get_feature_attributes(background_mapserver_url, layer_id)

                         

                                                       
         init_user_interface_event()
         init_user_interface_for_component()
                          
           
                          
                          
                          
      } // dom ready



              




      function init_background_layer(){

        // .... ... ...  background layer url .... ... ... 

                  init_global_var() 
                  // must carry these value from arcgis_common.js
                  background_mapserver_url = param_background_mapserver_url
                  layer_id  = param_layer_id
                  background_layer_url = param_background_layer_url
                  console.log(' background_mapserver_url ', background_mapserver_url)  
                  console.log(' layer_id ', layer_id)  
                  console.log(' background_layer_url ', background_layer_url) 
                  
            

            }




            




          function init_user_interface_event(){
         


             $('#close_info_outline_panel').on('click', function(event) {

              // remove highlight graphic on layer view
              if (mouse_pointed_feature_highlight_handle){
                            mouse_pointed_feature_highlight_handle.remove()
              }

              empty_info_outline_Tab()

            });

    
              /**/
              //  --- zoom to feature or not radio button     --- 
              /**/
                  if (param_zoom_to_feature_or_not){
                    zoom_to_feature_or_not = param_zoom_to_feature_or_not
                  }
                  // first time set radio
                  $("input[type=radio][name=zoom_to_feature_or_not_radio][value=" + zoom_to_feature_or_not + "]").prop('checked', true);
                  // radio change event
                  $("input[type='radio'][name='zoom_to_feature_or_not_radio']").change(function(){
                    zoom_to_feature_or_not = $("input[type='radio'][name='zoom_to_feature_or_not_radio']:checked").val();
                    console.log(" zoom_to_feature_or_not : --  ", zoom_to_feature_or_not);
                    update_url_parameter('zoom2feature', zoom_to_feature_or_not);
                  });

              /**/
              //  --- end  ---  zoom to feature or not radio button    --- 
              /**/



                
          }





           

function empty_info_outline_Tab(){
$('#info_outline').hide();
$('#info-window-div').html("")
}
              



          

              /**/
              // -- -- -- vertial adjustment  -- -- -- 


           

              function update_statistic_info_vertical(rendered, total){

                console.log(' update statistic info', rendered, total  )

                if (isNaN(rendered)){ rendered = '...' } // not available...
                if (isNaN(total)){ total = '...' } // not available...
                
                $('#feature-on-map').html(rendered)
                $('#total-feature').html(total)
              }


              



            /**/
              // -- -- -- only for map image layer classified  -- -- -- 
              var polygonFillBy = 'red-diagonal-cross' // 'yellow-forward-diagonal'


              // only for map image layer,             
              function enforce_yellow_linepointpolygon(_this_mapimage_layer){


              // default stroke(outline) color is yellow, but for map image layer only, change it to blue or red color
              _default_strokeColor = 'rgba(0,0,255, 0.95)';   //'blue'


                 /**/
                // -- -- -- label and color  -- -- -- 

              if (polygonFillBy == 'original-color'){

                // only for map image layer, 'native'
                _this_mapimage_layer.sublayers.items[0].renderer = null;

              } else {

             


             

                switch (polygonFillBy) {

                  case 'original-color':
                    current_simplefillPattern = 2  // backward-diagonal
                    _default_fillColor = 'rgba(255, 68, 51, 0.95)'; // red
                    break;

                  case 'red-diagonal-cross':
                    current_simplefillPattern = 2  // backward-diagonal
                    _default_fillColor = 'rgba(255, 68, 51, 0.95)'; // red
                    break;

                  case 'blue-tint':
                    current_simplefillPattern = 6  // solid
                    _default_fillColor = 'rgba(0, 0, 255, 0.2)'; // blue
                    break;

                  case 'nothing':
                    current_simplefillPattern = 5  // none
                    break;


                    case 'yellow-forward-diagonal':
                      current_simplefillPattern = 3  // backward-diagonal
                      _default_fillColor = 'rgba(255,255,0, 0.95)'; // yellow
                      break;


                    case 'red-cross':
                      current_simplefillPattern = 1  // backward-diagonal
                      _default_fillColor = 'rgba(255, 68, 51, 0.95)'; // red
                      break;


                      case 'yellow-tint':
                    current_simplefillPattern = 6  // solid
                    _default_fillColor = 'rgba(255,255,0, 0.2)'; // red
                    break;


                    case 'yellow-backward-diagonal':
                      current_simplefillPattern = 0  // backward-diagonal
                      _default_fillColor = 'rgba(255,255,0, 0.95)'; // yellow
                      break;

                  default:
                    console.log(`Sorry, we are out of ${polygonFillBy}.`);
                }



                //. . . end  . . . -- -- -- label and color  -- -- -- 
                /**/



                    // for geojsonlayer, featurelayer, 
                    //================================== renderer =================================================
                    // polygon

                    var polygon_renderer = {
                      type: "simple",  // autocasts as new SimpleRenderer()
                      symbol: {
                        type: "simple-fill",  // autocasts as new SimpleFillSymbol()

                        //  . . .simple fill symbol style . . .
                        style: pattern_simpleFillSymbol_esriSFS_js_api_array[current_simplefillPattern],
                        // . . . end . . . simple fill symbol style

                        color:   _default_fillColor,  
                        outline: {  // autocasts as new SimpleLineSymbol()
                          width:    _default_strokeWeight, // extra 3 space char, for only polygon or point outline, not for polyline
                          color: _default_strokeColor,

                          //  . . .simple fill symbol style . . .
                          type: "simple-line",  // autocasts as new SimpleLineSymbol()
                          style: pattern_simpleLineSymbol_esriSLS_js_api_array[current_outlinePattern], //"esriSLSSolid"
                          // . . . end . . . simple fill symbol style
                        }
                      }
                    };




                    // line
                    var polyline_renderer = {
                      type: "simple",  // autocasts as new SimpleRenderer()
                      symbol: {
                                //  . . .simple fill symbol style . . .
                                type: "simple-line",  // autocasts as new SimpleLineSymbol()
                                style: pattern_simpleLineSymbol_esriSLS_js_api_array[current_outlinePattern], //"esriSLSSolid"
                                // . . . end . . . simple fill symbol style


                                color: _default_strokeColor,
                                width:_default_strokeWeight * _thicker_wider_line_over_polygonOrPointOutline,  // no space between, for line only, thicker, wider, by multiple  

                      

                      }
                    };



                    // point
                    var point_renderer = {
                      type: "simple",  // autocasts as new SimpleRenderer()
                      symbol: {
                        type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()

                        //  . . .simple fill symbol style . . .
                        style: simpleMarkerSymbol_esriSMS_array[current_simpleMarker],
                        // . . . end . . . simple fill symbol style


                        color: _default_fillColor,
                        size: _default_pointRadius, // 10,
                      outline: {  // autocasts as new SimpleLineSymbol()
                            width:    _default_strokeWeight, // extra 3 space char, for only polygon or point outline, not for polyline
                            color: _default_strokeColor,

                            //  . . .simple fill symbol style . . .
                            type: "simple-line",  // autocasts as new SimpleLineSymbol()
                            style: pattern_simpleLineSymbol_esriSLS_js_api_array[current_outlinePattern], //"esriSLSSolid"
                            // . . . end . . . simple fill symbol style
                        }

                      }
                    };






                  console.log( ' _this_mapimage_layer.sublayers.items[0].geometryType ......>'  , _this_mapimage_layer.sublayers.items[0].geometryType)
                  var _geometry_type_ = _this_mapimage_layer.sublayers.items[0].geometryType.toLowerCase()
                  if (_geometry_type_ == 'polygon') {
                                console.log( ' _this_mapimage_layer.sublayers.items[0].renderer ......>'  , polygon_renderer)
                                _this_mapimage_layer.sublayers.items[0].renderer = polygon_renderer;
                  } 

                  if ((_geometry_type_ == 'point') || (_geometry_type_ == 'multipoint')){
                    _this_mapimage_layer.sublayers.items[0].renderer = point_renderer;
                  }   


                  if (_geometry_type_ == 'polyline') {
                    _this_mapimage_layer.sublayers.items[0].renderer = polyline_renderer;
                  }   



            // -- -- -- label and color  -- -- -- 
                }// if original color


              } 
              //    . . . end  . . . enforce use yellow square for point, yellow line, yellow polygon 
              /**/  



              // -- -- -- vertial adjustment  -- -- -- 
              /**/




 

            








