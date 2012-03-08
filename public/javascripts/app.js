$(function() {

  var id,
      socket = io.connect(),
      supported = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia || navigator.msGetUserMedia;

  if ( $("#container").length ) {
    // Bye Bye.
    if ( !supported ) {
      $("#obsolete").show();
      return;
    }

    $("#obsolete").hide();

    // Show Photobooth
    DMV.init( "#container", socket );
  } else {
    // List Photos

    // id initialized at top of scope
    id = localStorage.getItem("dmv-id");

    socket.emit( "list:request", {
      id: id
    }).on( "list:response", function( data ) {
      if ( data.files.length ) {
        data.files.forEach(function( file ) {
          if ( (new RegExp("^" + id )).test(file) ) {
            // TODO: make some damn templates for this
            $("#saved").append("<li><a href='" + file + "'><img src='" + file + "'></a></li>");
          }
        });
      }
    });
  }
});
