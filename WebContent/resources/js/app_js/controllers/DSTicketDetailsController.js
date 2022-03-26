'use strict';
App
.controller(
		'DSTicketDetailsController',
		[
				'$scope',
				'$timeout',
				'$window',
				'DSTicketDetailsService',
				'NgTableParams',
				function($scope, $timeout, $window,
						DSTicketDetailsService,NgTableParams) {
					
					$scope.loadPreData = function(userName){
						$scope.currentUserName = userName;
						$scope.currentDateTime = new Date();
					};
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
					
					
					$scope.fetchTicketDetails = function(hopID){
						DSTicketDetailsService
						.fetchTicketDetailsData(hopID)
						.then(
								function(d) {
									$scope.ticketDetails = d.aTickethops;
									$scope.iscmName = d.aTickethops.issuesolutioncategorymap.issuesolutioncategory.name + "-" + d.aTickethops.issuesolutioncategorymap.issuesolution.name;
									$scope.attachmentNames = d.attachmentNames;
									$scope.ticketcomments = d.ticketcomments;
									//$scope.creationDate = new Date(parseInt($scope.ticketDetails.taskCreationDate.substr(6)));
									$scope.mrCreationDate = new Date();
									$scope.willDisableProceed = true;
									$scope.willDisableRollback = true;
								});
					};
					
					$scope.uploadFile = function() {
						console.log("Inside the dropbox");
						$scope.processDropzone();	
						$scope.resetDropzone(); 
					};
					$scope.reset = function(){
						$scope.DS = null;
					};
					
					$scope.ticketForward = function(){
						//console.log($scope.mrCreationDate);
						var response = {
								"ticketcomments" : $scope.comment
						}
						DSTicketDetailsService.ticketForward($scope.comment,$scope.ticketDetails.ticketsummary.remarks,$scope.ticketDetails.ticketNumber, $scope.finalPayment, $scope.ticketDetails.ticketHopsId)
						.then(
								function(d){
									$scope.uploadFile();
									if (d.message
											.indexOf('Failed') >= 0) {
										$scope
										.showErrorMessage(d.message);
										
									}else{
										$scope
										.showSuccessMessage(d.message);
										$scope.reset();
										setTimeout(function(){
											console.log("Time out occure");
											$window.location.href = "landingpage";
										}, 10000);
									}
									
								}
						);
						
					};
					
					$scope.ticketRollback = function(){
						//console.log($scope.mrCreationDate);
						var response = {
								"ticketcomments" : $scope.comment
						}
						DSTicketDetailsService.ticketRollback($scope.comment,$scope.ticketDetails.ticketsummary.remarks,$scope.ticketDetails.ticketNumber, $scope.finalPayment, $scope.ticketDetails.ticketHopsId)
						.then(
								function(d){
									$scope.uploadFile();
									if (d.message
											.indexOf('Failed') >= 0) {
										$scope
										.showErrorMessage(d.message);
										
									}else{
										$scope
										.showSuccessMessage(d.message);
										$scope.reset();
										setTimeout(function(){
											console.log("Time out occure");
											$window.location.href = "landingpage";
										}, 10000);
									}
									
								}
						);
						
					};
					
					$scope.changeFinalPayment = function(){
						console.log($scope.finalPayment);
						if($scope.finalPayment == "Yes"){
							$scope.willDisableProceed = false;
							$scope.willDisableRollback = true;
						}
						else if($scope.finalPayment == "No"){
							$scope.willDisableProceed = true;
							$scope.willDisableRollback = false;
						}
						
					};
					
					
					$scope.loadTicketDetailsView = function(ticketNumber){
						var myRegEx  = /[^a-z\d]/i;
						if(ticketNumber.length == 18){
							if(ticketNumber.indexOf("SRMS") == 0){
								if(!(myRegEx.test(ticketNumber))){
								}
								else{
									$scope.showErrorMessage("Wrong Ticket format.");
									return;
								}
							}
							else{
								$scope.showErrorMessage("Wrong Ticket format.");
								return;
							}
						}
						else{
							$scope.showErrorMessage("Wrong Ticket format.");
							return;
						}
						
						DSTicketDetailsService.fetchTicketDetailsDataView(ticketNumber)
						.then(
							function(d){
								$scope.showWorking = true;
								if(d == ""){
									$scope.showWorking = false;
									$scope.showErrorMessage("Ticket Data not found.");
									return;
								}
								$scope.detailsView = d;
								$scope.issuesolutioncategory = $scope.detailsView.ticketsummary.issuesolutioncategorymap.issuesolutioncategory.name + '-' + $scope.detailsView.ticketsummary.issuesolutioncategorymap.issuesolution.name;
								$scope.mrCreationDate = new Date($scope.detailsView.ticketsummary.mrcreationDate);
								$scope.showWorking = false;
							}	
						)
						
						
					};
					
					$scope.gotoLandingPage = function(){
						$window.location.href = "landingpage";
					};
					
				} ]);