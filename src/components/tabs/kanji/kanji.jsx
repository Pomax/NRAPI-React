var React = require('react');

var KANJI = React.createClass({
  statics: {
    filters: require("./filters.jsx"),
    entry: require("./entry.jsx")
  },

  render: function() {
    return (
      <div>kanji</div>
    );
  }

});

module.exports = KANJI;