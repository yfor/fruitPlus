require.config({
	baseUrl:"./",

	map:{
		"*":{
			"jquery":"http://cdn.bootcss.com/jquery/2.2.1/jquery.min.js",
			"angular":"http://cdn.bootcss.com/angular.js/1.5.0/angular.min.js",
			"ui-router":"lib/angular-ui-router",
			"amaze":"lib/amaze/js/amazeui.min.js",
			"swiper":"lib/swiper/js/swiper.min.js",
			"iscl":"lib/iscroll.js",
			"wx":"http://res.wx.qq.com/open/js/jweixin-1.1.0.js",
		},
	},

	paths :{
		amaze:"lib/amaze/js",
		swiper:"lib/swiper/js"
	},

	shim:{
		'http://cdn.bootcss.com/jquery/2.2.1/jquery.min.js':{
			"exports":'$'
		},

		"amaze/amazeui.min":{
			"deps":["jquery"],
			"exports":"amaze"
		},
		'http://cdn.bootcss.com/angular.js/1.5.0/angular.min.js':{
			"deps":["jquery"],
			"exports":'angular'
		},
		"lib/angular-ui-router":{
			"deps":["http://cdn.bootcss.com/angular.js/1.5.0/angular.min.js"]
		}

	},
	priority:["angular"],

})

require(['jquery','angular',"framework/framework"], function ($,angular,app){
	  angular.bootstrap($('html'), [app.name]);
});