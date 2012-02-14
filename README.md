# DMV

Node.js powered, WebRTC Delivered video chat. [Canary](http://tools.google.com/dlpage/chromesxs) and [Opera](http://dev.opera.com/articles/view/labs-more-fun-using-the-web-with-getusermedia-and-native-pages/)


Dependency: `grunt`

```bash
$ npm install grunt -g
```


Dependency: npm modules

```bash
$ npm install
```


Verify and Build code with:

```bash
$ grunt
```

Run Application with:

```bash
$ node app
```



<img src="http://gyazo.com/371f1171d2e19208f64adbbecb38b15d.png">


 - take a picture with a web cam.
 - Put it on the browser screen (canvas I hope).
 - Do face-recognition if easy. (SEE: http://wesbos.com/html5-video-face-detection-canvas-javascript/)
 - Allow operator to position a square if the face-recognition goes batty.
 - Upload pic to server.


Built With: grunt, express, socket.io and love

All code _must_ confirm to https://github.com/rwldrn/idiomatic.js