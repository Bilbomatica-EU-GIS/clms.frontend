$(document).ready(function(){
  document.querySelector(".login-block-button").addEventListener("click", function() {
    $("#login_modal").fadeIn();
  });
  if (sessionStorage.getItem("loged_user") == "true") {
    $("#dataset_download_area, #dataset_download_cart").each( function(index, element){
      return $(element).attr("disabled") == "disabled" ? $(this).removeAttr("disabled") : $(this).addAttr("disabled");
    });

    $(".dataset-table tr").each(function(i,element){
      if (i == 0) {
        $(element).prepend(
          '<th class="table-th-checkbox">'+
            '<div class="ccl-form">'+
              '<div class="ccl-form-group">'+
                '<input type="checkbox" id="table_dataset_all" name="tableDataset" value="all" class="ccl-checkbox ccl-form-check-input">'+
                '<label class="ccl-form-check-label" for="table_dataset_all">'+
                '</label>'+
              '</div>'+
            '</div>'+
          '</th>'
        )
      }
      else {
        $(element).prepend(
          '<td class="table-td-checkbox">'+
            '<div class="ccl-form">'+
              '<div class="ccl-form-group">'+
                '<input type="checkbox" id="table_dataset_'+i+'" name="tableDataset" value="'+i+'" class="ccl-checkbox ccl-form-check-input">'+
                '<label class="ccl-form-check-label" for="table_dataset_'+i+'">'+
                '</label>'+
              '</div>'+
            '</div>'+
          '</td>'
        )
      }
    })
  }
})

// All rows checkbox
$(document).on("click",".table-th-checkbox input",function(){
  if ($(this).prop("checked")){
    $(".table-td-checkbox input").prop("checked",true);
  }
  else {
    $(".table-td-checkbox input").prop("checked",false);
  }
});

$(document).on("click",".table-td-checkbox input",function(){
  var all_checked = true;
  $(".table-td-checkbox input").each(function(i, element) {
    if (!element.checked) {
      all_checked = false;
    }
  });
  if ($(this).prop("checked")){
    if (all_checked) {
      $(".table-th-checkbox input").prop("checked",true);
    }
  }
  else {
    if (all_checked == false) {
      $(".table-th-checkbox input").prop("checked",false);
    }
  }
});