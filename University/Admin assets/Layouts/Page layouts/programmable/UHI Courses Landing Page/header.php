<?php
	//error_reporting(E_ALL);
	//ini_set('display_errors', 1);
  mb_http_output("utf-8");
  mb_internal_encoding("utf-8");

	//$_ISPREVIEW = false;

	//var_dump($GLOBALS);

	//echo $_SERVER['HTTP_HOST']. $_SERVER['PHP_SELF'] .  "\n";

  // require_once(realpath($_SERVER["DOCUMENT_ROOT"]).'<t4 type="navigation" name="Path to PHP Search core code" id="93" />/index.php');
require_once(realpath($_SERVER['DOCUMENT_ROOT']).'<t4 type="media" formatter="image/path" id="278300" />');

//	$documentsSource = '<t4 type="navigation" name="Path to course search XML file" id="94" />/index.xml';

$partner = false;

$documentsSource = '<t4 type="navigation" name="Path to course search XML file" id="94" />/index.xml';

if(substr($documentsSource,0,4) != '/en/') {
$documentsSource = 'courses/course-search-xml/index.xml';
$partner = true;
}

// Clunky hard-code exception code, but the most efficient option
$coursesubjectsearch = "course-subject-search";
if (strpos($_SERVER["DOCUMENT_ROOT"], 'perth') !== false) {
$coursesubjectsearch = "course-subject-search-custom";
}



// Stop Words
$stopWords = array('/\band\b/is', '/\bof\b/is', '/\bin\b/is', '/\bor\b/is', '/\bwith\b/is', '/\bthe\b/is', '/\bat\b/is');
?>
<!DOCTYPE html>
<t4 type="lang-var" default-language="en" en="<html lang='en'>" gd="<html lang='gd'>" />
<head>
  <!-- UHI Courses Landing Page -->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="googlebot" content="NOODP">
  <meta name="slurp" content="NOYDIR">
  <meta name="msnbot" content="NOODP">
  <t4 type="lang-var" default-language="en" en="<meta name='uhilanguage' content='English'>" gd="<meta name='uhilanguage' content='Gàidhlig'>" />
  <title><t4 type="title" append-content="true" append-element="Title" separator=" - " /> - <t4 type="navigation" name="One-Web Institution Name" id="305" /></title>

  <t4 type="meta" id="12" /> <!-- ~ meta keywords ~ -->
  <t4 type="meta" id="15" /> <!-- ~ meta description ~ -->

  <link rel="alternate" type="application/rss+xml" title="University of the Highlands and Islands Press Releases" href="http://feeds.feedburner.com/uhinews">
  <link rel="alternate" type="application/rss+xml" title="University of the Highlands and Islands Events" href="http://feeds.feedburner.com/uhievents">
  <link rel="alternate" type="application/rss+xml" title="University of the Highlands and Islands Jobs" href="http://feeds.feedburner.com/uhijobs">
  <meta name="viewport" content="width=device-width, minimum-scale=1.0">

  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Oswald:400,700" />
  <t4 type="media" formatter="css/*" id="5543" /><!--common.css-->
  <t4 type="media" formatter="css/*" id="5544" /><!--build-uhi-main.css-->
  <t4 type="media" formatter="css/print" id="275010" /><!--print.css-->

  <!-- ^^ Custom CSS Selector nav object ^^ -->
  <t4 type="navigation" name="UHI CSS Selector" id="30" />
  <t4 type="navigation" name="UHI CSS Selector 2" id="331" />

  <!-- ^^ UHI Header CSS getter nav object #31 ^^ -->
  <t4 type="navigation" name="UHI Header CSS getter nav object" id="31" />

  <t4 type="navigation" name="Favicon getter" id="149" />

  <link rel="apple-touch-icon" href='<t4 type="media" formatter="path/*" id="6615" />'>

  <t4 type="media" formatter="inline/*" id="276807" /> <!-- javacript declarations -->

  <!-- ^^ UHI Header JS getter nav object #49 ^^ -->
  <t4 type="navigation" name="UHI Header JavaScript getter nav object" id="49" />

  <!-- Course search auto-complete -->
  <script>
      $(function() {

          $(document).on('change', '#coursesearch-filters', function(event) {

              //       console.log('Changed serialized: '+$(this).serialize());
              $(this).submit();
          });
          $("#keyword").autocomplete({
              delay: 400,
              minLength: 3,
              position: {
                  my: 'right top',
                  at: 'right bottom'
              },
              //      source: '<t4 type="navigation" name="PHP search auto-complete path" id="95" />index.php',
              source: '<t4 type="media" formatter="image/path" id="278301" />',
              response: function (event, ui) {
                  // event before the menu opens
                  //          console.log(ui);
              },
              select: function(event, ui) {
                  $('#coursesearch').val(ui.item.value);
                  $('#keyword').val(ui.item.value);
                  if(ui.item.label.substring(0,6) === "Search")
                      $('#auto').val("0");
                  else $('#auto').val("1");
                  $('#coursesearch').submit();
              }
          });
      });
  </script>


</head>
<body>
<header class="header clearfix banner">
  <ul class="tools">
    <!-- ^^ Header tools links getter nav #33 ^^ -->
    <t4 type="navigation" name="Header tools links getter" id="33" />

    <!-- ^^ Site search form code getter id: #38 ^^ -->
    <t4 type="navigation" name="Site search form code getter" id="38" />
  </ul>
  <h1 class="logo"><a href="<t4 type="navigation" name="Link to UHI Home" id="89" />" rel="home">University of the Highlands and Islands</a></h1>
  <nav class="nav primary" aria-label="primary">
    <!-- ^^ Primary nav getter nav object #36 -->
    <t4 type="navigation" name="Primary nav getter " id="36" />
  </nav>
  <!-- ^^ Site slogan getter nav object #37 ^^ -->
  <t4 type="navigation" name="Site slogan getter" id="37" />
</header>
<main role="main">
  <!-- ^^ Landing page banner getter ^^ -->
  <t4 type="navigation" name="Landing page banner getter" id="43" />

  <div class="section clearfix courselist">
    <div class="wrap">
      <!-- end UHI Courses Landing Page page layout header -->
      <!-- START T4 Live Content -->
      <div class="col threequarters">
        <ul id="courselist">
