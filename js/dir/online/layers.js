



// only for hub.js  5 min (360 sec)
var _timeout_hub_only = 360000;

var input_current 





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
                    html += '<li class="space">' 
                            // ----- hover-span  ----- 
                            html += '<span class="context active-span hover-span" style="cursor: pointer;font-size:medium;"  onclick="open_popup(\''                    
                            html +=  this_layer_id + '\', \'' + _current_layer_name + '\', \'' + "feature layer" + '\', \'' +  _____layer_url
                            html += '\')">'
                            
                            html +=     _current_layer_name 
                            
                            html +=  '</span>'  
                            //  --- end  ---  ----- hover-span  ----- 

                    html += '</li>';   
                    //    ++++++++++++++++   end  +++++++++++   open popup when click layer name     ++++++++++++++++ 

                }//if






               
            }// for

      html += '</ol>';
    }
  

    $('#jstree_root_folder').html(html);



    
   
  // ----- hover-span  ----- 
    $(".active-span").on("click", function() {

        //remove all previous geojson
        $(".active-span").removeClass("hover-span-clicked");
        $(".active-span").addClass("hover-span"); 
        // first clean all previously clicked effect on other item
        
    
        // apply clicked effect on this clicked item
        $(this).addClass("hover-span-clicked");
        $(this).removeClass("hover-span");
    });
  //  --- end  ---  ----- hover-span  ----- 


}  // function






    // for 2 panel only, hide, empty both mapserver, feature layer, table related all tag
    function empty_icon_panel_all_tag(){

        // for 2 panel only, this combine original 3 panel serivce(middle) and icon(right) panel tag together
        $("#message_icon").html('');

        $("#filter-icon-div").hide();
        if ($('#jstree_icon').jstree){
            $('#jstree_icon').jstree('destroy');
        }


        $("#jstree_icon").html('');


        $("#inside_folder_item_list").html('');
        $("#view_mapserver_on").html('');
        $("#icon_list").html('');

        $("#layer_legend").html('');
        $("#message_more_info_icon").html('');


        $("#thumbnail_for_mapserver").html('');
        $("#message_more_info_mapserver").html('');
        $("#coord-sys-mapserver").html('');
        $("#json-mapserver").hide();

        // hide, need to show later
        $("#field_fieldset").hide();
        $("#subtype_fieldset").hide();
        $("#domain_fieldset").hide();
        $("#jsoneditor_field").hide();
        $("#jsoneditor_subtype").hide();
        $("#jsoneditor_domain").hide();

            $("#layer-more-info").html('');
            $("#json-layer").hide();

    }

    function reset_everything(){

        empty_icon_panel_all_tag()

        // clear left side root tree 
        if ($('#jstree_root_folder').jstree){
        $('#jstree_root_folder').jstree('destroy');
        }
        $("#jstree_root_folder").html('');

        $("#message_root_folder").html('');

    }
        





    // for hub arcgis online download json only 
    async function scan_root_folder(){ // for hub arcgis online download json only 
    // for hub arcgis online download json only  

    var _top_msg = '<a target="_blank" href="' + ___url_string + "/search"+ '">Home</a>'
    $("#top-message").html(_top_msg)
    
        //sample:    hub-domain + /data.json    http://opendata.ajax.ca/data.json 
        ___url_getJson = ___url_string + '/data.json';


       
        input_current = await ajax_jsonp_json_proxy(___url_getJson, _timeout_hub_only)

       

        console.log("url getJson:", ___url_getJson)
        

        console.log("input current", input_current)  

        if (input_current.dataset){
            input_current =  input_current.dataset
            //  ----- sort input_current = [title: "Sewer Structure", ...] alphabetically by title  ---------
                // function compareStrings() is at arcgis_common.js
                // sort by property 'title'. If property is others, then do not sort, comment out this section.
                input_current.sort(function(a, b) {
                    return compareStrings(a.title, b.title);
                });
            //  ----- end ------ sort input_current = [title: "Sewer Structure", ...] alphabetically by title  ---------
            /**/
        }

        
    console.log("after sort by title : ", input_current)  

        
    render_json_as_orderListORtreeORwhatEver(input_current)
        
    }




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













































