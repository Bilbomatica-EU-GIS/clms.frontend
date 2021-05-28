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