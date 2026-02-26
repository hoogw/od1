

var input_current 






// - -  -  -  streaming   - -  -  -  




async function nested_to_flat(_url){




    
    var _flat = [];     // ... accumulated...
    var _just_get = []  // not accumulat, only the current transaction get
    
    
    console.log('_url root  ....', _url)
    $("#jstree_root_folder").html("(root)" + _url)

    var root =await arcgis_ajax_cross_origin(_url, _cross);  // cross origin method 
    
    console.log( 'raw root response >>>>>  ', root)
    currentVersion = root.currentVersion


    /*

        good root:
        {

        
            
            absolute_path: "https://services.arcgis.com/aA3snZwJfFkVyDuP/arcgis/rest/services",
            currentVersion: 10.81, 
            id: 0,
            relative_path: "/",

            folders: [{},{}....], 
            services: [{},{}....], 
            

                // special case, only for seattle, it is a mapserver node,not regular folder node
                layers: [{},{}....], 
            }




        bad root:
                    {
                    absolute_path: "http://www.dot.state.ak.us/ArcGIS/rest/services"
                    errorFrom: "ajax_jsonp_json_proxy_proxy3"
                    id: 0
                    readyState: 4
                    relative_path: "/"
                    responseJSON: undefined
                    status: 502
                    statusText: "Bad Gateway"
                    }

    
    */
    
    var _warning_message = '404 Not Found (Blocked by GIS Admin)';

    // add relative path reference
    root.relative_path = '';
    root.absolute_path = _url;
    // build stack


    var stack = new Stack();
    stack.push(root);


    // console.log(stack.count);
    
    while(stack.count > 0) {
                
        var current = stack.pop();
        
        // all services ---> flat    ( possible stop kill streaming)
        if(current.hasOwnProperty('services')  && (current.services !== null ) && (current.services !== '' )){

            var current_services = current.services;
        
            for (var i1 = 0; i1 < current_services.length; i1++) {
                
                // For service:  _url_path/name/type  --->   https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer
                
                
                /*
                                    "folders": [

                                    ],
                                            
                                    "services": [
                                    {
                                        "name": "Portland/Aerial",
                                        "type": "ImageServer"
                                    },
                                    {
                                        "name": "Portland/CascadeLandsat",
                                        "type": "ImageServer"
                                    }
                                    ]
                
                    */
                
                
                //---- fix bug: absolute service/folder name need to convert to relative service/folder name ----
                // https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Portland
                // service name (Portland/Aerial) is absolute, we only need the "Aerial", not need "Portland/Aerial"
                // Portland/Aerial (ImageServer)
                    
                    var node_path = current_services[i1].name
                    var  node_path_array = node_path.split('/');
                    var  _relative_name = node_path_array[node_path_array.length-1]; // if have /, only need last part after last /
                    var _current_services_type = current_services[i1].type 
                    console.log('_current_services_type', _current_services_type)   
                //---- end ---- fix bug: absolute service/folder name need to convert to relative service/folder name -----
                
                
                
                
                
                
                                                                                                
                // For service:  _url_path/name/type  --->   https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer
                // dynamic CMV
                //http://localhost:10/mapserver1/viewer/?config=viewer_simple1&url=https://maps2.dcgis.dc.gov/dcgis/rest/services/Zoning/MapServer&title=Washington_DC_Zoning&zoom=14&lat=38.917292&long=-77.036420
                //http://ms.transparentgov.net/?config=viewer_simple1&url=https://maps2.dcgis.dc.gov/dcgis/rest/services/Zoning/MapServer&title=Washington_DC_Zoning&zoom=14&lat=38.917292&long=-77.036420

                    var absolute_path_service_url = current.absolute_path + '/'+ _relative_name +  '/'+_current_services_type

                    var _relative_path = current.relative_path + '/'+ _relative_name +  '/'+_current_services_type;
               
                    var _mapServer = {
                        "name": current_services[i1].name,  
                        "type": _current_services_type, 
                        "absolute_url":absolute_path_service_url, 
                        "relative_path":_relative_path, 
                        "relative_name": _relative_name,
                    };


                    // duplicate service will be keep
                    _just_get = []
                    _just_get.push(_mapServer); 
                    _flat = _just_get.concat(_flat);

                    console.log( 'all services ---> flat  '   ,  _flat.length, _mapServer.relative_path)
                    $("#jstree_root_folder").html("(" + _flat.length + ")" + _mapServer.relative_path)

                
            }//for
        
        } // service
        
        
        // all folders ---> stack  ( possible stop kill streaming)
        if(current.hasOwnProperty('folders')&& (current.folders !== null ) && (current.folders !== '' )) {

                var current_folders = current.folders;
                for (var j2 = 0; j2 < current_folders.length; j2++) {
                    
                    
                    //---- fix bug: absolute service/folder name need to convert to relative service/folder name ----
                // https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Portland
                // service name (Portland/Aerial) is absolute, we only need the "Aerial", not need "Portland/Aerial"
                // Portland/Aerial (ImageServer)
                    
                    var  node_path = current_folders[j2]
                    var  node_path_array = node_path.split('/');
                    var  _relative_name = node_path_array[node_path_array.length-1]; // if have /, only need last part after last /
                
                //---- end ---- fix bug: absolute service/folder name need to convert to relative service/folder name -----
                
                    
                    
                    

                
                    
            // this absolute path is for children's absolute path, do not confuse with current(parent) absolute path
            var absolute_path = current.absolute_path + '/'+ _relative_name; 

 
                    
                    
                    console.log('absolute path folder +++++++>>> ',absolute_path)
                    $("#jstree_root_folder").html("(" + _flat.length + ")" + _relative_name)

                    
                    var node =await arcgis_ajax_cross_origin(absolute_path, _cross);  // cross origin method 

                    
                        if (node !== null) {
                                            
                                                node.absolute_path = absolute_path;
                                                                                                                                                        
                                                node.relative_path = current.relative_path+ '/'+_relative_name;
                                            
                                                stack.push(node);
                        }// if



                }// for
                
        } // folders    
           
         // do not deal with layers or tables., because this is all-mapserver-list
        if (current.hasOwnProperty('layers') || current.hasOwnProperty('tables')) {
            console.log('Not Support MapServer or FeatureServer, must be a (Home or Root) Folder or sub-Folder',);
            _warning_message = 'Not Support MapServer or FeatureServer, must be a (Home or Root) Folder or sub-Folder';
        } // layers 
            
    }// while
            
    
    if (_flat.length >1) {
           console.log(' return final result , _flat' , _flat)
           return _flat;
    } else {
        $("#jstree_root_folder").html(_warning_message)
    }       
    
}



