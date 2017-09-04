'use strict';

window.card = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var offerDialog = document.querySelector('.dialog');
  var closeDialogBtn = offerDialog.querySelector('.dialog__close');
  var dialogTemplateCopy = document.querySelector('#lodge-template').content;
  var TYPE_DESCS = ['Квартира', 'Бунгало', 'Дом'];
  var nearbyAdsList = document.querySelector('.tokyo__pin-map');
  var pins = nearbyAdsList.querySelectorAll('.pin');

  // функция связывает машинный тип жилья с человекочитаемым
  function getHumanFriendlyType(type) {
    switch (type) {
      case 'flat':
        var humanType = TYPE_DESCS[0];
        break;
      case 'bungalo':
        humanType = TYPE_DESCS[1];
        break;
      case 'house':
        humanType = TYPE_DESCS[2];
        break;
    }
    return humanType;
  }

  function deactivateLastPin() {
    pins.forEach(function (elem) {
      if (elem.classList.contains('pin--active')) {
        elem.classList.remove('pin--active');
      }
    });
  }

  // закрытие при нажатии на ESC
  function onDialogEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeDialog();
    }
  }

  function closeDialog() {
    deactivateLastPin();
    offerDialog.classList.add('hidden');
    document.removeEventListener('keydown', onDialogEscPress);
  }

  // закрытие при нажатии на крестик
  closeDialogBtn.addEventListener('click', closeDialog);

  // закрытие при нажатии enter, когда крестик в фокусе
  closeDialogBtn.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeDialog();
    }
  });

  // экспортируем в глобальную область видимости
  return {
    renderOffer: function (generatedOffer) {
      var dialogDesc = document.querySelector('.dialog__panel');
      var dialogTemplate = dialogTemplateCopy.cloneNode(true);
      offerDialog.replaceChild(dialogTemplate, dialogDesc);
      offerDialog.querySelector('.lodge__title').textContent = generatedOffer.offer.title;
      offerDialog.querySelector('.lodge__address').textContent = generatedOffer.offer.address;
      offerDialog.querySelector('.lodge__price').textContent = generatedOffer.offer.price + '₽/ночь';
      offerDialog.querySelector('.lodge__type').textContent = getHumanFriendlyType(generatedOffer.offer.type);
      offerDialog.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + generatedOffer.offer.guests + ' гостей в ' + generatedOffer.offer.rooms + ' комнатах';
      offerDialog.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + generatedOffer.offer.checkin + ', выезд до ' + generatedOffer.offer.checkout;
      generatedOffer.offer.features.forEach(function (renderElem) {
        offerDialog.querySelector('.lodge__features').insertAdjacentHTML('afterbegin', '<span class="feature__image feature__image--' + renderElem + '">');
      });
      offerDialog.querySelector('.lodge__description').textContent = generatedOffer.offer.description;
      offerDialog.querySelector('.dialog__title').querySelector('img').src = generatedOffer.author.avatar;
    },

    openDialog: function (elem, data) {
      offerDialog.classList.remove('hidden');
      deactivateLastPin();
      elem.classList.add('pin--active');
      window.card.renderOffer(data);
      document.addEventListener('keydown', onDialogEscPress);
    },

    closeDialog: closeDialog
  };
})();
