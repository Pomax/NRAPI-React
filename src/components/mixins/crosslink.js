var React = require("react");
module.exports = {
 crosslink: function(entries, dictionary, options) {
    var handler = (term) => { 
      return () => {
        this.props.crosslink(term, dictionary, options);
      };
    };
    var mapper = term => {
      return <span onClick={handler(term)}>{term}</span>
    };
    return entries.map ? entries.map(mapper) : mapper(entries);
  }
};
