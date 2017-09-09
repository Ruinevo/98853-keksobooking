'use strict';

window.msg = (function () {
  function showMessage(errorMessage) {
    var message = document.querySelector('.message');
    message.textContent = errorMessage;
    message.style.display = 'block';
    setTimeout(function () {
      message.style.display = 'none';
    }, 1500);
  }

  return {
    show: showMessage
  };

})();
