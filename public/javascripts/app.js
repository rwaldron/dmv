$(function() {

  var id,
      socket = io.connect(),
      // Cached DOM Queries
      $saved = $("#saved");

  // Bye Bye.
  if ( !window.unprefix.supported.getUserMedia ) {
    $("#obsolete").show();
    return;
  }

  $("#obsolete").hide();

  // Show Photobooth
  DMV.init( "#container", socket );

  $("#take-photo").on( "click", DMV.operator.capture.bind( DMV.operator ) );

  // List Photos

  // `id` initialized at top of scope
  id = localStorage.getItem("dmv-id");

  socket.emit( "list:request", {
    id: id
  }).on( "list:response", function( data ) {
    if ( data.files.length ) {
      data.files.forEach(function( file ) {
        if ( (new RegExp( "^" + id )).test(file) ) {
          // TODO: make some damn templates for this
          // TODO: be less sloppy about this DOM access
          $saved.prepend(
            "<li><a href='/saved/" + file + "' target='_blank'><img src='/saved/" + file + "'></a></li>"
          );
        }
      });
    }
  });
});
