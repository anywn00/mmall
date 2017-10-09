/*
* @Author: 第九
* @Date:   2017-10-09 17:19:04
* @Last Modified by:   第九
* @Last Modified time: 2017-10-09 17:43:56
*/
var Hogan = require('hogan');
var conf = {
	serverHost : ''
};
var _mm = {
	request : function(param){
		var _this = this;
		$.ajax({
			url : param.url || '',
			type : param.type || 'post',
			data : param.data || '',
			success : function(res){
				//请求成功
				if(0 === res.status){
					typeof param.success === 'function' &&
					param.success(res.data,res.msg);
				}
				//需要重新登陆
				else if(10 === res.status){
					_this.doLogin();
				}
				//请求数据错误
				else if(1 === res.status){
					typeof param.error === 'function' &&
					param.error(res.msg,res.status);
				}
			},
			error : function(err){
				typeof param.error === 'function' && param.error(err.statusText);
			}
		})
	},
	//获取服务其地址
	getServerUrl : function(url){
		return conf.serverHost + url;
	},
	//获取url参数
	getUrlParam : function(name){
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var result = window.location.search.substr(1).macth(reg);
		return decodeURIComponent(result[2]) || null;
	},
	//渲染模板
	renderHtml : function(htmlTemplate,data){
		var template = Hogan.compile(htmlTemplate);
		return template.render(date);
	},
	//成功提示
	successTips : function(msg){
		alert(msg || '操作成功！');
	},
	//错误提示
	errorTips : function(msg){
		alert(msg || '哪里不对了~');
	},
	//重新登陆
	doLogin : function(){
		window.location.href = './user-login.html?redirect' + = encodeURIComponent(window.location.href);
	},
	goHome : function(){
        window.location.href = './index.html';
    },

    // 字段的验证，支持非空、手机、邮箱的判断
    validate : function(value, type){
        var value = $.trim(value);
        // 非空验证
        if('require' === type){
            return !!value;
        }
        // 手机号验证
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        // 邮箱格式验证
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    }
};

module.exports = _mm;