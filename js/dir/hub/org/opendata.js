




  //  q=xxx                  
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
      
        input_current = [];  // partially accumulate..

       
        empty_last_time_result()
        $('#counter_label').text('searching...');
        
        //console.log(___url_getJson)
        var _this_page_raw_return = {} 
        var _next_page_url = ___url_getJson;
        
        _this_page_raw_return = await ajax_getjson_common(_next_page_url);
        console.log('this page raw return', _this_page_raw_return)
        
        __total_item_count = _this_page_raw_return.meta.stats.totalCount;
        console.log("total loop needed is : ", __total_item_count / 20)
        
        var loop = Math.floor(__total_item_count / 20 )

        for (i = 0; i < (loop);  i++){ 

            // this is previous loop data
            // only for opendat v3 api,  .data
            if ((_this_page_raw_return) && (_this_page_raw_return.data)){ // only for opendat v3 api,  .data
              // only for opendat v3 api,  .data
              
              __this_page_array = await convert_rawJson_to_jsonArray(_this_page_raw_return.data);
              rendering_json_to_html(__this_page_array)

              // only for show user downloading progress, with latest result on top,
              input_current = __this_page_array.concat(input_current);
             
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
              }

            } else {
              i = i - 1
              _this_page_raw_return = await ajax_getjson_common(_next_page_url);
            }
                       
        } // for pages
                          
        // in case of user clicked pause, when streaming ended, update the final result , show partial result for what we already have 
        show_current(input_current)
        console.log(' stream ended, final showing ----###--- ',  input_current)

       
        
        // url  ...&sfilter_by=xxx,  always, all time show filtered results
        filter_result_by_filter_by()
    
}
                   
        



// - - -  convert raw json to standard array for display in html  - - - 
    
var name, org, url;
var _url_candidate

var _name_candidate
var _source_candidate
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


  // only for streaming, 
  // only for opendat v3 api,
  // this is different from static
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
          _source_candidate = ""
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



          _url_candidate = raw_json_array[i].attributes.url; 
          // never to lower case, because it will mess up 16 serial number
          //if (_url_candidate){ _url_candidate = _url_candidate.toLowerCase()}

          _orgId_candidate = raw_json_array[i].attributes.orgId; 
          // use this URL to look up org name by orgId https://www.arcgis.com/sharing/rest/portals/<orgId>?f=json
          
          _orgName_candidate = raw_json_array[i].attributes.orgName;

          _source_candidate = raw_json_array[i].attributes.source; 

           


          
          _owner_candidate = raw_json_array[i].attributes.owner; // owner means a real person, who upload this feature server or layer
          
          




          // skip tile.arcgis.com
          if (_url_candidate 
            && _url_candidate.includes("/rest/services") 
          ){
    /*
            && !(_url_candidate.includes("tiles.arcgis.com"))  // do not handle tiles, so exclude them
            && !(_url_candidate.includes("utility.arcgis.com"))  // these kind have 32 char serial number, always not working, so exclude them
          ){
    */
            
            
            
            start_position = _url_candidate.indexOf("/rest/services")
            url = _url_candidate.substring(0,start_position) + "/rest/services"
            urlExistsOrNot_customDomain = custom_domain_array.some(item => item["url"] == url); 
            urlExistsOrNot_serialNo = arcgis_domain_serialNo_array.some(item => item["url"] == url); 
            if ((urlExistsOrNot_customDomain) || (urlExistsOrNot_serialNo)){
              // exist, skip, nothing to do
            } else {
              // not exist, add new




              
              if (_orgName_candidate){
                _name_candidate = _orgName_candidate
              } else if (_source_candidate){
                _name_candidate = _source_candidate
              } else if (_owner_candidate){
                _name_candidate = _owner_candidate
              } else if (_orgId_candidate){
                _name_candidate =_orgId_candidate
              } else {
                _name_candidate = "org-name"
              }

              name = _name_candidate


              
             // fix bug, coeur d'Alene tribe
              // and other special char should be removed.
              if (name.includes("'")){
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





//  - - -  end  - - -  convert raw json to standard array for display in html  - - - 
    









function rendering_json_to_html(_results) {
      
  var html = '';
  html += '<div>';
  if (_results.length > 0) {
    html += '<ol>';
    for (var i = 0; i < _results.length; ++i){

       var _name = _results[i].name
       var _org  = _results[i].org
       var _url = _results[i].url

       

      

          html += '<li>' 


          // check url have 16 serial number or not
          if (get_serial_no_from_url(_url)){

            // for arcgis.com domain, with 16 serial number, use span tag

                  html += '<span onclick="open_popup_home(\''                    
                  html +=  _name + '\', \'' +  _url 
                  html += '\')">' 

                  

                  if (_name){
                    html += '<span class="context" style="cursor: pointer;font-size:small;">' +  _name  +  '</span>' 
                  }

                  if (_org){
                    html +=  '<sup><span class="context" style="cursor: pointer; font-size:xx-small;">' +   _org + '</span></sup>' 
                  }

                  html +=  '</span>'  
                  
                  


            } else {

              // for custom domain, without 16 serial number, use a tag

               html += '<a target="_blank" href="#" onclick="open_popup_home(\''                    
                  html +=  _name + '\', \'' +  _url
                  html += '\')">' 

                  if (_name){
                    html += '<span class="context" style="cursor: pointer;font-size:small;">' +  _name  +  '</span>' 
                  }

                  html +=  '</a>'

                  if (_org){
                    html +=  '<sup><span class="context" style="cursor: pointer; font-size:xx-small;">' +   _org + '</span></sup>' 
                  }

                 


            }//if




            
            html += '</li>';  
            
            
       
    }// for
    html += '</ol>';
  } 
  html +='</div>'
   $('#json-renderer').html(html);
            
}  
   










