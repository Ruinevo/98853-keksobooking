'use strict';

(function () {

  // Универсальная синхронизация значения первого поля и значения второго поля
  // (в нашем проекте используется для синхронизации времени заезда и выезда)

  var form = document.querySelector('.notice__form');
  var timeOutField = form.querySelector('.form__timeout');
  var timeInField = form.querySelector('.form__timein');

  function syncValuesTimeOutAndTimeIn(elem, value) {
    elem.value = value;
  }

  var syncFirstFieldValueAndSecondFieldValue = function (elem1, elem2, callback) {
    if (elem1.value !== elem2.value) {
      callback(elem1, elem2.value);
    }
  };

  timeOutField.addEventListener('change', function () {
    syncFirstFieldValueAndSecondFieldValue(timeInField, timeOutField, syncValuesTimeOutAndTimeIn);
  });

  timeInField.addEventListener('change', function () {
    syncFirstFieldValueAndSecondFieldValue(timeOutField, timeInField, syncValuesTimeOutAndTimeIn);
  });


  // Универсальная односторонняя синхронизация значения первого поля с минимальным значением второго
  // (в нашем проекте используется для синхронизации типа жилья и минимальной цены)

  var typeField = form.querySelector('.form__type');
  var priceField = form.querySelector('.form__price');

  function syncTypeWithPrice(elem, value, data1, data2) {
    switch (value) {
      case data2[0]:
        elem.min = data1[0];
        break;
      case data2[1]:
        elem.min = data1[1];
        break;
      case data2[2]:
        elem.min = data1[2];
        break;
      case data2[3]:
        elem.min = data1[3];
        break;
    }
  }

  var syncFirstFieldValueAndSecondFieldMinValue = function (elem1, elem2, data1, data2, callback) {
    for (var i = 0; i < data1.length; i++) {
      if (elem2.value === data2[i]) {
        if (elem1.min !== data2[i]) {
        callback(elem1, elem2.value, data1, data2);
      }
    }
   }
  };

  typeField.addEventListener('change', function () {
    syncFirstFieldValueAndSecondFieldMinValue(priceField, typeField, [1000, 0, 5000, 10000], ['flat', 'bungalo', 'house', 'palace'], syncTypeWithPrice);
  });

  // синхронизация количества гостей и количества комнат

  var capacityValues = {NO_GUESTS: '0', ONE_GUEST: '1', TWO_GUESTS: '2', THREE_GUESTS: '3'};
  var roomsCountValues = {ONE_ROOM: '1', TWO_ROOMS: '2', THREE_ROOMS: '3', HUNDRED_ROOMS: '100'};
  var roomsCountField = form.querySelector('.form__room_number');
  var capacityField = form.querySelector('.form__capacity');


  function syncRoomsCountWithCapacity(elem, value) {
    switch (value) { /* roomField.value */
      case roomsCountValues.ONE_ROOM:
        elem.value = capacityValues.ONE_GUEST;
        break;
      case roomsCountValues.HUNDRED_ROOMS:
        elem.value = capacityValues.NO_GUESTS;
        break;
      default:
        if (Number(elem.value) > Number(value) || Number(elem.value) === Number(capacityValues.NO_GUESTS)) {
          elem.value = capacityValues.ONE_GUEST;
        }
    }
  }

  function syncCapacityWithRoomCount(elem, value) {
    switch (value) { /* capacity.value */
      case capacityValues.NO_GUESTS:
        elem.value = roomsCountValues.HUNDRED_ROOMS;
        break;
      default:
        if (Number(elem.value) < Number(value) || Number(elem.value) === Number(roomsCountValues.HUNDRED_ROOMS)) {
          elem.value = value;
        }
    }
  }

  roomsCountField.addEventListener('change', function () {
    syncFirstFieldValueAndSecondFieldValue(capacityField, roomsCountField, syncRoomsCountWithCapacity);
  });

  capacityField.addEventListener('change', function () {
    syncFirstFieldValueAndSecondFieldValue(roomsCountField, capacityField, syncCapacityWithRoomCount);
  });

  return {
    // функция (элемент1, элемент2, калбэк функция)
    syncTwoFieldsValue: syncFirstFieldValueAndSecondFieldValue,
    // функция (элемент1, элемент2, массив данных элемента1б массив данных элемента2, калбэк функция)
    syncValAndMinVal: syncFirstFieldValueAndSecondFieldMinValue
  };


})();
