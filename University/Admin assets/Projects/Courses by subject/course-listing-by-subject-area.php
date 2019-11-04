<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

function array_sort_by_column(&$array, $column, $direction = SORT_ASC) {
	$reference_array = array();
	foreach ($array as $key => $row) {
		$reference_array[$key] = $row[$column];
	}
	array_multisort($reference_array, $direction, $array);
}

function addToDOM($html, $parent, $tag, $class) {
	$element = $html->createElement($tag);
	if ($class != "") {$element->setAttribute('class', $class);}
	$parent->appendChild($element);
	return $element;
}

// $xmllocation = '<t4 type="navigation" name="Root getter" id="234" />/en/courses/course-search-xml';
$xmllocation = '<t4 type="navigation" name="Root getter" id="234" />/courses/course-search-xml';
// $xmllocation = 'index.xml';

$courses = array();

$filecontents = file_get_contents($xmllocation);
$xml = simplexml_load_string(utf8_encode($filecontents));

foreach ($xml->{'uhi-course'} as $item) {
	$courses[] = array(
		'coursename' => (string) $item->{'course-name'},
		'courselevel' => (string) $item->{'course-level'},
		'coursesubjectsearch' => (string) $item->{'course-subject-search'},
		'courselocation' => (string) $item->{'course-location'},
		'HTMLResult' => (string) $item->HTMLResult,
	);
}

array_sort_by_column($courses, 'coursesubjectsearch');

$html = new DOMDocument('1.0', 'utf-8');
$html->formatOutput = true;

$divsection = addToDOM($html, $html, 'div', 'section clearfix courselist');
$divwrap = addToDOM($html, $divsection, 'div', 'wrap');

$subjectarea = "Null";
foreach ($courses as $course) {
	if ($course["coursesubjectsearch"] != $subjectarea) {

		$divcollapsible = addToDOM($html, $divwrap, 'div', 'content-type-modifier--collapsible');

		if ($course["coursesubjectsearch"] == "") {

			$h2collapsibleheading = addToDOM($html, $divcollapsible, 'h2', 'content-type-modifier--collapsible__heading');
			$spancontrol = addToDOM($html, $h2collapsibleheading, 'span', 'content-type-modifier--collapsible__control');
			$spantitle = addToDOM($html, $h2collapsibleheading, 'span', '');
			$txt = $html->createTextNode('No subject area set');
			$spantitle->appendChild($txt);
			$subjectarea = $course["coursesubjectsearch"];
		} else {
			$h2collapsibleheading = addToDOM($html, $divcollapsible, 'h2', 'content-type-modifier--collapsible__heading');
			$spancontrol = addToDOM($html, $h2collapsibleheading, 'span', 'content-type-modifier--collapsible__control');
			$spantitle = addToDOM($html, $h2collapsibleheading, 'span', '');
			$txt = $html->createTextNode($course["coursesubjectsearch"]);
			$spantitle->appendChild($txt);
			$subjectarea = $course["coursesubjectsearch"];
		}
		$divcollapsiblecontent = addToDOM($html, $divcollapsible, 'div', 'content-type--one-web-tabbed-content content-type-modifier--typography');
		$divcollapsiblecontent->setAttribute('style', 'display:none;');
		$divcol = addToDOM($html, $divcollapsiblecontent, 'div', 'col threequarters');
		$ul = addToDOM($html, $divcol, 'ul', '');

	}
	$txt = $html->createTextNode($course["HTMLResult"]);
	$ul->appendChild($txt);

}
echo html_entity_decode($html->saveHTML());
?>