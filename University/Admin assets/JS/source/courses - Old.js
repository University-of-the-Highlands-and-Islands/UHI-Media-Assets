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
    showHide("mode1"); 
    reset("mode2"); 
    reset("mode3"); 
    reset("mode4"); 
    reset("mode1ft"); 
    reset("mode1pt"); 
    reset("mode1dl"); 
    reset("mode2ft"); 
    reset("mode2pt"); 
    reset("mode2dl"); 
    reset("mode3ft"); 
    reset("mode3pt"); 
    reset("mode3dl"); 
    reset("mode4ft"); 
    reset("mode4pt");
    reset("mode4dl"); 
    toggle("year1");
    untoggle("year2");
    untoggle("year3");
    untoggle("year4");
    untoggle("mode1a");
    untoggle("mode1b");
    untoggle("mode1c");
	return false;
 }

function nextYear() {
    showHide("mode2"); 
    reset("mode1"); 
    reset("mode3"); 
    reset("mode4"); 
    reset("mode1ft"); 
    reset("mode1pt"); 
    reset("mode1dl");
    reset("mode2ft"); 
    reset("mode2pt");
    reset("mode2dl");
    reset("mode3ft"); 
    reset("mode3pt");
    reset("mode3dl");
    reset("mode4ft"); 
    reset("mode4pt");
    reset("mode4dl");
    toggle("year2");
    untoggle("year1");
    untoggle("year3");
    untoggle("year4");
    untoggle("mode2a");
    untoggle("mode2b");
    untoggle("mode2c");
	return false;
}

 function threeYear() {									
    showHide("mode3"); 
    reset("mode1"); 
    reset("mode2"); 
    reset("mode4"); 
    reset("mode1ft"); 
    reset("mode1pt"); 
    reset("mode1dl");
    reset("mode2ft"); 
    reset("mode2pt"); 
    reset("mode2dl");
    reset("mode3ft"); 
    reset("mode3pt"); 
    reset("mode3dl");
    reset("mode4ft"); 
    reset("mode4pt");
    reset("mode4dl");
    toggle("year3");
    untoggle("year1");
    untoggle("year2");
    untoggle("year4");
    untoggle("mode3a");
    untoggle("mode3b");
    untoggle("mode3c");
	return false;
 }
 function fourYear() {									
    showHide("mode4"); 
    reset("mode1"); 
    reset("mode2"); 
    reset("mode3"); 
    reset("mode1ft"); 
    reset("mode1pt");
    reset("mode1dl");
    reset("mode2ft"); 
    reset("mode2pt"); 
    reset("mode2dl");
    reset("mode3ft"); 
    reset("mode3pt");
    reset("mode3dl");
    reset("mode4ft"); 
    reset("mode4pt");
    reset("mode4dl");
    toggle("year4");
    untoggle("year1");
    untoggle("year2");
    untoggle("year3");
    untoggle("mode4a");
    untoggle("mode4b");
    untoggle("mode4c");
	return false;
 }

function thisFT() {
    showHide("mode1ft"); 
    reset("mode1pt"); 
    reset("mode1dl");
    reset("mode2ft"); 
    reset("mode2pt"); 
    reset("mode2dl");
    reset("mode3ft"); 
    reset("mode3pt");
    reset("mode3dl");
    reset("mode4ft"); 
    reset("mode4pt");
    reset("mode4dl");
    toggle("mode1a");
    untoggle("mode1b");
    untoggle("mode1c"); 
	return false;
}

function thisPT() {
    showHide("mode1pt"); 
    reset("mode1ft"); 
    reset("mode1dl");
    reset("mode2ft"); 
    reset("mode2pt"); 
    reset("mode2dl");
    reset("mode3ft"); 
    reset("mode3pt"); 
    reset("mode3dl");
    reset("mode4ft"); 
    reset("mode4pt");
    reset("mode4dl");
    toggle("mode1b");
    untoggle("mode1a");
    untoggle("mode1c");
	return false;
}

function thisDL() {
    showHide("mode1dl");
    reset("mode1ft");
    reset("mode1pt");
    reset("mode2ft");
    reset("mode2pt");
    reset("mode2dl");
    reset("mode3ft");
    reset("mode3pt");
    reset("mode3dl");
    reset("mode4ft");
    reset("mode4pt");
    reset("mode4dl");
    toggle("mode1c");
    untoggle("mode1a");
    untoggle("mode1b");
	return false;
}

