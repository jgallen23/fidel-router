#Fidel Routes

This is a plugin for fidel to enable hash routing.  Integration looks something like this:

```js
$.fidel('routeTest', {
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
```
