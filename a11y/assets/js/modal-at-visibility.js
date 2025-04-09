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
  if (event.target === modal) {
    badModal.style.display = "none";
  }
}


// Get good modal element
const modal = document.getElementById("goodModal");
// Get main content to toggle aria-hidden
//const mainContent = document.getElementById("mainContent");
const mainContent = document.querySelector("body");
// Get button that opens the modal
const btn = document.getElementById("openModalBtn");
// Get the <span> element that closes the modal
const closeBtn = document.getElementById("modalClose");
// Function to hide content from screen readers and show modal
function openModal() {
  modal.style.display = "block";
  modal.setAttribute("aria-modal", "true");  // Set aria-modal to true
  modal.focus();
  mainContent.setAttribute("aria-hidden", "true");  // Hide main content
}
// Function to show content to screen readers and hide modal
function closeModal() {
  modal.style.display = "none";
  mainContent.removeAttribute("aria-hidden");  // Show main content
  modal.removeAttribute("aria-modal");  // Remove aria-modal attribute
}
// When the user clicks the button, open the modal
btn.onclick = function() {
  openModal();
}
// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function() {
  closeModal();
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    closeModal();
  }
}
// Helper function to set aria-hidden on all siblings except modal
function setAriaHiddenForSiblings(hidden) {
  const siblings = Array.from(document.body.children).filter((child) => 
    child !== modal && child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE'
  );
  
  siblings.forEach(sibling => {
    if (hidden) {
      sibling.setAttribute('aria-hidden', 'true');
    } else {
      sibling.removeAttribute('aria-hidden');
    }
  });
}
// Override openModal and closeModal to handle aria-hidden on all siblings
function openModal() {
  modal.style.display = "block";
  setAriaHiddenForSiblings(true);  // Hide all sibling elements except modal
  modal.setAttribute("aria-modal", "true");  // Set aria-modal to true
}
function closeModal() {
  modal.style.display = "none";
  setAriaHiddenForSiblings(false);  // Remove aria-hidden from sibling elements
  modal.removeAttribute("aria-modal");  // Remove aria-modal attribute
}