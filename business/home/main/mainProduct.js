define(["amaze","framework/services/homeService"],function (amaze,homePage){
	var ctrl = ["$scope","$state","$stateParams","$http","$q","$rootScope",function($scope,$state, $stateParams,$http,$q,$rootScope){
		var homePageIns = new homePage($q);
		$scope.slideFruitData =  [];
		$scope.gotoProductDetail = function(statusNum){
			$scope.stateGoto(statusNum);
		}

		$scope.scrollTo = function(number){
			$("body").animate({scrollTop: $("#products_"+number).position().top}, 2000);
		}
		
		function init(){
			homePageIns.categoryData($scope.users.owner_id).then(function(data){
				var mainData=data;
				// swiper   to use
				$rootScope.adverts=mainData.adverts;
				$scope.shopListNum.num=mainData.customer_carts.total_count;
				var products=data.products;
				$scope.products_1=filter(1);
				$scope.products_2=filter(2);
				$scope.products_3=filter(3);
				$scope.products_4=filter(4);	
				
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
				

		}
		init();

	}];
	return ctrl;
});