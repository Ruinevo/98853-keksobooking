'use strict';

window.map = (function (card, pin, backend) {
  var ENTER_KEYCODE = 13;
  var nearbyAdsList = document.querySelector('.tokyo__pin-map');

  function deactivateLastPin() {
    window.pins.forEach(function (elem) {
      if (elem.classList.contains('pin--active')) {
        elem.classList.remove('pin--active');
      }
    });
  }

  function onPinClick(evt, data) {
    card.showCard(data[evt.currentTarget.dataset.index]);
    deactivateLastPin();
    evt.currentTarget.classList.add('pin--active');
  }


  function onPinEnterPress(evt, data) {
    if (evt.keyCode === ENTER_KEYCODE) {
      card.showCard(data[evt.currentTarget.dataset.index]);
      deactivateLastPin();
      evt.currentTarget.classList.add('pin--active');
    }
  }
  var successHandler = function (data) {
    var fragment = document.createDocumentFragment();

    data.forEach(function (elem, idx) {
      fragment.appendChild(pin.renderPin(elem, idx));
    });

    nearbyAdsList.appendChild(fragment);

    window.pins = nearbyAdsList.querySelectorAll('.pin');

    window.pins.forEach(function (elem) {
      if (!elem.classList.contains('pin__main')) {
        elem.addEventListener('click', function (evt) {
          onPinClick(evt, data);
        });
        elem.addEventListener('keydown', function (evt) {
          onPinEnterPress(evt, data);
        });
      }
    });
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style.zIndex = '100';
    node.style.margin = '0 auto';
    node.style.textAlign = 'center';
    node.style.padding = '15px';
    node.style.position = 'absolute';
    node.style.backgroundColor = 'rgba(124, 213, 225, 0.5)';
    node.style.width = '400px';
    node.style.boxShadow = '0 0 4px rgba(0,0,0,0.5)';
    node.style.left = 0;
    node.style.right = 0;
    node.style.top = '100px';
    node.style.fontSize = '22px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  backend.load(successHandler, errorHandler);

  // Задание 16

  var USER_ICON_OFFSETS = {
    left: 37,
    top: 94
  };

  var MIN_COORDS = {
    x: 0,
    y: 100
  };

  var MAX_COORDS = {
    x: 1150,
    y: 570
  };

  var pinMain = document.querySelector('.pin__main');
  var addressField = document.querySelector('.form__address');

  pinMain.addEventListener('mousedown', function (evt) { // кнопку мыши нажали

    evt.preventDefault();
    var startCoords = { // координаты во время клика
      x: evt.clientX,
      y: evt.clientY
    };


    var onMouseMove = function (moveEvt) { // функция передвижения мыши
      moveEvt.preventDefault();
      var shift = {
        x: (startCoords.x - moveEvt.clientX),
        y: (startCoords.y - moveEvt.clientY)
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';

      if (pinMain.offsetLeft >= MAX_COORDS.x && shift.x < 0) {
        pinMain.style.left = MAX_COORDS.x + 'px';
      } else if (pinMain.offsetTop >= MAX_COORDS.y && shift.y < 0) {
        pinMain.style.top = MAX_COORDS.y + 'px';
      } else if (pinMain.offsetLeft <= MIN_COORDS.x && shift.x > 0) {
        pinMain.style.left = MIN_COORDS.x + 'px';
      } else if (pinMain.offsetTop <= MIN_COORDS.y && shift.y > 0) {
        pinMain.style.top = MIN_COORDS.y + 'px';
      } else {
        addressField.classList.remove('invalid');
      }
    };

    var onMouseUp = function (upEvt) { // кнопку мыши отпустили
      upEvt.preventDefault();
      addressField.value = 'x:' + (pinMain.offsetLeft + USER_ICON_OFFSETS.left) + ', y:' + (pinMain.offsetTop + USER_ICON_OFFSETS.top);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  return {
    deactivateLastPin: deactivateLastPin,
    errorHandler: errorHandler
  };

})(window.card, window.pin, window.backend);

