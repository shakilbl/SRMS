/* Service Code */
'use strict';
 
App.factory('BsGrpMapService', ['$http','$q','url', function($http, $q, url){ 

 
    return {
         
    	fetchAllBsgroupmap: function() {
            	 return $http.get(url+'FindBusinessProcessMap/')
                            .then(
                                    function(response){
                                    	
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while fetching Business Process and user Group Map');
                                    }
                            );
            },
     
           fetchAllUsergroups: function() {
                // return $http.get('http://localhost:8097/CTMS/usergroup/')
          	 return $http.get(url+'Findusergroup/')
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
          
         	fetchAllBusinessPro: function() {
                
           	 return $http.get(url+'fetchAllBusinessProcess/') 
                           .then(
                                   function(response){
                                       return response.data;
                                   }, 
                                   function(errResponse){
                                       console.error('Error while fetching Business Process');
                                       return $q.reject(errResponse);
                                   }
                           );
           },
           
        
           CreateuserBsGrpmap: function(usergroupbusinessprocessmap){
            	 return $http.post(url+'createBusinessProcessMap/', usergroupbusinessprocessmap)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while creating Business Process');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            updateuserBsGrps: function(usergroupbusinessprocessmap, id){
                    
                     return $http.put(url+'updateBusinessProcessMap/'+id, usergroupbusinessprocessmap)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while updating Business Process');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            deleteuserBsGrps: function(id){
            	 return $http.delete(url+'DeleteUsergrpBs/'+id)
                  
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while deleting Business Process');
                                        return $q.reject(errResponse);
                                    }
                            );
            }
         
    };
 
}]);
/* End of Service Code */

