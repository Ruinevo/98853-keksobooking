'use strict';

window.msg = (function () {
  var TIMEOUT_MSG = 1500;
  function showMessage(errorMessage) {
    var message = document.querySelector('.message');
    message.textContent = errorMessage;
    message.style.display = 'block';
    setTimeout(function () {
      message.style.display = 'none';
    }, TIMEOUT_MSG);
  }

  return {
    show: showMessage
  };

})();
