module.exports = function(app) {
  var express = require('express');
  var loopbackRouter = express.Router();

  loopbackRouter.post('/', function(req, res) {
    console.log(req.body);
    res.status(200).send({});
  });

  app.use('/api/loopback/*', loopbackRouter);
};
