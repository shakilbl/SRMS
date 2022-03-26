'use strict';
App.factory(
                'DSTicketCreationService',
                [
                    '$http',
                    '$q',
                    'url',
                    function ($http,$q, url) {
                    	return {
                    		fetchAllIssueSolutionCategoryMapDS: function() { 
                                return $http.get(url+'FindIssueSolutionCategoryMapForDS/')
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
                        fetchAllActiveCompanyNames: function() { 
                            return $http.get(url+'fetchAllCompanyNames/')
                                    .then(
                                            function(response){
                                                return response.data;                                       
                                            }, 
                                            function(errResponse){
                                                console.error('Error while fetching Company Names list');
                                                return $q.reject(errResponse);
                                            }
                                    );
                    },
                    
                    fetchAllActiveBankNames: function() { 
                        return $http.get(url+'fetchAllBankName/')
                                .then(
                                        function(response){
                                            return response.data;                                       
                                        }, 
                                        function(errResponse){
                                            console.error('Error while fetching Bank Names list');
                                            return $q.reject(errResponse);
                                        }
                                );
                },
                        
                        fetchAllActiveCollectionMode: function() { 
                            return $http.get(url+'getAllActiveCollectionMode/')
                                    .then(
                                            function(response){
                                                return response.data;                                       
                                            }, 
                                            function(errResponse){
                                                console.error('Error while fetching Collection Mode list');
                                                return $q.reject(errResponse);
                                            }
                                    );
                    },
                        
                        ticketCreation: function(ds){
                        	return $http.post(url+'DSticketCreation/', ds)
                        	.then(
                        			function(response){
                        				return response.data;
                        			},
                        			function(errResponse){
                        				return $q.reject(errResponse);
                        			}
                        	)
                        }
                        
                    	};
                    	
                    }]);