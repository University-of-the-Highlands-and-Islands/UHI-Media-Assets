/* Import packages */
importPackage(com.terminalfour.template);
importPackage(com.terminalfour.sitemanager);
importClass(com.terminalfour.publish.utils.BrokerUtils);

try {

  function getCachedSectionFromId(sectionID) {
    if(sectionID > 0) {
      return com.terminalfour.publish.utils.TreeTraversalUtils.findSection(publishCache.getChannel(), section, sectionID, language);
    } else {
      return '';
    }
  }

  function getContentFromId(contentID) {
    if(contentID > 0) {
      var contentManager = com.terminalfour.spring.ApplicationContextProvider.getBean(com.terminalfour.content.IContentManager.class);
      return contentManager.get(contentID,language);
    }
  }

  function  getLayout(contentLayout, contentID, sectionID, displayError) {
    if (typeof contentLayout === 'undefined') {
      document.write('Error: contentLayout is required for getLayout ('+contentLayout+' of '+contentID+').');
      return '';
    }
    var oContent 	= content || null;
    if (typeof contentID !== 'undefined') {
      oContent = getContentFromId(contentID);
      if (!oContent) {
        document.write('Error getting the custom content: '+contentID);
        return '';
      }
    }
    //document.write('oContent'+oContent.getID());
    try {
        var tid 	    = oContent.getContentTypeID();
        formatter     = contentLayout;
        format        = publishCache.getTemplateFormatting(dbStatement, tid, formatter);
        formatString  = format.getFormatting();
        return processTags(formatString,contentID,sectionID);
    } catch (e) {
        if (typeof displayError === 'undefined') {
          displayError = true;
        }
        if (displayError == true) {
          document.write('Error: Content Layout not found: '+ contentLayout +' of '+contentID+'.');
        }
        return '';
    }
  }

  function processTags(t4Tag, contentID, sectionID) {
    var oContent 		= content || null;
    var CachedSection = section;
    if (typeof contentID !== 'undefined') {
      if (typeof sectionID === 'undefined') {
        document.write('Error: sectionID is undefined');
        return '';
      }
      oContent 		= getContentFromId(contentID);
      CachedSection = this.section.getCachedSectionFromId(sectionID);
      if (CachedSection == '' || !oContent) {
        document.write('Error getting the custom content and section');
        return '';
      }
    }
    return com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, CachedSection, oContent, language, isPreview, t4Tag);
  }


    document.write('<main>');  /* moved main tag 20191114 */

  /*************************************
  	- Truths about this course -
  **************************************/
	/* Template ID and Template manger */

    var courseCodeExtra = processTags('<t4 type="content" name="Course code extra" output="normal" modifiers="striptags" />');
    var courseCode = processTags('<t4 type="content" name="Course code" output="normal" modifiers="striptags" />');
    var identifier = processTags('<t4 type="content" name="Identifier" output="normal" modifiers="striptags" />');
    var contactForm = processTags('<t4 type="content" name="Show contact form" output="normal" display_field="value" />');
    var showContactForm = (contactForm == "Yes") ? true : false;

  	/* Is this Gaelic? */
//    var isGD = ((courseCodeExtra.substring(courseCodeExtra.length()-1) == 'G') && (courseCode != '304G' && courseCode != '0CFG' && courseCode != '75NG' && courseCode != '154G' && courseCode != '054G')) ? true : false ;

  var isGD = (identifier == '0998') ? true : false ;

  	/************************************
    	  - Course content banner -
    *************************************/
	/* Write the course banner with title, UCAS code etc */
	var formatter       ='text/course-banner';
  document.write(getLayout(formatter));

	/***********************************
    	  - Course content tabs -
    ************************************/
	/* Open Course body tabs outer wrappers */
