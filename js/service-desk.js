$(document).ready(function(){

});

$(document).on("submit", ".user-form", function() {
  $(".ccl-feedback-message--error").remove();
  $(".user-form input[type='text']").css("border-color","")
  var checked = true;

  var email_val = $("#contact_form_email").val().trim();
  if (email_val == "" || email_val == null) {
    $("#contact_form_email").css("border-color","crimson").after('<div class="ccl-feedback-message--error" role="alert">Email is requiered</div>');
    checked = false;
  }
  else {
    if (isValidEmail(email_val) == false) {
      $("#contact_form_email").css("border-color","crimson").after('<div class="ccl-feedback-message--error" role="alert">Enter a valid email</div>');
      checked = false;
    }
  }
  
  var subject_val = $("#contact_form_subject").val().trim();
  if (subject_val == "" || subject_val == null) {
    $("#contact_form_subject").css("border-color","crimson").after('<div class="ccl-feedback-message--error" role="alert">Subject is requiered</div>');
    checked = false;
  }

  var message_val = $("#contact_form_message").val().trim();
  if (message_val == "" || message_val == null) {
    $("#contact_form_message").css("border-color","crimson").after('<div class="ccl-feedback-message--error" role="alert">Message is requiered</div>');
    checked = false;
  }

  // Verification code
  var validation_val = $("#contact_form_verification").val().trim()
  if (validation_val == "" || validation_val == null) {
    $("#contact_form_verification").css("border-color","crimson").after('<div class="ccl-feedback-message--error" role="alert">Validation code is requiered</div>');
    checked = false;
  }
  else {
    // check if verification code is correct
    // $("#contact_form_verification").css("border-color","crimson").after('<div class="ccl-feedback-message--error" role="alert">Validation code is not correct</div>');
    // checked = false;
  }

  if (checked == false) {
    $('html, body').animate({
      scrollTop: $(".ccl-feedback-message--error").first().parents(".ccl-form-group").offset().top - 16
    }, 500);
    return false;
  }
  if (checked == true) {
    // submit
  }
});

