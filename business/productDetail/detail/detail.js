define(["amaze","framework/services/productService"],function (amaze,pdt){

	var ctrl = ["$scope","$state","$stateParams","$http","$q",function($scope,$state, $stateParams,$http,$q){

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



		$scope.dataList = {
		    "cart": {
		        "amount": "1",
		        "remark": ""
		    },
		    "product_id": productId,
		    "owner_id": getUsercountId(),
		    "owner_type": "Customer"
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
		$scope.addToBag  = function(){

			if (!$scope.users.owner_id) {
				alert("请先登录");
				return;
			}
			// add function 
			$scope.modalObj.showDialog();

			pdtIns.addTobagList($scope.addTobagData,$scope.dataList).then(function(data){
			// code = -1  auth failed
				// alert(JSON.stringify(data));
				$scope.modalObj.hideDialog();
				$scope.modalObjSuc.showDialogdwhite();
				setTimeout(function(){
					$scope.modalObjSuc.hideDialog();
				},2000)

				$scope.shopListNum.num = data.data.cart_item_amount;
				
				console.log(data);

			},function(err){
				$scope.modalObj.hideDialog();
				$scope.modalObjErr.showDialogdwhite()
				setTimeout(function(){
					$scope.modalObjErr.hideDialog();
				},2000)

			})

		}
		$scope.units=[
		{
			name:"斤",
			id:0
		},
			{
			name:"份",
			id:1
		},	{
			name:"个",
			id:2
		},	{
			name:"盒",
			id:3
		},	{
			name:"箱",
			id:4
		}
		]
		$scope.gotoShopList = function(){
			$state.go("productList");
			$scope.modalObj.hideDialog();
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
				if(productDetails.category_id===1){
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
				}else if(productDetails.category_id===2){
				}else if(productDetails.category_id===3){
				}else if(productDetails.category_id===4){
					
				}
				$scope.productDetails=productDetails;
			},function(err){
				console.log("error....");
			});

		}
		init();
		
		

	}];
	return ctrl;
});