(function() {
	$(document).ready(function() {
		// my
		$.ajax({
			type: 'GET',
			url: "src/data/timeline.json",
			dataType: 'json',
			success: function (data) {
				// timelineHtml
				var timelineHtml = '';
				$.each(data.date, function (index, value) {
					// firstFlag
					var firstFlag = "";
					$.each(value.firstflage, function (idx, val) {
						if(idx == 0){
							firstFlag += val;
						}else{
							firstFlag += "&"+val;
						}
					})
					timelineHtml += '<div class="timeline-row" firstflag="'+firstFlag+'">';
					// time
					timelineHtml += '<div class="timeline-time">';
					timelineHtml += '<span>'+value.date+'</span>';
					var add = value.add ? '<i class="fa fa-location-arrow"></i>' + value.add : "-";
					timelineHtml += '<small>'+add+'</small>';
					timelineHtml += '</div>';
					// icon
					timelineHtml += '<div class="timeline-icon">';
					// randomBg
					var ranNum = Math.random();
					if(ranNum<0.5){
						ranNum = ranNum + 0.5;
					}else if(ranNum>=0.9){
						ranNum = ranNum - 0.1;
					}
					ranNum = ranNum.toFixed(2);
					var randomBg = "rgb(123,139,111,"+ranNum+")"
					timelineHtml += '<div style="background-color:'+randomBg+'">';
					timelineHtml += '<i class="fa fa-pencil"></i>';
					timelineHtml += '</div>';
					timelineHtml += '</div>';
					// content
					timelineHtml += '<div class="panel timeline-content">';
					timelineHtml += '<div class="panel-body">';
					timelineHtml += '<h2>'+value.title+'</h2>';
					// image
					if(value.images){
						timelineHtml += '<ul class="picture">';
						$.each(value.images, function (idx, val) {
							if(idx == 0){
								timelineHtml += '<li>';
								timelineHtml += '<img src="'+val+'">';
								timelineHtml += '</li>';
							}
						})
						timelineHtml += '</ul>';
					}
					// wear
					timelineHtml += '<ul class="wear">';
					$.each(value.details.wear, function (idx, val) {
						timelineHtml += '<li>';
						timelineHtml += val;
						timelineHtml += '</li>';
					})
					timelineHtml += '</ul>';
					// eat
					timelineHtml += '<ul class="eat">';
					$.each(value.details.eat, function (idx, val) {
						timelineHtml += '<li>';
						timelineHtml += val;
						timelineHtml += '</li>';
					})
					timelineHtml += '</ul>';
					// others
					timelineHtml += '<ul class="others">';
					$.each(value.details.others, function (idx, val) {
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
				$.each(data.prelude, function (index, value){
					if(value.key == "finally"){
						preludeHtml += '<li>';
						preludeHtml += '<i class="fa fa-commenting-o"></i>';
						preludeHtml += value.date;
						preludeHtml += '</li>';
					}
				})
				$(".prelude ul").html(preludeHtml);
				
				// times
				var times = data.date.length;
				$(".info .info-times").html(times);
				
				// pastday
				var firstTime = moment("22-02-17","YY-MM-DD");
				var now = moment();
				var pastday = now.diff(firstTime,"days");
				$(".info .info-pastday").html(pastday);
				
				// btn-font-change
				$(".btn-font-change").on("click",function(){
					if($("body").attr("font") == "qingsong"){
						$("body").attr("font","shufa");
					}else{
						$("body").attr("font","qingsong");
					}
				})
				
				// mySubmit
				$("#mySubmit").on("click",function(){
					if($("#myPassword").val() == "220217"){
						$("body").attr("isshow","show");
						setTimeout(function(){
							$("body").attr("isshows","show");
						},1000)
					}else{
						$("body").html("<div>终究是没有默契啊</div>").addClass("error");
					}
				})
				
				//////////////////////////////////////////////////////////////////////////
				// proccess
				var timelineAnimate;
				timelineAnimate = function(elem) {
					return $(".timeline.animated .timeline-row").each(function(i) {
						var bottom_of_object, bottom_of_window;
						bottom_of_object = $(this).position().top + $(this).outerHeight();
						bottom_of_window = $(window).scrollTop() + $(window).height();
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
			error: function (error) {
				console.log(error);
			}
		});
	});
}).call(this);
