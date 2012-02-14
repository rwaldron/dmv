# nodejitsu-api/node.js

The Node.JS Nodejitsu-api library enables accessing Nodejitsu's [RESTful API](https://github.com/nodejitsu/handbook/tree/master/API.md).

## Example:

```js
var nj = require('nodejitsu-api'),
    fs = require('fs');

var client = nj.createClient({
  username: 'marak',
  password: 'foobar',
  remoteUri: 'http://api.nodejitsu.com'
});

client.apps.list(function(err, result){
  if (err) {
    console.log(err);
    return;
  }
  console.log(JSON.stringify(result, null, 2, true));
});
```

## Install:

This library may be installed using npm:

    npm install nodejitsu-api

## Usage:


### api.createClient(options)

This method sets up a client for connecting to Nodejitsu's databases. Here's a minimal example for connecting to Nodejitsu's API as Marak:

``` js
var client = nj.createClient({
  username: 'marak',
  password: 'foobar',
  remoteUri: 'http://api.nodejitsu.com'
});
```

The options object contains three required properties:

* `username`: The username for your Nodejitsu account
* `password`: The password for your Nodejitsu account
* `remoteUri`: The uri of the api host (typically (http://api.nodejitsu.com)[http://api.nodejitsu.com]).


### client

Method calls are generally structured as `resource` and `action`.

``` js
client.resource.action("data", function (err, result) {
  if (err) {
    throw err;
  }

  // use the result

});
```

Most actions take a string argument and a callback, though a few actions only take a callback.

The client's methods are reflective of [jitsu's](https://github.com/nodejitsu/jitsu) resources. Here's a broad overview:

* **client.apps**: Manage your application instances. Methods include:
    * `apps.available`
    * `apps.list`
    * `apps.start`
    * `apps.stop`
    * `apps.destroy`
* **client.databases**: Manage your databases. Methods include:
    * `databases.create`
    * `databases.destroy`
    * `databases.list`
* **client.snapshots**: Manage application snapshots. Methods include:
    * `snapshots.activate`
    * `snapshots.create`
    * `snapshots.destroy`
    * `snapshots.list`
* **client.logs**: Manage logs from your applications. Methods include:
    * `logs.byApp`
    * `logs.byUser`
* **client.users**: Manage your nodejitsu acccounts. Methods include:
    * `users.available`
    * `users.create`
    * `users.confirm`
    * `users.forgot`
    * `users.update`

and many more...

## License

MIT.
