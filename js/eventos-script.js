$(document).ready(function() {
  var user = sessionStorage.getItem("user");
  if (user != null) {
    user = JSON.parse(user);
  } else {
    $("section#mis-eventos ul").hide(); // Hide "Mis eventos" from document
    $("section#mis-eventos").append("<div class='alert alert-warning' role='alert'>¡Inicie sesión para ver su lista de eventos!</div>");
  }
});
