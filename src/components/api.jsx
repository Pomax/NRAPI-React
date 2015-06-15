var React = require('react');

var Tabs = require('./tabs/tabs');
var Results = require('./results/results');

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
    this.setState({
        searching: true
    }, function() {
      callback();
    });
  },

  changeTab: function(evt) {
    this.setState({
      tab: evt.tab
    });
  },

  processResults: function(evt) {
    this.setState({
      term: evt.term,
      resultset: evt.resultset,
      filters: evt.filters,
      entry: evt.entry,
      searching: false
    });
  }
});

module.exports = API;
