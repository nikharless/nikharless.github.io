//'use strict';

const overlay = document.querySelector(".overlay");
//overlay.addEventListener("click", closeModal);

class AlertModal {

    constructor(alertNode) {
        this.alertNode = alertNode;
        var modal = this.alertNode.querySelector(".modal");
        var openModalBtn = this.alertNode.querySelector(".btn-open");
        var closeModalBtn = this.alertNode.querySelector(".btn-close");
        var submitBtn = this.alertNode.querySelector(".btn-submit");

        openModalBtn.addEventListener('click', function() { openModal(modal); });
        closeModalBtn.addEventListener('click', function() { closeModal(modal, openModalBtn); });
        if (submitBtn !== null) {
            submitBtn.addEventListener('click', function() { closeModal(modal, openModalBtn); });
        }

        modal.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && !modal.classList.contains("hidden")) {
                closeModal();
            }
        });
    }
}

function openModal (modal) {
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
        overlay.style.display="block";
        modal.focus();
    };

function closeModal (modal, openModalBtn) {
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
        overlay.style.display="none";
        openModalBtn.focus();
    };

window.addEventListener(
  'load',
  function () {
    var alerts = document.querySelectorAll(
      '.alertdialog'
    );

    for (var i = 0; i < alerts.length; i++) {
      new AlertModal(alerts[i]);
    }
  },
  false
);