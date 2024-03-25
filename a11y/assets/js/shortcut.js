var shortcutPressed = document.getElementById("searchField");
alert(shortcutPressed);

document.addEventListener ("keydown", openSearch);

function openSearch (zEvent) {
    if (zEvent.shiftKey  &&  zEvent.altKey  &&  zEvent.key === "S") {  // case sensitive
      alert(shortcutPressed.style.display);
      if(shortcutPressed.style.display === "none") {
        // show search field
        shortcutPressed.style.display = "flex";
      }
      else {
        // hide search field
        shortcutPressed.style.display = "none";
      }
    }

    zEvent.stopPropagation();
    zEvent.preventDefault();
}