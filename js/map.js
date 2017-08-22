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

function getHumanFriendlyType(machine) {
  switch (machine) {
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

function renderPin(generatedOffer) {
  var adsElement = nearbyAdsItem.cloneNode(true);
  adsElement.style.left = generatedOffer.location.x + 'px';
  adsElement.style.top = generatedOffer.location.y + 'px';
  adsElement.querySelector('img').src = generatedOffer.author.avatar;
  return adsElement;
}

var nearbyAdsList = document.querySelector('.tokyo__pin-map');
var nearbyAdsItem = document.querySelector('.pin');
var fragment = document.createDocumentFragment();
var offerDialog = document.querySelector('.dialog');
var dialogDesc = document.querySelector('.dialog__panel');
var dialogTemplate = document.querySelector('#lodge-template').content;

for (i = 0; i < randomOffers.length; i++) {
  fragment.appendChild(renderPin(randomOffers[i]));
}
nearbyAdsList.appendChild(fragment);

function renderOffers(generatedOffer) {
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

for (var i = 0; i < 1; i++) {
  renderOffers(randomOffers[i]);
}
