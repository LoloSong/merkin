$(function(){
	$(window).on("load",function(){
		waterFall();
		popup();
	});
	$(window).resize(function(){
		waterFall();
		popup();
	});
	// 瀑布流
	function waterFall(){
		var img = $(".works .container a");
		var imgWidth = img.eq(0).outerWidth() + 20;
		var cols = Math.floor($(window).width() / imgWidth);
		var arrL = [];
		var arrT = [];
		$(".works .container").width(imgWidth * cols).css("margin","0 auto");
		for(var i = 0; i < cols; i++){
			arrT.push(0);
			arrL.push(i * imgWidth);
		}
		$.each(img,function(index,obj){
			var imgMixIndex = getMix();
			$(obj).css({
					"position" : "absolute",	
			});
			$(obj).animate({
					"left" : arrL[imgMixIndex],
					"top" : arrT[imgMixIndex]
			});
			arrT[imgMixIndex] += $(obj).outerHeight() + 20;
			$(".works .container").height(arrT[imgMixIndex]);
		});
		function getMix(){
			var imgHeightMix = arrT[0];
			var index = 0;
			for(var i = 0; i < arrT.length; i++){
				if(arrT[i] < imgHeightMix){
					imgHeightMix = arrT[i];
					index = i;
				}
			}
			return index;
		}
	};
	// 图片弹框
	function popup(){
		//点击关闭弹框
		$(".popup-container div button").click(function(){
			$(".popup").fadeOut();
		});
		$(".popup").click(function(){
			if($(event.target).is(".popup")){
				$(".popup").fadeOut();
			}else{
				return false;
			}
		});
		// 点击出现弹框
		$(".works a").click(function(){
			var img = $(this).find("img");
			var scale = img.width() / img.height();
			$(".popup-container img").height($(window).height() * 0.9);
			$(".popup-container div").height($(window).height() * 0.1 - 20);
			$(".popup-container div").css({"line-height" : $(".popup-container div").height()+"px"});
			$(".popup-container").width($(".popup-container img").height() * scale + 10)	
			$(".popup").fadeIn();
			$(".popup-container img").attr("src",img.attr("src"));
		});
	}
});