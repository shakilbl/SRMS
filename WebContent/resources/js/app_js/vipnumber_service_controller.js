/* Service Code */
'use strict';


	App.factory('UserService', ['$http', '$q', 'url',function($http, $q, url){
    return {
         
            fetchAllUsers: function() {
                    //return $http.get('http://localhost:8080/CTMS/vipnumber/')
            	 return $http.get(url+'vipnumber/') 
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while fetching users');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            createVipnumber: function(vipnumberId){
                   // return $http.post('http://localhost:8080/CTMS/vipnumber/', vipnumber)
            	return $http.post(url+'vipnumber/', vipnumberId)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while creating vipnumber');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            updateUser: function(vipnumber, id){
                  //  return $http.put('http://localhost:8080/CTMS/vipnumber/'+id, vipnumber)
            	return $http.put(url+'vipnumber/'+id, vipnumber)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while updating vipnumber');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            deleteUser: function(id){
                    //return $http.delete('http://localhost:8080/CTMS/vipnumber/'+id)
            	 return $http.delete(url+'vipnumber/'+id)
            	
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while deleting vipnumber');
                                        return $q.reject(errResponse);
                                    }
                            );
            }
         
    };
 
}]);
/* End of Service Code */


/* Controller Code */
App
		.controller(
				'UserController',
				[
						'$scope',
						'$timeout',
						'UserService','NgTableParams',
						function($scope, $timeout, UserService,NgTableParams) {
							var self = this;
							self.vipnumber = {
								    "vipnumberId": null,
								    "msisdn": "",
								    "active": "Yes",
								    "createdby": "",
								    "creationdate": null,
								    "updatedby": "",
								    "updateddate": null
								  };
							self.vipnumbers = [];
							self.successMessages=null;
							self.errorMessages=null;
							
							self.fetchAllUsers = function() {
								UserService
										.fetchAllUsers()
										.then(
												function(d) {
													self.vipnumbers = d;
													var data = d;
													self.tableParams = new NgTableParams({}, { dataset: data});
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};

							self.createVipnumber = function(vipnumber) {
								UserService.createVipnumber(vipnumber).then(
												function(d) {
													self.showSuccessMessage(d.message);
													self.fetchAllUsers();
												},
												function(errResponse) {
													self.showErrorMessage(errResponse.data.message);
													console.error('Error while creating vipnumber.',errResponse.status);
													
												});
							};

							self.updateUser = function(vipnumber, vipnumberId) {
								UserService
										.updateUser(vipnumber, vipnumberId)
										.then(
												function(d) {
													self.showSuccessMessage("Data saved successfully.");
													self.fetchAllUsers();
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Save Data, Please try again.");
													console
															.error('Error while updating vipnumber.');
												});
							};

							self.deleteUser = function(vipnumberId) {
								UserService
										.deleteUser(vipnumberId)
										.then(
												function(d) {
													self.showSuccessMessage("Data deleted successfully.");
													self.fetchAllUsers();
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Delete Data, Please try again.");
													console
															.error('Error while deleting vipnumber.');
												});
							};

							self.fetchAllUsers();

							self.submit = function() {
								 if(self.vipnumber.vipnumberId===null){
					                  console.log('Saving New Vipnumber', self.vipnumber);    
					                  self.createVipnumber(self.vipnumber);
					              }else{
					                  self.updateUser(self.vipnumber, self.vipnumber.vipnumberId);
					                  console.log('Vipnumber updated with id ', self.vipnumber.vipnumberId);
					              }
					              self.reset();
					              
					              /* Close The form Modal now */
					              $('#myModal').modal('hide');
					                  
							};
							
							/*Load vipnumber to be edited in self.vipnumber object*/
							self.edit = function(vipnumberId) {
								console.log('id to be edited', vipnumberId);
								for (var i = 0; i < self.vipnumbers.length; i++) {
									if (self.vipnumbers[i].vipnumberId === vipnumberId) {
										self.vipnumber = angular.copy(self.vipnumbers[i]);
										break;
									}
								}
							};
							
							/*Original Delete code that does not support modal confirmation*/
							/*self.remove = function(vipnumberId) {
								console.log('id to be deleted', vipnumberId);
								if (self.vipnumber.vipnumberId === vipnumberId) { 	
									
									 * clean form if the vipnumber to be deleted
									 * is shown there.
									 
									self.reset();
								}
								self.deleteUser(vipnumberId);
							};*/
							
							/* delete after user pressed OK in modal */
							self.remove = function() {
								console.log('id to be deleted', self.vipnumber.vipnumberId);
								self.deleteUser(self.vipnumber.vipnumberId);
								self.reset();
							};

							self.reset = function() {
								self.vipnumber = {
									    "vipnumberId": null,
									    "msisdn": "",
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