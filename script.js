$(document).ready(function() {
	$("#AboutMe").load("Content/AboutMe_Pol.html");
	$("#CV").load("Content/CV_Pol.html");
	$("#Contact").load("Content/Contact_Pol.html");
	var navTop = $('nav').offset().top;
	var navHeight = $('nav').outerHeight(true);
	var difference = navHeight;
	var aboutMeTop = $('#AboutMe').offset().top;
	var CVTop = $('#CV').offset().top;
	var ContactTop = $('#Contact').offset().top;
	var height = -100;
	var defaultTheme = "theme1";
	var currentTheme;

	function stickyNav() {
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

	function menuColor() {
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

	function changeTheme(theme) {
		$('body').removeClass(currentTheme);
		$('body').addClass(theme);
		setCookie(theme);
	}

	function setCookie(theme) {
		var d = new Date();
		d.setTime(d.getTime() + (10000*30));
		var expires = "expires="+ d.toUTCString();
		document.cookie = "theme=" + theme + ";" + expires + ";";
		currentTheme = theme;
	}

	function getCookie() {
		var decodedCookie = decodeURIComponent(document.cookie);
	    var ca = decodedCookie.split(';');
	    for(var i = 0; i < ca.length; ++i) {
	        var c = ca[i];
	        while (c.charAt(0) == ' ')
	            c = c.substring(1);
	        if (c.indexOf("theme") == 0)
	            return c.substring(name.length, c.length);
	    }
	    return "";
	}

	function checkCookies() {
		var theme = getCookie();
		if(theme != "")
			changeTheme(theme);
		else
			setCookie(defaultTheme);
	}

	$('#up').click(function() { $('body').stop().animate({scrollTop: 0}, '500', 'swing')});

	$('#theme li').click(function() { changeTheme($(this).attr('id')); });

	stickyNav();
	menuColor();
	checkCookies();

	$(window).scroll(function() {
		stickyNav();
		menuColor();
	});
});
