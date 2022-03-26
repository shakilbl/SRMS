App
		.controller(
				'ISCFMController',
				[
						'$scope',
						'$timeout',
						'ISCFMService','NgTableParams',
						function($scope, $timeout, ISCFMService,NgTableParams) {

							var self = this;
							self.issuesolutioncategoryfieldmap = {
								"issueSolutionCategoryFieldMapId" : null,
													
								"issuesolutioncategorymap":"",	
								"severity" : "",
								
								"componentType" : "",

								"problemPlatform" : "",
								"ticketType" : "",
								"actionTaken" : null,
								"faultImpact" : "",
								"active":""
								
							};
							self.issuesolutioncategorymap = {
								"issueSolutionCategoryMapId" : null

							};

							self.item3 = null;
							self.item1 = null;
							self.item2 = null;
							
							self.iscfm = [];
							self.issuesolutioncategorymaps = [];
							
							self.successMessages = null;
							self.errorMessages = null;

							self.fetchAllICFM = function() {
								ISCFMService
										.fetchAllICFM()
										.then(
												function(d) {
													self.iscfm = d;
													var data = d;
													self.tableParams = new NgTableParams({}, { dataset: data});

												},
												function(errResponse) {
													console
															.error('Error while fetching Currencies');
												});
							};

							self.fetchAllicscmap = function() {
								ISCFMService
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

							
							self.createISCFM = function(issuesolutioncategoryfieldmap) {
								ISCFMService
										.createISCFM(issuesolutioncategoryfieldmap)
										.then(
												function(d) {
													self
													.showSuccessMessage(d.message);
												
													self.fetchAllICFM();
												},
												function(errResponse) {
													self
															.showErrorMessage(errResponse.data.message);
													console
															.error('Error while creating Work Flow Header.');

												});
							};

							self.updateISCFM = function(issuesolutioncategoryfieldmap, issueSolutionCategoryFieldMapId) {
											ISCFMService
										.updateISCFM(issuesolutioncategoryfieldmap, issueSolutionCategoryFieldMapId)
										.then(
												function(d) {
													self
															.showSuccessMessage("Data saved successfully.");
													self.fetchAllICFM();
												},
												function(errResponse) {
													self
															.showErrorMessage("Failed to Save Data, Please try again.");
													console
															.error('Error while updating WF Header.');
												});
							};

							self.deleteISCFM = function(issueSolutionCategoryFieldMapId) {
								ISCFMService
										.deleteISCFM(issueSolutionCategoryFieldMapId)
										.then(
												function(d) {
													self
															.showSuccessMessage("Data deleted successfully.");
													self.fetchAllICFM();
												},
												function(errResponse) {
													self
															.showErrorMessage("Failed to Delete Data, Please try again.");
													console
															.error('Error while deleting user.');
												});
							};

							self.fetchAllICFM();
							self.fetchAllicscmap();
				

						self.submit = function() {
								
								if (self.issuesolutioncategoryfieldmap.issueSolutionCategoryFieldMapId === null) {
									/*console.log('Saving New ISCFM',
											self.issuesolutioncategoryfieldmap);*/
									self.createISCFM(self.issuesolutioncategoryfieldmap);
								} else {
									console.log(self.issuesolutioncategoryfieldmap);
									self.updateISCFM(self.issuesolutioncategoryfieldmap,
											self.issuesolutioncategoryfieldmap.issueSolutionCategoryFieldMapId);
									console
											.log(
													'ISCFM with id ',
													self.issuesolutioncategoryfieldmap.issueSolutionCategoryFieldMapId);
								}
								self.reset();

								// Close The form Modal now 
								$('#myModal').modal('hide');

							};

							//Load user to be edited in self.user object

							self.edit = function(issueSolutionCategoryFieldMapId) {
								document.getElementById("iscm").style.visibility  = "hidden";
								document.getElementById("liscm").style.visibility  = "hidden";
								
								document.getElementById("current").disabled   = false;
								document.getElementById("current1").disabled   = false;
								document.getElementById("current").style.visibility  = "visible";
								document.getElementById("current1").style.visibility  = "visible";
							
								for (var i = 0; i < self.iscfm.length; i++) {
									if (self.iscfm[i].issueSolutionCategoryFieldMapId === issueSolutionCategoryFieldMapId) {
										this.issuesolutioncategoryfieldmap = angular
												.copy(self.iscfm[i]);
										self.item1 = self.iscfm[i].issuesolutioncategorymap.issuesolutioncategory.name;
										self.item2 = self.iscfm[i].issuesolutioncategorymap.issuesolution.name;
										self.l = {
												issueSolutionCategoryMapId : 
													self.issuesolutioncategoryfieldmap.issuesolutioncategorymap.issueSolutionCategoryMapId,
												name : null
											};
										console.log("sdffiasfbai: ",self.item1);
										
										self.item3 = self.item1+"_"+self.item2;
										
										
										break;
									}
								}

//								console.log("issuesolutioncategoryfieldmap.usergroup.userGroupId: "
//										+ this.issuesolutioncategoryfieldmap.usergroup.userGroupId);
//
//								self.usergroup.userGroupId = this.issuesolutioncategoryfieldmap.usergroup.userGroupId;
//								$scope.FirstCtrl.userGroupId = this.issuesolutioncategoryfieldmap.usergroup.name;

							};
							self.toggle = function(){
								//	document.getElementById("iscm").disabled   = false;
								document.getElementById("liscm").disabled   = false;
								document.getElementById("iscm").style.visibility  = "visible";
								document.getElementById("liscm").style.visibility  = "visible";
								
								document.getElementById("current").disabled  = true;
								document.getElementById("current1").disabled  = true;
								document.getElementById("current").style.visibility  = "hidden";
								document.getElementById("current1").style.visibility  = "hidden";
									
									
								
									
								}

							self.remove = function() {
								console.log('id to be deleted',
										self.issuesolutioncategoryfieldmap.issueSolutionCategoryFieldMapId);
								self.deleteISCFM(self.issuesolutioncategoryfieldmap.issueSolutionCategoryFieldMapId);
								self.reset();
							};

							self.reset = function() {
							self.issuesolutioncategoryfieldmap = {
								"issueSolutionCategoryFieldMapId" : null,
													
								"issuesolutioncategorymap":"",	
								"severity" : "",
								
								
								"componentType" : "",

								"problemPlatform" : "",
								"ticketType" : "",
								"actionTaken" : null,
								"faultImpact" : "",
								"active":""
								
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