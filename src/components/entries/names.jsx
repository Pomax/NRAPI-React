var React = require('react');

var Entry = React.createClass({

  render: function() {
    return (
      <div>id: {this.props.id}, term: {this.props.term}</div>
    );
  }

});

module.exports = Entry;