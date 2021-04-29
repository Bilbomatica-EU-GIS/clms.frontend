$(document).ready(function(){
  // All rows checkbox
  $(".table-th-checkbox input").click(function(){
    if ($(this).prop("checked")){
      $(".table-td-checkbox input").prop("checked",true);
      // check datasets warnings
      $(".table-td-warning").eq(1).removeClass("hidden-warning");
    }
    else {
      $(".table-td-checkbox input").prop("checked",false);
      $(".table-td-warning").addClass("hidden-warning");
    }
  });

  // Single row checkbox
  $(".table-td-checkbox input").click(function(){
    var all_checked = true;
    $(".table-td-checkbox input").each(function(i, element) {
      if (!element.checked) {
        all_checked = false;
      }
    });
    if ($(this).prop("checked")){
      // check datasets warnings
      $(this).parents("tr").find(".table-td-warning").removeClass("hidden-warning");
      if (all_checked) {
        $(".table-th-checkbox input").prop("checked",true);
      }
    }
    else {
      $(this).parents("tr").find(".table-td-warning").addClass("hidden-warning");
      if (all_checked == false) {
        $(".table-th-checkbox input").prop("checked",false);
      }
    }
  });
});