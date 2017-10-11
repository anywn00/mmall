/*
* @Author: 第九
* @Date:   2017-10-11 14:48:37
* @Last Modified by:   第九
* @Last Modified time: 2017-10-11 14:57:07
*/

var _mm = require('util/mm.js');

var _cart = {
	getCartCount: function(resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/cart/get_cart_product_count.do'),
			method	: 'POST',
			success	: resolve,
			error	: reject
		});
	}
};

module.exports = _cart;