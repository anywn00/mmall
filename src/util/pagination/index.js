/*
* @Author: 第九
* @Date:   2017-10-13 12:28:43
* @Last Modified by:   第九
* @Last Modified time: 2017-10-16 09:45:19
*/
require('./index.css');
var _mm = require('util/mm.js');
var paginationTemplate = require('./index.string');

var Pagination = function(){
	var _this = this;
	this.defaultOption = {
		container 	: null,
		pageRange  	: 3,
		pageNum		: 1,
		onSelect	: null
	};
	$(document).on('click','.pg-item',function(){
		var $this = $(this);
		if($this.hasClass('active') || $this.hasClass('disabled')){
			return;
		}
		typeof _this.option.onSelect === 'function' 
		? _this.option.onSelect($this.data('value')) : null;
	});
};
//加载page模板
Pagination.prototype.render = function(option){
	this.option = $.extend({},this.defaultOption,option);
	//不是jQuery对象 不显示
	if(!(this.option.container instanceof jQuery)){
		return;
	}
	//只有一页不显示
	if(this.option.pages <= 1){
		return;
	}
	this.option.container.html(this.getTemplateHtml());
};
//获取模板
Pagination.prototype.getTemplateHtml = function(){
	var html        = '',
		option 		= this.option,
		pageArray 	= [],
		start		= option.pageNum - option.pageRange > 0 
			? (option.pageNum - option.pageRange) : 1,
		end 		= option.pageNum + option.pageRange < option.pages
			? (option.pageNum + option.pageRange) : option.pages;
	//封装page信息
	pageArray.push({
		name 		: '上一页',
		value 		: option.prePage,
		disabled 	: !option.hasPreviousPage
	});

	for(var i = start; i <= end; i++){
		pageArray.push({
			name : i,
			value : i,
			active : (i === option.pageNum)
		})
	}

	pageArray.push({
		name : '下一页',
		value : option.nextPage,
		disabled : !option.hasNextPage
	})	

	//获取模板html
	html = _mm.renderHtml(paginationTemplate,{
		pageArray 	: pageArray,
		pages		: option.pages,
		pageNum		: option.pageNum
	});
	return html;
};


module.exports = Pagination;
