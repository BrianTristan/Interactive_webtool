require(["esri/Map",
    "esri/views/MapView",
    "esri/widgets/BasemapGallery",
    "esri/layers/FeatureLayer",
    "esri/widgets/Legend",
    "esri/widgets/LayerList",
    "esri/widgets/Search",
    "esri/tasks/Locator",
    "esri/PopupTemplate",
    "esri/layers/GroupLayer",
    "esri/layers/MapImageLayer",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/widgets/BasemapToggle",
    "esri/tasks/QueryTask",
    "esri/tasks/support/Query",
     "esri/widgets/Locate",
      "esri/widgets/Home",
     "esri/widgets/Expand",
    "dojo/dom",
    "dojo/query",


    //    "esri/layers/support/MapImage",

    "dojo/domReady!"], function (
        Map,
        MapView,
         BasemapGallery,
        FeatureLayer,
        Legend,
        LayerList,
        Search, Locator, PopupTemplate,
        GroupLayer,
        MapImageLayer, SimpleMarkerSymbol,
        BasemapToggle,
        QueryTask,
        Query,
         Locate,
         Home,
         Expand,
        dom,
        query


        //        MapImage
    ) {
        //my code starts here











        var myMap = new Map({



            basemap: "hybrid", opacity: 0.8


        });



        var mapView = new MapView({
            map: myMap,
            center: [-111.830815, 33.274270],
            container: "viewDiv",
            zoom: 13,

        });

        var locateBtn = new Locate({
            view: mapView
        });

        // Add the locate widget to the top left corner of the view
        mapView.ui.add(locateBtn, {
            position: "top-left"
        });


        //Add a home button
        var home = new Home({
            view: mapView
        });

        // Add the home button to the top left corner of the view
        mapView.ui.add(home, "top-left");







        /* START OF POPUPS FOR FEATURE LAYERS
        *************************************************************************************************************************/

        /* Add popups FOR DRINKING FOUNTAINS
        *************************************************************************************************************************/

        var popupFountain = {
            title: "Drinking fountains: {AMENTITY_TYPE}",
            content: [{
                
                type: "fields",
                fieldInfos: [{
                    fieldName: "PARK_NAME",
                    label: "Park Name",
                    visible: true
                }, {
                    fieldName: "NUMBER_OF_FAUCETS",
                    label: "Number of faucets",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
                }, {
                    fieldName: "DOG_FAUCETS",
                    label: "Dog faucets",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
                }]
            }]
        };

        /* Add popups For playgrounds
        *************************************************************************************************************************/


        var popupPlayground = {
            title: "Name  : {PARK_NAME}",
            content: [{
                type: "fields",
                fieldInfos: [{
                    fieldName: "PLAYGROUND_NAME",
                    label: "Playground name",
                    visible: true
                }, {
                    fieldName: "PLAYGROUND_DESC",
                    label: "Playground Description",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
                }, {
                    fieldName: "PLAYGROUND_TYPE",
                    label: "Playground type",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
            
                }]
            }]
        };
        /* Add popups for structures
        *************************************************************************************************************************/

        var popupStructure = {
            title: "Park name   : {PARK_NAME}",
            content:  [{
                type: "fields",
                fieldInfos: [{
                    fieldName: "STRUCTURE_DESC",
                    label: "Structure Description",
                    visible: true
                }, {
                    fieldName: "STRUCTURE_TYPE",
                    label: "Structure type",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
                }, {
                    fieldName: "STRUCTURE_NAME",
                    label: "Structure name",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
            
                }]
            }]
        };

        /* Add popups for walking trails
        *************************************************************************************************************************/

        var popupWalking = {
            title: "Walking Path",
            content:  [{
                type: "fields",
                fieldInfos: [{
                    fieldName: "DISTANCE",
                    label: "Length",
                    visible: true
          
            
                }]
            }]
        };
       

        /* Add popups for parking lots
        *************************************************************************************************************************/

        var popupParking = {
            title: "Parking lot",
            content:  [{
                type: "fields",
                fieldInfos: [{
                    fieldName: "PARK_NAME",
                    label: "Park name",
                    visible: true,
                }, {
                    fieldName: "Shape__Area",
                    label: "Area(Ft)",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
          
            
                }]
            }]
        };

        /* Add popups for lakes
        *************************************************************************************************************************/

        var popuplakes = {
            title: "Amenitiy description: {AMENTITY_DESC}",
            content: [{
                type: "fields",
                fieldInfos: [{
                    fieldName: "AMENTITY_TYPE",
                    label: "Amentity Type",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
                    
                    

                }]
            }]
        };
           
        /* Add popups for courts
        *************************************************************************************************************************/

        var popupCourts = {
            title: "Courts",
            content: [{
                type: "fields",
                fieldInfos: [{
                    fieldName: "PARK_NAME",
                    label: "Park name",
                    visible: true
                }, 
                {
                    fieldName: "COURT_TYPE",
                    label: "Court type",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }

                }]
            }]
        };
            
        /* Add popups for fields
        *************************************************************************************************************************/

        var popupFields = {
            title: "Ball field",
            content: [{
            type: "fields",
            fieldInfos: [{
                fieldName: "PARK_NAME",
                label: "Park name",
                visible: true
            }, 
            {
                fieldName: "AMENTITY_TYPE",
                label: "Court type",
                visible: true,
                format: {
                    digitSeparator: true,
                    places: 0
                }

            }]
    }]
        };

        /* Add popups for main park poly
        *************************************************************************************************************************/

        var popupPark = {
            title: "{MAPTITLE}",
            content: [{

            
                type: "fields",
                fieldInfos: [{
                    fieldName: "PARK_TYPE",
                    label: "Park Type",
                    visible: true
                }, {
                    fieldName: "ADDRESS",
                    label: "Address",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
                }, {
                    fieldName: "ACREAGE",
                    label: "Acres ",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
                }, {
                    fieldName: "DRINKING_FOUNTAIN",
                    label: "Drinking fountains",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
                }, {
                    fieldName: "SPRAY_PAD ",
                    label: "Spray pads",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
                }, {
                    fieldName: "WALKING_TRAILS ",
                    label: "Walking trials",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
                },
                   {
                       fieldName: "PLAYGROUNDS",
                       label: "Playgrounds",
                       visible:true,
                       format:{
                           digitSeparator: true,
                           places: 0

                       }
                   },
                   {
                       fieldName: "BASKETBALL_COURTS",
                       label: "Basketball courts",
                       visible:true,
                       format:{
                           digitSeparator: true,
                           places: 0

                       }
                   },
                   {
                       fieldName: "BIKE_PATH",
                       label: "Bike park",
                       visible:true,
                       format:{
                           digitSeparator: true,
                           places: 0

                       }
                   },
                   {
                       fieldName: "HORSESHOE_PIT",
                       label: "Horse shoe pit",
                       visible:true,
                       format:{
                           digitSeparator: true,
                           places: 0
           

                       }
                   },
                   {
                       fieldName: "RACQUET_BALL",
                       label: "Racquet ball",
                       visible:true,
                       format:{
                           digitSeparator: true,
                           places: 0
           

                       }
                   },
                   {
                       fieldName: "SAND_VOLLEYBALL",
                       label: "Sand volleyball court",
                       visible:true,
                       format:{
                           digitSeparator: true,
                           places: 0
           

                       }
                   },
                   {
                       fieldName: "SKATE_PARK",
                       label: "Skate park",
                       visible:true,
                       format:{
                           digitSeparator: true,
                           places: 0
                       }
                   },
                   {
                       fieldName: "TENNIS_COURT",
                       label: "Tennis court",
                       visible:true,
                       format:{
                           digitSeparator: true,
                           places: 0
           

                       }
                   },
                   {
                       fieldName: "BALL_FIELD",
                       label: "Ball field",
                       visible:true,
                       format:{
                           digitSeparator: true,
                           places: 0
           

                       }
                   },
                   {
                       fieldName: "RC_AIRPLANE_BOX",
                       label: "RC airplane box",
                       visible:true,
                       format:{
                           digitSeparator: true,
                           places: 0
           

                       }
                   },
                   {
                       fieldName: "SOCCER_FIELD",
                       label: "Soccer field",
                       visible:true,
                       format:{
                           digitSeparator: true,
                           places: 0
           

                       }
                   },
                   {
                       fieldName: "DOG_PARK",
                       label: "Dog park",
                       visible:true,
                       format:{
                           digitSeparator: true,
                           places: 0
           

                       }
                   },
                   {
                       fieldName: "ARCHERY_RANGE",
                       label: "Archery range",
                       visible:true,
                       format:{
                           digitSeparator: true,
                           places: 0
           

                       }
                   },
                   {
                       fieldName: "CRICKET_FIELD",
                       label: "Criket field",
                       visible:true,
                       format:{
                           digitSeparator: true,
                           places: 0
           

                       }
                   },
                   {
                       fieldName: "DISC_GOLF",
                       label: "Disc golf",
                       visible:true,
                       format:{
                           digitSeparator: true,
                           places: 0
           

                       }
                   },
                   {
                       fieldName: "CONCESSION_STAND",
                       label: "Concession stand",
                       visible:true,
                       format:{
                           digitSeparator: true,
                           places: 0
           

                       }
                   },
                   {
                       fieldName: "OBSERVATION_TOWER",
                       label: "Observation tower",
                       visible:true,
                       format:{
                           digitSeparator: true,
                           places: 0
           

                       }
                   },
                   {
                       fieldName: "RAMADA",
                       label: "Ramada",
                       visible:true,
                       format:{
                           digitSeparator: true,
                           places: 0
           

                       }
                   },
                   {
                       fieldName: "RESTROOM",
                       label: "Restroom",
                       visible:true,
                       format:{
                           digitSeparator: true,
                           places: 0
           

                       }
                   }]
            }]
               };
        
        
       

        /* END of POPUPS FOR FEATURE LAYERS
        *************************************************************************************************************************/

        var parkPolyCount = 0;

        /*START FEATURE SERVICE LAYERS
        *************************************************************************************************************************/


        var featureServiceURl = "https://services3.arcgis.com/0OPQIK59PJJqLK0A/arcgis/rest/services/COC_PARK_PROJECT/FeatureServer/";


        var parkPoly = new FeatureLayer({
            url: featureServiceURl + "8",
            id: "Park Poly",
            popupTemplate: popupPark

        });
        myMap.add(parkPoly);

        mapView.whenLayerView(parkPoly).then(function (layerView) {
            layerView.watch("updating", function (val) {
                if (!val) {  // wait for the layer view to finish updating
                    layerView.queryFeatures().then(function (results) {

                        parkPolyCount = results.length;
                        dom.byId("parkPolyCount").innerHTML = " Total Park Polys : " + parkPolyCount;

                    });
                }
            });
        });


        var fields = new FeatureLayer({
            url: featureServiceURl + "7",
            id: "Fields",
            popupTemplate: popupFields
        });
        myMap.add(fields);


        var courts = new FeatureLayer({
            url: featureServiceURl + "6",
            popupTemplate: popupCourts
        });
        myMap.add(courts);

        var lakes = new FeatureLayer({
            url: featureServiceURl + "5",
            popupTemplate: popuplakes
        });
        myMap.add(lakes);

        var parkingPoly = new FeatureLayer({
            url: featureServiceURl + "4",
            popupTemplate: popupParking
        });
        myMap.add(parkingPoly);

        var walkingPath = new FeatureLayer({
            url: featureServiceURl + "3",
            popupTemplate: popupWalking
        });
        myMap.add(walkingPath);

        var structurePnt = new FeatureLayer({
            url: featureServiceURl + "2",
            popupTemplate: popupStructure
        });
        myMap.add(structurePnt);

        var playGround = new FeatureLayer({
            url: featureServiceURl + "1",
            popupTemplate: popupPlayground
        });
        myMap.add(playGround);

        var drinkingFountain = new FeatureLayer({
            url: featureServiceURl + "0",
            popupTemplate: popupFountain
        });
        myMap.add(drinkingFountain);
       
        /* END FEATURE SERVICE LAYERS
        *************************************************************************************************************************/



        //Query Task Trial  ******************************************************************************************************************************












        /* Add A LEGEND TO THE MAP
        *************************************************************************************************************************/



        var legend = new Legend({
            view: mapView,
            layerInfos: [
                { layer: drinkingFountain, title: 'Drinking Fountians' },
                { layer: playGround, title: 'Play Grounds' },
                { layer: structurePnt, title: 'Structures' },
                { layer: walkingPath, title: 'Walking Path' },
                { layer: lakes, title: 'Lakes' },
                { layer: parkingPoly, title: 'Parking Area' },
                { layer: courts, title: 'Courts' },
                { layer: fields, title: 'Fields' },
                { layer: parkPoly, title: 'Parks' }]
        });
        mapView.ui.add(legend, "bottom-left");


        /* ADD LAYER LIST TO THE MAP
         *************************************************************************************************************************/

        var layerList = new LayerList({
            view: mapView,
            //listMode: "hide-children",
            listItemCreatedFunction: function (event) {
                var item = event.item;

                var prefix = "COLLECTOR CODING -";
                var tempStr = item.title;
                item.title = tempStr.substring(19, item.title.length);
                console.log(item.title);
                /*
                if (item.title === " NEW CS PARK POLY") {
                    item.title = "NEW CS PARK POLY";
                }
                */

            }
        });
        

        // Adds widget below other elements in the top left corner of the view
        mapView.ui.add(layerList, {
            position: "bottom-right"
        });




        /* ADD SEARCH WIDGET TO THE MAP
           *************************************************************************************************************************/


        var searchWidget = new Search({
            view: mapView,
            sources: [{
                locator: new Locator({ url: "//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer" }),
                singleLineFieldName: "SingleLine",
                name: "Custom Geocoding Service",
                localSearchOptions: {
                    minScale: 300000,
                    distance: 50000
                },
                placeholder: "Search Geocoder",
                maxResults: 15,
                maxSuggestions: 20,
                suggestionsEnabled: false,
                minSuggestCharacters: 0
            }, {
                featureLayer: parkPoly,
                searchFields: ["MAPTITLE"],
                displayField: "MAPTITLE",
                exactMatch: false,
                outFields: ["*"],
                name: "My Custom Search",
                placeholder: "example: TUMBLEWEED",
                maxResults: 15,
                maxSuggestions: 20,
                suggestionsEnabled: true,
                minSuggestCharacters: 0,
                //          zoomScale:0.5
                //  Our zoome scale did not work as we liked it too
            }]
        });
        // Adds the search widget below other elements in
        // the top left corner of the view
        mapView.ui.add(searchWidget, {
            position: "top-left",
            index: 2
        });


        /* ADD BASEMAP GALLERY TO THE MAP WITH EXPAND OPTION
         *************************************************************************************************************************/

        // its container to a div element

        var basemapGallery = new BasemapGallery({
            view: mapView,
            container: document.createElement("div")
        });

        // Create an Expand instance and set the content
        // property to the DOM node of the basemap gallery widget
        // Use an Esri icon font to represent the content inside
        // of the Expand widget

        var bgExpand = new Expand({
            view: mapView,
            content: basemapGallery
        });

        // Add the expand instance to the ui

        mapView.ui.add(bgExpand, "top-right");



        /* MY CODE ENDS HERE
        *************************************************************************************************************************/

    });
