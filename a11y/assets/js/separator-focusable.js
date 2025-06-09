var ismdwn;
var paneWidth;
var dragSep;

function initSep () {
  ismdwn = 0;
  paneWidth = window.innerWidth / 2;
  dragSep = document.getElementById("separator");
  dragSep.setAttribute("aria-valuenow", paneWidth);

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
  } else {
    end();
  }
}

function kD(event) {
  switch (event.key) {
    case "ArrowLeft":
      if (paneWidth > 100) {
        paneWidth = paneWidth - 20;
      }
      break;
    case "ArrowRight":
      if (paneWidth < (window.innerWidth - 100)) {
        paneWidth = paneWidth + 20;
      }
      break;
    case "Enter":
      if (paneWidth > 100) {
        paneWidth = 100;
      } else {
        paneWidth = window.innerWidth / 2;
      }
      break;
    case "Home":
      paneWidth = 100;
      break;
    case "End":
      paneWidth = window.innerWidth - 100;
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
  dragSep.setAttribute("aria-valuenow", paneWidth);
}

const end = (e) => {
  ismdwn = 0;
  document.body.removeEventListener('mouseup', end);
  dragSep.removeEventListener('mousemove', mV);
  dragSep.setAttribute("aria-valuenow", paneWidth);
}

window.onload = initSep;