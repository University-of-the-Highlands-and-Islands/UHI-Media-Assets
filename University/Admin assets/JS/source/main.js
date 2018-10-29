$(function() {
	$('html').addClass($.client.os.toLowerCase()).addClass($.client.browser.toLowerCase());
	$(".section.intro .video, .section.tour .video").fitVids();
	$(".lt-ie9 .header.banner .logo a").html('<img src="/img/logo.gif" alt="University of the Highlands and Islands"/>');
//	$("#portal-column-two").prev("#portal-column-content").css('width', '46%');
//	placeholders();
	handheldNav();
//	siteSearch();
	siteMessage();
	scrollingParallax();
    var waypoint = document.getElementsByClassName("pin")[0];  
    if (waypoint) { waypointsInit(); }  
	courseFilter();
	hashlinks();
	//courseFinder();
	applyNow();
    warningCookieRead(); 
    addClearFix();
 //   var tabnav = document.getElementsByClassName("tabs")[0];  
 //   if (tabnav) { $('.tabs').tabs(); }    
    var uhiacc = document.getElementsByClassName("content-type-modifier--collapsible__heading")[0];
    if (uhiacc) uhicollapsibleSections();
});

if(window.location.href.indexOf('#') > -1) {
	hashinurl();
}

function siteMessage() {
	$('body > .message p .close').click(function() {
		$('body > .message').slideUp(function() {
			$(this).remove();
		});
	});
}

function updatesearch(event) {
                event.preventDefault();
		$('#courselist').css({ opacity: 0.2 });
		$(this).parent().toggleClass('active');

                var value = $('#coursename').data('value');
                if (value) {
		    var data = {'name': value};
		} else {
		    var data = {}
		}

                var inpElement = document.getElementById('coursename');
                var placeholder = "Start typing to filter courses by name";
                var value = (inpElement.value === '' || inpElement.value === placeholder) ? undefined : inpElement.value;
                var data = {'name': value};

		$('#coursefilter > li').each(
		    function() {
                        var key = $(this).data('key');
			var values = $(this).find('li.active a').map(
			    function() {
			        return $(this).data('key');
			    }
			).get();
			data[key] = values;
		    }
		);

		$('#courselist').load('/en/courses/@@courses_list li', data, function() {$('#courselist').css({ opacity: 1 })});

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

	/* $('.section.courselist .col.onequarter > ul ul a').on('click', updatesearch);

	var typewatch = (function(){
		var timer = 0;
		return function(callback, ms){
		    clearTimeout (timer);
		    timer = setTimeout(callback, ms);
		}  
	    })();

	$('#coursename').keyup(function (event) {
		typewatch(function () {
       		    $('#coursename').data('value', $('#coursename').val());
		    updatesearch(event);
		}, 300);
	    });

	$('input[type="submit"]', $('#coursesearch')).click(function(event) {
		event.preventDefault();
       		$('#coursename').data('value', $('#coursename').val())
		updatesearch(event);
	});*/

}

function siteSearch() {
	$form = $('.header.banner li form');
	$('.keyword', $form).css({'position': 'absolute', 'clip': 'rect(0 0 0 0)'}).width(0).height(0);
	$form.data('disabled', true).hoverIntent({
		over: function() {
			$('.keyword', $form).css({'position': 'relative', 'height': 'auto', 'clip': 'auto'}).stop().animate({width: 208}, function() {
				$form.data('disabled', false);
			});
		},
		out: function() {
			if (!$('.keyword', $form).is(':focus')) {
				$form.data('disabled', true);
				$('.keyword', $form).stop().animate({width: 0}, 1000, function() {
					$(this).css({'position': 'absolute', 'clip': 'rect(0 0 0 0)'}).height(0);
				});
			} else {
				$('.keyword', $form).blur(function() {
					$form.data('disabled', true);
					$('.keyword', $form).stop().animate({width: 0}, 1000, function() {
						$(this).css({'position': 'absolute', 'clip': 'rect(0 0 0 0)'}).height(0);
					});
				});
			}
		},
		timeout: 2000
	});
	$('input[type="submit"]', $form).click(function(e) {
		if ($form.data('disabled')) {
			e.preventDefault();
		}
	});
}

function scrollingParallax() {

	//.parallax(xPosition, adjuster, inertia, outerHeight) options:
	//xPosition - Horizontal position of the element
	//adjuster - y position to start from
	//inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
	//outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
	$('.no-touch .home .mountains3').parallax("50%", 455, -.35, true);
	$('.no-touch .home .mountains2').parallax("50%", 455, -.2, true);
	$('.no-touch .home .section.intro').parallax("50%", -780, -.05, true);
	$('.no-touch .home .section.coursefinder').parallax("50%", 1600, .5, true);
	$('.no-touch .home .section.connections').parallax("50%", 3040, .5, true);

	$('.section.intro .background').parallax("50%", 230, .1, true);			// course pages
	$('.campus .section.coursefinder').parallax("50%", 1000, .5, true);		// campus pages

	//var deck = new $.scrolldeck({
		//slides: 'body.home > .section',
		//buttons: '#nav li a',
		//easing: 'easeInOutExpo'
	//});

}

