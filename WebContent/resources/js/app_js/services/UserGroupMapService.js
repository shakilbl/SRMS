/* Service Code */
'use strict';
 
App.factory('UsergrpmapService', ['$http','$q','url', function($http, $q, url){ 

 
    return {
         
            fetchAllUsergroupmap: function() {
            	 return $http.get(url+'FindUserGroupMap/')
                            .then(
                                    function(response){
                                    	
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while fetching User and user Group Map');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
            
            fetchAllUsers: function() { 
                return $http.get(url+'Finduser/')
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
          fetchAllUsergroups:function(){
          	 return $http.get(url+'findAllusergroups/')
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
        
            createUsergroupmap: function(usergroupmap){
            	 return $http.post(url+'createusergroupmap/', usergroupmap)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while creating usergroupmap');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            updateUsergroupmap: function(usergroupmap, id){
                    
                     return $http.put(url+'updateusergroupmap/'+id, usergroupmap)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while updating usergroupmap');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            deleteUsergroupmap: function(id){
            	 return $http.delete(url+'usergroupmap/'+id)
                  
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while deleting usergroupmap');
                                        return $q.reject(errResponse);
                                    }
                            );
            }
         
    };
 
}]);
/* End of Service Code */

