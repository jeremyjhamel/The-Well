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

      obj.parent('ul').children('li').find('a i.marker').removeClass('fa-chevron-down').addClass('fa-chevron-right');

			if(obj.hasClass('active')){
        obj.removeClass('active');
				$('#'+navId).removeClass('active');
				return false;
			}
      obj.parent('ul').children('li').removeClass('active');
			obj.children('a').find('i.marker').addClass('fa-chevron-down').removeClass('fa-chevron-right');
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

	  $('.instagram ul').on('didLoadInstagram', didLoadInstagram);

		$(".instagram ul").instagram({
			userId: '1007015116',
			accessToken: '253802488.f45c789.c14edd5402d1402b93714fc2e4eea01b',
			count: 4
		});
  });
})(jQuery);

function createPhotoElement(photo) {
  var innerHtml = $('<img>')
    .attr('src', photo.images.low_resolution.url);

  innerHtml = $('<a>')
    .attr('target', '_blank')
    .attr('href', photo.link)
    .attr('title', photo.caption.text)
    .append(innerHtml);

  return $('<li>')
    .attr('id', photo.id)
    .append(innerHtml);
}

function didLoadInstagram(event, response) {
  var that = this;

  $.each(response.data, function(i, photo) {
    $(that).append(createPhotoElement(photo));
  });
}
