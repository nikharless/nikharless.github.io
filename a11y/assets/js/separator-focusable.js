var ismdwn; // Is the mouse down?
var paneWidth; // Width of the left pane
var wPercent; // Width converted to percent
var dragSep; // Separator
var valueMin = 100; // Minimum width of left pane
var valueMax = window.innerWidth - 100; // Maximum width of left pane
var valueStart; // Original width of left pane (set in CSS)

function initSep () {
  ismdwn = 0;
  dragSep = document.getElementById("separator");
  valueStart = document.getElementById("pane1").offsetWidth;
  paneWidth = valueStart;
  wPercent = Math.round((paneWidth / valueMax) * 100);
  dragSep.setAttribute("aria-valuenow", paneWidth);
  dragSep.setAttribute("aria-valuemin", valueMin);
  dragSep.setAttribute("aria-valuemax", valueMax);
  dragSep.setAttribute("aria-valuetext", wPercent + "%");

  dragSep.addEventListener('mousedown', mD);
  dragSep.addEventListener('keydown', kD);
}

function mD(event) {
  ismdwn = 1;
  document.body.addEventListener('mousemove', mV);
  document.body.addEventListener('mouseup', end);
}

function mV(event) {
  if (ismdwn === 1) {
    pane1.style.flexBasis = event.clientX + "px";
    paneWidth = event.clientX;
  } else {
    end();
  }
}

function kD(event) {
  switch (event.key) {
    case "ArrowLeft":
      if (paneWidth > valueMin) {
        paneWidth = paneWidth - 20;
      }
      break;
    case "ArrowRight":
      if (paneWidth < valueMax) {
        paneWidth = paneWidth + 20;
      }
      break;
    case "Enter":
      if (paneWidth > valueMin) {
        paneWidth = valueMin;
      } else {
        paneWidth = valueStart;
      }
      break;
    case "Home":
      paneWidth = valueMin;
      break;
    case "End":
      paneWidth = valueMax;
      break;
    case "F6":
      break;
    default:
      return;
  }
  event.preventDefault();
  updateValueNow();
}

function updateValueNow() {
  pane1.style.flexBasis = paneWidth + "px";
  wPercent = Math.round((paneWidth / valueMax) * 100);
  dragSep.setAttribute("aria-valuenow", paneWidth);
  dragSep.setAttribute("aria-valuetext", wPercent + "%");
}

const end = (e) => {
  ismdwn = 0;
  document.body.removeEventListener('mouseup', end);
  dragSep.removeEventListener('mousemove', mV);
  updateValueNow();
}

window.onload = initSep;