/*    document.write('<main class="section clearfix coursedetails">');  20191114   */
  document.write('<div class="section clearfix coursedetails">');
	document.write('<div class="wrap tabs">');

  		/* Tab headings - EN or GD */
  		formatter 			=  isGD ? 'text/tab-headings-gd' : 'text/tab-headings-en' ;
  		document.write(getLayout(formatter));

  		/* Summary tab */
 if(isGD) {
      formatter = 'text/tab-summary-gd' ;
  		document.write(getLayout(formatter));
  } else {
      formatter = 'text/tab-summary-top-en' ;
  		document.write(getLayout(formatter));

      	/* Is this full time, HN or Degree and not online only - if so need acc link, if available */
    var fulltime = processTags('<t4 type="content" name="Full time?" output="normal" modifiers="striptags" />');
    var level = processTags('<t4 type="content" name="Level" output="normal" modifiers="striptags" />');

      /* accomodation link */

     var online = processTags('<t4 type="content" name="Online" output="normal" modifiers="striptags" />');


    var accLink = ((level == "BA (Hons)" || level == "BSc (Hons)" || level == "CertHE" || level == "BSc" || level == "HNC" || level == "HND") && (fulltime.toLowerCase().contains("yes")) && (!online.toLowerCase().contains("y"))) ? true : false ;
    var accContent = '';
   if(accLink){
     accContent = processTags('<t4 type="navigation" name="Course Accommodation Link getter - Course Codes" id="348" />');
     if(accContent.length() == 0) {
       accContent = processTags('<t4 type="navigation" name="Course Accommodation Link getter - Partner" id="349" />');
     }

   document.write("<h3>Accommodation</h3>");

   if(accContent == '') {
     document.write("<p>We offer modern&nbsp;<a href='https://www.uhi.ac.uk/en/studying-at-uhi/first-steps/accommodation/'>student accommodation</a> at a number of our locations.</p>");
   }
   else {
     document.write(accContent);
   }
}

        formatter = 'text/tab-summary-bottom-en' ;
  		 document.write(getLayout(formatter));
  }


  		/* Content tab - not lang dependent */
  		formatter 			=  'text/tab-content';
  		document.write(getLayout(formatter));

  		/* Study Mode tab */
  		formatter 			=  isGD ? 'text/tab-study-mode-gd' : 'text/tab-study-mode-en' ;
  		document.write(getLayout(formatter));

  		/* Funding tab  */
  		/* Do this one here as we cannot add PLs code to layouts that are called by a PLs layout */
        document.write('<div id="tab-funding" class="tab">');
  		/* Left col */
        document.write('<div class="col half"><h3>Fees</h3>');

  			var feesContent = '';
		 	feesContent = processTags('<t4 type="navigation" name="Uni - Course Codes" id="81" /><t4 type="navigation" name="Argyll - Course Codes" id="255" /><t4 type="navigation" name="HTC - Course Codes" id="262" /><t4 type="navigation" name="Inverness - Course Codes" id="258" /><t4 type="navigation" name="Lews - Course Codes" id="270" /><t4 type="navigation" name="Moray - Course Codes" id="273" /><t4 type="navigation" name="NorthHighland - Course Codes" id="276" /><t4 type="navigation" name="Orkney - Course Codes" id="260" /><t4 type="navigation" name="Perth - Course Codes" id="267" /><t4 type="navigation" name="Shetland - Course Codes" id="265" /><t4 type="navigation" name="WHC - Course Codes" id="279" />');
            if (feesContent.length() > 0) {
                document.write(feesContent);
            } else {
                feesContent = processTags('<t4 type="navigation" name="Uni - Course Level" id="82" /><t4 type="navigation" name="Argyll - Course Level" id="256" /><t4 type="navigation" name="Inverness - Course Level" id="259" /><t4 type="navigation" name="HTC - Course Level" id="263" /><t4 type="navigation" name="Lews - Course Level" id="271" /><t4 type="navigation" name="Moray - Course Level" id="274" /><t4 type="navigation" name="NorthHighland - Course Level" id="277" /><t4 type="navigation" name="Orkney - Course Level" id="261" /><t4 type="navigation" name="Perth - Course Level" id="268" /><t4 type="navigation" name="Shetland - Course Level" id="266" /><t4 type="navigation" name="WHC - Course Level" id="280" />');
                if (feesContent.length() > 0) {
                    document.write(feesContent);
                } else {
                  feesContent = processTags('<t4 type="navigation" name="Default fees message" id="257" />');
                      document.write(feesContent);
                }
            }

  		/* Close Left col */
  		document.write('</div>');
  		/* Right col */
  		document.write('<div class="col half">');




  				var fundingHeading = isGD ? 'Maoineachadh' : 'Funding' ;
  				//Maoineachadh

         var funding = processTags('<t4 type="content" name="Funding" output="normal" modifiers="nl2br" />');
  if (funding.length() != 0) {
  				document.write('<h3>'+ fundingHeading +'</h3>');
  				document.write(processTags('<t4 type="content" name="Funding" output="normal" modifiers="nl2br" />') );
  }

  		/* Close Right col */
  		document.write('</div>');



   /* Equipment */
  var additionalCosts = processTags('<t4 type="content" name="Additional course costs" output="normal" modifiers="nl2br" />');
  if (additionalCosts.length() != 0) {
              document.write('<div class="col half">');
  				document.write('<h3>Additional Costs</h3>');
  				document.write(processTags('<t4 type="content" name="Additional course costs" output="normal" modifiers="nl2br" />') );
              document.write('</div>');
  }


        /* Close funding tab  */
  		document.write('</div>');

  		/* Career tab */
  		formatter 			=  isGD ? 'text/tab-career-gd' : 'text/tab-career-en' ;
  		document.write(getLayout(formatter));

  	/* Close tabs  */
	document.write('</div><!-- end .wrap.tabs -->');
    document.write('</div><!-- end .section.clearfix.coursedetails -->'); /* was "main" */

  	/***********************************
       - Testimonials and Apply Now -
    ************************************/
  	document.write('<div class="section ctas">');
  		var quoteOne = '';

  		quoteOne = processTags('<t4 type="content" name="Quote 1" output="normal" modifiers="nl2br" />');

  		if (quoteOne.length() > 0) {
          	/* Write quotes wrapper */
        	document.write('<div class="section clearfix testimonials">');
                  document.write('	<div class="wrap">');
                      var quotesHeading = isGD ? 'Na tha na h-oileanaich againn ag ràdh' : 'What our <strong>students</strong>, <strong>graduates</strong> and <strong>staff</strong> say' ;
                      document.write('<h2>'+quotesHeading+'</h2>');
                      /* Open Quotes tabs */
                      document.write('<div class="quotes tabs">');

							/* Write Quote one */
          					/* Open tab1 */
          					document.write('<div id="tab1"><blockquote>');
								/* Write quote */
          						document.write(quoteOne);
          					/* Close tab1 */
          					document.write('</blockquote></div>');

          					/** Quote two **/
          					var quoteTwo = '';
                            quoteTwo = processTags('<t4 type="content" name="Quote 2" output="normal" modifiers="nl2br" />');
          					if (quoteTwo.length() > 0) {
                            	/* Open tab2 */
          						document.write('<div id="tab2"><blockquote>');
                                  /*Write quote */
                                  document.write(quoteTwo);
                                /* Close tab3 */
                                document.write('</blockquote></div>');
                            }

          					/** Quote three **/
          					var quoteThree = '';
                            quoteThree = processTags('<t4 type="content" name="Quote 3" output="normal" modifiers="nl2br" />');
          					if (quoteThree.length() > 0) {
                            	/* Open tab3 */
          						document.write('<div id="tab3"><blockquote>');
                                  /*Write quote */
                                  document.write(quoteThree);
                                /* Close tab3 */
                                document.write('</blockquote></div>');
                            }

          					/* Quotes thumbnails */
          					document.write('<ul class="thumbs">');
          						/* Thumbnail one */
                              	document.write('<li>');
                                document.write('	<a class="img" href="#tab1">');
          								var quoteOneImage = '';
                               /*         quoteOneImage = processTags('<t4 type="navigation" name="Course Quote Image 1 getter - current section" id="83" />');   */
                                          quoteOneImage = processTags('<t4 type="navigation" name="Course Quote Image 1 getter - central" id="442" />');

          								if (quoteOneImage.length()  == 0) {
                                          	quoteOneImage = processTags('<t4 type="navigation" name="Course Quote Image getter - default image" id="86" />');

                                        }
          								document.write(quoteOneImage) ;

                                document.write('	</a>');
                                document.write('</li>');
                                if (quoteTwo.length() > 0) {
                              		document.write('<li>');
                                  	document.write(' 	<a class="img" href="#tab2">');
                                  		var quoteTwoImage = '';
                                        quoteTwoImage = processTags('<t4 type="navigation" name="Course Quote Image 2 getter - current section" id="84" />');
          								if (quoteTwoImage.length()  == 0) {
                                          	quoteTwoImage = processTags('<t4 type="navigation" name="Course Quote Image getter - default image" id="86" />');

                                        }
                                  		document.write(quoteTwoImage) ;
									document.write('	</a>');
                                	document.write('</li>');
                                }
          						if (quoteThree.length() > 0) {
                              		document.write('<li>');
                                  	document.write(' <a class="img" href="#tab3">');
                                  		var quoteThreeImage = '';
                                        quoteThreeImage = processTags('<t4 type="navigation" name="Course Quote Image 3 getter - current section" id="85" />');
          								if (quoteThreeImage.length()  == 0) {
                                          	quoteThreeImage = processTags('<t4 type="navigation" name="Course Quote Image getter - default image" id="86" />');
                                        }
                                  		document.write(quoteThreeImage) ;
									document.write('	</a>');
                                	document.write('</li>');
                                }
                            /* Close Quotes thumbnails */
                            document.write('</ul>');

          			  /* Close Quotes tabs */
                      document.write('</div>');
          		  /* Close quotes wrapper */
          		  document.write('	</div>');
          	document.write('</div>');

        }//end if Quote 1

  		/* Apply block */


  if (!showContactForm) {

  		/* Apply block */
  		/* Open Apply block */
  		document.write('<div class="section clearfix apply" id="applynow">');
  		document.write('	<div class="wrap">');
		document.write('		<div id="Apply">');
		document.write('			<div class="wrap">');
  				/* Write apply content */
  				document.write(processTags('<t4 type="content" name="Apply" output="normal" modifiers="nl2br" />'));

  				/* Disclaimer en/gd */
  				var disclaimer = processTags('<t4 type="navigation" name="EN Course disclaimer getter" id="87" />');

  				if (isGD) {
                	disclaimer = processTags('<t4 type="navigation" name="GD Course disclaimer getter" id="88" />');
                }
                document.write(disclaimer);
  		/* Close Apply block */
  		document.write('			</div>');
		document.write('		</div>');
		document.write('	</div>');
  		document.write('</div>');

  	/* Close Testimonials and Apply Now */
  	document.write('</div>');




  }
  else
  {

      	/* Close Testimonials and Apply Now */
  	document.write('</div>');


    messageImage = processTags('<t4 type= "media" formatter= "image/path" id= "341906" />');

document.write('<div class="zoom"><a href="#messageus" class="smallmargin"><span class="smlscrmsg">Got a question? Send us a message</span></a><p id="messageText"><a href="#messageus">Got a question? Send us a message</a><button class="minimise" onclick="minimiseElements()" id="minimise">&horbar;</button></p><a href="#messageus"><img src="' + messageImage +'" alt="Send us a message" title="Send us a message" id="messageImage" /></a></div><div class="bottommessage" id="bottommessage"><a href="#messageus">Got a question? Send us a message</a></div>');





  var courseName = processTags('<t4 type="content" name="Course name" output="normal" modifiers="striptags" />');
  var courseLevel = processTags('<t4 type="content" name="Level" output="normal" modifiers="striptags" />');

  document.write('<div class="section clearfix courseapply">');
  document.write('<div class="wrap">');
    document.write('<div class="" id="applynow"><h3>Apply</h3>');

  	   document.write('<p>Thank you for your interest in studying ' + courseName + ' ' + courseLevel + ' with us.</p>');
  	   document.write('<p>If you are ready to apply, please start your application below by selecting when you would like to start your course. This will take you to the UCAS website or our online application system.</p>');
  	   document.write('<p>If you&#39;re not quite ready, please <a href="#messageus">message us</a> or call <a href="tel:+441463279190">01463 279190</a> if there is anything we can do to help you with your decision. We will handle your query in line with our <a href="#">Privacy Notice</a>.</p>');

    document.write('</div>');

  document.write('</div>');
    document.write('</div>');

  document.write('<div class="section clearfix courseapply ucas">');
    document.write('<div class="wrap">');

    document.write('<div class="col half bottomapply"><h3>Start your application</h3>');
        		/* Open Apply block */
  		document.write('<div class="section clearfix apply">');
  		document.write('	<div class="wrap">');
		document.write('		<div id="Apply">');
	//	document.write('			<div class="wrap">');
  				/* Write apply content */
  				document.write(processTags('<t4 type="content" name="Apply" output="normal" modifiers="nl2br" />'));

  				/* Disclaimer en/gd */
  				var disclaimer = processTags('<t4 type="navigation" name="EN Course disclaimer getter" id="87" />');

  				if (isGD) {
                	disclaimer = processTags('<t4 type="navigation" name="GD Course disclaimer getter" id="88" />');
                }
                document.write(disclaimer);
  		/* Close Apply block */
  		document.write('			</div>');
		document.write('		</div>');
		document.write('	</div>');
    document.write('</div>');

   document.write('<div class="col half messageapply"><h3 id="messageus">Message us</h3>');

  	   formatter       ='text/contact';
       document.write(getLayout(formatter));

    document.write('</div>');

    document.write('</div>');
    document.write('</div>');



  }

