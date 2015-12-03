angular.module('flapperNews')
    .controller('MainCtrl', ['$scope', '$posts', '$auth', 'toastr', function ($scope, $posts, $auth, toastr) {

        $scope.images = [{
            src: 'img1.png',
            title: 'Pic 1'
        }, {
            src: 'img2.jpg',
            title: 'Pic 2'
        }, {
            src: 'img3.jpg',
            title: 'Pic 3'
        }, {
            src: 'img4.png',
            title: 'Pic 4'
        }, {
            src: 'img5.png',
            title: 'Pic 5'
        }];

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
