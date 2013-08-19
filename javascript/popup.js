
var snapshotPopup = null;

goog.events.listen(window, 'load', function() {
	snapshotPopup = new mbrio.SnapshotPopup();
});
