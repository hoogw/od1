






// for layers only, only show layers, 
// ignore other type, such as PDF document, map-application, etc.
function render_json_as_orderListORtreeORwhatEver(_results){ // for layers only
    // for layers only
    
    var html = '';
    
    if (_results.length > 0) {
            
        
        html += '<ol>';
            
            var _layerId
            var _accessURL_array
            var lastIndex
            var __restapi_url
            var _accessURL
            var ____distribution

            
            for (var i = 0; i < _results.length; ++i) {

                ____distribution = _results[i].distribution;

                _layerId = ""
                __restapi_url = ""

                // find layer id, ignore other types of 
                for (var d = 0; d < ____distribution.length; ++d) { 
                     _accessURL = ____distribution[d].accessURL;
                    if (_accessURL.includes("/rest/services/")){
                         // found a layer url
                        _accessURL_array = _accessURL.split('/');
                        _layerId = _accessURL_array[_accessURL_array.length - 1];
                        lastIndex = _accessURL.lastIndexOf('/'+ _layerId);
                       __restapi_url =  _accessURL.substring(0, lastIndex);

                       break; //for loop
                    } else {
                         // not a layer url
                    }
                } // for      
            

                if ((_layerId) && (__restapi_url)){

                    var _current_layer_name = _results[i].title;
                    var this_layer_id = _layerId
                    var _____layer_url = __restapi_url

                    //    ++++++++++++++++    open popup when click layer name     ++++++++++++++++ 
                    html += '<li style="font-size:xx-small;">' 
                            // text  -   context class for mark.js highlight , no tool-tip , no link
                            html += '<span onclick="open_popup(\''                    
                            html +=  this_layer_id + '\', \'' + _current_layer_name + '\', \'' + "feature layer" + '\', \'' +  _____layer_url
                            html += '\')">'
                            html += '<span class="context" style="cursor: pointer;font-size:small;">' + _current_layer_name +  '</span>'  
                            html +=  '</span>'  
                    html += '</li>';   
                    //    ++++++++++++++++   end  +++++++++++   open popup when click layer name     ++++++++++++++++ 

                }//if






               
            }// for

      html += '</ol>';
    }
  

    $('#jstree_root_folder').html(html);

}  // function













































