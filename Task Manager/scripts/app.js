const iconImportant = "iImportant fas fa-star";
const iconNonImportant = "iImportant far fa-star";
var important = false;
var panelVisible = true;
var total = 0;

function toggleImportance() {
  if (important) {
    // from imp to not imp
    $("#iImportant").removeClass(iconImportant).addClass(iconNonImportant);
    important = false;
  } else {
    // non imp to imp
    $("#iImportant").removeClass(iconNonImportant).addClass(iconImportant);
    important = true;
  }
}

function togglePanel() {
  if (panelVisible) {
    $("#form").hide();
    $("#btnTogglePanel").text("< Show");
    panelVisible = false;
  } else {
    $("#form").show();
    $("#btnTogglePanel").text("Hide >");
    panelVisible = true;
  }
}

function saveTask() {
  let title = $("#txtTitle").val();
  let desc = $("#txtDesc").val();
  let dueDate = $("#selDate").val();
  let location = $("#txtLocation").val();
  let invites = $("#txtInvites").val();
  let color = $("#txtColor").val();
  let frequency = $("#selFrequency").val();
  let status = $("#selStatus").val();

  // create an object
  let task = new Task(
    important,
    title,
    desc,
    dueDate,
    location,
    invites,
    color,
    frequency,
    status,
  );
  console.log(task);
  console.log(JSON.stringify(task));

  displayTask(task);
  $.ajax({
    type: "post",
    url: "https://fsdiapi.azurewebsites.net/api/tasks/",
    data: JSON.stringify(task),
    contentType: "application/json",
    success: function (res) {
      console.log("Task saved", res);
      displayTask(task);
      clearForm();
      // update the count
      total += 1;
      $("#headCount").text(" You have " + total + " tasks");
    },
    error: function (errorDetails) {
      console.error("Save failed", errorDetails);
    },
  });
}

function clearForm() {
  $("input").val("");
  $("textarea").val("");
  $("select").val("0");
  $("selColor").val("FFFFFF");
  important = true;
  toggleImportance();
}

function getStatusText(status) {
  switch (status) {
    case "1":
      return "Pending";
    case "2":
      return "In Progress";
    case "3":
      return "Paused";
    case "4":
      return "Completed";
    case "5":
      return "Abandoned";

    default:
      return "Other";
  }
}

function displayTask(task) {
  let iconClass = iconNonImportant;
  if (task.important) {
    iconClass = iconImportant;
  }

  let syntax = `<div class="task-item" style="border: 1px solid ${task.color};">
    <div class="icon">
    <i class="${iconClass}"></i>
    </div>

    <div class="info-1">
        <h5>${task.title}</h5>
        <p>${task.description}</p>
    </div>

    <div class="info-2">
        <label>${task.dueDate}</label>
        <label>${task.location}</label>
    </div>

    <div class="info-3">
        <p>${task.invites}</p>
    </div>

    <div class="info-2">
        <label>${getStatusText(task.status)}</label>
        <label>${getFrequencyText(task.frequency)}</label>
    </div>

    </div>`;

  $("#tasks").append(syntax);
}

function fetchTasks() {
  $.ajax({
    type: "get",
    url: "https://fsdiapi.azurewebsites.net/api/tasks",
    success: function (res) {
      let data = JSON.parse(res); // (decode) from string to obj
      /**
       * create a total var
       * travel the array
       * if the tasks is yours, increase the total by 1
       */
      total = 0;
      for (let i = 0; i < data.length; i++) {
        let task = data[i];

        // if the name attribute of task object is equal to your name,
        if (task.name == "Arthur") {
          total += 1; // total = total + 1;
          displayTask(task);
        }
      }

      // set the text to the heading
      $("#headCount").text("You have " + total + " tasks");
    },
    error: function (err) {
      console.error("Error retrieving data", err);
    },
  });
}

function clearAllTasks() {
  // ajax DELETE req
  // /api/tasks/clear/<name>
  $.ajax({
    type: "delete",
    url: "https://fsdiapi.azurewebsites.net/api/tasks",
    success: function () {
      //reload the page
      location.reload();
    },
    error: function (err) {
      console.log("Error clearing tasks", err);
    },
  });
}

function init() {
  console.log("Task manager page");

  // assign events
  $("#iImportant").click(toggleImportance);
  $("#btnTogglePanel").click(togglePanel);
  $("#btnSaveTask").click(saveTask);
  $("#btnClearAll").click(clearAllTasks);

  //load data
  fetchTasks();
}

window.onload = init;
