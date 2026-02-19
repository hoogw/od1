

var input_current 








// top level folder jstree
var folder_structure_flatjson= [];


// not use, only show as sample, later will re-populate  with real data
folder_structure_flatjson = [
                                                    



    { 
        "id" : "1", 
        "parent" : "#", 
        "text" : "Root",
        "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            "selected"  : true   // is the node selected
                        },
    },


    { 
        "id" : "2", 
        "parent" : "1", 
        "text" : "Folder" ,
        "state"       : {
            "opened"    : true,  // is the node open
            // disabled  : boolean  // is the node disabled
            //"selected"  : true   // is the node selected
        },
    },


    { 
        "id" : "3", 
        "parent" : "1", 
        "text" : "Service",
        "state"       : {
            "opened"    : true,  // is the node open
            // disabled  : boolean  // is the node disabled
            //"selected"  : true   // is the node selected
        },
    },

    { 
        "id" : "4", 
        "parent" : "2", 
        "text" : "xxx 1" 
    },


    { 
        "id" : "5", 
        "parent" : "2", 
        "text" : "xxx 2" 
    },

    { 
        "id" : "6", 
        "parent" : "3", 
        "text" : "MapServer",
        
    },

    { 
        "id" : "7", 
        "parent" : "3", 
        "text" : "FeatureServer",
        
    },



]



    // only for layers.js
    function jstree_root_folder(root_allfolders_flatjson, root_url, root_url_organization, root_url_hostname){

    var _html_org = ""
    // arcgis version number
    var _html_version = '<span style="font-size:xx-small;">ArcGIS Enterprise Version </span>'
    _html_version += '<span style="font-size:small; font-weight: bolder;">' + currentVersion + '</span>'
    _html_org += '<a target="_blank" id="_orgnization_link" href="'+ root_url + '">' + _html_version +  '</a>'
    // org name, not use, but keep here for future use 
    //_html_org += '<a target="_blank" id="_orgnization_link" href="'+ root_url + '">' + root_url_organization +  '</a>'
    // domain, not use, but keep here for future use 
    //_html_org += '<a target="_blank" id="_orgnization_link2" href="'+ root_url +'">' + root_url_hostname    + '</a>' 


    $('#message_root_folder').html(_html_org);



    console.log(" jstree all folder  flat json feed : ", root_allfolders_flatjson)




    $('#jstree_root_folder')
    
            // listen for event https://www.jstree.com/api/#/?q=.jstree%20Event
            // these 2 line, they will NOT fire event, if you click a already selected node, it only fire event if selected node changed.
            //.on('select_node.jstree', function (e, data) {
            //.on('changed.jstree', function (e, data) {

                
            // Warning: if you want to always fire event, even on a already selected node, use this line, 
            // the down stream code also need change, otherwise will not works
            .on('activate_node.jstree', function (e, data) {




        console.log(' click select folder node, event ', data)

        var selected_node_id = data.node.original.id
        var selected_node_path = data.node.original.absolute_path
        var selected_node_text = data.node.original.text
        var selected_node_layer_name = data.node.original.layer_name
        var selected_node_layer_id = data.node.original.layer_id
        var selected_node_type = data.node.original.type



        if (selected_node_type){
            
        }else{
            //   type: undefined, for v10.5 and before, type is undefined, but it is a featuerServer
            // _layer_url: "https://gis.anaheim.net/server/rest/services/Hosted/Test_Local_Gov_Scene_WFL1/FeatureServer"
            if ((selected_node_path.includes('FeatureServer')) || ( selected_node_path.includes('MapServer'))){ 
                selected_node_type = 'FeatureServer'                                                                               
                    console.log('warning:  .type is undefined, but url is feature server ')
            }
        }


        update_url_parameter('select_folder', selected_node_id);
        update_url_parameter('select_folder_text', selected_node_text);
        update_url_parameter('select_layer', '');



        if (selected_node_type == 'folder') {
            console.log(' you click a folder, nothing to do, selected node id:', selected_node_id)
        } else { 

            console.log(' open a new window, selected node id:', selected_node_id)
                
            console.log('array index Maybe not correct, folder_item node[id] : ', folder_structure_flatjson[selected_node_id])

            // frome array[folder_structure_flatjson],  get item,  item.id = selected_node_id
            var folder_item = folder_structure_flatjson.find(element => element.id == selected_node_id);
            console.log('find by id is more accurate : ', folder_item)

            // both works the same
            var _url_layer = folder_item.absolute_path
           


            console.log( '(layer) url >>>>> witout layer-id  ', selected_node_path)
            console.log( '(layer) display text >>>>>  ', selected_node_text)
            console.log( '(layer) name >>>>>  ', selected_node_layer_name)
            console.log( '(layer) id >>>>>  ', selected_node_layer_id)
            console.log( '(layer) type >>>>>  ', selected_node_type)
              
            

            // model-number, layer-name, type, MapFeatureServer-url-without-layer-ID, layer-id
            use_what_model_to_open_popup(
                model, 
                selected_node_layer_name, 
                selected_node_type, 
                selected_node_path, 
                selected_node_layer_id 
            )

           
            


        }//if
                                                                        
                                                                    




    })




    // 'ready.jstree' triggered after all nodes are finished loading
    // 'loaded.jstree' , triggered after the root node is loaded for the first time
    .on('ready.jstree', function (e, data) {

        // only run 1 time, first time when root folder jstree complete loaded
        pre_select_folder_level()

    })


    // create the instance $('#xxxx_div').jstree({ })
    .jstree({ 
        

        /**/
        // - - - filter layer list  - - - 
        /**/

                // doc https://www.jstree.com/api/#/?f=$.jstree.defaults.search.show_only_matches_children
                'search': {
                    // sample https://codepen.io/JGSpark/pen/VNeRLN
                    'fuzzy': false, // default is false,
                    'case_sensitive': false, // default,
                    // Indicates if the tree should be filtered (by default) to show only matching nodes
                    'show_only_matches' : true, //false, 
                    //Indicates if the children of matched element are shown (when show_only_matches is true)
                    'show_only_matches_children': true, //false,
                    //Indicates if all nodes opened to reveal the search result, should be closed when the search is cleared or a new search is performed. 
                    'close_opened_onclear': false,   // Default is true,
                    // Indicates if only leaf nodes should be included in search results
                    'search_leaves_only' : false, // default,
                },
                "plugins" : [ "search" ], // not use "wholerow", it will make line icon disappear 
        
        /**/
        // ... end ...  - - - filter layer list  - - -
        /**/
        
        
        'core' : {

                            'themes': {
                                'name': 'proton',
                                'responsive': true
                            },
                    

                        'data' : root_allfolders_flatjson





                } 


    });






    }









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
    


   var _warning_message = 'Empty or Bad Request or Content Blocked by Admin';


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
               

                    
                    console.log('all services ---> flat  ', absolute_path_service_url)
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




