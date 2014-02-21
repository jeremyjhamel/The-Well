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


		$('a.navbar-toggle').click(function(){
			$('header[role=banner] nav').toggleClass('active');
			return false;
		});

		$('header[role=banner] nav ul:first').find('a').click(function(e){
			e.stopPropagation();
			var fancyNav = false;
			var obj = $(this).parent('li');
			var navId = obj.data('nav');

			if ($(window).width() > 767)
				fancyNav = true;

			if(!obj.children('ul').length && obj.data('nav') != 'search')
				return;

      //obj.parent('ul').children('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');

			if(obj.hasClass('active')){
        obj.removeClass('active');
				$('#'+navId).removeClass('active');
				return false;
			}
      obj.parent('ul').children('li').removeClass('active');
			//obj.addClass('active fa-chevron-up').removeClass('fa-chevron-down');
      obj.addClass('active');
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
})(jQuery);
