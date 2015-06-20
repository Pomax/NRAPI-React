(function runApplication() {
  "use strict";

  // Basic app setup
  var compress = require('compression'),
      express = require('express'),
      app = express();

  app.use(compress());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.get('origin'));
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });

  var parameters = require("./routes/parameters")(app),
      routes = require("./routes");

  app.get('/entry/:id', routes.entry);
  app.get('/svg/:id',   routes.svg);

  var port = process.env.PORT || 6789;
  app.listen(port, function(err,res) {
    if(err) { console.error(err); exit(1); }
    console.log("server running on port "+port);
  });

}());
