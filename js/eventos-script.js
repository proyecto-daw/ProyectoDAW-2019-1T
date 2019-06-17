$(document).ready(function() {
  var user = sessionStorage.getItem("user");
  if (user != null) {
    user = JSON.parse(user);
  } else {
    $("section#mis-eventos ul").hide(); // Hide "Mis eventos" from document
    $("section#mis-eventos").append("<div class='alert alert-warning' role='alert'>¡Inicie sesión para ver su lista de eventos,"+ 
    "añadir nuevos eventos a su lista o poder eliminarlos de su lista!\n<small class='text-muted'><a href='login.html'>Iniciar sesion</a></div>");
    $("div#all_events a#p").hide(); //Ocultra los guardar y olvidar en los eventos
    
  }
});
