(function(angular) {
    "use strict"

    angular.module('movie', [
        'ngRoute',
        'movie.directives.auto_focus',
        'movie.movie_detail',
        'movie.movie_list'
        ])
        .constant('movieConfig',{
            pageSize : 10,
            listApiUrl:"https://api.douban.com/v2/movie/",
            detailApiUrl:"https://api.douban.com/v2/movie/subject"
        })
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.otherwise({
                redirectTo:"/in_theaters/1"
            });
        }]).controller('searchController', [
        '$scope',
        '$route',
         function($scope,$route){
            $scope.input = "";
            $scope.search = function() {
                $route.updateParams({category:"search",q:$scope.input});
            }
        }]);

})(angular);
