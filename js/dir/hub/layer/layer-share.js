 




//  [ { org(organization name): xxx,  root-url: xxxxx}  ]
var unique_org_root_url_array = []



// not unique, include every record in search result
// [ { org(organization name): xxx,  root-url: xxxxx,  layer-name: xx, layer-id: xx, layer-url: xxx}  ]
var layer_url_array = []
// feature server only, without layer id
//  [ { org(organization name): xxx,  root-url: xxxxx,  server-name: xx, server-url: xxx}  ]
var server_url_array = []







 // in use,  dataset only, feature layer, feature table, geojson, shapefile, csv only, NOT include web map, scene, etc..... search 'london' have 1.2k 
var ___url_search_data ="https://opendata.arcgis.com/api/v3/search?&filter[openData]=true&agg[fields]=collection" 

 // NO lunr, no suggest, just simple for loop 

 //  hub search original page:    https://hub.arcgis.com/search?collection=Dataset&q=london%20water
 var original_search_portal_base_url = "https://hub.arcgis.com/search?q=";
    
// currently use :   opendata.arcgis.com/api/v3/search
 
// hoogw fork version:     https://gist.github.com/hoogw/902e75e569d851cc6a37fe3eff3b1cac
//  original         :   https://gist.github.com/jgravois/1b7ec5080e992a59f65cf7a2190e4365
//  hub v3 api follow this specification  --> json:api                https://jsonapi.org/
 
 
// for loop for search, no lunr, with mark.js
// no web worker, no stream


 // "input" was used in arcgis_common, do not use it here
 var input_current = [];  
 var _filtered_results   // filtered results


 var _filter_by // search filter by keyword
 
 var current_filter_result_count;
 

  
 // when stop search button clicked, this will become true.
 var stop_search_status = false;









var ___url_getJson     
var _search_data_content
var _search_content_split

    
          
                                

  
                  //   *******  search event related   *******   


                                // simple for loop ( no lunr.js)
                                function search_layer_now() {

                                          


                                    



                                    _filter_by = $('#filter_by').val().toLowerCase().trim();

                                    
                                    var _filter_by_array = _filter_by.split(" ");
                                    
                                    console.log('_filter_by  --->  ', _filter_by)
                                    
                                    update_url_parameter('filter_by', _filter_by);
                                    
                                    
                                    
                                      if (_filter_by.length > 2) {  
                                    
                                    
                                    
                                                  // ............. filter results  ....................
                                    
                                              
                                                      _filtered_results = [];
                                                      var _test_string
                                                      var _valid

                                                      if (input_current.length > 0) {

                                                        for (var i = 0; i < input_current.length; ++i) {


                                                             //  not use : name + orgnization     
                                                              //_test_string = input_current[i].attributes.name + ' ' + input_current[i].attributes.orgName;
                                                              _test_string = input_current[i].attributes.name                                                   
                                                              _test_string = _test_string.toLowerCase();
                                                              



                                                                           _valid = true;

                                                                           //_filter_by_array.forEach(function(word){
                                                                          for (var k = 0; k < _filter_by_array.length; ++k) {





                                                                              // if(_test_string.includes(word)) {
                                                                              if(_test_string.indexOf(_filter_by_array[k]) > -1) {
                                                                                   // contain


                                                                               }else {
                                                                                   // Not contain

                                                                                   _valid = false;

                                                                               }// else





                                                                          } //for




                                                             if (_valid) {

                                                                  _filtered_results.push(input_current[i]);

                                                             }







                                                       }// for

                                                   }// if

                                                                      

                                                                  


                                                    show_current(_filtered_results)
                                
                                    
                                    


                                            // ..........  End ... filter results base on _search_for  ....................          

                                  
                                    } else {
                                         

                                          // less than 
                                          show_current(input_current) 


                                          
                                      }

                                      // fix bug, must init tooltips(), every time get new search result
                                      // $('.tooltipped').tooltip();

                            }



                  function init_search_button_event_handler(){
                        
                    /**/
                    //  - - - download csv  - - - 
                    /**/
                        $("#download_csv_button").on("click", function() {

                          if (unique_org_root_url_array){
                            var final_csv_string = parse_json_to_csv_string(unique_org_root_url_array)
                            saveStringAsFile('root.csv', final_csv_string)
                          }

                          if (layer_url_array){
                            var final_csv_string2 = parse_json_to_csv_string(layer_url_array)
                            saveStringAsFile('layer.csv', final_csv_string2)
                          }

                          if (server_url_array){
                            var final_csv_string3 = parse_json_to_csv_string(server_url_array)
                            saveStringAsFile('server.csv', final_csv_string3)
                          }
                        });
                    /**/
                    //  - - -  end  - - -   download csv    - - - 
                    /**/








                              // click search
                          
                              
                            // when user click 'x'  or  when user click 'enter' to 'search' , both will trigger 'on search' event. you can't tell which is which, both will fire this event.  https://stackoverflow.com/questions/2977023/how-do-you-detect-the-clearing-of-a-search-html5-input
                            $('#filter_by').on('search', search_layer_now);
                        

                                

                                // fire when user every stroke any key  
                                $("#filter_by").on('keyup',search_layer_now);
                                
                                // only fire when text field loose focus,  not fire when stroke any key  
                                // when use choose option from autocomplete dropdwon list, field will loose focus, will fire this change event
                                // works, but use alternative way >>>>>  autocomplete_options.onAutocomplete:  search_layer_now  //Callback for when autocompleted.
                                // $("#filter_by").change(search_layer_now);

                  }



                  //   *******   end  ******   search event related   *******      












                  

