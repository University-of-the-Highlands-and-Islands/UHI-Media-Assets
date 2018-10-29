/**
 * User editable tabs for WYSIWYG HTML editors using jQueryuery Tools.
 * 
 * Idea and code taken from Mikko Ohtamaa's wysiwygTabs with permission.
 * 
 * @author Michael Dunlap <dunlapm@uw.edu>
 * 
 * @copyright University of Washington
 * 
 * @license GPL
 * 
 * @version 1.0
 * 
 */

// Declare namespace
wysiwygTabs = {};

// Declare constants and class/ID markers
wysiwygTabs.PANE_CLASS = 'pane';
wysiwygTabs.PANE_CONTAINER_CLASS = 'pane-container';
wysiwygTabs.TAB_CONTAINER_CLASS = 'tabs';
wysiwygTabs.TAB_MARKER = 'content-tab';
wysiwygTabs.DEFAULT_TAB_MARKER = 'default-content-tab';
wysiwygTabs.PANE_END_CLASS = 'pane-break';
wysiwygTabs.PANE_END_MARKER = 'hr.' + wysiwygTabs.PANE_END_CLASS;

wysiwygTabs.DEBUG = false;


wysiwygTabs.idCounter = 0;
wysiwygTabs.containerCounter = 0;
wysiwygTabs.defaults = [];

/**
 * Tab content container
 * 
 * @param {Object} title, non-html user visible name
 * @param {Object} content, htmlish content
 */
wysiwygTabs.Tab = function(title, classes) {
	this.id = null; // Generated later
	this.classes = classes;
	this.title = title;
	this.content = jQuery('<div class="'+wysiwygTabs.PANE_CLASS+'"><!-- Dynamically generated pane --></div>');
}

/**
 * Bootstrap tab fixing when the page is loaded
 * 
 * Mutates DOM tree suitable for Javascript based tab viewing.
 */
wysiwygTabs.collectTabs = function() {
	
	// List of tabs as Tab instances
	if(wysiwygTabs.DEBUG)
		wysiwygTabs.log("Creating tabs");
	
	// Walk through all content nodes which contain tab elements
	jQuery("h2."+wysiwygTabs.TAB_MARKER + ", h2."+wysiwygTabs.DEFAULT_TAB_MARKER).parent().each(function() {
	
		var tabs = [];
		wysiwygTabs.containerCounter++;
		wysiwygTabs.defaults[wysiwygTabs.containerCounter] = 0;
		var curTab = null;
		var container = null;
		var parent = this;
		
		if(wysiwygTabs.DEBUG)
		  wysiwygTabs.log("Scanning field " + jQuery(parent).attr("id"));

		// Walk through all HTML nodes and if we match a tab title
		// walk forward and put all content into a tab,
		// remove the content node from the orignal container
		jQuery(parent).contents().each(function(i, val) {
			var t = jQuery(this);
			
			if(wysiwygTabs.DEBUG)
			wysiwygTabs.log("Walking " + val);
                        
                        if (t.is(wysiwygTabs.PANE_END_MARKER)) {
			    if(wysiwygTabs.DEBUG)
			      wysiwygTabs.log("hit end marker " + t.attr("id"));
			    container = wysiwygTabs.constructContainer(tabs);
			    t.replaceWith(container);
			    tabs = []; //clear the current buffer because we wrote it out
			    curTab = null;
                        } else if(t.hasClass(wysiwygTabs.TAB_MARKER) || t.hasClass(wysiwygTabs.DEFAULT_TAB_MARKER)) {		
				
				// Create new tab
				if (t.hasClass(wysiwygTabs.DEFAULT_TAB_MARKER))
					wysiwygTabs.defaults[wysiwygTabs.containerCounter] = tabs.length;
					
				if(wysiwygTabs.DEBUG)
					wysiwygTabs.log("Making tab: " + t.text());
				
				// Remove handler definers, 
				// so reruns of init won't double create them
				t.removeClass(wysiwygTabs.TAB_MARKER);
				t.removeClass(wysiwygTabs.DEFAULT_TAB_MARKER);
				
				var tab = new wysiwygTabs.Tab(t.text(), t.attr('class'));
				
				if(wysiwygTabs.DEBUG)
					if(t.attr('class')) wysiwygTabs.log("found classes: " + t.attr('class'));
				
				tabs.push(tab);
				curTab = tab;
				
				parent.removeChild(this);
			} else {
				// Add node part to the current tab
				if(curTab != null) {
					parent.removeChild(this);	
					curTab.content.append(this);				
				}
			
			}
			
		});
		if(wysiwygTabs.DEBUG)
	        wysiwygTabs.log("constructing container with " + tabs.length + " tabs");
		var container = wysiwygTabs.constructContainer(tabs);
		jQuery(parent).append(container);
	});
	
	// TODO: Automatically detect open tab from # URL prefix
        // XXX - We should get this automatically with jQueryuery Tools
	if(wysiwygTabs.DEBUG)
	wysiwygTabs.log("Found tab count:" + wysiwygTabs.idCounter);	
}

