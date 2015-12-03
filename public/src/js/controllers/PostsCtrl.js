angular.module('flapperNews')
    .controller('PostsCtrl', ['$scope', '$posts', 'post', '$auth', 'toastr', function ($scope, $posts, post, $auth, toastr) {
        $scope.post = post;
        $scope.isLoggedIn = $auth.isLoggedIn;
        $scope.body = '';

        $scope.addComment = function () {
            if ($scope.body === '') {
                toastr.error('Please check if the comment is filled in', 'Missing data');
                return;
            }
            $posts.addComment(post._id, {
                body: $scope.body,
                author: 'user'
            }).success(function (comment) {
                $scope.post.comments.push(comment);
            });
            $scope.body = '';
        };

        $scope.incrementUpvotes = function (comment) {
            $posts.upvoteComment(post, comment);

        };

    }]);
