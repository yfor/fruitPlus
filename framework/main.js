require.config({
	baseUrl:"./",
	paths :{
		"jquery":"http://cdn.bootcss.com/jquery/2.2.1/jquery.min",
		"angular":"http://cdn.bootcss.com/angular.js/1.5.0/angular.min",
		"ui-router":"http://cdn.bootcss.com/angular-ui-router/1.0.0-rc.1/angular-ui-router.min",
		"amaze":"http://cdn.amazeui.org/amazeui/2.7.2/js/amazeui.min",
		"swiper":"http://cdn.bootcss.com/Swiper/3.4.0/js/swiper.min",
		"iscl":"http://cdn.bootcss.com/Swiper/3.4.0/js/iscroll.min",
		"wx":"http://res.wx.qq.com/open/js/jweixin-1.1.0"
	},

	shim:{
		'jquery':{
			"exports":'$'
		},

		"amaze":{
			"deps":["jquery"],
			"exports":"amaze"
		},
		'angular':{
			"deps":["jquery"],
			"exports":'angular'
		},
		"ui-router":{
			"deps":["angular"],
			"exports": 'ngRouteModule'
		}

	},
	priority:["angular"],

})

require(['jquery','angular',"framework/framework"], function ($,angular,app){
	  angular.bootstrap($('html'), [app.name]);
});