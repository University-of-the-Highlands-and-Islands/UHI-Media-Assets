$(function() {
	$(".section.intro .video, .section.tour .video, .content-type--one-web-video-embed, .content-type--landing-page-text__video").fitVids( {customSelector: "iframe[src^='https://stream.uhi.ac.uk']"});
	$(".lt-ie9 .header.banner .logo a").html('<img src="/img/logo.gif" alt="University of the Highlands and Islands"/>');
	handheldNav();
	siteMessage();
	scrollingParallax();
    var waypoint = document.getElementsByClassName("pin")[0];  
    if (waypoint) { waypointsInit(); }  
	courseFilter();
	hashlinks();
	applyNow();
    warningCookieRead(); 
    addClearFix();
    var uhiacc = document.getElementsByClassName("content-type-modifier--collapsible__heading")[0];
    if (uhiacc) uhicollapsibleSections();
});

if(window.location.href.indexOf('#') > -1) {
	hashinurl();
}

function siteMessage() {
	$('body > .navigation--home-message p .close').click(function() {
		$('body > .navigation--home-message').slideUp(function() {
			$(this).remove();
		});
	});
}

function courseFilter() {
	
	$('#coursefilter .course-filter-title').on('click', function(event) {
		event.preventDefault();
		$(this).parent().toggleClass('open').find('ul').slideToggle('fast');
		if($(this).parent().hasClass('open')) {
			$('.arrow', this).html('&#9660;');
		} else {
			$('.arrow', this).html('&#9668;');
		}
	    });
}

function scrollingParallax() {

	//.parallax(xPosition, adjuster, inertia, outerHeight) options:
	//xPosition - Horizontal position of the element
	//adjuster - y position to start from
	//inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
	//outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
	$('.home .mountains3').parallax("50%", 455, -.35, true);
	$('.home .mountains2').parallax("50%", 455, -.2, true);
	$('.home .section.intro').parallax("50%", -780, -.05, true);
	$('.home .section.coursefinder').parallax("50%", 1600, .5, true);
	$('.home .section.connections').parallax("50%", 3040, .5, true);

	$('.section.intro .background').parallax("50%", 230, .1, true);			// course pages
	$('.campus .section.coursefinder').parallax("50%", 1000, .5, true);		// campus pages
}

function handheldNav() {
	$('header[role="banner"] > .wrap .primarynav').prepend('<span id="bannernavtoggle">Menu <i>&darr;</i></span>');
	$('#bannernavtoggle').click(function() {
		$(this).toggleClass('open');
		if($(this).hasClass('open')) {
			$(this).html('Menu <i>&uarr;</i>');
			$('header[role="banner"] > .wrap .primarynav > ul').removeClass('jshidden');
		} else {
			$(this).html('Menu <i>&darr;</i>');
		}
		$('header[role="banner"] > .wrap .primarynav > ul').slideToggle('fast', function() {
			if (!$('#bannernavtoggle').hasClass('open')) {
				$(this).addClass('jshidden');
			}
		});
	});
}

function waypointsInit(){
	$('.map .pin').waypoint(function(direction){
		var that = $(this.element);
	
		if (direction === 'down') {
			that.addClass('animated bounceInDown');
			
			if ($('html').hasClass('no-cssanimations')) {
				that.animate({opacity: 1});
			}
		}
	}, {offset: '90%'});
}




function hashlinks(){
	$('a[href^="#"]').on('click',function(event){
		event.preventDefault();
		
		var target = $(this).attr('href');
		var targetPosition = (target == '#') ? 0 : $(target).offset().top;		
		var speedToScroll = (targetPosition == 0) ? 500 : Math.abs(targetPosition - window.pageYOffset)*2;
		
		if (target.substring(0, 4) == "#tab") {
    	//  targetPosition = targetPosition - 100;
	      targetPosition = $(this).closest( "div.tabs").prev();
		}
		else {targetPosition = targetPosition - 50;}
				
		$.scrollTo(targetPosition, speedToScroll, {easing:'easeInOutSine', 'axis':'y'});
		
		if (history.pushState) {
		    history.pushState(null, null, target);
		}
	});
}


function hashinurl(){
    $(window).on('load', function(event){
		//get the full URL
		//		var martinsurl = window.location.pathname;
		
		//if the URL string contains courses and #, then do your stuff
	//	if (martinsurl.indexOf("courses") !== -1 && window.location.hash !== -1 ) {
		
		
		//get the bit of the URL from # to end and pass it into var target
		var martinstarget = window.location.hash; 
		//the rest is untouched lifted from hashlinks()
		var martinstargetPosition = (martinstarget == '#') ? 0 : $(martinstarget).offset().top;		
		var martinsspeedToScroll = (martinstargetPosition == 0) ? 500 : Math.abs(martinstargetPosition - window.pageYOffset)*2;
		
		if (martinstarget.substring(0, 4) == "#tab") {
    	martinstargetPosition = martinstargetPosition - 100;
		}
		
			else {martinstargetPosition = martinstargetPosition - 50;}
				
		$.scrollTo(martinstargetPosition, martinsspeedToScroll, {easing:'easeInOutSine', 'axis':'y'});
		
		if (history.pushState) {
		    history.pushState(null, null, martinstarget);
		}
		event.preventDefault();
//	}  //close of if clause
	}); 
	
}

