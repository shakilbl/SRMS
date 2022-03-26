/* Service Code */
'use strict';
App
		.factory(
				'LandingpageService',
				[
						'$http',
						'$q',
						'url',
						function($http, $q, url) {

							return {

								fetchAllTicketdetails : function() {
									return $http
											.get(url + 'ticketdetails/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching users');
														return $q
																.reject(errResponse);
													});
								},

								fetchUserlistByUserGroup : function(
										responseData) {
									return $http
											.post(url + 'userlist',
													responseData)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching users');
														return $q
																.reject(errResponse);
													});
								},

								fetchTicketdetails : function(ticketId) {
									return $http
											.get(
													url + 'ticketdetails/'
															+ ticketId)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching Tickethops for ticketdetails page');
														return $q
																.reject(errResponse);
													});
								},

								fetchFilteredTicketdetails : function(
										ticketType, status, workFlowType,
										onlyMasstagTickets) {
									return $http
											.get(
													url
															+ 'ticketdetails/'
															+ ticketType
															+ "/"
															+ status
															+ "/"
															+ workFlowType
															+ "/"
															+ onlyMasstagTickets)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching complaint');
														return $q
																.reject(errResponse);
													});
								},
								
								listBusinessProcessByUserGroup : function() {
									return $http
											.get(
													url
															+ 'businessListByUsergroup/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching complaint');
														return $q
																.reject(errResponse);
													});
								},
								
								// Code by Shakil
								// For SOC Business Process
								getFirstTicketHopByTicketNumber : function(ticketnumber) {
									return $http
											.get(
													url
															+ 'getFirstTicketHopByTicketNumber/'+ticketnumber)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching complaint');
														return $q
																.reject(errResponse);
													});
								},
																
								
								

								createMassComplaints : function(responsedata,
										actionType, smsText, massComplaint,
										workFlowType) {
									return $http
											.post(
													url + 'ticketdetails/'
															+ actionType + "/"
															+ smsText + "/"
															+ massComplaint
															+ "/"
															+ workFlowType,
													responsedata)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while creating complaint');
														return $q
																.reject(errResponse);
													});
								},

								bulkRollback : function(responsedata) {
									return $http
											.post(url + 'bulkrollback',
													responsedata)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while creating complaint');
														return $q
																.reject(errResponse);
													});
								},

								changeMassComplaintsStatus : function(
										responseData, actionType, smsText,
										massComplaint) {
									return $http
											.post(
													url
															+ 'changeticketdetails/'
															+ actionType + "/"
															+ smsText + "/"
															+ massComplaint,
													responseData)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while changing complaint status');
														return $q
																.reject(errResponse);
													});
								},

								sendSms : function(responseData) {
									return $http
											.post(url + 'sendsms', responseData)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while changing complaint status');
														return $q
																.reject(errResponse);
													});
								},

								lockTicket : function(ticketId) {
									return $http
											.put(url + 'lockticket/' + ticketId)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while Locking ticket.');
														return $q
																.reject(errResponse);
													});
								},

								bulkLockTicket : function(responseData) {
									return $http
											.post(url + 'bulklockticket',
													responseData)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while Locking ticket.');
														return $q
																.reject(errResponse);
													});
								},

								bulkUnlockTicket : function(responseData) {
									return $http
											.post(url + 'bulkunlockticket',
													responseData)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while Locking ticket.');
														return $q
																.reject(errResponse);
													});
								},

								unLockTicket : function(ticketId) {
									return $http
											.put(
													url + 'unlockticket/'
															+ ticketId)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while Locking ticket.');
														return $q
																.reject(errResponse);
													});
								}
							};

						} ]);

/* End of Service Code */

