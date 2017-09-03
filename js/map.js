'use strict';

window.map = (function (data, card, pin) {
  var ENTER_KEYCODE = 13;
  // 1. Генерирует данные с помощью модуля data
  // по условию задания, данные создаются в data.js
  var randomOffers = data.generateRandomOffers(data.initialData);
  // 2. C помощью модуля pin отрисовывает данные на карте
  var nearbyAdsList = document.querySelector('.tokyo__pin-map');

  function onPinClick(elem) {
    elem.addEventListener('click', function () {
        card.openDialog(elem, randomOffers);
      });
  }

  function onPinEnterPress(elem) {
    elem.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
          card.openDialog(elem, randomOffers);
        }
      });
  }

  var fragment = document.createDocumentFragment();
  randomOffers.forEach(function (elem, idx) {
    fragment.appendChild(pin.renderPin(elem, idx));
  });
  nearbyAdsList.appendChild(fragment);

  // 3. Отрисовывает данные в диалоге с помощью модуля card.js

  var pins = nearbyAdsList.querySelectorAll('.pin');

  pins.forEach(function (elem) {
    if (!elem.classList.contains('pin__main')) {
      onPinClick(elem);
      onPinEnterPress(elem);
    }
  });

})(window.data, window.card, window.pin);
