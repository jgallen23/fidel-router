Fidel.prototype.processRoutes = function() {
  if (this.routes) {
    for (var path in this.routes) {
      var methodName = this.routes[path];
      routie(path, this.proxy(this[methodName]));
    }
  }
}

Fidel.prototype.route = function(path) {
  routie(path);
}

Fidel.onPreInit(function() {
  this.processRoutes();
});
