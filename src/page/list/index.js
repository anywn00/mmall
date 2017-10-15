/*
* @Author: 第九
* @Date:   2017-10-12 16:03:54
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-12 23:13:52
*/
require('./index.css');
require('../common/nav/index.js');
require('../common/crumb/index.js');
require('../common/header/index.js');

var listTemplate= require('./list.string');
var _mm 		= require('util/mm.js');
var _product	= require('service/product-service.js');

var page = {
	data : {
		categoryId  : _mm.getUrlParam('categoryId') || '',
		keyword 	: _mm.getUrlParam('keyword') || '',
		orderBy 	: _mm.getUrlParam('orderBy') || 'default',
		pageNum 	: 1,
		pageSize 	: 20
	},
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		this.loadList();
	},
	bindEvent: function(){
		var _this = this;
		$('.sort-item').click(function(){
			var $this = $(this),
				type = $this.data('type');
			if('default' === type){
				//已经是active了
				if($this.hasClass('active')){
					return;
				}
				//其他
				else {
					$this.addClass('active').siblings().removeClass('active asc desc');
					_this.data.orderBy = 'default';
				}
			} else if('price' === type){
				//active class 处理
				$this.addClass('active').siblings().removeClass('active asc desc');
				//升序降序处理
				if(!$this.hasClass('asc')){
					$this.addClass('asc').removeClass('desc');
					_this.data.orderBy = 'asc';
				}else{
					$this.addClass('desc').removeClass('asc');
					_this.data.orderBy = 'desc';
				}
			}
			_this.loadList();
		});
	},
	loadList: function(){
		var _this 		= this,
			$listCon 	= $('.p-list-con');
		//删除冗余的字段
		this.data.categoryId ? (delete this.data.keyword) : (delete this.data.categoryId);
		//加载分页
		_product.list(this.data,function(res){
			var result = _mm.renderHtml(listTemplate,res);
			$listCon.html(result);

			_this.loadPagation({});

		},function(errMsg){
			$listCon.html(errMsg);
		})
	},
	loadPagation: function(pageInfo){

	}
	

};

$(function(){
	page.init();
})