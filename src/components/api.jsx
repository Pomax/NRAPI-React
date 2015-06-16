var React = require('react');

var Tabs = require('./tabs/tabs.jsx');
var Results = require('./results/results.jsx');

var API = React.createClass({
  getInitialState: function() {
    return {
      tab: Tabs.defaultTab,
      term: "",
      resultset: false,
      filters: false,
      entry: false,
      searching: false
    };
  },

  render: function() {
    return (
      <div>
        <Tabs tab={this.state.tab} processResults={this.processResults} startSearch={this.startSearch}/>
        { this.state.searching ? <div>searching...</div> : false }
        <Results term={this.state.term} resultset={this.state.resultset} Filters={this.state.filters} Entry={this.state.entry}/>
      </div>
    );
  },

  startSearch: function(callback) {
    this.setState({ searching: true }, callback());
  },

  processResults: function(evt) {
    evt.searching = false
    this.setState(evt);
  }
});

module.exports = API;
