



           
         
var selected_team = "ALL"
var in_use_json_array_url 
var all_json_array_url = "https://arcgis-online.com/php/all.php"
var rest_json_array_url = "https://arcgis-online.com/php/rest-only.php"
var site_json_array_url = "https://arcgis-online.com/php/site-only.php"
           


      
      var standard_array = []
     


      // dead + live = standard array 
      var dead_array = []
      var live_array = []
 

                  var input_current       // whole array of json, without filter, 
                  var _filtered_results   // filtered results
                  var _filter_by // search filter by keyword  
                   var current_filter_result_count;
                  var __total_item_count;
                   
      
                  







      
//   *******  search event related   *******   


  // at least 1 letter to start search, 
  // when found 100, than break for loop, 
  // always limit to 100 if search something.
  function search_layer_now() {

    _filter_by = $('#filter_by').val().toLowerCase().trim();
    var _filter_by_array = _filter_by.split(" ");
    console.log('_filter_by  --->  ', _filter_by)
    update_url_parameter('filter_by', _filter_by);
    
    if (_filter_by.length > 0) {  
                        
      // ............. filter results  ....................
      _filtered_results = [];
      var _test_string
      var _valid

      if (input_current.length > 0) {
        for (var i = 0; i < input_current.length; ++i) {

          //  not use : name + orgnization     
          //_test_string = input_current[i].attributes.name + ' ' + input_current[i].attributes.orgName;
          _test_string = input_current[i].name                                                   
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
            if (_filtered_results.length >= 100){
             break; // for loop
            } else {
              _filtered_results.push(input_current[i]);
            }//if
          }//if

        }// for
      }// if
    
      show_current(_filtered_results)     
      // ..........  End ... filter results base on _search_for  ....................          

    } else {
        // less than 
        show_current(input_current)
    }
  }




