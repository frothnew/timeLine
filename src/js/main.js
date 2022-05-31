	// ******************************
	// Authentication
	var authorDialog = new authorDialog(function(data) {
		if(typeof(data) == "object" && data.password == "220217"){
			$("body").attr("isshow", "true");
			setTimeout(function() {
				$("body").attr("isshows", "true");
			}, 1000);
		}else{
			authorDialog.empty();
			$(".authentication .pb-title").html("居然真的错了！( >﹏<。)");
			setTimeout(function(){
				$(".authentication .pb-title").html("不要再点错了哦！");
			},2000);
		}
	},".authentication");
	// 打开弹框
	$("#myPassword").on("click", function() {
		authorDialog.open({
			title: "不要点错了哦~"
		});
	})
	
	
	$(document).ready(function() {
		// ******************************
		// pastday
		var firstTime = moment("22-02-17", "YY-MM-DD");
		var now = moment();
		var pastday = now.diff(firstTime, "days");
		$(".info .info-pastday").html(pastday);


		// ******************************
		// mian
		$.ajax({
			type: 'GET',
			url: "src/data/timeline.json",
			dataType: 'json',
			success: function(data) {
				// ******************************
				var timelineHtml = '';
				$.each(data.date, function(index, value) {
					// firstFlag
					var firstFlag = "";
					$.each(value.firstflage, function(idx, val) {
						if (idx == 0) {
							firstFlag += val;
						} else {
							firstFlag += "&" + val;
						}
					})
					timelineHtml += '<div class="timeline-row" firstflag="' +
						firstFlag + '">';
					// time
					timelineHtml += '<div class="timeline-time">';
					timelineHtml += '<span>' + value.date + '</span>';
					var add = value.add ? '<svg class="iconfont" aria-hidden="true"><use xlink:href="#icon-address"></use></svg>' + value
						.add : "-";
					timelineHtml += '<small>' + add + '</small>';
					timelineHtml += '</div>';
					// randomBg
					var ranNum = Math.random();
					if (ranNum < 0.5) {
						ranNum = ranNum + 0.5;
					} else if (ranNum >= 0.9) {
						ranNum = ranNum - 0.1;
					}
					ranNum = ranNum.toFixed(2);
					var randomBg = "rgb(123,139,111," + ranNum + ")";
					// icon
					timelineHtml += '<div class="timeline-icon" style="background-color:' + randomBg + '">';
					var weekday = moment(value.date, "YY-MM-DD").weekday();
					var arrWeek = ["xingqi7","xingqi1","xingqi2","xingqi3","xingqi4","xingqi5","xingqi6"];
					timelineHtml += '<svg class="iconfont" aria-hidden="true"><use xlink:href="#icon-'+arrWeek[weekday]+'"></use></svg>';
					timelineHtml += '</div>';
					// content
					timelineHtml += '<div class="panel timeline-content">';
					timelineHtml += '<div class="panel-body">';
					timelineHtml += '<h2>' + value.title + '</h2>';
					// image
					if (value.images) {
						timelineHtml += '<ul class="picture">';
						$.each(value.images, function(idx, val) {
							var showClass = idx == 0 ? "on" : "";
							timelineHtml += '<li class="' + showClass + '">';
							timelineHtml += '<img src="' + val + '">';
							timelineHtml += '</li>';
						})
						timelineHtml += '</ul>';
					}
					// wear
					timelineHtml += '<ul class="wear">';
					$.each(value.details.wear, function(idx, val) {
						timelineHtml += '<li>';
						timelineHtml += val;
						timelineHtml += '</li>';
					})
					timelineHtml += '</ul>';
					// eat
					timelineHtml += '<ul class="eat">';
					$.each(value.details.eat, function(idx, val) {
						timelineHtml += '<li>';
						timelineHtml += val;
						timelineHtml += '</li>';
					})
					timelineHtml += '</ul>';
					// others
					timelineHtml += '<ul class="others">';
					$.each(value.details.others, function(idx, val) {
						timelineHtml += '<li>';
						timelineHtml += val;
						timelineHtml += '</li>';
					})
					timelineHtml += '</ul>';
					timelineHtml += '</div>';
					timelineHtml += '</div>';
					timelineHtml += '</div>';
				})
				$(".timeline").html(timelineHtml);

				// prelude
				var preludeHtml = '';
				$.each(data.prelude, function(index, value) {
					if (value.key == "finally") {
						preludeHtml += '<li>';
						preludeHtml += '<svg class="iconfont" aria-hidden="true"><use xlink:href="#icon-wechat"></use></svg>';
						preludeHtml += value.date;
						preludeHtml += '</li>';
					}
				})
				$(".prelude ul").html(preludeHtml);

				// times
				var times = data.date.length;
				$(".info .info-times").html(times);
				
				// lastday
				var slasttime = $(".timeline-time:first").children("span").text();
				var lastTime = moment(slasttime, "YY-MM-DD");
				var now = moment();
				var lastday = now.diff(lastTime, "days");
				$(".info .info-lastday").html(lastday);

				// picture
				$(".timeline-row").on('click', '.picture li', function() {
					var idx = $(this).index();
					var length = $(this).parents(".picture").find("li").length;
					if (length != 1) {
						var idxNext = 0;
						if (idx + 1 <= length - 1) {
							idxNext = idx + 1;
						} else {
							idxNext = 0;
						}
						$(this).parents(".picture").find("li").removeClass("on");
						$(this).parents(".picture").find("li").eq(idxNext).addClass("on");
					}
				});
				


				// ******************************
				// proccess
				var timelineAnimate;
				timelineAnimate = function(elem) {
					return $(".timeline.animated .timeline-row").each(function(i) {
						var bottom_of_object, bottom_of_window;
						bottom_of_object = $(this).position().top + $(this)
							.outerHeight();
						bottom_of_window = $(window).scrollTop() + $(window)
						.height();
						if (bottom_of_window > bottom_of_object) {
							return $(this).addClass("active");
						}
					});
				};
				timelineAnimate();
				return $(window).scroll(function() {
					return timelineAnimate();
				});
			},
			error: function(error) {
				console.log(error);
			}
		});

	});
