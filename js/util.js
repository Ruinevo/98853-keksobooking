'use strict';

window.util = (function () {
  var DEBOUNCE_INTERVAL = 500;

  function debounce(fn) {
    var lastTimeout = null;
    return function () {
      if (lastTimeout !== null) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(fn, DEBOUNCE_INTERVAL);
    };
  }

  return {
    debounce: debounce
  };
})();

