/*
* @Author: 第九
* @Date:   2017-10-11 14:48:37
* @Last Modified by:   第九
* @Last Modified time: 2017-10-17 15:59:46
*/

var _mm = require('util/mm.js');

var _cart = {
	//获取购物车数量
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
    },
    //更新购物车
    updateCart: function(productInfo, resolve, reject){
         _mm.request({
            url     : _mm.getServerUrl('/cart/update.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
    //购物车列表
    cartList : function(resolve, reject){
    	_mm.request({
    		url     : _mm.getServerUrl('/cart/list.do'),
    		success : resolve,
    		error   : reject
    	});
    },
    //删除购物车中的商品
    deleteCartProduct: function(productIds,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/delete_product.do'),
            data    : {
                productIds : productIds
            },
            success : resolve,
            error   : reject
        });
    },
    //选中商品
    selectProduct: function(productId,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/select.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    },
    //取消选中商品
    unselectProduct: function(productId,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/un_select.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    },
    // 全选
    selectAll: function(resolve,reject){
         _mm.request({
            url     : _mm.getServerUrl('/cart/select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    // 取消全选
    unselectAll: function(resolve,reject){
         _mm.request({
            url     : _mm.getServerUrl('/cart/un_select_all.do'),
            success : resolve,
            error   : reject
        });
    },
};

module.exports = _cart;