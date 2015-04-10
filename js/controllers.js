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

demoControllers.controller('TaskListController', ['$scope', '$http', 'Users','Tasks', '$window' , function($scope, $http, Users, Tasks, $window) {
  

 $scope.ct = 0;
 $scope.first = 0;
 $scope.last = 10;
 $scope.currpage = 1;
 $scope.numofpages = 0;
  var req = '?where={"completed":false}&sort={"assignedUserName":1}';
  Tasks.getrequest(req).success(function(data){
    $scope.tasks = data.data;
    $scope.pagenum = 1;
    $scope.currtasks = $scope.tasks.slice($scope.first,$scope.last);
    $scope.numofpages = Math.ceil(($scope.tasks.length)/10);
    console.log($scope.numofpages);
    $scope.dropdown="name";
    $scope.all="pending";
    $scope.ordersort="Ascending";
  });
  
  $scope.$watch('tasks', function() {
    $scope.ct = $scope.tasks.length;
    $scope.numofpages = Math.ceil(($scope.tasks.length)/10);
  });


  $scope.deletetask = function(param) {
    
    Tasks.del(param._id).success(function() {
          Tasks.getrequest(req).success(function(data){
            $scope.tasks = data.data;
            $scope.currtasks = $scope.tasks.slice($scope.first,$scope.last);
            });
       });

    var userdel = param.assignedUserName;
    if(userdel == "unassigned") {
       //
    }
    else {
      //console.log(param._id);
      Users.getd(param.assignedUser).success(function(data) {
        var llamas = data.data;
        //console.log(llamas);
        var x = 0;
        var narr = [];
        for(x=0;x<llamas.pendingTasks.length;x++) {
          if(llamas.pendingTasks[x] != param._id) {
           narr.push($scope.llamas.pendingTasks[x]);
          }
          
        }
        llamas.pendingTasks = narr;
        //console.log(llamas);
        Users.putdata(llamas._id,llamas).success(function(data) {
          var x = data.data;
          //console.log(x);
          Tasks.get().success(function(data){
            $scope.tasks = data.data;
           });
          console.log("Done");
        });
      });
    }
    
  }
  $scope.next = function() {
      if($scope.currpage + 1 <= $scope.numofpages) {
        $scope.first += 10;
        $scope.last += 10;
        $scope.currtasks = $scope.tasks.slice($scope.first,$scope.last);
        $scope.currpage += 1;
      }
    }
  $scope.prev = function() {
      if($scope.currpage - 1 > 0) {
        $scope.first -= 10;
        $scope.last -= 10;
        $scope.currtasks = $scope.tasks.slice($scope.first,$scope.last);
        $scope.currpage -= 1;
      }
    } 
  $scope.clickevent = function() {
    var request='sort={"'+$scope.dropdown+'":';

    if($scope.ordersort=='Ascending') {
      request = request + '1}'
    }
    else {
      request = request + '-1}'
    }
    
    if($scope.all == "all") {
      request = '?'+request;
    }
    else {
      if($scope.all == "completed") {
        request = '?where={"completed":true}&' + request;
      }
      else {
        request = '?where={"completed":false}&' + request;
      }
    }
    req = request;
    console.log(req);
    Tasks.getrequest(request).success(function(data) {
      $scope.tasks = data.data;
      $scope.currpage = 1;
      $scope.first = 0;
      $scope.last = 10;
      $scope.currtasks = $scope.tasks.slice($scope.first,$scope.last);
      $scope.numofpages = Math.ceil(($scope.tasks.length)/10);
    });
    //console.log($scope.all);
    //console.log($scope.dropdown);
    //console.log($scope.ordersort);

  } 

  $scope.sortclick = function() {
    var request='sort={"'+$scope.dropdown+'":';

    if($scope.ordersort=='Ascending') {
      request = request + '1}'
    }
    else {
      request = request + '-1}'
    }
    
    if($scope.all == "all") {
      request = '?'+request;
    }
    else {
      if($scope.all == "completed") {
        request = '?where={"completed":true}&' + request;
      }
      else {
        request = '?where={"completed":false}&' + request;
      }
    }
    
    req = request;
    console.log(req);
    Tasks.getrequest(request).success(function(data) {
      $scope.tasks = data.data;
      $scope.currpage = 1;
      $scope.first = 0;
      $scope.last = 10;
      $scope.currtasks = $scope.tasks.slice($scope.first,$scope.last);
      $scope.numofpages = Math.ceil(($scope.tasks.length)/10);
    });
  }

  $scope.orderclick = function() {
    var request='sort={"'+$scope.dropdown+'":';

    if($scope.ordersort=='Ascending') {
      request = request + '1}'
    }
    else {
      request = request + '-1}'
    }
    
    if($scope.all == "all") {
      request = '?'+request;
    }
    else {
      if($scope.all == "completed") {
        request = '?where={"completed":true}&' + request;
      }
      else {
        request = '?where={"completed":false}&' + request;
      }
    }
    
    req = request;
    console.log(request);
    Tasks.getrequest(request).success(function(data) {
      $scope.tasks = data.data;
      $scope.currpage = 1;
      $scope.first = 0;
      $scope.last = 10;
      $scope.currtasks = $scope.tasks.slice($scope.first,$scope.last);
      $scope.numofpages = Math.ceil(($scope.tasks.length)/10);
    });
  }

 
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
    
    Tasks.getparam($scope.user.name).success(function(data) {
      
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

  $scope.completedtask = function(param){
    console.log("here");var post = param;
    post.completed = true;
    //console.log(post);
    Tasks.putdata(param._id,post).success(function(data) {
      Tasks.getparam($scope.user.name).success(function(data) {
      
      if(data.data.length!=0) {
         $scope.taskcomp=data.data;
         $scope.check = true;
      }
      else {
           $scope.status="No pending Tasks";
           $scope.check = false;
      }
       });
      Tasks.getparamt($scope.user.name).success(function(data) {
      $scope.completed = data.data;
      $scope.showcompletedstatus = false;
      $scope.showcompleted = true;
       });
    });

  }  
  
}]);

demoControllers.controller('Taskview', ['$scope', '$http', 'Users', 'Tasks','$window', '$routeParams', function($scope, $http,  Users, Tasks, $window,$routeParams) {
  var param = String($routeParams.id);
  Tasks.getd(param).success(function(data) {
    $scope.spectask = data.data;
    console.log($scope.spectask);
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

