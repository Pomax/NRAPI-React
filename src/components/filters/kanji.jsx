var React = require('react');

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
      romaji: false
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
