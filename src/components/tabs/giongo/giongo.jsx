var React = require('react');

var GIONGO = React.createClass({
  statics: {
    filters: require("./filters"),
    entry: require("./entry")
  },

  render: function() {
    return (
      <div>giongo</div>
    );
  }

});

module.exports = GIONGO;