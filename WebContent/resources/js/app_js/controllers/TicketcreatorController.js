// angular controller area 
'use strict';
App
		.controller(
				'ticketCreationController',
				[
						'$scope',
						'$timeout',
						'ticketCreationService',
						'issuesolutioncategorymapService',
						'UsergrpService',
						'NgTableParams',
						function($scope, $timeout, ticketCreationService,
								issuesolutioncategorymapService,
								UsergrpService, NgTableParams) {

							$scope.uploadFile = function() {
								console.log("Inside the dropbox");
								$scope.processDropzone();	
								$scope.resetDropzone(); 
							};
							
							$scope.clearAll = function(){
								$scope.reset();	
							}
							

							$scope.faultEscalation = function() {
								$scope.faultEventDate = angular.element(
										"#faultEventDate").val();
							};

							$scope.faultEvent = function() {
								$scope.faultEscalationtDate = angular.element(
										"#faultEscalationtDate").val();
							};
							
							$scope.resetGroup = function(){
								$scope.phase2.tickethop.usergroupByNextUserGroupId.userGroupId = null;
							}
							
							$scope.successMessages = false;
							$scope.errorMessages = false;
							$scope.ticketCreation = function() {
								if ($scope.phase2.ticketsummary.issuesolutioncategorymap.id != "undefined") {
									$scope.usergroupName = $scope.phase2.tickethop.usergroupByNextUserGroupId.userGroupId.name;
									$scope.phase2.ticketsummary.issuesolutioncategorymap.issueSolutionCategoryMapId = $scope.phase2.ticketsummary.issuesolutioncategorymap.id;
									$scope.phase2.tickethop.usergroupByNextUserGroupId.name = $scope.usergroupName;
									$scope.phase2.ticketsummary.committedFeedbackDate = new Date(
											angular.element(
													"#committedFeedbackDate")
													.val());
									$scope.phase2.ticketsummary.ticketCreationDate = new Date(
											angular.element(
													"#ticketCreationDate")
													.val());
									$scope.phase2.ticketsummary.faultEventDate = new Date(
											angular.element("#faultEventDate")
													.val());
									$scope.phase2.ticketsummary.faultEscalationtDate = new Date(
											angular.element(
													"#faultEscalationtDate")
													.val());
									
									if ($scope.phase2.ticketsummary.ticketCreationDate != "Invalid Date") {
										$scope.loading = true;
										$scope.phase2.tickethop.usergroupByNextUserGroupId.userGroupId = $scope.phase2.tickethop.usergroupByNextUserGroupId.userGroupId.id;
										$scope.loading = true;
										ticketCreationService
												.ticketCreation($scope.phase2)
												.then(
														function(d) {
															$scope.uploadFile();															
															$scope.reset();															
															$scope.loading = false;
															if (d.message
																	.indexOf('Sorry') >= 0) {
																$scope
																.showErrorMessage(d.message);
																
															}else{
																$scope
																.showSuccessMessage(d.message);
															}															
														},
														function(d) {
															$scope
																	.showErrorMessage(d.message);
														});
									} else {
										$scope
												.showErrorMessage("Please fill E2E and Target SLA to process...");
										$scope.loading = false;
									}
								}
							};

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
													self
															.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};

							// fetch issue solution category map value
							$scope.fetchAllIssueSolutionCategoryMap = function() {
								issuesolutioncategorymapService
										.fetchSOCandAssuranceIssueSolutionCategoryMap()
										.then(
												function(d) {
													$scope.IssuesSolutionCategoryMaps = d;
													$scope.iscm = undefined;
													$scope.iscmKeyValue = []
													$scope.l = {
														id : null,
														name : null
													};
													for (var i = 0; i < $scope.IssuesSolutionCategoryMaps.length; i++) {
														$scope.l.id = $scope.IssuesSolutionCategoryMaps[i].issueSolutionCategoryMapId;
														$scope.l.name = $scope.IssuesSolutionCategoryMaps[i].issuesolutioncategory.name
																+ "-"
																+ $scope.IssuesSolutionCategoryMaps[i].issuesolution.name;
														$scope.iscmKeyValue[i] = $scope.l;
														$scope.l = {
															id : null,
															name : null
														};
													}
													$scope.loading = false;
												},
												function(errResponse) {
													console
															.error('Error while fetching category and problem');
												});
							};

							// fetch severity and ISCM ID mapping field value..
							$scope.fetchISCMSeverityData = function(severity) {								
								if ($scope.section == 'SOC') {
									ticketCreationService
											.fetchISCMSeverityData(
													$scope.phase2.ticketsummary.issuesolutioncategorymap.id,
													severity)
											.then(
													function(d) {
														if (d != "") {
															$scope.phase2.ticketsummary.ticketType = d[0].ticketType
															$scope.phase2.ticketsummary.componentType = d[0].componentType
															$scope.phase2.ticketsummary.problemPlatform = d[0].problemPlatform
															$scope.phase2.ticketsummary.faultImpact = d[0].faultImpact
														} else {
															$scope.phase2.ticketsummary.ticketType = null;
															$scope.phase2.ticketsummary.componentType = null;
															$scope.phase2.ticketsummary.problemPlatform = null;
															$scope.phase2.ticketsummary.faultImpact = null;
															$scope.showAllList = "Yes";
														}
														$scope.phase2.tickethop.usergroupByNextUserGroupId.userGroupId = null;
													},
													function(errResponse) {

														console
																.error('Error...');
													});
								}
							}

							$scope.getE2ESla = function() {
								if (angular.element("#faultEventDate").val() != ""
										&& $scope.phase2.ticketsummary.issuesolutioncategorymap.id != "") {
									ticketCreationService
											.fetchE2ESla(
													angular.element(
															"#faultEventDate")
															.val(),
													$scope.phase2.ticketsummary.issuesolutioncategorymap.id,
													$scope.phase2.ticketsummary.priority,
													$scope.phase2.ticketsummary.componentType)
											.then(
													function(d) {
														$scope.phase2.ticketsummary.committedFeedbackDate = d.message;
													},
													function(errResponse) {
														console
																.error('Error while fetching E2E Sla');
													});
								} else {

								}
							}

							$scope.getGrouopSla = function() {
								if (angular.element("#faultEscalationtDate")
										.val() != ""
										&& $scope.phase2.tickethop.usergroupByNextUserGroupId.userGroupId.id != "") {
									ticketCreationService
											.fetchGroupSla(
													angular
															.element(
																	"#faultEscalationtDate")
															.val(),
													$scope.phase2.ticketsummary.issuesolutioncategorymap.id,
													$scope.phase2.tickethop.usergroupByNextUserGroupId.userGroupId.id,
													$scope.phase2.ticketsummary.priority,
													$scope.phase2.ticketsummary.componentType,
													$scope.phase2.ticketsummary.faultImpact)
											.then(
													function(d) {
														$scope.ticketCreationDate = d.message;
													},
													function(errResponse) {
														console
																.error('Error while fetching group Sla');
													});
								}
							}

							$scope.fetchCurrentUserGroup = function() {
								ticketCreationService
										.fetchCurrentUserGroup()
										.then(
												function(d) {
													if (d.message
															.indexOf('cmpm') >= 0) {
														$scope.section = 'SOC';
														$scope.userGroup = 'cmpm';
													}else if (d.message
															.indexOf('csm') >= 0) {
														$scope.section = 'SOC';
														$scope.userGroup = 'csm';
													}else if (d.message
															.indexOf('rnbm') >= 0) {
														$scope.section = 'SOC';
														$scope.userGroup = 'rnbm';
													}else if (d.message
															.indexOf('SOC') >= 0) {
														$scope.section = 'SOC';
													} else if (d.message
															.indexOf('Assurance') >= 0) {
														$scope.section = 'Assurance';
													} else {
														$scope.section = null;
													}
													/*
													 * $scope.section =
													 * d.message .trim();
													 */
													
													if (d.message == null) {
														$scope.status = false;
														$scope.msg = "Sorry!! you are not authorized to access this page";
													} else {
														$scope.status = true;
													}
												},
												function(errResponse) {
													console
															.error('Error while fetching group Sla');
												});
							}

							$scope
									.$watch(
											"phase2.ticketsummary.issuesolutioncategorymap",
											function ISCMID(newValue, oldValue) {
												if ($scope.phase2.ticketsummary.issuesolutioncategorymap == 'undefined') {
													$scope.others = false;
													$scope.phase2.ticketsummary.otherProblem = null;
												} else {
													if ($scope.phase2.ticketsummary.issuesolutioncategorymap.name
															.toLowerCase()
															.includes(
																	"other"
																			.toLowerCase())) {
														$scope.others = true;
													} else {
														$scope.others = false;
														$scope.phase2.ticketsummary.otherProblem = null;
													}
												}
												$scope.fetchISCMSeverityData();
												$scope.phase2.ticketsummary.priority = null;
											});

							// get sla using user group
							$scope
									.$watch(
											"phase2.tickethop.usergroupByNextUserGroupId.userGroupId",
											function getSla(newValue, oldValue) {
												console
														.log("inside usergroup watch to fetch E2E sla and Group sla....");
												// fetch E2E sla value
												if ($scope.phase2.tickethop.usergroupByNextUserGroupId.userGroupId.id > 0) {												
														if (angular
																.element(
																		"#faultEventDate")
																.val() != ""
																&& $scope.phase2.ticketsummary.issuesolutioncategorymap.id != "") {
															ticketCreationService
																	.fetchE2ESla(
																			angular
																					.element(
																							"#faultEventDate")
																					.val(),
																			$scope.phase2.ticketsummary.issuesolutioncategorymap.id,
																			$scope.phase2.ticketsummary.priority,
																			$scope.phase2.ticketsummary.componentType)
																	.then(
																			function(
																					d) {
																				$scope.phase2.ticketsummary.committedFeedbackDate = d.message;
																			},
																			function(
																					errResponse) {
																				console
																						.error('Error while fetching E2E Sla');
																			});
														}
													

													// fetch group sla value
													if (angular
															.element(
																	"#faultEscalationtDate")
															.val() != ""
															&& $scope.phase2.tickethop.usergroupByNextUserGroupId.userGroupId.id > 0) {
														ticketCreationService
																.fetchGroupSla(
																		angular
																				.element(
																						"#faultEscalationtDate")
																				.val(),
																		$scope.phase2.ticketsummary.issuesolutioncategorymap.id,
																		$scope.phase2.tickethop.usergroupByNextUserGroupId.userGroupId.id,
																		$scope.phase2.ticketsummary.priority,
																		$scope.phase2.ticketsummary.componentType,
																		$scope.phase2.ticketsummary.faultImpact)
																.then(
																		function(
																				d) {
																			$scope.ticketCreationDate = d.message;
																		},
																		function(
																				errResponse) {
																			console
																					.error('Error while fetching group Sla');
																		});
													}
												}
											});

							$scope.fetchAllIssueSolutionCategoryMap();
							$scope.fetchAllUsers();

							$scope.reset = function() {
								$scope.phase2.ticketsummary.issuesolutioncategorymap = null;
								$scope.phase2.tickethop.usergroupByNextUserGroupId.userGroupId = null;
								$scope.phase2.ticketsummary.committedFeedbackDate = null;
								$scope.ticketCreationDate = null;
								$scope.phase2.ticketsummary.problemComponent = null;
								$scope.faultEventDate = null;
								$scope.faultEscalationtDate = null;
								$scope.phase2.ticketsummary.ticketType = null;
								$scope.phase2.ticketsummary.componentType = null;
								$scope.phase2.ticketsummary.problemPlatform = null;
								$scope.phase2.ticketsummary.comment = null;
								$scope.phase2.ticketsummary.specialNote = null;
								$scope.phase2.ticketsummary.preKpi = null
								$scope.phase2.ticketsummary.ticketCloseDate = null;
								$scope.phase2.ticketsummary.priority = null;
								$scope.phase2.ticketsummary.faultImpact = null;
								$scope.phase2.ticketsummary.otherProblem = null;
							}

							/*// file code
							$scope.submitFile = function() {
								var file = $scope.file;
								console.log("File inside controller: " + file);
								console
										.log("File inside controller file.name : "
												+ file.name);
								console
										.log("File inside controller file.size : "
												+ file.size);
								ticketCreationService
										.uploadFile(file)
										.then(
												function(d) {
												},
												function(errResponse) {
													console
															.error('Error while fetching group Sla');
												});
							}*/

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

						} ]);
