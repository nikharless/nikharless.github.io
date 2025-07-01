'use strict';

var Gauge = function (element) {
	this.rootEl = element;
	this.dial = element.querySelector('.dial .inner');
	this.gaugeValue = element.querySelector('.gauge .value');

	// set up min, max, and current value
  	var min = element.getAttribute('aria-valuemin');
  	var max = element.getAttribute('aria-valuemax');
  	var value = element.getAttribute('aria-valuenow');
  	this._rotateDial(parseFloat(min), parseFloat(max), parseFloat(value));
};

/* Private methods */

Gauge.prototype._rotateDial = function(min, max, value) {
	var deg = 0;
	var value = Math.round(Math.random()*100);
	deg = (value * 177.5) / 100;

	this.gauge_value.html(value + "%");

	this.dial.css({'transform': 'rotate('+deg+'deg)'});
	this.dial.css({'-ms-transform': 'rotate('+deg+'deg)'});
	this.dial.css({'-moz-transform': 'rotate('+deg+'deg)'});
	this.dial.css({'-o-transform': 'rotate('+deg+'deg)'}); 
	this.dial.css({'-webkit-transform': 'rotate('+deg+'deg)'});

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
  	}
};

/* Code for example page */

window.addEventListener('load', function () {
  // init meters
  var gaugeEls = document.querySelectorAll('.gauge');
  var gauges = [];
  Array.prototype.slice.call(gaugeEls).forEach(function (gaugeEl) {
    gauges.push(new Gauge(gaugeEl));
  });

  // randomly update meter values

  // returns an id for setInterval
  var intervals = [];
  function playGauges(i) {
    if(i !== undefined) {
      intervals[i] = window.setInterval(function () {
        gauges[i].setValue(Math.random() * 100);
      }, 5000);
    } else {
      for (x=0; x < gauges.length; x++) {
        intervals[x] = window.setInterval(function() {
          gauges.forEach(function (gauge) {
            gauge.setValue(Math.random() * 100);
          }, 5000);
        });
      }
    }
  }

  // play/pause gauge updates
  var playButtons = document.querySelectorAll('.play-gauge');
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

  // start gauges
  var updateInterval = [];
  for (let i=0; i < playButtons.length; i++) {
    updateInterval.push(i);
    playGauges(i);
  }
});