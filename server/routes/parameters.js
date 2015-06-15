module.exports = function(app) {
  "use strict";

  var params = ["dict", "id", "term"];
  params.forEach(function(param) {
    app.param(param, function(req, res, next, value) {
      req.params[param] = value;
      next();
    });
  });
};
