


/* Controller Code */
App
		.controller(
				'ThanaController',
				[
						'$scope',
						'$timeout',
						'ThanaService','NgTableParams',
						function($scope, $timeout, ThanaService,NgTableParams) {
							var self = this;
							self.thana = {
								    "thanaId": null,
								    "district":{ 
								    	"districtId": null,
									   
								          "name": "" 
								        	  },
								    "name": "",
								    "active": "Yes",
								    "createdby" : "",
									"creationdate" : null,
									"updatedby" : "",
									"updateddate" : null
								  };
							self.district={
									 "districtId": null,
									   
									    "name": ""
							};
							self.item={
									 "districtId": null,
									   
									    "Name": null
									
							};
							self.thanas = [];
							self.districts = [];
							self.successMessages=null;
							self.errorMessages=null;
							
							self.fetchAllThana = function() {
								ThanaService
										.fetchAllThana()
										.then(
												function(d) {
													self.thanas = d;
													var data = d;
													self.tableParams = new NgTableParams({}, { dataset: data});
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Load Data, Please try again.");
													console
															.error('Error while fetching Currencies');
												});
							};
							fetchAllDistrict= function() {
								ThanaService
								.fetchAllDistrict()
								.then(
										function(d) {
											//self.districts = d;
											self.X = d;
											self.districts = [];
											//console.log("District ID: "+self.districts[1]);

											for(var i = 0; i< self.X.length; i++){
												if(self.X[i].active.toLowerCase()=="yes")
													self.districts.push(self.X[i]);
											}
										},
										function(errResponse) {
											self.showErrorMessage("Failed to Load Data, Please try again.");
											console
													.error('Error while fetching Currencies');
										});
					};

							self.createThana = function(thana) { console.log(thana)
								ThanaService
										.createThana(thana)
										.then(
												function(d) {
													self.showSuccessMessage(d.message);
													self.fetchAllThana();
												},
												function(errResponse) {
													self.showErrorMessage(errResponse.data.message);
													console
															.error('Error while creating Thana.');
													
												});
							};

						self.updateThana = function(thana, thanaId) {
								console.log("Insie update thana function");
								ThanaService
										.updateThana(thana, thanaId)
										.then(
												function(d) {
													self.showSuccessMessage("Data saved successfully.");
													self.fetchAllThana();
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Save Data, Please try again.");
													console
															.error('Error while updating Thana.');
												});
							};

							self.deleteThana = function(ThanaId) {
								ThanaService
										.deleteThana(ThanaId)
										.then(
												function(d) {
													self.showSuccessMessage("Data deleted successfully.");
													self.fetchAllThana();
												},
												function(errResponse) {
													self.showErrorMessage("Failed to Delete Data, Please try again.");
													console
															.error('Error while deleting Thana.');
												});
							};

							self.fetchAllThana();
							fetchAllDistrict();

							self.submit = function() {
								console.log("Insie submit method");
								self.thana.district.districtId=self.item.districtId;
								
								 if(self.thana.thanaId===null){
					                  console.log('Saving New Thana'+self.thana);    
					                  self.createThana(self.thana);
					              }else{
					                  self.updateThana(self.thana, self.thana.thanaId);
					                  console.log('Thana updated with id ', self.thana.thanaId);
					              }
					              self.reset();
					              
					              /* Close The form Modal now */
					              $('#myModal').modal('hide');
					                  
							};
							
							/*Load Thana to be edited in self.Thana object*/
							self.edit = function(thanaId) {
								console.log("Insie edit method");
								console.log('id to be edited', thanaId);
								for (var i = 0; i < self.thanas.length; i++) {
									if (self.thanas[i].thanaId === thanaId) {
										self.thana = angular.copy(self.thanas[i]);
										
										self.item = {
											    "districtId": self.thanas[i].district.districtId,
											    "Name": self.thanas[i].district.name
											};
										break;
									}
								}
							};
							

							/* delete after Thana pressed OK in modal */
							self.remove = function() {
								console.log('id to be deleted', self.thana.thanaId);
								self.deleteThana(self.thana.thanaId);
								self.reset();
							};

							self.reset = function() {
								self.thana = {
									    "thanaId": null,
									    "district":{ 
									    	"districtId": null,
										   
									          "name": "" 
									        	  },
									    "name": "",
									    "active": ""
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