$(function() {

  var supported = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia || navigator.msGetUserMedia;

  // Bye Bye.
  if ( !supported ) {
    $("#obsolete").show();
    return;
  }

  DMV.init( "#container", io.connect() );
});