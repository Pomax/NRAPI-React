var React = require('react');
var dictionaries = require("../../lib/dictionaries");

var KANJI = React.createClass({
  statics: {
    search: function(term, processResults) {
      dictionaries.kanji.search(term, function(data) {
        KANJI.processResults(term, data, processResults);
      });
    },
    processResults: function(term, resultset, callback) {
      callback("kanji", {
        term: term,
        resultset: resultset
      });
    }
  },

  getInitialState: function() {
    return {
      searchterm: "海"
    };
  },

  render: function() {
    var iprops = {
      value: this.state.searchterm,
      onKeyDown: this.testForSearch,
      onChange: this.updateSearchTerm
    };

    //
    // TODO: allow queries on kanji, reading, meaning, or any of the numerical metadata.
    //
    // This will need a modeling refactor.
    //

    return (
      <div>
        Kanji search: <input type="text" {...iprops}/>
        <button onClick={this.startSearch}>search kanji</button>
      </div>
    );
  },

  testForSearch: function(evt) {
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
    KANJI.search(this.state.searchterm, this.props.processResults);
  }
});

module.exports = KANJI;