var React = require('react');
var dictionaries = require("../../lib/dictionaries");
var bushu = require("../../../lib/bushu");

var KANJI = React.createClass({
  statics: {
    search: function(term, processResults) {
      term = JSON.stringify(term);
      dictionaries.kanji.search(term, function(data) {
        KANJI.processResults(term, data, processResults);
      });
    },
    processResults: function(term, resultset, callback) {
      callback("kanji", {
        term: term,
        resultset: resultset
      });
    }
  },

  getInitialState: function() {
    return {
      reading: "あか",
      strokecmp: "=",
      strokecount: "any"
    };
  },

  render: function() {
    var iprops = (type) => {
      return {
        value: this.state[type],
        onChange: this.update(type),
        onKeyDown: this.testForSearch
      };
    }

    return (
      <div>
        Kanji search: <input type="text" {...iprops("kanji")}/>
        <span> - or - search on </span>
        reading: <input type="text" {...iprops("reading")}/>
        meaning: <input type="text" {...iprops("meaning")}/>
        radical: { this.generateRadicalSelector() }
        stroke count { this.generateComparator() } { this.generateStrokePulldown() }
        <button onClick={this.startSearch}>search kanji</button>
      </div>
    );
  },

  generateComparator: function() {
    var options = ["=", "<=", ">="].map(v => {
      return <option value={v}>{v}</option>
    });
    return <select onChange={this.setSelection("strokecmp")}>{ options }</select>
  },

  generateStrokePulldown: function() {
    var strokes = ["any"];
    for(var s=1; s<35; s++) { strokes.push(s); }
    var options = strokes.map( (v) => {
      return <option value={v}>{ v }</option>;
    });
    return <select onChange={ this.setSelection("strokecount") }>{ options }</select>;
  },

  setSelection: function(name) {
    return evt => {
      var update = {};
      update[name] = evt.target.value;
      this.setState(update);
    };
  },

  generateRadicalSelector: function() {
    var options = bushu.map( (b,i) => {
      return <option value={i}>{ i===0? 'any' : i + " - " + b}</option>;
    });
    return <select onChange={ this.setSelection("radical") }>{ options }</select>;
  },

  testForSearch: function(evt) {
    if (evt.keyCode===13) {
      this.startSearch();
    }
  },

  update: function(type) {
    return evt => {
      var newstate = {};
      newstate[type] = evt.target.value;
      this.setState(newstate);
    };
  },

  startSearch: function() {
    this.props.startSearch(this.search);
  },

  search: function() {
    KANJI.search(this.state, this.props.processResults);
  }
});

module.exports = KANJI;