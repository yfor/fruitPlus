define(["angular","framework/http"],function(angular,https){
	function shoppingList($q){
		https.call(this,$q);
	}
	shoppingList.prototype = new https();
	shoppingList.prototype.getAllOrderList = function(data){
		return this.doRequest({
			url:"/api/v1/carts?owner_type=Customer&owner_id="+data,
			method:"get"
		});
	}

	shoppingList.prototype.changedProductNumber = function(data,para,productid){
		data = JSON.stringify(data)
		return this.doRequest({
			url:"/api/v1/carts/"+productid,
			method:"put",
			data:data,
			headers:para.headers
		});
	}
	shoppingList.prototype.deleteProductNumber = function(para,productid){
		// data = JSON.stringify(data)
		return this.doRequest({
			url:"/api/v1/carts/"+productid,
			method:"delete",
			// data:data,
			headers:para.headers
		});
	}

	// shoppingList.prototype
	shoppingList.prototype.createOrderAndPay = function(para,data){
		data = JSON.stringify(data)
		return this.doRequest({
			url:"/api/v1/orders",
			method:"post",
			data:data,
			headers:para.headers
		});
	}
	// address
	shoppingList.prototype.createAddress = function(para,data){
		data = JSON.stringify(data)
		return this.doRequest({
			url:"/api/v1/addresses",
			method:"post",
			data:data,
			headers:para.headers
		});
	}
	shoppingList.prototype.getAccountAddress = function(id){
		
		return this.doRequest({
			url:"/api/v1/addresses?customer_id="+id,
			method:"get",
		});
	}


	
	return shoppingList;
});