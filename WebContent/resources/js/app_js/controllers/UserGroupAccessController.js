/* Controller Code */
App
		.controller(
				'UsergrpacsController',
				[
						'$scope',
						'$timeout',
						'UsergrpacsService','UserPageService','NgTableParams',
						
						function($scope, $timeout, UsergrpacsService,UserPageService,NgTableParams) {
							var self = this;
							self.usergrouppageaccess = {
								    "userGroupPageAccessId": null,
								    "usergrouppage":{
								         "userGroupPageId":null,
									      "name":null
								    },
								    "usergroup":{
								    	"userGroupId":null,
								    	"name":""
								    	},
								    "active": "Yes",
								    "createdby": "",
								    "creationdate": null,
								    "updatedby": "",
								    "updateddate": null
								  };
							self.usergrouppage={
									
									"userGroupPageId":null,
									"name":""
									
							}
							self.usergroup={
									"userGroupId":null,
									"name":""
									
							}
							self.usergroupaccesss = [];
							self.usergroups=[];
							
							
							
							self.successMessages=null;
							self.errorMessages=null;
							
							self.fetchAllUsers = function() {
								UsergrpacsService
										.fetchAllUsers()
										.then(
												function(d) {
													self.usergroupaccesss = d;
													var data = d;
													self.tableParams = new NgTableParams({}, { dataset: data});	
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};
							
							
							
							
							self.fetchAllUserPage = function() {
								UserPageService
										.fetchAllUserPage()
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
													self.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};
							
							self.fetchAllUsergroups = function() {
								UsergrpacsService
										.fetchAllUsergroups()
										.then(
												function(dd) {
												//	self.usergroups = dd;
													self.Y = dd;
													self.usergroups = [];

													for(var i = 0; i< self.Y.length; i++){
														if(self.Y[i].active.toLowerCase()=="yes")
															self.usergroups.push(self.Y[i]);
													}
												},
												function(errResponse) {
													console
															.error('Error while fetching Currencies');
												});
							};


							self.createUsergroupaccess = function(usergrouppageaccess) {
								UsergrpacsService
										.createUsergroupaccess(usergrouppageaccess)
										.then(
												function(d) {
													self.showSuccessMessage(d.message);
													
													self.fetchAllUsers();
												},
												function(errResponse) {
													self.showErrorMessage(errResponse.data.message);
													console
															.error('Error while creating usergrouppageaccess.');
													
												});
							};

							self.updateUser = function(usergrouppageaccess, userGroupPageAccessId) {
								UsergrpacsService
										.updateUser(usergrouppageaccess, userGroupPageAccessId)
										.then(
												function(d) {
													self.showSuccessMessage("Data saved successfully.");
													self.fetchAllUsers();
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Save Data, Please try again.");
													console
															.error('Error while updating usergrouppageaccess.');
												});
							};

							self.deleteUser = function(userGroupPageAccessId) {
								UsergrpacsService
										.deleteUser(userGroupPageAccessId)
										.then(
												function(d) {
													self.showSuccessMessage("Data deleted successfully.");
													self.fetchAllUsers();
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Delete Data, Please try again.");
													console
															.error('Error while deleting usergrouppageaccess.');
												});
							};
							self.item = {
									"userGroupPageId" : null,
									"Name" : null
								};
						
							self.item1 = {
								    "userGroupId": null,
								    "name": null
								};

							self.fetchAllUsers();
							self.fetchAllUsergroups();
							self.fetchAllUserPage();

							self.submit = function() {
								 self.usergrouppageaccess.usergrouppage.userGroupPageId=self.item.userGroupPageId;
				                  self.usergrouppageaccess.usergroup.userGroupId=self.item1.userGroupId;

								 if(self.usergrouppageaccess.userGroupPageAccessId===null){
					                  console.log('Saving New usergrouppageaccess', self.usergrouppageaccess); 
					                 
					                  self.createUsergroupaccess(self.usergrouppageaccess);
					              }else{
					                  self.updateUser(self.usergrouppageaccess, self.usergrouppageaccess.userGroupPageAccessId);
					                  console.log('Usergroupaccess updated with id ', self.usergrouppageaccess.userGroupPageAccessId);
					              }
					              self.reset();
					              
					              /* Close The form Modal now */
					              $('#myModal').modal('hide');
					                  
							};
							
							/*Load usergroupaccess to be edited in self.usergroupaccess object*/
							self.edit = function(userGroupPageAccessId) {
								
									
								console.log('id to be edited', userGroupPageAccessId);
								for (var i = 0; i < self.usergroupaccesss.length; i++) {
									if (self.usergroupaccesss[i].userGroupPageAccessId === userGroupPageAccessId) {
									
										
										self.usergrouppageaccess = angular.copy(self.usergroupaccesss[i]);
										
										self.item = {
											    "userGroupPageId": self.usergroupaccesss[i].usergrouppage.userGroupPageId,
											    "Name": self.usergroupaccesss[i].usergrouppage.name
											};

										self.item1 = {
											    "userGroupId": self.usergroupaccesss[i].usergroup.userGroupId,
											    "Name": self.usergroupaccesss[i].usergroup.name
											};
										
										
										break;
									}
								}
							};
							
							
							/* delete after user pressed OK in modal */
							self.remove = function() {
								console.log('id to be deleted', self.usergrouppageaccess.userGroupPageAccessId);
								self.deleteUser(self.usergrouppageaccess.userGroupPageAccessId);
								self.reset();
							};

							self.reset = function() {
								self.usergrouppageaccess = {
									    "userGroupPageAccessId": null,
									    "usergrouppage":{
									         "userGroupPageId":null,
										      "name":null
									    },
									    "usergroup":{
									    	"userGroupId":null,
									    	"name":""
									    	},
									    "active": "",
									    "createdby": "",
									    "creationdate": null,
									    "updatedby": "",
									    "updateddate": null
									  };
								self.usergrouppage={
										
										"userGroupPageId":null,
										"name":""
										
								}
								self.usergroup={
										"userGroupId":null,
										"name":""
										
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