// JavaScript Document

(function($){
	$(document).ready(function() {

		$(window).bind('resize orientationchange',function(){
			if($('#hero')){
				$('#hero').height($('#hero .slide:first img').height());
			}
			if($('#hero').height() == 0){
				$('#hero').height($('#hero .slide:last img').height());
			}
		});

		$('#hero').onImagesLoad(function(){
			$('#hero').height($('#hero .slide img').height());
		});


		$('.mobile-nav a.toggle').click(function(){
			$('body').toggleClass('active-nav');
			return false;
		});

		$('header[role=banner] nav ul:first').find('a').click(function(e){
			e.stopPropagation();
			var fancyNav = false;
			var obj = $(this).parent('li');
			var navId = obj.data('nav');

			if ($(window).width() > 599)
				fancyNav = true;

			if(!obj.children('ul').length && obj.data('nav') != 'search')
				return;

      obj.parent('ul').children('li').removeClass('icon-minus').addClass('icon-plus');

			if(obj.hasClass('active')){
        obj.removeClass('active');
				$('#'+navId).removeClass('active');
				return false;
			}
      obj.parent('ul').children('li').removeClass('active');
			obj.addClass('active icon-minus').removeClass('icon-plus');
			$('.fancy-nav').removeClass('active');

			if (fancyNav){
				$('#'+navId).addClass('active');
			}
			return false;
		});

		$('a[href="#"]:not(.override)').click(function(){
			return false;
		});

		$('#searchTerm').focus(function(){
			$(this).parent('form').addClass('focus').addClass('expanded');
		});

		$('#searchTerm').blur(function(){
			$(this).parent('form').removeClass('focus');

			if ($(this).val().length == 0)
				$(this).parent('form').removeClass('expanded');
		});

		$('html').click(function(e){
			$('header[role=banner] nav ul li').removeClass('active');
			$('.fancy-nav').removeClass('active');
		});

		$('.fancy-nav').click(function(e){
			e.stopPropagation();
		});

		$('a.submit').click(function(e){
			e.stopPropagation();
			$(e.target).parents('form').submit();
			return false;
		});

		$('a.share-twitter').click(function(e){
		  e.preventDefault();
		  var loc = $(this).attr('href');
		  var title  = escape($(this).data('title'));
		  window.open('http://twitter.com/share?url=' + loc + '&text=' + title + '&', 'twitterwindow', 'height=450, width=550, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
		});

		$('a.share-facebook').click(function(e){
		  e.preventDefault();
		  var loc = $(this).attr('href');
		  var title  = escape($(this).data('title'));
		  window.open('https://www.facebook.com/sharer/sharer.php?u=' + loc + '&', 'facebookwindow', 'height=626, width=436, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
		});
  });

	var days, goLive, hours, intervalId, minutes, seconds;

  // Your churchonline.org url
  var churchUrl = "http://genesisthejourney.churchonline.org";

  goLive = function() {
    $("#churchonline_counter .time").hide();
    $("#churchonline_counter .live").css('display', 'inline-block');
  };
  loadCountdown = function(data){
    var seconds_till;
    $("#churchonline_counter").css('display', 'inline-block');
    if (data.response.item.isLive) {
      return goLive();
    } else {
      // Parse ISO 8601 date string
      date = data.response.item.eventStartTime.match(/^(\d{4})-0?(\d+)-0?(\d+)[T ]0?(\d+):0?(\d+):0?(\d+)Z$/)
      dateString = date[2] + "/" + date[3] + "/" + date[1] + " " + date[4] + ":" + date[5] + ":" + date[6] + " +0000"
      seconds_till = ((new Date(dateString)) - (new Date())) / 1000;
      days = Math.floor(seconds_till / 86400);
      hours = Math.floor((seconds_till % 86400) / 3600);
      minutes = Math.floor((seconds_till % 3600) / 60);
      seconds = Math.floor(seconds_till % 60);
      return intervalId = setInterval(function() {
        if (--seconds < 0) {
          seconds = 59;
          if (--minutes < 0) {
            minutes = 59;
            if (--hours < 0) {
              hours = 23;
              if (--days < 0) {
                days = 0;
              }
            }
          }
        }
        $("#churchonline_counter .days").html((days.toString().length < 2) ? "0" + days : days);
        $("#churchonline_counter .hours").html((hours.toString().length < 2 ? "0" + hours : hours));
        $("#churchonline_counter .minutes").html((minutes.toString().length < 2 ? "0" + minutes : minutes));
        $("#churchonline_counter .seconds").html((seconds.toString().length < 2 ? "0" + seconds : seconds));
        if (seconds === 0 && minutes === 0 && hours === 0 && days === 0) {
          goLive();
          return clearInterval(intervalId);
        }
      }, 1000);
    }
  };
  days = void 0;
  hours = void 0;
  minutes = void 0;
  seconds = void 0;
  intervalId = void 0;
  eventUrl = churchUrl + "/api/v1/events/current";
  msie = /msie/.test(navigator.userAgent.toLowerCase());
  if (msie && window.XDomainRequest) {
      var xdr = new XDomainRequest();
      xdr.open("get", eventUrl);
      xdr.onload = function() {
        loadCountdown(jQuery.parseJSON(xdr.responseText))
      };
      xdr.send();
  } else {
    $.ajax({
      url: eventUrl,
      dataType: "json",
      crossDomain: true,
      success: function(data) {
        loadCountdown(data);
      },
      error: function(xhr, ajaxOptions, thrownError) {
        return console.log(thrownError);
      }
    });
  }

})(jQuery);
