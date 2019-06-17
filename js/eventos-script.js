$(document).ready(function() {
  var user = sessionStorage.getItem("user");
  if (user != null) {
    user = JSON.parse(user);
  } else {
    $("section#mis-eventos ul").hide(); // Hide "Mis eventos" from document
    $("section#mis-eventos").append("<div class='alert alert-warning' role='alert'>¡Inicie sesión para ver su lista de eventos!</div>");
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
        console.log(e);
        $("h4", card).text(events[e][0]);
        $("p", card).text(events[e][1]);
        $("small", card).text(events[e][3]);
        $("div#all_events ul").append(card);
      }
    }
  });
});
