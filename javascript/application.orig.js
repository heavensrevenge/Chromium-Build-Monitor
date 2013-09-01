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

var a, goog = goog || {};
goog.global = this;
goog.typeOf = function(b) {
  var c = typeof b;
  if("object" == c) {
    if(b) {
      if(b instanceof Array || !(b instanceof Object && "[object Array]" == Object.prototype.toString.call(b)) || "number" == typeof b.length && "undefined" != b.splice && !b.propertyIsEnumerable("splice")) {
        return"array"
      }
      if(!(b instanceof Object || "[object Function]" != Object.prototype.toString.call(b) && ("undefined" == b.call || b.propertyIsEnumerable("call")))) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if("function" == c && "undefined" == b.call) {
      return"object"
    }
  }
  return c
};
goog.isArray = function(b) {
  return"array" == goog.typeOf(b)
};
goog.isString = function(b) {
  return"string" == typeof b
};
goog.isFunction = function(b) {
  return"function" == goog.typeOf(b)
};
goog.inherits = function(b, c) {
  function e() {
  }
  e.prototype = c.prototype;
  b.superClass = c.prototype;
  b.prototype = new e;
  b.prototype.constructor = b
};
goog.Disposable = function() {
};
a = goog.Disposable.prototype;
a.disposed_ = !1;
a.dispose = function() {
  a.disposed_ || (a.disposed_ = !0)
};
goog.dispose = function(b) {
  b && "function" == typeof b.dispose && b.dispose()
};
goog.events = {};
goog.events.Event = function(b, c) {
  goog.Disposable.call(a);
  a.type = b;
  a.currentTarget = a.target = c
};
goog.inherits(goog.events.Event, goog.Disposable);
a = goog.events.Event.prototype;
a.propagationStopped_ = !1;
a.returnValue_ = !0;
a.preventDefault = function() {
  a.returnValue_ = !1
};
goog.string = {};
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.trim = function(b) {
  return b.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
};
goog.string.htmlEscape = function(b, c) {
  goog.string.amperRe_ = /&/g;
  goog.string.ltRe_ = /</g;
  goog.string.gtRe_ = />/g;
  goog.string.quotRe_ = /\"/g;
  goog.string.allRe_ = /[&<>\"]/;
  if(c) {
    return b.replace(goog.string.amperRe_, "&amp;").replace(goog.string.ltRe_, "&lt;").replace(goog.string.gtRe_, "&gt;").replace(goog.string.quotRe_, "&quot;")
  }else {
    if(!goog.string.allRe_.test(b)) {
      return b
    }
    if(b.indexOf("&") != -1) {
      b = b.replace(goog.string.amperRe_, "&amp;")
    }
    if(b.indexOf("<") != -1) {
      b = b.replace(goog.string.ltRe_, "&lt;")
    }
    if(b.indexOf(">") != -1) {
      b = b.replace(goog.string.gtRe_, "&gt;")
    }
    if(b.indexOf('"') != -1) {
      b = b.replace(goog.string.quotRe_, "&quot;")
    }
    return b
  }
};
goog.string.contains = function(b, c) {
  return-1 != b.indexOf(c)
};
goog.userAgent = {};
goog.userAgent.ASSUME_WEBKIT = !0;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_WEBKIT;
goog.userAgent.getUserAgentString = function() {
  return goog.global.navigator ? goog.global.navigator.userAgent : null
};
goog.userAgent.getNavigator = function() {
  return goog.global.navigator
};
goog.userAgent.init_ = function() {
  goog.userAgent.detectedWebkit_ = !1;
  var b;
  !goog.userAgent.BROWSER_KNOWN_ && (b = goog.userAgent.getUserAgentString()) && (goog.userAgent.getNavigator(), goog.userAgent.detectedWebkit_ = -1 != b.indexOf("WebKit"))
};
goog.userAgent.BROWSER_KNOWN_ || goog.userAgent.init_();
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT : goog.userAgent.detectedWebkit_;
goog.userAgent.determinePlatform_ = function() {
  var b = goog.userAgent.getNavigator();
  return b && b.platform || ""
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = !1;
goog.userAgent.ASSUME_WINDOWS = !1;
goog.userAgent.ASSUME_LINUX = !1;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX;
goog.userAgent.initPlatform_ = function() {
  goog.userAgent.detectedMac_ = goog.string.contains(goog.userAgent.PLATFORM, "Mac");
  goog.userAgent.detectedWindows_ = goog.string.contains(goog.userAgent.PLATFORM, "Win");
  goog.userAgent.detectedLinux_ = goog.string.contains(goog.userAgent.PLATFORM, "Linux")
};
goog.userAgent.PLATFORM_KNOWN_ || goog.userAgent.initPlatform_();
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.userAgent.detectedMac_;
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.userAgent.detectedWindows_;
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.detectedLinux_;
goog.userAgent.determineVersion_ = function() {
  var b = "", c;
  goog.userAgent.WEBKIT && (c = /WebKit\/(\S+)/);
  c && (b = (b = c.exec(goog.userAgent.getUserAgentString())) ? b[1] : "");
  return b
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.events.BrowserEvent = function(b, c) {
  b && this.init(b, c)
};
goog.inherits(goog.events.BrowserEvent, goog.events.Event);
goog.events.BrowserEvent.MouseButton = {LEFT:0, MIDDLE:1, RIGHT:2};
a = goog.events.BrowserEvent.prototype;
a.init = function(b, c) {
  a.type = b.type
};
goog.events.Listener = function() {
};
goog.events.Listener.counter_ = 0;
a = goog.events.Listener.prototype;
a.key = 0;
a.removed = !1;
a.init = function(b, c) {
  var h = this;
  if(goog.isFunction(b)) {
    h.isFunctionListener_ = true
  }else {
    if(b && b.handleEvent && goog.isFunction(b.handleEvent)) {
      h.isFunctionListener_ = false
    }
  }
  this.listener = b;
  this.type = c;
  this.removed = !1
};
a.handleEvent = function(b) {
  return this.isFunctionListener_ ? this.listener.call(this.src, b) : this.listener.handleEvent.call(this.listener, b)
};
goog.events.pools = {};
(function() {
  var b = null;
  goog.events.pools.setProxyCallbackFunction = function(c) {
    b = c
  };
  goog.events.pools.getObject = function() {
    return{count_:0, remaining_:0}
  };
  goog.events.pools.releaseObject = null;
  goog.events.pools.getArray = function() {
    return[]
  };
  goog.events.pools.getProxy = function() {
    function c(e) {
      return b.call(c.src, c.key)
    }
    return c
  };
  goog.events.pools.releaseProxy = null;
  goog.events.pools.getListener = function() {
    return new goog.events.Listener
  };
  goog.events.pools.releaseListener = null;
  goog.events.pools.getEvent = function() {
    return new goog.events.BrowserEvent
  };
  goog.events.pools.releaseEvent = null
})();
goog.object = {};
goog.events.listeners_ = {};
goog.events.listenerTree_ = {};
goog.events.sources_ = {};
goog.events.listen = function(b, c, e, f, g) {
  if(c) {
    if(goog.isArray(c)) {
      for(var h = 0;h < c.length;++h) {
        goog.events.listen(b, c[h], e, f, g)
      }
      return null
    }
    f = !!f;
    g = goog.events.listenerTree_;
    c in g || (g[c] = goog.events.pools.getObject());
    g = g[c];
    f in g || (g[f] = goog.events.pools.getObject(), ++g.count_);
    g = g[f];
    var k;
    ++g.remaining_;
    if(g[1]) {
      for(k = g[1], h = 0;h < k.length;++h) {
        if(g = k[h], g.listener == e) {
          if(g.removed) {
            break
          }
          return k[h].key
        }
      }
    }else {
      k = g[1] = goog.events.pools.getArray(), ++g.count_
    }
    h = goog.events.pools.getProxy();
    g = goog.events.pools.getListener();
    g.init(e, c);
    e = g.key;
    h.key = e;
    k.push(g);
    goog.events.listeners_[e] = g;
    goog.events.sources_[1] || (goog.events.sources_[1] = goog.events.pools.getArray());
    goog.events.sources_[1].push(g);
    b.addEventListener ? b == goog.global && b.addEventListener(c, h, f) : b.attachEvent(h);
    return e
  }
};
goog.events.fireListener = function(b, c) {
  return b.handleEvent(c)
};
goog.events.dispatchEvent = function(b, c) {
  goog.isString(c) ? c = new goog.events.Event(c, b) : c instanceof goog.events.Event && (c.target = c.target || b);
  d = 1;
  return c.type in goog.events.listenerTree_ ? Boolean(d) : !0
};
goog.events.handleBrowserEvent_ = function(b, c) {
  if(!goog.events.listeners_[b]) {
    return!0
  }
  b = goog.events.listeners_[b];
  return b.type in goog.events.listenerTree_ ? goog.events.fireListener(b, void 0) : !0
};
goog.events.pools.setProxyCallbackFunction(goog.events.handleBrowserEvent_);
goog.events.EventTarget = function() {
  goog.Disposable.call(a)
};
goog.inherits(goog.events.EventTarget, goog.Disposable);
a = goog.events.EventTarget.prototype;
a.parentEventTarget_ = null;
a.getParentEventTarget = function() {
  return a.parentEventTarget_
};
a.addEventListener = function(b, c, e, f) {
  goog.events.listen(this, b, c, e, f)
};
a.dispatchEvent = function(b) {
  return goog.events.dispatchEvent(this, b)
};
var updater = {ChromiumSnapshotStatus:{}}, BADGE_COLOR_ = {color:[255, 202, 28, 255]};
updater.ChromiumSnapshotStatus.none = "none";
updater.ChromiumSnapshotStatus.loading = "loading";
updater.ChromiumSnapshotStatus.loaded = "loaded";
updater.ChromiumSnapshotStatus.error = "error";
updater.ChromiumSnapshot = function() {
  goog.events.EventTarget.call(a);
  this.revisionModel_ = new updater.RevisionModel;
  this.updateInterval_ = this.icon_ = this.loadingAnimation_ = null;
  var b = this;
  goog.events.listen(window, "unload", function() {
    b.stopUpdateInterval()
  });
  a.currentRequest_ = null;
  a.status = updater.ChromiumSnapshotStatus.none;
  b.initIcon();
  b.init()
};
goog.inherits(updater.ChromiumSnapshot, goog.events.EventTarget);
updater.ChromiumSnapshot.STATUS_UPDATED = "statusupdated";
updater.ChromiumSnapshot.prototype.__defineGetter__("status", function() {
  return this.status_
});
updater.ChromiumSnapshot.prototype.__defineSetter__("status", function(b) {
  this.status_ = b;
  this.dispatchEvent(updater.ChromiumSnapshot.STATUS_UPDATED)
});
updater.ChromiumSnapshot.prototype.__defineGetter__("icon", function() {
  return this.icon_
});
updater.ChromiumSnapshot.prototype.__defineGetter__("platform", function() {
  return updater.Settings.platform
});
updater.ChromiumSnapshot.prototype.__defineGetter__("downloadLink", function() {
  return updater.Settings.currentRepository.getDownloadUrl(this.platform, this.revisionModel_.version)
});
updater.ChromiumSnapshot.prototype.__defineGetter__("changeLogMessage", function() {
  return this.queryChangeLog("/changelogs/log/child::logentry[position()=last()]/child::msg/text()", "")
});
updater.ChromiumSnapshot.prototype.__defineGetter__("changeLogRevision", function() {
  return this.queryChangeLog("/changelogs/log/child::logentry[position()=last()]/attribute::revision", "-1")
});
updater.ChromiumSnapshot.prototype.__defineGetter__("version", function() {
  return this.revisionModel_.version
});
updater.ChromiumSnapshot.prototype.__defineGetter__("changeLog", function() {
  return this.revisionModel_.changeLog
});
a = updater.ChromiumSnapshot.prototype;
a.queryChangeLog = function(b, c) {
  var d = new XPathEvaluator;
  b = d.evaluate(b, this.revisionModel_.changeLog, null, XPathResult.STRING_TYPE, null);
  c = c;
  if(b.stringValue != null && b.stringValue.length > 0) {
    c = b.stringValue
  }
  return c
};
a.initIcon = function() {
  this.icon_ = new updater.Icon;
  this.loadingAnimation_ = new updater.LoadingAnimation(this)
};
a.reset = function() {
  chrome.browserAction.setBadgeText({text:""});
  this.icon_.displayUpToDate = true
};
a.init = function() {
  this.reset();
  this.update()
};
a.checkVersion = function(b) {
  if(!isNaN(b)) {
    var c = this;
    var d = updater.Settings.latestDownloadedRevision;
    c.revisionModel_.version = b;
    if(c.revisionModel_.version > d) {
      chrome.browserAction.setBadgeBackgroundColor(BADGE_COLOR_);
      chrome.browserAction.setBadgeText({text:"new"});
      c.icon_.displayUpToDate = false;
      var notificationOptions = {
          type: "basic",
          title: "New Chromium Build Available",
          message: "Revision " + d + " was last Downloaded\nRevision " + b + " is Available",
          iconUrl: "images/icon-256.png",
          buttons: [ {title:"Download", iconUrl:"images/icon-uptodate.png"} ],
          priority: 2
      }
      chrome.notifications.create(String(b), notificationOptions, function(){});
    }else {
      chrome.browserAction.setBadgeText({text:""});
      c.icon_.displayUpToDate = true
    }
  }
};
a.startUpdateInterval = function() {
  var b = this;
  b.stopUpdateInterval();
  if(updater.Settings.canCheckContinuously) {
    b.updateInterval_ = setTimeout(function() {
      b.update()
    }, parseInt(updater.Settings.checkInterval) * 6E4, 10)
  }
};
a.stopUpdateInterval = function() {
  if(this.updateInterval_ != null) {
    clearTimeout(this.updateInterval_);
    this.updateInterval_ = null
  }
};
a.update = function() {
  var b = this;
  b.startUpdateInterval();
  b.status = updater.ChromiumSnapshotStatus.loading;
  b.icon_.displayError = false;
  b.loadingAnimation_.start();
  b.request(updater.Settings.currentRepository.getLatestUrl(b.platform), function(c) {
    if(c.readyState == 4) {
      if(c.status != 200) {
        b.icon_.displayError = true;
        b.loadingAnimation_.registerStop();
        b.status = updater.ChromiumSnapshotStatus.error
      }else {
        b.checkVersion(parseInt(c.responseText));
        b.retrieveChangeLog()
      }
    }
  })
};
a.retrieveChangeLog = function() {
  var b = this;
  b.request(updater.Settings.currentRepository.getChangeLogUrl(b.platform, b.revisionModel_.version), function(c) {
    if(c.readyState == 4) {
      if(c.status != 200) {
        b.icon_.displayError = true;
        b.status = updater.ChromiumSnapshotStatus.error
      }else {
        b.revisionModel_.changeLog = c.responseXML;
        b.status = updater.ChromiumSnapshotStatus.loaded
      }
      b.loadingAnimation_.registerStop()
    }
  })
};
a.abort = function() {
  if(this.currentRequest_ != null) {
    this.currentRequest_.abort();
    this.currentRequest_ = null
  }
};
a.request = function(b, c) {
  var d = this;
  d.abort();
  d.currentRequest_ = new XMLHttpRequest;
  d.currentRequest_.onreadystatechange = function() {
    c != null && c(d.currentRequest_)
  };
  d.currentRequest_.open("GET", b, true);
  d.currentRequest_.send()
};
goog.dom = {};
a.ceil = function() {
  this.width = Math.ceil(this.width);
  this.height = this.ceil(this.height);
  return this
};
goog.dom.getElement = function(b) {
  return goog.isString(b) ? document.getElementById(b) : b
};
goog.dom.$ = goog.dom.getElement;
goog.dom.createDom = function() {
  return goog.dom.createDom_(document, arguments)
};
goog.dom.createDom_ = function(b, c) {
  var e = c[0], f = c[1], g = b.createElement(e);
  f && goog.isString(f) && (g.className = f);
  if(2 < c.length) {
    for(var h = function(c) {
      c && g.appendChild(goog.isString(c) ? b.createTextNode(c) : c)
    }, f = 2;f < c.length;++f) {
      e = c[f], goog.isArrayLike(e) && !goog.dom.isNodeLike(e) ? goog.array.forEach(goog.dom.isNodeList(e) ? goog.array.clone(e) : e, h) : h(e)
    }
  }
  return g
};
goog.dom.$dom = goog.dom.createDom;
goog.dom.appendChild = function(b, c) {
  b.appendChild(c)
};
goog.dom.removeChildren = function(b) {
  for(var c;c = b.firstChild;) {
    b.removeChild(c)
  }
};
updater.Icon = function() {
  this.iconNormalImage_ = goog.dom.$("icon");
  this.iconUpToDateImage_ = goog.dom.$("icon-uptodate");
  this.iconErrorImage_ = goog.dom.$("icon-error");
  this.iconImage_ = this.iconNormalImage_;
  this.canvas_ = goog.dom.$("canvas");
  this.canvasContext_ = this.canvas_.getContext("2d");
  this.displayUpToDate_ = this.displayError_ = !1;
  this.rotation = 0
};
updater.Icon.prototype.__defineGetter__("rotation", function() {
  return this.rotation_
});
updater.Icon.prototype.__defineSetter__("rotation", function(b) {
  this.rotation_ = b;
  this.draw()
});
updater.Icon.prototype.__defineGetter__("displayError", function() {
  return this.displayError_
});
updater.Icon.prototype.__defineSetter__("displayError", function(b) {
  this.displayError_ = b;
  this.updateIcon();
  this.draw()
});
updater.Icon.prototype.__defineGetter__("displayUpToDate", function() {
  return this.displayUpToDate_
});
updater.Icon.prototype.__defineSetter__("displayUpToDate", function(b) {
  this.displayUpToDate_ = b;
  this.updateIcon();
  this.draw()
});
updater.Icon.prototype.updateIcon = function() {
  this.iconImage_ = this.displayError_ ? this.iconErrorImage_ : this.displayUpToDate_ ? this.iconUpToDateImage_ : this.iconNormalImage_
};
updater.Icon.prototype.draw = function() {
  var b = this;
  b.canvasContext_.save();
  b.canvasContext_.clearRect(0, 0, 19, 19);
  b.canvasContext_.translate(Math.ceil(9), Math.ceil(9));
  b.canvasContext_.rotate(this.rotation_ * Math.PI / 180);
  b.canvasContext_.drawImage(this.iconImage_, -Math.ceil(9), -Math.ceil(9));
  b.canvasContext_.restore();
  chrome.browserAction.setIcon({imageData:this.canvasContext_.getImageData(0, 0, 19, 19)})
};
updater.LoadingAnimation = function(b) {
  var c = this;
  c.interval_ = null;
  c.fullRotation_ = 360;
  c.parent_ = b;
  c.fps_ = 60;
  c.prev_ = 0;
  c.currentRotation_ = 1;
  c.stoppingRotation_ = null
};
updater.LoadingAnimation.prototype.start = function() {
  var b = this;
  b.stop();
  b.prev_ = (new Date).getTime();
  b.interval_ = setInterval(function() {
    var c = 2, d = (new Date).getTime(), e = (d - b.prev_) / 1E3;
    c = b.parent_.icon.rotation + c * 360 * e;
    e = Math.ceil(c / 360);
    if(b.stoppingRotation_ != null && e > b.stoppingRotation_) {
      b.parent_.icon.rotation = 0;
      b.stop()
    }else {
      b.parent_.icon.rotation = c;
      b.currentRotation_ = e;
      b.prev_ = d
    }
  }, 1E3 / b.fps_)
};
updater.LoadingAnimation.prototype.registerStop = function() {
  this.stoppingRotation_ = this.currentRotation_
};
updater.LoadingAnimation.prototype.stop = function() {
  if(this.interval_ != null) {
    clearInterval(this.interval_);
    this.interval_ = null;
    this.prev_ = 0;
    this.currentRotation_ = 1;
    this.stoppingRotation_ = null
  }
};
updater.OptionsPage = function() {
  this.init()
};
updater.OptionsPage.prototype.init = function() {
  this.display();
  this.restoreOptions()
};
updater.OptionsPage.prototype.display = function() {
  goog.dom.removeChildren(document.body);
  var b = goog.dom.$dom("div");
  b.innerHTML = updater.t.Options.page();
  goog.dom.appendChild(document.body, b)
};
updater.OptionsPage.prototype.platformUpdated = function() {
  var b = goog.dom.$("platform");
  b = b.children[b.selectedIndex].value;
  if(b != "Win") {
    goog.dom.$("installer-panel").style.display = "none"
  }else {
    goog.dom.$("installer-panel").style.display = "block"
  }
};
updater.OptionsPage.prototype.saveOptions = function() {
  var b = goog.dom.$("platform");
  b = b.children[b.selectedIndex].value;
  updater.Settings.platform = b;
  b = goog.dom.$("repository");
  b = b.children[b.selectedIndex].value;
  updater.Settings.snapshotRepository = b;
  updater.Settings.useInstaller = goog.dom.$("installer-enabled").checked;
  updater.Settings.checkContinuously = goog.dom.$("check-continuously").checked;
  updater.Settings.checkInterval = parseInt(goog.dom.$("check-interval").value);
  chrome.extension.getBackgroundPage().snapshot.update();
  var c = goog.dom.$("status");
  c.innerHTML = "Options Saved.";
  c.style.webkitAnimationName = "";
  setTimeout(function() {
    c.style.webkitAnimationName = "op-status-display";
    c.style.webkitAnimationDuration = "2s"
  }, 0)
};
updater.OptionsPage.prototype.restoreOptions = function() {
  this.selectOption("platform", updater.Settings.platform);
  this.selectOption("repository", updater.Settings.snapshotRepository);
  if(updater.Settings.useInstaller == "true") {
    goog.dom.$("installer-enabled").checked = true
  }else {
    goog.dom.$("installer-disabled").checked = true
  }
  goog.dom.$("check-continuously").checked = updater.Settings.checkContinuously == "true";
  goog.dom.$("check-interval").value = updater.Settings.checkInterval;
  this.platformUpdated()
};
updater.OptionsPage.prototype.selectOption = function(b, c) {
  if(c) {
    b = goog.dom.$(b);
    for(var d = 0;d < b.children.length;d++) {
      var e = b.children[d];
      if(e.value == c) {
        e.selected = "true";
        break
      }
    }
  }
};
updater.RevisionModel = function() {
  a.version = -1;
  a.changeLog = ""
};
updater.Repositories = {};
var FILE_NAMES_ = [];
FILE_NAMES_.Android = "chrome-android.zip";
FILE_NAMES_.Linux = "chrome-linux.zip";
FILE_NAMES_.Linux_x64 = "chrome-linux.zip";
FILE_NAMES_.Linux_ChromiumOS = "chrome-linux.zip";
FILE_NAMES_.Mac = "chrome-mac.zip";
FILE_NAMES_.Win = "chrome-win32.zip";
FILE_NAMES_.Win_x64 = "chrome-win32.zip";
FILE_NAMES_["Win-installer"] = "mini_installer.exe";
updater.Repositories.continuous = {name:"continuous", latestBaseUrl:"http://commondatastorage.googleapis.com/chromium-browser-continuous/", downloadBaseUrl:"http://commondatastorage.googleapis.com/chromium-browser-continuous/", getLatestUrl:function(b) {
  return this.latestBaseUrl + b + "/LAST_CHANGE"
}, getDownloadUrl:function(b, c) {
  var d = FILE_NAMES_[b];
  if(b == "Win" && updater.Settings.useInstaller == "true") {
    d = FILE_NAMES_["Win-installer"]
  }
  return this.downloadBaseUrl + b + "/" + c.toString() + "/" + d
}, getChangeLogUrl:function(b, c) {
  return this.downloadBaseUrl + b + "/" + c.toString() + "/changelog.xml"
}};
updater.Repositories.snapshot = {name:"snapshot", latestBaseUrl:"http://commondatastorage.googleapis.com/chromium-browser-snapshots/", downloadBaseUrl:"http://commondatastorage.googleapis.com/chromium-browser-snapshots/", getLatestUrl:function(b) {
  return this.latestBaseUrl + b + "/LAST_CHANGE"
}, getDownloadUrl:function(b, c) {
  var d = FILE_NAMES_[b];
  if(b == "Win" && updater.Settings.useInstaller == "true") {
    d = FILE_NAMES_["Win-installer"]
  }
  return this.downloadBaseUrl + b + "/" + c.toString() + "/" + d
}, getChangeLogUrl:function(b, c) {
  return this.downloadBaseUrl + b + "/" + c.toString() + "/changelog.xml"
}};
updater.SettingsManager = function() {
};
updater.SettingsManager.prototype.__defineGetter__("useInstaller", function() {
  var b = !0;
  null != localStorage.useInstaller && (b = localStorage.useInstaller);
  return b
});
updater.SettingsManager.prototype.__defineSetter__("useInstaller", function(b) {
  localStorage.useInstaller = b
});
updater.SettingsManager.prototype.__defineGetter__("platform", function() {
  return localStorage.platform || this.defaultPlatform
});
updater.SettingsManager.prototype.__defineGetter__("defaultPlatform", function() {
  return goog.userAgent.LINUX ? "Linux" : goog.userAgent.MAC ? "Mac" : "Win"
});
updater.SettingsManager.prototype.__defineSetter__("platform", function(b) {
  localStorage.platform = b;
  this.latestDownloadedRevision = -1
});
updater.SettingsManager.prototype.__defineGetter__("latestDownloadedRevision", function() {
  return localStorage.latestDownloadedRevision || -1
});
updater.SettingsManager.prototype.__defineSetter__("latestDownloadedRevision", function(b) {
  localStorage.latestDownloadedRevision = b
});
updater.SettingsManager.prototype.__defineGetter__("currentRepository", function() {
  return updater.Repositories[this.snapshotRepository]
});
updater.SettingsManager.prototype.__defineGetter__("snapshotRepository", function() {
  return localStorage.snapshotRepository || "continuous"
});
updater.SettingsManager.prototype.__defineSetter__("snapshotRepository", function(b) {
  localStorage.snapshotRepository = b
});
updater.SettingsManager.prototype.__defineGetter__("checkContinuously", function() {
  return localStorage.checkContinuously || "false"
});
updater.SettingsManager.prototype.__defineSetter__("checkContinuously", function(b) {
  localStorage.checkContinuously = b
});
updater.SettingsManager.prototype.__defineGetter__("checkInterval", function() {
  return localStorage.checkInterval || "60"
});
updater.SettingsManager.prototype.__defineSetter__("checkInterval", function(b) {
  localStorage.checkInterval = b
});
updater.SettingsManager.prototype.__defineGetter__("canCheckContinuously", function() {
  return this.checkContinuously == "true" && parseInt(this.checkInterval, 10) > 0
});
updater.Settings = new updater.SettingsManager;
updater.SnapshotPopup = function() {
  this.skipLoading = false;
  this.init()
};
a = updater.SnapshotPopup.prototype;
a.init = function() {
  var b = this, c = chrome.extension.getBackgroundPage().snapshot;
  function d() {
    if(b.skipLoading && c.status == updater.ChromiumSnapshotStatus.loading) {
      b.skipLoading = false
    }else {
      b.display()
    }
  }
  c.addEventListener(updater.ChromiumSnapshot.STATUS_UPDATED, d);
  goog.events.listen(window, "unload", function() {
    c.removeEventListener(updater.ChromiumSnapshot.STATUS_UPDATED, d)
  });
  b.retrieveChangeLog()
};
a.retrieveChangeLog = function() {
  this.display()
};
a.display = function() {
  goog.dom.removeChildren(document.body);
  var b = goog.dom.$dom("div"), c = chrome.extension.getBackgroundPage().snapshot.status;
  if(c == updater.ChromiumSnapshotStatus.loaded) {
    var d = chrome.extension.getBackgroundPage();
    c = d.snapshot.changeLogMessage;
    if(c != null && c.length > 0) {
      c = c.replace(/\. /g, ". <br />")
    }
    c = c.replace(/\.\n\n/g, ".<br /><br />");
    var e = d.snapshot.changeLogRevision, f = d.snapshot.downloadLink;
    d = d.snapshot.platform;
    b.innerHTML = updater.t.Popup.loaded({href:f, revision:e, msg:c, platform:d, prevRevision:updater.Settings.latestDownloadedRevision})
  }else {
    if(c == updater.ChromiumSnapshotStatus.loading) {
      b.innerHTML = updater.t.Popup.loading()
    }else {
      if(c == updater.ChromiumSnapshotStatus.error) {
        b.innerHTML = updater.t.Popup.error()
      }else {
        if(c == updater.ChromiumSnapshotStatus.none) {
          b.innerHTML = updater.t.Popup.none()
        }
      }
    }
  }
  goog.dom.appendChild(document.body, b)
};
a.recordDownload = function(b) {
  if(b != null) {
    b = b.trim();
    if(b.length > 0) {
      updater.Settings.latestDownloadedRevision = b;
      chrome.extension.getBackgroundPage().snapshot.update()
    }
  }
};
a.refresh = function() {
  this.skipLoading = true;
  chrome.extension.getBackgroundPage().snapshot.update()
};
goog.string.StringBuffer = function(b) {
  this.buffer_ = "";
  goog.string.StringBuffer.prototype.toString = function() {
    return this.buffer_
  };
  null != b && this.append.apply(this, arguments);
  goog.string.StringBuffer.prototype.append = function(b, e) {
    this.buffer_ += b;
    if(null != e) {
      for(var f = 1;f < arguments.length;++f) {
        this.buffer_ += arguments[f]
      }
    }
    return this
  }
};
var soy = {};
soy.StringBuilder = goog.string.StringBuffer;
soy.$$escapeHtml = function(b) {
  return goog.string.htmlEscape(String(b))
};
updater.t = {};
updater.t.Options = {};
updater.t.Options.page = function(b, c) {
  b = c || new soy.StringBuilder;
  b.append('\t<div class="panel"><h1>Options</h1><div class="form"><div id="platform-panel"><label>Select the platform you would like to monitor:</label><div id="status"></div><fieldset><select id="platform"><option value="Android">Android</option><option value="Linux">Linux</option><option value="Linux_x64">Linux 64</option><option value="Mac" selected> Mac OS X</option><option value="Win">Windows</option></select></fieldset></div><div id="installer-panel"><label>Would you like to download the installer or zip:</label><fieldset><div><input id="installer-enabled" name="installer" type="radio"> <label for="installer-enabled">Installer</label></div><div><input id="installer-disabled" name="installer" type="radio"> <label for="installer-disabled">Zip</label></div></fieldset></div><div id="repository-panel"><label>Select the repository you would like to monitor:</label><fieldset><select id="repository"><option value="continuous" selected>Continuous (Passed Tests)</option><option value="snapshot">All Snapshots (May Not Have Passed All Tests)</option></select></fieldset></div><div id="check-continuously-panel"><label>Would you like to check for updates at regular intervals:</label><fieldset><div><input id="check-continuously" type="checkbox"> <label for="check-continuously">Check Every</label> <input id="check-interval" class="validate-as-number" type="text" size="4" /> Minutes</div></fieldset></div><div class="buttons"><a id="saveButton" href="#">Save</a></div></div></div><div id="footer"><div id="copyright">Brought to you by: HeavensRevenge &lt;ultimate.evil gmail.com&gt;</div></div>');
  if(!c) {
    return b.toString()
  }
};
updater.t.Popup = {};
updater.t.Popup.loading = function(b, c) {
  b = c || new soy.StringBuilder;
  b.append('\t<div class="panel"><h1>Loading...</h1><div class="content"><p class="msg">Attempting to contact the servers.</p></div><div class="buttons">');
  updater.t.Popup.refreshButton(null, b);
  b.append("</div></div>");
  if(!c) {
    return b.toString()
  }
};
updater.t.Popup.error = function(b, c) {
  b = c || new soy.StringBuilder;
  b.append('\t<div class="panel"><h1>Error</h1><div class="content"><p class="message">An error has occured.</p></div><div class="buttons">');
  updater.t.Popup.refreshButton(null, b);
  b.append("</div></div>");
  if(!c) {
    return b.toString()
  }
};
updater.t.Popup.none = function(b, c) {
  b = c || new soy.StringBuilder;
  b.append('\t<div class="panel"><h1>Needs Initialization</h1><div class="content"><p class="msg">Please hit the refresh button.</p></div><div class="buttons">');
  updater.t.Popup.refreshButton(null, b);
  b.append("</div></div>");
  if(!c) {
    return b.toString()
  }
};
updater.t.Popup.loaded = function(b, c) {
  var e = c || new soy.StringBuilder;
  e.append('\t<div class="panel"><h1>Latest Chromium Snapshot Information</h1><div class="content">');
  updater.t.Popup.platformInfo({platform:b.platform}, e);
  updater.t.Popup.prevRevision({prevRevision:b.prevRevision}, e);
  updater.t.Popup.revisionInfo({revision:b.revision}, e);
  updater.t.Popup.changeLogInfo({msg:b.msg}, e);
  e.append('</div><div class="buttons">');
  updater.t.Popup.downloadButton({href:b.href, revision:b.revision}, e);
  updater.t.Popup.refreshButton(null, e);
  e.append("</div></div>");
  if(!c) {
    return e.toString()
  }
};
updater.t.Popup.platformInfo = function(b, c) {
  var e = c || new soy.StringBuilder;
  e.append('\t<div class="section inline"><h2>Platform</h2><div class="platform">', soy.$$escapeHtml(b.platform), "</div></div>");
  if(!c) {
    return e.toString()
  }
};
updater.t.Popup.revisionInfo = function(b, c) {
  var e = c || new soy.StringBuilder;
  e.append('\t<div class="section inline"><h2>Latest Revision</h2><div class="revision">', soy.$$escapeHtml(b.revision), "</div></div>");
  if(!c) {
    return e.toString()
  }
};
updater.t.Popup.changeLogInfo = function(b, c) {
  var e = c || new soy.StringBuilder;
  e.append('\t<div class="section"><h2>Most Recent Changelog</h2><div class="changeLog">', b.msg, "</div></div>");
  if(!c) {
    return e.toString()
  }
};
updater.t.Popup.downloadButton = function(b, c) {
  var e = c || new soy.StringBuilder;
  e.append('\t<div class="link"><a href="', soy.$$escapeHtml(b.href), '" id="download" target="_blank">Download</a></div>');
  if(!c) {
    return e.toString()
  }
};
updater.t.Popup.refreshButton = function(b, c) {
  b = c || new soy.StringBuilder;
  b.append('\t<div class="link"><a id="refresh" target="_blank">Refresh</a></div>');
  if(!c) {
    return b.toString()
  }
};
updater.t.Popup.prevRevision = function(b, c) {
  var e = c || new soy.StringBuilder;
  e.append("\t", null != b.prevRevision && 0 < b.prevRevision.length && -1 != b.prevRevision ? '<div class="section inline"><h2>Previously Downloaded Revision</h2><div class="revision">' + soy.$$escapeHtml(b.prevRevision) + "</div></div>" : "");
  if(!c) {
    return e.toString()
  }
};
