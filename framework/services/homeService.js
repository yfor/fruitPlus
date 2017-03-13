define(["angular","framework/http"],function(angular,https){
	function homePage($q){
		https.call(this,$q);
	}
	homePage.prototype = new https();


	homePage.prototype.categoryData = function(customerId){
		var query={};
		query.type="home";
		query.customer=customerId;
		var str="?";
		for(var i in query){
			str+=i+"="+query[i]+"&"
		}
		return this.doRequest({
			url:"/api/v1/accounts/1/stores/1/products"+str,
			method:"get"
		});
	}
	homePage.prototype.getSearchData = function(string){
		return this.doRequest({
			url:"/api/v1/accounts/1/stores/1/products?search="+ encodeURI(string),
			method:"get"
		});
	}
	homePage.prototype.panic_buyings = function(id){
		return this.doRequest({
			url:"/api/v1/panic_buyings/"+id,
			method:"get"
		});
	}	
	return homePage;
});
