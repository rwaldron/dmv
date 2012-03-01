var express = require("express"),
    socket = require("socket.io"),
    fs = require("fs");

var app = express.createServer(),
    io = socket.listen( app ),
    portInUse;

// Express app Configuration
app.configure(function() {
  // Uses Express defaults
  app.set( "views", __dirname + "/views" );
  app.set( "view engine", "jade" );
  app.use( express.bodyParser() );
  app.use( express.methodOverride() );
  app.use( app.router );
  app.use( express.static(__dirname + "/public") );
});

// Routes
app.get( "/", function( req, res ) {
  res.render( "index", {
    title: "DMV"
  });
});

app.get( "/saved", function( req, res ) {
  res.render( "saved", {
    title: "DMV"
  });
});


// Connection Pool
var connections = {
  // uid: object
};

io.set( "log level", 1 );
// When socket is connected, initialize new unit in dmv,
// begin relay of WebRTC captures
io.sockets.on( "connection", function( client ) {

  // Receive "init" events for new units,
  // dispatch "initialized" with any instructions
  client.on( "init", function( data ) {
    // Contains a connection uid to add to the pool
    // console.log( data );

    connections[ data.id ] = true;

    // Emit "initialized" notice to all other connections,
    // Will create new unit and output canvas
    io.sockets.emit( "initialized", data );
  });

  client.on( "capture", function( data ) {

    var file, buffer,
        filepath = "public/saved/" + data.id + "-" + Date.now() + ".png";

    // Create a buffer from the base64 encoded string
    buffer = new Buffer( data.captured.replace(/^data:image\/\w+;base64,/, ""), "base64" );

    // Save to new image file
    file = fs.openSync( filepath, "w+" );

    // Output regenerated, compressed code
    fs.write( file, buffer, 0, buffer.length, 0, function( err, data ) {
      if ( err == null ) {
        console.log( "Saved: http://localhost:" + portInUse + "/" + filepath );
      }
    });
  });


  client.on( "list:request", function( data ) {

    var list = [],
        id = data.id,
        filepath = "public/saved/";

    fs.readdir( filepath, function( err, files ) {
      files.forEach(function( file, index ) {

        if ( (new RegExp("^" + id )).test(file) ) {
          list.push( file );

          // Every 5th image, send to client and reset the list
          if ( index % 5 === 0 ) {
            toClient( list );

            list = [];
          }
        }
      });
    });
  });

  function toClient( list ) {
    client.emit( "list:response", {
      files: list
    });
  }
});





app.listen(3000);
portInUse = app.address().port;

console.log("Express server listening on port %d in %s mode", portInUse, app.settings.env);
