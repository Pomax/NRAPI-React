var React = require('react');

var elements = require('./elements.jsx');

var Search = React.createClass({

  componentWillMount: function() {
    this.handlers = {
      startSearch: this.props.startSearch,
      processResults: this.props.processResults
    };
  },

  render: function() {
    return <div>{ elements.createAll("search", this.handlers) }</div>;
  },

  crosslinkSearch: function(term, dictionary) {
    elements.crosslinkSearch(term, dictionary, this.props.processResults);
  }

});

module.exports = Search;