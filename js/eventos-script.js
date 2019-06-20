$(document).ready(function() {
  var user = sessionStorage.getItem("user");
  if (user != null) {
    user = JSON.parse(user);
  } else {
    $("section#mis-eventos ul").hide(); // Hide "Mis eventos" from document
    $("section#mis-eventos").append("<div class='alert alert-warning' role='alert'>¡Inicie sesión para ver su lista de eventos y guardar eventos!</div>");

    $(".hide-if-not-logged").hide();
  }
});

$(document).ready(function() {
  $.ajax({
    url: "https://fathomless-tor-48974.herokuapp.com/events",
    method: "GET",
    success: function(data, status) {
      var events=data.events;
      for(let e in events){
        var card=$("li#template-event").clone().removeAttr("id");
        card.show();
        
        $("h4 span", card).html(events[e][0]);
        $("p", card).text(events[e][1]);
        $("div>small", card).text(moment(events[e][3]).format('MMMM D YYYY, h:mm A'));
        $(".goto-link", card).attr("href","index.html?towp="+ events[e][2]);
        $("div#all_events ul").append(card);
      }
    }
  });
});
