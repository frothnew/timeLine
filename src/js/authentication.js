function authorDialog(callback,container) {
	/*创建元素*/
	var $div = $('.author-box');
	if (!$div.length) {
		var html = '';
		html += '<div class="author-dialog">';
		html += '<div class="author-box">';
		html += '<div class="pb-title"></div>';
		html += '<div class="pb-int flex flex-center align-center">';
		html += '<span class="flex flex-center align-center"></span>';
		html += '<span class="flex flex-center align-center"></span>';
		html += '<span class="flex flex-center align-center"></span>';
		html += '<span class="flex flex-center align-center"></span>';
		html += '<span class="flex flex-center align-center"></span>';
		html += '<span class="flex flex-center align-center"></span>';
		html += '</div>';
		html += '<div class="pb-keyboard flex flex-wrap flex-space align-center">';
		html += '<span class="figure">1</span>';
		html += '<span class="figure">2</span>';
		html += '<span class="figure">3</span>';
		html += '<span class="figure">4</span>';
		html += '<span class="figure">5</span>';
		html += '<span class="figure">6</span>';
		html += '<span class="figure">7</span>';
		html += '<span class="figure">8</span>';
		html += '<span class="figure">9</span>';
		html += '<span class="pb-empty"><svg class="iconfont" aria-hidden="true"><use xlink:href="#icon-clear"></use></svg></span>';
		html += '<span class="figure">0</span>';
		html += '<span class="pb-del"><svg class="iconfont" aria-hidden="true"><use xlink:href="#icon-delete"></use></svg></span>';
		html += '</div>';
		html += '</div>';
		html += '<div class="author-box-shadow"></div>';
		html += '</div>';
		$(container).append(html);
	}

	/*this*/
	var that = this;

	/*密码 数组*/
	var arr = [];

	/*数字键盘 点击*/
	$('.author-box .pb-keyboard').on('click','.figure',function () {
		var $span = $(this);
		var $spans = $('.author-box .pb-int span');
		if (arr.length < 6) {
			arr.push($span.html());
		}
		$spans.each(function (i,e) {
			var $e = $(e);
			if (!$e.html()) {
				$e.html('<svg class="iconfont" aria-hidden="true"><use xlink:href="#icon-xin-pixel"></use></svg>');
				return false;
			}
		});
		if (arr.length == 6) {
			var ret = {};
			var err = "";
			ret.password = arr.join('');
			callback.call(that,ret,err);
		}
	});

	/*删除 数字*/
	$('.author-box .pb-del').click(function () {
		var $spans = $('.author-box .pb-int span');
		if (arr.length > 0) {
			arr.splice(arr.length - 1, 1);
		}
		for (var i=arr.length;i>-1;i--) {
			var $e = $spans.eq(i);
			if ($e.html()) {
				$e.html('');
				break;
			}
		}
	});

	/*清空 数字*/
	function empty() {
		arr = [];
		var $spans = $('.author-box .pb-int span');
		$spans.each(function (i,e) {
			var $e = $(e);
			$e.html('');
		});
	}
	this.empty = function () {
		empty();
	}
	$('.author-box .pb-empty').click(function () {
		empty();
	});

	/*打开弹框*/
	function open() {
		$('.author-box').closest(container).attr("isdialog", "true");
		$('.author-box-shadow').fadeIn();
	}
	this.open = function (obj) {
		if (obj) {
			$('.author-dialog .pb-title').html(obj.title);
		}
		open();
	}

	/*关闭弹框*/
	function close() {
		$('.author-box').closest(container).attr("isdialog", "false");
		$('.author-box-shadow').fadeOut();
		empty();
	}
	this.close = function () {
		close();
	}
	$('.author-box-shadow').click(function () {
		close();
	});
}
