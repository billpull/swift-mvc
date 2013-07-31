swift-mvc
=========

Attempting to make a no nonsense JS MVC framework.

Dependencies:
---------------
 - jQuery
 - Handlebars
 - [Simrou](https://github.com/buero-fuer-ideen/Simrou)

Creating a new project
------------------------
Here we create a namespace for our project and then
attach a ``Swift.App`` object to our project.

```
var project = {};

project.app = new Swift.App();
```

Initialize Controllers
------------------------
The ``Controller`` object is a child of the ``Swift.App`` instance we
created earlier. 

A Controller takes two parameters:
 - view: the id of an element that the controller will interact with
 - template: the id of a handlebars template script element to render

Controllers have the following default HTTP methods:
 - get: default action is to render the template in ther view.
 - post: not implemented by default.
 - put: not implemented by default.
 - delete: not implemented by default.

These methods are public so they can easily be overridden.

The controller comes with a ``$context`` property which provides the context
for your handlebars template to be rendered.

```
project.controllers = {};

project.controllers.homeController = new project.app.Controller('container', 'home-view');
project.controllers.homeController.$context = {
	name: 'billpull'
};

project.controllers.productController = new project.app.Controller('container', 'product-view');
```

Define Routes
-----------------
Routes will be defined in an object.
Each route is a separate ``Swift.Route`` instance.

The route object takes two params:
 - path: the path in the browser window to access route
 - controller: a reference to a controller for the path.

```
project.routes = {
	home: new Swift.Route('/home', project.controllers.homeController),
	products: new Swift.Route('/products', project.controllers.productController)
};
```

Initialize Application
------------------------
To initalize the application call the run method on your
``Swift.App`` instance.

The run method takes two params;
 - routes: your route object.
 - startRoute: the route that should be navigated to first.

``project.app.run(project.routes, project.routes.home);``