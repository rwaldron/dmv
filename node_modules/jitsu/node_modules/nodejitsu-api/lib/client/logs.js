/*
 * logs.js: Client for the Nodejitsu logs API.
 *
 * (C) 2010, Nodejitsu Inc.
 *
 */

var util = require('util'),
    Client = require('./client').Client,
    defaultUser = require('./helpers').defaultUser;

//
// ### function Logs (options)
// #### @options {Object} Options for this instance
// Constructor function for the Logs resource
// with Nodejitsu's Logs API
//
var Logs = exports.Logs = function (options) {
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Logs, Client);

//
// ### function byApp (appName, amount, callback)
// #### @appName {string} Name of the application to retrieve
// #### @amount {number} the number of lines to retrieve
// #### @callback {function} Continuation to pass control to when complete.
// It retrieves the specified amount of logs for the application
//
Logs.prototype.byApp = function (appName, amount, callback) {
  var appName = defaultUser.call(this, appName),
      argv = ['logs'].concat(appName.split('/')),
      options = {
        from: 'NOW-1DAY',
        until: 'NOW',
        rows: amount
      };

  this.request('POST', argv, options, callback, function (res, result) {
    callback(null, result);
  });
};

//
// ### function byUser (amount, callback)
// #### @username {string} Name of user whose logs we wish to retrieve
// #### @amount {number} the number of lines to retrieve
// #### @callback {function} Continuation to pass control to when complete.
// It retrieves the specified amount of logs for all the applications for the user
//
Logs.prototype.byUser = function (username, amount, callback) {
  var options;


  if (arguments.length == 2) {
    callback = amount;
    amount = username;
    username = this.options.get('username');

  }

  if (typeof username === undefined || username === null) {
    username = this.options.get('username');
  }

  options = {
    from: 'NOW-1DAY',
    until: 'NOW',
    rows: amount
  };

  this.request('POST', ['logs', username], options, callback, function (res, result) {
    callback(null, result);
  });
};
