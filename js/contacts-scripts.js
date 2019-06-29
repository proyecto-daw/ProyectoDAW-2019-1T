var app;
var user;

$(document).ready(function() {
  user = sessionStorage.getItem("user");
  if (user != null) {
    user = JSON.parse(user);
    getMyFriends();
  }

  if (localStorage.getItem("showBannerContacts")) {
    $("#welcome").hide();
  }

  $.notify.defaults({
    className: "success"
  });

  app = new Vue({
    el: '#content',
    data: {
      results: [],
      searched: false,
      friends: []
    },
    computed: {
      loggedIn: function() {
        return user != null;
      },
      anyResults: function() {
        return this.results.length > 0;
      },
      anyFriends: function() {
        return this.friends.length > 0;
      }
    },
    methods: {
      closeWell: function() {
        $("#welcome").slideUp();
        window.localStorage.setItem("showBannerContacts", "no");
      },
      locate: function(email) {
        locate(email);
      },
      filterTextA: function() {
        this.filterText($("input#filterTextA").val());
      },
      filterTextB: function() {
        this.filterText($("input#filterTextB").val());
      },
      filterText: function(text) {
        if (text == "") {
          this.results = [];
          return;
        }

        $.ajax({
          url: "https://fathomless-tor-48974.herokuapp.com/search_people",
          method: "POST",
          data: {
            "username": user.EMAIL,
            "password": user.PASSWORD,
            "query": text
          },
          success: function(data, status) {
            app.results = data.found;
          }
        });
      },
      makeFriend(u) {
        $.ajax({
          url: "https://fathomless-tor-48974.herokuapp.com/add_friend",
          method: "POST",
          data: {
            "username": user.EMAIL,
            "password": user.PASSWORD,
            "friend": u.EMAIL
          },
          success: function(data, status) {
            app.friends.push(u);
            app.$delete(app.results, app.results.indexOf(u));
          }
        });
      }
    }
  });

  $("#close-well").click(function() {
    $("#welcome").slideUp();
    window.localStorage.setItem("showBannerContacts", "no");
  });
  if (localStorage.getItem("showBannerContacts")) {
    $("#welcome").hide();
  }
});



function getMyFriends() {
  $.ajax({
    url: "https://fathomless-tor-48974.herokuapp.com/get_friends_groups",
    method: "POST",
    data: {
      "username": user.EMAIL,
      "password": user.PASSWORD
    },
    success: function(data, status) {
      app.friends = data.friends;
    }
  });
}

function locate(email) {
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