async function scan_root_folder(){ 









  
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
    
            rendering_json_to_jstree(input_current)
            
    } // if - input current is array []
    
    
}



function rendering_json_to_jstree(_results){
    

     folder_structure_flatjson = []

    // root
    var id_counter = 0;
    var current_parent_id_counter = 0;

    // root item + folder item + service item(mapserver, geocodeserver, etc......)
    var flatJson_item; 


   
     var root_url = ___url_string
    
        // ********* add root item *********


        flatJson_item =  { 
        // "id" : id_counter.toString(), 
            "id" : id_counter, 
            "parent" : "#",   // root parent id is #
            "text" : "Root",
            "icon" : folder_icon,
            "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                            },

            "relative_path": "Root",              
            "node_path" : "/", 
            "absolute_path" : root_url, 
            "type" : "folder"
        };


        // 1 time, first time run, add root item
        folder_structure_flatjson.push(flatJson_item) 

     
        // *******  end  ********* add root item *********


   

    if (_results.length > 0) {

          
            for (var i = 0; i < _results.length; ++i) {



 // ********* add folder item *********

                id_counter += 1;
              
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

               
                 var display_text = ''
                display_text +=  '<span style="font-size:xx-small;">' +  id_counter  +  '. </span>'
                display_text += '<span style="font-size:small;">' + _current_layer_name +  '</span>'
                display_text +=  '<span style="font-size:xx-small;">' + layerID_NAME_separator + ' (' +  this_layer_id  +  ') </span>'
                display_text += '<span style="font-size:xx-small;"><sup>' +  _current_layer_type  +   '</sup></span>'
                display_text += '<span style="font-size:xx-small;"><sub>' +  _current_layer_geometryType  +   '</sub></span>'

                flatJson_item =  { 
                    //"id" : id_counter.toString(), 
                    "id" : id_counter, 
                    //"parent" : current_parent_id_counter.toString(),   // root parent id is #
                    "parent" : current_parent_id_counter,   // root parent id is #
                    "text" : display_text ,
                    "icon" : custom_icon,
                    "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },

                    "layer_name":  _current_layer_name,    // only for server(service) name (without type)              
                    "layer_id" : this_layer_id, 
                    "absolute_path" : _____layer_url, 
                    "type" : _current_layer_type
                };
                        
                
                // add folder item
                folder_structure_flatjson.push(flatJson_item) 


    // ********* end ********** add folder item *********
    




            }// for

            

    }//if
  
     jstree_root_folder(folder_structure_flatjson, ___url_string,  _organization, ___hostname )
   

}  // function




