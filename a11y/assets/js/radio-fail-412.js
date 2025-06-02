/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   File:   radio-fail-412.js
 *
 *   Desc:   Radio group widget that fails WCAG 4.1.2
 */

'use strict';

class RadioGroupFailCheck {
  constructor(groupNode) {
    this.groupNode = groupNode;

    this.radioButtons = [];

    this.firstRadioButton = null;
    this.lastRadioButton = null;

    var rbs = this.groupNode.querySelectorAll('[role=radio]');

    for (var i = 0; i < rbs.length; i++) {
      var rb = rbs[i];

      rb.tabIndex = -1;

      rb.addEventListener('keydown', this.handleKeydown.bind(this));
      rb.addEventListener('click', this.handleClick.bind(this));
      rb.addEventListener('focus', this.handleFocus.bind(this));
      rb.addEventListener('blur', this.handleBlur.bind(this));

      this.radioButtons.push(rb);

      if (!this.firstRadioButton) {
        this.firstRadioButton = rb;
      }
      this.lastRadioButton = rb;
    }
    this.firstRadioButton.tabIndex = 0;
  }

  setCheckedFailCheck(currentItem) {
    for (var i = 0; i < this.radioButtons.length; i++) {
      var rb = this.radioButtons[i];
      rb.firstElementChild.setAttribute('style', 'display: none;');
      rb.lastElementChild.setAttribute('style', 'display: block;');
      rb.tabIndex = -1;
    }
    currentItem.firstElementChild.setAttribute('style', 'display: block;');
    currentItem.lastElementChild.setAttribute('style', 'display: none;');
    currentItem.tabIndex = 0;
    currentItem.focus();
  }

  setCheckedToPreviousItemFailCheck(currentItem) {
    var index;

    if (currentItem === this.firstRadioButton) {
      this.setCheckedFailCheck(this.lastRadioButton);
    } else {
      index = this.radioButtons.indexOf(currentItem);
      this.setCheckedFailCheck(this.radioButtons[index - 1]);
    }
  }

  setCheckedToNextItemFailCheck(currentItem) {
    var index;

    if (currentItem === this.lastRadioButton) {
      this.setCheckedFailCheck(this.firstRadioButton);
    } else {
      index = this.radioButtons.indexOf(currentItem);
      this.setCheckedFailCheck(this.radioButtons[index + 1]);
    }
  }

  /* EVENT HANDLERS */

  handleKeydown(event) {
    var tgt = event.currentTarget,
      flag = false;

    switch (event.key) {
      case ' ':
      case 'Enter':
        this.setCheckedFailCheck(tgt);
        flag = true;
        break;

      case 'Up':
      case 'ArrowUp':
      case 'Left':
      case 'ArrowLeft':
        this.setCheckedToPreviousItemFailCheck(tgt);
        flag = true;
        break;

      case 'Down':
      case 'ArrowDown':
      case 'Right':
      case 'ArrowRight':
        this.setCheckedToNextItemFailCheck(tgt);
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  handleClick(event) {
    this.setCheckedFailCheck(event.currentTarget);
  }

  handleFocus(event) {
    event.currentTarget.classList.add('focus');
  }

  handleBlur(event) {
    event.currentTarget.classList.remove('focus');
  }
}

// Initialize radio button group
window.addEventListener('load', function () {
  var radiosFailCheck = document.querySelectorAll('.radioExampleFailCheck');
  for (var i = 0; i < radiosFailCheck.length; i++) {
    new RadioGroupFailCheck(radiosFailCheck[i]);
  }
});