$(document).ready(function() {
	var navTop = $('nav').offset().top;
	var navHeight = $('nav').outerHeight(true);
	var difference = navHeight;
	var aboutMeTop = $('#AboutMe').offset().top;
	var CVTop = $('#CV').offset().top;
	var ContactTop = $('#Contact').offset().top;
	var height = -100;
	var defaultTheme = "theme1";
	var currentTheme;
	var defaultLang = "pol";
	var currentLang;

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

	function changeLanguage(lang) {
		setCookie("language", lang);
		currentLang = lang;
		if(currentLang == "pol") {
			$("#AboutMe").load("Content/AboutMePol.html");
			$("#CV").load("Content/CVPol.html");
			$("#Contact").load("Content/ContactPol.html");
		} else {
			$("#AboutMe").load("Content/AboutMeEng.html");
			$("#CV").load("Content/CVEng.html");
			$("#Contact").load("Content/ContactEng.html");
		}
	}

	function changeTheme(theme) {
		$('body').removeClass(currentTheme);
		$('body').addClass(theme);
		setCookie("theme", theme);
		currentTheme = theme;
	}

	function setCookie(id, value) {
		var d = new Date();
		d.setTime(d.getTime() + (10000*30));
		var expires = "expires="+ d.toUTCString();
		document.cookie = id + "=" + value + ";" + expires + ";";
	}

	function getCookie(id) {
		var decodedCookie = decodeURIComponent(document.cookie);
	    var ca = decodedCookie.split(';');
	    for(var i = 0; i < ca.length; ++i) {
	        var c = ca[i];
	        while (c.charAt(0) == ' ')
	            c = c.substring(1);
	        if (c.indexOf(id) == 0)
	            return c.substring(name.length, c.length);
	    }
	    return "";
	}

	function checkCookies() {
		var theme = getCookie("theme");
		if(theme != "")
			changeTheme(theme);
		else
			setCookie(defaultTheme);
		var language = getCookie("language");
		if(language != "")
			changeLanguage(language);
		else
			setCookie(defaultLang);
	}

	$(window).scroll(function() { stickyNav(); menuColor(); });
	$('#up').click(function() { $('body').stop().animate({scrollTop: 0}, '500', 'swing')});
	$('#language li').click(function() { changeLanguage($(this).attr('id')); });
	$('#theme li').click(function() { changeTheme($(this).attr('id')); });

	stickyNav();
	menuColor();
	checkCookies();
});
