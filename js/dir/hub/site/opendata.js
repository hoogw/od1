








  
  
  function rendering_json_to_html(_results) {

        var html = '';
        html += '<div>';
        if (_results.length > 0) {
           html += '<ol>';
          for (var i = 0; i < _results.length; ++i){



    // ********************  only    calculate for hub.arcgis.com , opendata.arcgis.com    only   ****************************
          // sometime attributes.url is NOT null, but attributes.siteUrl is null.   if url is null, siteUrl always is null
      var ___siteUrl = _results[i].attributes.url;   // true site url 
      var ___siteUrl_alternative = _results[i].attributes.siteUrl;  


      var hub_created_timestamp  = _results[i].attributes.created;
      var hub_created  = convertTimestampToHumanTime(hub_created_timestamp);
      var hub_modified_timestamp = _results[i].attributes.modified;
      var hub_modified = convertTimestampToHumanTime(hub_modified_timestamp);

      var _name = _results[i].attributes.name;   

      var hub_orgId = _results[i].attributes.orgId;    
      var hub_orgName = _results[i].attributes.orgName;    
      var hub_organization = _results[i].attributes.organization; 
      var hub_orgContactEmail = _results[i].attributes.orgContactEmail; 
      var hub_owner = _results[i].attributes.owner;
      var hub_region = _results[i].attributes.region;   


                      
      var org_short_name = ''
      org_short_name = getStringBetweenChars(___siteUrl, '-', '.hub.arcgis.com')
      if (!(org_short_name)){org_short_name = getStringBetweenChars(___siteUrl, '-', '.opendata.arcgis.com')}

var hubsite_short_name = ''
hubsite_short_name =  getStringBetweenChars(___siteUrl, '/', '.hub.arcgis.com')
if (!(hubsite_short_name)){hubsite_short_name =  getStringBetweenChars(___siteUrl, '/', '.opendata.arcgis.com')}




      var portal_json_url = ''
      if (hub_orgId){ portal_json_url = 'https://www.arcgis.com/sharing/rest/portals/' +  hub_orgId + '?f=pjson'}

      var org_home_page_url = ''
      var org_home_gallery_url = ''
if (org_short_name){ 
org_home_page_url = 'https://' +  org_short_name + '.maps.arcgis.com'
org_home_gallery_url = org_home_page_url + portal_gallery_html
}
      
      var esri_hosted_arcgis_server_url = ''
      if (hub_orgId){ esri_hosted_arcgis_server_url = 'https://services.arcgis.com/'  + hub_orgId + '/arcgis/rest/services'}



    // ******************** end *************** only      calculate for hub.arcgis.com , opendata.arcgis.com    only   ****************************




                  html += '<li style="font-size:xx-small;">' 
                  
                  //    ++++++++++++++++    open popup when click  name     ++++++++++++++++ 
                    // text  -   context class for mark.js highlight , no tool-tip , no link
                    html += '<span class="context" onclick="open_popup_online(\''                    
                    html +=  _name + '\', \''  +  ___siteUrl
                    html += '\')">' 
                    
                    if (_name){
                      html += '<span class="context" style="cursor: pointer;font-size:small;">' +  _name  +  '</span>' 
                    }
                    
                    html +=  '</span>'    
                    
                 //    ++++++++++++++++   end  +++++++++++   open popup when click  name     ++++++++++++++++ 


                  html += '</li>';


                 
// check if already exist, will skip exist, only need unique             
var urlExistsOrNot = site_array.some(item => item["site-url"] == ___siteUrl); 
if (urlExistsOrNot){
  console.log("exist, skip, nothing to do", ___siteUrl)
} else {
  // not exist, add new
              site_array.push({
                     "site-name": _name,
                     "site-source": "",
                     "site-url": ___siteUrl,
                     "org-id": hub_orgId,
                     "org-short-name": org_short_name,
                     "org-name": hub_orgName,
                     "org-email": hub_orgContactEmail,
                     "owner": hub_owner,
                     "region": hub_region,
                      "view-count": "",
                     "created-timestamp": hub_created_timestamp,
                     "created ": hub_created,
                     "modified-timestamp": hub_modified_timestamp,
                     "modified ": hub_modified,
                  })

}//if 



          }// for

          

          html += '</ol>';
        } 

        html +='</div>'
        $('#json-renderer').html(html);
    
  }  // function
  
  
  
  
  


        
        // this function only run 1 time
        async function start_streaming(){
            
            
          stop_search_status = false;
        
          input_current = []; 

      



          var start_date_string = $('#start_date').val().trim();   // .trim()  Removes only leading & trailing whitespaces;
          var end_date_string = $('#end_date').val().trim();
          var collection_data_string = $('#collection_data').val().trim();
          var open_data_string = $('#open_data').val().trim();
            
          var ___url_getJson ="https://opendata.arcgis.com/api/v3/search?"
          ___url_getJson += "filter[openData]=" + open_data_string + "&filter[collection]=" + collection_data_string
          ___url_getJson += "&filter[created]=between(" + start_date_string + "," + end_date_string + ")"
          
          
          var _this_page_raw_return = {}
          var _next_page_url = ___url_getJson;

            

          // first time ajax only need total site number, not using the data
          _this_page_raw_return = await ajax_getjson_common(_next_page_url);
          
                                                    
            __total_item_count = _this_page_raw_return.meta.stats.totalCount;
          
          
                    
                    
                        // each ajax get 1 page 20 item                     
                        for (i = 0; i < (__total_item_count / 20 ); i++) { 
                        
                              // only run if  user clicked the stop button, killed streaming 
                              if (stop_search_status){
                                  break; // break for loop
                              }
                        
                        
                        
                        
                        
                              console.log(' for loop - next page url - ',  i,  _next_page_url)
                        
                        
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
                                                  
                                                  
                                                  input_current = __this_page_array.concat(input_current);

                                                   display_count_info('', input_current.length, __total_item_count, 'counter_label')
                                                   rendering_json_to_html(__this_page_array)
                                                  
                                                  

                                                    _next_page_url = _this_page_raw_return.meta.next;
                                                    
                                                    
                                                    
                                                    
                                                  
                                                  
                                                  
                        
                                  }// if
                                  
                                  

                                  

                        } // for
                        
                        
                        
                        
                      // in case of user clicked pause, when streaming ended, update the final result , show partial result for what we already have 
                      show_current(input_current)
                      console.log(' stream ended, final showing ----###--- ',  input_current)

                      // url  ...&sfilter_by=xxx,  always, all time show filtered results
                      filter_result_by_filter_by()
      
                  
        }
        
        
        
        