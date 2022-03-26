/* Service Code */
'use strict';
App.factory('UsergrpService', ['$http', '$q', 'url',function($http, $q, url){



 
    return {
         
            fetchAllUsers: function() {
                  //  return $http.get('http://localhost:8097/CTMS/usergroup/')
            	 return $http.get(url+'usergroup/')
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while fetching users');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
            
            fetchAllUsersSAW: function() {
                //  return $http.get('http://localhost:8097/CTMS/usergroup/')
          	 return $http.get(url+'usergroupSAW/')
                          .then(
                                  function(response){
                                      return response.data;
                                  }, 
                                  function(errResponse){
                                      console.error('Error while fetching users');
                                      return $q.reject(errResponse);
                                  }
                          );
          },
             
            createUsergroup: function(usergroup){
                   // return $http.post('http://localhost:8097/CTMS/createusergroup/', usergroup)
            	 return $http.post(url+'createusergroup/', usergroup)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while creating usergroup');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            updateUsergroup: function(usergroup, id){
                  //  return $http.put('http://localhost:8097/CTMS/usergroup/'+id, usergroup)
            	   return $http.put(url+'usergroup/'+id, usergroup)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while updating usergroup');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            deleteUsergroup: function(id){
                   // return $http.delete('http://localhost:8097/CTMS/usergroup/'+id)
            	return $http.delete(url+'usergroup/'+id)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while deleting usergroup');
                                        return $q.reject(errResponse);
                                    }
                            );
            }
         
    };
 
}]);
/* End of Service Code */