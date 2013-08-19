var snapshotPopup = null;
goog.events.listen(window, 'load', function() {
	snapshotPopup = new mbrio.SnapshotPopup();
	document.getElementById("download").addEventListener("click", (function() {
		snapshotPopup.recordDownload(chrome.extension.getBackgroundPage().snapshot.changeLogRevision);
	}), false);
	document.getElementById("refresh").addEventListener("click", (function() {snapshotPopup.refresh()}), false);
});
