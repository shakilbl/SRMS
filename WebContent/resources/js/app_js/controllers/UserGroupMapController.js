
App
		.controller(
				'UsergrpmapController',
				[
						'$scope',
						'$timeout',
						'UsergrpmapService','NgTableParams',
						function($scope, $timeout, UsergrpmapService,NgTableParams) {
							var self = this;
							self.Userandusergroupmap = {
								    "userAndUserGroupMapId": null,
								    "user":{
								    	"userId":null,
								    	"name":""
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
							
							self.user={
									
									"userId":null,
							    	"name":""
							}
							
							self.usergroup={
									"userGroupId":null,
									"name":""
									
							}
							self.usergroupmaps = [];
							self.users=[];
							self.usergroups=[];
							
							self.successMessages=null;
							self.errorMessages=null;
							
							
							self.item = {
								    "userId": null,
								    "name": null
								};
							self.item1 = {
								    "userGroupId": null,
								    "name": null
								};
							self.fetchAllUsergroupmap = function() {
								UsergrpmapService
										.fetchAllUsergroupmap()
										.then(
												function(d) {
													self.usergroupmaps = d;
													var data = d;
													self.tableParams = new NgTableParams({}, { dataset: data});	
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};
							
							self.fetchAllUsers = function() {
								UsergrpmapService
										.fetchAllUsers()
										.then(
												function(dd) {
													//self.users = dd;
													self.X = dd;
													self.users = [];

													for(var i = 0; i< self.X.length; i++){
														if(self.X[i].active.toLowerCase()=="yes")
															self.users.push(self.X[i]);
													}
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};	
							
							self.fetchAllUsergroups = function() {
								UsergrpmapService
										.fetchAllUsergroups()
										.then(
												function(ddd) {
													//self.usergroups = ddd;
													
													self.Y = ddd;
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


							self.createUsergroupmap = function(Userandusergroupmap) {
								UsergrpmapService
										.createUsergroupmap(Userandusergroupmap)
										.then(
												function(d) {
													self.showSuccessMessage("Data saved successfully.");
													self.fetchAllUsergroupmap();
												},
												function(errResponse) {
													self.showErrorMessage(errResponse.data.message);
													console
															.error('Error while creating Userandusergroupmap.');
													
												});
							};
						
							self.updateUsergroupmap = function(Userandusergroupmap, userAndUserGroupMapId) {
								console.log("Insie 	updateUsergroupmap function");
								UsergrpmapService
										.updateUsergroupmap(Userandusergroupmap, userAndUserGroupMapId)
										.then(
												function(d) {
													self.showSuccessMessage("Data saved successfully.");
													self.fetchAllUsergroupmap();
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Save Data, Please try again.");
													console
															.error('Error while updating user and user group map.');
												});
							};

							self.deleteUsergroupmap = function(userAndUserGroupMapId) {
								UsergrpmapService
										.deleteUsergroupmap(userAndUserGroupMapId)
										.then(
												function(d) {
													self.showSuccessMessage("Data deleted successfully.");
													self.fetchAllUsergroupmap();
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Delete Data, Please try again.");
													console
															.error('Error while deleting Userandusergroupmap.');
												});
							};

							self.fetchAllUsergroupmap();
							self.fetchAllUsers();
							self.fetchAllUsergroups();
							

							self.submit = function() {
								self.Userandusergroupmap.user.userId=self.item.userId;
								self.Userandusergroupmap.usergroup.userGroupId=self.item1.userGroupId;
								
								console.log("Insie submit method");
								 if(self.Userandusergroupmap.userAndUserGroupMapId===null){
					                  console.log('Saving New Userandusergroupmap', self.Userandusergroupmap); 
					                  
					                  
					                  self.Userandusergroupmap.user.userId=self.item.userId;  
					              	self.Userandusergroupmap.usergroup.userGroupId=self.item1.userGroupId;
									
									
					                  self.createUsergroupmap(self.Userandusergroupmap);
					              }else{
					                  self.updateUsergroupmap(self.Userandusergroupmap, self.Userandusergroupmap.userAndUserGroupMapId);
					                  console.log('Userandusergroupmap updated with id ', self.Userandusergroupmap.userAndUserGroupMapId);
					              }
					              self.reset();
					              
					              /* Close The form Modal now */
					              $('#myModal').modal('hide');
					                  
							};
							
							/*Load Userandusergroupmap to be edited in self.Userandusergroupmap object*/
							self.edit = function(userAndUserGroupMapId) {
							
								console.log("Insie edit method");
								console.log('id to be edited', userAndUserGroupMapId);
								for (var i = 0; i < self.usergroupmaps.length; i++) {
									if (self.usergroupmaps[i].userAndUserGroupMapId === userAndUserGroupMapId) {
										
									
										self.Userandusergroupmap = angular.copy(self.usergroupmaps[i]);
										console.log(self.Userandusergroupmap.usergroup.userGroupId);
										
										self.item1 = {
											    "userGroupId": self.usergroupmaps[i].usergroup.userGroupId,
											    "name": self.usergroupmaps[i].usergroup.name
											};
										self.item = {
											    "userId": self.usergroupmaps[i].user.userId,
											    "name": self.usergroupmaps[i].user.name
											};
										break;
									}
								}
							};
							
							
							self.remove = function() {
								console.log('id to be deleted', self.Userandusergroupmap.userAndUserGroupMapId);
								self.deleteUsergroupmap(self.Userandusergroupmap.userAndUserGroupMapId);
								self.reset();
							};

							self.reset = function() {
								self.Userandusergroupmap = {
								    "userAndUserGroupMapId": null,
								    "user":{
								    	"userId":null,
								    	"name":""
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