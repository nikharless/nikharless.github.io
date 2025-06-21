//'use strict';

const overlay = document.querySelector(".overlay");
//overlay.addEventListener("click", closeModal);

class AlertModal {

    constructor(alertNode) {
        this.alertNode = alertNode;
        this.modal = this.alertNode.querySelector(".modal");
        console.log("constructor: " + this.modal);
        this.openModalBtn = this.alertNode.querySelector(".btn-open");
        this.closeModalBtn = this.alertNode.querySelector(".btn-close");
        this.submitBtn = this.alertNode.querySelector(".btn-submit");

        this.openModalBtn.addEventListener('click', this.openModal.bind(this.openModalBtn));
        this.closeModalBtn.addEventListener('click', this.closeModal.bind(this.closeModalBtn));
        this.submitBtn.addEventListener('click', this.closeModal.bind(this.submitBtn));

        this.modal.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && !this.modal.classList.contains("hidden")) {
                closeModal();
            }
        });
    }

    openModal = function () {
        console.log(this.modal);
        this.modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
        overlay.style.display="block";
    };

    closeModal = function () {
        this.modal.classList.add("hidden");
        overlay.classList.add("hidden");
        overlay.style.display="none";
        this.openModalBtn.focus();
    };
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