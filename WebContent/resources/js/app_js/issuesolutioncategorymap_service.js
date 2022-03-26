//angular service area
'use strict';
App.factory('issuesolutioncategorymapService', ['$http', '$q','url', function($http, $q,url){


    return {
    	
    	fetchAllIssueSolutionCategoryMap: function() { 
                    return $http.get(url+'FindIssueSolutionCategoryMap/')
                            .then(
                                    function(response){
                                        return response.data;                                       
                                    }, 
                                    function(errResponse){
                                        console.error('Error while fetching issuesolution category map list');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
			 fetchSOCandAssuranceIssueSolutionCategoryMap: function() { 
                return $http.get(url+'FindSOCandAssuranceIssueSolutionCategoryMap/')
                        .then(
                                function(response){
                                    return response.data;                                       
                                }, 
                                function(errResponse){
                                    console.error('Error while fetching SOC and Assurance issuesolution category map list');
                                    return $q.reject(errResponse);
                                }
                        );
        },
            fetchAllIssueSolution: function() { 
                return $http.get(url+'FindIssueSolution/')
                .then( 
                        function(response){
                            return response.data;                                       
                        }, 
                        function(errResponse){
                            console.error('Error while fetching issuesolution list');
                            return $q.reject(errResponse);
                        }
                );
},
            fetchAllIssueSolutionCategory: function() { 
                return $http.get(url+'FindIssueSolutionCategoryFromMap/')
                        .then( 
                                function(response){
                                    return response.data;                                       
                                }, 
                                function(errResponse){
                                    console.error('Error while fetching issuesolution category map list');
                                    return $q.reject(errResponse);
                                }
                        );
        },
             
            createIssueSolutionCategoryMap: function(issueSolutionCategoryId){
                    return $http.post(url+'CreateIssueSolutionCategoryMap/', issueSolutionCategoryId)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while creating issuesolution category map');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            updateIssuSolutionCategoryMap: function(IssuesSolutionCategoryMap, id){
            	console.log("we are in update function",IssuesSolutionCategoryMap);
                    return $http.put(url+'UpdateIssueSolutionCategoryMap/'+id, IssuesSolutionCategoryMap)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while updating issuesolution category map');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            deleteIssueSolutionCategoryMap: function(id){
                    return $http.delete(url+'DeleteIssueSolutionCategoryMap/'+id)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while deleting issuesolution category map');
                                        return $q.reject(errResponse);
                                    }
                            );
            }
         
    };
 
}]);

