'use strict';

window.util = (function () {
  var DEBOUNCE_INTERVAL = 500;

  var debounce = function (fun) {
    var lastTimeout = null;
    return function () {
      if (lastTimeout !== null) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(fun, DEBOUNCE_INTERVAL);
    };
  };

  return {
    debounce: debounce
  };
})();

