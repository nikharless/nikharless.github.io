const dialog = document.getElementById("myDialog");
const showButton = document.getElementById("myDialogTrigger");
const closeButton = document.getElementById("myDialogClose");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});