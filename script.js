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
	var flag = true;

	function init() {
		navTop = $('nav').offset().top;
		navHeight = $('nav').outerHeight(true);
		difference = navHeight;
		aboutMeTop = $('#AboutMe').offset().top;
		CVTop = $('#CV').offset().top;
		ContactTop = $('#Contact').offset().top;
		height = -100;
		defaultTheme = "theme1";
		defaultLang = "pol";
	}

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

    function setLanguage(lang) {
		var path;
        setCookie("language", lang);
        currentLang = lang;
        if(currentLang == "pol")
			path = "Content/pol/";
        else
			path = "Content/eng/";
		$(".heading a").load(path + "Heading.html");
		$("#language").load(path + "Language.html");
		$("#theme").load(path + "Theme.html");
		$("nav").load(path + "Nav.html");
		$("#AboutMe").load(path + "AboutMe.html");
		$("#CV").load(path + "CV.html");
		$("#Contact").load(path + "Contact.html");
		init();
    }

	function setTheme(theme) {
		$('body').removeClass(currentTheme);
		$('body').addClass(theme);
		setCookie("theme", theme);
		currentTheme = theme;
	}

	function setCookie(id, value) {
		var date = new Date();
		date.setTime(date.getTime() + (10000000*30));
		var expires = "expires="+ date.toUTCString();
		document.cookie = id + "=" + value + ";" + expires + ";path=/";
	}

	function getCookie(cname) {
		var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i = 0; i < ca.length; ++i) {
	        var c = ca[i];
	        while (c.charAt(0) == ' ')
	            c = c.substring(1);
	        if (c.indexOf(name) == 0)
	            return c.substring(name.length, c.length);
	    }
	    return "";
	}

	function checkCookies() {
		var theme = getCookie("theme");
		if(theme != "")
			setTheme(theme);
		else
			setTheme(defaultTheme);
		var language = getCookie("language");
		if(language != "")
			setLanguage(language);
		else
			setLanguage(defaultLang);
	}

	$(window).scroll(function() {
		stickyNav();
		menuColor();
		if(flag) {
			init();
			flag = false;
		}
	});

	$('#up').click(function() {
		$('body').stop().animate({scrollTop: 0}, '500', 'swing');
	});

	$(document).on("click", "#language li", function() {
		setLanguage($(this).attr('id'));
	});

	$(document).on("click", "#theme li", function() {
		setTheme($(this).attr('id'));
	});

	stickyNav();
	menuColor();
	checkCookies();
});
