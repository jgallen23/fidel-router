/*!
  * Fidel - A javascript view controller
  * v2.0.0
  * https://github.com/jgallen23/fidel
  * copyright JGA 2012
  * MIT License
  */

(function(w, $) {

var Fidel = function(el, obj, options) {
  $.extend(this, obj);
  this.el = el;
  this.els = {};
  obj.defaults = obj.defaults || {};
  this.options = $.extend({}, obj.defaults, options);
  $('body').trigger('FidelPreInit', this);
  this.getElements();
  this.delegateEvents();
  this.delegateActions();
  if (this.init) {
    this.init();
  }
  $('body').trigger('FidelPostInit', this);
};
Fidel.prototype.eventSplitter = /^(\w+)\s*(.*)$/;
Fidel.prototype.find = function(selector) {
  return this.el.find(selector);
};
Fidel.prototype.proxy = function(func) {
  return $.proxy(func, this);
};

Fidel.prototype.getElements = function() {
  if (!this.elements)
    return;

  for (var selector in this.elements) {
    var elemName = this.elements[selector];
    this.els[elemName] = this.find(selector);
  }
};

Fidel.prototype.delegateEvents = function() {
  var self = this;
  if (!this.events)
    return;
  for (var key in this.events) {
    var methodName = this.events[key];
    var match = key.match(this.eventSplitter);
    var eventName = match[1], selector = match[2];

    var method = this.proxy(this[methodName]);

    if (selector === '') {
      this.el.on(eventName, method);
    } else {
      if (this.els[selector]) {
        this.els[selector].on(eventName, method);
      } else {
        this.el.on(eventName, selector, method);
      }
    }
  }
};

Fidel.prototype.delegateActions = function() {
  var self = this;
  self.el.on('click', '[data-action]', function(e) {
    var el = $(this);
    var action = el.attr('data-action');
    if (self[action]) {
      self[action](e, el);
    }
  });
};

Fidel.prototype.on = function(eventName, cb) {
  this.el.on(eventName, cb);
};

Fidel.prototype.emit = function(eventName, data) {
  this.el.trigger(eventName, data);
};
Fidel.prototype.hide = function() {
  if (this.views) {
    for (var key in this.views) {
      this.views[key].hide();
    }
  }
  this.el.hide();
};
Fidel.prototype.show = function() {
  if (this.views) {
    for (var key in this.views) {
      this.views[key].show();
    }
  }
  this.el.show();
};

Fidel.prototype.destroy = function() {
  this.el.empty();
  //TODO: unbind events
  this.emit('destroy');
};

Fidel.declare = function(obj) {
  return function(el, options) {
    return new Fidel(el, obj, options);
  }
};

//for plugins
Fidel.onPreInit = function(fn) {
  $('body').on('FidelPreInit', function(e, obj) {
    fn.call(obj);
  });
};
Fidel.onPostInit = function(fn) {
  $('body').on('FidelPostInit', function(e, obj) {
    fn.call(obj);
  });
};

$.declare = function(name, obj) {

  $.fn[name] = function() {
    var args = Array.prototype.slice.call(arguments);
    var options = args.shift();

    return this.each(function() {
      var $this = $(this);

      var data = $this.data(name);

      if (!data) {
        data = new Fidel($this, obj, options);
        $this.data(name, data); 
      }
      if (typeof options === 'string') {
        data[options].apply(data, args);
      }
    });
  };

  $.fn[name].defaults = obj.defaults || {};

};

$.Fidel = Fidel;

w.Fidel = Fidel;
})(window, window.jQuery || window.Zepto);
