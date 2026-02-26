




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




    // only for root.js
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
        var selected_node_layer_id = data.node.original.layer_id
        var selected_node_path = data.node.original.absolute_path
        var selected_node_text = data.node.original.text
        var selected_relative_path = data.node.original.relative_path
        var selected_node_relative_name = data.node.original.relative_name
        var selected_node_type = data.node.original.type


        var selected_node_absolute_path_parent_service = data.node.original.absolute_path_parent_service


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

            console.log(' you click (server) MapServer or FeatureServer or geocode server etc... , open a new window, selected node id:', selected_node_id)
                
            console.log('array index Maybe not correct, folder_item node[id] : ', folder_structure_flatjson[selected_node_id])

            // frome array[folder_structure_flatjson],  get item,  item.id = selected_node_id
            var folder_item = folder_structure_flatjson.find(element => element.id == selected_node_id);
            console.log('find by id is more accurate : ', folder_item)
           

            console.log( '(server) selected_node_absolute_path_parent_service >>>>> without layer-id ,  ', selected_node_absolute_path_parent_service)
            console.log( '(server) selected_relative_path >>>>> with layer-id  ', selected_relative_path)
            console.log( '(server) selected_node_path >>>>> with layer-id ', selected_node_path)
            console.log( '(server) display name (type) >>>>> selected_node_text ', selected_node_text)
            console.log( '(server) name >>>>> selected_node_relative_name ', selected_node_relative_name)  //selected_relative_path
            console.log( '(server) type >>>>> selected_node_type ', selected_node_type)
            console.log( '(server) selected_node_id  ', selected_node_id) 
            console.log( '(server) selected_node_layer_id  ', selected_node_layer_id)   


            if (selected_node_layer_id){
                 // layer id found, means this is a layer, not a mapserver

                 // model-number, layer-name, type, MapFeatureServer-url-without-layer-ID, layer-id
                use_what_model_to_open_popup(
                    model, 
                    selected_node_relative_name, 
                    selected_node_type, 
                    selected_node_absolute_path_parent_service, 
                    selected_node_layer_id 
                )


            } else {

                   // No layer id , means this is mapserver, not layer, 
                    var _newTab_link =  window.location.origin + window.location.pathname.replace('/root/home1.html', '/svr/server.html')
                    _newTab_link += '?org=' + selected_relative_path  
                    _newTab_link += '&url=' + selected_node_path 
                    _newTab_link += '&type=' + selected_node_type
                    _newTab_link += '&model=' + model // will pass model number to server.js
                    console.log('_newTab_link', _newTab_link)

                    //window.open(_newTab_link, "mozillaWindow", "popup");
                    window.open(_newTab_link, "_blank", "popup");
                

            }
           
            
            


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



