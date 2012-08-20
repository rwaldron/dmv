/*! Navigator Getusermedia - v0.1.0 - 8/20/2012
* https://github.com/rwldrn/navigator.getusermedia
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

  var getUserMedia = navigator.getUserMedia;

  navigator.getUserMedia = function( opts, callback, errback ) {
    // var options, keys;

    // options = opts;
    // keys = Object.keys(opts).join(",");

    // // Opera's implementation looks for a string, so give it one!
    // options.toString = function() {
    //   // { video: true } => "video"
    //   // { video: true, audio: true } => "video,audio"
    //   return keys;
    // };

    getUserMedia.call( navigator, opts, function( raw ) {
      var stream;

      // If the stream is raw (ie. Canary), cook it.
      if ( raw.label && raw.readyState === 1 ) {
        stream = window.URL.createObjectURL( raw );
      }

      // This is non-standard, but feels like a
      // "nice to have" way to handle the mixed-matched
      // implementations of stream params.
      // This will be removed when the implementations
      // are updated.
      callback( raw, /* non-standard */ stream );
    }, errback || function() {});
  };

} (typeof window === "object" && window || this, this.navigator || {} ) );
