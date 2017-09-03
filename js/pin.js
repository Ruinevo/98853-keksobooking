'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var fragment = document.createDocumentFragment();
  var nearbyAdsList = document.querySelector('.tokyo__pin-map');
  var offerDialog = document.querySelector('.dialog');

  // функция, отрисовывающая пин на карте
  function renderPin(generatedOffer, idx) {
    var adsElement = document.createElement('div');
    var adsImg = document.createElement('img');
    adsElement.appendChild(adsImg);
    adsElement.classList.add('pin');
    adsElement.style.left = generatedOffer.location.x + 'px';
    adsElement.style.top = generatedOffer.location.y + 'px';
    adsElement.tabIndex = 0;
    adsImg.src = generatedOffer.author.avatar;
    adsImg.classList.add('rounded');
    adsImg.style.width = PIN_WIDTH + 'px';
    adsImg.style.height = PIN_HEIGHT + 'px';
    adsElement.dataset.index = idx;
    return adsElement;
  }

  // вызов функции отрисовки пина
  window.randomOffers.forEach(function (elem, idx) {
    fragment.appendChild(renderPin(elem, idx));
  });
  nearbyAdsList.appendChild(fragment);

  var pins = nearbyAdsList.querySelectorAll('.pin');

  // функция, удаляет класс .pin--active, если он есть
  function deactivateLastPin() {
    pins.forEach(function (elem) {
      if (elem.classList.contains('pin--active')) {
        elem.classList.remove('pin--active');
      }
    });
  }


  // функция открытия карточки жилья
  function openDialog(elem) {
    offerDialog.classList.remove('hidden');
    deactivateLastPin();
    elem.classList.add('pin--active');
    window.renderOffer(window.randomOffers[elem.dataset.index]);
    document.addEventListener('keydown', onDialogEscPress);
  }

  // функция закрытия карточки жилья
  function closeDialog() {
    deactivateLastPin();
    offerDialog.classList.add('hidden');
    document.removeEventListener('keydown', onDialogEscPress);
  }

  // открытие при нажатии мышкой на пин
  pins.forEach(function (elem) {
    if (!elem.classList.contains('pin__main')) {
      elem.addEventListener('click', function () {
        openDialog(elem);
      });
    }
  });

  // открываем popup при помощи enter, когда pin в фокусе
  pins.forEach(function (elem) {
    elem.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        openDialog(elem);
      }
    });
  });

  var closeDialogBtn = offerDialog.querySelector('.dialog__close');

  // закрытие при нажатии на крестик
  closeDialogBtn.addEventListener('click', closeDialog);

  // закрытие при нажатии enter, когда крестик в фокусе
  closeDialogBtn.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeDialog();
    }
  });

  // закрытие при нажатии на ESC
  function onDialogEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeDialog();
    }
  }

})();
