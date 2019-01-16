importPackage(java.lang);
importPackage(com.terminalfour.tag.parser);
importPackage(com.terminalfour.media);
importPackage(com.terminalfour.sitemanager);
importClass(com.terminalfour.publish.utils.BrokerUtils);
importClass(com.terminalfour.media.utils.MediaUtils);
importPackage(java.util.hashmap);
importPackage(java.util.map);
importPackage(java.util.iterator);
importPackage(java.lang.string);

try {

    function getMediaContent(mediaItem) {
        var theTag = new StringBuilder().append("<t4 type=\"media\" id=\"")
            .append(new Integer(mediaItem.getID()))
            .append("\" formatter=\"image/path\" />").toString();
        return BrokerUtils.processT4Tags(oStmt, publishCache, section, mediaItem.getContent(), language, isPreview, theTag);
    }

    function compareListByName(a, b) {
        return (a.sortName.toString().toLowerCase() < b.sortName.toString().toLowerCase() == true);
    }

    var oStmt = dbStatement;
    var oMM = MediaManager.getManager();
    var oCH = new ContentHierarchy();

    var firstImage = content.get('Sample item');
    var firstImageId = firstImage.getValue();
    var firstMedia = oMM.get(oStmt, firstImageId, "en");
    var sid = firstMedia.getCategories()[0];

    var alltheMedia = oCH.getContent(oStmt, sid, 'en');

    sVarNew = getMediaContent(firstMedia);

    var listElements = [];

    for (var i = 0; i < alltheMedia.length; i++) {
        var theMedia = oMM.get(oStmt, alltheMedia[i], "en");
        if (theMedia.getType() == 2) {
            var thisElement = {
                id: theMedia.getID(),
                // prioritise description here for sorting (if desired)
                displayName: (theMedia.getDescription() == "") ? theMedia.getName("zzzNoName", false) : theMedia.getDescription(),
                sortName: theMedia.getName("zzzNoName", false),
            }
            listElements.push(thisElement);
        }
    }

// should be able to use standard Java compare, but alas...
// REMOVE THIS CODE of you want to sort by order in Media Library, rather than forced alphabetical.
    for(var j=0;j<listElements.length;j++){
        for(var i=j+1;i<listElements.length;i++){
            if(compareListByName(listElements[i],listElements[j])){
                var t = listElements[j];
                listElements[j] = listElements[i];
                listElements[i]=t;
            }
        }
    }

    document.write('<div class="content-type-modifier--typography">');
    document.write(content.get('List description'));
    document.write('<ul>');

    for (var i = 0; i < listElements.length; i++) {
        var theMedia = oMM.get(oStmt, listElements[i].id, "en");
        sVarNew = getMediaContent(theMedia);

        var linkName = theMedia.getDescription();
        if (linkName == "") linkName = theMedia.getName();

        if (isPreview) {
            extension = "not available in preview";
        } else {
            var extension = "unknown";
            if (sVarNew.contains(".")) {
                extension = sVarNew.substring(sVarNew.lastIndexOf(".") + 1);
            }
        }
        document.write('<li><a href="' + sVarNew + '">' + linkName + '</a> (' + extension + ')</li>');
    }

    document.write('</ul></div>');

} catch (e) {
    document.write(e);
    document.write('<!-- error in id=' + theMedia.getID() + ' count=' + i + ' -->');
}