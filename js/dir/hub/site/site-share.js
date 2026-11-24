



var site_array = []





var input_current       // whole array of json, without filter, 
var _filtered_results   // filtered results


var _filter_by // search filter by keyword


var current_filter_result_count;



// when stop search button clicked, this will become true.
var stop_search_status = false;


var __this_page_array

var ___url_getJson    

  
  
  


               
  
                  //   *******  search event related   *******   


                


                            function init_ui_event_handler(){

                                      /**/
                                      //  - - - download csv  - - - 
                                      /**/
                                          $("#download_csv_button").on("click", function() {

                                            if (site_array){
                                              var final_csv_string = parse_json_to_csv_string(site_array)
                                              saveStringAsFile('site.csv', final_csv_string)
                                            }

                                          
                                          });
                                      /**/
                                      //  - - -  end  - - -   download csv    - - - 
                                      /**/

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

                
                $('#start_streaming_button').on('click',prepare_streaming_url);
                
                $('#stop_streaming_button').on('click',stop_streaming);
              
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


  //      - -  -  -   end    - -  -  -  streaming   - -  -  -  














// document ready short hand

  
  (async function($){
  
   
               
               
               
               init_global_var()
               
               init_ui_event_handler();

               init_streaming_event_handler();

             
  
  
})(jQuery);
