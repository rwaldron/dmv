$(function() {

  var supported = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia || navigator.msGetUserMedia;

  // Bye Bye.
  if ( !supported ) {
    $("#obsolete").show();
    return;
  }

  $("#obsolete").hide();

  DMV.init( "#container", io.connect() );
});