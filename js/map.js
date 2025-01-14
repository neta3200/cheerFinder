var map = L.map('map', {
    zoomControl:true, maxZoom:28, minZoom:1
}).fitBounds([[32.06713697849164,34.75391744831668],[32.096276441878295,34.79292725271933]]);
    var hash = new L.Hash(map);
    map.attributionControl.setPrefix('<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a> &middot; <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; <a href="https://qgis.org">QGIS</a>');
    var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});
    var bounds_group = new L.featureGroup([]);
    function setBounds() {
    }
    map.createPane('pane_OSMStandard_0');
    map.getPane('pane_OSMStandard_0').style.zIndex = 400;
    var layer_OSMStandard_0 = L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        pane: 'pane_OSMStandard_0',
        opacity: 1.0,
        attribution: '<a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
        minZoom: 1,
        maxZoom: 28,
        minNativeZoom: 0,
        maxNativeZoom: 19
    });
    layer_OSMStandard_0;
    map.addLayer(layer_OSMStandard_0);

    var mapControlsContainer = document.getElementsByClassName("leaflet-control")[0];
    var logoContainer = document.getElementById("logoContainer");
    mapControlsContainer.appendChild(logoContainer);

    //set popup contents: image + table with attributes values
    function pop_Stores_1(feature, layer) { 
        var popupContent = '<div><img src=' + (feature.properties['Image']) + ' width=450><table dir="rtl" lang="he" style="font-size:14px;text-align:right">\
                <tr>\
                    <td style="font-size:22px; font-weight:bold;">' + (feature.properties['Name'] !== null ? autolinker.link(feature.properties['Name'].toLocaleString()) : '') + '</td>\
                </tr>\
                <tr>\
                    <td colspan="1">' + "<img src=\"images/LocationPin.png\" height=13>" + " " + (feature.properties['Address'] !== null ? autolinker.link(feature.properties['Address'].toLocaleString()) : '') + '</td>\
                </tr>\
                <tr>\
                    <td style="font-weight:bold">שעות פעילות: </td>\
                </tr>\
                <tr>\
                <td scope="row">ראשון: '  + (feature.properties['sunday'] !== null ? autolinker.link(feature.properties['sunday'].toLocaleString()) : '') + '</td>\
                </tr>\
                <tr>\
                <td scope="row">שני: '  + (feature.properties['monday'] !== null ? autolinker.link(feature.properties['monday'].toLocaleString()) : '') + '</td>\
                </tr>\
                <tr>\
                <td scope="row">שלישי: '  + (feature.properties['tuesday'] !== null ? autolinker.link(feature.properties['tuesday'].toLocaleString()) : '') + '</td>\
                </tr>\
                <tr>\
                <td scope="row">רביעי: '  + (feature.properties['wednesday'] !== null ? autolinker.link(feature.properties['wednesday'].toLocaleString()) : '') + '</td>\
                </tr>\
                <tr>\
                <td scope="row">חמישי: '  + (feature.properties['thursday'] !== null ? autolinker.link(feature.properties['thursday'].toLocaleString()) : '') + '</td>\
                </tr>\
                <tr>\
                <td scope="row">שישי: '  + (feature.properties['friday'] !== null ? autolinker.link(feature.properties['friday'].toLocaleString()) : '') + '</td>\
                </tr>\
                <tr>\
                <td scope="row">שבת: '  + (feature.properties['saturday'] !== null ? autolinker.link(feature.properties['saturday'].toLocaleString()) : '') + '</td>\
                </tr>\
                <tr>\
                <td scope="row"><img src=\"images/Telephone.png\" height=14 style="text-align:right">'+ "   " + (feature.properties['telephone'] !== null ? autolinker.link(feature.properties['telephone'].toLocaleString()) : '') + '</td>\
                </tr>\
                <tr>\
                    <td scope="row"><img src=\"images/WebSite.png\" height=14 style="align:right">'+ "   " + (feature.properties['link'] !== null ? autolinker.link(feature.properties['link'].toLocaleString()) : '') + '</td>\
                </tr>\
                <tr>\
                <td colspan="1">דירוג: ' + paint_glasses(feature.properties['glasses']) + '</td>\
                </tr>\
                <tr>\
                    <td  align="right" width=200>'+  (check_x_mark(feature.properties['onspot'])) + ' קנייה במקום </td>\
                    <td  align="right" width=200>'+ (check_x_mark(feature.properties['pickup'])) + ' איסוף הזמנה </td>\
                    <td  align="right" width=200>'+ (check_x_mark(feature.properties['shipping'])) + ' משלוח</td>\
                </tr>\
            </table></div>';
        layer.bindPopup(popupContent, {maxWidth: 'auto'});
    }

    //center popup and marker when pressed
    map.on('popupopen', function(e) {
        //find the pixel location on the map where the popup anchor is
        var px = map.project(e.popup._latlng);
        //find the height of the popup container, divide by 2, subtract from the Y axis of marker location
        px.y -= e.popup._container.clientHeight/2;
        //pan to new center
        map.panTo(map.unproject(px),{animate: true});
    });

    function check_x_mark(option){
        if(option == "yes")
            return "<img src=\"images/CheckSymbol.png\" height=20>"
        else
            return "<img src=\"images/xmark.png\" height=20>"

    }

    function paint_glasses(rank) {
        var i;
        rank = Math.round(rank);
        text= "";
        for (i=rank; i<5; i++)
            //text += ('<span class="fa fa-glass"></span>');
            text+= ('<img src="/images/EmptyGlass.png" height = 20">');
        for (i=0; i<rank; i++)
            //text += ('<span class="fa fa-glass checked"></span>');
            text+= ('<img src="/images/FullGlass.png" height = 20">');
        return text;
    }


    function style_Stores_1_0() {
        return {
            pane: 'pane_Stores_1',
    rotationAngle: 0.0,
    rotationOrigin: 'center center',
    icon: L.icon({
        iconUrl: 'images/marker.svg',
        iconSize: [34.199999999999996, 34.199999999999996]
    }),
            interactive: true,
        }
    }

    function style_Stores_1_0() {
        return {
            pane: 'pane_Stores_1',
            radius: 8.0,
            opacity: 1,
            color: 'rgba(50,87,128,1.0)',
            dashArray: '',
            lineCap: 'butt',
            lineJoin: 'miter',
            weight: 2.0,
            fill: true,
            fillOpacity: 1,
            fillColor: 'rgba(43,46,182,1.0)',
            interactive: true,
        }
    }

    map.createPane('pane_Stores_1');
    map.getPane('pane_Stores_1').style.zIndex = 401;
    map.getPane('pane_Stores_1').style['mix-blend-mode'] = 'normal';



    var layer_Stores_1 = new L.geoJson(json_Stores_1, {
        attribution: '',
        interactive: true,
        dataVar: 'json_Stores_1',
        layerName: 'layer_Stores_1',
        pane: 'pane_Stores_1',
        onEachFeature: pop_Stores_1,
        pointToLayer: function (feature, latlng) {
            var context = {
                feature: feature,
                variables: {}
            };
            return L.marker(latlng, style_Stores_1_0(feature));
        },
    });
    bounds_group.addLayer(layer_Stores_1);
    map.addLayer(layer_Stores_1);
    map.on("zoomend", function(){

            if (map.hasLayer(layer_Stores_1)) {
                if (map.getZoom() <= 12 && map.getZoom() >= 19) {
                    layer_Stores_1.eachLayer(function (layer) {
                        layer.openTooltip();
                    });
                } else {
                    layer_Stores_1.eachLayer(function (layer) {
                        layer.closeTooltip();
                    });
                }
            }
    });
    setBounds();
    var i = 0;
    layer_Stores_1.eachLayer(function(layer) {
        var context = {
            feature: layer.feature,
            variables: {}
        };
    layer.bindTooltip((exp_label_Stores_1_eval_expression(context) !== null?String('<div style="color: #0000e4; font-size: 12pt; font-weight: bold; font-family: \'Lato Black\', sans-serif;">' + exp_label_Stores_1_eval_expression(context)) + '</div>':''), {permanent: true, offset: [-0, -16], className: 'css_Stores_1'});
        labels.push(layer);
        totalMarkers += 1;
        layer.added = true;
        addLabel(layer, i);
        i++;
    });
            if (map.hasLayer(layer_Stores_1)) {
                if (map.getZoom() <= 12 && map.getZoom() >= 19) {
                    layer_Stores_1.eachLayer(function (layer) {
                        layer.openTooltip();
                    });
                } else {
                    layer_Stores_1.eachLayer(function (layer) {
                        layer.closeTooltip();
                    });
                }
            }

    //show tooltip on certain zoom levels
    map.on('zoomend', function() {
        var i = 0;
        if (map.getZoom() >= 16) { //close-up zoom -> show tooltip with name & price
            layer_Stores_1.eachLayer(function(layer) {
                var context = {
                    feature: layer.feature,
                    variables: {}
                };
                
                layer.bindTooltip((exp_label_Stores_1_eval_expression(context) !== null?String('<div style="color: #0000e4; font-size: 11pt; font-weight: bold; text-align:center; font-family: \'Lato Black\', sans-serif;">' + exp_label_Stores_1_eval_expression(context)) + '</div>':''), {permanent: true, offset: [40, -30], className: 'css_Stores_1'});
                labels.push(layer);
                totalMarkers += 1;
                layer.added = true;
                addLabel(layer, i);
                i++;
            });
        }
        else { //distanced zoom -> remove tooltip
            layer.unbindTooltip();
        }
    });
            
    // create menu side bar
    var mapDiv = document.getElementById('map');
    var row = document.createElement('div');
    row.className="row";
    row.id="all";
    row.style.height = "100%";
    var col1 = document.createElement('div');
    col1.className="col9";
    col1.id = "mapWindow";
    col1.style.height = "100%";
    col1.style.width = "80%";
    col1.style.display = "inline-block";		
    col1.style.float="left";
    var col2 = document.createElement('div');
    col2.className="col3";
    col2.id = "menu";
    col2.style.float="left";
    col2.width="90%";
    mapDiv.parentNode.insertBefore(row, mapDiv);
    document.getElementById("all").appendChild(col1);
    document.getElementById("all").appendChild(col2);
    col1.appendChild(mapDiv)

    // add button for "registration" on menu
    var btnRegister = document.createElement("BUTTON");
    btnRegister.innerHTML = 'הרשמה והתחברות לבעלי חנויות';
    btnRegister.style.borderRadius = "12px";
    btnRegister.style.color = "White";
    btnRegister.style.backgroundColor="#82002e";
    btnRegister.style.height="80px";
    btnRegister.style.width = "70%";
    btnRegister.style.margin="30px 50px";
    btnRegister.style.fontWeight="bold";
    btnRegister.style.borderColor ="transparent";
    document.getElementById("menu").appendChild(btnRegister);
    btnRegister.style.fontSize="22px";
    btnRegister.style.fontFamily = "Calibri Light";
    btnRegister.onclick = function() {
    };
    btnRegister.onmouseover = function () {btnRegister.style.backgroundColor="#E24E4E";}
    btnRegister.onmouseleave = function () {btnRegister.style.backgroundColor="#82002e";}

    // add button for "signing in" on menu
    var btnSignIn = document.createElement("BUTTON");
    btnSignIn.innerHTML = "הרשמה והתחברות למשתמשים";
    btnSignIn.style.borderRadius = "12px";
    btnSignIn.style.color = "White";
    btnSignIn.style.backgroundColor="#82002e";
    btnSignIn.style.height="80px";
    btnSignIn.style.width="70%";
    btnSignIn.style.margin="0px 50px 20px 10px";
    btnSignIn.style.fontWeight="bold";
    btnSignIn.style.borderColor ="transparent";
    document.getElementById("menu").appendChild(btnSignIn);
    btnSignIn.style.fontSize="22px";
    btnSignIn.style.fontFamily = "Calibri Light";
    btnSignIn.onmouseover = function () {btnSignIn.style.backgroundColor="#E24E4E";}
    btnSignIn.onmouseleave = function () {btnSignIn.style.backgroundColor="#82002e";}
