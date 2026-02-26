 




      var standard_array = []
      // only for self hosted domain ArcServer
      var custom_domain_array = []
      // only for arcgis.com domain with 16 serial number
      var arcgis_domain_serialNo_array = []
 





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

                          if (input_current){
                            var final_csv_string = parse_json_to_csv_string(input_current)
                            saveStringAsFile('atlas.csv', final_csv_string)
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






// any source csv will fit into only 3 column, 
// name, org, url    




// - - -  convert raw json to standard array for display in html  - - - 
    
var name, org, url;
var _url_candidate

var _name_candidate
var _title_candidate
var _owner_candidate
var _orgId_candidate
var _orgName_candidate

var _serial_number
var _any_instance
var _domain_candidate

var urlObject


var start_position
var urlExistsOrNot_customDomain
var urlExistsOrNot_serialNo
var this_element


      // only for streaming, atlas, this is different from static
   async function convert_rawJson_to_jsonArray(raw_json_array){

        var _this_pageStandardArray = []

        console.log("before convert raw raw_json_array", raw_json_array)

        for (let i = 1; i < raw_json_array.length; i++) {
        

        // must reset to empty for each loop
          name = ""
          org = "" 
          url = ""
          _url_candidate = ""
          _name_candidate = ""
          _title_candidate = ""
          _owner_candidate = ""
          _orgId_candidate = ""
          _orgName_candidate = ""

          _serial_number = ""
          _any_instance = ""
          _domain_candidate = ""

          urlObject = ""


          start_position = ""
          urlExistsOrNot_customDomain = ""
          urlExistsOrNot_serialNo = ""
          this_element = ""
          // must reset to empty for each loop


          

          _url_candidate = raw_json_array[i].url; 
          // never to lower case, because it will mess up 16 serial number
          //if (_url_candidate){ _url_candidate = _url_candidate.toLowerCase()}



          _title_candidate = raw_json_array[i].title; // title means FeatureServer name, not org name
          if (!(_title_candidate)){_title_candidate = "title"}
          _owner_candidate = raw_json_array[i].owner; // owner means a real person, who upload this feature server or layer
          if (!(_owner_candidate)){_owner_candidate = "owner"}
          _orgId_candidate = raw_json_array[i].orgId; // half of orgId is empty
          // use this URL to look up org name by orgId https://www.arcgis.com/sharing/rest/portals/<orgId>?f=json
          if (!(_orgId_candidate)){
            _orgId_candidate = "orgId"
          } else {
             _orgId_candidate = "orgId-" +  _orgId_candidate
          }
          
          //_name_candidate =_orgName_candidate  + " - " +  _orgId_candidate + " - " +  _owner_candidate  //+ " - " +  _title_candidate
          
          if (_orgId_candidate !== "orgId"){
            _name_candidate = _orgId_candidate
          } else if (_owner_candidate !== "owner"){
            _name_candidate = _owner_candidate
          } else {
            _name_candidate = "org-name"
          }




          // skip tile.arcgis.com
          if (_url_candidate 
            && _url_candidate.includes("/rest/services") 
            && !(_url_candidate.includes("tiles.arcgis.com"))  // do not handle tiles, so exclude them
            && !(_url_candidate.includes("utility.arcgis.com"))  // these kind have 32 char serial number, always not working, so exclude them
          ){
            
            
            
            start_position = _url_candidate.indexOf("/rest/services")
            url = _url_candidate.substring(0,start_position) + "/rest/services"
            urlExistsOrNot_customDomain = custom_domain_array.some(item => item["url"] == url); 
            urlExistsOrNot_serialNo = arcgis_domain_serialNo_array.some(item => item["url"] == url); 
            if ((urlExistsOrNot_customDomain) || (urlExistsOrNot_serialNo)){
              // exist, skip, nothing to do
            } else {
              // not exist, add new



              if (_name_candidate){
                name = _name_candidate
              } else {
                name = "org-name" // url
              }


              
              if (name.includes("http")){
                

                // joe put link http.... on name field, means, he don't know org name, so just temp use link
                  name = "iii"
              // fix bug, coeur d'Alene tribe
              // and other special char should be removed.
              } else if (name.includes("'")){
                  name = name.replace("'","`");
              } else if (name.includes("\\")){
                  name = name.replace("\\", "");
              } else if (name.includes("\/")){
                  name = name.replace("\/","");
              }
              
              
              

              
              // get arcgis rest serverice instance name, 
              _serial_number = get_serial_no_from_url(_url_candidate)
              // if there is serical number, then do not need instance name
              if (_serial_number){
                        // 1st priority serial number
                        org = _serial_number
              } else {


                        // 3rd priority, without special instance name, then use domain
                        try {
                          urlObject = new URL(_url_candidate);
                          _domain_candidate = urlObject.hostname;
                          org = _domain_candidate
                        } catch{

                        }



                        // 2st priority, without serial number, then use instance name
                        _any_instance = get_instance_from_url(_url_candidate)
                        if (_any_instance){
                                org = _domain_candidate + " - " +_any_instance
                        } else{
                        }
              }
              


            // convert orgId to org-name 
            if (name.includes("orgId-")){
                var org_name_response = await ajax_getjson_common("https://www.arcgis.com/sharing/rest/portals/" + _orgId_candidate.replace("orgId-","") + "?f=json");
                
                if (org_name_response.name){
                  name = org_name_response.name
                }
                if (org_name_response.orgUrl){
                  name += " - " + org_name_response.orgUrl
                }
                /*
                if (org_name_response.orgPhone){
                  name += " - " + org_name_response.orgPhone
                }
                */
                if (org_name_response.orgEmail){
                  name += " - " + org_name_response.orgEmail
                }
                
            }//if 
          
              

              this_element = {
                      "name":name,
                      "org":org,  
                      "url":url
                    }



              
              if (_serial_number){
                        // 32 serial number do not works, so ignore 32
                        if (_serial_number.length < 17){
                            arcgis_domain_serialNo_array.push(this_element) 
                        }//if 32
              } else {
                        custom_domain_array.push(this_element)
              }//if


           

              _this_pageStandardArray.push(this_element)
              
            }
          }//if r e s t / s e r v i c e s

        }//for



        console.log("after convert standard array", _this_pageStandardArray)
        return _this_pageStandardArray
      }


    // return empty string or serial number 
    function get_serial_no_from_url(_sample_url){

      // for https://utility.arcgis.com/usrsvcs/servers/b5a55d5911b246e2ab88fcc14d304f1f/rest/services
      var re_32 = /\/[a-zA-Z0-9]{32}\/rest\/services/i


      // for W7M7ugHEl8tg1wcM/ArcGIS/rest/services, "W7M7ugHEl8tg1wcM" will be used, 16 dig length
      // ArcGIS/rest or arcgis/rest, use i for case-insensitive
      var re_16 = /\/[a-zA-Z0-9]{16}\/arcgis\/rest\/services/i
      
      var _serial_16_start_position = _sample_url.search(re_16) + 1
      var _serial_16_end_position = _serial_16_start_position + 16
      var _serial_32_start_position = _sample_url.search(re_32) + 1
      var _serial_32_end_position = _serial_32_start_position + 32
      
      
      var _serial_number = ""
      if (_serial_16_start_position > 1){
        _serial_number = _sample_url.substring(_serial_16_start_position, _serial_16_end_position)
      } else if (_serial_32_start_position > 1){
        _serial_number = _sample_url.substring(_serial_32_start_position, _serial_32_end_position)
      }

      return _serial_number
      
    }


    // return empty string if instance is arcgis, otherwise, return non-arcgis custom instance name
    function get_instance_from_url(_sample_url){

      // for /wetlandsmapservice/rest/services, "wetlandsmapservice" will be used, 
            var re_any = /\/[^\/]*\/rest\/services/
            var _any_start_position = _sample_url.search(re_any) + 1
            var _any_end_position = _sample_url.indexOf("/rest/services")
            var _any_instance = ""
            if ((_any_start_position > 1) && (_any_end_position > 1)){
              _any_instance = _sample_url.substring(_any_start_position, _any_end_position)
              // ignore arcgis
              if (_any_instance.toLowerCase() == 'arcgis'){
                _any_instance = ""
              }
            }

            return _any_instance
    }


    function fisherYatesShuffle(arr) {
      let n = arr.length;

      // While there remain elements to shuffle.
      while (n > 0) {
          // Pick a remaining element at random.
          const i = Math.floor(Math.random() * n);
          n--; // Decrement n (the number of remaining elements)

          // And swap it with the current element.
          [arr[n], arr[i]] = [arr[i], arr[n]];
      }
      return arr;
    }




//  - - -  end  - - -  convert raw json to standard array for display in html  - - - 
    

                  

/**/


               // - -  -  -  streaming   - -  -  -  
                

               function init_streaming_event_handler() {


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

               //init_naming_panel()
               
               init_search_button_event_handler();

             

               init_streaming_event_handler();

               // url  ...&search_data=xxx
               search_by_url_param()
               

               // Can't be here, must wait until streaming compete, to do filter. 
               // url  ...&sfilter_by=xxx
               //filter_result_by_filter_by()

})(jQuery);
