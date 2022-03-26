


/* Controller Code */
App
		.controller(
				'RemarkController',
				[
						'$scope',
						'$timeout',
						'RemarkService','NgTableParams',
						function($scope, $timeout, RemarkService,NgTableParams) {
							var self = this;
							self.remarks = {
								    "remarksId": null,
								   
								    "name": "",
								   
								    "active":"Yes",
								    "createdby": "",
								    "creationdate": null,
								    "updatedby": "",
								    "updateddate": null
								  };
							self.remrks = [];
							self.successMessages=null;
							self.errorMessages=null;
							
							self.fetchAllRemarks = function() {
								RemarkService
										.fetchAllRemarks()
										.then(
												function(d) {
													self.remrks = d;
													var data = d;
													self.tableParams = new NgTableParams({}, { dataset: data});	
													
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};

							self.createRemarks = function(remarks) {
								RemarkService
										.createRemarks(remarks)
										.then(
												function(d) {
													self.showSuccessMessage(d.message);
													self.fetchAllRemarks();
												},
												function(errResponse) {
													self.showErrorMessage(errResponse.data.message);
													console
															.error('Error while creating remarks.');
													
												});
							};

							self.updateRemarks = function(remarks, remarksId) {
								console.log("Insie updateRemarks function");
								RemarkService
										.updateRemarks(remarks, remarksId)
										.then(
												function(d) {
													self.showSuccessMessage("Data saved successfully.");
													self.fetchAllRemarks();
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Save Data, Please try again.");
													console
															.error('Error while updating remarks.');
												});
							};

							self.deleteRemarks = function(remarksId) {
								RemarkService
										.deleteRemarks(remarksId)
										.then(
												function(d) {
													self.showSuccessMessage("Data deleted successfully.");
													self.fetchAllRemarks();
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Delete Data, Please try again.");
													console
															.error('Error while deleting remarks.');
												});
							};

							self.fetchAllRemarks();

							self.submit = function() {
								console.log("Insie submit method");
								 if(self.remarks.remarksId===null){
					                  console.log('Saving New remarks', self.remarks);    
					                  self.createRemarks(self.remarks);
					              }else{
					                  self.updateRemarks(self.remarks, self.remarks.remarksId);
					                  console.log('remarks updated with id ', self.remarks.remarksId);
					              }
					              self.reset();
					              
					              /* Close The form Modal now */
					              $('#myModal').modal('hide');
					                  
							};
							
							/*Load remarks to be edited in self.usercategory object*/
							self.edit = function(remarksId) {
								console.log("Insie edit method");
								console.log('id to be edited', remarksId);
								for (var i = 0; i < self.remrks.length; i++) {
									if (self.remrks[i].remarksId === remarksId) {
										self.remarks = angular.copy(self.remrks[i]);
										break;
									}
								}
							};
							

							/* delete after user pressed OK in modal */
							self.remove = function() {
								console.log('id to be deleted', self.remarks.remarksId);
								self.deleteRemarks(self.remarks.remarksId);
								self.reset();
							};

							self.reset = function() {
								self.remarks = {
									    "remarksId": null,
										   
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