/*
* @Author: Administrator
* @Date:   2017-10-28 23:22:51
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-29 17:59:23
*/
var _mm = require('util/mm.js');
var _address = {
	//收货地址
	getAddressList: function(resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/shipping/list.do'),
			method	: 'POST',
			success	: resolve,
			error	: reject
		});
	},
	 // 新建收件人
    save : function(addressInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/add.do'),
            data    : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    // 更新收件人
    update : function(addressInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/update.do'),
            data    : addressInfo,
            success : resolve,
            error   : reject
        });
    },
	// 删除收件人
    deleteAddress : function(shippingId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/del.do'),
            data    : {
                shippingId : shippingId
            },
            success : resolve,
            error   : reject
        });
    },
    // 获取单条收件人信息
    getAddress : function(shippingId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/select.do'),
            data    : {
                shippingId : shippingId
            },
            success : resolve,
            error   : reject
        });
    }
}

module.exports = _address;