var a, COMPILED = true, goog = goog || {};
goog.global = this;
goog.DEBUG = true;
goog.LOCALE = "en";
goog.evalWorksForGlobals_ = null;
goog.provide = function(b) {
    if (!COMPILED) {
        if (goog.getObjectByName(b) && !goog.implicitNamespaces_[b])
            throw Error('Namespace "' + b + '" already declared.');
        for (var c = b; c = c.substring(0, c.lastIndexOf(".")); )
            goog.implicitNamespaces_[c] = true
    }
    goog.exportPath_(b)
};
if (!COMPILED)
    goog.implicitNamespaces_ = {};
goog.exportPath_ = function(b, c, d) {
    b = b.split(".");
    d = d || goog.global;
    !(b[0] in d) && d.execScript && d.execScript("var " + b[0]);
    for (var e; b.length && (e = b.shift()); )
        if (!b.length && goog.isDef(c))
            d[e] = c;
        else
            d = d[e] ? d[e] : (d[e] = {})
};
goog.getObjectByName = function(b, c) {
    b = b.split(".");
    c = c || goog.global;
    for (var d; d = b.shift(); )
        if (c[d])
            c = c[d];
        else
            return null;
    return c
};
goog.globalize = function(b, c) {
    c = c || goog.global;
    for (var d in b)
        c[d] = b[d]
};
goog.addDependency = function(b, c, d) {
    if (!COMPILED) {
        var e;
        b = b.replace(/\\/g, "/");
        for (var f = goog.dependencies_, g = 0; e = c[g]; g++) {
            f.nameToPath[e] = b;
            b in f.pathToNames || (f.pathToNames[b] = {});
            f.pathToNames[b][e] = true
        }
        for (e = 0; c = d[e]; e++) {
            b in f.requires || (f.requires[b] = {});
            f.requires[b][c] = true
        }
    }
};
goog.require = function(b) {
    if (!COMPILED)
        if (!goog.getObjectByName(b)) {
            var c = goog.getPathFromDeps_(b);
            if (c) {
                goog.included_[c] = true;
                goog.writeScripts_()
            } else {
                b = "goog.require could not find: " + b;
                goog.global.console && goog.global.console.error(b);
                throw Error(b);
            }
        }
};
goog.useStrictRequires = false;
goog.basePath = "";
goog.nullFunction = function() {
};
goog.identityFunction = function(b) {
    return b
};
goog.abstractMethod = function() {
    throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(b) {
    b.getInstance = function() {
        return b.instance_ || (b.instance_ = new b)
    }
};
if (!COMPILED) {
    goog.included_ = {};
    goog.dependencies_ = {pathToNames: {},nameToPath: {},requires: {},visited: {},written: {}};
    goog.inHtmlDocument_ = function() {
        var b = goog.global.document;
        return typeof b != "undefined" && "write" in b
    };
    goog.findBasePath_ = function() {
        if (goog.inHtmlDocument_()) {
            var b = goog.global.document;
            if (goog.global.CLOSURE_BASE_PATH)
                goog.basePath = goog.global.CLOSURE_BASE_PATH;
            else {
                b = b.getElementsByTagName("script");
                for (var c = b.length - 1; c >= 0; --c) {
                    var d = b[c].src, e = d.length;
                    if (d.substr(e - 7) == "base.js") {
                        goog.basePath = 
                        d.substr(0, e - 7);
                        return
                    }
                }
            }
        }
    };
    goog.writeScriptTag_ = function(b) {
        if (goog.inHtmlDocument_() && !goog.dependencies_.written[b]) {
            goog.dependencies_.written[b] = true;
            var c = goog.global.document;
            c.write('<script type="text/javascript" src="' + b + '"><\/script>')
        }
    };
    goog.writeScripts_ = function() {
        function b(g) {
            if (!(g in e.written)) {
                if (!(g in e.visited)) {
                    e.visited[g] = true;
                    if (g in e.requires)
                        for (var h in e.requires[g])
                            if (h in e.nameToPath)
                                b(e.nameToPath[h]);
                            else if (!goog.getObjectByName(h))
                                throw Error("Undefined nameToPath for " + 
                                h);
                }
                if (!(g in d)) {
                    d[g] = true;
                    c.push(g)
                }
            }
        }
        var c = [], d = {}, e = goog.dependencies_;
        for (var f in goog.included_)
            e.written[f] || b(f);
        for (f = 0; f < c.length; f++)
            if (c[f])
                goog.writeScriptTag_(goog.basePath + c[f]);
            else
                throw Error("Undefined script input");
    };
    goog.getPathFromDeps_ = function(b) {
        return b in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[b] : null
    };
    goog.findBasePath_();
    goog.global.CLOSURE_NO_DEPS || goog.writeScriptTag_(goog.basePath + "deps.js")
}
goog.typeOf = function(b) {
    var c = typeof b;
    if (c == "object")
        if (b) {
            if (b instanceof Array || !(b instanceof Object) && Object.prototype.toString.call(b) == "[object Array]" || typeof b.length == "number" && typeof b.splice != "undefined" && typeof b.propertyIsEnumerable != "undefined" && !b.propertyIsEnumerable("splice"))
                return "array";
            if (!(b instanceof Object) && (Object.prototype.toString.call(b) == "[object Function]" || typeof b.call != "undefined" && typeof b.propertyIsEnumerable != "undefined" && !b.propertyIsEnumerable("call")))
                return "function"
        } else
            return "null";
    else if (c == "function" && typeof b.call == "undefined")
        return "object";
    return c
};
goog.propertyIsEnumerableCustom_ = function(b, c) {
    if (c in b)
        for (var d in b)
            if (d == c && Object.prototype.hasOwnProperty.call(b, c))
                return true;
    return false
};
goog.propertyIsEnumerable_ = function(b, c) {
    return b instanceof Object ? Object.prototype.propertyIsEnumerable.call(b, c) : goog.propertyIsEnumerableCustom_(b, c)
};
goog.isDef = function(b) {
    return b !== undefined
};
goog.isNull = function(b) {
    return b === null
};
goog.isDefAndNotNull = function(b) {
    return b != null
};
goog.isArray = function(b) {
    return goog.typeOf(b) == "array"
};
goog.isArrayLike = function(b) {
    var c = goog.typeOf(b);
    return c == "array" || c == "object" && typeof b.length == "number"
};
goog.isDateLike = function(b) {
    return goog.isObject(b) && typeof b.getFullYear == "function"
};
goog.isString = function(b) {
    return typeof b == "string"
};
goog.isBoolean = function(b) {
    return typeof b == "boolean"
};
goog.isNumber = function(b) {
    return typeof b == "number"
};
goog.isFunction = function(b) {
    return goog.typeOf(b) == "function"
};
goog.isObject = function(b) {
    b = goog.typeOf(b);
    return b == "object" || b == "array" || b == "function"
};
goog.getHashCode = function(b) {
    if (b.hasOwnProperty && b.hasOwnProperty(goog.HASH_CODE_PROPERTY_))
        return b[goog.HASH_CODE_PROPERTY_];
    b[goog.HASH_CODE_PROPERTY_] || (b[goog.HASH_CODE_PROPERTY_] = ++goog.hashCodeCounter_);
    return b[goog.HASH_CODE_PROPERTY_]
};
goog.removeHashCode = function(b) {
    "removeAttribute" in b && b.removeAttribute(goog.HASH_CODE_PROPERTY_);
    try {
        delete b[goog.HASH_CODE_PROPERTY_]
    } catch (c) {
    }
};
goog.HASH_CODE_PROPERTY_ = "closure_hashCode_" + Math.floor(Math.random() * 2147483648).toString(36);
goog.hashCodeCounter_ = 0;
goog.cloneObject = function(b) {
    var c = goog.typeOf(b);
    if (c == "object" || c == "array") {
        if (b.clone)
            return b.clone.call(b);
        c = c == "array" ? [] : {};
        for (var d in b)
            c[d] = goog.cloneObject(b[d]);
        return c
    }
    return b
};
goog.bind = function(b, c) {
    var d = c || goog.global;
    if (arguments.length > 2) {
        var e = Array.prototype.slice.call(arguments, 2);
        return function() {
            var f = Array.prototype.slice.call(arguments);
            Array.prototype.unshift.apply(f, e);
            return b.apply(d, f)
        }
    } else
        return function() {
            return b.apply(d, arguments)
        }
};
goog.partial = function(b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function() {
        var d = Array.prototype.slice.call(arguments);
        d.unshift.apply(d, c);
        return b.apply(this, d)
    }
};
goog.mixin = function(b, c) {
    for (var d in c)
        b[d] = c[d]
};
goog.now = Date.now || function() {
    return +new Date
};
goog.globalEval = function(b) {
    if (goog.global.execScript)
        goog.global.execScript(b, "JavaScript");
    else if (goog.global.eval) {
        if (goog.evalWorksForGlobals_ == null) {
            goog.global.eval("var _et_ = 1;");
            if (typeof goog.global._et_ != "undefined") {
                delete goog.global._et_;
                goog.evalWorksForGlobals_ = true
            } else
                goog.evalWorksForGlobals_ = false
        }
        if (goog.evalWorksForGlobals_)
            goog.global.eval(b);
        else {
            var c = goog.global.document, d = c.createElement("script");
            d.type = "text/javascript";
            d.defer = false;
            d.appendChild(c.createTextNode(b));
            c.body.appendChild(d);
            c.body.removeChild(d)
        }
    } else
        throw Error("goog.globalEval not available");
};
goog.typedef = true;
goog.getCssName = function(b, c) {
    b = b + (c ? "-" + c : "");
    return goog.cssNameMapping_ && b in goog.cssNameMapping_ ? goog.cssNameMapping_[b] : b
};
goog.setCssNameMapping = function(b) {
    goog.cssNameMapping_ = b
};
goog.getMsg = function(b, c) {
    c = c || {};
    for (var d in c)
        b = b.replace(new RegExp("\\{\\$" + d + "\\}", "gi"), c[d]);
    return b
};
goog.exportSymbol = function(b, c, d) {
    goog.exportPath_(b, c, d)
};
goog.exportProperty = function(b, c, d) {
    b[c] = d
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
goog.array.ArrayLike = goog.typedef;
goog.array.peek = function(b) {
    return b[b.length - 1]
};
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.array.ARRAY_PROTOTYPE_.indexOf ? function(b, c, d) {
    return goog.array.ARRAY_PROTOTYPE_.indexOf.call(b, c, d)
} : function(b, c, d) {
    for (d = d = d == null ? 0 : d < 0 ? Math.max(0, b.length + d) : d; d < b.length; d++)
        if (d in b && b[d] === c)
            return d;
    return -1
};
goog.array.lastIndexOf = goog.array.ARRAY_PROTOTYPE_.lastIndexOf ? function(b, c, d) {
    d = d == null ? b.length - 1 : d;
    return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(b, c, d)
} : function(b, c, d) {
    d = d == null ? b.length - 1 : d;
    if (d < 0)
        d = Math.max(0, b.length + d);
    for (d = d; d >= 0; d--)
        if (d in b && b[d] === c)
            return d;
    return -1
};
goog.array.forEach = goog.array.ARRAY_PROTOTYPE_.forEach ? function(b, c, d) {
    goog.array.ARRAY_PROTOTYPE_.forEach.call(b, c, d)
} : function(b, c, d) {
    for (var e = b.length, f = goog.isString(b) ? b.split("") : b, g = 0; g < e; g++)
        g in f && c.call(d, f[g], g, b)
};
goog.array.forEachRight = function(b, c, d) {
    var e = b.length, f = goog.isString(b) ? b.split("") : b;
    for (e = e - 1; e >= 0; --e)
        e in f && c.call(d, f[e], e, b)
};
goog.array.filter = goog.array.ARRAY_PROTOTYPE_.filter ? function(b, c, d) {
    return goog.array.ARRAY_PROTOTYPE_.filter.call(b, c, d)
} : function(b, c, d) {
    for (var e = b.length, f = [], g = 0, h = goog.isString(b) ? b.split("") : b, i = 0; i < e; i++)
        if (i in h) {
            var j = h[i];
            if (c.call(d, j, i, b))
                f[g++] = j
        }
    return f
};
goog.array.map = goog.array.ARRAY_PROTOTYPE_.map ? function(b, c, d) {
    return goog.array.ARRAY_PROTOTYPE_.map.call(b, c, d)
} : function(b, c, d) {
    for (var e = b.length, f = [], g = 0, h = goog.isString(b) ? b.split("") : b, i = 0; i < e; i++)
        if (i in h)
            f[g++] = c.call(d, h[i], i, b);
    return f
};
goog.array.reduce = function(b, c, d, e) {
    if (b.reduce)
        return e ? b.reduce(goog.bind(c, e), d) : b.reduce(c, d);
    var f = d;
    goog.array.forEach(b, function(g, h) {
        f = c.call(e, f, g, h, b)
    });
    return f
};
goog.array.reduceRight = function(b, c, d, e) {
    if (b.reduceRight)
        return e ? b.reduceRight(goog.bind(c, e), d) : b.reduceRight(c, d);
    var f = d;
    goog.array.forEachRight(b, function(g, h) {
        f = c.call(e, f, g, h, b)
    });
    return f
};
goog.array.some = goog.array.ARRAY_PROTOTYPE_.some ? function(b, c, d) {
    return goog.array.ARRAY_PROTOTYPE_.some.call(b, c, d)
} : function(b, c, d) {
    for (var e = b.length, f = goog.isString(b) ? b.split("") : b, g = 0; g < e; g++)
        if (g in f && c.call(d, f[g], g, b))
            return true;
    return false
};
goog.array.every = goog.array.ARRAY_PROTOTYPE_.every ? function(b, c, d) {
    return goog.array.ARRAY_PROTOTYPE_.every.call(b, c, d)
} : function(b, c, d) {
    for (var e = b.length, f = goog.isString(b) ? b.split("") : b, g = 0; g < e; g++)
        if (g in f && !c.call(d, f[g], g, b))
            return false;
    return true
};
goog.array.find = function(b, c, d) {
    c = goog.array.findIndex(b, c, d);
    return c < 0 ? null : goog.isString(b) ? b.charAt(c) : b[c]
};
goog.array.findIndex = function(b, c, d) {
    for (var e = b.length, f = goog.isString(b) ? b.split("") : b, g = 0; g < e; g++)
        if (g in f && c.call(d, f[g], g, b))
            return g;
    return -1
};
goog.array.findRight = function(b, c, d) {
    c = goog.array.findIndexRight(b, c, d);
    return c < 0 ? null : goog.isString(b) ? b.charAt(c) : b[c]
};
goog.array.findIndexRight = function(b, c, d) {
    var e = b.length, f = goog.isString(b) ? b.split("") : b;
    for (e = e - 1; e >= 0; e--)
        if (e in f && c.call(d, f[e], e, b))
            return e;
    return -1
};
goog.array.contains = function(b, c) {
    return goog.array.indexOf(b, c) >= 0
};
goog.array.isEmpty = function(b) {
    return b.length == 0
};
goog.array.clear = function(b) {
    if (!goog.isArray(b))
        for (var c = b.length - 1; c >= 0; c--)
            delete b[c];
    b.length = 0
};
goog.array.insert = function(b, c) {
    goog.array.contains(b, c) || b.push(c)
};
goog.array.insertAt = function(b, c, d) {
    goog.array.splice(b, d, 0, c)
};
goog.array.insertArrayAt = function(b, c, d) {
    goog.partial(goog.array.splice, b, d, 0).apply(null, c)
};
goog.array.insertBefore = function(b, c, d) {
    var e;
    arguments.length == 2 || (e = goog.array.indexOf(b, d)) < 0 ? b.push(c) : goog.array.insertAt(b, c, e)
};
goog.array.remove = function(b, c) {
    c = goog.array.indexOf(b, c);
    var d;
    if (d = c >= 0)
        goog.array.removeAt(b, c);
    return d
};
goog.array.removeAt = function(b, c) {
    return goog.array.ARRAY_PROTOTYPE_.splice.call(b, c, 1).length == 1
};
goog.array.removeIf = function(b, c, d) {
    c = goog.array.findIndex(b, c, d);
    if (c >= 0) {
        goog.array.removeAt(b, c);
        return true
    }
    return false
};
goog.array.clone = function(b) {
    if (goog.isArray(b))
        return b.concat();
    else {
        for (var c = [], d = 0, e = b.length; d < e; d++)
            c[d] = b[d];
        return c
    }
};
goog.array.toArray = function(b) {
    if (goog.isArray(b))
        return b.concat();
    return goog.array.clone(b)
};
goog.array.extend = function(b) {
    for (var c = 1; c < arguments.length; c++) {
        var d = arguments[c];
        if (goog.isArrayLike(d)) {
            d = goog.array.toArray(d);
            b.push.apply(b, d)
        } else
            b.push(d)
    }
};
goog.array.splice = function(b) {
    return goog.array.ARRAY_PROTOTYPE_.splice.apply(b, goog.array.slice(arguments, 1))
};
goog.array.slice = function(b, c, d) {
    return arguments.length <= 2 ? goog.array.ARRAY_PROTOTYPE_.slice.call(b, c) : goog.array.ARRAY_PROTOTYPE_.slice.call(b, c, d)
};
goog.array.removeDuplicates = function(b, c) {
    c = c || b;
    for (var d = {}, e = 0, f = 0; f < b.length; ) {
        var g = b[f++], h = goog.isObject(g) ? goog.getHashCode(g) : g;
        if (!Object.prototype.hasOwnProperty.call(d, h)) {
            d[h] = true;
            c[e++] = g
        }
    }
    c.length = e
};
goog.array.binarySearch = function(b, c, d) {
    var e = 0, f = b.length - 1;
    for (d = d || goog.array.defaultCompare; e <= f; ) {
        var g = e + f >> 1, h = d(c, b[g]);
        if (h > 0)
            e = g + 1;
        else if (h < 0)
            f = g - 1;
        else
            return g
    }
    return -(e + 1)
};
goog.array.sort = function(b, c) {
    goog.array.ARRAY_PROTOTYPE_.sort.call(b, c || goog.array.defaultCompare)
};
goog.array.stableSort = function(b, c) {
    function d(g, h) {
        return f(g.value, h.value) || g.index - h.index
    }
    for (var e = 0; e < b.length; e++)
        b[e] = {index: e,value: b[e]};
    var f = c || goog.array.defaultCompare;
    goog.array.sort(b, d);
    for (e = 0; e < b.length; e++)
        b[e] = b[e].value
};
goog.array.sortObjectsByKey = function(b, c, d) {
    var e = d || goog.array.defaultCompare;
    goog.array.sort(b, function(f, g) {
        return e(f[c], g[c])
    })
};
goog.array.equals = function(b, c, d) {
    if (!goog.isArrayLike(b) || !goog.isArrayLike(c) || b.length != c.length)
        return false;
    var e = b.length;
    d = d || goog.array.defaultCompareEquality;
    for (var f = 0; f < e; f++)
        if (!d(b[f], c[f]))
            return false;
    return true
};
goog.array.compare = function(b, c, d) {
    return goog.array.equals(b, c, d)
};
goog.array.defaultCompare = function(b, c) {
    return b > c ? 1 : b < c ? -1 : 0
};
goog.array.defaultCompareEquality = function(b, c) {
    return b === c
};
goog.array.binaryInsert = function(b, c, d) {
    d = goog.array.binarySearch(b, c, d);
    if (d < 0) {
        goog.array.insertAt(b, c, -(d + 1));
        return true
    }
    return false
};
goog.array.binaryRemove = function(b, c, d) {
    c = goog.array.binarySearch(b, c, d);
    return c >= 0 ? goog.array.removeAt(b, c) : false
};
goog.array.bucket = function(b, c) {
    for (var d = {}, e = 0; e < b.length; e++) {
        var f = b[e], g = c(f, e, b);
        if (goog.isDef(g)) {
            g = d[g] || (d[g] = []);
            g.push(f)
        }
    }
    return d
};
goog.array.repeat = function(b, c) {
    for (var d = [], e = 0; e < c; e++)
        d[e] = b;
    return d
};
goog.array.flatten = function() {
    for (var b = [], c = 0; c < arguments.length; c++) {
        var d = arguments[c];
        goog.isArray(d) ? b.push.apply(b, goog.array.flatten.apply(null, d)) : b.push(d)
    }
    return b
};
goog.array.rotate = function(b, c) {
    if (b.length) {
        c %= b.length;
        if (c > 0)
            goog.array.ARRAY_PROTOTYPE_.unshift.apply(b, b.splice(-c, c));
        else
            c < 0 && goog.array.ARRAY_PROTOTYPE_.push.apply(b, b.splice(0, -c))
    }
    return b
};
goog.debug = {};
goog.debug.errorHandlerWeakDep = {protectEntryPoint: function(b) {
        return b
    }};
goog.Disposable = function() {
};
a = goog.Disposable.prototype;
a.disposed_ = false;
a.isDisposed = function() {
    return this.disposed_
};
a.getDisposed = goog.Disposable.prototype.isDisposed;
a.dispose = function() {
    if (!this.disposed_) {
        this.disposed_ = true;
        this.disposeInternal()
    }
};
a.disposeInternal = function() {
};
goog.dispose = function(b) {
    b && typeof b.dispose == "function" && b.dispose()
};
goog.events = {};
goog.events.Event = function(b, c) {
    goog.Disposable.call(this);
    this.type = b;
    this.currentTarget = this.target = c
};
goog.inherits(goog.events.Event, goog.Disposable);
a = goog.events.Event.prototype;
a.disposeInternal = function() {
    delete this.type;
    delete this.target;
    delete this.currentTarget
};
a.propagationStopped_ = false;
a.returnValue_ = true;
a.stopPropagation = function() {
    this.propagationStopped_ = true
};
a.preventDefault = function() {
    this.returnValue_ = false
};
goog.string = {};
goog.string.Unicode = {NBSP: "\u00a0"};
goog.string.startsWith = function(b, c) {
    return b.indexOf(c) == 0
};
goog.string.endsWith = function(b, c) {
    var d = b.length - c.length;
    return d >= 0 && b.lastIndexOf(c, d) == d
};
goog.string.caseInsensitiveStartsWith = function(b, c) {
    return goog.string.caseInsensitiveCompare(c, b.substr(0, c.length)) == 0
};
goog.string.caseInsensitiveEndsWith = function(b, c) {
    return goog.string.caseInsensitiveCompare(c, b.substr(b.length - c.length, c.length)) == 0
};
goog.string.subs = function(b) {
    for (var c = 1; c < arguments.length; c++) {
        var d = String(arguments[c]).replace(/\$/g, "$$$$");
        b = b.replace(/\%s/, d)
    }
    return b
};
goog.string.collapseWhitespace = function(b) {
    return b.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
goog.string.isEmpty = function(b) {
    return /^[\s\xa0]*$/.test(b)
};
goog.string.isEmptySafe = function(b) {
    return goog.string.isEmpty(goog.string.makeSafe(b))
};
goog.string.isBreakingWhitespace = function(b) {
    return !/[^\t\n\r ]/.test(b)
};
goog.string.isAlpha = function(b) {
    return !/[^a-zA-Z]/.test(b)
};
goog.string.isNumeric = function(b) {
    return !/[^0-9]/.test(b)
};
goog.string.isAlphaNumeric = function(b) {
    return !/[^a-zA-Z0-9]/.test(b)
};
goog.string.isSpace = function(b) {
    return b == " "
};
goog.string.isUnicodeChar = function(b) {
    return b.length == 1 && b >= " " && b <= "~" || b >= "\u0080" && b <= "\ufffd"
};
goog.string.stripNewlines = function(b) {
    return b.replace(/(\r\n|\r|\n)+/g, " ")
};
goog.string.canonicalizeNewlines = function(b) {
    return b.replace(/(\r\n|\r|\n)/g, "\n")
};
goog.string.normalizeWhitespace = function(b) {
    return b.replace(/\xa0|\s/g, " ")
};
goog.string.normalizeSpaces = function(b) {
    return b.replace(/\xa0|[ \t]+/g, " ")
};
goog.string.trim = function(b) {
    return b.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
};
goog.string.trimLeft = function(b) {
    return b.replace(/^[\s\xa0]+/, "")
};
goog.string.trimRight = function(b) {
    return b.replace(/[\s\xa0]+$/, "")
};
goog.string.caseInsensitiveCompare = function(b, c) {
    b = String(b).toLowerCase();
    c = String(c).toLowerCase();
    return b < c ? -1 : b == c ? 0 : 1
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function(b, c) {
    if (b == c)
        return 0;
    if (!b)
        return -1;
    if (!c)
        return 1;
    for (var d = b.toLowerCase().match(goog.string.numerateCompareRegExp_), e = c.toLowerCase().match(goog.string.numerateCompareRegExp_), f = Math.min(d.length, e.length), g = 0; g < f; g++) {
        var h = d[g], i = e[g];
        if (h != i) {
            b = parseInt(h, 10);
            if (!isNaN(b)) {
                c = parseInt(i, 10);
                if (!isNaN(c) && b - c)
                    return b - c
            }
            return h < i ? -1 : 1
        }
    }
    if (d.length != e.length)
        return d.length - e.length;
    return b < c ? -1 : 1
};
goog.string.encodeUriRegExp_ = /^[a-zA-Z0-9\-_.!~*'()]*$/;
goog.string.urlEncode = function(b) {
    b = String(b);
    if (!goog.string.encodeUriRegExp_.test(b))
        return encodeURIComponent(b);
    return b
};
goog.string.urlDecode = function(b) {
    return decodeURIComponent(b.replace(/\+/g, " "))
};
goog.string.newLineToBr = function(b, c) {
    return b.replace(/(\r\n|\r|\n)/g, c ? "<br />" : "<br>")
};
goog.string.htmlEscape = function(b, c) {
    if (c)
        return b.replace(goog.string.amperRe_, "&amp;").replace(goog.string.ltRe_, "&lt;").replace(goog.string.gtRe_, "&gt;").replace(goog.string.quotRe_, "&quot;");
    else {
        if (!goog.string.allRe_.test(b))
            return b;
        if (b.indexOf("&") != -1)
            b = b.replace(goog.string.amperRe_, "&amp;");
        if (b.indexOf("<") != -1)
            b = b.replace(goog.string.ltRe_, "&lt;");
        if (b.indexOf(">") != -1)
            b = b.replace(goog.string.gtRe_, "&gt;");
        if (b.indexOf('"') != -1)
            b = b.replace(goog.string.quotRe_, "&quot;");
        return b
    }
};
goog.string.amperRe_ = /&/g;
goog.string.ltRe_ = /</g;
goog.string.gtRe_ = />/g;
goog.string.quotRe_ = /\"/g;
goog.string.allRe_ = /[&<>\"]/;
goog.string.unescapeEntities = function(b) {
    if (goog.string.contains(b, "&"))
        return "document" in goog.global && !goog.string.contains(b, "<") ? goog.string.unescapeEntitiesUsingDom_(b) : goog.string.unescapePureXmlEntities_(b);
    return b
};
goog.string.unescapeEntitiesUsingDom_ = function(b) {
    var c = goog.global.document.createElement("a");
    c.innerHTML = b;
    c[goog.string.NORMALIZE_FN_] && c[goog.string.NORMALIZE_FN_]();
    b = c.firstChild.nodeValue;
    c.innerHTML = "";
    return b
};
goog.string.unescapePureXmlEntities_ = function(b) {
    return b.replace(/&([^;]+);/g, function(c, d) {
        switch (d) {
            case "amp":
                return "&";
            case "lt":
                return "<";
            case "gt":
                return ">";
            case "quot":
                return '"';
            default:
                if (d.charAt(0) == "#") {
                    d = Number("0" + d.substr(1));
                    if (!isNaN(d))
                        return String.fromCharCode(d)
                }
                return c
        }
    })
};
goog.string.NORMALIZE_FN_ = "normalize";
goog.string.whitespaceEscape = function(b, c) {
    return goog.string.newLineToBr(b.replace(/  /g, " &#160;"), c)
};
goog.string.stripQuotes = function(b, c) {
    for (var d = c.length, e = 0; e < d; e++) {
        var f = d == 1 ? c : c.charAt(e);
        if (b.charAt(0) == f && b.charAt(b.length - 1) == f)
            return b.substring(1, b.length - 1)
    }
    return b
};
goog.string.truncate = function(b, c, d) {
    if (d)
        b = goog.string.unescapeEntities(b);
    if (b.length > c)
        b = b.substring(0, c - 3) + "...";
    if (d)
        b = goog.string.htmlEscape(b);
    return b
};
goog.string.truncateMiddle = function(b, c, d) {
    if (d)
        b = goog.string.unescapeEntities(b);
    if (b.length > c) {
        var e = Math.floor(c / 2), f = b.length - e;
        e += c % 2;
        b = b.substring(0, e) + "..." + b.substring(f)
    }
    if (d)
        b = goog.string.htmlEscape(b);
    return b
};
goog.string.jsEscapeCache_ = {"\u0008": "\\b","\u000c": "\\f","\n": "\\n","\r": "\\r","\t": "\\t","\u000b": "\\x0B",'"': '\\"',"'": "\\'","\\": "\\\\"};
goog.string.quote = function(b) {
    b = String(b);
    if (b.quote)
        return b.quote();
    else {
        for (var c = ['"'], d = 0; d < b.length; d++)
            c[d + 1] = goog.string.escapeChar(b.charAt(d));
        c.push('"');
        return c.join("")
    }
};
goog.string.escapeChar = function(b) {
    if (b in goog.string.jsEscapeCache_)
        return goog.string.jsEscapeCache_[b];
    var c = b, d = b.charCodeAt(0);
    if (d > 31 && d < 127)
        c = b;
    else {
        if (d < 256) {
            c = "\\x";
            if (d < 16 || d > 256)
                c += "0"
        } else {
            c = "\\u";
            if (d < 4096)
                c += "0"
        }
        c += d.toString(16).toUpperCase()
    }
    return goog.string.jsEscapeCache_[b] = c
};
goog.string.toMap = function(b) {
    for (var c = {}, d = 0; d < b.length; d++)
        c[b.charAt(d)] = true;
    return c
};
goog.string.contains = function(b, c) {
    return b.indexOf(c) != -1
};
goog.string.removeAt = function(b, c, d) {
    var e = b;
    if (c >= 0 && c < b.length && d > 0)
        e = b.substr(0, c) + b.substr(c + d, b.length - c - d);
    return e
};
goog.string.remove = function(b, c) {
    c = new RegExp(goog.string.regExpEscape(c), "");
    return b.replace(c, "")
};
goog.string.removeAll = function(b, c) {
    c = new RegExp(goog.string.regExpEscape(c), "g");
    return b.replace(c, "")
};
goog.string.regExpEscape = function(b) {
    return String(b).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
};
goog.string.repeat = function(b, c) {
    return (new Array(c + 1)).join(b)
};
goog.string.padNumber = function(b, c, d) {
    b = goog.isDef(d) ? b.toFixed(d) : String(b);
    d = b.indexOf(".");
    if (d == -1)
        d = b.length;
    return goog.string.repeat("0", Math.max(0, c - d)) + b
};
goog.string.makeSafe = function(b) {
    return b == null ? "" : String(b)
};
goog.string.buildString = function() {
    return Array.prototype.join.call(arguments, "")
};
goog.string.getRandomString = function() {
    return Math.floor(Math.random() * 2147483648).toString(36) + (Math.floor(Math.random() * 2147483648) ^ (new Date).getTime()).toString(36)
};
goog.string.compareVersions = function(b, c) {
    var d = 0;
    b = goog.string.trim(String(b)).split(".");
    c = goog.string.trim(String(c)).split(".");
    for (var e = Math.max(b.length, c.length), f = 0; d == 0 && f < e; f++) {
        var g = b[f] || "", h = c[f] || "", i = new RegExp("(\\d*)(\\D*)", "g"), j = new RegExp("(\\d*)(\\D*)", "g");
        do {
            var k = i.exec(g) || ["", "", ""], l = j.exec(h) || ["", "", ""];
            if (k[0].length == 0 && l[0].length == 0)
                break;
            d = k[1].length == 0 ? 0 : parseInt(k[1], 10);
            var n = l[1].length == 0 ? 0 : parseInt(l[1], 10);
            d = goog.string.compareElements_(d, n) || goog.string.compareElements_(k[2].length == 
            0, l[2].length == 0) || goog.string.compareElements_(k[2], l[2])
        } while (d == 0)
    }
    return d
};
goog.string.compareElements_ = function(b, c) {
    if (b < c)
        return -1;
    else if (b > c)
        return 1;
    return 0
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function(b) {
    for (var c = 0, d = 0; d < b.length; ++d) {
        c = 31 * c + b.charCodeAt(d);
        c %= goog.string.HASHCODE_MAX_
    }
    return c
};
goog.string.uniqueStringCounter_ = goog.now();
goog.string.createUniqueString = function() {
    return "goog_" + goog.string.uniqueStringCounter_++
};
goog.string.toNumber = function(b) {
    var c = Number(b);
    if (c == 0 && goog.string.isEmpty(b))
        return NaN;
    return c
};
goog.userAgent = {};
goog.userAgent.ASSUME_IE = false;
goog.userAgent.ASSUME_GECKO = false;
goog.userAgent.ASSUME_WEBKIT = false;
goog.userAgent.ASSUME_MOBILE_WEBKIT = false;
goog.userAgent.ASSUME_OPERA = false;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function() {
    return goog.global.navigator ? goog.global.navigator.userAgent : null
};
goog.userAgent.getNavigator = function() {
    return goog.global.navigator
};
goog.userAgent.init_ = function() {
    goog.userAgent.detectedOpera_ = false;
    goog.userAgent.detectedIe_ = false;
    goog.userAgent.detectedWebkit_ = false;
    goog.userAgent.detectedMobile_ = false;
    goog.userAgent.detectedGecko_ = false;
    var b;
    if (!goog.userAgent.BROWSER_KNOWN_ && (b = goog.userAgent.getUserAgentString())) {
        var c = goog.userAgent.getNavigator();
        goog.userAgent.detectedOpera_ = b.indexOf("Opera") == 0;
        goog.userAgent.detectedIe_ = !goog.userAgent.detectedOpera_ && b.indexOf("MSIE") != -1;
        goog.userAgent.detectedWebkit_ = !goog.userAgent.detectedOpera_ && 
        b.indexOf("WebKit") != -1;
        goog.userAgent.detectedMobile_ = goog.userAgent.detectedWebkit_ && b.indexOf("Mobile") != -1;
        goog.userAgent.detectedGecko_ = !goog.userAgent.detectedOpera_ && !goog.userAgent.detectedWebkit_ && c.product == "Gecko"
    }
};
goog.userAgent.BROWSER_KNOWN_ || goog.userAgent.init_();
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.userAgent.detectedOpera_;
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.userAgent.detectedIe_;
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.userAgent.detectedGecko_;
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.userAgent.detectedWebkit_;
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.detectedMobile_;
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
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
    if (goog.userAgent.OPERA && goog.global.opera) {
        b = goog.global.opera.version;
        b = typeof b == "function" ? b() : b
    } else {
        if (goog.userAgent.GECKO)
            c = /rv\:([^\);]+)(\)|;)/;
        else if (goog.userAgent.IE)
            c = /MSIE\s+([^\);]+)(\)|;)/;
        else if (goog.userAgent.WEBKIT)
            c = /WebKit\/(\S+)/;
        if (c)
            b = (b = c.exec(goog.userAgent.getUserAgentString())) ? b[1] : ""
    }
    return b
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function(b, c) {
    return goog.string.compareVersions(b, c)
};
goog.userAgent.isVersionCache_ = {};
goog.userAgent.isVersion = function(b) {
    return goog.userAgent.isVersionCache_[b] || (goog.userAgent.isVersionCache_[b] = goog.string.compareVersions(goog.userAgent.VERSION, b) >= 0)
};
goog.events.BrowserEvent = function(b, c) {
    b && this.init(b, c)
};
goog.inherits(goog.events.BrowserEvent, goog.events.Event);
goog.events.BrowserEvent.MouseButton = {LEFT: 0,MIDDLE: 1,RIGHT: 2};
goog.events.BrowserEvent.IEButtonMap_ = [1, 4, 2];
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
    var d = this.type = b.type;
    this.target = b.target || b.srcElement;
    this.currentTarget = c;
    if (c = b.relatedTarget) {
        if (goog.userAgent.GECKO)
            try {
                c = c.nodeName && c
            } catch (e) {
            }
    } else if (d == "mouseover")
        c = b.fromElement;
    else if (d == "mouseout")
        c = b.toElement;
    this.relatedTarget = c;
    this.offsetX = b.offsetX !== undefined ? b.offsetX : b.layerX;
    this.offsetY = b.offsetY !== undefined ? b.offsetY : b.layerY;
    this.clientX = b.clientX !== undefined ? b.clientX : b.pageX;
    this.clientY = b.clientY !== undefined ? b.clientY : b.pageY;
    this.screenX = b.screenX || 
    0;
    this.screenY = b.screenY || 0;
    this.button = b.button;
    this.keyCode = b.keyCode || 0;
    this.charCode = b.charCode || (d == "keypress" ? b.keyCode : 0);
    this.ctrlKey = b.ctrlKey;
    this.altKey = b.altKey;
    this.shiftKey = b.shiftKey;
    this.metaKey = b.metaKey;
    this.event_ = b;
    delete this.returnValue_;
    delete this.propagationStopped_
};
a.isButton = function(b) {
    return goog.userAgent.IE ? this.type == "click" ? b == goog.events.BrowserEvent.MouseButton.LEFT : !!(this.event_.button & goog.events.BrowserEvent.IEButtonMap_[b]) : this.event_.button == b
};
a.stopPropagation = function() {
    this.propagationStopped_ = true;
    if (this.event_.stopPropagation)
        this.event_.stopPropagation();
    else
        this.event_.cancelBubble = true
};
goog.events.BrowserEvent.IE7_SET_KEY_CODE_TO_PREVENT_DEFAULT_ = goog.userAgent.IE && !goog.userAgent.isVersion("8");
goog.events.BrowserEvent.prototype.preventDefault = function() {
    this.returnValue_ = false;
    var b = this.event_;
    if (b.preventDefault)
        b.preventDefault();
    else {
        b.returnValue = false;
        if (goog.events.BrowserEvent.IE7_SET_KEY_CODE_TO_PREVENT_DEFAULT_)
            try {
                var c = 112, d = 123;
                if (b.ctrlKey || b.keyCode >= c && b.keyCode <= d)
                    b.keyCode = -1
            } catch (e) {
            }
    }
};
goog.events.BrowserEvent.prototype.getBrowserEvent = function() {
    return this.event_
};
goog.events.BrowserEvent.prototype.disposeInternal = function() {
    goog.events.BrowserEvent.superClass_.disposeInternal.call(this);
    this.relatedTarget = this.currentTarget = this.target = this.event_ = null
};
goog.events.EventWrapper = function() {
};
goog.events.EventWrapper.prototype.listen = function() {
};
goog.events.EventWrapper.prototype.unlisten = function() {
};
goog.events.Listener = function() {
};
goog.events.Listener.counter_ = 0;
a = goog.events.Listener.prototype;
a.key = 0;
a.removed = false;
a.callOnce = false;
a.init = function(b, c, d, e, f, g) {
    if (goog.isFunction(b))
        this.isFunctionListener_ = true;
    else if (b && b.handleEvent && goog.isFunction(b.handleEvent))
        this.isFunctionListener_ = false;
    else
        throw Error("Invalid listener argument");
    this.listener = b;
    this.proxy = c;
    this.src = d;
    this.type = e;
    this.capture = !!f;
    this.handler = g;
    this.callOnce = false;
    this.key = ++goog.events.Listener.counter_;
    this.removed = false
};
a.handleEvent = function(b) {
    if (this.isFunctionListener_)
        return this.listener.call(this.handler || this.src, b);
    return this.listener.handleEvent.call(this.listener, b)
};
goog.structs = {};
goog.structs.SimplePool = function(b, c) {
    goog.Disposable.call(this);
    this.maxCount_ = c;
    this.freeQueue_ = [];
    this.createInitial_(b)
};
goog.inherits(goog.structs.SimplePool, goog.Disposable);
a = goog.structs.SimplePool.prototype;
a.createObjectFn_ = null;
a.disposeObjectFn_ = null;
a.setCreateObjectFn = function(b) {
    this.createObjectFn_ = b
};
a.setDisposeObjectFn = function(b) {
    this.disposeObjectFn_ = b
};
a.getObject = function() {
    if (this.freeQueue_.length)
        return this.freeQueue_.pop();
    return this.createObject()
};
a.releaseObject = function(b) {
    this.freeQueue_.length < this.maxCount_ ? this.freeQueue_.push(b) : this.disposeObject(b)
};
a.createInitial_ = function(b) {
    if (b > this.maxCount_)
        throw Error("[goog.structs.SimplePool] Initial cannot be greater than max");
    for (var c = 0; c < b; c++)
        this.freeQueue_.push(this.createObject())
};
a.createObject = function() {
    return this.createObjectFn_ ? this.createObjectFn_() : {}
};
a.disposeObject = function(b) {
    if (this.disposeObjectFn_)
        this.disposeObjectFn_(b);
    else if (goog.isFunction(b.dispose))
        b.dispose();
    else
        for (var c in b)
            delete b[c]
};
a.disposeInternal = function() {
    goog.structs.SimplePool.superClass_.disposeInternal.call(this);
    for (var b = this.freeQueue_; b.length; )
        this.disposeObject(b.pop());
    delete this.freeQueue_
};
goog.userAgent.jscript = {};
goog.userAgent.jscript.ASSUME_NO_JSCRIPT = false;
goog.userAgent.jscript.init_ = function() {
    var b = "ScriptEngine" in goog.global;
    goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_ = b && goog.global.ScriptEngine() == "JScript";
    goog.userAgent.jscript.DETECTED_VERSION_ = goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_ ? goog.global.ScriptEngineMajorVersion() + "." + goog.global.ScriptEngineMinorVersion() + "." + goog.global.ScriptEngineBuildVersion() : "0"
};
goog.userAgent.jscript.ASSUME_NO_JSCRIPT || goog.userAgent.jscript.init_();
goog.userAgent.jscript.HAS_JSCRIPT = goog.userAgent.jscript.ASSUME_NO_JSCRIPT ? false : goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_;
goog.userAgent.jscript.VERSION = goog.userAgent.jscript.ASSUME_NO_JSCRIPT ? "0" : goog.userAgent.jscript.DETECTED_VERSION_;
goog.userAgent.jscript.isVersion = function(b) {
    return goog.string.compareVersions(goog.userAgent.jscript.VERSION, b) >= 0
};
goog.events.pools = {};
(function() {
    function b() {
        return {count_: 0,remaining_: 0}
    }
    function c() {
        return []
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
    var g = goog.userAgent.jscript.HAS_JSCRIPT && !goog.userAgent.jscript.isVersion("5.7"), h;
    goog.events.pools.setProxyCallbackFunction = function(m) {
        h = m
    };
    if (g) {
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
        g = 
        0;
        var i = 600, j = new goog.structs.SimplePool(g, i);
        j.setCreateObjectFn(b);
        g = 0;
        i = 600;
        var k = new goog.structs.SimplePool(g, i);
        k.setCreateObjectFn(c);
        g = 0;
        i = 600;
        var l = new goog.structs.SimplePool(g, i);
        l.setCreateObjectFn(d);
        g = 0;
        i = 600;
        var n = new goog.structs.SimplePool(g, i);
        n.setCreateObjectFn(e);
        g = 0;
        i = 600;
        var o = new goog.structs.SimplePool(g, i);
        o.setCreateObjectFn(f)
    } else {
        goog.events.pools.getObject = b;
        goog.events.pools.releaseObject = goog.nullFunction;
        goog.events.pools.getArray = c;
        goog.events.pools.releaseArray = 
        goog.nullFunction;
        goog.events.pools.getProxy = d;
        goog.events.pools.releaseProxy = goog.nullFunction;
        goog.events.pools.getListener = e;
        goog.events.pools.releaseListener = goog.nullFunction;
        goog.events.pools.getEvent = f;
        goog.events.pools.releaseEvent = goog.nullFunction
    }
})();
goog.object = {};
goog.object.forEach = function(b, c, d) {
    for (var e in b)
        c.call(d, b[e], e, b)
};
goog.object.filter = function(b, c, d) {
    var e = {};
    for (var f in b)
        if (c.call(d, b[f], f, b))
            e[f] = b[f];
    return e
};
goog.object.map = function(b, c, d) {
    var e = {};
    for (var f in b)
        e[f] = c.call(d, b[f], f, b);
    return e
};
goog.object.some = function(b, c, d) {
    for (var e in b)
        if (c.call(d, b[e], e, b))
            return true;
    return false
};
goog.object.every = function(b, c, d) {
    for (var e in b)
        if (!c.call(d, b[e], e, b))
            return false;
    return true
};
goog.object.getCount = function(b) {
    var c = 0;
    for (var d in b)
        c++;
    return c
};
goog.object.getAnyKey = function(b) {
    for (var c in b)
        return c
};
goog.object.getAnyValue = function(b) {
    for (var c in b)
        return b[c]
};
goog.object.contains = function(b, c) {
    return goog.object.containsValue(b, c)
};
goog.object.getValues = function(b) {
    var c = [], d = 0;
    for (var e in b)
        c[d++] = b[e];
    return c
};
goog.object.getKeys = function(b) {
    var c = [], d = 0;
    for (var e in b)
        c[d++] = e;
    return c
};
goog.object.containsKey = function(b, c) {
    return c in b
};
goog.object.containsValue = function(b, c) {
    for (var d in b)
        if (b[d] == c)
            return true;
    return false
};
goog.object.findKey = function(b, c, d) {
    for (var e in b)
        if (c.call(d, b[e], e, b))
            return e
};
goog.object.findValue = function(b, c, d) {
    return (c = goog.object.findKey(b, c, d)) && b[c]
};
goog.object.isEmpty = function(b) {
    for (var c in b)
        return false;
    return true
};
goog.object.clear = function(b) {
    for (var c = goog.object.getKeys(b), d = c.length - 1; d >= 0; d--)
        goog.object.remove(b, c[d])
};
goog.object.remove = function(b, c) {
    var d;
    if (d = c in b)
        delete b[c];
    return d
};
goog.object.add = function(b, c, d) {
    if (c in b)
        throw Error('The object already contains the key "' + c + '"');
    goog.object.set(b, c, d)
};
goog.object.get = function(b, c, d) {
    if (c in b)
        return b[c];
    return d
};
goog.object.set = function(b, c, d) {
    b[c] = d
};
goog.object.setIfUndefined = function(b, c, d) {
    return c in b ? b[c] : (b[c] = d)
};
goog.object.clone = function(b) {
    var c = {};
    for (var d in b)
        c[d] = b[d];
    return c
};
goog.object.transpose = function(b) {
    var c = {};
    for (var d in b)
        c[b[d]] = d;
    return c
};
goog.object.PROTOTYPE_FIELDS_ = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
goog.object.extend = function(b) {
    for (var c, d, e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d)
            b[c] = d[c];
        for (var f = 0; f < goog.object.PROTOTYPE_FIELDS_.length; f++) {
            c = goog.object.PROTOTYPE_FIELDS_[f];
            if (Object.prototype.hasOwnProperty.call(d, c))
                b[c] = d[c]
        }
    }
};
goog.object.create = function() {
    var b = arguments.length;
    if (b == 1 && goog.isArray(arguments[0]))
        return goog.object.create.apply(null, arguments[0]);
    if (b % 2)
        throw Error("Uneven number of arguments");
    for (var c = {}, d = 0; d < b; d += 2)
        c[arguments[d]] = arguments[d + 1];
    return c
};
goog.object.createSet = function() {
    var b = arguments.length;
    if (b == 1 && goog.isArray(arguments[0]))
        return goog.object.createSet.apply(null, arguments[0]);
    for (var c = {}, d = 0; d < b; d++)
        c[arguments[d]] = true;
    return c
};
goog.events.listeners_ = {};
goog.events.listenerTree_ = {};
goog.events.sources_ = {};
goog.events.onString_ = "on";
goog.events.onStringMap_ = {};
goog.events.keySeparator_ = "_";
goog.events.listen = function(b, c, d, e, f) {
    if (c)
        if (goog.isArray(c)) {
            for (var g = 0; g < c.length; g++)
                goog.events.listen(b, c[g], d, e, f);
            return null
        } else {
            e = !!e;
            var h = goog.events.listenerTree_;
            c in h || (h[c] = goog.events.pools.getObject());
            h = h[c];
            if (!(e in h)) {
                h[e] = goog.events.pools.getObject();
                h.count_++
            }
            h = h[e];
            var i = goog.getHashCode(b), j;
            h.remaining_++;
            if (h[i]) {
                j = h[i];
                for (g = 0; g < j.length; g++) {
                    h = j[g];
                    if (h.listener == d && h.handler == f) {
                        if (h.removed)
                            break;
                        return j[g].key
                    }
                }
            } else {
                j = h[i] = goog.events.pools.getArray();
                h.count_++
            }
            g = 
            goog.events.pools.getProxy();
            g.src = b;
            h = goog.events.pools.getListener();
            h.init(d, g, b, c, e, f);
            d = h.key;
            g.key = d;
            j.push(h);
            goog.events.listeners_[d] = h;
            goog.events.sources_[i] || (goog.events.sources_[i] = goog.events.pools.getArray());
            goog.events.sources_[i].push(h);
            if (b.addEventListener) {
                if (b == goog.global || !b.customEvent_)
                    b.addEventListener(c, g, e)
            } else
                b.attachEvent(goog.events.getOnString_(c), g);
            return d
        }
    else
        throw Error("Invalid event type");
};
goog.events.listenOnce = function(b, c, d, e, f) {
    if (goog.isArray(c)) {
        for (var g = 0; g < c.length; g++)
            goog.events.listenOnce(b, c[g], d, e, f);
        return null
    }
    b = goog.events.listen(b, c, d, e, f);
    c = goog.events.listeners_[b];
    c.callOnce = true;
    return b
};
goog.events.listenWithWrapper = function(b, c, d, e, f) {
    c.listen(b, d, e, f)
};
goog.events.unlisten = function(b, c, d, e, f) {
    if (goog.isArray(c)) {
        for (var g = 0; g < c.length; g++)
            goog.events.unlisten(b, c[g], d, e, f);
        return null
    }
    e = !!e;
    b = goog.events.getListeners_(b, c, e);
    if (!b)
        return false;
    for (g = 0; g < b.length; g++)
        if (b[g].listener == d && b[g].capture == e && b[g].handler == f)
            return goog.events.unlistenByKey(b[g].key);
    return false
};
goog.events.unlistenByKey = function(b) {
    if (!goog.events.listeners_[b])
        return false;
    var c = goog.events.listeners_[b];
    if (c.removed)
        return false;
    var d = c.src, e = c.type, f = c.proxy, g = c.capture;
    if (d.removeEventListener) {
        if (d == goog.global || !d.customEvent_)
            d.removeEventListener(e, f, g)
    } else
        d.detachEvent && d.detachEvent(goog.events.getOnString_(e), f);
    d = goog.getHashCode(d);
    f = goog.events.listenerTree_[e][g][d];
    if (goog.events.sources_[d]) {
        var h = goog.events.sources_[d];
        goog.array.remove(h, c);
        h.length == 0 && delete goog.events.sources_[d]
    }
    c.removed = 
    true;
    f.needsCleanup_ = true;
    goog.events.cleanUp_(e, g, d, f);
    delete goog.events.listeners_[b];
    return true
};
goog.events.unlistenWithWrapper = function(b, c, d, e, f) {
    c.unlisten(b, d, e, f)
};
goog.events.cleanUp_ = function(b, c, d, e) {
    if (!e.locked_)
        if (e.needsCleanup_) {
            for (var f = 0, g = 0; f < e.length; f++)
                if (e[f].removed) {
                    var h = e[f].proxy;
                    h.src = null;
                    goog.events.pools.releaseProxy(h);
                    goog.events.pools.releaseListener(e[f])
                } else {
                    if (f != g)
                        e[g] = e[f];
                    g++
                }
            e.length = g;
            e.needsCleanup_ = false;
            if (g == 0) {
                goog.events.pools.releaseArray(e);
                delete goog.events.listenerTree_[b][c][d];
                goog.events.listenerTree_[b][c].count_--;
                if (goog.events.listenerTree_[b][c].count_ == 0) {
                    goog.events.pools.releaseObject(goog.events.listenerTree_[b][c]);
                    delete goog.events.listenerTree_[b][c];
                    goog.events.listenerTree_[b].count_--
                }
                if (goog.events.listenerTree_[b].count_ == 0) {
                    goog.events.pools.releaseObject(goog.events.listenerTree_[b]);
                    delete goog.events.listenerTree_[b]
                }
            }
        }
};
goog.events.removeAll = function(b, c, d) {
    var e = 0, f = b == null, g = c == null, h = d == null;
    d = !!d;
    if (f)
        goog.object.forEach(goog.events.sources_, function(j) {
            for (var k = j.length - 1; k >= 0; k--) {
                var l = j[k];
                if ((g || c == l.type) && (h || d == l.capture)) {
                    goog.events.unlistenByKey(l.key);
                    e++
                }
            }
        });
    else {
        b = goog.getHashCode(b);
        if (goog.events.sources_[b]) {
            b = goog.events.sources_[b];
            for (f = b.length - 1; f >= 0; f--) {
                var i = b[f];
                if ((g || c == i.type) && (h || d == i.capture)) {
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
    if (c in e) {
        e = e[c];
        if (d in e) {
            e = e[d];
            b = goog.getHashCode(b);
            if (e[b])
                return e[b]
        }
    }
    return null
};
goog.events.getListener = function(b, c, d, e, f) {
    e = !!e;
    if (b = goog.events.getListeners_(b, c, e))
        for (c = 0; c < b.length; c++)
            if (b[c].listener == d && b[c].capture == e && b[c].handler == f)
                return b[c];
    return null
};
goog.events.hasListener = function(b, c, d) {
    b = goog.getHashCode(b);
    var e = goog.events.sources_[b];
    if (e) {
        var f = goog.isDef(c), g = goog.isDef(d);
        if (f && g) {
            e = goog.events.listenerTree_[c];
            return !!e && !!e[d] && b in e[d]
        } else
            return f || g ? goog.array.some(e, function(h) {
                return f && h.type == c || g && h.capture == d
            }) : true
    }
    return false
};
goog.events.expose = function(b) {
    var c = [];
    for (var d in b)
        b[d] && b[d].id ? c.push(d + " = " + b[d] + " (" + b[d].id + ")") : c.push(d + " = " + b[d]);
    return c.join("\n")
};
goog.events.EventType = {CLICK: "click",DBLCLICK: "dblclick",MOUSEDOWN: "mousedown",MOUSEUP: "mouseup",MOUSEOVER: "mouseover",MOUSEOUT: "mouseout",MOUSEMOVE: "mousemove",SELECTSTART: "selectstart",KEYPRESS: "keypress",KEYDOWN: "keydown",KEYUP: "keyup",BLUR: "blur",FOCUS: "focus",DEACTIVATE: "deactivate",FOCUSIN: goog.userAgent.IE ? "focusin" : "DOMFocusIn",FOCUSOUT: goog.userAgent.IE ? "focusout" : "DOMFocusOut",CHANGE: "change",SELECT: "select",SUBMIT: "submit",CONTEXTMENU: "contextmenu",DRAGSTART: "dragstart",ERROR: "error",HASHCHANGE: "hashchange",
    HELP: "help",LOAD: "load",LOSECAPTURE: "losecapture",READYSTATECHANGE: "readystatechange",RESIZE: "resize",SCROLL: "scroll",UNLOAD: "unload"};
goog.events.getOnString_ = function(b) {
    if (b in goog.events.onStringMap_)
        return goog.events.onStringMap_[b];
    return goog.events.onStringMap_[b] = goog.events.onString_ + b
};
goog.events.fireListeners = function(b, c, d, e) {
    var f = goog.events.listenerTree_;
    if (c in f) {
        f = f[c];
        if (d in f)
            return goog.events.fireListeners_(f[d], b, c, d, e)
    }
    return true
};
goog.events.fireListeners_ = function(b, c, d, e, f) {
    var g = 1;
    c = goog.getHashCode(c);
    if (b[c]) {
        b.remaining_--;
        b = b[c];
        if (b.locked_)
            b.locked_++;
        else
            b.locked_ = 1;
        try {
            for (var h = b.length, i = 0; i < h; i++) {
                var j = b[i];
                if (j && !j.removed)
                    g &= goog.events.fireListener(j, f) !== false
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
goog.events.getTotalListenerCount = function() {
    return goog.object.getCount(goog.events.listeners_)
};
goog.events.dispatchEvent = function(b, c) {
    if (goog.isString(c))
        c = new goog.events.Event(c, b);
    else if (c instanceof goog.events.Event)
        c.target = c.target || b;
    else {
        var d = c;
        c = new goog.events.Event(c.type, b);
        goog.object.extend(c, d)
    }
    d = 1;
    var e, f = c.type, g = goog.events.listenerTree_;
    if (!(f in g))
        return true;
    g = g[f];
    f = true in g;
    var h;
    if (f) {
        e = [];
        for (h = b; h; h = h.getParentEventTarget())
            e.push(h);
        h = g[true];
        h.remaining_ = h.count_;
        for (var i = e.length - 1; !c.propagationStopped_ && i >= 0 && h.remaining_; i--) {
            c.currentTarget = e[i];
            d &= goog.events.fireListeners_(h, 
            e[i], c.type, true, c) && c.returnValue_ != false
        }
    }
    if (h = false in g) {
        h = g[false];
        h.remaining_ = h.count_;
        if (f)
            for (i = 0; !c.propagationStopped_ && i < e.length && h.remaining_; i++) {
                c.currentTarget = e[i];
                d &= goog.events.fireListeners_(h, e[i], c.type, false, c) && c.returnValue_ != false
            }
        else
            for (b = b; !c.propagationStopped_ && b && h.remaining_; b = b.getParentEventTarget()) {
                c.currentTarget = b;
                d &= goog.events.fireListeners_(h, b, c.type, false, c) && c.returnValue_ != false
            }
    }
    return Boolean(d)
};
goog.events.protectBrowserEventEntryPoint = function(b, c) {
    goog.events.handleBrowserEvent_ = b.protectEntryPoint(goog.events.handleBrowserEvent_, c);
    goog.events.pools.setProxyCallbackFunction(goog.events.handleBrowserEvent_)
};
goog.events.handleBrowserEvent_ = function(b, c) {
    if (!goog.events.listeners_[b])
        return true;
    b = goog.events.listeners_[b];
    var d = b.type, e = goog.events.listenerTree_;
    if (!(d in e))
        return true;
    e = e[d];
    var f, g;
    if (goog.userAgent.IE) {
        f = c || goog.getObjectByName("window.event");
        c = true in e;
        var h = false in e;
        if (c) {
            if (goog.events.isMarkedIeEvent_(f))
                return true;
            goog.events.markIeEvent_(f)
        }
        var i = goog.events.pools.getEvent();
        i.init(f, this);
        f = true;
        try {
            if (c) {
                for (var j = goog.events.pools.getArray(), k = i.currentTarget; k; k = k.parentNode)
                    j.push(k);
                g = e[true];
                g.remaining_ = g.count_;
                for (var l = j.length - 1; !i.propagationStopped_ && l >= 0 && g.remaining_; l--) {
                    i.currentTarget = j[l];
                    f &= goog.events.fireListeners_(g, j[l], d, true, i)
                }
                if (h) {
                    g = e[false];
                    g.remaining_ = g.count_;
                    for (l = 0; !i.propagationStopped_ && l < j.length && g.remaining_; l++) {
                        i.currentTarget = j[l];
                        f &= goog.events.fireListeners_(g, j[l], d, false, i)
                    }
                }
            } else
                f = goog.events.fireListener(b, i)
        }finally {
            if (j) {
                j.length = 0;
                goog.events.pools.releaseArray(j)
            }
            i.dispose();
            goog.events.pools.releaseEvent(i)
        }
        return f
    }
    g = new goog.events.BrowserEvent(c, 
    this);
    try {
        f = goog.events.fireListener(b, g)
    }finally {
        g.dispose()
    }
    return f
};
goog.events.pools.setProxyCallbackFunction(goog.events.handleBrowserEvent_);
goog.events.markIeEvent_ = function(b) {
    var c = false;
    if (b.keyCode == 0)
        try {
            b.keyCode = -1;
            return
        } catch (d) {
            c = true
        }
    if (c || b.returnValue == undefined)
        b.returnValue = true
};
goog.events.isMarkedIeEvent_ = function(b) {
    return b.keyCode < 0 || b.returnValue != undefined
};
goog.events.uniqueIdCounter_ = 0;
goog.events.getUniqueId = function(b) {
    return b + "_" + goog.events.uniqueIdCounter_++
};
goog.events.EventTarget = function() {
    goog.Disposable.call(this)
};
goog.inherits(goog.events.EventTarget, goog.Disposable);
a = goog.events.EventTarget.prototype;
a.customEvent_ = true;
a.parentEventTarget_ = null;
a.getParentEventTarget = function() {
    return this.parentEventTarget_
};
a.setParentEventTarget = function(b) {
    this.parentEventTarget_ = b
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
a.disposeInternal = function() {
    goog.events.EventTarget.superClass_.disposeInternal.call(this);
    goog.events.removeAll(this);
    this.parentEventTarget_ = null
};
var mbrio = {};
mbrio.ChromiumSnapshotStatus = {};
var BADGE_COLOR_ = {color: [255, 202, 28, 255]};
mbrio.ChromiumSnapshotStatus.none = "none";
mbrio.ChromiumSnapshotStatus.loading = "loading";
mbrio.ChromiumSnapshotStatus.loaded = "loaded";
mbrio.ChromiumSnapshotStatus.error = "error";
mbrio.ChromiumSnapshot = function() {
    goog.events.EventTarget.call(this);
    this.revisionModel_ = new mbrio.RevisionModel;
    this.updateInterval_ = this.icon_ = this.loadingAnimation_ = null;
    var b = this;
    goog.events.listen(window, "unload", function() {
        b.stopUpdateInterval()
    });
    this.currentRequest_ = null;
    this.status = mbrio.ChromiumSnapshotStatus.none;
    this.initIcon();
    this.init()
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
    if (b.stringValue != null && b.stringValue.length > 0)
        c = b.stringValue;
    return c
};
a.initIcon = function() {
    this.icon_ = new mbrio.Icon;
    this.loadingAnimation_ = new mbrio.LoadingAnimation(this)
};
a.reset = function() {
    chrome.browserAction.setBadgeText({text: ""});
    this.icon_.displayUpToDate = true
};
a.init = function() {
    this.reset();
    this.update()
};
a.checkVersion = function(b) {
    if (!isNaN(b)) {
        this.revisionModel_.version = b;
        if (this.revisionModel_.version > mbrio.Settings.latestDownloadedRevision) {
            chrome.browserAction.setBadgeBackgroundColor(BADGE_COLOR_);
            chrome.browserAction.setBadgeText({text: "new"});
            this.icon_.displayUpToDate = false
        } else {
            chrome.browserAction.setBadgeText({text: ""});
            this.icon_.displayUpToDate = true
        }
    }
};
a.startUpdateInterval = function() {
    var b = this;
    this.stopUpdateInterval();
    if (mbrio.Settings.canCheckContinuously)
        this.updateInterval_ = setTimeout(function() {
            b.update()
        }, parseInt(mbrio.Settings.checkInterval) * 6E4)
};
a.stopUpdateInterval = function() {
    if (this.updateInterval_ != null) {
        clearTimeout(this.updateInterval_);
        this.updateInterval_ = null
    }
};
a.update = function() {
    var b = this;
    this.startUpdateInterval();
    this.status = mbrio.ChromiumSnapshotStatus.loading;
    this.icon_.displayError = false;
    this.loadingAnimation_.start();
    this.request(mbrio.Settings.currentRepository.getLatestUrl(this.platform), function(c) {
        if (c.readyState == 4)
            if (c.status != 200) {
                b.icon_.displayError = true;
                b.loadingAnimation_.registerStop();
                b.status = mbrio.ChromiumSnapshotStatus.error
            } else {
                b.checkVersion(parseInt(c.responseText));
                b.retrieveChangeLog()
            }
    })
};
a.retrieveChangeLog = function() {
    var b = this;
    this.request(mbrio.Settings.currentRepository.getChangeLogUrl(this.platform, this.revisionModel_.version), function(c) {
        if (c.readyState == 4) {
            if (c.status != 200) {
                b.icon_.displayError = true;
                b.status = mbrio.ChromiumSnapshotStatus.error
            } else {
                b.revisionModel_.changeLog = c.responseXML;
                b.status = mbrio.ChromiumSnapshotStatus.loaded
            }
            b.loadingAnimation_.registerStop()
        }
    })
};
a.abort = function() {
    if (this.currentRequest_ != null) {
        this.currentRequest_.abort();
        this.currentRequest_ = null
    }
};
a.request = function(b, c) {
    this.abort();
    this.currentRequest_ = new XMLHttpRequest;
    var d = this;
    this.currentRequest_.onreadystatechange = function() {
        c != null && c(d.currentRequest_)
    };
    this.currentRequest_.open("GET", b, true);
    this.currentRequest_.send()
};
goog.dom = {};
goog.dom.TagName = {A: "A",ABBR: "ABBR",ACRONYM: "ACRONYM",ADDRESS: "ADDRESS",APPLET: "APPLET",AREA: "AREA",B: "B",BASE: "BASE",BASEFONT: "BASEFONT",BDO: "BDO",BIG: "BIG",BLOCKQUOTE: "BLOCKQUOTE",BODY: "BODY",BR: "BR",BUTTON: "BUTTON",CAPTION: "CAPTION",CENTER: "CENTER",CITE: "CITE",CODE: "CODE",COL: "COL",COLGROUP: "COLGROUP",DD: "DD",DEL: "DEL",DFN: "DFN",DIR: "DIR",DIV: "DIV",DL: "DL",DT: "DT",EM: "EM",FIELDSET: "FIELDSET",FONT: "FONT",FORM: "FORM",FRAME: "FRAME",FRAMESET: "FRAMESET",H1: "H1",H2: "H2",H3: "H3",H4: "H4",H5: "H5",H6: "H6",
    HEAD: "HEAD",HR: "HR",HTML: "HTML",I: "I",IFRAME: "IFRAME",IMG: "IMG",INPUT: "INPUT",INS: "INS",ISINDEX: "ISINDEX",KBD: "KBD",LABEL: "LABEL",LEGEND: "LEGEND",LI: "LI",LINK: "LINK",MAP: "MAP",MENU: "MENU",META: "META",NOFRAMES: "NOFRAMES",NOSCRIPT: "NOSCRIPT",OBJECT: "OBJECT",OL: "OL",OPTGROUP: "OPTGROUP",OPTION: "OPTION",P: "P",PARAM: "PARAM",PRE: "PRE",Q: "Q",S: "S",SAMP: "SAMP",SCRIPT: "SCRIPT",SELECT: "SELECT",SMALL: "SMALL",SPAN: "SPAN",STRIKE: "STRIKE",STRONG: "STRONG",STYLE: "STYLE",SUB: "SUB",SUP: "SUP",TABLE: "TABLE",TBODY: "TBODY",
    TD: "TD",TEXTAREA: "TEXTAREA",TFOOT: "TFOOT",TH: "TH",THEAD: "THEAD",TITLE: "TITLE",TR: "TR",TT: "TT",U: "U",UL: "UL",VAR: "VAR"};
goog.dom.classes = {};
goog.dom.classes.set = function(b, c) {
    b.className = c
};
goog.dom.classes.get = function(b) {
    return (b = b.className) && typeof b.split == "function" ? b.split(" ") : []
};
goog.dom.classes.add = function(b) {
    var c = goog.dom.classes.get(b), d = goog.array.slice(arguments, 1);
    d = goog.dom.classes.add_(c, d);
    b.className = c.join(" ");
    return d
};
goog.dom.classes.remove = function(b) {
    var c = goog.dom.classes.get(b), d = goog.array.slice(arguments, 1);
    d = goog.dom.classes.remove_(c, d);
    b.className = c.join(" ");
    return d
};
goog.dom.classes.add_ = function(b, c) {
    for (var d = 0, e = 0; e < c.length; e++)
        if (!goog.array.contains(b, c[e])) {
            b.push(c[e]);
            d++
        }
    return d == c.length
};
goog.dom.classes.remove_ = function(b, c) {
    for (var d = 0, e = 0; e < b.length; e++)
        if (goog.array.contains(c, b[e])) {
            goog.array.splice(b, e--, 1);
            d++
        }
    return d == c.length
};
goog.dom.classes.swap = function(b, c, d) {
    for (var e = goog.dom.classes.get(b), f = false, g = 0; g < e.length; g++)
        if (e[g] == c) {
            goog.array.splice(e, g--, 1);
            f = true
        }
    if (f) {
        e.push(d);
        b.className = e.join(" ")
    }
    return f
};
goog.dom.classes.addRemove = function(b, c, d) {
    var e = goog.dom.classes.get(b);
    if (goog.isString(c))
        goog.array.remove(e, c);
    else
        goog.isArray(c) && goog.dom.classes.remove_(e, c);
    if (goog.isString(d) && !goog.array.contains(e, d))
        e.push(d);
    else
        goog.isArray(d) && goog.dom.classes.add_(e, d);
    b.className = e.join(" ")
};
goog.dom.classes.has = function(b, c) {
    return goog.array.contains(goog.dom.classes.get(b), c)
};
goog.dom.classes.enable = function(b, c, d) {
    d ? goog.dom.classes.add(b, c) : goog.dom.classes.remove(b, c)
};
goog.dom.classes.toggle = function(b, c) {
    var d = !goog.dom.classes.has(b, c);
    goog.dom.classes.enable(b, c, d);
    return d
};
goog.math = {};
goog.math.Coordinate = function(b, c) {
    this.x = goog.isDef(b) ? b : 0;
    this.y = goog.isDef(c) ? c : 0
};
goog.math.Coordinate.prototype.clone = function() {
    return new goog.math.Coordinate(this.x, this.y)
};
if (goog.DEBUG)
    goog.math.Coordinate.prototype.toString = function() {
        return "(" + this.x + ", " + this.y + ")"
    };
goog.math.Coordinate.equals = function(b, c) {
    if (b == c)
        return true;
    if (!b || !c)
        return false;
    return b.x == c.x && b.y == c.y
};
goog.math.Coordinate.distance = function(b, c) {
    var d = b.x - c.x;
    b = b.y - c.y;
    return Math.sqrt(d * d + b * b)
};
goog.math.Coordinate.squaredDistance = function(b, c) {
    var d = b.x - c.x;
    b = b.y - c.y;
    return d * d + b * b
};
goog.math.Coordinate.difference = function(b, c) {
    return new goog.math.Coordinate(b.x - c.x, b.y - c.y)
};
goog.math.Coordinate.sum = function(b, c) {
    return new goog.math.Coordinate(b.x + c.x, b.y + c.y)
};
goog.math.Size = function(b, c) {
    this.width = b;
    this.height = c
};
goog.math.Size.equals = function(b, c) {
    if (b == c)
        return true;
    if (!b || !c)
        return false;
    return b.width == c.width && b.height == c.height
};
goog.math.Size.prototype.clone = function() {
    return new goog.math.Size(this.width, this.height)
};
if (goog.DEBUG)
    goog.math.Size.prototype.toString = function() {
        return "(" + this.width + " x " + this.height + ")"
    };
a = goog.math.Size.prototype;
a.getLongest = function() {
    return Math.max(this.width, this.height)
};
a.getShortest = function() {
    return Math.min(this.width, this.height)
};
a.area = function() {
    return this.width * this.height
};
a.aspectRatio = function() {
    return this.width / this.height
};
a.isEmpty = function() {
    return !this.area()
};
a.ceil = function() {
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this
};
a.fitsInside = function(b) {
    return this.width <= b.width && this.height <= b.height
};
a.floor = function() {
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this
};
a.round = function() {
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this
};
a.scale = function(b) {
    this.width *= b;
    this.height *= b;
    return this
};
a.scaleToFit = function(b) {
    b = this.aspectRatio() > b.aspectRatio() ? b.width / this.width : b.height / this.height;
    return this.scale(b)
};
goog.dom.ASSUME_QUIRKS_MODE = false;
goog.dom.ASSUME_STANDARDS_MODE = false;
goog.dom.COMPAT_MODE_KNOWN_ = goog.dom.ASSUME_QUIRKS_MODE || goog.dom.ASSUME_STANDARDS_MODE;
goog.dom.NodeType = {ELEMENT: 1,ATTRIBUTE: 2,TEXT: 3,CDATA_SECTION: 4,ENTITY_REFERENCE: 5,ENTITY: 6,PROCESSING_INSTRUCTION: 7,COMMENT: 8,DOCUMENT: 9,DOCUMENT_TYPE: 10,DOCUMENT_FRAGMENT: 11,NOTATION: 12};
goog.dom.getDomHelper = function(b) {
    return b ? new goog.dom.DomHelper(goog.dom.getOwnerDocument(b)) : goog.dom.defaultDomHelper_ || (goog.dom.defaultDomHelper_ = new goog.dom.DomHelper)
};
goog.dom.getDocument = function() {
    return document
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
    if (e.querySelectorAll && (c || d) && (!goog.userAgent.WEBKIT || goog.dom.isCss1CompatMode_(b) || goog.userAgent.isVersion("528"))) {
        d = c + (d ? "." + d : "");
        return e.querySelectorAll(d)
    }
    if (d && e.getElementsByClassName) {
        b = e.getElementsByClassName(d);
        if (c) {
            e = {};
            for (var f = 0, g = 0, h; h = b[g]; g++)
                if (c == h.nodeName.toLowerCase())
                    e[f++] = h;
            e.length = f;
            return e
        } else
            return b
    }
    b = e.getElementsByTagName(c || "*");
    if (d) {
        e = {};
        for (g = f = 0; h = b[g]; g++) {
            c = 
            h.className;
            if (typeof c.split == "function" && goog.array.contains(c.split(" "), d))
                e[f++] = h
        }
        e.length = f;
        return e
    } else
        return b
};
goog.dom.$$ = goog.dom.getElementsByTagNameAndClass;
goog.dom.setProperties = function(b, c) {
    goog.object.forEach(c, function(d, e) {
        if (e == "style")
            b.style.cssText = d;
        else if (e == "class")
            b.className = d;
        else if (e == "for")
            b.htmlFor = d;
        else if (e in goog.dom.DIRECT_ATTRIBUTE_MAP_)
            b.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[e], d);
        else
            b[e] = d
    })
};
goog.dom.DIRECT_ATTRIBUTE_MAP_ = {cellpadding: "cellPadding",cellspacing: "cellSpacing",colspan: "colSpan",rowspan: "rowSpan",valign: "vAlign",height: "height",width: "width",usemap: "useMap",frameborder: "frameBorder",type: "type"};
goog.dom.getViewportSize = function(b) {
    return goog.dom.getViewportSize_(b || window)
};
goog.dom.getViewportSize_ = function(b) {
    var c = b.document;
    if (goog.userAgent.WEBKIT && !goog.userAgent.isVersion("500") && !goog.userAgent.MOBILE) {
        if (typeof b.innerHeight == "undefined")
            b = window;
        c = b.innerHeight;
        var d = b.document.documentElement.scrollHeight;
        if (b == b.top)
            if (d < c)
                c -= 15;
        return new goog.math.Size(b.innerWidth, c)
    }
    b = goog.dom.isCss1CompatMode_(c) && (!goog.userAgent.OPERA || goog.userAgent.OPERA && goog.userAgent.isVersion("9.50")) ? c.documentElement : c.body;
    return new goog.math.Size(b.clientWidth, b.clientHeight)
};
goog.dom.getDocumentHeight = function() {
    return goog.dom.getDocumentHeight_(window)
};
goog.dom.getDocumentHeight_ = function(b) {
    var c = b.document, d = 0;
    if (c) {
        b = goog.dom.getViewportSize_(b).height;
        d = c.body;
        var e = c.documentElement;
        if (goog.dom.isCss1CompatMode_(c) && e.scrollHeight)
            d = e.scrollHeight != b ? e.scrollHeight : e.offsetHeight;
        else {
            c = e.scrollHeight;
            var f = e.offsetHeight;
            if (e.clientHeight != f) {
                c = d.scrollHeight;
                f = d.offsetHeight
            }
            d = c > b ? c > f ? c : f : c < f ? c : f
        }
    }
    return d
};
goog.dom.getPageScroll = function(b) {
    b = b || goog.global || window;
    return goog.dom.getDomHelper(b.document).getDocumentScroll()
};
goog.dom.getDocumentScroll = function() {
    return goog.dom.getDocumentScroll_(document)
};
goog.dom.getDocumentScroll_ = function(b) {
    b = goog.dom.getDocumentScrollElement_(b);
    return new goog.math.Coordinate(b.scrollLeft, b.scrollTop)
};
goog.dom.getDocumentScrollElement = function() {
    return goog.dom.getDocumentScrollElement_(document)
};
goog.dom.getDocumentScrollElement_ = function(b) {
    return !goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_(b) ? b.documentElement : b.body
};
goog.dom.getWindow = function(b) {
    return b ? goog.dom.getWindow_(b) : window
};
goog.dom.getWindow_ = function(b) {
    if (b.parentWindow)
        return b.parentWindow;
    if (goog.userAgent.WEBKIT && !goog.userAgent.isVersion("500") && !goog.userAgent.MOBILE) {
        var c = b.createElement("script");
        c.innerHTML = "document.parentWindow=window";
        var d = b.documentElement;
        d.appendChild(c);
        d.removeChild(c);
        return b.parentWindow
    }
    return b.defaultView
};
goog.dom.createDom = function() {
    return goog.dom.createDom_(document, arguments)
};
goog.dom.createDom_ = function(b, c) {
    var d = c[0], e = c[1];
    if (goog.userAgent.IE && e && (e.name || e.type)) {
        d = ["<", d];
        e.name && d.push(' name="', goog.string.htmlEscape(e.name), '"');
        if (e.type) {
            d.push(' type="', goog.string.htmlEscape(e.type), '"');
            e = goog.cloneObject(e);
            delete e.type
        }
        d.push(">");
        d = d.join("")
    }
    var f = b.createElement(d);
    if (e)
        if (goog.isString(e))
            f.className = e;
        else
            goog.dom.setProperties(f, e);
    if (c.length > 2) {
        function g(h) {
            if (h)
                f.appendChild(goog.isString(h) ? b.createTextNode(h) : h)
        }
        for (e = 2; e < c.length; e++) {
            d = 
            c[e];
            goog.isArrayLike(d) && !goog.dom.isNodeLike(d) ? goog.array.forEach(goog.dom.isNodeList(d) ? goog.array.clone(d) : d, g) : g(d)
        }
    }
    return f
};
goog.dom.$dom = goog.dom.createDom;
goog.dom.createElement = function(b) {
    return document.createElement(b)
};
goog.dom.createTextNode = function(b) {
    return document.createTextNode(b)
};
goog.dom.htmlToDocumentFragment = function(b) {
    return goog.dom.htmlToDocumentFragment_(document, b)
};
goog.dom.htmlToDocumentFragment_ = function(b, c) {
    var d = b.createElement("div");
    d.innerHTML = c;
    if (d.childNodes.length == 1)
        return d.firstChild;
    else {
        for (b = b.createDocumentFragment(); d.firstChild; )
            b.appendChild(d.firstChild);
        return b
    }
};
goog.dom.getCompatMode = function() {
    return goog.dom.isCss1CompatMode() ? "CSS1Compat" : "BackCompat"
};
goog.dom.isCss1CompatMode = function() {
    return goog.dom.isCss1CompatMode_(document)
};
goog.dom.isCss1CompatMode_ = function(b) {
    if (goog.dom.COMPAT_MODE_KNOWN_)
        return goog.dom.ASSUME_STANDARDS_MODE;
    return b.compatMode == "CSS1Compat"
};
goog.dom.canHaveChildren = function(b) {
    if (b.nodeType != goog.dom.NodeType.ELEMENT)
        return false;
    if ("canHaveChildren" in b)
        return b.canHaveChildren;
    switch (b.tagName) {
        case goog.dom.TagName.APPLET:
        case goog.dom.TagName.AREA:
        case goog.dom.TagName.BR:
        case goog.dom.TagName.COL:
        case goog.dom.TagName.FRAME:
        case goog.dom.TagName.HR:
        case goog.dom.TagName.IMG:
        case goog.dom.TagName.INPUT:
        case goog.dom.TagName.IFRAME:
        case goog.dom.TagName.ISINDEX:
        case goog.dom.TagName.LINK:
        case goog.dom.TagName.NOFRAMES:
        case goog.dom.TagName.NOSCRIPT:
        case goog.dom.TagName.META:
        case goog.dom.TagName.OBJECT:
        case goog.dom.TagName.PARAM:
        case goog.dom.TagName.SCRIPT:
        case goog.dom.TagName.STYLE:
            return false
    }
    return true
};
goog.dom.appendChild = function(b, c) {
    b.appendChild(c)
};
goog.dom.removeChildren = function(b) {
    for (var c; c = b.firstChild; )
        b.removeChild(c)
};
goog.dom.insertSiblingBefore = function(b, c) {
    c.parentNode && c.parentNode.insertBefore(b, c)
};
goog.dom.insertSiblingAfter = function(b, c) {
    c.parentNode && c.parentNode.insertBefore(b, c.nextSibling)
};
goog.dom.removeNode = function(b) {
    return b && b.parentNode ? b.parentNode.removeChild(b) : null
};
goog.dom.replaceNode = function(b, c) {
    var d = c.parentNode;
    d && d.replaceChild(b, c)
};
goog.dom.flattenElement = function(b) {
    var c, d = b.parentNode;
    if (d && d.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT)
        if (b.removeNode)
            return b.removeNode(false);
        else {
            for (; c = b.firstChild; )
                d.insertBefore(c, b);
            return goog.dom.removeNode(b)
        }
};
goog.dom.getFirstElementChild = function(b) {
    return goog.dom.getNextElementNode_(b.firstChild, true)
};
goog.dom.getLastElementChild = function(b) {
    return goog.dom.getNextElementNode_(b.lastChild, false)
};
goog.dom.getNextElementSibling = function(b) {
    return goog.dom.getNextElementNode_(b.nextSibling, true)
};
goog.dom.getPreviousElementSibling = function(b) {
    return goog.dom.getNextElementNode_(b.previousSibling, false)
};
goog.dom.getNextElementNode_ = function(b, c) {
    for (; b && b.nodeType != goog.dom.NodeType.ELEMENT; )
        b = c ? b.nextSibling : b.previousSibling;
    return b
};
goog.dom.isNodeLike = function(b) {
    return goog.isObject(b) && b.nodeType > 0
};
goog.dom.BAD_CONTAINS_WEBKIT_ = goog.userAgent.WEBKIT && goog.userAgent.isVersion("522");
goog.dom.contains = function(b, c) {
    if (typeof b.contains != "undefined" && !goog.dom.BAD_CONTAINS_WEBKIT_ && c.nodeType == goog.dom.NodeType.ELEMENT)
        return b == c || b.contains(c);
    if (typeof b.compareDocumentPosition != "undefined")
        return b == c || Boolean(b.compareDocumentPosition(c) & 16);
    for (; c && b != c; )
        c = c.parentNode;
    return c == b
};
goog.dom.compareNodeOrder = function(b, c) {
    if (b == c)
        return 0;
    if (b.compareDocumentPosition)
        return b.compareDocumentPosition(c) & 2 ? 1 : -1;
    if ("sourceIndex" in b || b.parentNode && "sourceIndex" in b.parentNode) {
        var d = b.nodeType == goog.dom.NodeType.ELEMENT, e = c.nodeType == goog.dom.NodeType.ELEMENT;
        if (d && e)
            return b.sourceIndex - c.sourceIndex;
        else {
            var f = b.parentNode, g = c.parentNode;
            if (f == g)
                return goog.dom.compareSiblingOrder_(b, c);
            if (!d && goog.dom.contains(f, c))
                return -1 * goog.dom.compareParentsDescendantNodeIe_(b, c);
            if (!e && 
            goog.dom.contains(g, b))
                return goog.dom.compareParentsDescendantNodeIe_(c, b);
            return (d ? b.sourceIndex : f.sourceIndex) - (e ? c.sourceIndex : g.sourceIndex)
        }
    }
    e = goog.dom.getOwnerDocument(b);
    d = e.createRange();
    d.selectNode(b);
    d.collapse(true);
    b = e.createRange();
    b.selectNode(c);
    b.collapse(true);
    return d.compareBoundaryPoints(goog.global.Range.START_TO_END, b)
};
goog.dom.compareParentsDescendantNodeIe_ = function(b, c) {
    var d = b.parentNode;
    if (d == c)
        return -1;
    for (c = c; c.parentNode != d; )
        c = c.parentNode;
    return goog.dom.compareSiblingOrder_(c, b)
};
goog.dom.compareSiblingOrder_ = function(b, c) {
    for (c = c; c = c.previousSibling; )
        if (c == b)
            return -1;
    return 1
};
goog.dom.findCommonAncestor = function() {
    var b, c = arguments.length;
    if (c) {
        if (c == 1)
            return arguments[0]
    } else
        return null;
    var d = [], e = Infinity;
    for (b = 0; b < c; b++) {
        for (var f = [], g = arguments[b]; g; ) {
            f.unshift(g);
            g = g.parentNode
        }
        d.push(f);
        e = Math.min(e, f.length)
    }
    f = null;
    for (b = 0; b < e; b++) {
        g = d[0][b];
        for (var h = 1; h < c; h++)
            if (g != d[h][b])
                return f;
        f = g
    }
    return f
};
goog.dom.getOwnerDocument = function(b) {
    return b.nodeType == goog.dom.NodeType.DOCUMENT ? b : b.ownerDocument || b.document
};
goog.dom.getFrameContentDocument = function(b) {
    return b = goog.userAgent.WEBKIT ? b.document || b.contentWindow.document : b.contentDocument || b.contentWindow.document
};
goog.dom.getFrameContentWindow = function(b) {
    return b.contentWindow || goog.dom.getWindow_(goog.dom.getFrameContentDocument(b))
};
goog.dom.setTextContent = function(b, c) {
    if ("textContent" in b)
        b.textContent = c;
    else if (b.firstChild && b.firstChild.nodeType == goog.dom.NodeType.TEXT) {
        for (; b.lastChild != b.firstChild; )
            b.removeChild(b.lastChild);
        b.firstChild.data = c
    } else {
        goog.dom.removeChildren(b);
        var d = goog.dom.getOwnerDocument(b);
        b.appendChild(d.createTextNode(c))
    }
};
goog.dom.getOuterHtml = function(b) {
    if ("outerHTML" in b)
        return b.outerHTML;
    else {
        var c = goog.dom.getOwnerDocument(b);
        c = c.createElement("div");
        c.appendChild(b.cloneNode(true));
        return c.innerHTML
    }
};
goog.dom.findNode = function(b, c) {
    var d = [];
    return (b = goog.dom.findNodes_(b, c, d, true)) ? d[0] : undefined
};
goog.dom.findNodes = function(b, c) {
    var d = [];
    goog.dom.findNodes_(b, c, d, false);
    return d
};
goog.dom.findNodes_ = function(b, c, d, e) {
    if (b != null)
        for (var f = 0, g; g = b.childNodes[f]; f++) {
            if (c(g)) {
                d.push(g);
                if (e)
                    return true
            }
            if (goog.dom.findNodes_(g, c, d, e))
                return true
        }
    return false
};
goog.dom.TAGS_TO_IGNORE_ = {SCRIPT: 1,STYLE: 1,HEAD: 1,IFRAME: 1,OBJECT: 1};
goog.dom.PREDEFINED_TAG_VALUES_ = {IMG: " ",BR: "\n"};
goog.dom.isFocusableTabIndex = function(b) {
    var c = b.getAttributeNode("tabindex");
    if (c && c.specified) {
        b = b.tabIndex;
        return goog.isNumber(b) && b >= 0
    }
    return false
};
goog.dom.setFocusableTabIndex = function(b, c) {
    if (c)
        b.tabIndex = 0;
    else
        b.removeAttribute("tabIndex")
};
goog.dom.getTextContent = function(b) {
    if (goog.userAgent.IE && "innerText" in b)
        b = goog.string.canonicalizeNewlines(b.innerText);
    else {
        var c = [];
        goog.dom.getTextContent_(b, c, true);
        b = c.join("")
    }
    b = b.replace(/\xAD/g, "");
    b = b.replace(/ +/g, " ");
    if (b != " ")
        b = b.replace(/^\s*/, "");
    return b
};
goog.dom.getRawTextContent = function(b) {
    var c = [];
    goog.dom.getTextContent_(b, c, false);
    return c.join("")
};
goog.dom.getTextContent_ = function(b, c, d) {
    if (!(b.nodeName in goog.dom.TAGS_TO_IGNORE_))
        if (b.nodeType == goog.dom.NodeType.TEXT)
            d ? c.push(String(b.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : c.push(b.nodeValue);
        else if (b.nodeName in goog.dom.PREDEFINED_TAG_VALUES_)
            c.push(goog.dom.PREDEFINED_TAG_VALUES_[b.nodeName]);
        else
            for (b = b.firstChild; b; ) {
                goog.dom.getTextContent_(b, c, d);
                b = b.nextSibling
            }
};
goog.dom.getNodeTextLength = function(b) {
    return goog.dom.getTextContent(b).length
};
goog.dom.getNodeTextOffset = function(b, c) {
    c = c || goog.dom.getOwnerDocument(b).body;
    for (var d = []; b && b != c; ) {
        for (var e = b; e = e.previousSibling; )
            d.unshift(goog.dom.getTextContent(e));
        b = b.parentNode
    }
    return goog.string.trimLeft(d.join("")).replace(/ +/g, " ").length
};
goog.dom.getNodeAtOffset = function(b, c, d) {
    b = [b];
    for (var e = 0, f; b.length > 0 && e < c; ) {
        f = b.pop();
        if (!(f.nodeName in goog.dom.TAGS_TO_IGNORE_))
            if (f.nodeType == goog.dom.NodeType.TEXT) {
                var g = f.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " ");
                e += g.length
            } else if (f.nodeName in goog.dom.PREDEFINED_TAG_VALUES_)
                e += goog.dom.PREDEFINED_TAG_VALUES_[f.nodeName].length;
            else
                for (g = f.childNodes.length - 1; g >= 0; g--)
                    b.push(f.childNodes[g])
    }
    if (goog.isObject(d)) {
        d.remainder = f ? f.nodeValue.length + c - e - 1 : 0;
        d.node = f
    }
    return f
};
goog.dom.isNodeList = function(b) {
    if (b && typeof b.length == "number")
        if (goog.isObject(b))
            return typeof b.item == "function" || typeof b.item == "string";
        else if (goog.isFunction(b))
            return typeof b.item == "function";
    return false
};
goog.dom.getAncestorByTagNameAndClass = function(b, c, d) {
    return goog.dom.getAncestor(b, function(e) {
        return (!c || e.nodeName == c) && (!d || goog.dom.classes.has(e, d))
    }, true)
};
goog.dom.getAncestor = function(b, c, d, e) {
    if (!d)
        b = b.parentNode;
    d = e == null;
    for (var f = 0; b && (d || f <= e); ) {
        if (c(b))
            return b;
        b = b.parentNode;
        f++
    }
    return null
};
goog.dom.DomHelper = function(b) {
    this.document_ = b || goog.global.document || document
};
a = goog.dom.DomHelper.prototype;
a.getDomHelper = goog.dom.getDomHelper;
a.setDocument = function(b) {
    this.document_ = b
};
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
a.setProperties = goog.dom.setProperties;
a.getViewportSize = function(b) {
    return goog.dom.getViewportSize(b || this.getWindow())
};
a.getDocumentHeight = function() {
    return goog.dom.getDocumentHeight_(this.getWindow())
};
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
a.htmlToDocumentFragment = function(b) {
    return goog.dom.htmlToDocumentFragment_(this.document_, b)
};
a.getCompatMode = function() {
    return this.isCss1CompatMode() ? "CSS1Compat" : "BackCompat"
};
a.isCss1CompatMode = function() {
    return goog.dom.isCss1CompatMode_(this.document_)
};
a.getWindow = function() {
    return goog.dom.getWindow_(this.document_)
};
a.getDocumentScrollElement = function() {
    return goog.dom.getDocumentScrollElement_(this.document_)
};
a.getDocumentScroll = function() {
    return goog.dom.getDocumentScroll_(this.document_)
};
a.appendChild = goog.dom.appendChild;
a.removeChildren = goog.dom.removeChildren;
a.insertSiblingBefore = goog.dom.insertSiblingBefore;
a.insertSiblingAfter = goog.dom.insertSiblingAfter;
a.removeNode = goog.dom.removeNode;
a.replaceNode = goog.dom.replaceNode;
a.flattenElement = goog.dom.flattenElement;
a.getFirstElementChild = goog.dom.getFirstElementChild;
a.getLastElementChild = goog.dom.getLastElementChild;
a.getNextElementSibling = goog.dom.getNextElementSibling;
a.getPreviousElementSibling = goog.dom.getPreviousElementSibling;
a.isNodeLike = goog.dom.isNodeLike;
a.contains = goog.dom.contains;
a.getOwnerDocument = goog.dom.getOwnerDocument;
a.getFrameContentDocument = goog.dom.getFrameContentDocument;
a.getFrameContentWindow = goog.dom.getFrameContentWindow;
a.setTextContent = goog.dom.setTextContent;
a.findNode = goog.dom.findNode;
a.findNodes = goog.dom.findNodes;
a.getTextContent = goog.dom.getTextContent;
a.getNodeTextLength = goog.dom.getNodeTextLength;
a.getNodeTextOffset = goog.dom.getNodeTextOffset;
a.getAncestorByTagNameAndClass = goog.dom.getAncestorByTagNameAndClass;
a.getAncestor = goog.dom.getAncestor;
mbrio.Icon = function() {
    this.iconNormalImage_ = goog.dom.$("icon");
    this.iconUpToDateImage_ = goog.dom.$("icon-uptodate");
    this.iconErrorImage_ = goog.dom.$("icon-error");
    this.iconImage_ = this.iconNormalImage_;
    this.canvas_ = goog.dom.$("canvas");
    this.canvasContext_ = this.canvas_.getContext("2d");
    this.displayUpToDate_ = this.displayError_ = false;
    this.rotation = 0
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
    this.canvasContext_.save();
    this.canvasContext_.clearRect(0, 0, 19, 19);
    this.canvasContext_.translate(Math.ceil(9), Math.ceil(9));
    this.canvasContext_.rotate(this.rotation_ * Math.PI / 180);
    this.canvasContext_.drawImage(this.iconImage_, -Math.ceil(9), -Math.ceil(9));
    this.canvasContext_.restore();
    chrome.browserAction.setIcon({imageData: this.canvasContext_.getImageData(0, 0, 19, 19)})
};
mbrio.LoadingAnimation = function(b) {
    this.interval_ = null;
    this.fullRotation_ = 360;
    this.parent_ = b;
    this.fps_ = 60;
    this.prev_ = 0;
    this.currentRotation_ = 1;
    this.stoppingRotation_ = null
};
mbrio.LoadingAnimation.prototype.start = function() {
    this.stop();
    var b = this;
    this.prev_ = (new Date).getTime();
    this.interval_ = setInterval(function() {
        var c = 2, d = (new Date).getTime(), e = (d - b.prev_) / 1E3;
        c = b.parent_.icon.rotation + c * 360 * e;
        e = Math.ceil(c / 360);
        if (b.stoppingRotation_ != null && e > b.stoppingRotation_) {
            b.parent_.icon.rotation = 0;
            b.stop()
        } else {
            b.parent_.icon.rotation = c;
            b.currentRotation_ = e;
            b.prev_ = d
        }
    }, 1E3 / this.fps_)
};
mbrio.LoadingAnimation.prototype.registerStop = function() {
    this.stoppingRotation_ = this.currentRotation_
};
mbrio.LoadingAnimation.prototype.stop = function() {
    if (this.interval_ != null) {
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
    if (b != "Win")
        goog.dom.$("installer-panel").style.display = "none";
    else
        goog.dom.$("installer-panel").style.display = "block"
};
mbrio.OptionsPage.prototype.__defineGetter__("isValid", function() {
    for (var b = goog.dom.$$(".validate-as-number"), c = 0; c < b.length; c++) {
        var d = b.item(c);
        if (typeof d.value == "undefined" || d.value == null || d.value.length < 1)
            d.value = "0";
        var e = new RegExp(/[0-9]+/);
        e = e.exec(d.value);
        if (e == null) {
            d.style.backgroundColor = "#ffa5a5";
            alert("The value specified is invalid (It must be a number).");
            return false
        } else
            d.style.backgroundColor = "#FFF"
    }
    return true
});
mbrio.OptionsPage.prototype.saveOptions = function() {
    if (this.isValid) {
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
    }
};
mbrio.OptionsPage.prototype.restoreOptions = function() {
    this.selectOption("platform", mbrio.Settings.platform);
    this.selectOption("repository", mbrio.Settings.snapshotRepository);
    if (mbrio.Settings.useInstaller == "true")
        goog.dom.$("installer-enabled").checked = true;
    else
        goog.dom.$("installer-disabled").checked = true;
    goog.dom.$("check-continuously").checked = mbrio.Settings.checkContinuously == "true";
    goog.dom.$("check-interval").value = mbrio.Settings.checkInterval;
    this.platformUpdated()
};
mbrio.OptionsPage.prototype.selectOption = function(b, c) {
    if (c) {
        b = goog.dom.$(b);
        for (var d = 0; d < b.children.length; d++) {
            var e = b.children[d];
            if (e.value == c) {
                e.selected = "true";
                break
            }
        }
    }
};
mbrio.RevisionModel = function() {
    this.version = -1;
    this.changeLog = ""
};
mbrio.Repositories = {};
var FILE_NAMES_ = [];
FILE_NAMES_.arm = "chrome-linux.zip";
FILE_NAMES_["Linux_x64"] = "chrome-linux.zip";
FILE_NAMES_["linux-chromeos"] = "chrome-linux.zip";
FILE_NAMES_["Linux_ChromiumOS"] = "chrome-linux.zip";
FILE_NAMES_.linux = "chrome-linux.zip";
FILE_NAMES_.mac = "chrome-mac.zip";
FILE_NAMES_.Win = "chrome-win32.zip";
FILE_NAMES_["Win-installer"] = "mini_installer.exe";
mbrio.Repositories.continuous = {name: "continuous",latestBaseUrl: "http://commondatastorage.googleapis.com/chromium-browser-continuous/",downloadBaseUrl: "http://commondatastorage.googleapis.com/chromium-browser-continuous/",getLatestUrl: function(b) {
        if (b == "Arm")
            b = "Linux";
        else if (b == "Linux_x64")
            b = "Linux_x64";
        else if (b == "linux-chromeos")
            b = "Linux_Touch";
        else if (b == "Linux_ChromiumOS")
            b = "Linux";
        return this.latestBaseUrl + b + "/LAST_CHANGE"
    },getDownloadUrl: function(b, c) {
        if (b == "Arm")
            b = "Linux";
        else if (b == "Linux_x64")
            b = "Linux_x64";
        else if (b == "linux-chromeos")
            b = "Linux_Touch";
        else if (b == "Linux_ChromiumOS")
            b = "Linux";
        var d = FILE_NAMES_[b];
        if (b == "Win" && mbrio.Settings.useInstaller == "true")
            d = FILE_NAMES_["Win-installer"];
        return this.downloadBaseUrl + b + "/" + c.toString() + "/" + d
    },getChangeLogUrl: function(b, c) {
        if (b == "Arm")
            b = "Linux";
        else if (b == "Linux_x64")
            b = "Linux";
        else if (b == "linux-chromeos")
            b = "Linux_Touch";
        else if (b == "Linux_ChromiumOS")
            b = "Linux";
        return this.downloadBaseUrl + b + "/" + c.toString() + "/changelog.xml"
    }};
mbrio.Repositories.snapshot = {name: "snapshot",latestBaseUrl: "http://commondatastorage.googleapis.com/chromium-browser-snapshots/",downloadBaseUrl: "http://commondatastorage.googleapis.com/chromium-browser-snapshots/",getLatestUrl: function(b) {
        if (b == "Arm")
            b = "Arm";
        else if (b == "Linux_x64")
            b = "Linux_x64";
        else if (b == "linux-chromeos")
            b = "Linux";
        else if (b == "Linux_ChromiumOS")
            b = "Linux_ChromiumOS";
        return this.latestBaseUrl + b + "/LAST_CHANGE"
    },getDownloadUrl: function(b, c) {
    	if (b == "Arm")
            b = "Arm";
        else if (b == "Linux_x64")
            b = "Linux_x64";
        else if (b == "linux-chromeos")
            b = "Linux";
        else if (b == "Linux_ChromiumOS")
            b = "Linux_ChromiumOS";
    	var d = FILE_NAMES_[b];
        if (b == "Win" && mbrio.Settings.useInstaller == "true")
            d = FILE_NAMES_["Win-installer"];
        return this.downloadBaseUrl + b + "/" + c.toString() + "/" + d
    },getChangeLogUrl: function(b, c) {
        if (b == "Arm")
            b = "Arm";
        else if (b == "Linux_x64")
            b = "Linux_x64";
        else if (b == "linux-chromeos")
            b = "Linux";
        else if (b == "Linux_ChromiumOS")
            b = "Linux_ChromiumOS";
        return this.downloadBaseUrl + b + "/" + c.toString() + "/changelog.xml"
    }};
mbrio.SettingsManager = function() {
};
mbrio.SettingsManager.prototype.__defineGetter__("useInstaller", function() {
    var b = true;
    if (localStorage.useInstaller != null)
        b = localStorage.useInstaller;
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
        if (b.skipLoading && c.status == mbrio.ChromiumSnapshotStatus.loading)
            b.skipLoading = false;
        else
            b.display()
    }
    c.addEventListener(mbrio.ChromiumSnapshot.STATUS_UPDATED, d);
    goog.events.listen(window, "unload", function() {
        c.removeEventListener(mbrio.ChromiumSnapshot.STATUS_UPDATED, d)
    });
    this.retrieveChangeLog()
};
a.retrieveChangeLog = function() {
    this.display()
};
a.display = function() {
    goog.dom.removeChildren(document.body);
    var b = goog.dom.$dom("div"), c = chrome.extension.getBackgroundPage().snapshot.status;
    if (c == mbrio.ChromiumSnapshotStatus.loaded) {
        var d = chrome.extension.getBackgroundPage();
        c = d.snapshot.changeLogMessage;
        if (c != null && c.length > 0)
            c = c.replace(/\n\n/g, "<br /><br />");
        var e = d.snapshot.changeLogRevision, f = d.snapshot.downloadLink;
        d = d.snapshot.platform;
        b.innerHTML = mbrio.t.Popup.loaded({href: f,revision: e,msg: c,platform: d,prevRevision: mbrio.Settings.latestDownloadedRevision})
    } else if (c == 
    mbrio.ChromiumSnapshotStatus.loading)
        b.innerHTML = mbrio.t.Popup.loading();
    else if (c == mbrio.ChromiumSnapshotStatus.error)
        b.innerHTML = mbrio.t.Popup.error();
    else if (c == mbrio.ChromiumSnapshotStatus.none)
        b.innerHTML = mbrio.t.Popup.none();
    goog.dom.appendChild(document.body, b)
};
a.recordDownload = function(b) {
    if (b != null) {
        b = b.trim();
        if (b.length > 0) {
            mbrio.Settings.latestDownloadedRevision = b;
            chrome.extension.getBackgroundPage().snapshot.update()
        }
    }
};
a.refresh = function() {
    this.skipLoading = true;
    chrome.extension.getBackgroundPage().snapshot.update()
};
goog.structs.InversionMap = function(b, c, d) {
    if (b.length != c.length)
        return null;
    this.storeInversion_(b, d);
    this.values = c
};
goog.structs.InversionMap.prototype.storeInversion_ = function(b, c) {
    this.rangeArray = b;
    for (var d = 1; d < b.length; d++)
        if (b[d] == null)
            b[d] = b[d - 1] + 1;
        else if (c)
            b[d] += b[d - 1]
};
goog.structs.InversionMap.prototype.spliceInversion = function(b, c, d) {
    b = new goog.structs.InversionMap(b, c, d);
    d = b.rangeArray[0];
    var e = goog.array.peek(b.rangeArray);
    c = this.getLeast(d);
    d != c && c++;
    d = this.getLeast(e) - c + 1;
    goog.partial(goog.array.splice, this.rangeArray, c, d).apply(null, b.rangeArray);
    goog.partial(goog.array.splice, this.values, c, d).apply(null, b.values)
};
goog.structs.InversionMap.prototype.at = function(b) {
    b = this.getLeast(b);
    if (b < 0)
        return null;
    return this.values[b]
};
goog.structs.InversionMap.prototype.getLeast = function(b) {
    for (var c = this.rangeArray, d = 0, e = c.length; e - d > 8; ) {
        var f = e + d >> 1;
        if (c[f] <= b)
            d = f;
        else
            e = f
    }
    for (; d < e; ++d)
        if (b < c[d])
            break;
    return d - 1
};
goog.i18n = {};
goog.i18n.GraphemeBreak = {};
goog.i18n.GraphemeBreak.property = {ANY: 0,CONTROL: 1,EXTEND: 2,PREPEND: 3,SPACING_MARK: 4,L: 5,V: 6,T: 7,LV: 8,LVT: 9,CR: 10,LF: 11};
goog.i18n.GraphemeBreak.inversions_ = null;
goog.i18n.GraphemeBreak.applyLegacyBreakRules_ = function(b, c) {
    var d = goog.i18n.GraphemeBreak.property;
    if (b == d.CR && c == d.LF)
        return false;
    if (b == d.CONTROL || b == d.CR || b == d.LF)
        return true;
    if (c == d.CONTROL || c == d.CR || c == d.LF)
        return true;
    if (b == d.L && (c == d.L || c == d.V || c == d.LV || c == d.LVT))
        return false;
    if ((b == d.LV || b == d.V) && (c == d.V || c == d.T))
        return false;
    if ((b == d.LVT || b == d.T) && c == d.T)
        return false;
    if (c == d.EXTEND)
        return false;
    return true
};
goog.i18n.GraphemeBreak.getBreakProp_ = function(b) {
    if (44032 <= b && b <= 55203) {
        var c = goog.i18n.GraphemeBreak.property;
        if (b % 28 == 16)
            return c.LV;
        return c.LVT
    } else {
        if (!goog.i18n.GraphemeBreak.inversions_)
            goog.i18n.GraphemeBreak.inversions_ = new goog.structs.InversionMap([0, 10, 1, 2, 1, 18, 95, 33, 13, 1, 594, 112, 275, 7, 263, 45, 1, 1, 1, 2, 1, 2, 1, 1, 56, 4, 12, 11, 48, 20, 17, 1, 101, 7, 1, 7, 2, 2, 1, 4, 33, 1, 1, 1, 30, 27, 91, 11, 58, 9, 269, 2, 1, 56, 1, 1, 3, 8, 4, 1, 3, 4, 13, 2, 29, 1, 2, 56, 1, 1, 1, 2, 6, 6, 1, 9, 1, 10, 2, 29, 2, 1, 56, 2, 3, 17, 30, 2, 3, 14, 1, 56, 1, 1, 3, 8, 4, 1, 20, 
                2, 29, 1, 2, 56, 1, 1, 2, 1, 6, 6, 11, 10, 2, 30, 1, 59, 1, 1, 1, 12, 1, 9, 1, 41, 3, 58, 3, 5, 17, 11, 2, 30, 2, 56, 1, 1, 1, 1, 2, 1, 3, 1, 5, 11, 11, 2, 30, 2, 58, 1, 2, 5, 7, 11, 10, 2, 30, 2, 70, 6, 2, 6, 7, 19, 2, 60, 11, 5, 5, 1, 1, 8, 97, 13, 3, 5, 3, 6, 74, 2, 27, 1, 1, 1, 1, 1, 4, 2, 49, 14, 1, 5, 1, 2, 8, 45, 9, 1, 100, 2, 4, 1, 6, 1, 2, 2, 2, 23, 2, 2, 4, 3, 1, 3, 2, 7, 3, 4, 13, 1, 2, 2, 6, 1, 1, 1, 112, 96, 72, 82, 357, 1, 946, 3, 29, 3, 29, 2, 30, 2, 64, 2, 1, 7, 8, 1, 2, 11, 9, 1, 45, 3, 155, 1, 118, 3, 4, 2, 9, 1, 6, 3, 116, 17, 7, 2, 77, 2, 3, 228, 4, 1, 47, 1, 1, 5, 1, 1, 5, 1, 2, 38, 9, 12, 2, 1, 30, 1, 4, 2, 2, 1, 121, 8, 8, 2, 2, 392, 64, 523, 1, 2, 2, 24, 7, 49, 16, 96, 33, 3311, 
                32, 554, 6, 105, 2, 30164, 4, 9, 2, 388, 1, 3, 1, 4, 1, 23, 2, 2, 1, 88, 2, 50, 16, 1, 97, 8, 25, 11, 2, 213, 6, 2, 2, 2, 2, 12, 1, 8, 1, 1, 434, 11172, 9082, 1, 737, 16, 16, 7, 216, 1, 158, 2, 89, 3, 513, 1, 2051, 15, 40, 8, 50981, 1, 1, 3, 3, 1, 5, 8, 8, 2, 7, 30, 4, 148, 3, 798140, 255], [1, 11, 1, 10, 1, 0, 1, 0, 1, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 1, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 2, 0, 2, 0, 1, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 4, 0, 2, 0, 4, 2, 4, 2, 0, 2, 0, 2, 0, 2, 4, 0, 2, 0, 2, 4, 2, 4, 2, 0, 2, 0, 2, 0, 2, 4, 0, 2, 4, 2, 0, 2, 0, 2, 4, 0, 2, 0, 4, 2, 4, 2, 0, 2, 0, 2, 4, 0, 2, 0, 2, 4, 2, 4, 2, 0, 2, 0, 2, 0, 2, 4, 2, 4, 2, 0, 2, 0, 4, 0, 2, 4, 2, 0, 2, 0, 4, 0, 2, 0, 4, 2, 4, 2, 4, 2, 4, 
                2, 0, 2, 0, 4, 0, 2, 4, 2, 4, 2, 0, 2, 0, 4, 0, 2, 4, 2, 4, 2, 4, 0, 2, 0, 3, 2, 0, 2, 0, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 4, 0, 2, 4, 2, 0, 2, 0, 2, 0, 2, 0, 4, 2, 4, 2, 4, 2, 4, 2, 0, 4, 2, 0, 2, 0, 4, 0, 4, 0, 2, 0, 2, 4, 2, 4, 2, 0, 4, 0, 5, 6, 7, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 1, 4, 2, 4, 2, 4, 2, 0, 2, 0, 2, 0, 2, 0, 2, 4, 2, 4, 2, 4, 2, 0, 4, 0, 4, 0, 2, 4, 0, 2, 4, 0, 2, 4, 2, 4, 2, 4, 2, 4, 0, 2, 0, 2, 4, 0, 4, 2, 4, 2, 4, 0, 4, 2, 4, 2, 0, 2, 0, 1, 2, 1, 0, 1, 0, 1, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 4, 2, 4, 0, 4, 0, 4, 2, 0, 2, 0, 2, 4, 0, 2, 4, 2, 4, 2, 0, 2, 0, 2, 4, 0, 9, 0, 2, 0, 2, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 2, 0, 2, 0, 2, 4, 2, 0, 4, 2, 1, 2, 0, 2, 0, 2, 0, 2, 0, 1, 2], true);
        return goog.i18n.GraphemeBreak.inversions_.at(b)
    }
};
goog.i18n.GraphemeBreak.hasGraphemeBreak = function(b, c, d) {
    b = goog.i18n.GraphemeBreak.getBreakProp_(b);
    c = goog.i18n.GraphemeBreak.getBreakProp_(c);
    var e = goog.i18n.GraphemeBreak.property;
    return goog.i18n.GraphemeBreak.applyLegacyBreakRules_(b, c) && !(d && (b == e.PREPEND || c == e.SPACING_MARK))
};
goog.format = {};
goog.format.fileSize = function(b, c) {
    return goog.format.numBytesToString(b, c, false)
};
goog.format.isConvertableScaledNumber = function(b) {
    return goog.format.SCALED_NUMERIC_RE_.test(b)
};
goog.format.stringToNumericValue = function(b) {
    if (goog.string.endsWith(b, "B"))
        return goog.format.stringToNumericValue_(b, goog.format.NUMERIC_SCALES_BINARY_);
    return goog.format.stringToNumericValue_(b, goog.format.NUMERIC_SCALES_SI_)
};
goog.format.stringToNumBytes = function(b) {
    return goog.format.stringToNumericValue_(b, goog.format.NUMERIC_SCALES_BINARY_)
};
goog.format.numericValueToString = function(b, c) {
    return goog.format.numericValueToString_(b, goog.format.NUMERIC_SCALES_SI_, c)
};
goog.format.numBytesToString = function(b, c, d) {
    var e = "";
    if (!goog.isDef(d) || d)
        e = "B";
    return goog.format.numericValueToString_(b, goog.format.NUMERIC_SCALES_BINARY_, c, e)
};
goog.format.stringToNumericValue_ = function(b, c) {
    b = b.match(goog.format.SCALED_NUMERIC_RE_);
    if (!b)
        return NaN;
    return c = b[1] * c[b[2]]
};
goog.format.numericValueToString_ = function(b, c, d, e) {
    var f = goog.format.NUMERIC_SCALE_PREFIXES_, g = b, h = "", i = 1;
    if (b < 0)
        b = -b;
    for (var j = 0; j < f.length; j++) {
        var k = f[j];
        i = c[k];
        if (b >= i || i <= 1 && b > 0.1 * i) {
            h = k;
            break
        }
    }
    if (h) {
        if (e)
            h += e
    } else
        i = 1;
    b = Math.pow(10, goog.isDef(d) ? d : 2);
    return Math.round(g / i * b) / b + h
};
goog.format.SCALED_NUMERIC_RE_ = /^([-]?\d+\.?\d*)([K,M,G,T,P,k,m,u,n]?)[B]?$/;
goog.format.NUMERIC_SCALE_PREFIXES_ = ["P", "T", "G", "M", "K", "", "m", "u", "n"];
goog.format.NUMERIC_SCALES_SI_ = {"": 1,n: 1.0E-9,u: 1.0E-6,m: 0.0010,k: 1E3,K: 1E3,M: 1E6,G: 1E9,T: 1E12,P: 1E15};
goog.format.NUMERIC_SCALES_BINARY_ = {"": 1,n: Math.pow(1024, -3),u: Math.pow(1024, -2),m: 1 / 1024,k: 1024,K: 1024,M: Math.pow(1024, 2),G: Math.pow(1024, 3),T: Math.pow(1024, 4),P: Math.pow(1024, 5)};
goog.format.FIRST_GRAPHEME_EXTEND_ = 768;
goog.format.insertWordBreaksGeneric_ = function(b, c, d) {
    d = d || 10;
    if (d > b.length)
        return b;
    for (var e = [], f = 0, g = 0, h = 0, i = 0, j = 0; j < b.length; j++) {
        var k = i;
        i = b.charCodeAt(j);
        k = i >= goog.format.FIRST_GRAPHEME_EXTEND_ && !c(k, i, true);
        if (f >= d && i > goog.format.WbrToken_.SPACE && !k) {
            e.push(b.substring(h, j), goog.format.WORD_BREAK_HTML);
            h = j;
            f = 0
        }
        if (g)
            if (i == goog.format.WbrToken_.GT && g == goog.format.WbrToken_.LT)
                g = 0;
            else {
                if (i == goog.format.WbrToken_.SEMI_COLON && g == goog.format.WbrToken_.AMP) {
                    g = 0;
                    f++
                }
            }
        else if (i == goog.format.WbrToken_.LT || 
        i == goog.format.WbrToken_.AMP)
            g = i;
        else if (i <= goog.format.WbrToken_.SPACE)
            f = 0;
        else
            f++
    }
    e.push(b.substr(h));
    return e.join("")
};
goog.format.insertWordBreaks = function(b, c) {
    return goog.format.insertWordBreaksGeneric_(b, goog.i18n.GraphemeBreak.hasGraphemeBreak, c)
};
goog.format.conservativelyHasGraphemeBreak_ = function(b, c) {
    return c >= 1024 && c < 1315
};
goog.format.insertWordBreaksBasic = function(b, c) {
    return goog.format.insertWordBreaksGeneric_(b, goog.format.conservativelyHasGraphemeBreak_, c)
};
goog.format.WORD_BREAK_HTML = goog.userAgent.WEBKIT ? "<wbr></wbr>" : goog.userAgent.OPERA ? "&shy;" : "<wbr>";
goog.format.WbrToken_ = {LT: 60,GT: 62,AMP: 38,SEMI_COLON: 59,SPACE: 32};
goog.i18n.bidi = {};
goog.i18n.bidi.Format = {LRE: "\u202a",RLE: "\u202b",PDF: "\u202c",LRM: "\u200e",RLM: "\u200f"};
goog.i18n.bidi.Dir = {RTL: -1,UNKNOWN: 0,LTR: 1};
goog.i18n.bidi.RIGHT = "right";
goog.i18n.bidi.LEFT = "left";
goog.i18n.bidi.toDir = function(b) {
    return typeof b == "number" ? b > 0 ? goog.i18n.bidi.Dir.LTR : b < 0 ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.UNKNOWN : b ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR
};
goog.i18n.bidi.ltrChars_ = "A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff";
goog.i18n.bidi.rtlChars_ = "\u0591-\u07ff\ufb1d-\ufdff\ufe70-\ufefc";
goog.i18n.bidi.htmlSkipReg_ = /<[^>]*>|&[^;]+;/g;
goog.i18n.bidi.stripHtmlIfNeeded_ = function(b, c) {
    return c ? b.replace(goog.i18n.bidi.htmlSkipReg_, " ") : b
};
goog.i18n.bidi.rtlCharReg_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.ltrCharReg_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.hasAnyRtl = function(b, c) {
    return goog.i18n.bidi.rtlCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(b, c))
};
goog.i18n.bidi.hasRtlChar = goog.i18n.bidi.hasAnyRtl;
goog.i18n.bidi.hasAnyLtr = function(b, c) {
    return goog.i18n.bidi.ltrCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(b, c))
};
goog.i18n.bidi.ltrRe_ = new RegExp("^[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.rtlRe_ = new RegExp("^[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.isRtlChar = function(b) {
    return goog.i18n.bidi.rtlRe_.test(b)
};
goog.i18n.bidi.isLtrChar = function(b) {
    return goog.i18n.bidi.ltrRe_.test(b)
};
goog.i18n.bidi.isNeutralChar = function(b) {
    return !goog.i18n.bidi.isLtrChar(b) && !goog.i18n.bidi.isRtlChar(b)
};
goog.i18n.bidi.ltrDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.rtlChars_ + "]*[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.rtlDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.ltrChars_ + "]*[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.startsWithRtl = function(b, c) {
    return goog.i18n.bidi.rtlDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(b, c))
};
goog.i18n.bidi.isRtlText = goog.i18n.bidi.startsWithRtl;
goog.i18n.bidi.startsWithLtr = function(b, c) {
    return goog.i18n.bidi.ltrDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(b, c))
};
goog.i18n.bidi.isLtrText = goog.i18n.bidi.startsWithLtr;
goog.i18n.bidi.isRequiredLtrRe_ = /^http:\/\/.*/;
goog.i18n.bidi.isNeutralText = function(b, c) {
    b = goog.i18n.bidi.stripHtmlIfNeeded_(b, c);
    return goog.i18n.bidi.isRequiredLtrRe_.test(b) || !goog.i18n.bidi.hasAnyLtr(b) && !goog.i18n.bidi.hasAnyRtl(b)
};
goog.i18n.bidi.ltrExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "][^" + goog.i18n.bidi.rtlChars_ + "]*$");
goog.i18n.bidi.rtlExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "][^" + goog.i18n.bidi.ltrChars_ + "]*$");
goog.i18n.bidi.endsWithLtr = function(b, c) {
    return goog.i18n.bidi.ltrExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(b, c))
};
goog.i18n.bidi.isLtrExitText = goog.i18n.bidi.endsWithLtr;
goog.i18n.bidi.endsWithRtl = function(b, c) {
    return goog.i18n.bidi.rtlExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(b, c))
};
goog.i18n.bidi.isRtlExitText = goog.i18n.bidi.endsWithRtl;
goog.i18n.bidi.rtlLocalesRe_ = new RegExp("^(ar|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Arab|Hebr|Thaa|Nkoo|Tfng))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)");
goog.i18n.bidi.isRtlLanguage = function(b) {
    return goog.i18n.bidi.rtlLocalesRe_.test(b)
};
goog.i18n.bidi.bracketGuardHtmlRe_ = /(\([^\)]*\))|(\[[^\]]*\])|({[^}]*})|(&lt;[^&]*&gt;)/g;
goog.i18n.bidi.bracketGuardTextRe_ = /(\([^\)]*\))|(\[[^\]]*\])|({[^}]*})|(<[^>]*>)/g;
goog.i18n.bidi.guardBracketInHtml = function(b) {
    if (goog.i18n.bidi.hasAnyRtl(b))
        return b.replace(goog.i18n.bidi.bracketGuardHtmlRe_, "<span dir=rtl>$&</span>");
    return b.replace(goog.i18n.bidi.bracketGuardHtmlRe_, "<span dir=ltr>$&</span>")
};
goog.i18n.bidi.guardBracketInText = function(b) {
    var c = goog.i18n.bidi.hasAnyRtl(b) ? goog.i18n.bidi.Format.RLM : goog.i18n.bidi.Format.LRM;
    return b.replace(goog.i18n.bidi.bracketGuardTextRe_, c + "$&" + c)
};
goog.i18n.bidi.enforceRtlInHtml = function(b) {
    if (b.charAt(0) == "<")
        return b.replace(/<\w+/, "$& dir=rtl");
    return "\n<span dir=rtl>" + b + "</span>"
};
goog.i18n.bidi.enforceRtlInText = function(b) {
    return goog.i18n.bidi.Format.RLE + b + goog.i18n.bidi.Format.PDF
};
goog.i18n.bidi.enforceLtrInHtml = function(b) {
    if (b.charAt(0) == "<")
        return b.replace(/<\w+/, "$& dir=ltr");
    return "\n<span dir=ltr>" + b + "</span>"
};
goog.i18n.bidi.enforceLtrInText = function(b) {
    return goog.i18n.bidi.Format.LRE + b + goog.i18n.bidi.Format.PDF
};
goog.i18n.bidi.dimensionsRe_ = /:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g;
goog.i18n.bidi.leftRe_ = /left/gi;
goog.i18n.bidi.rightRe_ = /right/gi;
goog.i18n.bidi.tempRe_ = /%%%%/g;
goog.i18n.bidi.mirrorCSS = function(b) {
    return b.replace(goog.i18n.bidi.dimensionsRe_, ":$1 $4 $3 $2").replace(goog.i18n.bidi.leftRe_, "%%%%").replace(goog.i18n.bidi.rightRe_, goog.i18n.bidi.LEFT).replace(goog.i18n.bidi.tempRe_, goog.i18n.bidi.RIGHT)
};
goog.i18n.bidi.doubleQuoteSubstituteRe_ = /([\u0591-\u05f2])"/g;
goog.i18n.bidi.singleQuoteSubstituteRe_ = /([\u0591-\u05f2])'/g;
goog.i18n.bidi.normalizeHebrewQuote = function(b) {
    return b.replace(goog.i18n.bidi.doubleQuoteSubstituteRe_, "$1\u05f4").replace(goog.i18n.bidi.singleQuoteSubstituteRe_, "$1\u05f3")
};
goog.i18n.bidi.wordSeparatorRe_ = /\s+/;
goog.i18n.bidi.hasNumeralsRe_ = /\d/;
goog.i18n.bidi.rtlDetectionThreshold_ = 0.4;
goog.i18n.bidi.estimateDirection = function(b, c) {
    var d = 0, e = 0, f = false;
    b = goog.i18n.bidi.stripHtmlIfNeeded_(b, c).split(goog.i18n.bidi.wordSeparatorRe_);
    for (c = 0; c < b.length; c++) {
        var g = b[c];
        if (goog.i18n.bidi.startsWithRtl(g)) {
            d++;
            e++
        } else if (goog.i18n.bidi.isRequiredLtrRe_.test(g))
            f = true;
        else if (goog.i18n.bidi.hasAnyLtr(g))
            e++;
        else if (goog.i18n.bidi.hasNumeralsRe_.test(g))
            f = true
    }
    return e == 0 ? f ? goog.i18n.bidi.Dir.LTR : goog.i18n.bidi.Dir.UNKNOWN : d / e > goog.i18n.bidi.rtlDetectionThreshold_ ? goog.i18n.bidi.Dir.RTL : 
    goog.i18n.bidi.Dir.LTR
};
goog.i18n.bidi.detectRtlDirectionality = function(b, c) {
    return goog.i18n.bidi.estimateDirection(b, c) == goog.i18n.bidi.Dir.RTL
};
goog.i18n.bidi.setElementDirAndAlign = function(b, c) {
    if (b && (c = goog.i18n.bidi.toDir(c)) != goog.i18n.bidi.Dir.UNKNOWN) {
        b.style.textAlign = c == goog.i18n.bidi.Dir.RTL ? "right" : "left";
        b.dir = c == goog.i18n.bidi.Dir.RTL ? "rtl" : "ltr"
    }
};
goog.i18n.BidiFormatter = function(b, c) {
    this.contextDir_ = goog.i18n.bidi.toDir(b);
    this.alwaysSpan_ = !!c
};
a = goog.i18n.BidiFormatter.prototype;
a.getContextDir = function() {
    return this.contextDir_
};
a.getAlwaysSpan = function() {
    return this.alwaysSpan_
};
a.setContextDir = function(b) {
    this.contextDir_ = goog.i18n.bidi.toDir(b)
};
a.setAlwaysSpan = function(b) {
    this.alwaysSpan_ = b
};
a.estimateDirection = goog.i18n.bidi.estimateDirection;
a.areDirectionalitiesOpposite_ = function(b, c) {
    return b * c < 0
};
a.dirResetIfNeeded_ = function(b, c, d, e) {
    return e && (this.areDirectionalitiesOpposite_(c, this.contextDir_) || this.contextDir_ == goog.i18n.bidi.Dir.LTR && goog.i18n.bidi.endsWithRtl(b, d) || this.contextDir_ == goog.i18n.bidi.Dir.RTL && goog.i18n.bidi.endsWithLtr(b, d)) ? this.contextDir_ == goog.i18n.bidi.Dir.LTR ? goog.i18n.bidi.Format.LRM : goog.i18n.bidi.Format.RLM : ""
};
a.dirAttrValue = function(b, c) {
    return this.knownDirAttrValue(this.estimateDirection(b, c))
};
a.knownDirAttrValue = function(b) {
    if (b == goog.i18n.bidi.Dir.UNKNOWN)
        b = this.contextDir_;
    return b == goog.i18n.bidi.Dir.RTL ? "rtl" : "ltr"
};
a.dirAttr = function(b, c) {
    return this.knownDirAttr(this.estimateDirection(b, c))
};
a.knownDirAttr = function(b) {
    if (b != this.contextDir_)
        return b == goog.i18n.bidi.Dir.RTL ? "dir=rtl" : b == goog.i18n.bidi.Dir.LTR ? "dir=ltr" : "";
    return ""
};
a.spanWrap = function(b, c, d) {
    var e = this.estimateDirection(b, c);
    return this.spanWrapWithKnownDir(e, b, c, d)
};
a.spanWrapWithKnownDir = function(b, c, d, e) {
    e = e || e == undefined;
    var f = b != goog.i18n.bidi.Dir.UNKNOWN && b != this.contextDir_;
    d || (c = goog.string.htmlEscape(c));
    d = [];
    if (this.alwaysSpan_ || f) {
        d.push("<span");
        if (f)
            d.push(b == goog.i18n.bidi.Dir.RTL ? " dir=rtl" : " dir=ltr");
        d.push(">" + c + "</span>")
    } else
        d.push(c);
    d.push(this.dirResetIfNeeded_(c, b, true, e));
    return d.join("")
};
a.unicodeWrap = function(b, c, d) {
    var e = this.estimateDirection(b, c);
    return this.unicodeWrapWithKnownDir(e, b, c, d)
};
a.unicodeWrapWithKnownDir = function(b, c, d, e) {
    e = e || e == undefined;
    var f = [];
    if (b != goog.i18n.bidi.Dir.UNKNOWN && b != this.contextDir_) {
        f.push(b == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.Format.RLE : goog.i18n.bidi.Format.LRE);
        f.push(c);
        f.push(goog.i18n.bidi.Format.PDF)
    } else
        f.push(c);
    f.push(this.dirResetIfNeeded_(c, b, d, e));
    return f.join("")
};
a.markAfter = function(b, c) {
    return this.dirResetIfNeeded_(b, this.estimateDirection(b, c), c, true)
};
a.mark = function() {
    switch (this.contextDir_) {
        case goog.i18n.bidi.Dir.LTR:
            return goog.i18n.bidi.Format.LRM;
        case goog.i18n.bidi.Dir.RTL:
            return goog.i18n.bidi.Format.RLM;
        default:
            return ""
    }
};
a.startEdge = function() {
    return this.contextDir_ == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT
};
a.endEdge = function() {
    return this.contextDir_ == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.LEFT : goog.i18n.bidi.RIGHT
};
goog.string.StringBuffer = function(b) {
    this.buffer_ = goog.userAgent.jscript.HAS_JSCRIPT ? [] : "";
    b != null && this.append.apply(this, arguments)
};
goog.string.StringBuffer.prototype.set = function(b) {
    this.clear();
    this.append(b)
};
if (goog.userAgent.jscript.HAS_JSCRIPT) {
    goog.string.StringBuffer.prototype.bufferLength_ = 0;
    goog.string.StringBuffer.prototype.append = function(b, c) {
        if (!COMPILED && !goog.isDef(b))
            throw Error("Cannot call StringBuffer.append with zero arguments.");
        if (c == null)
            this.buffer_[this.bufferLength_++] = b;
        else {
            this.buffer_.push.apply(this.buffer_, arguments);
            this.bufferLength_ = this.buffer_.length
        }
        return this
    }
} else
    goog.string.StringBuffer.prototype.append = function(b, c) {
        if (!COMPILED && !goog.isDef(b))
            throw Error("Cannot call StringBuffer.append with zero arguments.");
        this.buffer_ += b;
        if (c != null)
            for (var d = 1; d < arguments.length; d++)
                this.buffer_ += arguments[d];
        return this
    };
