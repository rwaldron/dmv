/*global require:true, exports:true */

var app = require("../lib/gum.js"),
  navigator = app.navigator;


console.log(navigator.getUserMedia);

exports["getUserMedia"] = function(test) {
  test.expect(1);
  test.equal(typeof navigator.getUserMedia, "function", "navigator.getUserMedia() is a function");
  test.done();
};
