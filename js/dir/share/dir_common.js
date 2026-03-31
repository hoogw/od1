   




    

/**/
//  - - -  ---  try more times   ---  - - -
/**/

    var MaxNumberOfTry = 3

    // serial number + arcgis.com, may be not work on first ajax, 
    // but will work on 2nd ajax
    var tryMoreTimes = 0
    
    /*
      for most of rest-root, use 1 sec, 
      Can not be too long, otherwise, 
      scan folder can stuck for ever. 

      hrsa take a very long time to get root-folder, and many of sub-folder is login required, take very long time
      search for "try More Times"
    */
    var default_time = 1800
    var more_time = 36000 // for more try on both root, and sub-folder
    var _timeout = default_time; //   
    var param_timeout; // get URL param value time out, feed to real _timeout

/**/
//  --- end  ---  try more times    - - -  --- 
/**/




var localdomain

// .......   always at top, mostly used .....

    /**/
    // ....... only for current browser window URL ....... 
    var current_url;
    var current_pathname;
    var current_pathArray;
    var linkToPathname = "";
    var urlParams;
    //  .......  end .......  only for current browser window URL

    
  
      
    /**/
    //  .......  for  url-carried parameter ..... 
      // can be use for any "url", root url, mapserver url, layer url
      var ___url_string  


      // can be use for any "name",  root name, map-server name, service name, layer name, geocode server name
      var _organization = ''  

      // can be use for any things, such as server type, layer type 
      var current_type 

      // can be use for any things, such as layer id, or any id 
      var current_id   

      // use what model in popup window 
      var model = ""  // default is null, empty

              
            //  ....... only for nested-url    (?&url= nested-url )..... 
            var ___url;
            var ___protocol  // this is means url paramter protocol  ?..&url=https://....
            var ___hostname 
            var ___pathname 
            var ___urlParams        
            var ___pathArray
            var ___service
            //  ....... end .......   only for nested-url    (?&url= nested-url )..... 

    /**/
    //  .......  end .......   for  url-carried parameter ..... 





//  .......   end .......   always at top, mostly used .....



var _cross = 'default';  // cross origin method, can be : default, cors, jsonp, proxy 

    
var layerID_NAME_separator = ' &#x21E2; '
  


   
  // local and production domain switch 
  var localhost_domain_port = 'http://localhost:3000';
  var production_domain_port = 'https://transparentgov.net:3200';

  var localhost_domain_port_apache = 'http://localhost:10';
  var production_domain_port_apache = 'https://transparentgov.net';


  // url, set,  localdomain=1 means use local SQL db
  var in_use_domain_port= production_domain_port;
  var in_use_domain_port_apache= production_domain_port_apache;


var _open_link = ''



  // current window protocol is not reliable as true value, because, if mixed content(http img + https), chrome will automatically convert https to http, this cause all down stream template use wrong port
  // template port (http 3000, https 3200) should not binding with current window protocol, instead should binding to target url 
  // not use, but need here, old, history file will use it
    var ____current_window_protocol = window.location.protocol
    
// for example target url = https://geohub.lacity.org,  template protocol should always be https, no matter what
var template_protocol = 'https:'  // by default, later will adjust as template_protocol = _targetURL_protocol
var  proxyurl_https = "https://transparentgov.net:7200/";
var  proxyurl_http = "http://transparentgov.net:7000/"; 
var portal_gallery_html = '/home/gallery.html'
var selfHost_portal_gallery_html = '/gallery.html'   
    
    

/**/
// --------- add proxy  --------- 
  var ____current_window_protocol = window.location.protocol
  // default http
  var proxyurl = "http://transparentgov.net:7000/"; 
  console.log('____current_window_protocol', ____current_window_protocol)
  if (____current_window_protocol == 'https:') {
    proxyurl = "https://transparentgov.net:7200/";
  }
// --------- end  ---------  add proxy  --------- 
/**/


    //-------- get domain, only for apache server, with json2tree , not include node.js server,----------      
            var _full_url = window.location.href;
            var _start_of = _full_url.indexOf("/json2tree/");
            // everything before /json2tree/,
            var _root_server = _full_url.substring(0, _start_of)
            console.log('_root_server > ', _root_server)
    //-------- end ---------  get domain ----------
    
    
//.......... port http:3000   https:3200 ............. 
var _port_http_https = ''
// will call this function later 
function get_port_http_https(){
      if (template_protocol == 'http:') {
          _port_http_https = '3000'
      }else {
          _port_http_https = '3200'
      }
      console.log('template protocol, port will use ===>', template_protocol, _port_http_https)
}
//..... end ..... port http:3000   https:3200 ............. 

  
  
  
  
