define(["amaze","framework/services/homeService"],function (amaze,homePage){
	var ctrl = ["$scope","$state","$stateParams","$http","$q",function($scope,$state, $stateParams,$http,$q){
		var homePageIns = new homePage($q);
		$scope.slideFruitData =  [];
		$scope.productListDisplay = undefined;
		// $scope.slideFruitDataHor = ["lib/images/boluo_03.png","lib/images/img5.png","lib/images/lemon_12.png","lib/images/sangshen_06.png","lib/images/shejiaguo_08.png",]
		$scope.switchMenuContent = function(){
			init();
		}
		$scope.gotoProductDetail = function(statusNum){
			$scope.stateGoto(statusNum);
			// $state.go("detail",{productId:statusNum})
		}
		$scope.gotoChristmas = function(){
			$state.go("merrychristmas");
		}

		$scope.goCollect = function(){
			$state.go("collect");
		}
		

		// 每个菜单请求一次数据并缓存。
		// 返回时检测当前的菜单编号，并数据切换到当前的数据，如果存在则不请求，如果不存在，则请求数据。
		$scope.displayDataForMenu = {};

		function init(){
			// console.log($scope.currentMenu,"currentMenunum.....")
			if(!$scope.displayDataForMenu[$scope.currentMenu]){
				homePageIns.categoryData($scope.currentMenu).then(function(data){
					
					// console.log(data,$scope.currentMenu,"categoryData......");
					
					$scope.displayDataForMenu[$scope.currentMenu] = data.data;
					$scope.productListDisplay = $scope.displayDataForMenu[$scope.currentMenu];
					// lunbo  productListDisplay to use
					$scope.slideFruitData =  $scope.productListDisplay;
					//$scope.slideFruitDataHor = $scope.productListDisplay.slice(20,26);
					// console.log($scope.productListDisplay.slice(5,8))
					// menu data this place 
				},function(err){
					console.log(err)
				});
				
			}else{
				$scope.productListDisplay = $scope.displayDataForMenu[$scope.currentMenu];
				$scope.slideFruitData =  $scope.productListDisplay.slice(0,5)
				$scope.slideFruitDataHor = $scope.productListDisplay.slice(20,26);
			}
		}
		init();

	}];
	return ctrl;
});