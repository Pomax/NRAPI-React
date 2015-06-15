var React = require('react');

var tabs = {
  JPEN: require('./jpen/jpen'),
  KANJI: require('./kanji/kanji'),
  GIONGO: require('./giongo/giongo'),
  NAMES: require('./names/names')
};

var Tabs = React.createClass({
  statics: {
    defaultTab: "JPEN",
    tabs: tabs
  },

  generateTabs: function() {
    var keys = Object.keys(Tabs.tabs);
    return keys.map(tabname => {
      var Element = Tabs.tabs[tabname];
      return <Element key={tabname} startSearch={this.props.startSearch} processResults={this.props.processResults}/>;
    });
  },

  render: function() {
    return <div>{ this.generateTabs() }</div>;
  }

});

module.exports = Tabs;