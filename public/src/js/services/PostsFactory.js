angular.module('flapperNews')
    .factory('$posts', ['$api', function ($api) {

        var o = {
            posts: []
        };

        o.getAll = function () {
            return $api.get('/posts').success(function (data) {
                angular.copy(data, o.posts);
            });
        };

        o.create = function (post) {
            return $api.post('/posts', post).success(function (data) {
                o.posts.push(data);
            });
        };

        o.upvote = function (post) {
            return $api.put('/posts/' + post._id + '/upvote')
                .success(function (data) {
                    post.upvotes += 1;
                });
        };

        return o;

    }]);
