window.COOKIES_ENABLER = window.COOKIES_ENABLER || (function () {

    var init = function (options) {

        var elem = options.element == null ? document.getElementsByClassName('ce-elm') : document.getElementsByClassName(options.element),
            trigger =  options.trigger == null ? document.getElementsByClassName('ce-trigger') : document.getElementsByClassName(options.trigger),
            banner = options.banner == null ? document.getElementsByClassName('ce-banner') : document.getElementsByClassName(options.banner),
            duration = options.duration == null ? '365' : options.duration;
            eventScroll = options.eventScroll == null ? false : options.eventScroll;

        if (getCookie() == 'Y') {
            getScripts(elem, trigger, banner);
        } else {
            if (eventScroll === true) {
                window.addEventListener('scroll', function(){
                    setCookie(duration);
                    getScripts(elem, trigger, banner);
                });
            }
            trigger[0].addEventListener("click", function(){
                setCookie(duration);
                getScripts(elem, trigger, banner);
            });
        }
    };

    var setCookie = function(days){
        var name = "ce-consent",
            value = "Y",
            date, expires;
        if (days) {
            date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            expires = "; expires="+date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = name+"="+value+expires+"; path=/";
    }

    var getCookie = function(){
        var name = "ce-consent";
        var i, x, y,
            cookies = document.cookie.split(";");
        for (i = 0; i < cookies.length; i++){
            x = cookies[i].substr(0,cookies[i].indexOf("="));
            y = cookies[i].substr(cookies[i].indexOf("=")+1);
            x = x.replace(/^\s+|\s+$/g,"");
            if (x == name) {
                return unescape(y);
            }
        }
    }

    var getScripts = function(elem, trigger, banner){
        var n = elem.length;
        for (var i = 0; i < n; i++){
            var s = document.createElement('script');
            s.type = 'text/javascript';
            for (var y = 0; y < elem[i].attributes.length; y++) {
                var attrib = elem[i].attributes[y];
                if (attrib.specified) {
                    if ((attrib.name != 'type') && (attrib.name != 'class')){
                        s.setAttribute(attrib.name, attrib.value);
                    }
                }
            }
            s.innerHTML = elem[i].innerHTML;
            document.body.appendChild(s);
        }
        banner[0].style.display = 'none';
    }

    return {
        init: init
    };

}());