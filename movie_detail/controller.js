(function(angular) {
    "use strict"
    //获取模块
    var module = angular.module('movie.movie_detail', ['ngRoute','movie.service.http']);
    //配置路由
    module.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when("/detail/:id", {
            controller:"movieDetailController",
            templateUrl:"movie_detail/view.html"
        });
    }]);
    //配置控制器
    module.controller('movieDetailController', [
       '$scope',
      '$route',
      '$routeParams',
      'httpService',
      'movieConfig',
      function($scope,$route,$routeParams,httpService,movieConfig) {
         var id = $routeParams.id;
        var url = movieConfig.detailApiUrl+id;
        $scope.movie = {};
        //为跨域而编写的service
        httpService.jsonp(url,{},function(response) {
           $scope.movie = response;
           $scope.$apply();//手动同步
        });


    }]);

})(angular);
