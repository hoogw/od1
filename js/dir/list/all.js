          


    // any source csv will fit into only 3 column, 
    // name, org, url  
    
    
var name, org, url;
var _url_candidate
var _name_candidate
var _org_candidate

var _serial_number
var _any_instance
var _domain_candidate

var urlObject


var start_position
var urlExistsOrNot_customDomain
var urlExistsOrNot_serialNo
var urlExistsOrNot
var this_element

    // only for all.csv
    function convert_rowArray_to_jsonArray(row_array){

      console.log("before convert raw row_array", row_array)

      for (let i = 1; i < row_array.length; i++) {
       // must reset to empty for each loop
        name = ""
        org = "" 
        url = ""
        _url_candidate = ""
        _name_candidate = ""
        _org_candidate = ""
      
        _serial_number = ""
        _any_instance = ""
        _domain_candidate = ""
        urlObject = ""

        start_position = ""
        urlExistsOrNot_customDomain = ""
        urlExistsOrNot_serialNo = ""
        // must reset to empty for each loop

         _url_candidate = row_array[i][2]
        // never to lower case, because it will mess up 16 serial number
        //if (_url_candidate){ _url_candidate = _url_candidate.toLowerCase()}
        
        _name_candidate = row_array[i][0]
        
        
        // skip tile.arcgis.com
        if (_url_candidate 
           && _url_candidate.includes("/rest/services") 
           && !(_url_candidate.includes("tiles.arcgis.com"))  // do not handle tiles, so exclude them
           && !(_url_candidate.includes("utility.arcgis.com"))  // these kind have 32 char serial number, always not working, so exclude them
        ){
          
          start_position = _url_candidate.indexOf("/rest/services")
          url = _url_candidate.substring(0,start_position) + "/rest/services"
          urlExistsOrNot_customDomain = custom_domain_array.some(item => item["url"] == url); 
          urlExistsOrNot_serialNo = arcgis_domain_serialNo_array.some(item => item["url"] == url); 
          if ((urlExistsOrNot_customDomain) || (urlExistsOrNot_serialNo)){
            // exist, skip, nothing to do
          } else {
                    // not exist, add new

                    if (_name_candidate){
                      name = _name_candidate
                    } else {
                      name = "org-name" // url
                    }

                    // fix bug, coeur d'Alene tribe
                    // and other special char should be removed.
                    if (name.includes("'")){
                        name = name.replace("'","`");
                    } else if (name.includes("\\")){
                     //   name = name.replace("\\", "");
                    } else if (name.includes("\/")){
                    //     name = name.replace("\/","");
                    }
                    
                    // get arcgis rest serverice instance name, 
                    _serial_number = get_serial_no_from_url(_url_candidate)
                    // if there is serical number, then do not need instance name
                    if (_serial_number){
                              // 1st priority serial number
                              org = _serial_number
                    } else {

                              // 3rd priority, without special instance name, then use domain
                              try {
                                urlObject = new URL(_url_candidate);
                                _domain_candidate = urlObject.hostname;
                                org = _domain_candidate
                              } catch{

                              }



                              // 2st priority, without serial number, then use instance name
                              _any_instance = get_instance_from_url(_url_candidate)
                              if (_any_instance){
                                      org = _domain_candidate + " - " +_any_instance
                              } else{
                              }
                    }
                    


                    this_element = {
                      "name":name,
                      "org":org,  
                      "url":url
                    }



                    
                    // seperate 
                    if (_serial_number){
                              // 32 serial number do not works, so ignore 32
                              if (_serial_number.length < 17){
                                  arcgis_domain_serialNo_array.push(this_element) 
                              }//if 32
                    } else {
                              custom_domain_array.push(this_element)
                    }//if
            
          }//if
        }//if r e s t / s e r v i c e s


      }//for

     

      standard_array = custom_domain_array.concat(arcgis_domain_serialNo_array)
      __total_item_count = standard_array.length

      // randomly disorder element 
      fisherYatesShuffle(standard_array);


      console.log("after convert standard array", standard_array)
      return standard_array
    }






    
                    (function($){
                               
                                 init_global_var()
                                
                                 
                                
                                 init_ui_event_handler();



                            
                  

                                 // Works, but not use, (directly download .csv file)
                                 //csvUrl2json(sample_csv_url)
                                 // Works, but not use,  (directly download csv.zip file)
                                 //stream_zip_by_url(sample_csv_zip_url)
                                 // in use, (download json array by url)
                                 getJsonArrayByUrl(in_use_json_array_url)
                                 


                                 

                                 
                  })(jQuery);