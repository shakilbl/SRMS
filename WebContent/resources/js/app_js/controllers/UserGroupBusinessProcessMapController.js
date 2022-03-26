App
		.controller(
				'UsergrpBuProMController',
				[
						'$scope',
						'$timeout',
						'BsGrpMapService',
						'NgTableParams',

						function($scope, $timeout, BsGrpMapService,
								NgTableParams) {
							var self = this;
							self.usergroupbusinessprocessmap = {
								"userGroupBusinessProcessId" : null,
								"businessprocess" : {
									"businessProcessId" : null,
									"name" : ""
								},
								"usergroup" : {
									"userGroupId" : null,
									"name" : ""
								},
								"active" : "Yes",
								"createdby" : "",
								"creationdate" : null,
								"updatedby" : "",
								"updateddate" : null
							};

							self.businessprocess = {

								"businessProcessId" : null,
								"name" : ""
							}

							self.usergroup = {
								"userGroupId" : null,
								"name" : ""

							}
							self.userBsGrps = [];
							self.businesspros = [];
							self.usergroups = [];

							self.successMessages = null;
							self.errorMessages = null;

							self.item = {
								"businessProcessId" : null,
								"name" : null
							};
							self.item1 = {
								"userGroupId" : null,
								"name" : null
							};
							self.fetchAllBsgroupmap = function() {
								BsGrpMapService
										.fetchAllBsgroupmap()
										.then(
												function(d) {
													self.userBsGrps = d;
													var data = d;
													self.tableParams = new NgTableParams(
															{}, {
																dataset : data
															});
												},
												function(errResponse) {
													self
															.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};

							self.fetchAllBusinessPro = function() {
								BsGrpMapService
										.fetchAllBusinessPro()
										.then(
												function(d) {
													self.businesspros = d;
													/*var data = d;
													self.tableParams = new NgTableParams(
															{}, {
																dataset : data
															});*/

												},
												function(errResponse) {
													self
															.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};

							self.fetchAllUsergroups = function() {
								BsGrpMapService
										.fetchAllUsergroups()
										.then(
												function(ddd) {
													self.usergroups = ddd;
													/*var data = ddd;
													self.tableParams = new NgTableParams(
															{}, {
																dataset : data
															});*/ // self.Y = ddd;
													// self.usergroups = [];

													/*
													 * for (var i = 0; i <
													 * self.Y.length; i++) { if
													 * (self.Y[i].active
													 * .toLowerCase() == "yes")
													 * self.usergroups
													 * .push(self.Y[i]); }
													 */
												},
												function(errResponse) {
													console
															.error('Error while fetching Currencies');
												});
							};

							self.CreateuserBsGrpmap = function(
									usergroupbusinessprocessmap) {

								BsGrpMapService
										.CreateuserBsGrpmap(
												usergroupbusinessprocessmap)
										.then(
												function(d) {
													self
															.showSuccessMessage("Data saved successfully.");
													self.fetchAllBsgroupmap();
												},
												function(errResponse) {
													self
															.showErrorMessage(errResponse.data.message);
													console
															.error('Error while creating  usergroupbusinessprocessmap.');

												});
							};

							self.updateuserBsGrps = function(
									usergroupbusinessprocessmap,
									userGroupBusinessProcessId) {
								BsGrpMapService
										.updateuserBsGrps(
												usergroupbusinessprocessmap,
												userGroupBusinessProcessId)
										.then(
												function(d) {
													self
															.showSuccessMessage("Data saved successfully.");
													self.fetchAllBsgroupmap();
												},

												function(errResponse) {
													self
															.showErrorMessage("Failed to Save Data, Please try again.");
													console
															.error('Error while  updating user and user group map.');
												});
							};

							self.deleteuserBsGrps = function(
									userGroupBusinessProcessId) {
								BsGrpMapService
										.deleteuserBsGrps(
												userGroupBusinessProcessId)
										.then(
												function(d) {
													self
															.showSuccessMessage("Data deleted successfully.");
													self.fetchAllBsgroupmap();
												},
												function(errResponse) {
													self
															.showErrorMessage("Failed to Delete Data, Please try again.");
													console
															.error('Error while deleting usergroupbusinessprocessmap.');
												});
							};

							self.fetchAllBsgroupmap();
							self.fetchAllBusinessPro();
							self.fetchAllUsergroups();

							self.submit = function() {
								self.usergroupbusinessprocessmap.businessprocess.businessProcessId = self.item.businessProcessId;
								self.usergroupbusinessprocessmap.usergroup.userGroupId = self.item1.userGroupId;

								if (self.usergroupbusinessprocessmap.userGroupBusinessProcessId === null) {
									console
											.log(
													'Saving New usergroupbusinessprocessmap',
													self.usergroupbusinessprocessmap);

									self.usergroupbusinessprocessmap.businessprocess.businessProcessId = self.item.businessProcessId;
									self.usergroupbusinessprocessmap.usergroup.userGroupId = self.item1.userGroupId;

									self
											.CreateuserBsGrpmap(self.usergroupbusinessprocessmap);
								} else {
									self
											.updateuserBsGrps(
													self.usergroupbusinessprocessmap,
													self.usergroupbusinessprocessmap.userGroupBusinessProcessId);
									console
											.log(
													'usergroupbusinessprocessmap updated with id ',
													self.usergroupbusinessprocessmap.userGroupBusinessProcessId);
								}
								self.reset();

								$('#myModal').modal('hide');

							};

							/*
							 * Load usergroupbusinessprocessmap to be edited in
							 * self.usergroupbusinessprocessmap object
							 */
							self.edit = function(userGroupBusinessProcessId) {

								console.log("Insie edit method");
								console.log('id to be edited',
										userGroupBusinessProcessId);
								for (var i = 0; i < self.userBsGrps.length; i++) {
									if (self.userBsGrps[i].userGroupBusinessProcessId === userGroupBusinessProcessId) {

										self.usergroupbusinessprocessmap = angular
												.copy(self.userBsGrps[i]);
										console
												.log(self.usergroupbusinessprocessmap.usergroup.userGroupId);

										self.item1 = {
											"userGroupId" : self.userBsGrps[i].usergroup.userGroupId,
											"name" : self.userBsGrps[i].usergroup.name
										};
										self.item = {
											"businessProcessId" : self.userBsGrps[i].businessprocess.businessProcessId,
											"name" : self.userBsGrps[i].businessprocess.name
										};
										break;
									}
								}
							};

							self.remove = function() {
								console
										.log(
												'id to be deleted',
												self.usergroupbusinessprocessmap.userGroupBusinessProcessId);
								self
										.deleteuserBsGrps(self.usergroupbusinessprocessmap.userGroupBusinessProcessId);
								self.reset();
							};

							self.reset = function() {
								self.usergroupbusinessprocessmap = {
									"userGroupBusinessProcessId" : null,
									"businessprocess" : {
										"businessProcessId" : null,
										"name" : ""
									},
									"usergroup" : {
										"userGroupId" : null,
										"name" : ""
									},
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