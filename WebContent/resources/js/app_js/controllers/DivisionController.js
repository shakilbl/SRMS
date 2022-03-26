


/* Controller Code */
App
		.controller(
				'DivisionController',
				[
						'$scope',
						'$timeout',
						'DivisionService','NgTableParams',
						function($scope, $timeout, DivisionService,NgTableParams) {
							var self = this;
							self.division = {
								    "divisionId": null,
								   
								    "name": "",
								    
								    "active": "Yes",
								    "createdby": "",
								    "creationdate": null,
								    "updatedby": "",
								    "updateddate": null
								  };
							self.divisions = [];
							self.successMessages=null;
							self.errorMessages=null;
							
							self.fetchAllDivision = function() {
								DivisionService
										.fetchAllDivision()
										.then(
												function(d) {
													self.divisions = d;
													var data = d;
													self.tableParams = new NgTableParams({}, { dataset: data});	
											
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};

							self.createDivision = function(division) {
								DivisionService
										.createDivision(division)
										.then(
												function(d) {
													self.showSuccessMessage(d.message);
													self.fetchAllDivision();
												},
												function(errResponse) {
													self.showErrorMessage("Division Already Exists ");
													console
															.error('Error while creating division.');
													
												});
							};

						self.updateDivision = function(division, divisionId) {
								console.log("Insie update division function");
								DivisionService
										.updateDivision(division, divisionId)
										.then(
												function(d) {
													self.showSuccessMessage("Data saved successfully.");
													self.fetchAllDivision();
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Save Data, Please try again.");
													console
															.error('Error while updating division.');
												});
							};

							self.deleteDivision = function(divisionId) {
								DivisionService
										.deleteDivision(divisionId)
										.then(
												function(d) {
													self.showSuccessMessage("Data deleted successfully.");
													self.fetchAllDivision();
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Delete Data, Please try again.");
													console
															.error('Error while deleting division.');
												});
							};

							self.fetchAllDivision();

							self.submit = function() {
								console.log("Insie submit method");
								 if(self.division.divisionId===null){
					                  console.log('Saving New division', self.division);    
					                  self.createDivision(self.division);
					              }else{
					                  self.updateDivision(self.division, self.division.divisionId);
					                  console.log('division updated with id ', self.division.divisionId);
					              }
					              self.reset();
					              
					              /* Close The form Modal now */
					              $('#myModal').modal('hide');
					                  
							};
							
							/*Load division to be edited in self.division object*/
							self.edit = function(divisionId) {
								

								console.log("Insie edit method");
								console.log('id to be edited', divisionId);
								for (var i = 0; i < self.divisions.length; i++) {
									if (self.divisions[i].divisionId === divisionId) {
										self.division = angular.copy(self.divisions[i]);
										break;
									}
								}
							};
							
							

							/* delete after division pressed OK in modal */
							self.remove = function() {
								console.log('id to be deleted', self.division.divisionId);
								self.deleteDivision(self.division.divisionId);
								self.reset();
							};

							self.reset = function() {
								self.division = {
									    "divisionId": null,
										   
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




