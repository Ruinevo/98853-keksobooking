'use strict';


window.pin = (function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;

  return {

    renderPin: function (generatedOffer, idx) {
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
  };

})();
