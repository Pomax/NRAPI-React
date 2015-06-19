var React = require('react');
var dictionaries = require("../../lib/dictionaries");

var JPEN = React.createClass({
  statics: {
    search: function(term, processResults) {
      dictionaries.jpen.search(term, function(data) {
        JPEN.processResults(term, data, processResults);
      });
    },
    processResults: function(term, resultset, callback) {
      callback("jpen", {
        term: term,
        resultset: resultset
      });
    }
  },

  getInitialState: function() {
    return {
      searchterm: "chicken"
    };
  },

  render: function() {
    var iprops = {
      value: this.state.searchterm,
      onKeyDown: this.testForSearch,
      onChange: this.updateSearchTerm
    };
    return (
      <div>
        Japanese/English search: <input type="text" {...iprops}/>
        <button onClick={this.startSearch}>search jpen</button>
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
    JPEN.search(this.state.searchterm, this.props.processResults);
  }
});

module.exports = JPEN;