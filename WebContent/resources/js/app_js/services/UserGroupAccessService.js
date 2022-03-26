/* Service Code */
'use strict';
App.factory('UsergrpacsService', ['$http','$q','url', function($http, $q, url){
	


	
	
 
    return {
         
            fetchAllUsers: function() {
                   // return $http.get('http://localhost:8097/CTMS/usergroupaccess/')
            	 return $http.get(url+'usergroupaccess/')
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
             
            fetchAllUsergroups:function(){
           	 return $http.get(url+'findAllusergroup/')
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
            createUsergroupaccess: function(usergrouppageaccess){
                //return $http.post('http://localhost:8097/CTMS/usergroupaccess/', usergroupaccess)
            	return $http.post(url+'createusergroupaccess/', usergrouppageaccess)
                        .then(
                                function(response){
                                    return response.data;
                                }, 
                                function(errResponse){
                                    console.error('Error while creating ');
                                    return $q.reject(errResponse);
                                }
                        );
        },
             
            updateUser: function(usergrouppageaccess, id){
                  //  return $http.put('http://localhost:8097/CTMS/usergroupaccess/'+id, usergroupaccess)
            	      return $http.put(url+'usergroupaccess/'+id, usergrouppageaccess)           
            	        .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while updating usergroupaccess');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            deleteUser: function(id){
                  //  return $http.delete('http://localhost:8097/CTMS/usergroupaccess/'+id)
                    	 return $http.delete(url+'usergroupaccess/'+id)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while deleting usergroupaccess');
                                        return $q.reject(errResponse);
                                    }
                            );
            }
         
    };
 
}]);

/* End of Service Code */