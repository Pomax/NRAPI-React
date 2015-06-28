var React = require('react');

var romanise = require('jp-conversion').romanise;

var Entry = React.createClass({
  statics: {
    rt: {
      alignContent: "center",
      rubyAlign: "center",
    }
  },

  mixins: [
    require("../mixins/crosslink")
  ],

  generateReadings: function(reb, showRomaji) {
    if(showRomaji) {
      return reb.map((reading) => {
        return (<div className="ruby">
          <div onClick={ this.crosslink(reading, "jpen") }>{ romanise(reading) }</div>
          <div>{ reading }</div>
        </div>);
      });
    }
    return reb ? <span>{ this.crosslink(reb, "jpen") }</span> : false;
  },

  render: function() {
    var entry = this.props;
    return (
      <div className="entry" hidden={this.props.hidden}>
        <div>
          <img src={"http://localhost:6789/svg/" + entry.literal}/>
        </div>
        <div>
          <span>{ entry.literal }</span>,
          <span>radical: { entry.radical     }</span>,
          <span>strokes: { entry.strokeCount }</span>,
          <span>grade: { entry.grade       }</span>,
          <span>frequency: { entry.frequency   }</span>,
          <span>jlpt: { entry.jlpt        }</span>
        </div>
        { entry.parents.length>0 ? <div>graphical parents: { this.crosslink(entry.parents, "kanji") }</div> : false }
        { entry.children.length>0 ? <div>graphical children: { this.crosslink(entry.children, "kanji") }</div> : false }
        { entry.readings ? <div>reading:  { this.generateReadings(entry.readings, this.props.showRomaji) }</div> : fales }
        { entry.meanings ? <div>meanings: { this.crosslink(entry.meanings, "jpen") }</div> : false }
      </div>
    );
  }

});

module.exports = Entry;