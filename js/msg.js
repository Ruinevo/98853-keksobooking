'use strict';

window.msg = (function () {
  function showMessage(errorMessage) {
    var body = document.querySelector('body');
    var message = document.querySelector('#message').content;
    var messageCopy = message.cloneNode(true);
    messageCopy.querySelector('.message__div').textContent = errorMessage;
    var fragment = document.createDocumentFragment();
    fragment.appendChild(messageCopy);
    body.appendChild(fragment);
  }

  return {
    show: showMessage
  };

})();
