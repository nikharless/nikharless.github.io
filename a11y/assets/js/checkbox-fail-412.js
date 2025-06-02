/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   File:   checkbox-fail-412.js
 *
 *   Desc:   Checkbox widget that fails WCAG 4.1.2
 */

'use strict';

class CheckboxFailChecked {
  constructor(domNode) {
    this.domNode = domNode;
    this.domNode.tabIndex = 0;

    this.domNode.addEventListener('keydown', this.onKeydown.bind(this));
    this.domNode.addEventListener('keyup', this.onKeyup.bind(this));
    this.domNode.addEventListener('click', this.onClick.bind(this));
  }

  toggleCheckbox() {
    if (document.getElementById('ccbChecked').getAttribute('style') === 'display: block;') {
      document.getElementById('ccbChecked').setAttribute('style', 'display: none;');
      document.getElementById('ccbNotChecked').setAttribute('style', 'display: block;');
    } else {
      document.getElementById('ccbChecked').setAttribute('style', 'display: block;');
      document.getElementById('ccbNotChecked').setAttribute('style', 'display: none;');
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
  let checkboxesFailCheck = document.querySelectorAll('.cbExampleFailCheck [role="checkbox"]');
  for (let i = 0; i < checkboxesFailCheck.length; i++) {
    new CheckboxFailChecked(checkboxesFailCheck[i]);
  }
});