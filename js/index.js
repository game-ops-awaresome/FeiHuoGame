/**
 * 
 * @authors lizhi02
 * @date    2016-10-20
 * 
 */
(function(){
	var Webgame = {
		init:function(){
			this.fadeImg("#g_slider");
			this.bindEvent();
			this.slider("#role_mod");
		},
		fadeImg:function(slider_id){
            var gSlider = $(slider_id),
                imgLi =  gSlider.find("li"),
                navLi =  gSlider.find("span"),
                n = imgLi.length-1,
                s = 3000,
                i = 0,
                m = 0,
                roll = function(m){
                    imgLi.eq(i).stop().animate({
                        opacity: "hide",
                        "z-index": 0
                    }, 500, function() {
                        $(this).hide();
                    });
                    imgLi.eq(m).stop().animate({
                        opacity: "show",
                        "z-index": 1
                    }, 500, function() {
                        $(this).show();
                    });
                    navLi.eq(m).addClass("active").siblings().removeClass("active");
                },
                focus = function(){
                    m = m == n ? 0 : ++m;
                    i = m ? m - 1 : n;
                    roll(m);
                };
            t = setInterval(focus, s);
            imgLi.eq(0).show().css("z-index", 1);
            gSlider.hover(function(){
                clearInterval(t);
            }, function() {
                t = setInterval(focus, s);
            });
            navLi.click(function() {
                imgLi.hide().css("z-index", 0);
                clearInterval(t);
                roll($(this).index());
            })
        },
        bindEvent:function(){
        	$(".m-news-tab a").mouseover(function() {
				var _index = $(".m-news-tab a").index(this);
				$(this).addClass("active").siblings().removeClass("active");
				$(".m-news-bd .m-news-cont").eq(_index).show().siblings(".m-news-cont").hide();
			});
			$(".data-tit").mouseover(function(event) {
				var name = $(this).attr("data-name");
				$("#data_mod").attr("class","m-data active-"+name);
			});
			$(".data-box img").on("click",function(){
				$(".img_box").remove();
				$.ydapp.img_box.Class({
					"indexImg":parseInt($(this).attr("index")),
					"imgSrcArr":img_box_arr,
					"bgshow":!0
				})
			});
        },
        slider:function(roll_id){
        	var slider_con = $(roll_id);
		    var sWidth = slider_con.width(); //获取焦点图的宽度（显示面积）
		    var len =  slider_con.find(".slider-img li").length; //获取焦点图个数
		    var slider_ul = slider_con.find(".slider-img ul");
		    var index = 0;
		    var picTimer;
		    //上一页按钮
		    slider_con.find(".btn-prev").click(function () {
		        index -= 1;
		        if (index == -1) { index = len - 1; }
		        showPics(index);
		    });
		    //下一页按钮
		    slider_con.find(".btn-next").click(function () {
		        index += 1;
		        if (index == len) { index = 0; }
		        showPics(index);
		    });
		    slider_ul.css("width", sWidth * (len));

		    //鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
		    //  slider_con.hover(function () {
		    //     clearInterval(picTimer);
		    // }, function () {
		    //     picTimer = setInterval(function () {
		    //         showPics(index);
		    //         index++;
		    //         if (index == len) { index = 0; }
		    //     }, 3000);
		    // }).trigger("mouseleave");
		    function showPics(index) {
		        var nowLeft = -index * sWidth; //
		        slider_ul.stop().animate({ "left": nowLeft }, 500); 
		    }
        }
	}
	Webgame.init();
})()

