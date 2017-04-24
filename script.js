$(document).ready(function() {
    var defaultTheme = "theme1";
    var currentTheme;
    var defaultLang = "pol";
    var currentLang;

    function changeLanguage(lang) {
        setCookie("language", lang);
        currentLang = lang;
        if(currentLang == "pol") {
            $(".heading a").load("Content/pol/Heading.html");
            $("#language").load("Content/pol/Language.html");
            $("#theme").load("Content/pol/Theme.html");
            $("nav").load("Content/pol/Nav.html");
            $("main").load("Content/pol/Section.html");
        } else {
            $(".heading a").load("Content/eng/Heading.html");
            $("#language").load("Content/eng/Language.html");
            $("#theme").load("Content/eng/Theme.html");
            $("nav").load("Content/eng/Nav.html");
            $("main").load("Content/eng/Section.html");
        }
    }

    function changeTheme(theme) {
		$('body').removeClass(currentTheme);
		$('body').addClass(theme);
		setCookie("theme", theme);
		currentTheme = theme;
	}

	function setCookie(id, value) {
		var date = new Date();
		date.setTime(date.getTime() + (10000*30));
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
			changeTheme(theme);
		else
			changeTheme(defaultTheme);
		var language = getCookie("language");
		if(language != "")
			changeLanguage(language);
		else
			changeLanguage(defaultLang);
	}

    checkCookies();
    animations();
});
