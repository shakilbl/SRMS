


/* Controller Code */
App
		.controller(
				'UserCategoryController',
				[
						'$scope',
						'$timeout',
						'UsercategoryService','NgTableParams',
						function($scope, $timeout, UsercategoryService,NgTableParams) {
							var self = this;
							self.usercategory = {
								    "userCategoryId": null,
								   
								    "name": "",
								   
								    "active":"Yes",
								    "createdby": "",
								    "creationdate": null,
								    "updatedby": "",
								    "updateddate": null
								  };
							self.usercategorys = [];
							self.successMessages=null;
							self.errorMessages=null;
							
							self.fetchAllCategory = function() {
								UsercategoryService
										.fetchAllCategory()
										.then(
												function(d) {
													self.usercategorys = d;
													var data = d;
													self.tableParams = new NgTableParams({}, { dataset: data});	
													
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};

							self.createUserCategory = function(usercategory) {
								UsercategoryService
										.createUserCategory(usercategory)
										.then(
												function(d) {
													self.showSuccessMessage(d.message);
													self.fetchAllCategory();
												},
												function(errResponse) {
													self.showErrorMessage(errResponse.data.message);
													console
															.error('Error while creating usercategory.');
													
												});
							};

							self.updateusercategory = function(usercategory, userCategoryId) {
								console.log("Insie updateusercategory function");
								UsercategoryService
										.updateusercategory(usercategory, userCategoryId)
										.then(
												function(d) {
													self.showSuccessMessage("Data saved successfully.");
													self.fetchAllCategory();
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Save Data, Please try again.");
													console
															.error('Error while updating usercategory.');
												});
							};

							self.deleteusercategory = function(userCategoryId) {
								UsercategoryService
										.deleteusercategory(userCategoryId)
										.then(
												function(d) {
													self.showSuccessMessage("Data deleted successfully.");
													self.fetchAllCategory();
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Delete Data, Please try again.");
													console
															.error('Error while deleting usercategory.');
												});
							};

							self.fetchAllCategory();

							self.submit = function() {
								console.log("Insie submit method");
								 if(self.usercategory.userCategoryId===null){
					                  console.log('Saving New usercategory', self.usercategory);    
					                  self.createUserCategory(self.usercategory);
					              }else{
					                  self.updateusercategory(self.usercategory, self.usercategory.userCategoryId);
					                  console.log('usercategory updated with id ', self.usercategory.userCategoryId);
					              }
					              self.reset();
					              
					              /* Close The form Modal now */
					              $('#myModal').modal('hide');
					                  
							};
							
							/*Load usercategory to be edited in self.usercategory object*/
							self.edit = function(userCategoryId) {
								console.log("Insie edit method");
								console.log('id to be edited', userCategoryId);
								for (var i = 0; i < self.usercategorys.length; i++) {
									if (self.usercategorys[i].userCategoryId === userCategoryId) {
										self.usercategory = angular.copy(self.usercategorys[i]);
										break;
									}
								}
							};
							

							/* delete after user pressed OK in modal */
							self.remove = function() {
								console.log('id to be deleted', self.usercategory.userCategoryId);
								self.deleteusercategory(self.usercategory.userCategoryId);
								self.reset();
							};

							self.reset = function() {
								self.usercategory = {
									    "userCategoryId": null,
										   
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