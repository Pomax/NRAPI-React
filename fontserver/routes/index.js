var glyphfinder = require("../lib/glyphfinder");

var quadsize = 72;
var cache = {};
var fs = require("fs");
var mkdirp = require("mkdirp");

module.exports = {
  reset: function(req, res) {
    glyphfinder.reset();
    res.json({status: "reset"});
  },

  entry: function(req, res) {
    glyphfinder.get(req.params.id, function(err, result) {
      res.json(result);
    });
  },

  svg: function(req, res) {
    var kanji = req.params.id;
    var dir = __dirname + "/../images";
    var file = dir + "/" + kanji + ".svg";

    if(!cache[kanji]) {
      if(fs.existsSync(file)) {
        cache[kanji] = fs.readFileSync(file);
      }
    }

    if(cache[kanji]) {
      res.type('image/svg+xml');
      res.status(200).send(cache[kanji]);
      return;
    }


    glyphfinder.get(kanji, quadsize, function(err, result) {
      var h = 20 + quadsize + 20;
      var w = (Object.keys(result).length * (20 + quadsize)) + 20;
      var x,y,dx,dy,cx,cy,nx,ny;

      var response = [
        '<svg xmlns="http://www.w3.org/2000/svg"',
        '     width="' + w + 'px"',
        '     height="' + h + 'px"',
        '     viewBox="0 0 ' + w +' ' + h + '">'
      ];

      Object.keys(result).forEach(function(type, idx) {
        svg = result[type]
        y = 20;
        x = 20 + (20+quadsize)*idx;
        response.push('<g class="'+type+'" transform="translate('+x+','+y+')">');
        // response.push('  <rect x="0" y="0" width="'+quadsize+'" height="'+quadsize+'" style="fill: black; opacity: 0.2"/>');

        dx = svg.maxx - svg.minx;
        dy = svg.maxy - svg.miny;
        cx = svg.minx + dx/2;
        cy = svg.miny + dy/2;
        nx = (quadsize/2) - cx;
        ny = (quadsize/2) - cy;
        response.push('  <g transform="translate('+nx+','+ny+')">')
        // response.push('    <rect x="'+svg.minx+'" y="'+svg.miny+'" width="'+dx+'" height="'+dy+'" style="fill: red; opacity: 0.2"/>');
        response.push('    <path d="'+svg.toPath()+'"/>');
        response.push('  </g>');
        response.push('</g>');
      });

      response.push("</svg>");
      response = response.join("\n");

      mkdirp(dir, function() { fs.writeFile(file, response); });

      res.type('image/svg+xml');
      res.status(200).send(response);
    });
  }
};
