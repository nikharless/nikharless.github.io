const shortcutPressedTextRef = document.getElementsByClassName(
  "search-field-activated"
)[0];

document.addEventListener ("keydown", function (zEvent) {
    if (zEvent.shiftKey  &&  zEvent.altKey  &&  zEvent.key === "s") {  // case sensitive
      if(shortcutPressedTextRef.style.display == "none") {
        // show search field
        shortcutPressedTextRef.style.display = "flex";
      }
      else {
        // hide search field
        shortcutPressedTextRef.style.display = "none";
      }
    }
} );