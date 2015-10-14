/**
 * Created by quikj on 9/25/15.
 */
angular.module('AppServices',[])
    .service('ParseHttpService', function ($http) {
    var baseURL = "https://api.parse.com/1/";
    var authenticationHeaders = PARSE__HEADER_CREDENTIALS;

    return {
        login: function () {

            var credentials = {
                "username": "admin",
                "password": "test"
            };

            var settings = {
                method: 'GET',
                url: baseURL + 'login',
                headers: authenticationHeaders,
                // params are for query string parameters
                params: credentials
            };

            // $http returns a promise, which has a then function,
            // which also returns a promise
            return $http(settings)
                .then(function (response) {
                    // In the response resp.data contains the result
                    // check the console to see all of the data returned
                    console.log('login', response);
                    return response.data;
                });
        },
        getObjectByID: function getObjectByID(_ID) {
            var settings = {
                headers: authenticationHeaders
            };
            return $http.get(baseURL + 'classes/stuff/' + _ID, settings)
                .then(function (response) {
                    console.log('getObjectByID', response);
                    return response.data;
                })
        },
        getAllObjects: function getAllObjects() {
            var settings = {
                headers: authenticationHeaders
            };

            // $http returns a promise, which has a then function,
            // which also returns a promise
            return $http.get(baseURL + 'classes/stuff/', settings)
                .then(function (response) {
                    // In the response resp.data contains the result
                    // check the console to see all of the data returned
                    console.log('getAllObjects', response);
                    return response.data;
                });
        },
        addObject: function (_params) {
            var settings = {
                headers: authenticationHeaders
            };
            var dataObject = {
                "name": _params.name,
                "room": _params.room
            };
            var dataObjectString = JSON.stringify(dataObject);
            return $http.post(baseURL + 'classes/stuff', dataObjectString, settings)
                .then(function (response) {
                    console.log('addObject', response);
                    return response.data;
                });
        },
        updateObject: function (_params) {
            var settings = {
                headers: authenticationHeaders
            };
            var dataObject = {
                "name": (_params.name ? _params.name : JSON.null),
                "room": (_params.room ? _params.room : JSON.null)
            };
            var dataObjectString = JSON.stringify(dataObject);
            return $http.put(baseURL + 'classes/stuff/' + _params.objectId, dataObjectString, settings)
                .then(function (response) {
                    console.log('updateObject', response);
                    return response.data;
                });
        },
        deleteObjectById: function (_id) {
            var settings = {
                headers: authenticationHeaders
            };
            return $http.delete(baseURL + 'classes/stuff/' + _id, settings)
                .then(function (response) {
                    console.log('deleteObjectById', response);
                    return response.data;
                });
        }
    }
});
