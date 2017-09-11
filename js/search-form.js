'use strict';

window.search = (function (map, util) {

  var filtersForm = document.querySelector('.tokyo__filters');
  var housingType = filtersForm.querySelector('#housing_type');
  var housingRooms = filtersForm.querySelector('#housing_room-number');
  var housingGuests = filtersForm.querySelector('#housing_guests-number');
  var housingPrice = filtersForm.querySelector('#housing_price');
  var housingFeatures = filtersForm.querySelectorAll('.feature input');
  function removePins() { // функция, для удаления всех пинов с карты (кроме main pin)
    var pins = document.querySelectorAll('.pin');
    pins.forEach(function (elem) {
      if (!elem.classList.contains('pin__main')) {
        elem.remove();
      }
    });
  }

  var filterOffersByType = function (elem) { // фильтр по типу жилья
    if (housingType.value === 'any') {
      return window.offers;
    } else {
      return elem.offer.type === housingType.value;
    }
  };

  var filterOffersByRoomsCount = function (elem) { // фильтр по количеству комнат
    if (housingRooms.value === 'any') {
      return window.offers;
    } else {
      return elem.offer.rooms === Number(housingRooms.value);
    }
  };

  var filterOffersByPrice = function (elem) { // фильтр по цене
    switch (housingPrice.value) {
      case 'any':
        return window.offers;
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
      return window.offers;
    } else {
      return elem.offer.guests === Number(housingGuests.value);
    }
  };

  var filterOffersByFeatures = function (elem) { // фильтр по features
    var featureCheckedCheckboxes = filtersForm.querySelectorAll('.feature input[type="checkbox"]:checked');
    var checkedFeatures = Array.prototype.map.call(featureCheckedCheckboxes, function (checkbox) {
      return checkbox.value;
    });
    return checkedFeatures.every(function (feature) {
      return elem.offer.features.indexOf(feature) > -1;
    });
  };

  var updatePins = function () { // функция отрисовывает профильтрованные пины
    removePins();
    var filteredData = window.offers.filter(filterOffersByType).filter(filterOffersByPrice).filter(filterOffersByRoomsCount).filter(filterOffersByGuestsCount).filter(filterOffersByFeatures);
    map.render(filteredData);
  };

  var filters = document.querySelectorAll('.tokyo__filter');
  filters.forEach(function (elem) {
    elem.addEventListener('change', function () {
      util.debounce(updatePins);
    });
  });

  housingFeatures.forEach(function (elem) {
    elem.addEventListener('change', function () {
      util.debounce(updatePins);
    });
  });


})(window.map, window.util);

