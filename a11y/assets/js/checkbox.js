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
    this.ccbChecked = this.domNode.firstChild;
    this.ccbNotChecked = this.domNode.lastChild;

    if (!this.domNode.getAttribute('aria-checked')) {
      this.domNode.setAttribute('aria-checked', 'false');
    }

    this.domNode.addEventListener('keydown', this.onKeydown.bind(this));
    this.domNode.addEventListener('keyup', this.onKeyup.bind(this));
    this.domNode.addEventListener('click', this.onClick.bind(this));
  }

  toggleCheckbox() {
    if (this.domNode.getAttribute('aria-checked') === 'true') {
      this.domNode.setAttribute('aria-checked', 'false');
      this.ccbChecked.style.display = "none";
      this.ccbNotChecked.style.display = "display";
    } else {
      this.domNode.setAttribute('aria-checked', 'true');
      this.ccbChecked.style.display = "display";
      this.ccbNotChecked.style.display = "none";
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
        this.toggleCheckbox();
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
    this.toggleCheckbox();
  }
}

// Initialize checkboxes on the page
window.addEventListener('load', function () {
  let checkboxes = document.querySelectorAll('.cbExample [role="checkbox"]');
  for (let i = 0; i < checkboxes.length; i++) {
    new Checkbox(checkboxes[i]);
  }
});