define(["amaze","framework/services/shoppingService",],function (amaze,userAddr){
	var ctrl = ["$scope","$state","$stateParams","$http","$q",function($scope,$state, $stateParams,$http,$q){

		var addressInc = new userAddr($q);
		$scope.currentuser = {};

		var header = {
			headers:$scope.users.setheaders
		}
		
		$scope.saveUserAddr = function(userId){

			if($scope.currentuser.name==""||$scope.currentuser.phone==""||$scope.currentuser.details==""){
				alert("请填写完整信息");
			}else{
				
				var data = {
				    "address": {
						"name": $scope.currentuser.name,
						"phone": $scope.currentuser.phone,
						"address": $scope.currentuser.details,
						"is_default": true,
						"customer_id": $scope.users.owner_id
				    }
				}

				addressInc.createAddress(header,data).then(function(data){
					// alert("添加成功");
					$state.go("payment.pay");
					console.log(data);
				},function(err){
					console.log(err)
				});

			}
		}
		$scope.selectAddr = function(address){
			address.is_default= true;
			
			addressInc.updateAddress(header,address).then(function(data){
				$state.go("payment.pay");
				console.log(data);
			},function(err){
				console.log(err)
			});
		}
		$scope.deleteAddr = function(num){
			addressInc.deleteAddr({headers:$scope.users.setheaders},num).then(function(data){
				console.log(data,"deletesucce.....")
				initAddress()
			},function(){

			});
		}		
		function initAddress(){
			addressInc.getAccountAddress($scope.users.owner_id).then(function(data){
				
				$scope.addresses = data.data;
				
			},function(err){

			});
		}
		initAddress();


	}];


	return ctrl;
});