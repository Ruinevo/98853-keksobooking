'use strict';

window.msg = (function () {
  function showMessage(errorMessage) {
    var message = document.querySelector('.message');
    message.textContent = errorMessage;
    message.style.display = 'block';
  }

  return {
    show: showMessage
  };

})();
