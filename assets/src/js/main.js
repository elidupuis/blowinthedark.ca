(function (window, $, undefined) {

  'use strict';

  var site

  function log() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift('[BLOW-IN-THE-DARK-GLASSWORKS]');

    if (window.console) { console.log.apply(console, args); }
  }

  // define DOB base object and expose it to the global namespace
  function init() {
    site = window.SITE || {};
    site.log = log;
    site.name = 'Blow in the Dark Glassworks';
    window.SITE = site || {}
  }


  // dom ready: do it!
  document.addEventListener('DOMContentLoaded', function (event) {
    init();
  });

})(window, window.jQuery || window.Zepto);
