define(["angular","framework/http"],function(angular,https){
	function homePage($q){
		https.call(this,$q);
	}
	homePage.prototype = new https();


	homePage.prototype.categoryData = function(categoryID){
		return this.doRequest({
			url:"/api/v1/accounts/1/stores/1/products",
			method:"get"
		});
	}
	homePage.prototype.getSearchData = function(string){
		return this.doRequest({
			url:"/api/v1/accounts/1/stores/1/products?search="+ encodeURI(string),
			method:"get"
		});
	}
	return homePage;
});