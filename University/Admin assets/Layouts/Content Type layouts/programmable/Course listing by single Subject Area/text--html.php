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

// $xmllocation = '<t4 type="navigation" name="Root getter" id="234" />/en/courses/course-search-xml';
$xmllocation = '<t4 type="navigation" name="Root getter" id="234" />/courses/course-search-xml';
// $xmllocation = '<t4 type="content" name="Course Xml Url" output="normal" />';
$subjectarea = '<t4 type="content" name="Subject" output="normal" display_field="value" />';

echo "<p><h2>" . $subjectarea . "</h2></p>";

$courses = array();

$filecontents = file_get_contents($xmllocation);
$xml = simplexml_load_string(utf8_encode($filecontents));

foreach ($xml->{'uhi-course'} as $item) {
	if ($item->{'course-subject-search'} == $subjectarea) {
		$courses[] = array(
			'coursename' => (string) $item->{'course-name'},
			'courselevel' => (string) $item->{'course-level'},
			'coursesubjectsearch' => (string) $item->{'course-subject-search'},
			'courselocation' => (string) $item->{'course-location'},
			'HTMLResultSimple' => (string) $item->{'HTMLResultSimple'},
		);}
}

array_sort_by_column($courses, 'coursename');

echo "<ul>";
foreach ($courses as $course) {
	echo $course["HTMLResultSimple"];
}
echo "</ul>";
?>
