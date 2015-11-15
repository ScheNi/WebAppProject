angular.module('flapperNews')
    .factory('$posts', ['$api', function ($api) {

        var o = {
            posts: []
        };

        o.getAll = function() {
            return $api.get('/posts').success(function(data){
                angular.copy(data, o.posts);
            });
        };

        return o;

    }]);
