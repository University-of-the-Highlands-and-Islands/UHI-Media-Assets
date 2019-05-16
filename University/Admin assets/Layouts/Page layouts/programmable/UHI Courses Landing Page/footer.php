<?php
// Query handler

//    echo "<p><h2>Please note: We are experiencing issues with our course page listings, we hope to have this fixed shortly.</h2></p>";

function subArraysToString($ar, $sep = '') {
	$str = '';
	foreach ($ar as $val) {
		$str .= implode($sep, $val);
		$str .= $sep; // add separator between sub-arrays
	}
	$str = rtrim($str, $sep); // remove last separator
	return $str;
}

try {
	$queryHandler = QueryHandlerFactory::getInstance('QueryHandler', $_SERVER['QUERY_STRING']);
	$queryHandler->setStopWords($stopWords);
	$queryHandler->setDontTokenize(array('course-code', 'course-location', $coursesubjectsearch, 'course-study-mode', 'international'));
	$queryHandler->stemQuery(array('keyword'));
	$queryHandler->setDontRemoveStopwords(array($coursesubjectsearch, 'international'));
	$queryHandler->handleQuery();
//var_dump($queryHandler->getQueryArray());
} catch (RuntimeException $e) {
	ExceptionFormatter::FormatException($e);
} catch (OutOfBoundsException $e) {
	ExceptionFormatter::FormatException($e);
}
//var_dump($queryHandler->getSearchTerms());
// Search handler and filters
try {

	$search = SearchFactory::getInstance('Search', $documentsSource);
	$substringSearch = FilterFactory::getInstance('FilterBySubstring', $search); //Course name, Keywords
	$wordFilter = FilterFactory::getInstance('FilterByWord', $search); //Level
	$exactMatchFilter = FilterFactory::getInstance('FilterByExactMatch', $search); //Course code

} catch (RuntimeException $e) {
	ExceptionFormatter::FormatException($e);
} catch (InvalidArgumentException $e) {
	ExceptionFormatter::FormatException($e);
} catch (LengthException $e) {
	ExceptionFormatter::FormatException($e);
}

$tmparray = $queryHandler->getDontRemoveStopWords();
if ($queryHandler->isQuerySet('keyword')) {
	if (in_array('keyword', $queryHandler->getDontRemoveStopWords()) === true) {
		$exactMatchFilter->setMember('element', 'course-name');
		$exactMatchFilter->setMember('query', array(implode(' ', $queryHandler->getNonStemmedQueryValue('keyword')))); // send keyword query as single string value
		$exactMatchFilter->setMember('combinationOption', true);
		$exactMatchFilter->runFilter();
	}
}

if (strlen(subArraysToString($search->getCombinedDocumentResults())) == 0) {

/* Keyword search - search form input */
/* Run filters on data elements */
	if ($queryHandler->isQuerySet('keyword')) {
		$substringSearch->setMember('element', 'course-keywords');
		$substringSearch->setMember('query', $queryHandler->getQueryValue('keyword'));
		$substringSearch->setMember('combinationOption', true);
		$substringSearch->runFilter();

		$substringSearch->setMember('element', 'course-name');
		$substringSearch->setMember('query', $queryHandler->getQueryValue('keyword'));
		$substringSearch->setMember('combinationOption', true);
		$substringSearch->runFilter();

		$exactMatchFilter->setMember('element', 'course-code');
		$exactMatchFilter->setMember('query', $queryHandler->getQueryValue('keyword'));
		$exactMatchFilter->setMember('combinationOption', true);
		$exactMatchFilter->runFilter();

		$wordFilter->setMember('element', 'course-level');
		$wordFilter->setMember('query', $queryHandler->getQueryValue('keyword'));
		$wordFilter->setMember('combinationOption', true);
		$wordFilter->runFilter();

// if user added course code without first "u"
		$regexCC = "/^([a-zA-Z]{1}\d{3})/";
		$test = implode(' ', $queryHandler->getNonStemmedQueryValue('keyword'));
//         echo "<p>Test: ".$test."</p>";
		if (preg_match($regexCC, $test)) {

//          echo "<p>this is a course code</p>";

			$exactMatchFilter->setMember('element', 'course-code');
			$exactMatchFilter->setMember('query', array("u" . $test));
			$exactMatchFilter->setMember('combinationOption', true);
			$exactMatchFilter->runFilter();

		}

		$exactMatchFilter->setMember('element', 'course-level-search');
		$exactMatchFilter->runFilter();

		$search->combineResults();
	}
} else {
	$search->combineResults();
}

