/* Background Image Carousel
* Created: Jan 17th, 2012 by DynamicDrive.com. This notice must stay intact for usage 
* Author: Dynamic Drive at http://www.dynamicdrive.com/
* Visit http://www.dynamicdrive.com/ for full source code
*/

//** Modified Jan 23th, 12'- Fixed bug with auto rotate bug in "manual" mode
//** Modified Feb 21st, 12'- Fixed bug with carousel not always initializing in IE8 and less

jQuery.noConflict()

function bgCarousel(options){
	var $=jQuery
	this.setting={displaymode:{type:'auto', pause:2000, stoponclick:false, cycles:2, pauseonmouseover:true}, activeslideclass:'selectedslide', orientation:'h', persist:true, slideduration:500} //default settings
	jQuery.extend(this.setting, options) //merge default settings with options
	this.setting.displaymode.pause+=400+this.setting.slideduration // 400ms is default fade in time
	var curslide=(this.setting.persist)? bgCarousel.routines.getCookie("slider-"+this.setting.wrapperid) : 0
	this.curslide=(curslide==null || curslide>this.setting.imagearray.length-1)? 0 : parseInt(curslide) //make sure curslide index is within bounds
	this.curstep=0
	this.animation_isrunning=false //variable to indicate whether an image is currently being slided in
	this.posprop=(this.setting.orientation=="h")? "left" : "top"
	options=null
	var slideshow=this, setting=this.setting, preloadimages=[], imagesloaded=0, slidesHTML=''
	for (var i=0, max=setting.imagearray.length; i<max; i++){ //preload images
		preloadimages[i]=new Image()
		$(preloadimages[i]).bind('load error', function(){
			imagesloaded++
			if (imagesloaded==max){ //when all images have preloaded
		$(function(){ //on document.ready
			slideshow.init($, slidesHTML)
		})
			}
		})
		preloadimages[i].src=setting.imagearray[i][0]
		slidesHTML+=bgCarousel.routines.getSlideHTML(setting, setting.imagearray[i], '100%', '100%', this.posprop)+'\n'
	}
	$(window).bind('unload', function(){ //on window onload
		if (slideshow.setting.persist) //remember last shown slide's index?
			bgCarousel.routines.setCookie("slider-"+setting.wrapperid, slideshow.curslide)
	})
}

