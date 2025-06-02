document.querySelectorAll(".switch").forEach((theSwitch) => {
  theSwitch.addEventListener("click", handleClickEvent, false);
});

function handleClickEvent(evt) {
  const el = evt.target;

  if (el.getAttribute("class") === "switch-on") {
    el.setAttribute("class", "switch-off");
  } else {
    el.setAttribute("class", "switch-on");
  }
}
