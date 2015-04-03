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
            del : function(param) {
                return $http.delete(baseUrl+'/api/users/'+param);
            }
        }
    })
    .factory('Tasks',function($http, $window) {
        return {
            get : function() {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl+'/api/tasks');
            }
        }
    });
