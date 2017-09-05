'use strict';

(function () {
  var capacityValues = {NO_GUESTS: '0', ONE_GUEST: '1', TWO_GUESTS: '2', THREE_GUESTS: '3'};
  var roomsValues = {ONE_ROOM: '1', TWO_ROOMS: '2', THREE_ROOMS: '3', HUNDRED_ROOMS: '100'};
  var form = document.querySelector('.notice__form');
  var titleField = form.querySelector('.form__title');
  var timeInField = form.querySelector('.form__timein');
  var timeOutField = form.querySelector('.form__timeout');
  var roomsCountField = form.querySelector('.form__room_number');
  var addressField = form.querySelector('.form__address');
  var typeField = form.querySelector('.form__type');
  var priceField = form.querySelector('.form__price');
  var capacityField = form.querySelector('.form__capacity');


  // синхронизация времени заезда и выезда
  timeInField.addEventListener('change', function () {
    timeOutField.selectedIndex = timeInField.selectedIndex;
  });


  // синхронизация времени выезда и заезда
  timeOutField.addEventListener('change', function () {
    timeInField.selectedIndex = timeOutField.selectedIndex;
  });

  // синхронизация минимальной цены и типа жилья
  function syncTypeWithPrice() {
    switch (typeField.selectedIndex) {
      case 0:
        priceField.min = 1000;
        break;
      case 1:
        priceField.min = 0;
        break;
      case 2:
        priceField.min = 5000;
        break;
      case 3:
        priceField.min = 10000;
        break;
    }
  }

  form.addEventListener('change', syncTypeWithPrice);

  // синхрониазция количества комнат и количества гостей
  function syncRoomsCountWithCapacity() {
    switch (roomsCountField.value) {
      case roomsValues.ONE_ROOM:
        capacityField.value = capacityValues.ONE_GUEST;
        break;
      case roomsValues.HUNDRED_ROOMS:
        capacityField.value = capacityValues.NO_GUESTS;
        break;
      default:
        if (Number(capacityField.value) > Number(roomsCountField.value) || Number(capacityField.value) === Number(capacityValues.NO_GUESTS)) {
          capacityField.value = capacityValues.ONE_GUEST;
        }
    }
  }

  // синхрониазция количества гостей и количества комнат
  function syncCapacityWithRoom() {
    switch (capacityField.value) {
      case capacityValues.NO_GUESTS:
        roomsCountField.value = roomsValues.HUNDRED_ROOMS;
        break;
      default:
        if (Number(roomsCountField.value) < Number(capacityField.value) || Number(roomsCountField.value) === Number(roomsValues.HUNDRED_ROOMS)) {
          roomsCountField.value = capacityField.value;
        }
    }
  }

  roomsCountField.addEventListener('change', syncRoomsCountWithCapacity);
  capacityField.addEventListener('change', syncCapacityWithRoom);


  // функция удаляет красную подсвтеку невалидного поля
  function removeErrorHighlight(evt) {
    evt.target.classList.remove('invalid');
    evt.target.removeEventListener('input', removeErrorHighlight);
  }


  // функция проверяет поля на валидность, и добавляет классную подсветку невалидным полям
  form.addEventListener('submit', function (evt) {
    if (addressField.value === '') {
      evt.preventDefault();
      addressField.classList.add('invalid');
    }
    if (titleField.value.length < 30 || titleField.value.length > 100) {
      evt.preventDefault();
      titleField.classList.add('invalid');
    }
    if (priceField.value < priceField.min) {
      evt.preventDefault();
      priceField.classList.add('invalid');
    }
    var invalidFields = form.querySelectorAll('.invalid');
    invalidFields.forEach(function (elem) {
      elem.addEventListener('input', removeErrorHighlight);
    });
  });
})();


