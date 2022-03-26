


/* Controller Code */
App
		.controller(
				'UsergrpController',
				[
						'$scope',
						'$timeout',
						'UsergrpService','NgTableParams',
						function($scope, $timeout, UsergrpService,NgTableParams) {
							var self = this;
							self.usergroup = {
								    "userGroupId": null,
								    "name": "",
								    "section": "",
								    "department": "",
								    "division": "",
								    "emailId": "",
								    "escalationEmailId":"",
								    "active": "Yes",
								    "createdby": "",
								    "createddate": null,
								    "updatedby": "",
								    "updateddate": null
								  };
							self.usergroups = [];
							self.successMessages=null;
							self.errorMessages=null;
							
							self.fetchAllUsers = function() {
								UsergrpService
										.fetchAllUsers()
										.then(
												function(d) {
													self.usergroups = d;
													var data = d;
													self.tableParams = new NgTableParams({}, { dataset: data});	
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};

							self.createUsergroup = function(usergroup) {
								UsergrpService
										.createUsergroup(usergroup)
										.then(
												function(d) {
													self.showSuccessMessage(d.message);
													self.fetchAllUsers();
												},
												function(errResponse) {
													self.showErrorMessage(errResponse.data.message);
													console
															.error('Error while creating usergroup.');
													
												});
							};

							self.updateUsergroup = function(usergroup, userGroupId) {
								console.log("Insie updateUsergroup function");
								UsergrpService
										.updateUsergroup(usergroup, userGroupId)
										.then(
												function(d) {
													self.showSuccessMessage("Data saved successfully.");
													self.fetchAllUsers();
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Save Data, Please try again.");
													console
															.error('Error while updating usergroup.');
												});
							};

							self.deleteUsergroup = function(userGroupId) {
								UsergrpService
										.deleteUsergroup(userGroupId)
										.then(
												function(d) {
													self.showSuccessMessage("Data deleted successfully.");
													self.fetchAllUsers();
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Delete Data, Please try again.");
													console
															.error('Error while deleting usergroup.');
												});
							};

							self.fetchAllUsers();

							self.submit = function() {
								console.log("Insie submit method");
								 if(self.usergroup.userGroupId===null){
					                  console.log('Saving New usergroup', self.usergroup);    
					                  self.createUsergroup(self.usergroup);
					              }else{
					                  self.updateUsergroup(self.usergroup, self.usergroup.userGroupId);
					                  console.log('usergroup updated with id ', self.usergroup.userGroupId);
					              }
					              self.reset();
					              
					              /* Close The form Modal now */
					              $('#myModal').modal('hide');
					                  
							};
							

							/*Load user to be edited in self.user object*/
							self.edit = function(userGroupId) {
								console.log("Insie edit method");
								console.log('id to be edited', userGroupId);
								for (var i = 0; i < self.usergroups.length; i++) {
									if (self.usergroups[i].userGroupId === userGroupId) {
										self.usergroup = angular.copy(self.usergroups[i]);
										break;
									}
								}
							};
							
							
							self.remove = function() {
								console.log('id to be deleted', self.usergroup.userGroupId);
								self.deleteUsergroup(self.usergroup.userGroupId);
								self.reset();
							};

							self.reset = function() {
								self.usergroup = {
								    "userGroupId": null,
								    "name": "",
								    "section": "",
								    "department": "",
								    "division": "",
								    "emailId": "",
								    "escalationEmailId":"",
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