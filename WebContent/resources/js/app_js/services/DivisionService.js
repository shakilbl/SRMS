/* Service Code */
'use strict';
 
App.factory('DivisionService', ['$http', '$q', 'url',function($http, $q, url){
	
	
 
    return {
         
    	fetchAllDivision: function() {
                  //  return $http.get('http://localhost:8097/CTMS/user/')
            	 return $http.get(url+'division/') 
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while fetching divisions');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            createDivision: function(divisionId){
                    //return $http.post('http://localhost:8097/CTMS/user/', user)
            	return $http.post(url+'createdivision/', divisionId)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while creating divisions');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            updateDivision: function(division, id){
                  //  return $http.put('http://localhost:8097/CTMS/user/'+id, user)
            	return $http.put(url+'updatedivision/'+id, division)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while updating divisions');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            deleteDivision: function(id){
                    //return $http.delete('http://localhost:8097/CTMS/division/'+id)
            	 return $http.delete(url+'deletedivision/'+id)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while deleting division');
                                        return $q.reject(errResponse);
                                    }
                            );
            }
         
    };
 
}]);
/* End of Service Code */