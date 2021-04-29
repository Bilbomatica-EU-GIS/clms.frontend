$(document).ready(function(){

});

$(document).on("submit", ".user-form", function() {
  $(".ccl-feedback-message--error").remove();
  $(".user-form input[type='text']").css("border-color","")
  var checked = true;
  
  var user_val = $("#reset_form_user").val().trim();
  if (user_val == "" || user_val == null) {
    $("#reset_form_user").css("border-color","crimson").after('<div class="ccl-feedback-message--error" role="alert">User name is requiered</div>');
    checked = false;
  }
  else {
    // check if user name exists
    // if () {
      // $("#register_form_user").css("border-color","crimson").after('<div class="ccl-feedback-message--error" role="alert">The selected user name already exists, please enter another user name</div>');
      // checked = false;
    // }
    if (user_val.match(/[^A-Za-z0-9]/) != null && user_val.match(/[^A-Za-z0-9]/).length > 0) {
      $("#reset_form_user").css("border-color","crimson").after('<div class="ccl-feedback-message--error" role="alert">Enter a valid user name</div>');
      checked = false;
    }
  }

  if (checked == false) {
    return false;
  }
  if (checked == true) {
    // submit
  }
});

