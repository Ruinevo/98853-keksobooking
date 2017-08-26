'use strict';
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;
var generatorOptions = {
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  TITLES: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
  MIN_PRICE: 1000,
  MAX_PRICE: 100000,
  COUNTS: 8,
  TYPES: ['flat', 'house', 'bungalo'],
  CHECKINS: ['12:00', '13:00', '14:00'],
  CHECKOUTS: ['12:00', '13:00', '14:00'],
  TYPE_DESCS: ['Квартира', 'Бунгало', 'Дом']
};

function generaterandomOffers(options) {
  var randomOffers = [];
  for (var i = 0; i < options.COUNTS; i++) {
    randomOffers[i] = {
      'author': {
        'avatar': generateUniqueURL(1, 8, randomOffers)
      },

      'offer': {
        'title': getRandomFrom(options.TITLES),
        'address': randomAddress,
        'price': getRandomFromRange(1000, 1000000),
        'type': getRandomFrom(options.TYPES),
        'rooms': getRandomFromRange(1, 5),
        'guests': getRandomFromRange(1, 5),
        'checkin': getRandomFrom(options.CHECKINS),
        'checkout': getRandomFrom(options.CHECKOUTS),
        'features': getRandomFeatures(options),
        'description': '',
        'photos': []
      },

      'location': {
        'x': getRandomFromRange(300, 900),
        'y': getRandomFromRange(100, 500),

      }
    };
  }
  return randomOffers;
}

var randomOffers = generaterandomOffers(generatorOptions);

function generateUniqueURL(minAvatarID, maxAvatarID, generatedOffer) {
  var isAvatarUnique = false;
  while (!isAvatarUnique) {
    var randomURL = 'img/avatars/user0' + getRandomFromRange(minAvatarID, maxAvatarID) + '.png';
    isAvatarUnique = true;
    generatedOffer.forEach(function (elem) {
      if (elem.author.avatar === randomURL) {
        isAvatarUnique = false;
      }
    });
  }
  return randomURL;
}

function getHumanFriendlyType(type) {
  switch (type) {
    case 'flat':
      var humanType = generatorOptions.TYPE_DESCS[0];
      break;
    case 'bungalo':
      humanType = generatorOptions.TYPE_DESCS[1];
      break;
    case 'house':
      humanType = generatorOptions.TYPE_DESCS[2];
      break;
  }
  return humanType;

}

var randomAddress = getRandomFromRange(300, 900) + ',' + getRandomFromRange(100, 500);

function getRandomFromRange(min, max) {
  return (Math.floor(Math.random() * (max - min + 1)) + min);
}

function getRandomFrom(possibleValues) {
  var randomIndex = Math.floor(Math.random() * possibleValues.length);
  return possibleValues[randomIndex];
}

function getRandomFeatures(options) {
  var result = [];
  var dirtyFeatures = options.FEATURES.slice();
  var randomLength = Math.floor(Math.random() * options.FEATURES.length);
  for (var i = 0; i < randomLength; i++) {
    var randomIdx = Math.floor(Math.random() * dirtyFeatures.length);
    result.push(dirtyFeatures[randomIdx]);
    dirtyFeatures.splice(randomIdx, 1);
  }
  return result;
}

function renderPin(generatedOffer, idx) {
  var adsElement = nearbyAdsItem.cloneNode(true); // копия дива
  var adsImg = nearbyAdsItemImg.cloneNode(true); // копия img
  adsElement.appendChild(adsImg);
  adsElement.classList.add('pin');
  adsElement.style.left = generatedOffer.location.x + 'px';
  adsElement.style.top = generatedOffer.location.y + 'px';
  adsImg.src = generatedOffer.author.avatar;
  adsImg.classList.add('rounded');
  adsImg.style.width = PIN_WIDTH + 'px';
  adsImg.style.height = PIN_HEIGHT + 'px';
  adsElement.dataset.index = idx;
  return adsElement;
}

var nearbyAdsList = document.querySelector('.tokyo__pin-map');
var nearbyAdsItem = document.createElement('div');
var nearbyAdsItemImg = document.createElement('img');
var fragment = document.createDocumentFragment();
var offerDialog = document.querySelector('.dialog');
var dialogTemplateCopy = document.querySelector('#lodge-template').content;

randomOffers.forEach(function (elem, idx) {
  fragment.appendChild(renderPin(elem, idx));
});
nearbyAdsList.appendChild(fragment);

function renderOffer(generatedOffer) {
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

}

// Задание 11//

var pinActives = nearbyAdsList.querySelectorAll('.pin');
var closeDialogBtn = offerDialog.querySelector('.dialog__close');

function deactivateLastPin() {
  pinActives.forEach(function (elem) {
    if (elem.classList.contains('pin--active')) {
      elem.classList.remove('pin--active');
    }
  });
}

var onDialogEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeDialog();
  }
};

var openDialog = function (elem) { // функция открытия popup
  offerDialog.classList.remove('hidden');
  deactivateLastPin();
  elem.classList.add('pin--active');
  if (!elem.classList.contains('pin__main')) {
    renderOffer(randomOffers[elem.dataset.index]);
  }
  document.addEventListener('keydown', onDialogEscPress);
};

var closeDialog = function () { // функция закрытия popup
  deactivateLastPin();
  offerDialog.classList.add('hidden');
  document.removeEventListener('keydown', onDialogEscPress);
};


pinActives.forEach(function (elem) { // вызываем функцию на каждом элементе массива pinActives при нажатии
  elem.addEventListener('click', function () {
    openDialog(elem);
  });
});

closeDialogBtn.addEventListener('click', closeDialog);

pinActives.forEach(function (elem) { // открываем popup при помощи enter
  elem.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openDialog(elem);
    }
  });
});


closeDialogBtn.addEventListener('keydown', function (evt) { // закрываем popup при помощи enter
  if (evt.keyCode === ENTER_KEYCODE) {
    closeDialog();
  }
});
