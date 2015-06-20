var opentype = require("../node_modules/opentype.js/dist/opentype.js");
var fontfiles = require('./fontfiles');

var fonts = {};
var keys = Object.keys(fontfiles);

(function loadFonts(idx) {
  var type = keys.splice(0,1)[0];
  if(!type) {
    return console.log("all fonts loaded.");
  }
  var filename = __dirname + "/../fonts/" + fontfiles[type];
  opentype.load(filename, function(err, font) {
    console.log("loaded "+filename);
    fonts[type] = font;
    setTimeout(function() { loadFonts(++idx); },1);
  });
}(0));

module.exports = fonts;
