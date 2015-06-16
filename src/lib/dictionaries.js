var REST = require("superagent");

function restPoint(dictname) {
  return {
    search: function(term, callback) {
      var url = "http://localhost:8910/" + dictname + "/find/" + term;
      REST.get(url)
          .end(function(err, res) {
            var json = res.text;
            var data = JSON.parse(json);
            callback({
              type: dictname,
              count: data.length,
              results: data
            });
          });
    }
  };
};


module.exports = {
  jpen: restPoint("dict"),
  kanji: restPoint("kanji")
};
