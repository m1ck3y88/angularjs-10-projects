var myApp = angular.module("myApp", ["ngRoute"]);

myApp.config(function ($routeProvider) {

    $routeProvider
        .when("/main", {
            templateUrl: "main.html",
            controller: "MainController"

        })
        .when("/about", {
            templateUrl: "about.html",
            controller: "MainController"

        })
        .when("/services", {
            templateUrl: "services.html",
            controller: "ServicesController"

        })
        .when("/contact", {
            templateUrl: "contact.html",
            controller: "ContactController"

        })
        .otherwise({redirectTo: "/main"})

});

myApp.controller("MainController", ["$scope", "$log", "$http", function($scope, $log, $http) {
    $scope.url = window.location.href;
    $scope.message = $scope.url.includes("/main") ? "This is the MainController" : "This is the AboutController";

    $log.info("$scope.name = " + $scope.message);

    $http.get("services.json").then(function (response) {
        $log.info("Response", response.data);

        $scope.services = response.data;
    });
}]);

myApp.controller("ServicesController", ["$scope", "$log", "$http", function($scope, $log, $http) {
    $scope.message = "This is the ServicesController";

    $log.info("$scope.name = " + $scope.message);

    $http.get("services.json").then(function (response) {
        $log.info("Response", response.data);

        $scope.services = response.data;
    });
}]);

myApp.controller("ContactController", ["$scope", "$log", "$http", function($scope, $log, $http) {
    $scope.message = "This is the ContactController";

    $log.info("$scope.name = " + $scope.message);

    $http.get("locations.json").then(function (response) {
        $log.info("Response", response.data);

        $scope.locations = response.data;
    });
}]);