//      - -  -  -   end    - -  -  -  streaming   - -  -  -  

/**/
 //  ****************  user click/select folder level item *******  layer level item  ********************
               /**/
                                    // folder level item could be folder or mapserver or GPserver or geocodeServer ( render folder section)
                                    function selectFolderLevelItem(folderLevel_id){

                                        console.log(' **** select folder level id is  ***** ', folderLevel_id )
                                        console.log(' **** select folder level id is  ***** ', $('#jstree_root_folder').jstree(true) )
                                        $('#jstree_root_folder').jstree().deselect_all(true);    // true means not trigger change.jstree event
                                        $('#jstree_root_folder').jstree(true).select_node(folderLevel_id);   // Not set 'true' means  will intend to trigger change.jstree event
                                        //$('#jstree_root_folder').jstree(true).select_node(_parent_id, true, true);  // true means not trigger change.jstree event.

                                    }

                                    // layer level item could be grouplayer( a folder have many sub layers ) or a feature layer or etc... ( render layer section)
                                    function selectLayerLevelItem(layerLevel_id){

                                        console.log(' **** select layer level id is  ***** ', layerLevel_id )
                                        $("#filter-server-div").show()
                                        $('#jstree_mapserver').jstree().deselect_all(true);    // true means not trigger change.jstree event
                                        $('#jstree_mapserver').jstree(true).select_node(layerLevel_id);   // Not set 'true' means  will intend to trigger change.jstree event
                                        //$('#jstree_mapserver').jstree(true).select_node(_parent_id, true, true);  // true means not trigger change.jstree event.

                                    }

               //  ****************  end  ***************   user click/select folder level item *******  layer level item  ********************
                /* */

                    /* */

                        // ****** pre select by url param  ****** 

                                    var selected_folderLevel_id;
                                    var selected_folderLevel_text;

                                    function  pre_select_folder_level(){

                                                // Do NOT re-create instance of url params, use first time, filter by=xxx  as records
                                                //urlParams = new URLSearchParams(window.location.search);


                                                    
                                                    selected_folderLevel_id = urlParams.get('select_folder');
                                                    selected_folderLevel_text = urlParams.get('select_folder_text');
                                                   
                                                   
                                                    console.log('old existing in url node id ',  selected_folderLevel_id)
                                                    // node id may not be true, if new item has been added to arcgis server, node text is always true, 
                                                    // node text is raw html, including html sup tag, + plus sign, but no need to clean up, just use it as is 
                                                    if ((selected_folderLevel_text == undefined) || (selected_folderLevel_text == null) || (selected_folderLevel_text == '')){
                                                            // select folder text is null, undefined, nothing to do, just use node id
                                                    }else {
                                                            // select folder text should overwrite node id, get real node id by node text
                                                                // get existing jstree flat json https://groups.google.com/g/jstree/c/nn7GPC43WpA
                                                            var rootFolderFlatJsonData = $('#jstree_root_folder').jstree(true).get_json('#', {no_state:true,flat:true})
                                                            console.log('root Folder Flat Json Data',  rootFolderFlatJsonData)
                                                            
                                                            for (let i = 0; i < rootFolderFlatJsonData.length; i++) {
                                                                if(rootFolderFlatJsonData[i]['text'] == selected_folderLevel_text){
                                                                    selected_folderLevel_id = rootFolderFlatJsonData[i]['id']
                                                                    console.log('find new real node id ',  selected_folderLevel_id)
                                                                }//if
                                                            }//for

                                                    }//if



                        
                                                    if ((selected_folderLevel_id == undefined) || (selected_folderLevel_id == null) || (selected_folderLevel_id == '')){
                        
                                                        // select folder is null, undefined, nothing to select
                                                    }else {
                        
                                                        console.log('selected_folderLevel_id',  selected_folderLevel_id)
                                                        selectFolderLevelItem(selected_folderLevel_id)
                                                       
                                                       
                                                    }



                                    }

                                    var firstTime_pre_select_layer = true;
                                    var selected_layerLevel_id;
                                    var selected_layerLevel_text;

                                    function  pre_select_layer_level(){


                                                        
                                                        selected_layerLevel_id = urlParams.get('select_layer');
                                                        selected_layerLevel_text = urlParams.get('select_layer_text');
                                                        
                                                        console.log('old in url layer level node id ',  selected_layerLevel_id)
                                                        // node id may not be true, if new item has been added to arcgis server, node text is always true, 
                                                        // node text is raw html, including html sup tag, + plus sign, but no need to clean up, just use it as is 
                                                        if ((selected_layerLevel_text == undefined) || (selected_layerLevel_text == null) || (selected_layerLevel_text == '')){
                                                                // select folder text is null, undefined, nothing to do, just use node id
                                                        }else {
                                                                // select folder text should overwrite node id, get real node id by node text
                                                                // get existing jstree flat json https://groups.google.com/g/jstree/c/nn7GPC43WpA
                                                                $("#filter-server-div").show()
                                                                var layerFlatJsonData = $('#jstree_mapserver').jstree(true).get_json('#', {no_state:true,flat:true})
                                                                console.log('layer Flat Json Data',  layerFlatJsonData)
                                                                
                                                                for (let i = 0; i < layerFlatJsonData.length; i++) {
                                                                    if(layerFlatJsonData[i]['text'] == selected_layerLevel_text){
                                                                        selected_layerLevel_id = layerFlatJsonData[i]['id']
                                                                        console.log('find new layer real node id ',  selected_layerLevel_id)
                                                                    }//if
                                                                }//for

                                                        }//if
                                                        

                            
                                                        if ((selected_layerLevel_id == undefined) || (selected_layerLevel_id == null) || (selected_layerLevel_id == '')){
                            
                                                            // select layer is null, undefined, nothing to select
                                                        }else {
                            
                            
                                                            selectLayerLevelItem(selected_layerLevel_id)
                            
                            
                                                        }



                                    }

                        // ******  end   ******  pre select by url param  ****** 
                        /**/


                     




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












