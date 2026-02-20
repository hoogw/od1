

// only for hub.js  5 min (360 sec)
var _timeout_hub_only = 360000;

var input_current 



                         










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

    
        //sample:    hub-domain + /data.json    http://opendata.ajax.ca/data.json 
        ___url_getJson = ___url_string + '/data.json';


        // need server have CORS supported, all works, 
        //input_current = await fetch_only(___url_getJson, _timeout_hub_only)
        //input_current = await ajax_datatype_json(___url_getJson, _timeout_hub_only)
        input_current = await ajax_jsonp_json_proxy(___url_getJson, _timeout_hub_only)

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






        