/**/


               // - -  -  -  streaming   - -  -  -  
                

               function init_streaming_event_handler() {

                              $("#original_search_portal").attr("href", original_search_portal_base_url)


                              // when user click 'x'  or  when user click 'enter' to 'search' , both will trigger 'on search' event. you can't tell which is which, both will fire this event.  https://stackoverflow.com/questions/2977023/how-do-you-detect-the-clearing-of-a-search-html5-input
                              $('#search_data').on('search',prepare_streaming_url);
                              
                              $('#start_streaming_button').on('click',prepare_streaming_url);       // where only
                             

                              
                              $('#stop_streaming_button').on('click',stop_streaming);
                              
                              
                              // only update URL search_data=xxx, not perform real search.
                              $("#search_data").on('keyup', function(){

                                _search_data_content = $('#search_data').val().toLowerCase().trim();

                                console.log('search key word entered is ', _search_data_content);

                                update_url_parameter('search_data', _search_data_content);
                              
                                





                                  // special for search portal
                                  $("#original_search_portal").attr("href", original_search_portal_base_url + _search_data_content)


                                

                              });

                
                }




            
                   
                   
                   
                  function empty_last_time_result(){
                     rendering_json_to_html({});
                  }   
                   
                  
                   
                   
                   
                   
                   function stop_streaming(){
                                stop_search_status = true
                                console.log('  stop button clicked ===> ' )
                               
                   }
                   
                   
                   
                   
                   
                   
                  
                   function show_current(_current_showing) {
                      display_count_info('', _current_showing.length, __total_item_count, 'counter_label')
                      rendering_json_to_html(_current_showing)
                      highlight_keywords()
                  }


                             


                                 
                   function search_by_url_param(){


                     // based on URL ... &search_data=xxxx 
                       ___url_search_for = urlParams.get('search_data');









                       console.log('___url_search_for',  ___url_search_for)

                       if ((___url_search_for == undefined) || (___url_search_for == null) || (___url_search_for == '')){

                           // search for is null, undefined, nothing to search for


                       }else {

                         ___url_search_for = ___url_search_for.toLowerCase().trim();

                           $('#search_data').val(___url_search_for);
                           $("#original_search_portal").attr("href", original_search_portal_base_url + ___url_search_for)

                           // default search 
                           prepare_streaming_url()



                           // trigger keyup event, filter result by _search_for
                           // $(function() {
                                         // $('#search').keydown();
                                         //  $('item').keypress();
                             // both works (1)
                                         //  $('#search').on('keyup', );
                                         //  $('item').blur();
                             //         });




                               // both works (2)
                             // $('#search_data').trigger(jQuery.Event('keyup', { keyCode: 13 }));    


                       }

                 }






               //      - -  -  -   end    - -  -  -  streaming   - -  -  -  







  
  (async function($){
  
               
               // not get url parameters, because arcgisServerList do not need any url parameters.
               // but here only need to get "linktopath" etc.....
               init_global_var()

               
               
               init_search_button_event_handler();

             

               init_streaming_event_handler();

               // url  ...&search_data=xxx
               search_by_url_param()
               

               // Can't be here, must wait until streaming compete, to do filter. 
               // url  ...&sfilter_by=xxx
               //filter_result_by_filter_by()

})(jQuery);
