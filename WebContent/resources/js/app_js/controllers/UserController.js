
/* Controller Code */
App
		.controller(
				'UseruserController',
				[
						'$scope',
						'$timeout',
						'UseruserService',
						'UsercategoryService','NgTableParams',
						function($scope, $timeout, UseruserService,
								UsercategoryService,NgTableParams) {
							var self = this;
							self.user = {
								"userId" : null,
								"networkId" : "",
								"name" : "",
								"designation" : "",
								"location" : "",
								"emailId" : "",
								"msisdn" : "",
								"password" : "",
								"usercategory" : {
									"userCategoryId" : null,

									"name" : ""
								},
								"roleType" : "",

								"active" : "Yes",
								"createdby" : "",
								"creationdate" : null,
								"updatedby" : "",
								"updateddate" : null
							};
							self.editUser=null;

							self.usercategory = {
								"userCategoryId" : null,

								"name" : ""
							};
							self.item = {
								    "userCategoryId": null,
								    "Name": null
								};
						

							self.users = [];

							self.successMessages = null;
							self.errorMessages = null;

							self.fetchAllUsers = function() {
								UseruserService
										.fetchAllUsers()
										.then(
												function(d) {
													self.users = d;
													var data = d;
													self.tableParams = new NgTableParams({}, { dataset: data});	
												},
												function(errResponse) {
													self
															.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};
							self.fetchAllUserID = function(userId) {
								UseruserService
										.fetchAllUserID(userId)
										.then(
												function(d) {
													self.user= d;
													self.item = {
														    "userCategoryId": self.user.usercategory.userCategoryId,
														    "Name": self.user.usercategory.name
													}
													console.log("Item: ",self.item);
													/*var data = d;
													self.tableParams = new NgTableParams({}, { dataset: data});	
											*/	},
												function(errResponse) {
													self
															.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};
							

							self.fetchAllCategory = function() {
								UsercategoryService
										.fetchAllCategory()
										.then(
												function(d) {
													
													//self.uc = d;
													self.X = d;
													self.uc = [];

													for(var i = 0; i< self.X.length; i++){
														if(self.X[i].active.toLowerCase()=="yes")
															self.uc.push(self.X[i]);
													}

												},
												function(errResponse) {
													self
															.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};

							self.createUser = function(user) {
								UseruserService
										.createUser(user)
										.then(
												function(d) {
													self
															.showSuccessMessage(d.message);
													self.fetchAllUsers();
												},
												function(errResponse) {
													self
															.showErrorMessage(errResponse.data.message);
													console
															.error('Error while creating user.');

												});
							};

							self.updateUser = function(user, userId) {
								console.log("Insie updateUser function");
								UseruserService
										.updateUser(user, userId)
										.then(
												function(d) {
													self
															.showSuccessMessage("Data saved successfully.");
													self.fetchAllUsers();
												},
												function(errResponse) {
													self
															.showErrorMessage("Failed to Save Data, Please try again.");
													console
															.error('Error while updating user.');
												});
							};

							self.deleteUser = function(userId) {
								UseruserService
										.deleteUser(userId)
										.then(
												function(d) {
													self
															.showSuccessMessage("Data deleted successfully.");
													self.fetchAllUsers();
												},
												function(errResponse) {
													self
															.showErrorMessage("Failed to Delete Data, Please try again.");
													console
															.error('Error while deleting user.');
												});
							};

							self.fetchAllUsers();
							self.fetchAllCategory();

							self.submit = function() {
								console.log("Insie submit method");
								
								self.user.usercategory.userCategoryId=self.item.userCategoryId;
								if (self.user.userId === null) {
									console.log('Saving New User', self.user);
									self.createUser(self.user);
								} else {
									self
											.updateUser(self.user,
													self.user.userId);
									console.log('User updated with id ',
											self.user.userId);
								}
								self.reset();

								/* Close The form Modal now */
								$('#myModal').modal('hide');

							};

							/*Load user to be edited in self.user object*/
							self.edit = function(userId) {
								console.log("Insie edit method");
								console.log('id to be edited', userId);
								
								self.fetchAllUserID(userId);
								
								
								/*for (var i = 0; i < self.users.length; i++) {
									if (self.users[i].userId === userId) {
										self.user = angular.copy(self.users[i]);
										self.item = {
											    "userCategoryId": self.users[i].usercategory.userCategoryId,
											    "Name": self.users[i].usercategory.name
											};
										console.log($scope.item);
										console.log("UC : ",self.uc);
										
										console.log(self.users[i].usercategory);
										console.log("Cat: ",self.users.usercategory);
										break;
								}
								}*/
							};

							/* delete after user pressed OK in modal */
							self.remove = function() {
								console.log('id to be deleted',
										self.user.userId);
								self.deleteUser(self.user.userId);
								self.reset();
							};

							self.reset = function() {
								self.user = {
									"userId" : null,
									"networkId" : "",
									"name" : "",
									"designation" : "",
									"location" : "",
									"emailId" : "",
									"msisdn" : "",
									"password" : "",
									"usercategory" : {
										"userCategoryId" : null,

										"name" : ""
									},
									"roleType" : "",

									"active" : "Yes",
									"createdby" : "",
									"creationdate" : null,
									"updatedby" : "",
									"updateddate" : null
								};

								// reset Form
								$scope.myForm.$setPristine();
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
/* End of Controller Code */