var React = require('react');
var dictionaries = require("../../../lib/dictionaries");

var KANJI = React.createClass({
  statics: {
    filters: require("./filters.jsx"),
    entry: require("./entry.jsx"),
    dictionary: dictionaries.kanji
  },

  getInitialState: function() {
    return {
      searchterm: "海"
    };
  },

  render: function() {
    var iprops = {
      value: this.state.searchterm,
      onKeyDown: this.testSearch,
      onChange: this.updateSearchTerm
    };
    return (
      <div>
        Kanji search: <input type="text" {...iprops}/>
        <button onClick={this.startSearch}>search kanji</button>
      </div>
    );
  },

  testSearch: function(evt) {
    if (evt.keyCode===13) {
      this.startSearch();
    }
  },

  updateSearchTerm: function(evt) {
    this.setState({
      searchterm: evt.target.value
    });
  },

  startSearch: function() {
    this.props.startSearch(this.search);
  },

  search: function() {
    KANJI.dictionary.search(this.state.searchterm, this.processResults);
  },

  processResults: function(resultset) {
    this.props.processResults({
      term: this.state.searchterm,
      resultset: resultset,
      filters: KANJI.filters,
      entry: KANJI.entry
    });
  }
});

module.exports = KANJI;