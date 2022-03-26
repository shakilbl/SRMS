/* Service Code */
'use strict';
App
		.factory(
				'TicketdetailspageService',
				[
						'$http',
						'$q',
						'url',
						function($http, $q, url) {

							return {

								fetchTicketdetails : function(ticketId) {
									return $http
											.get(
													url + 'ticketdetailspage/'
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

								fetchsolutionsla : function(responsedata) {
									return $http
											.post(url + 'fetchsolutionsla',
													responsedata)
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

								forwardComplaints : function(responsedata,
										actionType, smsText, workFlowType) {
									return $http
											.post(
													url + 'ticketdetailspage/'
															+ actionType + "/"
															+ smsText + "/"
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

								rollbackComplaints : function(responsedata) {
									return $http
											.post(url + 'roolbackticket',
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

								forwardComplaintsWithSolution : function(
										responsedata, actionType, smsText,
										workFlowType) {
									return $http
											.post(
													url
															+ 'forwardWithSolution/'
															+ actionType + "/"
															+ smsText + "/"
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
								changeComplaintsStatus : function(responseData,
										actionType, smsText) {
									return $http
											.post(
													url
															+ 'changeticketdetailspage/'
															+ actionType + "/"
															+ smsText,
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
								saveSubgroups : function(responseData) {
									console.log("Inside service...");
									return $http
											.post(url + 'savesubgroups',
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
								// fetch ticket history
								fetchAllTicketHistory : function(ticketNumber) {
									return $http
											.get(
													url + 'GetTicketHistory/'
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

/* End of Service Code */

/* Controller Code */
App
		.controller(
				'TicketdetailspageController',
				[
						'$scope',
						'$timeout',
						'$window',
						'TicketdetailspageService',
						function($scope, $timeout, $window,
								TicketdetailspageService) {
							var self = this;

							self.complaint = null;

							self.comment = null;

							self.IssuesSolutionCategoryMaps = [];
							self.abc = [];
							self.l = {
								id : null,
								name : null
							};
							self.selectedISCM = null;
							self.ISCMId = null;
							self.ticketIssue = null;
							self.ticketSolution = null;
							self.solutionConstrain = null;

							self.selectedGroup = null;
							self.selectedStatus = null;

							self.workFlowType = null;

							self.smsText = null;

							// If sms will be sent or not
							self.toSendSms = false;
							self.isSMSPanelEnable = true;

							self.showLoading= false;
							self.successMessages = null;
							self.errorMessages = null;

							// Dynamic content
							self.ticketdynamicfield = null;
							self.previousGroups = null;

							// VIP sla stuff
							self.vipCommittedFeedbackSlaHour = null;
							self.vipCommittedSolutionSlaHour = null;
							self.nonVipCommittedFeedbackSlaHour = null;
							self.nonVipCommittedSolutionSlaHour = null;

							// Solution sla stuff
							self.oldGroupSladate = null;
							self.oldDivisionE2esladate = null;

							self.attachmentNames = [];
							self.ticketHistoryData = null;

							// TicketdetailsPage stuff
							self.ticketDetailsPage_ticketHopsId = 0;
							self.ticketCommentHistory = [];
							// Subgroup already selected previously
							self.selectedSubGroups = [];
							self.solutionNames = [];
							// Subgroup user gonna select now
							self.addedSubgroup = [];
							self.smsTemplate = null;
							// ---End of TicketdetailsPage stuff

							$scope.uploadFile = function() {
								console.log("Inside this paradox");
								$scope.processDropzone();
							};
							
							
							// RO function
							
							self.gotoRO = function(ticketNumber){
								var x = self.complaint.ticketNumber.substring(4);
								var url = '/SRMS_2/ROField?unxtn='+x;
								window.open(url,'_blank');
								
							}

							// History GRID Stuff
							self.fetchAllTicketHistory = function(ticketNumber) {
								console.log(ticketNumber);
								TicketdetailspageService
										.fetchAllTicketHistory(ticketNumber)
										.then(
												function(d) {

													self.ticketHistoryData = d;
													// var ticketHistoryData =
													// d;
													// $scope.tableParamsValue =
													// new NgTableParams({}, {
													// dataset:
													// ticketHistoryData});
												},
												function(errResponse) {
													self
															.showErrorMessage("Failed to Save Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};

							// TicketdetailsPage stuff
							self.fetchSingleTickethops = function(ticketHopsId) {
								TicketdetailspageService
										.fetchTicketdetails(ticketHopsId)
										.then(
												function(d) {
													self.complaint = d.aTickethops;
													self.ticketCommentHistory = d.ticketcomments;
													self.ticketdynamicfield = d.ticketdynamicfield;
													
													
													self.previousGroups = d.previousGroups;
													self.attachmentNames = d.attachmentNames;
													console
															.log(self.previousGroups);
													// console
													// .log(self.ticketdynamicfield);
													self.smsTemplate = d.smsTemplate;
													self.workFlowType = d.aTickethops.wfheader.type;
													self.selectedSubGroups = d.subgroupIdList;
													self.solutionNames = d.solutionNames;
													self.IssuesSolutionCategoryMaps = d.issuesolutioncategorymaps;
													self.ticketIssue = d.ticketIssue;
													self.ticketSolution = d.ticketSolution;

													if (!(d.vipCommittedFeedbackSlaHour == null)) {
														self.vipCommittedFeedbackSlaHour = new Date(
																d.vipCommittedFeedbackSlaHour);
													}
													if (!(d.vipCommittedSolutionSlaHour == null)) {
														self.vipCommittedSolutionSlaHour = new Date(
																d.vipCommittedSolutionSlaHour);
													}
													if (!(d.nonVipCommittedFeedbackSlaHour == null)) {
														self.nonVipCommittedFeedbackSlaHour = new Date(
																d.nonVipCommittedFeedbackSlaHour);
													}
													if (!(d.nonVipCommittedSolutionSlaHour == null)) {
														self.nonVipCommittedSolutionSlaHour = new Date(
																d.nonVipCommittedSolutionSlaHour);
													}

													// console
													// .log(
													// self.nonVipCommittedSolutionSlaHour,
													// " and ",
													// self.nonVipCommittedFeedbackSlaHour);

													for (var i = 0; i < self.IssuesSolutionCategoryMaps.length; i++) {

														self.l.id = self.IssuesSolutionCategoryMaps[i].issueSolutionCategoryMapId;
														self.l.name = self.IssuesSolutionCategoryMaps[i].issuesolutioncategory.name
																+ "("
																+ self.IssuesSolutionCategoryMaps[i].issuesolution.name
																+ ")";
														/*
														 * self.l.name =
														 * self.IssuesSolutionCategoryMaps[i].issuesolution.name;
														 */
														self.abc[i] = self.l;

														self.l = {
															id : null,
															name : null
														};
													}
													// Keep old sla
													if (!(self.complaint.groupSladate == null)) {
														self.oldGroupSladate = new Date(
																self.complaint.groupSladate);
													}
													if (!(self.complaint.divisionE2esladate == null)) {
														self.oldDivisionE2esladate = new Date(
																self.complaint.divisionE2esladate);
													}
													// Handling dates
													if (!(self.complaint.ticketsummary.committedSolutionDate == null)) {
														self.complaint.ticketsummary.committedSolutionDate = new Date(
																self.complaint.ticketsummary.committedSolutionDate);
													}
													if (!(self.complaint.ticketsummary.committedFeedbackDate == null)) {
														self.complaint.ticketsummary.committedFeedbackDate = new Date(
																self.complaint.ticketsummary.committedFeedbackDate);
													}
													if (!(self.complaint.divisionE2esladate == null)) {
														self.complaint.divisionE2esladate = new Date(
																self.complaint.divisionE2esladate);
														console
																.log(
																		'DIVISION SLA',
																		self.complaint.divisionE2esladate);
													}
													if (!(self.complaint.groupSladate == null)) {
														self.complaint.groupSladate = new Date(
																self.complaint.groupSladate);
														console
																.log(
																		'GROUP SLA',
																		self.complaint.groupSladate);
													}

													// Load History Data
													self
															.fetchAllTicketHistory(self.complaint.ticketNumber);
													
													var dt = new Date();
													var month = dt.getMonth() + 1;
													var day = dt.getDate();
													var hour = dt.getHours();
													var minute = dt.getMinutes();
													var second = dt.getSeconds();
													var output = (('' + month).length < 2 ? '0' : '')
															+ month + '/'
															+ (('' + day).length < 2 ? '0' : '') + day
															+ '/' + dt.getFullYear() + ' '
															+ (('' + hour).length < 2 ? '0' : '') + hour
															+ ':' + (('' + minute).length < 2 ? '0' : '')
															+ minute;
													// self.ticketdynamicfield.d2
													// = output;
													if (self.ticketdynamicfield.d3==null && self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 78) {
														self.ticketdynamicfield.d3 = output;							
													} 
													if (self.ticketdynamicfield.d2==null && self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 79) {
														self.ticketdynamicfield.d2 = output;
													}
													if (self.ticketdynamicfield.d16==null && self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 107) {
														self.ticketdynamicfield.d16 = output;
													}
													if (self.ticketdynamicfield.d17==null && self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 107) {
														self.ticketdynamicfield.d17 = output;
													}

												},
												function(errResponse) {
													self
															.showErrorMessage(
																	errResponse.data.errorMessage,
																	errResponse.status);
													console
															.error(
																	"Server Response: ",
																	errResponse.data.errorMessage,
																	errResponse.status);
												});
							};

							self.fetchsolutionsla = function(responsedata) {
								TicketdetailspageService
										.fetchsolutionsla(responsedata)
										.then(
												function(d) {
													// Keep old sla
													if (!(self.complaint.groupSladate == null)) {
														self.oldGroupSladate = new Date(
																self.complaint.groupSladate);
													}
													if (!(self.complaint.divisionE2esladate == null)) {
														self.oldDivisionE2esladate = new Date(
																self.complaint.divisionE2esladate);
													}

													if (!(d.groupLevelSla == null)) {
														self.complaint.groupSladate = new Date(
																d.groupLevelSla);
													}
													if (!(d.divisionLevelSla == null)) {
														self.complaint.divisionE2esladate = new Date(
																d.divisionLevelSla);
													}

													console.log(
															d.divisionLevelSla,
															" amd ",
															d.groupLevelSla);
													console
															.log(
																	self.complaint.divisionE2esladate,
																	" amd ",
																	self.complaint.divisionE2esladate);
												},
												function(errResponse) {
													self
															.showErrorMessage(
																	errResponse.data.errorMessage,
																	errResponse.status);
													console
															.error(
																	"Server Response: ",
																	errResponse.data.errorMessage,
																	errResponse.status);
												});
							};

							self.forwardComplaints = function(responsedata,
									actionType, smsText, workFlowType) {
								TicketdetailspageService
										.forwardComplaints(responsedata,
												actionType, smsText,
												workFlowType)
										.then(
												function(d) {
													$scope.uploadFile();
													self.comment = null;
													self
															.showSuccessMessage(d.message);
													self
															.loadTicketdetailsResources();
												},
												function(errResponse) {
													self
															.showErrorMessage(errResponse.data.message);
													console
															.error(
																	'Error while creating complaint.',
																	errResponse.status);

												}).finally(function () {
													self.hideLoadingBox();
												});
							};

							self.forwardComplaintsWithSolution = function(
									responsedata, actionType, smsText,
									workFlowType) {
								console.log("It is being called");
								TicketdetailspageService
										.forwardComplaintsWithSolution(
												responsedata, actionType,
												smsText, workFlowType)
										.then(
												function(d) {
													$scope.uploadFile();
													self.comment = null;
													self
															.showSuccessMessage(d.message);
													self
															.loadTicketdetailsResources();
												},
												function(errResponse) {
													self
															.showErrorMessage(errResponse.data.message);
													console
															.error(
																	'Error while creating complaint.',
																	errResponse.status);

												}).finally(function () {
													self.hideLoadingBox();
												});
							};

							self.rollbackComplaints = function(responsedata) {
								console.log("Rollback con is being called");
								TicketdetailspageService
										.rollbackComplaints(responsedata)
										.then(
												function(d) {
													$scope.uploadFile();
													self.comment = null;
													self
															.showSuccessMessage(d.message);
													self
															.loadTicketdetailsResources();
												},
												function(errResponse) {
													self
															.showErrorMessage(errResponse.data.message);
													console
															.error(
																	'Error while creating complaint.',
																	errResponse.status);

												}).finally(function () {
													self.hideLoadingBox();
												});
							};

							self.changeComplaintsStatus = function(
									responseData, actionType, smsText) {
								TicketdetailspageService
										.changeComplaintsStatus(responseData,
												actionType, smsText)
										.then(
												function(d) {
													$scope.uploadFile();
													self.comment = null;
													self
															.showSuccessMessage(d.message);
													self
															.loadTicketdetailsResources();
												},
												function(errResponse) {
													self
															.showErrorMessage(errResponse.message);
													console
															.error(
																	'Error while creating complaint.',
																	errResponse.status);

												}).finally(function () {
													self.hideLoadingBox();
												});
							};
							// ---End of TicketdetailsPage stuff

							self.submit = function(currentUserGroup) {
								console
										.log(
												"GRoup: ",
												angular
														.lowercase(self.complaint.usergroupByNextUserGroupId.division));
								// Validate if user has selected appropriate
								// action
								console.log(self.ticketdynamicfield);
								if(self.ticketdynamicfield != null){
								if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 6 ) {
									self.ticketdynamicfield.d1 = angular
											.element('#dt_problem_start_date').val();

								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 7) {
									self.ticketdynamicfield.d3 = angular
											.element('#txt_problem_start_date')
											.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 8) {
									self.ticketdynamicfield.d3 = angular
											.element('#txt_problem_start_date')
											.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 9) {
									self.ticketdynamicfield.d3 = angular
											.element('#txt_date_time').val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 10) {
									self.ticketdynamicfield.d3 = angular
											.element('#txt_problem_start_date')
											.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 18) {
									self.ticketdynamicfield.d1 = angular
											.element('#dt_problem_date_time')
											.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 19) {
									self.ticketdynamicfield.d1 = angular
											.element('#dt_problem_date_time')
											.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 20) {
									self.ticketdynamicfield.d1 = angular
											.element('#dt_problem_date_time')
											.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 22) {
									self.ticketdynamicfield.d1 = angular
											.element('#dt_problem_date_time')
											.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 25) {
									self.ticketdynamicfield.d4 = angular
											.element('#txt_problem_date_time')
											.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 29) {
									self.ticketdynamicfield.d1 = angular
											.element('#txt_problem_date_time')
											.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 32) {
									self.ticketdynamicfield.d1 = angular
											.element('#txt_problem_date_time')
											.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 33) {
									self.ticketdynamicfield.d2 = angular
									.element('#dt_activation_date')
									.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 34) {
									self.ticketdynamicfield.d2 = angular
									.element('#dt_activation_date')
									.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 35) {
									self.ticketdynamicfield.d1 = angular
									.element('#dt_offer_date_time')
									.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 36) {
									self.ticketdynamicfield.d1 = angular
											.element('#dt_offer_date_time')
											.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 38) {
									self.ticketdynamicfield.d2 = angular
									.element('#dt_offer_date_time')
									.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 40) {
									self.ticketdynamicfield.d1 = angular
									.element('#dt_problem_date_time')
									.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 41) {
									self.ticketdynamicfield.d1 = angular
									.element('#dt_problem_date_time')
									.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 49) {
									self.ticketdynamicfield.d1 = angular
									.element('#dt_problem_date_time')
									.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 57) {
									self.ticketdynamicfield.d1 = angular
									.element('#dt_offer_date_time')
									.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 58) {
									self.ticketdynamicfield.d2 = angular
									.element('#dt_offer_date_time')
									.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 64) {
									self.ticketdynamicfield.d2 = angular
									.element('#dt_date_time')
									.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 66) {
									self.ticketdynamicfield.d2 = angular
									.element('#dt_date_time')
									.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 67) {
									self.ticketdynamicfield.d1 = angular
									.element('#dt_problem_date_time')
									.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 68) {
									self.ticketdynamicfield.d1 = angular
									.element('#dt_problem_date_time')
									.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 70) {
									self.ticketdynamicfield.d1 = angular
									.element('#dt_problem_date_time')
									.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 72) {
									self.ticketdynamicfield.d1 = angular
									.element('#dt_problem_date_time')
									.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 73) {
									self.ticketdynamicfield.d4 = angular
									.element('#dt_last_calling')
									.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 74) {
									self.ticketdynamicfield.d3 = angular
									.element('#dd_last_calling_date_time')
									.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 75) {
									self.ticketdynamicfield.d4 = angular
									.element('#dt_last_calling')
									.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 76) {
									self.ticketdynamicfield.d4 = angular
									.element('#dt_last_calling')
									.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 77) {
									self.ticketdynamicfield.d1 = angular
									.element('#dt_problem_date_time')
									.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 78) {
									self.ticketdynamicfield.d8 = angular
											.element('#dt_date_time').val();
									self.ticketdynamicfield.d3 = angular
											.element('#dt_date_time_vocm').val();
							
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 79) {
									self.ticketdynamicfield.d8 = angular
									.element('#dt_date_time')
									.val();
									self.ticketdynamicfield.d2 = angular
									.element('#dt_problem_date_time')
									.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 80) {
									self.ticketdynamicfield.d1 = angular
									.element('#dt_problem_date_time')
									.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 81) {
									self.ticketdynamicfield.d2 = angular
									.element('#dt_bill_cycle')
									.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 82) {
									self.ticketdynamicfield.d4 = angular
									.element('#txt_due_payment_date')
									.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 89) {
									self.ticketdynamicfield.d3 = angular
									.element('#txt_due_payment_date')
									.val();
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 97) {
									/*
									 * alert("Map Id: " +
									 * self.ticketsummary.issuesolutioncategorymap.issueSolutionCategoryMapId);
									 */
									if(self.ticketdynamicfield.d5 == 'Sudden')
										self.ticketdynamicfield.d6 = angular.element('#sudden_input').val(); 
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 98) {
									/*
									 * alert("Map Id: " +
									 * self.ticketsummary.issuesolutioncategorymap.issueSolutionCategoryMapId);
									 */
									if(self.ticketdynamicfield.d5 == 'Sudden')
										self.ticketdynamicfield.d6 = angular.element('#sudden_input').val(); 
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 99) {
									/*
									 * alert("Map Id: " +
									 * self.ticketsummary.issuesolutioncategorymap.issueSolutionCategoryMapId);
									 */
									if(self.ticketdynamicfield.d5 == 'Sudden')
										self.ticketdynamicfield.d6 = angular.element('#sudden_input').val(); 
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 100) {
									/*
									 * alert("Map Id: " +
									 * self.ticketsummary.issuesolutioncategorymap.issueSolutionCategoryMapId);
									 */
									if(self.ticketdynamicfield.d5 == 'Sudden')
										self.ticketdynamicfield.d6 = angular.element('#sudden_input').val(); 
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 101) {
									/*
									 * alert("Map Id: " +
									 * self.ticketsummary.issuesolutioncategorymap.issueSolutionCategoryMapId);
									 */
									if(self.ticketdynamicfield.d5 == 'Sudden')
										self.ticketdynamicfield.d6 = angular.element('#sudden_input').val(); 
								} else if (self.complaint.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.issueSolutionCategoryId == 107) {
									/*
									 * alert("Map Id: " +
									 * self.ticketsummary.issuesolutioncategorymap.issueSolutionCategoryMapId);
									 */
									if(self.ticketdynamicfield.d5 == 'Sudden')
										self.ticketdynamicfield.d6 = angular.element('#sudden_input').val();
									self.ticketdynamicfield.d16 = angular.element('#dt_package_modification_date').val();
									self.ticketdynamicfield.d17 = angular.element('#dt_package_expiry_date').val();
									
								}
								
								}

								self.ISCMId = null;
								console.log(self.complaint.status,
										self.selectedStatus, self.workFlowType);

								if (self.complaint.status == 'Hold') {
									if (self.selectedStatus != 'Release') {
										self
												.showErrorMessage("You can not perform selected action on a Hold ticket.");
										return;
									}
								} else if (self.complaint.status == 'Closed') {
									if (self.selectedStatus != 'Reopen') {
										self
												.showErrorMessage("You can not perform selected action on a Closed ticket.");
										return;
									}
								} else if (self.complaint.status == 'RequestForCloser') {
									if (!(self.selectedStatus == 'Closed'
											|| (self.selectedStatus == 'Open' && angular
													.lowercase(self.complaint.usergroupByNextUserGroupId.division) == 'technology')
											|| self.selectedStatus == 'Reopen' || self.selectedStatus == 'RequestForCloser')) {
										self
												.showErrorMessage("You can not perform selected action on a RequestForCloser ticket.");
										return;
									}
								} else if (self.complaint.status == 'Reopen') {
									if (!(self.selectedStatus == 'Reopen'
											|| self.selectedStatus == 'RequestForCloser' || self.selectedStatus == 'Rollback')) {
										console.log("test",
												self.complaint.status,
												self.selectedStatus);
										// self.selectedStatus == 'Closed' ||
										// (May Require)
										self
												.showErrorMessage("You can not perform selected action on a Reopen ticket.");
										return;
									}
								} else if (self.complaint.status == 'Open') {
									if (!(self.selectedStatus == 'Open'
											|| self.selectedStatus == 'Rollback'
											|| self.selectedStatus == 'Closed'
											|| self.selectedStatus == 'Hold' || self.selectedStatus == 'RequestForCloser')) {
										// self.selectedStatus == 'Closed' ||
										// (May require)
										self
												.showErrorMessage("You can not perform selected action on an Open ticket.");
										return;
									}
								}
								if (self.selectedStatus == "Closed"
										|| self.selectedStatus == "Hold"
										|| self.selectedStatus == "Release") {
									var responseData = {
										"aTickethops" : self.complaint,
										"comment" : self.comment,
										"ticketdynamicfield" : self.ticketdynamicfield,
										"smsText" : self.smsText
												+ self.smsTemplate
									};
									self.showLoadingBox();
									self
											.changeComplaintsStatus(
													responseData,
													self.selectedStatus,
													self.toSendSms);
									// $scope.uploadFile();
								} else if (self.selectedStatus == "RequestForCloser"
										|| self.selectedStatus == "Open"
										|| self.selectedStatus == "Reopen") {
									if (self.workFlowType == "Dynamic"
											&& (self.selectedGroup == null || self.selectedGroup == "")
											&& !(self.selectedStatus == "RequestForCloser")
											&& (self.selectedISCM == null
													|| self.selectedISCM.id == null || self.getCurrentGroup(angular.lowercase(currentUserGroup)) != "rp")
											&& (self.complaint.subGroupParentHopId==null)) {

										self
												.showErrorMessage("You must select a Group to perform this action.");
										return;
									} else {

										if (self.selectedISCM != null
												&& self.selectedISCM.id != null) {
											self.ISCMId = self.selectedISCM.id;
										}
										var responseData = {
											"usergroup" : self.selectedGroup,
											"aTickethops" : self.complaint,
											"comment" : self.comment,
											"smsText" : self.smsText
													+ self.smsTemplate,
											"issueSolutionCategoryMapId" : self.ISCMId,
											"ticketdynamicfield" : self.ticketdynamicfield,
											"solutionConstrain" : self.solutionConstrain
										};
										// Actions for selecting solutiions will
										// only be performed for 'Open' actions
										// and only RP can perform that
										console.log(self.ISCMId);
										if (self.ISCMId != null
												&& self.selectedStatus == "Open"
												&& self.getCurrentGroup(angular.lowercase(currentUserGroup)) == "rp") {
											console
													.log(
															"Constrain: ",
															self.complaint.solutionConstraint);
											if (self.complaint.solutionConstraint == null
													|| self.complaint.solutionConstraint == "") {
												self
														.showErrorMessage("You must select a Solution Constrain to perform this action.");
												return;
											}
											// solution is given, so call its
											// webapi
											self.complaint.selectedSolution = self.selectedISCM.name;
											console
													.log("Calling forwardComplaintsWithSolution");
											self.showLoadingBox();
											self.forwardComplaintsWithSolution(
													responseData,
													self.selectedStatus,
													self.toSendSms,
													self.workFlowType);

										} else {
											console
													.log("Calling forwardComplaints");
											if (self.selectedISCM != null
													&& self.selectedISCM.id != null) {
												console
														.log(
																"self.selectedISCM.name: ",
																self.selectedISCM.name);
												self.complaint.selectedSolution = self.selectedISCM.name;
											}
											self.showLoadingBox();
											self.forwardComplaints(
													responseData,
													self.selectedStatus,
													self.toSendSms,
													self.workFlowType);
										}

									}
								} else if (self.selectedStatus == "Rollback") {
									console.log("Rollback is being called.");
									// New feature: Rollback
									var responseData = {
										"usergroup" : self.selectedGroup,
										"aTickethops" : self.complaint,
										"comment" : self.comment,
										"smsText" : self.smsText
												+ self.smsTemplate,
										"issueSolutionCategoryMapId" : self.ISCMId,
										"ticketdynamicfield" : self.ticketdynamicfield,
										"solutionConstrain" : self.solutionConstrain
									};
									self.showLoadingBox();
									self.rollbackComplaints(responseData);
								}

								self.resetAll();
							};

							self.addSubgroup = function(subgroupId) {
								console.log(subgroupId);
								if (self.addedSubgroup.indexOf(subgroupId) > -1) {
									// Removing element from array
									self.addedSubgroup.splice(
											self.addedSubgroup
													.indexOf(subgroupId), 1);
								} else {
									self.addedSubgroup.push(subgroupId);
								}
								console.log(self.addedSubgroup);
							};

							self.submitSubgroups = function() {
								console.log("Inside........");
								if (self.addedSubgroup.length != 0
										&& self.complaint != null) {
									var responseData = {
										"aTickethops" : self.complaint,
										"comment" : self.comment,
										"addedSubgroupIdList" : self.addedSubgroup
									};
									console
											.log("Inside and calling saveSubgroup webservice");
									TicketdetailspageService
											.saveSubgroups(responseData)
											.then(
													function(d) {
														self
																.showSuccessMessage(d.message);
														self
																.loadTicketdetailsResources();
													},
													function(errResponse) {
														self
																.showErrorMessage(errResponse.data.errorMessage);
														console
																.error(
																		"Server Response: ",
																		errResponse.data.errorMessage,
																		errResponse.status);
													});
								} else {
									self
											.showErrorMessage("Please select Subgroups to perform this action.");
								}
							};

							self.isSubGroup = function(id) {
								return self.selectedSubGroups.indexOf(id) !== -1;
							};

							self.enableSMSPanel = function() {
								self.isSMSPanelEnable = false;
							};

							self.loadSolutionSla = function() {
								// if self.selectedISCM has an id
								// that means a valid ISCM is selected
								if (self.selectedISCM != null
										&& self.selectedISCM.id != null) {
									var responseData = {
										"aTickethops" : self.complaint
									};
									self.fetchsolutionsla(responseData);
									// self.ISCMId =
									// self.selectedISCM.id;
									// Call webservice
								} else {
									// If invalid or no solution selected, set
									// sla values to old values
									if (self.complaint != null) {
										self.complaint.groupSladate = self.oldGroupSladate;
										self.complaint.divisionE2esladate = self.oldDivisionE2esladate;
									}
								}
							};

							// Requirement Change: Dont need to load sla on
							// solution selection
							/*
							 * $scope .$watch("one.selectedISCM", function
							 * loadSolutionSla(newValue, oldValue) {
							 * self.loadSolutionSla(); });
							 */

							self.enableSolutionDD = function() {
								// If user division is technology and workflow
								// is of solution type
								// enable solution selecting DD
								console.log(self.complaint);
								return (self.complaint.usergroupByNextUserGroupId.division == 'Technology' && self.complaint.issuesolutioncategorymap.issuesolution.type != 'Solution');
							};

							self.hasSubGroup = function() {
								return (self.selectedSubGroups != null && self.selectedSubGroups.length != 0);
							};

							self.toggleVipSla = function(vipSla) {
								if (vipSla == 'Yes') {
									// Keep old nonvip sla
									if (self.complaint.ticketsummary.committedFeedbackDate != null) {
										self.nonVipCommittedFeedbackSlaHour = self.complaint.ticketsummary.committedFeedbackDate;
									}
									if (self.complaint.ticketsummary.committedSolutionDate != null) {
										self.nonVipCommittedSolutionSlaHour = self.complaint.ticketsummary.committedSolutionDate;
									}

									self.complaint.ticketsummary.committedFeedbackDate = self.vipCommittedFeedbackSlaHour;
									self.complaint.ticketsummary.committedSolutionDate = self.vipCommittedSolutionSlaHour;
								} else {
									// Keep old vip sla
									if (self.complaint.ticketsummary.committedFeedbackDate != null) {
										self.vipCommittedFeedbackSlaHour = self.complaint.ticketsummary.committedFeedbackDate;
									}
									if (self.complaint.ticketsummary.committedSolutionDate != null) {
										self.vipCommittedSolutionSlaHour = self.complaint.ticketsummary.committedSolutionDate;
									}

									self.complaint.ticketsummary.committedFeedbackDate = self.nonVipCommittedFeedbackSlaHour;
									self.complaint.ticketsummary.committedSolutionDate = self.nonVipCommittedSolutionSlaHour;
								}
							};

							// TicketdetailsPage stuff
							self.redirectToTicketdetails = function(
									ticketHopsId) {
								$window.location.href = "servicerequestdetials?ticketHopsId="
										+ ticketHopsId;
							};

							self.selectedISCMChanged = function() {
								console.log("one.selectedISCM: ",
										self.selectedISCM);
								if (self.selectedISCM == null
										|| self.selectedISCM == '') {
									console.log("one.selectedISCM is null");
								}
							};

							self.loadTicketdetailsResources = function() {
								self
										.fetchSingleTickethops(self.ticketDetailsPage_ticketHopsId);

							};

							// Watch when
							// one.ticketDetailsPage_ticketHopsId
							// is set and load ticketdetails from db with
							// that ticketHopsId
							$scope
									.$watch(
											"one.ticketDetailsPage_ticketHopsId",
											function loadTicketdetailsPageResources(
													newValue, oldValue) {
												if (self.ticketDetailsPage_ticketHopsId > 0) {
													self
															.loadTicketdetailsResources();
												}
											});

							self.reset = function() {
								self.smsText = null;
								self.massIssueList = [];
								self.massComplaint = false;
								self.comment = null;
								$scope.query = null;
								$scope.myForm.$setPristine();
							};

							self.getCurrentGroup = function(currentGroup) {
								var substring = "vocm";
								var re_net = new RegExp("tcm(\\s*)network");
								var re_pro = new RegExp("tcm(\\s*)product(.*)");
								var re_trans = new RegExp(
										"regional(\\s*)transformations");

								if (currentGroup.indexOf(substring) > -1) {
									return substring;
								} else if (currentGroup.startsWith("rp")) {
									return "rp";
								} else if (currentGroup.startsWith("ro")) {
									return "ro";
								} else if (re_net.test(currentGroup)) {
									return "tcm_network";
								} else if (re_pro.test(currentGroup)) {
									return "tcm_product";
								} else if (re_trans.test(currentGroup)) {
									return "regional_transformation";
								} else {
									return currentGroup;
								}
							};

							self.enableSolution = function(currentGroup) {
								var re_net = new RegExp("tcm(\\s*)network");
								var re_pro = new RegExp("tcm(\\s*)product(.*)");

								if (currentGroup.startsWith("rp")) {
									return true;
								} else if (re_net.test(currentGroup)) {
									return true;
								} else if (re_pro.test(currentGroup)) {
									return true;
								} else {
									return false;
								}
							};
							
							self.enableControl = function(currentDivision){
								// TD fields will only be enabled for
								// Technology and VOCM divisions
								var substring_vocm = "vocm";
								var substring_tech = "technology";

								if (currentDivision.indexOf(substring_vocm) > -1) {
									return true;
								}else {
									return false;
								}
							};
							
							self.resetAll = function() {
								// Reset all Search and Action dropdowns
								self.selectedGroup = null;
								self.selectedStatus = null;
								self.smsText = null;

								self.workFlowType = null;

								// Only reset comment on success, not on failure
								// self.comment = null;

								$scope.myForm.$setPristine();
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
							
							self.showLoadingBox = function() {
								// Reset messages before working
								self.successMessages = null;
								self.errorMessages = null;
								
								self.showLoading= true;
							};
							
							self.hideLoadingBox = function() {
								self.showLoading= false;
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

						} ]);
/* End of Controller Code */