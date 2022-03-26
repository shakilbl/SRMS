


/* Controller Code */
App
		.controller(
				'BankController',
				[
						'$scope',
						'$timeout',
						'BankService','NgTableParams',
						function($scope, $timeout, BankService,NgTableParams) {
							var self = this;
							self.bankNames = {
								    "bankNamesId": null,
								   
								    "name": "",
								   
								    "active":"Yes",
								    "createdby": "",
								    "creationdate": null,
								    "updatedby": "",
								    "updateddate": null
								  };
							self.BankNms = [];
							self.successMessages=null;
							self.errorMessages=null;
							
							self.fetchAllBankName = function() {
								BankService
										.fetchAllBankName()
										.then(
												function(d) {
													self.BankNms = d;
													var data = d;
													self.tableParams = new NgTableParams({}, { dataset: data});	
													
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};

							self.createBankName = function(bankNames) {
								BankService
										.createBankName(bankNames)
										.then(
												function(d) {
													self.showSuccessMessage(d.message);
													self.fetchAllBankName();
												},
												function(errResponse) {
													self.showErrorMessage(errResponse.data.message);
													console
															.error('Error while creating bankNames.');
													
												});
							};

							self.updateBankName = function(bankNames, bankNamesId) {
								console.log("Insie updateBankName function");
								BankService
										.updateBankName(bankNames, bankNamesId)
										.then(
												function(d) {
													self.showSuccessMessage("Data saved successfully.");
													self.fetchAllBankName();
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Save Data, Please try again.");
													console
															.error('Error while updating bankNames.');
												});
							};

							self.deleteBankName = function(bankNamesId) {
								BankService
										.deleteBankName(bankNamesId)
										.then(
												function(d) {
													self.showSuccessMessage("Data deleted successfully.");
													self.fetchAllBankName();
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Delete Data, Please try again.");
													console
															.error('Error while deleting bankNames.');
												});
							};

							self.fetchAllBankName();

							self.submit = function() {
								console.log("Insie submit method");
								 if(self.bankNames.bankNamesId===null){
					                  console.log('Saving New bankNames', self.bankNames);    
					                  self.createBankName(self.bankNames);
					              }else{
					                  self.updateBankName(self.bankNames, self.bankNames.bankNamesId);
					                  console.log('bankNames updated with id ', self.bankNames.bankNamesId);
					              }
					              self.reset();
					              
					              /* Close The form Modal now */
					              $('#myModal').modal('hide');
					                  
							};
							
							/*Load bankNames to be edited in self.usercategory object*/
							self.edit = function(bankNamesId) {
								console.log("Insie edit method");
								console.log('id to be edited', bankNamesId);
								for (var i = 0; i < self.BankNms.length; i++) {
									if (self.BankNms[i].bankNamesId === bankNamesId) {
										self.bankNames = angular.copy(self.BankNms[i]);
										break;
									}
								}
							};
							

							/* delete after user pressed OK in modal */
							self.remove = function() {
								console.log('id to be deleted', self.bankNames.bankNamesId);
								self.deleteBankName(self.bankNames.bankNamesId);
								self.reset();
							};

							self.reset = function() {
								self.bankNames = {
									    "bankNamesId": null,
										   
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