//   document.write('<div class="section clearfix kis-container">');
 // 		document.write('	<div class="wrap">');


    /* KIS widget */
var showKIS = processTags('<t4 type="content" name="Display KIS?" output="normal" modifiers="striptags,htmlentities" />').toString().toLowerCase().trim();


        var isFullTime = processTags('<t4 type="content" name="Full time?" output="normal" modifiers="striptags,htmlentities" />').toString().toLowerCase().trim();

                var isPartTime = processTags('<t4 type="content" name="Full time?" output="normal" modifiers="striptags,htmlentities" />').toString().toLowerCase().trim();

        if (showKIS == 'yes' && (isFullTime == 'yes' || isPartTime == 'yes'  )) {
            document.write('<div class="section clearfix course coursefinder"><div class="wrap kis-container">');
            var delivery = (isFullTime == 'yes') ? 'FullTime' : 'PartTime';
            document.write('<div class="kis-widget" id="kistmp" data-institution="10007114" data-course="' + courseCodeExtra + '" data-kismode="' + delivery + '" data-orientation="horizontal" data-language="en-GB"></div>');
        /* delivery may have changed to needing 'FullTime' or 'PartTime' */
            document.write("<script>(function (d) {var widgetScript = d.createElement('script');widgetScript.id = 'unistats-widget-script';widgetScript.src = '//discoveruni.org.uk/widget/embed-script'; var scriptTags = d.getElementsByTagName('script')[0]; if (d.getElementById('unistats-widget-script')) { return; }scriptTags.parentNode.insertBefore(widgetScript, scriptTags);} (document));</script>");
                }

           /* Close course search and KIS widget */
           document.write('</div></div><!-- .coursefinder -->');

    document.write('</div>');
  document.write('</div>');
    document.write('</main>');   /*  new end main tag 20191114  */
} catch (err) {
document.write(err);
}