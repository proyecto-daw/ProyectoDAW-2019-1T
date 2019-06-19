var USERS = {};

$(document).ready(function() {
  var user = sessionStorage.getItem("user");
  if (user != null) {
    user = JSON.parse(user);
  } else {
    return;
  }

  $.ajax({
    url: "https://fathomless-tor-48974.herokuapp.com/api_admin/view_users",
    method: "POST",
    data: {
      "username": user.EMAIL,
      "password": user.PASSWORD
    },
    success: function(data, status) {
      let users = data.users;
      for (let u in users) {
        var row = $("tr#user-template").clone().removeAttr("id");
        row.show();
        $("th:nth-child(1)", row).html(users[u].ID);
        $("td:nth-child(2)", row).html(users[u].USERNAME);
        $("td:nth-child(3)", row).html(users[u].EMAIL);
        $("td:nth-child(4)", row).html(users[u].NAMES + " " + users[u].LASTNAMES);
        $("td:nth-child(5)", row).html(users[u].ADMIN ? "<span class='fa fa-check'></span>" : "<span class='fa fa-times'></span>");
        $("td:nth-child(6)", row).html(users[u].BLOCKED ? "<span class='fa fa-check'></span>" : "<span class='fa fa-times'></span>");
        $("td:nth-child(5)", row).click({
          "id": users[u].ID,
          "email": users[u].EMAIL
        }, adminUnadminUser);
        $("td:nth-child(6)", row).click({
          "id": users[u].ID,
          "email": users[u].EMAIL
        }, lockUnlockUser);

        USERS[users[u].ID] = users[u];
        $("table").prepend(row);
      }
    }
  });
});

function lockUnlockUser(event) {
  var user = sessionStorage.getItem("user");
  if (user != null) {
    user = JSON.parse(user);
  } else {
    return;
  }

  $.ajax({
    url: "https://fathomless-tor-48974.herokuapp.com/api_admin/block_user",
    method: "POST",
    data: {
      "username": user.EMAIL,
      "password": user.PASSWORD,
      "target": event.data.email,
      "action": USERS[event.data.id].BLOCKED ? "UNLOCK" : "LOCK"
    },
    success: function() {
      location.reload();
    }
  });
}

function adminUnadminUser(event) {
  var user = sessionStorage.getItem("user");
  if (user != null) {
    user = JSON.parse(user);
  } else {
    return;
  }

  $.ajax({
    url: "https://fathomless-tor-48974.herokuapp.com/api_admin/adminify_user",
    method: "POST",
    data: {
      "username": user.EMAIL,
      "password": user.PASSWORD,
      "target": event.data.email,
      "action": USERS[event.data.id].ADMIN ? "UNADMIN" : "ADMIN"
    },
    success: function() {
      location.reload();
    }
  });
}
