/* Service Code */
'use strict';
 
App.factory('wfService', ['$http', '$q', 'url',function($http, $q, url){
	
 
    return {
            
            fetchAllUsers: function() {
                  //  return $http.get('http://localhost:8097/CTMS/user/')
            	 return $http.get(url+'wfheader/') 
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
            fetchAllicscmap: function() {
                //  return $http.get('http://localhost:8097/CTMS/user/')
          	 return $http.get(url+'fetchAllissuesolutioncategorymap/') 
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
            	 return $http.get(url+'fetchAllusergroup/')
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
            createwfheader: function(wfheaderId){
               // return $http.post('http://localhost:8097/CTMS/wfheader/', wfheader)
            	return $http.post(url+'wfheader/', wfheaderId)
                        .then(
                                function(response){
                                    return response.data;
                                }, 
                                function(errResponse){
                                    console.error('Error while creating Work Flow Header');
                                    return $q.reject(errResponse);
                                }
                        );
        },
        updateUser: function(wfheader, id){
           // return $http.put('http://localhost:8097/CTMS/wfheader/'+id, wfheader)
        	return $http.put(url+'wfheader/'+id, wfheader)
                    .then(
                            function(response){
                            	console.error('Error');
                                return response.data;
                            }, 
                            function(errResponse){
                                console.error('Error while updating Work Flow Header');
                                return $q.reject(errResponse);
                            }
                    );
        },
     
	    deleteUser: function(id){
	          //  return $http.delete('http://localhost:8097/CTMS/wfheader/'+id)
	   	 return $http.delete(url+'wfheader/'+id)
	                    .then(
	                            function(response){
	                                return response.data;
	                            }, 
	                            function(errResponse){
	                                console.error('Error while deleting Work Flow Header');
	                                return $q.reject(errResponse);
	                            }
	                    );
	    }
    
         
    };
 
}]);
/* End of Service Code */