/* DISCLAIMER
 * ES5 is being used to ensure maximum browser cmpatibility
 * Since no transpilers are being used
 */

/* This array contains the different usage profiles for the ventilation system */
/* var profiles = [{
    MODE: "Comfort",
    MONDAY: "18:00:00",
    TUESDAY: "09:00:00",
    WEDNESDAY: "09:00:00",
    THURSDAY: "09:00:00",
    FRIDAY: "09:00:00",
    SATURDAY: null,
    SUNDAY: null
  },
  {
    MODE: "Eco",
    MONDAY: "12:00:00",
    TUESDAY: "22:00:00",
    WEDNESDAY: "22:00:00",
    THURSDAY: "22:00:00",
    FRIDAY: "22:00:00",
    SATURDAY: null,
    SUNDAY: null
  },
  {
    MODE: "Standby",
    MONDAY: null,
    TUESDAY: "07:30:00",
    WEDNESDAY: "07:30:00",
    THURSDAY: "07:30:00",
    FRIDAY: "07:30:00",
    SATURDAY: null,
    SUNDAY: null
  },
  {
    MODE: "Standby",
    MONDAY: "16:00:00",
    TUESDAY: "21:00:00",
    WEDNESDAY: "21:00:00",
    THURSDAY: "21:00:00",
    FRIDAY: "21:00:00",
    SATURDAY: null,
    SUNDAY: null
  }
]; */

var profiles = [{
    "MODE": "Comfort",
    "MONDAY": "09:00:00",
    "TUESDAY": "09:00:00",
    "WEDNESDAY": "09:00:00",
    "THURSDAY": "09:00:00",
    "FRIDAY": "09:00:00",
    "SATURDAY": null,
    "SUNDAY": null
  },
  {
    "MODE": "Eco",
    "MONDAY": "22:00:00",
    "TUESDAY": "22:00:00",
    "WEDNESDAY": "22:00:00",
    "THURSDAY": "22:00:00",
    "FRIDAY": "22:00:00",
    "SATURDAY": null,
    "SUNDAY": null
  },
  {
    "MODE": "Standby",
    "MONDAY": "07:30:00",
    "TUESDAY": "07:30:00",
    "WEDNESDAY": "07:30:00",
    "THURSDAY": "07:30:00",
    "FRIDAY": "07:30:00",
    "SATURDAY": null,
    "SUNDAY": null
  },
  {
    "MODE": "Standby",
    "MONDAY": "21:00:00",
    "TUESDAY": "21:00:00",
    "WEDNESDAY": "21:00:00",
    "THURSDAY": "21:00:00",
    "FRIDAY": "21:00:00",
    "SATURDAY": null,
    "SUNDAY": null
  }
];

// Generating the hour grid on top of the schedule
var scheduleVisual = document.querySelector(".schedule-visual");
var caption = document.querySelector(".schedule-caption");
var hourGrid = document.createElement("div");
hourGrid.classList.add("hour-grid");

// Looping through the 24 hours of the day and generating each hour for the hour grid
for (var h = 0; h < 24; h++) {
  var hour = document.createElement("p");
  hour.classList.add("hour");
  var hourText = document.createTextNode(generateHourString(h));
  hour.appendChild(hourText);
  hourGrid.appendChild(hour);
}

// appends the hour grid as a child of the schedule visual div
scheduleVisual.appendChild(hourGrid);

// Loop through the 7 days of the week
for (var d = 0; d < 7; d++) {
  var dayAndBar = document.createDocumentFragment();
  dayAndBar.innerHTML = "";
  var dayName = Object.entries(profiles[0])[d + 1][0];
  var dayDiv = document.createElement("div");
  var dayStringP = document.createElement("p");
  dayStringP.innerText = dayName;
  dayDiv.appendChild(dayStringP);
  dayAndBar.appendChild(dayDiv);
  var profileBar = document.createElement("div");
  profileBar.classList.add("daily-profiles");
  scheduleVisual.appendChild(dayAndBar);
  scheduleVisual.appendChild(profileBar);
}

// This will generate the hour string
function generateHourString(index) {
  var indexString = index.toString();
  var hourString;
  indexString.length < 2 ?
    (hourString = "0" + indexString) :
    (hourString = indexString);
  return hourString;
}

// Grabs the parent bars from the DOM
var parentBars = document.querySelectorAll(".daily-profiles");

