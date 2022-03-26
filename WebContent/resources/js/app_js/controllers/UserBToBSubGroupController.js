/* Controller Code */
App
		.controller(
				'UserBToBController',
				[
						'$scope',
						'$timeout',
						'UserBtoBService',
						'UsergrpService',
						'NgTableParams',
						function($scope, $timeout, UserBtoBService,
								UsergrpService, NgTableParams) {
							var self = this;
							self.userbtobsubgroup = {
								"userBtobsubGroupId" : null,

								"usergroupByMainUserGroupId" : {
									"userGroupId" : null,
									"name" : ""
								},
								"usergroupByUserSubGroupId" : {
									"userGroupId" : null,
									"name" : ""

								},
								"active" : "Yes"

							};

							self.userbtobs = [];

							self.successMessages = null;
							self.errorMessages = null;
							self.item = {
								"userGroupId" : null,
								"name" : null
							};
							self.item1 = {
								"userGroupId" : null,
								"name" : null
							};
							self.X = [];

							self.fetchAllUserBToB = function() {
								UserBtoBService
										.fetchAllUserBToB()
										.then(
												function(d) {
													self.userbtobs = d;
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

							self.fetchAllUsers = function() {
								UsergrpService
										.fetchAllUsers()
										.then(
												function(d) {
													// self.UserGroup = d;
													self.X = d;
													self.UserGroup = [];

													for (var i = 0; i < self.X.length; i++) {
														if (self.X[i].active
																.toLowerCase() == "yes")
															self.UserGroup
																	.push(self.X[i]);
													}
												},
												function(errResponse) {
													self
															.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};

							self.createUserBtoB = function(userbtobsubgroup) {
								UserBtoBService
										.createUserBtoB(userbtobsubgroup)
										.then(
												function(d) {
													self
															.showSuccessMessage(d.message);
													self.fetchAllUserBToB();
												},
												function(errResponse) {
													self
															.showErrorMessage(errResponse.data.message);
													console
															.error('Error while creating user.');

												});
							};

							self.updateUserBtoB = function(userbtobsubgroup,
									userBtobsubGroupId) {
								console
										.log("Insie updateUserBToBGroup function");
								UserBtoBService
										.updateUserBtoB(userbtobsubgroup,
												userBtobsubGroupId)
										.then(
												function(d) {
													self
															.showSuccessMessage("Data saved successfully.");
													self.fetchAllUserBToB();
												},
												function(errResponse) {
													self
															.showErrorMessage("Failed to Save Data, Please try again.");
													console
															.error('Error while updating userbtobsubgroup.');
												});
							};

							self.deleteuserbtob = function(userBtobsubGroupId) {
								UserBtoBService
										.deleteuserbtob(userBtobsubGroupId)
										.then(
												function(d) {
													self
															.showSuccessMessage("Data deleted successfully.");
													self.fetchAllUserBToB();
												},
												function(errResponse) {
													self
															.showErrorMessage("Failed to Delete Data, Please try again.");
													console
															.error('Error while deleting userbtobsubgroup.');
												});
							};

							self.fetchAllUserBToB();
							self.fetchAllUsers();

							self.submit = function() {
								console.log("Insie submit method");
								self.userbtobsubgroup.usergroupByMainUserGroupId.userGroupId = self.item.userGroupId;
								self.userbtobsubgroup.usergroupByUserSubGroupId.userGroupId = self.item1.userGroupId;
								if (self.userbtobsubgroup.userBtobsubGroupId === null) {
									console.log('Saving New userbtobsubgroup',
											self.item.userGroupId);

									self.createUserBtoB(self.userbtobsubgroup);

									;

								} else {
									self
											.updateUserBtoB(
													self.userbtobsubgroup,
													self.userbtobsubgroup.userBtobsubGroupId);
									console
											.log(
													'userbtobsubgroup updated with id ',
													self.userbtobsubgroup.userBtobsubGroupId);
								}
								self.reset();

								/* Close The form Modal now */
								$('#myModal').modal('hide');

							};

							/* Load user to be edited in self.user object */
							self.edit = function(userBtobsubGroupId) {
								console.log("Insie edit method");
								console.log('id to be edited',
										userBtobsubGroupId);
								for (var i = 0; i < self.userbtobs.length; i++) {
									if (self.userbtobs[i].userBtobsubGroupId === userBtobsubGroupId) {
										self.userbtobsubgroup.usergroupByMainUserGroupId.userGroupId = self.item.userGroupId;
										self.userbtobsubgroup.usergroupByUserSubGroupId.userGroupId = self.item1.userGroupId;
										self.userbtobsubgroup = angular
												.copy(self.userbtobs[i]);

										self.item = {
											"userGroupId" : self.userbtobs[i].usergroupByMainUserGroupId.userGroupId,
											"name" : self.userbtobs[i].usergroupByMainUserGroupId.name
										};
										self.item1 = {
											"userGroupId" : self.userbtobs[i].usergroupByUserSubGroupId.userGroupId,
											"name" : self.userbtobs[i].usergroupByUserSubGroupId.name
										};
										self.Y = [];
										for (var j = 0; j < self.X.length; j++) {
											if (self.X[j].userGroupId != self.item.userGroupId)
												self.Y.push(self.X[j]);
										}
										break;
									}
								}
							};

							/* delete after user pressed OK in modal */
							self.remove = function() {
								console
										.log(
												'id to be deleted',
												self.userbtobsubgroup.userBtobsubGroupId);
								self
										.deleteuserbtob(self.userbtobsubgroup.userBtobsubGroupId);
								self.reset();
							};

							self.reset = function() {
								self.userbtobsubgroup = {
									"userBtobsubGroupId" : null,

									"usergroupByMainUserGroupId" : {
										"userGroupId" : null,
										"name" : ""
									},
									"usergroupByUserSubGroupId" : {
										"userGroupId" : null,
										"name" : ""

									},
									"active" : ""

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

							$scope.slatask = function(x) {
								// alert(x);
								self.Y = [];
								for (var i = 0; i < self.UserGroup.length; i++) {
									if (self.UserGroup[i].userGroupId != x)
										self.Y.push(self.UserGroup[i]);
								}
								/*
								 * self.UserGroup1 = []; for (var i = 0; i <
								 * self.UserGroup.length; i++) { if
								 * (self.UserGroup[i].userGroupId != x)
								 * self.UserGroup1.push(self.UserGroup[i]); }
								 */
							}

						} ]);
/* End of Controller Code */