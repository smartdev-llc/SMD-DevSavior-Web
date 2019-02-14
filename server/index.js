const express = require('express');
const path = require('path');
const app = express();

// middleware prerender.io
app.use(require('prerender-node').set('prerenderServiceUrl', 'http://localhost:3636'));
/**
  If an incoming request uses
  a protocol other than HTTPS,
  redirect that request to the
  same url but with HTTPS
**/
const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}
/**
  Instruct the app
  to use the forceSSL
  middleware
  uncomment if implemented ssl
**/
// app.use(forceSSL());

// Run the app by serving the static files in the dist directory
app.use(express.static(path.resolve(__dirname, '../dist/juniorViec')));

// Start the app by listening on the default
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/juniorViec/index.html'));
});

app.listen(process.env.PORT || 8080, function() {
  console.log('app running on port', process.env.PORT || 8080);
});
