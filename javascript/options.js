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

(function(){
	goog.events.listen(window, 'load', (function() {
		optionsPage = new mbrio.OptionsPage();
		document.getElementById("platform").addEventListener("change", (function() {
			optionsPage.platformUpdated();
		}));
		document.getElementById("saveButton").addEventListener("click", (function() {
			optionsPage.saveOptions();
		}));
	}));
})();
