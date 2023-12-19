const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://ec2-44-221-181-203.compute-1.amazonaws.com:5000/',
      changeOrigin: true,
    })
  );
};