/* dmv - v0.1.0 - 2/28/2012
* https://github.com/rwldrn/dmv
* Copyright (c) 2012 Rick Waldron <waldron.rick@gmail.com>; Licensed MIT */
(function( window, navigator ) {

var  // Program initializers
    Operator, DMV;

  // ---- Program ---- //


  // Operator Constructor
  Operator = function( selector, socket ) {
    // Check to see if an Id exists in storage...
    var id = localStorage.getItem("dmv-id");

    // If not, then generate id for for newly initialized Operator
    // Store id locally to keep track of repeat visitors
    if ( !id ) {
      id = Operator.id();
      localStorage.setItem( "dmv-id", id );
    }

    // Set this operator's id
    this.id = id;

    // DOM container reference
    this.container = document.querySelector( selector );

    // This Operator's video
    this.media = this.fixture( "video", this.id );

    // This Operator's canvas
    this.canvas = this.fixture( "canvas", this.id );
    this.context = this.canvas.getContext("2d");

    // Socket referene
    this.socket = socket;

    // Store datauri's received from stream
    this.dataUri = "";

    navigator.getUserMedia({ video: true, audio: true }, function( raw, stream ) {
    //getUserMedia("video, audio", function( stream ) {
      // Attach user media stream to video container source

      this.media.src = stream && stream || raw;

      // When video signals that it has loadedmetadata, begin "playing"
      this.media.addEventListener( "loadedmetadata", function() {
        this.media.play();
      }.bind(this), false);

      // On timeupdate events, draw the video frame to the canvas
      this.media.addEventListener( "timeupdate", function() {
        this.draw();
      }.bind(this), false);

    }.bind(this));
  };

  Operator.prototype.draw = function() {
    // Draw current video frame to the canvas
    this.context.drawImage( this.media, 0, 0, this.canvas.width, this.canvas.height );
  };

  Operator.prototype.capture = function( callback ) {
    var capture = this.canvas.toDataURL();

    // Dispatch a "capture" event to the socket
    this.socket.emit( "capture", {
      id: this.id,
      captured: capture
    });

    callback( capture );
  };

  // Create an HTML element fixture
  Operator.prototype.fixture = function( nodeName, id ) {
    var node = document.createElement( nodeName ),
        other;

    node.id = nodeName[0] + "_" + id;

    // TODO: Refactor for scaling/resizing
    // node.style.width = window.innerWidth + "px";

    // TODO: make this definable
    if ( !this.container ) {
      this.container = document.body;
    }

    if ( nodeName === "canvas" ) {
      other = document.querySelector( "video[id$='" + id + "']" );

      setTimeout(function check() {
        if ( other.videoWidth > 0 ) {
          node.width = other.videoWidth;
          node.height = other.videoHeight;

          node.style.visibility = "hidden";

          // set container width to center the video
          // margin: 0 auto
          this.container.style.width = other.videoWidth + "px";
        } else {
          setTimeout( check, 10 );
        }
      }, 10);
    }

    this.container.appendChild( node );

    return node;
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



  DMV = {

    socket: null,

    operator: null,

    // Entry point:
    //   creates new id,
    //   stores id,
    //   stores reference to socket
    //   sets up socket listeners
    //   emits "init" event to socket
    init: function( selector, socket ) {

      DMV.socket = socket;
      DMV.operator = new Operator( selector, socket );

      this.listen( DMV.operator.media );
    },
    listen: function( media ) {
      media.addEventListener( "click", DMV.operator.capture.bind( DMV.operator ), false );
    }
  };

  window.DMV = DMV;
  window.Operator = Operator;


} (typeof window === "object" && window || this, this.navigator ) );
