



      var in_use_json_array_url = "https://arcgis-online.com/php/all.php"     


      
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






function show_current(_current_showing) {
    display_count_info('', _current_showing.length, __total_item_count, 'counter_label')
    standard_json_to_html(_current_showing)
    highlight_keywords()
}

 

    
  function init_ui_event_handler_for_list_only(){



    //  -  -  -  style change  -  -  - 

        // first time , one time only, when page load, get url parameter, and set radio button checked
          style = urlParams.get('style') || 'mobile';

          console.log('style from url parameter', style)

          if (style){
            var radio = document.querySelector(
                `input[name="panel-style"][value="${style}"]`
            );
            if (radio) {
                radio.checked = true;
            }
          }

          // when user click radio button, change style, and update url parameter, but not refresh page
          document.querySelectorAll('input[name="panel-style"]').forEach(function(radio) {
              radio.addEventListener('change', function(event) {

                // will refresh page, not good, 
                // window.location.href = '?style=' + encodeURIComponent(this.value);
                 
                style = this.value;
                event.preventDefault();
                var url___ = new URL(window.location.href);
                url___.searchParams.set('style', this.value);
                history.pushState({}, '', url___);

                console.log('style changed to', style)

                 
              });
          });
          
        //  -  -  - end  -  -  -  style change   -  -  - 


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
                      
   
   
/*
   // return empty string or serial number 
   function get_serial_no_from_url(_sample_url){

      // only for tiles sample  https://tiles.arcgis.com/tiles/ohAFyIFvXFRGcC67/arcgis/rest/services
      if (_sample_url.includes("tiles.arcgis.com/")){



        return  _sample_url.split("tiles.arcgis.com/tiles/")[1].split("/")[0];
      } 

      if (_sample_url.includes(".arcgis.com/")){
        return  _sample_url.split(".arcgis.com/")[1].split("/")[0];
      } 
        
      return ""
   }

   */


   // return empty string or serial number 
   function get_serial_no_from_url(_sample_url) {
    try {
        const url = new URL(_sample_url);
        const hostname = url.hostname.toLowerCase();
        const pathname = url.pathname;

        // 1. ArcGIS tile services
        // https://tiles.arcgis.com/tiles/ohAFyIFvXFRGcC67/arcgis/rest/services
        if (hostname === "tiles.arcgis.com") {
            const match = pathname.match(/^\/tiles\/([^/]+)/);
            return match ? match[1] : "";
        }

        // 2. ArcGIS Online hosted services
        // https://services1.arcgis.com/ABC123/arcgis/rest/services
        // https://services-eu1.arcgis.com/XYZ789/arcgis/rest/services
        if (/^services(?:-[a-z0-9]+)?\d*\.arcgis\.com$/.test(hostname)) {
            const match = pathname.match(/^\/([^/]+)/);
            return match ? match[1] : "";
        }

        // 3. Other ArcGIS Online URLs are not organization IDs
        return "";

    } catch (error) {
        // Invalid URL
        return "";
    }
}


   function get_service_no_from_url(_sample_url){
    if (_sample_url.includes(".arcgis.com/")){
      return  _sample_url.match(/:\/\/(.*?)\.arcgis\.com/)[1];
    } else {
      return ""
    }
   }


   
   function get_domain_name_from_url(_sample_url){

    try {
      return new URL(_sample_url).hostname;
    } catch (error) {
      console.error('Invalid URL:', _sample_url);
      return '';
    }
    
   }


   function get_instance_name_from_url(_sample_url){
    // both work
    return _sample_url.split("/rest/services")[0].split("/").pop();
    // both work
    //return _sample_url.match(/\/([^\/]+)\/rest\/services/)[1];
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


       
       input_current = await ajax_getjson_common_custom_timeout(_jsonArrayURL, 99999);

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
             
                  