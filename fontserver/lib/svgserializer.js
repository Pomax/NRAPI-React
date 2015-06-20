var SVGSerializer = function() {
  this.stack = [];
  this.minx = 9999;
  this.maxx = -9999;
  this.miny = 9999;
  this.maxy = -9999;
};

SVGSerializer.prototype = {
  update: function(x,y) {
    if(x<this.minx) this.minx = x;
    if(y<this.miny) this.miny = y;
    if(x>this.maxx) this.maxx = x;
    if(y>this.maxy) this.maxy = y;
  },
  beginPath: function() {
    // do nothing
  },
  moveTo: function(x,y) {
    this.update(x,y);
    this.stack.push(["M", x, y].join(" "));
  },
  lineTo: function(x,y) {
    this.update(x,y);
    this.stack.push(["L", x, y].join(" "));
  },
  quadraticCurveTo: function(x1, y1, x, y) {
    this.update(x1,y1);
    this.update(x,y);
    this.stack.push(["Q", x1, y1, x, y].join(" "));
  },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) {
    this.update(x1,y1);
    this.update(x2,y2);
    this.update(x,y);
    this.stack.push(["C", x1, y1, x2, y2, x, y].join(" "));
  },
  closePath: function() {
    this.stack.push("Z");
  },
  fill: function(f) {
    this.fillStyle = f;
  },
  stroke: function(s) {
    this.strokeStyle = s;
  },
  toPath: function() {
    return this.stack.join(" ");
  }
};

module.exports = SVGSerializer;
