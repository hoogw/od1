 

 // default is _ t i m e o u t =  2 0 0 0;  due to sometime, it slow response, 
 // re-set it to 
 _timeout = 30000;


      var standard_array = []
      




 // "input" was used in arcgis_common, do not use it here
 var input_current = [];  
 var _filtered_results   // filtered results


 var _filter_by // search filter by keyword
 
 var current_filter_result_count;
 

  
 // when stop search button clicked, this will become true.
 var stop_search_status = false;




var __this_page_array




var ___url_getJson     
var _search_data_content
var _search_content_split

    
          
                                

  
                  //   *******  search event related   *******   




                  function init_ui_event_handler(){
                        
                    /**/
                    //  - - - download csv  - - - 
                    /**/
                        $("#download_csv_button").on("click", function() {

                          if (input_current){
                            var final_csv_string = parse_json_to_csv_string(input_current)
                            saveStringAsFile('org.csv', final_csv_string)
                          }

                          
                        });
                    /**/
                    //  - - -  end  - - -   download csv    - - - 
                    /**/








                              // click search
                          
                              
                            // when user click 'x'  or  when user click 'enter' to 'search' , both will trigger 'on search' event. you can't tell which is which, both will fire this event.  https://stackoverflow.com/questions/2977023/how-do-you-detect-the-clearing-of-a-search-html5-input
                            $('#filter_by').on('search', search_layer_now);
                        

                                

                                // fire when user every stroke any key  
                                $("#filter_by").on('keyup',search_layer_now);
                                
                                // only fire when text field loose focus,  not fire when stroke any key  
                                // when use choose option from autocomplete dropdwon list, field will loose focus, will fire this change event
                                // works, but use alternative way >>>>>  autocomplete_options.onAutocomplete:  search_layer_now  //Callback for when autocompleted.
                                // $("#filter_by").change(search_layer_now);

                  }



                  //   *******   end  ******   search event related   *******      












                  

/**/


               // - -  -  -  streaming   - -  -  -  
                

               function init_streaming_event_handler() {

                             

                              // when user click 'x'  or  when user click 'enter' to 'search' , both will trigger 'on search' event. you can't tell which is which, both will fire this event.  https://stackoverflow.com/questions/2977023/how-do-you-detect-the-clearing-of-a-search-html5-input
                              $('#search_data').on('search',prepare_streaming_url);
                              
                              $('#start_streaming_button').on('click',prepare_streaming_url);       // where only
                             

                              
                              $('#stop_streaming_button').on('click',stop_streaming);
                              
                              
                              // only update URL search_data=xxx, not perform real search.
                              $("#search_data").on('keyup', function(){

                                _search_data_content = $('#search_data').val().toLowerCase().trim();

                                console.log('search key word entered is ', _search_data_content);

                                update_url_parameter('search_data', _search_data_content);
                              
                                



                                

                              });

                
                }




            
                   
                   
                   
                  function empty_last_time_result(){
                     standard_json_to_html({});
                  }   
                   
                  
                   
                   
                   
                   
                   function stop_streaming(){
                                stop_search_status = true
                                console.log('  stop button clicked ===> ' )
                               
                   }
                   
                   
                   
                   
                   
                   
                  
                   function show_current(_current_showing) {
                      display_count_info('', _current_showing.length, __total_item_count, 'counter_label')
                      standard_json_to_html(_current_showing)
                      highlight_keywords()
                  }


                             


                                 
                   function search_by_url_param(){


                     // based on URL ... &search_data=xxxx 
                       ___url_search_for = urlParams.get('search_data');









                       console.log('___url_search_for',  ___url_search_for)

                       if ((___url_search_for == undefined) || (___url_search_for == null) || (___url_search_for == '')){

                           // search for is null, undefined, nothing to search for


                       }else {

                         ___url_search_for = ___url_search_for.toLowerCase().trim();

                           $('#search_data').val(___url_search_for);
                           
                           // default search 
                           prepare_streaming_url()



                           // trigger keyup event, filter result by _search_for
                           // $(function() {
                                         // $('#search').keydown();
                                         //  $('item').keypress();
                             // both works (1)
                                         //  $('#search').on('keyup', );
                                         //  $('item').blur();
                             //         });




                               // both works (2)
                             // $('#search_data').trigger(jQuery.Event('keyup', { keyCode: 13 }));    


                       }

                 }






               //      - -  -  -   end    - -  -  -  streaming   - -  -  -  







  
  (async function($){
  
               
               
               
               init_global_var()

               
               
               init_ui_event_handler();

             

               init_streaming_event_handler();

               // url  ...&search_data=xxx
               search_by_url_param()
               

               // Can't be here, must wait until streaming compete, to do filter. 
               // url  ...&sfilter_by=xxx
               //filter_result_by_filter_by()

})(jQuery);
