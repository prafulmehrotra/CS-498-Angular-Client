var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('LlamaListController', ['$scope', '$http', 'Users', '$window' , function($scope, $http,  Users, $window) {

  Users.get().success(function(data){
    $scope.llamas = data.data;
  });

  $scope.deleteuser = function(param) {
    
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

  /*$scope.deletetask = function(param) {
    
    Tasks.del(param._id).success(function() {
      Users.get().success(function(data) {
        $scope.llamas = data.data;
      });
    });
  }*/
 
}]);

demoControllers.controller('AddUser', ['$scope', '$http', 'Users', '$window' , function($scope, $http,  Users, $window) {
  $scope.checkname="";
  $scope.checkemail="";


  $scope.post = function() {
    $scope.checkname="";
    $scope.checkemail="";
    $scope.fin = "";
    if($scope.name == undefined || $scope.email == undefined)
    {
      if($scope.name == undefined)
        {
          $scope.checkname="Invalid Name";
        }
      if($scope.email == undefined) {
          $scope.checkemail="Invalid Email";
        }
    }
    else {
        var em = String($scope.email);
        var p1 = em.indexOf("@");
        if(em.indexOf("@") > 0)
        {
          var em2 = em.substring(p1);
          if(em2.indexOf(".") > 0) {
            var post = {
              name:$scope.name,
              email:$scope.email};
            Users.postdata(post).success(function() {
              $scope.fin = "User " + $scope.name + " added to database!";  
             });
          }
          else {
            $scope.checkemail="Invalid Email";
          }
        }
        else {
          $scope.checkemail="Invalid Email";
        }
    }  
  }
  
  
}]);

demoControllers.controller('AddTask', ['$scope', '$http', 'Users','Tasks', '$window' , function($scope, $http, Users, Tasks, $window) {
  Users.get().success(function(data) {
    $scope.users = data.data;
  })
  $scope.posttask = function() {
    $scope.fin1="";
    $scope.fin2="";
    if( $scope.suser == undefined || $scope.name==undefined) {
      $scope.fin1="Invalid task name or deadline";
    }
    else {
      var post = {
        name:$scope.name,
        assignedUserName:$scope.suser.name,
        assignedUser:$scope.suser._id,
        completed:false,
        description:$scope.ds,
        deadline:$scope.date};
        
      Tasks.postdata(post).success(function(data) {
        var taskid = data.data._id;
        var userid = $scope.suser._id;
        Users.getd(userid).success(function(user) {
          var userdata = user.data;
          userdata.pendingTasks.push(taskid);
          Users.putdata(userid,userdata).success(function() {
            $scope.fin2 = "Task added!";
          });
        });
        
      });
    }

  }  
  
}]);


demoControllers.controller('Userview', ['$scope', '$http', 'Users', 'Tasks','$window', '$routeParams', function($scope, $http,  Users, Tasks, $window,$routeParams) {
  var param = String($routeParams.id);
  var name="";
  $scope.check=false;
  $scope.but=true;
  $scope.showcompleted=false;
  $scope.showcompletedstatus = false;
  $scope.completedstatus = "";
  Users.getd(param).success(function(data){
    $scope.user=data.data;
    name = String($scope.user.name);
    console.log(name);
    Tasks.getparam($scope.user.name).success(function(data) {
      console.log($scope.user.name);
      if(data.data.length!=0) {
         $scope.taskcomp=data.data;
         $scope.check = true;
      }
      else {
           $scope.status="No pending Tasks";
      }
    });
  });

  $scope.show = function() {
    $scope.but = false;
    
    Tasks.getparamt($scope.user.name).success(function(data) {
      $scope.completed = data.data;
      if($scope.completed.length!=0) {
        $scope.showcompleted=true;
      }
      else {
        $scope.completedstatus = "No completed tasks!";
        $scope.showcompletedstatus = true;
      }
    });
  }  
  
}]);

demoControllers.controller('Taskview', ['$scope', '$http', 'Users', 'Tasks','$window', '$routeParams', function($scope, $http,  Users, Tasks, $window,$routeParams) {
  var param = String($routeParams.id);
  Tasks.getd(param).success(function(data) {
    $scope.spectask = data.data;
  });





}]);


demoControllers.controller('Edit', ['$scope', '$http', 'Users', 'Tasks','$window', '$routeParams', function($scope, $http,  Users, Tasks, $window,$routeParams) {
  var param = String($routeParams.id);
  Tasks.getd(param).success(function(data) {
    $scope.task = data.data;
    $scope.name = $scope.task.name;
    $scope.ds = $scope.task.description;
     Users.get().success(function(data) {
      $scope.users = data.data;
     });
  });

  $scope.edittask = function() {
    var post = {
      name:$scope.name,
      assignedUserName:$scope.suser.name,
      assignedUser:$scope.suser._id,
      completed:$scope.complete,
      description:$scope.ds,
      deadline:$scope.date
    };
    console.log(post);
  }
  






}]);


demoControllers.controller('SettingsController', ['$scope' , '$window' , function($scope, $window) {
  $scope.url = $window.sessionStorage.baseurl;

  $scope.setUrl = function(){
    $window.sessionStorage.baseurl = $scope.url; 
    $scope.displayText = "URL set";

  };

}]);

