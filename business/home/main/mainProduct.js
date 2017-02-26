define(["amaze","framework/services/homeService"],function (amaze,homePage){
	var ctrl = ["$scope","$state","$stateParams","$http","$q",function($scope,$state, $stateParams,$http,$q){
		var homePageIns = new homePage($q);
		$scope.slideFruitData =  [];
		$scope.productListDisplay = undefined;

		$scope.gotoProductDetail = function(statusNum){
			$scope.stateGoto(statusNum);
		}
	

		$scope.scrollTo = function(number){
			$("body").animate({scrollTop: $("#products_"+number).position().top}, 2000);
		}
		

		// 每个菜单请求一次数据并缓存。
		// 返回时检测当前的菜单编号，并数据切换到当前的数据，如果存在则不请求，如果不存在，则请求数据。
		$scope.displayDataForMenu = {};

		function init(){
			// console.log($scope.currentMenu,"currentMenunum.....")
			if(!$scope.displayDataForMenu[$scope.currentMenu]){
				homePageIns.categoryData($scope.users.owner_id).then(function(data){
					
					// console.log(data,$scope.currentMenu,"categoryData......");
					
					var mainData=data;
					// lunbo  productListDisplay to use
					$scope.slideFruitData =  mainData.adverts;
					$scope.shopListNum.num=mainData.customer_carts.length;
					var products=data.products;
					
				
					$scope.products_1=filter(1);
					$scope.products_2=filter(2);
					$scope.products_3=filter(3);
					$scope.products_4=filter(4);
					//$scope.slideFruitDataHor = $scope.productListDisplay.slice(20,26);
					// console.log($scope.productListDisplay.slice(5,8))
					// menu data this place 
					function filter(category_id){
						return	products.filter(function (i){
						return i.category_id===category_id;
					})
					}
					setTimeout(function(){
							$(".loading").hide();				
					});	
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