//angular service area
'use strict';

App
		.factory(
				'LoginService',
				[
						'$http',
						'$q',
						'url',
						function($http, $q, url) {

							return {

								fetchLoginDetails : function(networkId,
										password) { 
									return $http
											.get(
													url + 'Login/' + networkId
															+ '/' + password)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error fetching user(service)...');
														return $q
																.reject(errResponse);
													});
								},

								fetchLogout : function() {
									return $http
											.get(url + 'Logout/')
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error fetching user(service)...');
														return $q
																.reject(errResponse);
													});
								},
								
								forgotPassword : function(emailid) {
									return $http
											.post(url + 'ForgotPassword',
													emailid)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error fetching user(service)...');
														return $q
																.reject(errResponse);
													});
								},
								
								nonOperationalLogin : function(nonOptUserId, mobile, desig) { 									
									return $http
											.get(url + 'nonOperationalLogin/'+nonOptUserId + '/'+ mobile+ '/'+ desig)
											.then(
													function(response) {
														return response.data;
													},
													function(errResponse) {
														console
																.error('Error fetching user(service)...');
														return $q
																.reject(errResponse);
													});
								},
								changePassword : function(emailid, old_password, new_password){
									return $http.post(url + 'changePassword/' + emailid + '/' + old_password + '/' + new_password)
									.then(
									function(response){
										return response.data;
									},
									function(errResponse){
										console.log("Error update password.");
										return $q.reject(errResponse);
									}
									);
								}

							};

						} ]);
