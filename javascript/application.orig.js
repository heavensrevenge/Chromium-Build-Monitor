var a, goog = goog || {};
goog.global = this;
goog.nullFunction = function() {
};
goog.typeOf = function(b) {
  var c = typeof b;
  if(c == "object") {
    if(b) {
      if(b instanceof Array || !(b instanceof Object) && Object.prototype.toString.call(b) == "[object Array]" || typeof b.length == "number" && typeof b.splice != "undefined" && typeof b.propertyIsEnumerable != "undefined" && !b.propertyIsEnumerable("splice")) {
        return"array"
      }
      if(!(b instanceof Object) && (Object.prototype.toString.call(b) == "[object Function]" || typeof b.call != "undefined" && typeof b.propertyIsEnumerable != "undefined" && !b.propertyIsEnumerable("call"))) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if(c == "function" && typeof b.call == "undefined") {
      return"object"
    }
  }
  return c
};
goog.isArray = function(b) {
  return goog.typeOf(b) == "array"
};
goog.isArrayLike = function(b) {
  var c = goog.typeOf(b);
  return c == "array" || c == "object" && typeof b.length == "number"
};
goog.isString = function(b) {
  return typeof b == "string"
};
goog.isFunction = function(b) {
  return goog.typeOf(b) == "function"
};
goog.isObject = function(b) {
  b = goog.typeOf(b);
  return b == "object" || b == "array" || b == "function"
};
goog.inherits = function(b, c) {
  function d() {
  }
  d.prototype = c.prototype;
  b.superClass_ = c.prototype;
  b.prototype = new d;
  b.prototype.constructor = b
};
goog.array = {};
goog.array.indexOf = Array.prototype.indexOf ? function(b, c, d) {
  return Array.prototype.indexOf.call(b, c, d)
} : function(b, c, d) {
  for(d = d = d == null ? 0 : d < 0 ? Math.max(0, b.length + d) : d;d < b.length;d++) {
    if(d in b && b[d] === c) {
      return d
    }
  }
  return-1
};
goog.array.forEach = Array.prototype.forEach ? function(b, c, d) {
  Array.prototype.forEach.call(b, c, d)
} : function(b, c, d) {
  for(var e = b.length, f = goog.isString(b) ? b.split("") : b, g = 0;g < e;g++) {
    g in f && c.call(d, f[g], g, b)
  }
};
goog.array.contains = function(b, c) {
  return goog.array.indexOf(b, c) >= 0
};
goog.array.remove = function(b, c) {
  c = goog.array.indexOf(b, c);
  var d;
  if(d = c >= 0) {
    goog.array.removeAt(b, c)
  }
  return d
};
goog.array.removeAt = function(b, c) {
  return Array.prototype.splice.call(b, c, 1).length == 1
};
goog.array.clone = function(b) {
  if(goog.isArray(b)) {
    return b.concat()
  }else {
    for(var c = [], d = 0, e = b.length;d < e;d++) {
      c[d] = b[d]
    }
    return c
  }
};
goog.Disposable = function() {
};
a = goog.Disposable.prototype;
a.disposed_ = false;
a.dispose = function() {
  if(!a.disposed_) {
    a.disposed_ = true;
  }
};
goog.dispose = function(b) {
  b && typeof b.dispose == "function" && b.dispose()
};
goog.events = {};
goog.events.Event = function(b, c) {
  goog.Disposable.call(a);
  a.type = b;
  a.currentTarget = a.target = c
};
goog.inherits(goog.events.Event, goog.Disposable);
a = goog.events.Event.prototype;
a.propagationStopped_ = false;
a.returnValue_ = true;
a.preventDefault = function() {
  a.returnValue_ = false
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
  return b.indexOf(c) != -1
};
goog.string.compareVersions = function(b, c) {
  var d = 0;
  goog.string.compareElements_ = function(b, c) {
    if(b < c) {
      return-1
    }else {
      if(b > c) {
        return 1
      }
    }
    return 0
  };
  b = goog.string.trim(String(b)).split(".");
  c = goog.string.trim(String(c)).split(".");
  for(var e = Math.max(b.length, c.length), f = 0;d == 0 && f < e;f++) {
    var g = b[f] || "", h = c[f] || "", i = new RegExp("(\\d*)(\\D*)", "g"), j = new RegExp("(\\d*)(\\D*)", "g");
    do {
      var k = i.exec(g) || ["", "", ""], l = j.exec(h) || ["", "", ""];
      if(k[0].length == 0 && l[0].length == 0) {
        break
      }
      d = k[1].length == 0 ? 0 : parseInt(k[1], 10);
      var n = l[1].length == 0 ? 0 : parseInt(l[1], 10);
      d = goog.string.compareElements_(d, n) || goog.string.compareElements_(k[2].length == 0, l[2].length == 0) || goog.string.compareElements_(k[2], l[2])
    }while(d == 0)
  }
  return d
};
goog.userAgent = {};
goog.userAgent.ASSUME_WEBKIT = true;
goog.userAgent.ASSUME_MOBILE_WEBKIT = false;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT;
goog.userAgent.getUserAgentString = function() {
  return goog.global.navigator ? goog.global.navigator.userAgent : null
};
goog.userAgent.getNavigator = function() {
  return goog.global.navigator
};
goog.userAgent.init_ = function() {
  goog.userAgent.detectedWebkit_ = false;
  goog.userAgent.detectedMobile_ = false;
  var b;
  if(!goog.userAgent.BROWSER_KNOWN_ && (b = goog.userAgent.getUserAgentString())) {
    var c = goog.userAgent.getNavigator();
    goog.userAgent.detectedWebkit_ = b.indexOf("WebKit") != -1;
    goog.userAgent.detectedMobile_ = goog.userAgent.detectedWebkit_ && b.indexOf("Mobile") != -1
  }
};
goog.userAgent.BROWSER_KNOWN_ || goog.userAgent.init_();
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.userAgent.detectedWebkit_;
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.detectedMobile_;
goog.userAgent.determinePlatform_ = function() {
  var b = goog.userAgent.getNavigator();
  return b && b.platform || ""
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = false;
goog.userAgent.ASSUME_WINDOWS = false;
goog.userAgent.ASSUME_LINUX = false;
goog.userAgent.ASSUME_X11 = false;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11;
goog.userAgent.initPlatform_ = function() {
  goog.userAgent.detectedMac_ = goog.string.contains(goog.userAgent.PLATFORM, "Mac");
  goog.userAgent.detectedWindows_ = goog.string.contains(goog.userAgent.PLATFORM, "Win");
  goog.userAgent.detectedLinux_ = goog.string.contains(goog.userAgent.PLATFORM, "Linux");
  goog.userAgent.detectedX11_ = !!goog.userAgent.getNavigator() && goog.string.contains(goog.userAgent.getNavigator().appVersion || "", "X11")
};
goog.userAgent.PLATFORM_KNOWN_ || goog.userAgent.initPlatform_();
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.userAgent.detectedMac_;
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.userAgent.detectedWindows_;
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.detectedLinux_;
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.detectedX11_;
goog.userAgent.determineVersion_ = function() {
  var b = "", c;
  if(goog.userAgent.WEBKIT) {
    c = /WebKit\/(\S+)/
  }
  if(c) {
    b = (b = c.exec(goog.userAgent.getUserAgentString())) ? b[1] : ""
  }
  return b
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.isVersion = function(b) {
  goog.userAgent.isVersionCache_ = {};
  return goog.userAgent.isVersionCache_[b] || (goog.userAgent.isVersionCache_[b] = goog.string.compareVersions(goog.userAgent.VERSION, b) >= 0)
};
goog.events.BrowserEvent = function(b, c) {
  b && this.init(b, c)
};
goog.inherits(goog.events.BrowserEvent, goog.events.Event);
goog.events.BrowserEvent.MouseButton = {LEFT:0, MIDDLE:1, RIGHT:2};
a = goog.events.BrowserEvent.prototype;
a.target = null;
a.relatedTarget = null;
a.offsetX = 0;
a.offsetY = 0;
a.clientX = 0;
a.clientY = 0;
a.screenX = 0;
a.screenY = 0;
a.button = 0;
a.keyCode = 0;
a.charCode = 0;
a.ctrlKey = false;
a.altKey = false;
a.shiftKey = false;
a.metaKey = false;
a.event_ = null;
a.init = function(b, c) {
  var d = a.type = b.type;
  a.target = b.target || b.srcElement;
  a.currentTarget = c;
  if(d == "mouseover") {
    c = b.fromElement
  }else {
    if(d == "mouseout") {
      c = b.toElement
    }
  }
  a.relatedTarget = c;
  a.offsetX = b.offsetX !== undefined ? b.offsetX : b.layerX;
  a.offsetY = b.offsetY !== undefined ? b.offsetY : b.layerY;
  a.clientX = b.clientX !== undefined ? b.clientX : b.pageX;
  a.clientY = b.clientY !== undefined ? b.clientY : b.pageY;
  a.screenX = b.screenX || 0;
  a.screenY = b.screenY || 0;
  a.button = b.button;
  a.keyCode = b.keyCode || 0;
  a.charCode = b.charCode || (d == "keypress" ? b.keyCode : 0);
  a.ctrlKey = b.ctrlKey;
  a.altKey = b.altKey;
  a.shiftKey = b.shiftKey;
  a.metaKey = b.metaKey;
  a.event_ = b;
  delete a.returnValue_;
  delete a.propagationStopped_
};
goog.events.Listener = function() {
};
goog.events.Listener.counter_ = 0;
a = goog.events.Listener.prototype;
a.key = 0;
a.removed = false;
a.callOnce = false;
a.init = function(b, c, d, e, f, g) {
  var h = this;
  if(goog.isFunction(b)) {
    h.isFunctionListener_ = true
  }else {
    if(b && b.handleEvent && goog.isFunction(b.handleEvent)) {
      h.isFunctionListener_ = false
    }
  }
  h.listener = b;
  h.proxy = c;
  h.src = d;
  h.type = e;
  h.capture = !!f;
  h.handler = g;
  h.callOnce = false;
  h.key = ++goog.events.Listener.counter_;
  h.removed = false
};
a.handleEvent = function(b) {
  if(this.isFunctionListener_) {
    return this.listener.call(this.handler || this.src, b)
  }
  return this.listener.handleEvent.call(this.listener, b)
};
goog.structs = {};
goog.structs.SimplePool = function(b, c) {
  goog.Disposable.call(a);
  a.maxCount_ = c;
  a.freeQueue_ = [];
  a.createInitial_(b)
};
goog.inherits(goog.structs.SimplePool, goog.Disposable);
a = goog.structs.SimplePool.prototype;
a.createObjectFn_ = null;
a.disposeObjectFn_ = null;
a.setCreateObjectFn = function(b) {
  a.createObjectFn_ = b
};
a.getObject = function() {
  if(a.freeQueue_.length) {
    return a.freeQueue_.pop()
  }
  return a.createObject()
};
a.releaseObject = function(b) {
  a.freeQueue_.length < a.maxCount_ ? a.freeQueue_.push(b) : a.disposeObject(b)
};
a.createInitial_ = function(b) {
  for(var c = 0;c < b;c++) {
    a.freeQueue_.push(a.createObject())
  }
};
a.createObject = function() {
  return a.createObjectFn_ ? a.createObjectFn_() : {}
};
a.disposeObject = function(b) {
  if(a.disposeObjectFn_) {
    a.disposeObjectFn_(b)
  }else {
    if(goog.isFunction(b.dispose)) {
      b.dispose()
    }else {
      for(var c in b) {
        delete b[c]
      }
    }
  }
};
goog.events.pools = {};
(function() {
  function b() {
    return{count_:0, remaining_:0}
  }
  function c() {
    return[]
  }
  function d() {
    function m(p) {
      return h.call(m.src, m.key, p)
    }
    return m
  }
  function e() {
    return new goog.events.Listener
  }
  function f() {
    return new goog.events.BrowserEvent
  }
  var g = null;
  goog.events.pools.setProxyCallbackFunction = function(m) {
    h = m
  };
  if(g) {
    goog.events.pools.getObject = function() {
      return j.getObject()
    };
    goog.events.pools.releaseObject = function(m) {
      j.releaseObject(m)
    };
    goog.events.pools.getArray = function() {
      return k.getObject()
    };
    goog.events.pools.releaseArray = function(m) {
      k.releaseObject(m)
    };
    goog.events.pools.getProxy = function() {
      return l.getObject()
    };
    goog.events.pools.releaseProxy = function() {
      l.releaseObject(d())
    };
    goog.events.pools.getListener = function() {
      return n.getObject()
    };
    goog.events.pools.releaseListener = function(m) {
      n.releaseObject(m)
    };
    goog.events.pools.getEvent = function() {
      return o.getObject()
    };
    goog.events.pools.releaseEvent = function(m) {
      o.releaseObject(m)
    };
    g = null;
    var i = 600, j = new goog.structs.SimplePool(g, i);
    j.setCreateObjectFn(b);
    g = null;
    i = 600;
    var k = new goog.structs.SimplePool(g, i);
    k.setCreateObjectFn(c);
    g = null;
    i = 600;
    var l = new goog.structs.SimplePool(g, i);
    l.setCreateObjectFn(d);
    g = null;
    i = 600;
    var n = new goog.structs.SimplePool(g, i);
    n.setCreateObjectFn(e);
    g = null;
    i = 600;
    var o = new goog.structs.SimplePool(g, i);
    o.setCreateObjectFn(f)
  }else {
    goog.events.pools.getObject = b;
    goog.events.pools.releaseObject = goog.nullFunction;
    goog.events.pools.getArray = c;
    goog.events.pools.releaseArray = goog.nullFunction;
    goog.events.pools.getProxy = d;
    goog.events.pools.releaseProxy = goog.nullFunction;
    goog.events.pools.getListener = e;
    goog.events.pools.releaseListener = goog.nullFunction;
    goog.events.pools.getEvent = f;
    goog.events.pools.releaseEvent = goog.nullFunction
  }
})();
goog.object = {};
goog.object.forEach = function(b, d) {
  for(var e in b) {
    c.call(d, b[e], e, b)
  }
};
goog.events.listeners_ = {};
goog.events.listenerTree_ = {};
goog.events.sources_ = {};
goog.events.onString_ = "on";
goog.events.listen = function(b, c, d, e, f) {
  if(c) {
    if(goog.isArray(c)) {
      for(var g = 0;g < c.length;g++) {
        goog.events.listen(b, c[g], d, e, f)
      }
      return null
    }else {
      e = !!e;
      var h = goog.events.listenerTree_;
      c in h || (h[c] = goog.events.pools.getObject());
      h = h[c];
      if(!(e in h)) {
        h[e] = goog.events.pools.getObject();
        h.count_++
      }
      h = h[e];
      var i = 1, j;
      h.remaining_++;
      if(h[i]) {
        j = h[i];
        for(g = 0;g < j.length;g++) {
          h = j[g];
          if(h.listener == d && h.handler == f) {
            if(h.removed) {
              break
            }
            return j[g].key
          }
        }
      }else {
        j = h[i] = goog.events.pools.getArray();
        h.count_++
      }
      g = goog.events.pools.getProxy();
      g.src = b;
      h = goog.events.pools.getListener();
      h.init(d, g, b, c, e, f);
      d = h.key;
      g.key = d;
      j.push(h);
      goog.events.listeners_[d] = h;
      goog.events.sources_[i] || (goog.events.sources_[i] = goog.events.pools.getArray());
      goog.events.sources_[i].push(h);
      if(b.addEventListener) {
        if(b == goog.global) {
          b.addEventListener(c, g, e)
        }
      }else {
        b.attachEvent(goog.events.getOnString_(c), g)
      }
      return d
    }
  }
};
goog.events.unlisten = function(b, c, d, e, f) {
  if(goog.isArray(c)) {
    for(var g = 0;g < c.length;g++) {
      goog.events.unlisten(b, c[g], d, e, f)
    }
    return null
  }
  e = !!e;
  b = goog.events.getListeners_(b, c, e);
  if(!b) {
    return false
  }
  for(g = 0;g < b.length;g++) {
    if(b[g].listener == d && b[g].capture == e && b[g].handler == f) {
      return goog.events.unlistenByKey(b[g].key)
    }
  }
  return false
};
goog.events.unlistenByKey = function(b) {
  if(!goog.events.listeners_[b]) {
    return false
  }
  var c = goog.events.listeners_[b];
  if(c.removed) {
    return false
  }
  var d = c.src, e = c.type, f = c.proxy, g = c.capture;
  if(d.removeEventListener) {
    if(d == goog.global) {
      d.removeEventListener(e, f, g)
    }
  }else {
    d.detachEvent && d.detachEvent(goog.events.getOnString_(e), f)
  }
  f = goog.events.listenerTree_[e][g][d];
  if(goog.events.sources_[d]) {
    var h = goog.events.sources_[d];
    goog.array.remove(h, c);
    h.length == 0 && delete goog.events.sources_[d]
  }
  c.removed = true;
  f.needsCleanup_ = true;
  delete goog.events.listeners_[b];
  return true
};
goog.events.cleanUp_ = function(b, c, d, e) {
  if(!e.locked_) {
    if(e.needsCleanup_) {
      for(var f = 0, g = 0;f < e.length;f++) {
        if(e[f].removed) {
          var h = e[f].proxy;
          h.src = null;
          goog.events.pools.releaseProxy();
          goog.events.pools.releaseListener(e[f])
        }else {
          if(f != g) {
            e[g] = e[f]
          }
          g++
        }
      }
      e.length = g;
      e.needsCleanup_ = false;
      if(g == 0) {
        goog.events.pools.releaseArray(e);
        delete goog.events.listenerTree_[b][c][d];
        goog.events.listenerTree_[b][c].count_--;
        if(goog.events.listenerTree_[b][c].count_ == 0) {
          goog.events.pools.releaseObject(goog.events.listenerTree_[b][c]);
          delete goog.events.listenerTree_[b][c];
          goog.events.listenerTree_[b].count_--
        }
        if(goog.events.listenerTree_[b].count_ == 0) {
          goog.events.pools.releaseObject(goog.events.listenerTree_[b]);
          delete goog.events.listenerTree_[b]
        }
      }
    }
  }
};
goog.events.removeAll = function(b) {
  var e = 0, f = b == null, g = c == null, h = d == null;
  d = !!d;
  if(f) {
    goog.object.forEach(goog.events.sources_, function(j) {
      for(var k = j.length - 1;k >= 0;k--) {
        var l = j[k];
        if((g || c == l.type) && (h || d == l.capture)) {
          goog.events.unlistenByKey(l.key);
          e++
        }
      }
    })
  }else {
    if(goog.events.sources_[b]) {
      b = goog.events.sources_[b];
      for(f = b.length - 1;f >= 0;f--) {
        var i = b[f];
        if((g || c == i.type) && (h || d == i.capture)) {
          goog.events.unlistenByKey(i.key);
          e++
        }
      }
    }
  }
  return e
};
goog.events.getListeners = function(b, c, d) {
  return goog.events.getListeners_(b, c, d) || []
};
goog.events.getListeners_ = function(b, c, d) {
  var e = goog.events.listenerTree_;
  if(c in e) {
    e = e[c];
    if(d in e) {
      e = e[d];
      if(e[b]) {
        return e[b]
      }
    }
  }
  return null
};
goog.events.fireListeners = function(b, c, d, e) {
  var f = goog.events.listenerTree_;
  if(c in f) {
    f = f[c];
    if(d in f) {
      return goog.events.fireListeners_(f[d], b, c, d, e)
    }
  }
  return true
};
goog.events.fireListeners_ = function(b, c, d, e, f) {
  var g = 1;
  if(b[c]) {
    b.remaining_--;
    b = b[c];
    if(b.locked_) {
      b.locked_++
    }else {
      b.locked_ = 1
    }
    try {
      for(var h = b.length, i = 0;i < h;i++) {
        var j = b[i];
        if(j && !j.removed) {
          g &= goog.events.fireListener(j, f) !== false
        }
      }
    }finally {
      b.locked_--;
      goog.events.cleanUp_(d, e, c, b)
    }
  }
  return Boolean(g)
};
goog.events.fireListener = function(b, c) {
  c = b.handleEvent(c);
  b.callOnce && goog.events.unlistenByKey(b.key);
  return c
};
goog.events.dispatchEvent = function(b, c) {
  if(goog.isString(c)) {
    c = new goog.events.Event(c, b)
  }else {
    if(c instanceof goog.events.Event) {
      c.target = c.target || b
    }
  }
  d = 1;
  var e, f = c.type, g = goog.events.listenerTree_;
  if(!(f in g)) {
    return true
  }
  g = g[f];
  f = true in g;
  var h;
  if(f) {
    e = [];
    for(h = b;h;h = h.getParentEventTarget()) {
      e.push(h)
    }
    h = g[true];
    h.remaining_ = h.count_;
    for(var i = e.length - 1;!c.propagationStopped_ && i >= 0 && h.remaining_;i--) {
      c.currentTarget = e[i];
      d &= goog.events.fireListeners_(h, e[i], c.type, true, c) && c.returnValue_ != false
    }
  }
  if(h = false in g) {
    h = g[false];
    h.remaining_ = h.count_;
    if(f) {
      for(i = 0;!c.propagationStopped_ && i < e.length && h.remaining_;i++) {
        c.currentTarget = e[i];
        d &= goog.events.fireListeners_(h, e[i], c.type, false, c) && c.returnValue_ != false
      }
    }else {
      for(b = b;!c.propagationStopped_ && b && h.remaining_;b = b.getParentEventTarget()) {
        c.currentTarget = b;
        d &= goog.events.fireListeners_(h, b, c.type, false, c) && c.returnValue_ != false
      }
    }
  }
  return Boolean(d)
};
goog.events.handleBrowserEvent_ = function(b, c) {
  if(!goog.events.listeners_[b]) {
    return true
  }
  b = goog.events.listeners_[b];
  var d = b.type, e = goog.events.listenerTree_;
  if(!(d in e)) {
    return true
  }
  e = e[d];
  var f, g;
  g = new goog.events.BrowserEvent(c, a);
  try {
    f = goog.events.fireListener(b, g)
  }finally {
    g.dispose()
  }
  return f
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
a.addEventListener = function(b, c, d, e) {
  goog.events.listen(this, b, c, d, e)
};
a.removeEventListener = function(b, c, d, e) {
  goog.events.unlisten(this, b, c, d, e)
};
a.dispatchEvent = function(b) {
  return goog.events.dispatchEvent(this, b)
};
var mbrio = {};
mbrio.ChromiumSnapshotStatus = {};
var BADGE_COLOR_ = {color:[255, 202, 28, 255]};
mbrio.ChromiumSnapshotStatus.none = "none";
mbrio.ChromiumSnapshotStatus.loading = "loading";
mbrio.ChromiumSnapshotStatus.loaded = "loaded";
mbrio.ChromiumSnapshotStatus.error = "error";
mbrio.ChromiumSnapshot = function() {
  goog.events.EventTarget.call(a);
  this.revisionModel_ = new mbrio.RevisionModel;
  this.updateInterval_ = this.icon_ = this.loadingAnimation_ = null;
  var b = this;
  goog.events.listen(window, "unload", function() {
    b.stopUpdateInterval()
  });
  a.currentRequest_ = null;
  a.status = mbrio.ChromiumSnapshotStatus.none;
  b.initIcon();
  b.init()
};
goog.inherits(mbrio.ChromiumSnapshot, goog.events.EventTarget);
mbrio.ChromiumSnapshot.STATUS_UPDATED = "statusupdated";
mbrio.ChromiumSnapshot.prototype.__defineGetter__("status", function() {
  return this.status_
});
mbrio.ChromiumSnapshot.prototype.__defineSetter__("status", function(b) {
  this.status_ = b;
  this.dispatchEvent(mbrio.ChromiumSnapshot.STATUS_UPDATED)
});
mbrio.ChromiumSnapshot.prototype.__defineGetter__("icon", function() {
  return this.icon_
});
mbrio.ChromiumSnapshot.prototype.__defineGetter__("platform", function() {
  return mbrio.Settings.platform
});
mbrio.ChromiumSnapshot.prototype.__defineGetter__("downloadLink", function() {
  return mbrio.Settings.currentRepository.getDownloadUrl(this.platform, this.revisionModel_.version)
});
mbrio.ChromiumSnapshot.prototype.__defineGetter__("changeLogMessage", function() {
  return this.queryChangeLog("/changelogs/log/child::logentry[position()=last()]/child::msg/text()", "")
});
mbrio.ChromiumSnapshot.prototype.__defineGetter__("changeLogRevision", function() {
  return this.queryChangeLog("/changelogs/log/child::logentry[position()=last()]/attribute::revision", "-1")
});
mbrio.ChromiumSnapshot.prototype.__defineGetter__("version", function() {
  return this.revisionModel_.version
});
mbrio.ChromiumSnapshot.prototype.__defineGetter__("changeLog", function() {
  return this.revisionModel_.changeLog
});
a = mbrio.ChromiumSnapshot.prototype;
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
  this.icon_ = new mbrio.Icon;
  this.loadingAnimation_ = new mbrio.LoadingAnimation(this)
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
    c.revisionModel_.version = b;
    if(c.revisionModel_.version > mbrio.Settings.latestDownloadedRevision) {
      chrome.browserAction.setBadgeBackgroundColor(BADGE_COLOR_);
      chrome.browserAction.setBadgeText({text:"new"});
      c.icon_.displayUpToDate = false
    }else {
      chrome.browserAction.setBadgeText({text:""});
      c.icon_.displayUpToDate = true
    }
  }
};
a.startUpdateInterval = function() {
  var b = this;
  b.stopUpdateInterval();
  if(mbrio.Settings.canCheckContinuously) {
    b.updateInterval_ = setTimeout(function() {
      b.update()
    }, parseInt(mbrio.Settings.checkInterval) * 6E4)
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
  b.status = mbrio.ChromiumSnapshotStatus.loading;
  b.icon_.displayError = false;
  b.loadingAnimation_.start();
  b.request(mbrio.Settings.currentRepository.getLatestUrl(b.platform), function(c) {
    if(c.readyState == 4) {
      if(c.status != 200) {
        b.icon_.displayError = true;
        b.loadingAnimation_.registerStop();
        b.status = mbrio.ChromiumSnapshotStatus.error
      }else {
        b.checkVersion(parseInt(c.responseText));
        b.retrieveChangeLog()
      }
    }
  })
};
a.retrieveChangeLog = function() {
  var b = this;
  b.request(mbrio.Settings.currentRepository.getChangeLogUrl(b.platform, b.revisionModel_.version), function(c) {
    if(c.readyState == 4) {
      if(c.status != 200) {
        b.icon_.displayError = true;
        b.status = mbrio.ChromiumSnapshotStatus.error
      }else {
        b.revisionModel_.changeLog = c.responseXML;
        b.status = mbrio.ChromiumSnapshotStatus.loaded
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
  var c = this;
  c.width = Math.ceil(c.width);
  c.height = c.ceil(c.height);
  return c
};
goog.dom.getElement = function(b) {
  return goog.isString(b) ? document.getElementById(b) : b
};
goog.dom.$ = goog.dom.getElement;
goog.dom.getElementsByTagNameAndClass = function(b, c, d) {
  return goog.dom.getElementsByTagNameAndClass_(document, b, c, d)
};
goog.dom.getElementsByTagNameAndClass_ = function(b, c, d, e) {
  e = e || b;
  c = c && c != "*" ? c.toLowerCase() : "";
  if(e.querySelectorAll && (c || d) && (!goog.userAgent.WEBKIT || goog.userAgent.isVersion("528"))) {
    d = c + (d ? "." + d : "");
    return e.querySelectorAll(d)
  }
  if(d && e.getElementsByClassName) {
    b = e.getElementsByClassName(d);
    if(c) {
      e = {};
      for(var f = 0, g = 0, h;h = b[g];g++) {
        if(c == h.nodeName.toLowerCase()) {
          e[f++] = h
        }
      }
      e.length = f;
      return e
    }else {
      return b
    }
  }
  b = e.getElementsByTagName(c || "*");
  if(d) {
    e = {};
    for(g = f = 0;h = b[g];g++) {
      c = h.className;
      if(typeof c.split == "function" && goog.array.contains(c.split(" "), d)) {
        e[f++] = h
      }
    }
    e.length = f;
    return e
  }else {
    return b
  }
};
goog.dom.$$ = goog.dom.getElementsByTagNameAndClass;
goog.dom.createDom = function() {
  return goog.dom.createDom_(document, arguments)
};
goog.dom.createDom_ = function(b, c) {
  var d = c[0], e = c[1];
  var f = b.createElement(d);
  if(e) {
    if(goog.isString(e)) {
      f.className = e
    }
  }
  if(c.length > 2) {
    function g(h) {
      if(h) {
        f.appendChild(goog.isString(h) ? b.createTextNode(h) : h)
      }
    }
    for(e = 2;e < c.length;e++) {
      d = c[e];
      goog.isArrayLike(d) && !goog.dom.isNodeLike(d) ? goog.array.forEach(goog.dom.isNodeList(d) ? goog.array.clone(d) : d, g) : g(d)
    }
  }
  return f
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
goog.dom.isNodeLike = function(b) {
  return goog.isObject(b) && b.nodeType > 0
};
goog.dom.isNodeList = function(b) {
  if(b && typeof b.length == "number") {
    if(goog.isObject(b)) {
      return typeof b.item == "function" || typeof b.item == "string"
    }else {
      if(goog.isFunction(b)) {
        return typeof b.item == "function"
      }
    }
  }
  return false
};
goog.dom.DomHelper = function(b) {
  a.document_ = b || goog.global.document || document
};
a = goog.dom.DomHelper.prototype;
a.getDocument = function() {
  return this.document_
};
a.getElement = function(b) {
  return goog.isString(b) ? this.document_.getElementById(b) : b
};
a.$ = goog.dom.DomHelper.prototype.getElement;
a.getElementsByTagNameAndClass = function(b, c, d) {
  return goog.dom.getElementsByTagNameAndClass_(this.document_, b, c, d)
};
a.$$ = goog.dom.DomHelper.prototype.getElementsByTagNameAndClass;
a.createDom = function() {
  return goog.dom.createDom_(this.document_, arguments)
};
a.$dom = goog.dom.DomHelper.prototype.createDom;
a.createElement = function(b) {
  return this.document_.createElement(b)
};
a.createTextNode = function(b) {
  return this.document_.createTextNode(b)
};
a.appendChild = goog.dom.appendChild;
a.removeChildren = goog.dom.removeChildren;
a.isNodeLike = goog.dom.isNodeLike;
mbrio.Icon = function() {
  var b = this;
  b.iconNormalImage_ = goog.dom.$("icon");
  b.iconUpToDateImage_ = goog.dom.$("icon-uptodate");
  b.iconErrorImage_ = goog.dom.$("icon-error");
  b.iconImage_ = b.iconNormalImage_;
  b.canvas_ = goog.dom.$("canvas");
  b.canvasContext_ = b.canvas_.getContext("2d");
  b.displayUpToDate_ = b.displayError_ = false;
  b.rotation = 0
};
mbrio.Icon.prototype.__defineGetter__("rotation", function() {
  return this.rotation_
});
mbrio.Icon.prototype.__defineSetter__("rotation", function(b) {
  this.rotation_ = b;
  this.draw()
});
mbrio.Icon.prototype.__defineGetter__("displayError", function() {
  return this.displayError_
});
mbrio.Icon.prototype.__defineSetter__("displayError", function(b) {
  this.displayError_ = b;
  this.updateIcon();
  this.draw()
});
mbrio.Icon.prototype.__defineGetter__("displayUpToDate", function() {
  return this.displayUpToDate_
});
mbrio.Icon.prototype.__defineSetter__("displayUpToDate", function(b) {
  this.displayUpToDate_ = b;
  this.updateIcon();
  this.draw()
});
mbrio.Icon.prototype.updateIcon = function() {
  this.iconImage_ = this.displayError_ ? this.iconErrorImage_ : this.displayUpToDate_ ? this.iconUpToDateImage_ : this.iconNormalImage_
};
mbrio.Icon.prototype.draw = function() {
  var b = this;
  b.canvasContext_.save();
  b.canvasContext_.clearRect(0, 0, 19, 19);
  b.canvasContext_.translate(Math.ceil(9), Math.ceil(9));
  b.canvasContext_.rotate(this.rotation_ * Math.PI / 180);
  b.canvasContext_.drawImage(this.iconImage_, -Math.ceil(9), -Math.ceil(9));
  b.canvasContext_.restore();
  chrome.browserAction.setIcon({imageData:this.canvasContext_.getImageData(0, 0, 19, 19)})
};
mbrio.LoadingAnimation = function(b) {
  var c = this;
  c.interval_ = null;
  c.fullRotation_ = 360;
  c.parent_ = b;
  c.fps_ = 60;
  c.prev_ = 0;
  c.currentRotation_ = 1;
  c.stoppingRotation_ = null
};
mbrio.LoadingAnimation.prototype.start = function() {
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
mbrio.LoadingAnimation.prototype.registerStop = function() {
  this.stoppingRotation_ = this.currentRotation_
};
mbrio.LoadingAnimation.prototype.stop = function() {
  if(this.interval_ != null) {
    clearInterval(this.interval_);
    this.interval_ = null;
    this.prev_ = 0;
    this.currentRotation_ = 1;
    this.stoppingRotation_ = null
  }
};
mbrio.OptionsPage = function() {
  this.init()
};
mbrio.OptionsPage.prototype.init = function() {
  this.display();
  this.restoreOptions()
};
mbrio.OptionsPage.prototype.display = function() {
  goog.dom.removeChildren(document.body);
  var b = goog.dom.$dom("div");
  b.innerHTML = mbrio.t.Options.page();
  goog.dom.appendChild(document.body, b)
};
mbrio.OptionsPage.prototype.platformUpdated = function() {
  var b = goog.dom.$("platform");
  b = b.children[b.selectedIndex].value;
  if(b != "Win") {
    goog.dom.$("installer-panel").style.display = "none"
  }else {
    goog.dom.$("installer-panel").style.display = "block"
  }
};
mbrio.OptionsPage.prototype.saveOptions = function() {
  var b = goog.dom.$("platform");
  b = b.children[b.selectedIndex].value;
  mbrio.Settings.platform = b;
  b = goog.dom.$("repository");
  b = b.children[b.selectedIndex].value;
  mbrio.Settings.snapshotRepository = b;
  mbrio.Settings.useInstaller = goog.dom.$("installer-enabled").checked;
  mbrio.Settings.checkContinuously = goog.dom.$("check-continuously").checked;
  mbrio.Settings.checkInterval = parseInt(goog.dom.$("check-interval").value);
  chrome.extension.getBackgroundPage().snapshot.update();
  var c = goog.dom.$("status");
  c.innerHTML = "Options Saved.";
  c.style.webkitAnimationName = "";
  setTimeout(function() {
    c.style.webkitAnimationName = "op-status-display";
    c.style.webkitAnimationDuration = "2s"
  }, 0)
};
mbrio.OptionsPage.prototype.restoreOptions = function() {
  this.selectOption("platform", mbrio.Settings.platform);
  this.selectOption("repository", mbrio.Settings.snapshotRepository);
  if(mbrio.Settings.useInstaller == "true") {
    goog.dom.$("installer-enabled").checked = true
  }else {
    goog.dom.$("installer-disabled").checked = true
  }
  goog.dom.$("check-continuously").checked = mbrio.Settings.checkContinuously == "true";
  goog.dom.$("check-interval").value = mbrio.Settings.checkInterval;
  this.platformUpdated()
};
mbrio.OptionsPage.prototype.selectOption = function(b, c) {
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
mbrio.RevisionModel = function() {
  a.version = -1;
  a.changeLog = ""
};
mbrio.Repositories = {};
var FILE_NAMES_ = [];
FILE_NAMES_.arm = "chrome-linux.zip";
FILE_NAMES_["Linux_x64"] = "chrome-linux.zip";
FILE_NAMES_["Linux_Touch"] = "chrome-linux.zip";
FILE_NAMES_["Linux_ChromeOS"] = "chrome-linux.zip";
FILE_NAMES_.linux = "chrome-linux.zip";
FILE_NAMES_.arm = "chrome-linux.zip";
FILE_NAMES_.mac = "chrome-mac.zip";
FILE_NAMES_.Win = "chrome-win32.zip";
FILE_NAMES_["Win-installer"] = "mini_installer.exe";
mbrio.Repositories.continuous = {name:"continuous", latestBaseUrl:"http://commondatastorage.googleapis.com/chromium-browser-continuous/", downloadBaseUrl:"http://commondatastorage.googleapis.com/chromium-browser-continuous/", getLatestUrl:function(b) {
  if(b == "Arm") {
    b = "Linux_Touch"
  }else {
    if(b == "Linux_ChromeOS") {
      b = "Linux_Touch"
    }
  }
  return this.latestBaseUrl + b + "/LAST_CHANGE"
}, getDownloadUrl:function(b, c) {
  if(b == "Arm") {
    b = "Linux_Touch"
  }else {
    if(b == "Linux_ChromeOS") {
      b = "Linux_Touch"
    }
  }
  var d = FILE_NAMES_[b];
  if(b == "Win" && mbrio.Settings.useInstaller == "true") {
    d = FILE_NAMES_["Win-installer"]
  }
  return this.downloadBaseUrl + b + "/" + c.toString() + "/" + d
}, getChangeLogUrl:function(b, c) {
  if(b == "Arm") {
    b = "Linux_Touch"
  }else {
    if(b == "Linux_ChromeOS") {
      b = "Linux_Touch"
    }
  }
  return this.downloadBaseUrl + b + "/" + c.toString() + "/changelog.xml"
}};
mbrio.Repositories.snapshot = {name:"snapshot", latestBaseUrl:"http://commondatastorage.googleapis.com/chromium-browser-snapshots/", downloadBaseUrl:"http://commondatastorage.googleapis.com/chromium-browser-snapshots/", getLatestUrl:function(b) {
  if(b == "Linux_ChromeOS") {
    b = "Arm"
  }
  return this.latestBaseUrl + b + "/LAST_CHANGE"
}, getDownloadUrl:function(b, c) {
  var d = FILE_NAMES_[b];
  if(b == "Linux_ChromeOS") {
    b = "Arm"
  }
  if(b == "Win" && mbrio.Settings.useInstaller == "true") {
    d = FILE_NAMES_["Win-installer"]
  }
  return this.downloadBaseUrl + b + "/" + c.toString() + "/" + d
}, getChangeLogUrl:function(b, c) {
  if(b == "Linux_ChromeOS") {
    b = "Arm"
  }
  return this.downloadBaseUrl + b + "/" + c.toString() + "/changelog.xml"
}};
mbrio.SettingsManager = function() {
};
mbrio.SettingsManager.prototype.__defineGetter__("useInstaller", function() {
  var b = true;
  if(localStorage.useInstaller != null) {
    b = localStorage.useInstaller
  }
  return b
});
mbrio.SettingsManager.prototype.__defineSetter__("useInstaller", function(b) {
  localStorage.useInstaller = b
});
mbrio.SettingsManager.prototype.__defineGetter__("platform", function() {
  return localStorage.platform || this.defaultPlatform
});
mbrio.SettingsManager.prototype.__defineGetter__("defaultPlatform", function() {
  return goog.userAgent.LINUX ? "Linux" : goog.userAgent.MAC ? "Mac" : "Win"
});
mbrio.SettingsManager.prototype.__defineSetter__("platform", function(b) {
  localStorage.platform = b;
  this.latestDownloadedRevision = -1
});
mbrio.SettingsManager.prototype.__defineGetter__("latestDownloadedRevision", function() {
  return localStorage.latestDownloadedRevision || -1
});
mbrio.SettingsManager.prototype.__defineSetter__("latestDownloadedRevision", function(b) {
  localStorage.latestDownloadedRevision = b
});
mbrio.SettingsManager.prototype.__defineGetter__("currentRepository", function() {
  return mbrio.Repositories[this.snapshotRepository]
});
mbrio.SettingsManager.prototype.__defineGetter__("snapshotRepository", function() {
  return localStorage.snapshotRepository || "continuous"
});
mbrio.SettingsManager.prototype.__defineSetter__("snapshotRepository", function(b) {
  localStorage.snapshotRepository = b
});
mbrio.SettingsManager.prototype.__defineGetter__("checkContinuously", function() {
  return localStorage.checkContinuously || "false"
});
mbrio.SettingsManager.prototype.__defineSetter__("checkContinuously", function(b) {
  localStorage.checkContinuously = b
});
mbrio.SettingsManager.prototype.__defineGetter__("checkInterval", function() {
  return localStorage.checkInterval || "60"
});
mbrio.SettingsManager.prototype.__defineSetter__("checkInterval", function(b) {
  localStorage.checkInterval = b
});
mbrio.SettingsManager.prototype.__defineGetter__("canCheckContinuously", function() {
  return this.checkContinuously == "true" && parseInt(this.checkInterval) > 0
});
mbrio.Settings = new mbrio.SettingsManager;
mbrio.SnapshotPopup = function() {
  this.skipLoading = false;
  this.init()
};
a = mbrio.SnapshotPopup.prototype;
a.init = function() {
  var b = this, c = chrome.extension.getBackgroundPage().snapshot;
  function d() {
    if(b.skipLoading && c.status == mbrio.ChromiumSnapshotStatus.loading) {
      b.skipLoading = false
    }else {
      b.display()
    }
  }
  c.addEventListener(mbrio.ChromiumSnapshot.STATUS_UPDATED, d);
  goog.events.listen(window, "unload", function() {
    c.removeEventListener(mbrio.ChromiumSnapshot.STATUS_UPDATED, d)
  });
  b.retrieveChangeLog()
};
a.retrieveChangeLog = function() {
  this.display()
};
a.display = function() {
  goog.dom.removeChildren(document.body);
  var b = goog.dom.$dom("div"), c = chrome.extension.getBackgroundPage().snapshot.status;
  if(c == mbrio.ChromiumSnapshotStatus.loaded) {
    var d = chrome.extension.getBackgroundPage();
    c = d.snapshot.changeLogMessage;
    if(c != null && c.length > 0) {
      c = c.replace(/\. /g, ". <br />")
    }
    c = c.replace(/\.\n\n/g, ".<br /><br />");
    var e = d.snapshot.changeLogRevision, f = d.snapshot.downloadLink;
    d = d.snapshot.platform;
    b.innerHTML = mbrio.t.Popup.loaded({href:f, revision:e, msg:c, platform:d, prevRevision:mbrio.Settings.latestDownloadedRevision})
  }else {
    if(c == mbrio.ChromiumSnapshotStatus.loading) {
      b.innerHTML = mbrio.t.Popup.loading()
    }else {
      if(c == mbrio.ChromiumSnapshotStatus.error) {
        b.innerHTML = mbrio.t.Popup.error()
      }else {
        if(c == mbrio.ChromiumSnapshotStatus.none) {
          b.innerHTML = mbrio.t.Popup.none()
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
      mbrio.Settings.latestDownloadedRevision = b;
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
  b != null && this.append.apply(this, arguments);
  goog.string.StringBuffer.prototype.append = function(b, c) {
    this.buffer_ += b;
    if(c != null) {
      for(var d = 1;d < arguments.length;d++) {
        this.buffer_ += arguments[d]
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
mbrio.t = {};
mbrio.t.Options = {};
mbrio.t.Options.page = function(b, c) {
  b = c || new soy.StringBuilder;
  b.append('\t<div class="panel"><h1>Options</h1><div class="form"><div id="platform-panel"><label>Select the platform you would like to monitor:</label><div id="status"></div><fieldset><select id="platform" onchange="optionsPage.platformUpdated()"><option value="Arm">ARM</option><option value="Linux">Linux</option><option value="Linux_x64">Linux 64</option><option value="Linux_ChromeOS">Linux Chrome OS</option><option value="Mac" selected>OS X</option><option value="Win">Windows</option></select></fieldset></div><div id="installer-panel"><label>Would you like to download the installer or zip:</label><fieldset><div><input id="installer-enabled" name="installer" type="radio"> <label for="installer-enabled">Installer</label></div><div><input id="installer-disabled" name="installer" type="radio"> <label for="installer-disabled">Zip</label></div></fieldset></div><div id="repository-panel"><label>Select the repository you would like to monitor:</label><fieldset><select id="repository"><option value="continuous" selected>Continuous (Passed Tests)</option><option value="snapshot">All Snapshots (May Not Have Passed All Tests)</option></select></fieldset></div><div id="check-continuously-panel"><label>Would you like to check for updates at regular intervals:</label><fieldset><div><input id="check-continuously" type="checkbox"> <label for="check-continuously">Check Every</label> <input id="check-interval" class="validate-as-number" type="text" size="4" /> Minutes</div></fieldset></div><div class="buttons"><a href="#" onclick="optionsPage.saveOptions()">Save</a></div></div></div><div id="footer"><div id="copyright">Brought to you by: HeavensRevenge &lt;ultimate.evilATgmail.com&gt;</div></div>');
  if(!c) {
    return b.toString()
  }
};
mbrio.t.Popup = {};
mbrio.t.Popup.loading = function(b, c) {
  b = c || new soy.StringBuilder;
  b.append('\t<div class="panel"><h1>Loading...</h1><div class="content"><p class="msg">Attempting to contact the servers.</p></div><div class="buttons">');
  mbrio.t.Popup.refreshButton(null, b);
  b.append("</div></div>");
  if(!c) {
    return b.toString()
  }
};
mbrio.t.Popup.error = function(b, c) {
  b = c || new soy.StringBuilder;
  b.append('\t<div class="panel"><h1>Error</h1><div class="content"><p class="message">An error has occured.</p></div><div class="buttons">');
  mbrio.t.Popup.refreshButton(null, b);
  b.append("</div></div>");
  if(!c) {
    return b.toString()
  }
};
mbrio.t.Popup.none = function(b, c) {
  b = c || new soy.StringBuilder;
  b.append('\t<div class="panel"><h1>Needs Initialization</h1><div class="content"><p class="msg">Please hit the refresh button.</p></div><div class="buttons">');
  mbrio.t.Popup.refreshButton(null, b);
  b.append("</div></div>");
  if(!c) {
    return b.toString()
  }
};
mbrio.t.Popup.loaded = function(b, c) {
  var d = c || new soy.StringBuilder;
  d.append('\t<div class="panel"><h1>Latest Chromium Snapshot Information</h1><div class="content">');
  mbrio.t.Popup.platformInfo({platform:b.platform}, d);
  mbrio.t.Popup.prevRevision({prevRevision:b.prevRevision}, d);
  mbrio.t.Popup.revisionInfo({revision:b.revision}, d);
  mbrio.t.Popup.changeLogInfo({msg:b.msg}, d);
  d.append('</div><div class="buttons">');
  mbrio.t.Popup.downloadButton({href:b.href, revision:b.revision}, d);
  mbrio.t.Popup.refreshButton(null, d);
  d.append("</div></div>");
  if(!c) {
    return d.toString()
  }
};
mbrio.t.Popup.platformInfo = function(b, c) {
  var d = c || new soy.StringBuilder;
  d.append('\t<div class="section inline"><h2>Platform</h2><div class="platform">', soy.$$escapeHtml(b.platform), "</div></div>");
  if(!c) {
    return d.toString()
  }
};
mbrio.t.Popup.revisionInfo = function(b, c) {
  var d = c || new soy.StringBuilder;
  d.append('\t<div class="section inline"><h2>Latest Revision</h2><div class="revision">', soy.$$escapeHtml(b.revision), "</div></div>");
  if(!c) {
    return d.toString()
  }
};
mbrio.t.Popup.changeLogInfo = function(b, c) {
  var d = c || new soy.StringBuilder;
  d.append('\t<div class="section"><h2>Most Recent Changelog</h2><div class="changeLog">', b.msg, "</div></div>");
  if(!c) {
    return d.toString()
  }
};
mbrio.t.Popup.downloadButton = function(b, c) {
  var d = c || new soy.StringBuilder;
  d.append('\t<div class="link"><a href="', soy.$$escapeHtml(b.href), '" onclick="snapshotPopup.recordDownload(\'', soy.$$escapeHtml(b.revision), '\')" target="_blank">Download</a></div>');
  if(!c) {
    return d.toString()
  }
};
mbrio.t.Popup.refreshButton = function(b, c) {
  b = c || new soy.StringBuilder;
  b.append('\t<div class="link"><a href="javascript:void(0)" onclick="snapshotPopup.refresh()" target="_blank">Refresh</a></div>');
  if(!c) {
    return b.toString()
  }
};
mbrio.t.Popup.prevRevision = function(b, c) {
  var d = c || new soy.StringBuilder;
  d.append("\t", b.prevRevision != null && b.prevRevision.length > 0 && b.prevRevision != -1 ? '<div class="section inline"><h2>Previously Downloaded Revision</h2><div class="revision">' + soy.$$escapeHtml(b.prevRevision) + "</div></div>" : "");
  if(!c) {
    return d.toString()
  }
};