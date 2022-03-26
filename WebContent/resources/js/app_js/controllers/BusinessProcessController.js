


/* Controller Code */
App
		.controller(
				'BusinessProController',
				[
						'$scope',
						'$timeout',
						'BusinessproService','NgTableParams',
						function($scope, $timeout, BusinessproService,NgTableParams) {
							var self = this;
							self.businessprocess = {
								    "businessProcessId": null,
								   
								    "name": "",
								    
								  
								    "createdby": "",
								    "createdDate": null,
								    "updatedby": "",
								    "updateddate": null
								  };
							self.businesspros = [];
							self.successMessages=null;
							self.errorMessages=null;
							
							self.fetchAllBusinessPro = function() {
								BusinessproService
										.fetchAllBusinessPro()
										.then(
												function(d) {
													self.businesspros = d;
													var data = d;
													self.tableParams = new NgTableParams({}, { dataset: data});	
											
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};

							self.createBusinessPro = function(businessprocess) {
								BusinessproService
										.createBusinessPro(businessprocess)
										.then(
												function(d) {
													self.showSuccessMessage(d.message);
													self.fetchAllBusinessPro();
												},
												function(errResponse) {
													self.showErrorMessage("Business Process Already Exists ");
													console
															.error('Error while creating Business process.');
													
												});
							};

						self.updateBusinessPro = function(businessprocess, businessProcessId) {
								console.log("Insie update Business Process function");
								BusinessproService
										.updateBusinessPro(businessprocess, businessProcessId)
										.then(
												function(d) {
													self.showSuccessMessage("Data Edited successfully.");
													self.fetchAllBusinessPro();
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Save Data, Please try again.");
													console
															.error('Error while updating businessprocess.');
												});
							};

							self.deleteBusinessPro = function(businessProcessId) {
								BusinessproService
										.deleteBusinessPro(businessProcessId)
										.then(
												function(d) {
													self.showSuccessMessage("Data deleted successfully.");
													self.fetchAllBusinessPro();
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Delete Data, Please try again.");
													console
															.error('Error while deleting businessprocess.');
												});
							};

							self.fetchAllBusinessPro();

							self.submit = function() {
								console.log("Insie submit method");
								 if(self.businessprocess.businessProcessId===null){
					                  console.log('Saving New businessprocess', self.businessprocess);    
					                  self.createBusinessPro(self.businessprocess);
					              }else{
					                  self.updateBusinessPro(self.businessprocess, self.businessprocess.businessProcessId);
					                  console.log('businessprocess updated with id ', self.businessprocess.businessProcessId);
					              }
					              self.reset();
					              
					              /* Close The form Modal now */
					              $('#myModal').modal('hide');
					                  
							};
							
							/*Load businessprocess to be edited in self.businessprocess object*/
							self.edit = function(businessProcessId) {
								

								console.log("Insie edit method");
								console.log('id to be edited', businessProcessId);
								for (var i = 0; i < self.businesspros.length; i++) {
									if (self.businesspros[i].businessProcessId === businessProcessId) {
										self.businessprocess = angular.copy(self.businesspros[i]);
										break;
									}
								}
							};
							
							

							/* delete after businessprocess pressed OK in modal */
							self.remove = function() {
								console.log('id to be deleted', self.businessprocess.businessProcessId);
								self.deleteBusinessPro(self.businessprocess.businessProcessId);
								self.reset();
							};

							self.reset = function() {
								self.businessprocess = {
									    "businessProcessId": null,
										   
									    "name": "",
									    
									  
									    "createdby": "",
									    "createdDate": null,
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




