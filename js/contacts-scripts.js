var user;

$(document).ready(function() {
  user = sessionStorage.getItem("user");
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

$(document).ready(function() {
  $.notify.defaults({
    className: "success"
  });
  $.ajax({
    url: "https://fathomless-tor-48974.herokuapp.com/get_friends_groups",
    method: "POST",
    data: {
      "username": user.EMAIL,
      "password": user.PASSWORD
    },
    success: function(data, status) {
      let friends = data.friends;
      for (let f of friends) {
        console.log(f);
        var card = $("#friend-template").clone().removeAttr("id");
        card.show();
        $(".text-primary", card).text(f.NAMES + " " + f.LASTNAMES);
        $("a", card).click(function() {
          searchFor(f.EMAIL)
        });

        $("#collapseCardFriends div").append(card);
      }
    }
  });
});

function searchFor(email) {
  $.ajax({
    url: "https://fathomless-tor-48974.herokuapp.com/ask_position",
    method: "POST",
    data: {
      "username": user.EMAIL,
      "password": user.PASSWORD,
      "friend_email": email
    },
    success: function() {
      $.notify("Se ha enviado una solicitud de posición a " + email + ".\nVe a la página de inicio para recibirla.");
    }
  });
}
