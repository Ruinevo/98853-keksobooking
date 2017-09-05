'use strict';

(function () {
  var form = document.querySelector('.notice__form');
  var titleField = form.querySelector('.form__title');
  var addressField = form.querySelector('.form__address');
  var priceField = form.querySelector('.form__price');

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
