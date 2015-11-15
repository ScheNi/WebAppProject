angular.module('flapperNews', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/views/home.html',
                controller: 'MainCtrl',
                resolve: {
                    postPromise: ['$posts', function($posts){
                        return $posts.getAll();
                    }]
                }
            })
            .state('posts', {
                url: '/posts/{id}',
                templateUrl: '/views/posts.html',
                controller: 'PostsCtrl'
            });

        $urlRouterProvider.otherwise('home');

    }]);
