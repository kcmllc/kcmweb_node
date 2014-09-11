var finintel = angular.module('finintel', ['toastr'])

finintel.controller('finintelCtrl', function ($scope, $http, toastr){

$scope.getTicker = function(){
    $http.post('/finintel', {ticker: $scope.ticker})
        .success(function(data){
            $scope.tickerdata = data
        })
        .error(function(data){
            toastr.error('Ticker not found', 'Cannot find the requested ticker')
        })
    $http.post('/articles/ticker/'+ $scope.ticker)
        .success(function(data){
            $scope.articles = data
        })
        .error(function(data){
            $scope.articles = ""
            toastr.error('No Articles', 'No news articles found for the requested ticker')
        })
    }
})
angular.bootstrap($('#finintel'),['finintel'])

