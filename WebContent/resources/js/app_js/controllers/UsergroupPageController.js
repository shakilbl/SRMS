


/* Controller Code */
App
		.controller(
				'UserPageController',
				[
						'$scope',
						'$timeout',
						'UserPageService',
						function($scope, $timeout, UserPageService) {
							var self = this;
							self.usergrouppage = {
								    "userGroupPageId": null,
								    "name": "",
								    "active": "",
								    
								  };

							
							self.userpages = [];
			
							
							self.successMessages=null;
							self.errorMessages=null;
							
							self.fetchAllUserPage = function() {
								UserPageService
										.fetchAllUserPage()
										.then(
												function(d) {
													self.userpages = d;
													console.log("UserGroupPage content: "+self.userpages);
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};
							
							self.fetchAllUserPage();
							


							
						} ]);			
							