var app = angular.module("app", ['ngRoute']).config(function($routeProvider){
	$routeProvider.when('/login', {
		templateUrl: 'login.html',
		controller: 'LoginController'
	});

	$routeProvider.when('/home', {
		templateUrl: 'home.html',
		controller: 'HomeController'
	});

	$routeProvider.otherwise({ redirectTo: '/login' });
});

app.factory("AuthenticationService", function($location) {
	return {
		login: function(credentials) {
			if (credentials.username === "admin") {
				$location.path('/home');
			}
		},
		logout: function() {
			$location.path('/login');
		}
	}
});

app.controller('LoginController', function($scope, AuthenticationService) {
	$scope.credentials = { username: "", password: "" };
	
	$scope.login = function() {
		AuthenticationService.login($scope.credentials);
	};
});

app.controller('HomeController', function($scope, AuthenticationService) {
	$scope.message = "Hover to see a sample message!";

	$scope.logout = function() {
		AuthenticationService.logout();
	}
});

app.directive('messageOnHover', function() {
	return {
		restrict: "A", // A = Attribute, C = Class, E = Element, M = HTML Comment
		link: function(scope, element, attributes) {
			var originalMessage = scope.message;
			element.bind("mouseover", function() {
				scope.message = attributes.message;
				scope.$apply();
			});
			element.bind("mouseout", function() {
				scope.message = originalMessage;
				scope.$apply();
			});
		}
	};
});