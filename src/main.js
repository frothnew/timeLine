(function() {
	$(document).ready(function() {
		// my
		$.ajax({
			type: 'GET',
			url: "src/timeline.json",
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
					value.add = value.add?value.add:"-"
					timelineHtml += '<small>'+value.add+'</small>';
					timelineHtml += '</div>';
					// icon
					timelineHtml += '<div class="timeline-icon">';
					timelineHtml += '<div class="bg-primary">';
					timelineHtml += '<i class="fa fa-pencil"></i>';
					timelineHtml += '</div>';
					timelineHtml += '</div>';
					// content
					timelineHtml += '<div class="panel timeline-content">';
					
					// randomBg
					var ranNum = Math.random();
					if(ranNum<0.3){
						ranNum = ranNum + 0.3;
					}else if(ranNum>=0.3 && ranNum<0.6){
					}else if(ranNum>=0.6 && ranNum<0.9){
						ranNum = ranNum - 0.3;
					}else{
						ranNum = ranNum - 0.6;
					}
					ranNum = ranNum.toFixed(2);
					var randomBg = "rgb(123,139,111,"+ranNum+")"
					timelineHtml += '<div class="panel-body" style="background-color:'+randomBg+'">';
					timelineHtml += '<h2>'+value.title+'</h2>';
					// wear
					timelineHtml += '<p>';
					timelineHtml += '<ul>';
					$.each(value.details.wear, function (idx, val) {
						timelineHtml += '<li>';
						timelineHtml += val;
						timelineHtml += '</li>';
					})
					timelineHtml += '</ul>';
					timelineHtml += '</p>';
					// eat
					timelineHtml += '<p>';
					timelineHtml += '<ul>';
					$.each(value.details.eat, function (idx, val) {
						timelineHtml += '<li>';
						timelineHtml += val;
						timelineHtml += '</li>';
					})
					timelineHtml += '</ul>';
					timelineHtml += '</p>';
					// others
					timelineHtml += '<p>';
					timelineHtml += '<ul>';
					$.each(value.details.others, function (idx, val) {
						timelineHtml += '<li>';
						timelineHtml += val;
						timelineHtml += '</li>';
					})
					timelineHtml += '</ul>';
					timelineHtml += '</p>';
					timelineHtml += '</div>';
					timelineHtml += '</div>';
					timelineHtml += '</div>';
				})
				$(".timeline").html(timelineHtml);
				
				// prelude
				var preludeHtml = '';
				$.each(data.prelude, function (index, value){
					preludeHtml += '<li>';
					preludeHtml += value.date;
					preludeHtml += '</li>';
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
