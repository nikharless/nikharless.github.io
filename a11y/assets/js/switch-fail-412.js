document.querySelectorAll(".switch").forEach((theSwitch) => {
  theSwitch.addEventListener("click", handleClickEvent, false);
});

function handleClickEvent(evt) {
  const el = evt.target;
alert(el.getAttribute("name");
  if (el.getAttribute("name") === "switch-on") {
    el.setAttribute("name", "switch-off");
  } else {
    el.setAttribute("name", "switch-on");
  }
}
