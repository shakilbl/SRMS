/* Service Code */
'use strict';
 

	App.factory('SmsService', ['$http', '$q','url', function($http, $q,url){
		
 
    return {
         
            fetchAllSmsTemplates: function() {
                  //  return $http.get('http://localhost:8097/CTMS/smstemplate/')
                     return $http.get(url+'smstemplate/') 
                  

                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while fetching sms template');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            createSms: function(smsid){
                 // return $http.post('http://localhost:8097/CTMS/smstemplate/', smsid)
                  return $http.post(url+'smstemplate/', smsid)
                                              .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while creating smstemplate template');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            updateSms: function(smstemplate, id){
                   // return $http.put('http://localhost:8097/CTMS/smstemplate/'+id, smstemplate)
            	return $http.put(url+'smstemplate/'+id, smstemplate)
            	
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while updating smstemplate template');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            deleteSms: function(id){
            	// return $http.delete('http://localhost:8097/CTMS/smstemplate/'+id)
            	  return $http.delete(url+'smstemplate/'+id)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while deleting smstemplate template');
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
				'SmsController',
				[
						'$scope',
						'$timeout',
						'SmsService','NgTableParams',
						function($scope, $timeout, SmsService,NgTableParams) {
							var self = this;
							self.smstemplate = {
								    "smsid": null,								    
								    "body": "",
								    "flag": "",
								    "createdby": "",
								    "creationdate": null,
								    "updatedby": "",
								    "updateddate": null							    								    
								  };
							self.smss = [];
							self.successMessages=null;
							self.errorMessages=null;
							
							self.fetchAllSmsTemplates = function() {
								SmsService
										.fetchAllSmsTemplates()
										.then(
												function(d) {
													self.smss = d;
													var data = d;
													self.tableParams = new NgTableParams({}, { dataset: data});
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching smstemplate template');
												});
							};

							self.createSms = function(smstemplate) {
								SmsService
										.createSms(smstemplate)
										.then(
												function(d) {
													self.showSuccessMessage(d.message);
													self.fetchAllSmsTemplates();
												},
												function(errResponse) {
													self.showErrorMessage(errResponse.data.message);
													console
															.error('Error while creating smstemplate template.');
													
												});
							};

							self.updateSms = function(smstemplate, smsid) {
								SmsService
										.updateSms(smstemplate, smsid)
										.then(
												function(d) {
													self.showSuccessMessage("Data saved successfully.");
													self.fetchAllSmsTemplates();
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Save Data, Please try again.");
													console
															.error('Error while updating smstemplate template.');
												});
							};

							self.deleteSms = function(smsid) {
								SmsService
										.deleteSms(smsid)
										.then(
												function(d) {
													self.showSuccessMessage("Data deleted successfully.");
													self.fetchAllSmsTemplates();
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Delete Data, Please try again.");
													console
															.error('Error while deleting smstemplate template.');
												});
							};

							self.fetchAllSmsTemplates();

							self.submit = function() {
								 if(self.smstemplate.smsid===null){
					                  console.log('Saving New SMS template', self.smstemplate);    
					                  self.createSms(self.smstemplate);
					              }else{
					                  self.updateSms(self.smstemplate, self.smstemplate.smsid);
					                  console.log('SMS Template updated with id ', self.smstemplate.smsid);
					              }
					              self.reset();
					              
					              /* Close The form Modal now */
					              $('#myModal').modal('hide');
					                  
							};
							
							/*Load vipnumber to be edited in self.vipnumber object*/
							self.edit = function(smsid) {
								console.log('id to be edited', smsid);
								for (var i = 0; i < self.smss.length; i++) {
									if (self.smss[i].smsid === smsid) {
										self.smstemplate = angular.copy(self.smss[i]);
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
							
							/* delete after SMS pressed OK in modal */
							self.remove = function() {
								console.log('id to be deleted', self.smstemplate.smsid);
								self.deleteSms(self.smstemplate.smsid);
								self.reset();
							};

							self.reset = function() {
								self.smstemplate = {
									    "smsid": null,								    
									    "body": "",
									    "flag": "",
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