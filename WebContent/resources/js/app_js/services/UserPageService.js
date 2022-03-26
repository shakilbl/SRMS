/* Service Code */
'use strict';
 
App.factory('UserPageService', ['$http', '$q', 'url',function($http, $q, url){
	
 
    return {
         
    	fetchAllUserPage: function() {
                  //  return $http.get('http://localhost:8097/CTMS/user/')
            	 return $http.get(url+'usergrouppage/') 
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while fetching users');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
              
        
            
         
    };
 
}]);
/* End of Service Code */