/* Filters search - search form filters input */
if ($queryHandler->isQuerySet('course-level-search')) {
	$exactMatchFilter->setMember('element', 'course-level-search');
	$exactMatchFilter->setMember('query', $queryHandler->getQueryValue('course-level-search'));
	$exactMatchFilter->setMember('combinationOption', true);
	$exactMatchFilter->runFilter();
	$search->combineResults();
}

if ($queryHandler->isQuerySet($coursesubjectsearch)) {
	$wordFilter->setMember('element', $coursesubjectsearch);
	$wordFilter->setMember('query', $queryHandler->getQueryValue($coursesubjectsearch));
	$wordFilter->setMember('combinationOption', true);
	$wordFilter->runFilter();
	$search->combineResults();
}

if ($queryHandler->isQuerySet('course-study-mode')) {
	$wordFilter->setMember('element', 'course-study-mode');
	$wordFilter->setMember('query', $queryHandler->getQueryValue('course-study-mode'));
	$wordFilter->setMember('combinationOption', true);
	$wordFilter->runFilter();
	$search->combineResults();
}

if ($queryHandler->isQuerySet('international')) {
	$wordFilter->setMember('element', 'international');
	$wordFilter->setMember('query', $queryHandler->getQueryValue('international'));
	$wordFilter->setMember('combinationOption', true);
	$wordFilter->runFilter();
	$search->combineResults();
}

if ($queryHandler->isQuerySet('course-location')) {
	$wordFilter->setMember('element', 'course-location');
	$wordFilter->setMember('query', $queryHandler->getQueryValue('course-location'));
	$wordFilter->setMember('combinationOption', true);
	$wordFilter->runFilter();
	$search->combineResults();
}

$search->intersectDocumentResults();

// Instantiate the DocumentCollection
try {
	$documentCollection = DocumentCollectionFactory::getInstance('DocumentCollection', $search->getDocuments(), $search->getDocumentResults(), $queryHandler->doQuerysExist());
} catch (RuntimeException $e) {
	ExceptionFormatter::FormatException($e);
} catch (UnderflowException $e) {
	ExceptionFormatter::FormatException($e);
} catch (InvalidArgumentException $e) {
	ExceptionFormatter::FormatException($e);
}

