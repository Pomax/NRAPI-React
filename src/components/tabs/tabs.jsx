var React = require('react');

var tabs = {
  JPEN: require('./jpen/jpen.jsx'),
  KANJI: require('./kanji/kanji.jsx'),
  GIONGO: require('./giongo/giongo.jsx'),
  NAMES: require('./names/names.jsx')
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