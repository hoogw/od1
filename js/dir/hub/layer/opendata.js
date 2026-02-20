




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
          var collection_data_string = $('#collection_data').val().trim();
          var open_date_string = $('#open_date').val().trim();

          
              
    //___url_getJson ="https://opendata.arcgis.com/api/v3/search?filter[openData]=true&filter[collection]=any(Dataset)&filter[created]=between(2025/11/01,2026/02/16)"

    ___url_getJson ="https://opendata.arcgis.com/api/v3/search?"
    ___url_getJson += "filter[openData]=" + open_date_string + "&filter[collection]=" + collection_data_string
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
        
        // only for search hub,           
        __total_item_count = _this_page_raw_return.meta.stats.totalCount;
          
          
        for (i = 0; i < (__total_item_count / 20 ); i++){ 
              
                    // only run if  user clicked the stop button, killed streaming 
                    if (stop_search_status){
                                  // stop = true, means user clicked the stop button, killed streaming 

                                  // in case of user clicked pause, when streaming ended, update the final result , show partial result for what we already have 
                                  show_current(input_current)
                                  console.log(' stop, killed, final showing ----###--- ',  input_current)
                                  console.log("stop, killed,, unique_org_root_url_array", unique_org_root_url_array)



                                  // url  ...&sfilter_by=xxx,  show filtered results
                                  filter_result_by_filter_by()

                                  return;  // return streaming function ( include break for loop )
                    }
              
              
              
              
              
              
              
              
                        _this_page_raw_return = {}

                        _this_page_raw_return = await ajax_getjson_common(_next_page_url);
              
              
                          
                        if ((_this_page_raw_return) && (_this_page_raw_return.data)){
                            
                                  var __this_page_array = _this_page_raw_return.data
                        
                        
                                      // we want to add new array from the beginning of old array, to show changing to the user. 
                                      //https://stackoverflow.com/questions/8073673/how-can-i-add-new-array-elements-at-the-beginning-of-an-array-in-javascript
                                        // input_current = input_current.concat(_this_page_raw_return.data);
                                        
                                        //hub.data.search.js:668 Uncaught (in promise) TypeError: input_current.unshift is not a function
                                        //unshift only works for 1 element, not work for another array.
                                        // input_current = input_current.unshift(_this_page_raw_return.data);
                                        
                                        

                                        // only for show user downloading progress, with latest result on top,
                                        input_current = __this_page_array.concat(input_current);
                                        display_count_info('', input_current.length, __total_item_count, 'counter_label')
                                        rendering_json_to_html(__this_page_array)

                                          _next_page_url = _this_page_raw_return.meta.next;
                                          
              
                        }// if
                        
                        
        } // for pages
                          
        // in case of user clicked pause, when streaming ended, update the final result , show partial result for what we already have 
        show_current(input_current)
        console.log(' stream ended, final showing ----###--- ',  input_current)

        console.log("stream ended, unique_org_root_url_array", unique_org_root_url_array)
        
        // url  ...&sfilter_by=xxx,  always, all time show filtered results
        filter_result_by_filter_by()
    
}
                   
        


