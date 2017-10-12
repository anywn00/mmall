/*
* @Author: 第九
* @Date:   2017-10-12 18:20:26
* @Last Modified by:   第九
* @Last Modified time: 2017-10-12 19:27:56
*/
var _mm = require('util/mm.js');

var _product = {
	list: function(productInfo,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/product/list.do'),
			data 	: productInfo,
			method 	: 'POST',
			success : resolve,
			error 	: reject
		});
	}
};

module.exports = _product;