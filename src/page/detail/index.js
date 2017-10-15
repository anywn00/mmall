/*
* @Author: Administrator
* @Date:   2017-10-14 12:20:16
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-15 19:59:26
*/
require('./index.css');
require('../common/nav/index.js');
require('../common/crumb/index.js');
require('../common/header/index.js');

var _mm = require('util/mm.js');
var htmlDetailTemplate = require('./index.string');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');

var page = {
	data : {
		productId : _mm.getUrlParam('productId')
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		if(!this.data.productId){
			_mm.goHome();
		}
		this.loadDetail();
	},
	bindEvent: function(){
		var _this = this;
		//数量加减
		$(document).on('click','.p-count-btn',function(){
			var $this = $(this),
				$pCount = $this.parent().find('.p-count'),
				current = parseInt($pCount.val()),
				count   = parseInt(_this.data.detail.stock),
				type = $this.hasClass('plus') ? 'plus' : 'min';
			if(type === 'plus'){
				$pCount.val(current + 1 > count ? count : current + 1);
			}	
			if(type === 'min'){
				$pCount.val(current - 1 < 1 ? 1 : current - 1);
			}
		});
		//加入购物车
		$(document).on('click','.product-cart-btn',function(){
			_cart.addToCart({
				productId 	: _this.data.productId,
				count       : $('.p-count').val()
			},function(){
				window.location.href = './result.html?type=cart-add';
			},function(errMsg){
 				_mm.errorTips(errMsg);
			})
		});
		//鼠标覆盖
		$(document).on('mouseenter','.p-img-item',function(){
			var url = $(this).find('img').attr('src');
			$('.main-img-con img').attr('src',url);
		});
		//鼠标离开
		$(document).on('mouseleave','.p-img-list',function(){
			var url = _this.data.detail.imageHost	 + _this.data.detail.mainImage;
			$('.main-img-con img').attr('src',url);
		});
	},
	//加载商品详情页面
	loadDetail: function(){
		var _this = this,
			$pageCon 	= $('.page-container');

		$pageCon.html('<div class="loading"></div>');	

		_product.getProductDetail(this.data.productId,function(res){
			//缓存住res
			_this.data.detail = res;

			_this.filtData(res);
			var result = _mm.renderHtml(htmlDetailTemplate,res);
			$pageCon.html(result);
		},function(errMsg){
 			$pageCon.html('<p class="err-tip">此商品太淘气，找不到了</p>');
		});		
	},
	filtData: function(data){
		var result = data.subImages.split(',');
		data.imgArr = result;
	}
};

$(function(){
	page.init();
})

