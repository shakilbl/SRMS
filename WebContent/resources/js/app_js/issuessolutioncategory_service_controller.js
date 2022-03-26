//angular service area
'use strict';
App.factory('UserService', ['$http', '$q','url', function($http, $q,url){


    return {
    	
            fetchAllIssueSolutionCategory: function() { 
                    return $http.get(url+'IssueSolutionCategory/')
                            .then(
                                    function(response){
                                        return response.data;                                       
                                    }, 
                                    function(errResponse){
                                        console.error('Error while fetching issue&solution category');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
            
            createIssueSolutionCategory: function(Issuesolutioncategory){
                    return $http.post(url+'CreateIssueSolutionCategory/', Issuesolutioncategory)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while creating issue&solution category');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            updateIssueSolutionCategory: function(IssuesSolutionCategory, id){
                    return $http.put(url+'UpdateIssueSolutionCategory/'+id, IssuesSolutionCategory)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while updating issue&solution category');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
           /* deleteIssueSolutionCategory: function(id){
                    return $http.delete(url+'DeleteIssueSolutionCategory/'+id)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while deleting IssueSolution category');
                                        return $q.reject(errResponse);
                                    }
                            );
            }
         */
    };
 
}]);




// angular controller area
'use strict';
App
		.controller(
				'UserController',
				[
						'$scope',
						'$timeout',
						'UserService','NgTableParams',
						function($scope,$timeout, UserService,NgTableParams) {
							var self = this;
							self.IssuesSolutionCategory = {
								    "issueSolutionCategoryId": null,
								    "name": "",
								    "active": "Yes",
								    "createdby": "",
								    "creationdate": null,
								    "updatedby": "",
								    "updateddate": null
								  };
							self.IssuesSolutionCategorys = [];
							self.alert = { type: '', msg: '' };
							
							self.fetchAllIssueSolutionCategory = function() {
								UserService
										.fetchAllIssueSolutionCategory()
										.then(
												function(d) {
													self.IssuesSolutionCategorys = d;
													var data = d;
													self.tableParams = new NgTableParams({}, { dataset: data});	
												},
												function(errResponse) {
													console
															.error('Error while fetching Currencies');
												});
							};

						/*	self.createIssueSolutionCategory = function(IssuesSolutionCategory) {
								
								UserService
										.createIssueSolutionCategory(IssuesSolutionCategory)
										.then(
												function(d) {
													self.showSuccessMessage(d.message);
													self.fetchAllIssueSolutionCategory();
												},
												function(errResponse) {
													self.showErrorMessage(errResponse.data.message);
													console
															.error('Error while creating IssuesSolution category.');
												});
							};
*/
							self.updateIssueSolutionCategory = function(IssuesSolutionCategory, issueSolutionCategoryId) {
								console.log("Issue Solution Category updated successfully");
								UserService
										.updateIssueSolutionCategory(IssuesSolutionCategory, issueSolutionCategoryId)
										.then(
												function(d) {
													self.showSuccessMessage("Data Updated successfully.");
													self.fetchAllIssueSolutionCategory();
												},
												function(errResponse) {
													console
															.error('Error while updating IssuesSolutionCategory.');
												});
							};
/*
							self.deleteIssueSolutionCategory = function(issueSolutionCategoryId) {
								UserService
										.deleteIssueSolutionCategory(issueSolutionCategoryId)
										.then(
												function(d) {
													self.showSuccessMessage("Data deleted successfully.");
													self.fetchAllIssueSolutionCategory();
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Delete(may be due to contraints), Please contact adminstrator.");
													console
															.error('Error while deleting issueSolutionCategory.');
												});
							};
							*/
							self.fetchAllIssueSolutionCategory();


							self.submit = function() {
								console.log('self.IssuesSolutionCategory.issueSolutionCategoryId: ', self.IssuesSolutionCategory.issueSolutionCategoryId);
								if (self.IssuesSolutionCategory.issueSolutionCategoryId === null) {
									console.log('Saving New IssuesSolutionCategory', self.IssuesSolutionCategory);
									self.createIssueSolutionCategory(self.IssuesSolutionCategory);
								} else {
								
										
									 self.updateIssueSolutionCategory(self.IssuesSolutionCategory, self.IssuesSolutionCategory.issueSolutionCategoryId);
											console.log('Issue Solution category updated with id ', self.IssuesSolutionCategory.issueSolutionCategoryId);
									
								
								}
								self.reset();
								   $('#myModal').modal('hide');
							};

							self.edit = function(issueSolutionCategoryId) { 
								console.log('id to be edited', issueSolutionCategoryId);
								
								for (var i = 0; i < self.IssuesSolutionCategorys.length; i++) {
									if (self.IssuesSolutionCategorys[i].issueSolutionCategoryId === issueSolutionCategoryId) {
										self.IssuesSolutionCategory = angular.copy(self.IssuesSolutionCategorys[i]);
										break;
									}
								}
							};

							/* delete after user pressed OK in modal */
							self.remove = function() {
								console.log('IssuesSolutionCategory id will be deleted: ', self.IssuesSolutionCategory.issueSolutionCategoryId);
								self.deleteIssueSolutionCategory(self.IssuesSolutionCategory.issueSolutionCategoryId);
								self.reset();
							};

							self.reset = function() {
								self.IssuesSolutionCategory = {
									    "issueSolutionCategoryId": null,
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
												
							
							self.successAlert = function() {
								console.log('Success alert method called');
								self.alert= { type: 'alert alert-success', msg: 'Well done! You successfully read this important alert message.' };
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




