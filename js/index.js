;(function(){
	$(function(){
		$(window).resize(function(){
			bannerSize();
		});
		// 焦点图滚动
		bannerSize();
		bannerPlay();
		var index = 0;          //当前显示图片的索引
		function bannerSize(){
			// 设置banner宽高
			var $banner = $(".banner");
			var bannerWidth = $(window).width();
			var bannerHeight = $(window).height();
			$banner.css({
				"height" : bannerHeight + "px"
			});
			//设置图片宽度
			var $img = $(".banner-pic img");
			$img.width(bannerWidth);
			//图片位置初始化
			$(".banner-pic").animate({
				"left" : 0 + "px"
			});
			index = 0;
			// 设置banner-pic宽
			var $bannerPic = $(".banner-pic");
			var bannerPicWidth = ($img.eq(0).width()) * $img.length;
			$bannerPic.width(bannerPicWidth + "px");
			//动态添加banner-btn按钮
			$(".banner-btn").empty();
			$img.each(function(){
				$(".banner-btn").append("<span></span>");
			});
			$(".banner-btn span").eq(0).addClass("active");
			//banner-btn按钮点击事件
			$(".banner-btn span").click(function(){
				$(this).addClass("active").siblings().removeClass("active");
				$(".banner-pic").animate({
					"left" : -($(".banner").width() * $(this).index()) + "px"
				});
				index = $(this).index();
			});
			
		}
		function bannerPlay(){
			//箭头显示与消失效果
			$(".banner-prev").css("left","-80px");
			$(".banner-next").css("right","-80px");
			$(".banner").hover(function(){
				$(".banner-prev").animate({"left":0});
				$(".banner-next").animate({"right":0});
			},
			function(){
				$(".banner-prev").animate({"left": "-80px"});
				$(".banner-next").animate({"right": "-80px"});
			});
			//箭头点击事件
			$(".banner-next").click(function(){
				moveRight();
				$(".banner-btn span").eq(index).addClass("active").siblings().removeClass("active");
			});
			$(".banner-prev").click(function(){
				moveLeft();
				$(".banner-btn span").eq(index).addClass("active").siblings().removeClass("active");
			});
			//左右轮播函数
			function moveRight(){
				index++;
				if(index == $(".banner-pic img").length){
					index = 0;
				}
				$(".banner-pic").animate({
					"left" : -($(".banner").width() * index) + "px"
				});
			}
			function moveLeft(){
				index--;
				if(index == -1){
					index = $(".banner-pic img").length -1;
				}
				$(".banner-pic").animate({
					"left" : -($(".banner").width() * index) + "px"
				});
			}
		}

		//nav点击事件
		$(".nav li").click(function(){
			var targetTop = $(".scrollIndex").eq($(this).index()).offset().top-50;
			$("html body").animate({"scrollTop":targetTop},1000);
		});
		


	});
	



})();