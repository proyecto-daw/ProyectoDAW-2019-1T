var currentlyActiveRow = -1;

let classes = { // index: [name, hour_of_start, minute_of_start]
};

function minutes_left(target_class) {
  const d = new Date();
  var hour_of_start = parseInt(target_class.HORA.split(":")[0]);
  var minute_of_start = parseInt(target_class.HORA.split(":")[1])
  return (hour_of_start - d.getHours()) * 60 + (minute_of_start - d.getMinutes());
}

function refreshProgressBar(minutes_left) {
  const container = document.querySelector("#progress_bar_container");
  container.innerHTML = "";
  let innerBar = document.createElement("div");
  innerBar.classList.add("progress-bar");

  let percent_of_bar = (1 - minutes_left / 10) * 100;
  percent_of_bar = Math.max(Math.min(100, percent_of_bar), 0);
  innerBar.style = "width: " + percent_of_bar + "%";
  if (percent_of_bar >= 90) {
    innerBar.classList.add("bg-danger");
  } else if (percent_of_bar >= 75) {
    innerBar.classList.add("bg-warning");
  }

  container.appendChild(innerBar);
}

function changeTargetClass(index) {
  let queryStringPrev = 'tr[data-index="' + currentlyActiveRow + '"] > td';
  let queryStringNext = 'tr[data-index="' + index + '"] > td';
  if (currentlyActiveRow > -1) {
    document.querySelector(queryStringPrev).innerHTML = "";
  }
  currentlyActiveRow = index;
  const clickedRow = document.querySelector(queryStringNext);
  clickedRow.innerHTML = '<i class="material-icons md-48">arrow_right</i></td>';

  document.querySelector("#monitored_class").innerText = '(' + classes[index].NOMBRE + ')';
  const mins_left = minutes_left(classes[index]);
  document.querySelector("#minutes_left").value = mins_left > 0 ? mins_left + " mins" : "Iniciada";

  refreshProgressBar(mins_left);
}

function refreshCheckboxes() {
  for (let c in classes) {
    let checkbox = document.querySelector('tr[data-index="' + c + '"] input');
    if (checkbox != null)
      checkbox.checked = minutes_left(classes[c]) <= 0;
  }
}

window.setInterval(function() {
  refreshCheckboxes();
}, 5000); // Update the different "state" checkboxes every 5 secs

$(document).ready(function() {
  var user = sessionStorage.getItem("user");
  if (user != null) {
    user = JSON.parse(user);

    $.ajax({
      url: "https://fathomless-tor-48974.herokuapp.com/get_my_classes",
      method: "POST",
      data: {
        "username": user.EMAIL,
        "password": user.PASSWORD,
      },
      success: function(data, status) {
        let cls = data.classes;
        for (let c in cls) {
          var row = $("tr#class-session-template").clone().removeAttr("id");
          row.show();
          row.attr("data-index", c);
          row.attr("onclick", "changeTargetClass(" + c + ")");
          $("td:nth-child(2)",row).html(cls[c].NOMBRE);
          $("td:nth-child(3)",row).html(cls[c].HORA);
          $("table").append(row);
          classes[c] = cls[c];
        }

        refreshCheckboxes();
      }
    });
  } else {
    $("section#tabla_clases table").hide(); // Hide table from document

    // Insert "Log in!" message in place of table
    $("section#tabla_clases").append("<div class='alert alert-warning' role='alert'>¡Inicie sesión para ver su lista de clases!</div>");
  }
});
