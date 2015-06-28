var React = require('react');

var compare = {
  kanji: function(a,b) {
    a = a.literal;
    b = b.literal;
    return a<b ? -1 : 1
  },
  grade: function(a,b) {
    a = parseInt(a.grade || 100);
    b = parseInt(b.grade || 100);
    return a < b ? -1 : a > b ? 1 : compare.kanji(a,b);
  },
  jlpt: function(a,b) {
    a = parseInt(a.jlpt || 0);
    b = parseInt(b.jlpt || 0);
    return a < b ? 1 : a > b ? -1 : compare.kanji(a,b);
  },
  strokeCount: function(a,b) {
    var _a = parseInt(a.strokeCount);
    var _b = parseInt(b.strokeCount);
    return _a < _b ? -1 : _a > _b ? 1 : compare.kanji(a,b);
  }
};

var Filters = React.createClass({
  statics: {
    defaultState: {
      hideAll: false,
      romaji: false,
      sorting: "kanji"
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
            <option value="kanji">kanji</option>
            <option value="strokeCount">strokeCount</option>
            <option value="grade">grade</option>
            <option value="jlpt">jlpt</option>
          </select>
        </fieldset>

        <fieldset>
          <label>reverse sort: </label>
          <input type="checkbox" checked={this.state.revset} onChange={this.toggle("revsort")} />
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
  }
});

module.exports = Filters;
