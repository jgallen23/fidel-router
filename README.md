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
	},
	test2Route: function() {
	},
	usersRoute: function(name) {
	}
});
$('#selector').routeTest();
```
