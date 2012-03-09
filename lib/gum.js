/* gum - v0.1.0 - 3/08/2012
* https://github.com/rwldrn/dmv (gum)
* Copyright (c) 2012 Rick Waldron <waldron.rick@gmail.com>; Licensed MIT */
(function( window, navigator ) {
  // 2012-03-08 Inspired by https://gist.github.com/f2ac64ed7fc467ccdfe3

  // If unprefix.js is available, use it.
  // https://github.com/rwldrn/unprefix.js
  // Otherwise...
  if ( !window.unprefix ) {
    // Thanks to Mike Taylr for typing this
    // https://gist.github.com/f2ac64ed7fc467ccdfe3
    // normalize window.URL
    if ( !window.URL ) {
      window.URL = window.webkitURL || window.msURL || window.oURL;
    }
    // normalize navigator.getUserMedia
    if ( !navigator.getUserMedia ) {
      navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    }
  }

  var spec = true,
      getUserMedia = navigator.getUserMedia;

  try {
    navigator.getUserMedia({ video: true, audio: true }, function() {});
  } catch(e) {
    spec = false;
  }

  navigator.getUserMedia = function( opts, callback, errback ) {
    var options = opts,
        // Create guard against bogus options
        safe = { video: 1, audio: 1 };

    if ( !spec ) {
      options = Object.keys( opts ).filter(function( key ) {
        return this[ key ] && safe[ key ];
      }, opts ).join(",");
    }

    getUserMedia.call( navigator, options, function( stream ) {
      //  Standard stream
      if ( stream.label && stream.readyState === 1 ) {
        stream = window.URL.createObjectURL( stream );
      }

      callback( stream );
    }, errback || function() {});
  };

  window.navigator = navigator;

} (typeof window === "object" && window || this, this.navigator || {} ) );
