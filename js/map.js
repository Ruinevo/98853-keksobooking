'use strict';
var generatorOptions = {
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  TITLES: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
  MIN_PRICE: 1000,
  MAX_PRICE: 100000,
  COUNTS: 8,
  TYPES: ['flat', 'house', 'bungalo'],
  CHECKINS: ['12:00', '13:00', '14:00'],
  CHECKOUTS: ['12:00', '13:00', '14:00']
};

function generateUniqueURL(minAvatarID, maxAvatarID, generatedOffers) {
  var isAvatarUnique = false;
  while (!isAvatarUnique) {
    var randomURL = 'img/avatars/user0' + getRandomRange(minAvatarID, maxAvatarID) + '.png';
    isAvatarUnique = true;
    generatedOffers.forEach(function (elem) {
      if (elem.author.avatar === randomURL) {
        isAvatarUnique = false;
      }
    });
  }
  return randomURL;
}

function renderType() {
  var TYPE_DESC = ['Квартира', 'Бунгало', 'Дом'];
  if (randomOffer[i].offer.type === 'flat') {
    offerDialog.querySelector('.lodge__type').textContent = TYPE_DESC[0];
  } else if (randomOffer[i].offer.type === 'bungalo') {
    offerDialog.querySelector('.lodge__type').textContent = TYPE_DESC[1];
  } else {
    offerDialog.querySelector('.lodge__type').textContent = TYPE_DESC[2];
  }
}

var randomAddress = getRandomRange(300, 900) + ',' + getRandomRange(100, 500);
var randomOffer = [];
function generateRandomOffers(generatorOptions) {
  for (var i = 0; i < generatorOptions.COUNTS; i++) {
    randomOffer[i] = {
      'author': {
        'avatar': generateUniqueURL(1, 8, randomOffer)
      },

      'offer': {
        'title': getRandomFrom(generatorOptions.TITLES),
        'address': randomAddress,
        'price': getRandomRange(1000, 1000000),
        'type': getRandomFrom(generatorOptions.TYPES),
        'rooms': getRandomRange(1, 5),
        'guests': getRandomRange(1, 5),
        'checkin': getRandomFrom(generatorOptions.CHECKINS),
        'checkout': getRandomFrom(generatorOptions.CHECKOUTS),
        'features': getRandomFeatures(),
        'description': '',
        'photos': []
      },

      'location': {
        'x': getRandomRange(300, 900),
        'y': getRandomRange(100, 500),

      }
    };
  }
}

generateRandomOffers(generatorOptions);

function getRandomRange(min, max) {
  return (Math.floor(Math.random() * (max - min + 1)) + min);
}

function getRandomFrom(possibleValues) {
  var randomIndex = Math.floor(Math.random() * possibleValues.length);
  return possibleValues[randomIndex];
}

function getRandomFeatures() {
  var result = [];
  var dirtyFeatures = generatorOptions.FEATURES.slice();
  var randomLength = Math.floor(Math.random() * generatorOptions.FEATURES.length);
  for (var i = 0; i < randomLength; i++) {
    var randomIdx = Math.floor(Math.random() * dirtyFeatures.length);
    result.push(dirtyFeatures[randomIdx]);
    dirtyFeatures.splice(randomIdx, 1);
  }
  return result;
}

function renderPin() {
  var adsElement = nearbyAdsItem.cloneNode(true);
  adsElement.style.left = randomOffer[i].location.x + 'px';
  adsElement.style.top = randomOffer[i].location.y + 'px';
  adsElement.querySelector('img').src = randomOffer[i].author.avatar;
  return adsElement;
}

var nearbyAdsList = document.querySelector('.tokyo__pin-map');
var nearbyAdsItem = document.querySelector('.pin');
var fragment = document.createDocumentFragment();
var offerDialog = document.querySelector('.dialog');
var dialogDesc = document.querySelector('.dialog__panel');
var dialogTemplate = document.querySelector('#lodge-template').content;

for (i = 0; i < randomOffer.length; i++) {
  fragment.appendChild(renderPin(randomOffer[i]));
}
nearbyAdsList.appendChild(fragment);

function renderRandomOffer() {
  offerDialog.replaceChild(dialogTemplate, dialogDesc);
  offerDialog.querySelector('.lodge__title').textContent = randomOffer[i].offer.title;
  offerDialog.querySelector('.lodge__address').textContent = randomOffer[i].offer.address;
  offerDialog.querySelector('.lodge__price').textContent = randomOffer[i].offer.price + '₽/ночь';
  renderType();
  offerDialog.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + randomOffer[i].offer.guests + ' гостей в ' + randomOffer[i].offer.rooms + ' комнатах';
  offerDialog.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + randomOffer[i].offer.checkin + ', выезд до ' + randomOffer[i].offer.checkout;
  randomOffer[i].offer.features.forEach(function (renderElem) {
    offerDialog.querySelector('.lodge__features').insertAdjacentHTML('afterbegin', '<span class="feature__image feature__image--' + renderElem + '">');
  });
  offerDialog.querySelector('.lodge__description').textContent = randomOffer[i].offer.description;
  offerDialog.querySelector('.dialog__title').querySelector('img').src = randomOffer[i].author.avatar;
}

for (var i = 0; i < 1; i++) {
  renderRandomOffer((randomOffer[i]));
}
