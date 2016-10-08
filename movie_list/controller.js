(function(angular) {
    "use strict"
    //获取模块
    var module = angular.module('movie.movie_list', ['ngRoute','movie.service.http']);
    //配置路由
    module.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when("/:category/:page", {
            controller:"movieListController",
            templateUrl:"movie_list/view.html"
        });
    }]);
    //配置控制器
    module.controller('movieListController', [
       '$scope',
      '$route',
      '$routeParams',
      'httpService',
      'movieConfig',
      function($scope,$route,$routeParams,httpService,movieConfig) {
        var url = movieConfig.listApiUrl+$routeParams.category;
        var curPage = $routeParams.page - 0;
        var count = movieConfig.pageSize;
        var start = (curPage - 1) * count;
        $scope.subjects = [];
        $scope.totalCount = 0;
        $scope.totalPage = 0;
        $scope.curPage = curPage;
        $scope.title = "加载中...";
        $scope.message = "";
        //为跨域而编写的service
        httpService.jsonp(url,{count:count,start:start,q:$routeParams.q},function(response) {
           $scope.title = response.title;
           $scope.subjects = response.subjects;
           $scope.totalCount = response.total;
           $scope.totalPage = Math.ceil($scope.totalCount/count);
           $scope.$apply("subjects");//手动同步
        });

        $scope.changePage = function(page) {
              if(page >=1&&page <= $scope.totalPage) {
                  $route.updateParams({page:page});
              }
        }
    }]);

})(angular);
