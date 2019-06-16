$(document).ready(function() {
  var user = sessionStorage.getItem("user");
  if (user != null) {
    user = JSON.parse(user);
    $("div#logout").hide(); // Hide "Log in!" message
  } else {
    $("#cuerpo-login").hide(); // Hide contacts list from document
  }
});

$("#close-well").click(function() {
  $("#welcome").slideUp();
  window.localStorage.setItem("showBanner", "no");
});
