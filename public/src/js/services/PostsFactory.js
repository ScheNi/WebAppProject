angular.module('flapperNews')
    .factory('$posts', ['$http', '$auth', 'toastr', function ($http, $auth, toastr) {

        var o = {
            posts: []
        };

        function notAuthorized(err) {
            if (err.status == 401 && err.code=="invalid_token") {
                toastr.error('If you want to upvote, you must be signed in', 'Please sign in');
            }
        }


        o.getAll = function () {
            return $http.get('/posts')
                .success(function (data) {
                    angular.copy(data, o.posts);
                });
        };

        o.create = function (post) {
            return $http.post('/posts', post, {
                headers: {Authorization: 'Bearer ' + $auth.getToken()}
            }).success(function (data) {
                o.posts.push(data);
            });
        };

        o.upvote = function (post) {
            return $http.put('/posts/' + post._id + '/upvote', null, {
                headers: {Authorization: 'Bearer ' + $auth.getToken()}
            }).success(function (data) {
                post.upvotes += 1;
            }).error(function(err) {
                console.log(err);
                notAuthorized(err);
            });
        };

        o.get = function (id) {
            return $http.get('/posts/' + id)
                .then(function (res) {
                    return res.data;
                });
        };

        o.addComment = function (id, comment) {
            return $http.post('/posts/' + id + '/comments', comment, {
                headers: {Authorization: 'Bearer ' + $auth.getToken()}
            });
        };

        o.upvoteComment = function (post, comment) {
            return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote', null, {
                headers: {Authorization: 'Bearer ' + $auth.getToken()}
            }).success(function (data) {
                comment.upvotes += 1;
            }).error(function(err) {
                notAuthorized(err);
            });
        };

        return o;

    }])
;
