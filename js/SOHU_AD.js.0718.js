/*
	@author 朱现明
	@desr 雷克萨斯侧边栏纵观天地广告
	@time 2013/7//23
*/

 SOHU_AD = {
		 uitls : {},
		 topad : {}
};			

 SOHU_AD.utils = (function($) {//工具模块
	var defaults = {
		src: null,//源
		name: null,
		width: null,
		height:null,
		wmode: "transparent",
		allowScriptAccess: "always",
		link: null,//连接地址
		id: null//div的ID
	},
	opt,
	addFlash = function(options) {//添加flash
		opt = $.extend(defaults, options);
		 var sohuFlash2 = new sohuFlash(opt.src, opt.name, opt.width, opt.height,"7");
    	sohuFlash2.addParam("quality", "high");
    	sohuFlash2.addParam("wmode",opt.wmode);
   		sohuFlash2.addParam("allowScriptAccess", opt.allowScriptAccess);
   	 	sohuFlash2.addVariable("clickthru",escape(opt.link));
    	sohuFlash2.write(opt.id);
		return this;
	},
	addImg = function(options) {//添加图片
		opt = $.extend(defaults, options);
		var margin = ($(window) .width()- opt.width) / 2,
			width = (opt.width - 950) / 2,
			height = opt.height,
			$wrap =  $('#' + opt.id);
		$wrap.css( "background", 'url("' + opt.src + '") no-repeat 50% 0' );
		$('<div id = "_left"></div>').css({//加入左端图片可点击区域
			left: margin + 'px',
			position: 'absolute',
			width: width,
			height: height,
			cursor: 'pointer'
		}).appendTo($wrap);
		$('<div id = "_right"></div>').css({//加入右端图片可点击区域
			right: margin + 'px',
			position: 'absolute',
			width: width,
			height: height,
			cursor: 'pointer'
		}).appendTo($wrap);
		$wrap.delegate("div", "click", function() {window.open(opt.link);});
	},
	checkCookie = function(cookie) {//检查cookie
		if(cookie == null) return true;
		var sohuvd = new Cookie(document, cookie.name, cookie.time);
		sohuvd.load();
		sohuvd.vi = sohuvd.vi || 1;
		if(sohuvd.vi > cookie.count) { 
			return false;
		}else {
			sohuvd.vi++;
			sohuvd.store();
			return true;
		}
	},
	/*
	deleteOver = function($nodes) {//防止flash遮挡中间950px的内容
		$nodes.each(function() {
			var width = $(this).width();
			if(width > 950) {
				$(this).css({
						'position': 'relative',
						'z-index':-10		
				});
				deleteOver($(this).children("div"));		
			}
		});
		//$(".navtit").css("z-index", 20);
		//$(".nav").css("z-index", 20);
		return;
	},*/
	
	deleteOver = function($nodes) {//防止flash遮挡中间950px的内容
		$(".tnav").css({
						'position': 'relative',
						'z-index':10		
		});
		$("#mq2").css({
						'position': 'relative',
						'z-index':10		
		});
		$(".carmode").css({
						'position': 'relative',
						'z-index':10		
		});
		$("#mq5").css({
						'position': 'relative',
						'z-index':10		
		});
		$(".aream").css({
						'position': 'relative',
						'z-index':10		
		});
		$("#area-price").css({
						'position': 'relative',
						'z-index':10		
		});
		$(".ad_cn").css({
						'position': 'relative',
						'z-index':10		
		});
		$(".seachcon").css({
						'position': 'relative',
						'z-index':10		
		});
		$(".areabor").css({
						'position': 'relative',
						'z-index':10		
		});
		$(".area").css({
						'position': 'relative',
						'z-index':10		
		});
		$(".navtit").css({
						'position': 'relative',
						'z-index':20		
		});
		$(".nav").css({
						'position': 'relative',
						'z-index':20		
		});
		return;
	},
		ad_close = function(ad_close) {
			return $('<div id = "ad_close"></div>').css({'top': ad_close.top, 'right': ad_close.right, 'width': 39, 'height': 15,'cursor': 'pointer',  'position': 'absolute', 'z-index':ad_close["z-index"], 'background': 'url(http://images.sohu.com/bill/s2012/gates/all/close.png)'})
			.hover(function() {
					$(this)	.css( 'background', 'url(http://images.sohu.com/bill/s2012/gates/all/close_h.png)');	
			}, function() {
					$(this).css( 'background', 'url(http://images.sohu.com/bill/s2012/gates/all/close.png)');
			}).appendTo($('#' + ad_close.wrapId));
		},
		ad_replay = function(ad_replay) {
			return $('<div id = "ad_close"></div>').css({'top': ad_replay.top, 'right': ad_replay.right, 'width': 39, 'height': 15,
								'cursor': 'pointer',  'position': 'absolute', 'z-index':ad_replay["z-index"], 
								'background': 'url(http://images.sohu.com/bill/s2012/gates/all/close.png)'})
				.hover(function() {
					$(this)	.css( 'background', 'url(http://images.sohu.com/bill/s2012/gates/all/replay_h.png)');	
				}, function() {
					$(this).css( 'background',  'url(http://images.sohu.com/bill/s2012/gates/all/replay.png)');
				}).appendTo($('#' + ad_replay.wrapId));
		},
		getFlashMovieObject = function(movieName) {
    		if (navigator.appName.indexOf("Microsoft") != -1){
     			 return window[movieName]
    		} else {
      			return document[movieName]
   		 	}
			return false;
  		},
 	setFixedIEPosition = function(_cont) {
    		var _top = parseInt(_cont.css("top")),
    			_bottom = parseInt(_cont.css("bottom"));
    		_cont.css('position','absolute');
    		if (!isNaN(_top)) {
      				_cont[0].style.setExpression('top',
					 'eval($(document).scrollTop() >30 ?  ($(document).scrollTop() + 0)  :  0 + ' + _top + ') + "px"');
			}
    		if (!isNaN(_bottom)) {
      			_cont[0].style.setExpression('top', 'eval((document.documentElement).scrollTop - ' + _bottom + ' + 					(document.documentElement).clientHeight-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0) 	-(parseInt(this.currentStyle.marginBottom,10)||0) ) + "px"');
    		}
    		if (document.body.currentStyle.backgroundAttachment !== 'fixed') {
      			html = document.getElementsByTagName('html')[0],
      			html.style.backgroundImage = 'url(about:blank)';
      			html.style.backgroundAttachment = 'fixed';
    		}
  	};
	return {
		addFlash: addFlash,
		addImg: addImg,
		checkCookie: checkCookie,
		deleteOver: deleteOver,
		ad_close:ad_close,
		ad_replay: ad_replay,
		getFlashMovieObject: getFlashMovieObject,
		setFixedIEPosition: setFixedIEPosition
	};
})(jQuery);
 
 SOHU_AD.topad = (function($) {//头部广告模块
	var utils = SOHU_AD.utils,
		defaults = {
			flash: false,
			isScroll: false,
			name: "bg_flash",
			top: 0,
			src: null,
			link: null,
			width: null,//flash
			height: null,//flash
			initCallback:null,
			showCallback: null,
			hideCallback: null,
			id: "topAdWrapper",
			alt_pic:null,
			cookie: {
				name: null,
				time: 24,
				count: 2
			},
			ad_left_close:{
				'top': 80,
      			'right': 2,
      			'z-index': 1001,
				'wrapId': 'mq2'
			},
			ad_right_close:{
				'top': 80,
      			'right': 2,
      			'z-index': 1001,
				'wrapId': 'mq2'
			},
			ad_replay: {
				'top': 80,
      			'right': 45,
      			'z-index': 1001,
				'wrapId': '#mq2'
			}
		},
		opt,
		_init = function(options) {//初始化
			opt = $.extend(true, defaults, options);
			cookie = utils.checkCookie(opt.cookie);
			$('<div></div>').attr('id', 'topAd').css({
				"margin":  "o auto",
				'top': opt.top + 'px',
				"width": $(window).width() + 'px',//div
				"height": $(window).height() + 'px',//div
				'z-index': 1,
				"overflow": "hidden",
				"position": cookie ? 'fixed': 'absolute'
			}).append('<div id = "topAdWrapper" style = "margin: 0 auto;width: 100%; height: 100%"></div>').appendTo('body').hide();		 
			 utils.deleteOver($("#topAd").siblings());
			if(opt.flash && cookie){
				utils.addFlash(opt);//addflash
				if($.browser.msie  && $.browser.version == "6.0"){
					opt.isScroll = false;
      				$('#topAd,#topAdWrapper, #bg_flash').css({
						'width': $(window).width(),
						'height': $(window).height()
      				});
      				utils.setFixedIEPosition($('#topAd'));
					$(window).scroll(function() {//传递给flash滚动的位置
							utils.getFlashMovieObject("bg_flash").SetVariable("lqY", $(document).scrollTop()/$(document).height() * 1000);						
					});
    			}
			}else{
				opt.src = opt.alt_pic;
				opt.width = 1250;
				opt.height = 621;
				opt.flash = false;
				opt.isScroll = false;
				utils.addImg(opt);//addimg
			}
			if(opt.flash && opt.initCallback) opt.initCallback();
			return this;
		},
		show = function() {//显示
			$('#topAd').show();
			if(!cookie) {
				utils.ad_close(opt.ad_left_close).bind("click", function(event) {
					event.stopPropagation();
					$('#topAd').hide();
				});
				utils.ad_close(opt.ad_right_close).bind("click", function(event) {
					event.stopPropagation();
					$('#topAd').hide();
				});
			}
			if(opt. showCallback) opt.showCallback();
			return this;
		},
		control = function() {//控制
			var temp = true;
			if(opt.isScroll) {//是否要滚动
				if($(document).scrollTop() > 30 ){
					$("#topAd").css("top", 0);
				} else {
					$("#topAd").css("top", '30px');
				}
			 	$(window).scroll(function() {//传递给flash滚动的位置
					if(opt.isScroll) {
						utils.getFlashMovieObject("bg_flash").SetVariable("lqY", $(document).scrollTop()/$(document).height() * 1000);						
						if($(document).scrollTop() < 30) {
							$("#topAd").css("top", '30px');
						} else {
							$("#topAd").css("top", 0);
						}
					}
				});
			}
			 window.adTallest = {};//close flash
			 adTallest.close = function() {
				hide();
			};
			if($(window).width() <= 1024) {
				this.hide();
			}
			return this;
		},
		hide = function() {//隐藏
			$('#topAd').hide();
			opt.isScroll = false;
			if(opt. hideCallback) opt.hideCallback();
			return this;
		};
		return {
			init: _init,
			show: show,
			control: control,
			hide: hide
		};
})(jQuery);