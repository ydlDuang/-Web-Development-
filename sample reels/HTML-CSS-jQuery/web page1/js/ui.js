//弹出层
$.fn.LayerPop = function(){
	this.click(function(){
		var layer = $('.layer');
		var tabs = $('.box-tab a',layer);
		var cons = $('.box-content > div',layer);
		var loginLayer = $('.login-content',layer);
		var registerLayer = $('.register-content',layer);
		var loginUser = $('.user',loginLayer);
		var registerUser = $('.user',registerLayer);
		var password = $('.password',layer);
		var verify = $('.veri-code',layer);

		//清空文本框
		$('input:text,input:password',layer).val('');
		$('.tip',layer).text('');

		layer.show();
		tabs.removeClass('tab_focus');
		$('.box-tab .tab-'+this.id,layer).addClass('tab_focus');
		cons.hide();
		$('.box-content .'+this.id+'-content',layer).show();
		$('.box-close',layer).click(function(){
			$('.layer').hide();
		});
		if(this.id === 'login'){
			$('.box',layer).css('height','400px');
		}else{
			$('.box',layer).css('height','350px');
		}
		tabs.click(function(){
			var index = $(this).index();
			tabs.removeClass('tab_focus').eq(index).addClass('tab_focus');
			cons.hide();
			cons.eq(index).show();
			if(index == 0){
				$('.box',layer).css('height','400px');
			}else{
				$('.box',layer).css('height','350px');
			}
		});

		//判断登录账号
		loginUser.focusout(function(){
			if(isNaN(parseInt(loginUser.val()))){
				$('.user+.tip',loginLayer).text('请输入正确的邮箱或手机号');
			}else if(loginUser.val().length!=11){
				$('.user+.tip',loginLayer).text('请输入正确的邮箱或手机号');
			}else{
				$('.user+.tip',loginLayer).text('');
			}
		});

		//判断注册账号
		registerUser.focusout(function(){
			if(isNaN(parseInt(registerUser.val()))){
				$('.user+.tip',registerLayer).text('请输入正确的邮箱或手机号');
			}else if(registerUser.val().length!=11){
				$('.user+.tip',registerLayer).text('请输入正确的邮箱或手机号');
			}else{
				$('.user+.tip',registerLayer).text('');
			}
		});

		//判断密码
		password.focusout(function(){
			if(password.val().length<6 || password.val().length>16 || password.val().indexOf(' ')!=-1){
				console.log(password.val().length);
				console.log(password.val().indexOf(' '));
				$('.password+.tip').text('请输入6-16位密码，区分大小写，不能使用空格！');
			}else{
				$('.password+.tip').text('');
			}
		});

		//判断验证码
		verify.focusout(function(){
			if(verify.val().toLowerCase() !== 'gyyd'){
				$('.veri-image+.tip').text('验证码错误');
			}else{
				$('.veri-image+.tip').text('');
			}
		});
	})
}

//ui-search定义
$.fn.UiSearch = function(){
	var ui = $(this);
	$('.ui-search-selected', ui).on('click', function(){
		$('.ui-search-select-list').show();
		return false;
	});
	$('.ui-search-select-list a', ui).on('click', function(){
		$('.ui-search-selected').text($(this).text());
		$('.ui-search-select-list').hide();
		return false;
	});
	$('body').on('click',function(){
		$('.ui-search-select-list').hide();
	})
}

//ui-tab定规
/**
@param {string} header TAB组件，所有选项卡 item
@param {string} content TAB组件，内容区域，所有 item
*/
$.fn.UiTab = function(header,content){
	var ui = $(this);
	var tabs = $(header,ui);
	var cons = $(content,ui);
	var floorArrow = $('.content-item .caption .tab .floor-arrow',ui);
	var floorLeft = floorArrow.position().left;

	tabs.on('click',function(){
		var index = $(this).index();

		tabs.removeClass('tab_focus').eq(index).addClass('tab_focus');
		console.log(floorArrow.position().left+80*index);
		floorArrow.css('left',floorLeft+80*index+'px');
		cons.hide().eq(index).show();
		return false;
	})
}

