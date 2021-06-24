$(document).ready(function(){
    // Add profile options
    if (sessionStorage.getItem("loged_user") == "true") {
      addProfileOptions();
    }
    
  });
  var view;
  require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/ScaleBar",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Zoom",
    "esri/widgets/Measurement",
    "esri/widgets/Legend",
    "esri/layers/WMSLayer",
    "esri/Graphic",
    "esri/geometry/Extent",
    "esri/widgets/TimeSlider",
    "esri/layers/FeatureLayer"
  ], function(Map, MapView, ScaleBar, BasemapGallery, Zoom, Measurement, Legend, WMSLayer, Graphic, Extent, TimeSlider, FeatureLayer) {
    var map = new Map({
      basemap: "topo-vector",
      slider: false
    });
    
    view = new MapView({
      container: "map_viewer",
      map: map,
      center: [15,50],
      zoom: 3,
      ui: {
        components: ["attribution"]
     }
    });
  
    view.watch(["stationary"], function() {
      showCoordinates(view.center);
    });
  
    //*** Add event to show mouse coordinates on click and move ***//
    view.on(["pointer-down","pointer-move"], function(evt) {
      showCoordinates(view.toMap({ x: evt.x, y: evt.y }));
    });
    this.view.constraints = {
      minZoom: 3
    };
    var zoom = new Zoom({
      view: view
    });
    view.ui.add(zoom, {
      position: "top-right"
    });
  
    //*** Basemap gallery ***//
    var basemap_container = document.createElement('div');
    basemap_container.className = "basemap-gallery-container";
    var basemap_button = document.createElement('div');
    basemap_button.className = "esri-icon-basemap esri-widget--button esri-widget esri-interactive";
    basemap_button.setAttribute("role","button");
    basemap_button.setAttribute("title","Basemap gallery");
    basemap_button.addEventListener('click', function(evt){
      if (this.classList.contains("esri-icon-basemap")) {
        closeWidgets();
        basemap_container.appendChild(document.querySelector(".esri-basemap-gallery"));
        document.querySelector(".esri-basemap-gallery").style.display = "block";
        this.classList.remove("esri-icon-basemap");
        this.classList.add("esri-icon-right-arrow");
      }
      else if (this.classList.contains("esri-icon-right-arrow")) {
        document.querySelector(".esri-basemap-gallery").style.display = "none";
        this.classList.remove("esri-icon-right-arrow");
        this.classList.add("esri-icon-basemap");
      }
    });
    basemap_container.appendChild(basemap_button);
    view.ui.add(basemap_container, "top-right");
  
    const basemapGallery = new BasemapGallery({
      view: view,
    });
    view.ui.add(basemapGallery, "top-right");
  
    //*** Legend ***//
    var legend_container = document.createElement('div');
    legend_container.className = "legend-container";
    view.ui.add(legend_container, "top-right");
  
    var legend_button = document.createElement('div');
    legend_button.className = "esri-icon-legend esri-widget--button esri-widget esri-interactive";
    legend_button.setAttribute("role","button");
    legend_button.setAttribute("title","Legend");
    legend_button.addEventListener('click', function(evt){
      if (this.classList.contains("esri-icon-legend")) {
        closeWidgets();
        legend_panel.style.display = "block";
        this.classList.remove("esri-icon-legend");
        this.classList.add("esri-icon-right-arrow");
      }
      else if (this.classList.contains("esri-icon-right-arrow")) {
        legend_panel.style.display = "none"
        this.classList.remove("esri-icon-right-arrow");
        this.classList.add("esri-icon-legend");
      }
    });
    legend_container.appendChild(legend_button);
  
    var legend_panel = document.createElement('div');
    legend_container.appendChild(legend_panel);
  
    var legend = new Legend({
      view: view,
      container: legend_panel,
      // layerInfos: [
      //   {
      //     layer: layer,
      //     //title: "Coastal Zones 2012"
      //   }
      // ]
    });
  
    //*** Coastal Zones legend test ***//
    // const layer2 = new WMSLayer({
    //   url: "https://image.discomap.eea.europa.eu/arcgis/services/CoastalZones/CZ_CoastalZones_2012/MapServer/WmsServer?",
    //   // sublayers: [
    //   //   {              name:"Coastal_Zones_2012_raster55645"
    //   //   },
    //   //   {              name:"Coastal_Zones_2012_vector53031"
    //   //   }
    //   // ]
    // });
    // map.add(layer2);
    
    //*** Time slider test ***//
    // const layer3 = new WMSLayer({
    //   url: "https://image.discomap.eea.europa.eu/arcgis/services/CoastalZones/CZ_CoastalZones_2012/MapServer/WmsServer?",
    //   // sublayers: [
    //   //   {              name:"sen2rgb"
    //   //   }
    //   // ]
    // });
    // map.add(layer3);
    // //*** Time slider ***//
    // const timeSlider = new TimeSlider({
    //   container: "timeSlider",
    //   view: view,
    //   timeVisible: true,
    //   mode: "instant",
    //   loop: false
    // });
    // view.ui.add(timeSlider, "bottom-right");
    // view.whenLayerView(layer3).then(function (lv) {
    //   //console.log(layer3.timeInfo);
    //   // Se asigna el fullTimeExtent de la layer al timeslider, sin alterarlo
    //   timeSlider.fullTimeExtent = layer3.timeInfo.fullTimeExtent;
    // });
  
    //*** Activate a single widget each time ***//
    function closeWidgets() {
      $.each($( ".esri-icon-right-arrow" ), function( i, widget ) {
        $(widget).trigger( "click" );
      })
    }
  
    //*** Measure ***//
    var measure_container = document.createElement('div');
    measure_container.className = "measure-container";
    view.ui.add(measure_container, "top-right");
  
    var measure_button = document.createElement('div');
    measure_button.className = "esri-icon-measure esri-widget--button esri-widget esri-interactive";
    measure_button.setAttribute("role","button");
    measure_button.setAttribute("title","Measure");
    measure_button.addEventListener('click', function(evt){
      if (this.classList.contains("esri-icon-measure")) {
        closeWidgets();
        measure_panel.style.display = "flex";
        measure_buttons.style.display = "flex";
        this.classList.remove("esri-icon-measure");
        this.classList.add("esri-icon-right-arrow");
        areaMeasurement();
      }
      else if (this.classList.contains("esri-icon-right-arrow")) {
        measure_panel.style.display = "none";
        this.classList.remove("esri-icon-right-arrow");
        this.classList.add("esri-icon-measure");
        clearCoords();
        clearMeasurements();
      }
    });
    measure_container.appendChild(measure_button);
  
    var measure_panel = document.createElement('div');
    measure_container.appendChild(measure_panel);
  
    var measure_buttons = document.createElement('div');
    measure_buttons.className = "measure-buttons";
    measure_panel.appendChild(measure_buttons);
    
    var measure_area_button = document.createElement('div');
    measure_area_button.className = "esri-icon-measure-area esri-widget--button esri-widget esri-interactive active";
    measure_area_button.addEventListener("click", function(){
      clearCoords();
      areaMeasurement();
    });
    measure_buttons.appendChild(measure_area_button); 
  
    var measure_line_button = document.createElement('div');
    measure_line_button.className = "esri-icon-measure-line esri-widget--button esri-widget esri-interactive";
    measure_line_button.addEventListener("click", function(){
      clearCoords();
      distanceMeasurement();
    });
    measure_buttons.appendChild(measure_line_button);
  
    var measure_coords_button = document.createElement('div');
    measure_coords_button.className = "esri-icon-map-pin esri-widget--button esri-widget esri-interactive";
    measure_coords_button.addEventListener("click", function(){
      measure_coords_results.style.display = "block";
      measure_coords_button.classList.add("active");
      document.querySelector(".esri-view-surface").style.cursor = "crosshair";
      clearMeasurements()
    });
    measure_buttons.appendChild(measure_coords_button);
  
    var measure_coords_results = document.createElement('div');
    measure_coords_results.className = "measure-coords-results";
    measure_panel.appendChild(measure_coords_results);
  
    function showCoordinates(pt) {
      var coords = "<b>Lat/Lon:</b> " + pt.latitude.toFixed(3) + " " + pt.longitude.toFixed(3);
      measure_coords_results.innerHTML = coords;
    }
  
    function clearCoords() {
      measure_coords_results.style.display = "none";
      measure_coords_button.classList.remove("active");
      document.querySelector(".esri-view-surface").removeAttribute("style");
    }
  
    const measurement = new Measurement({
      view: view,
      container: measure_panel,
      //activeTool: "area"
    });
  
    function distanceMeasurement() {
      measurement.activeTool = "distance";
      measure_line_button.classList.add("active");
      measure_area_button.classList.remove("active");
    }
  
    function areaMeasurement() {
      measurement.activeTool = "area";
      measure_line_button.classList.remove("active");
      measure_area_button.classList.add("active");
    }
  
    function clearMeasurements() {
      measure_area_button.classList.remove("active");
      measure_line_button.classList.remove("active");
      measurement.clear();
    }
  
    //*** Print ***//
    var print_button = document.createElement('div');
    print_button.className = "esri-icon-printer esri-widget--button esri-widget esri-interactive";
    print_button.setAttribute("role","button");
    print_button.setAttribute("title","Print");
    print_button.addEventListener('click', function(evt){
      // action
    });
    view.ui.add(print_button, "top-right");
    
    //*** Area selection ***//
    var area_container = document.createElement('div');
    area_container.className = "area-container";
    view.ui.add(area_container, "top-right");
  
    var area_button = document.createElement('div');
    area_button.className = "esri-icon-cursor-marquee esri-widget--button esri-widget esri-interactive";
    area_button.setAttribute("role","button");
    area_button.setAttribute("title","Select area");
    area_button.addEventListener('click', function(evt){
      if (this.classList.contains("esri-icon-cursor-marquee")) {
        closeWidgets();
        area_panel.style.display = "block";
        this.classList.remove("esri-icon-cursor-marquee");
        this.classList.add("esri-icon-right-arrow");
        // Download for loged users
        if (sessionStorage.getItem("loged_user") == "false") {
          document.querySelector(".map-login-block").style.display = "block";
          document.querySelector(".map-area-block").style.display = "none";
        }
        if (sessionStorage.getItem("loged_user") == "true") {
          document.querySelector(".map-login-block").style.display = "none";
          document.querySelector(".map-area-block").style.display = "block";
        }
      }
      else if (this.classList.contains("esri-icon-right-arrow")) {
        area_panel.style.display = "none";
        this.classList.remove("esri-icon-right-arrow");
        this.classList.add("esri-icon-cursor-marquee");
      }
    });
    area_container.appendChild(area_button);
  
    var area_panel = document.createElement('div');
    area_panel.className = "area-panel";
    area_container.appendChild(area_panel);
    var area_string =
      '<div class="ccl-form">'+
        '<fieldset class="ccl-fieldset">'+
          '<div class="map-download-header">'+
            '<legend class="ccl-form-legend">'+
              '<span class="map-download-header-title">Select area</span>'+
              '<span class="info-icon" tooltip="Info" direction="up">'+
                '<i class="fas fa-info-circle"></i>'+
              '</span>'+
            '</legend>'+
          '</div>'+
          '<div class="ccl-form-group">'+
            '<input type="radio" id="download_area_select_nuts0" name="downloadAreaSelect" value="nuts0" class="ccl-checkbox cl-required ccl-form-check-input" checked="">'+
            '<label class="ccl-form-radio-label" for="download_area_select_nuts0">'+
              '<span>NUTS 0</span>'+
            '</label>'+
          '</div>'+
          '<div class="ccl-form-group">'+
            '<input type="radio" id="download_area_select_nuts1" name="downloadAreaSelect" value="nuts1" class="ccl-checkbox ccl-required ccl-form-check-input">'+
            '<label class="ccl-form-radio-label" for="download_area_select_nuts1">'+
              '<span>NUTS 1</span>'+
            '</label>'+
          '</div>'+
          '<div class="ccl-form-group">'+
            '<input type="radio" id="download_area_select_nuts3" name="downloadAreaSelect" value="nuts3" class="ccl-radio ccl-required ccl-form-check-input">'+
            '<label class="ccl-form-radio-label" for="download_area_select_nuts3">'+
              '<span>NUTS 3</span>'+
            '</label>'+
          '</div>'+
          '<div class="ccl-form-group">'+
            '<input type="radio" id="download_area_select_rectangle" name="downloadAreaSelect" value="area" class="ccl-radio ccl-required ccl-form-check-input">'+
            '<label class="ccl-form-radio-label" for="download_area_select_rectangle">'+
              '<span>By rectangle</span>'+
              '<div>(Mantain the left button of the mouse clicked and draw a rectangle in the map)</div>'+
            '</label>'+
          '</div>'+
        '</fieldset>'+
      '</div>';
    area_panel.innerHTML = area_string;
  
    //*** Menu ***//
    var menu_container = document.createElement('div');
    menu_container.className = "map-left-menu-container"
    var menu_button = document.createElement('div');
    menu_button.className = "esri-icon-drag-horizontal esri-widget--button esri-widget esri-interactive";
    menu_container.innerHTML =
      '<div class="map-menu tab-container">'+
        '<div class="tabs" role="tablist">'+
          '<span class="tab tab-selected" id="products_label" role= "tab" aria-controls="products_panel" aria-selected="true">Products and datasets</span>'+
          '<span class="tab" id="active_label" role= "tab" aria-controls="active_panel" aria-selected="false">Active on map</span>'+
        '</div>'+
        '<div class="panels">'+
          '<div class="panel panel-selected" id="products_panel" role="tabpanel" aria-hidden="false"></div>'+
          '<div class="panel" id="active_panel" role="tabpanel" aria-hidden="true">'+
            '<div class="map-active-layers"></div>'+
            '<div class="map-download-datasets">'+
              '<div class="map-login-block">'+
                '<div class="login-content">'+
                  '<button class="ccl-button ccl-button--default login-block-button">Login to download the data</button>'+
                  '<p class="login-block-new">New user? <a href="../register.html">Follow this link to register</a></p>'+
                '</div>'+
              '</div>'+
              '<div class="map-area-block">'+
                '<button class="ccl-button ccl-button-green">Add to cart</button>'+
                '<div class="message-block">'+
                  '<div class="message-icon">'+
                    '<i class="far fa-comment-alt"></i>'+
                  '</div>'+
                  '<div class="message-text">'+
                    '<p>This is a warning related to the funcionality of start downloading the datasets</p>'+
                    '<ul>'+
                      '<li>May be can include a link to somewhere</li>'+
                      '<li>Or an informative text</li>'+
                    '</ul>'+
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>';
    menu_button.addEventListener('click', function(evt){
      if (this.classList.contains("esri-icon-drag-horizontal")) {
        $(".map-menu").show();
        $(this).removeClass("esri-icon-drag-horizontal").addClass("esri-icon-left-arrow");
      }
      else if (this.classList.contains("esri-icon-left-arrow")) {
        $(".map-menu").hide();
        $(this).removeClass("esri-icon-left-arrow").addClass("esri-icon-drag-horizontal");
      }
    });
    menu_container.appendChild(menu_button);
    view.ui.add(menu_container, "top-left");
    loadTestProducts();
    
    //*** Scalebar ***//
    var scaleBar = new ScaleBar({
      view: view,
      unit: "dual"
    });
    view.ui.add(scaleBar, "bottom-left");
  
    //*** Loading icon ***//
    view.watch('updating', function(evt){
      if (evt === true && document.querySelector(".measure-container .esri-widget--button").classList.contains('esri-icon-right-arrow')==false){
        document.querySelector(".loading").style.display = 'flex';
      }
      else {
        document.querySelector(".loading").style.display = 'none';
      }
    })
  
    $(document).on("change",".map-product-checkbox input", function(){
      var datasets = $(this).parents(".map-menu-components-container").find(".map-menu-dataset");
      if (this.checked) {
        datasets.find(".map-dataset-checkbox input[type=checkbox]").prop("checked",true);
        datasets.each(function( i, dataset ) {
          mapAddDatasets(dataset);
        });
      }
      else {
        datasets.find(".map-dataset-checkbox input[type=checkbox]").prop("checked",false);
        datasets.each(function( i, dataset ) {
          mapRemoveDatasets(dataset);
        });
      }
    });
  
    $(document).on ("change",'.map-dataset-checkbox input', function(){
      var product_checkbox = $(this).parents(".map-menu-product-dropdown").find(".map-product-checkbox input[type=checkbox]");
      var dataset = $(this).parents(".map-menu-dataset");
  
      if (this.checked) {
        mapAddDatasets(dataset);
        if ($(this).parents(".map-menu-components-container").find(".map-dataset-checkbox input[type=checkbox]:checked").length == $(this).parents(".map-menu-components-container").find(".map-dataset-checkbox input[type=checkbox]").length) {
          product_checkbox.prop("checked",true);
        }
      }
      else {
        mapRemoveDatasets(dataset);
        product_checkbox.prop("checked",false);
      }
    });
  
    $(document).on ("change",'.map-menu-layer input', function(){
      var product_checkbox = $(this).parents(".map-menu-product-dropdown").find(".map-product-checkbox input[type=checkbox]");
      var dataset_checkbox = $(this).parents(".map-menu-dataset").find(".map-dataset-checkbox input[type=checkbox]");
      var layer = $(this).parents(".map-menu-layer")[0];
      
      if (this.checked) {
        mapAddLayers(layer);
        if ($(this).parents(".map-menu-dataset").find(".map-menu-layer input[type=checkbox]:checked").length == $(this).parents(".map-menu-dataset").find(".map-menu-layer input[type=checkbox]").length) {
          dataset_checkbox.prop("checked",true);
          if ($(this).parents(".map-menu-components-container").find(".map-dataset-checkbox input[type=checkbox]:checked").length == $(this).parents(".map-menu-components-container").find(".map-dataset-checkbox input[type=checkbox]").length) {
            product_checkbox.prop("checked",true);
          }
        }
      }
      else {
        mapRemoveLayers(layer);
        product_checkbox.prop("checked",false);
        dataset_checkbox.prop("checked",false);
      }
    });
      
    function mapAddDatasets(dataset) {
      $(dataset).find(".map-menu-layer input[type=checkbox]").prop("checked",true);
      var layers = $(dataset).find(".map-menu-layer");
      $.each(layers, function( i, layer ) {
        var active_layers = jQuery.map( $(".active-layer"), function( layer ) {
          return layer.id.replace("active_","");
        });
        if (!active_layers.includes(layer.id)) {
          mapAddLayers(layer)
        }
      })
    };
  
    function mapAddLayers(layer) {
      $(".map-active-layers").prepend(
        '<div class="active-layer" id="active_'+ layer.id +'">'+
          '<div class="active-layer-name" name="'+ $(layer).find(".map-layer-name").val() +'">'+ $(layer).find("label").text() +'</div>'+
          '<div class="active-layer-options">'+
            '<span class="active-layer-position">'+
              '<span class="active-layer-position-up"><i class="fas fa-long-arrow-alt-up"></i></span>'+
              '<span class="active-layer-position-down"><i class="fas fa-long-arrow-alt-down"></i></span>'+
            '</span>'+
            '<span class="active-layer-hide"><i class="fas fa-eye"></i></span>'+
            '<span class="active-layer-delete"><i class="fas fa-times"></i></span>'+
          '</div>'+
        '</div>'
      );
      var id = layer.id.replace("layer_",'');
      var url = $(layer).parents(".map-menu-dataset").find(".map-dataset-url").val();
      var popupTrailheads = {
        title: "A",
        content:
          "<b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft"
      };
      var layer = new WMSLayer({
        url: url,
        id: id,
        sublayers: [
          {
            name: $(layer).find(".map-layer-name").val(),
            visible: true,
            title: "Streamline",
          }
        ],
        popupTemplate: popupTrailheads
      });
      map.add(layer)
    }
  
    function mapRemoveDatasets(dataset) {
      $(dataset).find(".map-menu-layer input[type=checkbox]").prop("checked",false);
      var layers = $(dataset).find(".map-menu-layer");
      $.each(layers, function( i, layer ) {
        mapRemoveLayers(layer)
      })
    }
  
    function mapRemoveLayers(layer) {
      var id = layer.id.replace("layer_","");
      $("#active_"+layer.id).remove();
      map.remove(map.findLayerById(id));
    }
  
    function loadTestProducts () {
      //*** Load components ***//
      $.getJSON( "json/config.json", function( data ) {
        var component_index = 1;
        $.each( data.Components, function( i, component ) {
          $("#products_panel").append(
            '<div class="map-menu-dropdown" id="component_'+ component_index +'">'+
              '<div class="ccl-expandable__button" aria-expanded="false">'+ component.ComponentTitle +'</div>'+
              '<div class="map-menu-components-container">'+
              '</div>'+
            '</div>'
          );
    
          //*** Load products ***//
          var product_index = 1;
          $.each( component.Products, function( i, product ) {
            $("#component_"+component_index+" .map-menu-components-container").append(
              '<div class="map-menu-product-dropdown" id="product_'+ component_index +'_'+ product_index +'">'+
                '<fieldset class="ccl-fieldset">'+
                  '<div class="ccl-expandable__button" aria-expanded="false">'+
                    '<div class="ccl-form map-product-checkbox">'+
                      '<div class="ccl-form-group">'+
                        '<input type="checkbox" id="map_product_'+ component_index +'_'+ product_index +'" name="" value="" class="ccl-checkbox ccl-required ccl-form-check-input">'+
                        '<label class="ccl-form-check-label" for="map_product_'+ component_index +'_'+ product_index +'"><legend class="ccl-form-legend">'+ product.ProductTitle +'</legend></label>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                  '<div class="ccl-form map-menu-products-container">'+
                  '</div>'+
                '</fieldset>'+
              '</div>'
            );
    
            //*** Load datasets ***//
            var dataset_index = 1;
            $.each( product.Datasets, function( i, dataset ) {
              $("#product_"+ component_index +'_'+ product_index +" .map-menu-products-container").append(
                '<div class="ccl-form-group map-menu-dataset" id="dataset_'+ component_index +'_'+ product_index +'_'+ dataset_index +'">'+
                  '<div class="map-dataset-checkbox">'+
                      '<input type="hidden" class="map-dataset-url" value='+ dataset.ViewService +'>'+
                      '<input type="checkbox" id="map_dataset_'+ component_index +'_'+ product_index +'_'+ dataset_index +'" name="" value="name" class="ccl-checkbox ccl-required ccl-form-check-input">'+
                      '<label class="ccl-form-check-label" for="map_dataset_'+ component_index +'_'+ product_index +'_'+ dataset_index +'">'+
                        '<span>'+ dataset.DatasetTitle +'</span>'+
                      '</label>'+
                    '<div class="map-menu-icons">'+
                      '<a href="./dataset-catalogue/dataset-info.html" class="map-menu-icon" aria-label="Dataset info"><i class="fas fa-info-circle"></i></a><a href="./dataset-catalogue/dataset-download.html" class="map-menu-icon" aria-label="Dataset download"><i class="fas fa-download"></i></a>'+
                    '</div>'+
                  '</div>'+
                  '<div class="ccl-form map-menu-layers-container">'+
                  '</div>'+
                '</div>'
              );
  
              //*** Load layers ***//
              var layer_index = 1;
              $.each( dataset.Layer, function( i, layer ) {
                $("#dataset_"+ component_index +'_'+ product_index +'_'+ dataset_index +" .map-menu-layers-container").append(
                  '<div class="ccl-form-group map-menu-layer" id="layer_'+ component_index +'_'+ product_index +'_'+ dataset_index +'_'+ layer_index +'">'+
                    '<input type="hidden" class="map-layer-name" value='+ layer.LayerId +'>'+
                    '<input type="checkbox" id="map_layer_'+ component_index +'_'+ product_index +'_'+ dataset_index +'_'+ layer_index +'" name="" value="name" class="ccl-checkbox ccl-required ccl-form-check-input">'+
                    '<label class="ccl-form-check-label" for="map_layer_'+ component_index +'_'+ product_index +'_'+ dataset_index +'_'+ layer_index +'">'+
                      '<span>'+ layer.Title +'</span>'+
                    '</label>'+
                  '</div>'
                  );
                layer_index++;
              });
              dataset_index++;
            });
            product_index++;
          });
          component_index++;
        });
      });
    };
    
    //*** For programatically created dropdowns ***//
    $(document).on ("click",'.ccl-expandable__button', function(){
      $(this).attr('aria-expanded', function(index, attr){
        return attr == 'true' ? 'false' : 'true';
      });
    })
    
    //*** Tabs ***//
    $(document).on("click",".tab:not(.tab-selected)", function() {
      $(".tab").toggleClass("tab-selected","tab")
      $(".panel").toggleClass("panel-selected","panel")
    
      $('.tab').attr('aria-selected', function(index, attr){
        return attr == "true" ? false : true;
      });
      $('.panel').attr('aria-hidden', function(index, attr){
        return attr == "true" ? false : true;
      });
    });
    
    $(document).on("click",".active-layer-options i", function(){
      var layer = $(this).parents(".active-layer");
      var layer_id = $(layer).attr("id").replace("active_layer_","");
      if ($(this).hasClass("fa-long-arrow-alt-up")) {
        var index = $(".map-active-layers .active-layer").length-$(".map-active-layers .active-layer").index(layer)-1;
        map.reorder(map.findLayerById(layer_id), index + 1)
        layer.prev().before(layer);
      }
      if (this.classList.contains("fa-long-arrow-alt-down")) {
        var index = $(".map-active-layers .active-layer").length-$(".map-active-layers .active-layer").index(layer)-1;
        map.reorder(map.findLayerById(layer_id), index - 1)
        layer.next().after(layer);
      }
      if (this.classList.contains("fa-eye")) {
        if (this.classList.contains("fa-eye-slash")) {
          $(this).removeClass("fa-eye-slash");
          // show layer
          map.findLayerById(layer_id).visible = true;
        }
        else {
          $(this).addClass("fa-eye-slash");
          // hide layer
          map.findLayerById(layer_id).visible = false;
        }
      }
      if (this.classList.contains("fa-times")) {
        $("#map_layer_"+layer_id).prop("checked",false);
        layer.remove();
        map.remove(map.findLayerById(layer_id));
        var dataset_id = layer_id.substring(0,layer_id.lastIndexOf("_"));
        if ($("#map_dataset_"+dataset_id).prop("checked")) {
          $("#map_dataset_"+dataset_id).prop("checked",false);
          var product_id = dataset_id.substring(0,dataset_id.lastIndexOf("_"));
          if ($("#map_product_"+product_id).prop("checked")) {
            $("#map_product_"+product_id).prop("checked",false);
          }
        }
      }
    });
  
    //*** Download ***//
    $(document).on("change",".area-panel input[type=radio]", function(){
      switch (this.value) {
        case "nuts0":
          // load nuts service
          break;
        case "nuts1":
          // load nuts service
          break;
        case "nuts3":
          // load nuts service
          break;
        case "area":
          // Create a symbol for rendering the graphic
          var fillSymbol = {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: [255,255,255,0.5],
            outline: { // autocasts as new SimpleLineSymbol()
              color: [0, 0, 0],
              width: 1
            }
          };
          
          let extentGraphic = null;
          let origin = null;
          view.on('drag', e => {
            e.stopPropagation();
            if (e.action === 'start'){
              if (extentGraphic) view.graphics.remove(extentGraphic)
              origin = view.toMap(e);
            } else if (e.action === 'update'){
              if (extentGraphic) view.graphics.remove(extentGraphic)
              let p = view.toMap(e); 
              extentGraphic = new Graphic({
                geometry: new Extent({
                  xmin: Math.min(p.x, origin.x),
                  xmax: Math.max(p.x, origin.x),
                  ymin: Math.min(p.y, origin.y),
                  ymax: Math.max(p.y, origin.y),
                  spatialReference: { wkid: 102100 }
                }),
                symbol: fillSymbol
              })
              
              view.graphics.add(extentGraphic)
            }
          });
          break;
      }
    });
  });