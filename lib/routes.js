Fidel.prototype.processRoutes = function() {
  if (this.routes) {
    for (var path in this.routes) {
      var methodName = this.routes[path];
      routie(path, this.proxy(this[methodName]));
    }
  }
}

Fidel.onInit(function() {
  this.processRoutes();
});
