var displayType = "none";
function toggleDisplay(elementId) {
	const elem = document.getElementById(elementId);
	if (displayType == "none") {
		elem.style.display = "block";
		displayType = "block";
	} else {
		elem.style.display = "none";
		displayType = "none";
	}
}