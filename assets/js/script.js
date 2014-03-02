// JavaScript Document

(function($){
	$(document).ready(function() {
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

			if(!obj.children('ul').length)
				return;

      obj.parent('ul').children('li').find('a i').removeClass('fa-chevron-down').addClass('fa-chevron-right');

			if(obj.hasClass('active')){
        obj.removeClass('active');
				$('#'+navId).removeClass('active');
				return false;
			}
      obj.parent('ul').children('li').removeClass('active');
			obj.children('a').find('i').addClass('fa-chevron-down').removeClass('fa-chevron-right');
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
  });
})(jQuery);
