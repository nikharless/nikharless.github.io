/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   File:   Checkbox.js
 *
 *   Desc:   Checkbox widget that implements ARIA Authoring Practices
 */

'use strict';

class Checkbox {
  constructor(domNode) {
    this.domNode = domNode;
    this.domNode.tabIndex = 0;
    /* Find a way to cycle through checkboxes */
    this.ccbChecked1 = document.getElementById('ccbChecked1');
    this.ccbNotChecked1 = document.getElementById('ccbNotChecked1');
    this.ccbChecked2 = document.getElementById('ccbChecked2');
    this.ccbNotChecked2 = document.getElementById('ccbNotChecked2');
    this.ccbChecked3 = document.getElementById('ccbChecked3');
    this.ccbNotChecked3 = document.getElementById('ccbNotChecked3');

    if (!this.domNode.getAttribute('aria-checked')) {
      this.domNode.setAttribute('aria-checked', 'false');
    }

    this.domNode.addEventListener('keydown', this.onKeydown.bind(this));
    this.domNode.addEventListener('keyup', this.onKeyup.bind(this));
    this.domNode.addEventListener('click', this.onClick.bind(this));
  }

  toggleCheckbox(id) {
    if (this.domNode.getAttribute('aria-checked') === 'true') {
      this.domNode.setAttribute('aria-checked', 'false');
      if (id == ccbChecked1) {
        this.ccbChecked1.style.display = "none";
        this.ccbNotChecked1.style.display = "block";
      } else if (id == ccbChecked2) {
        this.ccbChecked2.style.display = "none";
        this.ccbNotChecked2.style.display = "block";
      } else if (id == ccbChecked3) {
        this.ccbChecked3.style.display = "none";
        this.ccbNotChecked3.style.display = "block";
      }

    } else {
      this.domNode.setAttribute('aria-checked', 'true');
      if (id == ccbChecked1) {
        this.ccbChecked1.style.display = "block";
        this.ccbNotChecked1.style.display = "none";
      } else if (id == ccbChecked2) {
        this.ccbChecked2.style.display = "block";
        this.ccbNotChecked2.style.display = "none";
      } else if (id == ccbChecked3) {
        this.ccbChecked3.style.display = "block";
        this.ccbNotChecked3.style.display = "none";
      }
    }
  }

  /* EVENT HANDLERS */

  // Make sure to prevent page scrolling on space down
  onKeydown(event) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  onKeyup(event) {
    var flag = false;

    switch (event.key) {
      case ' ':
        this.toggleCheckbox(this.id);
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
    }
  }

  onClick() {
    this.toggleCheckbox(this.id);
    alert(this.id);
  }
}

// Initialize checkboxes on the page
window.addEventListener('load', function () {
  let checkboxes = document.querySelectorAll('.cbExample [role="checkbox"]');
  for (let i = 0; i < checkboxes.length; i++) {
    new Checkbox(checkboxes[i]);
  }
});