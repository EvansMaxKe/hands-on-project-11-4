//use strict in the global
"use strict";

	var httpRequest = false;

function getRequestObject() {

		try {
			//get http request
			httpRequest = new XMLHttpRequest();
		}
		//display city and state fields and labels for manual input through the keyboard
		catch (requestError) {  
			document.getElementById("csset").style.visibility = "visible";  //remove event listeners so additional input is ignored
	var zip = document.getElementById("zip").value;
			// add event listeners to the zip input
		if (zip.addEventListener) {
			zip.removeEventListener("keyup", checkInput, false);
		} else if (zip.attachEvent) {
			zip.detachEvent("onkeyup", checkInput);
		}
		return false;
		}
		return httpRequest;
}
//zip input function 
function checkInput() {
	var zip = document.getElementById("zip").value;
	//get location if the zip input lenght is = 5
		if (zip.length === 5) {
			getLocation();
		} else {
			document.getElementById("city").value = "";
			document.getElementById("state").value = "";
		}
}
// function to get the location if the zip input length ==5
function getLocation() {
	var zip = document.getElementById("zip").value;
		if (!httpRequest) {
			httpRequest = getRequestObject();
		}

			httpRequest.abort();
			httpRequest.open("get","http://api.zippopotam.us/us/" + zip, true);
			httpRequest.send();
			httpRequest.onreadystatechange = displayData;
}
//function to display the data if location has been found
function displayData() {
		if(httpRequest.readyState === 4 && httpRequest.status === 200) {
	
	var resultData = JSON.parse(httpRequest.responseText);
	var city = document.getElementById("city");
	var state = document.getElementById("state");

			city.value = resultData.places[0]["place name"];
			state.value = resultData.places[0]["state abbreviation"];
			//location data
			document.getElementById("zip").blur();
			document.getElementById("csset").style.visibility = "visible";

		}
}

	var zip = document.getElementById("zip");
		if (zip.addEventListener) {
			zip.addEventListener("keyup", checkInput, false);
		} else if (zip.attachEvent) {
			zip.attachEvent("onkeyup", checkInput);
		}