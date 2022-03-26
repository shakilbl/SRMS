// angular controller area 
'use strict';
App
		.controller(
				'issuesolutionController',
				[
						'$scope',
						'$timeout',
						'issuesolutionService','NgTableParams',
						function($scope, $timeout, issuesolutionService, NgTableParams) {
							var self = this;
							self.IssuesSolution = {
								"issueSolutionId" : null,
								"name" : "",
								"type" : "",
								"active" : "Yes",
								"questionaries" : "",
								"createdby" : "",
								"creationdate" : null,
								"updatedby" : "",
								"updateddate" : null
							};
							self.IssuesSolutions = [];
							self.alert = {
								type : '',
								msg : ''
							};

							$scope.currentPage = 0;
							self.fetchAllIssueSolution = function() {
								issuesolutionService
										.fetchAllIssueSolution()
										.then(
												function(d) {
													
													self.IssuesSolutions = d;
													var data = d;
													self.tableParams = new NgTableParams({}, { dataset: data});																																																				
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Save Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};

							self.createIssueSolution = function(IssuesSolution) {
								console.log("Create service function is calling!!");
								issuesolutionService
										.createIssueSolution(IssuesSolution)
										.then(
												function(d) {
													self.showSuccessMessage(d.message);
													self.fetchAllIssueSolution();
												},
												function(errResponse) {
													self.showErrorMessage(errResponse.data.message);
													console
															.error('Error while creating IssuesSolution.');
												});
							};

							self.updateIssuSolution = function(IssuesSolution,
									issueSolutionId) { console.log("Updating IssuesSolution value:", IssuesSolution);
								issuesolutionService
										.updateIssueSolution(IssuesSolution,
												issueSolutionId)
										.then(
												self.fetchAllIssueSolution,
												function(errResponse) {
													console
															.error('Error while updating IssuesSolution.');
												});
							};

							self.deleteIssueSolution = function(issueSolutionId) {
								issuesolutionService
										.deleteIssueSolution(issueSolutionId)
										.then(
												function(d) {
													self
															.showSuccessMessage("Data deleted successfully.");
													self
															.fetchAllIssueSolution();
												},
												function(errResponse) {
													self
															.showErrorMessage("Failed to Delete(may be due to contraints), Please contact adminstrator.");
													console
															.error('Error while deleting issueSolutionCategory.');
												});
							};

							self.fetchAllIssueSolution();

							
							
							
							
							self.submit = function() {
								console
										.log(
												'self.IssuesSolution.issueSolutionId: ',
												self.IssuesSolution.issueSolutionId);
								if (self.IssuesSolution.issueSolutionId == null) {
									console.log('Saving New IssuesSolution',
											self.IssuesSolution);
									self
											.createIssueSolution(self.IssuesSolution);
									
								} else {
									console
											.log(
													'updating IssuesSolution with id ',
													self.IssuesSolution.issueSolutionId);
									
									self
											.updateIssuSolution(
													self.IssuesSolution,
													self.IssuesSolution.issueSolutionId);

									self.successAlert();
								}
								self.reset();
								$('#myModal').modal('hide');
							};
							

							self.edit = function(issueSolutionId) {
								console.log('id to be edited', issueSolutionId);

								for (var i = 0; i < self.IssuesSolutions.length; i++) {
									if (self.IssuesSolutions[i].issueSolutionId == issueSolutionId) {
										self.IssuesSolution = angular
												.copy(self.IssuesSolutions[i]);
										break;
									}
								}
							};

							/* delete after user pressed OK in modal */
							self.remove = function() {
								console.log(
										'IssuesSolution id will be deleted: ',
										self.IssuesSolution.issueSolutionId);
								self
										.deleteIssueSolution(self.IssuesSolution.issueSolutionId);
								self.reset();
							};

							self.reset = function() {
								self.IssuesSolution = {
									"issueSolutionId" : null,
									"name" : "",
									"type" : "",
									"active" : "",
									"questionaries" : "",
									"createdby" : "",
									"creationdate" : null,
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
