var myApp = angular.module("templateStore.templates", ["ngRoute"]);

myApp.config(function($routeProvider) {

    $routeProvider
        .when("/templates", {
            templateUrl: "templates/templates.html",
            controller: "TemplatesController"
        })
        .when("/templates/:templateId", {
            templateUrl: "templates/template-details.html",
            controller: "TemplateDetailsController"
        });
});

myApp.controller("TemplatesController", ["$scope", "$http", function($scope, $http) {


    $http({
        method: "GET",
        url: "json/templates.json"
    }).then(function (response){
        console.log(response.data);
        $scope.templates = response.data;
    },function (error){
        console.log(error);
    });
    // console.log("TemplatesController Init: ", $scope);
}]);

myApp.controller("TemplateDetailsController", ["$scope", "$http", "$routeParams", "$filter", function($scope, $http, $routeParams, $filter) {

    var templateId = $routeParams.templateId;
    $http({
        method: "GET",
        url: "json/templates.json"
    }).then(function (response){
        console.log(response.data);
        $scope.template = $filter("filter")(response.data, function(d) {
            return d.id == templateId;
        })[0];
        $scope.mainImage = $scope.template.images[0].name;
    },function (error){
        console.log(error);
    });

    $scope.setImage = function(image) {
        $scope.mainImage = image.name;
    }
}]);