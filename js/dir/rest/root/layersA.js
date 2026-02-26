

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
    

   var _warning_message = 'Nothing Found (Empty or Bad URL or Blocked by GIS Admin)';


    // add relative path reference
    root.relative_path = '';
    root.absolute_path = _url;
    // build stack


    var stack = new Stack();
    stack.push(root);


    // console.log(stack.count);
    
    while(stack.count > 0) {
                

        var current = stack.pop();
        
        // console.log('current-------',current);
        
        // all layers ---> flat 
        if (current.hasOwnProperty('layers')  && (current.layers !== null ) && (current.layers !== '' )) {

            var current_layers = current.layers;
        
            for (var k1 = 0; k1 < current_layers.length; k1++) {
                    
                // For layers:  _url_path/name/type  --->   https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer
                
                
                // console.log('current_layers::::: ',current_layers)
                
                if ((current_layers[k1].hasOwnProperty('name')) && (current_layers[k1].hasOwnProperty('id')) ) {
                
                    // layers, subLayerIds == null, means this is solid layer, can display
                    // if subLayerIds have some value, means this layer is not solid, it only use as folder directory, should skip it. 
                    if (current_layers[k1].subLayerIds == null) { 
                        
                    // solid layer,  need to count, add to final flat array 

                        var _absolute_url = _url;  //  _url(service type) is  xxx/mapserver
                                            
                        // _url(home, folder type) is xxx/rest/service or any folder
                        if (current.hasOwnProperty('absolute_path')){
                            _absolute_url = current.absolute_path;
                        }
                        
                        
                        
                        var _relative_path = _url; 
                        if (current.hasOwnProperty('relative_path')){
                            
                            _relative_path = current.relative_path;
                        }
                        
                        
                        
                        
                        
                        // layer type could be :  Feature Layer  or  Raster Layer ( use google12 ) ,  
                        var _layer = {
                            "type": current_layers[k1].type, 
                            "geometryType": current_layers[k1].geometryType,
                            "name": current_layers[k1].name, 
                            "id": current_layers[k1].id, 
                            "_layer_path":_relative_path, 
                            "_layer_url":_absolute_url,
                        };
                        


                        // remove duplicated layer name, even layer path are different, always  unique layer name
                        if (_flat.some(e => ((e.name == _layer.name) && (e.type == _layer.type)))) {
                        // We found at least one object that we're looking for!
                        } else {
                            _just_get = []
                            _just_get.push(_layer); 
                            _flat = _just_get.concat(_flat);
                        }

                       
                        console.log( 'all layers ---> flat '   ,  _flat.length, _layer._layer_path)
                        $("#jstree_root_folder").html("(" + _flat.length + ")" + _layer._layer_path)
                    
                    } else {

                        // subLayerIds have some value, means this layer is not solid, it only use as folder directory, should skip it, do nothing. do not count, do not add to final flat array 



                    }




                }//if 
                    

            
            }// for


            
                    
            
            } // layers
            
            
            
        
    
        // all tables ---> flat 
        if (current.hasOwnProperty('tables') && (current.tables !== null ) && (current.tables !== '' )){

            var current_tables = current.tables;
        
            _just_get = []

            for (var k1 = 0; k1 < current_tables.length; k1++) {
                
                // For tables:  _url_path/name/type  --->   https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer
                
                
            // console.log('current_tables::::: ',current_tables)
                
                if ((current_tables[k1].hasOwnProperty('name')) && (current_tables[k1].hasOwnProperty('id')) ){
                    
                    /*
                    * 
                                "layers": [

                                        ],
            
                                "tables": [
                                {
                                    "id": 0,
                                    "name": "SB272_Enterprise_System_Report",
                                    "parentLayerId": -1,
                                    "defaultVisibility": true,
                                    "subLayerIds": null,
                                    "minScale": 0,
                                    "maxScale": 0
                                }
]
                    */
                    
                    
                // tables, subLayerIds == null, means this is solid table, can display
                // if subLayerIds have some value, means this layer is not solid, it only use as folder directory, should skip it. 
                if (current_tables[k1].subLayerIds == null){ 
                    
                    
                    // solid layer,  need to count, add to final flat array
                    var _absolute_url = _url;  //  _url(service type) is  xxx/mapserver
                    
                    // _url(home, folder type) is xxx/rest/service or any folder
                    if(current.hasOwnProperty('absolute_path')){
                        _absolute_url = current.absolute_path;
                    }
                    
                        
                        
                    var _relative_path = _url;
                    if(current.hasOwnProperty('relative_path')){
                        _relative_path = current.relative_path;
                    }
                
                            

                    // "type":"table"  identifier, default is "layer"
                    var _layer = {
                        "type": current_layers[k1].type, //"table",
                        "geometryType": "table",
                        "name": current_tables[k1].name, 
                        "id": current_tables[k1].id, 
                        "_layer_path":_relative_path, 
                        "_layer_url":_absolute_url,
                    };
                    

                    // remove duplicated layer name, even layer path are different, always  unique layer name
                    if (_flat.some(e => ((e.name == _layer.name) && (e.type == _layer.type)))) {
                    // We found at least one object that we're looking for!
                    } else {
                        _just_get = []
                        _just_get.push(_layer); 
                        _flat = _just_get.concat(_flat);
                    }
                 
                    console.log( 'all tables ---> flat  '   ,  _flat.length, _layer._layer_path)
                    $("#jstree_root_folder").html("(" + _flat.length + ")" + _layer._layer_path)
                
                } else {
                    // subLayerIds have some value, means this layer is not solid, it only use as folder directory, should skip it, do nothing. do not count, do not add to final flat array 

                }
                
                
                
            }//if 
            
            
            }// for

        } // tables
    
    
    
    
            
            
            
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
                    
                    
                    
                    
                    
                    
                    
                    var absolute_path_service_url = current.absolute_path + '/'+ _relative_name +  '/'+_current_services_type

                    var _relative_path = current.relative_path + '/'+ _relative_name +  '/'+_current_services_type;
               

                    
                    console.log('node_path service ----> ',absolute_path_service_url)
                    $("#jstree_root_folder").html("(" + _flat.length + ")" + _relative_name)
                    
                    //var node =await ajax_getjson(node_path);
                    var node =await arcgis_ajax_cross_origin(absolute_path_service_url, _cross);  // cross origin method 
                    
                    
                    
                    
                    
                    if (node !== null) {
                            
                                node.absolute_path = absolute_path_service_url;
                                
                                node.relative_path = current.relative_path+ '/'+_relative_name;
                                
                                stack.push(node);
                    }//if









                    
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


                var _current_layer_name = _results[i].name;
                var _current_layer_type = _results[i].type;
                var _current_layer_geometryType = _results[i].geometryType;
                var this_layer_id = _results[i].id;
                var _____layer_url = _results[i]._layer_url; // include both layer and table url, 
                

                
   


                switch(_current_layer_type) {


                    case "Group Layer":
                        custom_icon = GroupLayer_icon
                        _current_layer_geometryType = 'folder'
                    break;

                    case "Feature Layer":
                    case "Annotation Layer":
                        //_layer_or_folder_icon = layer_icon
                        //custom_icon = AnnotationLayer_icon
                        switch(_current_layer_geometryType) {
                            case "esriGeometryPolygon":
                                    custom_icon = polygon_icon
                                    break;
                            case "esriGeometryPolyline":
                                    custom_icon = line_icon
                                    break;

                            case "esriGeometryMultipoint":        
                            case "esriGeometryPoint":
                                    custom_icon = point_icon
                                    break;
                            default:
                                        custom_icon = layer_icon
                        }//switch geometry type

                    break;

                

                    
                        
                    


                    case "Raster Layer":
                        custom_icon = RasterLayer_icon
                    break;

                    case "Raster Catalog Layer":
                        custom_icon = RasterCatalogLayer_icon
                    break;

                    case "Mosaic Layer":
                        custom_icon = MosaicLayer_icon
                    break;


                    case "Table":
                        custom_icon = table_icon
                    break;



                    default:
                    custom_icon = unknow_layer_icon
                }





                                                
                // text

                html += '<i class="' + custom_icon + '"></i>'
                html += "&nbsp;"

                html += '<a target="_blank" href="#" onclick="open_popup(\'' 
                html +=  this_layer_id + '\', \'' + _current_layer_name + '\', \'' + _current_layer_type + '\', \'' +  _____layer_url
                html += '\')">' 
                
               
                html += '<span class="context" style="cursor: pointer;font-size:small;">' + _current_layer_name +  '</span>' 
                
                html += '</a>' 

                html += '<span style="font-size:xx-small;">' + layerID_NAME_separator + '(' +  this_layer_id  +  ')</span>'

                html += '<span style="font-size:xx-small;"><sup>' +  _current_layer_type  +   '</sup></span>'
                html += '<span style="font-size:xx-small;"><sub>' +  _current_layer_geometryType  +   '</sub></span>'


                

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












