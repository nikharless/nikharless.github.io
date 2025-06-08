function initSep () {
  var ismdwn = 0;
  const dragSep = document.getElementById("separator");

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
      console.log(pane1.style.flexBasis);
      //pane1.style.flexBasis = pane1.style.flexBasis - 10%;
      break;
    case "ArrowRight":
      //pane1.style.flexBasis = pane1.style.flexBasis + 10%;
      break;
    case "Enter":
      if (pane1.style.flexBasis > 0) {
        //pane1.style.flexBasis = 0%;
      } else {
        //pane1.style.flexBasis = 50%;
      }
      break;
    case: "Home":
      //pane1.style.flexBasis = 0%;
      break;
    case: "End":
      //pane1.style.flexBasis = 100%;
      break;
    case: "F6":
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