bgCarousel.prototype={

	slide:function(nextslide, dir){ //possible values for dir: "left", "right", "top", or "down"
		if (this.curslide==nextslide)
			return
		var slider=this, setting=this.setting
		var createobj=bgCarousel.routines.createobj
		var nextslide_initialpos=setting.dimensions[(dir=="right"||dir=="left")? 0 : 1] * ((dir=="right"||dir=="down")? -1 : 1)
		var curslide_finalpos=-nextslide_initialpos
		var posprop=this.posprop
		if (this.animation_isrunning!=null)
			this.animation_isrunning=true //indicate animation is running
		this.$imageslides.eq(nextslide).show().css(createobj([posprop, nextslide_initialpos], ['opacity', 0.5])) //show upcoming slide
			.stop().animate(createobj([posprop, 0]), setting.slideduration, function(){
				var $this=jQuery(this)
				$this.addClass(setting.activeslideclass).animate({opacity:1})
				.find('div.desc').stop().slideDown()
				slider.animation_isrunning=false
			})
			.find('div.desc').hide()

		this.$imageslides.eq(this.curslide)
			.removeClass(setting.activeslideclass)
			.stop().animate(createobj([posprop, curslide_finalpos]), setting.slideduration, function(){
					var $this=jQuery(this)
					$this.hide()
			}) //hide outgoing slide

		this.curslide=nextslide
	},

	navigate:function(keyword){ //keyword: "back" or "forth"
		var slideshow=this, setting=this.setting
		clearTimeout(this.rotatetimer)
		if (!setting.displaymode.stoponclick && setting.displaymode.type!="manual"){ //if slider should continue auto rotating after nav buttons are clicked on
			this.curstep=(keyword=="back")? this.curstep-1 : this.curstep+1 //move curstep counter explicitly back or forth depending on direction of slide
			this.rotatetimer=setTimeout(function(){slideshow.rotate()}, setting.displaymode.pause)
		}
		var dir=(keyword=="back")? (setting.orientation=="h"? "right" : "down") : (setting.orientation=="h"? "left" : "up")	
		var targetslide=(keyword=="back")? this.curslide-1 : this.curslide+1
		targetslide=(targetslide<0)? this.$imageslides.length-1 : (targetslide>this.$imageslides.length-1)? 0 : targetslide //wrap around
		if (this.animation_isrunning==false)
			this.slide(targetslide, dir)
	},

	rotate:function(){
		var slideshow=this, setting=this.setting
		if (this.ismouseover){ //pause slideshow onmouseover
			this.rotatetimer=setTimeout(function(){slideshow.rotate()}, setting.displaymode.pause)
			return
		}
		var nextslide=(this.curslide<this.$imageslides.length-1)? this.curslide+1 : 0
		this.slide(nextslide, this.posprop) //go to next slide, either to the left or upwards depending on setting.orientation setting
		if (setting.displaymode.cycles==0 || this.curstep<this.maxsteps-1){
			this.rotatetimer=setTimeout(function(){slideshow.rotate()}, setting.displaymode.pause)
			this.curstep++
		}
	},

	init:function($, slidesHTML){
		var slideshow=this, setting=this.setting
		this.$wrapperdiv=$('#'+setting.wrapperid)
		setting.dimensions=[this.$wrapperdiv.width(), this.$wrapperdiv.height()]
		this.$wrapperdiv.css({position:'relative', visibility:'visible', overflow:'hidden', backgroundImage:'none', width:setting.dimensions[0], height:setting.dimensions[1]}) //main DIV
		if (this.$wrapperdiv.length==0){ //if no wrapper DIV found
			alert("Error: DIV with ID \""+setting.wrapperid+"\" not found on page.")
			return
		}
		this.$wrapperdiv.html(slidesHTML)
		this.$imageslides=this.$wrapperdiv.find('div.background').hide()
		this.$imageslides.eq(this.curslide).show()
			.css(bgCarousel.routines.createobj(['opacity', 0.5], [this.posprop, 0])) //set current slide's CSS position (either "left" or "top") to 0
			.addClass(setting.activeslideclass)
			.stop().animate({opacity:1})
			.find('div.desc').slideDown()
		var orientation=setting.orientation
		 var controlpaths=(orientation=="h")? setting.navbuttons.slice(0, 2) : setting.navbuttons.slice(2)
		 var $controls =  $('')
		.click(function(){
			var keyword = this.getAttribute('data-dir')
			setting.curslide = (keyword == "right")? (setting.curslide == setting.content.length-1? 0 : setting.curslide + 1)
				: (setting.curslide == 0? setting.content.length-1 : setting.curslide - 1)
			slideshow.navigate(keyword)
		})
		$controls.appendTo(this.$wrapperdiv)
		if (setting.displaymode.type=="auto"){ //auto slide mode?
			setting.displaymode.pause+=setting.slideduration
			this.maxsteps=setting.displaymode.cycles * this.$imageslides.length
			if (setting.displaymode.pauseonmouseover){
				this.$wrapperdiv.mouseenter(function(){slideshow.ismouseover=true})
				this.$wrapperdiv.mouseleave(function(){slideshow.ismouseover=false})
			}
			this.rotatetimer=setTimeout(function(){slideshow.rotate()}, setting.displaymode.pause)
		}
	}

}

bgCarousel.routines={

	getSlideHTML:function(setting, imgref, w, h, posprop){
		var posstr=posprop+":"+((posprop=="left")? w : h)
		return '<div class="background" style="background-image:url(' + imgref[0] + ');'+posstr+'">'
							+ ((imgref[1])? '<div class="desc" style="display:none">' + imgref[1] + '</div>\n' : '')
							+	'</div>'
	},

	getCookie:function(Name){ 
		var re=new RegExp(Name+"=[^;]+", "i"); //construct RE to search for target name/value pair
		if (document.cookie.match(re)) //if cookie found
			return document.cookie.match(re)[0].split("=")[1] //return its value
		return null
	},

	setCookie:function(name, value){
		document.cookie = name+"=" + value + ";path=/"
	},

	createobj:function(){
		var obj={}
		for (var i=0; i<arguments.length; i++){
			obj[arguments[i][0]]=arguments[i][1]
		}
		return obj
	}
}