function show_current(_current_showing) {
    display_count_info('', _current_showing.length, __total_item_count, 'counter_label')
    standard_json_to_html(_current_showing)
    highlight_keywords()
}

 

  function change_team(_selectedTeam){

    switch (_selectedTeam) {
      case "ALL":
        in_use_json_array_url = all_json_array_url
        break;
      case "REST":
        in_use_json_array_url = rest_json_array_url
        break;
      case "SITE":
        in_use_json_array_url = site_json_array_url
        break;
      default:
        in_use_json_array_url = all_json_array_url
    }

  }




  function init_ui_event_handler(){




        /**/
        //  - - -  ---  select team radio   ---  - - -
        /**/

        if ($("input[type=radio][name=team-radio]")){

            // first time set radio
            $("input[type=radio][name=team-radio][value=" + selected_team + "]").prop('checked', true);
            change_team(selected_team)



            $("input[type='radio'][name='team-radio']").change(function(){
                        selected_team = $("input[type='radio'][name='team-radio']:checked").val();
                        console.log(" selected team changed to : --  ", selected_team);

                        change_team(selected_team)
                        getJsonArrayByUrl(in_use_json_array_url)

                      });
        }//if
      

        /**/
        //  --- end  --- select team radio    - - -  --- 
        /**/






//       - -  -  -  upload csv   - -  -  -  

      
       // if upload same file, will not trigger this event, only different file name trigger event     
       $("#file-input").on("change", async function(event) {
        
        // get c:\fakepath\xxx.xxx
        file_fakepath = event.target.value;
        // only name, no path
        fileName = event.target.files[0].name;
        console.log('file fake path, file Name',file_fakepath,  fileName)

        if (fileName.indexOf(".csv") !== -1) {

          var file_reader = new FileReader();

          file_reader.onload = function(e) {
               var arrayBuffer = file_reader.result;
               var file_string = new TextDecoder("utf-8").decode(arrayBuffer);
               //console.log('arrayBuffer -- ',arrayBuffer)
               //console.log('file_string  -- ',file_string)
               csvString2json(file_string)

               
          } 

          file_reader.readAsArrayBuffer(document.getElementById('file-input').files[0]);

        } else {
          alert("not .csv file, invalid file format")
        }
      });



//      - -  -  -   end    - -  -  -  upload csv   - -  -  -  





//       - -  -  -  remove Dead, Tiles, etc   - -  -  -  

  $("#dead_removal_button").on("click", async function() {


    var name
    var org
    var url
    var count_of_layer = 0
    var _results
    var _accessURL
    var ____distribution

     for (let i = 0; i < (standard_array.length); i++) {

        name = standard_array[i]["name"]
        org = standard_array[i]["org"]
        url = standard_array[i]["url"]

        display_count_info('', i, __total_item_count, 'counter_label')
        //  check live or dead link

        try {


          // enforce https, because some time, old record still use http, 
          standard_array[i]["url"] = url.replace("http://", "https://")


          // these kind of always not working, remove it from array
          if (url.includes("utility.arcgis.com") || 
              url.includes("tiledimageservices.arcgis.com") ||
              url.includes("tiles.arcgis.com")
          
          ){

                        console.log("tiles, utility, removed", url)
                        $("#json-renderer").html("<span style='color:blue;'>{tiles, utility, removed .arcgis.com}" + " " + name + " " + org + " " + url  + " " + "</span>")
                        dead_array.push(standard_array[i])
          } else {

                  
                // only for REST api URL
                if (url.includes("/rest/services")){

                    var dead_response = await ajax_getjson_common(url + "?f=json");

                    /**/
                    //  - - -  ---  try more times   ---  - - -
                    /**/

                    console.log("test dead url:", url + "?f=json")
                    console.log("dead response:", dead_response )
                    if (!(dead_response) ||(dead_response.error) || !(dead_response.currentVersion)){


                        tryMoreTimes = 0

                        // something wrong
                        while (tryMoreTimes < MaxNumberOfTry){

                            
                      
                            tryMoreTimes += 1
                            // hrsa take a very long time to get root-folder, and many of sub-folder is login required, take very long time
                            // this time out is only for root-folder who take very long
                            // for sub-folder must revert back to short 1 sec
                            _timeout = more_time

                            console.log("try - ROOT - again with more waiting time, No of try, wait time in sec", tryMoreTimes, _timeout )
                            console.log("try - ROOT - again with more waiting time,url", url + "?f=json")
                            //letsgo_handler()
                            dead_response = await ajax_getjson_common(url + "?f=json");

                            if ((dead_response) && (dead_response.currentVersion)){
                                break; // while loop
                            }

                        }// while
                    }

                    if ((dead_response) && (dead_response.currentVersion)){


                        // live, not dead
                        if (dead_response.currentVersion){ org += " v"+ dead_response.currentVersion}
                        if (dead_response.folders){        org += " " + dead_response.folders.length  + "f"}
                        if (dead_response.services){       org += " " + dead_response.services.length + "s"}

                        standard_array[i]["org"] = org
                        $("#json-renderer").html("<span>" + " " + name + " " + org + " " + url  + " " + "</span>")
                        live_array.push(standard_array[i])

                    } else {
                          console.log("dead link ", url)
                          // not for final display, just for show user info
                          $("#json-renderer").html("<span style='color:red;'>{Dead link}" + " " + name + " " + org + " " + url  + " " + "</span>")
                          dead_array.push(standard_array[i])
                    }//if


                }//if rest service



                // only for hub site URL
                if (url.includes(".hub.arcgis.com")){

                    var dead_response = await ajax_getjson_common(url + '/data.json');

                    /**/
                    //  - - -  ---  try more times   ---  - - -
                    /**/

                    console.log("test dead url:", url + '/data.json')
                    console.log("dead response:", dead_response )
                    if (!(dead_response) ||(dead_response.error) || !(dead_response.dataset)){


                        tryMoreTimes = 0

                        // something wrong
                        while (tryMoreTimes < MaxNumberOfTry){

                            
                      
                            tryMoreTimes += 1
                            // hrsa take a very long time to get root-folder, and many of sub-folder is login required, take very long time
                            // this time out is only for root-folder who take very long
                            // for sub-folder must revert back to short 1 sec
                            _timeout = more_time

                            console.log("try - ROOT - again with more waiting time, No of try, wait time in sec", tryMoreTimes, _timeout )
                            console.log("try - ROOT - again with more waiting time,url", url + '/data.json')
                            //letsgo_handler()
                            dead_response = await ajax_getjson_common(url + '/data.json');

                            if ((dead_response) && (dead_response.dataset)){
                                break; // while loop
                            }

                        }// while
                    }

                  if ((dead_response) && (dead_response.dataset)){


                      // live, not dead
                      count_of_layer = 0
                      _results = dead_response.dataset
                      
                      for (var r = 0; r < _results.length; ++r) {
                        ____distribution = _results[r].distribution;
                        for (var d = 0; d < ____distribution.length; ++d) { 
                          _accessURL = ____distribution[d].accessURL;
                          if (_accessURL.includes("/rest/services/")){
                            count_of_layer += 1
                          }//if
                        }//for
                      }//for

                      if (count_of_layer > 0){
                          org += " " + count_of_layer + "L"
                          standard_array[i]["org"] = org
                          live_array.push(standard_array[i])
                      } else {
                          // have data set, but layer is 0, remove it
                          dead_array.push(standard_array[i])
                      }//if

                      // not for final display, just for show user info
                      $("#json-renderer").html("<span>" + " " + name + " " + org + " " + url  + " " + "</span>")

                  } else {
                        console.log("dead link ", url)
                        // not for final display, just for show user info
                        $("#json-renderer").html("<span style='color:red;'>{Dead link}" + " " + name + " " + org + " " + url  + " " + "</span>")
                        dead_array.push(standard_array[i])
                  }//if


                }//if rest service
                          
            }//if

        


        } catch {

              console.log("dead link ", url)
              $("#json-renderer").html("<span style='color:red;'>{Dead link}" + " " + name + " " + org + " " + url  + " " + "</span>")
              dead_array.push(standard_array[i])
        }//catch

     }//for

      // live + dead = standard array, after remove dead, will only show live array.
      input_current = live_array
      show_current(input_current)
      filter_result_by_filter_by()

  });

//      - -  -  -   end    - -  -  -  remove Dead, Tiles, etc   - -  -  -  




    /**/
    //  - - - download csv  - - - 
    /**/
    $("#download_csv_button").on("click", function() {

     

      if (standard_array){
        var final_csv_string = parse_json_to_csv_string(standard_array)
        saveStringAsFile('standard.csv', final_csv_string)
      }


      if (live_array){
        var final_csv_string = parse_json_to_csv_string(live_array)
        saveStringAsFile('live.csv', final_csv_string)
      }

      if (dead_array){
        var final_csv_string = parse_json_to_csv_string(dead_array)
        saveStringAsFile('dead.csv', final_csv_string)
      }


    });
    /**/
    //  - - -  end  - - -   download csv    - - - 
    /**/



              // click search
            // $('#start_search_button').click(search_layer_now) 


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
    //  --- papaparse   --- 
    /**/
        

   // must async 
   async function csvString2json(_csvString){

    // Parse CSV string
    var csvParsedResult = Papa.parse(_csvString);
    console.log('csvParsedResult', csvParsedResult)


    // must await
    input_current = await convert_rowArray_to_jsonArray(csvParsedResult.data)

    console.log("show input current",  input_current)
            
      // first time load all  
      show_current(input_current)
     

      filter_result_by_filter_by()

   }




    // must wait until csv parse completed at function completeFn
    function csvUrl2json(_csv_link){
      

      stepped = 0;
      rowCount = 0;
      errorCount = 0;
      firstError = undefined;



      console.log('csv file url : ', _csv_link)
      Papa.parse(_csv_link, 

          // config see demo.js https://www.papaparse.com/demo
          {
            //delimiter: ',', // The delimiting character. Usually comma or tab. Default is comma.
            //header: false, // Keys data by field name rather than an array.
            //dynamicTyping: true, // Turns numeric data into numbers and true/false into booleans.
            //skipEmptyLines: true, // By default, empty lines are parsed; check to skip.
            // preview: 100, //If > 0, stops parsing after this many rows.
            // step: stepFn, // not use, only when very large file
            // encoding: 'UTF-8', // Only applies when reading local files. Default is specified by the browser (usually UTF-8).
            //worker: false, // Uses a separate thread so the web page doesn't lock up.
            // comments: '',  // If specified, skips lines starting with this string.
            complete: csv_to_json_ready,
            error: errorFn,
            download: true,
          }
        )


    }

    function csv_to_json_ready(results)
    {
      end = now();

      if (results && results.errors)
      {
        if (results.errors)
        {
          errorCount = results.errors.length;
          firstError = results.errors[0];
        }
        if (results.data && results.data.length > 0)
          rowCount = results.data.length;
      }

      printStats("Parse complete");
      
      input_current = convert_rowArray_to_jsonArray(results.data)
            
      // first time load all  
      show_current(input_current)
     

      filter_result_by_filter_by()
          
      

    }
                      
     
   // return empty string or serial number 
   function get_serial_no_from_url(_sample_url){

    // for https://utility.arcgis.com/usrsvcs/servers/b5a55d5911b246e2ab88fcc14d304f1f/rest/services
    var re_32 = /\/[a-zA-Z0-9]{32}\/rest\/services/i


    // for W7M7ugHEl8tg1wcM/ArcGIS/rest/services, "W7M7ugHEl8tg1wcM" will be used, 16 dig length
    // ArcGIS/rest or arcgis/rest, use i for case-insensitive
    var re_16 = /\/[a-zA-Z0-9]{16}\/arcgis\/rest\/services/i
    
    var _serial_16_start_position = _sample_url.search(re_16) + 1
    var _serial_16_end_position = _serial_16_start_position + 16
    var _serial_32_start_position = _sample_url.search(re_32) + 1
    var _serial_32_end_position = _serial_32_start_position + 32
    
    
    var _serial_number = ""
    if (_serial_16_start_position > 1){
      _serial_number = _sample_url.substring(_serial_16_start_position, _serial_16_end_position)
    } else if (_serial_32_start_position > 1){
      _serial_number = _sample_url.substring(_serial_32_start_position, _serial_32_end_position)
    }

    return _serial_number
    
   }


   // return empty string if instance is arcgis, otherwise, return non-arcgis custom instance name
   function get_instance_from_url(_sample_url){

    // for /wetlandsmapservice/rest/services, "wetlandsmapservice" will be used, 
          var re_any = /\/[^\/]*\/rest\/services/
          var _any_start_position = _sample_url.search(re_any) + 1
          var _any_end_position = _sample_url.indexOf("/rest/services")
          var _any_instance = ""
          if ((_any_start_position > 1) && (_any_end_position > 1)){
             _any_instance = _sample_url.substring(_any_start_position, _any_end_position)
             // ignore arcgis
             if (_any_instance.toLowerCase() == 'arcgis'){
              _any_instance = ""
             }
          }

          return _any_instance
   }







                          var inputType = "string";
                          var stepped = 0, rowCount = 0, errorCount = 0, firstError;
                          var start, end;
                          var firstRun = true;
                          var maxUnparseLength = 10000;
                  



                          
          
                  // must wait until csv parse completed at function completeFn
                  function parse_json_to_csv_string(_csv_ready_json){


                      
          
                      //  . . . papaparse  . . . demo . . .  https://www.papaparse.com/demo
          
                      stepped = 0;
                      rowCount = 0;
                      errorCount = 0;
                      firstError = undefined;
          

                      start = now();
                      var csv_string = Papa.unparse(_csv_ready_json, 
                     
                          // config see demo.js https://www.papaparse.com/demo
                          {
                            delimiter: ',', // The delimiting character. Usually comma or tab. Default is comma.
                            header: true, // Keys data by field name rather than an array.
                            dynamicTyping: true, // Turns numeric data into numbers and true/false into booleans.
                            //skipEmptyLines: true, // By default, empty lines are parsed; check to skip.
                            // preview: 100, //If > 0, stops parsing after this many rows.
                            // step: stepFn, // not use, only when very large file
                            // encoding: 'UTF-8', // Only applies when reading local files. Default is specified by the browser (usually UTF-8).
                            //worker: false, // Uses a separate thread so the web page doesn't lock up.
                            // comments: '',  // If specified, skips lines starting with this string.
                            complete: completeFn,
                            error: errorFn,
                            //download: true,
                          }
                        )

                        end = now();


                     // do not limit length   
                     // if (csv_string.length > maxUnparseLength){
                     //     csv_string = csv_string.substr(0, maxUnparseLength);
                     //      console.log("(Results truncated for brevity)");
                     // }
                  
                      console.log('final csv string ', csv_string);


                      return csv_string
                      
                      // . . . end  . . . papaparse  . . . 
          
                  }
           
                    function completeFn(results)
                    {
                      end = now();
          
                      if (results && results.errors)
                      {
                        if (results.errors)
                        {
                          errorCount = results.errors.length;
                          firstError = results.errors[0];
                        }
                        if (results.data && results.data.length > 0)
                          rowCount = results.data.length;
                      }
          
                      printStats("Parse complete",  results);

                     
                      
          
                    }

                        
                          function stepFn(results, parser)
                                  {
                                    stepped++;
                                    if (results)
                                    {
                                      if (results.data)
                                        rowCount += results.data.length;
                                      if (results.errors)
                                      {
                                        errorCount += results.errors.length;
                                        firstError = firstError || results.errors[0];
                                      }
                                    }
                                  }
                  
                  
                            function errorFn(err, file)
                            {
                              end = now();
                            }
                  
                  
                            function now()
                            {
                              return typeof window.performance !== 'undefined'
                                  ? window.performance.now()
                                  : 0;
                            }
                  
                  
                  
                            function printStats(msg)
                            {
                              if (msg)
                                console.log(msg);
                              console.log("       Time:", (end-start || "(Unknown; your browser does not support the Performance API)"), "ms");
                              console.log("  Row count:", rowCount);
                              if (stepped)
                                console.log("    Stepped:", stepped);
                              console.log("     Errors:", errorCount);
                              if (errorCount)
                                console.log("First error:", firstError);
                            }
                  
                  
                  /**/
                  //  --- end  ---  papaparse    --- 
                  /**/
                  
                    
                    
                    
                    
                    



      
    //------------------- zip.js -----------------------------------
    //https://stackoverflow.com/questions/57878862/how-to-include-huge-javascript-js-file-in-html/57878911#57878911
    function stream_zip_by_url(_zipURL){

          zip.workerScriptsPath = "../js/lib/zipjs/";
          //https://github.com/gildas-lormeau/zip.js/issues/93
          zip.createReader(

            new zip.HttpReader(_zipURL), 

            function(zipReader){                                       
                zipReader.getEntries(function(entries){
                    if (entries.length) {
                      // get first entry content as text
                      entries[0].getData(
                          new zip.TextWriter(), 
                          
                          function(text) {
                                                    
                            csvString2json(text)

                            // close the zip reader
                            zipReader.close(function() {
                              // onclose callback
                            });

                          }, 
                    
                          function(current, total) {
                            // onprogress callback
                            
                              // console.log('current-', current)
                              //  console.log('total-', total)
                      });// e n tries
                    }//if
                });//z i p r e a d e r
            }, 
            

            function(zipreader_error) {
              // onerror callback
              console.log('zipreader_error --->',zipreader_error)
            }
          
          );
      
      
      
    }
    //------------------- End ---------------  zip.js -----------------------------------
      
      


    var sn
    async function getJsonArrayByUrl(_jsonArrayURL){


     

      // serial number
      sn = urlParams.get('sn'); 
      if (sn){
        _jsonArrayURL += "?sn=" + sn
      }


       
       input_current = await ajax_getjson_common(_jsonArrayURL);

       __total_item_count = input_current.length


       if (input_current[input_current.length-1].url){
        // last url not empty, means full access, hide load sample button
        $("#refresh_button").hide()
       } else {

       }
            
      // first time load all  
      show_current(input_current)
     

      filter_result_by_filter_by()



    }
             
                  