// sets the days of the week from the property names of the first profile (all profiles have same  property names)
var weekDays = [];
for (var i = 1; i < Object.entries(profiles[0]).length; i++) {
  var startTime = Object.entries(profiles[0])[i][0];
  var weekDayProfiles = {};
  var counter = 1;
  profiles.forEach(function (modus) {
    if (!weekDayProfiles[Object.entries(modus)[0][1]]) {
      weekDayProfiles[Object.entries(modus)[0][1]] = modus[startTime];
    } else {
      counter++;
      weekDayProfiles[Object.entries(modus)[0][1] + counter] = modus[startTime];
    }
  });
  weekDays.push(weekDayProfiles);
}

weekDays.forEach(function (wd, index) {
  // child bars that will represent the hour range of each mode
  var childBars = document.createDocumentFragment();
  var children = printChildBars(childBars, wd);
  parentBars[index].innerHTML = "";
  // appends the child bars (profiles) for each parent bar (days of the week)
  parentBars[index].appendChild(children.cloneNode(true));
});

/*
When there is no mode set, fill with the background color of previous active mode 
For example: on the early hours of the day and weekends 
The background color will match the latest activated mode (previous day/friday...)
*/
parentBars.forEach(function (bar, index) {
  if (
    index > 0 &&
    bar.previousElementSibling.previousElementSibling.lastElementChild
  ) {
    var prevStyle = window.getComputedStyle(
      bar.previousElementSibling.previousElementSibling.lastElementChild
    );
    bar.style.backgroundColor = prevStyle.getPropertyValue("background-color");
  } else if (
    index > 0 &&
    !bar.previousElementSibling.previousElementSibling.lastElementChild
  ) {
    var prevStyle = window.getComputedStyle(
      bar.previousElementSibling.previousElementSibling
    );
    bar.style.backgroundColor = prevStyle.getPropertyValue("background-color");
  }
});

// for Monday morning, get mode from previous Sunday
if (parentBars[parentBars.length - 1].lastElementChild) {
  parentBars[0].style.backgroundColor = getComputedStyle(
    parentBars[parentBars.length - 1].lastElementChild
  ).getPropertyValue("background-color");
} else {
  parentBars[0].style.backgroundColor = getComputedStyle(
    parentBars[parentBars.length - 1]
  ).getPropertyValue("background-color");
}

// Generates the schedule caption
for (key in weekDayProfiles) {
  var modeCaption = document.createElement("p");
  modeCaption.innerText = key;
  modeCaption.classList.add("mode-caption");
  modeCaption.style.backgroundColor = window
    .getComputedStyle(document.querySelector("." + key))
    .getPropertyValue("background-color");
  if (key !== "Standby") {
    caption.appendChild(modeCaption);
  } else {
    caption.insertBefore(modeCaption, caption.lastElementChild);
  }
}

// calculates the position in the parent bar grid according to the hours string
function printChildBars(childBars, modes) {
  // Sort the object properties by value
  var sortable = [];
  for (var key in modes) {
    if (modes.hasOwnProperty(key)) {
      if (modes[key]) {
        if (modes[key].constructor === Array) {
          sortable.push(flattenArray([key, modes[key]])); // each item is an array in format [key, value]
        } else {
          sortable.push([key, modes[key]]);
        }
      }
    }

    // sort properties by value
    sortable.sort(function (a, b) {
      var x =
        parseInt(a[1].substr(0, 2), 10) +
        parseInt(a[1].substr(3, 2), 10) / 60,
        y =
        parseInt(b[1].substr(0, 2), 10) +
        parseInt(b[1].substr(3, 2), 10) / 60;
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  sortable.forEach(function (mode, index) {
    nextMode = sortable[index + 1];
    prevMode = sortable[index - 1];
    var re = new RegExp("[0-9]$");

    var childBar = document.createElement("div");

    if (!re.test(mode[0])) {
      childBar.classList.add(mode[0]);
    } else {
      substring = mode[0].match(/^[A-Za-z]{1,}/);
      childBar.classList.add(substring);
    }

    childBar.style.left = calculateStartPoint(mode[1]) + "%";
    if (!nextMode) {
      childBar.style.width = 100 - calculateStartPoint(mode[1]) + "%";
    } else {
      childBar.style.width = calculateStartPoint(nextMode[1]) - calculateStartPoint(mode[1]) + "%";
    }
    childBars.appendChild(childBar.cloneNode(true));
  });

  return childBars;
}

// calculate the starting point in the grid according to the property hours value
function calculateStartPoint(hour) {
  if (typeof hour === "string") {
    var parsedHour =
      parseInt(hour.substr(0, 2), 10) + parseInt(hour.substr(3, 2), 10) / 60;
    var position = (100 / 23.5) * parsedHour;
    return position;
  }
}