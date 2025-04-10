// Get bad modal element
const badModal = document.getElementById("badModal");
// Get button that opens the bad modal
const badBtn = document.getElementById("openBadModalBtn");
// Get the <span> element that closes the modal
const span = document.getElementById("badModalClose");
// When the user clicks the button, open the bad modal
badBtn.onclick = function() {
  badModal.style.display = "block";
}
// When the user clicks on <span> (x), close the bad modal
span.onclick = function() {
  badModal.style.display = "none";
}
// When the user clicks anywhere outside of the bad modal, close it
window.onclick = function(event) {
  if (event.target === badModal) {
    badModal.style.display = "none";
  }
}