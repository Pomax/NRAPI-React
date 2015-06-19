var React = require('react');

var Search = require('./search.jsx');
var Results = require('./results.jsx');

var API = React.createClass({
  getInitialState: function() {
    return {
      dictionary: "jpen",
      term: "",
      resultset: false,
      searching: false
    };
  },

  render: function() {
    return (
      <div>
        <Search ref="search"
                dictionary={this.state.dictionary}
                startSearch={this.startSearch}
                processResults={this.processResults} />

        { this.state.searching ? <div>searching...</div> : false }

        <Results dictionary={this.state.dictionary}
                 term={this.state.term}
                 resultset={this.state.resultset}
                 crosslink={this.crosslink} />
      </div>
    );
  },

  crosslink: function(content, dictionary) {
    this.startSearch(() => this.refs.search.crosslinkSearch(content, dictionary));
  },

  startSearch: function(callback) {
    this.setState({ searching: true }, callback());
  },

  processResults: function(dictionary, evt) {
    evt.dictionary = dictionary;
    evt.searching = false
    this.setState(evt);
  }
});

module.exports = API;
