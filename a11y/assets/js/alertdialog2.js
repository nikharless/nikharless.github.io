'use strict';

const overlay = document.querySelector(".overlay");
overlay.addEventListener("click", closeModal);

class AlertModal {
    constructor(alertNode) {
        this.alertNode = alertNode;

        var modal = this.alertNode.querySelector(".modal");
        var openModalBtn = this.alertNode.querySelector(".btn-open");
        var closeModalBtn = this.alertNode.querySelector(".btn-close");
        var submitBtn = this.alertNode.querySelector("btn-submit");

        openModalBtn.addEventListener('click', this.openModal.bind(this.openModalBtn));
        closeModalBtn.addEventListener('click', this.closeModal.bind(this.closeModalBtn));
        submitBtn.addEventListener('click', this.closeModal.bind(this.submitBtn));
    }

    openModal = function () {
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
        overlay.style.display="block";
    };

    closeModal = function () {
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
        overlay.style.display="none";
        openModalBtn.focus();
    };

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && !modal.classList.contains("hidden")) {
            closeModal();
        }
    });
}

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