/* Boton de cerrar*/
var close=$("#close-well");

/* Card de Bienvenida */
var banner=$("#welcome");

/* Cuerpo de contactos */
var cuerpo = $("#cuerpo-login");

/*if(window.localStorage.getItem("showBanner")=="no"){
    banner.hide();
}*/

close.click(function() {
    banner.slideUp();
	window.localStorage.setItem("showBanner","no");
});

$(document).ready(function(){
   cuerpo.hide();
});

var bell = $("#bell");
var mess = $("#message");
var logout = $("#logout");

bell.click(function() {
    cuerpo.show();
	logout.hide();
});

mess.click(function() {
    cuerpo.hide();
	logout.show();
});