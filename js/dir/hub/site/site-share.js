



var site_array = []





var input_current       // whole array of json, without filter, 
var _filtered_results   // filtered results


var _filter_by // search filter by keyword


var current_filter_result_count;



// when stop search button clicked, this will become true.
var stop_search_status = false;


var __this_page_array

var ___url_getJson    

  
  
  


               



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
