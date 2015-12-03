angular.module('flapperNews')
    .directive('slider', ['$timeout', function ($timeout) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                images: '='
            },
            link: function (scope, elem, attrs) {

                scope.currentIndex = 0;

                scope.next = function () {
                    if(scope.currentIndex < scope.images.length -1) {
                       scope.currentIndex++;
                    } else {
                       scope.currentIndex = 0;
                    }
                };

                scope.prev = function () {
                    if(scope.currentIndex > 0) {
                       scope.currentIndex--;
                    } else {
                       scope.currentIndex = scope.images.length - 1;
                    }
                };

                scope.$watch('currentIndex', function () {
                    scope.images.forEach(function (image) {
                        image.visible = false;
                    });
                    scope.images[scope.currentIndex].visible = true;
                });

                // Automatic slideshow

                var timer;

                var sliderFunc = function () {
                    timer = $timeout(function () {
                        scope.next();
                        timer = $timeout(sliderFunc, 5000);
                    }, 5000);
                };

                sliderFunc();

                scope.$on('$destroy', function () {
                    $timeout.cancel(timer);
                });

            },
            templateUrl: '/views/slider.html'
        };
    }]);
