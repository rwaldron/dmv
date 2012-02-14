var nj = require('../lib/client'),
    fs = require('fs');

var client = nj.createClient({
      username: 'marak',
      password: 'mypassword',
      remoteUri: 'http://api.nodejitsu.com'
    });

client.users.auth(function(err, result){
  if (err) {
    console.log(err);
    return;
  }
  console.log(JSON.stringify(result, null, 2, true));
});
