/* Service Code */
'use strict';
 
App.factory('BusinessproService', ['$http', '$q', 'url',function($http, $q, url){
	
 
    return {
         
    	fetchAllBusinessPro: function() {
                 
            	 return $http.get(url+'fetchAllBusinessPro/') 
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while fetching Business Process');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
            
            createBusinessPro: function(businessProcessId){
                    
            	return $http.post(url+'createBusinessPro/', businessProcessId)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while creating BusinessproServices');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            updateBusinessPro: function(businessprocess, id){
                 
            	return $http.put(url+'updateBusinessPro/'+id, businessprocess)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while updating BusinessproService');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            deleteBusinessPro: function(id){
                  
            	 return $http.delete(url+'deleteBusinessPro/'+id)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while deleting BusinessproService');
                                        return $q.reject(errResponse);
                                    }
                            );
            }
         
    };
 
}]);
/* End of Service Code */