var SVGSerializer = require("./svgserializer");
var fontLoader = require("./fonts");
var fonts = fontLoader.fonts;

module.exports = {
  reset: function() {
    console.log("resetting...");
    fontLoader.reset();
  },
  get: function(id, size, callback) {
    var data = {};
    var keys = Object.keys(fonts);

    (function nextKey(idx) {
      var type = keys.splice(0,1)[0];

      if(type === undefined) {
        return callback(false, data);
      }

      var svg = { toPath: function() { return ''; } };

      if (fonts[type]) {
        var test = fonts[type].charToGlyphIndex(id);
        if(test > 1) {
          svg = new SVGSerializer();
          fonts[type].getPath(id, 0, size, size).draw(svg);
        }
      } else { console.log(type+" does not exist?"); }

      data[type] = svg;
      setTimeout(function() { nextKey(++idx); }, 1);
    }(0));

  }
};
