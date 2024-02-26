// Global variables
var map = null;				// The map
var infoWindow = null;			// The infowindoe

function initialize() {
    // Initial coordinates & zoom
    var lat = 57.4695462;
    var lng = -4.2298078;
    var zoomIni = 6;

    // Create & initialize the map
    var myLatLng = new google.maps.LatLng(lat, lng);
    var myOptions = {zoom: zoomIni, center: myLatLng, mapTypeId: google.maps.MapTypeId.ROADMAP};
    map = new google.maps.Map(document.getElementById("uhiMap"), myOptions);

    // Create the global infowindow
    infoWindow = new google.maps.InfoWindow({maxWidth: '400', maxHeight: '250'});
    // UHI
    // var latlng = new google.maps.LatLng(57.4695462, -4.2298078);
    // uhiMarker(latlng);
    // UHI Inverness
    var latlng1 = new google.maps.LatLng(57.475185,-4.182236);
    invernessMarker(latlng1);
    // UHI Shetland
    var latlng1 = new google.maps.LatLng(60.169353, -1.1661517);
    shetlandMarker(latlng1);
    // UHI Orkney
    var latlng1 = new google.maps.LatLng(58.9850253, -2.9487805);
    orkneyMarker(latlng1);
    // UHI North Highland
    var latlng1 = new google.maps.LatLng(58.585699, -3.5346809);
    nhcMarker(latlng1);
    // UHI Outer Hebrides
    var latlng1 = new google.maps.LatLng(58.2130006, -6.396517);
    lewsMarker(latlng1);
    // HTC
    var latlng1 = new google.maps.LatLng(57.5949372, -4.4249398);
    htcMarker(latlng1);
    // UHI Moray
    var latlng1 = new google.maps.LatLng(57.6448247, -3.3162238);
    morayMarker(latlng1);
    // SMO
    var latlng1 = new google.maps.LatLng(57.0860245, -5.8799657);
    smoMarker(latlng1);
    // UHI West Highland
    var latlng1 = new google.maps.LatLng(56.8234351, -5.106932);
    whcMarker(latlng1);
    // UHI Perth
    var latlng1 = new google.maps.LatLng(56.4056051, -3.4606109);
    perthMarker(latlng1);
    // SAMS
    var latlng1 = new google.maps.LatLng(56.45113, -5.4396352);
    samsMarker(latlng1);
    // UHI Argyll
    var latlng1 = new google.maps.LatLng(55.9464578, -4.9270442);
    argyllMarker(latlng1);

}

//google.maps.event.addListener(map,"click", function(event) {
//	infoWindow.close();
//closeInfoWindow() ;
//});


