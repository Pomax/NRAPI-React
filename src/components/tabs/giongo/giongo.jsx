var React = require('react');

var GIONGO = React.createClass({
  statics: {
    filters: require("./filters.jsx"),
    entry: require("./entry.jsx")
  },

  render: function() {
    return (
      <div>giongo</div>
    );
  }

});

module.exports = GIONGO;