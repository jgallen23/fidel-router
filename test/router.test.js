
suite('routes', function() {

  var RouteTest = Fidel.declare({
    routes: {
      'test1': 'test1Route',
      'test2': 'test2Route',
      'users/:name': 'usersRoute'
    },
    test1Route: function() {
      assert.ok(this.routes);
      this.test1RouteCalled = true;
    },
    test2Route: function() {
      assert.ok(this.routes);
      this.test2RouteCalled = true;
    },
    usersRoute: function(name) {
      this.userName = name;
      this.usersRouteCalled = true;
    }
  });
  var view = new RouteTest({ el: $('#fixture') });

  setup(function(done) {
    window.location.hash = '';
    setTimeout(done, 100);
  });

  teardown(function() {
    window.location.hash = '';
  });

  test('routie.noConflict', function() {
    assert.equal(typeof window.routie, 'undefined');
  });

  test('router on prototype', function() {
    assert.equal(typeof view.router, 'function');
  });

  test('basic route', function(done) {

    window.location.hash = "test1";

    //delay to let the onhashchange event run
    setTimeout(function() {
      assert.ok(view.test1RouteCalled);
      done();
    }, 100);

  });
  test('another basic route', function(done) {

    window.location.hash = "test2";

    //delay to let the onhashchange event run
    setTimeout(function() {
      assert.ok(view.test2RouteCalled);
      done();
    }, 100);

  });
  test('regex route', function(done) {

    window.location.hash = "users/bob";

    //delay to let the onhashchange event run
    setTimeout(function() {
      assert.ok(view.usersRouteCalled);
      assert.equal(view.userName, 'bob');
      done();
    }, 100);
  });
  
  test('trigger route', function(done) {

    view.test2RouteCalled = false;
    view.route('test2');

    //delay to let the onhashchange event run
    setTimeout(function() {
      assert.ok(view.test2RouteCalled);
      done();
    }, 100);
  });

  test('destroy', function(done) {

    view.test2RouteCalled = false;
    view.destroy();
    window.location.hash = 'test2';

    setTimeout(function() {
      assert.equal(view.test2RouteCalled, false);
      done();
    }, 100);


  });
});
