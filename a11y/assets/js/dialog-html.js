document.addEventListener("DOMContentLoaded", function(e) {
    const d = document.querySelectorAll("dialog");
    const btnOpen = document.querySelectorAll(".open-modal");
    var c = 0;

    btnOpen.forEach((openBtn) => {
        openBtn.addEventListener("click", function() {
            d[c].showModal();
        }, false);
    c++;
    })
});