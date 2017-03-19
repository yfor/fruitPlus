define(["amaze","framework/services/homeService"],function (amaze,homePage){
	var ctrl = ["$scope","$state","$stateParams","$http","$q","$rootScope","$interval",function($scope,$state, $stateParams,$http,$q,$rootScope,$interval){
		var homePageIns = new homePage($q);
		$scope.slideFruitData =  [];
		$scope.gotoProductDetail = function(statusNum){
			$scope.stateGoto(statusNum);
		}

		$scope.scrollTo = function(number){
			$("body").animate({scrollTop: $("#products_"+number).position().top}, 2000);
		}
		
		function init(){
			var query={};
			query.type="home";
			query.customer=$scope.users.owner_id;
			homePageIns.categoryData(query).then(function(data){
				var mainData=data;
				// swiper   to use
				$rootScope.adverts=mainData.adverts;
				$scope.shopListNum.num=mainData.customer_carts.total_count;
				
				var products=data.products;
				var products_1=products.single_setmeal;
				products_1=products_1.concat(products.personal_setmeal);
				products_1=products_1.concat(products.group_buyings);
				$scope.products_1=products_1;

				var panic_buying=data.panic_buying;
				var panic_buying_ps=[];
				for(var i=0;i<4&&i<panic_buying.products.length;i++){
					panic_buying_ps.push(panic_buying.products[i])
				}
				$scope.panic_buying_ps=panic_buying_ps;
				
				$scope.team_setmealid=data.team_setmeal[0].id;
				setTimeout(function(){
					$(".loading").hide();				
				});	
			},function(err){
				console.log(err);
				alert("我们出现了一些错误");
			});
				

		}
		init();
		var end_time=new Date();
		end_time.setHours(end_time.getHours()+2);
		var promise=$interval(updateTime,1000);
		function updateTime(){
			var l=end_time-new Date();
			if(l>0){
				var utcdate=new Date(l);
				var hms=new Date(utcdate-8*60*60*1000);
				var dd=(hms).Format("dd");
				$scope.timeH=addZeroIfLessTen(((hms).Format("hh")-0)+(dd-1)*24);
				$scope.timeM=(hms).Format("mm");
				$scope.timeS=(hms).Format("ss");
				
				function addZeroIfLessTen(str){
					if(str-0<10)
						return "0"+str;
					return str;
				}
			}else{
				$scope.timeH=00;
				$scope.timeM=00;
				$scope.timeS=00;
				$interval.cancel(promise);

				
			}
		}

	}];
	return ctrl;
});