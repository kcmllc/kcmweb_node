var articles = angular.module('articles', ['ngRoute','ngSanitize', 'ui.tinymce', 'xeditable', 'toastr'])

articles.config(function ($routeProvider, $locationProvider) {
    //configure the routing rules here
    $routeProvider
        .when('/articles/id/:id', {
            controller: 'articlesCtrl'
        })
        .when('/articles', {
            controller: 'newArticleCtrl'
        })
        .otherwise({
            controller: 'newArticleCtrl'
        })

    //routing DOESN'T work without html5Mode
    $locationProvider.html5Mode(true)
})

articles.controller('articlesCtrl', function ($scope, $http, $routeParams,$route,$location, toastr){
    var id = $location.path().split('/')[3]
    $http.post('/articles/id/'+id, {id: id})
        .success(function(data){
            $scope.article = data[0]
        })
        .error(function(data){
            alert('error')
        })
    $scope.edit = function(){
            $('#tags').hide()
            $('#ticker').hide()
            $('#thoughts_response').hide()
            $('#edit_tags').show()
            $('#edit_ticker').show()
            $('#edit_thoughts_response').show()
            $('#submit').show()
    }
    $scope.submit = function(){
        $http.put('/articles/id/'+id, {article: $scope.article})
            .success(function(data){
                toastr.success('success', 'Article Saved!', 'Article Saved!')
                location.reload()
            })
            .error(function(data){
                toastr.error('Error', 'Article Not Updated!', 'Article Not Updated!')
            })
    }
})

articles.controller('newArticleCtrl', function ($scope, $http, $routeParams,$route,$location,toastr){
    $scope.submitArticle = function(){
        $http.post('/articles', {newArticle:$scope.newArticle})
            .success(function(data){
                toastr.success('success', 'Article Saved!', 'Article Saved!')
                location.reload()
            })
            .error(function(data){
                toastr.error('Error', 'Article Not Saved!', 'Article Not Saved!')
            })
    }
})

articles.run(function(editableOptions){
    editableOptions.theme='bs3'
})
