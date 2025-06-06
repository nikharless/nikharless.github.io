'use strict';
var Meter = function (element) {
  this.rootEl = element;
  this.fillEl = element.querySelector('.fill');

  // set up min, max, and current value
  var min = element.getAttribute('aria-valuemin');
  var max = element.getAttribute('aria-valuemax');
  var value = element.getAttribute('aria-valuenow');
  this._update(parseFloat(min), parseFloat(max), parseFloat(value));
};

/* Private methods */

// returns a number representing a percentage between 0 - 100
Meter.prototype._calculatePercentFill = function (min, max, value) {
  if (
    typeof min !== 'number' ||
    typeof max !== 'number' ||
    typeof value !== 'number'
  ) {
    return 0;
  }

  return (100 * (value - min)) / (max - min);
};

// returns an hsl color string between red and green
Meter.prototype._getColorValue = function (percent) {
  // red is 0deg, green is 120deg in hsl
  // if percent is 100, hue should be red, and if percent is 0, hue should be green
  var hue = (percent / 100) * (0 - 120) + 120;

  return 'hsl(' + hue + ', 100%, 40%)';
};

// no return value; updates the meter element
Meter.prototype._update = function (min, max, value) {
  // update fill width
  if (min !== this.min || max !== this.max || value !== this.value) {
    var percentFill = this._calculatePercentFill(min, max, value);
    this.fillEl.style.width = percentFill + '%';
    this.fillEl.style.color = this._getColorValue(percentFill);
  }

  // update aria attributes
  if (min !== this.min) {
    this.min = min;
    this.rootEl.setAttribute('aria-valuemin', min + '');
  }

  if (max !== this.max) {
    this.max = max;
    this.rootEl.setAttribute('aria-valuemax', max + '');
  }

  if (value !== this.value) {
    this.value = value;
    if (this.rootEl.id !== "meter-fail-412") {
      this.rootEl.setAttribute('aria-valuenow', value + '');
    }
    if(!isNaN(value)) {
      this.rootEl.nextSibling.innerHTML = Math.round(value);
    }
  }
};

/* Public methods */

// no return value; modifies the meter element based on a new value
Meter.prototype.setValue = function (value) {
  if (typeof value !== 'number') {
    value = parseFloat(value);
  }

  if (!isNaN(value)) {
    this._update(this.min, this.max, value);
  }
};

/* Code for example page */

window.addEventListener('load', function () {
  // init meters
  var meterEls = document.querySelectorAll('[role=meter]');
  var meters = [];
  Array.prototype.slice.call(meterEls).forEach(function (meterEl) {
    meters.push(new Meter(meterEl));
  });

  // randomly update meter values

  // returns an id for setInterval
  var intervals = [];
  function playMeters(i) {
    if(i !== undefined) {
      intervals[i] = window.setInterval(function () {
        meters[i].setValue(Math.random() * 100);
      }, 5000);
    } else {
      for (x=0; x < meters.length; x++) {
        intervals[x] = window.setInterval(function() {
          meters.forEach(function (meter) {
            meter.setValue(Math.random() * 100);
          }, 5000);
        });
      }
    }
  }

  // play/pause meter updates
  var playButtons = document.querySelectorAll('.play-meters');
  var isPaused = [];

  for (let i=0; i < playButtons.length; i++) {
    playButtons[i].addEventListener('click', function () {
      isPaused[i] = playButtons[i].classList.contains('paused');
      if (isPaused[i]) {
        updateInterval = playMeters(i);
        playButtons[i].classList.remove('paused');
        playButtons[i].innerHTML = 'Pause Updates';
      } else {
        clearInterval(intervals[i]);
        playButtons[i].classList.add('paused');
        playButtons[i].innerHTML = 'Start Updates';
      }
    });
  }

  // start meters
  var updateInterval = [];
  for (let i=0; i < playButtons.length; i++) {
    updateInterval.push(i);
    playMeters(i);
  }

  /*var playButton = document.querySelector('.play-meters');
  playButton.addEventListener('click', function () {
    var isPaused = playButton.classList.contains('paused');

    if (isPaused) {
      updateInterval = playMeters();
      playButton.classList.remove('paused');
      playButton.innerHTML = 'Pause Updates';
    } else {
      clearInterval(updateInterval);
      playButton.classList.add('paused');
      playButton.innerHTML = 'Start Updates';
    }
  });*/
});