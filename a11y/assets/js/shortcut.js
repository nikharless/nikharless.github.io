var shortcutPressed = document.getElementsById("searchField");

document.addEventListener ("keydown", openSearch);

function openSearch (zEvent) {
    if (zEvent.shiftKey  &&  zEvent.altKey  &&  zEvent.key === "s") {  // case sensitive
      if(shortcutPressed.style.display == "none") {
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