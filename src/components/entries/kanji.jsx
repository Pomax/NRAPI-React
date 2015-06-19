var React = require('react');

var romanise = require('jp-conversion').romanise;

var Entry = React.createClass({
  statics: {
    rt: {
      alignContent: "center",
      rubyAlign: "center",
    }
  },

  getInitialState: function() {
    return {
      showHeader: true
    };
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

  generateMeanings: function(eng) {
    return <span>{ this.crossLinkEnglish(eng) }</span>;
  },

  killHeader: function() {
    this.setState({
      showHeader: false
    });
  },

  render: function() {
    var entry = this.props;
    return (
      <div className="entry" hidden={this.props.hidden}>
        <div>
          <img src={"http://localhost:6789/svg/" + entry.literal} onLoad={this.killHeader}/>
        </div>
        { this.state.showHeader ? <h1>{ entry.literal }</h1> : false }
        <span>({entry.codepoint  })</span>,
        <span>{ entry.radical     }</span>,
        <span>{ entry.strokeCount }</span>,
        <span>{ entry.grade       }</span>,
        <span>{ entry.frequency   }</span>,
        <span>{ entry.jlpt        }</span>

        <div>reading:  { this.generateReadings(entry.readings, entry.showRomaji) }</div>
        <div>meanings: { this.generateMeanings(entry.meanings) }</div>
      </div>
    );
  }

});

module.exports = Entry;