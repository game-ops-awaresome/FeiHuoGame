$.extend({
	//用于注册命名空间
	registerNameSpace : function(packageName){
		packageName = packageName.replace(/^\.+|\.+$/g, '');
		var prefix = this;
		this.each(packageName.split('.'), function(index, item){
			if(!prefix[item]){
				prefix[item] = {};
			}
			prefix = prefix[item];
		});
		
		return $.isEmptyObject(prefix);
	}
});

(function($){
if(!$.registerNameSpace("ydapp.img_box")){return false;}
$.registerNameSpace("ydapp.img_box");
/**************************************************************************************/
/*滚动类*/
$.ydapp.img_box.Class=function(options){
	options=options||{};
	var indexImg=options.indexImg||0;
	var imgSrcArr=options.imgSrcArr||[];
	var bgshow=options.bgshow||!0;
	var imgArrLen=imgSrcArr.length;
	var img_WH_arr=new Array(imgArrLen);
	if(imgArrLen>0){
		var newimg=new Array(imgArrLen);
		$(imgSrcArr).each(function(i){
			/*图片预加载*/
			newimg[i] = new Image();
			newimg[i].src=imgSrcArr[i];
			if (newimg[i].complete){
				img_WH_arr[i]={w:newimg[i].width, h:newimg[i].height};
			 }else{
				$(newimg[i]).load(function(){
					img_WH_arr[i]={w:this.width,h:this.height};
				});
			}
		});
	};
	var boxTemplate='<div class="bgshow"></div><div class="img_box"><a href="javascript:;" class="ib_exist"><i class="bar_ie6"></i></a><a href="javascript:;" class="ib_prev"><i class="bar_ie6"></i></a><a href="javascript:;" class="ib_next"><i class="bar_ie6"></i></a><div class="ib_info"></div><div class="ib_img"><img src="" title="" /></div></div>';
	if($(".img_box").length==0){$("body").prepend(boxTemplate)};
	var bgshowObj=$(".bgshow");
	var img_box=$(".img_box");
	var existBar=img_box.find(".ib_exist");
	var prevBar=img_box.find(".ib_prev");
	var nextBar=img_box.find(".ib_next");
	var img_info=img_box.find(".ib_info");
	var img_obj=img_box.find("img").attr("src",imgSrcArr[indexImg]).hide();
	var img_box_padding=parseInt(img_box.css("paddingTop"))*2;
	var img_boxWidth=(img_obj.width()>0)?img_obj.width():300;
	var img_boxHeight=(img_obj.height()>0)?img_obj.height():300;
	img_box.show().css({
		'width': img_boxWidth,
		'height': img_boxHeight,
		'marginTop': -(img_boxHeight+img_box_padding)/2,
		'marginLeft': -(img_boxWidth+img_box_padding)/2
	});
	if(bgshow){
		bgshowObj.show();
		if($.browser.msie && $.browser.version=="6.0"){
			bgshowObj.height($.getScrollHeight());
			window.onresize=function(){
				img_box.remove();
				bgshowObj.remove();
			}
		}
	}
	/*初始化*/
	init();
	function init(){
		img_obj.attr("src",imgSrcArr[indexImg]).hide();
		img_info.html(indexImg+1+" / "+imgArrLen);
		if(typeof img_WH_arr[indexImg] =="object"){
			animate();
		}else{
			img_obj.load(function(){
				img_WH_arr[indexImg]={w:$(this).width(), h:$(this).height()};
				animate();
			});
		}
	}
	function animate(){
		existBar.hide();
		var activeImg=img_WH_arr[indexImg];
		img_box.animate({
			'width': activeImg.w,
			'height': activeImg.h,
			'marginTop':-(activeImg.h+img_box_padding)/2,
			'marginLeft':-(activeImg.w+img_box_padding)/2
		},200,function(){
			img_obj.fadeIn('150',function(){
				existBar.fadeIn('300');						  
			});
		});
	}
	function returnIndex(index,n){
		var reval=0;
		if(n<0){
			reval =  ((index-1)<=0)?imgArrLen-1:(index-1);
		}else{
			reval = ((index+1)>=imgArrLen)?0:(index+1);
		}
		return reval;
	}
	
	nextBar.click(function(){
		indexImg=returnIndex(indexImg,1);
		init();
		return false;
	});
	prevBar.click(function(){
		indexImg=returnIndex(indexImg,-1);
		init();
		return false;
	});
	img_box.hover(function(){
		if(imgArrLen>1){
			prevBar.fadeIn('200');
			nextBar.fadeIn('200');
		}
	},function(){
		if(imgArrLen>1){
			prevBar.fadeOut('200');
			nextBar.fadeOut('200');
		}
	});
	
	existBar.click(function(){
		img_box.fadeOut('200',function(){
			$(this).remove();
			bgshowObj.remove();
		});		
		return false;
	});
}

})(jQuery);

