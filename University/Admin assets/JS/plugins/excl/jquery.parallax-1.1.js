/*
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
