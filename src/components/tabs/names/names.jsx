var React = require('react');

var NAMES = React.createClass({
  statics: {
    filters: require("./filters"),
    entry: require("./entry")
  },

  render: function() {
    return (
      <div>names</div>
    );
  }

});

module.exports = NAMES;