//---------------------------------------------------------------------------------
// UHI EO details
// function uhiMarker(latlng) {
//     var strTooltip = "UHI Executive Office";
//     var htmlInfo = uhiTabs();
//     var marker = createUHITabsMarker(latlng, strTooltip, htmlInfo);
//     marker.setMap(map);
// }
//
// function uhiTabs() {
//     var html = "<h2>UHI Executive Office</h2>";
//     html += "<p>UHI Inverness is one of UHI’s largest campuses and is situated in the vibrant, growing Highland capital city.</p><p>The college is home to the Scottish School of Forestry, and also offers courses in: arts; social sciences; history; health and care; engineering; business and management; sports; beauty therapy and science.<!--<br />Principal - Diane Rawlinson--></p>";
//     html += "</div>";
//     html += "<div class='tabberMaptab'>";
//     html += "<h3>Contact us</h3>";
//     html += "<p>UHI Inverness<br/>1 Inverness Campus<br/>Inverness<br/>IV2 5NA</p><p>Tel: +44 (0)1463 273000<br /> Textphone 01463 273180<br/>Fax: 01595 772001<br/>";
//     html += "e: <a href='mailto:info@inverness.uhi.ac.uk' title='Email UHI Inverness'>info@inverness.uhi.ac.uk</a></p>";
//     html += "<p><a href='https://www.inverness.uhi.ac.uk' title='UHI Inverness Website' target='_blank'>www.inverness.uhi.ac.uk</a></p>";
//     html += "</div>";
//     html += "</div>";
//     return html;
// }
// function createUHITabsMarker(latlng, strTooltip, htmlInfo) {
//     // Create the marker
//     var marker = new google.maps.Marker({
//         position: latlng,
//         title: strTooltip,
//         icon: "<t4 type="media" formatter="image/path" id="2175" />"
//     });
//
//     // Create a "click" listener to open the infowindow
//     google.maps.event.addListener(marker, "click", function () {
//         infoWindow.close();
//         infoWindow.setContent(htmlInfo);
//         infoWindow.open(map, marker);
//         tabberMapAutomatic({div: document.getElementById(infoWindow.id)});
//     });
//     return marker;
// }
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// Inverness details
function invernessMarker(latlng) {
    var strTooltip = "UHI Inverness";
    var htmlInfo = invernessTabs();
    var marker = createInvernessTabsMarker(latlng, strTooltip, htmlInfo);
    marker.setMap(map);
}
function invernessTabs() {
    /*
     var html = "<img src='site_images/inverness.png' alt='UHI Inverness logo'>";
     var html = "<div class='tabberMap'>";
     html += "<div class='tabberMaptab'>";
     html += "<h2>Summary | </h2>";
     */
    var html = "<h2>UHI Inverness</h2>";
    html += "<p>UHI Inverness is one of UHI’s largest campuses and is situated in the vibrant, growing Highland capital city.</p><p>The college is home to the Scottish School of Forestry, and also offers courses in: arts; social sciences; history; health and care; engineering; business and management; sports; beauty therapy and science.<!--<br />Principal - Diane Rawlinson--></p>";
    html += "</div>";
    html += "<div class='tabberMaptab'>";
    html += "<h3>Contact us</h3>";
    html += "<p>UHI Inverness<br/>1 Inverness Campus<br/>Inverness<br/>IV2 5NA</p><p>Tel: +44 (0)1463 273000<br /> Textphone 01463 273180<br/>Fax: 01595 772001<br/>";
    html += "e: <a href='mailto:info@inverness.uhi.ac.uk' title='Email UHI Inverness'>info@inverness.uhi.ac.uk</a></p>";
    html += "<p><a href='https://www.inverness.uhi.ac.uk' title='UHI Inverness Website' target='_blank'>www.inverness.uhi.ac.uk</a></p>";
    html += "</div>";
    html += "</div>";
    return html;
}
function createInvernessTabsMarker(latlng, strTooltip, htmlInfo) {
    // Create the marker
    var marker = new google.maps.Marker({
        position: latlng,
        title: strTooltip,
        icon: "<t4 type="media" formatter="image/path" id="2175" />"
    });

    // Create a "click" listener to open the infowindow
    google.maps.event.addListener(marker, "click", function () {
        infoWindow.close();
        infoWindow.setContent(htmlInfo);
        infoWindow.open(map, marker);
        tabberMapAutomatic({div: document.getElementById(infoWindow.id)});
    });
    return marker;
}

//---------------------------------------------------------------------------------


