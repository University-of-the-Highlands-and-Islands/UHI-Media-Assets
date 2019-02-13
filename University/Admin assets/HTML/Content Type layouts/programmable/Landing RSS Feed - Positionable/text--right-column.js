<!-- h3><t4 type="content" name="RSS feed heading" output="normal" modifiers="striptags,htmlentities" /></h3 -->
    <!-- div id="feeds" class="feeds smalllabel" -->
    <ul id="rssFeed" class="rssFeed">
    </ul>
    <!-- /div -->
    <script type="text/javascript">
var feedList=[
    ['<t4 type="content" name="Feed 1 URL (internal)" output="linkurl" modifiers="nav_sections" /><t4 type="content" name="Feed 1 URL (external)" output="normal" modifiers="striptags,htmlentities" />','<t4 type="content" name="Feed 1 page (internal)" output="link-url" modifiers="nav_sections" /><t4 type="content" name="Feed 1 page (external)" output="normal" modifiers="striptags,htmlentities" />','<t4 type="content" name="Feed 1 type" output="normal" display_field="value" />']<t4 type="content" name="Feed 2 type" output="selective-output" format=", " />
        <t4 type="content" name="Feed 2 type" output="selective-output" process-format="true" format="['<t4 type=&quot;content&quot; name=&quot;Feed 2 URL (internal)&quot; output=&quot;linkurl&quot; modifiers=&quot;nav_sections&quot; /><t4 type=&quot;content&quot; name=&quot;Feed 2 URL (external)&quot; output=&quot;normal&quot; modifiers=&quot;&quot; />','<t4 type=&quot;content&quot; name=&quot;Feed 2 page (internal)&quot; output=&quot;linkurl&quot; modifiers=&quot;nav_sections&quot; /><t4 type=&quot;content&quot; name=&quot;Feed 2 page (external)&quot; output=&quot;normal&quot; modifiers=&quot;&quot; />','<t4 type=&quot;content&quot; name=&quot;Feed 2 type&quot; output=&quot;normal&quot; display_field=&quot;value&quot; />']" /><t4 type="content" name="Feed 3 type" output="selective-output" format=", " />
        <t4 type="content" name="Feed 3 type" output="selective-output" process-format="true" format="['<t4 type=&quot;content&quot; name=&quot;Feed 3 URL (internal)&quot; output=&quot;linkurl&quot; modifiers=&quot;nav_sections&quot; /><t4 type=&quot;content&quot; name=&quot;Feed 3 URL (external)&quot; output=&quot;normal&quot; modifiers=&quot;&quot; />','<t4 type=&quot;content&quot; name=&quot;Feed 3 page (internal)&quot; output=&quot;linkurl&quot; modifiers=&quot;nav_sections&quot; /><t4 type=&quot;content&quot; name=&quot;Feed 3 page (external)&quot; output=&quot;normal&quot; modifiers=&quot;&quot; />','<t4 type=&quot;content&quot; name=&quot;Feed 3 type&quot; output=&quot;normal&quot; display_field=&quot;value&quot; />']" /><t4 type="content" name="Feed 4 type" output="selective-output" format=", " />
        <t4 type="content" name="Feed 4 type" output="selective-output" process-format="true" format="['<t4 type=&quot;content&quot; name=&quot;Feed 4 URL (internal)&quot; output=&quot;linkurl&quot; modifiers=&quot;nav_sections&quot; /><t4 type=&quot;content&quot; name=&quot;Feed 4 URL (external)&quot; output=&quot;normal&quot; modifiers=&quot;&quot; />','<t4 type=&quot;content&quot; name=&quot;Feed 4 page (internal)&quot; output=&quot;linkurl&quot; modifiers=&quot;nav_sections&quot; /><t4 type=&quot;content&quot; name=&quot;Feed 4 page (external)&quot; output=&quot;normal&quot; modifiers=&quot;&quot; />','<t4 type=&quot;content&quot; name=&quot;Feed 4 type&quot; output=&quot;normal&quot; display_field=&quot;value&quot; />']" /><t4 type="content" name="Feed 5 type" output="selective-output" format=", " />
        <t4 type="content" name="Feed 5 type" output="selective-output" process-format="true" format="['<t4 type=&quot;content&quot; name=&quot;Feed 5 URL (internal)&quot; output=&quot;linkurl&quot; modifiers=&quot;nav_sections&quot; /><t4 type=&quot;content&quot; name=&quot;Feed 5 URL (external)&quot; output=&quot;normal&quot; modifiers=&quot;&quot; />','<t4 type=&quot;content&quot; name=&quot;Feed 5 page (internal)&quot; output=&quot;linkurl&quot; modifiers=&quot;nav_sections&quot; /><t4 type=&quot;content&quot; name=&quot;Feed 5 page (external)&quot; output=&quot;normal&quot; modifiers=&quot;&quot; />','<t4 type=&quot;content&quot; name=&quot;Feed 5 type&quot; output=&quot;normal&quot; display_field=&quot;value&quot; />']" />
];
<t4 type="content" name="Link below feed (internal)" output="selective-output" modifiers="nav_sections" process-format="true" format=" var belowFeed='<li class=&quot;newsevents  content-type--landing-rss-feed__line&quot;><a href=&quot;<t4 type=&quot;content&quot; name=&quot;Link below feed (internal)&quot; output=&quot;linkurl&quot; modifiers=&quot;nav_sections&quot; />&quot;><t4 type=&quot;content&quot; name=&quot;Link below feed text&quot; output=&quot;normal&quot; modifiers=&quot;striptags,htmlentities&quot; /></a></li>'; " />
    <t4 type="content" name="Link below feed (external)" output="selective-output" process-format="true"  format=" var belowFeed='<li class=&quot;newsevents  content-type--landing-rss-feed__line&quot;><a href=&quot;<t4 type=&quot;content&quot; name=&quot;Link below feed (external)&quot; output=&quot;normal&quot; modifiers=&quot;&quot; />&quot;> <t4 type=&quot;content&quot; name=&quot;Link below feed text&quot; output=&quot;normal&quot; modifiers=&quot;striptags,htmlentities&quot; /> </a></li>';" />

