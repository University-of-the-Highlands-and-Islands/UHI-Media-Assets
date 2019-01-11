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

try
{

document.write('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" integrity="sha256-7TyXnr2YU040zfSP+rEcz29ggW4j56/ujTPwjMzyqFY=" crossorigin="anonymous"/><script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js" integrity="sha256-wzoq0P7w2qLzRcJsF319y6G9Oilk3nU5CZ8tnY9TjFI=" crossorigin="anonymous"></script>');

function getMediaContent(mediaItem){
var theTag = new StringBuilder().append("<t4 type=\"media\" id=\"")
                                             .append(new Integer(mediaItem.getID()))
                                             .append("\" formatter=\"image/path\" />").toString();
return BrokerUtils.processT4Tags(oStmt, publishCache, section, mediaItem.getContent(), language, isPreview, theTag);
}

function compareListByName(a,b) {
return (a.name.toString() < b.name.toString() == true);
}


var oStmt = dbStatement;
var oMM = MediaManager.getManager();
var oCH = new ContentHierarchy();


var otitle = content.get('Title');
var title = otitle.getValue();

var oautoplay = content.get('Autoplay');
var autoplay = oautoplay.getValue();

var firstImage = content.get('First image');
var firstImageId = firstImage.getValue();
var firstMedia = oMM.get(oStmt,firstImageId,"en");
var sid = firstMedia.getCategories()[0];

var alltheMedia = oCH.getContent(oStmt,sid,'en');


sVarNew = getMediaContent(firstMedia);


var imgWidth = 0;
var imgHeight = 0;

var imgDim = MediaUtils.getImageDimensions(firstMedia);
if (imgDim[0] > imgDim[1])
{
// landscape
imgWidth = 300;
//     imgHeight = (imgDim[1]/(imgDim[0]/400)).toFixed();
imgHeight = 190
}
else
{
// portrait
imgHeight = 300;
//       imgWidth = (imgDim[0]/(imgDim[1]/400)).toFixed();
imgWidth = 190;
}

document.write('<div class="galleryContainer" style="width:' + imgWidth + 'px; height:'+ imgHeight + 'px;"><a style="background: url(' + sVarNew +') no-repeat; background-size: cover; margin-left:0; height:' + imgHeight + 'px;" href="' + sVarNew +'" data-fancybox="group-' + sid + '" rel="group-' + sid + '" data-caption="' + firstMedia.getDescription() + '"><span>' + title +'</span><span class="galleryBottom">click to view gallery</span></a></div>');


// sort stuff
var listElements = [];

for (var i = 0; i < alltheMedia.length; i++)
{
var theMedia = oMM.get(oStmt,alltheMedia[i],"en");
var thisElement = {
id: theMedia.getID(),
name: theMedia.getName("zzzNoName", false),
}
listElements.push(thisElement);
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

for (var i = 0; i < listElements.length; i++)
{
var theMedia = oMM.get(oStmt,listElements[i].id,"en");
if(theMedia.getType() == 1)
{
sVarNew = getMediaContent(theMedia);
if(theMedia.getID() != firstImageId) {
document.write('<a href="' + sVarNew +'" data-fancybox="group-' + sid + '" rel="group-' + sid + '" data-caption="' + theMedia.getDescription() + '"></a>');
}
}
}

var target = "rel='group-" + sid + "'";

if(autoplay != null)
{
document.write('<script>$("a[' + target +']").fancybox({slideShow : {autoStart : true}, thumbs : {autoStart : true}});</script>');

}
else{
//    document.write('<script>$("[data-fancybox]").fancybox({thumbs : {autoStart : true}});</script>');
document.write('<script>$("a[' + target +']").fancybox({thumbs : {autoStart : true}});</script>');
}

} catch (e) {
document.write(e);
//   document.write('<!-- error in ' + otitle + ' id=' + theMedia.getID() + ' count=' + i +' -->');
}

var isLast = BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, '<t4 type="content" name="Only or last gallery?" output="normal" display_field="value" />');
if(isLast == "Yes")
{
document.write('<div class="clearfix"></div>');
//	document.write('<p>visible test marker start</p>');
//	document.write('<hr class="pane-break" />');
//	document.write('<p>visible test marker end</p>');
}
