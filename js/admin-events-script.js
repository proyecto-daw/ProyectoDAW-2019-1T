var EVENTS = {};

$(document).ready(function() {
  $.fn.datetimepicker.Constructor.Default = $.extend({}, $.fn.datetimepicker.Constructor.Default, {
    icons: {
      time: 'far fa-clock',
      date: 'far fa-calendar',
      up: 'fa fa-arrow-up',
      down: 'fa fa-arrow-down',
      previous: 'fa fa-chevron-left',
      next: 'fa fa-chevron-right',
      today: 'far fa-calendar-check-o',
      clear: 'far fa-trash',
      close: 'far fa-times'
    }
  });

  $('#datetimepicker1').datetimepicker();
});

$(document).ready(function() {
  var user = sessionStorage.getItem("user");
  if (user != null) {
    user = JSON.parse(user);
  } else {
    return;
  }

  $.ajax({
    url: "https://fathomless-tor-48974.herokuapp.com/events",
    method: "GET",
    success: function(data, status) {
      let events = data.events;
      EVENTS = events;
      for (let e in events) {
        var row = $("tr#event-template").clone().removeAttr("id");
        row.show();
        $("th:nth-child(1)", row).html(e);
        $("td:nth-child(2)", row).html(events[e][0]);
        $("td:nth-child(3)", row).html(events[e][1]);
        $("td:nth-child(4)", row).html(events[e][2]);
        $("td:nth-child(5)", row).html(moment(events[e][3]).format('MMMM D YYYY, h:mm A'));
        row.click({
          "id": e
        }, rowClicked);
        $("table").prepend(row);
      }
    }
  });
});

var lastButtonClicked;

$(document).ready(function() {
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
  let ev = EVENTS[event.data.id];
  $("span#targetId").text(event.data.id);
  $("input#inputName").val(ev[0]);
  $("input#inputPlace").val(ev[1]);
  $("input#inputClosestWp").val(ev[2]);
  $('#datetimepicker1').datetimepicker('date', moment(ev[3]));
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
    url: "https://fathomless-tor-48974.herokuapp.com/api_admin/new_or_edit_event",
    method: "POST",
    data: {
      "username": user.EMAIL,
      "password": user.PASSWORD,
      "event": JSON.stringify({
        [targetId]: [
          $("input#inputName").val(),
          $("input#inputPlace").val(),
          $("input#inputClosestWp").val(),
          $('#datetimepicker1').data("datetimepicker").date().format(),
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
    url: "https://fathomless-tor-48974.herokuapp.com/api_admin/delete_event",
    method: "POST",
    data: {
      "username": user.EMAIL,
      "password": user.PASSWORD,
      "event_id": targetId
    },
    success: function(data, status) {
      if (data.result == "OK") {
        location.reload();
      } else if (data.result == "PROTECTED_ERROR") {
        alert(data.result);
      }
    },
    error: function(xhr, status, error) {
      alert("Server error!");
    }
  });
}