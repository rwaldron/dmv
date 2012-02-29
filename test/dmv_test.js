/*global require:true, exports:true */

var app = require("../lib/dmv.js"),
    DMV = app.DMV,
    Operator = app.Operator;


console.log( DMV, Operator );

exports["DMV"] = {
  "DMV.init()": function(test) {
    test.expect(3);
    // tests here
    test.equal(typeof DMV.init, "function", "DMV.init() is a function");
    test.equal(typeof DMV.operator, "object", "DMV.operator is an object");
    test.equal(typeof DMV.socket, "object", "DMV.socket is an object(null)");
    test.done();
  }
};


exports["Operator"] = {
  "Operator.id()": function(test) {
    test.expect(2);
    // tests here
    test.equal(typeof Operator.id, "function", "Operator.id() is a function");
    test.equal(Operator.id().length, 36, "Operator.id() returns a 36 character id");
    test.done();
  },
  "Operator.prototype.fixture()": function(test) {
    test.expect(2);
    // tests here
    test.equal(typeof Operator.prototype.fixture, "function", "Operator.prototype.fixture() is a function");

    // This is a weird/dumb test - need to write full on jsdom tests
    try {
      Operator.prototype.fixture.call({}, "img", 1);
    } catch(e) {
      test.equal(e.toString(), "ReferenceError: document is not defined", "Operator.prototype.fixture() will attempt to call document methods");
    }
    // test.equal(Operator.id().length, 36, "Operator.id() returns a 36 character id");
    test.done();
  }
};