//ui-backTop
$.fn.UiBackTop = function(){
	var ui = $(this);
	var el = $('.flow-banner .backTop');

	var windowHeight = $(window).height();
	el.on('click',function(){
		$(window).scrollTop(0);
	})
}

//ui-flow-floor
$.fn.UiLocate = function(){
	var ui = $(this);
	var el = $('.content .ui-flow-floor');
	var items = $('.content .content-item');
	var currentId = "";
	var floorName = ["服饰","美妆","手机","家电","数码"];
	var floorNum = ["F1","F2","F3","F4","F5"];

	$(document).on('scroll',function(){
		var sTop = $(document).scrollTop();
		//楼层二top偏移量
		var bTop = items.eq(1).offset().top;
		if(sTop > bTop-$(window).height()){
			el.show();
		}else{
			el.hide();
		}

		items.each(function(){
			var itemTop = $(this).offset().top;
			//大部分内容出现时，导航条焦点跳到相应位置
			if(sTop > itemTop-300){
				currentId = $(this).attr("id");
			}else{
				return false;
			}
		});

		var currentLink = el.find('.current');
		if(currentId && currentLink.attr('href')!=currentId){
			var navs = $('.content .ui-flow-floor a');
			for(var i = 0; i < navs.length; i++){
				navs.eq(i).text(floorNum[i]);
			}
			currentLink.removeClass('current');
			el.find("[href='#"+currentId+"']").addClass('current').text(floorName[parseInt(currentId.substr(1,1))-1]);
		}
	});
}

//ui-slider
$.fn.UiSlider = function(){
	var ui =$(this);
	var wrap = $('.ui-slider-wrap');
	var btn_prev = $('.ui-slider-arrow .left',ui);
	var btn_next = $('.ui-slider-arrow .right',ui);
	var items = $('.ui-slider-wrap .item',ui);
	var tips = $('.ui-slider-process .item',ui);

	//预定义
	var current = 0;
	var size = items.size();
	var width = items.eq(0).width();
	var enableAuto = true;

	//设置自动滚动感应
	ui
	.on('mouseover',function(){
		enableAuto = false;
	})
	.on('mouseout',function(){
		enableAuto = true;
	})

	//具体操作
	wrap
	.on('move_prev',function(){
		if(current <= 0){
			current = size;
		}
		current--;
		wrap.triggerHandler('move_to',current);
	})
	.on('move_next',function(){
		if(current >= size-1){
			current = -1;
		}
		current++;
		wrap.triggerHandler('move_to',current);
	})
	.on('move_to',function(evt,index){
		$(this).css('left',index*width*-1);
		tips.removeClass('item_focus').eq(index).addClass('item_focus');
	})
	.on('auto_move',function(){
		setInterval(function(){
			enableAuto && wrap.triggerHandler('move_next');
		},2000);
	})
	.triggerHandler('auto_move');

	//事件
	btn_prev.on('click',function(){
		wrap.triggerHandler('move_prev');
	});
	btn_next.on('click',function(){
		wrap.triggerHandler('move_next');
	});
	tips.on('click',function(){
		var index = $(this).index();
		wrap.triggerHandler('move_to',index);
	});
}

//页面的脚本逻辑
$(function(){
	$('#login,#register').LayerPop();
	$('.ui-search').UiSearch();
	$('.content').UiTab('.content-item:nth-child(1) .caption .tab a','.content-item:nth-child(1) .block > .item');
	$('.content').UiTab('.content-item:nth-child(2) .caption .tab a','.content-item:nth-child(2) .block > .item');
	$('.content').UiTab('.content-item:nth-child(3) .caption .tab a','.content-item:nth-child(3) .block > .item');
	$('.content').UiTab('.content-item:nth-child(4) .caption .tab a','.content-item:nth-child(4) .block > .item');
	$('.content').UiTab('.content-item:nth-child(5) .caption .tab a','.content-item:nth-child(5) .block > .item');
	$('body').UiBackTop();
	$('body').UiLocate();
	$('.ui-slider').UiSlider();
});