//---------------------------------------------------------------------------------
// Shetland details
function shetlandMarker(latlng) {
    var strTooltip = "UHI Shetland";
    var htmlInfo = shetlandTabs();
    var marker = createShetlandTabsMarker(latlng, strTooltip, htmlInfo);
    marker.setMap(map);
}
function shetlandTabs() {
    /*
     var html = "<img src='site_images/shetland.png' alt='Shetland College UHI logo'>";
     html += "<div class='tabberMap'>";
     html += "<div class='tabberMaptab'>";
     html += "<h2>Summary | </h2>";
     */
    var html = "<h2>UHI Shetland</h2>";
    html += "<p>UHI Shetland offers you a wide range of courses, such as: contemporary textiles; business and management; childcare; health; hospitality; culture and heritage; and Nordic studies. Shetland is an inspiring and dynamic place to study and live, with great education facilities and a lively social and cultural scene. You’ll be greeted with a warm island welcome.</p>";
    html += "</div>";
    html += "<div class='tabberMaptab'>";
    html += "<h3>Contact us</h3>";
    html += "<p>UHI Shetland<br/>Gremista<br/>Lerwick<br/>Shetland<br/>ZE1 0PX</p><p>t: 01595 771000<br/>";
    html += "e: <a href='mailto:shetland.college@uhi.ac.uk' title='Email UHI Shetland'>shetland.college@uhi.ac.uk</a></p>";
    html += "<p><a href='https://www.shetland.uhi.ac.uk' title='UHI Shetland' target='_parent'>www.shetland.uhi.ac.uk</a></p>";
    html += "</div>";
    html += "</div>";
    return html;
}
function createShetlandTabsMarker(latlng, strTooltip, htmlInfo) {
    // Create the marker
    var marker = new google.maps.Marker({
        position: latlng,
        title: strTooltip,
        icon: "<t4 type="media" formatter="image/path" id="2175" />"
    });

    // Create a "click" listener to open the infowindow
    google.maps.event.addListener(marker, "click", function () {
        infoWindow.close();
        infoWindow.setContent(htmlInfo);
        infoWindow.open(map, marker);
        tabberMapAutomatic({div: document.getElementById(infoWindow.id)});
    });
    return marker;
}
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// Orkney details
function orkneyMarker(latlng) {
    var strTooltip = "UHI Orkney";
    var htmlInfo = orkneyTabs();
    var marker = createOrkneyTabsMarker(latlng, strTooltip, htmlInfo);
    marker.setMap(map);
}
function orkneyTabs() {
    /*
     var html = "<img src='site_images/orkney.png' alt='UHI Orkney logo'>";
     html += "<div class='tabberMap'>";
     html += "<div class='tabberMaptab'>";
     html += "<h2>Summary | </h2>";
     */
    var html = "<h2>UHI Orkney</h2>";
    html += "<p>UHI Orkney has a purpose-built campus in Kirkwall, offering a range of general and specialist courses, including: archaeology; art; business and management; construction; health; hospitality and tourism and Nordic and cultural studies. Staff and students at the college also carry out research in agronomy, archaeology, geophysics, and Nordic studies.</p><!--<p>Principal - Dr Bill Ross</p>-->";
    html += "</div>";
    html += "<div class='tabberMaptab'>";
    html += "<h3>Contact us</h3>";
    html += "<p>UHI Orkney<br />East Road<br />Kirkwall<br />Orkney<br />KW15 1LX  </p><p>t: 01856 569000<br />";
    html += "e: <a href='mailto:orkney.college@uhi.ac.uk' title='Email UHI Orkney'>orkney.college@uhi.ac.uk</a></p>";
    html += "<p><a href='https://www.orkney.uhi.ac.uk' title='UHI Orkney' target='_blank'>www.orkney.uhi.ac.uk </a></p>";
    html += "</div>";
    html += "</div>";
    return html;
}
function createOrkneyTabsMarker(latlng, strTooltip, htmlInfo) {
    // Create the marker
    var marker = new google.maps.Marker({
        position: latlng,
        title: strTooltip,
        icon: "<t4 type="media" formatter="image/path" id="2175" />"
    });

    // Create a "click" listener to open the infowindow
    google.maps.event.addListener(marker, "click", function () {
        infoWindow.close();
        infoWindow.setContent(htmlInfo);
        infoWindow.open(map, marker);
        tabberMapAutomatic({div: document.getElementById(infoWindow.id)});
    });
    return marker;
}
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// NHC details
function nhcMarker(latlng) {
    var strTooltip = "UHI North, West and Hebrides";
    var htmlInfo = nhcTabs();
    var marker = createNHCTabsMarker(latlng, strTooltip, htmlInfo);
    marker.setMap(map);
}
function nhcTabs() {
    /*
     var html = "<img src='site_images/nhc.png' alt='UHI North Highland logo'>";
     html += "<div class='tabberMap'>";
     html += "<div class='tabberMaptab'>";
     html += "<h2>Summary | </h2>";
     */
    var html = "<h2>UHI North, West and Hebrides</h2>";
    html += "<p>UHI North, West and Hebrides has campuses where you can study history, golf management, music, equine studies, engineering, gamekeeping, and business. The college also hosts the Environmental Research Institute, where staff are conducting ground-breaking research into renewable energy sources and climate change.</p><!--<p>Principal - Gordon Jenkins  </p>-->";
    html += "</div>";
    html += "<div class='tabberMaptab'>";
    html += "<h3>Contact us</h3>";
    html += "<p>UHI North, West and Hebrides<br>Ormlie Road<br>Thurso<br>Caithness<br>KW14 7EE</p><p>t: 01847 889000<br>";
    html += "e: <a href='mailto:info@nwh.uhi.ac.uk' title='Email UHI North, West and Hebrides'>info@nwh.uhi.ac.uk</a></p>";
    html += "<p><a href='https://www.nwh.uhi.ac.uk/' title='UHI North, West and Hebrides' target='_blank'>www.nwh.uhi.ac.uk </a></p>";
    html += "</div>";
    html += "</div>";
    return html;
}
function createNHCTabsMarker(latlng, strTooltip, htmlInfo) {
    // Create the marker
    var marker = new google.maps.Marker({
        position: latlng,
        title: strTooltip,
        icon: "<t4 type="media" formatter="image/path" id="2175" />"
    });

    // Create a "click" listener to open the infowindow
    google.maps.event.addListener(marker, "click", function () {
        infoWindow.close();
        infoWindow.setContent(htmlInfo);
        infoWindow.open(map, marker);
        tabberMapAutomatic({div: document.getElementById(infoWindow.id)});
    });
    return marker;
}
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// UHI Outer Hebrides details
function lewsMarker(latlng) {
    var strTooltip = "UHI North, West and Hebrides";
    var htmlInfo = lewsTabs();
    var marker = createLewsTabsMarker(latlng, strTooltip, htmlInfo);
    marker.setMap(map);
}
function lewsTabs() {
    /*
     var html = "<img src='site_images/lcc.png' alt='UHI Outer Hebrides logo'>";
     html += "<div class='tabberMap'>";
     html += "<div class='tabberMaptab'>";
     html += "<h2>Summary | </h2>";
     */
    var html = "<h2>UHI North, West and Hebrides</h2>";
    html += "<p>UHI North, West and Hebrides specialises in Gaelic, music, renewable energy, health, rural development, art and computing.<!--<br><br>Principal and Chief Executive - Iain MacMillan--></p>";
    html += "</div>";
    html += "<div class='tabberMaptab'>";
    html += "<h3>Contact us</h3>";
    html += "<p>UHI North, West and Hebrides<br>Stornoway<br>Isle of Lewis<br>HS2 0XR</p><p>t: 01851 770000<br>";
    html += "e: <a href='mailto:info@nwh.uhi.ac.uk' title='Email UHI North, West and Hebrides'>info@nwh.uhi.ac.uk</a></p>";
    html += "<p><a href='https://www.nwh.uhi.ac.uk' title='UHI North, West and Hebrides' target='_blank'>www.nwh.uhi.ac.uk </a></p>";
    html += "</div>";
    html += "</div>";
    return html;
}
function createLewsTabsMarker(latlng, strTooltip, htmlInfo) {
    // Create the marker
    var marker = new google.maps.Marker({
        position: latlng,
        title: strTooltip,
        icon: "<t4 type="media" formatter="image/path" id="2175" />"
    });

    // Create a "click" listener to open the infowindow
    google.maps.event.addListener(marker, "click", function () {
        infoWindow.close();
        infoWindow.setContent(htmlInfo);
        infoWindow.open(map, marker);
        tabberMapAutomatic({div: document.getElementById(infoWindow.id)});
    });
    return marker;
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
// HTC UHI details
function htcMarker(latlng) {
    var strTooltip = "HTC";
    var htmlInfo = htcTabs();
    var marker = createHTCTabsMarker(latlng, strTooltip, htmlInfo);
    marker.setMap(map);
}
function htcTabs() {
    /*
     var html = "<img src='site_images/htc.png' alt='HTC logo'>";
     html += "<div class='tabberMap'>";
     html += "<div class='tabberMaptab'>";
     html += "<h2>Summary | </h2>";
     */
    var html = "<h2>HTC</h2>";
    html += "<p>HTC is based in Dingwall, near Inverness, and offers degrees and postgraduate courses in the study of the Christian faith. It is a small and friendly college, where staff and students know one another well , contributing to the family atmosphere and excellent support. The college is situated close to mountains and coast lines, which offer a range of outdoor activities, and is only ten miles from Inverness with all the facilities of a city.<!--</p><br>Principal - Rev. Hector Morrison--></p>";
    html += "</div>";
    html += "<div class='tabberMaptab'>";
    html += "<h3>Contact us</h3>";
    html += "<p>HTC<br>High Street<br>Dingwall<br>Ross-shire<br>IV15 9HA</p><p>t: 01349 780000<br>";
    html += "e: <a href='mailto:htc@htc.uhi.ac.uk' title='Email HTC'>htc@htc.uhi.ac.uk</a></p>";
    html += "<p><a href='https://www.htc.uhi.ac.uk' title='HTC' target='_blank'>www.htc.uhi.ac.uk</a></p>";
    html += "</div>";
    html += "</div>";
    return html;
}
function createHTCTabsMarker(latlng, strTooltip, htmlInfo) {
    // Create the marker
    var marker = new google.maps.Marker({
        position: latlng,
        title: strTooltip,
        icon: "<t4 type="media" formatter="image/path" id="2175" />"
    });

    // Create a "click" listener to open the infowindow
    google.maps.event.addListener(marker, "click", function () {
        infoWindow.close();
        infoWindow.setContent(htmlInfo);
        infoWindow.open(map, marker);
        tabberMapAutomatic({div: document.getElementById(infoWindow.id)});
    });
    return marker;
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
// UHI Moray details
function morayMarker(latlng) {
    var strTooltip = "UHI Moray";
    var htmlInfo = morayTabs();
    var marker = createMorayTabsMarker(latlng, strTooltip, htmlInfo);
    marker.setMap(map);
}
function morayTabs() {
    /*
     var html = "<img src='site_images/moray.png' alt='UHI Moray logo'>";
     html += "<div class='tabberMap'>";
     html += "<div class='tabberMaptab'>";
     html += "<h2>Summary | </h2>";
     */
    var html = "<h2>UHI Moray</h2>";
    html += "<p>UHI Moray has three campus in Elgin within easy reach of Inverness and Aberdeen. The Moray Street campus is home to courses in business; sport; science; computing; health; beauty; complementary therapies, alongside Moray School of Art, Scotland’s fifth art school, and the Hospitality and Tourism Academy. The state-of-the-art Linkwood Technology Centre delivers courses in construction and engineering, whilst budding horticulturists will study at the Biblical Garden campus beside the iconic Elgin Cathedral.</p><!--<p>Acting Principal - Anne Lindsay</p>-->";
    html += "</div>";
    html += "<div class='tabberMaptab'>";
    html += "<h3>Contact us</h3>";
    html += "<p>UHI Moray<br />Moray Street<br />Elgin<br />Morayshire<br />IV30 1JJ</p><p>t: 01343 576000<br />";
    html += "e: <a href='mailto:mc.registry@moray.uhi.ac.uk' title='Email UHI Moray'>mc.registry@moray.uhi.ac.uk</a></p>";
    html += "<p><a href='https://www.moray.uhi.ac.uk' title='UHI Moray' target='_blank'>www.moray.uhi.ac.uk</a></p>";
    html += "</div>";
    html += "</div>";
    return html;
}
function createMorayTabsMarker(latlng, strTooltip, htmlInfo) {
    // Create the marker
    var marker = new google.maps.Marker({
        position: latlng,
        title: strTooltip,
        icon: "<t4 type="media" formatter="image/path" id="2175" />"
    });

    // Create a "click" listener to open the infowindow
    google.maps.event.addListener(marker, "click", function () {
        infoWindow.close();
        infoWindow.setContent(htmlInfo);
        infoWindow.open(map, marker);
        tabberMapAutomatic({div: document.getElementById(infoWindow.id)});
    });
    return marker;
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
// Sabhal Mòr Ostaig details
function smoMarker(latlng) {
    var strTooltip = "Sabhal Mòr Ostaig";
    var htmlInfo = smoTabs();
    var marker = createSMOTabsMarker(latlng, strTooltip, htmlInfo);
    marker.setMap(map);
}
function smoTabs() {
    /*
     var html = "<img src='site_images/smo.png' alt='Sabhal M÷r Ostaig UHI logo'>";
     html += "<div class='tabberMap'>";
     html += "<div class='tabberMaptab'>";
     html += "<h2>Summary | </h2>";
     */
    var html = "<h2>Sabhal Mòr Ostaig</h2>";
    html += "<p>Sabhal Mòr Ostaig on the Isle of Skye is the only Gaelic medium college in the world and is at the heart of the movement to promote the Gaelic language. The college boasts state-of-the-art facilities for the development of arts, culture, broadcasting and new media, through the medium of Gaelic.</p><!--<p>Principal - Professor Boyd Robertson</p>-->";
    html += "</div>";
    html += "<div class='tabberMaptab'>";
    html += "<h3>Contact us</h3>";
    html += "<p>Sabhal Mòr Ostaig<br />Teangue<br />Sleat<br />Isle of Skye<br />IV44 8RQ</p><p>t: 01471 888000<br />";
    html += "e: <a href='mailto:iarrtas@smo.uhi.ac.uk' title='Email Sabhal MÖr Ostaig UHI'>iarrtas@smo.uhi.ac.uk</a></p>";
    html += "<p><a href='https://www.smo.uhi.ac.uk' title='Sabhal MÖr Ostaig UHI' target='_blank'>www.smo.uhi.ac.uk</a></p>";
    html += "</div>";
    html += "</div>";
    return html;
}
function createSMOTabsMarker(latlng, strTooltip, htmlInfo) {
    // Create the marker
    var marker = new google.maps.Marker({
        position: latlng,
        title: strTooltip,
        icon: "<t4 type="media" formatter="image/path" id="2175" />"
    });

    // Create a "click" listener to open the infowindow
    google.maps.event.addListener(marker, "click", function () {
        infoWindow.close();
        infoWindow.setContent(htmlInfo);
        infoWindow.open(map, marker);
        tabberMapAutomatic({div: document.getElementById(infoWindow.id)});
    });
    return marker;
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
// UHI West Highland details
function whcMarker(latlng) {
    var strTooltip = "UHI North, West and Hebrides";
    var htmlInfo = whcTabs();
    var marker = createWHCTabsMarker(latlng, strTooltip, htmlInfo);
    marker.setMap(map);
}
function whcTabs() {
    /*
     var html = "<img src='site_images/whc.png' alt='West Highland College logo'>";
     html += "<div class='tabberMap'>";
     html += "<div class='tabberMaptab'>";
     html += "<h2>Summary | </h2>";
     */
    var html = "<h2>UHI North, West and Hebrides</h2>";
    html += "<p>UHI North, West and Hebrides has a wide range of skills-based courses available at the college centres.</p><!--<p>Principal - Lydia Rohmer</p>-->";
    html += "</div>";
    html += "<div class='tabberMaptab'>";
    html += "<h3>Contact us</h3>";
    html += "<p>UHI North, West and Hebrides<br />Carmichael Way<br />Fort William<br />Inverness-shire<br />PH33 6FF</p><P>t: 01397 874000<br />";
    html += "e: <a href='mailto:info@nwh.uhi.ac.uk' title='Email UHI North, West and Hebrides'>info@nwh.uhi.ac.uk</a></p>";
    html += "<p><a href='https://www.nwh.uhi.ac.uk' title='UHI North, West and Hebrides' target='_blank'>www.nwh.uhi.ac.uk</a></P>";
    html += "</div>";
    html += "</div>";
    return html;
}
function createWHCTabsMarker(latlng, strTooltip, htmlInfo) {
    // Create the marker
    var marker = new google.maps.Marker({
        position: latlng,
        title: strTooltip,
        icon: "<t4 type="media" formatter="image/path" id="2175" />"
    });

    // Create a "click" listener to open the infowindow
    google.maps.event.addListener(marker, "click", function () {
        infoWindow.close();
        infoWindow.setContent(htmlInfo);
        infoWindow.open(map, marker);
        tabberMapAutomatic({div: document.getElementById(infoWindow.id)});
    });
    return marker;
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//UHI Perth details
function perthMarker(latlng) {
    var strTooltip = "UHI Perth";
    var htmlInfo = perthTabs();
    var marker = createPerthTabsMarker(latlng, strTooltip, htmlInfo);
    marker.setMap(map);
}
function perthTabs() {
    /*
     var html = "<img src='site_images/perth.png' alt='UHI Perth logo'>";
     html += "<div class='tabberMap'>";
     html += "<div class='tabberMaptab'>";
     html += "<h2>Summary | </h2>";
     */
    var html = "<h2>UHI Perth</h2>";
    html += "<p>UHI Perth is one of UHI’s largest colleges and offers a variety of broad and specialist courses in subjects such as: aircraft engineering; music and music business; audio engineering; mountain studies; social sciences; interpretation management; business and management; health; and tourism and hospitality.</p><p>The college has a diverse international student body and a friendly, active student community.</p><!--<p>Acting Principal - Margaret Munckton</p>-->";
    html += "</div>";
    html += "<div class='tabberMaptab'>";
    html += "<h3>Contact us</h3>";
    html += "<p>UHI Perth<br />Crieff Road<br />Perth<br />PH1 2NX</p><p>t: 0845 270 1177<br />";
    html += "e: <a href='mailto:pc.enquiries@perth.uhi.ac.uk' title='Email UHI Perth'>pc.enquiries@perth.uhi.ac.uk</a></p>";
    html += "<p><a href='https://www.perth.uhi.ac.uk' title='UHI Perth' target='_blank'>www.perth.uhi.ac.uk</a></p>";
    html += "</div>";
    html += "</div>";
    return html;
}
function createPerthTabsMarker(latlng, strTooltip, htmlInfo) {
    // Create the marker
    var marker = new google.maps.Marker({
        position: latlng,
        title: strTooltip,
        icon: "<t4 type="media" formatter="image/path" id="2175" />"
    });

    // Create a "click" listener to open the infowindow
    google.maps.event.addListener(marker, "click", function () {
        infoWindow.close();
        infoWindow.setContent(htmlInfo);
        infoWindow.open(map, marker);
        tabberMapAutomatic({div: document.getElementById(infoWindow.id)});
    });
    return marker;
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//SAMS details
function samsMarker(latlng) {
    var strTooltip = "SAMS";
    var htmlInfo = samsTabs();
    var marker = createSAMSTabsMarker(latlng, strTooltip, htmlInfo);
    marker.setMap(map);
}
function samsTabs() {
    /*
     var html = "<img src='site_images/sams.png' alt='SAMS logo'>";
     html += "<div class='tabberMap'>";
     html += "<div class='tabberMaptab'>";
     html += "<h2>Summary | </h2>";
     */
    var html = "<h2>SAMS UHI</h2>";
    html += "<p>SAMS UHI is one of the UK’s leading marine research institutes with more than 125 years of research expertise, and an excellent location for marine study, on the west coast of Scotland. You can study marine science, or get involved in research into: climate change; marine renewable energy; prosperity from marine ecosystems; industrial impacts on oceans; and the Arctic.</p>";
    html += "</div>";
    html += "<div class='tabberMaptab'>";
    html += "<h3>Contact us</h3>";
    html += "<p>SAMS<br />Oban<br />Argyll<br />PA37 1QA</p><p>t: 01631 559000<br />";
    html += "e: <a href='mailto:info@sams.ac.uk' title='Email SAMS'>info@sams.ac.uk</a></p>";
    html += "<p><a href='https://www.sams.ac.uk' title='SAMS' target='_blank'>www.sams.ac.uk</a></p>";
    html += "</div>";
    html += "</div>";
    return html;
}
function createSAMSTabsMarker(latlng, strTooltip, htmlInfo) {
    // Create the marker
    var marker = new google.maps.Marker({
        position: latlng,
        title: strTooltip,
        icon: "<t4 type="media" formatter="image/path" id="2175" />"
    });

    // Create a "click" listener to open the infowindow
    google.maps.event.addListener(marker, "click", function () {
        infoWindow.close();
        infoWindow.setContent(htmlInfo);
        infoWindow.open(map, marker);
        tabberMapAutomatic({div: document.getElementById(infoWindow.id)});
    });
    return marker;
}
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//UHI Argyll details
function argyllMarker(latlng) {
    var strTooltip = "UHI Argyll";
    var htmlInfo = argyllTabs();
    var marker = createArgyllTabsMarker(latlng, strTooltip, htmlInfo);
    marker.setMap(map);
}
function argyllTabs() {
    /*
     var html = "<img src='site_images/argyll.png' alt='UHI Argyll logo'>";
     html += "<div class='tabberMap'>";
     html += "<div class='tabberMaptab'>";
     html += "<h2>Summary | </h2>";
     */
    var html = "<h2>UHI Argyll</h2>";
    html += "<p>UHI Argyll is the most geographically wide-spread UHI campus, with centres right across Argyll and the islands off the west coast of Scotland. The college is an important part of all the communities it serves, providing learning opportunities to people in rural towns and villages, in an area of outstanding natural beauty.</p><!--<p>Principal - Fraser Durie</p>-->";
    html += "</div>";
    html += "<div class='tabberMaptab'>";
    html += "<h3>Contact us</h3>";
    html += "<p>UHI Argyll<br />West Bay<br />Dunoon<br />Argyll<br />PA23 7HP</p><p>t: 0845 230 9969<br />";
    html += "e: <a href='mailto:info@argyllcollege.uhi.ac.uk' title='Email UHI Argyll'>info@argyllcollege.uhi.ac.uk</a></p>";
    html += "<p><a href='https://www.argyll.uhi.ac.uk/' title='UHI Argyll' target='_blank'>www.argyll.uhi.ac.uk</a></p>";
    html += "</div>";
    html += "</div>";
    return html;
}
function createArgyllTabsMarker(latlng, strTooltip, htmlInfo) {
    // Create the marker
    var marker = new google.maps.Marker({
        position: latlng,
        title: strTooltip,
        icon: "<t4 type="media" formatter="image/path" id="2175" />"
    });

    // Create a "click" listener to open the infowindow
    google.maps.event.addListener(marker, "click", function () {
        infoWindow.close();
        infoWindow.setContent(htmlInfo);
        infoWindow.open(map, marker);
        tabberMapAutomatic({div: document.getElementById(infoWindow.id)});
    });
    return marker;
}
//---------------------------------------------------------------------------------

// JavaScript Document

google.maps.event.addDomListener(window, 'load', initialize);