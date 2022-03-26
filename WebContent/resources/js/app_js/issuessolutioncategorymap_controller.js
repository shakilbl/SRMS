// angular controller area 
'use strict';
App
		.controller(
				'issuesolutioncategorymapController',
				[
						'$scope',
						'$timeout',
						'issuesolutioncategorymapService',
						'BusinessproService',
						'NgTableParams',
						function($scope, $timeout,
								issuesolutioncategorymapService,
								BusinessproService, NgTableParams) {
							var self = this;
							self.IssuesSolutionCategoryMap = {

								"issueSolutionCategoryMapId" : null,
								"issuesolution" : {
									"issueSolutionId" : null,
									"name" : "",
								},
								"issuesolutioncategory" : {
									"issueSolutionCategoryId" : null,
									"name" : "",
								},
								"businessprocess" : {
									"businessProcessId" : null,
									"name" : ""
								},
								"type" : "",
								"active" : "Yes",
								"createdby" : "",
								"createddate" : null,
								"updatedby" : "",
								"updateddate" : null
							};
							self.issuesolution = {
								"issueSolutionId" : null,
								"name" : "",

							};
							self.IssuesSolutionCategory = {
								"issueSolutionCategoryId" : null,
								"name" : "",
								"active" : "",
								"createdby" : "",
								"createddate" : null,
								"updatedby" : "",
								"updateddate" : null
							};

							self.businessprocess = {
								"businessProcessId" : null,
								"name" : ""
							},

							self.IssuesSolutionCategoryMaps = [];
							self.issuesolutions = [];
							self.IssuesSolutionCategorys = [];
							self.businesspros = [];
							self.alert = {
								type : '',
								msg : ''
							};
							self.item = {
								"issueSolutionId" : null,
								"Name" : null
							};
							self.item1 = {
								"issuesolutioncategory" : null,
								"Name" : null
							};
							self.item22 = {
								"businessProcessId" : null,
								"Name" : null
							};
							self.fetchAllIssueSolutionCategoryMap = function() {
								issuesolutioncategorymapService
										.fetchAllIssueSolutionCategoryMap()
										.then(
												function(d) {
													self.IssuesSolutionCategoryMaps = d;
													var data = d;
													self.tableParams = new NgTableParams(
															{}, {
																dataset : data
															});
												},
												function(errResponse) {
													console
															.error('Error while fetching Currencies');
												});
							};
							self.fetchAllIssueSolution = function() {
								issuesolutioncategorymapService
										.fetchAllIssueSolution()
										.then(
												function(ddd) {
													self.issuesolutions = ddd;
													var data = ddd;
													/*self.tableParams = new NgTableParams(
															{}, {
																dataset : data
															});*/
													//self.X = ddd;

													/*self.issuesolutions = [];

													for(var i = 0; i< self.X.length; i++){
														if(self.X[i].active=="Yes")
															self.issuesolutions.push(self.X[i]);
													}*/
												},
												function(errResponse) {
													console
															.error('Error while fetching Currencies');
												});
							};

							self.fetchAllIssueSolutionCategory = function() {
								issuesolutioncategorymapService
										.fetchAllIssueSolutionCategory()
										.then(
												function(dd) {
													self.IssuesSolutionCategorys = dd;

													var data = dd;
													/*self.tableParams = new NgTableParams(
															{}, {
																dataset : data
															});*/

													/*	self.X = dd;
														self.IssuesSolutionCategorys = [];

														for (var i = 0; i < self.X.length; i++) {
															if (self.X[i].active == "Yes")
																self.IssuesSolutionCategorys
																		.push(self.X[i]);
														}*/
												},
												function(errResponse) {
													console
															.error('Error while fetching Currencies');
												});
							};
							self.fetchAllBusinessPro = function() {
								BusinessproService
										.fetchAllBusinessPro()
										.then(
												function(f) {
													self.businesspros = f;
													var data = f;
													/*self.tableParams = new NgTableParams(
															{}, {
																dataset : data
															});
*/
												},
												function(errResponse) {
													self
															.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};
							self.createIssueSolutionCategoryMap = function(
									IssuesSolutionCategoryMap) {
								issuesolutioncategorymapService
										.createIssueSolutionCategoryMap(
												IssuesSolutionCategoryMap)
										.then(
												function(d) {
													self
															.showSuccessMessage(d.message);
													self
															.fetchAllIssueSolutionCategoryMap();
												},
												function(errResponse) {
													self
															.showErrorMessage(errResponse.data.message);
													console
															.error('Error while creating Userandusergroupmap.');

												});
							};

							self.updateIssuSolutionCategoryMap = function(
									IssuesSolutionCategoryMap,
									issueSolutionCategoryMapId) {
								console
										.log(
												"Updating Issues Solution Category Map value:",
												issueSolutionCategoryMapId);
								issuesolutioncategorymapService
										.updateIssuSolutionCategoryMap(
												IssuesSolutionCategoryMap,
												issueSolutionCategoryMapId)
										.then(
												function(d) {
													self
															.showSuccessMessage("Data saved successfully.");
													self
															.fetchAllIssueSolutionCategoryMap();
												},

												function(errResponse) {
													console
															.error('Error while updating IssuesSolution.');
												});
							};

							self.deleteIssueSolutionCategoryMap = function(
									issueSolutionCategoryMapId) {
								issuesolutioncategorymapService
										.deleteIssueSolutionCategoryMap(
												issueSolutionCategoryMapId)
										.then(
												function(d) {
													self
															.showSuccessMessage("Data deleted successfully.");
													self
															.fetchAllIssueSolutionCategoryMap();
												},
												function(errResponse) {
													self
															.showErrorMessage("Failed to Delete, Please try again.");
													console
															.error('Error while deleting issueSolutionCategory.');
												});
							};

							self.fetchAllIssueSolutionCategoryMap();
							self.fetchAllIssueSolutionCategory();
							self.fetchAllIssueSolution();
							self.fetchAllBusinessPro();

							self.submit = function() {
								/*console.log("Insie submit method");*/
								self.IssuesSolutionCategoryMap.businessprocess.businessProcessId = self.item22.businessProcessId;
								self.IssuesSolutionCategoryMap.issuesolution.issueSolutionId = self.item.issueSolutionId;
								self.IssuesSolutionCategoryMap.issuesolutioncategory.issueSolutionCategoryId = self.item1.issueSolutionCategoryId;

								if (self.IssuesSolutionCategoryMap.issueSolutionCategoryMapId === null) {
									console.log('Saving New User',
											self.IssuesSolutionCategoryMap);
									self
											.createIssueSolutionCategoryMap(self.IssuesSolutionCategoryMap);
									self.IssuesSolutionCategoryMap.businessprocess.businessProcessId = self.item22.businessProcessId;
									self.IssuesSolutionCategoryMap.issuesolution.issueSolutionId = self.item.issueSolutionId;
									self.IssuesSolutionCategoryMap.issuesolutioncategory.issueSolutionCategoryId = self.item1.issueSolutionCategoryId;

								} else {
									self
											.updateIssuSolutionCategoryMap(
													self.IssuesSolutionCategoryMap,
													self.IssuesSolutionCategoryMap.issueSolutionCategoryMapId);
									console
											.log(
													'User updated with id ',
													self.IssuesSolutionCategoryMap.issueSolutionCategoryMapId);
								}
								self.reset();

								/* Close The form Modal now */
								$('#myModal').modal('hide');

							};

							self.edit = function(issueSolutionCategoryMapId) {
								console.log('id to be edited',
										issueSolutionCategoryMapId);

								for (var i = 0; i < self.IssuesSolutionCategoryMaps.length; i++) {
									if (self.IssuesSolutionCategoryMaps[i].issueSolutionCategoryMapId == issueSolutionCategoryMapId) {
										self.IssuesSolutionCategoryMap = angular
												.copy(self.IssuesSolutionCategoryMaps[i]);
										self.item = {
											"issueSolutionId" : self.IssuesSolutionCategoryMaps[i].issuesolution.issueSolutionId,
											"name" : self.IssuesSolutionCategoryMaps[i].issuesolution.name
										};
										self.item1 = {
											"issueSolutionCategoryId" : self.IssuesSolutionCategoryMaps[i].issuesolutioncategory.issueSolutionCategoryId,
											"name" : self.IssuesSolutionCategoryMaps[i].issuesolutioncategory.name
										};
										self.item22 = {
											"businessProcessId" : self.IssuesSolutionCategoryMaps[i].businessprocess.businessProcessId,
											"name" : self.IssuesSolutionCategoryMaps[i].businessprocess.name
										};
										break;
									}
								}

							};

							/* delete after user pressed OK in modal */

							self.remove = function() {
								console
										.log(
												'IssuesSolution id will be deleted: ',
												self.IssuesSolutionCategoryMap.issueSolutionCategoryMapId);

								self
										.deleteIssueSolutionCategoryMap(self.IssuesSolutionCategoryMap.issueSolutionCategoryMapId);
								self.reset();
							};

							self.reset = function() {
								self.IssuesSolutionCategoryMap = {

									"issueSolutionCategoryMapId" : null,
									"issuesolution" : {
										"issueSolutionId" : null,
										"name" : "",
									},
									"issuesolutioncategory" : {
										"issueSolutionCategoryId" : null,
										"name" : "",
									},
									"type" : "",
									"active" : "",
									"createdby" : "",
									"createddate" : null,
									"updatedby" : "",
									"updateddate" : null
								};

								// reset Form
								$scope.myForm.$setPristine();
							};

							self.successAlert = function() {
								console.log('Success alert method called');
								self.alert = {
									type : 'alert alert-success',
									msg : 'Well done! You successfully read this important alert message.'
								};
							};

							/* Show Success Message */
							self.showSuccessMessage = function(message) {
								self.successMessages = message;
								$timeout(function() {
									self.successMessages = null;
									self.errorMessages = null;
								}, 3000);
							};

							/* Show Error Message */
							self.showErrorMessage = function(message) {
								self.errorMessages = message;
								$timeout(function() {
									self.successMessages = null;
									self.errorMessages = null;
								}, 3000);
							};

						} ]);
