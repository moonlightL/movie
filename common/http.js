(function(angular) {
    "use strict"

    var http = angular.module('movie.service.http', []);
    //由于angular随机分配的回调函数名称不被豆瓣支持，所以自己写jsonp跨域
    http.service("httpService",["$window","$document",function($window,$document) {
        this.jsonp = function(url,data,callback) {
            var fnSuffix = Math.random().toString().replace(".","");
            var cbFuncName = "my_json_cb"+fnSuffix;
            var queryString = url.indexOf("?") == -1 ? "?" : "&";
            for(var key in data) {
                queryString += key + "=" + data[key] + "&";
            }
            queryString += "callback=" + cbFuncName;
            var scriptElement = $document[0].createElement("script");
            scriptElement.src = url + queryString;
            $window[cbFuncName] = function(data) {
                callback(data);
                $document[0].body.removeChild(scriptElement);//跨域访问返回数据后删除
            }
            $document[0].body.appendChild(scriptElement);//添加到页面就进行跨域访问
        };
    }]);

})(angular);
