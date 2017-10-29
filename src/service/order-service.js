/*
* @Author: Administrator
* @Date:   2017-10-29 09:12:26
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-29 15:05:01
*/
var _mm = require('util/mm.js');

var _order = {
//获取购物车数量
	// 获取商品列表
    getProductList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/get_order_cart_product.do'),
            data 	: {
            	pageSize : 50
            }, 
            success : resolve,
            error   : reject
        });
    },
    // 提交订单
    createOrder : function(orderInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/create.do'),
            data    : orderInfo,
            success : resolve,
            error   : reject
        });
    }
};

module.exports = _order;