/*
* @Author: Administrator
* @Date:   2017-10-29 16:34:17
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-29 18:27:51
*/
var _mm                 = require('util/mm.js');
var _cities             = require('util/cities/index.js');
var _address            = require('service/address-service.js');
var addressModal        = require('./address-model.string');

var page = {
	show: function(option){
		// option的绑定
		this.option = option;
		this.option.data    = option.data || {};
		this.$modalWrap     = $('.model-wrap');
		//渲染页面
		this.loadModel();
		//绑定事件
		this.bindEvent();
	},
	bindEvent: function(){
		var _this = this;
		// 省份和城市的二级联动
		this.$modalWrap.find('#receiver-province').change(function(){
			var province = $(this).val();
			_this.loadCity(province);
		});
		 // 提交收货地址
		 this.$modalWrap.find('.btn').click(function(){
		 	 var receiverInfo = _this.getReceiverInfo(),
		 	 	 isUpdate     = _this.option.isUpdate;

		 	 if(!isUpdate && receiverInfo.status){
		 	 	_address.save(receiverInfo.data, function(res){
                    _mm.successTips('地址添加成功');
                    _this.hide();
                   typeof  _this.option.success === 'function' && 
                    _this.option.success();
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
		 	 }
		 	 // 更新收件人，并且验证通过
            else if(isUpdate && receiverInfo.status){
                _address.update(receiverInfo.data, function(res){
                    _mm.successTips('地址修改成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' 
                        && _this.option.onSuccess(res);
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            // 验证不通过
		 	 else {
		 	 	_mm.errorTips(receiverInfo.errMsg || '好像哪里不对了~');
		 	 }

		 });
		//  保证点击model内容区的时候，不关闭弹窗
		this.$modalWrap.find('.model-container').click(function(e){
			e.stopPropagation();
		});
		//关闭
		this.$modalWrap.find('.close').click(function(){
			_this.hide();
		});
	},
	loadModel: function(){

		this.$modalWrap .html('<div class="loading"></div>');
		var moduleHtml = _mm.renderHtml(addressModal,{
			isUpdate    :  this.option.isUpdate,
            data        : this.option.data
		});
		this.$modalWrap.html(moduleHtml);
		//加载省份
		this.loadProvince();
	},
	loadProvince: function(){
		var provinces       = _cities.getProvinces() || [],
			option          = this.option,
			$selectProvince  =this.$modalWrap.find('#receiver-province');
		$selectProvince.html(this.getSelectOption(provinces));
		// 如果是更新地址，并且有省份信息，做省份的回填
		if(option.isUpdate && option.data.receiverProvince){
			$selectProvince.val(option.data.receiverProvince);
			this.loadCity(option.data.receiverProvince);
		}
	},
	loadCity: function(provinceName){
		var provinces       = _cities.getCities(provinceName) || [],
			option          = this.option,
			$selectcity     =this.$modalWrap.find('#receiver-city');
		$selectcity.html(this.getSelectOption(provinces));
		// 如果是更新地址，并且有城市信息，做城市的回填
		if(option.isUpdate && option.data.receiverCity){
			$selectcity.val(option.data.receiverCity);
		}
	},
  // 获取select框的选项，输入:array，输出: HTML
	getSelectOption: function(optionArray){
		var html = '<option value="">请选择</option>';
		for(var i = 0,len = optionArray.length; i < len; i++) {
			html += '<option value="' + optionArray[i] +'">' + optionArray[i] +'</option>';
		}
		return html;
	},
	getReceiverInfo: function(){
		var receiverInfo = {},
			result		 = {
				status : false
			};
		receiverInfo.receiverName       = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince   = this.$modalWrap.find('#receiver-province').val();
        receiverInfo.receiverCity       = this.$modalWrap.find('#receiver-city').val();
        receiverInfo.receiverAddress    = $.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverPhone      = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverZip        = $.trim(this.$modalWrap.find('#receiver-zip').val());

        if(this.option.isUpdate){
        	receiverInfo.id = this.$modalWrap.find('#receiver-id').val();
        }

        // 表单验证
        if(!receiverInfo.receiverName){
            result.errMsg = '请输入收件人姓名';
        }
        else if(!receiverInfo.receiverProvince){
            result.errMsg = '请选择收件人所在省份';
        }
        else if(!receiverInfo.receiverCity){
            result.errMsg = '请选择收件人所在城市';
        }
        else if(!receiverInfo.receiverAddress){
            result.errMsg = '请输入收件人详细地址';
        }
        else if(!receiverInfo.receiverPhone){
            result.errMsg = '请输入收件人手机号';
        }
        // 所有验证都通过了
        else{
            result.status   = true;
            result.data     = receiverInfo;
        }
		return result;	
	},
	hide: function(){
		this.$modalWrap.empty();
	}

};

module.exports = page;