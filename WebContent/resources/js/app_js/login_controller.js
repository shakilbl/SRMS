// angular controller area 
'use strict';
App
		.controller(
				'LoginController',
				[
						'$scope',
						'$timeout',
						'LoginService',
						function($scope, $timeout, LoginService) {

							$scope.reaz = function(){
                                console.log("Controlleer");
                                //var searchObject = $location.search();
                                var sa = $location.search();
                            console.log(sa);
                        }


							$scope.login = function(networkId, password) {
								LoginService
										.fetchLoginDetails(networkId, password)
										.then(
												function(d) {
													$scope.LoginDetails = d;
													console
															.log("self.LoginDetails: "
																	+ $scope.LoginDetails);
													if ($scope.LoginDetails != "") {
														$('.modal').modal(
																'hide')
														window.location = "landingpage";
													} else {
														$scope.success = "Sorry wrong user name and password...try again";
													}

												},
												function(errResponse) {
													console
															.error('Error fetching user(controller)..');
												});
							};

							$scope.logout = function() { 
								LoginService
										.fetchLogout()
										.then(
												function(d) {
													console
															.log(
																	"inside logout...javascript controller",
																	d.message); 
													window.location = "";
												},
												function(errResponse) {
													window.location = "";
													console
															.error('Error fetching user(controller)..');
												});
							};

							$scope.forgotPassword = function(emailid) {
								LoginService
										.forgotPassword(emailid)
										.then(
												function(d) {
													$scope.emailDetails = d;
													if ($scope.emailDetails != "") {
														$scope.emailSuccess = "Password has been sent to email!";
													} else {
														$scope.emailSuccess = "Sorry wrong email id (try again)!";
													}
												},
												function(errResponse) {

													console
															.error('Error fetching user(controller)..');
												});
							};

							$scope.nonOperationalLogin = function(
									nonOptUserId, mobile, desig) { 
								LoginService
										.nonOperationalLogin(nonOptUserId, mobile, desig)
										.then(
												function(d) {
													$scope.emailDetails = d; 
													if (d.message=="Yes") {
														$('.modal').modal(
														'hide')
														window.location = "servicerequest";
													} else {
														$scope.nonOperationalsuccess = "Sorry, enter domain id, mobile and designation(try again)!";														
													}
												},
												function(errResponse) {

													console
															.error('Error fetching user(controller)..');
												});
							};

							$scope.designations11 = [ 'Executive', 
								'Senior Executive'
							, 
								'Specialist'
							, 
								'Deputy General Manager'
							, 
								'General Manager'
							, 
								'Deputy Director'
							, 
								'Director'
							, 
								'CxO'
							 ];
							$scope.params = {};
							$scope.showPassword1 = false;
							$scope.toggleShowPassword1 = function() {
							    $scope.showPassword1 = !$scope.showPassword1;
							  };
							  
							$scope.showPassword2 = false;
							$scope.toggleShowPassword2 = function() {
								$scope.showPassword2 = !$scope.showPassword2;
							};
							$scope.showPassword3 = false;
							$scope.toggleShowPassword3 = function() {
									    $scope.showPassword3 = !$scope.showPassword3;
						    };
						    
						    $scope.dontmatch = false;
						    $scope.checkPassword = function(pass1, pass2){
						    	if(pass1 != pass2){
						    		$scope.dontmatch = true;
						    	}
						    	else{
						    		$scope.dontmatch = false;
						    	}
						    };
						    
						    $scope.changePassword = function(emailid, old_password, new_password, new_password_confirm){
						    	
						    	if(new_password == undefined || new_password == ''){
						    		$scope.emailSuccess = "New Password Field is Blank";
						    		return;
						    	}
						    	else if(new_password_confirm == undefined || new_password_confirm == ''){
						    		$scope.emailSuccess = "Retype Password Filed is Blank";
						    		return;
						    	}
						    	
						    	var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
						    	var res = regex.test(new_password_confirm);
						    	
						    	if(!res){
						    		$scope.policyMissmatch = true;
						    		return;
						    	}
						    	
						    	LoginService.changePassword(emailid,old_password,new_password)
						    	.then(
						    	function(d){
						    		$scope.policyMissmatch = false;
						    		$scope.message = d.message;
						    	}		
						    	)
						    }

						} ]);

