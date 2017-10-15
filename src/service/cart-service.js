/*
* @Author: 第九
* @Date:   2017-10-11 14:48:37
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-14 16:49:20
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
	},
	  // 添加到购物车
    addToCart : function(productInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/add.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    }
};

module.exports = _cart;