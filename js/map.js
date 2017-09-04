'use strict';

window.map = (function (data, card, pin) {
  var ENTER_KEYCODE = 13;
  // 1. Генерирует данные с помощью модуля data
  // по условию задания, данные создаются в data.js
  var randomOffers = data.generateRandomOffers();
  // 2. C помощью модуля pin отрисовывает данные на карте
  var nearbyAdsList = document.querySelector('.tokyo__pin-map');

  function onPinClick(evt) {
    card.openDialog(evt.currentTarget, randomOffers);
  }

  function onPinEnterPress(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      card.openDialog(evt.currentTarget, randomOffers);
    }
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
      elem.addEventListener('click', onPinClick);
      elem.addEventListener('keydown', onPinEnterPress);
    }
  });

})(window.data, window.card, window.pin);

