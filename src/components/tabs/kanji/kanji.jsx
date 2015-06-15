var React = require('react');

var KANJI = React.createClass({
  statics: {
    filters: require("./filters"),
    entry: require("./entry")
  },

  render: function() {
    return (
      <div>kanji</div>
    );
  }

});

module.exports = KANJI;