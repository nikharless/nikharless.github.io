document.querySelectorAll(".switch").forEach((theSwitch) => {
  theSwitch.addEventListener("click", handleClickEvent, false);
});

function handleClickEvent(evt) {
  const el = evt.target;

  if (el.getAttribute("class") === "switch switch-on") {
    el.setAttribute("class", "switch switch-off");
  } else {
    el.setAttribute("class", "switch switch-on");
  }
}
