(function runApplication() {
  "use strict";

  // Basic app setup
  var compress = require('compression'),
      express = require('express'),
      app = express();

  app.use(compress());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Accept");
    next();
  });

  var parameters = require("./routes/parameters")(app),
      models = require('./lib/models')(require('sequelize')),
      routes = require("./routes")(require("./lib/datahandler")(models));

  app.get('/:dict/entry/:id',  routes.entry);
  app.get('/:dict/find/:term', routes.find);

  app.use(routes.errorLogger);
  app.use(routes.errorHandler);

  var port = process.env.PORT || 8910;
  app.listen(port, function(err,res) {
    if(err) { console.error(err); exit(1); }
    console.log("server running on port "+port);
  });

}());
