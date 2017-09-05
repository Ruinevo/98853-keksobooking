'use strict';

window.map = (function (data, card, pin) {
  var ENTER_KEYCODE = 13;
  // 1. Генерирует данные с помощью модуля data
  // по условию задания, данные создаются в data.js
  var randomOffers = data.generateRandomOffers();
  // 2. C помощью модуля pin отрисовывает данные на карте
  var nearbyAdsList = document.querySelector('.tokyo__pin-map');

  function onPinClick(evt) {
    card.openDialog(randomOffers[evt.currentTarget.dataset.index]);
    evt.currentTarget.classList.add('pin--active');
  }


  function onPinEnterPress(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      card.openDialog(randomOffers[evt.currentTarget.dataset.index]);
      evt.currentTarget.classList.add('pin--active');
    }
  }

  var fragment = document.createDocumentFragment();
  randomOffers.forEach(function (elem, idx) {
    fragment.appendChild(pin.renderPin(elem, idx));
  });
  nearbyAdsList.appendChild(fragment);

  // 3. Отрисовывает данные в диалоге с помощью модуля card.js

  card.renderOffer(randomOffers[1]);

  var pins = nearbyAdsList.querySelectorAll('.pin');
  pins.forEach(function (elem) {
    if (!elem.classList.contains('pin__main')) {
      elem.addEventListener('click', onPinClick);
      elem.addEventListener('keydown', onPinEnterPress);
    }
  });

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
      var shift = { // растояние, на которое перемещаем пин
        x: (startCoords.x - moveEvt.clientX),
        y: (startCoords.y - moveEvt.clientY)
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';

      if (startCoords.x >= MAX_COORDS.x && shift.x < 0) {
        pinMain.style.left = MAX_COORDS.x + 'px';
      } else if (startCoords.y >= MAX_COORDS.y && shift.y < 0) {
        pinMain.style.top = MAX_COORDS.y + 'px';
      } else if (startCoords.x <= MIN_COORDS.x && shift.x > 0) {
        pinMain.style.left = MIN_COORDS.x + 'px';
      } else if (startCoords.y <= MIN_COORDS.y && shift.y > 0) {
        pinMain.style.top = MIN_COORDS.y + 'px';
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

})(window.data, window.card, window.pin);


