swift-mvc
=========

Attempting to make a no nonsense JS MVC framework.

Dependencies:
---------------
 - jQuery
 - Handlebars
 - (Simrou)[https://github.com/buero-fuer-ideen/Simrou] 

Creating a new project
------------------------
```
var project = {};

project.app = new Swift.App();
```

Initialize Controllers
------------------------
```
project.controllers = {};

project.controllers.homeController = new project.app.Controller('container', 'home-view');
project.controllers.homeController.$compass = {
	name: 'billpull'
};

project.controllers.productController = new project.app.Controller('container', 'product-view');
```

Define Routes
-----------------
```
project.routes = {
	home: new Swift.Route('/home', project.controllers.homeController),
	products: new Swift.Route('/products', project.controllers.productController)
};
```

Initialize Application
------------------------
``project.app.run(project.routes, project.routes.home);``