if (false) {
	// get rid of proximity and frequency stuff

// Process query with no boosts
	try {
		$frequencySearch = ProcessorFactory::getInstance('FrequencySearch', $documentCollection);
		$proximitySearch = ProcessorFactory::getInstance('ProximitySearch', $documentCollection);
	} catch (RuntimeException $e) {
		ExceptionFormatter::FormatException($e);
	} catch (InvalidArgumentException $e) {
		ExceptionFormatter::FormatException($e);
	}

	if ($queryHandler->isQuerySet('keyword')) {
		$frequencySearch->setMember('query', $queryHandler->getQueryValue('keyword'));
		$frequencySearch->setMember('element', 'course-name');

		$frequencySearch->runProcessor();
		$frequencySearch->setMember('element', 'course-keywords');
		$frequencySearch->runProcessor();
		$frequencySearch->setMember('element', 'course-level');
		$frequencySearch->runProcessor();
		$frequencySearch->setMember('element', 'course-code');
		$frequencySearch->runProcessor();

		$frequencySearch->setMember('element', $coursesubjectsearch);
		$frequencySearch->runProcessor();

		$proximitySearch->setMember('element', 'course-name');
		$proximitySearch->setMember('boost', 1.2);
		$proximitySearch->setMember('query', $queryHandler->getQueryValue('keyword'));
		$proximitySearch->runProcessor();
		$documentCollection->combineRankedResults();
	}

	if ($queryHandler->isQuerySet('course-level-search')) {
		$frequencySearch->setMember('query', $queryHandler->getQueryValue('course-level-search'));
		$frequencySearch->setMember('element', 'course-level-search');
		$frequencySearch->runProcessor();
		$documentCollection->combineRankedResults();
	}
	if ($queryHandler->isQuerySet($coursesubjectsearch)) {
		$frequencySearch->setMember('query', $queryHandler->getQueryValue($coursesubjectsearch));
		$frequencySearch->setMember('element', $coursesubjectsearch);
		$frequencySearch->runProcessor();
		$documentCollection->combineRankedResults();
	}
	if ($queryHandler->isQuerySet('course-study-mode')) {
		$frequencySearch->setMember('query', $queryHandler->getQueryValue('course-study-mode'));
		$frequencySearch->setMember('element', 'course-study-mode');
		$frequencySearch->runProcessor();
		$documentCollection->combineRankedResults();
	}
	if ($queryHandler->isQuerySet('international')) {
		$frequencySearch->setMember('query', $queryHandler->getQueryValue('international'));
		$frequencySearch->setMember('element', 'international');
		$frequencySearch->runProcessor();
		$documentCollection->combineRankedResults();
	}
	if ($queryHandler->isQuerySet('course-location')) {
		$frequencySearch->setMember('query', $queryHandler->getQueryValue('course-location'));
		$frequencySearch->setMember('element', 'course-location');
		$frequencySearch->runProcessor();
		$documentCollection->combineRankedResults();
	}

} // end get rid of proximity and frequency stuff

// Sort the document results
try {
	$documentCollection->sort('course-name', SORT_ASC);
} catch (UnderflowException $e) {
	ExceptionFormatter::FormatException($e);
}

//Ouputput search results or error message

$pageResetLink = '<t4 type="navigation" name="Current section path" id="63" />';

if ($documentCollection->displayResults('HTMLResult') === false) {
	$noResults = "<p>We're sorry your search hasn't found what you're looking for. Please try checking your spelling or simplifying your search. You could also try the filter options to only display courses of a particular level, subject area or study mode. You can also filter by location.</p>";
	$noResults .= "<p>If that doesn't help then please get in touch via <a href='mailto:info@uhi.ac.uk' class='mail-link'>info@uhi.ac.uk</a> or 01463 279190.</p>";
	$noResults .= "<p>Finally, if you're looking for information on short courses or activity local to you around the Highlands and Islands then please visit our partner websites linked from the bottom of this page. If you're not sure which one is nearest you, then take a look at our map.</p>";
	$noResults .= "<p><a href='" . $pageResetLink . "' class='internal-link'>Restart Search</a></p>";
	echo $noResults;
}

?>

</ul>
</div>
<!-- END T4 Live Content -->
<!-- start of page layout footer -->
<aside class="col onequarter  courselist--filter-sets">

  <?php
// Facets
try {
	$listFacet = FacetFactory::getInstance('ListFacet', $documentCollection, $queryHandler);
} catch (RuntimeException $e) {
	ExceptionFormatter::FormatException($e);
}
?>

  <a class="reset-course-search  UHI--paragraph-highlight" href="<t4 type="navigation" name="Current section path" id="63" />">Reset search</a>
  <h2>Filter by</h2>

  <!-- ^^  Current section path id #63 ^^ -->

  <form action="<?php echo $_SERVER['PHP_SELF'] ?>" id="coursesearch-filters" name="coursesearch-filters" method="get">
    <ul class="accordion" id="coursefilter">
      <?php
// Output the current 'keyword' query as hidden input so it's preserved when updating results
$formatQueryAsHiddenInput = QueryFormatterFactory::getInstance('FormatQueryAsHiddenInput', $queryHandler);
$formatQueryAsHiddenInput->setMember('excludedQueries', array('course-level-search', $coursesubjectsearch, 'course-study-mode', 'course-location', 'international'));
echo $formatQueryAsHiddenInput->format();
?>
      <li  class="open" data-key="int"><h3 class="course-filter-title">International<span class="arrow">&#9660;</span></h3>
        <ul class="search-filters">
          <?php
