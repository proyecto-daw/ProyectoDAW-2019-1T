var currentlyActiveRow = -1;

const classes = { // index: [name, hour_of_start, minute_of_start]
  1: ["Álgebra Lineal", 9, 30],
  2: ["Cálculo de Una Variable", 19, 10],
  3: ["Comunicación I", 19, 30],
};

function minutes_left(target_class) {
  const d = new Date();
  return (target_class[1] - d.getHours()) * 60 + (target_class[2] - d.getMinutes());
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

  document.querySelector("#monitored_class").innerText = '(' + classes[index][0] + ')';
  const mins_left = minutes_left(classes[index]);
  document.querySelector("#minutes_left").value = mins_left > 0 ? mins_left + " mins" : "Iniciada";

  refreshProgressBar(mins_left);
}

function refreshCheckboxes() {
  for (let c in classes) {
    let checkbox = document.querySelector('tr[data-index="' + c + '"] input');
    checkbox.checked = minutes_left(classes[c]) <= 0;
  }
}
refreshCheckboxes();
window.setInterval(function() {
  refreshCheckboxes();
}, 5000); // Update the different "state" checkboxes every 5 secs
