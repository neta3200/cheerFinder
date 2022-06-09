
/* var Filters = {"glasses": "int","open": "str","onspot": "str","pickup": "str","shipping": "str"}; */
var Filters = {"glasses": "int","onspot": "str","pickup": "str","shipping": "str"};


// ---- filter func ---- //
function filteringFunction() {
	map.eachLayer(function(lyr){
		if ("options" in lyr && "dataVar" in lyr["options"]){
			features = this[lyr["options"]["dataVar"]].features.slice(0);
			try{
				for (key in Filters){
					keyS = key.replace(/[^a-zA-Z0-9_]/g, "")
					if (Filters[key] == "str"){
						var selection = [];
					  	var options = document.getElementById("sel_" + keyS).options
						for (var i=0; i < options.length; i++) {
							if (options[i].selected) selection.push(options[i].value);
						}
						try{
							if (key in features[0].properties){
								for (i = features.length - 1; i >= 0; --i){
									if (selection.indexOf(features[i].properties[key])<0 && selection.length>0) {
										features.splice(i,1);
									}
								}
							}
						} catch(err){
						}
					}
					if (Filters[key] == "int"){
						sliderVals =  document.getElementById("div_" + keyS).noUiSlider.get();
						try{
							if (key in features[0].properties){
								for (i = features.length - 1; i >= 0; --i){
									if (parseInt(features[i].properties[key]) < sliderVals[0] || parseInt(features[i].properties[key]) > sliderVals[1]){
										features.splice(i,1);
									}	
								}
							}
						} catch(err){
						}
					}
				}
			} catch(err){
			}
	  		this[lyr["options"]["layerName"]].clearLayers();
	  		this[lyr["options"]["layerName"]].addData(features);
	  	}
	})
}
	// ------------------------------------- //

///// --- Label - filter --- ////
document.getElementById("menu").appendChild(document.createElement("div"));
var filter_label =  document.createElement('div');
filter_label.innerHTML = "מסנני חיפוש";
filter_label.style.fontSize="35px";
filter_label.style.fontWeight="bold";
filter_label.style.color = "#191970";
filter_label.style.margin="20px 10px";
document.getElementById("menu").appendChild(filter_label);
// ------------------------------------- //

   
//// --- glassess - filter --- ////
var count;
var rank_label = document.createElement('div');
rank_label.innerHTML = '<span></span>';
rank_label.style.margin="130px 15px 20px 150px";
document.getElementById("menu").appendChild(rank_label);
document.getElementById("menu").appendChild(document.createElement("div"));
var div_glasses = document.createElement("div");
div_glasses.id = "div_glasses";
div_glasses.className = "slider";
document.getElementById("menu").appendChild(div_glasses);
div_glasses.hidden=true;
var lab_glasses = document.createElement('div');
lab_glasses.innerHTML  = 'כוסות: <span id="val_glasses"></span>';
document.getElementById("menu").appendChild(lab_glasses);
lab_glasses.hidden=true;
var sel_glasses = document.getElementById('div_glasses');
noUiSlider.create(sel_glasses, {connect: true, start: [1, 5], step: 1, format: wNumb({decimals: 0,}),range: {min: 1,max: 5}});
// glass marking
function wineglassmark(item){
	count=item.id[0];
	sessionStorage.glassRating = count;
	var subid= item.id.substring(1);
	for(var i=0;i<5;i++){
		if(i<count){ 
			document.getElementById((i+1)+subid).style.color="maroon";
		}
		else{
			document.getElementById((i+1)+subid).style.color="grey";
		}
	}		
	sel_glasses.noUiSlider.set([count, "5"]);
}
sel_glasses.noUiSlider.on('update', function (values) {
	filterVals =[];
	for (value in values){
		filterVals.push(parseInt(value))
	}
	val_glasses = document.getElementById('val_glasses');
	val_glasses.innerHTML = values.join(' - ');
	filteringFunction()
});


function glassreset(){
	for(var i=0;i<5;i++) {
		document.getElementById((i+1)+"one").style.color="grey";
	}		
}
// ------------------------------------- //