$listFacet->setMember('labelClass', 'course-search-filter');
$listFacet->setMember('element', 'international');
$listFacet->setMember('sortingState', true);
$listFacet->setMember('multipleValueState', true);
$listFacet->setMember('multipleValueSeparator', '|');
$listFacet->setMember('facetSource', 'documents');
$listFacet->displayFacet();
?>
        </ul>
      </li>
      <li  class="open" data-key="level"><h3 class="course-filter-title">Course level<span class="arrow">&#9660;</span></h3>
        <ul class="search-filters">
          <?php
$listFacet->setMember('labelClass', 'course-search-filter');
$listFacet->setMember('element', 'course-level-search');
$listFacet->setMember('sortingState', true);
$listFacet->setMember('facetSource', 'documents');
$listFacet->displayFacet();
?>
        </ul>
      </li>
      <li class="open"  data-key="subject"><h3 class="course-filter-title">Subject area<span class="arrow">&#9660;</span></h3>
        <ul class="search-filters">
          <?php
$listFacet->setMember('labelClass', 'course-search-filter');
$listFacet->setMember('element', $coursesubjectsearch);
$listFacet->setMember('sortingState', true);
$listFacet->setMember('facetSource', 'documents');
$listFacet->displayFacet();
?>
        </ul>
      </li>
      <li class="open" data-key="mode"><h3 class="course-filter-title">Study mode<span class="arrow">&#9660;</span></h3>
        <ul class="search-filters">
          <?php
$listFacet->setMember('labelClass', 'course-search-filter');
$listFacet->setMember('element', 'course-study-mode');
$listFacet->setMember('sortingState', true);
$listFacet->setMember('multipleValueState', true);
$listFacet->setMember('multipleValueSeparator', '|');

$listFacet->setMember('facetSource', 'documents');
$listFacet->displayFacet();
?>
        </ul>
      </li>
      <?php
if (!$partner) {
	echo '<li class="open" data-key="location"><h3 class="course-filter-title">Location<span class="arrow">&#9660;</span></h3>';
	echo '<ul class="search-filters">';

	$listFacet->setMember('labelClass', 'course-search-filter');
	$listFacet->setMember('element', 'course-location');
	$listFacet->setMember('sortingState', true);
	$listFacet->setMember('multipleValueState', true);
	$listFacet->setMember('multipleValueSeparator', '|');

	$listFacet->setMember('facetSource', 'documents');
	$listFacet->displayFacet();

	echo '</ul>';
	echo '</li>';
}
?>
    </ul>
  </form>

  <a class="reset-course-search  UHI--paragraph-highlight" href="<t4 type="navigation" name="Current section path" id="63" />">Reset search</a>

  <!-- ^^ Course search layout getter id #66 ^^ -->
  <t4 type="navigation" name="Course search layout getter" id="66" />

</aside><!-- Search filters aside -->

</div><!-- wrap -->
</div><!-- courselist -->
</main>
<footer class="footer clearfix">
  <!-- ^^ Site footer links getter #39 ^^ -->
  <t4 type="navigation" name="Site footer links getter" id="39" />
  <!-- Translatable One-Web Footer Text -->
  <t4 type="media" formatter="inline/*" id="7201" />
  <t4 type="media" formatter="inline/*" id="7200" />
  <!-- ^^ Footer social media links getter #40 ^^ -->
  <t4 type="navigation" name="Footer social media links getter" id="40" />
  <div class="wrap clearfix">
    <!-- ^^ Site footer copyright getter #41 ^^ -->
    <t4 type="navigation" name="Site footer copyright getter" id="41" />
    <!-- ^^ Site footer trademark getter #42 ^^ -->
    <t4 type="navigation" name="Site footer trademark getter" id="42" />
  </div>
</footer>

<!-- UHI Footer code getter nav object -->
<t4 type="navigation" name="UHI Footer code getter nav object" id="79" />
<!-- footer analytics -->
<t4 type="media" formatter="inline/*" id="101" />
</body>
</html>