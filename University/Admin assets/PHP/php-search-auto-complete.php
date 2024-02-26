<?php

$queries = array();
parse_str($_SERVER['QUERY_STRING'], $queries);

    mb_http_output('utf-8');
    mb_internal_encoding('utf-8');

     const PARTNERS  = array('arg' => 'argyll', 'hig' => 'htc', 'inv' => 'inverness', 'lew' => 'lews', 'mor' => 'moray', 'nor' => 'northhighland', 'ork' => 'orkney', 'per' => 'perth', 'she' => 'shetland', 'wes' => 'whc');

    $documentsSource = '<t4 type="navigation" name="Path to course search XML file" id="94" />/index.xml';

    if(substr($documentsSource,0,4) != '/en/') {
            $documentsSource = 'courses/course-search-xml/index.xml';
        }

          if (!empty($queries["q"]) && !empty(PARTNERS[$queries["q"]])) {   
            $documentsSource = 'https://www.'. PARTNERS[$queries["q"]] .'.uhi.ac.uk/courses/course-search-xml/index.xml';    
    }

    if (strpos($_SERVER["DOCUMENT_ROOT"], 'nwh') !== false) {
        $documentsSource = '/en/courses/course-search-xml/index.xml';
    }

 //   $documentsSource = '<t4 type="navigation" name="Path to course search XML file" id="94" />index.xml';        
    require_once(realpath($_SERVER['DOCUMENT_ROOT']).'<t4 type="media" formatter="image/path" id="278300" />');  
    
    //error_reporting(E_ALL);
    //ini_set('display_errors', 1);
    try {
        $queryHandler = QueryHandlerFactory::getInstance('AutocompleteQueryHandler', $_GET);
        $queryHandler->handleQuery();
    } catch (UnexpectedValueException $e) {
        $response = new JsonErrorResponse('1No Suggested Results' . $e);
        $response->send();
    } catch (InvalidArgumentException $e) {
        $response = new JsonErrorResponse('2No Suggested Results' . $e);
        $response->send();
    }

    try {
        $search = SearchFactory::getInstance('Search', $documentsSource);
        $substringSearch = FilterFactory::getInstance('FilterBySubstring', $search);
    } catch (RuntimeException $e) {
        $response = new JsonErrorResponse('3No Suggested Results' . $e);
        $response->send();
    } catch (InvalidArgumentException $e) {
        $response = new JsonErrorResponse('4No Suggested Results' . $e);
        $response->send();
    } catch (LengthException $e) {
        $response = new JsonErrorResponse('5No Suggested Results' . $e);
        $response->send();
    }

    $substringSearch->setMember('element', 'course-name');
    $substringSearch->setMember('query', $queryHandler->getQuery());
    $substringSearch->setMember('combinationOption', true);
    $substringSearch->runFilter();

    $substringSearch->setMember('element', 'course-keywords');
    $substringSearch->setMember('query', $queryHandler->getQuery());
    $substringSearch->setMember('combinationOption', true);
    $substringSearch->runFilter();

    $search->combineResults();
    $search->intersectDocumentResults();

    try {
        $documentCollection = DocumentCollectionFactory::getInstance('DocumentCollection', $search->getDocuments(), $search->getDocumentResults(), $queryHandler->doQuerysExist());
    } catch (RuntimeException $e) {
        $response = new JsonErrorResponse('6No Suggested Results' . $e);
        $response->send();
    } catch (UnderflowException $e) {
        $response = new JsonErrorResponse('7No Suggested Results' . $e);
        $response->send();
    } catch (InvalidArgumentException $e) {
        $response = new JsonErrorResponse('8No Suggested Results' . $e);
        $response->send();
    }

    if ($documentCollection->wereResultsFound() === false) {
        
        $response = new JsonErrorResponse('Search for '.$queryHandler->getQueryAsString(), $queryHandler->getQueryAsString());
        $response->send();
    }

    // Instantiate our Processors
    try {
        $frequencySearch = ProcessorFactory::getInstance('FrequencySearch', $documentCollection);
    } catch (RuntimeException $e) {
        $response = new JsonErrorResponse('9No Suggested Results'  . $e);
        $response->send();
    } catch (InvalidArgumentException $e) {
        $response = new JsonErrorResponse('0No Suggested Results' . $e);
        $response->send();
    }

    $frequencySearch->setMember('query', $queryHandler->getQuery());
	$frequencySearch->setMember('element', 'course-name');
    $frequencySearch->setMember('boost', 1);
    $frequencySearch->runProcessor();
    $frequencySearch->setMember('element', 'course-keywords');
    $frequencySearch->runProcessor();
    $documentCollection->combineRankedResults();

    // Sort the document results
    try {
        $documentCollection->sort('rank', SORT_DESC, 'courseName', SORT_ASC);
    } catch (UnderflowException $e) {
        $response = new JsonErrorResponse('aNo Suggested Results' . $e);
        $response->send();
    }

    $results = array();
    $results[0]['label'] = 'Search for "'.$queryHandler->getQueryAsString().'"';
    $results[0]['value'] = $queryHandler->getQueryAsString();

    $i = 1;
    foreach ($documentCollection->getDocumentResults() as $document) {
        $details = $documentCollection->getDocuments();
        $results[$i]['label'] = $details[$document]['course-name'];
        $results[$i]['value'] = $details[$document]['course-name'];
        $i += 1;
    }

    $response = new JsonSuccessResponse($results);
    $response->send();
?>



