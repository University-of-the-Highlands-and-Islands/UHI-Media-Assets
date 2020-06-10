// below function only used for testing
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
}


// only used for modal

function noTab() {

var inputs = $('#modalAlert').find('select, input, textarea, button, a').filter(':visible');
var firstInput = inputs.first();
var lastInput = inputs.last();

/*set focus on first input*/
firstInput.focus();

/*redirect last tab to first input*/
lastInput.on('keydown', function (e) {
   if ((e.which === 9 && !e.shiftKey)) {
       e.preventDefault();
       firstInput.focus();
   }
});

/*redirect first shift+tab to last input*/
firstInput.on('keydown', function (e) {
    if ((e.which === 9 && e.shiftKey)) {
        e.preventDefault();
        lastInput.focus();
    }
});


}




function setCharAt(str,strIndex,chr) {
   var index = Number(strIndex);
    if(index > str.length-1) return str;
   var tmp = str.substring((index));
    return str.substring(0,index) + chr + str.substring((index+1));
}

function getPrefsUrl(){
  var url=document.URL; 
  if(url.indexOf("/en/") !== -1)
  {
 //   return "https://www.uhi.ac.uk/en/cookies";     // live
    return "http://dev-www.uhi.ac.uk/en/cookies";       // dev
  }
  else
  { 
    return "https://" + window.location.hostname + "/cookies";
  }
  
}

function getNoMediaText() {
  return "<p style='background-color:#666666;color:#ffffff;height:100%;display:inline-block;'>" +
      "We have removed this content.<br/> Please <a href='" + getPrefsUrl() + "' style='color:white;text-decoration: underline;'>change your cookie preferences</a> " +
      "to see our social media.</p>"; 
}

function allowPerfCookies() {
    var cookie = getCookie("_uhic");
    if (cookie == "") return false;
//    if (cookie == "" || cookie == "9111") return false;
    else return (cookie.charAt(2) == "1") ? true : false;
}

function allowFunctCookies() {
    var cookie = getCookie("_uhic");
    if (cookie == "") return true;
    else return (cookie.charAt(1) == "1") ? true : false;
}

function allowThirdCookies() {
    var cookie = getCookie("_uhic");
    if (cookie == "") return true;
    else return (cookie.charAt(3) == "1") ? true : false;
}

function allowTargetingCookies() {
    var cookie = getCookie("_uhic");
    if (cookie == "") return true;
    else return (cookie.charAt(4) == "1") ? true : false;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    if(window.location.href.indexOf("uhisf") > -1)
    {
      document.cookie = cname + "=" + cvalue + "; Domain=.uhisf.com; secure=true; samesite=strict;" + expires + ";path=/";
    }
    else
    {
      document.cookie = cname + "=" + cvalue + "; Domain=.uhi.ac.uk; secure=true; samesite=strict; " + expires + ";path=/";
    }
} 

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}                               

function warningCookieRead(){                             // This is the main/controlling function fired on page load (in main.js)
    var cookie = getCookie("_uhic");
  
  switch (cookie) {
    case "":                                   // very first visit (or cookie expired)
        removeSocialMedia();
    //    firstView();                       // Allow GA code after scrolling
        setCookie("_uhic","91111",90);
        showCookieMessage();
        break;
    case "91111":                               // second visit (or page view) cookie message has been displayed  (GA is live if enabled above)
        removeSocialMedia();
  //      setCookie("_uhic","0111",90);
        showCookieMessage();
        break;
    case "0111":                              // subsequent visits with banner ignored (legacy when ignoring banner was taken as consent)
        showCookieMessage();
        break;
     case "1111":                              // show cookie message again for users of old cookie code.
        showCookieMessage();
        break;
    default:
        setCookie("_uhic",cookie,90);          // prevent cookie expiry
        if(!allowThirdCookies())  {         
            removeSocialMedia();
        }  
  }  
}
   
function firstView()
{  
  var fired = false;  // only let this fire once
   $( window ).scroll(function() {
     if (!fired)
     {
       runGA();
     }
     fired = true;    
  }); 
}
    
function runGA(){
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-24468473-1', 'uhi.ac.uk');
  ga('send', 'pageview');
           function recordOutboundLink(link, category, action) {
	ga('send', 'event', category, action);
    setTimeout('document.location = "' + link.href + '"', 100);  
 }
}

