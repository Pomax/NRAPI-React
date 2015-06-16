var React = require('react');

var romanise = require('jp-conversion').romanise;

var Entry = React.createClass({
  statics: {
    rt: {
      alignContent: "center",
      rubyAlign: "center"
    }
  },

  generateReadings: function(entry) {
    var reb = entry.readings;
    if(entry.showRomaji) {
      return reb.map(function(reading) {
        return (<div className="ruby">
          <div>{ romanise(reading) }</div>
          <div>{ reading }</div>
        </div>);
      });
    }
    return reb ? <span>{ reb.join(", ") }</span> : false;
  },

  generateMeanings: function(entry) {
    var eng = entry.meanings;
    return <span>{ eng.join(", ") }</span>
  },

  render: function() {
    var entry = this.props;
    return (
      <div className="entry" hidden={this.props.hidden}>
        <h1>{ entry.literal }</h1>

        <span>({entry.codepoint  })</span>,
        <span>{ entry.radical     }</span>,
        <span>{ entry.strokeCount }</span>,
        <span>{ entry.grade       }</span>,
        <span>{ entry.frequency   }</span>,
        <span>{ entry.jlpt        }</span>

        <div>reading:  { this.generateReadings(entry) }</div>
        <div>meanings: { this.generateMeanings(entry) }</div>
      </div>
    );
  }

});

module.exports = Entry;