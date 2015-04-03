var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('LlamaListController', ['$scope', '$http', 'Users', '$window' , function($scope, $http,  Users, $window) {

  Users.get().success(function(data){
    $scope.llamas = data.data;
  });

  $scope.deleteuser = function(param) {
    console.log("is" + param);
    Users.del(param._id).success(function() {
      Users.get().success(function(data) {
        $scope.llamas = data.data;
      });
    });
  }

}]);

demoControllers.controller('TaskListController', ['$scope', '$http', 'Tasks', '$window' , function($scope, $http,  Tasks, $window) {
  Tasks.get().success(function(data){
    $scope.tasks = data.data;
  });
}]);

demoControllers.controller('AddUser', ['$scope', '$http', 'User', '$window' , function($scope, $http,  User, $window) {
  
  
}]);

demoControllers.controller('AddTask', ['$scope', '$http', 'Tasks', '$window' , function($scope, $http,  Tasks, $window) {
  
  
}]);


demoControllers.controller('Userview', ['$scope', '$http', 'Users', '$window', '$routeParams', function($scope, $http,  Users, $window,$routeParams) {
  var param = String($routeParams.id);
  console.log(param);

  Users.getd(param).success(function(data){
    $scope.user=data.data;
  });
  
}]);


demoControllers.controller('SettingsController', ['$scope' , '$window' , function($scope, $window) {
  $scope.url = $window.sessionStorage.baseurl;

  $scope.setUrl = function(){
    $window.sessionStorage.baseurl = $scope.url; 
    $scope.displayText = "URL set";

  };

}]);

/*demoControllers.controller('FirstController', ['$scope', 'CommonData'  , function($scope, CommonData) {
  $scope.data = "";
   $scope.displayText = ""

  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  };

}]);

demoControllers.controller('SecondController', ['$scope', 'CommonData' , function($scope, CommonData) {
  $scope.data = "";

  $scope.getData = function(){
    $scope.data = CommonData.getData();

  };

}]);*/
