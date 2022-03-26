/* Service Code */
'use strict';
 
App.factory('RemarkService', ['$http', '$q', 'url',function($http, $q, url){
	
 
    return {
         
    	fetchAllRemarks: function() {
                  //  return $http.get('http://localhost:8097/CTMS/user/')
            	 return $http.get(url+'fetchAllRemarks/') 
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while fetching remarks');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            createRemarks: function(remarksId){
                    //return $http.post('http://localhost:8080/TTS_Spring/user/', user)
            	return $http.post(url+'createRemarks/', remarksId)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while creating remarks');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            updateRemarks: function(remarks, id){
                  //  return $http.put('http://localhost:8097/CTMS/user/'+id, user)
            	return $http.put(url+'updateRemarks/'+id, remarks)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while updating Remarks');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            deleteRemarks: function(id){
                    //return $http.delete('http://localhost:8097/CTMS/user/'+id)
            	 return $http.delete(url+'deleteRemarks/'+id)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while deleting Remarks');
                                        return $q.reject(errResponse);
                                    }
                            );
            }
         
    };
 
}]);
/* End of Service Code */