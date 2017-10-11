/*
* @Author: 第九
* @Date:   2017-10-10 15:39:59
* @Last Modified by:   第九
* @Last Modified time: 2017-10-11 17:30:55
*/
var _mm = require('util/mm.js');

var _user = {
	//登陆
	login: function(userInfo,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/user/login.do'),
			data 	: userInfo,
			method  : 'POST',
			success : resolve,
			error   : reject
		})
	},
	//检查用户名
	checkUsername: function(username,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/user/check_valid.do'),
			data 	: {
				str : username,
				type: 'username'	 
			},
			method  : 'POST',
			success : resolve,
			error   : reject
		})
	},
	//注册
	register: function(userInfo,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/user/register.do'),
			data	: userInfo,
			method  : 'POST',
			success	: resolve,
			error 	: reject
		})
	},
	//检查登陆状态
	checkLogin: function(resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/user/get_user_info.do'),
			method  : 'POST',
			success	: resolve,
			error 	: reject
		})
	},
	//退出
	logout: function(resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/user/logout.do'),
			method 	: 'POST',
			success : resolve,
			error 	: reject
		})
	}
};

module.exports = _user;
