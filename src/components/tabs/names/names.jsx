var React = require('react');

var NAMES = React.createClass({
  statics: {
    filters: require("./filters.jsx"),
    entry: require("./entry.jsx")
  },

  render: function() {
    return (
      <div>names</div>
    );
  }

});

module.exports = NAMES;