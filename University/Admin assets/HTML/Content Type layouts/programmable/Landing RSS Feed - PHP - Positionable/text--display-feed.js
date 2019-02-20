<ul>
<li class="content-type--landing-rss-feed__heading">
    <t4 type="content" name="RSS feed heading" output="normal" modifiers="striptags,htmlentities" />
    </li>
    </ul>

    <div id="feeds" class="feeds  content-type--landing-rss-feed">
    <ul id="rssFeed" class="rssFeed">

<?php

    function sortByOrder($a, $b) {
        return $b[2] - $a[2];
    }

function cleanTitle($title) {
//    return preg_replace('/\bhttp\S*|pic.twit\S*/','', $title);
    return encodeString(preg_replace('/\bhttp\S*|pic.twit\S*/','', $title));
}

function encodeString($str) {
    return htmlentities($str, ENT_QUOTES);
}

function file_get_contents_curl($uri) {
    $ch = curl_init($uri);
    curl_setopt_array($ch, array(
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_ENCODING => '',
//    CURLOPT_SSLVERSION => 3,
        CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 5.1; rv:31.0) Gecko/20100101 Firefox/31.0',
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_FOLLOWLOCATION => true
    ));
    return curl_exec($ch);
}




// echo '<p>Newsfeed V2.0</p>';


date_default_timezone_set('Europe/London');
ini_set('display_errors', 'On');
error_reporting(E_ALL);

$test = html_entity_decode("<t4 type="content" name="Feed 1 page link title" output="normal" />");

$feedList=array
(
    array('<t4 type="content" name="Feed 1 URL (internal)" output="linkurl" modifiers="nav_sections" /><t4 type="content" name="Feed 1 URL (external)" output="normal" modifiers="striptags,htmlentities" />','<t4 type="content" name="Feed 1 page (internal)" output="link-url" modifiers="nav_sections" /><t4 type="content" name="Feed 1 page (external)" output="normal" modifiers="striptags,htmlentities" />',"<t4 type="content" name="Feed 1 page link title" output="normal" />"),
array('<t4 type="content" name="Feed 2 URL (internal)" output="linkurl" modifiers="nav_sections" /><t4 type="content" name="Feed 2 URL (external)" output="normal" modifiers="striptags,htmlentities" />','<t4 type="content" name="Feed 2 page (internal)" output="link-url" modifiers="nav_sections" /><t4 type="content" name="Feed 2 page (external)" output="normal" modifiers="striptags,htmlentities" />',"<t4 type="content" name="Feed 2 page link title" output="normal" modifiers="striptags,htmlentities" />"),
array('<t4 type="content" name="Feed 3 URL (internal)" output="linkurl" modifiers="nav_sections" /><t4 type="content" name="Feed 3 URL (external)" output="normal" modifiers="striptags,htmlentities" />','<t4 type="content" name="Feed 3 page (internal)" output="link-url" modifiers="nav_sections" /><t4 type="content" name="Feed 3 page (external)" output="normal" modifiers="striptags,htmlentities" />',"<t4 type="content" name="Feed 3 page link title" output="normal" modifiers="striptags,htmlentities" />"),
array('<t4 type="content" name="Feed 4 URL (internal)" output="linkurl" modifiers="nav_sections" /><t4 type="content" name="Feed 4 URL (external)" output="normal" modifiers="striptags,htmlentities" />','<t4 type="content" name="Feed 4 page (internal)" output="link-url" modifiers="nav_sections" /><t4 type="content" name="Feed 4 page (external)" output="normal" modifiers="striptags,htmlentities" />',"<t4 type="content" name="Feed 4 page link title" output="normal" modifiers="striptags,htmlentities" />"),
array('<t4 type="content" name="Feed 5 URL (internal)" output="linkurl" modifiers="nav_sections" /><t4 type="content" name="Feed 5 URL (external)" output="normal" modifiers="striptags,htmlentities" />','<t4 type="content" name="Feed 5 page (internal)" output="link-url" modifiers="nav_sections" /><t4 type="content" name="Feed 5 page (external)" output="normal" modifiers="striptags,htmlentities" />',"<t4 type="content" name="Feed 5 page link title" output="normal" modifiers="striptags,htmlentities" />")
);
$belowFeed='';
$maxLength = <t4 type="content" name="Number of items to display" output="normal" />;


if($maxLength == NULL) $maxLength = 8;
$collectedFeeds = array();

foreach($feedList as $feed)
{
    $feedUrl = $feed[0];
    if($feedUrl == '')
    {
        continue;
    }
    if(substr($feedUrl, 0, 4) != 'http')
    {
        $feedUrl = '<t4 type="navigation" name="Site Root" id="234" />' . $feedUrl;
        //       $content = file_get_contents($feedUrl);
        $content = str_replace(array("&amp;", "&"), array("&", "&amp;"), file_get_contents($feedUrl));
        if(!$content)
        {
            continue;
        }

        try { $xml = new SimpleXmlElement($content); }
        catch(Exception $e){ /* the data provided is not valid XML */ echo '<!-- invalid XML: type 1 -->'; return false; }



        //      $xml = new SimpleXmlElement($content);
        foreach($xml->item as $entry)
        {
            $tmparray =  array($entry->title,$entry->link,strtotime($entry->pubDate),encodeString($feed[1]),encodeString($feed[2]));
            array_push($collectedFeeds, $tmparray);
        }
    }
    else
    {
        //       $content = file_get_contents($feedUrl);
        $content = str_replace(array("&amp;", "&"), array("&", "&amp;"), file_get_contents_curl($feedUrl));
        if(!$content)
        {
            continue;
        }

        try { $xml = new SimpleXmlElement($content); }
        catch(Exception $e){ /* the data provided is not valid XML */ echo '<!-- invalid XML: type 2 -->'; return false; }


        //       $xml = new SimpleXmlElement($content);
        foreach($xml->channel->item as $entry)
        {

            $tmparray = array(html_entity_decode(cleanTitle($entry->title)),$entry->link,strtotime($entry->pubDate),encodeString($feed[1]),encodeString($feed[2]));
            //              $tmparray =  array(cleanTitle($entry->title),$entry->link,strtotime($entry->pubDate),$feed[1],$feed[2]);
            array_push($collectedFeeds, $tmparray);

        }
    }
}


usort($collectedFeeds, 'sortByOrder');

if(count($collectedFeeds) < $maxLength)
{
    $maxLength = count($collectedFeeds);
}

for ($i = 0; $i <= ($maxLength-1); $i++)
{
    $title = $collectedFeeds[$i][0];
    $url = $collectedFeeds[$i][1];
    $formatteddate = date("d/m/Y",$collectedFeeds[$i][2]);
    $link = $collectedFeeds[$i][3];
    $linkname = $collectedFeeds[$i][4];

    echo '<li class="content-type--landing-rss-feed__line"><a href="'.$url.'">'.$title.'</a><br/><span class="content-type--landing-rss-feed__labelfield"><a href="'.$link.'">'.$linkname.'</a></span> <span class="content-type--landing-rss-feed__labelfield">'.$formatteddate.'</span></li>';

}


    ?>
</ul>
</div>