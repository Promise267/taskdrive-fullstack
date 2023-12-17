const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://ec2-3-90-45-205.compute-1.amazonaws.com:5000', // Replace with the URL of your Express backend
      changeOrigin: true,
    })
  );
};