/*! dmv - v0.1.0 - 2/28/2012
* https://github.com/rwldrn/dmv
* Copyright (c) 2012 Rick Waldron <waldron.rick@gmail.com>; Licensed MIT */

/*! dmv - v0.1.0 - 2/5/2012
* https://github.com/rwldrn/dmv
* Copyright (c) 2012 Rick Waldron <waldron.rick@gmail.com>; Licensed MIT */

(function( exports ) {

var // Localize navigator for use within getUserMedia
  navigator = exports.navigator,

  // Create a reasonable getUserMedia shim that covers support for the two existing
  // getUserMedia implementations. Thanks to Mike Taylr's http://miketaylr.com/photobooth/
  // for helping to outline proper Opera support
  getUserMedia = function( callback ) {
    var getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia,
        media = navigator.getUserMedia ? { video: true, audio: true } : "video audio";

    getMedia.call( navigator, media, function( data ) {
      var stream = window.webkitURL ? window.webkitURL.createObjectURL( data ) : data;

      callback( stream );
    });
  },

  // Program initializers
  Operator, DMV;

  // ---- Program ---- //

  // Operator Constructor
  Operator = function( id, socket ) {

    this.id = id;

    // This Operator's video
    this.media = Operator.fixture( "video", this.id );

    // This Operator's canvas
    this.canvas = Operator.fixture( "canvas", this.id );
    this.context = this.canvas.getContext("2d");

    this.socket = socket;

    // Store datauri's received from stream
    this.dataUri = "";

    getUserMedia(function( stream ) {
      // Attach user media stream to video container source
      this.media.src = stream;

      // When video signals that it has loadedmetadata, begin "playing"
      this.media.addEventListener( "loadedmetadata", function() {
        this.media.play();
      }.bind(this), false);

      this.media.addEventListener( "timeupdate", function() {
        this.draw();
      }.bind(this), false);

    }.bind(this));
  };

  Operator.prototype.draw = function() {
    // Draw current video frame to the canvas
    this.context.drawImage( this.media, 0, 0, this.canvas.width, this.canvas.height );
  };

  Operator.prototype.capture = function() {
    var capture = this.canvas.toDataURL();
    //   ,
    //     image = document.querySelector( "#i_" + this.id );
    //
    // if ( !image ) {
    //   image = Operator.fixture( "img", this.id );
    // }
    //
    // image.src = capture;

    // Dispatch a "capture" event to the socket
    this.socket.emit( "capture", {
      id: this.id,
      captured: this.canvas.toDataURL()
    });
  };

  // Static Operator functions
  // Operator.id()
  // Returns a pretty damn unique id
  Operator.id = function() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function( chr ) {
      var rnd = Math.random() * 16 | 0;
      return ( chr === "x" ? rnd : (rnd & 0x3 | 0x8) ).toString( 16 );
    }).toUpperCase();
  };

  // Create an HTML element fixture
  Operator.fixture = function( nodeName, id ) {
    var container = document.querySelector("#container"),
        node = document.createElement( nodeName ),
        other;

    node.id = nodeName[0] + "_" + id;

    // console.log( nodeName, window.innerWidth, window.innerHeight );

    node.style.width = window.innerWidth + "px";// "320px";
    // // node.style.height = window.innerHeight + "px";//"280px";
    //
    // node.width = window.innerWidth;
    // node.height = window.innerHeight;

    // TODO: make this definable
    if ( !container ) {
      container = document.body;
    }

    if ( nodeName === "canvas" ) {
      other = document.querySelector( "video[id$='" + id + "']" );

      setTimeout(function check() {
        if ( other.videoWidth > 0 ) {
          node.width = other.videoWidth;
          node.height = other.videoHeight;

          node.style.visibility = "hidden";
        } else {
          setTimeout( check, 10 );
        }
      }, 10);
    }

    container.appendChild( node );

    return node;
  };

  Operator.exists = function( id ) {
    // This voodoo is used to check for the existance of a fixture that
    // might have a prefix such as video_, img_, canvas_
    return !!document.querySelectorAll( "[id$='" + id + "']" ).length;
  };


  DMV = {

    socket: null,

    operator: null,

    // Entry point:
    //   creates new id,
    //   stores id,
    //   stores reference to socket
    //   sets up socket listeners
    //   emits "init" event to socket
    init: function( socket ) {
      var id, op;

      // Check to see if an Id exists in storage...
      id = localStorage.getItem("id");

      // If not, then generate id for for newly initialized Operator
      // Store id locally to keep track of repeat visitors
      if ( !id ) {
        id = Operator.id();
        localStorage.setItem( "id", id );
      }

      DMV.socket = socket;

      DMV.operator = new Operator( id, socket );

      this.listen();
    },
    listen: function() {
      var capture = document.querySelector("video");

      capture.addEventListener( "click", DMV.operator.capture.bind( DMV.operator ), false );
    }
  };

  exports.DMV = DMV;
  exports.Operator = Operator;


} (typeof exports === "object" && exports || this) );