var maxLength = <t4 type="content" name="Number of items to display" output="normal" />;
//    maxLength = maxLength || 5;

var feeds=[];
Number.prototype.padLeft = function(base,chr){
    var  len = (String(base || 10).length - String(this).length)+1;
    return len > 0? new Array(len).join(chr || '0')+this : this;
}

function getfeeds(feed,i,_callback){
    $.get(feed[0], function(data) {
        var $XML = $(data);
        $XML.find("item").each(function(i) {
            var $this = $(this),
                item = {
                    title:       $this.find("title").text(),
                    link:        $this.find("link").text(),
                    pubDate:     new Date($this.find(("dc\\:date, date")).text()),
                    feedLink:       feed[1],
                    feedName:       feed[2],
                };
            feeds.push(item);
            return i<(maxLength-1);
        });
        _callback(i);
    });
}

function displayFeed(){
    var count = (feeds.length < (maxLength)) ? feeds.length : (maxLength);
    for (i = 0; i < count; ++i)
    {
        var fDate = feeds[i].pubDate;
        var folder = ((feeds[i].feedLink == "" || feeds[i].feedName == "") ? "" : "<span class='labelfield  content-type--landing-rss-feed__labelfield'><a href='" + feeds[i].feedLink + "'>" + feeds[i].feedName + "</a> </span>");
        $('#rssFeed').append($('<li class="newsevents  content-type--landing-rss-feed__line"/>').html('<a href="' + feeds[i].link + '">' + feeds[i].title + '</a><br/>' + folder + '<span class="labelfield  content-type--landing-rss-feed__labelfield">' + fDate.getDate().padLeft() + '/' + (fDate.getMonth()+1).padLeft() +'/' + fDate.getFullYear() +'</span>'));
    }
    $('#rssFeed').append(belowFeed);
}

function displayRSS(){
    deferredArray = [];
    for(var i = 0; i < feedList.length; i++) {
        deferredArray.push(new $.Deferred());
        getfeeds(feedList[i],i,function(i) {
            deferredArray[i].resolve();
        });
    }

    $.when.apply($, deferredArray).then(function()
    {
        feeds.sort(function(x, y){
            return y.pubDate - x.pubDate;
        })
        displayFeed();
    })
};

displayRSS();
</script>