// -- -- --  scan root server ( all layer from root for 2 panel )-- -- -- 
    async function scan_root_folder(){
// -- -- --  scan root server ( all layer from root for 2 panel )-- -- -- 
   

    folder_structure_flatjson = []

    // root
    var id_counter = 0;
    var current_parent_id_counter;

    // root item + folder item + service item(mapserver, geocodeserver, etc......)
    var flatJson_item; 


    var custom_icon, service_name_and_type;

            
    var _flat = [];     // ... accumulated... mapserver only or feature server only
    var _just_get = []  // not accumulat, only the current transaction get


    console.log( 'scan folder structure rest api root url >>>>>  ', ___url_string)
    var root_url = ___url_string










    // always before await ajax, show ajax url , instead of show progressing bar 
    progressing_info('folder', id_counter, root_url);
    var root = await arcgis_ajax_cross_origin(root_url, _cross);  // cross origin method 
                

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

        root.id = flatJson_item.id
        // *******  end  ********* add root item *********

        // add relative path reference
        root.relative_path = '/';
        root.absolute_path = root_url;
        // build stack

        var stack = new Stack();
        stack.push(root);

        // console.log(stack.count);
        while(stack.count > 0) {
            // first pop up 'root', because root was first push into the stack(queue), first in stack, first pop up stack 
            var current = stack.pop();
            
            // console.log('current-------',current);
            // set current node id as sub-item's parent id
            current_parent_id_counter = current.id;

            // all folders ---> stack
            if(current.hasOwnProperty('folders')&& (current.folders !== null ) && (current.folders !== '' )) {
                if(current.folders.length >0) {





                var current_folders = current.folders;
                for (var j2 = 0; j2 < current_folders.length; j2++) {
                    
                    
                    
                    //---- fix bug: absolute service/folder name need to convert to relative service/folder name ----
                    // https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Portland
                    // service name (Portland/Aerial) is absolute, we only need the "Aerial", not need "Portland/Aerial"
                    // Portland/Aerial (ImageServer)

                    // node_path is 'Portland/Aerial'
                    //
                        var  node_path = current_folders[j2]                 
                        var  node_path_array = node_path.split('/');
                        var  _relative_name = node_path_array[node_path_array.length-1]; // if have /, only need last part after last /

                    //---- end ---- fix bug: absolute service/folder name need to convert to relative service/folder name -----
                




                    
                    // this absolute path is for children's absolute path, do not confuse with current(parent) absolute path
                    var absolute_path = current.absolute_path + '/'+ _relative_name; 
                    
                    


                    // ********* add folder item *********

                                id_counter += 1;

                                flatJson_item =  { 
                                    //"id" : id_counter.toString(), 
                                    "id" : id_counter, 
                                    //"parent" : current_parent_id_counter.toString(),   // root parent id is #
                                    "parent" : current_parent_id_counter,   // root parent id is #
                                    "text" : _relative_name,
                                    "icon" : folder_icon,
                                    "state"       : {
                                                        "opened"    : true,  // is the node open
                                                        // disabled  : boolean  // is the node disabled
                                                        // "selected"  : true   // is the node selected
                                                    },

                                    "relative_path":  _relative_name,    // only for server(service) name (without type)              
                                    "node_path" : node_path, 
                                    "absolute_path" : absolute_path, 
                                    "type" : "folder"
                                };
                                        
                                
                                    // add folder item
                                    folder_structure_flatjson.push(flatJson_item) 


                    // ********* end ********** add folder item *********
                    

// always before await ajax, show ajax url , instead of show progressing bar 
console.log('folder relative name (folder name)', id_counter, _relative_name); 
console.log('folder (path)', id_counter, absolute_path);
progressing_info('folder', id_counter, absolute_path);



// this absolute path is for children's absolute path, do not confuse with current(parent) absolute path
// var node =await ajax_getjson(absolute_path);
var node =await arcgis_ajax_cross_origin(absolute_path, _cross);  // cross origin method 

if (node !== null){
node.absolute_path = absolute_path;
node.relative_path = current.relative_path+ '/'+_relative_name;

// must carry this id as sub-item's parent id
node.id = flatJson_item.id;

stack.push(node);
}// if





}// for
                        




                    }  // if folders.length >0    
            }  // if folders    
                
            // all services ---> flat 
            if ( current.hasOwnProperty('services')  && (current.services !== null ) && (current.services !== '' )){
                if ( current.services.length > 0 ){


                    var current_services = current.services;
            
                        console.log('current_services, folder-id ',current_parent_id_counter,  current_services)

                    for (var i1 = 0; i1 < current_services.length; i1++) {
                    
                    
                        //console.log('i1-', i1)
            
            
            
            
                        //---- fix bug: absolute service/folder name need to convert to relative service/folder name ----
                        // https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Portland
                        // service name (Portland/Aerial) is absolute, we only need the "Aerial", not need "Portland/Aerial"
                        // Portland/Aerial (ImageServer)
                            
                            var node_path = current_services[i1].name  //      'Utilities/GeocodingTools'
                            var  node_path_array = node_path.split('/');
                            var  _relative_name = node_path_array[node_path_array.length-1]; // if have /, only need last part after last /      we only need  'GeocodingTools'
                            var _current_services_type = current_services[i1].type 
                            console.log('_current_services_type', _current_services_type)                                                                              // 'GPServer'
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
                };


                console.log('flat push a  _mapServer ', _mapServer)

                _just_get = []
                _just_get.push(_mapServer); 
                _flat = _just_get.concat(_flat);




                        // ********* add service item *********

                                    id_counter += 1;

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
                                    
                                    
                                    service_name_and_type = _relative_name + ' ' + '<sup>' + _current_services_type + '</sup>';

                                    flatJson_item =  { 
                                    // "id" : id_counter.toString(), 
                                        "id" : id_counter, 
                                    // "parent" : current_parent_id_counter.toString(),   // root parent id is #
                                        "parent" : current_parent_id_counter,   // root parent id is #
                                        "text" :  service_name_and_type,
                                        "icon" : custom_icon,
                                            "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        },

                                        "relative_path": _relative_name,  // only for server(service) name (without type)              
                                        "node_path" : node_path,
                                        "absolute_path" : absolute_path_service_url, 
                                        "type" : _current_services_type
                                    };
                                            
                                    
                                        // add folder item
                                        folder_structure_flatjson.push(flatJson_item) 


                        // ********* end ********** add service item *********
        






// * * * *** * * * for 2 panel only  * * * *** * * *

            // always before await ajax, show ajax url , instead of show progressing bar
            progressing_info('folder', id_counter, absolute_path_service_url);
            console.log('service id before ajax', id_counter, absolute_path_service_url)


            // this absolute path is for children's absolute path (absolute_path_service_url), do not confuse with current(parent) absolute path
            // var node =await ajax_getjson(absolute_path_service_url);
            var node =await arcgis_ajax_cross_origin(absolute_path_service_url, _cross);  // cross origin method 
            console.log(' layer node raw raw ', id_counter, absolute_path_service_url, node)

            if (node !== null){

                node.absolute_path = absolute_path_service_url;
                node.relative_path = _relative_path

                // must carry this id as sub-item's parent id
                //node.id = flatJson_item.id;
                // both works same
                node.id = id_counter


                console.log(' layer node, id, path has been set, before push ', node.id, node)
                stack.push(node);
            }// if


//  * * * *** * * *  end * * * *** * * * for 2 panel only  * * * *** * * *
            


                    }// for 


                }  // if services.length > 0
            }  // if services




        // ----- warning: only for 2-panel, must deal with layers  -----
        
                
                // if response have 'layers', means it is a xxx/MapServer,  not xxx/rest/service 
                // this is for if the url is a  xxx/MapServer, not the home root xxx/rest/service,  there is special case seattle,   
                if ( current.hasOwnProperty('layers')  && ( current.layers !== null ) && ( current.layers !== '' )) {

                    if ( current.layers.length > 0 ) {


                        console.log(' processing current.layers ', current.layers)

                        
                        var layer_flatjson_array = []

                        var current_layers = []
                        
                        // by default, only process layers
                        current_layers = current.layers

                        // if response have 'tables', means it is a mapserver, with table, just regard table as other layer
                        // test look for BaseMap/parcels_table  at https://gis.la-quinta.org/arcgis/rest/services
                        if ( current.hasOwnProperty('tables')  && ( current.tables !== null ) && ( current.tables !== '' )) {
                            if ( current.tables.length > 0 ) {
                                console.log(' processing current.tables ', current.tables)
                                current_layers = []
                                current_layers = current.layers.concat(current.tables);
                            } // if tables.length > 0
                        } // if tables





                        for (var j2 = 0; j2 < current_layers.length; j2++) {
                            

                            
                            // subLayerIds 
                            var subLayerIds_array = current_layers[j2].subLayerIds
                            var parentLayerId_relative_to_sublayerid = current_layers[j2].parentLayerId
                            // parentLayerId_relative_to_sublayerid = -1 means top layer or folder(group layer) relative to map server (service)
                        
                            var this_layer_parent_id 
                            if ((parentLayerId_relative_to_sublayerid == -1) 
                                || (parentLayerId_relative_to_sublayerid == undefined)
                                    || (parentLayerId_relative_to_sublayerid == null)) {

                                // by default, this layer parent id should be upper level map service id       
                                this_layer_parent_id = current.id

                            } else {

                                // if parent layer id has specific number 0, 1, 2...., means this is group layer folder. parent id, should be unique treeid(id counter generated) translate from parentLayerId_relative_to_sublayerid
                                //this_layer_parent_id =>>>>  translate (parentLayerId_relative_to_sublayerid)
                                var found_parent_layer = layer_flatjson_array.find((element) => element.layer_id == parentLayerId_relative_to_sublayerid);

                                if (found_parent_layer){
                                    if (found_parent_layer.hasOwnProperty('id')){
                                            this_layer_parent_id = found_parent_layer.id
                                    } 
                                    
                                } else {
                                    console.log(' warning,  found_parent_layer, not found !!!!!! this parent id not found ', parentLayerId_relative_to_sublayerid, layer_flatjson_array )
                                    this_layer_parent_id = current.id
                                }
                                
                            }

                                                    // --------- avoid undefined,null value, validate -----------------
                    
                                                            var this_layer_id 
                                                            if ((current_layers[j2].id !== undefined) && (current_layers[j2].id !== null) && (current_layers[j2].id !== "")) {
                                                                this_layer_id = current_layers[j2].id
                                                            } else {
                                                                this_layer_id = j2 // default layer item id should be 0,1,2.... in order, (if no layer id provided) 
                                                            }

                                    
                                                            var _current_layer_type 
                                                            if (current_layers[j2].type){
                                                                _current_layer_type = current_layers[j2].type
                                                            } else {
                                                                _current_layer_type =  ''; // 'unknown layer type'
                                                            }


                                                            var _current_layer_geometryType 
                                                            if (current_layers[j2].geometryType){
                                                                _current_layer_geometryType = current_layers[j2].geometryType
                                                            } else {
                                                                _current_layer_geometryType = ''; // 'unknown geometry type'
                                                            }


                                                            var _current_layer_name
                                                            if (current_layers[j2].name){
                                                                _current_layer_name = current_layers[j2].name
                                                            } else {
                                                                _current_layer_name = ''; // 'unknown layer name'
                                                            }

                                                    
                                                    var node_path = current_layers[j2]
                                                    var absolute_path_service_url = current.absolute_path
                                                    var _relative_path_service_url = current.relative_path 
                                                    var absolute_path_layer_url = current.absolute_path + '/' + this_layer_id
                                                    var _relative_path_layer_url = current.relative_path + '/' + this_layer_id
                                                    
                                                    
                                    
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

                                                    var _node_display_text = this_layer_id + layerID_NAME_separator + _current_layer_name + '<sup>' + _current_layer_type + '<sub>' + ' ' +  _current_layer_geometryType + '</sub></sup>';
                                    

                                                // ********* add layer item *********
                                                
                                                            id_counter += 1;


                                                        

                                                            flatJson_item =  { 
                                                        
                                                                "id" :  id_counter, 
                                                                
                                                                "layer_id" : this_layer_id, 
                                                                "layer_parent_id":this_layer_parent_id,

                                                                "parent" : this_layer_parent_id,   
                                                                "text" :  _node_display_text,
                                                                "icon" : custom_icon,
                                                                    "state"       : {
                                                                                    "opened"    : true,  // is the node open
                                                                                    // disabled  : boolean  // is the node disabled
                                                                                    // "selected"  : true   // is the node selected
                                                                                },

                                                                "relative_path_parent_service": _relative_path_service_url,
                                                                "relative_path": _relative_path_layer_url,                
                                                                "node_path" : node_path, 
                                                                "relative_name":_current_layer_name,
                                                                "absolute_path_parent_service" : absolute_path_service_url,
                                                                "absolute_path" : absolute_path_layer_url, 
                                                                "type" : _current_layer_type
                                                            };
                                                                    

                                                            console.log(' stack push layer item ', _node_display_text, flatJson_item)
                                                            

                                                                layer_flatjson_array.push(flatJson_item)

                                                                // add layer item
                                                                folder_structure_flatjson.push(flatJson_item) 


                                                // ********* end ********** add layer item *********



                        

                                





                            }// for

                        } // if layers.length > 0
                } // if layers
                
                
                /**/
                //  --- NAserver    --- 
                /**/  
                    if ( current.hasOwnProperty('routeLayers')  && ( current.routeLayers !== null ) && ( current.routeLayers !== '' )) {

                        if ( current.routeLayers.length > 0 ) {

                        console.log(' processing current.routeLayers ',current,  current.routeLayers)                
                        var layer_flatjson_array = []
                        var current_layers = []
                        // by default, only process layers
                        current_layers = current.routeLayers


                        // by default, this layer parent id should be upper level map service id       
                        var this_layer_parent_id = current.id
                        id_counter += 1;
                        var folder_as_parent_id = id_counter

                        flatJson_item = { 
                        "id" :  folder_as_parent_id,                                        
                        "parent" : this_layer_parent_id, 
                        "text" : "Route Layers", 
                        "icon" :  folder_icon,
                        "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                        },
                        "type" : "na-server-folder",

                            
                        };
                        folder_structure_flatjson.push(flatJson_item) 



                        var NAserver_layers_name;
                        var encodedURL_NAserver_layers_name 
                        var _NAserver_layers_display_text


                        var NAserver_layers_absolute_path = current.absolute_path ;
                        var current_layer_server_path =   current.absolute_path;


                        console.log('NAserver_layers_absolute_path  ', NAserver_layers_absolute_path)
                        console.log('current_layer_server_path  ', current_layer_server_path)

                        for (var j2 = 0; j2 < current_layers.length; j2++) {  

                        id_counter += 1;
                        console.log('parent-id, self-id,  routeLayers  ', this_layer_parent_id,  id_counter, current_layers[j2])

                        _NAserver_layers_display_text = current_layers[j2]
                        NAserver_layers_name = current_layers[j2]
                        encodedURL_NAserver_layers_name = encodeURIComponent(NAserver_layers_name) 

                        flatJson_item = { 
                        "id" :  id_counter,                                      
                        "parent" : folder_as_parent_id,
                        "text" : _NAserver_layers_display_text,
                        "name" : NAserver_layers_name, 
                        "icon" :  layer_icon,
                        "state": {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                        },

                        "absolute_path" : NAserver_layers_absolute_path + "/" + encodedURL_NAserver_layers_name,
                        "server_path" : current_layer_server_path, // MapFeatureServer url only without layer-id
                        "type" : "route-layer",
                                
                        };
                        // add layer item
                        folder_structure_flatjson.push(flatJson_item)                                                   
                        }// for


                        } // if
                    } // if routeLayers
                /**/
                //  --- end  ---  NAserver    --- 
                /**/  
                
         //  ----- end  ----- warning: only for 2-panel, must deal with layers  -----
             
                    
        }// while

        if (folder_structure_flatjson.length >1) {
                jstree_root_folder(folder_structure_flatjson, ___url_string,  _organization, ___hostname )
        } else {
            progressing_info('folder', "Warning:",_warning_message);
        }        
          
    }

                                



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


    // can't be here, must await until first time load completed
    //pre_select_folder_level()



})(jQuery);












