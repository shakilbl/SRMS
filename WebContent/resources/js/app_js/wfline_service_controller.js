/* Service Code */
'use strict';
App.factory('WflineService', ['$http','$q','url', function($http, $q, url){ 

 
    return {
         
            fetchAllWflines: function() {
                   // return $http.get('http://localhost:8097/CTMS/wfline/')
                    	 return $http.get(url+'wfline/')
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while fetching workflow line');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
            
            fetchAllWfheader: function() {
                //return $http.get('http://localhost:8097/CTMS/FetchAllWfheader/')
            	 return $http.get(url+'FetchAllWfheader/')
                        .then(
                                function(response){
                                    return response.data;
                                }, 
                                function(errResponse){
                                    console.error('Error while fetching workflow line');
                                    return $q.reject(errResponse);
                                }
                        );
                },
             
            fetchAllUserGroup: function() {
                //return $http.get('http://localhost:8097/CTMS/FetchAllUserGroup/')
            	 return $http.get(url+'FetchAllUserGroup/')
                        .then(
                                function(response){
                                    return response.data;
                                }, 
                                function(errResponse){
                                    console.error('Error while fetching workflow line');
                                    return $q.reject(errResponse);
                                }
                        );
                },
             
            createWfline: function(Wfline){
                   // return $http.post('http://localhost:8097/CTMS/wfline/', Wfline)
            	 return $http.post(url+'wfline/', Wfline)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while creating workflow line');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            updateWfline: function(wfline, id){
                   // return $http.put('http://localhost:8097/CTMS/wfline/'+id, wfline)
            	return $http.put(url+'wfline/'+id, wfline)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while updating workflow line');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            deleteWfline: function(id){
                   // return $http.delete('http://localhost:8097/CTMS/wfline/'+id)
            	return $http.delete(url+'deletewfline/'+id)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while deleting workflow line');
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
				'WflineController',
				[
						'$scope',
						'$timeout',
						'WflineService','UsergrpService','NgTableParams',
						function($scope, $timeout, WflineService,UsergrpService,NgTableParams) {
							var self = this;
							self.Wfline = {
								    "wflineId": null,
								    "wfheader":{
								    	"wfheaderId":null,
								    	"name":""
								    	    },
								    "usergroup": {
								    	"userGroupId":null,
								    	"name":""
								    	    },
								    "lineNo": null,
								    "descriptions": "",
								    "createdby": "",
								    "createddate": null,
								    "Updatedby": "",
								    "Updateddate": null
								  };
							
							
							self.usergroup = {
								    "userGroupId": null,
								    "name": "",
							};
							self.wfheader = {
								    "wfheaderId": null,
								    "name": "",
							};
					
								self.item = {
									    "wfheaderId": null,
									    "Name": null
									};
								self.item1 = {
									    "userGroupId": null,
									    "Name": null
									};
							
							self.wflines = [];
							self.successMessages=null;
							self.errorMessages=null;
							
							self.fetchAllWflines = function() {
								WflineService
										.fetchAllWflines()
										.then(
												function(d) {
													self.wflines = d;
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
								UsergrpService
										.fetchAllUsers()
										.then(
												function(d) {
													self.usergroup = d;
													console.log("UserGroup value: "+d);
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};
							
							
							self.fetchAllUserGroup = function() {
								WflineService
										.fetchAllUserGroup()
										.then(
												function(ugdata) {
													//self.usergroup = ugdata;
													self.Y = ugdata;
													self.usergroup = [];

													for(var i = 0; i< self.Y.length; i++){
														if(self.Y[i].active.toLowerCase()=="yes")
															self.usergroup.push(self.Y[i]);
													}
													
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};
							
							self.fetchAllWfheader = function() {
								WflineService
										.fetchAllWfheader()
										.then(
												function(wfdata) {
													//self.wfheader = wfdata;
													
													self.X = wfdata;
													self.wfheader = [];

													for(var i = 0; i< self.X.length; i++){
														if(self.X[i].active.toLowerCase()=="yes")
															self.wfheader.push(self.X[i]);
													}
													
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};

							self.createWfline = function(Wfline) { console.log("WFLINE: "+Wfline);
								WflineService
										.createWfline(Wfline)
										.then(
												function(d) {
													self.showSuccessMessage(d.message);
													self.fetchAllWflines();
												},
												function(errResponse) {
													self.showErrorMessage(errResponse.data.message);
													console
															.error('Error while creating workflow line.',errResponse.status);
													
												});
							};

							self.updateWfline = function(Wfline, wflineId) {
								WflineService
										.updateWfline(Wfline, wflineId)
										.then(
												function(d) {
													self.showSuccessMessage("Data saved successfully.");
													self.fetchAllWflines();
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Save Data, Please try again.");
													console
															.error('Error while updating workflow line.');
												});
							};

							self.deleteWfline = function(wflineId) {
								WflineService
										.deleteWfline(wflineId)
										.then(
												function(d) {
													self.showSuccessMessage("Data deleted successfully.");
													self.fetchAllWflines();
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Delete Data, Please try again.");
													console
															.error('Error while deleting workflow line.');
												});
							};

							self.fetchAllWflines();
							
							self.fetchAllUserGroup();
							
							self.fetchAllWfheader();
							
							//self.fetchAllUsers();
						

							self.submit = function() {
								console.log("Inside submit method");
								
								self.Wfline.wfheader.wfheaderId=self.item.wfheaderId;
								self.Wfline.usergroup.userGroupId=self.item1.userGroupId;
								
								 if(self.Wfline.wflineId===null){
					                  console.log('Saving New workflow line', self.Wfline);    
					                  self.createWfline(self.Wfline);
					              }else{
					                  self.updateWfline(self.Wfline, self.Wfline.wflineId);
					                  console.log('Workflow line updated with id ', self.Wfline.wflineId);
					              }
					              self.reset();
					              
					              /* Close The form Modal now */
					              $('#myModal').modal('hide');
					                  
							};
							
							/*Load workflow line to be edited in self.wfline object*/
							self.edit = function(wflineId) {
								console.log('id to be edited', wflineId);
								for (var i = 0; i < self.wflines.length; i++) {
									if (self.wflines[i].wflineId === wflineId) {
										self.Wfline = angular.copy(self.wflines[i]);
										self.item = {
											    "wfheaderId": self.wflines[i].wfheader.wfheaderId,
											    "name": self.wflines[i].wfheader.name
											};
										self.item1 = {
											    "userGroupId": self.wflines[i].usergroup.userGroupId,
											    "name": self.wflines[i].usergroup.name
											};
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
								console.log('id to be deleted', self.Wfline.wflineId);
								self.deleteWfline(self.Wfline.wflineId);
								self.reset();
							};

							self.reset = function() {
								self.Wfline = {
									    "wflineId": null,
									    "wfheader":{
									    	"wfheaderId":null,
									    	
									    	    },
									    "usergroup": {
									    	"userGroupId":null,
									    	    },
									    "lineNo": null,
									    "descriptions": "",
									    "createdby": "",
									    "createddate": null,
									    "Updatedby": "",
									    "Updateddate": null
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