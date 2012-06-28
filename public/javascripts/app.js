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

  $("#take-photo").on( "click", function() {
    DMV.operator.capture(function( dataURI ) {
      $saved.prepend(
        [
          "<li><a href='" + dataURI + "' target='_blank'>",
          "<img src='" + dataURI + "'></a></li>"
        ].join("")
      );
    });
  });

  // List Photos

  // `id` initialized at top of scope
  id = localStorage.getItem("dmv-id");

  socket.emit( "list:request", {
    id: id
  }).on( "list:response", function( data ) {
    var url;

    if ( data.files.length ) {
      data.files.forEach(function( file ) {
        // TODO: make some damn templates for this
        // TODO: be less sloppy about this DOM access
        url = data.path + file;

        $saved.children(":first").remove();
        $saved.prepend(
          [
            "<li><a href='" + url + "' target='_blank'>",
            "<img src='" + url + "'></a></li>"
          ].join("")
        );
      });
    }
  });
});
