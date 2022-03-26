//angular service area
'use strict';

App
		.factory(
				'SOCReportService',
				[
						'$http',
						'$q',
						'url',
						function($http, $q, url) {

							return {
								
 							
								
						
								fetchReport : function(ticketnumber, issueSolutionCategoryMapID, ticketCreatedBy, companyBSCode, 
										collectionMode, deliveryNumber) {
									return $http
											.get(
													url + 'DS_Report/' + ticketnumber
															+ '/' + issueSolutionCategoryMapID + '/' + ticketCreatedBy + '/'
															+ companyBSCode	+ '/' + collectionMode + '/' + deliveryNumber)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching E2ESla list');
														return $q
																.reject(errResponse);
													});
								},
								

								fetchReportByDate : function(fromDate, toDate) {
									return $http
											.get(
													url + 'DS_ReportByDate/' + fromDate
															+ '/' + toDate)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching E2ESla list');
														return $q
																.reject(errResponse);
													});
								},
								
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


								
							};

						} ]);
