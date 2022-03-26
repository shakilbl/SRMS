// angular controller area 
'use strict';
App
		.controller(
				'SocWReprtController',
				[
						'$scope',
						'$timeout',
						'SOCReportService',
						'NgTableParams',
						function($scope, $timeout, SOCReportService,NgTableParams) {
							var self = this;
							
							
							
							$scope.SERVICE_OPERATION = "SERVICE_OPERATION";
							$scope.REGIONAL_OPERATION = "REGIONAL_OPERATION";
							$scope.PLANNING = "PLANNING";
							$scope.DEPLOYMENT = "DEPLOYMENT";

							
							self.fetchYearDropDown  = function() {
                                SOCReportService
                                              .fetchYearDropDown()
                                              .then(
                                                           function(d) {

                                                                  self.AllYear = d;

                                                           },
                                                           function(errResponse) {
                                                                  console
                                                                                .error('Error while fetching Currencies');
                                                           });
							};
							
							
							// Code By Shakil
							// Date : 10-Dec-2016
							
							self.fetchAllWeek = function() {
								SOCReportService
										.fetchAllWeek()
										.then(
												function(d) {

													self.AllWeek = d;
													self.temp = d;

												},
												function(errResponse) {
													console
															.error('Error while fetching Currencies');
												});
							};
							
							
							self.fetchDeptWiseSlaByYearQuarMonth = function() {
								if($scope.month == null)
								{
									$scope.month = {
										'value':null
									};
								}
								SOCReportService
										.fetchDeptWiseSlaByYearQuarMonth(
												$scope.year, $scope.quarter,
												$scope.month.value)
										.then(
												function(d) {

													self.DeptWiseSla = d;
													self.temp = d;
													self.DeptYear = [];
													self.DeptQuater = [];
													for (var i = 0; i < self.DeptWiseSla.length; i++) {
														if ($
																.inArray(
																		self.DeptWiseSla[i][5],
																		self.DeptYear) === -1) {
															self.DeptYear
																	.push(self.DeptWiseSla[i][5]);
														}
														console
																.log(self.DeptYear);

														if ($
																.inArray(
																		self.DeptWiseSla[i][6],
																		self.DeptQuater) === -1) {
															self.DeptQuater
																	.push(self.DeptWiseSla[i][6]);

															console
																	.log(self.DeptWiseSla[i]);
														}
													}

												},
												function(errResponse) {
													console
															.error('Error while fetching Department wise SLA By Year Quarter Month');
												});
							};

							// Code By Shakil
							// Date : 10-Dec-2016
							self.fetchDeptWiseSlaByDateRange = function() {
								
								$scope.fromDate = angular.element("#t").val();
								$scope.toDate=angular.element("#t1").val();
								
								SOCReportService
										.fetchDeptWiseSlaByDateRange(
												$scope.fromDate, $scope.toDate)
										.then(
												function(d) {
													self.DeptWiseSla = d;
												
												
												
													self.temp = d;
													self.DeptYear = [];
													self.DeptQuater = [];
													for (var i = 0; i < self.DeptWiseSla.length; i++) {
														if ($
																.inArray(
																		self.DeptWiseSla[i][5],
																		self.DeptYear) === -1) {
															self.DeptYear
																	.push(self.DeptWiseSla[i][5]);
														}
														console
																.log(self.DeptYear);

														if ($
																.inArray(
																		self.DeptWiseSla[i][6],
																		self.DeptQuater) === -1) {
															self.DeptQuater
																	.push(self.DeptWiseSla[i][6]);

															console
																	.log(self.DeptWiseSla[i]);
														}
													}

												},
												function(errResponse) {
													console
															.error('Error while fetching Department wise SLA');
												});
							};
							
							// Code By Shakil
							// Date : 10-Dec-2016
							self.AllGroupWiseSlaByYrQrMn = function(year, quarter,
									month) {
								
								self.fetchSOGroupWiseSlaByYrQrMn(year, quarter,
										month, $scope.SERVICE_OPERATION);
								
								self.fetchROGroupWiseSlaByYrQrMn(year, quarter,
										month, $scope.REGION_OPERATION);								

								self.fetchPlanningGroupWiseSlaByYrQrMn(year, quarter,
										month, $scope.PLANNING);									
								
								self.fetchDeploymentGroupWiseSlaByYrQrMn(year, quarter,
										month, $scope.DEPLOYMENT);									
								
//								$scope.groupName = $scope.SERVICE_OPERATION;
//								self.fetchGroupWiseSlaByYrQrMn(year, quarter,
//										month, $scope.groupName);
//								$scope.groupName = $scope.REGIONAL_OPERATION;
//								self.fetchGroupWiseSlaByYrQrMn(year, quarter,
//										month, $scope.groupName);
//								$scope.groupName = $scope.PLANNING;
//								self.fetchGroupWiseSlaByYrQrMn(year, quarter,
//										month, $scope.groupName);
//								$scope.groupName = $scope.DEPLOYMENT;
//								self.fetchGroupWiseSlaByYrQrMn(year, quarter,
//										month, $scope.groupName);								
							}
							

							// Code By Shakil
							// Date : 10-Dec-2016
							self.fetchSOGroupWiseSlaByYrQrMn = function() {
								
								if($scope.month == null)
								{
									$scope.month = {
										'value':null
									};
								}
								SOCReportService
										.fetchSOGroupWiseSlaByYrQrMn(
												$scope.year, $scope.quarter,
												$scope.month.value, $scope.SERVICE_OPERATION)
										.then(
												function(d) {
													
													self.GrpSlaServiceOperation = d;
													self.GrpWiseSla = d;													

													self.temp = d;
													self.GroupYear = [];
													self.GroupQuater = [];
													for (var i = 0; i < self.GrpWiseSla.length; i++) {
														if ($
																.inArray(
																		self.GrpWiseSla[i][5],
																		self.GroupYear) === -1) {
															self.GroupYear
																	.push(self.GrpWiseSla[i][5]);
														}

														if ($
																.inArray(
																		self.GrpWiseSla[i][6],
																		self.GroupQuater) === -1) {
															self.GroupQuater
																	.push(self.GrpWiseSla[i][6]);

															console
																	.log(self.GrpWiseSla[i]);
														}
													}

												},
												function(errResponse) {
													console
															.error('Error while fetching Department wise SLA');
												});
							};
							
							// Code By Shakil
							// Date : 10-Dec-2016
							self.fetchROGroupWiseSlaByYrQrMn = function() {
								SOCReportService
										.fetchROGroupWiseSlaByYrQrMn(
												$scope.year, $scope.quarter,
												$scope.month.value, $scope.REGIONAL_OPERATION)
										.then(
												function(d) {
													
													self.GrpSlaRegionalOperation = d;
													self.GrpWiseSla = d;													

													self.temp = d;
													self.GroupYear = [];
													self.GroupQuater = [];
													for (var i = 0; i < self.GrpWiseSla.length; i++) {
														if ($
																.inArray(
																		self.GrpWiseSla[i][5],
																		self.GroupYear) === -1) {
															self.GroupYear
																	.push(self.GrpWiseSla[i][5]);
														}

														if ($
																.inArray(
																		self.GrpWiseSla[i][6],
																		self.GroupQuater) === -1) {
															self.GroupQuater
																	.push(self.GrpWiseSla[i][6]);

															console
																	.log(self.GrpWiseSla[i]);
														}
													}

												},
												function(errResponse) {
													console
															.error('Error while fetching Department wise SLA');
												});
							};

							// Code By Shakil
							// Date : 10-Dec-2016
							self.fetchPlanningGroupWiseSlaByYrQrMn = function() {
								SOCReportService
										.fetchPlanningGroupWiseSlaByYrQrMn(
												$scope.year, $scope.quarter,
												$scope.month.value, $scope.PLANNING)
										.then(
												function(d) {
													
													self.GrpSlaPlanning = d;
													self.GrpWiseSla = d;													

													self.temp = d;
													self.GroupYear = [];
													self.GroupQuater = [];
													for (var i = 0; i < self.GrpWiseSla.length; i++) {
														if ($
																.inArray(
																		self.GrpWiseSla[i][5],
																		self.GroupYear) === -1) {
															self.GroupYear
																	.push(self.GrpWiseSla[i][5]);
														}

														if ($
																.inArray(
																		self.GrpWiseSla[i][6],
																		self.GroupQuater) === -1) {
															self.GroupQuater
																	.push(self.GrpWiseSla[i][6]);

															console
																	.log(self.GrpWiseSla[i]);
														}
													}

												},
												function(errResponse) {
													console
															.error('Error while fetching Department wise SLA');
												});
							};

							// Code By Shakil
							// Date : 10-Dec-2016
							self.fetchDeploymentGroupWiseSlaByYrQrMn = function() {
								SOCReportService
										.fetchDeploymentGroupWiseSlaByYrQrMn(
												$scope.year, $scope.quarter,
												$scope.month.value, $scope.DEPLOYMENT)
										.then(
												function(d) {
													
													self.GrpSlaDeployment = d;
													self.GrpWiseSla = d;													

													self.temp = d;
													self.GroupYear = [];
													self.GroupQuater = [];
													for (var i = 0; i < self.GrpWiseSla.length; i++) {
														if ($
																.inArray(
																		self.GrpWiseSla[i][5],
																		self.GroupYear) === -1) {
															self.GroupYear
																	.push(self.GrpWiseSla[i][5]);
														}

														if ($
																.inArray(
																		self.GrpWiseSla[i][6],
																		self.GroupQuater) === -1) {
															self.GroupQuater
																	.push(self.GrpWiseSla[i][6]);

															console
																	.log(self.GrpWiseSla[i]);
														}
													}

												},
												function(errResponse) {
													console
															.error('Error while fetching Department wise SLA');
												});
							};
							
							
							
							
							// Code By Shakil
							// Date : 10-Dec-2016
							self.fetchGroupWiseSlaByYrQrMn = function() {
								SOCReportService
										.fetchGroupWiseSlaByYrQrMn(
												$scope.year, $scope.quarter,
												$scope.month.value, $scope.groupName)
										.then(
												function(d) {

													if($scope.groupName == "SERVICE_OPERATION")
													{
														self.GrpSlaServiceOperation = d;
														self.GrpWiseSla = d;
													}
													else if($scope.groupName == "REGIONAL_OPERATION")
													{
														self.GrpSlaRegionalOperation = d;
														self.GrpWiseSla = d;
													}
													else if($scope.groupName == "PLANNING")
													{
														self.GrpSlaPlanning = d;
														self.GrpWiseSla = d;
													}
													else if($scope.groupName == "DEPLOYMENT")
													{
														self.GrpSlaDeployment = d;
														self.GrpWiseSla = d;
													}

													self.temp = d;
													self.GroupYear = [];
													self.GroupQuater = [];
													for (var i = 0; i < self.GrpWiseSla.length; i++) {
														if ($
																.inArray(
																		self.GrpWiseSla[i][5],
																		self.GroupYear) === -1) {
															self.GroupYear
																	.push(self.GrpWiseSla[i][5]);
														}

														if ($
																.inArray(
																		self.GrpWiseSla[i][6],
																		self.GroupQuater) === -1) {
															self.GroupQuater
																	.push(self.GrpWiseSla[i][6]);

															console
																	.log(self.GrpWiseSla[i]);
														}
													}

												},
												function(errResponse) {
													console
															.error('Error while fetching Department wise SLA');
												});
							};
							
							// Code By Shakil
							// Date : 10-Dec-2016
						
							self.AllGroupWiseSlaByDate = function(fromDate, toDate) {
								$scope.fromDate = angular.element("#t").val();
								$scope.toDate=angular.element("#t1").val();
								self.fetchSOGroupWiseSlaByDate($scope.fromDate, $scope.toDate, $scope.SERVICE_OPERATION);
								self.fetchROGroupWiseSlaByDate($scope.fromDate,$scope.toDate, $scope.REGIONAL_OPERATION);
								self.fetchPlanningGroupWiseSlaByDate($scope.fromDate, $scope.toDate, $scope.PLANNING);
								self.fetchDeploymentGroupWiseSlaByDate($scope.fromDate, $scope.toDate, $scope.DEPLOYMENT);
								
//								self.fetchGroupWiseSlaByDate(fromDate, toDate, 'SERVICE_OPERATION');
//								self.fetchGroupWiseSlaByDate(fromDate, toDate, 'REGIONAL_OPERATION');
//								self.fetchGroupWiseSlaByDate(fromDate, toDate, 'PLANNING');
//								self.fetchGroupWiseSlaByDate(fromDate, toDate, 'DEPLOYMENT');
							}

							// Code By Shakil
							// Date : 10-Dec-2016
							self.fetchSOGroupWiseSlaByDate = function() {
								$scope.fromDate = angular.element("#t").val();
								$scope.toDate=angular.element("#t1").val();
								SOCReportService
										.fetchSOGroupWiseSlaByDate(
												$scope.fromDate, $scope.toDate,
												$scope.SERVICE_OPERATION)
										.then(
												function(d) {
													
													self.GrpSlaServiceOperation = d;
													self.GrpWiseSla = d;													

													self.temp = d;
													self.GroupYear = [];
													self.GroupQuater = [];
													for (var i = 0; i < self.GrpWiseSla.length; i++) {
														if ($
																.inArray(
																		self.GrpWiseSla[i][5],
																		self.GroupYear) === -1) {
															self.GroupYear
																	.push(self.GrpWiseSla[i][5]);
														}

														if ($
																.inArray(
																		self.GrpWiseSla[i][6],
																		self.GroupQuater) === -1) {
															self.GroupQuater
																	.push(self.GrpWiseSla[i][6]);

															console
																	.log(self.GrpWiseSla[i]);
														}
													}

												},
												function(errResponse) {
													console
															.error('Error while fetching Group wise SLA');
												});
							};


							// Code By Shakil
							// Date : 10-Dec-2016
							self.fetchROGroupWiseSlaByDate = function() {


								$scope.fromDate = angular.element("#t").val();
								$scope.toDate=angular.element("#t1").val();
								SOCReportService
										.fetchROGroupWiseSlaByDate(
												$scope.fromDate, $scope.toDate,
												$scope.REGIONAL_OPERATION)
										.then(
												function(d) {
													
													self.GrpSlaRegionalOperation = d;
													self.GrpWiseSla = d;													

													self.temp = d;
													self.GroupYear = [];
													self.GroupQuater = [];
													for (var i = 0; i < self.GrpWiseSla.length; i++) {
														if ($
																.inArray(
																		self.GrpWiseSla[i][5],
																		self.GroupYear) === -1) {
															self.GroupYear
																	.push(self.GrpWiseSla[i][5]);
														}

														if ($
																.inArray(
																		self.GrpWiseSla[i][6],
																		self.GroupQuater) === -1) {
															self.GroupQuater
																	.push(self.GrpWiseSla[i][6]);

															console
																	.log(self.GrpWiseSla[i]);
														}
													}

												},
												function(errResponse) {
													console
															.error('Error while fetching Group wise SLA');
												});
							};
							
							// Code By Shakil
							// Date : 10-Dec-2016
							self.fetchPlanningGroupWiseSlaByDate = function() {

								$scope.fromDate = angular.element("#t").val();
								$scope.toDate=angular.element("#t1").val();
								SOCReportService
										.fetchPlanningGroupWiseSlaByDate(
												$scope.fromDate, $scope.toDate,
												$scope.PLANNING)
										.then(
												function(d) {
													
													self.GrpSlaPlanning = d;
													self.GrpWiseSla = d;													

													self.temp = d;
													self.GroupYear = [];
													self.GroupQuater = [];
													for (var i = 0; i < self.GrpWiseSla.length; i++) {
														if ($
																.inArray(
																		self.GrpWiseSla[i][5],
																		self.GroupYear) === -1) {
															self.GroupYear
																	.push(self.GrpWiseSla[i][5]);
														}

														if ($
																.inArray(
																		self.GrpWiseSla[i][6],
																		self.GroupQuater) === -1) {
															self.GroupQuater
																	.push(self.GrpWiseSla[i][6]);

															console
																	.log(self.GrpWiseSla[i]);
														}
													}

												},
												function(errResponse) {
													console
															.error('Error while fetching Group wise SLA');
												});
							};
							
							// Code By Shakil
							// Date : 10-Dec-2016
							self.fetchDeploymentGroupWiseSlaByDate = function() {
								$scope.fromDate = angular.element("#t").val();
								$scope.toDate=angular.element("#t1").val();
								SOCReportService
										.fetchDeploymentGroupWiseSlaByDate(
												$scope.fromDate, $scope.toDate,
												$scope.DEPLOYMENT)
										.then(
												function(d) {
													
													self.GrpSlaDeployment = d;
													self.GrpWiseSla = d;													

													self.temp = d;
													self.GroupYear = [];
													self.GroupQuater = [];
													for (var i = 0; i < self.GrpWiseSla.length; i++) {
														if ($
																.inArray(
																		self.GrpWiseSla[i][5],
																		self.GroupYear) === -1) {
															self.GroupYear
																	.push(self.GrpWiseSla[i][5]);
														}

														if ($
																.inArray(
																		self.GrpWiseSla[i][6],
																		self.GroupQuater) === -1) {
															self.GroupQuater
																	.push(self.GrpWiseSla[i][6]);

															console
																	.log(self.GrpWiseSla[i]);
														}
													}

												},
												function(errResponse) {
													console
															.error('Error while fetching Group wise SLA');
												});
							};
							
							
							
							
							// Code By Shakil
							// Date : 10-Dec-2016
							self.fetchGroupWiseSlaByDate = function() {
								SOCReportService
										.fetchGroupWiseSlaByDate(
												$scope.year, $scope.quarter,
												$scope.month.value, $groupName)
										.then(
												function(d) {

													if($groupName == 'SERVICE_OPERATION')
													{
														self.GrpSlaServiceOperation = d;
														self.GrpWiseSla = d;
													}
													else if($groupName == 'REGIONAL_OPERATION')
													{
														self.GrpSlaRegionalOperation = d;
														self.GrpWiseSla = d;
													}
													else if($groupName == 'PLANNING')
													{
														self.GrpSlaPlanning = d;
														self.GrpWiseSla = d;
													}
													else if($groupName == 'DEPLOYMENT')
													{
														self.GrpSlaDeployment = d;
														self.GrpWiseSla = d;
													}

													self.temp = d;
													self.GroupYear = [];
													self.GroupQuater = [];
													for (var i = 0; i < self.GrpWiseSla.length; i++) {
														if ($
																.inArray(
																		self.GrpWiseSla[i][5],
																		self.GroupYear) === -1) {
															self.GroupYear
																	.push(self.GrpWiseSla[i][5]);
														}

														if ($
																.inArray(
																		self.GrpWiseSla[i][6],
																		self.GroupQuater) === -1) {
															self.GroupQuater
																	.push(self.GrpWiseSla[i][6]);

															console
																	.log(self.GrpWiseSla[i]);
														}
													}

												},
												function(errResponse) {
													console
															.error('Error while fetching Group wise SLA');
												});
							};
							
							
							
							
							
							
							
							
							// Code By Shakil
							// Date : 10-Dec-2016
							
							self.AllGroupWiseSlaByWeek = function() {
								
								self.fetchGroupSOWiseSlaByWeek();
								self.fetchGroupROWiseSlaByWeek();
								self.fetchGroupPlanningWiseSlaByWeek();
								self.fetchGroupDeploymentWiseSlaByWeek();
								
							}
							
							// Code By Shakil
							// Date : 10-Dec-2016
							self.fetchGroupDeploymentWiseSlaByWeek = function() {
								SOCReportService
										.fetchGroupDeploymentWiseSlaByWeek($scope.DEPLOYMENT, $scope.year, $scope.week)
										.then(
												function(d) {

													self.GroupDeploymentSlaByWeek = d;
													self.temp = d;
													self.DeptYear = [];
													self.DeptQuater = [];
													
													self.tableParams = new NgTableParams(
															{page: 1,
															 count: 200000000000
															}, 
															{
																dataset : d
															});													
												},
												function(errResponse) {
													console
															.error('Error while fetching Group wise SLA By Week');
												});
							};								
							
							// Code By Shakil
							// Date : 10-Dec-2016
							self.fetchGroupPlanningWiseSlaByWeek = function() {
								SOCReportService
										.fetchGroupPlanningWiseSlaByWeek($scope.PLANNING, $scope.year, $scope.week)
										.then(
												function(d) {

													self.GroupPlanningSlaByWeek = d;
													self.temp = d;
													self.DeptYear = [];
													self.DeptQuater = [];
												},
												function(errResponse) {
													console
															.error('Error while fetching Group wise SLA By Week');
												});
							};									
							
							// Code By Shakil
							// Date : 10-Dec-2016
							self.fetchGroupROWiseSlaByWeek = function() {
								SOCReportService
										.fetchGroupROWiseSlaByWeek($scope.REGIONAL_OPERATION, $scope.year, $scope.week)
										.then(
												function(d) {

													self.GroupROSlaByWeek = d;
													self.temp = d;
													self.DeptYear = [];
													self.DeptQuater = [];
												},
												function(errResponse) {
													console
															.error('Error while fetching Group wise SLA By Week');
												});
							};							

							// Code By Shakil
							// Date : 10-Dec-2016
							self.fetchGroupSOWiseSlaByWeek = function() {
								SOCReportService
										.fetchGroupSOWiseSlaByWeek($scope.SERVICE_OPERATION, $scope.year, $scope.week)
										.then(
												function(d) {

													self.GroupSOSlaByWeek = d;
													self.temp = d;
													self.DeptYear = [];
													self.DeptQuater = [];
												},
												function(errResponse) {
													console
															.error('Error while fetching Group wise SLA By Week');
												});
							};
							self.fetchAllTATFreq = function() {

								

											

								SOCReportService
								.fetchAllTATTcktNo()
								
								.then(
										function(d) {

											self.TATTcktNo = d;

										},
										function(errResponse) {
											console
													.error('Error while fetching Currencies');
										});
							SOCReportService
								.fetchAllTATFreq()
								.then(
										function(d) {

											self.TATFreq = d;
											var data = d;
											self.tableParams = new NgTableParams(
													{page: 1,
													 count: 200000000000
													}, 
													{
														dataset : data
													});

										},
										function(errResponse) {
											console
													.error('Error while fetching Currencies');
										});
							};
							/*self.fetchAllTATFreq = function() {
								SOCReportService
										.fetchAllTATFreq()
										.then(
												function(d) {

													self.TATFreq = d;
													var data = d;
													self.tableParams = new NgTableParams(
															{page: 1,
															 count: 200000000000
															}, 
															{
																dataset : data
															});

												},
												function(errResponse) {
													console
															.error('Error while fetching Currencies');
												});
							};							*/
							
							
							
							self.fetchGroupWiseSlaYearly = function() {
								SOCReportService
										.fetchGroupWiseSlaYearly()
										.then(
												function(d) {
													self.GroupWiseSlaYearly = d;
													self.ProRepS = d;
													self.Year = [];
													self.Quater = [];

													for (var i = 0; i < self.GroupWiseSlaYearly.length; i++) {
														if ($
																.inArray(
																		self.GroupWiseSlaYearly[i][5],
																		self.Year) === -1) {
															self.Year
																	.push(self.GroupWiseSlaYearly[i][5]);

															// console.log(self.Year);
														}
														if ($
																.inArray(
																		self.GroupWiseSlaYearly[i][6],
																		self.Quater) === -1) {
															self.Quater
																	.push(self.GroupWiseSlaYearly[i][6]);

															console
																	.log(
																			"From One",
																			self.GroupWiseSlaYearly);
														}
													}
												},
												function(errResponse) {
													console
															.error('Error while fetching Group wise SLA');
												});
							};

							self.GroupWiseSlaYearly = [];
							self.fetchGroupWiseSlaYearly();

							self.fetchAllGroupWiseSlaYearlyOne = function() {
								SOCReportService
										.fetchAllGroupWiseSlaYearlyOne()
										.then(
												function(d) {
													self.GroupWiseSlaYearlyOne = d;
													self.ProRepS = d;
													self.Year = [];
													self.Quater = [];

													for (var i = 0; i < self.GroupWiseSlaYearlyOne.length; i++) {
														if ($
																.inArray(
																		self.GroupWiseSlaYearlyOne[i][5],
																		self.Year) === -1) {
															self.Year
																	.push(self.GroupWiseSlaYearlyOne[i][5]);

															// console.log(self.Year);
														}
														if ($
																.inArray(
																		self.GroupWiseSlaYearlyOne[i][6],
																		self.Quater) === -1) {
															self.Quater
																	.push(self.GroupWiseSlaYearlyOne[i][6]);

															console
																	.log(
																			"From One",
																			self.GroupWiseSlaYearlyOne);
														}
													}
												},
												function(errResponse) {
													console
															.error('Error while fetching Currencies');
												});
							};

							self.GroupWiseSlaYearlyOne = [

							];


							self.fetchAllGroupWiseSlaYearlyTwo = function() {
								SOCReportService
										.fetchAllGroupWiseSlaYearlyTwo()
										.then(
												function(d) {
													self.GroupWiseSlaYearlyTwo = d;
													self.ProRepS = d;
													self.Year = [];
													self.Quater = [];

													for (var i = 0; i < self.GroupWiseSlaYearlyTwo.length; i++) {
														if ($
																.inArray(
																		self.GroupWiseSlaYearlyTwo[i][5],
																		self.Year) === -1) {
															self.Year
																	.push(self.GroupWiseSlaYearlyTwo[i][5]);

															// console.log(self.Year);
														}
														if ($
																.inArray(
																		self.GroupWiseSlaYearlyTwo[i][6],
																		self.Quater) === -1) {
															self.Quater
																	.push(self.GroupWiseSlaYearlyTwo[i][6]);

															console
																	.log(
																			"From One",
																			self.GroupWiseSlaYearlyTwo);
														}
													}
												},
												function(errResponse) {
													console
															.error('Error while fetching Currencies');
												});
							};

							self.GroupWiseSlaYearlyTwo = [

							];

							//self.fetchAllGroupWiseSlaYearlyTwo();

							self.fetchAllGroupWiseSlaYearlyThree = function() {
								SOCReportService
										.fetchAllGroupWiseSlaYearlyThree()
										.then(
												function(d) {
													self.GroupWiseSlaYearlyThree = d;
													self.ProRepS = d;
													self.Year = [];
													self.Quater = [];

													for (var i = 0; i < self.GroupWiseSlaYearlyThree.length; i++) {
														if ($
																.inArray(
																		self.GroupWiseSlaYearlyThree[i][5],
																		self.Year) === -1) {
															self.Year
																	.push(self.GroupWiseSlaYearlyThree[i][5]);

															// console.log(self.Year);
														}
														if ($
																.inArray(
																		self.GroupWiseSlaYearlyThree[i][6],
																		self.Quater) === -1) {
															self.Quater
																	.push(self.GroupWiseSlaYearlyThree[i][6]);

															// console.log(self.Quater);
														}
													}
												},
												function(errResponse) {
													console
															.error('Error while fetching Currencies');
												});
							};

							self.GroupWiseSlaYearlyThree = [

							];

							//self.fetchAllGroupWiseSlaYearlyThree();

							$scope.exportData = function() {
								var blob = new Blob(
										[ document.getElementById('exportable').innerHTML ],
										{
											type : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
										});
								saveAs(blob, "SOC.xls");
							};

							self.maxdate = function(x) {
								var input = document.getElementById(x);
								var today = new Date();
								var day = today.getDate() - 1;
								// Set month to string to add leading 0
								var mon = new String(today.getMonth() + 1); // January
								// is
								// 0!
								var yr = today.getFullYear();

								if (mon.length < 2) {
									mon = "0" + mon;
								}

								var date = new String(yr + '-' + mon + '-'
										+ day);

								input.disabled = false;
								input.setAttribute('max', date);

							}
							self.prodFilter1 = function(x, y) {
								self.GroupWiseSlaYearly = self.ProRepS;
								x = $.datepicker.formatDate("dd-MM-yy",
										new Date(new Date(x)));
								y = $.datepicker.formatDate("dd-MM-yy",
										new Date(new Date(y)));
								self.proRep = [];

								for (var i = 0; i < self.GroupWiseSlaYearly.length; i++) {
									var p = $.datepicker
											.formatDate(
													"dd-MM-yy",
													new Date(
															new Date(
																	self.GroupWiseSlaYearly[i][4])));
									// var p = $filter('date')((),
									// "dd/MM/yyyy");
									if (p >= x && p <= y)
										self.proRep
												.push(self.GroupWiseSlaYearly[i]);
								}
								self.GroupWiseSlaYearly = self.proRep;
							}

							$scope.exportPdf = function() {
								html2canvas(document.getElementById('expor'), {
									background : '#fff',
									onrendered : function(canvas) {
										var data = canvas
												.toDataURL('image/jpeg');
										var doc = new jsPDF('landscape');
										doc.fillStyle = "#FFFFFF";
										doc.addImage(data, 'JPEG', 10, 20, 280,
												150);
										doc.output('save', 'CircleReport.pdf');
									}
								});
							}
							// self.fetchGroupWiseSlaYearly();
							$scope.exportImg = function() {

								d3.selectAll("svg text").style({
									'font-size' : '12px'
								});
								d3.selectAll(".c3-axis path").style({
									'fill' : 'none',
									'stroke' : '#000'
								});
								d3.selectAll(".c3-chart-arc path").style({
									'stroke' : '#FFFFFF'
								});
								d3.selectAll(".c3-chart-arc text").style({
									'fill' : '#FFFFFF'
								});

								html2canvas(document.getElementById('expor'), {
									onrendered : function(canvas) {
										var a = document.createElement("a");
										a.download = "CircleReport.png";
										a.href = canvas.toDataURL("image/png");
										a.click();
									}
								});
							};
							
							self.fetchE2ESla = function() {

								$scope.fromDate = angular.element("#t").val();
								$scope.toDate = angular.element("#t1").val();

								SOCReportService
										.fetchAllE2EFreq(
												$scope.fromDate, $scope.toDate)
										.then(
												function(d) {

													var data = d;
													$scope.header = {
															"123" : "Test 1",
															"456" : "Test 2"
													};
													self.tableParams = new NgTableParams(
															{page: 1,
															 count: 200000000000
															}, 
															{
																dataset : data
															});
													
												},
												function(errResponse) {
													console
															.error('Error while fetching Department wise SLA');
												});
								SOCReportService
                                .fetchE2ESla(
                                            $scope.fromDate, $scope.toDate)
                                .then(
                                            function(d) {
                                                  self.E2ESla = d;

                                                  self.temp = d;
                                                  
                                            },
                                            function(errResponse) {
                                                  console
                                                              .error('Error while fetching Department wise SLA');
                                            });

							};

						} ]);
