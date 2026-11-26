 


 // default is _ t i m e o u t =  2 0 0 0;  due to sometime, it slow response, 
 // re-set it to 
 _timeout = 30000;



      var standard_array = []
     





 // "input" was used in arcgis_common, do not use it here
 var input_current = [];  
 var _filtered_results   // filtered results


 var _filter_by // search filter by keyword
 
 var current_filter_result_count;
 

  
 // when stop search button clicked, this will become true.
 var stop_search_status = false;

var __this_page_array

var ___url_getJson     
var _search_data_content
var _search_content_split

    
          
                                





// - - -  convert raw json to standard array for display in html  - - - 

// only for hub, atlas

/**/
// any source csv will fit into only 3 column, 
// name, org, url  
var _name_candidate // not layer property, human readable org name,must get by orgId > portal > name ( if no orgID, then use owner name )  
var _orgName_candidate // not layer property, serical number or domain name.

var _serialNo_domain_name // not layer property, serical number or domain name.

var _url_candidate // is one of layer properties
// these 2 are not input to core 3 column, but needed for org name. 
var _orgId_candidate // is one of layer properties
var _owner_candidate // is one of layer properties
var _source_candidate // is one of layer properties, 
var _accessInformation_candidate // is one of layer properties,


var _serial_number
var _service_number
var _any_instance
var _domain_candidate

