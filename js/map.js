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
        function pop_Hotels_1(feature, layer) { 
            var popupContent = '<div><img src=' + (feature.properties['Image']) + ' width=350><table dir="rtl" style="font-size:14px">\
                    <tr>\
                        <td style="font-size:22px; font-weight:bold;">' + (feature.properties['Name'] !== null ? autolinker.link(feature.properties['Name'].toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="1">' + "<img src=\"images/location.png\" height=13>" + "  " + (feature.properties['Address'] !== null ? autolinker.link(feature.properties['Address'].toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="1">' + "החל מ-   " + (feature.properties['price'] !== null  ? autolinker.link(feature.properties['price'].toLocaleString() + "₪") + " ללילה": '') + '</td>\
                    </tr>\
					<tr>\
                        <td colspan="1">' + paint_stars(feature.properties['stars']) + '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row"><img src=\"images/pet-icon.png\" height=14>  ידידותי לבעלי חיים</th>\
                        <td>'  + (feature.properties['pet'] !== null ? autolinker.link(feature.properties['pet'].toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row"><img src=\"images/kids-icon.png\" height=14>  מתאים לילדים</th>\
                        <td>' + (feature.properties['kids'] !== null ? autolinker.link(feature.properties['kids'].toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row"><img src=\"images/pool-icon.png\" height=15>  בריכת שחייה</th>\
                        <td>' + (feature.properties['pool'] !== null ? autolinker.link(feature.properties['pool'].toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row"><img src=\"images/wifi-icon.png\" height=14>  WIFI חינם</th>\
                        <td>' + (feature.properties['wifi'] !== null ? autolinker.link(feature.properties['wifi'].toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row"><img src=\"images/link-icon.png\" height=14>  קישור לאתר</th>\
                        <td>' + (feature.properties['link'] !== null ? autolinker.link(feature.properties['link'].toLocaleString()) : '') + '</td>\
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
		
		//paint hotel's #stars (rank) in popup
		function paint_stars(rank) {
			var i;
			text= "";
			for (i=rank; i<5; i++)
				text += ('<span class="fa fa-star"></span>');
			for (i=0; i<rank; i++)
				text += ('<span class="fa fa-star checked"></span>');
			return text;
		}

function style_Stores() {
    return {
        pane: 'pane_Stores',
rotationAngle: 0.0,
rotationOrigin: 'center center',
icon: L.icon({
    iconUrl: 'markers/marker.svg',
    iconSize: [34.199999999999996, 34.199999999999996]
    }),
        interactive: true,
    }
}        


function style_Stores() {
        return {
            pane: 'pane_Stores',
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
    
map.createPane('pane_Stores');
map.getPane('pane_Stores').style.zIndex = 401;
map.getPane('pane_Stores').style['mix-blend-mode'] = 'normal';
var layer_Stores = new L.geoJson(json_Stores,{
  attribution: '',
        interactive: true,
        dataVar: 'json_Stores',
        layerName: 'layer_Stores',
        pane: 'pane_Stores',
        onEachFeature: pop_Stores,
        pointToLayer: function (feature, latlng) {
            var context = {
                feature: feature,
                variables: {}
            };
            return L.marker(latlng, style_Stores(feature));

},
});

bounds_group.addLayer(layer_Stores);
map.addLayer(layer_Stores);
map.on("zoomend", function(){

    if (map.hasLayer(layer_Stores)) {
        if (map.getZoom() <= 12 && map.getZoom() >= 19) {
            layer_Stores.eachLayer(function (layer) {
                layer.openTooltip();
            });
        } else {
            layer_Stores.eachLayer(function (layer) {
                layer.closeTooltip();
            });
        }
    }
});
setBounds();
var i = 0;
layer_Stores.eachLayer(function(layer) {
var context = {
    feature: layer.feature,
    variables: {}
};
layer.bindTooltip((exp_label_Stores_eval_expression(context) !== null?String('<div style="color: #0000e4; font-size: 12pt; font-weight: bold; font-family: \'Lato Black\', sans-serif;">' + exp_label_Stores_eval_expression(context)) + '</div>':''), {permanent: true, offset: [-0, -16], className: 'css_Stores'});
labels.push(layer);
totalMarkers += 1;
  layer.added = true;
  addLabel(layer, i);
  i++;
});
    if (map.hasLayer(layer_Stores)) {
        if (map.getZoom() <= 12 && map.getZoom() >= 19) {
            layer_Stores.eachLayer(function (layer) {
                layer.openTooltip();
            });
        } else {
            layer_Stores.eachLayer(function (layer) {
                layer.closeTooltip();
            });
        }
    }

//show tooltip on certain zoom levels
map.on('zoomend', function() {
var i = 0;
if (map.getZoom() >= 16) { //close-up zoom -> show tooltip with name & price
    layer_Stores.eachLayer(function(layer) {
        var context = {
            feature: layer.feature,
            variables: {}
        };
        
        layer.bindTooltip((exp_label_Stores_eval_expression(context) !== null?String('<div style="color: #0000e4; font-size: 11pt; font-weight: bold; text-align:center; font-family: \'Lato Black\', sans-serif;">' + exp_label_Stores_eval_expression(context)) + '</div>':''), {permanent: true, offset: [40, -30], className: 'css_Stores'});
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

