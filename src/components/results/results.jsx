var React = require('react');

var Results = React.createClass({

  generateResults: function() {
    var Entry = this.props.Entry;
    return this.props.resultset.results.map(e => {
      return <Entry key={e.id} {...e}/>;
    });
  },

  getFilters: function() {
    var Filters = this.props.Filters;
    return (
      <Filters term={this.props.term}
               filterSettings={this.props.filterSettings}
               resultset={this.props.resultset}
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
    var resultset = this.props.resultset;
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