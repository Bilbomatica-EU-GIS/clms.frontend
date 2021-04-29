$(document).ready(function(){
  var result_number = $(".card-container .card-line").length;
  $(".search-results-total").text(result_number);
  if (result_number > 10) {
    var page_number = Math.floor(result_number / 10);
    var unit = Math.floor(result_number % 10);
    if (unit > 0) {
      page_number = page_number + 1
    }
  }

  if (page_number > 1) {
    $(function(){
      $(".pagination-container").pxpaginate({
        totalPageCount: page_number,
        maxBtnCount: maxbuttonNumber(),
        callback: function(pagenumber){
          $(".card-container .card-line").removeClass("show-line").hide();
          $(".card-container .card-line").slice(pagenumber*10-10, pagenumber*10).show();
          $(".card-container .card-line").slice(pagenumber*10-10, pagenumber*10).last().addClass("hide-line").show();
          $(".search-results-current").text(pagenumber*10-10+1+"-"+pagenumber*10);
          $('html,body').animate({
            scrollTop: $(".card-container .card-line").slice(pagenumber*10-10).offset().top
          }, 'slow');
        }
      });
      $(".card-container .card-line").hide();
      $(".card-container .card-line").slice(0, 10).addClass("show-line").show();
      $(".card-container .card-line").slice(0, 10).last().addClass("hide-line").show();
    });
  }

  function maxbuttonNumber() {
    if (page_number < 5) {
      return page_number-1;
    }
    else {
      return 5;
    }
  }
});