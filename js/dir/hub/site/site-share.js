



var site_array = []





var input_current       // whole array of json, without filter, 
var _filtered_results   // filtered results


var _filter_by // search filter by keyword


var current_filter_result_count;
var __total_item_count;


// when stop search button clicked, this will become true.
var stop_search_status = false;





  
  
  


               
  
                  //   *******  search event related   *******   


                  /**/
                                // simple for loop ( no lunr.js)
                                function search_layer_now() {



                                    _filter_by = $('#filter_by').val().toLowerCase().trim();

                                    var _filter_by_array = _filter_by.split(" ");
                                    
                                    console.log('_filter_by  --->  ', _filter_by)
                                    
                                    update_url_parameter('filter_by', _filter_by);
                                    
                                    
                                    
                                      if (_filter_by.length > 2) {  
                                    
                                    
                                                

                                                  // ............. filter results  ....................
                                              
                                                      _filtered_results = [];
                                                      var _test_string
                                                      var _valid

                                                      if (input_current.length > 0) {

                                                            for (var i = 0; i < input_current.length; ++i) {

                                                                _test_string = input_current[i].attributes.name;

                                                                if (_test_string){
                                                                              _test_string = _test_string.toLowerCase();
                                                                              _valid = true;

                                                                              //_filter_by_array.forEach(function(word){
                                                                              for (var k = 0; k < _filter_by_array.length; ++k) {





                                                                                  // if(_test_string.includes(word)) {
                                                                                  if(_test_string.indexOf(_filter_by_array[k]) > -1) {
                                                                                      // contain


                                                                                  }else {
                                                                                      // Not contain

                                                                                      _valid = false;

                                                                                  }// else





                                                                              } //for

                                                                              if (_valid) {

                                                                                    _filtered_results.push(input_current[i]);

                                                                              }// if 
                                                                } // if
                                                          }// for
                                                      }// if

                                                   show_current(_filtered_results)
                                
                                            // ..........  End ... filter results base on _search_for  ....................          

                                    } else {
                                          
                                         // less than 
                                          show_current(input_current) 
                                      }

                                    

                                }






                               
   
    




                            function init_search_button_event_handler(){

                                        // click search
                                      // $('#start_search_button').on('click',search_layer_now) 


                                        // when user click 'x'  or  when user click 'enter' to 'search' , both will trigger 'on search' event. you can't tell which is which, both will fire this event.  https://stackoverflow.com/questions/2977023/how-do-you-detect-the-clearing-of-a-search-html5-input
                                        $('#filter_by').on('search', search_layer_now);
                                  
                                        
                                          // fire when user every stroke any key  
                                          $("#filter_by").on('keyup',search_layer_now);

                                          // only fire when text field loose focus,  not fire when stroke any key  
                                          // when use choose option from autocomplete dropdwon list, field will loose focus, will fire this change event
                                          // works, but use alternative way >>>>>  autocomplete_options.onAutocomplete:  search_layer_now  //Callback for when autocompleted.
                                          // $("#filter_by").change(search_layer_now);


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



                            }



                  //   *******   end  ******   search event related   *******      






/**/





    // - -  -  -  streaming   - -  -  -  


      function init_streaming_event_handler() {

                
                $('#start_streaming_button').on('click',start_streaming);
                
                $('#stop_streaming_button').on('click',stop_streaming);
              
        }


        
        
        
        
        
        function stop_streaming(){
                  stop_search_status = true
                  console.log('  stop button clicked ===> ' )
        }
        
        
        
        
        




        function show_current(_current_showing) {
                        display_count_info('', _current_showing.length, __total_item_count, 'counter_label')
                        rendering_json_to_html(_current_showing)
                        highlight_keywords()
        }


  //      - -  -  -   end    - -  -  -  streaming   - -  -  -  














// document ready short hand

  
  (async function($){
  
   
               
               // not get url parameters, because arcgisServerList do not need any url parameters.
               // but here only need to get "linktopath" etc.....
               init_global_var()
               
               init_search_button_event_handler();

               

               init_streaming_event_handler();

               // only when user click start button to start, uncomment here to auto start
               //start_streaming()
               
               
 
                // can't be here, must await until streaming completed
                // filter_result_by_filter_by()

  
  
})(jQuery);
