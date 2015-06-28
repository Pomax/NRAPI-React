var React = require('react');
var dictionaries = require("../../lib/dictionaries");

var ime = require("jp-conversion");
var verbs = require("jp-conjugation");

var JPEN = React.createClass({
  statics: {
    search: function(term, processResults) {
      dictionaries.jpen.search(term, function(data) {
        JPEN.processResults(term, data, processResults);
      });
    },
    processResults: function(term, resultset, callback) {
      callback("jpen", {
        term: term,
        resultset: resultset
      });
    }
  },

  getInitialState: function() {
    return {
      searchterm: "chicken",
      verbForms: []
    };
  },

  render: function() {
    var iprops = {
      value: this.state.searchterm,
      onKeyDown: this.testForSearch,
      onChange: this.updateSearchTerm
    };
    return (
      <div>
        Japanese/English search: <input type="text" {...iprops}/>
        <button onClick={this.startSearch}>search jpen</button>
        { this.state.verbForms.length > 0 ? this.showVerbSuggestion() : false }
      </div>
    );
  },

  showVerbSuggestion: function() {
    var glue = " form of the ";
    var suggestions = this.state.verbForms.map(e => {
      return <div>possible {e.form.join(glue)}{ glue }verb
      <span onClick={ false }>{e.word}</span></div>;
    });
    return <div>{ suggestions }</div>;
  },

  testForSearch: function(evt) {
    if (evt.keyCode===13) {
      this.startSearch();
    }
  },

  testVerbForm: function(value) {
    var forms = [];
    var conversion = ime.convert(value);
    if(conversion) {
      var test = verbs.unconjugate(conversion.hiragana);
      if (test.length > 0) {
        // find forms
        (function ff(list) {
          if(list[0].map) {
            return list.forEach(sublist => ff(sublist));
          }
          var entry = list.slice(-1)[0];
          entry.form = list.map( e => e.found );
          forms.push( entry );
        }(test));
      }
    }
    return forms;
  },

  updateSearchTerm: function(evt) {
    this.setState({
      searchterm: evt.target.value,
      verbForms: this.testVerbForm(evt.target.value)
    });
  },

  startSearch: function() {
    this.props.startSearch(this.search);
  },

  search: function() {
    JPEN.search(this.state.searchterm, this.props.processResults);
  }
});

module.exports = JPEN;