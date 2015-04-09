// js/services/todos.js
angular.module('demoServices', [])
        .factory('CommonData', function(){
        var data = "";
        return{
            getData : function(){
                return data;
            },
            setData : function(newData){
                data = newData;                
            }
        }
    })
    .factory('Users', function($http, $window) {      
        var baseUrl = $window.sessionStorage.baseurl;
        return {
            get : function() {
                
                return $http.get(baseUrl+'/api/users');
            },
            getd : function(param) {
                
                return $http.get(baseUrl+'/api/users/'+param);
            },
            getparam : function(param) {

            },
            del : function(param) {
                return $http.delete(baseUrl+'/api/users/'+param);
            },
            postdata : function(data) {
                return $http.post(baseUrl+'/api/users',data);
            },
            putdata : function(param,data) {
                return $http.put(baseUrl+'/api/users/'+param,data);
            }
        }
    })
    .factory('Tasks',function($http, $window) {
        var baseUrl = $window.sessionStorage.baseurl;
        return {
            get : function() {
                return $http.get(baseUrl+'/api/tasks');
            },
            getd : function(param) {
                return $http.get(baseUrl+'/api/tasks/'+param);
            },
            postdata : function(data) {
                return $http.post(baseUrl+'/api/tasks',data);
            },
            getparam : function(arg) {
                return $http.get(baseUrl+'/api/tasks?where={"assignedUserName":"'+arg+'","completed":"false"}');
            },
            getparamt : function(arg) {
                return $http.get(baseUrl+'/api/tasks?where={"assignedUserName":"'+arg+'","completed":"true"}');
            }
        }
    });
