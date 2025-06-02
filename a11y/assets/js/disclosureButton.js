/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   File:   disclosure-button.js
 *
 *   Desc:   Disclosure button widget that implements ARIA Authoring Best Practices
 */

'use strict';

/*
 *   @constructorDisclosureButton
 *
 *
 */
class DisclosureButton {
  constructor(buttonNode) {
    this.buttonNode = buttonNode;
    this.controlledNode = false;

    var id = this.buttonNode.getAttribute('aria-controls');

    if (id) {
      this.controlledNode = document.getElementById(id);
    }

    if (this.buttonNode.getAttribute('id') !== 'disclosure_faqf') {
      this.buttonNode.setAttribute('aria-expanded', 'false');
    }
    this.hideContent();

    this.buttonNode.addEventListener('click', this.onClick.bind(this));
    this.buttonNode.addEventListener('focus', this.onFocus.bind(this));
    this.buttonNode.addEventListener('blur', this.onBlur.bind(this));
  }

  showContent() {
    if (this.controlledNode) {
      this.controlledNode.style.display = 'block';
    }
  }

  hideContent() {
    if (this.controlledNode) {
      this.controlledNode.style.display = 'none';
    }
  }

  toggleExpand() {
    if (this.buttonNode.getAttribute('aria-expanded') === 'true') {
      this.buttonNode.setAttribute('aria-expanded', 'false');
      this.hideContent();
    } else if (this.buttonNode.getAttribute('aria-expanded') === 'false') {
      this.buttonNode.setAttribute('aria-expanded', 'true');
      this.showContent();
    }
  }

  /* EVENT HANDLERS */

  onClick() {
    this.toggleExpand();
  }

  onFocus() {
    this.buttonNode.classList.add('focus');
  }

  onBlur() {
    this.buttonNode.classList.remove('focus');
  }
}

/* Initialize Hide/Show Buttons */

window.addEventListener(
  'load',
  function () {
    var buttons = document.querySelectorAll(
      // 'button[aria-expanded][aria-controls]'
      '#disclosure_faq'
    );

    for (var i = 0; i < buttons.length; i++) {
      new DisclosureButton(buttons[i]);
    }
  },
  false
);

if (document.getElementById('disclosure_faq2')) {
  window.addEventListener(
    'load',
    function () {
      var buttons = document.querySelectorAll(
        // 'button[aria-expanded][aria-controls]'
        '#disclosure_faq2'
      );

      for (var i = 0; i < buttons.length; i++) {
        new DisclosureButton(buttons[i]);
      }
    },
    false
  );
}

if (document.getElementById('disclosure_faqf')) {
  window.addEventListener(
    'load',
    function () {
      var buttons = document.querySelectorAll(
        // 'button[aria-expanded][aria-controls]'
        '#disclosure_faqf'
      );

      for (var i = 0; i < buttons.length; i++) {
        new DisclosureButton(buttons[i]);
      }
    },
    false
  );
}