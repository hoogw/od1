


/*

    living atlas can be found at 
      
    any arcgis rest api, mapserver page,
    click 'view in' 'arcgis online map viewer'
    top menu, click 'add' button, choose 'living atlas'
    click 'living atlas' drop down, you can choose 'arcgis online' which have 10000 item. 
    living atlas, have 6400 item so far

    https://www.arcgis.com/home/webmap/viewer.html?url=https%3A%2F%2Fgis.la-quinta.org%2Farcgis%2Frest%2Fservices%2Fshort_term_vacation_rentals%2FSTVR_exempt_zone%2FMapServer&source=sd


      esri limit max 100 item per http request,  get from 1 - 100 , descending by view count

      decoded
      https://www.arcgis.com/sharing/rest/content/groups/47dd57c9a59d458c86d3d6b978560088/search?f=json&q=((type:"Map Service" OR type:"Image Service" OR type:"Feature Service" OR type:"Stream Service" OR type:"Vector Tile Service" OR type:"WMS" OR type:"WFS" OR type:"WMTS" OR type:"KML" OR type:"Feature Collection" OR type:"Feed") AND (-type:"KML Collection" AND -type:"Feature Collection Template")) (-typekeywords:"Elevation 3D Layer" AND -type:"Feature Collection Template")
      &num=100
      &sortOrder=desc
      start=1
      &sortField=numviews

      encoded
      https://www.arcgis.com/sharing/rest/content/groups/47dd57c9a59d458c86d3d6b978560088/search?f=json&q=((type%3A%22Map%20Service%22%20OR%20type%3A%22Image%20Service%22%20OR%20type%3A%22Feature%20Service%22%20OR%20type%3A%22Stream%20Service%22%20OR%20type%3A%22Vector%20Tile%20Service%22%20OR%20type%3A%22WMS%22%20OR%20type%3A%22WFS%22%20OR%20type%3A%22WMTS%22%20OR%20type%3A%22KML%22%20OR%20type%3A%22Feature%20Collection%22%20OR%20type%3A%22Feed%22)%20AND%20(-type%3A%22KML%20Collection%22%20AND%20-type%3A%22Feature%20Collection%20Template%22))%20(-typekeywords%3A%22Elevation%203D%20Layer%22%20AND%20-type%3A%22Feature%20Collection%20Template%22)&num=100&sortOrder=descstart=1&sortField=numviews


*/


  // only for atlas,  q=xxx                  
  function prepare_streaming_url(){  // only for atlas,
  // only for atlas,

    // do not reset to 0, because I need add multiple search result togeter.
    //u n i q u e_org_root_url_array = []
    //l a y e  r_url_array = []
    //s e r v e r_url_array = []


    _search_data_content = $('#search_data').val().toLowerCase().trim();   // .trim()  Removes only leading & trailing whitespaces;
    console.log('search  --->  ', _search_data_content)
    update_url_parameter('search_data', _search_data_content);
    document.getElementById("title").innerHTML = _search_data_content;

         
    // atlas sample 
    // https://www.arcgis.com/sharing/rest/content/groups/47dd57c9a59d458c86d3d6b978560088/search?f=json&start=1&num=5
    // &q=(type:+"Scene+Service"+OR+type:+"Feature+Collection"+OR+type:+"Feature+Service"+OR+type:+"Map+Service"+OR+type:+"Vector+Tile+Service"
    // +OR+type:+"Image+Service"+OR+type:+"WMS"+OR+type:+"Group+Layer")    
    

    // "-type" means do not include, or exclude,  
    // "type" means include
    // https://www.arcgis.com/sharing/rest/content/groups/47dd57c9a59d458c86d3d6b978560088/search?f=json
    // &q=((type:"Map Service" OR type:"Image Service" OR type:"Feature Service" OR type:"Stream Service" OR type:"Vector Tile Service" 
    // OR type:"WMS" OR type:"WFS" OR type:"WMTS" OR type:"KML" OR type:"Feature Collection" OR type:"Feed") 
    // AND (-type:"KML Collection" AND -type:"Feature Collection Template")) 
    // (-typekeywords:"Elevation 3D Layer" AND -type:"Feature Collection Template")
    // &num=100&sortOrder=desc&sortField=numviews&start=101

        
    //  get from 1 - 100 , descending by view count 
    // must add this param "&start=1" at the end of URL
              
    ___url_getJson ="https://www.arcgis.com/sharing/rest/content/groups/47dd57c9a59d458c86d3d6b978560088/search?f=json"
    ___url_getJson += "&num=100&sortOrder=desc&sortField=numviews"
    

    if (_search_data_content){
      ___url_getJson += "&q=(" + _search_data_content + ")" 
    } else {
      ___url_getJson += "&q=" + encodeURIComponent('(type:"Map Service" OR type:"Feature Service"  OR type:"Image Service")')
      //___url_getJson += "&q=" + encodeURIComponent('(type:"Image Service")')
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
        var _next_page_url = ___url_getJson + "&start=1" 
        
        _this_page_raw_return = await ajax_getjson_common(_next_page_url);
        console.log('this page raw return', _this_page_raw_return)
       
          __total_item_count = _this_page_raw_return.total;
          console.log("total loop needed is : ", __total_item_count / 100)

          var loop = Math.floor(__total_item_count / 100)

          for (i = 0; i < (loop); i++) { 

              // this is previous loop data
              if ((_this_page_raw_return) && (_this_page_raw_return.results)){
                
                __this_page_array = await convert_rawJson_to_jsonArray(_this_page_raw_return.results);
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
              
             
              
              _next_page_url = ___url_getJson + "&start=" +  ((i * 100) + 1).toString();
              console.log(' for loop - next page url - ',  i, ((i * 100) + 1).toString() ,  _next_page_url)
              // if i is bad request, nothing get, just skip i, go to next loop i+1
              _this_page_raw_return = await ajax_getjson_common(_next_page_url);


              

                        
        } // for pages




        // convert orgId to org-name 


                          
        // in case of user clicked pause, when streaming ended, update the final result , show partial result for what we already have 
        show_current(input_current)
        console.log(' stream ended, final showing ----###--- ',  input_current)
 
        // url  ...&sfilter_by=xxx,  always, all time show filtered results
        filter_result_by_filter_by()
    
}
                   
        






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
   










