//  Copyright (c) 2013, Eric Aguiar <ultimate.evil@gmail.com>
//  All rights reserved.
//
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//  1. Redistributions of source code must retain the above copyright notice, this
//     list of conditions and the following disclaimer.
//  2. Redistributions in binary form must reproduce the above copyright notice,
//     this list of conditions and the following disclaimer in the documentation
//     and/or other materials provided with the distribution.
//

goog.events.listen(window, "load", (function() {
	snapshotPopup = new updater.SnapshotPopup();
	document.getElementById("download").addEventListener("click", function() {
		snapshotPopup.recordDownload(chrome.extension.getBackgroundPage().snapshot.changeLogRevision);
	}, false);
	document.getElementById("refresh").addEventListener("click", function() {
		snapshotPopup.refresh();
	}, false);
}));
