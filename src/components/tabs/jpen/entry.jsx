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
    var reb = entry.reb;
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

  crossLink: function(gloss) {
    return gloss.join(", ");
  },

  generateMeanings: function(entry) {
    var sense = entry.sense;
    if (!sense) return false;
    return sense.map(s => {
      var pos = s.pos,
          gloss = s.gloss;
      return [
        pos.length === 0 ? false : <div>[{ pos.join(", ") }]</div>,
        <div>{ this.crossLink(gloss) }</div>
      ];
    });
  },

  render: function() {
    var entry = this.props;
    return (
      <div className="entry" hidden={this.props.hidden}>
        <div>reading: { this.generateReadings(entry) }</div>
        { entry.keb && entry.keb.length > 0 ? <div>kanji: { entry.keb.join(", ") }</div> : false }
        <div>{ this.generateMeanings(entry) }</div>
      </div>
    );
  }

});

module.exports = Entry;