/**
 * Create DOM tree for a tab container
 */
wysiwygTabs.constructContainer = function(tabs) {
	
	if(wysiwygTabs.DEBUG)
	wysiwygTabs.log("Constructing tab container for tabs " + tabs.length);
	
	idcnt = wysiwygTabs.containerCounter++;
	var cont = jQuery('<div class="' + wysiwygTabs.PANE_CONTAINER_CLASS + '" id="container-'+idcnt+'"><!-- Dynamically generated tab  container --></div>');
	var selectors = jQuery('<ul class="' + wysiwygTabs.TAB_CONTAINER_CLASS + '"><!-- Dynamically generated tab selectors --></ul>');

	var i;
	
	if(tabs.length == 0) {
		return null;
	}
	
	// Create tab selectors	
	for(i=0; i<tabs.length; i++) {
		var tab = tabs[i];
		
		if(wysiwygTabs.DEBUG)
		wysiwygTabs.log("Creating tab selector " + tab.title);
		
		tab.id = (wysiwygTabs.idCounter++);
		
		var classes = "wysiwygTab-selector";
                
			
		// generate <li><a> struct
		var clicker = jQuery("<li></li>");
		clicker.attr({ "class" : classes, "id" : "wysiwygTab-selector-" + tab.id});
		
		var link = jQuery("<a></a>");
		
		link.attr({
			id : "wysiwygTab-link-" + tab.id,
			href : "#wysiwygTab-content-" + tab.id,
			"class" : tab.classes
		});

		link.append(tab.title);
		clicker.append(link);
		selectors.append(clicker);
	}
	
	cont.append(selectors);
	
	// Create tab content
	for(i=0; i<tabs.length; i++) {
		var tab = tabs[i];
		//var first = (i == 0);
		//var last = (i == tabs.length - 1);
		
		// jQueryuery node containing content
		var content = tab.content;
		content.attr({"id": "wysiwygTab-content-" + tab.id});

		cont.append(content);
		//move table-of-contents anchors outside of the panes
		cont.prepend(content.find("a[name^='section-']"));
	}	
	
	return cont;
}


/**
 * Page on-load handler.
 */
wysiwygTabs.init = function() {
	/* Need to abuse the kupu editor to add a new <hr> tag because kupu
	   is difficult and doesn't like people adding new features, or handling
	   <hr /> tags*/
	jQuery(function () {
		jQuery('.kupu-fulleditor #toolbar').each(function () {
		  var tb_group = jQuery(this).find('#kupu-bg-indent');
		  var b_html = '<span id="#kupu-hr-buttongroup"';
		  b_html += 'class="kupu-tb-buttongroup">';
		  b_html += '<button title="Insert pane break"';
		  b_html += ' class="kupu-inserthorizontalrule" type="button";>&nbsp;</button>';
		  b_html += '</span>';
		  tb_group.after(b_html);
		});
		jQuery('.kupu-inserthorizontalrule').click(function () {
		  var editor = window.kupu;
		  var selection = editor.getSelectedNode();
		  var hr = editor.newElement('hr');
		  hr.setAttribute('class', wysiwygTabs.PANE_END_CLASS );
		  selection.appendChild(hr);
 		});
	});

	if(document.designMode.toLowerCase() == "on") {
		//protect against running inside a kupu iframe
		return;
	} else {
		wysiwygTabs.collectTabs();
		jQuery('.pane-container').tabs();
		tocLinks = jQuery("#document-toc a");
		tabLinks = jQuery("#content ul.tabs a");
		
		tocLinks.click(function(){
			link = jQuery(this);
			tabLinks.each(function(){
				tab = jQuery(this);
				if(tab.text()==link.text()) {
					tab.click();
					return false; //we're done, get out
				}
			})
		})
	}
}

wysiwygTabs.log = function(msg) {
	// TODO: Optimze, overload this with a proper logger
	if(typeof(console) != "undefined") {
		if(typeof(console.log) != "undefined") {
			console.log(msg);				
		}
	}
}

jQuery(wysiwygTabs.init);