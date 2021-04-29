$(document).ready(function(){
  // Open login modal
  $(document).on('click','.header-login-link, .login-block-button', function() {
    $("#login_modal").fadeIn();
    document.body.style.overflow = "hidden";
  });

  // Open language modal
  $(".ccl-header-lang").click(function(){
    $("#language_modal").fadeIn();
    document.body.style.overflow = "hidden";
  });

  $(document).on('click','.language-item:not(.language-item-selected)', function() {
    document.querySelector(".header-lang-code").innerHTML = this.firstElementChild.getAttribute("lang-code");
    document.querySelector(".header-lang-text span").innerHTML = this.firstElementChild.textContent;
    $(this).parents(".modal").fadeOut();
    document.body.removeAttribute("style");
    document.querySelector(".language-item-selected").classList.toggle("language-item-selected");
    this.classList.toggle("language-item-selected");
  })

  // Close modal
  $(".modal-close").click(function(){
    $(this).parents(".modal").fadeOut();
    document.body.removeAttribute("style");
  });

  // Add profile options
  if (sessionStorage.getItem("loged_user") == "true") {
    addProfileOptions();
  }

  // Log in
  $(document).on('click','.modal-login-button', function() {
    sessionStorage.setItem("loged_user",true);
    location.reload();
  });

  // Log out
  $(document).on("click",".header-logout",function(){
    sessionStorage.setItem("loged_user",false);
    location.reload();
  });

  // Change menu icon
  $(".ccl-main-menu-collapse-button").click(function(){
    this.querySelector("span").classList.toggle('ccl-icon-close');
  })

  // Redirect to search page
  $(".ccl-header-search button").click(function(e){
    e.preventDefault();
    search_val = document.querySelector(".ccl-header-search input").value;
    var root = window.location.pathname.substring(0,window.location.pathname.indexOf('/', window.location.pathname.indexOf('/') + 1));
    window.location.replace(window.location.origin + root + "/search.html" + "?" + search_val);
  });

  // Check newsletter form
  $(".ccl-footer-form").submit(function(){
    $("footer .ccl-feedback-message--error").remove();
    var check_email = true;
    
    var email_val = $(".footer-privacy-input").val().trim();
    if (email_val == "" || email_val == null) {
      $(".ccl-footer-form").after('<div class="ccl-feedback-message--error" role="alert">Email is requiered</div>');
      check_email = false;
    }
    else {
      if (isValidEmail(email_val) == false) {
        $(".ccl-footer-form").after('<div class="ccl-feedback-message--error" role="alert">Enter a valid email</div>');
        check_email = false;
      }
    }

    if ($("#footer_privacy").prop("checked") == false) {
      $("#footer_privacy + label").after('<div class="ccl-feedback-message--error" role="alert">Please accept our policies</div>');
      check_email = false;
    }

    if (check_email == false) {
      return false;
    }
    if (check_email == true) {
      // submit
    }
  })
});

function addProfileOptions () {
  var location = window.location.pathname.substring(0,window.location.pathname.indexOf('/', window.location.pathname.indexOf('/') + 1));
  document.querySelector(".header-login-link").parentElement.remove();
  $(".header-vertical-line").after(
    '<li class="header-dropdown header-logged"><a><i class="fas fa-user"></i>User name<span class="ccl-icon-chevron-thin-down"></span></a>'+
        '<ul>'+
            '<li><a href='+ window.location.origin + location +'/my-profile/personal-data.html>My settings</a></li>'+
            '<li><a href='+ window.location.origin + location +'/cart.html>Cart</a></li>'+
            '<li><a href='+ window.location.origin + location +'/downloads.html>Downloads</a></li>'+
            '<li class="header-logout"><a>Logout</a></li>'+
        '</ul>'+
    '</li>'+
    '<li><a href='+ window.location.origin + location +'/cart.html aria-label="Cart"><i class="fas fa-shopping-cart"></i></a></li>'
  );
}

function isValidEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;
  return regex.test(email);
}