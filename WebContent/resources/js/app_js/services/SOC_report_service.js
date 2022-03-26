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
								
                                fetchYearDropDown : function() {
                                    return $http
                                                 .get(url + 'YearDropdown/')
                                                 .then(
                                                               function(response) {
                                                                      return response.data;
                                                               },
                                                               function(errResponse) {
                                                                      console
                                                                                    .error('Error while fetching Year DropDOwn list');
                                                                      return $q
                                                                                    .reject(errResponse);
                                                               });
                                },     
								

								//Report For SOc Group Wise SLa	
								fetchAllWeek : function() {
									return $http
											.get(url + 'WeekDropdown/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching GroupWiseSla list');
														return $q
																.reject(errResponse);
													});
								},
								//Group WIse SLa Service Operation

								fetchAllGroupWiseSlaOne : function() {
									return $http
											.get(url + 'GroupWiseSlaOne/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching GroupWiseSla list');
														return $q
																.reject(errResponse);
													});
								},

								//Group WIse SLa Regional Operation

								fetchAllGroupWiseSlaTwo : function() {
									return $http
											.get(url + 'GroupWiseSlaTwo/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching GroupWiseSla list');
														return $q
																.reject(errResponse);
													});
								},
								//Group WIse SLa Regional Operation

								fetchAllGroupWiseSlaThree : function() {
									return $http
											.get(url + 'GroupWiseSlaThree/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching GroupWiseSlaThree list');
														return $q
																.reject(errResponse);
													});
								},
								// Code By Lubna
								fetchAllDeptWiseSla : function() {
									return $http
											.get(url + 'DeptWiseSla/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching DeptWiseSla list');
														return $q
																.reject(errResponse);
													});
								},
								
								// Code By Shakil
								// Date : 10-Dec-2016
								fetchDeptWiseSlaByYearQuarMonth : function(year,
										quarter, month) {
									return $http
											.get(
													url
															+ 'DeptWiseSlaByYearQuarMonth/'
															+ year + '/'
															+ quarter + '/'
															+ month)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching DeptWiseSla list');
														return $q
																.reject(errResponse);
													});
								},								

								// Code By Shakil
								// Date : 10-Dec-2016
								fetchDeptWiseSlaByDateRange : function(fromDate,
										toDate) {
									return $http
											.get(
													url
															+ 'DeptWiseSlaByDateRange/'
															+ fromDate + '/'
															+ toDate)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching DeptWiseSla list');
														return $q
																.reject(errResponse);
													});
								},								
								
								// Code By Shakil
								// Date : 10-Dec-2016
								fetchPlanningGroupWiseSlaByYrQrMn : function(year,
										quarter, month, groupName) {
									return $http
											.get(
													url
															+ 'GroupWiseSlaByYrQrMn/'
															+ year + '/'
															+ quarter + '/'
															+ month + '/'
															+ groupName)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching GroupWiseSla By Year Qr month list');
														return $q
																.reject(errResponse);
													});
								},									
								
								
								// Code By Shakil
								// Date : 10-Dec-2016
								fetchDeploymentGroupWiseSlaByYrQrMn : function(year,
										quarter, month, groupName) {
									return $http
											.get(
													url
															+ 'GroupWiseSlaByYrQrMn/'
															+ year + '/'
															+ quarter + '/'
															+ month + '/'
															+ groupName)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching GroupWiseSla By Year Qr month list');
														return $q
																.reject(errResponse);
													});
								},									
								

								// Code By Shakil
								// Date : 10-Dec-2016
								fetchROGroupWiseSlaByYrQrMn : function(year,
										quarter, month, groupName) {
									return $http
											.get(
													url
															+ 'GroupWiseSlaByYrQrMn/'
															+ year + '/'
															+ quarter + '/'
															+ month + '/'
															+ groupName)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching GroupWiseSla By Year Qr month list');
														return $q
																.reject(errResponse);
													});
								},									

								
								// Code By Shakil
								// Date : 10-Dec-2016
								fetchSOGroupWiseSlaByYrQrMn : function(year,
										quarter, month, groupName) {
									return $http
											.get(
													url
															+ 'GroupWiseSlaByYrQrMn/'
															+ year + '/'
															+ quarter + '/'
															+ month + '/'
															+ groupName)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching GroupWiseSla By Year Qr month list');
														return $q
																.reject(errResponse);
													});
								},									
								
								// Code By Shakil
								// Date : 10-Dec-2016
								fetchGroupWiseSlaByYrQrMn : function(year,
										quarter, month, groupName) {
									return $http
											.get(
													url
															+ 'GroupWiseSlaByYrQrMn/'
															+ year + '/'
															+ quarter + '/'
															+ month + '/'
															+ groupName)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching GroupWiseSla By Year Qr month list');
														return $q
																.reject(errResponse);
													});
								},								

								// Code By Shakil
								// Date : 10-Dec-2016
								fetchSOGroupWiseSlaByDate : function(fromDate,
										toDate, departmentName) {
									return $http
											.get(
													url
															+ 'SectionWiseSlaByWeek/'
															+ fromDate + '/'
															+ toDate + '/'
															+ departmentName)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching GroupWiseSla By Date list');
														return $q
																.reject(errResponse);
													});
								},									
								
								// Code By Shakil
								// Date : 10-Dec-2016
								fetchROGroupWiseSlaByDate : function(fromDate,
										toDate, departmentName) {
									return $http
											.get(
													url
															+ 'SectionWiseSlaByWeek/'
															+ fromDate + '/'
															+ toDate + '/'
															+ departmentName)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching GroupWiseSla By Date list');
														return $q
																.reject(errResponse);
													});
								},									
								
								// Code By Shakil
								// Date : 10-Dec-2016
								fetchPlanningGroupWiseSlaByDate : function(fromDate,
										toDate, departmentName) {
									return $http
											.get(
													url
															+ 'SectionWiseSlaByWeek/'
															+ fromDate + '/'
															+ toDate + '/'
															+ departmentName)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching GroupWiseSla By Date list');
														return $q
																.reject(errResponse);
													});
								},									
								
								// Code By Shakil
								// Date : 10-Dec-2016
								fetchDeploymentGroupWiseSlaByDate : function(fromDate,
										toDate, departmentName) {
									return $http
											.get(
													url
															+ 'SectionWiseSlaByWeek/'
															+ fromDate + '/'
															+ toDate + '/'
															+ departmentName)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching GroupWiseSla By Date list');
														return $q
																.reject(errResponse);
													});
								},								
								
								// Code By Shakil
								// Date : 10-Dec-2016
								GroupWiseSlaByDate : function(fromDate,
										toDate, departmentName) {
									return $http
											.get(
													url
															+ 'SectionWiseSlaByWeek/'
															+ fromDate + '/'
															+ toDate + '/'
															+ departmentName)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching GroupWiseSla By Date list');
														return $q
																.reject(errResponse);
													});
								},		
								

								fetchGroupSOWiseSlaByWeek : function(departmentName, year, week) {
									return $http
											.get(
													url + 'SectionWiseSlaByWeek/'
															+ departmentName + '/' + year + '/' + week)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching GroupSOWiseSlaByWeek list');
														return $q
																.reject(errResponse);
													});
								},		
								
								fetchGroupROWiseSlaByWeek : function(departmentName, year, week) {
									return $http
											.get(url + 'SectionWiseSlaByWeek/'
													+ departmentName + '/' + year + '/' + week)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching GroupROWiseSlaByWeek list');
														return $q
																.reject(errResponse);
													});
								},										
								
								fetchGroupPlanningWiseSlaByWeek : function(departmentName, year, week) {
									return $http
											.get(url + 'SectionWiseSlaByWeek/' + departmentName + '/' + year + '/' + week)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching GroupPlanningWiseSlaByWeek list');
														return $q
																.reject(errResponse);
													});
								},	
								
								fetchGroupDeploymentWiseSlaByWeek : function(departmentName, year, week) {
									return $http
											.get(url + 'SectionWiseSlaByWeek/' + departmentName + '/' + year + '/' + week)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching GroupDeployemntWiseSlaYearlyThree list');
														return $q
																.reject(errResponse);
													});
								},								
								
						

								
						/*		
								fetchAllE2ESla : function() {
									return $http
											.get(
													url + 'E2ESla/' )*/

								fetchE2ESla : function(fromDate, toDate) {
									return $http
											.get(
													url + 'E2ESla/' + fromDate
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

								fetchAllE2EFreq : function() {
									return $http
											.get(url + 'E2EFreq/' + fromDate
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
								
								fetchAllE2EFreq : function() {
									return $http
											.get(url + 'TAT/')
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
								
								fetchAllTATFreq : function() {
									return $http
											.get(url + 'TAT/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching TATFreq list');
														return $q
																.reject(errResponse);
													});
								},
								fetchGroupWiseSlaYearly : function() {
									return $http
											.get(url + 'GroupWiseSlaYearly/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching GroupWiseSlaYearly list');
														return $q
																.reject(errResponse);
													});
								},
				
								fetchAllTATTcktNo : function() {
									return $http
											.get(url + 'TATTcktNo/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching TATTcktNo list');
														return $q
																.reject(errResponse);
													});
								},
							//Group WIse SLa Service Operation

								fetchAllGroupWiseSlaYearlyOne : function() {
									return $http
											.get(url + 'GroupWiseSlaYearlyOne/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching GroupWiseSlaYearlyOne list');
														return $q
																.reject(errResponse);
													});
								},

								//Group WIse SLa Regional Operation

								fetchAllGroupWiseSlaYearlyTwo : function() {
									return $http
											.get(url + 'GroupWiseSlaYearlyTwo/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching GroupWiseSlaYearlyTwo list');
														return $q
																.reject(errResponse);
													});
								},
								//Group WIse SLa Regional Operation

								fetchAllGroupWiseSlaYearlyThree : function() {
									return $http
											.get(url + 'GroupWiseSlaYearlyThree/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error while fetching GroupWiseSlaYearlyThree list');
														return $q
																.reject(errResponse);
													});
								}
								
							};

						} ]);
