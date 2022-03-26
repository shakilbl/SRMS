/* Service Code */
'use strict';
 
App.factory('ISCService', ['$http', '$q', 'url',function($http, $q, url){
	
	
 
    return {
         
    	fetchAllISC: function() {
                  
            	 return $http.get(url+'IssueSolutionCategory/') 
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while fetching issuesolutioncategorys');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            createISC: function(issueSolutionCategoryId){
                  
            	return $http.post(url+'CreateIssueSolutionCategory/', issueSolutionCategoryId)
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
             
            updateISC: function(issuesolutioncategory, id){
                 
            	return $http.put(url+'UpdateIssueSolutionCategory/'+id, issuesolutioncategory)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while updating issuesolutioncategorys');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            deleteISC: function(id){
                 
            	 return $http.delete(url+'DeleteIssueSolutionCategory/'+id)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while deleting issuesolutioncategory');
                                        return $q.reject(errResponse);
                                    }
                            );
            }
         
    };
 
}]);
/* End of Service Code */