/**
 * Created by quikj on 9/24/15.
 */
/**
 * Created by quikj on 9/23/15.
 */
myApp = angular.module('firstApp',['ionic','AppControllers','AppServices']);

myApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/home");
    $stateProvider

        .state('home', {
            url: "/home",
            templateUrl: "views/home.html",
            controller: "homeCtrl"
        })
        .state('detail', {
            url: "detail/:objectId",
            templateUrl: "views/detail.html",
            controller: "detailCtrl"
        });
});

