var React = require('react');

var search = {
    jpen: require("./search/jpen.jsx")
    ,
    kanji: require("./search/kanji.jsx")
    ,
    giongo: require("./search/giongo.jsx")
    // ,
    // names: require("./search/names.jsx")
};

var filters = {
    jpen: require("./filters/jpen.jsx")
    ,
    kanji: require("./filters/kanji.jsx")
    ,
    giongo: require("./filters/giongo.jsx")
    // ,
    // names: require("./filters/names.jsx")
};

var entries = {
    jpen: require("./entries/jpen.jsx")
    ,
    kanji: require("./entries/kanji.jsx")
    ,
    giongo: require("./entries/giongo.jsx")
    // ,
    // names: require("./entries/names.jsx")
};

var keys = Object.keys(search);

var elements = {

  search: search,
  filters: filters,
  entries: entries,

  create: function(type, dictionary, props) {
    var Element = elements[type][dictionary];
    return <Element {...props} />
  },

  createAll: function(type, props) {
    return keys.map(dictionary => elements.create(type, dictionary, props));
  },

  crosslinkSearch: function(term, dictionary, processResults) {
    elements.search[dictionary].search(term, processResults);
  }
};

module.exports = elements;