function placeholders() {
  if(!Modernizr.input.placeholder) {
	$('[placeholder]').focus(function() {
	  var input = $(this);
	  if (input.val() == input.attr('placeholder')) {
		input.val('');
		input.removeClass('placeholder');
	  }
	}).blur(function() {
	  var input = $(this);
	  if (input.val() == '' || input.val() == input.attr('placeholder')) {
		input.addClass('placeholder');
		input.val(input.attr('placeholder'));
	  }
	}).blur();
	$('[placeholder]').parents('form').submit(function() {
	    $(this).find('[placeholder]').each(function() {
	        var input = $(this);
	        if (input.val() == input.attr('placeholder')) {
	            input.val('');
	        }
	    });
	});
  }
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
		var that = $(this);
	
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

	$(window).load(function(event){
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


function courseFinder(){
	var courseList = [
      "Accounting",
      "Acting and Performance",
      "Administration and Information Technology",
      "Adventure Tourism Management",
      "Aircraft Engineering",
      "An Cursa Adhartais (English)",
      "An Cursa Comais (Introduction to Gaelic)",
      "Applied Music",
      "Applied Sciences (Pathway to Medicine)",
      "Applied Sciences",
      "Arboriculture and Urban Forestry",
      "Archaeological Practice",
      "Archaeological Studies",
      "Archaeology and Environmental Studies",
      "Archaeology",
      "Architectural Technology",
      "Audio Engineering",
      "Beauty Therapy",
      "Book-keeping",
      "Bricklaying",
      "Business Administration",
      "Business and Management",
      "Business Leadership",
      "Business",
      "Carpentry and Joinery",
      "Child and Youth Studies",
      "Childhood Practice",
      "Civil Engineering",
      "Complementary Therapies",
      "Computer Aided Draughting and Design",
      "Computer Science and Web Technologies",
      "Computing - Technical Support",
      "Computing: Software Development",
      "Computing",
      "Construction Management",
      "Contemporary Art Practice",
      "Contemporary Textiles",
      "Cànan is Cultar na Gàidhlig",
      "Desktop Support Technician",
      "Microsoft Certified",
      "Desktop Support",
      "Developing Low Carbon Communities",
      "E-Marketing",
      "Early Education and Childcare",
      "Electrical and Energy Engineering",
      "Electrical and Mechanical Engineering",
      "Energy Engineering",
      "Engineering Systems",
      "Engineering: Electrical and Electronic",
      "Engineering: Mechanical",
      "Enterprise and E-Marketing",
      "Enterprise",
      "Environmental Science",
      "Equine Studies",
      "Events",
      "Fabrication Welding and Inspection",
      "Financial Accounting",
      "Fine Art Textiles",
      "Fine Art",
      "Fitness Health and Exercise",
      "Forestry",
      "Gaelic and Communication",
      "Gaelic and Development",
      "Gaelic and Media Studies",
      "Gaelic and Traditional Music",
      "Gaelic Language and Culture",
      "Gaelic with Education",
      "Gamekeeping with Wildlife Management",
      "Golf Management",
      "Gàidhlig agus Ceòl Traidiseanta",
      "Gàidhlig agus Leasachadh",
      "Gàidhlig agus na Meadhanan",
      "Health and Social Care Supervision",
      "Health and Wellbeing",
      "Health Care",
      "Health Leadership and Management",
      "Health Studies (Health and Welfare)",
      "Health Studies (Rural Health)",
      "Health Studies",
      "Highlands and Islands Culture",
      "Highlands and Islands Literature",
      "History and Politics",
      "History of the Highlands and Islands",
      "Hospitality Management",
      "Hospitality",
      "Infection Control",
      "Information Technology in Business",
      "Information Technology",
      "Interactive Media",
      "Interpretation: Management and Practice",
      "Leadership and E-Marketing",
      "Leadership and Management",
      "Leading and Managing Care Services",
      "Leading and Managing Remotely",
      "Literature",
      "Management Accounting",
      "Marine Engineering",
      "Marine Science",
      "Masters of Education",
      "Material Culture and the Gàidhealtachd History",
      "Mechanical and Energy Engineering",
      "Medical Administration",
      "Medical Device Decontamination",
      "Music Business",
      "Music",
      "Office Administration",
      "Office Management and Information Technology",
      "Oral Health Science",
      "Orkney and Shetland Studies",
      "Popular Music",
      "Practice Learning",
      "Professional Cookery",
      "Psychology",
      "Public Service Leadership",
      "CMI Diploma",
      "Quantity Surveying",
      "Renewable Energy Systems",
      "Research Methods",
      "Restorative Practice",
      "Scottish Cultural Studies",
      "Scottish History and Archaeology",
      "Scottish History",
      "Social Care",
      "Social Sciences",
      "Socio/legal Issues of Childhood",
      "Sound Production",
      "Sports Coaching with Development of Sport",
      "Sustainable Development",
      "Sustainable Energy Solutions",
      "Sustainable Forest Management",
      "Sustainable Mountain Development",
      "Sustainable Rural Development",
      "Theological Studies",
      "Theology masters scheme",
      "Tourism and Hospitality Management",
      "Viking Studies",
      "Visual Communication",
      ];
  $( ".coursesAutocomplete" ).autocomplete({
    source: courseList
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

function addClearFix(){ 
  $(".content-type--one-web-highlight-content-box").wrapAll("<div class='clearfix'/>");
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




