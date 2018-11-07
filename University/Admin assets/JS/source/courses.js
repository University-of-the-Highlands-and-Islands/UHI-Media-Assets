// QR Code
jQuery(document).ready(function(){
   callQR(); 
 });

// showHide code for "I want to start in [date], I want to study [full or part time], at [college]"
 function showHide(obj) {
  if (document.getElementById(obj)) {
   var div = document.getElementById(obj);
   if (div.style.display == 'none') {
     div.style.display = '';
   }
   else {
     div.style.display = 'none';
   }
	} 
 }

 function reset(obj) {
  if (document.getElementById(obj)) {
   var div = document.getElementById(obj);
   if (div.style.display == 'none') {
     div.style.display = 'none';
   }
   else {
     div.style.display = 'none';
   }
  }
 }
 
 function toggle(obj) {
  if (document.getElementById(obj)) {
   document.getElementById(obj).className = "toggled";
	}
 }
 
 function untoggle(obj) {
  if (document.getElementById(obj)) {
   document.getElementById(obj).className = "";
  }
 }

function thisYear() {
	showHide('mode1'); 
	reset('mode2'); 
	reset('mode3'); 
	reset('mode4'); 
	reset('mode1ft'); 
	reset('mode1pt'); 
	reset('mode2ft'); 
	reset('mode2pt'); 
	reset('mode3ft'); 
	reset('mode3pt'); 
	reset('mode4ft'); 
	reset('mode4pt'); 
	toggle('year1'); 
	untoggle('year2'); 
	untoggle('year3'); 
	untoggle('year4'); 
	untoggle('mode1a'); 
	untoggle('mode1b'); 
	return false;
 }

function nextYear() {
	showHide('mode2'); 
	reset('mode1'); 
	reset('mode3'); 
	reset('mode4'); 
	reset('mode1ft'); 
	reset('mode1pt'); 
	reset('mode2ft'); 
	reset('mode2pt'); 
	reset('mode3ft'); 
	reset('mode3pt'); 
	reset('mode4ft'); 
	reset('mode4pt'); 
	toggle('year2'); 
	untoggle('year1'); 
	untoggle('year3'); 
	untoggle('year4'); 
	untoggle('mode2a'); 
	untoggle('mode2b'); 
	return false;
}

 function threeYear() {									
	showHide('mode3'); 
	reset('mode1'); 
	reset('mode2'); 
	reset('mode4'); 
	reset('mode1ft'); 
	reset('mode1pt'); 
	reset('mode2ft'); 
	reset('mode2pt'); 
	reset('mode3ft'); 
	reset('mode3pt'); 
	reset('mode4ft'); 
	reset('mode4pt'); 
	toggle('year3'); 
	untoggle('year1'); 
	untoggle('year2'); 
	untoggle('year4'); 
	untoggle('mode3a'); 
	untoggle('mode3b'); 
	return false;
 }
 function fourYear() {									
	showHide('mode4'); 
	reset('mode1'); 
	reset('mode2'); 
	reset('mode3'); 
	reset('mode1ft'); 
	reset('mode1pt'); 
	reset('mode2ft'); 
	reset('mode2pt'); 
	reset('mode3ft'); 
	reset('mode3pt'); 
	reset('mode4ft'); 
	reset('mode4pt'); 
	toggle('year4'); 
	untoggle('year1'); 
	untoggle('year2'); 
	untoggle('year3'); 
	untoggle('mode4a'); 
	untoggle('mode4b'); 
	return false;
 }

function thisFT() {
	showHide('mode1ft'); 
	reset('mode1pt'); 
	reset('mode2ft'); 
	reset('mode2pt'); 
	reset('mode3ft'); 
	reset('mode3pt'); 
	reset('mode4ft'); 
	reset('mode4pt'); 
	toggle('mode1a'); 
	untoggle('mode1b'); 
	return false;
}

function thisPT() {
	showHide('mode1pt'); 
	reset('mode1ft'); 
	reset('mode2ft'); 
	reset('mode2pt'); 
	reset('mode3ft'); 
	reset('mode3pt'); 
	reset('mode4ft'); 
	reset('mode4pt'); 
	toggle('mode1b'); 
	untoggle('mode1a'); 
	return false;
}

function nextFT() {								
	showHide('mode2ft'); 
	reset('mode1ft'); 
	reset('mode1pt'); 
	reset('mode2pt'); 
	reset('mode3ft'); 
	reset('mode3pt'); 
	reset('mode4ft'); 
	reset('mode4pt'); 
	toggle('mode2a'); 
	untoggle('mode2b'); 
	return false;
}
									 
function nextPT() {									 
	showHide('mode2pt'); 
	reset('mode1ft'); 
	reset('mode1pt'); 
	reset('mode2ft'); 
	reset('mode3ft'); 
	reset('mode3pt'); 
	reset('mode4ft'); 
	reset('mode4pt'); 
	toggle('mode2b'); 
	untoggle('mode2a'); 
	return false;
}

function threeFT() {								
	showHide('mode3ft'); 
	reset('mode1ft'); 
	reset('mode1pt'); 
	reset('mode2ft'); 
	reset('mode2pt'); 
	reset('mode3pt'); 
	reset('mode4ft'); 
	reset('mode4pt'); 
	toggle('mode3a'); 
	untoggle('mode3b'); 
	return false;
}
									 
function threePT() {									 
	showHide('mode3pt'); 
	reset('mode1ft'); 
	reset('mode1pt'); 
	reset('mode2ft'); 
	reset('mode2pt'); 
	reset('mode3ft'); 
	reset('mode4ft'); 
	reset('mode4pt'); 
	toggle('mode3b'); 
	untoggle('mode3a'); 
	return false;
}
function fourFT() {								
	showHide('mode4ft'); 
	reset('mode1ft'); 
	reset('mode1pt'); 
	reset('mode2ft'); 
	reset('mode2pt'); 
	reset('mode3ft'); 
	reset('mode3pt'); 
	reset('mode4pt'); 
	toggle('mode4a'); 
	untoggle('mode4b'); 
	return false;
}
									 
function fourPT() {									 
	showHide('mode4pt'); 
	reset('mode1ft'); 
	reset('mode1pt'); 
	reset('mode2ft'); 
	reset('mode2pt'); 
	reset('mode3ft'); 
	reset('mode3pt'); 
	reset('mode4ft'); 
	toggle('mode4b'); 
	untoggle('mode4a'); 
	return false;
}