goog.string.StringBuffer.prototype.clear = function() {
    if (goog.userAgent.jscript.HAS_JSCRIPT)
        this.bufferLength_ = this.buffer_.length = 0;
    else
        this.buffer_ = ""
};
goog.string.StringBuffer.prototype.getLength = function() {
    return this.toString().length
};
goog.string.StringBuffer.prototype.toString = function() {
    if (goog.userAgent.jscript.HAS_JSCRIPT) {
        var b = this.buffer_.join("");
        this.clear();
        b && this.append(b);
        return b
    } else
        return this.buffer_
};
var soy = {};
soy.StringBuilder = goog.string.StringBuffer;
soy.renderElement = function(b, c, d) {
    b.innerHTML = c(d)
};
soy.renderAsFragment = function(b, c) {
    return goog.dom.htmlToDocumentFragment(b(c))
};
soy.$$augmentData = function(b, c) {
    function d() {
    }
    d.prototype = b;
    b = new d;
    for (var e in c)
        b[e] = c[e];
    return b
};
soy.$$escapeHtml = function(b) {
    return goog.string.htmlEscape(String(b))
};
soy.$$escapeJs = function(b) {
    b = String(b);
    for (var c = [], d = 0; d < b.length; d++)
        c[d] = goog.string.escapeChar(b.charAt(d));
    return c.join("")
};
soy.$$escapeUri = function(b) {
    return goog.string.urlEncode(String(b))
};
soy.$$insertWordBreaks = function(b, c) {
    return goog.format.insertWordBreaks(String(b), c)
};
soy.$$bidiFormatterCache_ = {};
soy.$$bidiFormatterInstance_ = function(b) {
    return soy.$$bidiFormatterCache_[b] || (soy.$$bidiFormatterCache_[b] = new goog.i18n.BidiFormatter(b))
};
soy.$$bidiTextDir = function(b, c) {
    if (!b)
        return 0;
    return goog.i18n.bidi.detectRtlDirectionality(b, c) ? -1 : 1
};
soy.$$bidiDirAttr = function(b, c, d) {
    b = soy.$$bidiFormatterInstance_(b);
    return b.dirAttr(c, d)
};
soy.$$bidiMarkAfter = function(b, c, d) {
    b = soy.$$bidiFormatterInstance_(b);
    return b.markAfter(c, d)
};
soy.$$bidiSpanWrap = function(b, c) {
    b = soy.$$bidiFormatterInstance_(b);
    return b.spanWrap(c + "", true)
};
soy.$$bidiUnicodeWrap = function(b, c) {
    b = soy.$$bidiFormatterInstance_(b);
    return b.unicodeWrap(c + "", true)
};
mbrio.t = {};
mbrio.t.Options = {};
mbrio.t.Options.page = function(b, c) {
    b = c || new soy.StringBuilder;
    b.append('\t<div class="panel"><h1>Options</h1><div class="form"><div id="platform-panel"><label>Select the platform you would like to monitor:</label><div id="status"></div><fieldset><select id="platform" onchange="optionsPage.platformUpdated()"><option value="Arm">ARM</option><option value="Linux_x64">Linux 64</option><option value="linux-chromeos">Linux Chrome OS</option><option value="Linux_ChromiumOS">Linux Chromium OS</option><option value="Linux">Linux</option><option value="Mac" selected>OS X</option><option value="Win">Windows</option></select></fieldset></div><div id="installer-panel"><label>Would you like to download the installer or zip:</label><fieldset><div><input id="installer-enabled" name="installer" type="radio"> <label for="installer-enabled">Installer</label></div><div><input id="installer-disabled" name="installer" type="radio"> <label for="installer-disabled">Zip</label></div></fieldset></div><div id="repository-panel"><label>Select the repository you would like to monitor:</label><fieldset><select id="repository"><option value="continuous" selected>Continuous (Passed Tests)</option><option value="snapshot">All Snapshots (May Not Have Passed All Tests)</option></select></fieldset></div><div id="check-continuously-panel"><label>Would you like to check for updates at regular intervals:</label><fieldset><div><input id="check-continuously" type="checkbox"> <label for="check-continuously">Check Every</label> <input id="check-interval" class="validate-as-number" type="text" size="4" /> Minutes</div></fieldset></div><div class="buttons"><a href="#" onclick="optionsPage.saveOptions()">Save</a></div></div></div><div id="footer"><div id="copyright">Brought to you by: HeavensRevenge &lt;ultimate.evilATgmail.com&gt;</div></div>');
    if (!c)
        return b.toString()
};
mbrio.t.Popup = {};
mbrio.t.Popup.loading = function(b, c) {
    b = c || new soy.StringBuilder;
    b.append('\t<div class="panel"><h1>Loading...</h1><div class="content"><p class="msg">Attempting to contact the servers.</p></div><div class="buttons">');
    mbrio.t.Popup.refreshButton(null, b);
    b.append("</div></div>");
    if (!c)
        return b.toString()
};
mbrio.t.Popup.error = function(b, c) {
    b = c || new soy.StringBuilder;
    b.append('\t<div class="panel"><h1>Error</h1><div class="content"><p class="message">An error has occured.</p></div><div class="buttons">');
    mbrio.t.Popup.refreshButton(null, b);
    b.append("</div></div>");
    if (!c)
        return b.toString()
};
mbrio.t.Popup.none = function(b, c) {
    b = c || new soy.StringBuilder;
    b.append('\t<div class="panel"><h1>Needs Initialization</h1><div class="content"><p class="msg">Please hit the refresh button.</p></div><div class="buttons">');
    mbrio.t.Popup.refreshButton(null, b);
    b.append("</div></div>");
    if (!c)
        return b.toString()
};
mbrio.t.Popup.loaded = function(b, c) {
    var d = c || new soy.StringBuilder;
    d.append('\t<div class="panel"><h1>Latest Chromium Snapshot Information</h1><div class="content">');
    mbrio.t.Popup.platformInfo({platform: b.platform}, d);
    mbrio.t.Popup.prevRevision({prevRevision: b.prevRevision}, d);
    mbrio.t.Popup.revisionInfo({revision: b.revision}, d);
    mbrio.t.Popup.changeLogInfo({msg: b.msg}, d);
    d.append('</div><div class="buttons">');
    mbrio.t.Popup.downloadButton({href: b.href,revision: b.revision}, d);
    mbrio.t.Popup.refreshButton(null, 
    d);
    d.append("</div></div>");
    if (!c)
        return d.toString()
};
mbrio.t.Popup.platformInfo = function(b, c) {
    var d = c || new soy.StringBuilder;
    d.append('\t<div class="section inline"><h2>Platform</h2><div class="platform">', soy.$$escapeHtml(b.platform), "</div></div>");
    if (!c)
        return d.toString()
};
mbrio.t.Popup.revisionInfo = function(b, c) {
    var d = c || new soy.StringBuilder;
    d.append('\t<div class="section inline"><h2>Latest Revision</h2><div class="revision">', soy.$$escapeHtml(b.revision), "</div></div>");
    if (!c)
        return d.toString()
};
mbrio.t.Popup.changeLogInfo = function(b, c) {
    var d = c || new soy.StringBuilder;
    d.append('\t<div class="section"><h2>Change Log</h2><div class="changeLog">', b.msg, "</div></div>");
    if (!c)
        return d.toString()
};
mbrio.t.Popup.downloadButton = function(b, c) {
    var d = c || new soy.StringBuilder;
    d.append('\t<div class="link"><a href="', soy.$$escapeHtml(b.href), '" onclick="snapshotPopup.recordDownload(\'', soy.$$escapeHtml(b.revision), '\')" target="_blank">Download</a></div>');
    if (!c)
        return d.toString()
};
mbrio.t.Popup.refreshButton = function(b, c) {
    b = c || new soy.StringBuilder;
    b.append('\t<div class="link"><a href="javascript:void(0)" onclick="snapshotPopup.refresh()" target="_blank">Refresh</a></div>');
    if (!c)
        return b.toString()
};
mbrio.t.Popup.prevRevision = function(b, c) {
    var d = c || new soy.StringBuilder;
    d.append("\t", b.prevRevision != null && b.prevRevision.length > 0 && b.prevRevision != -1 ? '<div class="section inline"><h2>Previously Downloaded Revision</h2><div class="revision">' + soy.$$escapeHtml(b.prevRevision) + "</div></div>" : "");
    if (!c)
        return d.toString()
};