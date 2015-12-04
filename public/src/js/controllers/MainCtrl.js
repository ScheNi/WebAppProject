angular.module('flapperNews')
    .controller('MainCtrl', ['$scope', '$posts', '$auth', 'toastr', function ($scope, $posts, $auth, toastr) {
        
        $scope.posts = $posts.posts;
        $scope.isLoggedIn = $auth.isLoggedIn;

        $scope.addPost = function () {
            if (!$scope.title || $scope.title === '') {
                toastr.error('Please check if the title of the post is filled in', 'Missing data');
                return;
            }
            $posts.create({
                title: $scope.title,
                link: $scope.link
            });
            $scope.title = '';
            $scope.link = '';
        };

        $scope.incrementUpvotes = function (post) {
            $posts.upvote(post);
        };

    }]);
