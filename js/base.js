$(document).ready(function() {
  updateUserDropdown();

  // Callback for "Cerrar sesión" in modal
  $(".modal .btn-primary").click(function() {
    $(".modal").modal("hide");
    sessionStorage.removeItem("user");
    location.reload(); // Force reload page to restyle login button
  });
});

// Check if current user is logged in, style login button accordingly
function updateUserDropdown() {
  var user = sessionStorage.getItem("user");
  if (user != null) { // Logged in, show dropdown and change "Iniciar sesión" to username
    $("a#userDropdown span").text(JSON.parse(user).USERNAME);
    $("a#userDropdown").attr("href", "#");
  } else { // Not logged in, disable dropdown by removing the data-toggle="dropdown" attr
    $("a#userDropdown span").text("Iniciar sesión");
    $("a#userDropdown").removeAttr("data-toggle");
    $("a#userDropdown").removeAttr("aria-expanded");
    $("a#userDropdown").attr("href", "login.html");
  }
}
