angular.module('flapperNews')
    .service('$api', ['$http', function ($http) {

        var fetch = function (url, data, type) {
            $http.request = $http[type]("http://localhost:3000" + url, data);


            return $http.request;
        };

        return {
            get: function (url, data) {
                return fetch(url, {
                    params: data
                }, 'get');
            },
            post: function (url, data) {
                return fetch(url, data, 'post');
            },
            delete: function (url, data) {
                return fetch(url, {
                    params: data
                }, 'delete');
            },
            put: function (url, data) {
                return fetch(url, {
                    params: data
                }, 'put');
            }
        };
    }]);