////---- open - filter ---- /////
/* document.getElementById("menu").appendChild(document.createElement("div"));
var div_open = document.createElement('div');
div_open.id = "div_open";
div_open.className= "filterselect";
document.getElementById("menu").appendChild(div_open);
div_open.hidden = true;
sel_open = document.createElement('select');
sel_open.multiple = true;
sel_open.size = 2;
sel_open.id = "sel_open";
var open_options_str = "<option value='' unselected></option>";
sel_open.onchange = function(){filteringFunction()};
open_options_str  += '<option value="yes">yes</option>';
open_options_str  += '<option value="no">no</option>';
sel_open.innerHTML = open_options_str;
div_open.appendChild(sel_open);
//create checkbox
var open_checkbox = document.createElement("INPUT");
open_checkbox.type = 'checkbox';
open_checkbox.id = "open_checkbox";
open_checkbox.style.margin="0px 25px";
document.getElementById("menu").appendChild(open_checkbox);
//Action - update
open_checkbox.onchange = function(){
	var options = document.getElementById("sel_open").options;
	if (open_checkbox.checked == true){
		options[0].selected = false;
		options[1].selected = true;
		options[2].selected = false;
	}
	else {
		options[0].selected = false;
		options[1].selected = true;
		options[2].selected = true;
	}
	filteringFunction();
};
div_open.appendChild(sel_open);
//label
var open_label = document.createElement('label').appendChild(document.createTextNode('פתוח עכשיו'));
document.getElementById('menu').appendChild(open_label); */
// ------------------------------------- //




////---- onspot - filter ---- /////
document.getElementById("menu").appendChild(document.createElement("div"));
var div_onspot = document.createElement('div');
div_onspot.id = "div_onspot";
div_onspot.className= "filterselect";
document.getElementById("menu").appendChild(div_onspot);
sel_onspot = document.createElement('select');
sel_onspot.multiple = true;
sel_onspot.size = 2;
sel_onspot.id = "sel_onspot";
var onspot_options_str = "<option value='' unselected></option>";
sel_onspot.onchange = function(){filterFunc()};
/* (feature.properties['onspot'] !== null ? autolinker.link(feature.properties['onspot'].toLocaleString()):'') */
onspot_options_str  += '<option value="yes">yes</option>';
onspot_options_str  += '<option value="no">no</option>';
sel_onspot.innerHTML = onspot_options_str;
div_onspot.appendChild(sel_onspot);
//create checkbox
var onspot_checkbox = document.createElement("INPUT");
onspot_checkbox.type = 'checkbox';
onspot_checkbox.id = "onspot_checkbox";
onspot_checkbox.style.margin="0px 25px";
document.getElementById("menu").appendChild(onspot_checkbox);
//Action - update
onspot_checkbox.onchange = function(){
	var options = document.getElementById("sel_onspot").options;
	if (onspot_checkbox.checked == true){
		options[0].selected = false;
		options[1].selected = true;
		options[2].selected = false;
	}
	else{
		options[0].selected = false;
		options[1].selected = true;
		options[2].selected = true;
	}
	filteringFunction();
};
/* div_open.appendChild(sel_onspot); */
div_onspot.appendChild(sel_onspot);
//label
var onspot_label = document.createElement('label').appendChild(document.createTextNode('אפשרות קניה במקום'));
document.getElementById('menu').appendChild(onspot_label);
// ------------------------------------- //




////---- order pickup - filter ---- /////
document.getElementById("menu").appendChild(document.createElement("div"));
var div_pickup = document.createElement('div');
div_pickup.id = "div_pickup";
div_pickup.className= "filterselect";
document.getElementById("menu").appendChild(div_pickup);
sel_pickup = document.createElement('select');
sel_pickup.multiple = true;
sel_pickup.size = 2;
sel_pickup.id = "sel_pickup";
var pickup_options_str = "<option value='' unselected></option>";
sel_pickup.onchange = function(){filterFunc()};
pickup_options_str  += '<option value="yes">yes</option>';
pickup_options_str  += '<option value="no">no</option>';
sel_pickup.innerHTML = pickup_options_str;
div_pickup.appendChild(sel_pickup);
//create checkbox
var pickup_checkbox = document.createElement("INPUT");
pickup_checkbox.type = 'checkbox';
pickup_checkbox.id = "pickup_checkbox";
pickup_checkbox.style.margin="0px 25px";
document.getElementById("menu").appendChild(pickup_checkbox);
//Action - update
pickup_checkbox.onchange = function(){
	var options = document.getElementById("sel_pickup").options;
	if (pickup_checkbox.checked == true){
		options[0].selected = false;
		options[1].selected = true;
		options[2].selected = false;
	}
	else {
		options[0].selected = false;
		options[1].selected = true;
		options[2].selected = true;
	}
	filteringFunction();
};
/* div_open.appendChild(sel_pickup); */
div_onspot.appendChild(sel_pickup);
//label
var pickup_label = document.createElement('label').appendChild(document.createTextNode('אפשרות איסוף הזמנה'));
document.getElementById('menu').appendChild(pickup_label);
// ------------------------------------- //




	////---- shipping - filter ---- /////
