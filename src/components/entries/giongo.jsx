var React = require('react');
var ime = require("jp-conversion");

var Entry = React.createClass({

  render: function() {
    var keys = Object.keys(this.props).slice();
    keys.splice(keys.indexOf("id"),1);
    keys.splice(keys.indexOf("crosslink"),1);
    var elements = keys.map(key => {
      return <div>{key}: {this.props[key].join(", ")}</div>;
    })

    var term = ime.convert(this.props.id);

    return (<div>
      <div>{ term.katakana }</div>
      {elements}
    </div>);
  }

});

module.exports = Entry;