/* Controller Code */
App
		.controller(
				'LandingpageController',
				[
						'$scope',
						'$timeout',
						'$window',
						'$filter',
						'LandingpageService',
						'NgTableParams',
						function($scope, $timeout, $window, $filter, LandingpageService,
								NgTableParams) {
							var self = this;

							self.complaint = null;
							
							self.showLoading= true;
							
							self.complaints = [];
							self.comment = null;

							self.searchByTicketType = null;
							self.searchByStatus = null;
							self.massIssueList = [];

							self.selectedGroup = null;
							self.bulkActionUser = null;
							self.bulkActionUserList = null;
							self.selectedStatus = null;

							self.workFlowType = "All";
							self.onlyMasstagTickets = null

							self.smsText = null;
							self.mobileNumbers = [];

							// If sms will be sent or not
							self.toSendSms = true;

							self.massComplaint = false;

							self.enableSelectGroup = true;

							self.successMessages = null;
							self.errorMessages = null;

							// TicketdetailsPage stuff
							self.ticketDetailsPage_ticketHopsId = 0;
							self.ticketCommentHistory = [];
							self.smsTemplate = null;
							
							self.businessProcessList = null;
							
							// ---End of TicketdetailsPage stuff
							
						    self.checkAll = function () {
						        if (!self.selectedAll) {
						            self.selectedAll = true;
						        } else {
						            self.selectedAll = false;
						        }
/*
 * angular.forEach(self.forGrid, function(landingPageWrapperList) {
 * landingPageWrapperList.ticketsummary.selected = self.selectedAll; });
 */
						    };  							
							
						    
						    
							self.listBusinessProcessByUserGroup = function() {
								LandingpageService
										.listBusinessProcessByUserGroup()
										.then(
												function(d) {
													self.businessProcessList = d;
													// console.log(businessProcessList[1]);

												},
												function(errResponse) {
													console
															.error('Error while fetching ticketdetails.');
												}).finally(function () {
													// self.hideLoadingBox();
												});
							};
							
							
							
							self.listBusinessProcessByUserGroup();
							

							// Grid column showing decision based on Business
							// Process List & Column name
							self.gridColumnVisibleDecision = function(columnName) {
								
								// businessProcessList =
								// {'VOCM_TCM,'Assurance'};
								
								var visible = false;
								
								for (var i = 0; i < self.businessProcessList.length; i++) {
									


									if(columnName == "Severity")
									{
										if(self.businessProcessList[i] === "SOC-CMPM" || self.businessProcessList[i] === "SOC-CSM"
											|| self.businessProcessList[i] === "SOC-RNBM")
										{
											visible = true; return visible;
										}
									}

									else if(columnName == "CircleThana") 
									{
										if(self.businessProcessList[i] === "VOCM_TCM")
										{
											visible = true; return visible;
										}
									}	
									
									else if(columnName == "Loyalty Indicator") 
									{
										if(self.businessProcessList[i] === "VOCM_TCM")
										{
											visible = true; return visible;
										}
									}										

									else if(columnName == "Last group comments")
									{
										if(self.businessProcessList[i] === "VOCM_TCM" || self.businessProcessList[i] === "SOC-CMPM" 
											|| self.businessProcessList[i] === "SOC-CSM"
											|| self.businessProcessList[i] === "SOC-RNBM" || self.businessProcessList[i] === "WholesaleBusiness" || self.businessProcessList[i] === "Assurance")
										{
											visible = true; return visible;
										}
									}

									else if(columnName == "E2E SLA Status")
									{
										if(self.businessProcessList[i] === "SOC-CMPM" || self.businessProcessList[i] === "SOC-CSM"
											|| self.businessProcessList[i] === "SOC-RNBM")
										{
											visible = true; return visible;
										}
									}
									
									else if(columnName == "Fault Event Date")
									{
										if(self.businessProcessList[i] === "Assurance")
										{
											visible = true; return visible;
										}
									}
									
									else if(columnName == "Fault Escalation Date")
									{
										if(self.businessProcessList[i] === "Assurance")
										{
											visible = true; return visible;
										}
									}

									else if(columnName == "Status")
									{
										if(self.businessProcessList[i] === "VOCM_TCM" || self.businessProcessList[i] === "SOC-CMPM" || self.businessProcessList[i] === "SOC-CSM"
											|| self.businessProcessList[i] === "SOC-RNBM"
											|| self.businessProcessList[i] === "WholesaleBusiness" || self.businessProcessList[i] === "Assurance")
										{
											visible = true; return visible;
										}
									}

									else if(columnName == "Customer Number")
									{
										if(self.businessProcessList[i] === "VOCM_TCM")
										{
											visible = true; return visible;
										}
									}
									
									else if(columnName == "Media")
									{
										if(self.businessProcessList[i] === "VOCM_TCM")
										{
											visible = true; return visible;
										}
									}

									else if(columnName == "Product")
									{
										if(self.businessProcessList[i] === "VOCM_TCM")
										{
											visible = true; return visible;
										}
									}

									else if(columnName == "LoyaltyIndicator")
									{
										if(self.businessProcessList[i] === "VOCM_TCM")
										{
											visible = true; return visible;
										}
									}


									else if(columnName == "BSCode")
									{
										if(self.businessProcessList[i] === "VOCM_TCM")
										{
											visible = true; return visible;
										}
									}
									
									else if(columnName == "Vip Flag")
									{
										if(self.businessProcessList[i] === "VOCM_TCM")
										{
											visible = true; return visible;
										}
									}

									else if(columnName == "Type")
									{
										if(self.businessProcessList[i] === "VOCM_TCM")
										{
											visible = true; return visible;
										}
									}

									else if(columnName == "Category(Subcategory)")
									{
										if(self.businessProcessList[i] === "VOCM_TCM")
										{
											visible = true; return visible;
										}
									}


									else if(columnName == "Ticket Creation Date")
									{
										if(self.businessProcessList[i] === "VOCM_TCM")
										{
											visible = true; return visible;
										}
									}
									
									else if(columnName == "Ticket Created By")
									{
										if(self.businessProcessList[i] === "VOCM_TCM")
										{
											visible = true; return visible;
										}
									}

									else if(columnName == "Committed Feedback Date")
									{
										if(self.businessProcessList[i] === "VOCM_TCM")
										{
											visible = true; return visible;
										}
									}

									else if(columnName == "Committed Solution Date") // Will
																						// be
																						// covered
																						// by
																						// Target
																						// Time
									{
										if(self.businessProcessList[i] === "VOCM_TCM")
										{
											visible = true; return visible;
										}
									}


									else if(columnName == "Last Comment")
									{
										if(self.businessProcessList[i] === "VOCM_TCM")
										{
											visible = true; return visible;
										}
									}
									
									else if(columnName == "Group")
									{
										if(self.businessProcessList[i] === "VOCM_TCM" || self.businessProcessList[i] === "WholesaleBusiness")
										{
											visible = true; return visible;
										}
									}

									else if(columnName == "Locked By")
									{
										if(self.businessProcessList[i] === "VOCM_TCM")
										{
											visible = true; return visible;
										}
									}									
									
									else if(columnName == "Task Target Time")
									{
										if(self.businessProcessList[i] === "SOC-CMPM" || self.businessProcessList[i] === "SOC-CSM"
											|| self.businessProcessList[i] === "SOC-RNBM")
										{
											visible = true; return visible;
										}
									}
									
									else if(columnName == "E2E SLA status")
									{
										if(self.businessProcessList[i] === "SOC-CMPM" || self.businessProcessList[i] === "SOC-CSM"
											|| self.businessProcessList[i] === "SOC-RNBM")
										{
											visible = true; return visible;
										}
									}									

									else if(columnName == "Agent Comment")
									{
										if(self.businessProcessList[i] === "VOCM_TCM")
										{
											visible = true; return visible;
										}
									}
									
									else if(columnName == "Group Sla Date")
									{
										if(self.businessProcessList[i] === "VOCM_TCM")
										{
											visible = true; return visible;
										}
									}

									else if(columnName == "Group Sla Deviation")
									{
										if(self.businessProcessList[i] === "VOCM_TCM")
										{
											visible = true; return visible;
										}
									}

									else if(columnName == "Mass Tag")
									{
										if(self.businessProcessList[i] === "VOCM_TCM")
										{
											visible = true; return visible;
										}
									}

									else if(columnName == "Attachment")
									{
										if(self.businessProcessList[i] === "VOCM_TCM")
										{
											visible = true; return visible;
										}
									}
									
									else if(columnName == "Type")
									{
										if(self.businessProcessList[i] === "VOCM_TCM")
										{
											visible = true; return visible;
										}
									}									
									
									else if(columnName == "Ticket Type")
									{
										if(self.businessProcessList[i] === "WholesaleBusiness")
										{
											visible = true; return visible;											
										}
									}
									
									else if(columnName == "Component Type")
									{
										if(self.businessProcessList[i] === "WholesaleBusiness")
										{
											visible = true; return visible;
										}
									}
									else if(columnName == "Problem Component(SOC)") 
									{
										if(self.businessProcessList[i] === "SOC-CMPM" || self.businessProcessList[i] === "SOC-CSM"
											|| self.businessProcessList[i] === "SOC-RNBM"
											|| self.businessProcessList[i] === "WholesaleBusiness" || self.businessProcessList[i] === "Assurance")
										{
											visible = true; return visible;
										}
									}
									
									else if(columnName == "Problem Component(VoCM_TCM)") 
									{
										if(self.businessProcessList[i] === "VOCM_TCM")
										{
											visible = true; return visible;
										}
									}										
									
									else if(columnName == "Business Process")
									{
										if(self.businessProcessList[i] === "SOC-CMPM" || self.businessProcessList[i] === "SOC-CSM"
											|| self.businessProcessList[i] === "SOC-RNBM"
											|| self.businessProcessList[i] === "WholesaleBusiness" || self.businessProcessList[i] === "Assurance")
										{
											visible = true; return visible;
										}
									}										
									else
									{
										return visible;
									}
									
								}
								// alert(visible);
								// return true;
								
							};
							
							self.firstTicketHop = null;
							
							self.getFirstTicketHopByTicketNumber = function(ticketnumber) {
								LandingpageService
										.getFirstTicketHopByTicketNumber(ticketnumber)
										.then(
												function(d) {
													self.firstTicketHop = d;
													// console.log(businessProcessList[1]);

												},
												function(errResponse) {
													console
															.error('Error while fetching ticketdetails.');
												}).finally(function () {
													// self.hideLoadingBox();
												});
							};			
							
							self.getE2ESlaStatus = function(committedFeedbackDateParam)
							{
								
								 var committedFeedbackDate = $filter('date')(committedFeedbackDateParam, "yyyy-MM-dd HH:mm:ss Z");
								 
								 var currentdate = $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss Z");
								 
								 var timeDifference = 0;
								 
								 if(committedFeedbackDate != null)
									 {
									 	//timeDifference = committedFeedbackDate - new Date();
									 	
									 	//timeDifference = moment.utc(moment(committedFeedbackDate).diff(moment(new Date()))).format("mm");
									 	
									 	if(committedFeedbackDate < currentdate)
									 		{
									 			return "Fail";
									 		}
									 	else
									 		{
									 			return "Still Within SLA";
									 		}
									 		
									 }
							};
							
							self.fetchAllTicketdetails = function() {
								LandingpageService
										.fetchAllTicketdetails()
										.then(
												function(d) {
													self.complaints = d.tickethops;

													var data = d.tickethops;
													self.tableParams = new NgTableParams(
															{
																page: 1,
												                count: 50
															}, {
																dataset : data
															});
												},
												function(errResponse) {
													self
															.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};

							self.fetchUserlistByUserGroup = function(
									responseData) {
								LandingpageService
										.fetchUserlistByUserGroup(responseData)
										.then(
												function(d) {
													self.bulkActionUserList = d;
												},
												function(errResponse) {
													self
															.showErrorMessage("Failed to Load Userlist, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};

							self.fetchFilteredTicketdetails = function(
									ticketType, status, workflowType,
									onlyMasstagTickets) {
								LandingpageService
										.fetchFilteredTicketdetails(ticketType,
												status, workflowType,
												onlyMasstagTickets)
										.then(
												function(d) {
													self.complaints = d.tickethops;
													self.massIssueList = [];
													// self
													// .showSuccessMessage("Data
													// loaded successfully.");
													
													// Code add by Shakil
													// For landing grid
													
													self.forGrid = d.tickethops;
													
											
													var data = d.tickethops;
													
													self.tableParams = new NgTableParams(
															{
																page: 1,
												                count: 50,
												                sorting: { status: "dsc" }
															}, {
																dataset : data
															});

												},
												function(errResponse) {
													console
															.error('Error while fetching ticketdetails.');
												}).finally(function () {
													self.hideLoadingBox();
												});
							};

							// This method is to be used inside other methods
							self.fetchFilteredTicketdetailsWithoutMessage = function(
									ticketType, status, workflowType,
									onlyMasstagTickets) {
								LandingpageService
										.fetchFilteredTicketdetails(ticketType,
												status, workflowType,
												onlyMasstagTickets)
										.then(
												function(d) {
													self.complaints = d.tickethops;
													self.massIssueList = [];

													var data = d.tickethops;
													self.tableParams = new NgTableParams(
															{}, {
																dataset : data
															});
												},
												function(errResponse) {
													console
															.error('Error while loading ticketdetails.');
												}).finally(function () {
													self.hideLoadingBox();
												});
							};
							//
							self.bulkRollback = function(responsedata) {
								LandingpageService
										.bulkRollback(responsedata)
										.then(
												function(d) {
													self.comment = null;
													self
															.showSuccessMessage(d.message);
													self.showLoadingBox();
													self
															.fetchFilteredTicketdetailsWithoutMessage(
																	self.searchByTicketType,
																	self.searchByStatus,
																	self.workFlowType,
																	self.onlyMasstagTickets);
												},
												function(errResponse) {
													self
															.showErrorMessage(
																	errResponse.data.message,
																	errResponse.status);
													self.showLoadingBox();
													self
															.fetchFilteredTicketdetailsWithoutMessage(
																	self.searchByTicketType,
																	self.searchByStatus,
																	self.workFlowType,
																	self.onlyMasstagTickets);
													console
															.error(
																	'Error while creating complaint.',
																	errResponse.status);

												});
							};

							self.createMassComplaints = function(responsedata,
									actionType, smsText, massComplaint,
									workFlowType) {
								LandingpageService
										.createMassComplaints(responsedata,
												actionType, smsText,
												massComplaint, workFlowType)
										.then(
												function(d) {
													self.comment = null;
													self
															.showSuccessMessage(d.message);
													self.showLoadingBox();
													self
															.fetchFilteredTicketdetailsWithoutMessage(
																	self.searchByTicketType,
																	self.searchByStatus,
																	self.workFlowType,
																	self.onlyMasstagTickets);
												},
												function(errResponse) {
													self
															.showErrorMessage(
																	errResponse.data.message,
																	errResponse.status);
													self.showLoadingBox();
													self
															.fetchFilteredTicketdetailsWithoutMessage(
																	self.searchByTicketType,
																	self.searchByStatus,
																	self.workFlowType,
																	self.onlyMasstagTickets);
													console
															.error(
																	'Error while creating complaint.',
																	errResponse.status);

												});
							};

							self.changeMassComplaintsStatus = function(
									responseData, actionType, smsText,
									massComplaint) {
								LandingpageService
										.changeMassComplaintsStatus(
												responseData, actionType,
												smsText, massComplaint)
										.then(
												function(d) {
													self.comment = null;
													self
															.showSuccessMessage(d.message);
													self.showLoadingBox();
													self
															.fetchFilteredTicketdetailsWithoutMessage(
																	self.searchByTicketType,
																	self.searchByStatus,
																	self.workFlowType,
																	self.onlyMasstagTickets);
												},
												function(errResponse) {
													self
															.showErrorMessage(
																	errResponse.data.message,
																	errResponse.status);
													self.showLoadingBox();
													self
															.fetchFilteredTicketdetailsWithoutMessage(
																	self.searchByTicketType,
																	self.searchByStatus,
																	self.workFlowType,
																	self.onlyMasstagTickets);
													console
															.error(
																	'Error while creating complaint.',
																	errResponse.status);

												});
							};

							self.sendSms = function(responseData) {
								LandingpageService
										.sendSms(responseData)
										.then(
												function(d) {
													self
															.showSuccessMessage(d.message);
													self.showLoadingBox();
													self
															.fetchFilteredTicketdetailsWithoutMessage(
																	self.searchByTicketType,
																	self.searchByStatus,
																	self.workFlowType,
																	self.onlyMasstagTickets);
												},
												function(errResponse) {
													self
															.showErrorMessage(
																	errResponse.data.errorMessage,
																	errResponse.status);
													self.showLoadingBox();
													self
															.fetchFilteredTicketdetailsWithoutMessage(
																	self.searchByTicketType,
																	self.searchByStatus,
																	self.workFlowType,
																	self.onlyMasstagTickets);
													console
															.error(
																	'Error while creating complaint.',
																	errResponse.status);

												});
							};

							self.lockTicket = function(ticketId) {
								LandingpageService
										.lockTicket(ticketId)
										.then(
												function(d) {
													self
															.showSuccessMessage("Ticket Locked successfully.");
													self.showLoadingBox();
													self
															.fetchFilteredTicketdetailsWithoutMessage(
																	self.searchByTicketType,
																	self.searchByStatus,
																	self.workFlowType,
																	self.onlyMasstagTickets);
												},
												function(errResponse) {
													self
															.showErrorMessage("Failed to Lock Ticket, Please try again.");
													self.showLoadingBox();
													self
															.fetchFilteredTicketdetailsWithoutMessage(
																	self.searchByTicketType,
																	self.searchByStatus,
																	self.workFlowType,
																	self.onlyMasstagTickets);
													console
															.error('Error while updating complaint.');
												});
							};

							self.bulkLockTicket = function(responseData) {
								LandingpageService
										.bulkLockTicket(responseData)
										.then(
												function(d) {
													self.comment = null;
													self
															.showSuccessMessage(d.message);
													self.showLoadingBox();
													self
															.fetchFilteredTicketdetailsWithoutMessage(
																	self.searchByTicketType,
																	self.searchByStatus,
																	self.workFlowType,
																	self.onlyMasstagTickets);
												},
												function(errResponse) {
													self
															.showErrorMessage(
																	errResponse.data.message,
																	errResponse.status);
													self.showLoadingBox();
													self
															.fetchFilteredTicketdetailsWithoutMessage(
																	self.searchByTicketType,
																	self.searchByStatus,
																	self.workFlowType,
																	self.onlyMasstagTickets);
													console
															.error('Error while updating complaint.');
												});
							};

							self.unLockTicket = function(ticketId) {
								LandingpageService
										.unLockTicket(ticketId)
										.then(
												function(d) {
													self
															.showSuccessMessage(d.message);
													self.showLoadingBox();
													self
															.fetchFilteredTicketdetailsWithoutMessage(
																	self.searchByTicketType,
																	self.searchByStatus,
																	self.workFlowType,
																	self.onlyMasstagTickets);
												},
												function(errResponse) {
													self
															.showErrorMessage(errResponse.data.message);
													self.showLoadingBox();
													self
															.fetchFilteredTicketdetailsWithoutMessage(
																	self.searchByTicketType,
																	self.searchByStatus,
																	self.workFlowType,
																	self.onlyMasstagTickets);
												});
							};

							self.bulkUnlockTicket = function(responseData) {
								LandingpageService
										.bulkUnlockTicket(responseData)
										.then(
												function(d) {
													self.comment = null;
													self
															.showSuccessMessage(d.message);
													self.showLoadingBox();
													self
															.fetchFilteredTicketdetailsWithoutMessage(
																	self.searchByTicketType,
																	self.searchByStatus,
																	self.workFlowType,
																	self.onlyMasstagTickets);
												},
												function(errResponse) {
													self
															.showErrorMessage(
																	errResponse.data.message,
																	errResponse.status);
													self.showLoadingBox();
													self
															.fetchFilteredTicketdetailsWithoutMessage(
																	self.searchByTicketType,
																	self.searchByStatus,
																	self.workFlowType,
																	self.onlyMasstagTickets);
													console
															.error('Error while updating complaint.');
												});
							};

							// TicketdetailsPage stuff
							self.fetchSingleTickethops = function(ticketHopsId) {
								LandingpageService
										.fetchTicketdetails(ticketHopsId)
										.then(
												function(d) {
													self.complaint = d.aTickethops;
													self.ticketCommentHistory = d.ticketcomments;
													self.smsTemplate = d.smsTemplate;
												},
												function(errResponse) {
													// self
													// .showErrorMessage(errResponse.data.errorMessage,
													// errResponse.status);
													console
															.error(
																	"Server Response: ",
																	errResponse.data.message,
																	errResponse.status);
												});
							};
							// ---End of TicketdetailsPage stuff
							
							self.fetchFilteredTicketdetails(
									self.searchByTicketType,
									self.searchByStatus, self.workFlowType,
									self.onlyMasstagTickets);

							self.selectedStatusChange = function(status,
									currentDivision) {
								console.log(status);
								// Reset massissue list first
								self.massIssueList = [];
								// Reset search field
								$scope.query = null;
								// Reset bulkActionUser Info combo
								self.bulkActionUserList = [];
								self.bulkActionUser = null;

								self.errorMessages = null;

								// Everybody can take action
								// only on their group tickets
								if (self.searchByTicketType == "All") {
									self.searchByTicketType = null;
								}

								// This will load data with particular status in
								// grid when some action is selected
								if (status == "" || status == "Closed"
										|| status == "RequestForCloser"
										|| status == "Rollback") {
									if (status == "RequestForCloser"
											|| status == "Rollback") {
										// New Requirement: for RequestForCloser
										// status fetch Reopen tickets also
										self.searchByStatus = "RequestForCloser";
									} else {
										self.searchByStatus = "Open";
									}
									if (self.workFlowType == "fixed"
											&& self.selectedStatus == "RequestForCloser") {
										// RFC cannot be performed on Fixed flow
										// tickets
										var data = [];
										self.tableParams = new NgTableParams(
												{}, {
													dataset : data
												});
										self
												.showErrorMessage("You can not perform this action on any fixed workflow tickets.");
									} else if (self.workFlowType == "dynamic"
											&& self.selectedStatus == "Rollback") {
										// RFC cannot be performed on Fixed flow
										// tickets
										var data = [];
										self.tableParams = new NgTableParams(
												{}, {
													dataset : data
												});
										self
												.showErrorMessage("You can not perform this action on any dynamic workflow tickets.");
									} else {
										self.showLoadingBox();
										self
												.fetchFilteredTicketdetailsWithoutMessage(
														self.searchByTicketType,
														self.searchByStatus,
														self.workFlowType,
														self.onlyMasstagTickets);
									}
								} else if (status == "Release") {
									self.searchByStatus = "Hold";
									self.showLoadingBox();
									self
											.fetchFilteredTicketdetailsWithoutMessage(
													self.searchByTicketType,
													self.searchByStatus,
													self.workFlowType,
													self.onlyMasstagTickets);
								} else if (status == "Hold" || status == "Open") {
									if (currentDivision == "technology"
											&& status == "Open") {
										// New Requirement: for open status
										// load RFC tickets as well
										console
												.log(
														"Load RFC for open status and Division ",
														currentDivision);
										self.searchByStatus = "Open";
									} else {
										// For Hold, only fetch tickets with
										// "Open"
										// status. Ignore tickets with
										// "RequestForCloser" status
										self.searchByStatus = "OnlyOpen";
									}
									self.showLoadingBox();
									self
											.fetchFilteredTicketdetailsWithoutMessage(
													self.searchByTicketType,
													self.searchByStatus,
													self.workFlowType,
													self.onlyMasstagTickets);
								} else if (status == "Reopen") {
									// For Reopen, only fetch tickets with
									// "RequestForCloser"
									// status. Ignore tickets with
									// "Open" status
									self.searchByStatus = "Reopen";
									self.showLoadingBox();
									self
											.fetchFilteredTicketdetailsWithoutMessage(
													self.searchByTicketType,
													self.searchByStatus,
													self.workFlowType,
													self.onlyMasstagTickets);
								} else if (status == "Bulklock") {
									console.log("Bulklock");
									// Populate User combo
									var responseData = {
										"usergroup" : self.selectedGroup,
									};
									self.fetchUserlistByUserGroup(responseData);
									// Fetch only lockable tickets
									self.searchByStatus = "OnlyLock";
									self.showLoadingBox();
									self
											.fetchFilteredTicketdetailsWithoutMessage(
													self.searchByTicketType,
													self.searchByStatus,
													self.workFlowType,
													self.onlyMasstagTickets);
								} else if (status == "Bulkunlock") {
									console.log("Bulkunlock");
									// Fetch only unlockable tickets
									self.searchByStatus = "OnlyUnlock";
									self.showLoadingBox();
									self
											.fetchFilteredTicketdetailsWithoutMessage(
													self.searchByTicketType,
													self.searchByStatus,
													self.workFlowType,
													self.onlyMasstagTickets);
								}

								// This will disable some fields when some
								// action is selected
								if ((status == "" || status == "Open"
										|| status == "RequestForCloser"
										|| status == "Reopen"
										|| status == "Bulkunlock" || status == "Bulklock")
										&& self.workFlowType == 'dynamic') {
									self.enableSelectGroup = true;
									console.log("Got here",
											self.enableSelectGroup);
								} else {
									self.selectedGroup = null;
									self.enableSelectGroup = false;
								}
							};

							self.doLockTicket = function(complaintId) {
								self.lockTicket(complaintId);
							};

							self.doUnlockTicket = function(complaintId) {
								self.unLockTicket(complaintId);
							};

							self.searchByStatusChanged = function() {
								if (self.searchByStatus == null
										|| self.searchByStatus == ""
										|| self.searchByStatus == "All") {
									$scope.query = null;
								} else {
									$scope.query = self.searchByStatus;
								}
							};

							/* Not being used anymore */
							self.selectedGroupChange = function() {
								console.log(self.selectedGroup);
								var responseData = {
									"usergroup" : self.selectedGroup,
								};
								self.fetchUserlistByUserGroup(responseData);
							};

							self.searchByTicketTypeChanged = function() {
								// Reset necessary dropdowns
								self.selectedStatus = null;
								self.selectedGroup = null;
								self.workFlowType = null;
								self.onlyMasstagTickets = null;
								// Reset search field
								$scope.query = null;
								self.enableSelectGroup = true;
								// set null as sending ""(emptystring) as
								// webservice url parameter causes error
								if (self.searchByTicketType == "") {
									self.searchByTicketType = null;
								}
								self.showLoadingBox();
								self.fetchFilteredTicketdetails(
										self.searchByTicketType, null,
										self.workFlowType,
										self.onlyMasstagTickets);
								self.searchByStatus = null;
							};

							self.workFlowTypeChanged = function() {
								// If user slected the combo header, set the
								// variable values to null
								if (self.workFlowType == null
										|| self.workFlowType == '') {
									self.workFlowType = null;
								}

								// Reset massissue list first
								self.massIssueList = [];
								// Reset search field
								$scope.query = null;
								self.errorMessages = null;

								if (self.workFlowType != 'dynamic') {
									self.enableSelectGroup = false;
									self.selectedGroup = null;
								} else {
									self.enableSelectGroup = true;
								}
								if (self.workFlowType == "dynamic"
										&& self.selectedStatus == "Rollback") {
									// Rollback cannot be performed on dynamic
									// flow
									// tickets
									var data = [];
									self.tableParams = new NgTableParams({}, {
										dataset : data
									});
									self
											.showErrorMessage("You can not perform this action on any dynamic workflow tickets.");
								} else if (self.workFlowType == "fixed"
										&& self.selectedStatus == "RequestForCloser") {
									// RFC cannot be performed on Fixed flow
									// tickets
									var data = [];
									self.tableParams = new NgTableParams({}, {
										dataset : data
									});
									self
											.showErrorMessage("You can not perform this action on any fixed workflow tickets.");
								} else {
									self.showLoadingBox();
									self.fetchFilteredTicketdetails(
											self.searchByTicketType,
											self.searchByStatus,
											self.workFlowType,
											self.onlyMasstagTickets);
								}
								console.log(self.searchByTicketType,
										self.searchByStatus, self.workFlowType,
										self.onlyMasstagTickets);
							};

							self.onlyMasstagTicketsChanged = function() {
								// If user slected the combo header, set the
								// variable values to null
								if (self.onlyMasstagTickets == null
										|| self.onlyMasstagTickets == '') {
									self.onlyMasstagTickets = null;
								}
								
								self.showLoadingBox();
								self.fetchFilteredTicketdetails(
										self.searchByTicketType,
										self.searchByStatus, self.workFlowType,
										self.onlyMasstagTickets);
							};

							self.addMass = function(complaintId) {
								// console.log("Complant: ",complaintId," Index:
								// ",self.massIssueList.indexOf(complaintId));
								console.log("Complant: ", complaintId);
								if (self.massIssueList.indexOf(complaintId) > -1) {
									// Removing element from array
									self.massIssueList.splice(
											self.massIssueList
													.indexOf(complaintId), 1);
								} else {
									self.massIssueList.push(complaintId);
								}
								console.log(self.massIssueList);
							};

							self.massTicked = function(complaintId) {
								// this will tick mass checkbox
								// if its complaintId is in massIssueList List
								if (self.massIssueList.indexOf(complaintId) > -1) {
									return true;
								} else {
									return false;
								}
							};

							self.submit = function() {
								console.log(self.workFlowType);
								var massIssueObjectList = [];
								var index = 0;
								// Only prepare massIssueObjectList array when
								// some action is selected
								if (self.selectedStatus != null
										&& self.selectedStatus != ""
										&& self.massIssueList.length > 0) {
									for (var i = 0; i < self.complaints.length; i++) {
										for (var j = 0; j < self.massIssueList.length; j++) {
											if (self.complaints[i].ticketHopsId === self.massIssueList[j]) {
												massIssueObjectList[index] = angular
														.copy(self.complaints[i]);
												index++;
												break;
											}
										}
									}

									if (self.selectedStatus == "Closed"
											|| self.selectedStatus == "Hold"
											|| self.selectedStatus == "Release") {
										var responseData = {
											"tickethops" : massIssueObjectList,
											"comment" : self.comment
										};
										self.changeMassComplaintsStatus(
												responseData,
												self.selectedStatus,
												self.toSendSms,
												self.massComplaint);
									} else if (self.selectedStatus == "RequestForCloser"
											|| self.selectedStatus == "Open"
											|| self.selectedStatus == "Reopen"
											|| self.selectedStatus == "Rollback") {
										if (self.workFlowType == null
												|| self.workFlowType == ""
												|| self.workFlowType == "All") {
											self
													.showErrorMessage("You must select Dynamic or Fixed flow to perform this action.");
										} else if (angular
												.lowercase(self.workFlowType) == "dynamic"
												&& (self.selectedGroup == null || self.selectedGroup == "")
												&& !(self.selectedStatus == "RequestForCloser")) {

											console.log("Current Status: ",
													self.selectedStatus);
											self
													.showErrorMessage("You must select a Group to perform this action.");
										} else {
											if (self.selectedStatus == "Rollback") {
												var responseData = {
													"usergroup" : self.selectedGroup,
													"tickethops" : massIssueObjectList,
													"comment" : self.comment
												};
												self.bulkRollback(responseData);
											} else {
												var responseData = {
													"usergroup" : self.selectedGroup,
													"tickethops" : massIssueObjectList,
													"comment" : self.comment
												};
												self.createMassComplaints(
														responseData,
														self.selectedStatus,
														self.toSendSms,
														self.massComplaint,
														self.workFlowType);
											}
										}
									} else if (self.selectedStatus == "Bulkunlock") {

										var responseData = {
											"usergroup" : self.selectedGroup,
											"tickethops" : massIssueObjectList,
											"user" : self.bulkActionUser,
											"comment" : self.comment
										};
										self.bulkUnlockTicket(responseData);
									} else if (self.selectedStatus == "Bulklock") {
										var responseData = {
											"usergroup" : self.selectedGroup,
											"tickethops" : massIssueObjectList,
											"user" : self.bulkActionUser,
											"comment" : self.comment
										};
										self.bulkLockTicket(responseData);
									}
									self.reset();
								} else {
									self
											.showErrorMessage("Please select Service Request and Action to proceeed.");
								}
							};

							self.submitSms = function() {
								console.log("Starting........");
								if (self.smsText == null || self.smsText == '') {
									self
											.showErrorMessage("You must enter SMS Text to send SMS.");
								} else {
									if (self.massIssueList.length > 0) {
										for (var i = 0; i < self.complaints.length; i++) {
											for (var j = 0; j < self.massIssueList.length; j++) {
												if (self.complaints[i].ticketHopsId === self.massIssueList[j]) {
													self.mobileNumbers
															.push(self.complaints[i].ticketsummary.customerNumber);
												}
											}
										}
										console.log(self.mobileNumbers);
										var responseData = {
											"smsText" : self.smsText,
											"mobileNumbers" : self.mobileNumbers
										};
										// Call service to send sms with sms
										// text
										self.sendSms(responseData);

										// Reset mobileNumbers array
										self.mobileNumbers = [];
									} else {
										self
												.showErrorMessage("Please select Service Request to proceeed.");
									}
								}
							};

							// TicketdetailsPage stuff
							self.redirectToTicketdetails = function(
									ticketHops) {
								if(ticketHops.ticketsummary.businessprocess.businessProcessId==5)
									{
										$window.location.href = "servicerequestdetials?sxadvac="
											+ ticketHops.ticketHopsId;									
									}
								else if(ticketHops.ticketsummary.businessprocess.businessProcessId==6 || ticketHops.ticketsummary.businessprocess.businessProcessId==7 || ticketHops.ticketsummary.businessprocess.businessProcessId==9)
									{
										$window.location.href = "TicketDetailsSAW?hopId="
											+ ticketHops.ticketHopsId;											
									}
								else if(ticketHops.ticketsummary.businessprocess.businessProcessId==19)
								{
									$window.location.href = "DSTicketDetails?hopId="
										+ ticketHops.ticketHopsId;											
								}								
							
							};

							self.loadTicketdetailsResources = function() {
								console.log("Calling webservice");
								self
										.fetchSingleTickethops(self.ticketDetailsPage_ticketHopsId);
							}

							// Watch when
							// FirstCtrl.ticketDetailsPage_ticketHopsId
							// is set and load ticketdetails from db with
							// that ticketHopsId
							$scope
									.$watch(
											"FirstCtrl.ticketDetailsPage_ticketHopsId",
											function loadTicketdetailsPageResources(
													newValue, oldValue) {
												if (self.ticketDetailsPage_ticketHopsId > 0) {
													self
															.loadTicketdetailsResources();
												}
											});
							// ---End of TicketdetailsPage stuff

							self.getColorCss = function(status) {
								if (angular.lowercase(status) == 'alarming') {
									var obj = {
										"color" : "#3366cc"
									};
								} else if (angular.lowercase(status) == 'fail') {
									var obj = {
										"color" : "red"
									};
								} else {
									var obj = {
										"color" : ""
									};
								}

								// Return it
								return obj;
							};

							self.reset = function() {
								self.smsText = null;
								self.massIssueList = [];
								self.bulkActionUser = null;
								self.bulkActionUserList = [];
								self.massComplaint = false;
								// Only reset comment on success, not on failure
								// self.comment = null;
								$scope.query = null;
								$scope.myForm.$setPristine();
							};

							self.resetAll = function() {
								
								// Reset all Search and Action dropdowns
								self.successMessages = null;
								self.errorMessages = null;

								self.searchByTicketType = null;
								self.searchByStatus = null;
								self.massIssueList = [];

								self.selectedGroup = null;
								self.selectedStatus = null;
								self.smsText = null;

								self.workFlowType = null;
								self.onlyMasstagTickets = null

								self.enableSelectGroup = true;

								$scope.query = null;
								$scope.myForm.$setPristine();

								self.showLoadingBox();
								self.fetchFilteredTicketdetails(
										self.searchByTicketType,
										self.searchByStatus, self.workFlowType,
										self.onlyMasstagTickets);
// self.hideLoadingBox();
							};

							/* Show Success Message */
							self.showSuccessMessage = function(message) {
								// Reset previous messages
								self.successMessages = null;
								self.errorMessages = null;

								self.successMessages = message;
								$timeout(function() {
									self.successMessages = null;
									self.errorMessages = null;
								}, 50000);
							};

							/* Show Error Message */
							self.showErrorMessage = function(message) {
								// Reset previous messages
								self.successMessages = null;
								self.errorMessages = null;

								self.errorMessages = message;
								$timeout(function() {
									self.successMessages = null;
									self.errorMessages = null;
								}, 70000);
							};
							
							self.showLoadingBox = function() {
								self.showLoading= true;
							};
							
							self.hideLoadingBox = function() {
								self.showLoading= false;
							};

						} ]);
/* End of Controller Code */