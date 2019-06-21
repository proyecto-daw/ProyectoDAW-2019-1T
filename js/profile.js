var user;

$(document).ready(function() {
  updateUserData();
});

function updateUserData() {
  user = sessionStorage.getItem("user");

  if (user == null) {
    window.location.href = "index.html"
  }

  user = JSON.parse(user); // Logged in, show dropdown and change "Iniciar sesión" to username
  $("#nombre").attr("placeholder", user.NAMES);
  $("#apellido").attr("placeholder", user.LASTNAMES);
  $("#n_usuario").attr("placeholder", user.USERNAME);
  $("#correo").attr("placeholder", user.EMAIL);
  $("#carrera").attr("placeholder", user.CAREER);

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
        $("div#no-friends-alert").hide();
        var card = $("#friend-template").clone().removeAttr("id");
        card.show();
        $(".text-primary", card).text(f.NAMES + " " + f.LASTNAMES);
        $("a.search-friend", card).click(function() {
          searchFor(f.EMAIL)
        });
        $("a.unfriend", card).click(function() {
          unfriend(f.EMAIL)
        });

        $("#collapseCardFriends>.card-body").append(card);
      }

      let groups = data.groups;
      for (let g of groups) {
        $("div#no-groups-alert").hide();
        var card = $("#group-template").clone().removeAttr("id");
        card.show();
        $(".text-primary", card).text(g.NOMBRE);
        $("a", card).attr("html", $("a", card).attr("html") + g.ID);

        $("#collapseCardGroups div").append(card);
      }
    }
  });
}

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

function unfriend(email) {
  $.ajax({
    url: "https://fathomless-tor-48974.herokuapp.com/remove_friend",
    method: "POST",
    data: {
      "username": user.EMAIL,
      "password": user.PASSWORD,
      "no_longer_friend": email
    },
    success: function() {
      location.reload();
    }
  });
}