// for streaming layers only 
async function scan_root_folder(){ // for streaming layers only 
// for streaming layers only 

  
    input_current = []; 

   
    
    console.log( 'nested to flat url  +++ ', ___url_string)
    input_current =await nested_to_flat(___url_string);
        
        
    if (input_current) {    
        
            //  ----- sort input_current = [{name:xxx}, {name:xxx}...] alphabetically by name  ---------
                // function compareStrings() is at arcgis_common.js
                // sort by property 'name'. If property is others, then do not sort, comment out this section. 
        
                    input_current.sort(function(a, b) {
                            return compareStrings(a.name, b.name);
                    });
        
            //  ----- end ------ sort input_current = [{name:xxx}, {name:xxx}...] alphabetically by name  ---------
        
          
    
            console.log(' ******* input_current ************** ', input_current)
    
            rendering_json_to_html(input_current)
            
    } // if - input current is array []
    
    
}



function rendering_json_to_html(_results){
    
    var html = '';
    /*

    *    <ol>
    *        <li>
    *             <a href=''> xxx </a>
    *        </li>  
    *           
    *        <li>
    *             <a href=''> xxx </a>
    *        </li>  
    *        
    *        <li>
    *             <a href=''> xxx </a>
    *        </li>  
    *    </ol>
    *   
    *  
    */
    // ---------- build --------------

   

    if (_results.length > 0) {
            html += '<ol>';
            for (var i = 0; i < _results.length; ++i) {


                html += '<li style="font-size:xx-small;">' 
                
                var _relative_path = _results[i].name;
                var _relative_name = _results[i].relative_name;
                var _current_services_type = _results[i].type;
                var _service_url = _results[i].absolute_url; 

              

                
                switch(_current_services_type) {

                case "MapServer":
                case "FeatureServer":
                    custom_icon = mapservice_icon
                break;


                case "VectorTileServer":
                    custom_icon = VectorTileServer_icon
                break;

                case "ImageServer":
                    custom_icon = ImageServer_icon
                break;




                case "SceneServer":
                    custom_icon = SceneServer_icon
                break;


                case "GeocodeServer":
                    custom_icon = GeocodeServer_icon
                break;


                    case "NAServer":
                    custom_icon = NAServer_icon
                break;

                default:
                custom_icon = GroupLayer_icon
            }




                                                
                // text
                html += '<i class="' + custom_icon + '"></i>'
                html += "&nbsp;"
                html += '<span onclick="open_popup_server(\'' 
                html +=   _relative_name + '\', \'' +  _current_services_type + '\', \'' +  _service_url
                html += '\')">' 
                html +=   '<span class="context" style="cursor: pointer;font-size:small;">' +  _relative_name  +  '</span>'  
                
                html += '<span style="font-size:xx-small;"><sup>' + _current_services_type  +   '</sup></span>'

                 html += '</span>' 
                
                html += '</li>';
            }// for


                
      html += '</ol>';

    }
  

    $('#jstree_root_folder').html(html);

}  // function




//      - -  -  -   end    - -  -  -  streaming   - -  -  -  



































// document ready short hand






(function($){

   
    
    init_global_var();
    
     /**/
    // ------- let's go to your REST api  -------
    /**/
            init_start_root_input()
    /**/
    // --- end --- let's go to your REST api -------
    /**/
      
    // first time run 
    if (___url_string){
                        scan_root_folder()
    }


     //all init button, click event, including collapse expand button
     ui_event_register() 



})(jQuery);












