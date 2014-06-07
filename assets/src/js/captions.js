(function (window) {

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
