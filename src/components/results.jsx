var React = require('react');
var elements = require('./elements.jsx');

var Results = React.createClass({

  generateResults: function(crosslink) {
    var Entry = elements.entries[this.props.dictionary];
    return this.props.resultset.results.map(e => {
      return <Entry key={e.id} crosslink={crosslink} {...e}/>;
    });
  },

  getFilters: function() {
    return elements.create("filters", this.props.dictionary, {
      term: this.props.term,
      filterSettings: this.props.filterSettings,
      resultset: this.props.resultset,
      onChange: this.filterResults
    });
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

    // get "visible" count after filtering
    var count = 0;
    resultset.results.forEach(e => { if (!e.hidden) count++; });

    return (
      <div>
        <h1 className="result counter">{count} entries</h1>
        <div className="filters">{ this.getFilters() }</div>
        <div className="entries">{ this.generateResults(this.props.crosslink) }</div>
      </div>
    );
  }
});

module.exports = Results;