var opentype = require("opentype.js");
var SVGSerializer = require("./svgserializer");
var fontfiles = require('./fontfiles');

module.exports = {
  get: function(id, size, callback) {
    var data = {};
    var keys = Object.keys(fontfiles);
    (function nextKey(idx) {
      var type = keys.splice(0,1)[0];

      if(!type) {
        console.log("done.\n");
        return callback(false, data);
      }

      console.log("processing "+type);
      var filename = "./fonts/" + fontfiles[type];
      opentype.load(filename, function(err, font) {
        console.log("- loaded: ");
        if(err) {
          console.error(err);
        }
        var path = font.getPath(id, 0, size, size);
        var svg = new SVGSerializer();
        path.draw(svg);
        data[type] = svg;
        console.log("- shaped");

        setTimeout(function() { nextKey(++idx); },1);
      });
    }(0));
  }
};
