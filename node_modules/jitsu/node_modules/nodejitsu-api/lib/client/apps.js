/*
 * app.js: Client for the Nodejitsu apps API.
 *
 * (C) 2010, Nodejitsu Inc.
 *
 */

var util = require('util'),
    Client = require('./client').Client,
    defaultUser = require('./helpers').defaultUser;

//
// ### function Apps (options)
// #### @options {Object} Options for this instance
// Constructor function for the Apps resource responsible
// with Nodejitsu's Apps API
//
var Apps = exports.Apps = function (options) {
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Apps, Client);

//
// ### function list (username, callback)
// #### @callback {function} Continuation to pass control to when complete
// Lists all applications for the authenticated user
//
Apps.prototype.list = function (username, callback) {

  if (arguments.length == 1) {
    callback = username;
    username = this.options.get('username');
  }

  this.request('GET', ['apps', username], callback, function (res, result) {
    callback(null, result.apps || res.statusCode);
  })
};

//
// ### function create (app, callback)
// #### @app {Object} Package.json manifest for the application.
// #### @callback {function} Continuation to pass control to when complete
// Creates an application with the specified package.json manifest in `app`. 
//
Apps.prototype.create = function (app, callback) {
  var appName = defaultUser.call(this, app.name);

  this.request('POST', ['apps', appName], app, callback, function (res, result) {
    callback(null, result || res.statusCode);
  })
};

//
// ### function view (appName, callback)
// #### @appName {string} Name of the application to view
// #### @callback {function} Continuation to pass control to when complete
// Views the application specified by `name`.
//
Apps.prototype.view = function (appName, callback) {
  var appName = defaultUser.call(this, appName),
      argv = ['apps'].concat(appName.split('/'));

  this.request('GET', argv, callback, function (res, result) {
    callback(null, result.app || res.statusCode);
  })
};

//
// ### function update (name, attrs, callback)
// #### @appName {string} Name of the application to update
// #### @attrs {Object} Attributes to update for this application.
// #### @callback {function} Continuation to pass control to when complete
// Updates the application with `name` with the specified attributes in `attrs`
//
Apps.prototype.update = function (appName, attrs, callback) {
  var appName = defaultUser.call(this, appName);
      argv = ['apps'].concat(appName.split('/'));

  this.request('PUT', argv, attrs, callback, function (res, result) {
    callback(null, result || res.statusCode);
  });
};

//
// ### function destroy (appName, callback)
// #### @appName {string} Name of the application to destroy
// #### @callback {function} Continuation to pass control to when complete
// Destroys the application with `name` for the authenticated user. 
//
Apps.prototype.destroy = function (appName, callback) {
  var appName = defaultUser.call(this, appName),
      argv = ['apps'].concat(appName.split('/'));

  this.request('DELETE', argv, callback, function (res, result) {
    callback(null, result || res.statusCode);
  })
};

//
// ### function start (appName, callback)
// #### @appName {string} Name of the application to start
// #### @callback {function} Continuation to pass control to when complete
// Starts the application with `name` for the authenticated user. 
//
Apps.prototype.start = function (appName, callback) {
  var appName = defaultUser.call(this, appName),
      argv = ['apps'].concat(appName.split('/')).concat('start');

  this.request('POST', argv, callback, function (res, result) {
    callback(null, result || res.statusCode);
  });
};

//
// ### function restart (appName, callback)
// #### @appName {string} Name of the application to start
// #### @callback {function} Continuation to pass control to when complete
// Starts the application with `name` for the authenticated user. 
//
Apps.prototype.restart = function (appName, callback) {
  var appName = defaultUser.call(this, appName),
      argv = ['apps'].concat(appName.split('/')).concat('restart');

  this.request('POST', argv, callback, function (res, result) {
    callback(null, result || res.statusCode);
  });
};

//
// ### function stop (appName, callback)
// #### @appName {string} Name of the application to stop.
// #### @callback {function} Continuation to pass control to when complete
// Stops the application with `name` for the authenticated user. 
//
Apps.prototype.stop = function (appName, callback) {
  var appName = defaultUser.call(this, appName),
      argv = ['apps'].concat(appName.split('/')).concat('stop');

  this.request('POST', argv, callback, function (res, result) {
    callback(null, result || res.statusCode);
  });
};

//
// ### function available (app, callback)
// #### @app {Object} Application to check availability against.
// #### @callback {function} Continuation to respond to when complete.
// Checks the availability of the `app.name` / `app.subdomain` combo 
// in the current Nodejitsu environment.
//
Apps.prototype.available = function (app, callback) {
  var appName = defaultUser.call(this, app.name),
      argv = ['apps'].concat(appName.split('/')).concat('available');

  this.request('POST', argv, app, callback, function (res, result) {
    callback(null, result || res.statusCode);
  });
};
