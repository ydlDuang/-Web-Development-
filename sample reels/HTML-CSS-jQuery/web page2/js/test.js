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
$.fn.UiTab = function(){
	var ui = $(this);
	var tabs = $('.tab .link',ui);
	var cons = $('.hospital-content > .item',ui);

	tabs.on('click',function(){
		var index = $(this).index();
		tabs.removeClass('link_focus').eq(index).addClass('link_focus');
		cons.hide().eq(index).show();
		return false;
	})
}

//ui-slider
$.fn.UiSlider = function(){
	var ui =$(this);
	var wrap = $('.table');
	var btn_prev = $('.left .prev',ui);
	var btn_next = $('.right .next',ui);
	var items = $('.table .week',ui);
	var leftValue = wrap.position().left;

	//预定义
	var current = 0;
	var size = items.size();
	var width = items.eq(0).width();

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
		$(this).css('left',leftValue+index*width*-1);
	});

	//事件
	btn_prev.on('click',function(){
		wrap.triggerHandler('move_prev');
	});
	btn_next.on('click',function(){
		wrap.triggerHandler('move_next');
	});
}

//排班的表格日期的显示
$.fn.DateShow = function(){
	var table = $(this);
	var items = $('.item',table);
	var header = $('.item > .date',table);
	var date = new Date();
	var weeks = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
	var days = [31,28,31,30,31,30,31,31,30,31,30,31];

	for(var i = 0; i < items.length; i++){
		//今天的日期和星期
		var today = date.toLocaleDateString();
		var todayWeek = date.getDay();
		//记录显示的变量
		var week = weeks[(todayWeek+i)%7];
		var year = parseInt(date.getFullYear());
		var month = parseInt(date.getMonth()+1);
		var day = parseInt(date.getDate()+i);
		
		if(day <= days[date.getMonth()]){
			header.eq(i).text(week+"\r\n"+year+"-"+month+"-"+day);
			if(month < 10){
				if(day < 10){
					header.eq(i).text(week+"\r\n"+year+"-"+('0'+month.toString())+"-"+('0'+day.toString()));
				}else{
					header.eq(i).text(week+"\r\n"+year+"-"+('0'+month.toString())+"-"+day);
				}
			}else{
				if(day < 10){
					header.eq(i).text(week+"\r\n"+year+"-"+month+"-"+('0'+day.toString()));
				}else{
					header.eq(i).text(week+"\r\n"+year+"-"+month+"-"+day);
				}
			}
		}else{
			day = day-days[date.getMonth()];
			if(month < 12){
				month++;
			}
			else{
				year++;
				month = month%12+1;
			}
			if(month < 10){
				if(day < 10){
					header.eq(i).text(week+"\r\n"+year+"-"+('0'+month.toString())+"-"+('0'+day.toString()));
				}else{
					header.eq(i).text(week+"\r\n"+year+"-"+('0'+month.toString())+"-"+day);
				}
			}else{
				if(day < 10){
					header.eq(i).text(week+"\r\n"+year+"-"+month+"-"+('0'+day.toString()));
				}else{
					header.eq(i).text(week+"\r\n"+year+"-"+month+"-"+day);
				}
			}
		}
	}
}

//页面的脚本逻辑
$(function(){
	$('.ui-search').UiSearch();
	$('.content').UiTab('.caption > .item','.block > .item');
	$('.time-table').UiSlider();
	$('.time-table .table').DateShow();
});