var cssStyles = true;

function removeCSS() {
	
	if (cssStyles == true) {
		const items = document.getElementsByClassName("css-pos");
		for (var i=0; i < items.length; i++) {
			items[i].removeAttribute("style");
		}
		const button = document.getElementById('cssButton');
		button.innerHTML = "Reset";
		cssStyles = false;
	} else {
		location.reload();
	}
}