var _apache_localhost_port = ''
if  (window.location.hostname == 'localhost'){
    _apache_localhost_port = ':10'
}
  
  
  


var options = {};
          
var input = {};


var layers_flat;



  var current_layerEndpoint_url
  var current_singleServerEndpoint_url
  var current_rootEndpoint_url
  
  
 
  
  // ========== must init as null, same as if URL have no lat long provided, extract URL will set value as null ========
        var _center={"_center_lat": null , "_center_long": null , "_center_zoom": null};
          
        var _center_lat;
        var _center_long;
        var _center_zoom;


        // default to log angeles downtown, those value is fixed (do not change value), will be use downstream as sign to get true value 
        var default_center_lat = 34.049039
        var default_center_long = -118.246521
        var default_center_zoom = 16     // mapserver1 (cmv) will error if zoom is decimal 16.7 will cause error.
 // ===================================
 


  

// for folder, service only 'http://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/MapServer'
var  base_url = '';




// for open-data only

var url_template_home
var url_template_server
var url_template_online

var url_template_esri
var url_template_esri_image_server
var url_template_esri_mapimagelayer
var url_template_google
var url_template_google_mapimagelayer
var url_template_apple

function build_url_base_template(){

  url_template_home = window.location.origin + "/open-data/dir/rest/root/home.html"
  url_template_server = window.location.origin + "/open-data/dir/rest/svr/server.html"
  url_template_online = window.location.origin + "/open-data/dir/online/layers.html"

  url_template_esri = window.location.origin + "/open-data/map/esri/hover.html"
  url_template_esri_image_server = window.location.origin + "/open-data/map/esri/image-server.html"
  url_template_esri_mapimagelayer = window.location.origin + "/open-data/map/esri/mapimagelayer.html"
  url_template_google = window.location.origin + "/open-data/map/google/hover.html"
  url_template_google_mapimagelayer = window.location.origin + "/open-data/map/google/mapimagelayer.html"
  url_template_apple = window.location.origin + "/open-data/map/apple/hover.html"
          
}









