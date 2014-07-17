var dramasApp = angular.module('dramasApp', []);
dramasApp.controller('DramasCtrl', function ($scope,$http) {
  
  $scope.host = "127.0.0.1:3000"; 
  
  $scope.updateDramas = new Object();
  $scope.updateDramas.id = "";
  $scope.updateDramas.name = "";

  $scope.editDramas = new Object();
  $scope.editDramas.id = "";
  $scope.editDramas.name = "";
  $scope.editDramas.introduction = "";
  $scope.editDramas.area_id = "";
  $scope.editDramas.actors = "";
  $scope.editDramas.poster_url = "";
  $scope.editDramas.year = "";
  $scope.editDramas.final = "";
  $scope.editDramas.eps_num_str = "";

  $scope.video_eps = new Array();
  $scope.selectDramasLinkID = 0;  
  $scope.url = 'http://' + $scope.host + '/READ/TW/0/1200';

  showData($scope,$scope.url);

  function showData($scope,url) {
    
    $http({method: 'GET', url: $scope.url , headers: {'User-Agent': 'twdramas'}}).success(function(data)
    {
      $scope.dramas = data;
      for (var n=0; n<$scope.dramas.length; n++) {
        if ($scope.dramas[n].actors=="") {
          $scope.dramas[n].tag = "No Actors";
        }
      }
    });
  }

  $scope.save = function() {
    $http({
      url: 'http://' + $scope.host + '/UPDATE/',
      method: "POST",
      data: $.param($scope.editDramas),
      headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
    }).success(function (data, status, headers, config) {
      console.log(data);
    }).error(function (data, status, headers, config) {
      console.log(data);
    });
  }

  $scope.updatelink = function(id,num) {  
    $http({
      url: 'http://' + $scope.host + '/UPDATE/LINK/',
      method: "POST",
      data: $.param($scope.video_eps[num-1]),
      headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
    }).success(function (data, status, headers, config) {
      console.log(data);
    }).error(function (data, status, headers, config) {
      console.log(data);
    });   
  }

  $scope.newlink = function(id) {  
     var n = $scope.video_eps.length;
     $scope.video_eps[n] = new Object();
     $scope.video_eps[n].id = id;
     $scope.video_eps[n].num = n + 1;
     $scope.video_eps[n].link = "";
     $scope.video_eps[n].type = "";
  }  

  $scope.load = function(id) {  
    $scope.selectDramasLinkID = id;
    $http({method: 'GET', url: 'http://' + $scope.host + '/READ/DRAMALINKLIST/' + id }).success(function(data)
    {
      $scope.video_eps = new Array();
      for (var num=0; num<data.length; num++) {
        var video_ep = new Object();
        video_ep.id = id;
        video_ep.num = data[num].num;
        video_ep.link = data[num].link;
        video_ep.type = data[num].type;
        $scope.video_eps[video_ep.num-1] = video_ep;
      }
      for (var n=0; n<$scope.video_eps.length; n++) {

        if (!($scope.video_eps[n])) {
          $scope.video_eps[n] = new Object();
          $scope.video_eps[n].id = id;
          $scope.video_eps[n].num = n + 1;
          $scope.video_eps[n].link = "";
          $scope.video_eps[n].type = "";
        }
      }
    });
  }

  $scope.edit = function(id) {
    $http({method: 'GET', url: 'http://' + $scope.host + '/READ/DRAMAS/' + id }).success(function(data)
    {
      $scope.editDramas.id = data[0].id;
      $scope.editDramas.name = data[0].name;  
      $scope.editDramas.introduction = data[0].introduction;
      $scope.editDramas.area_id = data[0].area_id;
      $scope.editDramas.actors = data[0].actors;
      $scope.editDramas.poster_url = data[0].poster_url;
      $scope.editDramas.year = data[0].year;
      $scope.editDramas.final = data[0].final;
      $scope.editDramas.eps_num_str = data[0].eps_num_str;
    });
  }

  $scope.tw = function() {
    $scope.url = 'http://' + $scope.host + '/READ/TW/0/1000';
    showData($scope,$scope.url);
  }
  $scope.ch = function() {
    $scope.url = 'http://' + $scope.host + '/READ/CH/0/1000';
    showData($scope,$scope.url);
  }
  $scope.kr = function() {
    $scope.url = 'http://' + $scope.host + '/READ/KR/0/1000';
    showData($scope,$scope.url);
  }
  $scope.jp = function() {
    $scope.url = 'http://' + $scope.host + '/READ/JP/0/1000';
    showData($scope,$scope.url);
  }

});