var urlObject
var start_position
var urlExistsOrNot
var this_element


      // only for streaming, atlas, this is different from static
   async function convert_rawJson_to_jsonArray(raw_json_array){

        var _this_pageStandardArray = []

        console.log("before convert raw raw_json_array", raw_json_array)

        for (let i = 1; i < raw_json_array.length; i++) {
        

        // must reset to empty for each loop
          _name_candidate = ""
          _orgName_candidate = ""
          _serialNo_domain_name = ""
          _url_candidate = ""
          
          _owner_candidate = ""
          _orgId_candidate = ""
          _source_candidate = ""
          _accessInformation_candidate = ""
          
          _serial_number = ""
          _service_number = ""
          _any_instance = ""
          _domain_candidate = ""

          urlObject = ""


          start_position = ""
          
          urlExistsOrNot = ""
          this_element = ""
          // must reset to empty for each loop


          

          _url_candidate = raw_json_array[i].url; 
          // never to lower case, because it will mess up 16 serial number
          //if (_url_candidate){ _url_candidate = _url_candidate.toLowerCase()}
          _owner_candidate = raw_json_array[i].owner; // owner means a real person, who upload this feature server or layer
          _orgId_candidate = raw_json_array[i].orgId; // half of orgId is empty
          // use this URL to look up org name by orgId https://www.arcgis.com/sharing/rest/portals/<orgId>?f=json
          
          _source_candidate = raw_json_array[i].source; // source means the origin of the data
          _accessInformation_candidate = raw_json_array[i].accessInformation; // access information for the layer
          


          // undefined.includes cause error, must use and 
        if (_url_candidate && _url_candidate.includes("/rest/services")){
    
            start_position = _url_candidate.indexOf("/rest/services")
            _url_candidate = _url_candidate.substring(0,start_position) + "/rest/services"
            urlExistsOrNot = standard_array.some(item => item["url"] == _url_candidate); 
          if (urlExistsOrNot){
              // exist, skip, nothing to do
            } else {
              // not exist, add new





            // convert orgId to org-name 
            if (_orgId_candidate){
                var org_name_response = await ajax_getjson_common("https://www.arcgis.com/sharing/rest/portals/" + _orgId_candidate + "?f=json");
                
                if (org_name_response.name){
                  _orgName_candidate = org_name_response.name
                }
                if (org_name_response.orgUrl){
                  _orgName_candidate += " " + org_name_response.orgUrl 
                }

                /*  
                // not use, too much info, only use name and orgUrl
                if (org_name_response.orgPhone){
                  name += " {" + org_name_response.orgPhone + "}"
                }
                // not use, too much info, only use name and orgUrl
                if (org_name_response.orgEmail){
                  _orgName_candidate += " {" + org_name_response.orgEmail + "}"
                }
                */
                
            }//if 


          
            if (_orgName_candidate){

                      // if org name exist, then only use it. ignore others.
                      _name_candidate = _orgName_candidate

            } else {

                // org name is not exist, then use combination of all others. 
                _name_candidate = "";
                
                if (_orgId_candidate){

                  // for some reason, failed to get org name by orgId, then use orgId as name
                  // this should be rare.
                  _name_candidate += " orgId: " + _orgId_candidate

                } 
                
                if (_owner_candidate){

                  // half of layer or servers has no orgId, then use owner name as name, 
                  // owner means a real person, who upload this feature server or layer
                  _name_candidate += " Owner: " + _owner_candidate

                } 
                
                if (_accessInformation_candidate){
                  _name_candidate += " accessInfo: " + _accessInformation_candidate
                }

                if (_source_candidate){
                  _name_candidate += " source: " + _source_candidate
                }

           
            }

             
         
             

              // fix bug, coeur d'Alene tribe
              // and other special char should be removed.
              if (_name_candidate.includes("'")){
                  _name_candidate = _name_candidate.replace("'","`");
              } else if (_name_candidate.includes("\\")){
                  // _name_candidate = _name_candidate.replace("\\", "");
              } else if (_name_candidate.includes("\/")){
                  // _name_candidate = _name_candidate.replace("\/","");
              } else if (_name_candidate.includes(",")){
                // comma must be removed 
                  // _name_candidate = _name_candidate.replace(","," ");
              }
              
              
              

              
              // get arcgis rest serverice instance name, 
              _serial_number = get_serial_no_from_url(_url_candidate)
              _service_number = get_service_no_from_url(_url_candidate)
              _domain_candidate = get_domain_name_from_url(_url_candidate)
              _any_instance = get_instance_name_from_url(_url_candidate)

              // online
              if (_serial_number){
               // online

                        // 1st priority serial number
                        _serialNo_domain_name = _serial_number

                        // 2nd priority, services is not default
                        if (_service_number !== "services"){
                          _serialNo_domain_name = _serial_number + "/" + _service_number
                        }
                  


                // portal
              } else {
                // portal

                        _serialNo_domain_name = _domain_candidate
                      
                        if (_any_instance !== "arcgis"){
                          _serialNo_domain_name = _domain_candidate + "/" + _any_instance
                        }

                       
              }
              

              this_element = {
                      "name":_name_candidate,
                      "org":_serialNo_domain_name,  
                      "url":_url_candidate
                    }



              
              if (_serial_number){
                        // 32 serial number do not works, so ignore 32
                        if (_serial_number.length < 17){
                            standard_array.push(this_element) 
                        }//if 32
              } else {
                        standard_array.push(this_element) 
              }//if


           

              _this_pageStandardArray.push(this_element)
              
            }
          }//if r e s t / s e r v i c e s

        }//for



        console.log("after convert standard array", _this_pageStandardArray)
        return _this_pageStandardArray
      }




                  

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
                              
                                



                              });

                
                }




            
                   
                   
                   
                  function empty_last_time_result(){
                     standard_json_to_html({});
                  }   
                   
                  
                   
                   
                   
                   
                   function stop_streaming(){
                                stop_search_status = true
                                console.log('  stop button clicked ===> ' )
                               
                   }
                   
                   
                   
                   
                   
                   
                  
                   function show_current(_current_showing) {
                      display_count_info('', _current_showing.length, __total_item_count, 'counter_label')
                      standard_json_to_html(_current_showing)
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
  
               
               
               
               init_global_var()

               
               
               init_ui_event_handler();

             

               init_streaming_event_handler();

               // url  ...&search_data=xxx
               search_by_url_param()
               

               // Can't be here, must wait until streaming compete, to do filter. 
               // url  ...&sfilter_by=xxx
               //filter_result_by_filter_by()

})(jQuery);
