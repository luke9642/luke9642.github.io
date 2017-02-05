$(document).ready(function() {
	var navTop = $('nav').offset().top;
	var navHeight = $('nav').outerHeight();
	var difference = navHeight;
	
	var stickyNav = function() {
		var scrollTop = $(window).scrollTop();
		
		if (scrollTop > navTop) {
			$('nav').addClass('sticky');
			$('header').css("margin-bottom", difference);
		}
		else {
			$('nav').removeClass('sticky');
			$('header').css("margin-bottom", 0);
		}
	};

	stickyNav();

	$(window).scroll(function() {
		stickyNav();
	});
});