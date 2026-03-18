
// feature layer opacity
var groundoverlay_opacity = 0.8
      

        // any document ready function is in here
        dom_ready_dojo();

        // component
        // only for image server,  self-run
        /**/
        //  - - -  ---  only for image server   ---  - - -
        /**/
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
            
                }); 
                  
                // component // view . when 
                // await arcgisMap.viewOnReady();
                arcgisMap.addEventListener("arcgisViewReadyChange", (event) => {

                      
                      createImageryLayer()
                     

                      // must place after  createa feature layer, other wise view is not ready, will cause error
                      init_view_ui()
                      // if don't want google map, just delete this line
                      init_base_map_radio() 
                  
                  // first time zoom to layer must wait until view is ready, otherwise, may not zoom to.
                  // pan to real location is inside function of create feature layer, at last
                   
                              
                })

               })();
        /**/
        //  --- end  ---  only for image server    - - -  --- 
        /**/
  

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
              /**/
              //  - - -  ---  only for image server   ---  - - -
              /**/  
                  // update overlay opacity
                  imageryLayer.opacity = groundoverlay_opacity
              /**/
              //  --- end  ---  only for image server    - - -  --- 
              /**/
            });
            // ... end ... opacity




              


        }// init ui


      /**/
      //  - - -  ---  only for image server   ---  - - -
      /**/
        var imageryLayer
        async function createImageryLayer(){
        
          imageryLayer = new ImageryLayer({
            url: ___url_string,
              //url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/NLCDLandCover2001/ImageServer",
              format: "jpgpng", // server exports in either jpg or png format
          });
          
          arcgisMap.map.add(imageryLayer);

          await arcgisMap.whenLayerView(imageryLayer); // Wait for the layer to be usable.

          // Zoom to the layer's full extent and customize the animation.
          await arcgisMap.goTo(imageryLayer.fullExtent, { animate: true, duration: 2500 });

          // Constrain navigation to the layer's full extent.
          //arcgisMap.constraints = { geometry: imageryLayer.fullExtent, minScale: 10000 };


          // only for image server, enforce road map
           esri_basemap_id = "OpenStreetMap"
           setup_radio_basemap()
        
        } 
         
        async function get_imageryLayer_attributes(_url, layerID){

          var _layerJSON

          // http://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/MapServer/333?f=pjson
          // layer_id is 333, 
          var _url_layer = _url  + '?f=pjson'
          console.log('get imageryLayer attributes url :', _url_layer)

        
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
              var _layerJSON = response_string
          } else {
              // is string
              _layerJSON = JSON.parse(response_string)
          }
          console.log(' get imageryLayer attributes, advanced query support   ====  _layerJSON', _layerJSON)


                             


          // update layer name           
          _layer = _layerJSON.name   
          document.title = _layer  
          update_url_parameter('layer',_layer ) 

          var html_layerInfo = '<a href="' + _url_layer + '">' + '<span style="font-size:xx-large;">' + _layer + '</strong>'  + '</a>'
          html_layerInfo += '</br>'
          html_layerInfo += '<a href="' + _url_layer + '">' + '<span style="font-size:xx-small;">' + _url_layer + '</span>' +  '</a>'
          $('#layer-info').html(html_layerInfo)
                              
                            
        } 
      /**/
      //  --- end  ---  only for image server    - - -  --- 
      /**/
 



      function init_user_interface_event(){
      
        
            
      }

      async function dom_ready_dojo(){

        init_global_var()
        // must await
        // imageServer have single layer, layer id always is 0, 
        _layer_id = 0
        await get_imageryLayer_attributes(___url_string, layer_id)
                                       
         init_user_interface_event()
         init_user_interface_for_component()
           
      } // dom ready

      

          

                 






 





