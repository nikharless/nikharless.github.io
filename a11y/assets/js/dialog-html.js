document.addEventListener("DOMContentLoaded", function(e) {
    const d = document.querySelectorAll("dialog");
    const btnOpen = document.querySelectorAll(".open-modal");

    for (let i=0; i < btnOpen.length; i++) {
        openBtn.addEventListener("click", function() {
            d[i].showModal();
        }
    }
});