function toggleDisplay(elementId) {
	const elem = document.getElementById(elementId);
	var displayType = elem.style.display;
	if (displayType == "none") {
		elem.style.display = "block";
		displayType = "block";
	} else {
		elem.style.display = "none";
		displayType = "none";
	}
}