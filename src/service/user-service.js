/*
* @Author: 第九
* @Date:   2017-10-10 15:39:59
* @Last Modified by:   第九
* @Last Modified time: 2017-10-10 15:44:17
*/
var _mm = require('util/mm.js');

var _user = {
	checkLogin: function(resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/user/get_user_info.do'),
			success	: resolve,
			error 	: reject
		})
	}
};

module.exports = _user;
