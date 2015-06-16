module.exports = function(dataHandler) {
  "use strict";

	return {
    entry: function(req, res, next) {
      dataHandler.getHandler(req.params.dict).findEntry(req.params.id, function(err, result) {
        if(err) { return next(err); }
        res.json(result);
      });
    },
    find: function(req, res, next) {
      dataHandler.getHandler(req.params.dict).findAll(req.params.term, function(err, results) {
        if(err) { return next(err); }
        res.json(results);
      });
    },
    show: function(req, res, next) {
      if (req.query.details) { res.locals.details = req.query.details; }
      dataHandler.getHandler(req.params.dict).findAll(req.params.term, function(err, results) {
        if(err) { return next(err); }
        res.render(req.params.dict + "/result.html", { results: results });
      });
    }
  };
};
