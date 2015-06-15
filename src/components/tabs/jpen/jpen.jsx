var React = require('react');
var dictionaries = require("../../../lib/dictionaries");

var JPEN = React.createClass({
  statics: {
    filters: require("./filters.jsx"),
    entry: require("./entry.jsx"),
    dictionary: dictionaries.jpen
  },

  getInitialState: function() {
    return {
      searchterm: "chicken"
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
        Japanese/English search: <input type="text" {...iprops}/>
        <button onClick={this.startSearch}>search jpen</button>
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
    JPEN.dictionary.search(this.state.searchterm, this.processResults);
  },

  processResults: function(resultset) {
    this.props.processResults({
      term: this.state.searchterm,
      resultset: resultset,
      filters: JPEN.filters,
      entry: JPEN.entry
    });
  }
});

module.exports = JPEN;