var demoApp = angular.module('demoApp', ['ngRoute', 'demoControllers', 'demoServices']);

demoApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  /*  when('/firstview', {
    templateUrl: 'partials/firstview.html',
    controller: 'FirstController'
  }).
  when('/secondview', {
    templateUrl: 'partials/secondview.html',
    controller: 'SecondController'
  }).*/
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
  otherwise({
    redirectTo: '/settings'
  });
}]);