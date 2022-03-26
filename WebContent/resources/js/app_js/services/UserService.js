/* Service Code */
'use strict';
 
App.factory('UseruserService', ['$http', '$q', 'url',function($http, $q, url){
	
 
    return {
         
            fetchAllUsers: function() {
                  //  return $http.get('http://localhost:8097/CTMS/user/')
            	 return $http.get(url+'user/') 
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
            fetchAllUserID: function(userId) {
                //  return $http.get('http://localhost:8097/CTMS/user/')
          	 return $http.get(url+'userID/'+userId) 
                          .then(
                                  function(response){
                                      return response.data;
                                  }, 
                                  function(errResponse){
                                      console.error('Error while fetching user ID');
                                      return $q.reject(errResponse);
                                  }
                          );
          },
              
            createUser: function(userId){
                    //return $http.post('http://localhost:8097/CTMS/user/', user)
            	return $http.post(url+'user/', userId)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while creating user');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            updateUser: function(user, id){
                  //  return $http.put('http://localhost:8097/CTMS/user/'+id, user)
            	return $http.put(url+'user/'+id, user)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while updating user');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            deleteUser: function(id){
                    //return $http.delete('http://localhost:8097/CTMS/user/'+id)
            	 return $http.delete(url+'user/'+id)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while deleting user');
                                        return $q.reject(errResponse);
                                    }
                            );
            }
         
    };
 
}]);
/* End of Service Code */