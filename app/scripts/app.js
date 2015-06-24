var angular = require("angular");
var ngRoute = require("angular-route");
var snippetsArray = require("./snippets");

(function() {

	var CONFIG = {
		SNIPPETS_BASE_URL: "snippets/"
	};

	var app = angular.module("NavDesignApp", ['ngRoute']);

	app.controller("TemplateController", function($scope, $location, $routeParams, $http, $sce, $timeout) {
		$scope.html = "";
		var url = CONFIG.SNIPPETS_BASE_URL + $routeParams.templateName + ".html";
		$http.get(url).success(function(response) {
			$scope.html = response;
		}).error(function() {
			$scope.html = "<p>Ehm, dette kjenner jeg ikke til! :-(</p>";
		});
	});

	app.controller("IndexController", function($scope, $location) {
		$location.path("/snippet/read-me");
	});

	app.controller("HeaderController", function($scope, $routeParams, $location) {

		$scope.snippets = snippetsArray; 
		$scope.currentPage = $routeParams.templateName || $scope.snippets[0];
		$scope.displayTextarea = window.localStorage.getItem("displayTextarea") === "true";
		$scope.buttonText = $scope.displayTextarea ? "Skjul kode" : "Vis kode";	

		$scope.displaySnippet = function(snippet) {
			$location.path("/snippet/" + snippet);
		};

		$scope.toggleTextarea = function() {
			$scope.displayTextarea = !$scope.displayTextarea;
			$scope.buttonText = $scope.displayTextarea ? "Skjul kode" : "Vis kode";
			window.localStorage.setItem("displayTextarea", $scope.displayTextarea);
		};
	
	});

	app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });

	app.config(function($routeProvider) {
		$routeProvider
			.when('/snippet/:templateName', {
				templateUrl: 'preview.html',
				controller: 'TemplateController'
			})
			.otherwise({
				controller: 'IndexController',
				templateUrl: 'preview.html',
			});
	});

})();