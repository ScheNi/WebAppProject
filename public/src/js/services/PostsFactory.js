angular.module('flapperNews')
    .factory('$posts', ['$api', function ($api) {

        var o = {
            posts: []
        };

        o.getAll = function () {
            return $api.get('/posts')
                .success(function (data) {
                    angular.copy(data, o.posts);
                });
        };

        o.create = function (post) {
            return $api.post('/posts', post)
                .success(function (data) {
                    o.posts.push(data);
                });
        };

        o.upvote = function (post) {
            return $api.put('/posts/' + post._id + '/upvote')
                .success(function (data) {
                    post.upvotes += 1;
                });
        };

        o.get = function (id) {
            return $api.get('/posts/' + id)
                .then(function (res) {
                    return res.data;
                });
        };

        o.addComment = function (id, comment) {
            return $api.post('/posts/' + id + '/comments', comment);
        };

        o.upvoteComment = function (post, comment) {
            return $api.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote')
                .success(function (data) {
                    comment.upvotes += 1;
                });
        };

        return o;

    }]);
