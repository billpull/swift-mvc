(function () {
	var root = this,
		previousSwift = root.Swift,
		Swift;

	if (typeof exports !== 'undefined') {
		Swift = exports;
	} else {
		Swift= root.Swift = {};
	}

	Swift.noConflict = function() {
		root.Swift = previousSwift;
		return this;
	};


	Swift.Route = function (path, controller) {
		var route = this;

		route.path = path;
		route.controller = controller;
	};

	Swift.Model = function (data) {
		model = this;

		model = $.extend({}, model, data);
	};

	Swift.App = function () {
		var app = this;

		app._routes = [];
		app._routeProvider = {};

		app._routeHandler = function (route, verb) {
			return function (event, params) {
				if (route.controller) {
					route.controller[verb].apply(route.controller, params);
				} else {
					throw "Controller Not Implemented For:"+ route.path;
				}
			};
		};

		app._registerRoute = function (route) {
			var routeMethods = {
				get: app._routeHandler(route, 'get'),
				put: app._routeHandler(route, 'put'),
				post: app._routeHandler(route, 'post'),
				delete: app._routeHandler(route, 'delete')
			};

			app._routeProvider[route.path] = routeMethods;
		};

		app.Controller = function (view, template) {
			var controller = this;
			
			controller.$context = {};

			controller.view = view;
			controller.template = template;

			controller.render = function () {
				var $viewContainer = $('#' + controller.view),
					templateName = controller.template,
					$templateSelector = $('#' + templateName);

				if (!$viewContainer.length) {
				    throw "View Container Does Not Exist:" + controller.view;
				} else if (!$templateSelector.length) {
					throw "Template Does Not Exist:" + controller.template;
				} else {
					var templateStr = $templateSelector.html();
						template = Handlebars.compile(templateStr),
						compiled = template(controller.$context);
					
					$viewContainer.html(compiled);
				}
			};

			controller.get = function () {
				controller.render();
			};

			controller.put = function () {
				throw "Not Implemented";
			};

			controller.post = function () {
				throw "Not Implemented";
			};

			controller.delete = function () {
				throw "Not Implemented";
			};
		};

		return {
			Controller: function (view, template) { 
				return new app.Controller(view, template); 
			},
			run: function (routes, startRoute) {
				for (var route in routes) {
					if (routes.hasOwnProperty(route)) {
						app._registerRoute(routes[route]);
					}
				}

				app._router = new Simrou(app._routeProvider);

				app._router.start(startRoute.path);
			}
		};
	};

	return {
		Route: function (path, controller) { return new Swift.Route(path, controller); },
		Model: function (data) { return new Swift.Model(data); },
		App: function () { return new Swift.App(); }
	};
})();