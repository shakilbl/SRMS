//angular service area
'use strict';

App.factory('ticketDetailsSAWService', [
		'$http',
		'$q',
		'url',
		function($http, $q, url) {
			return {
				ticketCreation : function(phase2) {
					return $http.post(url + 'phase2TicketCreation/', phase2)
							.then(function(response) {
								return response.data;
							}, function(errResponse) {
								console.error('Error while creating Circles');
								return $q.reject(errResponse);
							});
				},

				fetchSLAData : function(iscmId) {
					return $http.get(url + 'fetchSLAData/' + iscmId).then(
							function(response) {
								return response.data;
							}, function(errResponse) {
								console.error('Error fetching...');
								return $q.reject(errResponse);
							});
				},

				fetchE2ESla : function(e2eSlaDate, iscmId, severity,
						componentType) {
					return $http.get(
							url + 'fetchE2ESla/' + e2eSlaDate + "/" + iscmId
									+ "/" + severity + "/" + componentType)
							.then(function(response) {
								return response.data;
							}, function(errResponse) {
								console.error('Error fetching...');
								return $q.reject(errResponse);
							});
				},

				fetchGroupSla : function(groupSlaDate, iscmId, userGroupId,
						severity, componentType) {
					return $http.get(
							url + 'fetchGroupSla/' + groupSlaDate + "/"
									+ iscmId + "/" + +userGroupId + "/"
									+ severity + "/" + componentType).then(
							function(response) {
								return response.data;
							}, function(errResponse) {
								console.error('Error fetching...');
								return $q.reject(errResponse);
							});
				},

				fetchCurrentUserGroup : function() {
					return $http.get(url + 'fetchCurrentUserGroup/').then(
							function(response) {
								return response.data;
							}, function(errResponse) {
								console.error('Error fetching...');
								return $q.reject(errResponse);
							});
				},
				
				editTicket : function(ticketHopsId, iscmId,
										comment, targetSlaDate,
										committedFeedbackDate) {
									return $http
											.get(
													url
															+ 'editTicket/'
															+ ticketHopsId
															+ '/'
															+ iscmId
															+ '/'
															+ comment
															+ '/'
															+ targetSlaDate
															+ '/'
															+ committedFeedbackDate)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error fetching...');
														return $q
																.reject(errResponse);
													});
								},

								fetchAllEditableTicket : function() {
									return $http
											.get(
													url
															+ 'fetchAllEditableTicket/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error fetching editable ticket list...');
														return $q
																.reject(errResponse);
													});
								},

				fetchISCMSeverityData : function(iscmId, severity) {
					return $http.get(
							url + 'fetchISCMSeverityData/' + iscmId + '/'
									+ severity).then(function(response) {
						return response.data;
						console.error('successfully fetch data...');
					}, function(errResponse) {
						console.error('Error fetching 5 field value');
						return $q.reject(errResponse);
					});
				},
				
				fetchTIcketDetailsData : function(hopID) {
					return $http.get(
							url + 'ticketdetailsSAW/' + hopID).then(function(response) {
						return response.data;
						console.log('successfully fetch data...');
					}, function(errResponse) {
						console.error('Error fetching 5 field value');
						return $q.reject(errResponse);
					});
				},
				
				forwardComplaint : function(responseData, actionType, solution){
					return $http.post(url + 'forwardComplaint/' + actionType + '/' + solution  , responseData).then(
							function(response){
								return response.data;
							})
				},
				
				getAllSolutionNames : function(){ // Ref issueSolutioncategoryMap Rest
					return $http.get(url + 'FindIssueSolutionN/').then(
							function(response){
								return response.data;
							})
				},
				
	            fetchAllUsersSAW: function() {
	                //  return $http.get('http://localhost:8097/CTMS/usergroup/')
	          	 return $http.get(url+'usergroupSAW/')
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
				
				// fetch ticket history
				fetchAllTicketHistory : function(ticketNumber) {
					return $http
							.get(
									url + 'GetTicketHistorySAW/'
											+ ticketNumber)
							.then(
									function(response) {
										return response.data;
									},
									function(errResponse) {
										console
												.error('Error while fetching issuesolution list');
										return $q
												.reject(errResponse);
									});
				}

			};
		} ]);
