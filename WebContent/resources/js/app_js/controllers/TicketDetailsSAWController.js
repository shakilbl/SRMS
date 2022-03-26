// angular controller area 
'use strict';
App
		.controller(
				'ticketDetailsSAWController',
				[
						'$scope',
						'$timeout',
						'$window',
						'ticketDetailsSAWService',
						'issuesolutioncategorymapService','ticketCreationService',
						'UsergrpService',
						'NgTableParams',
						function($scope, $timeout, $window,
								ticketDetailsSAWService,
								issuesolutioncategorymapService,ticketCreationService,
								UsergrpService, NgTableParams) {

							$scope.uploadFile = function() {
								console.log("Inside the dropbox");
								$scope.processDropzone();
								$scope.resetDropzone();
							};
							
							$scope.faultEscalation = function() {
								var currDate = new Date();
								if (angular.element("#clearTime").val() != "") {
									var clearTimeDate = new Date(angular
											.element("#clearTime").val());
									var d1 = new Date(clearTimeDate);
									var d2 = new Date(currDate);
									var miliseconds = d2 - d1;
									var seconds = miliseconds / 1000;
									var minutes = seconds / 60;
									var hours = minutes / 60;
									var days = hours / 24;
									if (hours > 4) {
										alert("Sorry. input hour should be limit to 4 hour (basis of system datetime):::: "
												+ hours)
										// $scope.showErrorMessage("Sorry. input
										// hour should be limit to 4 hour (basis
										// of system datetime):::: "+hours);
										// alert("Sorry. hour should not be more
										// than 4: "+hours);
										$scope.clearTime = null;
									} else {
										$scope.clearTime = angular.element(
												"#clearTime").val();
									}
								}
							};



							$scope.faultEvent = function() {
								$scope.faultEscalationtDate = angular.element(
										"#faultEscalationtDate").val();
							};

							$scope.attachmentNames = [];
							$scope.loading = true;
							$scope.successMessages = false;
							$scope.errorMessages = false;
							$scope.showLoading = true;

							// Test Purpose
							$scope.iscmTest = "Bill";
							
							$scope.userGroup = null;
							// fetch user group value
							$scope.fetchAllUsers = function() {
								UsergrpService
										.fetchAllUsers()
										.then(
												function(d) {
													$scope.usergroups = d;
													$scope.ug = undefined;
													$scope.userGroupKeyValue = []
													$scope.l = {
														id : null,
														name : null
													};
													for (var i = 0; i < $scope.usergroups.length; i++) {

														$scope.l.id = $scope.usergroups[i].userGroupId;
														$scope.l.name = $scope.usergroups[i].name;
														$scope.userGroupKeyValue[i] = $scope.l;
														$scope.l = {
															id : null,
															name : null
														};
													}

												},
												function(errResponse) {

													console
															.error('Error while fetching User');
												});
							};

							// fetch issue solution category map value
							
							$scope.issueSolution = null;
							$scope.getAllSolutionNames = function(){
								ticketDetailsSAWService.getAllSolutionNames()
								.then(
										function(d){
											$scope.issueSolution = d;
											$scope.iscmKeyValue = []
											$scope.l = {
												id : null,
												name : null
											};
											for (var i = 0; i < $scope.issueSolution.length; i++) {
												$scope.l.id = $scope.issueSolution[i].id;
												$scope.l.name = $scope.issueSolution[i].name;
												$scope.iscmKeyValue[i] = $scope.l;
												$scope.l = {
													id : null,
													name : null
												};
											}
											$scope.showLoading = false;
										}
								)
							};

							//debo added
							$scope
							.$watch(
									"issuesolutioncategorymap",
									function ISCMID(newValue, oldValue) {
										if ($scope.issuesolutioncategorymap.id > 0) {
											$scope.sysDate = "sysDate";
											// fetch group sla value
											ticketCreationService
													.fetchGroupSla(
															$scope.sysDate,
															$scope.issuesolutioncategorymap.id,
															$scope.ticketDetails.usergroupByNextUserGroupId.userGroupId,
															$scope.ticketDetails.ticketsummary.severity,
															$scope.ticketDetails.ticketsummary.componentType,
															$scope.ticketDetails.ticketsummary.faultImpact)
													.then(
															function(d) {
																$scope.groupSladate = d.message;
															},
															function(
																	errResponse) {
																console
																		.error('Error while fetching group Sla');
															});

											ticketCreationService
													.fetchE2ESla(
															$scope.sysDate,
															$scope.issuesolutioncategorymap.id,
															$scope.ticketDetails.ticketsummary.severity,
															$scope.ticketDetails.ticketsummary.componentType)
													.then(
															function(d) {
																$scope.committedFeedbackDate = d.message;
															},
															function(
																	errResponse) {
																console
																		.error('Error while fetching E2E Sla');
															});

										}
									});
									
							$scope.fetchCurrentUserGroup = function() {
								ticketDetailsSAWService
										.fetchCurrentUserGroup()
										.then(
												function(d) {
													//$scope.section = d.message.trim();
													$scope.section = "SOC";
													if (d.message == null) {
														//$scope.status = false;
													} else {
														//$scope.status = true;
													}
												},
												function(errResponse) {
													console
															.error('Error while fetching group Sla');
												});
							}


							$scope.reset = function() {
								$scope.ticketDetails.ticketNumber = null;
								$scope.ticketDetails.status = null;
								$scope.iscm = null;
								$scope.solution = null;
								$scope.ticketDetails.ticketsummary.severity = null;
								$scope.ticketDetails.ticketsummary.ticketType = null;
								$scope.ticketDetails.ticketsummary.problemComponent = null;
								$scope.ticketDetails.ticketsummary.componentType = null;
								$scope.ticketDetails.ticketsummary.faultEventDate = null;
								$scope.ticketDetails.ticketsummary.faultEscalationtDate = null;
								$scope.ticketDetails.ticketsummary.committedFeedbackDate = null;
								$scope.ticketDetails.ticketsummary.ticketCreationDate = null;
								$scope.ticketDetails.ticketsummary.problemPlatform = null;
								$scope.ticketDetails.ticketsummary.faultImpact = null;
								$scope.ticketDetails.ticketsummary.preKpi = null;
								$scope.ticketDetails.ticketsummary.otherProblem = null;
								$scope.comment = null;
								$scope.ticketDetails.ticketsummary.specialNote = null;
								$scope.actionType = null;
								$scope.userGroup = null;
							}

							/* Show Success Message */
							$scope.showSuccessMessage = function(message) {
								$scope.successMessages = message;
								$timeout(function() {
									$scope.successMessages = null;
									$scope.errorMessages = null;
								}, 3600000);
							};

							/* Show Error Message */
							$scope.showErrorMessage = function(message) {
								$scope.errorMessages = message;
								$timeout(function() {
									$scope.successMessages = null;
									$scope.errorMessages = null;
								}, 3600000);
							};
							
							// Call Service for get ticket details Data
							// Coder: Reazul Date: 11/13/2016
							$scope.comment = null;
							$scope.ticketDetails = null;
							$scope.ticketcomments = null;
							$scope.ticketCreatorName = null;
							$scope.isTicketCreator = null;
							$scope.solution = null;
							$scope.others = false;
							$scope.fetchticketDetails = function(hopID) {
								$scope.showLoading = true;
								ticketDetailsSAWService
										.fetchTIcketDetailsData(hopID)
										.then(
												function(d) {
													$scope.ticketDetails = d.aTickethops;
													$scope.attachmentNames = d.attachmentNames;
													$scope.ticketcomments = d.ticketcomments;
													$scope.solution = d.ticketsummary.solution;
													$scope.iscm = d.aTickethops.issuesolutioncategorymap.issuesolutioncategory.name + "-" +d.aTickethops.issuesolutioncategorymap.issuesolution.name;
													$scope.ticketCreatorName = d.ticketCreatorName;
													$scope.isTicketCreator = d.isTicketCreator;
													$scope.iscmName = $scope.iscm;
													$scope.groupSladate = $scope.ticketDetails.groupSladate;
													$scope.committedFeedbackDate = d.ticketsummary.committedFeedbackDate;
													$scope.fetchAllTicketHistory($scope.ticketDetails.ticketNumber);
													console.log("Data From Service:" + d.ticketsummary.ticketNumber);
													//$scope.section = d.message.trim();
													if($scope.ticketDetails.ticketsummary.issuesolutioncategorymap.issuesolution.name.toLowerCase().includes("other".toLowerCase())){
														$scope.others = true;
													}
													
													$scope.section = "SOC";
													if (d.message == null) {
														//$scope.status = false;
													} else {
														//$scope.status = true;
													}
												},
												function(errResponse) {
													console
															.error('Error while fetching Ticket Details');
												});
							}

							
							$scope.actionType = null;
							
							$scope.submit = function(){ //alert($scope.solution);
								$scope.solution = $('#solnid').val();
								
								//$scope.userGroup.id;
								$scope.actionType;
								
								$scope.showLoading = true;
								if($scope.actionType == "RequestForCloser" || $scope.actionType == "RequestForInformation" || $scope.actionType == "Closed"){
									if($scope.userGroup == null){
										$scope.userGroup = {
											"id" : 0,
											"name" : ""
										};
									}
									$scope.userGroup.id = 0;
									
								}
								
								$scope.actionType;
								
								//$scope.ticketDetails.clearTime = $scope.clearTime;
								
								var responseData = {
										"aTickethops" : $scope.ticketDetails,
										"usergroup" : $scope.userGroup.id,
										"comment" : $scope.comment,
										"clearTime" : $scope.clearTime
									};
									console.log("Calling Forward Complaint REST");
									ticketDetailsSAWService.forwardComplaint(responseData,$scope.actionType, $scope.solution).then(
											function(d){
												$scope.uploadFile();
												$scope.showLoading = false;
												if($scope.actionType == "RequestForCloser" || $scope.actionType == "RequestForInformation"){
													$scope.showSuccessMessage("Successfully Action Performed. Ticket Send to "+ $scope.ticketCreatorName +"You are redirecting to Landing Page.");
												}
												else if($scope.actionType == "Close"){
													$scope.showSuccessMessage("Successfully Action Performed. Ticket is Closed now. You are redirecting to Landing Page.");
												}
												else{
													$scope.showSuccessMessage("Successfully Action Performed. Ticket Send to "+ $scope.userGroup.name +"You are redirecting to Landing Page.");
												}
												setTimeout(function(){
													console.log("Time out occure");
													$window.location.href = "landingpage";
												}, 10000);
												$scope.reset();
											},
											function(errResponse) {
												$scope.showErrorMessage("Failed to Performed Action.");
											}
											
									);
									
									$scope.showLoading = false;
							}
							$scope.willDisable = false;
							$scope.differentMsgShow = false;
							$scope.forClose = false;
							$scope.willRequiredGroup = true;
							$scope.isCommentRequired = true;
							$scope.test = function(){
								if($scope.actionType == "RequestForCloser" || $scope.actionType == "RequestForInformation"){
									$scope.willDisable = true;
									$scope.differentMsgShow = true;
									$scope.userGroup = null;
									$scope.willRequiredGroup = false;
									$scope.isCommentRequired = true;
								}
								else if($scope.actionType == "Closed"){
									$scope.willDisable = true;
									$scope.willRequiredGroup = false;
									$scope.isCommentRequired = false;
								}
								else if($scope.actionType == "Open" || $scope.actionType == "Reopen"){
									$scope.willDisable = false;
									$scope.willRequiredGroup = true;
									$scope.isCommentRequired = true;
								}
								else{
									$scope.willDisable = false;
									$scope.willRequiredGroup = false;
								}
							};
							
							// debo code
							// fetch issue solution category map value
                            $scope.fetchAllIssueSolutionCategoryMap = function() {
                                  issuesolutioncategorymapService
                                              .fetchSOCandAssuranceIssueSolutionCategoryMap()
                                              .then(
                                                          function(d) {
                                                                $scope.IssuesSolutionCategoryMaps = d;
                                                                $scope.iscm = undefined;
                                                                $scope.iscmKeyValueList = []
                                                                $scope.l = {
                                                                      id : null,
                                                                      name : null
                                                                };
                                                                for (var i = 0; i < $scope.IssuesSolutionCategoryMaps.length; i++) {
                                                                      $scope.l.id = $scope.IssuesSolutionCategoryMaps[i].issueSolutionCategoryMapId;
                                                                      $scope.l.name = $scope.IssuesSolutionCategoryMaps[i].issuesolutioncategory.name
                                                                                  + "-"
                                                                                  + $scope.IssuesSolutionCategoryMaps[i].issuesolution.name;
                                                                      $scope.iscmKeyValueList[i] = $scope.l;
                                                                      $scope.l = {
                                                                            id : null,
                                                                            name : null
                                                                      };
                                                                }
                                                          
                                                          },
                                                          function(errResponse) {
                                                                console
                                                                            .error('Error while fetching category and problem');
                                                          });
                            };

							
							//debo back code
							$scope.back = function(){
								$window.location.href = "EditTicketList";
							}

							// debo added code
							$scope.fetchAllEditableTicket = function() {
								ticketDetailsSAWService
										.fetchAllEditableTicket()
										.then(
												function(d) {
													var data = d;													
													$scope.tableParams = new NgTableParams(
															{}, {
																dataset : data
															});
													$scope.loading = false;
												},
												function(errResponse) {
													console
															.error('Error while fetching editable ticket list.');
												});
							};

							// debo added
							$scope.editTicket = function() {
								$scope.targetSlaDate = angular.element(
										"#ticketCreationDate").val();
	
								if(typeof $scope.issuesolutioncategorymap == "undefined"){
									$scope.iscmId = "none";
									$scope.targetSlaDate = "0";
									$scope.committedFeedbackDate = "0";
								}else{
									$scope.iscmId = $scope.issuesolutioncategorymap.id;	
								}
								
								ticketDetailsSAWService
										.editTicket(
												$scope.ticketDetails.ticketHopsId,
												$scope.iscmId, $scope.comment,
												$scope.targetSlaDate, $scope.committedFeedbackDate)
										.then(
												function(d) {
													$scope
													.showSuccessMessage("Ticket successfully has edited.");
													$scope.issuesolutioncategorymap = null;
													$scope.ticketDetails.ticketHopsId = null;
													$scope.iscmId = null;
													$scope.targetSlaDate = null;
													$scope.committedFeedbackDate = null;
												},
												function(errResponse) {
													$scope
															.errorMessages("Failed to edit ticket...");
													$scope
													.showErrorMessage("Ticket successfully faild to edited.");
												}

										);
							}

							// Ticket edit --- debo
							$scope.redirectToTicketEdit = function(ticketHopsId) {
								$window.location.href = "EditTicket?hopId="+ ticketHopsId;
							}
							
							// History GRID Stuff
							$scope.fetchAllTicketHistory = function(ticketNumber) {
								console.log(ticketNumber);
								ticketDetailsSAWService
										.fetchAllTicketHistory(ticketNumber)
										.then(
												function(d) {

													$scope.ticketHistoryData = d;
													// var ticketHistoryData =
													// d;
													// $scope.tableParamsValue =
													// new NgTableParams({}, {
													// dataset:
													// ticketHistoryData});
												},
												function(errResponse) {
													$scope
															.showErrorMessage("Failed to Ticket History Data, Please try again.");
												});
							};
						} ]);
