(function(angular) {
    "use strict"

    angular.module('movie.directives.auto_focus', [])
        .directive("autoFocus", ["$location", function($location) {
            return {
                restrict: "A",
                link: function($scope, ele, attr, controller) {
                    $scope.$location = $location;
                    $scope.$watch("$location.path()", function(now) {
                        var alink = ele.children().attr("href");
                        var type = alink.replace(/#(\/.+?)\/\d+/, "$1");
                        if (now.startsWith(type)) {
                            ele.parent().children().removeClass('active');
                            ele.addClass("active");
                        }
                    });
                }
            };
        }]);
})(angular);
