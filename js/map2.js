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

        function style_Hotels_1_0() {
            return {
                pane: 'pane_Hotels_1',
        rotationAngle: 0.0,
        rotationOrigin: 'center center',
        icon: L.icon({
            iconUrl: 'markers/marker.svg',
            iconSize: [34.199999999999996, 34.199999999999996]
        }),
                interactive: true,
            }
        }

        function style_Hotels_1_0() {
            return {
                pane: 'pane_Hotels_1',
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
        map.createPane('pane_Hotels_1');
        map.getPane('pane_Hotels_1').style.zIndex = 401;
        map.getPane('pane_Hotels_1').style['mix-blend-mode'] = 'normal';
        var layer_Hotels_1 = new L.geoJson(json_Hotels_1, {
            attribution: '',
            interactive: true,
            dataVar: 'json_Hotels_1',
            layerName: 'layer_Hotels_1',
            pane: 'pane_Hotels_1',
            onEachFeature: pop_Hotels_1,
            pointToLayer: function (feature, latlng) {
                var context = {
                    feature: feature,
                    variables: {}
                };
				return L.marker(latlng, style_Hotels_1_0(feature));
            },
        });
        bounds_group.addLayer(layer_Hotels_1);
        map.addLayer(layer_Hotels_1);
        map.on("zoomend", function(){

                if (map.hasLayer(layer_Hotels_1)) {
                    if (map.getZoom() <= 12 && map.getZoom() >= 19) {
                        layer_Hotels_1.eachLayer(function (layer) {
                            layer.openTooltip();
                        });
                    } else {
                        layer_Hotels_1.eachLayer(function (layer) {
                            layer.closeTooltip();
                        });
                    }
                }
        });
        setBounds();
        var i = 0;
        layer_Hotels_1.eachLayer(function(layer) {
            var context = {
                feature: layer.feature,
                variables: {}
            };
           layer.bindTooltip((exp_label_Hotels_1_eval_expression(context) !== null?String('<div style="color: #0000e4; font-size: 12pt; font-weight: bold; font-family: \'Lato Black\', sans-serif;">' + exp_label_Hotels_1_eval_expression(context)) + '</div>':''), {permanent: true, offset: [-0, -16], className: 'css_Hotels_1'});
            labels.push(layer);
            totalMarkers += 1;
              layer.added = true;
              addLabel(layer, i);
              i++;
        });
                if (map.hasLayer(layer_Hotels_1)) {
                    if (map.getZoom() <= 12 && map.getZoom() >= 19) {
                        layer_Hotels_1.eachLayer(function (layer) {
                            layer.openTooltip();
                        });
                    } else {
                        layer_Hotels_1.eachLayer(function (layer) {
                            layer.closeTooltip();
                        });
                    }
                }
		
		//show tooltip on certain zoom levels
		map.on('zoomend', function() {
			var i = 0;
			if (map.getZoom() >= 16) { //close-up zoom -> show tooltip with name & price
				layer_Hotels_1.eachLayer(function(layer) {
					var context = {
						feature: layer.feature,
						variables: {}
					};
					
					layer.bindTooltip((exp_label_Hotels_1_eval_expression(context) !== null?String('<div style="color: #0000e4; font-size: 11pt; font-weight: bold; text-align:center; font-family: \'Lato Black\', sans-serif;">' + exp_label_Hotels_1_eval_expression(context)) + '</div>':''), {permanent: true, offset: [40, -30], className: 'css_Hotels_1'});
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
		btnRegister.innerHTML = 'הרשמה לבתי עסק';
		btnRegister.style.borderRadius = "12px";
		btnRegister.style.color = "White";
		btnRegister.style.backgroundColor="#3FB8AF";
		btnRegister.style.height="60px";
		btnRegister.style.width = "70%";
		btnRegister.style.margin="30px 50px";
		btnRegister.style.fontWeight="bold";
		btnRegister.style.borderColor ="transparent";
		document.getElementById("menu").appendChild(btnRegister);
		btnRegister.style.fontSize="25px";
		btnRegister.style.fontFamily = "Calibri Light";
		btnRegister.onclick = function() {
			// console.log("pressed btn");
		};
		
		
		// add button for "signing in" on menu
		var btnSignIn = document.createElement("BUTTON");
		btnSignIn.innerHTML = "התחברות לבתי עסק";
		btnSignIn.style.borderRadius = "12px";
		btnSignIn.style.color = "White";
		btnSignIn.style.backgroundColor="#3FB8AF";
		btnSignIn.style.height="60px";
		btnSignIn.style.width="70%";
		btnSignIn.style.margin="0px 50px 20px 10px";
		btnSignIn.style.fontWeight="bold";
		btnSignIn.style.borderColor ="transparent";
		document.getElementById("menu").appendChild(btnSignIn);
		btnSignIn.style.fontSize="25px";
		btnSignIn.style.fontFamily = "Calibri Light";
		

		
		
		