# DMV

Node.js powered, WebRTC Delivered, 100% JavaScript camera > web > server Photobooth-style image capture program. [Canary](http://tools.google.com/dlpage/chromesxs) and [Opera](http://dev.opera.com/articles/view/labs-more-fun-using-the-web-with-getusermedia-and-native-pages/)

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/rwldrn/dmv/master/public/javascripts/dmv.min.js
[max]: https://raw.github.com/rwldrn/dmv/master/public/javascripts/dmv.js

In your web page:

```html
<script src="dmv.min.js"></script>
<script>

// ...when the dom is ready, with whatever your poison is...

DMV.init( selector, socket );

// `selector` is any valid CSS Selector to locate your empty container in the DOM

// `socket` is your socket.io object, which you're on your own for creating.

</script>
```

Run Application with:

```bash
$ node app
```

## Development


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



<img src="http://cache.gyazo.com/371f1171d2e19208f64adbbecb38b15d.png">


## YAY!

These were taken with **dmv**. When you click on the camera display surface, the image is captured and sent to a Node.js server via Socket.IO where a png is created and saved in the ./saved/ directory.

<img src="https://github.com/rwldrn/dmv/raw/master/yay/1330547437580.png">
<img src="https://github.com/rwldrn/dmv/raw/master/yay/1330547472702.png">



## What


 - ✔  take a picture with a web cam.
 - ✔  Put it on the browser screen (canvas I hope).
 - Do face-recognition if easy. (SEE: http://wesbos.com/html5-video-face-detection-canvas-javascript/)
 - Allow operator to position a square if the face-recognition goes batty.
 - ✔  Click to capture
 - ✔  Upload pic to server. (Auto with socket.io)
 - ✔  Save captured image on server!


Built With: grunt, express, socket.io and love

## Contributing
Style guide: [idiomatic.js](https://github.com/rwldrn/idiomatic.js), Lint and test your code using [grunt](https://github.com/cowboy/grunt).

_Also, please **don't** edit files in the **"dist"** or **"/public/javascript/"** subdirectories as they are generated via grunt. You'll find source code in the "lib" subdirectory!_

## License
Copyright (c) 2012 Rick Waldron <waldron.rick@gmail.com>
Licensed under the MIT license.
