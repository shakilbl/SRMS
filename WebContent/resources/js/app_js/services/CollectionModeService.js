/*Service*/

'use strict';
App.factory('CollectionModeService', ['$http', '$q', 'url',function($http, $q, url){
	
	 
    return {
         
    	fetchAllCollectionMode: function() {
                 
            	 return $http.get(url+'getAllCollectionMode/') 
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while fetching Collection Mode');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
            
            createCollcetionMOde: function(collectionMode){
                    
            	return $http.post(url+'createCollcetionMode/', collectionMode)
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
             
            updateCollectionMode: function(collectionMode, id){
                 
            	return $http.put(url+'updateCollectionMode/'+id, collectionMode)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while updating Collection Mode');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            deleteCollectionMode: function(id){
                  
            	 return $http.delete(url+'deleteCollectionMode/'+id)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while deleting Collection Mode');
                                        return $q.reject(errResponse);
                                    }
                            );
            }
         
    };
 
}]);
/* End of Service Code */