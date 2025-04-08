var cssStyles = true;

function removeCSS() {
	
	if cssStyles == true {
		document.getElementsByClassName("css-pos").removeAttribute("style");
		const button = document.querySelector('cssButton');
		button.innerHTML = "Reset";
		cssStyles = false;
	} else {
		location.reload();
	}
}