angular.module('flapperNews', ['ui.router', 'ngAnimate', 'toastr'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/views/home.html',
                controller: 'MainCtrl',
                resolve: {
                    postPromise: ['$posts', function ($posts) {
                        return $posts.getAll();
                    }]
                }
            })
            .state('posts', {
                url: '/posts/{id}',
                templateUrl: '/views/posts.html',
                controller: 'PostsCtrl',
                resolve: {
                    post: ['$stateParams', '$posts', function ($stateParams, $posts) {
                        return $posts.get($stateParams.id);
                    }]
                }
            })
            .state('images', {
                url: '/images',
                templateUrl: '/views/images.html',
                controller: 'ImagesCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/views/login.html',
                controller: 'AuthCtrl',
                onEnter: ['$state', '$auth', function ($state, $auth) {
                    if ($auth.isLoggedIn()) {
                        $state.go('home');
                    }
                }]
            })
            .state('register', {
                url: '/register',
                templateUrl: '/views/register.html',
                controller: 'AuthCtrl',
                onEnter: ['$state', '$auth', function ($state, $auth) {
                    if ($auth.isLoggedIn()) {
                        $state.go('home');
                    }
                }]
            });

        $urlRouterProvider.otherwise('home');

    }]);
