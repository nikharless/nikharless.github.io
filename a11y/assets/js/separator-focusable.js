function initSep () {
  var ismdwn = 0;
  var paneWidth = window.innerWidth / 2;
  const dragSep = document.getElementById("separator");

  dragSep.addEventListener('mousedown', mD);
  dragSep.addEventListener('keydown', kD);
  console.log("paneWidth: " + paneWidth);
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
      paneWidth = paneWidth - (paneWidth * .1);
      console.log("paneWidth: " + paneWidth);
      pane1.style.flexBasis = paneWidth + "px";
      break;
    case "ArrowRight":
      paneWidth = paneWidth + (paneWidth * .1);
      console.log("paneWidth: " + paneWidth);
      pane1.style.flexBasis = paneWidth + "px";
      break;
    case "Enter":
      if (pane1.style.flexBasis > 0) {
        paneWidth = 1;
        pane1.style.flexBasis = paneWidth + "px";
      } else {
        paneWidth = window.innerWidth / 2;
        pane1.style.flexBasis = paneWidth + "px";
      }
      break;
    case "Home":
      paneWidth = 1;
      pane1.style.flexBasis = paneWidth + "px";
      break;
    case "End":
      paneWidth = window.innerWidth;
      pane1.style.flexBasis = paneWidth + "px";
      break;
    case "F6":
      break;
    default:
      return;
  }
  event.preventDefault();
}

const end = (e) => {
  ismdwn = 0;
  document.body.removeEventListener('mouseup', end);
  dragSep.removeEventListener('mousemove', mV);
}

window.onload = initSep;