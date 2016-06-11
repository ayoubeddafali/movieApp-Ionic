
var app = angular.module('starter', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
app.controller('mainCtrl',function ($http , $scope) {
  $scope.movieTitle = "";
});
function reformat(movieTitle) {
  return movieTitle.split(' ').join('+');
}
app.controller('movieCtrl', function ($http,$scope,$state) {
  $scope.movie = {};
  $scope.movieTitle = reformat($state.params.movieTitle);
  $http.get('http://www.omdbapi.com/?t='+ $scope.movieTitle +'&y=&plot=full&r=json')
      .success(function (response) {
        if(response.Response !== 'True'){
          $state.go('error');

        }else {
          $scope.movie = response;
          if ($scope.movie.Poster.indexOf('http') != 0){
            $scope.movie.Poster = 'http://www.thatpetplace.com/c.1043140/site/img/photo_na.jpg';
          }
        }
      });
});

app.controller('myCtrl',function ($scope , $state,$ionicHistory) {
  var path = window.location.pathname;
  var page = path.split("/").pop();
  $scope.pageName = page ;
  $scope.goBack = function () {
    $state.go('main');
  }
});

app.config(function ($stateProvider , $urlRouterProvider) {
  $stateProvider.state('search',{
    url :'/search/:movieTitle',
    templateUrl:'views/search.html'
  });
  $stateProvider.state('main',{
    url :'/main',
    templateUrl:'views/main.html'
  });
  $stateProvider.state('error',{
    url:'/error',
    templateUrl:'views/error.html'
  });

  $urlRouterProvider.otherwise('/main');
});