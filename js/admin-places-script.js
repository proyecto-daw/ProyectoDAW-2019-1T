var WAYPOINTS = {};

$(document).ready(function() {
  var user = sessionStorage.getItem("user");
  if (user != null) {
    user = JSON.parse(user);
  } else {
    return;
  }

  $.ajax({
    url: "https://fathomless-tor-48974.herokuapp.com/waypoints",
    method: "GET",
    success: function(data, status) {
      let waypoints = data.waypoints;
      WAYPOINTS = waypoints;
      for (let w in waypoints) {
        var row = $("tr#waypoint-template").clone().removeAttr("id");
        row.show();
        $("th:nth-child(1)", row).html(w);
        $("td:nth-child(2)", row).html(waypoints[w][0]);
        $("td:nth-child(3)", row).html(waypoints[w][1]);
        $("td:nth-child(4)", row).html(waypoints[w][2]);
        row.click({
          "id": w
        }, rowClicked);
        // $("td:nth-child(6)", row).click({
        //   "id": users[u].ID,
        //   "email": users[u].EMAIL
        // }, lockUnlockUser);
        $("table").prepend(row);
      }
    }
  });
});

var lastButtonClicked;

$(document).ready(function() {
  // $("input#submitEdit").click(submitEdit);
  // $("input#submitDelete").click(submitDelete);
  $('input[type="submit"]').click(function(event) {
    lastButtonClicked = $(event.target);
  });

  $("form").submit(function(event) {
    if (lastButtonClicked.is($("input#submitEdit"))) {
      submitEdit(event);
    } else {
      submitDelete(event);
    }
  });
});

function rowClicked(event) {
  let waypoint = WAYPOINTS[event.data.id];
  $("span#targetId").text(event.data.id);
  $("input#inputLat").val(waypoint[0]);
  $("input#inputLong").val(waypoint[1]);
  $("input#inputName").val(waypoint[2]);
}

function submitEdit(event) {
  event.preventDefault();
  var targetId = $("span#targetId").text();
  if (targetId == "*") {
    targetId = "-1";
  }

  if (!$("form")[0].checkValidity()) {
    return;
  }

  var user = sessionStorage.getItem("user");
  if (user != null) {
    user = JSON.parse(user);
  } else {
    return;
  }

  $.ajax({
    url: "https://fathomless-tor-48974.herokuapp.com/api_admin/new_or_edit_waypoint",
    method: "POST",
    data: {
      "username": user.EMAIL,
      "password": user.PASSWORD,
      "waypoint": JSON.stringify({
        [targetId]: [
          $("input#inputLat").val(),
          $("input#inputLong").val(),
          $("input#inputName").val()
        ]
      })
    },
    success: function() {
      location.reload();
    },
    error: function(xhr, status, error) {
      alert("Server error!");
    }
  });
}

function submitDelete(event) {
  event.preventDefault();

  var targetId = $("span#targetId").text();
  if (targetId == "*") {
    alert("Seleccione un punto que ya esté guardado!");
    return;
  }

  var user = sessionStorage.getItem("user");
  if (user != null) {
    user = JSON.parse(user);
  } else {
    return;
  }

  $.ajax({
    url: "https://fathomless-tor-48974.herokuapp.com/api_admin/delete_waypoint",
    method: "POST",
    data: {
      "username": user.EMAIL,
      "password": user.PASSWORD,
      "waypoint_id": targetId
    },
    success: function(data, status) {
      if (data.result == "OK") {
        location.reload();
      } else if (data.result == "PROTECTED_ERROR") {
        alert("No se puede eliminar! El waypoint todavía está relacionado con alguna clase!");
      }
    },
    error: function(xhr, status, error) {
      alert("Server error!");
    }
  });
}
