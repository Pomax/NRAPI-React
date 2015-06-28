var React = require('react');
var dictionaries = require("../../lib/dictionaries");

var GIONGO = React.createClass({
  statics: {
    search: function(term, processResults) {
      dictionaries.giongo.search(term, function(data) {
        GIONGO.processResults(term, data, processResults);
      });
    },
    processResults: function(term, resultset, callback) {
      callback("giongo", {
        term: term,
        resultset: resultset
      });
    }
  },

  getInitialState: function() {
    return {
      searchterm: "ペラペラ"
    };
  },

  render: function() {
    var iprops = (type) => {
      return {
        value: this.state[type],
        onChange: this.update(type),
        onKeyDown: this.testForSearch
      };
    }

    return (
      <div>
        Sound words search: <input type="text" {...iprops("searchterm")}/>
        <button onClick={this.startSearch}>search gi(on|tai)go</button>
      </div>
    );
  },

  testForSearch: function(evt) {
    if (evt.keyCode===13) {
      this.startSearch();
    }
  },

  update: function(type) {
    return evt => {
      var newstate = {};
      newstate[type] = evt.target.value;
      this.setState(newstate);
    };
  },

  startSearch: function() {
    this.props.startSearch(this.search);
  },

  search: function() {
    GIONGO.search(this.state.searchterm, this.props.processResults);
  }
});

module.exports = GIONGO;