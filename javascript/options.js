(function(){
    var optionsPage = null;
    goog.events.listen(window, 'load', function() {
        optionsPage = new mbrio.OptionsPage();
        document.getElementById("platform").addEventListener("change", (function() {optionsPage.platformUpdated()}), false);
        document.getElementById("saveButton").addEventListener("click", (function() {optionsPage.saveOptions()}), false);
    });
})();