function showCookieMessage() {

// 

  var pathname = window.location.pathname;
  if(pathname.indexOf("/cookies/") == -1)
  {
   //   var cAlert = '<div id="uhi-cookie-alert" class="message message--cookie">';
  	//  		cAlert +='<p><a class="close" title="Close" href="#" onclick="warningCookieContinue();">~</a></p>';
  	//  		cAlert +='<p>We use <a href="' + getPrefsUrl() + '">cookies</a> to provide the best experience when browsing our site. These can be for perfomance or functional reasons.  ';
   //          cAlert +='Some pages may also contain "third party" cookies from social media sites where we have used embedded content.  ';
   //          cAlert +='You can <a href="' + getPrefsUrl() + '">change your cookie settings for our site</a>, or if you choose you can continue and  ';
   //          cAlert +='we will assume that you are happy to receive all cookies from our site.</p>';
  	// 		cAlert +='<div id="cookies-continue" onclick="warningCookieContinue();">Continue</div>';
			// cAlert +='</div>';


    var demoVersion = $.urlParam('demo');      

    if(demoVersion == null || demoVersion == "1") {

        var cAlert = '<div id="uhi-cookie-alert" class="cookie-notice">';
            cAlert +='<div class="cookie-message">';
            cAlert +='<p>We use cookies to help us run this website and to promote the university using social media and other online tools. If you’re happy with this, click Accept all. If you would like to know more, then click on Settings. You are free to amend your settings at any time from our cookies page.</p>';
            cAlert +='</div>';
            cAlert +=' <div class="cookie-buttons">';
            cAlert +='<p><a class="cookie-accept" onclick="warningCookieContinue();">Accept all</a></p>';
            cAlert +='<p><a class="cookie-settings" href="' + getPrefsUrl() + '">Settings</a></p>';
            cAlert +='</div>';
            cAlert +='</div>';
        $(".message").css('display', 'none');
        $("body").prepend(cAlert);
    }
    if(demoVersion == "2") {
      var cAlert = '<div id="uhi-cookie-alert" class="cookie-notice-2">';
          cAlert +='<div class="flex-container">';
          cAlert +='<div class="cookie-message">';
          cAlert +='<p>We use cookies to help us run this website and to promote the university using social media and other online tools. If you’re happy with this, click Accept all. If you would like to know more, then click on Settings. You are free to amend your settings at any time from our cookies page.</p>';
          cAlert +='</div>';
          cAlert +='<div class="cookie-buttons">';
          cAlert +='<p><a class="cookie-accept" onclick="warningCookieContinue();">Accept all</a></p>';
          cAlert +='<p><a class="cookie-settings" href="' + getPrefsUrl() + '">Settings</a></p>';
          cAlert +='</div>';
          cAlert +='</div>';
          cAlert +='</div>';
      $(".message").css('display', 'none');
      $("body").prepend(cAlert);
    }

    if(demoVersion == "3") {
      
      $('head').append('<link rel="stylesheet" href="<t4 type="media" formatter="path/*" id="354392" />" type="text/css" />');

      var cAlert = '<div id="modalAlert" class="modal">';

          cAlert +='<div class="cookie-message">';
          cAlert +='<p>We use cookies to help us run this website and to promote the university using social media and other online tools. If you’re happy with this, click Accept all. If you would like to know more, then click on Settings. You are free to amend your settings at any time from our cookies page.</p>';
          cAlert +='</div>';
          cAlert +='<div class="cookie-buttons">';
          cAlert +='<p><a class="cookie-accept" href="" onclick="warningCookieContinue();" rel="modal:close">Accept all</a></p>';
          cAlert +='<p><a class="cookie-settings" href="' + getPrefsUrl() + '">Settings</a></p>';
         cAlert +='</div>';

       //   cAlert +='<a href="#" rel="modal:close">Close</a>';

          cAlert +='</div>';
      $(".message").css('display', 'none');
      $("body").prepend(cAlert);
       $('#modalAlert').modal('show');
       $("#modalAlert").modal({
          escapeClose: false,
          clickClose: false,
          showClose: false
       });

 

       noTab();


    }





}
}

function removeSocialMedia() {
  removeIframes();
  removeFacebook();
  removeTwitter()  ;
  removeBBox() ;
  removeEmbeddedFeeds();
}

function removeIframes()   // mostly Youtube
{
   var fb = document.getElementsByTagName('iframe');
   for (var i = fb.length-1; i >= 0; i--) {
       if(!fb[i].src.includes("recaptcha")) fb[i].outerHTML = getNoMediaText();
   }     
}

function disableIframes()   // mostly Youtube
{
   var fb = document.getElementsByTagName('iframe');
   for (var i = fb.length-1; i >= 0; i--) {
 //       fb[i].outerHTML = getNoMediaText();
     var url = fb[i].src;
     fb[i].src = "xx" + url;
   }     
}

