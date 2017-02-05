$(document).ready(function() {
	var navTop = $('nav').offset().top;
	var navHeight = $('nav').outerHeight();
	var difference = navHeight;
	var aboutMeTop = $('#AboutMe').offset().top;
	var CVTop = $('#CV').offset().top;
	var ContactTop = $('#Contact').offset().top;
	var height = -100;
	
	var stickyNav = function() {
		var scrollTop = $(window).scrollTop();
		if (scrollTop > navTop) {
			$('#up').css('bottom', '30px');
			$('nav').addClass('sticky');
			$('header').css("margin-bottom", difference);
		} else {
			$('#up').css('bottom', '-50px');
			$('nav').removeClass('sticky');
			$('header').css("margin-bottom", 0);
		}
	};
	
	var menuColor = function() {
		var scrollTop = $(window).scrollTop();
		if(scrollTop > aboutMeTop + height) {
			$('nav li.AboutMe').addClass('checked');
		} else {
			$('nav li.AboutMe').removeClass('checked');
		}
		if(scrollTop > CVTop + height) {
			$('nav li.CV').addClass('checked');
			$('nav li.AboutMe').removeClass('checked');
		} else {
			$('nav li.CV').removeClass('checked');
		}
		if(scrollTop > ContactTop + height) {
			$('nav li.Contact').addClass('checked');
			$('nav li.CV').removeClass('checked');
		} else {
			$('nav li.Contact').removeClass('checked');
		}
	};
	
	$('#up').click(function() { $('body').stop().animate({scrollTop: 0}, '500', 'swing')});
	
	stickyNav();
	menuColor();

	$(window).scroll(function() {
		stickyNav();
		menuColor();
	});
});