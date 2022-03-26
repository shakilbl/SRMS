'use strict';
App
.controller(
		'DSTicketCreationController',
		[
				'$scope',
				'$timeout',
				'$window',
				'DSTicketCreationService',
				'NgTableParams',
				function($scope, $timeout, $window,
						DSTicketCreationService,NgTableParams) {
					
					$scope.successMessages = false;
					$scope.errorMessages = false;
					
					$scope.showSuccessMessage = function(message) {
						$scope.successMessages = message;
						$timeout(function() {
							$scope.successMessages = null;
							$scope.errorMessages = null;
						}, 3600000);
					};

					/* Show Error Message */
					$scope.showErrorMessage = function(message) {
						$scope.errorMessages = message;
						$timeout(function() {
							$scope.successMessages = null;
							$scope.errorMessages = null;
						}, 3600000);
					};
					
					$scope.loadPreData = function(userName){
						$scope.currentUserName = userName;
						$scope.currentDateTime = new Date();
					};
					
					$scope.loadCollectionMode = function(){
						DSTicketCreationService.fetchAllActiveCollectionMode()
						.then(
								function(d){
									$scope.collectionModes = d;
									$scope.collectionModeKeyValue = []
									$scope.l1 = {
										id : null,
										name : null
									};
									for(var i = 0; i < $scope.collectionModes.length; i++){
										$scope.l1.id = $scope.collectionModes[i].collectionModeId;
										$scope.l1.name = $scope.collectionModes[i].name;
										$scope.collectionModeKeyValue[i] = $scope.l1;
										$scope.l1 = {
												id : null,
												name : null
											};
									}
								},
								function(errResponse) {
									console
											.error('Error while fetching category and problem');
								}
						);
					};
					
					$scope.loadCompanyNames = function(){
						$scope.showWorking = true;
						DSTicketCreationService.fetchAllActiveCompanyNames()
						.then(
								function(d){
									$scope.companyNames = d;
									$scope.companyNamesKeyValue = []
									$scope.l2 = {
										id : null,
										name : null
									};
									for(var i = 0; i < $scope.companyNames.length; i++){
										$scope.l2.id = $scope.companyNames[i].comapnyNameId;
										$scope.l2.name = $scope.companyNames[i].name;
										$scope.companyNamesKeyValue[i] = $scope.l2;
										$scope.l2 = {
												id : null,
												name : null
											};
									}
									$scope.showWorking = false;
								},
								function(errResponse) {
									console
											.error('Error while fetching company names');
								}
						);
					};
					
					$scope.loadBankNames = function(){
						$scope.showWorking = true;
						DSTicketCreationService.fetchAllActiveBankNames()
						.then(
								function(d){
									$scope.bankNames = d;
									$scope.bankNamesKeyValue = []
									$scope.l3 = {
										id : null,
										name : null
									};
									for(var i = 0; i < $scope.bankNames.length; i++){
										$scope.l3.id = $scope.bankNames[i].bankNamesId;
										$scope.l3.name = $scope.bankNames[i].name;
										$scope.bankNamesKeyValue[i] = $scope.l3;
										$scope.l3 = {
												id : null,
												name : null
											};
									}
									$scope.showWorking = false;
								},
								function(errResponse) {
									console
											.error('Error while fetching bank names');
								}
						);
					};
					
					
					$scope.loadCollectionMode();
					$scope.loadCompanyNames();
					$scope.loadBankNames();
					
					$scope.loadIssueSolutionCategoryMap = function(){
						DSTicketCreationService.fetchAllIssueSolutionCategoryMapDS()
						.then(
								function(d) {
									$scope.IssuesSolutionCategoryMaps = d;
									$scope.iscm = undefined;
									$scope.iscmKeyValue = []
									$scope.l = {
										id : null,
										name : null
									};
									for (var i = 0; i < $scope.IssuesSolutionCategoryMaps.length; i++) {
										$scope.l.id = $scope.IssuesSolutionCategoryMaps[i].issueSolutionCategoryMapId;
										$scope.l.name = $scope.IssuesSolutionCategoryMaps[i].issuesolutioncategory.name
												+ "-"
												+ $scope.IssuesSolutionCategoryMaps[i].issuesolution.name;
										$scope.iscmKeyValue[i] = $scope.l;
										$scope.l = {
											id : null,
											name : null
										};
									}
									$scope.loading = false;
								},
								function(errResponse) {
									console
											.error('Error while fetching category and problem');
								});
					};
					
					$scope.uploadFile = function() {
						console.log("Inside the dropbox");
						$scope.processDropzone();	
						$scope.resetDropzone(); 
					};
					$scope.reset = function(){
						$scope.DS = null;
						$scope.resetDropzone();
					};
					$scope.depositDateEvent = function() {
						$scope.DS.depositDate = angular.element(
								"#DepositDate").val();
					};
				
					//$scope.DS = {};
					$scope.ticketCreation = function(){
						
						//$scope.DS.ticketsummary.ticketCreatedBy = $scope.currentUserName;
						//$scope.DS.ticketCreationDate = new Date();
						//$scope.DS.ticketsummary.issuesolutioncategorymap = {};
						$scope.showWorking = true;
						$scope.DS.depositeDate = new Date(angular.element("#DepositDate").val());
						$scope.DS.collectionMode = $scope.collectionModes.name;
						$scope.DS.companyBscode = $scope.companyName.name;
						$scope.DS.depositeBankName = $scope.bankName.name;
						var response = {
								"ticketsummary": $scope.DS,
								"iscmID": $scope.DS.issueSolutionCategoryMap.id
						}
						
						
						///$scope.DS.ticketsummary.issuesolutioncategorymap.id = $scope.issueSolutionCategoryMap.id;
						
						
						DSTicketCreationService.ticketCreation(response).then(
								function(d) {
									$scope.uploadFile();															
									//$scope.reset();															
									if (d.message
											.indexOf('Sorry') >= 0) {
										$scope
										.showErrorMessage(d.message);
										$scope.showWorking = false;
										
									}else{
										$scope
										.showSuccessMessage(d.message);
										$scope.showWorking = false;
										$scope.reset();
									setTimeout(function(){
										console.log("Time out occure");
										$window.location.href = "landingpage";
									}, 10000);
									}
								},
								function(d) {
									/*$scope
											.showErrorMessage(d.message);*/
								});
					};
					
				} ]);