function init_global_var(){
            
            
            //  .......... global var ..............
            
              
                  // https://developer.mozilla.org/en-US/docs/Web/API/Location
            
                    current_url = template_protocol + "//" + window.location.host + window.location.pathname;
            
                    console.log('current_url ...... ',current_url);
                    
                    current_pathname = window.location.pathname;       //    /json2tree/arcgisServerList.html
                    current_pathArray = current_pathname.split('/');   //    ["", "json2tree", "arcgisServerList.html"]
                    
                    //.......... for arcgisServerList.js only .......................
                          // bug fix i start from 1 instead of 0, otherwise, has 2 //,  //json2tree/domain.html
                            for (i = 1; i < current_pathArray.length-1; i++) {
                              linkToPathname += "/";
                              linkToPathname += current_pathArray[i];
                            }
                          console.log('linkToPathname----',linkToPathname); 
                    //.......... end ..............  for arcgisServerList.js only .......................
                    
                    
                    
                    
                    
                    
// ----- parse url param ?url=xxxxxxxxxx  --------

    urlParams = new URLSearchParams(window.location.search);

   
            ___url_string = urlParams.get('url'); 
            if ((___url_string == undefined) || (___url_string == null) || (___url_string == '')){
              // nothing to do
            }else{
              ___url = new URL(___url_string);   // ?url=https://sampleserver3.arcgisonline.com/ArcGIS/rest/services
              base_url = ___url_string;
              ___protocol = ___url.protocol; //   https:
              // template protocal always binding to target url protocol
              template_protocol = ___protocol
              ___hostname = ___url.hostname; //    sampleserver3.arcgisonline.com
              ___pathname = ___url.pathname; //    /ArcGIS/rest/services
              ___urlParams = new URLSearchParams(___url.search); //
              ___pathArray = ___pathname.split('/');
              // https://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/GPServer    
              // ___pathArray = ["", "arcgis", "rest", "services", "Mapping", "NavigateLA", "MapServer"]
              // ___service = https://maps.lacity.org/arcgis/rest/services
              ___service = ___protocol + '//' + ___hostname + '/' +  ___pathArray[1] + '/' +   ___pathArray[2] + '/' +   ___pathArray[3] 
            }// if 




            // can be use for any "name",  root name, map-server name, service name, layer name, geocode server name
            _organization = urlParams.get('org'); 
            console.log('(encoded)org=', _organization)
            //_organization = decodeURIComponent(_organization)  // do not use, will cause error 'URI malformed' if org string have percentage sign %, in fact it already been decoded automatically. 
            // set html page title, on browser tab title
            if (_organization) {
              // $("#title").text(_organization)
              // without jquery
              document.getElementById("title").innerHTML = _organization;
            }
           

          // can be use for any thing
            current_type = urlParams.get('type'); 
             
          // can be use for any thing
            current_id = urlParams.get('id'); 

          // 
            model = urlParams.get('model'); 
           

     
    file = urlParams.get('file');   // hub.site.static file=xxx.zip
                                      
                     
            var param_cross = urlParams.get('cross'); 
            if (param_cross) {
                              _cross = param_cross
            } else {
                              _cross ='default' 
            }


            _center_lat = urlParams.get('_center_lat');  
            _center_long = urlParams.get('_center_long');  
            _center_zoom = urlParams.get('_center_zoom');  



                                    
                                      
                                      
                                         // default center info Los agneles downtown
                                         // if (0) is false, so we must skip 0
                                         if ((_center_lat) || (_center_lat == 0)) {} else { _center_lat = default_center_lat}
                                         if ((_center_long) || (_center_long == 0)) {} else { _center_long = default_center_long}
                                         if ((_center_zoom) || (_center_zoom == 0)) {} else { _center_zoom = default_center_zoom}
                                      
                                        _center={"_center_lat":_center_lat , "_center_long": _center_long, "_center_zoom": _center_zoom};
                                        
                                      


                                      console.log('___url_string ......  ',___url_string)  
                                      console.log('_center ......  ',_center)  
                                          
                                                    
                                  
                
                
                
                
                                       
                        
                          
                                   




                                  
                          
                          param_timeout = urlParams.get('timeout'); 
                            
                          // param_timeout is from URL &timeout=xxx,  _timeout is ajax: timeout
                          if (parseInt(param_timeout)) {
                              _timeout = parseInt(param_timeout)
                          } 
                          // 1st time 1 time display time out value on input field
                          $('#timeout_millisecond').val(_timeout)
                          // user change time out value
                          $('#timeout_millisecond').on('keyup', function(){
                            param_timeout = $("#timeout_millisecond").val()
                            console.log('time out changed to :', param_timeout)
                            if (parseInt(param_timeout)) {
                              _timeout = parseInt(param_timeout)
                              update_url_parameter('timeout', _timeout)
                            } 
                          })
                          
                          
                          
                          
                          
                          
                          
                          
                          
                          
                          

                              // decide use which one 
                              get_port_http_https()
                              // finally build template url
                              build_url_base_template() 



            
            }
            
            
  
  
  
  
  
            function dark_mode(){
                  //  dark mode  https://codepen.io/j_holtslander/pen/MRbpLX
    


                 
                        // SWAP ICON ON CLICK
                        // Source: https://stackoverflow.com/a/34254979/751570
                        $('.dark-toggle').on('click',function(){
                          if ($(this).find('i').text() == 'brightness_4'){
                              $(this).find('i').text('brightness_high');
                          } else {
                              $(this).find('i').text('brightness_4');
                          }
                        });



            }
  
  
  
  
  

           // +++++++ autocomplete auto suggest  +++++++


                var autocomplete_search_instance, autocomplete_options, autocomplete_elem, autocomplete_switch_status;
                function init_autocomplete(){

              
      /*
                            
                            $('input.autocomplete').autocomplete({
                              data: {
                                "Apple": null,
                                "Microsoft": null,
                                "Google": 'http://placehold.it/250x250'
                              },
                              limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
                            onAutocomplete: null,
                            });
                          
      */

                        
                autocomplete_options = {

                          data: {
                            
                          },


                          limit: 5, // The max amount of results that can be shown at once. Default: Infinity.


                          onAutocomplete:  search_layer_now  //Callback for when autocompleted.

                        }


                              // get all instances
                              // var elems = document.querySelectorAll('.autocomplete');

                              // only one instance
                              autocomplete_elem = document.getElementById('filter_by')

                          
                             autocomplete_search_instance = M.Autocomplete.init(autocomplete_elem, autocomplete_options);
                          

                }

          // +++++++ end  +++++++ autocomplete auto suggest  +++++++



  
  
  
  
  
  
           
             
                function update_url_parameter(_field, _value){
                    
                    
                   // if ((_value) && (_value.length !== 0)) {

                                console.log("update url parameter(field=value)-->", _field + "="+ _value);

                                var searchParams = new URLSearchParams(window.location.search);
                                searchParams.set(_field, _value);


                                // this cause reload  https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
                                //window.location.search = searchParams.toString();

                                // instead avoid reload
                                var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
                                history.pushState(null, '', newRelativePathQuery);
                         //   }            

                } 
  
  
           
             
             
             
  
           
       function compareStrings(a, b) {
            // Assuming you want case-insensitive comparison
            a = a.toLowerCase();
            b = b.toLowerCase();

            return (a < b) ? -1 : (a > b) ? 1 : 0;
          }

   
        // array.sort(function(a, b) {
        //    return compareStrings(a.name, b.name);
        //  })
        
   //  ----- sort array = [{name:xxx}, {name:xxx}...] alphabetically by name  ---------      
   
   
   
   
   
    // ---------------------------   mark.js higlight keywords --------------------------- 
      function highlight_keywords(){
        _filter_by = $('#filter_by').val();
        //_filter_by = _filter_by.toLowerCase();
        $("span.context").unmark();
        $("span.context").mark(_filter_by); // will mark the keyword "test", requires an element with class "context" to exist
      }// function
    // --------------- End ------------   mark.js higlight keywords ---------------------------  
    
    
    
    
    
     
            function filter_result_by_filter_by(){
                
                                                    
                        // must re-create instance of url params, use first time, filter by=xxx  as records
                        urlParams = new URLSearchParams(window.location.search);


                               // only local use  
                              ___url_filter_by = urlParams.get('filter_by');


                              
                              console.log('___url_filter_by',  ___url_filter_by)

                              if ((___url_filter_by == undefined) || (___url_filter_by == null) || (___url_filter_by == '')){

                                  // search for is null, undefined, nothing to filter
                              }else {


                                   $('#filter_by').val(___url_filter_by);

                                  // trigger keyup event, filter result by _filter_by
                                   $(function() {
                                                 // $('#filter_by').keydown();
                                                //  $('item').keypress();
                                     // both works (1)
                                                //  $('#filter_by').keyup();
                                                //  $('item').blur();
                                              });




                                      // both works (2)
                                      $('#filter_by').trigger(jQuery.Event('keyup', { keyCode: 13 }));    


                            }
                         
            }
            
           






            var possible_idx_field_name_array = [
              // possible field name in arcgis 
              'OID','FID','OBJECTID',
              'oid','fid','objectid', 
              'Oid','Fid','Objectid',
              'oID','fID','objectID',
              'ObjectID',

              // possible field name in socrata
              'id', 'ID', 'Id'  
            ]







            




             //*************************   ajax arcgis server section ***********************************  






             // Only for :  arcgis rest api type  ----- url + '?f=json' ----------- 
             async function arcgis_ajax_cross_origin(_url, __cross_origin_method){

              // Most of arcgis server support JSONP
              // newer arcgis server support both JSONP + CORS
              // some only support CORS, NOT JSONP



               

                // sample
                // _url = 'http://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/MapServer'
                _url = _url + '?f=json';

               
                


                var _response_


               switch(__cross_origin_method) {


                case 'default':

                    _response_ = await ajax_jsonp_json_proxy(_url, _timeout)
                  

                  break;


                case 'cors':
                    _response_ = await ajax_datatype_json(_url, _timeout)
                  break;


                  case 'jsonp':
                      _response_ = await ajax_jsonp_only(_url, _timeout)
                      break;


                case 'proxy':
                    _response_ = await ajax_proxy_only(_url, _timeout)
                          break;     

                default:
                    _response_ = await ajax_jsonp_json_proxy(_url, _timeout)
              }




              return  _response_



             }

                 
                        
          



                          
                  
                      async function ajax_getjson(_url){

                          // this will be retired soon     
                            
                          // Most of arcgis server support JSONP
                          // newer arcgis server support both JSONP + CORS
                          // some only support CORS, NOT JSONP



                           // Only for :  arcgis rest api type  ----- url + '?f=json' -----------   
                           // fist try datatype:jsonp, if failed, try datatype:json (need cors)
                           // arcgis server rest api , usually support jsonp( because of old history reason), the newer version also support CORS.
                           
                           



                          // --------- ajax ___url_string response = input  -------------



                                                // ___url_string = 'http://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/MapServer'
                                                var ___url_getJson = _url + '?f=json';

                                                console.log('ajax-jsonp -> ',___url_getJson)   

                                               var input;


                                                try{  

                                                  input = await $.ajax({
                                                                    timeout:_timeout,  // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                                                                    type: 'GET',
                                                                    dataType: 'jsonp',
                                                                   
                                                                    url: ___url_getJson,
                                                                    
                                                                    
                                                                    error: function (jsonp_error_1) {
                                                                                                
                                                                      console.log('throw error event(ajax jsonp failed jsonp_error_1) ', jsonp_error_1)                                        
                                                                    },
                                                                                                
                                                                    success: function (data) {
                                                                      
                                                                    }
                                                                });                          


                                                    } catch(jsonp_error_2){ 

                                                                console.log('catch ( ajax jsonp failed jsonp_error_2 ) ', jsonp_error_2)    

                                                                // jsonp failed due to remote server does NOT support jsonp, try datatype:json (need cors)
                                                          

                                                                console.log('ajax-datatype:json-=======> ',___url_getJson)   
                                                                try {
                                                                
                                                                        // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                                                                        
                                                                        input = await $.ajax({
                                                                                                      timeout:_timeout,
                                                                                                      url:___url_getJson,

                                                                                                      dataType: 'json',


                                                                                                      success: function (data) {
                                                                                                        
                                                                                                      }, // success
                                                                                                      
                                                                                                      error: function (json_error_1) {
                                                                                                        
                                                                                                        console.log('throw error event (ajax datatype:json failed json_error_1)', json_error_1)                                        
                                                                                                      }
                                                                                                      
                                                                                                  });
                                                                    
                                                                    
                                                                    
                                                                    


                                                                  
                                                                } catch(json_error_2){
                                                                    
                                                                    
                                                                    // http://localhost:10/json2tree/searchlayer.html?url=https://maps.lacity.org/arcgis/rest/services
                                                                    // internal folder will failed both ajax call, jsonp and non-jsonp. must catch error.
                                                                    //The error is No 'Access-Control-Allow-Origin' header is present, but the problem is not that, 
                                                                    // the problem is internal folder is forbidden.

                                                                    
                                                                    console.log('catch( json_error_2 )', json_error_2)
                                                                    
                                                                   

                                                                    // can't return whole error object, if return whole error object, must use catch to handle it later down stream. 
                                                                    var error_status = {
                                                                      errorFrom: 'ajax_getjson',
                                                                      readyState:json_error_2.readyState,
                                                                      responseJSON:json_error_2.responseJSON,
                                                                      status:json_error_2.status,
                                                                      statusText: json_error_2.statusText
                                                                    
                                                                    }

                                                                    return error_status
                                                                    
                                                                }     
                                                            
                                                            
                                                            

                                              }// try - catch


                            
                         


                      return input
                      }// function 






                       // Only for our rest api,https://localhost:3200/restapi/rest_url?select=*&where=
                      //  without _url + '?f=json',  without jsonp
                      // return json, no need parse.
                      async function ajax_getjson_common(___url_getJson){
                        
                        console.log('ajax_getjson_common url is ',___url_getJson) 
                        var response
                        var error_response_json
                        
                        try{
                            response = await $.ajax({
                                    timeout:_timeout,
                                    type: "get",
                                    url:___url_getJson,
                                    

                                    success: function (data) { 
                                      console.log('ajax json success ', data)
                                      // return function here only return to ajax response, not return of this whole function
                                    }, // success



                                    error: function (jqXHR) {
                                      console.log('ajax json failed, jqXHR.responseJSON', jqXHR.responseJSON)
                                      // ajax failed, error
                                      error_response_json = jqXHR.responseJSON 
                                    }                                                                                              
                            });

                        } catch {

                          console.log('catch error for ajax_getjson_common ', error_response_json) 
                          return error_response_json
                        }


                        if (typeof response === 'object') {
                          // is object
                          return response 
                        } else {
                          // is string
                          return (JSON.parse(response))
                        }  
                         
                          
                      }

                      async function ajax_getjson_common_custom_timeout(___url_getJson, custom_timeout){
                        
                        console.log('ajax_getjson_common url is ',___url_getJson) 
                        var response
                        var error_response_json
                        
                        try{
                            response = await $.ajax({
                                    timeout: custom_timeout,
                                    type: "get",
                                    url:___url_getJson,
                                    

                                    success: function (data) { 
                                      console.log('ajax json success ', data)
                                      // return function here only return to ajax response, not return of this whole function
                                    }, // success



                                    error: function (jqXHR) {
                                      console.log('ajax json failed, jqXHR.responseJSON', jqXHR.responseJSON)
                                      // ajax failed, error
                                      error_response_json = jqXHR.responseJSON 
                                    }                                                                                              
                            });

                        } catch {

                          console.log('catch error for ajax_getjson_common ', error_response_json) 
                          return error_response_json
                        }


                        if (typeof response === 'object') {
                          // is object
                          return response 
                        } else {
                          // is string
                          return (JSON.parse(response))
                        }  
                      }








                //************* end ************   ajax arcgis server section ***********************************  




                      


