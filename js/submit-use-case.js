$(document).ready(function(){
  $(".ccl-select-items div").first().addClass("select-option-placeholder");

  document.getElementById("file_upload_input").onchange = function() {
    document.querySelector(".file-upload-selected").value = this.value.replace(/C:\\fakepath\\/i, '');
  };
});

$(document).on("submit", ".user-form", function() {
  $(".ccl-feedback-message--error").remove();
  $(".user-form input[type='text']").css("border-color","")
  var checked = true;
  
  var organisation_val = $("#usecase_form_organisation").val().trim();
  if (organisation_val == "" || organisation_val == null) {
    $("#usecase_form_organisation").css("border-color","crimson").after('<div class="ccl-feedback-message--error" role="alert">Organisation is requiered</div>');
    checked = false;
  }

  var topic_val = $("#usecase_form_topic").val().trim();
  if (topic_val == "" || topic_val == null) {
    $("#usecase_form_topic").css("border-color","crimson").after('<div class="ccl-feedback-message--error" role="alert">Topic/product is requiered</div>');
    checked = false;
  }

  // Select
  var product_select = $(".multiple-select-list").children();
  if (product_select.length == 0) {
    $("#usecase_form_product_select").parent().find(".ccl-select-items").css("border-color","crimson").after('<div class="ccl-feedback-message--error" role="alert">Select at least one CLMS product</div>');
    checked = false;
  }

  var title_val = $("#usecase_form_title").val().trim();
  if (title_val == "" || title_val == null) {
    $("#usecase_form_title").css("border-color","crimson").after('<div class="ccl-feedback-message--error" role="alert">Use case title is requiered</div>');
    checked = false;
  }

  var description_val = $("#usecase_form_description").val().trim();
  if (description_val == "" || description_val == null) {
    $("#usecase_form_description").css("border-color","crimson").after('<div class="ccl-feedback-message--error" role="alert">Use case description is requiered</div>');
    checked = false;
  }

  if (checked == false) {
    $("html, body").animate({
      scrollTop: $(".ccl-feedback-message--error").first().parents(".ccl-form-group").offset().top - 16
    }, 1000);
    return false;
  }
  if (checked == true) {
    // submit
  }
});

$(document).on("click",".multiple-select ~ .ccl-select-items div", function() {
  var opt_val = $("#usecase_form_product_select").find(".ccl-same-as-selected").val();
  var opt_text = $("#usecase_form_product_select").find(".ccl-same-as-selected").text();
  $(".multiple-select-list").append('<div class="multiple-select-list-item" data-value="' + opt_val + '" data-text="'+opt_text+'"><span>' + opt_text + '</span><span class="ccl-icon-close" aria-label="Close"></span></div>');
  $(this).addClass("select-hidden-option").attr("aria-hidden",true);
  $(".ccl-select-selected").text($(".ccl-select option[value='']").text());
});

$(document).on("click",".multiple-select-list-item .ccl-icon-close", function() {
  var opt_val = $(this).parent().attr("data-val")
  var opt_text = $(this).parent().attr("data-text");
  $(".ccl-select-items").find("div:contains('" + opt_text + "')").removeAttr("class aria-hidden");
  $(this).parent().remove();
});