document.getElementById("menu").appendChild(document.createElement("div"));
var div_shipping = document.createElement('div');
div_shipping.id = "div_shipping";
div_shipping.className= "filterselect";
document.getElementById("menu").appendChild(div_shipping);
sel_shipping = document.createElement('select');
sel_shipping.multiple = true;
sel_shipping.size = 2;
sel_shipping.id = "sel_shipping";
var shipping_options_str = "<option value='' unselected></option>";
sel_shipping.onchange = function(){filterFunc()};
shipping_options_str  += '<option value="yes">yes</option>';
shipping_options_str  += '<option value="no">no</option>';
sel_shipping.innerHTML = shipping_options_str;
div_shipping.appendChild(sel_shipping);
//create checkbox
var shipping_checkbox = document.createElement("INPUT");
shipping_checkbox.type = 'checkbox';
shipping_checkbox.id = "shipping_checkbox";
shipping_checkbox.value = 'shipping';
shipping_checkbox.style.margin="0px 25px";
document.getElementById("menu").appendChild(shipping_checkbox);
//Action - update
shipping_checkbox.onchange = function(){
	var options = document.getElementById("sel_shipping").options;
	if (shipping_checkbox.checked == true){
		options[0].selected = false;
		options[1].selected = true;
		options[2].selected = false;
	}
	else {
		options[0].selected = false;
		options[1].selected = true;
		options[2].selected = true;
	}
	filteringFunction();
};
/* div_open.appendChild(sel_shipping); */
div_onspot.appendChild(sel_shipping);
//label
var shipping_label = document.createElement('label').appendChild(document.createTextNode('אפשרות משלוח'));
document.getElementById('menu').appendChild(shipping_label);
// ------------------------------------- //



// General - design
document.getElementById('menu').style.fontSize="25px";
//document.getElementById('menu').style.fontFamily = "cursive";
document.getElementById('menu').style.fontFamily = "Calibri Light";

// Reset filters
document.getElementById("menu").appendChild(document.createElement("div"));
var btnResetFilters = document.createElement("BUTTON");
btnResetFilters.innerHTML = "אפס סינונים";
btnResetFilters.style.borderRadius = "12px";
btnResetFilters.style.color = "White";
btnResetFilters.style.backgroundColor="#3FB8AF";
btnResetFilters.style.height="35px";
btnResetFilters.style.width="150px";
btnResetFilters.style.margin="20px 20px";
btnResetFilters.style.borderColor ="transparent";
document.getElementById("menu").appendChild(btnResetFilters);
btnResetFilters.style.fontSize="23px";
btnResetFilters.style.fontFamily = "Calibri Light";
btnResetFilters.onclick = function() {
	//reset open
	/* open_checkbox.checked = false;
	var options_open = document.getElementById("sel_open").options;
	options_open[1].selected = true;
	options_open[2].selected = true; */

	//reset onspot
	onspot_checkbox.checked = false;
	var options_onspot = document.getElementById("sel_onspot").options;
	options_onspot[1].selected = true;
	options_onspot[2].selected = true;
	//reset pickup
	pickup_checkbox.checked = false;
	var options_pickup = document.getElementById("sel_pickup").options;
	options_pickup[1].selected = true;
	options_pickup[2].selected = true;
	//reset shipping
	shipping_checkbox.checked = false;
	var options_shipping = document.getElementById("sel_shipping").options;
	options_shipping[1].selected = true;
	options_shipping[2].selected = true;
	//reset glasses
	sel_glasses.noUiSlider.set(["1", "5"]);
	glassreset();
}