function removeFacebook()
{
    var fb = document.getElementsByClassName("fb-page");
    for (var i = fb.length-1; i >= 0; i--) {
          var fbscript = $(fb[i]).prevAll()[0];
          fbscript.outerHTML = "";
          fb[i].outerHTML = getNoMediaText();
    }
}

function removeTwitter()
{
    var fb = document.getElementsByClassName("twitter-timeline");
    for (var i = fb.length-1; i >= 0; i--) {
          var fbscript = $(fb[i]).nextAll()[0];
          fbscript.outerHTML = "";
          fb[i].outerHTML = getNoMediaText();
    } 
}

function removeBBox()  // no idea what this is
{
    var fb = document.getElementById("bbox-root-a00158dc-ea3d-4015-80aa-58043f92bc9a");
    if(fb) {
          var yScript1 = $(fb).nextAll()[0];
          yScript1.outerHTML = "";
          fb.outerHTML = getNoMediaText()
    }   
}

function removeEmbeddedFeeds()
{
    var fb = document.getElementById("embedded-feed");
    if(fb) {
          var yScript1 = $(fb).nextAll()[0];
          var yScript2 = $(fb).nextAll()[1];       
          yScript1.outerHTML = "";
          yScript2.outerHTML = "";
          fb.outerHTML = getNoMediaText()
    }
}

function warningCookieContinue(){
    var cookie = getCookie("_uhic");
  //   if (cookie == "9111") {
		// runGA();
  //   } 
    setCookie("_uhic","11111",90);   
    var warning = document.getElementById('uhi-cookie-alert');
    if(warning) warning.parentNode.removeChild(warning);          // "if" only necessary for modals if we use them
    var message = document.getElementsByClassName("message")[0];
    if (message) { $(".message").css('display', 'block'); }
  }
  
function cookieConfigInit(){ 
    var cookie = getCookie("_uhic");
  if (cookie == "" || cookie == "0000"|| cookie == "0111" || cookie == "1111" || cookie == "91111" ) { 
    setCookie("_uhic","11111",90);
    $("#cFunct").prop("checked", true);
    $("#cPerf").prop("checked", true);
    $("#cThird").prop("checked", true);
    $("#cTarget").prop("checked", true);
  }
  else
  {
    if (cookie.charAt(1) == "1") $("#cFunct").prop("checked", true);
    if (cookie.charAt(2) == "1") $("#cPerf").prop("checked", true);
    if (cookie.charAt(3) == "1") $("#cThird").prop("checked", true);   
    if (cookie.charAt(4) == "1") $("#cTarget").prop("checked", true);   
  }
}

function cookieConfigChange(cInput){ 
  cVal = (cInput.checked) ? "1" : "0";
  var cookie = getCookie("_uhic");
  var tmp = setCharAt(cookie, cInput.value, cVal);
  setCookie("_uhic",tmp,90);
  
  if(cInput.value == 2 && !cInput.checked)
  {
    document.cookie = '_ga' +'=; Path=/; Domain=.uhi.ac.uk; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = '_gat' +'=; Path=/; Domain=.uhi.ac.uk; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = '_gid' +'=; Path=/; Domain=.uhi.ac.uk; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
    if(cInput.value == 1 && !cInput.checked)
  {
    document.cookie = 'slider-bigBG' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'slider-smallBG' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }  
}

// Campaign cookie
// Change cookie duration

function campaignCookieRead(){
//  var cAlert = '<t4 type="navigation" name="Site Wide Campaign Banner getter" id="449" />';  // live
  var cAlert = '<t4 type="navigation" name="Site Wide Campaign Banner getter" id="443" />';  // dev
  if (cAlert) 
   {
 //   var scope = '<t4 type="navigation" name="Config Funnelback Scope getter" id="448" />';  // live
    var scope = '<t4 type="navigation" name="Config Funnelback Scope getter" id="445" />';  // dev
    var ccookie = getCookie("_" + scope + "_campaign");
    if (ccookie=="") {
        showCampaignMessage(cAlert);   	
    }
  }
}


function showCampaignMessage(cAlert) {
    var pageURL = $(location).attr("href");
    if (pageURL.indexOf("/gd/") >= 0) cAlert = cAlert.replace(new RegExp('en.gif', 'g'), 'gd.gif');
	$("body").prepend(cAlert);
}

function campaignMessageClose() {
 //   var scope = '<t4 type="navigation" name="Config Funnelback Scope getter" id="448" />';  // live
   	var scope = '<t4 type="navigation" name="Config Funnelback Scope getter" id="445" />';	// dev
	setCookie("_" + scope + "_campaign","1",1);  /// change last 1 back to 7
	$(".campaign-banner").remove();
}