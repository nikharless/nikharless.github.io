var displayType = "hidden";
function toggleDisplay(elem) {
	if (displayType == "hidden") {
		elem.style.display = "block";
		displayType = "block";
	} else {
		elem.style.display = "hidden";
		displayType = "hidden";
	}
}