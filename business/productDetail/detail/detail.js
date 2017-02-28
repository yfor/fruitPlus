define(["amaze","framework/services/productService"],function (amaze,pdt){

	var ctrl = ["$scope","$state","$stateParams","$http","$q","orderList",function($scope,$state, $stateParams,$http,$q,orderList){

		// $scope.slideFruitData = ["lib/images/img5.png","lib/images/lemon_12.png","lib/images/sangshen_15.png","lib/images/small.jpg","lib/images/spic3.png"];
		$scope.slideFruitData = []
		var productId = $stateParams.productId;
		var pdtIns = new pdt($q);

		$scope.modalObj = {
			content:"",
		}
		$scope.modalObjSuc = {
			content:"已添加至购物车",
		}
		$scope.modalObjErr = {
			content:"添加失败，请重新操作！",
		}




		var obj = {};
		function getUsercountId(){
			if ($scope.users !== obj && $scope.users.owner_id) {
				// alert($scope.users.owner_id)
				return $scope.users.owner_id;
			}else{
				return "";
			};
		}
		

		$scope.addTobagData = {
			data:$scope.dataList,
			headers:$scope.users.setheaders
		}
		$scope.computes  = function(){
			
				
			pdtIns.computes($scope.users.setheaders,{number:$scope.productDetails.number-0,money:$scope.productDetails.money-0}).then(function(data){
				

				$scope.productDetails.plans=data.data;
				
				console.log(data);

			},function(err){
		

			})
		}
		$scope.addToBag  = function(){
			var cart={
					"product_id": $scope.productDetails.id,
					"price_id": $scope.price_select.id,
					"amount": $scope.productDetails.number,
					"total_price": $scope.productDetails.number*$scope.price_select.real_price,
					"owner_id": $scope.users.owner_id,
					"owner_type": "Customer",
					"remark": "xxx",
					"property": 0
			}
			if (!$scope.users.owner_id) {
				alert("请先登录");
				return;
			}
			// add function 
			$scope.modalObj.showDialog();

			pdtIns.addTobagList($scope.addTobagData,{cart:cart}).then(function(data){
			// code = -1  auth failed
				// alert(JSON.stringify(data));
				$scope.modalObj.hideDialog();
				$scope.modalObjSuc.showDialogdwhite();
				setTimeout(function(){
					$scope.modalObjSuc.hideDialog();
				},2000)

				$scope.shopListNum.num++;
				
				console.log(data);

			},function(err){
				$scope.modalObj.hideDialog();
				$scope.modalObjErr.showDialogdwhite()
				setTimeout(function(){
					$scope.modalObjErr.hideDialog();
				},2000)

			})

		}

		$scope.gotoShopList = function(){
			var cart={
					"product_id": $scope.productDetails.id,
					"price_id": $scope.price_select.id,
					"amount": $scope.productDetails.number,
					"total_price": $scope.productDetails.number*$scope.price_select.real_price,
					"owner_id": $scope.users.owner_id,
					"owner_type": "Customer",
					"remark": "xxx",
					"property": 0
			}
			if (!$scope.users.owner_id) {
				alert("请先登录");
				return;
			}
			// add function 
			//$scope.modalObj.showDialog();

			pdtIns.addTobagList($scope.addTobagData,{cart:cart}).then(function(data){
				
				$scope.modalObj.hideDialog();
				$scope.modalObjSuc.showDialogdwhite();
			
			


				$scope.shopListNum.num++;
				
				orderList.allPrice = cart.total_price;
				orderList.setList([data.data]);
				$state.go("payment.pay");
			},function(err){
				$scope.modalObj.hideDialog();
				$scope.modalObjErr.showDialogdwhite()
				setTimeout(function(){
					$scope.modalObjErr.hideDialog();
				})

			})
			
		}
		$scope.selectPrice = function(price_select){
			$scope.price_select=price_select;
		}
		
		// display in html
		$scope.productDetails ={};
		function init(){
			pdtIns.getDataforHome(productId).then(function(data){
				$(".loading").hide();
				var productDetails = data.data;
				//顶部轮播图片
				$scope.slideFruitData = productDetails.pictures[1]; 
				if(productDetails.category_id===1||productDetails.category_id===2){
					var prices=productDetails.prices;
					var index=0;
					for(var i in prices){
						if(prices[i].is_default){
							index=i;
						}
					}
					var defaultprice=prices[index];
					var temp=prices[0];
					prices[0]=defaultprice;
					prices[index]=temp;
					prices[0].is_default=true;
					$scope.price_select=prices[0];
					productDetails.number=1;
				}else if(productDetails.category_id===3){
					
					productDetails.number=10;
					productDetails.money=100;
				}else if(productDetails.category_id===4){
					
				}
				$scope.productDetails=productDetails;
				
			},function(err){
				console.log("error....");
			});

		}
		init();
		$scope.reduce = function(){
			if($scope.productDetails.number>1){
				$scope.productDetails.number--;
			}
		}
		$scope.increase = function(){
			$scope.productDetails.number++;
		}
	}];
	return ctrl;
});