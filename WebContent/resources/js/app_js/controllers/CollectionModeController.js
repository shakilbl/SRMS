/*Controller*/
App
		.controller(
				'CollectionModeController',
				[
						'$scope',
						'$timeout',
						'CollectionModeService','NgTableParams',
						function($scope, $timeout, CollectionModeService,NgTableParams) {
							var self = this;
							self.collectionMode = {
								    "collectionModeId": null,
								    "name": "",
								    "active": "",
								    "createdBy": "",
								    "createdDate": null,
								    "updatedBy": "",
								    "updatedDate": null
								  };
							self.collection = [];
							self.successMessages=null;
							self.errorMessages=null;
							
							self.fetchAllCollectionMode = function() {
								CollectionModeService
										.fetchAllCollectionMode()
										.then(
												function(d) {
													self.collection = d;
													var data = d;
													self.tableParams = new NgTableParams({}, { dataset: data});	
											
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};

							self.fetchAllCollectionMode();
							self.createCollectionMode = function(collectionMode) {
								CollectionModeService
										.createCollcetionMOde(collectionMode)
										.then(
												function(d) {
													self.showSuccessMessage(d.message);
													self.fetchAllCollectionMode();
													self.showSuccessMessage("Data Insert successfully.");
												},
												function(errResponse) {
													self.showErrorMessage("Collection Mode Creation Failed.");
													console
															.error('Error while creating Collection Mode.');
													
												});
							};

						self.updateCollectionMode = function(collectionMode, collectionModeID) {
								console.log("Insie update Collection Mode function");
								CollectionModeService
										.updateCollectionMode(collectionMode, collectionModeID)
										.then(
												function(d) {
													self.showSuccessMessage("Data Edited successfully.");
													self.fetchAllCollectionMode();
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Save Data, Please try again.");
													console
															.error('Error while updating collection mode.');
												});
							};

							self.deleteCollectionMode = function(collectionModeID) {
								CollectionModeService
										.deleteCollectionMode(collectionModeID)
										.then(
												function(d) {
													self.showSuccessMessage("Data deleted successfully.");
													self.fetchAllCollectionMode();
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Delete Data, Please try again.");
													console
															.error('Error while deleting collection mode.');
												});
							};


							self.submit = function() {
								console.log("Insie submit method");
								 if(self.collectionMode.collectionModeId===null){
					                  console.log('Saving New Collection Mode', self.collectionMode);    
					                  self.createCollectionMode(self.collectionMode);
					              }else{
					                  self.updateCollectionMode(self.collectionMode, self.collectionMode.collectionModeId);
					                  console.log('Collcetion Mode updated with id ', self.collectionMode.collectionModeId);
					              }
					              self.reset();
					              
					              /* Close The form Modal now */
					              $('#myModal').modal('hide');
					                  
							};
							
							/*Load businessprocess to be edited in self.businessprocess object*/
							self.edit = function(collectionModeId) {
								

								console.log("Insie edit method");
								console.log('id to be edited', collectionModeId);
								for (var i = 0; i < self.collection.length; i++) {
									if (self.collection[i].collectionModeId === collectionModeId) {
										self.collectionMode = angular.copy(self.collection[i]);
										break;
									}
								}
							};
							
							

							/* delete after businessprocess pressed OK in modal */
							self.remove = function() {
								console.log('id to be deleted', self.collectionMode.collectionModeId);
								self.deleteCollectionMode(self.collectionMode.collectionModeId);
								self.reset();
							};

							self.reset = function() {
								self.collectionMode = {
									    "collectionModeId": null,
									    "name": "",
									    "active": "",
									    "createdBy": "",
									    "createdDate": null,
									    "updatedBy": "",
									    "updatedDate": null
									  };
								// reset Form
								self.myForm.$setPristine(); 
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