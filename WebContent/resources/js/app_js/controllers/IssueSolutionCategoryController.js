


/* Controller Code */
App
		.controller(
				'ISCController',
				[
						'$scope',
						'$timeout',
						'ISCService','NgTableParams',
						function($scope, $timeout, ISCService,NgTableParams) {
							var self = this;
							self.issuesolutioncategory = {
								    "issueSolutionCategoryId": null,
								   
								    "name": "",
								    
								    "active": "Yes",
								    "createdby": "",
								    "creationdate": null,
								    "updatedby": "",
								    "updateddate": null
								  };
							self.issuesolutioncategorys = [];
							self.successMessages=null;
							self.errorMessages=null;
							
							self.fetchAllISC = function() {
								ISCService
										.fetchAllISC()
										.then(
												function(d) {
													self.issuesolutioncategorys = d;
													var data = d;
													self.tableParams = new NgTableParams({}, { dataset: data});	
											
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};

							self.createISC = function(issuesolutioncategory) {
								ISCService
										.createISC(issuesolutioncategory)
										.then(
												function(d) {
													self.showSuccessMessage(d.message);
													self.fetchAllISC();
												},
												function(errResponse) {
													self.showErrorMessage("issuesolutioncategory Already Exists ");
													console
															.error('Error while creating issuesolutioncategory.');
													
												});
							};

						self.updateISC = function(issuesolutioncategory, issueSolutionCategoryId) {
								console.log("Insie update issuesolutioncategory function");
								ISCService
										.updateISC(issuesolutioncategory, issueSolutionCategoryId)
										.then(
												function(d) {
													self.showSuccessMessage("Data saved successfully.");
													self.fetchAllISC();
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Save Data, Please try again.");
													console
															.error('Error while updating issuesolutioncategory.');
												});
							};

							self.deleteISC = function(issueSolutionCategoryId) {
								ISCService
										.deleteISC(issueSolutionCategoryId)
										.then(
												function(d) {
													self.showSuccessMessage("Data deleted successfully.");
													self.fetchAllISC();
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Delete Data, Please try again.");
													console
															.error('Error while deleting issuesolutioncategory.');
												});
							};

							self.fetchAllISC();

							self.submit = function() {
								console.log("Insie submit method");
								 if(self.issuesolutioncategory.issueSolutionCategoryId===null){
					                  console.log('Saving New issuesolutioncategory', self.issuesolutioncategory);    
					                  self.createISC(self.issuesolutioncategory);
					              }else{
					                  self.updateISC(self.issuesolutioncategory, self.issuesolutioncategory.issueSolutionCategoryId);
					                  console.log('issuesolutioncategory updated with id ', self.issuesolutioncategory.issueSolutionCategoryId);
					              }
					              self.reset();
					              
					              /* Close The form Modal now */
					              $('#myModal').modal('hide');
					                  
							};
							
							/*Load issuesolutioncategory to be edited in self.issuesolutioncategory object*/
							self.edit = function(issueSolutionCategoryId) {
								

								console.log("Insie edit method");
								console.log('id to be edited', issueSolutionCategoryId);
								for (var i = 0; i < self.issuesolutioncategorys.length; i++) {
									if (self.issuesolutioncategorys[i].issueSolutionCategoryId === issueSolutionCategoryId) {
										self.issuesolutioncategory = angular.copy(self.issuesolutioncategorys[i]);
										break;
									}
								}
							};
							
							

							/* delete after issuesolutioncategory pressed OK in modal */
							self.remove = function() {
								console.log('id to be deleted', self.issuesolutioncategory.issueSolutionCategoryId);
								self.deleteISC(self.issuesolutioncategory.issueSolutionCategoryId);
								self.reset();
							};

							self.reset = function() {
								self.issuesolutioncategory = {
									    "issueSolutionCategoryId": null,
										   
									    "name": "",
									    
									    "active": "",
									    "createdby": "",
									    "creationdate": null,
									    "updatedby": "",
									    "updateddate": null
									  };
								// reset Form
								$scope.myForm.$setPristine(); 
							};
							
							/* Show Success Message */
							self.showSuccessMessage=function(message){
								
								self.successMessages=message;
							    $timeout(function() {
							        self.successMessages = null;
							        self.errorMessages = null;
							      }, 3000);
							};
							
							/* Show Error Message */
							self.showErrorMessage=function(message){
								
								self.errorMessages=message;
								$timeout(function() {
							        self.successMessages = null;
							        self.errorMessages = null;
							      }, 3000);
							};
							
						} ]);
/* End of Controller Code */




