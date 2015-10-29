/**
 * Created by quikj on 9/24/15.
 */
/**
 * Created by quikj on 9/23/15.
 */
myApp = angular.module('firstApp',['ionic','AppControllers','AppServices']);

myApp.config(function($stateProvider, $urlRouterProvider) {

    function checkForAuthenticatedUser(ParseService, $state) {
        return ParseService.getCurrentUser().then(function (_user) {
            // if resolved successfully return a user object that will set
            // the variable `resolvedUser`
            return _user;
        }, function (_error) {
            $state.go('login');
        })
    }

    $urlRouterProvider.otherwise("app/home");
    $stateProvider

        .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            controller: 'loginCtrl'
        })
        .state('app', {
            url: "/app",
            templateUrl: '<ion-nav-view></ion-nav-view>',
            abstract: true,
            resolve : {
                resolvedUser : checkForAuthenticatedUser
            }
        })
        .state('app.home', {
            url: "/home",
            templateUrl: "views/home.html",
            controller: "homeCtrl",
            resolve: {
                CurrentUser: function(resolvedUser){
                    return resolvedUser;
                }
            }
        })
        .state('app.detail', {
            url: "app/detail/:objectId",
            templateUrl: "views/detail.html",
            controller: "detailCtrl"
        });
});