function nextFT() {								
    showHide("mode2ft"); 
    reset("mode1ft"); 
    reset("mode1pt"); 
    reset("mode1dl"); 
    reset("mode2pt"); 
    reset("mode2dl");
    reset("mode3ft"); 
    reset("mode3pt");
    reset("mode3dl");
    reset("mode4ft"); 
    reset("mode4pt");
    reset("mode4dl");
    toggle("mode2a");
    untoggle("mode2b");
    untoggle("mode2c");
	return false;
}
									 
function nextPT() {									 
    showHide("mode2pt"); 
    reset("mode1ft"); 
    reset("mode1pt"); 
    reset("mode1dl"); 
    reset("mode2ft");
    reset("mode2dl"); 
    reset("mode3ft"); 
    reset("mode3pt"); 
    reset("mode3dl"); 
    reset("mode4ft"); 
    reset("mode4pt");
    reset("mode4dl"); 
    toggle("mode2b");
    untoggle("mode2a");
    untoggle("mode2c");
	return false;
}

function nextDL() {
    showHide("mode2dl");
    reset("mode1ft");
    reset("mode1pt");
    reset("mode1dl");
    reset("mode2ft");
    reset("mode2pt");
    reset("mode3ft");
    reset("mode3pt");
    reset("mode3dl");
    reset("mode4ft");
    reset("mode4pt");
    reset("mode4dl");
    toggle("mode2c");
    untoggle("mode2a");
    untoggle("mode2b");
	return false;
}

function threeFT() {								
    showHide("mode3ft"); 
    reset("mode1ft"); 
    reset("mode1pt");
    reset("mode1dl");
    reset("mode2ft"); 
    reset("mode2pt"); 
    reset("mode2dl");
    reset("mode3pt"); 
    reset("mode3dl");
    reset("mode4ft"); 
    reset("mode4pt");
    reset("mode4dl");
    toggle("mode3a");
    untoggle("mode3b");
    untoggle("mode3c");
	return false;
}
									 
function threePT() {									 
    showHide("mode3pt"); 
    reset("mode1ft"); 
    reset("mode1pt"); 
    reset("mode1dl");
    reset("mode2ft"); 
    reset("mode2pt");
    reset("mode2dl");
    reset("mode3ft"); 
    reset("mode3dl");
    reset("mode4ft"); 
    reset("mode4pt");
    reset("mode4dl");
    toggle("mode3b");
    untoggle("mode3a");
    untoggle("mode3c");
	return false;
}

function threeDL() {
    showHide("mode3dl");
    reset("mode1ft");
    reset("mode1pt");
    reset("mode1dl");
    reset("mode2ft");
    reset("mode2pt");
    reset("mode2dl");
    reset("mode3ft");
    reset("mode3pt");
    reset("mode4ft");
    reset("mode4pt");
    reset("mode4dl");
    toggle("mode3c");
    untoggle("mode3a");
    untoggle("mode3b");
	return false;
}


function fourFT() {								
    showHide("mode4ft"); 
    reset("mode1ft"); 
    reset("mode1pt"); 
    reset("mode1dl");
    reset("mode2ft"); 
    reset("mode2pt");
    reset("mode2dl");
    reset("mode3ft"); 
    reset("mode3pt");
    reset("mode3dl");
    reset("mode4pt");
    reset("mode4l");
    toggle("mode4a");
    untoggle("mode4b");
    untoggle("mode4c");
	return false;
}
									 
function fourPT() {									 
    showHide("mode4pt"); 
    reset("mode1ft"); 
    reset("mode1pt");
    reset("mode1dl");
    reset("mode2ft"); 
    reset("mode2pt"); 
    reset("mode2dl");
    reset("mode3ft"); 
    reset("mode3pt");
    reset("mode3dl");
    reset("mode4ft");
    reset("mode4dl");
    toggle("mode4b");
    untoggle("mode4a");
    untoggle("mode4c");
	return false;
}

function fourDL() {
    showHide("mode4dl");
    reset("mode1ft");
    reset("mode1pt");
    reset("mode1dl");
    reset("mode2ft");
    reset("mode2pt");
    reset("mode2dl");
    reset("mode3ft");
    reset("mode3pt");
    reset("mode3dl");
    reset("mode4ft");
    reset("mode4pt");
    toggle("mode4c");
    untoggle("mode4a");
    untoggle("mode4b");
	return false;
}