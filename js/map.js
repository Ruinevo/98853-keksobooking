'use strict';
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

function generateUniqueURL(minAvatarID, maxAvatarID, generatedOffers) {
  var isAvatarUnique = false;
  while (!isAvatarUnique) {
    var randomURL = 'img/avatars/user0' + getRandomFromRange(minAvatarID, maxAvatarID) + '.png';
    isAvatarUnique = true;
    generatedOffers.forEach(function (elem) {
      if (elem.author.avatar === randomURL) {
        isAvatarUnique = false;
      }
    });
  }
  return randomURL;
}

function renderType(generatedOffers) {
  if (generatedOffers.offer.type === 'flat') {
    offerDialog.querySelector('.lodge__type').textContent = generatorOptions.TYPE_DESCS[0];
  } else if (generatedOffers.offer.type === 'bungalo') {
    offerDialog.querySelector('.lodge__type').textContent = generatorOptions.TYPE_DESCS[1];
  } else {
    offerDialog.querySelector('.lodge__type').textContent = generatorOptions.TYPE_DESCS[2];
  }
}

var randomAddress = getRandomFromRange(300, 900) + ',' + getRandomFromRange(100, 500);

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

var randomOffersArr = generaterandomOffers(generatorOptions);


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

function renderPin(generatedOffers) {
  var adsElement = nearbyAdsItem.cloneNode(true);
  adsElement.style.left = generatedOffers.location.x + 'px';
  adsElement.style.top = generatedOffers.location.y + 'px';
  adsElement.querySelector('img').src = generatedOffers.author.avatar;
  return adsElement;
}

var nearbyAdsList = document.querySelector('.tokyo__pin-map');
var nearbyAdsItem = document.querySelector('.pin');
var fragment = document.createDocumentFragment();
var offerDialog = document.querySelector('.dialog');
var dialogDesc = document.querySelector('.dialog__panel');
var dialogTemplate = document.querySelector('#lodge-template').content;

for (i = 0; i < randomOffersArr.length; i++) {
  fragment.appendChild(renderPin(randomOffersArr[i]));
}
nearbyAdsList.appendChild(fragment);

function renderrandomOffers(generatedOffers) {
  offerDialog.replaceChild(dialogTemplate, dialogDesc);
  offerDialog.querySelector('.lodge__title').textContent = generatedOffers.offer.title;
  offerDialog.querySelector('.lodge__address').textContent = generatedOffers.offer.address;
  offerDialog.querySelector('.lodge__price').textContent = generatedOffers.offer.price + '₽/ночь';
  renderType(generatedOffers);
  offerDialog.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + generatedOffers.offer.guests + ' гостей в ' + generatedOffers.offer.rooms + ' комнатах';
  offerDialog.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + generatedOffers.offer.checkin + ', выезд до ' + generatedOffers.offer.checkout;
  generatedOffers.offer.features.forEach(function (renderElem) {
    offerDialog.querySelector('.lodge__features').insertAdjacentHTML('afterbegin', '<span class="feature__image feature__image--' + renderElem + '">');
  });
  offerDialog.querySelector('.lodge__description').textContent = generatedOffers.offer.description;
  offerDialog.querySelector('.dialog__title').querySelector('img').src = generatedOffers.author.avatar;
}

for (var i = 0; i < 1; i++) {
  renderrandomOffers(randomOffersArr[i]);
}
