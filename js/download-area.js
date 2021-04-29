$(document).ready(function(){

});

var view;
require([
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/ScaleBar",
  "esri/widgets/BasemapGallery",
  "esri/widgets/Zoom"
], function(Map, MapView, ScaleBar, BasemapGallery, Zoom) {
  var map = new Map({
    basemap: "topo-vector",
    slider: false
  });
  view = new MapView({
    container: "download_area_viewer",
    map: map,
    center: [15,50],
    zoom: 3,
    ui: {
      components: ["attribution"] // removes default widgets except for attribution
   }
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
  
  // Basemap gallery
  var basemap_container = document.createElement('div');
  basemap_container.className = "basemap-gallery-container";
  var basemap_button = document.createElement('div');
  basemap_button.className = "esri-icon-basemap esri-widget--button esri-widget esri-interactive";
  basemap_button.id = "map_basemap_button";
  basemap_button.setAttribute("role","button");
  basemap_button.setAttribute("title","Basemap gallery");
  basemap_button.addEventListener('click', function(evt){
    if (this.classList.contains("esri-icon-basemap")) {
      $(".esri-basemap-gallery").appendTo(".basemap-gallery-container").show();
      $(this).removeClass("esri-icon-basemap").addClass("esri-icon-right-arrow")
    }
    else if (this.classList.contains("esri-icon-right-arrow")) {
      $(".esri-basemap-gallery").hide();
      $(this).removeClass("esri-icon-right-arrow").addClass("esri-icon-basemap")
    }
  });
  basemap_container.appendChild(basemap_button);
  view.ui.add(basemap_container, "top-right");

  const basemapGallery = new BasemapGallery({
    view: view,
  });
  view.ui.add(basemapGallery, "top-right");

  // Print
  var print_button = document.createElement('div');
  print_button.className = "esri-icon-printer esri-widget--button esri-widget esri-interactive";
  print_button.setAttribute("role","button");
  print_button.setAttribute("title","Print");
  print_button.addEventListener('click', function(evt){
    // action
  });
  view.ui.add(print_button, "top-right");

  // Scalebar
  var scaleBar = new ScaleBar({
    view: view,
    unit: "dual"
  });
  view.ui.add(scaleBar, "bottom-left");

  // Loading icon
  view.watch('updating', function(evt){
    if(evt === true){
      document.querySelector(".loading").style.display = 'flex';
    }else{
      document.querySelector(".loading").style.display = 'none';
    }
  })
});