// ======================== standard =========  ajax fetch general use ==============================


      
        
        async function ajax_datatype_json(___url_getJson, _custom_timeout){
            

            //dataType: "json" same as fetch, server must support CORS,
            // if server NOT support CORS, you have to use proxy to work around 

            //dataType: "json", the result is already json, no need to JSON.parse().

            // without dataType: "json", the result is string,  need to JSON.parse().




            console.log('ajax cors only, datatype json, (timeout) ', _custom_timeout , ___url_getJson)   


             var input

        try{
      
                  input  = await $.ajax({
                  
                                              timeout: _custom_timeout,
                                              url: ___url_getJson,
                                              type : 'GET',

                                              error: function (json_error_1) {
                                                                                                        
                                                              console.log('ajax datatype:json json_error_1 ',json_error_1)  
                                                              
                                                            
                                                    },


                                              success: function (data) {
                                                //console.log('success back --> ', data);

                                              },


                                            dataType: "json"


                                            // jsonp only works for arcgis server whoever support JSONP, 
                                            // jsonp NOT works for any file json, or file geojson

                                            //dataType: "jsonp"  // not work for hub    /data.json
                                            

                                            }); // await

          

                                        
                                
        } catch(json_error_2){
                              
                              
                                            // http://localhost:10/json2tree/searchlayer.html?url=https://maps.lacity.org/arcgis/rest/services
                                            // internal folder will failed both ajax call, jsonp and non-jsonp. must catch error.
                                            //The error is No 'Access-Control-Allow-Origin' header is present, but the problem is not that, 
                                            // the problem is internal folder is forbidden.
              
                                            
                                            console.log('catch( json_error_2 )', json_error_2)
                                            
                                           
                                            // can't return whole error object, if return whole error object, must use catch to handle it later down stream. 
                                            var error_status = {
                                              errorFrom: 'ajax_datatype_json',
                                              readyState:json_error_2.readyState,
                                              responseJSON:json_error_2.responseJSON,
                                              status:json_error_2.status,
                                              statusText: json_error_2.statusText
                                            
                                            }
              
                                             return error_status
              
                                            
                                        }     




          return input
          


        }





                            

          // No time out, general use, no prefix for url          
          // fetch with time out option 
        async function fetch_only(___url_getJson, _custom_timeout){
              

            console.log('fetch only ',___url_getJson)   


          // get raw json = input 
          /*  
            * bug fix: 
            * No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:10' is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
            * https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
            */



               
         /*  works, but this NOT await,    
           
         
          fetch(___url_getJson)
                     .then(function(response) {
                          return response.json();
                     })
                     .then(function(data) {

                                                 
                        console.log(data);

                        
                                                  
                        return data

                    });// fetch

           */ 


        // arcgis only, when domain not exist, fetch will error, must catch, return null

          try{
          
                    var  _resp_f = await fetch(___url_getJson);

                    return _resp_f


              } catch (error) {


                      console.log('fetch Error:', error);
                    return null

              }


        }





        async function ajax_jsonp_only(___url_getJson, _custom_timeout){
            

          // jsonp only work for arcgis server who support JSONP
          // jsonp NOT work for file .json, file .geojson or any file download 


          console.log('ajax jsonp only, (timeout) ', _custom_timeout,___url_getJson)   
          var input;


          try{  

          input = await $.ajax({
                              timeout:_custom_timeout,  // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                              type: 'GET',


                              dataType: 'jsonp',
                             
                              url: ___url_getJson,
                              
                             
                              error: function (jsonp_error_1) {
                                                                        
                                                                     
                                                              console.log('throw event , jsonp error 1   ', jsonp_error_1)

                                                          },
                                                          
                              success: function (data) {
                                 // console.log('jsonp success : ', data);

                                 
                              }
                          });                          


            }
        catch( jsonp_error_2 ){

         
                  console.log('catch jsonp error 2    ', jsonp_error_2)

                  var error_status = {

                    errorFrom: 'ajax_jsonp_only',
                    readyState:jsonp_error_2.readyState,
                    responseJSON:jsonp_error_2.responseJSON,
                    status:jsonp_error_2.status,
                    statusText: jsonp_error_2.statusText
                  
                  }

                  return error_status

        }// try - catch




      return input
      }// function 





       


       
      // jsonp > json(cors)
        async function ajax_jsonp_json_proxy(___url_getJson, _custom_timeout){
            

            // jsonp > json(cors)  ,   good for arcgis server rest api

           // first try jsonp 
           //  if jsonp failed, catch and try  datatype:json
         

          

           // always with time out option 


          console.log('ajax cross is default, 3 try, jsonp,cors (timeout)', _custom_timeout ,___url_getJson)   
          var input;


          try{  

            input = await $.ajax({
                              timeout:_custom_timeout,  // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                              type: 'GET',
                              dataType: 'jsonp',
                             
                              url: ___url_getJson,
                              
                              
                              error: function (jsonp_error_1) {
                                                          
                                console.log('throw error event(ajax jsonp failed jsonp_error_1) ', jsonp_error_1)                                        
                              },
                                                          
                              success: function (data) {
                                
                              }
                          });                          


              } catch(jsonp_error_1){ 

                          console.log('catch ( ajax jsonp failed jsonp_error_2 ) ', jsonp_error_1)  
                          
                          // not return error yet, because we will try datatype:jsonp

                          // jsonp failed due to remote server does NOT support jsonp, try datatype:json (need cors)
                    

                          console.log('ajax-datatype:json-=======> ',___url_getJson)   
                          try {
                          
                                  // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                                  
                                  input = await $.ajax({
                                                                timeout: _custom_timeout,
                                                                url:___url_getJson,

                                                                dataType: 'json',


                                                                success: function (data) {
                                                                  
                                                                }, // success
                                                                
                                                                error: function (json_error_2) {
                                                                  
                                                                  console.log('throw error event (ajax datatype:json failed json_error_2)', json_error_2)                                        
                                                                }
                                                                
                                                            });
                              
                              
                              
                              


                            
                          } catch(json_error_2){
                              
                              
                              // http://localhost:10/json2tree/searchlayer.html?url=https://maps.lacity.org/arcgis/rest/services
                              // internal folder will failed both ajax call, jsonp and non-jsonp. must catch error.
                              //The error is No 'Access-Control-Allow-Origin' header is present, but the problem is not that, 
                              // the problem is internal folder is forbidden.

                              
                              console.log('catch( json_error_2 )', json_error_2)
                              
                             

                              
                          } // try datatype:json   2
                      
                      
                      

        } // try jsonp 1






      return input
      }// function 







      async function ajax_json_proxy(___url_getJson, _custom_timeout){
            

          //  try, json ,  good for hub  /data.json


        // first try json 
    

       

        // always with time out option 


       console.log('ajax json  ',___url_getJson)   
       var input;


       try{  

         input = await $.ajax({
                           timeout:_custom_timeout,  // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                           type: 'GET',
                           dataType: 'json',
                          
                           url: ___url_getJson,
                           
                           
                           error: function (json_error_1) {
                                                       
                             console.log('throw error event(ajax json failed json_error_1) ', json_error_1)                                        
                           },
                                                       
                           success: function (data) {
                             
                           }
                       });                          


           } catch(json_error_1){ 

                       console.log('catch ( ajax jsonp failed jsonp_error_1 ) ', json_error_1)  
                       
                          
     }// try - catch






   return input
   }// function 









  // ==============   end ========== ajax fetch general use ==============================


















                    
                          

