'use strict';

window.render = (function (backend, card, pin, msg, util) {
  var nearbyAdsList = document.querySelector('.tokyo__pin-map');
  var ENTER_KEYCODE = 13;
  var offers = [];

  function deactivateLastPin() {
    var pins = nearbyAdsList.querySelectorAll('.pin');
    pins.forEach(function (elem) {
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

  var filtersForm = document.querySelector('.tokyo__filters');
  var housingType = filtersForm.querySelector('#housing_type');
  var housingRooms = filtersForm.querySelector('#housing_room-number');
  var housingGuests = filtersForm.querySelector('#housing_guests-number');
  var housingPrice = filtersForm.querySelector('#housing_price');
  var housingFeatures = filtersForm.querySelectorAll('.checkbox');

  function removePins() { // функция, для удаления всех пинов с карты (кроме main pin)
    var pins = document.querySelectorAll('.pin');
    pins.forEach(function (elem) {
      if (!elem.classList.contains('pin__main')) {
        elem.remove();
      }
    });
  }

  function render(data) { // отрисовывем пины
    var fragment = document.createDocumentFragment();
    data.forEach(function (elem, idx) {
      fragment.appendChild(pin.renderPin(elem, idx));
    });
    nearbyAdsList.appendChild(fragment);
    var pins = nearbyAdsList.querySelectorAll('.pin');
    pins.forEach(function (elem) {
      if (!elem.classList.contains('pin__main')) {
        elem.addEventListener('click', function (evt) {
          onPinClick(evt, data);
        });
        elem.addEventListener('keydown', function (evt) {
          onPinEnterPress(evt, data);
        });
      }
    });
  }

  var filterOffersByType = function (elem) { // фильтр по типу жилья
    if (housingType.value === 'any') {
      return offers;
    } else {
      return elem.offer.type === housingType.value;
    }
  };

  var filterOffersByRoomsCount = function (elem) { // фильтр по количеству комнат
    if (housingRooms.value === 'any') {
      return offers;
    } else {
      return elem.offer.rooms === Number(housingRooms.value);
    }
  };

  var filterOffersByPrice = function (elem) {
    switch (housingPrice.value) {
      case 'any':
        return offers;
      case 'middle':
        return elem.offer.price >= 10000 && elem.offer.price <= 50000;
      case 'low':
        return elem.offer.price < 10000;
      case 'high':
        return elem.offer.price > 50000;
      default:
        return false;
    }
  };


  var filterOffersByGuestsCount = function (elem) { // фильтр по количеству гостей
    if (housingGuests.value === 'any') {
      return offers;
    } else {
      return elem.offer.guests === Number(housingGuests.value);
    }
  };

  var filterOffersByFeatures = function (elem) { // фильтр по features
    var featureCheckedCheckboxes = filtersForm.querySelectorAll('.feature input[type="checkbox"]:checked');
    var checkedFeatures = Array.prototype.map.call(featureCheckedCheckboxes, function (checkbox) {
      return checkbox.value;
    });
    if (checkedFeatures.every(function (feature) {
      return elem.offer.features.indexOf(feature) > -1;
    })) {
      return elem;
    } else {
      return false;
    }
  };

  var updatePins = function () { // функция отрисовывает профильтрованные пины
    removePins();
    var filteredData = offers.filter(filterOffersByType).filter(filterOffersByPrice).filter(filterOffersByRoomsCount).filter(filterOffersByGuestsCount).filter(filterOffersByFeatures);
    render(filteredData);
  };

  var filters = document.querySelectorAll('.tokyo__filter');
  filters.forEach(function () {
    addEventListener('change', function () {
      util.debounce(updatePins);
    });
  });

  housingFeatures.forEach(function () {
    addEventListener('change', function () {
      util.debounce(updatePins);
    });
  });

  var successHandler = function (data) {
    offers = data;
    render(offers);
  };

  backend.load(successHandler, msg.show);

})(window.backend, window.card, window.pin, window.msg, window.util);
