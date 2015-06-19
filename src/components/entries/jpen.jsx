var React = require('react');

var romanise = require('jp-conversion').romanise;

var Entry = React.createClass({
  statics: {
    rt: {
      alignContent: "center",
      rubyAlign: "center"
    }
  },

  generateReadings: function(reb, showRomaji) {
    if(showRomaji) {
      return reb.map(function(reading) {
        return (<div className="ruby">
          <div>{ romanise(reading) }</div>
          <div>{ reading }</div>
        </div>);
      });
    }
    return reb ? <span>{ reb.join(", ") }</span> : false;
  },

  searchKanji: function(term) {
    return () => {
      this.props.crosslink(term, "kanji");
    };
  },

  generateKanjiForms: function(keb) {
    return keb.map(kanjiform => {
      var sep = kanjiform.split('');
      return sep.map(k => <span onClick={this.searchKanji(k)}>{k}</span>);
    });
  },

  searchEnglish: function(term) {
    return () => {
      this.props.crosslink(term, "jpen");
    };
  },

  crossLinkEnglish: function(gloss) {
    return gloss.map(term => {
      return <span onClick={this.searchEnglish(term)}>{term}</span>
    });
  },

  generateMeanings: function(entry) {
    var sense = entry.sense;
    if (!sense) return false;
    return sense.map(s => {
      var pos = s.pos,
          gloss = s.gloss;
      return [
        pos.length === 0 ? false : <div>[{ pos.join(", ") }]</div>,
        <div>{ this.crossLinkEnglish(gloss) }</div>
      ];
    });
  },

  render: function() {
    var entry = this.props;
    return (
      <div className="entry" hidden={this.props.hidden}>
        <div>reading: { this.generateReadings(entry.reb, entry.showRomaji) }</div>
        { entry.keb && entry.keb.length > 0 ? <div>kanji: { this.generateKanjiForms(entry.keb) }</div> : false }
        <div>{ this.generateMeanings(entry) }</div>
      </div>
    );
  }

});

module.exports = Entry;