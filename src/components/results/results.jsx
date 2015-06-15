var React = require('react');

var Results = React.createClass({
  getInitialState: function() {
    return {
      term: "",
      resultset: false,
      filterSettings: {}
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.props.term !== prevProps.term) {
      this.setState({
        term: this.props.term,
        resultset: this.props.resultset
      })
    }
  },

  generateResults: function() {
    var Entry = this.props.Entry;
    return this.state.resultset.results.map(e => {
      return <Entry key={e.id} {...e}/>;
    });
  },

  getFilters: function() {
    var Filters = this.props.Filters;
    return (
      <Filters term={this.state.term}
               filterSettings={this.state.filterSettings}
               resultset={this.state.resultset}
               onChange={this.filterResults}/>
    );
  },

  filterResults: function(filterSettings, filterResult) {
    this.setState({
      filterSettings: filterSettings,
      resultset: filterResult
    });
  },

  render: function() {
    var resultset = this.state.resultset;
    if (!resultset) { return <div>results listing</div>; }

    var count = 0;
    resultset.results.forEach(e => { if (!e.hidden) count++; });
    return (
      <div>
        <h1 className="result counter">{count} entries</h1>
        <div className="filters">{ this.getFilters() }</div>
        <div className="entries">{ this.generateResults() }</div>
      </div>
    );
  }
});

module.exports = Results;