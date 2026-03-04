



      

 function prepare_streaming_url(){ 


          
  // must convert YYYY-MM-DD to unix time (millisec) 15 digital 
  var start_date_string = Date.parse($('#start_date').val().trim())
  // must convert YYYY-MM-DD to unix time (millisec) 15 digital 
  var end_date_string = Date.parse($('#end_date').val().trim())

  var collection_data_string = encodeURIComponent($('#collection_data').val().trim())
  var open_data_string = encodeURIComponent($('#open_data').val().trim())
    

  // sample: https://hub.arcgis.com/api/search/v1/collections/all/items?filter=((type IN ('Hub Site Application', 'Site Application'))) AND ((openData=true)) AND ((modified BETWEEN 1769932800000 AND 1770191999999))&limit=12&startindex=13
  // sample: &filter=((type IN ('Hub Site Application', 'Site Application'))) AND ((openData=true))
  // sample:    AND ((modified BETWEEN 1769932800000 AND 1770191999999))
  ___url_getJson ="https://hub.arcgis.com/api/search/v1/collections/site/items?"
  // openData= must encoded as openData%3D
  ___url_getJson += "filter=((type IN (" + collection_data_string + "))) AND ((openData=" + open_data_string + "))" 
  //___url_getJson += " AND ((modified BETWEEN " + start_date_string + " AND " + end_date_string + "))"
  ___url_getJson += " AND ((created BETWEEN " + start_date_string + " AND " + end_date_string + "))"

console.log('___url_getJson', ___url_getJson)

        start_streaming()


 }

                           




// this function only run 1 time
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

  // first time ajax only need total site number, not using the data
  _this_page_raw_return = await ajax_getjson_common(_next_page_url);
   console.log('this page raw return', _this_page_raw_return)
     
// only for opendata v3 url https://opendata.arcgis.com/api/v3/search?filter[collection]=any(Site)&filter[openData]=true&sort=create
  // __total_item_count = _this_page_raw_return.meta.stats.totalCount;

  // for hub.com v1 url https://hub.arcgis.com/api/search/v1/collections/site
  __total_item_count = _this_page_raw_return.numberMatched
   console.log("total loop needed is : ", __total_item_count / 10)
 // must add 1, for example total is 12,  12/20 = 0.6, floor is 0, must add 1
  var loop = Math.floor(__total_item_count / 10 ) + 1

  for (i = 0; i < (loop); i++) { 
  
  
    // this is previous loop data
    // only for hub api,  .features
    if ((_this_page_raw_return) && (_this_page_raw_return.features)){// only for hub api,  .features
      // only for hub api,  .features
                          
      __this_page_array = await convert_rawJson_to_jsonArray(_this_page_raw_return.features);
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
      if (_this_page_raw_return.links){
          
          _next_page_url = ''
          for (let j = 0; j < _this_page_raw_return.links.length; j++) {
            if (_this_page_raw_return.links[j].rel == 'next'){
              _next_page_url = _this_page_raw_return.links[j].href
            }//if
          }//for

          if (_next_page_url){
            _this_page_raw_return = await ajax_getjson_common(_next_page_url);
          } else {
            console.log('you reach last page, there is no NEXT Page.', _this_page_raw_return.links)
          }

      }

    } else {
      i = i - 1
      _this_page_raw_return = await ajax_getjson_common(_next_page_url);
    }
                       
  } // for pages
    
  // in case of user clicked pause, when streaming ended, update the final result , show partial result for what we already have 
  show_current(input_current)
  console.log(' stream ended, final showing ----###--- ',  input_current)

  console.log("stream ended, site_array", site_array)
  
  // url  ...&sfilter_by=xxx,  always, all time show filtered results
  filter_result_by_filter_by()
                
}
                  
                  
                          
             


// - - -  convert raw json to standard array for display in html  - - - 
    
var name, org, url;
var _url_candidate



var _name_candidate
var _org_candidate
var _source_candidate
var _owner_candidate
var _orgId_candidate
var _orgName_candidate
var _title_candidate

var _serial_number
var _any_instance
var _domain_candidate

var urlObject


var start_position
var urlExistsOrNot

var this_element


  // only for streaming, 
  // only for hub api,
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
          _org_candidate = ""
          _source_candidate = ""
          _owner_candidate = ""
          _orgId_candidate = ""
          _orgName_candidate = ""
          _title_candidate = ""

          _serial_number = ""
          _any_instance = ""
          _domain_candidate = ""

          urlObject = ""


          start_position = ""
          urlExistsOrNot_customDomain = ""
          urlExistsOrNot_serialNo = ""
          this_element = ""
          // must reset to empty for each loop



          _url_candidate = raw_json_array[i].properties.url; 
          // never to lower case, because it will mess up 16 serial number
          //if (_url_candidate){ _url_candidate = _url_candidate.toLowerCase()}

          _orgId_candidate = raw_json_array[i].properties.orgId; 
          // use this URL to look up org name by orgId https://www.arcgis.com/sharing/rest/portals/<orgId>?f=json
          
          _orgName_candidate = '' // raw_json_array[i].properties.name; This is layer name, 

          _title_candidate = raw_json_array[i].properties.title;

          _source_candidate = raw_json_array[i].properties.source; 

           


          
          _owner_candidate = raw_json_array[i].properties.owner; // owner means a real person, who upload this feature server or layer
          
          




          // skip tile.arcgis.com
          if (_url_candidate 
            && _url_candidate.includes(".hub.arcgis.com") 
          ){
   
            url = _url_candidate
            urlExistsOrNot = hub_site_array.some(item => item["url"] == url); 
          
            if ((urlExistsOrNot_customDomain) || (urlExistsOrNot_serialNo)){
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
                  _orgName_candidate += " {" + org_name_response.orgUrl + "}"
                }
                /*
                if (org_name_response.orgPhone){
                  name += " {" + org_name_response.orgPhone + "}"
                }
                */
                if (org_name_response.orgEmail){
                  _orgName_candidate += " {" + org_name_response.orgEmail + "}"
                }
                
            }//if 

              
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
             // } else if (name.includes("\/")){
             //     name = name.replace("\/","");
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
                    html += '\')">' 
                    

                    if (_source){
                    html +=  '<span class="context" style="cursor: pointer;font-size:small;">' + _source  +  '</span>' 
                    }
                    
                    if (_title){
                      html += '<sup><span class="context" style="cursor: pointer; font-size:xx-small;">'  + _title + '</span></sup>'
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

     

  

  
  
  
  