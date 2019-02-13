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
            var contentManager = com.terminalfour.spring.ApplicationContextProvider.getBean(com.terminalfour.content.IContentManager);
            return contentManager.get(contentID,language);
        }
    }

    function getLayout(contentLayout, contentID, sectionID, displayError) {
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


    /* Get the layout selected by the user */
    var layout = processTags( '<t4 type="content" name="Positioning: Page Layout" output="normal" display_field="value" />');
    var column = processTags( '<t4 type="content" name="Positioning: Column" output="normal" display_field="value" />');
    var format = null ;
    var formatString = "";

    /* if 1-2-1 */
    if (layout == '3-1' && column == 'left')) {
    /* Get the standard feed formatter object */
    formatter = 'text/display-feed'; //bring back an object of this template
    document.write(getLayout(formatter));
}


} catch (err) {
    document.write(err);
}
