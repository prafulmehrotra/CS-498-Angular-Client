var demoApp = angular.module('demoApp', ['ngRoute', 'demoControllers', 'demoServices','720kb.datepicker']);

demoApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/settings', {
    templateUrl: 'partials/settings.html',
    controller: 'SettingsController'
  }).
  when('/llamalist', {
    templateUrl: 'partials/llamalist.html',
    controller: 'LlamaListController'
  }).
   when('/tasklist', {
    templateUrl: 'partials/tasklist.html',
    controller: 'TaskListController'
  }).
   when('/adduser', {
    templateUrl: 'partials/adduser.html',
    controller: 'AddUser'
  }).
   when('/addtask', {
    templateUrl: 'partials/addtask.html',
    controller: 'AddTask'
  }).
   when('/userview/:id', {
    templateUrl: 'partials/userview.html',
    controller: 'Userview'
  }).
   when('/taskview/:id', {
    templateUrl: 'partials/taskview.html',
    controller: 'Taskview'
  }).
   when('/edittask/:id', {
    templateUrl: 'partials/edittask.html',
    controller: 'Edit'
   }).
  otherwise({
    redirectTo: '/settings'
  });
}]);