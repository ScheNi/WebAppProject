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

        o.create = function(post) {
            return $api.post('/posts', post).success(function(data){
                o.posts.push(data);
            });
        };

        return o;

    }]);
