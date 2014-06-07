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


;(function (window) {

  'use strict';

  // grab images with title attribuets and inject caption paragraph elements for them.
  function init() {
    var images = document.querySelectorAll('img[title]');
    images = Array.prototype.slice.call(images);

    images.forEach(function (image) {
      var p = image.parentNode;
      var caption = document.createElement('p');
      caption.classList.add('caption');
      caption.innerHTML = image.title;
      p.parentNode.insertBefore(caption, p.nextSibling);
    });

  }

  // dom ready: do it!
  document.addEventListener('DOMContentLoaded', function (event) {
    init();
  });

})(window);
