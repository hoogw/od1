






// for layers only
function render_json_as_orderListORtreeORwhatEver(_results){ // for layers only
    // for layers only
    
    var html = '';
    
    if (_results.length > 0) {
            html += '<ol>';
            for (var i = 0; i < _results.length; ++i) {
                html += '<li style="font-size:xx-small;">' 
                var ____distribution = _results[i].distribution;

                for (var d = 0; d < ____distribution.length; ++d) { 
                    if (____distribution[d].format) {
                            // "format": "Esri REST",      
                            if (____distribution[d].format.toLowerCase().includes('rest')){
                                ____esri_rest_api_endpoint = ____distribution[d].accessURL;
                            }  
                    }// if format
                } // for      
            

            var content_type = 'feature_layer'  // by default, can do all mapping 
            
        
        // ....... strip HTML from a string  .....

                var _description = _results[i].description;
                var _name = _results[i].title;
                
                    // https://ourcodeworld.com/articles/read/376/how-to-strip-html-from-a-string-extract-only-text-content-in-javascript

                    // ==== first step: remove html tag
                    var _description_stripedHtml = $("<div>").html(_description).text();
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
                    // 
                    //_description_stripedHtml = _description_stripedHtml.replace(/<[^>]+>/g, '');
                    //_name_stripedHtml = _name_stripedHtml.replace(/<[^>]+>/g, '');



                    // ==== second step: encode >, <, 
                    _description_stripedHtml = _description_stripedHtml.replace(/</g, '&lt;');
                    _description_stripedHtml = _description_stripedHtml.replace(/>/g, '&gt;');

                    _name_stripedHtml = _name_stripedHtml.replace(/</g, '&lt;');
                    _name_stripedHtml = _name_stripedHtml.replace(/>/g, '&gt;');



                // ....... end ......  strip HTML from a string  .....


            // for all 
            var __restapi_url;  // without layer-id    https://exploreajax.ajax.ca/mapajax/rest/services/Open_Data/Ajax_Open_Data/MapServer
            var __layerId;      // 21
            var  _accessURL;   // with layer-id  https://exploreajax.ajax.ca/mapajax/rest/services/Open_Data/Ajax_Open_Data/MapServer/21  
            // .... get portal id, for hub only .....
                //"identifier": "http://geohub.lacity.org/datasets/9eee1f2d84da4730b02ac90e5bfb560d_9",
                // portal id : 9eee1f2d84da4730b02ac90e5bfb560d
            var _identifier = _results[i].identifier;
            var _identifier_array = _identifier.split('/');
            var _portal_id = _identifier_array[_identifier_array.length - 1];
                _portal_id_array = _portal_id.split('_');
                _portal_id = _portal_id_array[0];
                input_current[i].portal_id = _portal_id
            // .... get portal id, for hub only .....

            var _distribution_array = _results[i].distribution

if ( content_type == 'feature_layer' ){

    // -------- feature layer    calculate layer id   ------------- 

        for (var d = 0; d < _distribution_array.length; d++) { 

                if (_distribution_array[d].format) {

                                var _distribution_format = _distribution_array[d].format
                                _distribution_format= _distribution_format.toLowerCase();

                                // rest api, layer id  
                                if (_distribution_format.includes('rest'))       // (_distribution_format == 'Esri REST')
                                {
                                        if ( _distribution_array[d].accessURL)
                                        {
                                                    _accessURL = _distribution_array[d].accessURL;
                                                    var  _accessURL_array = _accessURL.split('/');
                                                    __layerId= _accessURL_array[_accessURL_array.length - 1];
                                                    var lastIndex = _accessURL.lastIndexOf('/'+__layerId);
                                                    __restapi_url =  _accessURL.substring(0, lastIndex);
                                        }//if
                                }// if  
                } // if format
        } // for   before render icon, we need all resoure url link enforce parent-child protocol match rule, based on each individual resoure url protocol

    // --------  end    ------------- feature layer    calculate layer id   -------------        





    // type (map, table, other)
    


                var _current_layer_type = "Feature Layer"
                var _current_layer_name = _name_stripedHtml
                var this_layer_id = __layerId
                var _____layer_url = __restapi_url

            //    ++++++++++++++++    open popup when click layer name     ++++++++++++++++ 
                    // text  -   context class for mark.js highlight , no tool-tip , no link
                    html += '<span onclick="open_popup(\''                    
                    html +=  this_layer_id + '\', \'' + _current_layer_name + '\', \'' + _current_layer_type + '\', \'' +  _____layer_url
                    html += '\')" class="context" style="cursor: pointer; font-size:small;">' 
                    html +=   _current_layer_name +  '</span>'   
                    
                    
            //    ++++++++++++++++   end  +++++++++++   open popup when click layer name     ++++++++++++++++ 






}// if

                html += '</li>';
            }// for

      html += '</ol>';
    }
  

    $('#jstree_root_folder').html(html);

}  // function













































