var SVGSerializer = require("./svgserializer");
var fonts = require("./fonts");

module.exports = {
  get: function(id, size, callback) {
    var data = {};
    var keys = Object.keys(fonts);
    (function nextKey(idx) {
      var type = keys.splice(0,1)[0];
      if(!type) {
        return callback(false, data);
      }
      var path = fonts[type].getPath(id, 0, size, size);
      var svg = new SVGSerializer();
      path.draw(svg);
      data[type] = svg;
      setTimeout(function() { nextKey(++idx); },1);
    }(0));
  }
};