// ...... loading spinner with timer ......... jquery css   .........  



                 

                  
                  function show_message(message_elementID, text_message){
                                                
                                          
                    console.log('show message:  message_elementID, text_message ', message_elementID, text_message)
                    document.getElementById(message_elementID).innerHTML = text_message

                    
                
                  }



                  
//  ......   ......  end   ......  ...... loading spinner with timer ......... jquery css   .........  







        function display_count_info(_subject, ___showing_cnt, ___all_cnt, _label_id){

                var _percentage_html = ''
                var _percentage_float, _percentage_integer, _percentage_decimal;
                
                if ((___showing_cnt > 0) && (___all_cnt > 0)) {
                  _percentage_float = (100 * ___showing_cnt) / ___all_cnt
                  _percentage_integer = Math.floor(_percentage_float);
                  _percentage_decimal = (_percentage_float.toFixed(3)).split(".")[1]

                  // in use, simple number as :  50.987%
                  _percentage_html =   '<span><mark>' 
                  _percentage_html +=        '<b>' + _percentage_integer +  '</b>'   
                  _percentage_html +=        '.' 
                  _percentage_html +=        '<sup><small>' + _percentage_decimal + '</small></sup>' 
                  _percentage_html +=        '%' 
                  _percentage_html +=   '</mark></span>'
                  

                  /*
                        // not use w3.css progress bar, just keep it here
                        _percentage_html =   '<div class="w3-dark-grey w3-large">'
                        _percentage_html +=      '<div class="w3-container w3-yellow" style="width:' +  _percentage + '%">' +   _percentage + '%</div>'
                        _percentage_html +=  '</div>'
                  */
                }

                var _html_for_count = ''
                
                    if (_subject) { _html_for_count +=    '<small>' + _subject +  '</small>' }
                                
                    _html_for_count +=   '<span><mark><big><b>' + ___showing_cnt + '</b></big></mark>' 
                    _html_for_count +=    '/' 
                    _html_for_count +=       '<small><sup>' + ___all_cnt +'</sup></small></span>' 
                    //_html_for_count +=    '&nbsp;&nbsp;'  
                    _html_for_count +=    _percentage_html 

                document.getElementById(_label_id).innerHTML =    _html_for_count 
        }






        function click_button_change_style_handler(event, select_all_element_with_this_class, original_class, change_to_class){

                 /*  click to remove this element original-class, do not add new change-to-class, use these code 
                        $("." + select_all_element_with_this_class).addClass(original_class);
                        $(event.target).parent().removeClass(original_class);
                 */

                      
                 $("." + change_to_class).removeClass(change_to_class).addClass(original_class);
                 $(event.target).parent().removeClass(original_class).addClass(change_to_class);

               console.log($(".open-btn"))
               console.log(event.target)

        }




        
        function open_link(_url_need_to_open_in_a_new_tab){
            console.log('open link url in a new tab' , _url_need_to_open_in_a_new_tab)
            _url_need_to_open_in_a_new_tab += '&cross=' + _cross
            _url_need_to_open_in_a_new_tab += '&timeout=' + _timeout
            window.open(_url_need_to_open_in_a_new_tab, '_blank')
        }


        function init_user_interface_event(){

          // -cross- 
          $('input[id=' + _cross + ']').prop('checked', true);
          $('input[type=radio][name=cross_radio').on('change', function(){
            _cross = this.value
            update_url_parameter('cross',_cross)
            console.log('cross radio change to ', _cross )
          });



          // -time- -out-
          $('#timeout_value').html(_timeout)
          document.getElementById("timeout_range").value = _timeout;
          $('#timeout_range').on('change', function(){
            _timeout =  document.getElementById("timeout_range").value
            $('#timeout_value').html(_timeout)
            update_url_parameter('timeout',_timeout)
          });

        }




        

        function getStringBetweenChars(str, char1, char2) {

          // Example usage:
          //const myString = "Hello [World]!";
          //const result = getStringBetweenChars(myString, "[", "]");
          //console.log(result); // Output: World

          // https://proyecto-causa-nuestra-fvalorate.hub.arcgis.com

          if (str){

            const index1 = str.lastIndexOf(char1);
            const index2 = str.indexOf(char2);
          
            if (index1 === -1 || index2 === -1 || index2 <= index1) {
              return ""; // Or handle the error as needed
            }
          
            return str.substring(index1 + 1, index2);

          } else {

            return str
          }

          
        }





