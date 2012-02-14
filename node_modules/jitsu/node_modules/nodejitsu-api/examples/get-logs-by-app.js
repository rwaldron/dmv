var nj = require('../lib/client');

var client = nj.createClient({
      username: 'marak',
      password: 'foo',
      remoteUri: 'http://api.nodejitsu.com'
    });

client.logs.byApp('marak/hellonode', 100, function(err, result){
  if (err) {
    console.log(err);
    return;
  }
  console.log(JSON.stringify(result, null, 2, true));
});

