! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Macy = e()
}(this, function() {
    "use strict";

    function t(t) {
        var e = document.body.clientWidth,
            n = {
                columns: t.columns
            },
            o = void 0;
        u(t.margin) ? n.margin = {
            x: t.margin.x,
            y: t.margin.y
        } : n.margin = {
            x: t.margin,
            y: t.margin
        };
        for (var r = Object.keys(t.breakAt), i = r.length - 1; i >= 0; i--) {
            var s = parseInt(r[i], 10);
            e <= s && (o = t.breakAt[s], u(o) || (n.columns = o), u(o) && o.columns && (n.columns = o.columns), u(o) && o.margin && !u(o.margin) && (n.margin = {
                x: o.margin,
                y: o.margin
            }), u(o) && o.margin && u(o.margin) && o.margin.x && (n.margin.x = o.margin.x), u(o) && o.margin && u(o.margin) && o.margin.y && (n.margin.y = o.margin.y))
        }
        return n
    }

    function e(e) {
        return t(e).columns
    }

    function n(e) {
        return t(e).margin
    }

    function o(t) {
        var o = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
            r = e(t),
            i = n(t).x,
            s = 100 / r;
        return o ? 1 === r ? "100%" : (i = (r - 1) * i / r, "calc(" + s + "% - " + i + "px)") : s
    }

    function r(t, r) {
        var i = e(t.options),
            s = 0,
            a = void 0,
            c = void 0;
        return 1 === ++r ? 0 : (c = n(t.options).x, a = (c - (i - 1) * c / i) * (r - 1), s += o(t.options, !1) * (r - 1), "calc(" + s + "% + " + a + "px)")
    }

    function i(t) {
        for (var e = 0, n = t.container, o = t.rows, r = o.length - 1; r >= 0; r--) e = o[r] > e ? o[r] : e;
        n.style.height = e + "px"
    }

    function s(t, o) {
        var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            s = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
            a = e(t.options),
            c = n(t.options).y;
        f(t, a, r), o.forEach(function(e) {
            var n = 0,
                o = parseInt(e.offsetHeight, 10);
            isNaN(o) || (t.rows.forEach(function(e, o) {
                e < t.rows[n] && (n = o)
            }), e.style.position = "absolute", e.style.top = t.rows[n] + "px", e.style.left = "" + t.cols[n], t.rows[n] += isNaN(o) ? 0 : o + c, s && (e.dataset.macyComplete = 1))
        }), s && (t.tmpRows = null), i(t)
    }

    function a(t, o) {
        var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            s = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
            a = e(t.options),
            c = n(t.options).y;
        f(t, a, r), o.forEach(function(e) {
            t.lastcol === a && (t.lastcol = 0);
            var n = p(e, "height");
            n = parseInt(e.offsetHeight, 10), isNaN(n) || (e.style.position = "absolute", e.style.top = t.rows[t.lastcol] + "px", e.style.left = "" + t.cols[t.lastcol], t.rows[t.lastcol] += isNaN(n) ? 0 : n + c, t.lastcol += 1, s && (e.dataset.macyComplete = 1))
        }), s && (t.tmpRows = null), i(t)
    }

    function c(t, e) {
        var n = void 0;
        return function() {
            n && clearTimeout(n), n = setTimeout(t, e)
        }
    }
    Object.getOwnPropertyNames(Array.prototype).forEach(function(t) {
        "length" !== t && (NodeList.prototype[t] = Array.prototype[t], HTMLCollection.prototype[t] = Array.prototype[t])
    });
    var l = function t(e, n) {
        if (!(this instanceof t)) return new t(e, n);
        if (e = e.replace(/^\s*/, "").replace(/\s*$/, ""), n) return this.byCss(e, n);
        for (var o in this.selectors)
            if (n = o.split("/"), new RegExp(n[1], n[2]).test(e)) return this.selectors[o](e);
        return this.byCss(e)
    };
    l.prototype.byCss = function(t, e) {
        return (e || document).querySelectorAll(t)
    }, l.prototype.selectors = {}, l.prototype.selectors[/^\.[\w\-]+$/] = function(t) {
        return document.getElementsByClassName(t.substring(1))
    }, l.prototype.selectors[/^\w+$/] = function(t) {
        return document.getElementsByTagName(t)
    }, l.prototype.selectors[/^\#[\w\-]+$/] = function(t) {
        return document.getElementsByClassName(t.substring(1))
    };
    var u = function(t) {
            return t === Object(t) && "[object Array]" !== Object.prototype.toString.call(t)
        },
        p = function(t, e) {
            return window.getComputedStyle(t, null).getPropertyValue(e)
        },
        f = function(t, e) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if (t.lastcol || (t.lastcol = 0), n) {
                t.rows = [], t.cols = [], t.lastcol = 0;
                for (var o = e - 1; o >= 0; o--) t.rows[o] = 0, t.cols[o] = r(t, o)
            }
            if (t.tmpRows) {
                t.rows = [];
                for (var o = e - 1; o >= 0; o--) t.rows[o] = t.tmpRows[o]
            } else {
                t.tmpRows = [];
                for (var o = e - 1; o >= 0; o--) t.tmpRows[o] = t.rows[o]
            }
        },
        m = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
                r = e ? t.container.children : l(':scope > *:not([data-macy-complete="1"])', t.container),
                i = o(t.options);
            return r.forEach(function(t) {
                e && (t.dataset.macyComplete = 0), t.style.width = i
            }), t.options.trueOrder ? a(t, r, e, n) : s(t, r, e, n)
        },
        h = function(t, e) {
            setTimeout(function() {
                var n = t();
                e && e(n)
            }, 0)
        },
        d = function(t, e, n) {
            t && h(t), n.req === n.complete && h(e)
        },
        g = function(t, e, n) {
            var o = t.length,
                r = 0;
            t.forEach(function(t) {
                t.complete && (r++, d(e, n, {
                    req: o,
                    complete: r
                })), t.addEventListener("load", function() {
                    r++, d(e, n, {
                        req: o,
                        complete: r
                    })
                })
            })
        },
        y = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o])
            }
            return t
        },
        v = {
            columns: 4,
            margin: 2,
            trueOrder: !0,
            waitForImages: !1
        },
        w = function t() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : v;
            if (!(this instanceof t)) return new t(e);
            if (this.options = {}, y(this.options, v, e), this.container = l(e.container), this.container instanceof l || !this.container) return !!e.debug && console.error("Error: Container not found");
            delete this.options.container, this.container.length && (this.container = this.container[0]), this.container.style.position = "relative", this.rows = [];
            var n = this.recalculate.bind(this, !1, !1),
                o = this.recalculate.bind(this, !0, !0),
                r = l("img", this.container);
            if (this.resizer = c(function() {
                    o()
                }, 100), window.addEventListener("resize", this.resizer), e.waitForImages) return g(r, null, o);
            this.recalculate(!0, !1), g(r, n, o)
        };
    return w.init = function(t) {
        return console.warn("Depreciated: Macy.init will be removed in v3.0.0 opt to use Macy directly like so Macy({ /*options here*/ }) "), new w(t)
    }, w.prototype.recalculateOnImageLoad = function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
            e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = l("img", this.container),
            o = this.recalculate.bind(this, e, !1),
            r = this.recalculate.bind(this, e, !0);
        return t ? g(n, null, r) : (o(), g(n, o, r))
    }, w.prototype.runOnImageLoad = function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = l("img", this.container);
        return e ? g(n, t, t) : g(n, null, t)
    }, w.prototype.recalculate = function() {
        return m(this, arguments.length > 0 && void 0 !== arguments[0] && arguments[0], !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1])
    }, w.prototype.remove = function() {
        window.removeEventListener("resize", this.resizer), this.container.children.forEach(function(t) {
            t.removeAttribute("data-macy-complete"), t.removeAttribute("style")
        }), this.container.removeAttribute("style")
    }, w.prototype.reInit = function() {
        this.recalculate(!0, !0), window.addEventListener("resize", this.resizer)
    }, w
});