function convertTimestampToHumanTime(timestamp) {
  // not use, normally is second, but ESRI already  time 1000 becomes to milliseconds
  //const date = new Date(timestamp * 1000); // Multiply by 1000 if timestamp is in seconds
  const date = new Date(timestamp); 

  // Returns a string representing the date and time in the user's locale
  //return date.toUTCString();   // GMT time
  return date  // local time
}

        

/**/
// - - - - download json csv  - - - - 
/**/

var ready_download_json
var json_for_csv

  // sample https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser

  // only for save json file
  function saveJsonAsFile(filename, data) {


    // How can I beautify JSON  https://stackoverflow.com/questions/2614862/how-can-i-beautify-json-programmatically
    const blob = new Blob([JSON.stringify(data, null, 2)]);
    const link = document.createElement("a");
    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.click()

  };


  function saveStringAsFile(filename, txt_string) {


    // How can I beautify JSON  https://stackoverflow.com/questions/2614862/how-can-i-beautify-json-programmatically
    const blob = new Blob([txt_string]);
    const link = document.createElement("a");
    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.click()

  };

/**/
//  - - - -  end  - - - -  download json csv   - - - - 
/**/





function getDomain(testing_url) {
  try {
    const testing_urlObj = new URL(testing_url);
    return testing_urlObj.hostname;
  } catch (e) {
    return null;
  }
}



function getSubstringBefore(str, searchValue) {
  const index = str.indexOf(searchValue);
  if (index === -1) {
    return str; // If the search value is not found, return the original string
  }
  return str.substring(0, index + searchValue.length);
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


//  ----- -- - -- -- -shuffle array https://bost.ocks.org/mike/shuffle/
            function shuffle(array) {
              var m = array.length, t, i;

              // While there remain elements to shuffle…
              while (m) {

                // Pick a remaining element…
                i = Math.floor(Math.random() * m--);

                // And swap it with the current element.
                t = array[m];
                array[m] = array[i];
                array[i] = t;
              }

              return array;
            }

//  -----  end -- - -- -- -shuffle array https://bost.ocks.org/mike/shuffle/



