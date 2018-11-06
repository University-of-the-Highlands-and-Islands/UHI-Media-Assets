// Contents 2018-11-06
// FitVids 1.0
// hoverIntent r7 
// Ariel Flesler 2.1.2
// jQuery Parallax Version 1.1
// scrollorama
// jQuery Easing v1.3
// Background Image Carousel (bgCarousel)
// Waypoints - 4.0.1



var $ = jQuery;
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

(function($){var e={init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";this.OS=this.searchString(this.dataOS)||"an unknown OS"},searchString:function(e){for(var t=0;t<e.length;t++){var n=e[t].string;var r=e[t].prop;this.versionSearchString=e[t].versionSearch||e[t].identity;if(n){if(n.indexOf(e[t].subString)!=-1)return e[t].identity}else if(r)return e[t].identity}},searchVersion:function(e){var t=e.indexOf(this.versionSearchString);if(t==-1)return;return parseFloat(e.substring(t+this.versionSearchString.length+1))},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};e.init();window.$.client={os:e.OS,browser:e.browser}})(jQuery);

/*global jQuery */
/*jshint multistr:true browser:true */
/*!
* FitVids 1.0
*
* Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Thu Sept 01 18:00:00 2011 -0500
*/
(function(a){a.fn.fitVids=function(b){var c={customSelector:null};if(!document.getElementById("fit-vids-style")){var e=document.createElement("div"),d=document.getElementsByTagName("base")[0]||document.getElementsByTagName("script")[0];e.className="fit-vids-style";e.id="fit-vids-style";e.style.display="none";e.innerHTML="&shy;<style> .fluid-width-video-wrapper { width: 100%; position: relative; padding: 0; } .fluid-width-video-wrapper iframe, .fluid-width-video-wrapper object, .fluid-width-video-wrapper embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; } </style>";d.parentNode.insertBefore(e,d)}if(b){a.extend(c,b)}return this.each(function(){var f=["iframe[src*='player.vimeo.com']","iframe[src*='youtube.com']","iframe[src*='youtube-nocookie.com']","iframe[src*='kickstarter.com'][src*='video.html']","object","embed"];if(c.customSelector){f.push(c.customSelector)}var g=a(this).find(f.join(","));g=g.not("object object");g.each(function(){var l=a(this);if(this.tagName.toLowerCase()==="embed"&&l.parent("object").length||l.parent(".fluid-width-video-wrapper").length){return}var h=(this.tagName.toLowerCase()==="object"||(l.attr("height")&&!isNaN(parseInt(l.attr("height"),10))))?parseInt(l.attr("height"),10):l.height(),i=!isNaN(parseInt(l.attr("width"),10))?parseInt(l.attr("width"),10):l.width(),j=h/i;if(!l.attr("id")){var k="fitvid"+Math.floor(Math.random()*999999);l.attr("id",k)}l.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top",(j*100)+"%");l.removeAttr("height").removeAttr("width")})})}})(jQuery);

/*!
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2013 Brian Cherne
 */
(function(e){e.fn.hoverIntent=function(t,n,r){var i={interval:100,sensitivity:7,timeout:0};if(typeof t==="object"){i=e.extend(i,t)}else if(e.isFunction(n)){i=e.extend(i,{over:t,out:n,selector:r})}else{i=e.extend(i,{over:t,out:t,selector:n})}var s,o,u,a;var f=function(e){s=e.pageX;o=e.pageY};var l=function(t,n){n.hoverIntent_t=clearTimeout(n.hoverIntent_t);if(Math.abs(u-s)+Math.abs(a-o)<i.sensitivity){e(n).off("mousemove.hoverIntent",f);n.hoverIntent_s=1;return i.over.apply(n,[t])}else{u=s;a=o;n.hoverIntent_t=setTimeout(function(){l(t,n)},i.interval)}};var c=function(e,t){t.hoverIntent_t=clearTimeout(t.hoverIntent_t);t.hoverIntent_s=0;return i.out.apply(t,[e])};var h=function(t){var n=jQuery.extend({},t);var r=this;if(r.hoverIntent_t){r.hoverIntent_t=clearTimeout(r.hoverIntent_t)}if(t.type=="mouseenter"){u=n.pageX;a=n.pageY;e(r).on("mousemove.hoverIntent",f);if(r.hoverIntent_s!=1){r.hoverIntent_t=setTimeout(function(){l(n,r)},i.interval)}}else{e(r).off("mousemove.hoverIntent",f);if(r.hoverIntent_s==1){r.hoverIntent_t=setTimeout(function(){c(n,r)},i.timeout)}}};return this.on({"mouseenter.hoverIntent":h,"mouseleave.hoverIntent":h},i.selector)}})(jQuery);


/*!
 * Copyright (c) 2007-2015 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 2.1.2
 */
(function(f){"use strict";"function"===typeof define&&define.amd?define(["jquery"],f):"undefined"!==typeof module&&module.exports?module.exports=f(require("jquery")):f(jQuery)})(function($){"use strict";function n(a){return!a.nodeName||-1!==$.inArray(a.nodeName.toLowerCase(),["iframe","#document","html","body"])}function h(a){return $.isFunction(a)||$.isPlainObject(a)?a:{top:a,left:a}}var p=$.scrollTo=function(a,d,b){return $(window).scrollTo(a,d,b)};p.defaults={axis:"xy",duration:0,limit:!0};$.fn.scrollTo=function(a,d,b){"object"=== typeof d&&(b=d,d=0);"function"===typeof b&&(b={onAfter:b});"max"===a&&(a=9E9);b=$.extend({},p.defaults,b);d=d||b.duration;var u=b.queue&&1<b.axis.length;u&&(d/=2);b.offset=h(b.offset);b.over=h(b.over);return this.each(function(){function k(a){var k=$.extend({},b,{queue:!0,duration:d,complete:a&&function(){a.call(q,e,b)}});r.animate(f,k)}if(null!==a){var l=n(this),q=l?this.contentWindow||window:this,r=$(q),e=a,f={},t;switch(typeof e){case "number":case "string":if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(e)){e= h(e);break}e=l?$(e):$(e,q);case "object":if(e.length===0)return;if(e.is||e.style)t=(e=$(e)).offset()}var v=$.isFunction(b.offset)&&b.offset(q,e)||b.offset;$.each(b.axis.split(""),function(a,c){var d="x"===c?"Left":"Top",m=d.toLowerCase(),g="scroll"+d,h=r[g](),n=p.max(q,c);t?(f[g]=t[m]+(l?0:h-r.offset()[m]),b.margin&&(f[g]-=parseInt(e.css("margin"+d),10)||0,f[g]-=parseInt(e.css("border"+d+"Width"),10)||0),f[g]+=v[m]||0,b.over[m]&&(f[g]+=e["x"===c?"width":"height"]()*b.over[m])):(d=e[m],f[g]=d.slice&& "%"===d.slice(-1)?parseFloat(d)/100*n:d);b.limit&&/^\d+$/.test(f[g])&&(f[g]=0>=f[g]?0:Math.min(f[g],n));!a&&1<b.axis.length&&(h===f[g]?f={}:u&&(k(b.onAfterFirst),f={}))});k(b.onAfter)}})};p.max=function(a,d){var b="x"===d?"Width":"Height",h="scroll"+b;if(!n(a))return a[h]-$(a)[b.toLowerCase()]();var b="client"+b,k=a.ownerDocument||a.document,l=k.documentElement,k=k.body;return Math.max(l[h],k[h])-Math.min(l[b],k[b])};$.Tween.propHooks.scrollLeft=$.Tween.propHooks.scrollTop={get:function(a){return $(a.elem)[a.prop]()}, set:function(a){var d=this.get(a);if(a.options.interrupt&&a._last&&a._last!==d)return $(a.elem).stop();var b=Math.round(a.now);d!==b&&($(a.elem)[a.prop](b),a._last=this.get(a))}};return p});



/*!
Plugin: jQuery Parallax
Version 1.1
Author: Ian Lunn
Author URL: http://www.ianlunn.co.uk/
Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/

//function that places the navigation in the center of the window
function RepositionNav(){var d=$(window).height();var c=$("#nav").height()/2;var b=(d/2);var a=b-c;$("#nav").css({top:a})}(function(a){a.fn.parallax=function(f,e,g,l){function k(n,m){m.each(function(){var p=a(this);var q=p.offset().top;if(l==true){var o=p.outerHeight(true)}else{var o=p.height()}if(q+o>=n&&q+o-b<n){d(n,o)}if(q<=n&&(q+o)>=n&&(q-b)<n&&q+o-b>n){d(n,o)}if(q+o>n&&q-b<n&&q>n){d(n,o)}})}var c=a(window);var b=a(window).height();var j=c.scrollTop();var i=a(this);if(f==null){f="50%"}if(e==null){e=0}if(g==null){g=0.1}if(l==null){l=true}height=i.height();i.css({backgroundPosition:h(f,l,e,g)});function h(o,q,p,n,m){return o+" "+Math.round((-((q+p)-n)*m))+"px"}function d(n,m){i.css({backgroundPosition:h(f,m,n,e,g)})}c.bind("scroll",function(){var m=c.scrollTop();k(m,i);a("#pixels").html(m)})}})(jQuery);

/*!
	scrollorama - The jQuery plugin for doing cool scrolly stuff
	by John Polacek (@johnpolacek)
	
	Dual licensed under MIT and GPL.
*/

(function(e){e.scrollorama=function(t){function l(){var t,s,a=false;if(typeof n.settings.blocks==="string"){n.settings.blocks=e(n.settings.blocks)}if(e.browser.mozilla){i="-moz-"}if(e.browser.webkit){i="-webkit-"}if(e.browser.opera){i="-o-"}if(e.browser.msie){i="-ms-"}e("body").css("position","relative");for(t=0;t<n.settings.blocks.length;t++){s=n.settings.blocks.eq(t);r.push({block:s,top:s.offset().top-parseInt(s.css("margin-top"),10),pin:0,animations:[]})}if(n.settings.enablePin.toString()==="true"){for(t=0;t<r.length;t++){r[t].block.css("position","absolute").css("top",r[t].top)}}e("body").prepend('<div id="scroll-wrap"></div>');o=0;u=false;e(window).scroll(c)}function c(){o=window.scrollY;h()}function h(){if(!u){a(function(){d();p()})}u=true}function p(){u=false}function d(){var t=e(window).scrollTop(),i=v(t),o,u,a,f,l,c,h;for(o=0;o<r.length;o++){if(r[o].animations.length){for(u=0;u<r[o].animations.length;u++){a=r[o].animations[u];if(o>i){if(i!==o-1&&a.baseline!=="bottom"){m(a.element,a.property,a.startVal)}if(r[o].pin){r[o].block.css("position","absolute").css("top",r[o].top)}}else if(o<i){m(a.element,a.property,a.endVal);if(r[o].pin){r[o].block.css("position","absolute").css("top",r[o].top+r[o].pin)}}if(o===i||i===o-1&&a.baseline==="bottom"){if(r[o].pin&&i===o){r[o].block.css("position","fixed").css("top",0)}f=r[o].top+a.delay;if(a.baseline==="bottom"){f-=e(window).height()}l=f+a.duration;if(t<f){m(a.element,a.property,a.startVal)}else if(t>l){m(a.element,a.property,a.endVal);if(r[o].pin){r[o].block.css("position","absolute").css("top",r[o].top+r[o].pin)}}else{c=(t-f)/a.duration;if(a.easing&&e.isFunction(e.easing[a.easing])){c=e.easing[a.easing](c,c*1e3,0,1,1e3)}h=a.startVal+c*(a.endVal-a.startVal);m(a.element,a.property,h)}}}}}if(n.blockIndex!==i){n.blockIndex=i;s()}}function v(e){var t=0,i;for(i=0;i<r.length;i++){if(r[i].top<=e-n.settings.offset){t=i}}return t}function m(e,t,n){var r,s;if(t==="rotate"||t==="zoom"||t==="scale"){if(t==="rotate"){e.css(i+"transform","rotate("+n+"deg)")}else if(t==="zoom"||t==="scale"){r="scale("+n+")";if(i!=="-ms-"){e.css(i+"transform",r)}else{e.css("zoom",r)}}}else if(t==="background-position-x"||t==="background-position-y"){s=e.css("background-position").split(" ");if(t==="background-position-x"){e.css("background-position",n+"px "+s[1])}if(t==="background-position-y"){e.css("background-position",s[0]+" "+n+"px")}}else if(t==="text-shadow"){e.css(t,"0px 0px "+n+"px #ffffff")}else{e.css(t,n)}}var n=this,r=[],i="",s=function(){},o=0,u=false,a=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)},f={offset:0,enablePin:true};n.settings=e.extend({},f,t);n.blockIndex=0;if(t.blocks===undefined){alert("ERROR: Must assign blocks class selector to scrollorama plugin")}n.animate=function(t){var n,i,s,o,u,a;if(typeof t==="string"){t=e(t)}for(u=0;u<r.length;u++){if(r[u].block.has(t).length){i=r[u];n=u}}for(u=1;u<arguments.length;u++){s=arguments[u];if(s.property==="top"||s.property==="left"||s.property==="bottom"||s.property==="right"){if(t.css("position")==="static"){t.css("position","relative")}cssValue=parseInt(t.css(s.property),10);if(s.start===undefined){s.start=isNaN(cssValue)?0:cssValue}else if(s.end===undefined){s.end=isNaN(cssValue)?0:cssValue}}if(s.property==="rotate"){if(s.start===undefined){s.start=0}if(s.end===undefined){s.end=0}}else if(s.property==="zoom"||s.property==="scale"){if(s.start===undefined){s.start=1}if(s.end===undefined){s.end=1}}else if(s.property==="letter-spacing"&&t.css(s.property)){if(s.start===undefined){s.start=1}if(s.end===undefined){s.end=1}}if(s.baseline===undefined){if(s.pin||i.pin||n===0){s.baseline="top"}else{s.baseline="bottom"}}if(s.delay===undefined){s.delay=0}i.animations.push({element:t,delay:s.delay,duration:s.duration,property:s.property,startVal:s.start!==undefined?s.start:parseInt(t.css(s.property),10),endVal:s.end!==undefined?s.end:parseInt(t.css(s.property),10),baseline:s.baseline!==undefined?s.baseline:"bottom",easing:s.easing});if(s.pin){if(i.pin<s.duration+s.delay){o=s.duration+s.delay-i.pin;i.pin+=o;for(a=n+1;a<r.length;a++){r[a].top+=o;r[a].block.css("top",r[a].top)}}}}d()};n.onBlockChange=function(e){s=e};n.getScrollpoints=function(){var e=[],t,n,i;for(t=0;t<r.length;t++){e.push(r[t].top);if(r[t].animations.length&&r[t].pin>0){for(n=0;n<r[t].animations.length;n++){i=r[t].animations[n];e.push(r[t].top+i.delay+i.duration)}}}e.sort(function(e,t){return e-t});return e};l();return n};e.extend(e.easing,{def:"easeOutQuad",swing:function(t,n,r,i,s){return e.easing[e.easing.def](t,n,r,i,s)},easeInQuad:function(e,t,n,r,i){return r*(t/=i)*t+n},easeOutQuad:function(e,t,n,r,i){return-r*(t/=i)*(t-2)+n},easeInOutQuad:function(e,t,n,r,i){if((t/=i/2)<1){return r/2*t*t+n}return-r/2*(--t*(t-2)-1)+n},easeInCubic:function(e,t,n,r,i){return r*(t/=i)*t*t+n},easeOutCubic:function(e,t,n,r,i){return r*((t=t/i-1)*t*t+1)+n},easeInOutCubic:function(e,t,n,r,i){if((t/=i/2)<1){return r/2*t*t*t+n}return r/2*((t-=2)*t*t+2)+n},easeInQuart:function(e,t,n,r,i){return r*(t/=i)*t*t*t+n},easeOutQuart:function(e,t,n,r,i){return-r*((t=t/i-1)*t*t*t-1)+n},easeInOutQuart:function(e,t,n,r,i){if((t/=i/2)<1){return r/2*t*t*t*t+n}return-r/2*((t-=2)*t*t*t-2)+n},easeInQuint:function(e,t,n,r,i){return r*(t/=i)*t*t*t*t+n},easeOutQuint:function(e,t,n,r,i){return r*((t=t/i-1)*t*t*t*t+1)+n},easeInOutQuint:function(e,t,n,r,i){if((t/=i/2)<1){return r/2*t*t*t*t*t+n}return r/2*((t-=2)*t*t*t*t+2)+n},easeInSine:function(e,t,n,r,i){return-r*Math.cos(t/i*(Math.PI/2))+r+n},easeOutSine:function(e,t,n,r,i){return r*Math.sin(t/i*(Math.PI/2))+n},easeInOutSine:function(e,t,n,r,i){return-r/2*(Math.cos(Math.PI*t/i)-1)+n},easeInExpo:function(e,t,n,r,i){return t===0?n:r*Math.pow(2,10*(t/i-1))+n},easeOutExpo:function(e,t,n,r,i){return t===i?n+r:r*(-Math.pow(2,-10*t/i)+1)+n},easeInOutExpo:function(e,t,n,r,i){if(t===0){return n}if(t===i){return n+r}if((t/=i/2)<1){return r/2*Math.pow(2,10*(t-1))+n}return r/2*(-Math.pow(2,-10*--t)+2)+n},easeInCirc:function(e,t,n,r,i){return-r*(Math.sqrt(1-(t/=i)*t)-1)+n},easeOutCirc:function(e,t,n,r,i){return r*Math.sqrt(1-(t=t/i-1)*t)+n},easeInOutCirc:function(e,t,n,r,i){if((t/=i/2)<1){return-r/2*(Math.sqrt(1-t*t)-1)+n}return r/2*(Math.sqrt(1-(t-=2)*t)+1)+n},easeInElastic:function(e,t,n,r,i){var s=1.70158,o=0,u=r;if(t===0){return n}if((t/=i)===1){return n+r}if(!o){o=i*.3}if(u<Math.abs(r)){u=r;s=o/4}else{s=o/(2*Math.PI)*Math.asin(r/u)}return-(u*Math.pow(2,10*(t-=1))*Math.sin((t*i-s)*2*Math.PI/o))+n},easeOutElastic:function(e,t,n,r,i){var s=1.70158,o=0,u=r;if(t===0){return n}if((t/=i)===1){return n+r}if(!o){o=i*.3}if(u<Math.abs(r)){u=r;s=o/4}else{s=o/(2*Math.PI)*Math.asin(r/u)}return u*Math.pow(2,-10*t)*Math.sin((t*i-s)*2*Math.PI/o)+r+n},easeInOutElastic:function(e,t,n,r,i){var s=1.70158,o=0,u=r;if(t===0){return n}if((t/=i/2)===2){return n+r}if(!o){o=i*.3*1.5}if(u<Math.abs(r)){u=r;s=o/4}else{s=o/(2*Math.PI)*Math.asin(r/u)}if(t<1){return-.5*u*Math.pow(2,10*(t-=1))*Math.sin((t*i-s)*2*Math.PI/o)+n}return u*Math.pow(2,-10*(t-=1))*Math.sin((t*i-s)*2*Math.PI/o)*.5+r+n},easeInBack:function(e,t,n,r,i,s){if(s===undefined){s=1.70158}return r*(t/=i)*t*((s+1)*t-s)+n},easeOutBack:function(e,t,n,r,i,s){if(s===undefined){s=1.70158}return r*((t=t/i-1)*t*((s+1)*t+s)+1)+n},easeInOutBack:function(e,t,n,r,i,s){if(s===undefined){s=1.70158}if((t/=i/2)<1){return r/2*t*t*(((s*=1.525)+1)*t-s)+n}return r/2*((t-=2)*t*(((s*=1.525)+1)*t+s)+2)+n},easeInBounce:function(t,n,r,i,s){return i-e.easing.easeOutBounce(t,s-n,0,i,s)+r},easeOutBounce:function(e,t,n,r,i){if((t/=i)<1/2.75){return r*7.5625*t*t+n}else if(t<2/2.75){return r*(7.5625*(t-=1.5/2.75)*t+.75)+n}else if(t<2.5/2.75){return r*(7.5625*(t-=2.25/2.75)*t+.9375)+n}else{return r*(7.5625*(t-=2.625/2.75)*t+.984375)+n}},easeInOutBounce:function(t,n,r,i,s){if(n<s/2){return e.easing.easeInBounce(t,n*2,0,i,s)*.5+r}return e.easing.easeOutBounce(t,n*2-s,0,i,s)*.5+i*.5+r}})})(jQuery);

/*!
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing["jswing"]=jQuery.easing["swing"];jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,t,n,r,i){return jQuery.easing[jQuery.easing.def](e,t,n,r,i)},easeInQuad:function(e,t,n,r,i){return r*(t/=i)*t+n},easeOutQuad:function(e,t,n,r,i){return-r*(t/=i)*(t-2)+n},easeInOutQuad:function(e,t,n,r,i){if((t/=i/2)<1)return r/2*t*t+n;return-r/2*(--t*(t-2)-1)+n},easeInCubic:function(e,t,n,r,i){return r*(t/=i)*t*t+n},easeOutCubic:function(e,t,n,r,i){return r*((t=t/i-1)*t*t+1)+n},easeInOutCubic:function(e,t,n,r,i){if((t/=i/2)<1)return r/2*t*t*t+n;return r/2*((t-=2)*t*t+2)+n},easeInQuart:function(e,t,n,r,i){return r*(t/=i)*t*t*t+n},easeOutQuart:function(e,t,n,r,i){return-r*((t=t/i-1)*t*t*t-1)+n},easeInOutQuart:function(e,t,n,r,i){if((t/=i/2)<1)return r/2*t*t*t*t+n;return-r/2*((t-=2)*t*t*t-2)+n},easeInQuint:function(e,t,n,r,i){return r*(t/=i)*t*t*t*t+n},easeOutQuint:function(e,t,n,r,i){return r*((t=t/i-1)*t*t*t*t+1)+n},easeInOutQuint:function(e,t,n,r,i){if((t/=i/2)<1)return r/2*t*t*t*t*t+n;return r/2*((t-=2)*t*t*t*t+2)+n},easeInSine:function(e,t,n,r,i){return-r*Math.cos(t/i*(Math.PI/2))+r+n},easeOutSine:function(e,t,n,r,i){return r*Math.sin(t/i*(Math.PI/2))+n},easeInOutSine:function(e,t,n,r,i){return-r/2*(Math.cos(Math.PI*t/i)-1)+n},easeInExpo:function(e,t,n,r,i){return t==0?n:r*Math.pow(2,10*(t/i-1))+n},easeOutExpo:function(e,t,n,r,i){return t==i?n+r:r*(-Math.pow(2,-10*t/i)+1)+n},easeInOutExpo:function(e,t,n,r,i){if(t==0)return n;if(t==i)return n+r;if((t/=i/2)<1)return r/2*Math.pow(2,10*(t-1))+n;return r/2*(-Math.pow(2,-10*--t)+2)+n},easeInCirc:function(e,t,n,r,i){return-r*(Math.sqrt(1-(t/=i)*t)-1)+n},easeOutCirc:function(e,t,n,r,i){return r*Math.sqrt(1-(t=t/i-1)*t)+n},easeInOutCirc:function(e,t,n,r,i){if((t/=i/2)<1)return-r/2*(Math.sqrt(1-t*t)-1)+n;return r/2*(Math.sqrt(1-(t-=2)*t)+1)+n},easeInElastic:function(e,t,n,r,i){var s=1.70158;var o=0;var u=r;if(t==0)return n;if((t/=i)==1)return n+r;if(!o)o=i*.3;if(u<Math.abs(r)){u=r;var s=o/4}else var s=o/(2*Math.PI)*Math.asin(r/u);return-(u*Math.pow(2,10*(t-=1))*Math.sin((t*i-s)*2*Math.PI/o))+n},easeOutElastic:function(e,t,n,r,i){var s=1.70158;var o=0;var u=r;if(t==0)return n;if((t/=i)==1)return n+r;if(!o)o=i*.3;if(u<Math.abs(r)){u=r;var s=o/4}else var s=o/(2*Math.PI)*Math.asin(r/u);return u*Math.pow(2,-10*t)*Math.sin((t*i-s)*2*Math.PI/o)+r+n},easeInOutElastic:function(e,t,n,r,i){var s=1.70158;var o=0;var u=r;if(t==0)return n;if((t/=i/2)==2)return n+r;if(!o)o=i*.3*1.5;if(u<Math.abs(r)){u=r;var s=o/4}else var s=o/(2*Math.PI)*Math.asin(r/u);if(t<1)return-.5*u*Math.pow(2,10*(t-=1))*Math.sin((t*i-s)*2*Math.PI/o)+n;return u*Math.pow(2,-10*(t-=1))*Math.sin((t*i-s)*2*Math.PI/o)*.5+r+n},easeInBack:function(e,t,n,r,i,s){if(s==undefined)s=1.70158;return r*(t/=i)*t*((s+1)*t-s)+n},easeOutBack:function(e,t,n,r,i,s){if(s==undefined)s=1.70158;return r*((t=t/i-1)*t*((s+1)*t+s)+1)+n},easeInOutBack:function(e,t,n,r,i,s){if(s==undefined)s=1.70158;if((t/=i/2)<1)return r/2*t*t*(((s*=1.525)+1)*t-s)+n;return r/2*((t-=2)*t*(((s*=1.525)+1)*t+s)+2)+n},easeInBounce:function(e,t,n,r,i){return r-jQuery.easing.easeOutBounce(e,i-t,0,r,i)+n},easeOutBounce:function(e,t,n,r,i){if((t/=i)<1/2.75){return r*7.5625*t*t+n}else if(t<2/2.75){return r*(7.5625*(t-=1.5/2.75)*t+.75)+n}else if(t<2.5/2.75){return r*(7.5625*(t-=2.25/2.75)*t+.9375)+n}else{return r*(7.5625*(t-=2.625/2.75)*t+.984375)+n}},easeInOutBounce:function(e,t,n,r,i){if(t<i/2)return jQuery.easing.easeInBounce(e,t*2,0,r,i)*.5+n;return jQuery.easing.easeOutBounce(e,t*2-i,0,r,i)*.5+r*.5+n}});

/*!
Waypoints - 4.0.1
Copyright © 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
(function(){function d(c){if(!c)throw Error("No options passed to Waypoint constructor");if(!c.element)throw Error("No element option passed to Waypoint constructor");if(!c.handler)throw Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+b;this.options=d.Adapter.extend({},d.defaults,c);this.element=this.options.element;this.adapter=new d.Adapter(this.element);this.callback=c.handler;this.axis=this.options.horizontal?"horizontal":"vertical";this.enabled=this.options.enabled;
this.triggerPoint=null;this.group=d.Group.findOrCreate({name:this.options.group,axis:this.axis});this.context=d.Context.findOrCreateByElement(this.options.context);d.offsetAliases[this.options.offset]&&(this.options.offset=d.offsetAliases[this.options.offset]);this.group.add(this);this.context.add(this);a[this.key]=this;b+=1}var b=0,a={};d.prototype.queueTrigger=function(a){this.group.queueTrigger(this,a)};d.prototype.trigger=function(a){this.enabled&&this.callback&&this.callback.apply(this,a)};d.prototype.destroy=
function(){this.context.remove(this);this.group.remove(this);delete a[this.key]};d.prototype.disable=function(){this.enabled=!1;return this};d.prototype.enable=function(){this.context.refresh();this.enabled=!0;return this};d.prototype.next=function(){return this.group.next(this)};d.prototype.previous=function(){return this.group.previous(this)};d.invokeAll=function(b){var c=[];for(d in a)c.push(a[d]);var d=0;for(var g=c.length;d<g;d++)c[d][b]()};d.destroyAll=function(){d.invokeAll("destroy")};d.disableAll=
function(){d.invokeAll("disable")};d.enableAll=function(){d.Context.refreshAll();for(var b in a)a[b].enabled=!0;return this};d.refreshAll=function(){d.Context.refreshAll()};d.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight};d.viewportWidth=function(){return document.documentElement.clientWidth};d.adapters=[];d.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0};d.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-
this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}};window.Waypoint=d})();
(function(){function d(a){window.setTimeout(a,1E3/60)}function b(d){this.element=d;this.Adapter=e.Adapter;this.adapter=new this.Adapter(d);this.key="waypoint-context-"+a;this.didResize=this.didScroll=!1;this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()};this.waypoints={vertical:{},horizontal:{}};d.waypointContextKey=this.key;c[d.waypointContextKey]=this;a+=1;e.windowContext||(e.windowContext=!0,e.windowContext=new b(window));this.createThrottledScrollHandler();this.createThrottledResizeHandler()}
var a=0,c={},e=window.Waypoint,f=window.onload;b.prototype.add=function(a){this.waypoints[a.options.horizontal?"horizontal":"vertical"][a.key]=a;this.refresh()};b.prototype.checkEmpty=function(){var a=this.Adapter.isEmptyObject(this.waypoints.horizontal),b=this.Adapter.isEmptyObject(this.waypoints.vertical),d=this.element==this.element.window;a&&b&&!d&&(this.adapter.off(".waypoints"),delete c[this.key])};b.prototype.createThrottledResizeHandler=function(){function a(){b.handleResize();b.didResize=
!1}var b=this;this.adapter.on("resize.waypoints",function(){b.didResize||(b.didResize=!0,e.requestAnimationFrame(a))})};b.prototype.createThrottledScrollHandler=function(){function a(){b.handleScroll();b.didScroll=!1}var b=this;this.adapter.on("scroll.waypoints",function(){if(!b.didScroll||e.isTouch)b.didScroll=!0,e.requestAnimationFrame(a)})};b.prototype.handleResize=function(){e.Context.refreshAll()};b.prototype.handleScroll=function(){var a={},b={horizontal:{newScroll:this.adapter.scrollLeft(),
oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}},c;for(c in b){var d=b[c],e=d.newScroll>d.oldScroll?d.forward:d.backward,f;for(f in this.waypoints[c]){var l=this.waypoints[c][f];if(null!==l.triggerPoint){var m=d.oldScroll<l.triggerPoint,t=d.newScroll>=l.triggerPoint,u=!m&&!t;if(m&&t||u)l.queueTrigger(e),a[l.group.id]=l.group}}}for(var v in a)a[v].flushTriggers();this.oldScroll={x:b.horizontal.newScroll,
y:b.vertical.newScroll}};b.prototype.innerHeight=function(){return this.element==this.element.window?e.viewportHeight():this.adapter.innerHeight()};b.prototype.remove=function(a){delete this.waypoints[a.axis][a.key];this.checkEmpty()};b.prototype.innerWidth=function(){return this.element==this.element.window?e.viewportWidth():this.adapter.innerWidth()};b.prototype.destroy=function(){var a=[];for(c in this.waypoints)for(var b in this.waypoints[c])a.push(this.waypoints[c][b]);var c=0;for(b=a.length;c<
b;c++)a[c].destroy()};b.prototype.refresh=function(){var a=this.element==this.element.window,b=a?void 0:this.adapter.offset(),c={};this.handleScroll();a={horizontal:{contextOffset:a?0:b.left,contextScroll:a?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:a?0:b.top,contextScroll:a?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};
for(var d in a){b=a[d];for(var f in this.waypoints[d]){var n=this.waypoints[d][f],l=n.options.offset,m=n.triggerPoint,t=0,u=null==m;n.element!==n.element.window&&(t=n.adapter.offset()[b.offsetProp]);"function"===typeof l?l=l.apply(n):"string"===typeof l&&(l=parseFloat(l),-1<n.options.offset.indexOf("%")&&(l=Math.ceil(b.contextDimension*l/100)));n.triggerPoint=Math.floor(t+(b.contextScroll-b.contextOffset)-l);m=m<b.oldScroll;t=n.triggerPoint>=b.oldScroll;l=m&&t;m=!m&&!t;!u&&l?(n.queueTrigger(b.backward),
c[n.group.id]=n.group):!u&&m?(n.queueTrigger(b.forward),c[n.group.id]=n.group):u&&b.oldScroll>=n.triggerPoint&&(n.queueTrigger(b.forward),c[n.group.id]=n.group)}}e.requestAnimationFrame(function(){for(var a in c)c[a].flushTriggers()});return this};b.findOrCreateByElement=function(a){return b.findByElement(a)||new b(a)};b.refreshAll=function(){for(var a in c)c[a].refresh()};b.findByElement=function(a){return c[a.waypointContextKey]};window.onload=function(){f&&f();b.refreshAll()};e.requestAnimationFrame=
function(a){(window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||d).call(window,a)};e.Context=b})();
(function(){function d(a,b){return a.triggerPoint-b.triggerPoint}function b(a,b){return b.triggerPoint-a.triggerPoint}function a(a){this.name=a.name;this.axis=a.axis;this.id=this.name+"-"+this.axis;this.waypoints=[];this.clearTriggerQueues();c[this.axis][this.name]=this}var c={vertical:{},horizontal:{}},e=window.Waypoint;a.prototype.add=function(a){this.waypoints.push(a)};a.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}};a.prototype.flushTriggers=function(){for(var a in this.triggerQueues){var c=
this.triggerQueues[a];c.sort("up"===a||"left"===a?b:d);for(var e=0,h=c.length;e<h;e+=1){var p=c[e];(p.options.continuous||e===c.length-1)&&p.trigger([a])}}this.clearTriggerQueues()};a.prototype.next=function(a){this.waypoints.sort(d);a=e.Adapter.inArray(a,this.waypoints);return a===this.waypoints.length-1?null:this.waypoints[a+1]};a.prototype.previous=function(a){this.waypoints.sort(d);return(a=e.Adapter.inArray(a,this.waypoints))?this.waypoints[a-1]:null};a.prototype.queueTrigger=function(a,b){this.triggerQueues[b].push(a)};
a.prototype.remove=function(a){a=e.Adapter.inArray(a,this.waypoints);-1<a&&this.waypoints.splice(a,1)};a.prototype.first=function(){return this.waypoints[0]};a.prototype.last=function(){return this.waypoints[this.waypoints.length-1]};a.findOrCreate=function(b){return c[b.axis][b.name]||new a(b)};e.Group=a})();
(function(){function d(a){this.$element=b(a)}var b=window.jQuery,a=window.Waypoint;b.each("innerHeight innerWidth off offset on outerHeight outerWidth scrollLeft scrollTop".split(" "),function(a,b){d.prototype[b]=function(){var a=Array.prototype.slice.call(arguments);return this.$element[b].apply(this.$element,a)}});b.each(["extend","inArray","isEmptyObject"],function(a,e){d[e]=b[e]});a.adapters.push({name:"jquery",Adapter:d});a.Adapter=d})();
(function(){function d(a){return function(c,d){var e=[],g=c;a.isFunction(c)&&(g=a.extend({},d),g.handler=c);this.each(function(){var c=a.extend({},g,{element:this});"string"===typeof c.context&&(c.context=a(this).closest(c.context)[0]);e.push(new b(c))});return e}}var b=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=d(window.jQuery));window.Zepto&&(window.Zepto.fn.waypoint=d(window.Zepto))})(); //# sourceMappingURL=/en/t4-media/one-web/university/admin-assets/js/map/plugins-homepage-min.js.map


/*! Background Image Carousel
* Created: Jan 17th, 2012 by DynamicDrive.com. This notice must stay intact for usage 
* Author: Dynamic Drive at http://www.dynamicdrive.com/
* Visit http://www.dynamicdrive.com/ for full source code
*/

//** Modified Jan 23th, 12'- Fixed bug with auto rotate bug in "manual" mode
//** Modified Feb 21st, 12'- Fixed bug with carousel not always initializing in IE8 and less

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
                            +   '</div>'
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

