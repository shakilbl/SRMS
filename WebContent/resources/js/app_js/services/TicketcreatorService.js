//angular service area
'use strict';

App.factory('ticketCreationService', [
		'$http',
		'$q',
		'url',
		function($http, $q, url) {
			return {
				ticketCreation : function(phase2) {
					return $http.post(url + 'phase2TicketCreation/', phase2)
							.then(function(response) {
								return response.data;
							}, function(errResponse) {
								console.error('Error while creating new tiket');
								return $q.reject(errResponse);
							});
				},

				fetchSLAData : function(iscmId) {
					return $http.get(url + 'fetchSLAData/' + iscmId).then(
							function(response) {
								return response.data;
							}, function(errResponse) {
								console.error('Error fetching...');
								return $q.reject(errResponse);
							});
				},

				fetchE2ESla : function(e2eSlaDate, iscmId, severity,
						componentType) {
					return $http.get(
							url + 'fetchE2ESla/' + e2eSlaDate + "/" + iscmId
									+ "/" + severity + "/" + componentType)
							.then(function(response) {
								return response.data;
							}, function(errResponse) {
								console.error('Error fetching...');
								return $q.reject(errResponse);
							});
				},

				fetchGroupSla : function(groupSlaDate, iscmId, userGroupId,
						severity, componentType, faultImpact) {
					return $http.get(
							url + 'fetchGroupSla/' + groupSlaDate + "/"
									+ iscmId + "/" + +userGroupId + "/"
									+ severity + "/" + componentType+"/"+faultImpact).then(
							function(response) {
								return response.data;
							}, function(errResponse) {
								console.error('Error fetching...');
								return $q.reject(errResponse);
							});
				},

				fetchCurrentUserGroup : function() {
					return $http.get(url + 'fetchCurrentUserGroup/').then(
							function(response) {
								return response.data;
							}, function(errResponse) {
								console.error('Error fetching...');
								return $q.reject(errResponse);
							});
				},

				fetchISCMSeverityData : function(iscmId, severity) {
					return $http.get(
							url + 'fetchISCMSeverityData/' + iscmId + '/'
									+ severity).then(function(response) {
						return response.data;
						console.error('successfully fetch data...');
					}, function(errResponse) {
						console.error('Error fetching data');
						return $q.reject(errResponse);
					});
				}

			};
		} ]);
