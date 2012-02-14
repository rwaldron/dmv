var parts = ['Apps', 'Users', 'Snapshots', 'Databases', 'Logs', 'Client']

parts.forEach(function (k) {
  exports[k] = require('./client/' + k.toLowerCase())[k];
})

exports.createClient = function (options) {
  var client = {};
  parts.forEach(function (k) {
    client[k.toLowerCase()] = new exports[k](options);
  });
  return client;
}

