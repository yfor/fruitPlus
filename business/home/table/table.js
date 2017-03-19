define(["amaze","framework/services/homeService"],function (amaze,homePage){
	var ctrl = ["$scope","$state","$stateParams","$http","$q",function($scope,$state, $stateParams,$http,$q){
		var index = $stateParams.index;
		var homePageIns = new homePage($q);
		var query={};
		query.category="1";
		homePageIns.categoryData(query).then(function(data){
			if(data.code===0){
				var panic_buying=data.data;
				$scope.products=panic_buying.products;	
			}
		},function(err){
			console.log(err);
			alert("我们出现了一些错误");
		});
		
		
	}];
	return ctrl;
});