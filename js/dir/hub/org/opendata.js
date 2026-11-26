




  // only for opendata api v3 q=xxx                  
  function prepare_streaming_url(){ 


    // do not reset to 0, because I need add multiple search result togeter.
    //u n i q u e_org_root_url_array = []
    //l a y e  r_url_array = []
    //s e r v e r_url_array = []


    _search_data_content = $('#search_data').val().toLowerCase().trim();   // .trim()  Removes only leading & trailing whitespaces;
    console.log('search  --->  ', _search_data_content)
    update_url_parameter('search_data', _search_data_content);
    document.getElementById("title").innerHTML = _search_data_content;

          var start_date_string = $('#start_date').val().trim();   // .trim()  Removes only leading & trailing whitespaces;
          var end_date_string = $('#end_date').val().trim();
          var type_of_service_string = $('#type_of_service').val().trim();
          var open_data_string = $('#open_data').val().trim();

          
              
    //___url_getJson ="https://opendata.arcgis.com/api/v3/search?filter[openData]=true&filter[type]=Feature Service&filter[created]=between(2026/01/01,2026/02/01)"

    ___url_getJson ="https://opendata.arcgis.com/api/v3/search?"
    ___url_getJson += "filter[openData]=" + open_data_string + "&filter[type]=" + type_of_service_string
    ___url_getJson += "&filter[created]=between(" + start_date_string + "," + end_date_string + ")"

    if (_search_data_content){
      ___url_getJson += "&q=" + _search_data_content 
    }

        console.log('___url_getJson', ___url_getJson)

        start_streaming()
       

  }





                   
async function start_streaming(){
                       
        stop_search_status = false;
      

        // each time user click search button, start new streaming, let total accumulate..
        // by comment out this line
        //input_current = [];  

       


        // display do not show historical 
        empty_last_time_result()
        $('#counter_label').text('searching...');
        
        //console.log(___url_getJson)
        var _this_page_raw_return = {} 
        var _next_page_url = ___url_getJson;
        
        _this_page_raw_return = await ajax_getjson_common(_next_page_url);
        console.log('this page raw return', _this_page_raw_return)
        
        __total_item_count = _this_page_raw_return.meta.stats.totalCount;
        
       
        var loop = Math.ceil(__total_item_count / 20 )
        console.log("total loop needed is : ", loop)

        for (i = 0; i < (loop);  i++){ 

            // this is previous loop data
            // only for opendat v3 api,  .data
            if ((_this_page_raw_return) && (_this_page_raw_return.data)){ // only for opendat v3 api,  .data
              // only for opendat v3 api,  .data
              
              __this_page_array = await convert_rawJson_to_jsonArray(_this_page_raw_return.data);
              standard_json_to_html(__this_page_array)

              // only for show user downloading progress, with latest result on top,
              if (__this_page_array){
        input_current = __this_page_array.concat(input_current);
      }
             
              // for count of item
              display_count_info('', input_current.length, __total_item_count, 'counter_label')
              // for count of loop
              display_count_info('', i, loop, 'counter_label2')

            } else {

                console.log(" last loop is bad, nothing get back, just skip it, go next one")

              }// if
            
            // only run if  user clicked the stop button, killed streaming 
            if (stop_search_status){
              break; // break for loop
            }
              

            // sometimes, this page is bad, nothing get, next page isn't available,
            // keep trying this page, until get nextPage url
            if (_this_page_raw_return){

              // last page, does not have .next
              if (_this_page_raw_return.meta.next){
                  _next_page_url = _this_page_raw_return.meta.next;
                  _this_page_raw_return = await ajax_getjson_common(_next_page_url);
              } else {
                  console.log('you reach last page, there is no NEXT Page.', _this_page_raw_return.meta)
                  break; // for loop
              }

            } else {
              i = i - 1
              _this_page_raw_return = await ajax_getjson_common(_next_page_url);
            }
                       
        } // for pages
                          
        console.log(' stream ended, final showing ----###--- ',  input_current)
        // when streaming ended, update the final result , show partial result for what we already have 
        show_current(input_current)

       
        
        // url  ...&sfilter_by=xxx,  always, all time show filtered results
        filter_result_by_filter_by()
    
}
                   
        



// - - -  convert raw json to standard array for display in html  - - - 
    

// only for open-data v3 api,  .data

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
var _organization_candidate // is one of layer properties,


var _serial_number
var _service_number
var _any_instance
var _domain_candidate

var urlObject
var start_position
var urlExistsOrNot
var this_element


  // only for streaming, 
  // only for opendat v3 api,
  // this is different from static
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
          _organization_candidate = ""

          _serial_number = ""
          _service_number = ""
          _any_instance = ""
          _domain_candidate = ""

          urlObject = ""


          start_position = ""
          
          urlExistsOrNot = ""
          this_element = ""
          // must reset to empty for each loop



          _url_candidate = raw_json_array[i].attributes.url; 
          // never to lower case, because it will mess up 16 serial number
          //if (_url_candidate){ _url_candidate = _url_candidate.toLowerCase()}
         
          _orgId_candidate = raw_json_array[i].attributes.orgId; 
          // use this URL to look up org name by orgId https://www.arcgis.com/sharing/rest/portals/<orgId>?f=json
          
          _orgName_candidate = raw_json_array[i].attributes.orgName;

          _organization_candidate = raw_json_array[i].attributes.organization;

          _source_candidate = raw_json_array[i].attributes.source; 

          _owner_candidate = raw_json_array[i].attributes.owner; // owner means a real person, who upload this feature server or layer
          
          




          // undefined.includes cause error, must use and 
        if (_url_candidate && _url_candidate.includes("/rest/services")){
            
            
            
            start_position = _url_candidate.indexOf("/rest/services")
            _url_candidate = _url_candidate.substring(0,start_position) + "/rest/services"
            urlExistsOrNot = standard_array.some(item => item["url"] == _url_candidate); 
          if (urlExistsOrNot){
              // exist, skip, nothing to do
            } else {
              // not exist, add new




              
              if (_orgName_candidate){
                _name_candidate = _orgName_candidate

              } else if (_organization_candidate){
                _name_candidate = _organization_candidate

              } else {
                
                // org name is not exist, then use combination of all others. 
                _name_candidate = "";

                if (_source_candidate){
                  _name_candidate += " source: " + _source_candidate
                }


                if (_owner_candidate){

                  // half of layer or servers has no orgId, then use owner name as name, 
                  // owner means a real person, who upload this feature server or layer
                  _name_candidate += " Owner: " + _owner_candidate

                } 

                if (_orgId_candidate){

                  // for some reason, failed to get org name by orgId, then use orgId as name
                  // this should be rare.
                  _name_candidate += " orgId: " + _orgId_candidate

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





//  - - -  end  - - -  convert raw json to standard array for display in html  - - - 
    

















