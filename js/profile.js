$(document).ready(function() {
  updateUserDatas();
});

function updateUserDatas() {
  var user = sessionStorage.getItem("user");
  if (user != null) { // Logged in, show dropdown and change "Iniciar sesión" to username
    $("#nombre").attr("placeholder", JSON.parse(user).NAMES);
	$("#apellido").attr("placeholder", JSON.parse(user).LASTNAMES);
    $("#n_usuario").attr("placeholder", JSON.parse(user).USERNAME);
	$("#correo").attr("placeholder", JSON.parse(user).EMAIL);
	$("#carrera").attr("placeholder", JSON.parse(user).CAREER);
  } else { // Not logged in, disable dropdown by removing the data-toggle="dropdown" attr
    $("a#userDropdown span").text("Iniciar sesión");
    $("a#userDropdown").removeAttr("data-toggle");
    $("a#userDropdown").removeAttr("aria-expanded");
    $("a#userDropdown").attr("href", "login.html");
  }
}
