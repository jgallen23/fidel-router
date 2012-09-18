Fidel.prototype.processRoutes = function() {
  this._routesFns = [];
  for (var path in this.routes) {
    var methodName = this.routes[path];
    var fn = this.proxy(this[methodName]);
    this._routesFns.push({ path: path, fn: fn });
    routie(path, fn);
  }
}

Fidel.prototype.removeRoutes = function() {
  for (var i = 0, c = this._routesFns.length; i < c; i++) {
    var r = this._routesFns[i];
    routie.remove(r.path, r.fn);
  }
  this._routesFns = [];
}

Fidel.prototype.route = function(path) {
  routie(path);
}

Fidel.onPostInit(function() {
  if (this.routes) {
    this.processRoutes();
    var self = this;
    this.on('destroy', function() {
      self.removeRoutes();
    });
  }
});
