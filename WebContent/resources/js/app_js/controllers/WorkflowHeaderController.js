App
		.controller(
				'wfController',
			
				[
						'$scope',
						'$timeout',
						'wfService','BusinessproService','NgTableParams',
						function($scope, $timeout, wfService,BusinessproService,NgTableParams) {

							var self = this;
							self.wfheader = {
								"wfheaderId" : null,
								"name" : "",
								"type" : "",
							
								"issuesolutioncategorymap":"",	
								"businessprocess" : {
									"businessProcessId" : null,
									"name" : ""
								},
								"usergroup" : {
									"userGroupId" : null,
									"name" : ""
								},
								"bscode" : "",

								"active" : "Yes",
								"createdby" : "",
								"creationdate" : null,
								"updatedby" : "",
								"updateddate" : null
							};
							self.issuesolutioncategorymap = {
								"issueSolutionCategoryMapId" : null

							};

							self.usergroup = {
								"userGroupId" : null,
								"name" : ""
							},
							
							self.businessprocess={
									"businessProcessId" : null,
									"name" : ""
							},
						
							self.item3 = null;
							self.item11 = null;
							self.item21 = null;
							
							self.item = {
								    "userGroupId": null,
								    "Name": null
								};
							self.item22 = {
									"businessProcessId" : null,
									"Name" : null
								};
							self.wfheaders = [];
							self.businesspros = [];
							self.issuesolutioncategorymaps = [];
							self.usergroups = [];

							self.successMessages = null;
							self.errorMessages = null;

							self.fetchAllUsers = function() {
								wfService
										.fetchAllUsers()
										.then(
												function(d) {
													self.wfheaders = d;
													var data = d;
													self.tableParams = new NgTableParams({}, { dataset: data});

												},
												function(errResponse) {
													console
															.error('Error while fetching Currencies');
												});
							};

							self.fetchAllicscmap = function() {
								wfService
										.fetchAllicscmap()
										.then(
												function(dd) {
													self.issuesolutioncategorymaps = dd;

													self.iscm = undefined;
													self.abc = []
													self.l = {
														issueSolutionCategoryMapId : null,
														name : null
													};

													for (var i = 0; i < self.issuesolutioncategorymaps.length; i++) {

														self.l.issueSolutionCategoryMapId = self.issuesolutioncategorymaps[i].issueSolutionCategoryMapId;
														self.l.name = self.issuesolutioncategorymaps[i].issuesolutioncategory.name
																+ "-"
																+ self.issuesolutioncategorymaps[i].issuesolution.name;
														self.abc[i] = self.l;
														self.l = {
															issueSolutionCategoryMapId : null,
															name : null
														};
													}

													// Issue Solution Category Combine Text field  End //														
												},
												function(errResponse) {
													self
															.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});

							};

							self.fetchAllUsergroups = function() {
								wfService
										.fetchAllUsergroups()
										.then(
												function(ddd) {
													//self.usergroups = ddd;
													self.X = ddd;
													self.usergroups = [];

													for(var i = 0; i< self.X.length; i++){
														if(self.X[i].active.toLowerCase()=="yes")
															self.usergroups.push(self.X[i]);
													}
												},
												function(errResponse) {
													console
															.error('Error while fetching Currencies');
												});
							};
							self.fetchAllBusinessPro = function() {
								BusinessproService
										.fetchAllBusinessPro()
										.then(
												function(f) {
													self.businesspros = f;
													var data = f;
													self.tableParams = new NgTableParams({}, { dataset: data});	
											
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};

							self.createwfheader = function(wfheader) {
								wfService
										.createwfheader(wfheader)
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
															.error('Error while creating Work Flow Header.');

												});
							};

							self.updateUser = function(wfheader, wfheaderId) {
								wfService
										.updateUser(wfheader, wfheaderId)
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
															.error('Error while updating WF Header.');
												});
							};

							self.deleteUser = function(wfheaderId) {
								wfService
										.deleteUser(wfheaderId)
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
							self.fetchAllicscmap();
							self.fetchAllUsergroups();
							self.fetchAllBusinessPro();

							self.submit = function() {
								self.wfheader.businessprocess.businessProcessId=self.item22.businessProcessId;
								self.wfheader.usergroup.userGroupId=self.item.userGroupId;
								
							
								if (self.wfheader.wfheaderId === null) {
									console.log('Saving New WF Header',
											self.wfheader);
									self.createwfheader(self.wfheader);
									self.wfheader.businessprocess.businessProcessId=self.item22.businessProcessId;
									self.wfheader.usergroup.userGroupId=self.item.userGroupId;
								} else {
									console.log(self.wfheader);
									self.updateUser(self.wfheader,
											self.wfheader.wfheaderId);
									console
											.log(
													'Work Flow Header updated with id ',
													self.wfheader.wfheaderId);
								}
								self.reset();

								/* Close The form Modal now */
								$('#myModal').modal('hide');

							};

							/*Load user to be edited in self.user object*/

							self.edit = function(wfheaderId) {
								document.getElementById("iscm").style.visibility  = "hidden";
								document.getElementById("liscm").style.visibility  = "hidden";
								
								document.getElementById("current").disabled   = false;
								document.getElementById("current1").disabled   = false;
								document.getElementById("current").style.visibility  = "visible";
								document.getElementById("current1").style.visibility  = "visible";
								console.log("Insie edit method");
						
								console.log("inside edit!!!");
								for (var i = 0; i < self.wfheaders.length; i++) {
									if (self.wfheaders[i].wfheaderId === wfheaderId) {
										this.wfheader = angular
												.copy(self.wfheaders[i]);
										self.item1 = self.wfheaders[i].issuesolutioncategorymap.issuesolutioncategory.name;
										self.item2 = self.wfheaders[i].issuesolutioncategorymap.issuesolution.name;
										self.l = {
												issueSolutionCategoryMapId : 
													self.wfheader.issuesolutioncategorymap.issueSolutionCategoryMapId,
												name : null
											};
										console.log("sdffiasfbai: ",self.item1);
										
										self.item3 = self.item1+"_"+self.item2;
										
										self.item = {
											    "userGroupId": self.wfheaders[i].usergroup.userGroupId,
											    "Name": self.wfheaders[i].usergroup.name
											};
										
										self.item22 = {
											    "businessProcessId": self.wfheaders[i].businessprocess.businessProcessId,
											    "Name": self.wfheaders[i].businessprocess.name
											};
										
										break;
									}
								}

/*//								console.log("wfheader.usergroup.userGroupId: "
//										+ this.wfheader.usergroup.userGroupId);
//
//								self.usergroup.userGroupId = this.wfheader.usergroup.userGroupId;
//								$scope.FirstCtrl.userGroupId = this.wfheader.usergroup.name;
*/
							};
							self.toggle = function(){
								//	document.getElementById("iscm").disabled   = false;
								document.getElementById("liscm").disabled   = false;
								document.getElementById("iscm").style.visibility  = "visible";
								document.getElementById("liscm").style.visibility  = "visible";
								
						/*		document.getElementById("current").disabled  = true;
								document.getElementById("current1").disabled  = true;*/
								document.getElementById("current").style.visibility  = "hidden";
								document.getElementById("current1").style.visibility  = "hidden";
									
									
								
									
								}


							self.remove = function() {
								console.log('id to be deleted',
										self.wfheader.wfheaderId);
								self.deleteUser(self.wfheader.wfheaderId);
								self.reset();
							};

							self.reset = function() {
								self.wfheader = {
									"wfheaderId" : null,
									"name" : "",
									"type" : "",
									"issuesolutioncategorymap" : "",
									"usergroup" : {
										"userGroupId" : null,
										"name" : ""
									},

									"bscode" : "",
									"active" : "",
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