$(document).ready(function(){

});

$(document).on("submit", ".user-form", function() {
  $(".ccl-feedback-message--error").remove();
  $(".user-form input[type='text']").css("border-color","")
  var checked = true;
  
  var user_val = $("#register_form_user").val().trim();
  if (user_val == "" || user_val == null) {
    $("#register_form_user").css("border-color","crimson").after('<div class="ccl-feedback-message--error" role="alert">User name is requiered</div>');
    checked = false;
  }
  else {
    // check if user name exists
    // if () {
      // $("#register_form_user").css("border-color","crimson").after('<div class="ccl-feedback-message--error" role="alert">The selected user name already exists, please enter another user name</div>');
      // checked = false;
    // }
    if (user_val.match(/[^A-Za-z0-9]/) != null && user_val.match(/[^A-Za-z0-9]/).length > 0) {
      $("#register_form_user").css("border-color","crimson").after('<div class="ccl-feedback-message--error" role="alert">Enter a valid user name</div>');
      checked = false;
    }
  }

  var email_val = $("#register_form_email").val().trim();
  if (email_val == "" || email_val == null) {
    $("#register_form_email").css("border-color","crimson").after('<div class="ccl-feedback-message--error" role="alert">Email is requiered</div>');
    checked = false;
  }
  else {
    if (isValidEmail(email_val) == false) {
      $("#register_form_email").css("border-color","crimson").after('<div class="ccl-feedback-message--error" role="alert">Enter a valid email</div>');
      checked = false;
    }
  }

  var name_val = $("#register_form_name").val().trim();
  if (name_val == "" || name_val == null) {
    $("#register_form_name").css("border-color","crimson").after('<div class="ccl-feedback-message--error" role="alert">Name is requiered</div>');
    checked = false;
  }

  var family_val = $("#register_form_family").val().trim();
  if (family_val == "" || family_val == null) {
    $("#register_form_family").css("border-color","crimson").after('<div class="ccl-feedback-message--error" role="alert">Family name is requiered</div>');
    checked = false;
  }

  var professional_val;
  professional_val = jQuery.map( $("input[name='registerProfessional']:checked"), function( input ) {
    return input.value;
  });
  if (professional_val == "" || professional_val == null) {
    $("input[name='registerProfessional']").parents(".ccl-fieldset").find(".label-required").after('<div class="ccl-feedback-message--error" role="alert">Select at least one professional thematic domain</div>');
    checked = false;
  }

  var institutional_val = $("input[name='registerInstitutional']:checked").val();
  if (institutional_val == "" ||institutional_val == null) {
    $("input[name='registerInstitutional']").parents(".ccl-fieldset").find(".label-required").after('<div class="ccl-feedback-message--error" role="alert">Select an institutional domain</div>');
    checked = false;
  }

  // Verification code
  var validation_val = $("#register_form_verification").val().trim()
  if (validation_val == "" || validation_val == null) {
    $("#register_form_verification").css("border-color","crimson").after('<div class="ccl-feedback-message--error" role="alert">Validation code is requiered</div>');
    checked = false;
  }
  else {
    // check if verification code is correct
    // $("#register_form_verification").css("border-color","crimson").after('<div class="ccl-feedback-message--error" role="alert">Validation code is not correct</div>');
    // checked = false;
  }

  if ($("#register_privacy").prop("checked") == false) {
    $("#register_privacy + label").after('<div class="ccl-feedback-message--error" role="alert">Please accept our policies</div>');
    checked = false;
  }

  if (checked == false) {
    $('html, body').animate({
      scrollTop: $(".ccl-feedback-message--error").first().parents(".ccl-form-group").offset().top - 16
    }, 1000);
    return false;
  }
  if (checked == true) {
    // submit
  }
});

