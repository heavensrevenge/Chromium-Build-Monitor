
var snapshot = null;

goog.events.listen(window, 'load', function() {
	snapshot = new mbrio.ChromiumSnapshot();
});
