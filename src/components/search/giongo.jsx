var React = require('react');
var dictionaries = require("../../../lib/dictionaries");

var GIONGO = React.createClass({
  statics: {
    filters: require("./filters.jsx"),
    entry: require("./entry.jsx"),
    dictionary: dictionaries.giongo
  },

  getInitialState: function() {
    return {
      searchterm: "ペラペラ"
    };
  },

  render: function() {
    var iprops = {
      value: this.state.searchterm,
      onKeyDown: this.testSearch,
      onChange: this.updateSearchTerm
    };

    //
    // TODO: allow queries on kanji, reading, meaning, or any of the numerical metadata.
    //
    // This will need a modeling refactor.
    //

    return (
      <div>
        Sound words search: <input type="text" {...iprops}/>
        <button onClick={this.startSearch}>search</button>
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
    GIONGO.dictionary.search(this.state.searchterm, this.processResults);
  },

  processResults: function(resultset) {
    this.props.processResults({
      term: this.state.searchterm,
      resultset: resultset,
      filters: GIONGO.filters,
      entry: GIONGO.entry
    });
  }
});

module.exports = GIONGO;