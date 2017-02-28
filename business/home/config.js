define(["angular","ui-router","iscl"],function(angular,uirouter){

	var config = ["$stateProvider","$urlRouterProvider","$controllerProvider",function($stateProvider,$urlRouterProvider,$controllerProvider){
		$urlRouterProvider.when("", "/home");
		$urlRouterProvider.otherwise("/home");
		$stateProvider.state("home",{
			url:"/home",
			templateUrl:"./business/home/main/mainProduct.html",
			controller:"home.ctrl",
			resolve:{
				deps:function($q,$rootScope){
					var defered = $q.defer();
					var dependiences = ["./business/home/main/mainProduct"];
					require(dependiences,function(ctrl){
						$rootScope.$apply(function(){
							$controllerProvider.register("home.ctrl",ctrl);
							defered.resolve();
						});
					});
					return defered.promise;
				}
			}
		});

		$stateProvider.state("advert",{
			url:"/advert?:index",
			templateUrl:"./business/home/advert/advert.html",
			controller:"advert.ctrl",
			resolve:{
				deps:function($q,$rootScope){
					var defered = $q.defer();
					var dependiences = ["./business/home/advert/advert"];
					require(dependiences,function(ctrl){
						$rootScope.$apply(function(){
							$controllerProvider.register("advert.ctrl",ctrl);
							defered.resolve();
						});
					});
					return defered.promise;
				}
			}
		});

		
		// $stateProvider.state("home.menu",{
		// 	url:"/menu",
		// 	templateUrl:"./business/home/second/secondProduct.html",
		// 	controller:"second.ctrl",
		// 	resolve:{
		// 		deps:function($q,$rootScope){
		// 			var defered = $q.defer();
		// 			var dependiences = ["./business/home/second/secondProduct"];
		// 			require(dependiences,function(ctrl){
		// 				$rootScope.$apply(function(){
		// 					$controllerProvider.register("second.ctrl",ctrl);
		// 					defered.resolve();
		// 				});
		// 			});
		// 			return defered.promise;
		// 		}
		// 	},
		// 	params:{id:{}}
		// })
		
	}];
	// deps = [];

    var  mo = angular.module("ui.router");
    mo.config(config);
    return  mo;
});
