//angular service area
'use strict';
App.factory('issuesolutionService', ['$http', '$q','url', function($http, $q,url){ 


    return {
    	
    	fetchAllIssueSolution: function() { 
                    return $http.get(url+'FindAllIssuesSolution/')
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
             
            createIssueSolution: function(IssuesSolution){
                    return $http.post(url+'CreateIssueSolution/', IssuesSolution)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while creating issuesolution');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            updateIssueSolution: function(IssuesSolution, id){
            	console.log("we are in update function",IssuesSolution);
                    return $http.put(url+'UpdateIssueSolution/'+id, IssuesSolution)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while updating issuesolution');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            deleteIssueSolution: function(id){
                    return $http.delete(url+'DeleteIssueSolution/'+id)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while deleting issuesolution');
                                        return $q.reject(errResponse);
                                    }
                            );
            }
         
    };
 
}]);

