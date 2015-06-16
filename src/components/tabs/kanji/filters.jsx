var React = require('react');
var verbs = require("../../../lib/verbs");
var adverbs = ["adv", "adv-to"];
var adjectives = ["adj","adj-no","adj-na","adj-i"];

var compare = {
  kana: function(a,b) {
    a = a.reb[0];
    b = b.reb[0];
    return a<b ? -1 : a>b ? 1 : 0;
  },
  kanji: function(a,b) {
    a = a.keb ? a.keb[0] : a.reb[0];
    b = b.keb ? b.keb[0] : b.reb[0];
    return a<b ? 1 : -1
  }
};

var Filters = React.createClass({
  statics: {
    defaultState: {
      hideAll: false,
      romaji: false,
      sorting: "kana",
      pos: "all"
    }
  },

  getInitialState: function() {
    var initialState = Filters.defaultState;
    initialState.term = this.props.term;
    var settings = this.props.filterSettings || {};
    Object.keys(settings).forEach(v => {
      initialState[v] = settings[v];
    });
    return initialState;
  },

  componentDidMount: function() {
    this.filter();
  },

  componentDidUpdate: function(prevProps, prevState) {
    if(this.props.term !== prevProps.term) {
      this.filter();
    }
  },

  render: function() {
    return (
      <div>
        <fieldset>
          <label>romaji: </label>
          <input type="checkbox" checked={this.state.romaji} onChange={this.toggle("romaji")} />
        </fieldset>

        <fieldset>
          <label>sort on: </label>
          <select value={this.state.sorting} onChange={this.setSelection("sorting")}>
            <option value="kana">kana</option>
            <option value="kanji">kanji</option>
          </select>
        </fieldset>

        <fieldset>
          <label>reverse sort: </label>
          <input type="checkbox" checked={this.state.revset} onChange={this.toggle("revsort")} />
        </fieldset>

        <fieldset>
          <label>show: </label>
          <select value={this.state.pos} onChange={this.setSelection("pos")}>
            <option value="all">all results</option>
            <option value="v">├ verbs</option>
            <option value="v1">│ ├ ichidan verbs</option>
            <option value="v5">│ ├ godan verbs</option>
            <option value="vs">│ └ する verbs</option>
            <option value="n">├ nouns</option>
            <option value="adj-no"> │ └ の qualifier</option>
            <option value="adj">├ adjectives</option>
            <option value="adj-i">│ ├ い-adjectives</option>
            <option value="adj-na"> │ └ な-adjectives</option>
            <option value="adv">├ adverbs</option>
            <option value="adj-to"> │ └ と adverbs</option>
            <option value="exp">└ expressions</option>
          </select>
        </fieldset>
      </div>
    );
  },

  setSelection: function(name) {
    return evt => {
      var update = {};
      update[name] = evt.target.value;
      this.setState(update, this.filter);
    };
  },

  toggle: function(name) {
    return evt => {
      var update = {};
      update[name] =  !this.state[name];
      this.setState(update, function() {
        this.filter();
      });
    };
  },

  filter: function() {
    var resultset = this.props.resultset;
    var results = resultset.results.filter(e => !!e);
    results.forEach(this.filterEntry);
    resultset.results = results.sort(this.sortEntries);
    this.props.onChange(this.state, resultset);
  },

  sortEntries: function(a,b) {
    var cmp = compare[this.state.sorting](a,b);
    return (this.state.revsort ? -cmp : cmp);
  },

  /**
   * This is the function that makes all the magic happen
   */
  filterEntry: function(entry) {
    // selective UI filtering:
    entry.showRomaji = this.state.romaji

    // integral visibility filtering:
    entry.hidden = this.state.hideAll;

    if(this.state.pos !== "all") {
      entry.hidden = !this.posMatch(this.state.pos, entry);
    }
  },

  /**
   * POS matching is a little hectic...
   */
  posMatch: function(pos, entry) {
    for (var i=0, s; i<entry.sense.length; i++) {
      s = entry.sense[i];
      // verbs need a fair few checks
      if (pos==="v") {
        for (var j=0,v; j<verbs.all.length; j++) {
          v = verbs.all[j];
          if (s.pos.indexOf(v)>-1) return true;
        }
      } else if (pos==="v1") {
        for (var j=0,v; j<verbs.v1.length; j++) {
          v = verbs.v1[j];
          if (s.pos.indexOf(v)>-1) return true;
        }
      } else if (pos==="v5") {
        for (var j=0,v; j<verbs.v5.length; j++) {
          v = verbs.v5[j];
          if (s.pos.indexOf(v)>-1) return true;
        }
      } else if (pos==="adj") {
        for (var j=0,v; j<adjectives.length; j++) {
          v = adjectives[j];
          if (s.pos.indexOf(v)>-1) return true;
        }
      } else if (pos==="adv") {
        for (var j=0,v; j<adverbs.length; j++) {
          v = adverbs[j];
          if (s.pos.indexOf(v)>-1) return true;
        }
      } else {
        if (s.pos.indexOf(pos)>-1) return true;
      }
    }
    return false;
  }
});

module.exports = Filters;
