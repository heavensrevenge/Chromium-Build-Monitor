var optionsPage = null;
goog.events.listen(window, 'load', function() {
	optionsPage = new mbrio.OptionsPage();
	document.getElementById("saveButton").addEventListener("click", (function() {optionsPage.saveOptions();}), false);
});
