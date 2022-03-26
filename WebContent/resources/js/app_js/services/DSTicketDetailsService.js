'use strict';
App.factory('DSTicketDetailsService', [
                                		'$http',
                                		'$q',
                                		'url',
                                		function($http, $q, url) {
                                			return {
                                				
                                				fetchTicketDetailsData : function(hopID) {
                                					return $http.get(
                                							url + 'DSticketdetails/' + hopID).then(function(response) {
                                						return response.data;
                                						console.log('successfully fetch data...');
                                					}, function(errResponse) {
                                						console.error('Error fetching value');
                                						return $q.reject(errResponse);
                                					});
                                				},
                                				
                                				fetchTicketDetailsDataView : function(ticketNumber) {
                                					return $http.get(
                                							url + 'DSticketdetailsViewOnly/' + ticketNumber).then(function(response) {
                                						return response.data;
                                						console.log('successfully fetch data...');
                                					}, function(errResponse) {
                                						console.error('Error fetching value');
                                						return $q.reject(errResponse);
                                					});
                                				},
                                				
                                				
                                				ticketForward : function(comment, remarks, ticketNumber, finalPayment, currentHopid) {
                                					return $http.post(
                                							url + 'DSticketForward/' + remarks + "/"+ comment +"/"+ ticketNumber +"/"+ finalPayment +"/"+ currentHopid).then(function(response) {
                                						return response.data;
                                						console.log('successfully data Save...');
                                					}, function(errResponse) {
                                						console.error('Error saving value');
                                						return $q.reject(errResponse);
                                					});
                                				},
                                				
                                				ticketRollback : function(comment, remarks, ticketNumber, finalPayment, currentHopid) {
                                					return $http.post(
                                							url + 'DSticketRollback/' + remarks + "/"+ comment +"/"+ ticketNumber +"/"+ finalPayment +"/"+ currentHopid).then(function(response) {
                                						return response.data;
                                						console.log('successfully data Save...');
                                					}, function(errResponse) {
                                						console.error('Error saving value');
                                						return $q.reject(errResponse);
                                					});
                                				},
                                				
                                			}; } ]);