function applyNow(){
	$('.no-js-apply').remove();
	$('.toggleable').on('click', function(event){
		event.preventDefault();
		var that = $(this);
		
		if (!that.hasClass('disabled')){
		
			if (that.hasClass('toggled')){
				that.removeClass('toggled');
			}
			else {
				$(this).parent().find('.toggled').removeClass('toggled');
				that.addClass('toggled');
			}
			
			if ($('#applystep1 .toggled').length) {
				$('#applystep2').slideDown('fast');
			}
			else {
				$('#applystep2').slideUp('fast');		
			}
			
			if ($('#applystep1 .toggled').length && $('#applystep2 .toggled').length) {
				$('#applystep3').slideDown('fast');
				$('#applystep3 .button').removeClass('disabled');
			}
			else {
				$('#applystep3').slideUp('fast');
				$('#applystep3 .button').addClass('disabled');			
			}
			
			if ($('#applystep1 .toggled').length && $('#applystep2 .toggled').length && $('#applystep3 .toggled').length) {
				$('#applystep4').slideUp('fast').slideDown('fast');
				$('#applystep4 .button').removeClass('disabled');
			}
			else {
				$('#applystep4').slideUp('fast');
				$('#applystep4 .button').addClass('disabled');			
			}
		}
	});
}

$(document).ready(function() {
	var form = $(document.getElementsByName('SearchableText')[0]).closest('form');
	$(form).submit(function(e) {
		if (document.getElementsByName('SearchableText')[0].value.trim() == "")
		{
			e.preventDefault();
		}
	});
});
 
function callQR(){ 
	  var url=document.URL; 
	  url=encodeURI(url); 
	  var fullUrl="https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl="+url; 
	  jQuery("#QR").attr("src",fullUrl); 
  }


function addClearFixMulti(className){ 
	// ensures if multiple blocks of the same class on page, clearfix is added after each block
	  $(className).not(className + "+" + className).each(function(){
    $(this).nextUntil(":not("+ className + ")").addBack().wrapAll("<div class='clearfix'/>");
    });
}


function addClearFix(){ 
  addClearFixMulti(".content-type--one-web-highlight-content-box");
  addClearFixMulti(".content-type--one-web-media-object");
}

function uhicollapsibleSections(){
  var acc = document.getElementsByClassName("content-type-modifier--collapsible__heading");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        /* Toggle between adding and removing the "content-type-modifier--collapsible--open" class,
        to highlight the button that controls the panel */
        this.classList.toggle("content-type-modifier--collapsible--open");

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
  }
  
  if(acc.length > 1) {
    var collapseAll = '<div class="content-type-modifier--collapsible__menu"><a onclick="uhiCollapseSection(true)" class="content-type-modifier--collapsible__label"><span class="content-type-modifier--collapsible__control">ì</span> </a><a onclick="uhiCollapseSection(false)" class="content-type-modifier--collapsible__label"><span class="content-type-modifier--collapsible__control">í</span> </a></div>';
    $(collapseAll).insertBefore($(acc[0]).parent());       
  } 
}

function uhiCollapseSection(open){
    var acc = document.getElementsByClassName("content-type-modifier--collapsible__heading");
    var i;    
    for (i = 0; i < acc.length; i++) {
      if(open) {
          if(!$(acc[i]).hasClass("content-type-modifier--collapsible--open")) acc[i].classList.toggle("content-type-modifier--collapsible--open");
          var panel = acc[i].nextElementSibling;
           panel.style.display = "block";   
      } else {
          if($(acc[i]).hasClass("content-type-modifier--collapsible--open")) acc[i].classList.toggle("content-type-modifier--collapsible--open");
          var panel = acc[i].nextElementSibling;
           panel.style.display = "none";       
      }
  }
}

function lastModified(slastmodified,location){
	if(slastmodified != ''){
	//	var forced = (location.href.includes("uhi.ac.uk/en/foi/"));
	    var forced = false;
		if(location.host.includes("t4help") || location.href.includes("uhi.ac.uk/en/foi/") || forced){
	      var dlastmodified = new Date(slastmodified);
	      var cutOff = new Date().setDate(new Date().getDate()-60);
	      var markup = '<div class="meta--last-updated">This page was last updated <time datetime=' + $.datepicker.formatDate("yy-mm-dd+00:00", new Date(dlastmodified)) + '>' + $.datepicker.formatDate("d MM yy", new Date(dlastmodified)) + '</time></div>';   

		  if(dlastmodified >= cutOff || forced)
		    {
		      document.write(markup);
		    }
		  else
		    {
		      document.write("<!--" + markup + "-->");
		    }
	  }
	}
}



