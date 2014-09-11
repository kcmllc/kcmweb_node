var strategyApp = angular.module('strategyApp', ['toastr'])


strategyApp.controller('strategyCtrl', function($scope, $http, toastr){
    $http.post('/strategy')
        .success(function(data){
            $scope.strategies = data
    })
        .error(function(data){
            alert(data)
    })
    $scope.update = function(strategy){
        $http.put('/strategy/'+strategy.ticker, strategy)
        .success(function(data){
            toastr.success('success', 'Strategy Updated!', 'Strategy Updated!')
        })
        .error(function(data){
            toastr.error('Error', 'Strategy Not Updated!', 'Strategy Not Updated!')
        })
    }
    $scope.create = function(strategy){
        $http.post('/strategy/'+strategy.ticker, strategy)
        .success(function(data){
            toastr.success('success', 'Strategy Updated!', 'Strategy Updated!')
        })
        .error(function(data){
            toastr.error('Error', 'Strategy Not Updated!', 'Strategy Not Updated!')
        })
    }
})
angular.bootstrap($('#strategy'), ['strategyApp'])


