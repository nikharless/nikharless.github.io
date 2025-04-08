var cssStyles = true;

function removeCSS() {
	
	if (cssStyles == true) {
		const items = document.getElementsByClassName("css-pos");
		for (var i=0; i < items.length; i++) {
			items[i].removeAttribute("style");
		}
		const container = document.getElementById('status');
		container.innerHTML = "The CSS positioning has been removed, and the lists are jumbled and make no sense.";
		container.removeAttribute("class");

		const button = document.getElementById('cssButton');
		button.innerHTML = "Reset";
		cssStyles = false;
	} else {
		location.reload();
	}
}