//  for search.js only,   featuretable only have rest api, NO geojson, NO csv
function rendering_json_to_html(_results) {

    var html = '';            
    html += '<div>';                           
    if (_results.length > 0){                 
        html += '<ol>';
        for (var i = 0; i < _results.length; ++i){

        

            // ********************  only    calculate for hub.arcgis.com , opendata.arcgis.com    only   ****************************
            /**/
            // ...... attributes ......
                var ___url_with_mapserver_id= _results[i].attributes.url;     //"https://exploreajax.ajax.ca/mapajax/rest/services/Open_Data/Ajax_Open_Data/MapServer/5"
                var _name = _results[i].attributes.name;     //name: "Ajax POI"
                var _orgId = _results[i].attributes.orgId;    
                var _orgName = _results[i].attributes.orgName;    
                var _organization = _results[i].attributes.organization; 
                  
                var _hasApi = _results[i].attributes.hasApi;    
                var _hubType = _results[i].attributes.hubType;     //hubType: "Feature Layer" or "Table"
                var _type = _results[i].attributes.type;

                 
                      
              if ( _orgName == undefined) { _orgName = '' }
              if ( _organization == undefined) { _organization = '' }
              //console.log(' hasApi  organization  ___url  -> ', i, _organization ,  _hasApi,___url )
              //console.log(' hubType  ',   _hubType, i)
          // ...... end ..........  attributes ......
          /**/

            // ....... links .........
                  var _esriRest_links = _results[i].links.esriRest
                  var _itemPage_links = _results[i].links.itemPage
                  var _rawEs_links = _results[i].links.rawEs
                  var _self_links = _results[i].links.self
            // ...... end ..........  links .........
              /**/
            // ******************** end *************** only      calculate for hub.arcgis.com , opendata.arcgis.com    only   ****************************
            /**/
                                                    
                                                      
          // ....... strip HTML from a string  .....
            
          
                // https://ourcodeworld.com/articles/read/376/how-to-strip-html-from-a-string-extract-only-text-content-in-javascript
          
                // ==== first step: remove html tag
              
                var _name_stripedHtml = $("<div>").html(_name).text();
                
                // regular express remove <xxx> tag 
                // str = str.replace(/[^a-z0-9-]/g, '');
                /*
                    Everything between the indicates what your are looking for

                    / is here to delimit your pattern so you have one to start and one to end
                    [] indicates the pattern your are looking for on one specific character
                    ^ indicates that you want every character NOT corresponding to what follows
                    a-z matches any character between 'a' and 'z' included
                    0-9 matches any digit between '0' and '9' included (meaning any digit)
                    - the '-' character
                    g at the end is a special parameter saying that you do not want you regex to stop on the first character matching your pattern but to continue on the whole string
                  */
                //_description_stripedHtml = _description_stripedHtml.replace(/<[^>]+>/g, '');
                //_name_stripedHtml = _name_stripedHtml.replace(/<[^>]+>/g, '');



                // ==== second step: encode >, <, 
                
                
                _name_stripedHtml = _name_stripedHtml.replace(/</g, '&lt;');
                _name_stripedHtml = _name_stripedHtml.replace(/>/g, '&gt;');
                
          // ....... end ......  strip HTML from a string  .....


    /**/ 
    // *********** hubType: feature layer,feature service ,only,  handle rest api URL   ***********
    if (_hubType.toLowerCase().includes('feature')){
    // *************** calculate layer id only ***************
               
                  
                  var ___url_split_array = []
                  var ___layer_id = -99999
                  var ___layer_id_string = ''
                  var ___url = ''
                  
                  if(typeof ___url_with_mapserver_id !== "undefined"){

                                                  ___url_split_array = ___url_with_mapserver_id.split("/")

                                                  console.log(' layer id is number ? ',  ___url_split_array[___url_split_array.length-1])
                                                    
                                                  if (isNaN(___url_split_array[___url_split_array.length-1])){
                                                      ___layer_id = -99999
                                                      ___url = ___url_with_mapserver_id
                                                      console.log(' this is feature server or map server, without layer id',  ___layer_id)
                                                    } else {
                                                      ___layer_id = ___url_split_array[___url_split_array.length-1]
                                                      ___layer_id_string = '/'+ ___layer_id.toString()
                                                      ___url = ___url_with_mapserver_id.replace(___layer_id_string, "");
                                                  }
                  
                  

                                  // ---- fix bug, _results[i].rest_url = http://xxx, window.location.protocol must use http, can not use https(original), mix content error.
                                                        var _link_protocal = window.location.protocol;
                                                        var _link_url_parameter = ___url_with_mapserver_id;
                                                        if (_link_url_parameter.indexOf('http://') > -1)
                                                    {

                                                            // if resource url is http, force link protacal as http: 
                                                            _link_protocal = 'http:'
                                                        }// if
                                                  // ------ end fix bug,
                  
                  
                  
                  } else {
                      
                      
                      
                      
                  }

    // ************** end ************** calculate layer id only ***************
    /**/
    /*  ... ... ....  naming match from hub.html to search.html  ... ... ....  */

        var __layerId = ___layer_id
      
        var __restapi_url = ___url
        // for esri classic v3.x only
        var _accessURL = ___url + '/'+ ___layer_id

    /*  ... ... .... end    ... ... ....  naming match from hub.html to search.html  ... ... ....  */
    /**/
            


   


    // check if already exist, will skip exist, only need unique
    var start_position = __restapi_url.indexOf("/rest/services")
    var rest_endpoint_candidate = __restapi_url.substring(0,start_position) + "/rest/services"
    var urlExistsOrNot = unique_org_root_url_array.some(item => item["root-url"] == rest_endpoint_candidate); 
    if (urlExistsOrNot){
      // exist, skip, nothing to do
    } else {
      // not exist, add new
      unique_org_root_url_array.push({
        "org":_orgName,  
        "root-url": rest_endpoint_candidate
      })
      console.log("add new url", _orgName, rest_endpoint_candidate)
    }

  

    if (___layer_id !== -99999){

       // this is feature layer, layer id have something.
       console.log("layer-id", __layerId)
       console.log("layer-name", _name_stripedHtml)
       console.log("layer-url", __restapi_url)
       console.log("backgroundlayerurl=", _accessURL)



      

      var _current_layer_type = "Feature Layer"
      var _current_layer_name = _name_stripedHtml
      var this_layer_id = __layerId
      var _____layer_url = __restapi_url


      html += '<li>' 

              html += '<span onclick="open_popup(\''                    
              html +=  this_layer_id + '\', \'' + _current_layer_name + '\', \'' + _current_layer_type + '\', \'' +  _____layer_url
              html += '\')" class="context" style="cursor: pointer; font-size:xx-small;">' 
              
              if (_current_layer_name){
                html +=   _current_layer_name
              }

              if (_orgName){
                html +=  '<sup class="context" style="cursor: pointer; font-size:xx-small;">' +   _orgName + '</sup>' 
              }

              html +=  '</span>' 

        /*
              // not use, but keep, open original url endpoint
              html += '<span onclick="window.open(\''                    
              html +=  _accessURL + '\', \'_blank\')"'
              html += ' class="context" style="cursor: pointer; font-size:xx-small;">' 
              html +=   _current_layer_name +  '</span>'   
              html +=  '<sup class="context" style="cursor: pointer; font-size:xx-small;">' +   _orgName + '</sup>' 
        */
            
      html += '</li>'; 

     


        // skip already exist record
        var urlExistsOrNot = layer_url_array.some(item => item["layer-url"] == _accessURL); 
        if (urlExistsOrNot){
          // exist, skip, nothing to do
        } else {
                  // not exist, add new
                  layer_url_array.push({
                    "org":_orgName, 
                    "layer-name":_name_stripedHtml,
                    "layer-id": __layerId,
                    "layer-url": _accessURL, 
                    "server-url": __restapi_url,
                    "root-url": rest_endpoint_candidate
                  })
        }//if


    } else {

                // feature server, don't have layer id, (id is -1)
                console.log(' show link for feature server or map server, without layer id',  ___layer_id)
                console.log("feature-server-url", __restapi_url)
                console.log("feature-server-name", _name_stripedHtml)



                 html += '<li>'

                    html += '<span onclick="open_popup_server(\''                    
                    html +=   _name_stripedHtml + '\', \''  +  'Feature Server'  +  '\', \''  +  __restapi_url
                    html += '\')" class="context" style="cursor: pointer; font-size:small; font-weight:bold;">' 
                    
                    
                    if (_name_stripedHtml){
                      html +=   _name_stripedHtml
                    }
                    if (_orgName){
                     html +=  '<sup class="context" style="cursor: pointer; font-size:xx-small;">' +   _orgName + '</sup>' 
                    }

                    html +=     '</span>'   
                   
                 
                 /*
                 // not use, but keep, open original url endpoint
                    html += '<span onclick="window.open(\''                    
                    html +=  __restapi_url + '\', \'_blank\')"'
                    html += ' class="context" style="cursor: pointer; font-size:small; font-weight:bold;">' 
                    html +=   _name_stripedHtml +  '</span>'   
                    html +=  '<sup class="context" style="cursor: pointer; font-size:xx-small;">' +   _orgName + '</sup>' 
                 */
                html += '</li>';

     


                // skip already exist record
                var urlExistsOrNot = server_url_array.some(item => item["server-url"] == __restapi_url); 
                if (urlExistsOrNot){
                  // exist, skip, nothing to do
                } else {
                          // not exist, add new
                          server_url_array.push({
                            "org":_orgName, 
                            "server-name":_name_stripedHtml,
                            "server-url": __restapi_url,
                            "root-url": rest_endpoint_candidate
                                                  })
                }//if


    }// if layer id -1

} 
                              
// *********** end ***********   hubType: feature layer, collection, service only,  handle rest api URL   ***********
                              /**/
                                          
                
                                }// for
                                                  
                            html += '</ol>';
                              
                          } 
                              
                          
                    html +='</div>'
                                
                    $('#json-renderer').html(html);
                              
}  // function













      
 /**/
                  //  --- papaparse   --- 
                  /**/
                  
                  var inputType = "string";
                  var stepped = 0, rowCount = 0, errorCount = 0, firstError;
                  var start, end;
                  var firstRun = true;
                  // do not limit length
                  //var maxUnparseLength = 1000000;
          
          
          
               
          
          
                  // must wait until csv parse completed at function completeFn
                  function parse_json_to_csv_string(_csv_ready_json){


                      
          
                      //  . . . papaparse  . . . demo . . .  https://www.papaparse.com/demo
          
                      stepped = 0;
                      rowCount = 0;
                      errorCount = 0;
                      firstError = undefined;
          

                      start = now();
                      var csv_string = Papa.unparse(_csv_ready_json, 
                     
                          // config see demo.js https://www.papaparse.com/demo
                          {
                            delimiter: ',', // The delimiting character. Usually comma or tab. Default is comma.
                            header: true, // Keys data by field name rather than an array.
                            dynamicTyping: true, // Turns numeric data into numbers and true/false into booleans.
                            //skipEmptyLines: true, // By default, empty lines are parsed; check to skip.
                            // preview: 100, //If > 0, stops parsing after this many rows.
                            // step: stepFn, // not use, only when very large file
                            // encoding: 'UTF-8', // Only applies when reading local files. Default is specified by the browser (usually UTF-8).
                            //worker: false, // Uses a separate thread so the web page doesn't lock up.
                            // comments: '',  // If specified, skips lines starting with this string.
                            complete: completeFn,
                            error: errorFn,
                            //download: true,
                          }
                        )

                        end = now();


                     // do not limit length   
                     // if (csv_string.length > maxUnparseLength){
                     //     csv_string = csv_string.substr(0, maxUnparseLength);
                     //      console.log("(Results truncated for brevity)");
                     // }
                  
                      console.log('final csv string ', csv_string);


                      return csv_string
                      
                      // . . . end  . . . papaparse  . . . 
          
                  }
           
            
                    function stepFn(results, parser)
                    {
                      stepped++;
                      if (results)
                      {
                        if (results.data)
                          rowCount += results.data.length;
                        if (results.errors)
                        {
                          errorCount += results.errors.length;
                          firstError = firstError || results.errors[0];
                        }
                      }
                    }
          
                    function completeFn(results)
                    {
                      end = now();
          
                      if (results && results.errors)
                      {
                        if (results.errors)
                        {
                          errorCount = results.errors.length;
                          firstError = results.errors[0];
                        }
                        if (results.data && results.data.length > 0)
                          rowCount = results.data.length;
                      }
          
                      printStats("Parse complete",  results);

                     
                      
          
                    }
          
          
          
          
          
          
                    function errorFn(err, file)
                    {
                      end = now();
                    }
          
          
                    function now()
                    {
                      return typeof window.performance !== 'undefined'
                          ? window.performance.now()
                          : 0;
                    }
          
          
          
                    function printStats(msg)
                    {
                      if (msg)
                        console.log(msg);
                      console.log("       Time:", (end-start || "(Unknown; your browser does not support the Performance API)"), "ms");
                      console.log("  Row count:", rowCount);
                      if (stepped)
                        console.log("    Stepped:", stepped);
                      console.log("     Errors:", errorCount);
                      if (errorCount)
                        console.log("First error:", firstError);
                    }
          
          
          /**/
          //  --- end  ---  papaparse    --- 
          /**/
             


