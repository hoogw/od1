




function rendering_json_to_html(_results) {

  var html = '';
  html += '<div>';              
  if (_results.length > 0) {

      html += '<ol>';
      for (var i = 0; i < _results.length; ++i){



// ********************  only    calculate for hub.arcgis.com , opendata.arcgis.com    only   ****************************

// sometime attributes.url is NOT null, but attributes.siteUrl is null.   if url is null, siteUrl always is null
var ___siteUrl = _results[i].properties.url;   // true site url 

// - - hub only - -
var _source = _results[i].properties.source;
var _title = _results[i].properties.title;

var hub_name = _results[i].properties.name;
var hub_orgId = _results[i].properties.orgId;    
    
var hub_created  = convertTimestampToHumanTime(Number(_results[i].properties.created));
var hub_modified = convertTimestampToHumanTime(Number(_results[i].properties.modified));

var hub_owner = _results[i].properties.owner;

// - - hub only - -
var hub_numViews = _results[i].properties.numViews; 

var hub_id = _results[i].properties.id;

var hub_description = _results[i].properties.description;

var hub_created_timestamp  = _results[i].properties.created;
var hub_created  = convertTimestampToHumanTime(hub_created_timestamp);
var hub_modified_timestamp = _results[i].properties.modified;
var hub_modified = convertTimestampToHumanTime(hub_modified_timestamp);



//- - only opendata v3 - - removed on hub v1  - - 

//var hub_orgName = _results[i].properties.orgName;    
//var hub_organization = _results[i].properties.organization; 
//var hub_orgContactEmail = _results[i].properties.orgContactEmail; 

//var hub_region = _results[i].properties.region;
//var hub_searchDescription = _results[i].properties.searchDescription;
//var hub_server = _results[i].properties.server;
//var hub_siteUrl = _results[i].properties.siteUrl;
//var hub_slug = _results[i].properties.slug;
//var hub_sourceProvenance = _results[i].properties.sourceProvenance;
//var hub_hubType = _results[i].properties.hubType;

//var links_self = _results[i].links.self;
//var links_rawEs = _results[i].links.rawEs;
//var links_itemPage = _results[i].links.itemPage;
//var links_esriRest = _results[i].links.esriRest;


//   - - end - - only opendata v3 - - removed on hub v1  - - 






var hub_type = _results[i].properties.type;

var hub_url = _results[i].properties.url;
var hub_snippet = _results[i].properties.snippet;
var hub_culture = _results[i].properties.culture;

// - - hub only - -
var links_href = _results[i].links.href;



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
                    html +=  _source + '\', \''  +  ___siteUrl
                    html += '\')" class="context" style="cursor: pointer; font-size:small;">' 
                    

                    if (_source){
                    html +=   _source 
                    }
                    
                    if (_title){
                      html += '<sup class="context"><small>'  + _title + '</small></sup>'
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
                     "site-name": _title,
                     "site-source": _source,

                     "site-url": ___siteUrl,
                     "org-id": hub_orgId,
                     "org-short-name": org_short_name,
                     "org-name": "",
                     "org-email": "",
                     "owner": "",
                     "region": "",
                     "view-count": hub_numViews,
                     "created-timestamp": "",
                     "created ": hub_created,
                     "modified-timestamp": "",
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

                                    
          // must convert YYYY-MM-DD to unix time (millisec) 15 digital 
          var start_date_string = Date.parse($('#start_date').val().trim())
          // must convert YYYY-MM-DD to unix time (millisec) 15 digital 
          var end_date_string = Date.parse($('#end_date').val().trim())

          var collection_data_string = encodeURIComponent($('#collection_data').val().trim())
          var open_date_string = encodeURIComponent($('#open_date').val().trim())
            

          // sample: https://hub.arcgis.com/api/search/v1/collections/all/items?filter=((type IN ('Hub Site Application', 'Site Application'))) AND ((openData=true)) AND ((modified BETWEEN 1769932800000 AND 1770191999999))&limit=12&startindex=13
          // sample: &filter=((type IN ('Hub Site Application', 'Site Application'))) AND ((openData=true))
          // sample:    AND ((modified BETWEEN 1769932800000 AND 1770191999999))
          var ___url_getJson ="https://hub.arcgis.com/api/search/v1/collections/site/items?"
          // openData= must encoded as openData%3D
          ___url_getJson += "filter=((type IN (" + collection_data_string + "))) AND ((openData%3D" + open_date_string + "))" 
          ___url_getJson += " AND ((modified BETWEEN " + start_date_string + " AND " + end_date_string + "))"
          

          var _this_page_raw_return = {}
          var _next_page_url = ___url_getJson;

            

          // first time ajax only need total site number, not using the data
          _this_page_raw_return = await ajax_getjson_common(_next_page_url);
          
          
          
                                      
                                                  
/**/
//  --- for hub.com v1   --- 
/**/

  
                                      // only for opendata v3 url https://opendata.arcgis.com/api/v3/search?filter[collection]=any(Site)&filter[openData]=true&sort=create
                                       // __total_item_count = _this_page_raw_return.meta.stats.totalCount;

                                       // for hub.com v1 url https://hub.arcgis.com/api/search/v1/collections/site
                                       __total_item_count = _this_page_raw_return.numberMatched
                                      
                                          // each ajax get 1 page 20 item

                                         for (i = 0; i < (__total_item_count / 10 ); i++) { 
                                          
                                          
                                                // only run if  user clicked the stop button, killed streaming 
                                                if (stop_search_status){
                                                    
                                                    // stop = true, means user clicked the stop button, killed streaming 

                                                    // in case of user clicked pause, when streaming ended, update the final result  
                                                    show_current(input_current)
                                                    console.log(' stop, killed, final showing ----###--- ',  input_current)
                                                    console.log("stop, killed,, site_array", site_array)


                                                    // url  ...&sfilter_by=xxx,  show filtered results
                                                    filter_result_by_filter_by()


                                                    return;  // return streaming function ( include break for loop )
                                                }
                                          
                                          
                                          
                                          
                                          
                                                console.log(' for loop - next page url - ',  i,  _next_page_url)
                                          
                                          
                                                    _this_page_raw_return = {}

                                                    _this_page_raw_return = await ajax_getjson_common(_next_page_url);
                                                                                                    
                                                    if ((_this_page_raw_return) && (_this_page_raw_return.features)){
                                                        
                                                                  var __this_page_array = _this_page_raw_return.features
                                                    
                                                    
                                                                  // we want to add new array from the beginning of old array, to show changing to the user. 
                                                                  //https://stackoverflow.com/questions/8073673/how-can-i-add-new-array-elements-at-the-beginning-of-an-array-in-javascript
                                                                    // input_current = input_current.concat(_this_page_raw_return.features);
                                                                    
                                                                    //hub.data.search.js:668 Uncaught (in promise) TypeError: input_current.unshift is not a function
                                                                    //unshift only works for 1 element, not work for another array.
                                                                    // input_current = input_current.unshift(_this_page_raw_return.features);
                                                                    
                                                                    
                                                                    input_current = __this_page_array.concat(input_current);
                                                                   
                                                                    display_count_info('', input_current.length, __total_item_count, 'counter_label')
                                                                    rendering_json_to_html(__this_page_array)
                                                                    
                                                                    
                                                                    _next_page_url = ''
                                                                    for (let i = 0; i < _this_page_raw_return.links.length; i++) {
                                                                      if (_this_page_raw_return.links[i].rel == 'next'){
                                                                        _next_page_url = _this_page_raw_return.links[i].href
                                                                      }
                                                                    }
   
                                          
                                                    }// if
                                                   
                                          } // for
                                          
                                  
/**/
//  --- end  ---  for hub.com v1    --- 
/**/

                                         
                                          
                                          
                                        // in case of user clicked pause, when streaming ended, update the final result , show partial result for what we already have 
                                        show_current(input_current)
                                        console.log(' stream ended, final showing ----###--- ',  input_current)

                                        console.log("stream ended, site_array", site_array)
                                        
                                        // url  ...&sfilter_by=xxx,  always, all time show filtered results
                                        filter_result_by_filter_by()
                        
                          }
                          
                          
                          
                        
  
  
  
  
  