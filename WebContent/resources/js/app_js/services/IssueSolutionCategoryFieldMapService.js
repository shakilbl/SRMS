/* Service Code */
'use strict';
 
App.factory('ISCFMService', ['$http', '$q', 'url',function($http, $q, url){
	
 
    return {
            
    	fetchAllICFM: function() {
                  // return $http.get('http://localhost:8097/CTMS/user/')
            	 return $http.get(url+'FetchAllIscfMap/') 
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
              
          	 return $http.get(url+'fetchAllISCMap/') 
                          .then(
                                  function(response){
                                      return response.data;
                                  }, 
                                  function(errResponse){
                                      console.error('Error while fetching Issue Solution Category Field Map');
                                  }
  	                    );
  	    },
      
           
    

           createISCFM: function(issueSolutionCategoryFieldMapId){
            	return $http.post(url+'createISCFM/', issueSolutionCategoryFieldMapId)
                        .then(
                                function(response){
                                    return response.data;
                                }, 
                                function(errResponse){
                                    console.error('Error while creating Issue SOlution Category Field Map');
                               }
  	                    );
  	    },
      
           
    
  	  updateISCFM: function(issuesolutioncategoryfieldmap, id){
        	return $http.put(url+'updateISCFM/'+id, issuesolutioncategoryfieldmap)
                    .then(
                            function(response){
                            	console.error('Error');
                                return response.data;
                            }, 
                            function(errResponse){
                                console.error('Error while updating Issue Solution Category Field Map');
                                return $q.reject(errResponse);
                            }
                    );
        },
     
	    deleteISCFM: function(id){
	        
	   	 return $http.delete(url+'deleteISCFM/'+id)
	                    .then(
	                            function(response){
	                                return response.data;
	                            }, 
	                            function(errResponse){
	                                console.error('Error while deleting Issue Solution Category Field Map');
	                                return $q.reject(errResponse);
	                                return $q.reject(errResponse);
                                }
                        );
        }
     
};

}]);
/* End of Service Code */