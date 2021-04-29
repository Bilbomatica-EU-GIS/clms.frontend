// Tabs
$(document).on("click",".tab:not(.tab-selected)", function() {
  $(".tab").toggleClass("tab-selected","tab");
  $(".panel").toggleClass("panel-selected","panel");
  
  $('.tab').attr('aria-selected', function(index, attr){
    return attr == "true" ? false : true;
  });
  $('.panel').attr('aria-hidden', function(index, attr){
    return attr == "true" ? false : true;
  });
});