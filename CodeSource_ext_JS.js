var IE = {
        Enum: {
        },
        Externe: {
        },
        Classes: {
        }
};
var IEClasses = IE.Classes,
IEEnum = IE.Enum;
(function () {
        function getRequire(aIdentifiant, aGroupe) {
                var lRequire = {
                        _identifiant: aIdentifiant,
                        _groupe: aGroupe || '',
                        _espaces: '',
                        _dev: false,
                        _prod: false,
                        _noMini: false,
                        users: [
                        ],
                        dev: function () {
                                this._dev = true;
                                return this;
                        },
                        prod: function () {
                                this._prod = true;
                                return this;
                        },
                        espaces: function (aEspaces) {
                                this._espaces = aEspaces;
                                return this;
                        },
                        noMini: function () {
                                this._NoMini = true;
                                return this;
                        }
                };
                return lRequire;
        }
        IE.outilsUses = function () {
        };
        IE.require = function (aIdentifiant, aGroupe) {
                return getRequire(aIdentifiant, aGroupe);
        };
        IE.ressource = function (aIdentifiant) {
                return {
                        _dev: false,
                        _prod: false,
                        dev: function () {
                                this._dev = true;
                                return this;
                        },
                        prod: function () {
                                this._prod = true;
                                return this;
                        }
                };
        };
        IE.groupeDefer = function (aIdentifiant) {
                return {
                        _identifiant: aIdentifiant
                };
        };
}());
;
/* pako 0.2.5 nodeca/pako */
!function (t) {
        if ('object' == typeof exports && 'undefined' != typeof module) module.exports = t();
         else if ('function' == typeof define && define.amd) define([], t);
         else {
                var e;
                'undefined' != typeof window ? e = window : 'undefined' != typeof global ? e = global : 'undefined' != typeof self && (e = self),
                e.pako = t()
        }
}(function () {
        return function t(e, a, i) {
                function n(s, o) {
                        if (!a[s]) {
                                if (!e[s]) {
                                        var l = 'function' == typeof require && require;
                                        if (!o && l) return l(s, !0);
                                        if (r) return r(s, !0);
                                        throw new Error('Cannot find module \'' + s + '\'')
                                }
                                var h = a[s] = {
                                        exports: {
                                        }
                                };
                                e[s][0].call(h.exports, function (t) {
                                        var a = e[s][1][t];
                                        return n(a ? a : t)
                                }, h, h.exports, t, e, a, i)
                        }
                        return a[s].exports
                }
                for (var r = 'function' == typeof require && require, s = 0; s < i.length; s++) n(i[s]);
                return n
        }({
                1: [
                        function (t, e) {
                                'use strict';
                                var a = t('./lib/utils/common').assign,
                                i = t('./lib/deflate'),
                                n = t('./lib/inflate'),
                                r = t('./lib/zlib/constants'),
                                s = {
                                };
                                a(s, i, n, r),
                                e.exports = s
                        },
                        {
                                './lib/deflate': 2,
                                './lib/inflate': 3,
                                './lib/utils/common': 4,
                                './lib/zlib/constants': 7
                        }
                ],
                2: [
                        function (t, e, a) {
                                'use strict';
                                function i(t, e) {
                                        var a = new w(e);
                                        if (a.push(t, !0), a.err) throw a.msg;
                                        return a.result
                                }
                                function n(t, e) {
                                        return e = e || {
                                        },
                                        e.raw = !0,
                                        i(t, e)
                                }
                                function r(t, e) {
                                        return e = e || {
                                        },
                                        e.gzip = !0,
                                        i(t, e)
                                }
                                var s = t('./zlib/deflate.js'),
                                o = t('./utils/common'),
                                l = t('./utils/strings'),
                                h = t('./zlib/messages'),
                                d = t('./zlib/zstream'),
                                f = 0,
                                _ = 4,
                                u = 0,
                                c = 1,
                                b = - 1,
                                g = 0,
                                m = 8,
                                w = function (t) {
                                        this.options = o.assign({
                                                level: b,
                                                method: m,
                                                chunkSize: 16384,
                                                windowBits: 15,
                                                memLevel: 8,
                                                strategy: g,
                                                to: ''
                                        }, t || {
                                        });
                                        var e = this.options;
                                        e.raw && e.windowBits > 0 ? e.windowBits = - e.windowBits : e.gzip && e.windowBits > 0 && e.windowBits < 16 && (e.windowBits += 16),
                                        this.err = 0,
                                        this.msg = '',
                                        this.ended = !1,
                                        this.chunks = [
                                        ],
                                        this.strm = new d,
                                        this.strm.avail_out = 0;
                                        var a = s.deflateInit2(this.strm, e.level, e.method, e.windowBits, e.memLevel, e.strategy);
                                        if (a !== u) throw new Error(h[a]);
                                        e.header && s.deflateSetHeader(this.strm, e.header)
                                };
                                w.prototype.push = function (t, e) {
                                        var a,
                                        i,
                                        n = this.strm,
                                        r = this.options.chunkSize;
                                        if (this.ended) return !1;
                                        i = e === ~~e ? e : e === !0 ? _ : f,
                                        n.input = 'string' == typeof t ? l.string2buf(t)  : t,
                                        n.next_in = 0,
                                        n.avail_in = n.input.length;
                                        do {
                                                if (0 === n.avail_out && (n.output = new o.Buf8(r), n.next_out = 0, n.avail_out = r), a = s.deflate(n, i), a !== c && a !== u) return this.onEnd(a),
                                                this.ended = !0,
                                                !1;
                                                (0 === n.avail_out || 0 === n.avail_in && i === _) && this.onData('string' === this.options.to ? l.buf2binstring(o.shrinkBuf(n.output, n.next_out))  : o.shrinkBuf(n.output, n.next_out))
                                        } while ((n.avail_in > 0 || 0 === n.avail_out) && a !== c);
                                        return i === _ ? (a = s.deflateEnd(this.strm), this.onEnd(a), this.ended = !0, a === u)  : !0
                                },
                                w.prototype.onData = function (t) {
                                        this.chunks.push(t)
                                },
                                w.prototype.onEnd = function (t) {
                                        t === u && (this.result = 'string' === this.options.to ? this.chunks.join('')  : o.flattenChunks(this.chunks)),
                                        this.chunks = [
                                        ],
                                        this.err = t,
                                        this.msg = this.strm.msg
                                },
                                a.Deflate = w,
                                a.deflate = i,
                                a.deflateRaw = n,
                                a.gzip = r
                        },
                        {
                                './utils/common': 4,
                                './utils/strings': 5,
                                './zlib/deflate.js': 9,
                                './zlib/messages': 14,
                                './zlib/zstream': 16
                        }
                ],
                3: [
                        function (t, e, a) {
                                'use strict';
                                function i(t, e) {
                                        var a = new _(e);
                                        if (a.push(t, !0), a.err) throw a.msg;
                                        return a.result
                                }
                                function n(t, e) {
                                        return e = e || {
                                        },
                                        e.raw = !0,
                                        i(t, e)
                                }
                                var r = t('./zlib/inflate.js'),
                                s = t('./utils/common'),
                                o = t('./utils/strings'),
                                l = t('./zlib/constants'),
                                h = t('./zlib/messages'),
                                d = t('./zlib/zstream'),
                                f = t('./zlib/gzheader'),
                                _ = function (t) {
                                        this.options = s.assign({
                                                chunkSize: 16384,
                                                windowBits: 0,
                                                to: ''
                                        }, t || {
                                        });
                                        var e = this.options;
                                        e.raw && e.windowBits >= 0 && e.windowBits < 16 && (e.windowBits = - e.windowBits, 0 === e.windowBits && (e.windowBits = - 15)),
                                        !(e.windowBits >= 0 && e.windowBits < 16) || t && t.windowBits || (e.windowBits += 32),
                                        e.windowBits > 15 && e.windowBits < 48 && 0 === (15 & e.windowBits) && (e.windowBits |= 15),
                                        this.err = 0,
                                        this.msg = '',
                                        this.ended = !1,
                                        this.chunks = [
                                        ],
                                        this.strm = new d,
                                        this.strm.avail_out = 0;
                                        var a = r.inflateInit2(this.strm, e.windowBits);
                                        if (a !== l.Z_OK) throw new Error(h[a]);
                                        this.header = new f,
                                        r.inflateGetHeader(this.strm, this.header)
                                };
                                _.prototype.push = function (t, e) {
                                        var a,
                                        i,
                                        n,
                                        h,
                                        d,
                                        f = this.strm,
                                        _ = this.options.chunkSize;
                                        if (this.ended) return !1;
                                        i = e === ~~e ? e : e === !0 ? l.Z_FINISH : l.Z_NO_FLUSH,
                                        f.input = 'string' == typeof t ? o.binstring2buf(t)  : t,
                                        f.next_in = 0,
                                        f.avail_in = f.input.length;
                                        do {
                                                if (0 === f.avail_out && (f.output = new s.Buf8(_), f.next_out = 0, f.avail_out = _), a = r.inflate(f, l.Z_NO_FLUSH), a !== l.Z_STREAM_END && a !== l.Z_OK) return this.onEnd(a),
                                                this.ended = !0,
                                                !1;
                                                f.next_out && (0 === f.avail_out || a === l.Z_STREAM_END || 0 === f.avail_in && i === l.Z_FINISH) && ('string' === this.options.to ? (n = o.utf8border(f.output, f.next_out), h = f.next_out - n, d = o.buf2string(f.output, n), f.next_out = h, f.avail_out = _ - h, h && s.arraySet(f.output, f.output, n, h, 0), this.onData(d))  : this.onData(s.shrinkBuf(f.output, f.next_out)))
                                        } while (f.avail_in > 0 && a !== l.Z_STREAM_END);
                                        return a === l.Z_STREAM_END && (i = l.Z_FINISH),
                                        i === l.Z_FINISH ? (a = r.inflateEnd(this.strm), this.onEnd(a), this.ended = !0, a === l.Z_OK)  : !0
                                },
                                _.prototype.onData = function (t) {
                                        this.chunks.push(t)
                                },
                                _.prototype.onEnd = function (t) {
                                        t === l.Z_OK && (this.result = 'string' === this.options.to ? this.chunks.join('')  : s.flattenChunks(this.chunks)),
                                        this.chunks = [
                                        ],
                                        this.err = t,
                                        this.msg = this.strm.msg
                                },
                                a.Inflate = _,
                                a.inflate = i,
                                a.inflateRaw = n,
                                a.ungzip = i
                        },
                        {
                                './utils/common': 4,
                                './utils/strings': 5,
                                './zlib/constants': 7,
                                './zlib/gzheader': 10,
                                './zlib/inflate.js': 12,
                                './zlib/messages': 14,
                                './zlib/zstream': 16
                        }
                ],
                4: [
                        function (t, e, a) {
                                'use strict';
                                var i = 'undefined' != typeof Uint8Array && 'undefined' != typeof Uint16Array && 'undefined' != typeof Int32Array;
                                a.assign = function (t) {
                                        for (var e = Array.prototype.slice.call(arguments, 1); e.length; ) {
                                                var a = e.shift();
                                                if (a) {
                                                        if ('object' != typeof a) throw new TypeError(a + 'must be non-object');
                                                        for (var i in a) a.hasOwnProperty(i) && (t[i] = a[i])
                                                }
                                        }
                                        return t
                                },
                                a.shrinkBuf = function (t, e) {
                                        return t.length === e ? t : t.subarray ? t.subarray(0, e)  : (t.length = e, t)
                                };
                                var n = {
                                        arraySet: function (t, e, a, i, n) {
                                                if (e.subarray && t.subarray) return void t.set(e.subarray(a, a + i), n);
                                                for (var r = 0; i > r; r++) t[n + r] = e[a + r]
                                        },
                                        flattenChunks: function (t) {
                                                var e,
                                                a,
                                                i,
                                                n,
                                                r,
                                                s;
                                                for (i = 0, e = 0, a = t.length; a > e; e++) i += t[e].length;
                                                for (s = new Uint8Array(i), n = 0, e = 0, a = t.length; a > e; e++) r = t[e],
                                                s.set(r, n),
                                                n += r.length;
                                                return s
                                        }
                                },
                                r = {
                                        arraySet: function (t, e, a, i, n) {
                                                for (var r = 0; i > r; r++) t[n + r] = e[a + r]
                                        },
                                        flattenChunks: function (t) {
                                                return [].concat.apply([], t)
                                        }
                                };
                                a.setTyped = function (t) {
                                        t ? (a.Buf8 = Uint8Array, a.Buf16 = Uint16Array, a.Buf32 = Int32Array, a.assign(a, n))  : (a.Buf8 = Array, a.Buf16 = Array, a.Buf32 = Array, a.assign(a, r))
                                },
                                a.setTyped(i)
                        },
                        {
                        }
                ],
                5: [
                        function (t, e, a) {
                                'use strict';
                                function i(t, e) {
                                        if (65537 > e && (t.subarray && s || !t.subarray && r)) return String.fromCharCode.apply(null, n.shrinkBuf(t, e));
                                        for (var a = '', i = 0; e > i; i++) a += String.fromCharCode(t[i]);
                                        return a
                                }
                                var n = t('./common'),
                                r = !0,
                                s = !0;
                                try {
                                        String.fromCharCode.apply(null, [
                                                0
                                        ])
                                } catch (o) {
                                        r = !1
                                }
                                try {
                                        String.fromCharCode.apply(null, new Uint8Array(1))
                                } catch (o) {
                                        s = !1
                                }
                                for (var l = new n.Buf8(256), h = 0; 256 > h; h++) l[h] = h >= 252 ? 6 : h >= 248 ? 5 : h >= 240 ? 4 : h >= 224 ? 3 : h >= 192 ? 2 : 1;
                                l[254] = l[254] = 1,
                                a.string2buf = function (t) {
                                        var e,
                                        a,
                                        i,
                                        r,
                                        s,
                                        o = t.length,
                                        l = 0;
                                        for (r = 0; o > r; r++) a = t.charCodeAt(r),
                                        55296 === (64512 & a) && o > r + 1 && (i = t.charCodeAt(r + 1), 56320 === (64512 & i) && (a = 65536 + (a - 55296 << 10) + (i - 56320), r++)),
                                        l += 128 > a ? 1 : 2048 > a ? 2 : 65536 > a ? 3 : 4;
                                        for (e = new n.Buf8(l), s = 0, r = 0; l > s; r++) a = t.charCodeAt(r),
                                        55296 === (64512 & a) && o > r + 1 && (i = t.charCodeAt(r + 1), 56320 === (64512 & i) && (a = 65536 + (a - 55296 << 10) + (i - 56320), r++)),
                                        128 > a ? e[s++] = a : 2048 > a ? (e[s++] = 192 | a >>> 6, e[s++] = 128 | 63 & a)  : 65536 > a ? (e[s++] = 224 | a >>> 12, e[s++] = 128 | a >>> 6 & 63, e[s++] = 128 | 63 & a)  : (e[s++] = 240 | a >>> 18, e[s++] = 128 | a >>> 12 & 63, e[s++] = 128 | a >>> 6 & 63, e[s++] = 128 | 63 & a);
                                        return e
                                },
                                a.buf2binstring = function (t) {
                                        return i(t, t.length)
                                },
                                a.binstring2buf = function (t) {
                                        for (var e = new n.Buf8(t.length), a = 0, i = e.length; i > a; a++) e[a] = t.charCodeAt(a);
                                        return e
                                },
                                a.buf2string = function (t, e) {
                                        var a,
                                        n,
                                        r,
                                        s,
                                        o = e || t.length,
                                        h = new Array(2 * o);
                                        for (n = 0, a = 0; o > a; ) if (r = t[a++], 128 > r) h[n++] = r;
                                         else if (s = l[r], s > 4) h[n++] = 65533,
                                        a += s - 1;
                                         else {
                                                for (r &= 2 === s ? 31 : 3 === s ? 15 : 7; s > 1 && o > a; ) r = r << 6 | 63 & t[a++],
                                                s--;
                                                s > 1 ? h[n++] = 65533 : 65536 > r ? h[n++] = r : (r -= 65536, h[n++] = 55296 | r >> 10 & 1023, h[n++] = 56320 | 1023 & r)
                                        }
                                        return i(h, n)
                                },
                                a.utf8border = function (t, e) {
                                        var a;
                                        for (e = e || t.length, e > t.length && (e = t.length), a = e - 1; a >= 0 && 128 === (192 & t[a]); ) a--;
                                        return 0 > a ? e : 0 === a ? e : a + l[t[a]] > e ? a : e
                                }
                        },
                        {
                                './common': 4
                        }
                ],
                6: [
                        function (t, e) {
                                'use strict';
                                function a(t, e, a, i) {
                                        for (var n = 65535 & t | 0, r = t >>> 16 & 65535 | 0, s = 0; 0 !== a; ) {
                                                s = a > 2000 ? 2000 : a,
                                                a -= s;
                                                do n = n + e[i++] | 0,
                                                r = r + n | 0;
                                                while (--s);
                                                n %= 65521,
                                                r %= 65521
                                        }
                                        return n | r << 16 | 0
                                }
                                e.exports = a
                        },
                        {
                        }
                ],
                7: [
                        function (t, e) {
                                e.exports = {
                                        Z_NO_FLUSH: 0,
                                        Z_PARTIAL_FLUSH: 1,
                                        Z_SYNC_FLUSH: 2,
                                        Z_FULL_FLUSH: 3,
                                        Z_FINISH: 4,
                                        Z_BLOCK: 5,
                                        Z_TREES: 6,
                                        Z_OK: 0,
                                        Z_STREAM_END: 1,
                                        Z_NEED_DICT: 2,
                                        Z_ERRNO: - 1,
                                        Z_STREAM_ERROR: - 2,
                                        Z_DATA_ERROR: - 3,
                                        Z_BUF_ERROR: - 5,
                                        Z_NO_COMPRESSION: 0,
                                        Z_BEST_SPEED: 1,
                                        Z_BEST_COMPRESSION: 9,
                                        Z_DEFAULT_COMPRESSION: - 1,
                                        Z_FILTERED: 1,
                                        Z_HUFFMAN_ONLY: 2,
                                        Z_RLE: 3,
                                        Z_FIXED: 4,
                                        Z_DEFAULT_STRATEGY: 0,
                                        Z_BINARY: 0,
                                        Z_TEXT: 1,
                                        Z_UNKNOWN: 2,
                                        Z_DEFLATED: 8
                                }
                        },
                        {
                        }
                ],
                8: [
                        function (t, e) {
                                'use strict';
                                function a() {
                                        for (var t, e = [
                                        ], a = 0; 256 > a; a++) {
                                                t = a;
                                                for (var i = 0; 8 > i; i++) t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;
                                                e[a] = t
                                        }
                                        return e
                                }
                                function i(t, e, a, i) {
                                        var r = n,
                                        s = i + a;
                                        t = - 1 ^ t;
                                        for (var o = i; s > o; o++) t = t >>> 8 ^ r[255 & (t ^ e[o])];
                                        return - 1 ^ t
                                }
                                var n = a();
                                e.exports = i
                        },
                        {
                        }
                ],
                9: [
                        function (t, e, a) {
                                'use strict';
                                function i(t, e) {
                                        return t.msg = I[e],
                                        e
                                }
                                function n(t) {
                                        return (t << 1) - (t > 4 ? 9 : 0)
                                }
                                function r(t) {
                                        for (var e = t.length; --e >= 0; ) t[e] = 0
                                }
                                function s(t) {
                                        var e = t.state,
                                        a = e.pending;
                                        a > t.avail_out && (a = t.avail_out),
                                        0 !== a && (A.arraySet(t.output, e.pending_buf, e.pending_out, a, t.next_out), t.next_out += a, e.pending_out += a, t.total_out += a, t.avail_out -= a, e.pending -= a, 0 === e.pending && (e.pending_out = 0))
                                }
                                function o(t, e) {
                                        Z._tr_flush_block(t, t.block_start >= 0 ? t.block_start : - 1, t.strstart - t.block_start, e),
                                        t.block_start = t.strstart,
                                        s(t.strm)
                                }
                                function l(t, e) {
                                        t.pending_buf[t.pending++] = e
                                }
                                function h(t, e) {
                                        t.pending_buf[t.pending++] = e >>> 8 & 255,
                                        t.pending_buf[t.pending++] = 255 & e
                                }
                                function d(t, e, a, i) {
                                        var n = t.avail_in;
                                        return n > i && (n = i),
                                        0 === n ? 0 : (t.avail_in -= n, A.arraySet(e, t.input, t.next_in, n, a), 1 === t.state.wrap ? t.adler = R(t.adler, e, n, a)  : 2 === t.state.wrap && (t.adler = C(t.adler, e, n, a)), t.next_in += n, t.total_in += n, n)
                                }
                                function f(t, e) {
                                        var a,
                                        i,
                                        n = t.max_chain_length,
                                        r = t.strstart,
                                        s = t.prev_length,
                                        o = t.nice_match,
                                        l = t.strstart > t.w_size - he ? t.strstart - (t.w_size - he)  : 0,
                                        h = t.window,
                                        d = t.w_mask,
                                        f = t.prev,
                                        _ = t.strstart + le,
                                        u = h[r + s - 1],
                                        c = h[r + s];
                                        t.prev_length >= t.good_match && (n >>= 2),
                                        o > t.lookahead && (o = t.lookahead);
                                        do if (a = e, h[a + s] === c && h[a + s - 1] === u && h[a] === h[r] && h[++a] === h[r + 1]) {
                                                r += 2,
                                                a++;
                                                do ;
                                                while (h[++r] === h[++a] && h[++r] === h[++a] && h[++r] === h[++a] && h[++r] === h[++a] && h[++r] === h[++a] && h[++r] === h[++a] && h[++r] === h[++a] && h[++r] === h[++a] && _ > r);
                                                if (i = le - (_ - r), r = _ - le, i > s) {
                                                        if (t.match_start = e, s = i, i >= o) break;
                                                        u = h[r + s - 1],
                                                        c = h[r + s]
                                                }
                                        } while ((e = f[e & d]) > l && 0 !== --n);
                                        return s <= t.lookahead ? s : t.lookahead
                                }
                                function _(t) {
                                        var e,
                                        a,
                                        i,
                                        n,
                                        r,
                                        s = t.w_size;
                                        do {
                                                if (n = t.window_size - t.lookahead - t.strstart, t.strstart >= s + (s - he)) {
                                                        A.arraySet(t.window, t.window, s, s, 0),
                                                        t.match_start -= s,
                                                        t.strstart -= s,
                                                        t.block_start -= s,
                                                        a = t.hash_size,
                                                        e = a;
                                                        do i = t.head[--e],
                                                        t.head[e] = i >= s ? i - s : 0;
                                                        while (--a);
                                                        a = s,
                                                        e = a;
                                                        do i = t.prev[--e],
                                                        t.prev[e] = i >= s ? i - s : 0;
                                                        while (--a);
                                                        n += s
                                                }
                                                if (0 === t.strm.avail_in) break;
                                                if (a = d(t.strm, t.window, t.strstart + t.lookahead, n), t.lookahead += a, t.lookahead + t.insert >= oe) for (r = t.strstart - t.insert, t.ins_h = t.window[r], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[r + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[r + oe - 1]) & t.hash_mask, t.prev[r & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = r, r++, t.insert--, !(t.lookahead + t.insert < oe)); );
                                        } while (t.lookahead < he && 0 !== t.strm.avail_in)
                                }
                                function u(t, e) {
                                        var a = 65535;
                                        for (a > t.pending_buf_size - 5 && (a = t.pending_buf_size - 5); ; ) {
                                                if (t.lookahead <= 1) {
                                                        if (_(t), 0 === t.lookahead && e === N) return we;
                                                        if (0 === t.lookahead) break
                                                }
                                                t.strstart += t.lookahead,
                                                t.lookahead = 0;
                                                var i = t.block_start + a;
                                                if ((0 === t.strstart || t.strstart >= i) && (t.lookahead = t.strstart - i, t.strstart = i, o(t, !1), 0 === t.strm.avail_out)) return we;
                                                if (t.strstart - t.block_start >= t.w_size - he && (o(t, !1), 0 === t.strm.avail_out)) return we
                                        }
                                        return t.insert = 0,
                                        e === D ? (o(t, !0), 0 === t.strm.avail_out ? ve : ke)  : t.strstart > t.block_start && (o(t, !1), 0 === t.strm.avail_out) ? we : we
                                }
                                function c(t, e) {
                                        for (var a, i; ; ) {
                                                if (t.lookahead < he) {
                                                        if (_(t), t.lookahead < he && e === N) return we;
                                                        if (0 === t.lookahead) break
                                                }
                                                if (a = 0, t.lookahead >= oe && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + oe - 1]) & t.hash_mask, a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), 0 !== a && t.strstart - a <= t.w_size - he && (t.match_length = f(t, a)), t.match_length >= oe) if (i = Z._tr_tally(t, t.strstart - t.match_start, t.match_length - oe), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= oe) {
                                                        t.match_length--;
                                                        do t.strstart++,
                                                        t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + oe - 1]) & t.hash_mask,
                                                        a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h],
                                                        t.head[t.ins_h] = t.strstart;
                                                        while (0 !== --t.match_length);
                                                        t.strstart++
                                                } else t.strstart += t.match_length,
                                                t.match_length = 0,
                                                t.ins_h = t.window[t.strstart],
                                                t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask;
                                                 else i = Z._tr_tally(t, 0, t.window[t.strstart]),
                                                t.lookahead--,
                                                t.strstart++;
                                                if (i && (o(t, !1), 0 === t.strm.avail_out)) return we
                                        }
                                        return t.insert = t.strstart < oe - 1 ? t.strstart : oe - 1,
                                        e === D ? (o(t, !0), 0 === t.strm.avail_out ? ve : ke)  : t.last_lit && (o(t, !1), 0 === t.strm.avail_out) ? we : pe
                                }
                                function b(t, e) {
                                        for (var a, i, n; ; ) {
                                                if (t.lookahead < he) {
                                                        if (_(t), t.lookahead < he && e === N) return we;
                                                        if (0 === t.lookahead) break
                                                }
                                                if (a = 0, t.lookahead >= oe && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + oe - 1]) & t.hash_mask, a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = oe - 1, 0 !== a && t.prev_length < t.max_lazy_match && t.strstart - a <= t.w_size - he && (t.match_length = f(t, a), t.match_length <= 5 && (t.strategy === P || t.match_length === oe && t.strstart - t.match_start > 4096) && (t.match_length = oe - 1)), t.prev_length >= oe && t.match_length <= t.prev_length) {
                                                        n = t.strstart + t.lookahead - oe,
                                                        i = Z._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - oe),
                                                        t.lookahead -= t.prev_length - 1,
                                                        t.prev_length -= 2;
                                                        do ++t.strstart <= n && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + oe - 1]) & t.hash_mask, a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart);
                                                        while (0 !== --t.prev_length);
                                                        if (t.match_available = 0, t.match_length = oe - 1, t.strstart++, i && (o(t, !1), 0 === t.strm.avail_out)) return we
                                                } else if (t.match_available) {
                                                        if (i = Z._tr_tally(t, 0, t.window[t.strstart - 1]), i && o(t, !1), t.strstart++, t.lookahead--, 0 === t.strm.avail_out) return we
                                                } else t.match_available = 1,
                                                t.strstart++,
                                                t.lookahead--
                                        }
                                        return t.match_available && (i = Z._tr_tally(t, 0, t.window[t.strstart - 1]), t.match_available = 0),
                                        t.insert = t.strstart < oe - 1 ? t.strstart : oe - 1,
                                        e === D ? (o(t, !0), 0 === t.strm.avail_out ? ve : ke)  : t.last_lit && (o(t, !1), 0 === t.strm.avail_out) ? we : pe
                                }
                                function g(t, e) {
                                        for (var a, i, n, r, s = t.window; ; ) {
                                                if (t.lookahead <= le) {
                                                        if (_(t), t.lookahead <= le && e === N) return we;
                                                        if (0 === t.lookahead) break
                                                }
                                                if (t.match_length = 0, t.lookahead >= oe && t.strstart > 0 && (n = t.strstart - 1, i = s[n], i === s[++n] && i === s[++n] && i === s[++n])) {
                                                        r = t.strstart + le;
                                                        do ;
                                                        while (i === s[++n] && i === s[++n] && i === s[++n] && i === s[++n] && i === s[++n] && i === s[++n] && i === s[++n] && i === s[++n] && r > n);
                                                        t.match_length = le - (r - n),
                                                        t.match_length > t.lookahead && (t.match_length = t.lookahead)
                                                }
                                                if (t.match_length >= oe ? (a = Z._tr_tally(t, 1, t.match_length - oe), t.lookahead -= t.match_length, t.strstart += t.match_length, t.match_length = 0)  : (a = Z._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++), a && (o(t, !1), 0 === t.strm.avail_out)) return we
                                        }
                                        return t.insert = 0,
                                        e === D ? (o(t, !0), 0 === t.strm.avail_out ? ve : ke)  : t.last_lit && (o(t, !1), 0 === t.strm.avail_out) ? we : pe
                                }
                                function m(t, e) {
                                        for (var a; ; ) {
                                                if (0 === t.lookahead && (_(t), 0 === t.lookahead)) {
                                                        if (e === N) return we;
                                                        break
                                                }
                                                if (t.match_length = 0, a = Z._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++, a && (o(t, !1), 0 === t.strm.avail_out)) return we
                                        }
                                        return t.insert = 0,
                                        e === D ? (o(t, !0), 0 === t.strm.avail_out ? ve : ke)  : t.last_lit && (o(t, !1), 0 === t.strm.avail_out) ? we : pe
                                }
                                function w(t) {
                                        t.window_size = 2 * t.w_size,
                                        r(t.head),
                                        t.max_lazy_match = E[t.level].max_lazy,
                                        t.good_match = E[t.level].good_length,
                                        t.nice_match = E[t.level].nice_length,
                                        t.max_chain_length = E[t.level].max_chain,
                                        t.strstart = 0,
                                        t.block_start = 0,
                                        t.lookahead = 0,
                                        t.insert = 0,
                                        t.match_length = t.prev_length = oe - 1,
                                        t.match_available = 0,
                                        t.ins_h = 0
                                }
                                function p() {
                                        this.strm = null,
                                        this.status = 0,
                                        this.pending_buf = null,
                                        this.pending_buf_size = 0,
                                        this.pending_out = 0,
                                        this.pending = 0,
                                        this.wrap = 0,
                                        this.gzhead = null,
                                        this.gzindex = 0,
                                        this.method = J,
                                        this.last_flush = - 1,
                                        this.w_size = 0,
                                        this.w_bits = 0,
                                        this.w_mask = 0,
                                        this.window = null,
                                        this.window_size = 0,
                                        this.prev = null,
                                        this.head = null,
                                        this.ins_h = 0,
                                        this.hash_size = 0,
                                        this.hash_bits = 0,
                                        this.hash_mask = 0,
                                        this.hash_shift = 0,
                                        this.block_start = 0,
                                        this.match_length = 0,
                                        this.prev_match = 0,
                                        this.match_available = 0,
                                        this.strstart = 0,
                                        this.match_start = 0,
                                        this.lookahead = 0,
                                        this.prev_length = 0,
                                        this.max_chain_length = 0,
                                        this.max_lazy_match = 0,
                                        this.level = 0,
                                        this.strategy = 0,
                                        this.good_match = 0,
                                        this.nice_match = 0,
                                        this.dyn_ltree = new A.Buf16(2 * re),
                                        this.dyn_dtree = new A.Buf16(2 * (2 * ie + 1)),
                                        this.bl_tree = new A.Buf16(2 * (2 * ne + 1)),
                                        r(this.dyn_ltree),
                                        r(this.dyn_dtree),
                                        r(this.bl_tree),
                                        this.l_desc = null,
                                        this.d_desc = null,
                                        this.bl_desc = null,
                                        this.bl_count = new A.Buf16(se + 1),
                                        this.heap = new A.Buf16(2 * ae + 1),
                                        r(this.heap),
                                        this.heap_len = 0,
                                        this.heap_max = 0,
                                        this.depth = new A.Buf16(2 * ae + 1),
                                        r(this.depth),
                                        this.l_buf = 0,
                                        this.lit_bufsize = 0,
                                        this.last_lit = 0,
                                        this.d_buf = 0,
                                        this.opt_len = 0,
                                        this.static_len = 0,
                                        this.matches = 0,
                                        this.insert = 0,
                                        this.bi_buf = 0,
                                        this.bi_valid = 0
                                }
                                function v(t) {
                                        var e;
                                        return t && t.state ? (t.total_in = t.total_out = 0, t.data_type = W, e = t.state, e.pending = 0, e.pending_out = 0, e.wrap < 0 && (e.wrap = - e.wrap), e.status = e.wrap ? fe : ge, t.adler = 2 === e.wrap ? 0 : 1, e.last_flush = N, Z._tr_init(e), L)  : i(t, H)
                                }
                                function k(t) {
                                        var e = v(t);
                                        return e === L && w(t.state),
                                        e
                                }
                                function x(t, e) {
                                        return t && t.state ? 2 !== t.state.wrap ? H : (t.state.gzhead = e, L)  : H
                                }
                                function y(t, e, a, n, r, s) {
                                        if (!t) return H;
                                        var o = 1;
                                        if (e === K && (e = 6), 0 > n ? (o = 0, n = - n)  : n > 15 && (o = 2, n -= 16), 1 > r || r > Q || a !== J || 8 > n || n > 15 || 0 > e || e > 9 || 0 > s || s > G) return i(t, H);
                                        8 === n && (n = 9);
                                        var l = new p;
                                        return t.state = l,
                                        l.strm = t,
                                        l.wrap = o,
                                        l.gzhead = null,
                                        l.w_bits = n,
                                        l.w_size = 1 << l.w_bits,
                                        l.w_mask = l.w_size - 1,
                                        l.hash_bits = r + 7,
                                        l.hash_size = 1 << l.hash_bits,
                                        l.hash_mask = l.hash_size - 1,
                                        l.hash_shift = ~~((l.hash_bits + oe - 1) / oe),
                                        l.window = new A.Buf8(2 * l.w_size),
                                        l.head = new A.Buf16(l.hash_size),
                                        l.prev = new A.Buf16(l.w_size),
                                        l.lit_bufsize = 1 << r + 6,
                                        l.pending_buf_size = 4 * l.lit_bufsize,
                                        l.pending_buf = new A.Buf8(l.pending_buf_size),
                                        l.d_buf = l.lit_bufsize >> 1,
                                        l.l_buf = 3 * l.lit_bufsize,
                                        l.level = e,
                                        l.strategy = s,
                                        l.method = a,
                                        k(t)
                                }
                                function z(t, e) {
                                        return y(t, e, J, V, $, X)
                                }
                                function B(t, e) {
                                        var a,
                                        o,
                                        d,
                                        f;
                                        if (!t || !t.state || e > F || 0 > e) return t ? i(t, H)  : H;
                                        if (o = t.state, !t.output || !t.input && 0 !== t.avail_in || o.status === me && e !== D) return i(t, 0 === t.avail_out ? M : H);
                                        if (o.strm = t, a = o.last_flush, o.last_flush = e, o.status === fe) if (2 === o.wrap) t.adler = 0,
                                        l(o, 31),
                                        l(o, 139),
                                        l(o, 8),
                                        o.gzhead ? (l(o, (o.gzhead.text ? 1 : 0) + (o.gzhead.hcrc ? 2 : 0) + (o.gzhead.extra ? 4 : 0) + (o.gzhead.name ? 8 : 0) + (o.gzhead.comment ? 16 : 0)), l(o, 255 & o.gzhead.time), l(o, o.gzhead.time >> 8 & 255), l(o, o.gzhead.time >> 16 & 255), l(o, o.gzhead.time >> 24 & 255), l(o, 9 === o.level ? 2 : o.strategy >= q || o.level < 2 ? 4 : 0), l(o, 255 & o.gzhead.os), o.gzhead.extra && o.gzhead.extra.length && (l(o, 255 & o.gzhead.extra.length), l(o, o.gzhead.extra.length >> 8 & 255)), o.gzhead.hcrc && (t.adler = C(t.adler, o.pending_buf, o.pending, 0)), o.gzindex = 0, o.status = _e)  : (l(o, 0), l(o, 0), l(o, 0), l(o, 0), l(o, 0), l(o, 9 === o.level ? 2 : o.strategy >= q || o.level < 2 ? 4 : 0), l(o, xe), o.status = ge);
                                         else {
                                                var _ = J + (o.w_bits - 8 << 4) << 8,
                                                u = - 1;
                                                u = o.strategy >= q || o.level < 2 ? 0 : o.level < 6 ? 1 : 6 === o.level ? 2 : 3,
                                                _ |= u << 6,
                                                0 !== o.strstart && (_ |= de),
                                                _ += 31 - _ % 31,
                                                o.status = ge,
                                                h(o, _),
                                                0 !== o.strstart && (h(o, t.adler >>> 16), h(o, 65535 & t.adler)),
                                                t.adler = 1
                                        }
                                        if (o.status === _e) if (o.gzhead.extra) {
                                                for (d = o.pending; o.gzindex < (65535 & o.gzhead.extra.length) && (o.pending !== o.pending_buf_size || (o.gzhead.hcrc && o.pending > d && (t.adler = C(t.adler, o.pending_buf, o.pending - d, d)), s(t), d = o.pending, o.pending !== o.pending_buf_size)); ) l(o, 255 & o.gzhead.extra[o.gzindex]),
                                                o.gzindex++;
                                                o.gzhead.hcrc && o.pending > d && (t.adler = C(t.adler, o.pending_buf, o.pending - d, d)),
                                                o.gzindex === o.gzhead.extra.length && (o.gzindex = 0, o.status = ue)
                                        } else o.status = ue;
                                        if (o.status === ue) if (o.gzhead.name) {
                                                d = o.pending;
                                                do {
                                                        if (o.pending === o.pending_buf_size && (o.gzhead.hcrc && o.pending > d && (t.adler = C(t.adler, o.pending_buf, o.pending - d, d)), s(t), d = o.pending, o.pending === o.pending_buf_size)) {
                                                                f = 1;
                                                                break
                                                        }
                                                        f = o.gzindex < o.gzhead.name.length ? 255 & o.gzhead.name.charCodeAt(o.gzindex++)  : 0,
                                                        l(o, f)
                                                } while (0 !== f);
                                                o.gzhead.hcrc && o.pending > d && (t.adler = C(t.adler, o.pending_buf, o.pending - d, d)),
                                                0 === f && (o.gzindex = 0, o.status = ce)
                                        } else o.status = ce;
                                        if (o.status === ce) if (o.gzhead.comment) {
                                                d = o.pending;
                                                do {
                                                        if (o.pending === o.pending_buf_size && (o.gzhead.hcrc && o.pending > d && (t.adler = C(t.adler, o.pending_buf, o.pending - d, d)), s(t), d = o.pending, o.pending === o.pending_buf_size)) {
                                                                f = 1;
                                                                break
                                                        }
                                                        f = o.gzindex < o.gzhead.comment.length ? 255 & o.gzhead.comment.charCodeAt(o.gzindex++)  : 0,
                                                        l(o, f)
                                                } while (0 !== f);
                                                o.gzhead.hcrc && o.pending > d && (t.adler = C(t.adler, o.pending_buf, o.pending - d, d)),
                                                0 === f && (o.status = be)
                                        } else o.status = be;
                                        if (o.status === be && (o.gzhead.hcrc ? (o.pending + 2 > o.pending_buf_size && s(t), o.pending + 2 <= o.pending_buf_size && (l(o, 255 & t.adler), l(o, t.adler >> 8 & 255), t.adler = 0, o.status = ge))  : o.status = ge), 0 !== o.pending) {
                                                if (s(t), 0 === t.avail_out) return o.last_flush = - 1,
                                                L
                                        } else if (0 === t.avail_in && n(e) <= n(a) && e !== D) return i(t, M);
                                        if (o.status === me && 0 !== t.avail_in) return i(t, M);
                                        if (0 !== t.avail_in || 0 !== o.lookahead || e !== N && o.status !== me) {
                                                var c = o.strategy === q ? m(o, e)  : o.strategy === Y ? g(o, e)  : E[o.level].func(o, e);
                                                if ((c === ve || c === ke) && (o.status = me), c === we || c === ve) return 0 === t.avail_out && (o.last_flush = - 1),
                                                L;
                                                if (c === pe && (e === O ? Z._tr_align(o)  : e !== F && (Z._tr_stored_block(o, 0, 0, !1), e === T && (r(o.head), 0 === o.lookahead && (o.strstart = 0, o.block_start = 0, o.insert = 0))), s(t), 0 === t.avail_out)) return o.last_flush = - 1,
                                                L
                                        }
                                        return e !== D ? L : o.wrap <= 0 ? U : (2 === o.wrap ? (l(o, 255 & t.adler), l(o, t.adler >> 8 & 255), l(o, t.adler >> 16 & 255), l(o, t.adler >> 24 & 255), l(o, 255 & t.total_in), l(o, t.total_in >> 8 & 255), l(o, t.total_in >> 16 & 255), l(o, t.total_in >> 24 & 255))  : (h(o, t.adler >>> 16), h(o, 65535 & t.adler)), s(t), o.wrap > 0 && (o.wrap = - o.wrap), 0 !== o.pending ? L : U)
                                }
                                function S(t) {
                                        var e;
                                        return t && t.state ? (e = t.state.status, e !== fe && e !== _e && e !== ue && e !== ce && e !== be && e !== ge && e !== me ? i(t, H)  : (t.state = null, e === ge ? i(t, j)  : L))  : H
                                }
                                var E,
                                A = t('../utils/common'),
                                Z = t('./trees'),
                                R = t('./adler32'),
                                C = t('./crc32'),
                                I = t('./messages'),
                                N = 0,
                                O = 1,
                                T = 3,
                                D = 4,
                                F = 5,
                                L = 0,
                                U = 1,
                                H = - 2,
                                j = - 3,
                                M = - 5,
                                K = - 1,
                                P = 1,
                                q = 2,
                                Y = 3,
                                G = 4,
                                X = 0,
                                W = 2,
                                J = 8,
                                Q = 9,
                                V = 15,
                                $ = 8,
                                te = 29,
                                ee = 256,
                                ae = ee + 1 + te,
                                ie = 30,
                                ne = 19,
                                re = 2 * ae + 1,
                                se = 15,
                                oe = 3,
                                le = 258,
                                he = le + oe + 1,
                                de = 32,
                                fe = 42,
                                _e = 69,
                                ue = 73,
                                ce = 91,
                                be = 103,
                                ge = 113,
                                me = 666,
                                we = 1,
                                pe = 2,
                                ve = 3,
                                ke = 4,
                                xe = 3,
                                ye = function (t, e, a, i, n) {
                                        this.good_length = t,
                                        this.max_lazy = e,
                                        this.nice_length = a,
                                        this.max_chain = i,
                                        this.func = n
                                };
                                E = [
                                        new ye(0, 0, 0, 0, u),
                                        new ye(4, 4, 8, 4, c),
                                        new ye(4, 5, 16, 8, c),
                                        new ye(4, 6, 32, 32, c),
                                        new ye(4, 4, 16, 16, b),
                                        new ye(8, 16, 32, 32, b),
                                        new ye(8, 16, 128, 128, b),
                                        new ye(8, 32, 128, 256, b),
                                        new ye(32, 128, 258, 1024, b),
                                        new ye(32, 258, 258, 4096, b)
                                ],
                                a.deflateInit = z,
                                a.deflateInit2 = y,
                                a.deflateReset = k,
                                a.deflateResetKeep = v,
                                a.deflateSetHeader = x,
                                a.deflate = B,
                                a.deflateEnd = S,
                                a.deflateInfo = 'pako deflate (from Nodeca project)'
                        },
                        {
                                '../utils/common': 4,
                                './adler32': 6,
                                './crc32': 8,
                                './messages': 14,
                                './trees': 15
                        }
                ],
                10: [
                        function (t, e) {
                                'use strict';
                                function a() {
                                        this.text = 0,
                                        this.time = 0,
                                        this.xflags = 0,
                                        this.os = 0,
                                        this.extra = null,
                                        this.extra_len = 0,
                                        this.name = '',
                                        this.comment = '',
                                        this.hcrc = 0,
                                        this.done = !1
                                }
                                e.exports = a
                        },
                        {
                        }
                ],
                11: [
                        function (t, e) {
                                'use strict';
                                var a = 30,
                                i = 12;
                                e.exports = function (t, e) {
                                        var n,
                                        r,
                                        s,
                                        o,
                                        l,
                                        h,
                                        d,
                                        f,
                                        _,
                                        u,
                                        c,
                                        b,
                                        g,
                                        m,
                                        w,
                                        p,
                                        v,
                                        k,
                                        x,
                                        y,
                                        z,
                                        B,
                                        S,
                                        E,
                                        A;
                                        n = t.state,
                                        r = t.next_in,
                                        E = t.input,
                                        s = r + (t.avail_in - 5),
                                        o = t.next_out,
                                        A = t.output,
                                        l = o - (e - t.avail_out),
                                        h = o + (t.avail_out - 257),
                                        d = n.dmax,
                                        f = n.wsize,
                                        _ = n.whave,
                                        u = n.wnext,
                                        c = n.window,
                                        b = n.hold,
                                        g = n.bits,
                                        m = n.lencode,
                                        w = n.distcode,
                                        p = (1 << n.lenbits) - 1,
                                        v = (1 << n.distbits) - 1;
                                        t: do {
                                                15 > g && (b += E[r++] << g, g += 8, b += E[r++] << g, g += 8),
                                                k = m[b & p];
                                                e: for (; ; ) {
                                                        if (x = k >>> 24, b >>>= x, g -= x, x = k >>> 16 & 255, 0 === x) A[o++] = 65535 & k;
                                                         else {
                                                                if (!(16 & x)) {
                                                                        if (0 === (64 & x)) {
                                                                                k = m[(65535 & k) + (b & (1 << x) - 1)];
                                                                                continue e
                                                                        }
                                                                        if (32 & x) {
                                                                                n.mode = i;
                                                                                break t
                                                                        }
                                                                        t.msg = 'invalid literal/length code',
                                                                        n.mode = a;
                                                                        break t
                                                                }
                                                                y = 65535 & k,
                                                                x &= 15,
                                                                x && (x > g && (b += E[r++] << g, g += 8), y += b & (1 << x) - 1, b >>>= x, g -= x),
                                                                15 > g && (b += E[r++] << g, g += 8, b += E[r++] << g, g += 8),
                                                                k = w[b & v];
                                                                a: for (; ; ) {
                                                                        if (x = k >>> 24, b >>>= x, g -= x, x = k >>> 16 & 255, !(16 & x)) {
                                                                                if (0 === (64 & x)) {
                                                                                        k = w[(65535 & k) + (b & (1 << x) - 1)];
                                                                                        continue a
                                                                                }
                                                                                t.msg = 'invalid distance code',
                                                                                n.mode = a;
                                                                                break t
                                                                        }
                                                                        if (z = 65535 & k, x &= 15, x > g && (b += E[r++] << g, g += 8, x > g && (b += E[r++] << g, g += 8)), z += b & (1 << x) - 1, z > d) {
                                                                                t.msg = 'invalid distance too far back',
                                                                                n.mode = a;
                                                                                break t
                                                                        }
                                                                        if (b >>>= x, g -= x, x = o - l, z > x) {
                                                                                if (x = z - x, x > _ && n.sane) {
                                                                                        t.msg = 'invalid distance too far back',
                                                                                        n.mode = a;
                                                                                        break t
                                                                                }
                                                                                if (B = 0, S = c, 0 === u) {
                                                                                        if (B += f - x, y > x) {
                                                                                                y -= x;
                                                                                                do A[o++] = c[B++];
                                                                                                while (--x);
                                                                                                B = o - z,
                                                                                                S = A
                                                                                        }
                                                                                } else if (x > u) {
                                                                                        if (B += f + u - x, x -= u, y > x) {
                                                                                                y -= x;
                                                                                                do A[o++] = c[B++];
                                                                                                while (--x);
                                                                                                if (B = 0, y > u) {
                                                                                                        x = u,
                                                                                                        y -= x;
                                                                                                        do A[o++] = c[B++];
                                                                                                        while (--x);
                                                                                                        B = o - z,
                                                                                                        S = A
                                                                                                }
                                                                                        }
                                                                                } else if (B += u - x, y > x) {
                                                                                        y -= x;
                                                                                        do A[o++] = c[B++];
                                                                                        while (--x);
                                                                                        B = o - z,
                                                                                        S = A
                                                                                }
                                                                                for (; y > 2; ) A[o++] = S[B++],
                                                                                A[o++] = S[B++],
                                                                                A[o++] = S[B++],
                                                                                y -= 3;
                                                                                y && (A[o++] = S[B++], y > 1 && (A[o++] = S[B++]))
                                                                        } else {
                                                                                B = o - z;
                                                                                do A[o++] = A[B++],
                                                                                A[o++] = A[B++],
                                                                                A[o++] = A[B++],
                                                                                y -= 3;
                                                                                while (y > 2);
                                                                                y && (A[o++] = A[B++], y > 1 && (A[o++] = A[B++]))
                                                                        }
                                                                        break
                                                                }
                                                        }
                                                        break
                                                }
                                        } while (s > r && h > o);
                                        y = g >> 3,
                                        r -= y,
                                        g -= y << 3,
                                        b &= (1 << g) - 1,
                                        t.next_in = r,
                                        t.next_out = o,
                                        t.avail_in = s > r ? 5 + (s - r)  : 5 - (r - s),
                                        t.avail_out = h > o ? 257 + (h - o)  : 257 - (o - h),
                                        n.hold = b,
                                        n.bits = g
                                }
                        },
                        {
                        }
                ],
                12: [
                        function (t, e, a) {
                                'use strict';
                                function i(t) {
                                        return (t >>> 24 & 255) + (t >>> 8 & 65280) + ((65280 & t) << 8) + ((255 & t) << 24)
                                }
                                function n() {
                                        this.mode = 0,
                                        this.last = !1,
                                        this.wrap = 0,
                                        this.havedict = !1,
                                        this.flags = 0,
                                        this.dmax = 0,
                                        this.check = 0,
                                        this.total = 0,
                                        this.head = null,
                                        this.wbits = 0,
                                        this.wsize = 0,
                                        this.whave = 0,
                                        this.wnext = 0,
                                        this.window = null,
                                        this.hold = 0,
                                        this.bits = 0,
                                        this.length = 0,
                                        this.offset = 0,
                                        this.extra = 0,
                                        this.lencode = null,
                                        this.distcode = null,
                                        this.lenbits = 0,
                                        this.distbits = 0,
                                        this.ncode = 0,
                                        this.nlen = 0,
                                        this.ndist = 0,
                                        this.have = 0,
                                        this.next = null,
                                        this.lens = new m.Buf16(320),
                                        this.work = new m.Buf16(288),
                                        this.lendyn = null,
                                        this.distdyn = null,
                                        this.sane = 0,
                                        this.back = 0,
                                        this.was = 0
                                }
                                function r(t) {
                                        var e;
                                        return t && t.state ? (e = t.state, t.total_in = t.total_out = e.total = 0, t.msg = '', e.wrap && (t.adler = 1 & e.wrap), e.mode = D, e.last = 0, e.havedict = 0, e.dmax = 32768, e.head = null, e.hold = 0, e.bits = 0, e.lencode = e.lendyn = new m.Buf32(ce), e.distcode = e.distdyn = new m.Buf32(be), e.sane = 1, e.back = - 1, A)  : C
                                }
                                function s(t) {
                                        var e;
                                        return t && t.state ? (e = t.state, e.wsize = 0, e.whave = 0, e.wnext = 0, r(t))  : C
                                }
                                function o(t, e) {
                                        var a,
                                        i;
                                        return t && t.state ? (i = t.state, 0 > e ? (a = 0, e = - e)  : (a = (e >> 4) + 1, 48 > e && (e &= 15)), e && (8 > e || e > 15) ? C : (null !== i.window && i.wbits !== e && (i.window = null), i.wrap = a, i.wbits = e, s(t)))  : C
                                }
                                function l(t, e) {
                                        var a,
                                        i;
                                        return t ? (i = new n, t.state = i, i.window = null, a = o(t, e), a !== A && (t.state = null), a)  : C
                                }
                                function h(t) {
                                        return l(t, me)
                                }
                                function d(t) {
                                        if (we) {
                                                var e;
                                                for (b = new m.Buf32(512), g = new m.Buf32(32), e = 0; 144 > e; ) t.lens[e++] = 8;
                                                for (; 256 > e; ) t.lens[e++] = 9;
                                                for (; 280 > e; ) t.lens[e++] = 7;
                                                for (; 288 > e; ) t.lens[e++] = 8;
                                                for (k(y, t.lens, 0, 288, b, 0, t.work, {
                                                        bits: 9
                                                }), e = 0; 32 > e; ) t.lens[e++] = 5;
                                                k(z, t.lens, 0, 32, g, 0, t.work, {
                                                        bits: 5
                                                }),
                                                we = !1
                                        }
                                        t.lencode = b,
                                        t.lenbits = 9,
                                        t.distcode = g,
                                        t.distbits = 5
                                }
                                function f(t, e, a, i) {
                                        var n,
                                        r = t.state;
                                        return null === r.window && (r.wsize = 1 << r.wbits, r.wnext = 0, r.whave = 0, r.window = new m.Buf8(r.wsize)),
                                        i >= r.wsize ? (m.arraySet(r.window, e, a - r.wsize, r.wsize, 0), r.wnext = 0, r.whave = r.wsize)  : (n = r.wsize - r.wnext, n > i && (n = i), m.arraySet(r.window, e, a - i, n, r.wnext), i -= n, i ? (m.arraySet(r.window, e, a - i, i, 0), r.wnext = i, r.whave = r.wsize)  : (r.wnext += n, r.wnext === r.wsize && (r.wnext = 0), r.whave < r.wsize && (r.whave += n))),
                                        0
                                }
                                function _(t, e) {
                                        var a,
                                        n,
                                        r,
                                        s,
                                        o,
                                        l,
                                        h,
                                        _,
                                        u,
                                        c,
                                        b,
                                        g,
                                        ce,
                                        be,
                                        ge,
                                        me,
                                        we,
                                        pe,
                                        ve,
                                        ke,
                                        xe,
                                        ye,
                                        ze,
                                        Be,
                                        Se = 0,
                                        Ee = new m.Buf8(4),
                                        Ae = [
                                                16,
                                                17,
                                                18,
                                                0,
                                                8,
                                                7,
                                                9,
                                                6,
                                                10,
                                                5,
                                                11,
                                                4,
                                                12,
                                                3,
                                                13,
                                                2,
                                                14,
                                                1,
                                                15
                                        ];
                                        if (!t || !t.state || !t.output || !t.input && 0 !== t.avail_in) return C;
                                        a = t.state,
                                        a.mode === G && (a.mode = X),
                                        o = t.next_out,
                                        r = t.output,
                                        h = t.avail_out,
                                        s = t.next_in,
                                        n = t.input,
                                        l = t.avail_in,
                                        _ = a.hold,
                                        u = a.bits,
                                        c = l,
                                        b = h,
                                        ye = A;
                                        t: for (; ; ) switch (a.mode) {
                                                case D:
                                                        if (0 === a.wrap) {
                                                                a.mode = X;
                                                                break
                                                        }
                                                        for (; 16 > u; ) {
                                                                if (0 === l) break t;
                                                                l--,
                                                                _ += n[s++] << u,
                                                                u += 8
                                                        }
                                                        if (2 & a.wrap && 35615 === _) {
                                                                a.check = 0,
                                                                Ee[0] = 255 & _,
                                                                Ee[1] = _ >>> 8 & 255,
                                                                a.check = p(a.check, Ee, 2, 0),
                                                                _ = 0,
                                                                u = 0,
                                                                a.mode = F;
                                                                break
                                                        }
                                                        if (a.flags = 0, a.head && (a.head.done = !1), !(1 & a.wrap) || (((255 & _) << 8) + (_ >> 8)) % 31) {
                                                                t.msg = 'incorrect header check',
                                                                a.mode = fe;
                                                                break
                                                        }
                                                        if ((15 & _) !== T) {
                                                                t.msg = 'unknown compression method',
                                                                a.mode = fe;
                                                                break
                                                        }
                                                        if (_ >>>= 4, u -= 4, xe = (15 & _) + 8, 0 === a.wbits) a.wbits = xe;
                                                         else if (xe > a.wbits) {
                                                                t.msg = 'invalid window size',
                                                                a.mode = fe;
                                                                break
                                                        }
                                                        a.dmax = 1 << xe,
                                                        t.adler = a.check = 1,
                                                        a.mode = 512 & _ ? q : G,
                                                        _ = 0,
                                                        u = 0;
                                                        break;
                                                case F:
                                                        for (; 16 > u; ) {
                                                                if (0 === l) break t;
                                                                l--,
                                                                _ += n[s++] << u,
                                                                u += 8
                                                        }
                                                        if (a.flags = _, (255 & a.flags) !== T) {
                                                                t.msg = 'unknown compression method',
                                                                a.mode = fe;
                                                                break
                                                        }
                                                        if (57344 & a.flags) {
                                                                t.msg = 'unknown header flags set',
                                                                a.mode = fe;
                                                                break
                                                        }
                                                        a.head && (a.head.text = _ >> 8 & 1),
                                                        512 & a.flags && (Ee[0] = 255 & _, Ee[1] = _ >>> 8 & 255, a.check = p(a.check, Ee, 2, 0)),
                                                        _ = 0,
                                                        u = 0,
                                                        a.mode = L;
                                                case L:
                                                        for (; 32 > u; ) {
                                                                if (0 === l) break t;
                                                                l--,
                                                                _ += n[s++] << u,
                                                                u += 8
                                                        }
                                                        a.head && (a.head.time = _),
                                                        512 & a.flags && (Ee[0] = 255 & _, Ee[1] = _ >>> 8 & 255, Ee[2] = _ >>> 16 & 255, Ee[3] = _ >>> 24 & 255, a.check = p(a.check, Ee, 4, 0)),
                                                        _ = 0,
                                                        u = 0,
                                                        a.mode = U;
                                                case U:
                                                        for (; 16 > u; ) {
                                                                if (0 === l) break t;
                                                                l--,
                                                                _ += n[s++] << u,
                                                                u += 8
                                                        }
                                                        a.head && (a.head.xflags = 255 & _, a.head.os = _ >> 8),
                                                        512 & a.flags && (Ee[0] = 255 & _, Ee[1] = _ >>> 8 & 255, a.check = p(a.check, Ee, 2, 0)),
                                                        _ = 0,
                                                        u = 0,
                                                        a.mode = H;
                                                case H:
                                                        if (1024 & a.flags) {
                                                                for (; 16 > u; ) {
                                                                        if (0 === l) break t;
                                                                        l--,
                                                                        _ += n[s++] << u,
                                                                        u += 8
                                                                }
                                                                a.length = _,
                                                                a.head && (a.head.extra_len = _),
                                                                512 & a.flags && (Ee[0] = 255 & _, Ee[1] = _ >>> 8 & 255, a.check = p(a.check, Ee, 2, 0)),
                                                                _ = 0,
                                                                u = 0
                                                        } else a.head && (a.head.extra = null);
                                                        a.mode = j;
                                                case j:
                                                        if (1024 & a.flags && (g = a.length, g > l && (g = l), g && (a.head && (xe = a.head.extra_len - a.length, a.head.extra || (a.head.extra = new Array(a.head.extra_len)), m.arraySet(a.head.extra, n, s, g, xe)), 512 & a.flags && (a.check = p(a.check, n, g, s)), l -= g, s += g, a.length -= g), a.length)) break t;
                                                        a.length = 0,
                                                        a.mode = M;
                                                case M:
                                                        if (2048 & a.flags) {
                                                                if (0 === l) break t;
                                                                g = 0;
                                                                do xe = n[s + g++],
                                                                a.head && xe && a.length < 65536 && (a.head.name += String.fromCharCode(xe));
                                                                while (xe && l > g);
                                                                if (512 & a.flags && (a.check = p(a.check, n, g, s)), l -= g, s += g, xe) break t
                                                        } else a.head && (a.head.name = null);
                                                        a.length = 0,
                                                        a.mode = K;
                                                case K:
                                                        if (4096 & a.flags) {
                                                                if (0 === l) break t;
                                                                g = 0;
                                                                do xe = n[s + g++],
                                                                a.head && xe && a.length < 65536 && (a.head.comment += String.fromCharCode(xe));
                                                                while (xe && l > g);
                                                                if (512 & a.flags && (a.check = p(a.check, n, g, s)), l -= g, s += g, xe) break t
                                                        } else a.head && (a.head.comment = null);
                                                        a.mode = P;
                                                case P:
                                                        if (512 & a.flags) {
                                                                for (; 16 > u; ) {
                                                                        if (0 === l) break t;
                                                                        l--,
                                                                        _ += n[s++] << u,
                                                                        u += 8
                                                                }
                                                                if (_ !== (65535 & a.check)) {
                                                                        t.msg = 'header crc mismatch',
                                                                        a.mode = fe;
                                                                        break
                                                                }
                                                                _ = 0,
                                                                u = 0
                                                        }
                                                        a.head && (a.head.hcrc = a.flags >> 9 & 1, a.head.done = !0),
                                                        t.adler = a.check = 0,
                                                        a.mode = G;
                                                        break;
                                                case q:
                                                        for (; 32 > u; ) {
                                                                if (0 === l) break t;
                                                                l--,
                                                                _ += n[s++] << u,
                                                                u += 8
                                                        }
                                                        t.adler = a.check = i(_),
                                                        _ = 0,
                                                        u = 0,
                                                        a.mode = Y;
                                                case Y:
                                                        if (0 === a.havedict) return t.next_out = o,
                                                        t.avail_out = h,
                                                        t.next_in = s,
                                                        t.avail_in = l,
                                                        a.hold = _,
                                                        a.bits = u,
                                                        R;
                                                        t.adler = a.check = 1,
                                                        a.mode = G;
                                                case G:
                                                        if (e === S || e === E) break t;
                                                case X:
                                                        if (a.last) {
                                                                _ >>>= 7 & u,
                                                                u -= 7 & u,
                                                                a.mode = le;
                                                                break
                                                        }
                                                        for (; 3 > u; ) {
                                                                if (0 === l) break t;
                                                                l--,
                                                                _ += n[s++] << u,
                                                                u += 8
                                                        }
                                                        switch (a.last = 1 & _, _ >>>= 1, u -= 1, 3 & _) {
                                                                case 0:
                                                                        a.mode = W;
                                                                        break;
                                                                case 1:
                                                                        if (d(a), a.mode = ee, e === E) {
                                                                                _ >>>= 2,
                                                                                u -= 2;
                                                                                break t
                                                                        }
                                                                        break;
                                                                case 2:
                                                                        a.mode = V;
                                                                        break;
                                                                case 3:
                                                                        t.msg = 'invalid block type',
                                                                        a.mode = fe
                                                        }
                                                        _ >>>= 2,
                                                        u -= 2;
                                                        break;
                                                case W:
                                                        for (_ >>>= 7 & u, u -= 7 & u; 32 > u; ) {
                                                                if (0 === l) break t;
                                                                l--,
                                                                _ += n[s++] << u,
                                                                u += 8
                                                }
                                                if ((65535 & _) !== (_ >>> 16 ^ 65535)) {
                                                        t.msg = 'invalid stored block lengths',
                                                        a.mode = fe;
                                                        break
                                        }
                                        if (a.length = 65535 & _, _ = 0, u = 0, a.mode = J, e === E) break t;
                                case J:
                                        a.mode = Q;
                                case Q:
                                        if (g = a.length) {
                                                if (g > l && (g = l), g > h && (g = h), 0 === g) break t;
                                                m.arraySet(r, n, s, g, o),
                                                l -= g,
                                                s += g,
                                                h -= g,
                                                o += g,
                                                a.length -= g;
                                                break
                                }
                                a.mode = G;
                                break;
                        case V:
                                for (; 14 > u; ) {
                                        if (0 === l) break t;
                                        l--,
                                        _ += n[s++] << u,
                                        u += 8
                        }
                        if (a.nlen = (31 & _) + 257, _ >>>= 5, u -= 5, a.ndist = (31 & _) + 1, _ >>>= 5, u -= 5, a.ncode = (15 & _) + 4, _ >>>= 4, u -= 4, a.nlen > 286 || a.ndist > 30) {
                                t.msg = 'too many length or distance symbols',
                                a.mode = fe;
                                break
                }
                a.have = 0,
                a.mode = $;
        case $:
                for (; a.have < a.ncode; ) {
                        for (; 3 > u; ) {
                                if (0 === l) break t;
                                l--,
                                _ += n[s++] << u,
                                u += 8
                        }
                        a.lens[Ae[a.have++]] = 7 & _,
                        _ >>>= 3,
                        u -= 3
        }
        for (; a.have < 19; ) a.lens[Ae[a.have++]] = 0;
        if (a.lencode = a.lendyn, a.lenbits = 7, ze = {
                bits: a.lenbits
        }, ye = k(x, a.lens, 0, 19, a.lencode, 0, a.work, ze), a.lenbits = ze.bits, ye) {
                t.msg = 'invalid code lengths set',
                a.mode = fe;
                break
}
a.have = 0,
a.mode = te;
case te:
for (; a.have < a.nlen + a.ndist; ) {
        for (; Se = a.lencode[_ & (1 << a.lenbits) - 1], ge = Se >>> 24, me = Se >>> 16 & 255, we = 65535 & Se, !(u >= ge); ) {
                if (0 === l) break t;
                l--,
                _ += n[s++] << u,
                u += 8
        }
        if (16 > we) _ >>>= ge,
        u -= ge,
        a.lens[a.have++] = we;
         else {
                if (16 === we) {
                        for (Be = ge + 2; Be > u; ) {
                                if (0 === l) break t;
                                l--,
                                _ += n[s++] << u,
                                u += 8
                        }
                        if (_ >>>= ge, u -= ge, 0 === a.have) {
                                t.msg = 'invalid bit length repeat',
                                a.mode = fe;
                                break
                        }
                        xe = a.lens[a.have - 1],
                        g = 3 + (3 & _),
                        _ >>>= 2,
                        u -= 2
                } else if (17 === we) {
                        for (Be = ge + 3; Be > u; ) {
                                if (0 === l) break t;
                                l--,
                                _ += n[s++] << u,
                                u += 8
                        }
                        _ >>>= ge,
                        u -= ge,
                        xe = 0,
                        g = 3 + (7 & _),
                        _ >>>= 3,
                        u -= 3
                } else {
                        for (Be = ge + 7; Be > u; ) {
                                if (0 === l) break t;
                                l--,
                                _ += n[s++] << u,
                                u += 8
                        }
                        _ >>>= ge,
                        u -= ge,
                        xe = 0,
                        g = 11 + (127 & _),
                        _ >>>= 7,
                        u -= 7
                }
                if (a.have + g > a.nlen + a.ndist) {
                        t.msg = 'invalid bit length repeat',
                        a.mode = fe;
                        break
                }
                for (; g--; ) a.lens[a.have++] = xe
        }
}
if (a.mode === fe) break;
if (0 === a.lens[256]) {
t.msg = 'invalid code -- missing end-of-block',
a.mode = fe;
break
}
if (a.lenbits = 9, ze = {
bits: a.lenbits
}, ye = k(y, a.lens, 0, a.nlen, a.lencode, 0, a.work, ze), a.lenbits = ze.bits, ye) {
t.msg = 'invalid literal/lengths set',
a.mode = fe;
break
}
if (a.distbits = 6, a.distcode = a.distdyn, ze = {
bits: a.distbits
}, ye = k(z, a.lens, a.nlen, a.ndist, a.distcode, 0, a.work, ze), a.distbits = ze.bits, ye) {
t.msg = 'invalid distances set',
a.mode = fe;
break
}
if (a.mode = ee, e === E) break t;
case ee:
a.mode = ae;
case ae:
if (l >= 6 && h >= 258) {
t.next_out = o,
t.avail_out = h,
t.next_in = s,
t.avail_in = l,
a.hold = _,
a.bits = u,
v(t, b),
o = t.next_out,
r = t.output,
h = t.avail_out,
s = t.next_in,
n = t.input,
l = t.avail_in,
_ = a.hold,
u = a.bits,
a.mode === G && (a.back = - 1);
break
}
for (a.back = 0; Se = a.lencode[_ & (1 << a.lenbits) - 1], ge = Se >>> 24, me = Se >>> 16 & 255, we = 65535 & Se, !(u >= ge); ) {
if (0 === l) break t;
l--,
_ += n[s++] << u,
u += 8
}
if (me && 0 === (240 & me)) {
for (pe = ge, ve = me, ke = we; Se = a.lencode[ke + ((_ & (1 << pe + ve) - 1) >> pe)], ge = Se >>> 24, me = Se >>> 16 & 255, we = 65535 & Se, !(u >= pe + ge); ) {
if (0 === l) break t;
l--,
_ += n[s++] << u,
u += 8
}
_ >>>= pe,
u -= pe,
a.back += pe
}
if (_ >>>= ge, u -= ge, a.back += ge, a.length = we, 0 === me) {
a.mode = oe;
break
}
if (32 & me) {
a.back = - 1,
a.mode = G;
break
}
if (64 & me) {
t.msg = 'invalid literal/length code',
a.mode = fe;
break
}
a.extra = 15 & me,
a.mode = ie;
case ie:
if (a.extra) {
for (Be = a.extra; Be > u; ) {
if (0 === l) break t;
l--,
_ += n[s++] << u,
u += 8
}
a.length += _ & (1 << a.extra) - 1,
_ >>>= a.extra,
u -= a.extra,
a.back += a.extra
}
a.was = a.length,
a.mode = ne;
case ne:
for (; Se = a.distcode[_ & (1 << a.distbits) - 1], ge = Se >>> 24, me = Se >>> 16 & 255, we = 65535 & Se, !(u >= ge); ) {
if (0 === l) break t;
l--,
_ += n[s++] << u,
u += 8
}
if (0 === (240 & me)) {
for (pe = ge, ve = me, ke = we; Se = a.distcode[ke + ((_ & (1 << pe + ve) - 1) >> pe)], ge = Se >>> 24, me = Se >>> 16 & 255, we = 65535 & Se, !(u >= pe + ge); ) {
if (0 === l) break t;
l--,
_ += n[s++] << u,
u += 8
}
_ >>>= pe,
u -= pe,
a.back += pe
}
if (_ >>>= ge, u -= ge, a.back += ge, 64 & me) {
t.msg = 'invalid distance code',
a.mode = fe;
break
}
a.offset = we,
a.extra = 15 & me,
a.mode = re;
case re:
if (a.extra) {
for (Be = a.extra; Be > u; ) {
if (0 === l) break t;
l--,
_ += n[s++] << u,
u += 8
}
a.offset += _ & (1 << a.extra) - 1,
_ >>>= a.extra,
u -= a.extra,
a.back += a.extra
}
if (a.offset > a.dmax) {
t.msg = 'invalid distance too far back',
a.mode = fe;
break
}
a.mode = se;
case se:
if (0 === h) break t;
if (g = b - h, a.offset > g) {
if (g = a.offset - g, g > a.whave && a.sane) {
t.msg = 'invalid distance too far back',
a.mode = fe;
break
}
g > a.wnext ? (g -= a.wnext, ce = a.wsize - g)  : ce = a.wnext - g,
g > a.length && (g = a.length),
be = a.window
} else be = r,
ce = o - a.offset,
g = a.length;
g > h && (g = h),
h -= g,
a.length -= g;
do r[o++] = be[ce++];
while (--g);
0 === a.length && (a.mode = ae);
break;
case oe:
if (0 === h) break t;
r[o++] = a.length,
h--,
a.mode = ae;
break;
case le:
if (a.wrap) {
for (; 32 > u; ) {
if (0 === l) break t;
l--,
_ |= n[s++] << u,
u += 8
}
if (b -= h, t.total_out += b, a.total += b, b && (t.adler = a.check = a.flags ? p(a.check, r, b, o - b)  : w(a.check, r, b, o - b)), b = h, (a.flags ? _ : i(_)) !== a.check) {
t.msg = 'incorrect data check',
a.mode = fe;
break
}
_ = 0,
u = 0
}
a.mode = he;
case he:
if (a.wrap && a.flags) {
for (; 32 > u; ) {
if (0 === l) break t;
l--,
_ += n[s++] << u,
u += 8
}
if (_ !== (4294967295 & a.total)) {
t.msg = 'incorrect length check',
a.mode = fe;
break
}
_ = 0,
u = 0
}
a.mode = de;
case de:
ye = Z;
break t;
case fe:
ye = I;
break t;
case _e:
return N;
case ue:
default:
return C
}
return t.next_out = o,
t.avail_out = h,
t.next_in = s,
t.avail_in = l,
a.hold = _,
a.bits = u,
(a.wsize || b !== t.avail_out && a.mode < fe && (a.mode < le || e !== B)) && f(t, t.output, t.next_out, b - t.avail_out) ? (a.mode = _e, N)  : (c -= t.avail_in, b -= t.avail_out, t.total_in += c, t.total_out += b, a.total += b, a.wrap && b && (t.adler = a.check = a.flags ? p(a.check, r, b, t.next_out - b)  : w(a.check, r, b, t.next_out - b)), t.data_type = a.bits + (a.last ? 64 : 0) + (a.mode === G ? 128 : 0) + (a.mode === ee || a.mode === J ? 256 : 0), (0 === c && 0 === b || e === B) && ye === A && (ye = O), ye)
}
function u(t) {
if (!t || !t.state) return C;
var e = t.state;
return e.window && (e.window = null),
t.state = null,
A
}
function c(t, e) {
var a;
return t && t.state ? (a = t.state, 0 === (2 & a.wrap) ? C : (a.head = e, e.done = !1, A))  : C
}
var b,
g,
m = t('../utils/common'),
w = t('./adler32'),
p = t('./crc32'),
v = t('./inffast'),
k = t('./inftrees'),
x = 0,
y = 1,
z = 2,
B = 4,
S = 5,
E = 6,
A = 0,
Z = 1,
R = 2,
C = - 2,
I = - 3,
N = - 4,
O = - 5,
T = 8,
D = 1,
F = 2,
L = 3,
U = 4,
H = 5,
j = 6,
M = 7,
K = 8,
P = 9,
q = 10,
Y = 11,
G = 12,
X = 13,
W = 14,
J = 15,
Q = 16,
V = 17,
$ = 18,
te = 19,
ee = 20,
ae = 21,
ie = 22,
ne = 23,
re = 24,
se = 25,
oe = 26,
le = 27,
he = 28,
de = 29,
fe = 30,
_e = 31,
ue = 32,
ce = 852,
be = 592,
ge = 15,
me = ge,
we = !0;
a.inflateReset = s,
a.inflateReset2 = o,
a.inflateResetKeep = r,
a.inflateInit = h,
a.inflateInit2 = l,
a.inflate = _,
a.inflateEnd = u,
a.inflateGetHeader = c,
a.inflateInfo = 'pako inflate (from Nodeca project)'
},
{
'../utils/common': 4,
'./adler32': 6,
'./crc32': 8,
'./inffast': 11,
'./inftrees': 13
}
],
13: [
function (t, e) {
'use strict';
var a = t('../utils/common'),
i = 15,
n = 852,
r = 592,
s = 0,
o = 1,
l = 2,
h = [
3,
4,
5,
6,
7,
8,
9,
10,
11,
13,
15,
17,
19,
23,
27,
31,
35,
43,
51,
59,
67,
83,
99,
115,
131,
163,
195,
227,
258,
0,
0
],
d = [
16,
16,
16,
16,
16,
16,
16,
16,
17,
17,
17,
17,
18,
18,
18,
18,
19,
19,
19,
19,
20,
20,
20,
20,
21,
21,
21,
21,
16,
72,
78
],
f = [
1,
2,
3,
4,
5,
7,
9,
13,
17,
25,
33,
49,
65,
97,
129,
193,
257,
385,
513,
769,
1025,
1537,
2049,
3073,
4097,
6145,
8193,
12289,
16385,
24577,
0,
0
],
_ = [
16,
16,
16,
16,
17,
17,
18,
18,
19,
19,
20,
20,
21,
21,
22,
22,
23,
23,
24,
24,
25,
25,
26,
26,
27,
27,
28,
28,
29,
29,
64,
64
];
e.exports = function (t, e, u, c, b, g, m, w) {
var p,
v,
k,
x,
y,
z,
B,
S,
E,
A = w.bits,
Z = 0,
R = 0,
C = 0,
I = 0,
N = 0,
O = 0,
T = 0,
D = 0,
F = 0,
L = 0,
U = null,
H = 0,
j = new a.Buf16(i + 1),
M = new a.Buf16(i + 1),
K = null,
P = 0;
for (Z = 0; i >= Z; Z++) j[Z] = 0;
for (R = 0; c > R; R++) j[e[u + R]]++;
for (N = A, I = i; I >= 1 && 0 === j[I]; I--);
if (N > I && (N = I), 0 === I) return b[g++] = 20971520,
b[g++] = 20971520,
w.bits = 1,
0;
for (C = 1; I > C && 0 === j[C]; C++);
for (C > N && (N = C), D = 1, Z = 1; i >= Z; Z++) if (D <<= 1, D -= j[Z], 0 > D) return - 1;
if (D > 0 && (t === s || 1 !== I)) return - 1;
for (M[1] = 0, Z = 1; i > Z; Z++) M[Z + 1] = M[Z] + j[Z];
for (R = 0; c > R; R++) 0 !== e[u + R] && (m[M[e[u + R]]++] = R);
if (t === s ? (U = K = m, z = 19)  : t === o ? (U = h, H -= 257, K = d, P -= 257, z = 256)  : (U = f, K = _, z = - 1), L = 0, R = 0, Z = C, y = g, O = N, T = 0, k = - 1, F = 1 << N, x = F - 1, t === o && F > n || t === l && F > r) return 1;
for (var q = 0; ; ) {
q++,
B = Z - T,
m[R] < z ? (S = 0, E = m[R])  : m[R] > z ? (S = K[P + m[R]], E = U[H + m[R]])  : (S = 96, E = 0),
p = 1 << Z - T,
v = 1 << O,
C = v;
do v -= p,
b[y + (L >> T) + v] = B << 24 | S << 16 | E | 0;
while (0 !== v);
for (p = 1 << Z - 1; L & p; ) p >>= 1;
if (0 !== p ? (L &= p - 1, L += p)  : L = 0, R++, 0 === --j[Z]) {
if (Z === I) break;
Z = e[u + m[R]]
}
if (Z > N && (L & x) !== k) {
for (0 === T && (T = N), y += C, O = Z - T, D = 1 << O; I > O + T && (D -= j[O + T], !(0 >= D)); ) O++,
D <<= 1;
if (F += 1 << O, t === o && F > n || t === l && F > r) return 1;
k = L & x,
b[k] = N << 24 | O << 16 | y - g | 0
}
}
return 0 !== L && (b[y + L] = Z - T << 24 | 64 << 16 | 0),
w.bits = N,
0
}
},
{
'../utils/common': 4
}
],
14: [
function (t, e) {
'use strict';
e.exports = {
2: 'need dictionary',
1: 'stream end',
0: '',
'-1': 'file error',
'-2': 'stream error',
'-3': 'data error',
'-4': 'insufficient memory',
'-5': 'buffer error',
'-6': 'incompatible version'
}
},
{
}
],
15: [
function (t, e, a) {
'use strict';
function i(t) {
for (var e = t.length; --e >= 0; ) t[e] = 0
}
function n(t) {
return 256 > t ? se[t] : se[256 + (t >>> 7)]
}
function r(t, e) {
t.pending_buf[t.pending++] = 255 & e,
t.pending_buf[t.pending++] = e >>> 8 & 255
}
function s(t, e, a) {
t.bi_valid > G - a ? (t.bi_buf |= e << t.bi_valid & 65535, r(t, t.bi_buf), t.bi_buf = e >> G - t.bi_valid, t.bi_valid += a - G)  : (t.bi_buf |= e << t.bi_valid & 65535, t.bi_valid += a)
}
function o(t, e, a) {
s(t, a[2 * e], a[2 * e + 1])
}
function l(t, e) {
var a = 0;
do a |= 1 & t,
t >>>= 1,
a <<= 1;
while (--e > 0);
return a >>> 1
}
function h(t) {
16 === t.bi_valid ? (r(t, t.bi_buf), t.bi_buf = 0, t.bi_valid = 0)  : t.bi_valid >= 8 && (t.pending_buf[t.pending++] = 255 & t.bi_buf, t.bi_buf >>= 8, t.bi_valid -= 8)
}
function d(t, e) {
var a,
i,
n,
r,
s,
o,
l = e.dyn_tree,
h = e.max_code,
d = e.stat_desc.static_tree,
f = e.stat_desc.has_stree,
_ = e.stat_desc.extra_bits,
u = e.stat_desc.extra_base,
c = e.stat_desc.max_length,
b = 0;
for (r = 0; Y >= r; r++) t.bl_count[r] = 0;
for (l[2 * t.heap[t.heap_max] + 1] = 0, a = t.heap_max + 1; q > a; a++) i = t.heap[a],
r = l[2 * l[2 * i + 1] + 1] + 1,
r > c && (r = c, b++),
l[2 * i + 1] = r,
i > h || (t.bl_count[r]++, s = 0, i >= u && (s = _[i - u]), o = l[2 * i], t.opt_len += o * (r + s), f && (t.static_len += o * (d[2 * i + 1] + s)));
if (0 !== b) {
do {
for (r = c - 1; 0 === t.bl_count[r]; ) r--;
t.bl_count[r]--,
t.bl_count[r + 1] += 2,
t.bl_count[c]--,
b -= 2
} while (b > 0);
for (r = c; 0 !== r; r--) for (i = t.bl_count[r]; 0 !== i; ) n = t.heap[--a],
n > h || (l[2 * n + 1] !== r && (t.opt_len += (r - l[2 * n + 1]) * l[2 * n], l[2 * n + 1] = r), i--)
}
}
function f(t, e, a) {
var i,
n,
r = new Array(Y + 1),
s = 0;
for (i = 1; Y >= i; i++) r[i] = s = s + a[i - 1] << 1;
for (n = 0; e >= n; n++) {
var o = t[2 * n + 1];
0 !== o && (t[2 * n] = l(r[o]++, o))
}
}
function _() {
var t,
e,
a,
i,
n,
r = new Array(Y + 1);
for (a = 0, i = 0; H - 1 > i; i++) for (le[i] = a, t = 0; t < 1 << $[i]; t++) oe[a++] = i;
for (oe[a - 1] = i, n = 0, i = 0; 16 > i; i++) for (he[i] = n, t = 0; t < 1 << te[i]; t++) se[n++] = i;
for (n >>= 7; K > i; i++) for (he[i] = n << 7, t = 0; t < 1 << te[i] - 7; t++) se[256 + n++] = i;
for (e = 0; Y >= e; e++) r[e] = 0;
for (t = 0; 143 >= t; ) ne[2 * t + 1] = 8,
t++,
r[8]++;
for (; 255 >= t; ) ne[2 * t + 1] = 9,
t++,
r[9]++;
for (; 279 >= t; ) ne[2 * t + 1] = 7,
t++,
r[7]++;
for (; 287 >= t; ) ne[2 * t + 1] = 8,
t++,
r[8]++;
for (f(ne, M + 1, r), t = 0; K > t; t++) re[2 * t + 1] = 5,
re[2 * t] = l(t, 5);
de = new ue(ne, $, j + 1, M, Y),
fe = new ue(re, te, 0, K, Y),
_e = new ue(new Array(0), ee, 0, P, X)
}
function u(t) {
var e;
for (e = 0; M > e; e++) t.dyn_ltree[2 * e] = 0;
for (e = 0; K > e; e++) t.dyn_dtree[2 * e] = 0;
for (e = 0; P > e; e++) t.bl_tree[2 * e] = 0;
t.dyn_ltree[2 * W] = 1,
t.opt_len = t.static_len = 0,
t.last_lit = t.matches = 0
}
function c(t) {
t.bi_valid > 8 ? r(t, t.bi_buf)  : t.bi_valid > 0 && (t.pending_buf[t.pending++] = t.bi_buf),
t.bi_buf = 0,
t.bi_valid = 0
}
function b(t, e, a, i) {
c(t),
i && (r(t, a), r(t, ~a)),
R.arraySet(t.pending_buf, t.window, e, a, t.pending),
t.pending += a
}
function g(t, e, a, i) {
var n = 2 * e,
r = 2 * a;
return t[n] < t[r] || t[n] === t[r] && i[e] <= i[a]
}
function m(t, e, a) {
for (var i = t.heap[a], n = a << 1; n <= t.heap_len && (n < t.heap_len && g(e, t.heap[n + 1], t.heap[n], t.depth) && n++, !g(e, i, t.heap[n], t.depth)); ) t.heap[a] = t.heap[n],
a = n,
n <<= 1;
t.heap[a] = i
}
function w(t, e, a) {
var i,
r,
l,
h,
d = 0;
if (0 !== t.last_lit) do i = t.pending_buf[t.d_buf + 2 * d] << 8 | t.pending_buf[t.d_buf + 2 * d + 1],
r = t.pending_buf[t.l_buf + d],
d++,
0 === i ? o(t, r, e)  : (l = oe[r], o(t, l + j + 1, e), h = $[l], 0 !== h && (r -= le[l], s(t, r, h)), i--, l = n(i), o(t, l, a), h = te[l], 0 !== h && (i -= he[l], s(t, i, h)));
while (d < t.last_lit);
o(t, W, e)
}
function p(t, e) {
var a,
i,
n,
r = e.dyn_tree,
s = e.stat_desc.static_tree,
o = e.stat_desc.has_stree,
l = e.stat_desc.elems,
h = - 1;
for (t.heap_len = 0, t.heap_max = q, a = 0; l > a; a++) 0 !== r[2 * a] ? (t.heap[++t.heap_len] = h = a, t.depth[a] = 0)  : r[2 * a + 1] = 0;
for (; t.heap_len < 2; ) n = t.heap[++t.heap_len] = 2 > h ? ++h : 0,
r[2 * n] = 1,
t.depth[n] = 0,
t.opt_len--,
o && (t.static_len -= s[2 * n + 1]);
for (e.max_code = h, a = t.heap_len >> 1; a >= 1; a--) m(t, r, a);
n = l;
do a = t.heap[1],
t.heap[1] = t.heap[t.heap_len--],
m(t, r, 1),
i = t.heap[1],
t.heap[--t.heap_max] = a,
t.heap[--t.heap_max] = i,
r[2 * n] = r[2 * a] + r[2 * i],
t.depth[n] = (t.depth[a] >= t.depth[i] ? t.depth[a] : t.depth[i]) + 1,
r[2 * a + 1] = r[2 * i + 1] = n,
t.heap[1] = n++,
m(t, r, 1);
while (t.heap_len >= 2);
t.heap[--t.heap_max] = t.heap[1],
d(t, e),
f(r, h, t.bl_count)
}
function v(t, e, a) {
var i,
n,
r = - 1,
s = e[1],
o = 0,
l = 7,
h = 4;
for (0 === s && (l = 138, h = 3), e[2 * (a + 1) + 1] = 65535, i = 0; a >= i; i++) n = s,
s = e[2 * (i + 1) + 1],
++o < l && n === s || (h > o ? t.bl_tree[2 * n] += o : 0 !== n ? (n !== r && t.bl_tree[2 * n]++, t.bl_tree[2 * J]++)  : 10 >= o ? t.bl_tree[2 * Q]++ : t.bl_tree[2 * V]++, o = 0, r = n, 0 === s ? (l = 138, h = 3)  : n === s ? (l = 6, h = 3)  : (l = 7, h = 4))
}
function k(t, e, a) {
var i,
n,
r = - 1,
l = e[1],
h = 0,
d = 7,
f = 4;
for (0 === l && (d = 138, f = 3), i = 0; a >= i; i++) if (n = l, l = e[2 * (i + 1) + 1], !(++h < d && n === l)) {
if (f > h) {
do o(t, n, t.bl_tree);
while (0 !== --h)
} else 0 !== n ? (n !== r && (o(t, n, t.bl_tree), h--), o(t, J, t.bl_tree), s(t, h - 3, 2))  : 10 >= h ? (o(t, Q, t.bl_tree), s(t, h - 3, 3))  : (o(t, V, t.bl_tree), s(t, h - 11, 7));
h = 0,
r = n,
0 === l ? (d = 138, f = 3)  : n === l ? (d = 6, f = 3)  : (d = 7, f = 4)
}
}
function x(t) {
var e;
for (v(t, t.dyn_ltree, t.l_desc.max_code), v(t, t.dyn_dtree, t.d_desc.max_code), p(t, t.bl_desc), e = P - 1; e >= 3 && 0 === t.bl_tree[2 * ae[e] + 1]; e--);
return t.opt_len += 3 * (e + 1) + 5 + 5 + 4,
e
}
function y(t, e, a, i) {
var n;
for (s(t, e - 257, 5), s(t, a - 1, 5), s(t, i - 4, 4), n = 0; i > n; n++) s(t, t.bl_tree[2 * ae[n] + 1], 3);
k(t, t.dyn_ltree, e - 1),
k(t, t.dyn_dtree, a - 1)
}
function z(t) {
var e,
a = 4093624447;
for (e = 0; 31 >= e; e++, a >>>= 1) if (1 & a && 0 !== t.dyn_ltree[2 * e]) return I;
if (0 !== t.dyn_ltree[18] || 0 !== t.dyn_ltree[20] || 0 !== t.dyn_ltree[26]) return N;
for (e = 32; j > e; e++) if (0 !== t.dyn_ltree[2 * e]) return N;
return I
}
function B(t) {
be || (_(), be = !0),
t.l_desc = new ce(t.dyn_ltree, de),
t.d_desc = new ce(t.dyn_dtree, fe),
t.bl_desc = new ce(t.bl_tree, _e),
t.bi_buf = 0,
t.bi_valid = 0,
u(t)
}
function S(t, e, a, i) {
s(t, (T << 1) + (i ? 1 : 0), 3),
b(t, e, a, !0)
}
function E(t) {
s(t, D << 1, 3),
o(t, W, ne),
h(t)
}
function A(t, e, a, i) {
var n,
r,
o = 0;
t.level > 0 ? (t.strm.data_type === O && (t.strm.data_type = z(t)), p(t, t.l_desc), p(t, t.d_desc), o = x(t), n = t.opt_len + 3 + 7 >>> 3, r = t.static_len + 3 + 7 >>> 3, n >= r && (n = r))  : n = r = a + 5,
n >= a + 4 && - 1 !== e ? S(t, e, a, i)  : t.strategy === C || r === n ? (s(t, (D << 1) + (i ? 1 : 0), 3), w(t, ne, re))  : (s(t, (F << 1) + (i ? 1 : 0), 3), y(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, o + 1), w(t, t.dyn_ltree, t.dyn_dtree)),
u(t),
i && c(t)
}
function Z(t, e, a) {
return t.pending_buf[t.d_buf + 2 * t.last_lit] = e >>> 8 & 255,
t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e,
t.pending_buf[t.l_buf + t.last_lit] = 255 & a,
t.last_lit++,
0 === e ? t.dyn_ltree[2 * a]++ : (t.matches++, e--, t.dyn_ltree[2 * (oe[a] + j + 1)]++, t.dyn_dtree[2 * n(e)]++),
t.last_lit === t.lit_bufsize - 1
}
var R = t('../utils/common'),
C = 4,
I = 0,
N = 1,
O = 2,
T = 0,
D = 1,
F = 2,
L = 3,
U = 258,
H = 29,
j = 256,
M = j + 1 + H,
K = 30,
P = 19,
q = 2 * M + 1,
Y = 15,
G = 16,
X = 7,
W = 256,
J = 16,
Q = 17,
V = 18,
$ = [
0,
0,
0,
0,
0,
0,
0,
0,
1,
1,
1,
1,
2,
2,
2,
2,
3,
3,
3,
3,
4,
4,
4,
4,
5,
5,
5,
5,
0
],
te = [
0,
0,
0,
0,
1,
1,
2,
2,
3,
3,
4,
4,
5,
5,
6,
6,
7,
7,
8,
8,
9,
9,
10,
10,
11,
11,
12,
12,
13,
13
],
ee = [
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
2,
3,
7
],
ae = [
16,
17,
18,
0,
8,
7,
9,
6,
10,
5,
11,
4,
12,
3,
13,
2,
14,
1,
15
],
ie = 512,
ne = new Array(2 * (M + 2));
i(ne);
var re = new Array(2 * K);
i(re);
var se = new Array(ie);
i(se);
var oe = new Array(U - L + 1);
i(oe);
var le = new Array(H);
i(le);
var he = new Array(K);
i(he);
var de,
fe,
_e,
ue = function (t, e, a, i, n) {
this.static_tree = t,
this.extra_bits = e,
this.extra_base = a,
this.elems = i,
this.max_length = n,
this.has_stree = t && t.length
},
ce = function (t, e) {
this.dyn_tree = t,
this.max_code = 0,
this.stat_desc = e
},
be = !1;
a._tr_init = B,
a._tr_stored_block = S,
a._tr_flush_block = A,
a._tr_tally = Z,
a._tr_align = E
},
{
'../utils/common': 4
}
],
16: [
function (t, e) {
'use strict';
function a() {
this.input = null,
this.next_in = 0,
this.avail_in = 0,
this.total_in = 0,
this.output = null,
this.next_out = 0,
this.avail_out = 0,
this.total_out = 0,
this.msg = '',
this.state = null,
this.data_type = 2,
this.adler = 0
}
e.exports = a
},
{
}
]
},
{
},
[
1
]) (1)
});
;
/**
* @author Dave Longley
*
* Copyright (c) 2010-2013 Digital Bazaar, Inc.
*/
(function () {
function w(d) {
var b = d.util = d.util || {
};
'undefined' !== typeof process && process.nextTick ? (b.nextTick = process.nextTick, b.setImmediate = 'function' === typeof setImmediate ? setImmediate : b.nextTick)  : 'function' === typeof setImmediate ? (b.setImmediate = setImmediate, b.nextTick = function (c) {
return setImmediate(c)
})  : (b.setImmediate = function (c) {
setTimeout(c, 0)
}, b.nextTick = b.setImmediate);
b.isArray = Array.isArray || function (c) {
return '[object Array]' === Object.prototype.toString.call(c)
};
b.inArray = function (c, a, b) {
if (Array.prototype.indexOf) return c.indexOf(a, b);
var e;
e = b ? b : 0;
if (!c) throw new TypeError;
b = c.length;
if (0 === b || e >= b) return - 1;
for (0 > e && (e = b - Math.abs(e)); e < b; e++) if (c[e] === a) return e;
return - 1
};
b.isArrayBuffer = function (c) {
return 'undefined' !== typeof ArrayBuffer && c instanceof ArrayBuffer
};
var f = [
];
'undefined' !== typeof Int8Array && f.push(Int8Array);
'undefined' !== typeof Uint8Array && f.push(Uint8Array);
'undefined' !== typeof Uint8ClampedArray && f.push(Uint8ClampedArray);
'undefined' !== typeof Int16Array && f.push(Int16Array);
'undefined' !== typeof Uint16Array && f.push(Uint16Array);
'undefined' !== typeof Int32Array && f.push(Int32Array);
'undefined' !== typeof Uint32Array && f.push(Uint32Array);
'undefined' !== typeof Float32Array && f.push(Float32Array);
'undefined' !== typeof Float64Array && f.push(Float64Array);
b.isArrayBufferView = function (c) {
for (var a = 0; a < f.length; ++a) if (c instanceof f[a]) return !0;
return !1
};
b.ByteBuffer = function (c) {
this.data = '';
this.read = 0;
if ('string' === typeof c) this.data = c;
 else if (b.isArrayBuffer(c) || b.isArrayBufferView(c)) {
c =
new Uint8Array(c);
try {
this.data = String.fromCharCode.apply(null, c)
} catch (a) {
for (var M = 0; M < c.length; ++M) this.putByte(c[M])
}
} else c instanceof b.ByteBuffer && (this.data = c.data, this.read = c.read)
};
b.ByteBuffer.prototype.length = function () {
return this.data.length - this.read
};
b.ByteBuffer.prototype.isEmpty = function () {
return 0 >= this.length()
};
b.ByteBuffer.prototype.putByte = function (c) {
this.data += String.fromCharCode(c);
return this
};
b.ByteBuffer.prototype.fillWithByte = function (c, a) {
c = String.fromCharCode(c);
for (var b =
this.data; 0 < a; ) a & 1 && (b += c),
a >>>= 1,
0 < a && (c += c);
this.data = b;
return this
};
b.ByteBuffer.prototype.putBytes = function (c) {
this.data += c;
return this
};
b.ByteBuffer.prototype.putString = function (c) {
this.data += b.encodeUtf8(c);
return this
};
b.ByteBuffer.prototype.putInt16 = function (c) {
this.data += String.fromCharCode(c >> 8 & 255) + String.fromCharCode(c & 255);
return this
};
b.ByteBuffer.prototype.putInt24 = function (c) {
this.data += String.fromCharCode(c >> 16 & 255) + String.fromCharCode(c >> 8 & 255) + String.fromCharCode(c & 255);
return this
};
b.ByteBuffer.prototype.putInt32 = function (c) {
this.data += String.fromCharCode(c >> 24 & 255) + String.fromCharCode(c >> 16 & 255) + String.fromCharCode(c >> 8 & 255) + String.fromCharCode(c & 255);
return this
};
b.ByteBuffer.prototype.putInt16Le = function (c) {
this.data += String.fromCharCode(c & 255) + String.fromCharCode(c >> 8 & 255);
return this
};
b.ByteBuffer.prototype.putInt24Le = function (c) {
this.data += String.fromCharCode(c & 255) + String.fromCharCode(c >> 8 & 255) + String.fromCharCode(c >> 16 & 255);
return this
};
b.ByteBuffer.prototype.putInt32Le =
function (c) {
this.data += String.fromCharCode(c & 255) + String.fromCharCode(c >> 8 & 255) + String.fromCharCode(c >> 16 & 255) + String.fromCharCode(c >> 24 & 255);
return this
};
b.ByteBuffer.prototype.putInt = function (c, a) {
do a -= 8,
this.data += String.fromCharCode(c >> a & 255);
while (0 < a);
return this
};
b.ByteBuffer.prototype.putSignedInt = function (c, a) {
0 > c && (c += 2 << a - 1);
return this.putInt(c, a)
};
b.ByteBuffer.prototype.putBuffer = function (c) {
this.data += c.getBytes();
return this
};
b.ByteBuffer.prototype.getByte = function () {
return this.data.charCodeAt(this.read++)
};
b.ByteBuffer.prototype.getInt16 = function () {
var c = this.data.charCodeAt(this.read) << 8 ^ this.data.charCodeAt(this.read + 1);
this.read += 2;
return c
};
b.ByteBuffer.prototype.getInt24 = function () {
var c = this.data.charCodeAt(this.read) << 16 ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2);
this.read += 3;
return c
};
b.ByteBuffer.prototype.getInt32 = function () {
var c = this.data.charCodeAt(this.read) << 24 ^ this.data.charCodeAt(this.read + 1) << 16 ^ this.data.charCodeAt(this.read + 2) << 8 ^ this.data.charCodeAt(this.read +
3);
this.read += 4;
return c
};
b.ByteBuffer.prototype.getInt16Le = function () {
var c = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8;
this.read += 2;
return c
};
b.ByteBuffer.prototype.getInt24Le = function () {
var c = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2) << 16;
this.read += 3;
return c
};
b.ByteBuffer.prototype.getInt32Le = function () {
var c = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read +
2) << 16 ^ this.data.charCodeAt(this.read + 3) << 24;
this.read += 4;
return c
};
b.ByteBuffer.prototype.getInt = function (c) {
var a = 0;
do a = (a << 8) + this.data.charCodeAt(this.read++),
c -= 8;
while (0 < c);
return a
};
b.ByteBuffer.prototype.getSignedInt = function (c) {
var a = this.getInt(c);
c = 2 << c - 2;
a >= c && (a -= c << 1);
return a
};
b.ByteBuffer.prototype.getBytes = function (c) {
var a;
c ? (c = Math.min(this.length(), c), a = this.data.slice(this.read, this.read + c), this.read += c)  : 0 === c ? a = '' : (a = 0 === this.read ? this.data : this.data.slice(this.read), this.clear());
return a
};
b.ByteBuffer.prototype.bytes = function (c) {
return 'undefined' === typeof c ? this.data.slice(this.read)  : this.data.slice(this.read, this.read + c)
};
b.ByteBuffer.prototype.at = function (c) {
return this.data.charCodeAt(this.read + c)
};
b.ByteBuffer.prototype.setAt = function (c, a) {
this.data = this.data.substr(0, this.read + c) + String.fromCharCode(a) + this.data.substr(this.read + c + 1);
return this
};
b.ByteBuffer.prototype.last = function () {
return this.data.charCodeAt(this.data.length - 1)
};
b.ByteBuffer.prototype.copy = function () {
var c =
b.createBuffer(this.data);
c.read = this.read;
return c
};
b.ByteBuffer.prototype.compact = function () {
0 < this.read && (this.data = this.data.slice(this.read), this.read = 0);
return this
};
b.ByteBuffer.prototype.clear = function () {
this.data = '';
this.read = 0;
return this
};
b.ByteBuffer.prototype.truncate = function (c) {
c = Math.max(0, this.length() - c);
this.data = this.data.substr(this.read, c);
this.read = 0;
return this
};
b.ByteBuffer.prototype.toHex = function () {
for (var c = '', a = this.read; a < this.data.length; ++a) {
var b = this.data.charCodeAt(a);
16 > b && (c += '0');
c += b.toString(16)
}
return c
};
b.ByteBuffer.prototype.toString = function () {
return b.decodeUtf8(this.bytes())
};
b.createBuffer = function (c, a) {
void 0 !== c && 'utf8' === (a || 'raw') && (c = b.encodeUtf8(c));
return new b.ByteBuffer(c)
};
b.fillString = function (c, a) {
for (var b = ''; 0 < a; ) a & 1 && (b += c),
a >>>= 1,
0 < a && (c += c);
return b
};
b.xorBytes = function (c, a, b) {
for (var e = '', h = '', n = '', d = 0, f = 0; 0 < b; --b, ++d) h = c.charCodeAt(d) ^ a.charCodeAt(d),
10 <= f && (e += n, n = '', f = 0),
n += String.fromCharCode(h),
++f;
return e + n
};
b.hexToBytes = function (c) {
var a =
'',
b = 0;
c.length & 1 && (b = 1, a += String.fromCharCode(parseInt(c[0], 16)));
for (; b < c.length; b += 2) a += String.fromCharCode(parseInt(c.substr(b, 2), 16));
return a
};
b.bytesToHex = function (c) {
return b.createBuffer(c).toHex()
};
b.int32ToBytes = function (c) {
return String.fromCharCode(c >> 24 & 255) + String.fromCharCode(c >> 16 & 255) + String.fromCharCode(c >> 8 & 255) + String.fromCharCode(c & 255)
};
var l = [
62,
- 1,
- 1,
- 1,
63,
52,
53,
54,
55,
56,
57,
58,
59,
60,
61,
- 1,
- 1,
- 1,
64,
- 1,
- 1,
- 1,
0,
1,
2,
3,
4,
5,
6,
7,
8,
9,
10,
11,
12,
13,
14,
15,
16,
17,
18,
19,
20,
21,
22,
23,
24,
25,
- 1,
- 1,
- 1,
- 1,
- 1,
- 1,
26,
27,
28,
29,
30,
31,
32,
33,
34,
35,
36,
37,
38,
39,
40,
41,
42,
43,
44,
45,
46,
47,
48,
49,
50,
51
];
b.encode64 = function (c, a) {
for (var b = '', e = '', h, n, d, f = 0; f < c.length; ) h = c.charCodeAt(f++),
n = c.charCodeAt(f++),
d = c.charCodeAt(f++),
b += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.charAt(h >> 2),
b += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.charAt((h & 3) << 4 | n >> 4),
isNaN(n) ? b += '==' : (b += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.charAt((n & 15) <<
2 | d >> 6), b += isNaN(d) ? '=' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.charAt(d & 63)),
a && b.length > a && (e += b.substr(0, a) + '\r\n', b = b.substr(a));
return e + b
};
b.decode64 = function (c) {
c = c.replace(/[^A-Za-z0-9\+\/\=]/g, '');
for (var a = '', b, e, h, n, d = 0; d < c.length; ) b = l[c.charCodeAt(d++) - 43],
e = l[c.charCodeAt(d++) - 43],
h = l[c.charCodeAt(d++) - 43],
n = l[c.charCodeAt(d++) - 43],
a += String.fromCharCode(b << 2 | e >> 4),
64 !== h && (a += String.fromCharCode((e & 15) << 4 | h >> 2), 64 !== n && (a += String.fromCharCode((h & 3) << 6 | n)));
return a
};
b.encodeUtf8 = function (c) {
return unescape(encodeURIComponent(c))
};
b.decodeUtf8 = function (c) {
return decodeURIComponent(escape(c))
};
b.deflate = function (c, a, e) {
a = b.decode64(c.deflate(b.encode64(a)).rval);
e && (c = 2, a.charCodeAt(1) & 32 && (c = 6), a = a.substring(c, a.length - 4));
return a
};
b.inflate = function (c, a, e) {
c = c.inflate(b.encode64(a)).rval;
return null === c ? null : b.decode64(c)
};
var e = function (c, a, e) {
if (!c) throw {
message: 'WebStorage not available.'
};
null === e ? c = c.removeItem(a)  : (e = b.encode64(JSON.stringify(e)), c = c.setItem(a, e));
if ('undefined' !== typeof c && !0 !== c.rval) throw c.error;
},
p = function (c, a) {
if (!c) throw {
message: 'WebStorage not available.'
};
var e = c.getItem(a);
if (c.init) if (null === e.rval) {
if (e.error) throw e.error;
e = null
} else e = e.rval;
null !== e && (e = JSON.parse(b.decode64(e)));
return e
},
m = function (c, a, b, d) {
var h = p(c, a);
null === h && (h = {
});
h[b] = d;
e(c, a, h)
},
a = function (c, a, b) {
c = p(c, a);
null !== c && (c = b in c ? c[b] : null);
return c
},
k = function (c, a, b) {
var d = p(c, a);
if (null !== d && b in d) {
delete d[b];
b = !0;
for (var h in d) {
b =
!1;
break
}
b && (d = null);
e(c, a, d)
}
},
u = function (c, a) {
e(c, a, null)
},
g = function (c, a, b) {
var e = null;
'undefined' === typeof b && (b = [
'web',
'flash'
]);
var h,
n = !1,
d = null,
f;
for (f in b) {
h = b[f];
try {
if ('flash' === h || 'both' === h) {
if (null === a[0]) throw {
message: 'Flash local storage not available.'
};
e = c.apply(this, a);
n = 'flash' === h
}
if ('web' === h || 'both' === h) a[0] = localStorage,
e = c.apply(this, a),
n = !0
} catch (g) {
d = g
}
if (n) break
}
if (!n) throw d;
return e
};
b.setItem = function (c, a, b, e, h) {
g(m, arguments, h)
};
b.getItem = function (c, b, e, d) {
return g(a, arguments, d)
};
b.removeItem = function (c, a, b, e) {
g(k, arguments, e)
};
b.clearItems = function (c, a, b) {
g(u, arguments, b)
};
b.parseUrl = function (c) {
var a = /^(https?):\/\/([^:&^\/]*):?(\d*)(.*)$/g;
a.lastIndex = 0;
a = a.exec(c);
if (c = null === a ? null : {
full: c,
scheme: a[1],
host: a[2],
port: a[3],
path: a[4]
}) c.fullHost = c.host,
c.port ? 80 !== c.port && 'http' === c.scheme ? c.fullHost += ':' + c.port : 443 !== c.port && 'https' === c.scheme && (c.fullHost += ':' + c.port)  : 'http' === c.scheme ? c.port = 80 : 'https' === c.scheme && (c.port = 443),
c.full = c.scheme + '://' + c.fullHost;
return c
};
var q = null;
b.getQueryVariables = function (c) {
var a = function (c) {
var a = {
};
c = c.split('&');
for (var b = 0; b < c.length; b++) {
var e = c[b].indexOf('='),
d;
0 < e ? (d = c[b].substring(0, e), e = c[b].substring(e + 1))  : (d = c[b], e = null);
d in a || (a[d] = [
]);
d in Object.prototype || null === e || a[d].push(unescape(e))
}
return a
};
'undefined' === typeof c ? (null === q && (q = 'undefined' === typeof window ? {
}
 : a(window.location.search.substring(1))), c = q)  : c = a(c);
return c
};
b.parseFragment = function (c) {
var a = c,
e = '',
d = c.indexOf('?');
0 < d && (a = c.substring(0, d), e = c.substring(d + 1));
c = a.split('/');
0 < c.length && '' === c[0] && c.shift();
d = '' === e ? {
}
 : b.getQueryVariables(e);
return {
pathString: a,
queryString: e,
path: c,
query: d
}
};
b.makeRequest = function (c) {
var a = b.parseFragment(c),
e = {
path: a.pathString,
query: a.queryString,
getPath: function (c) {
return 'undefined' === typeof c ? a.path : a.path[c]
},
getQuery: function (c, b) {
var e;
'undefined' === typeof c ? e = a.query : (e = a.query[c]) && 'undefined' !== typeof b && (e = e[b]);
return e
},
getQueryLast: function (c, a) {
var b = e.getQuery(c);
return b ? b[b.length -
1] : a
}
};
return e
};
b.makeLink = function (c, a, b) {
c = jQuery.isArray(c) ? c.join('/')  : c;
a = jQuery.param(a || {
});
b = b || '';
return c + (0 < a.length ? '?' + a : '') + (0 < b.length ? '#' + b : '')
};
b.setPath = function (c, a, b) {
if ('object' === typeof c && null !== c) for (var e = 0, h = a.length; e < h; ) {
var d = a[e++];
if (e == h) c[d] = b;
 else {
var f = d in c;
if (!f || f && 'object' !== typeof c[d] || f && null === c[d]) c[d] = {
};
c = c[d]
}
}
};
b.getPath = function (c, a, b) {
for (var e = 0, h = a.length, d = !0; d && e < h && 'object' === typeof c && null !== c; ) {
var f = a[e++];
(d = f in c) && (c = c[f])
}
return d ? c :
b
};
b.deletePath = function (c, a) {
if ('object' === typeof c && null !== c) for (var b = 0, e = a.length; b < e; ) {
var h = a[b++];
if (b == e) delete c[h];
 else {
if (!(h in c) || 'object' !== typeof c[h] || null === c[h]) break;
c = c[h]
}
}
};
b.isEmpty = function (c) {
for (var a in c) if (c.hasOwnProperty(a)) return !1;
return !0
};
b.format = function (c) {
var a = /%./g,
b,
e,
h = 0,
d = [
];
for (e = 0; b = a.exec(c); ) switch (e = c.substring(e, a.lastIndex - 2), 0 < e.length && d.push(e), e = a.lastIndex, b = b[0][1], b) {
case 's':
case 'o':
h < arguments.length ? d.push(arguments[h++ + 1])  : d.push('<?>');
break;
case '%':
d.push('%');
break;
default:
d.push('<%' + b + '?>')
}
d.push(c.substring(e));
return d.join('')
};
b.formatNumber = function (c, a, b, e) {
var h = isNaN(a = Math.abs(a)) ? 2 : a;
a = void 0 === b ? ',' : b;
e = void 0 === e ? '.' : e;
b = 0 > c ? '-' : '';
var d = parseInt(c = Math.abs( + c || 0).toFixed(h), 10) + '',
f = 3 < d.length ? d.length % 3 : 0;
return b + (f ? d.substr(0, f) + e : '') + d.substr(f).replace(/(\d{3})(?=\d)/g, '$1' + e) + (h ? a + Math.abs(c - d).toFixed(h).slice(2)  : '')
};
b.formatSize = function (c) {
return c = 1073741824 <= c ? b.formatNumber(c / 1073741824, 2, '.', '') +
' GiB' : 1048576 <= c ? b.formatNumber(c / 1048576, 2, '.', '') + ' MiB' : 1024 <= c ? b.formatNumber(c / 1024, 0) + ' KiB' : b.formatNumber(c, 0) + ' bytes'
};
b.bytesFromIP = function (c) {
return - 1 !== c.indexOf('.') ? b.bytesFromIPv4(c)  : - 1 !== c.indexOf(':') ? b.bytesFromIPv6(c)  : null
};
b.bytesFromIPv4 = function (c) {
c = c.split('.');
if (4 !== c.length) return null;
for (var a = b.createBuffer(), e = 0; e < c.length; ++e) {
var d = parseInt(c[e], 10);
if (isNaN(d)) return null;
a.putByte(d)
}
return a.getBytes()
};
b.bytesFromIPv6 = function (a) {
var e = 0;
a = a.split(':').filter(function (a) {
0 ===
a.length && ++e;
return !0
});
for (var d = 2 * (8 - a.length + e), f = b.createBuffer(), h = 0; 8 > h; ++h) if (a[h] && 0 !== a[h].length) {
var n = b.hexToBytes(a[h]);
2 > n.length && f.putByte(0);
f.putBytes(n)
} else f.fillWithByte(0, d),
d = 0;
return f.getBytes()
};
b.bytesToIP = function (a) {
return 4 === a.length ? b.bytesToIPv4(a)  : 16 === a.length ? b.bytesToIPv6(a)  : null
};
b.bytesToIPv4 = function (a) {
if (4 !== a.length) return null;
for (var b = [
], e = 0; e < a.length; ++e) b.push(a.charCodeAt(e));
return b.join('.')
};
b.bytesToIPv6 = function (a) {
if (16 !== a.length) return null;
for (var e = [
], d = [
], f = 0, h = 0; h < a.length; h += 2) {
for (var n = b.bytesToHex(a[h] + a[h + 1]); '0' === n[0] && '0' !== n; ) n = n.substr(1);
if ('0' === n) {
var g = d[d.length - 1],
p = e.length;
g && p === g.end + 1 ? (g.end = p, g.end - g.start > d[f].end - d[f].start && (f = d.length - 1))  : d.push({
start: p,
end: p
})
}
e.push(n)
}
0 < d.length && (a = d[f], 0 < a.end - a.start && (e.splice(a.start, a.end - a.start + 1, ''), 0 === a.start && e.unshift(''), 7 === a.end && e.push('')));
return e.join(':')
};
b.estimateCores = function (a, e) {
function d(a, c, g) {
if (0 === c) {
var p = Math.floor(a.reduce(function (a, c) {
return a + c
}, 0) / a.length);
b.cores = Math.max(1, p);
URL.revokeObjectURL(n);
return e(null, b.cores)
}
f(g, function (b, e) {
a.push(h(g, e));
d(a, c - 1, g)
})
}
function f(a, c) {
for (var b = [
], h = [
], e = 0; e < a; ++e) {
var d = new Worker(n);
d.addEventListener('message', function (v) {
h.push(v.data);
if (h.length === a) {
for (v = 0; v < a; ++v) b[v].terminate();
c(null, h)
}
});
b.push(d)
}
for (e = 0; e < a; ++e) b[e].postMessage(e)
}
function h(a, c) {
for (var b = [
], h = 0; h < a; ++h) for (var e = c[h], d = b[h] = [
], v = 0; v < a; ++v) if (h !== v) {
var J = c[v];
(e.st > J.st && e.st < J.et || J.st >
e.st && J.st < e.et) && d.push(v)
}
return b.reduce(function (a, c) {
return Math.max(a, c.length)
}, 0)
}
'function' === typeof a && (e = a, a = {
});
a = a || {
};
if ('cores' in b && !a.update) return e(null, b.cores);
if (void 0 === typeof Worker) return b.cores = 1,
e(null, b.cores);
if (void 0 === typeof Blob) return b.cores = 2,
e(null, b.cores);
var n = URL.createObjectURL(new Blob(['(',
function () {
self.addEventListener('message', function (a) {
a = Date.now();
for (var c = a + 4; Date.now() < c; );
self.postMessage({
st: a,
et: c
})
})
}.toString(),
')()'], {
type: 'application/javascript'
}));
d([], 5, 16)
}
}
if ('function' !== typeof define) if ('object' === typeof module && module.exports) {
var E = !0;
define = function (d, b) {
b(require, module)
}
} else return 'undefined' === typeof forge && (forge = {
}),
w(forge);
var z,
F = function (d, b) {
b.exports = function (b) {
var l = z.map(function (b) {
return d(b)
}).concat(w);
b = b || {
};
b.defined = b.defined || {
};
if (b.defined.util) return b.util;
b.defined.util = !0;
for (var e = 0; e < l.length; ++e) l[e](b);
return b.util
}
},
x = define;
define = function (d, b) {
z = 'string' === typeof d ? b.slice(2)  : d.slice(2);
if (E) return delete define,
x.apply(null, Array.prototype.slice.call(arguments, 0));
define = x;
return define.apply(null, Array.prototype.slice.call(arguments, 0))
};
define(['require',
'module'], function () {
F.apply(null, Array.prototype.slice.call(arguments, 0))
})
}) (); (function () {
function w(d) {
var b = d.md5 = d.md5 || {
};
d.md = d.md || {
};
d.md.algorithms = d.md.algorithms || {
};
d.md.md5 = d.md.algorithms.md5 = b;
var f = null,
l = null,
e = null,
p = null,
m = !1,
a = function () {
f = String.fromCharCode(128);
f += d.util.fillString(String.fromCharCode(0), 64);
l = [
0,
1,
2,
3,
4,
5,
6,
7,
8,
9,
10,
11,
12,
13,
14,
15,
1,
6,
11,
0,
5,
10,
15,
4,
9,
14,
3,
8,
13,
2,
7,
12,
5,
8,
11,
14,
1,
4,
7,
10,
13,
0,
3,
6,
9,
12,
15,
2,
0,
7,
14,
5,
12,
3,
10,
1,
8,
15,
6,
13,
4,
11,
2,
9
];
e = [
7,
12,
17,
22,
7,
12,
17,
22,
7,
12,
17,
22,
7,
12,
17,
22,
5,
9,
14,
20,
5,
9,
14,
20,
5,
9,
14,
20,
5,
9,
14,
20,
4,
11,
16,
23,
4,
11,
16,
23,
4,
11,
16,
23,
4,
11,
16,
23,
6,
10,
15,
21,
6,
10,
15,
21,
6,
10,
15,
21,
6,
10,
15,
21
];
p = Array(64);
for (var a = 0; 64 > a; ++a) p[a] = Math.floor(4294967296 * Math.abs(Math.sin(a + 1)));
m = !0
},
k = function (a, b, d) {
for (var c, f, k, m, h, n, s, y = d.length(); 64 <= y; ) {
f = a.h0;
k = a.h1;
m = a.h2;
h = a.h3;
for (s = 0; 16 > s; ++s) b[s] = d.getInt32Le(),
c = h ^ k & (m ^ h),
c = f + c + p[s] + b[s],
n = e[s],
f = h,
h = m,
m = k,
k += c << n | c >>> 32 - n;
for (; 32 > s; ++s) c = m ^ h & (k ^ m),
c = f + c + p[s] + b[l[s]],
n = e[s],
f = h,
h = m,
m = k,
k += c << n | c >>> 32 - n;
for (; 48 > s; ++s) c = k ^ m ^ h,
c = f + c + p[s] + b[l[s]],
n = e[s],
f = h,
h = m,
m = k,
k += c << n | c >>> 32 - n;
for (; 64 > s; ++s) c = m ^ (k | ~h),
c = f + c + p[s] + b[l[s]],
n = e[s],
f = h,
h = m,
m = k,
k += c << n | c >>> 32 - n;
a.h0 = a.h0 + f & 4294967295;
a.h1 = a.h1 + k & 4294967295;
a.h2 = a.h2 + m & 4294967295;
a.h3 = a.h3 + h & 4294967295;
y -= 64
}
};
b.create = function () {
m || a();
var b = null,
e = d.util.createBuffer(),
p = Array(16),
c = {
algorithm: 'md5',
blockLength: 64,
digestLength: 16,
messageLength: 0,
start: function () {
c.messageLength = 0;
e = d.util.createBuffer();
b = {
h0: 1732584193,
h1: 4023233417,
h2: 2562383102,
h3: 271733878
};
return c
}
};
c.start();
c.update = function (a, f) {
'utf8' ===
f && (a = d.util.encodeUtf8(a));
c.messageLength += a.length;
e.putBytes(a);
k(b, p, e);
(2048 < e.read || 0 === e.length()) && e.compact();
return c
};
c.digest = function () {
var a = c.messageLength,
m = d.util.createBuffer();
m.putBytes(e.bytes());
m.putBytes(f.substr(0, 64 - (a + 8) % 64));
m.putInt32Le(a << 3 & 4294967295);
m.putInt32Le(a >>> 29 & 255);
a = {
h0: b.h0,
h1: b.h1,
h2: b.h2,
h3: b.h3
};
k(a, p, m);
m = d.util.createBuffer();
m.putInt32Le(a.h0);
m.putInt32Le(a.h1);
m.putInt32Le(a.h2);
m.putInt32Le(a.h3);
return m
};
return c
}
}
if ('function' !== typeof define) if ('object' ===
typeof module && module.exports) {
var E = !0;
define = function (d, b) {
b(require, module)
}
} else return 'undefined' === typeof forge && (forge = {
}),
w(forge);
var z,
F = function (d, b) {
b.exports = function (b) {
var l = z.map(function (b) {
return d(b)
}).concat(w);
b = b || {
};
b.defined = b.defined || {
};
if (b.defined.md5) return b.md5;
b.defined.md5 = !0;
for (var e = 0; e < l.length; ++e) l[e](b);
return b.md5
}
},
x = define;
define = function (d, b) {
z = 'string' === typeof d ? b.slice(2)  : d.slice(2);
if (E) return delete define,
x.apply(null, Array.prototype.slice.call(arguments, 0));
define = x;
return define.apply(null, Array.prototype.slice.call(arguments, 0))
};
define(['require',
'module',
'./util'], function () {
F.apply(null, Array.prototype.slice.call(arguments, 0))
})
}) (); (function () {
function w(d) {
var b = d.sha1 = d.sha1 || {
};
d.md = d.md || {
};
d.md.algorithms = d.md.algorithms || {
};
d.md.sha1 = d.md.algorithms.sha1 = b;
var f = null,
l = !1,
e = function (b, e, a) {
for (var d, f, g, q, c, A, l, r, h = a.length(); 64 <= h; ) {
f = b.h0;
g = b.h1;
q = b.h2;
c = b.h3;
A = b.h4;
for (r = 0; 16 > r; ++r) d = a.getInt32(),
e[r] = d,
l = c ^ g & (q ^ c),
d = (f << 5 | f >>> 27) + l + A + 1518500249 + d,
A = c,
c = q,
q = g << 30 | g >>> 2,
g = f,
f = d;
for (; 20 > r; ++r) d = e[r - 3] ^ e[r - 8] ^ e[r - 14] ^ e[r - 16],
d = d << 1 | d >>> 31,
e[r] = d,
l = c ^ g & (q ^ c),
d = (f << 5 | f >>> 27) + l + A + 1518500249 + d,
A = c,
c = q,
q = g << 30 | g >>> 2,
g = f,
f =
d;
for (; 32 > r; ++r) d = e[r - 3] ^ e[r - 8] ^ e[r - 14] ^ e[r - 16],
d = d << 1 | d >>> 31,
e[r] = d,
l = g ^ q ^ c,
d = (f << 5 | f >>> 27) + l + A + 1859775393 + d,
A = c,
c = q,
q = g << 30 | g >>> 2,
g = f,
f = d;
for (; 40 > r; ++r) d = e[r - 6] ^ e[r - 16] ^ e[r - 28] ^ e[r - 32],
d = d << 2 | d >>> 30,
e[r] = d,
l = g ^ q ^ c,
d = (f << 5 | f >>> 27) + l + A + 1859775393 + d,
A = c,
c = q,
q = g << 30 | g >>> 2,
g = f,
f = d;
for (; 60 > r; ++r) d = e[r - 6] ^ e[r - 16] ^ e[r - 28] ^ e[r - 32],
d = d << 2 | d >>> 30,
e[r] = d,
l = g & q | c & (g ^ q),
d = (f << 5 | f >>> 27) + l + A + 2400959708 + d,
A = c,
c = q,
q = g << 30 | g >>> 2,
g = f,
f = d;
for (; 80 > r; ++r) d = e[r - 6] ^ e[r - 16] ^ e[r - 28] ^ e[r - 32],
d = d << 2 | d >>> 30,
e[r] = d,
l = g ^ q ^ c,
d = (f << 5 | f >>> 27) + l + A + 3395469782 + d,
A = c,
c = q,
q = g << 30 | g >>> 2,
g = f,
f = d;
b.h0 += f;
b.h1 += g;
b.h2 += q;
b.h3 += c;
b.h4 += A;
h -= 64
}
};
b.create = function () {
l || (f = String.fromCharCode(128), f += d.util.fillString(String.fromCharCode(0), 64), l = !0);
var b = null,
m = d.util.createBuffer(),
a = Array(80),
k = {
algorithm: 'sha1',
blockLength: 64,
digestLength: 20,
messageLength: 0,
start: function () {
k.messageLength = 0;
m = d.util.createBuffer();
b = {
h0: 1732584193,
h1: 4023233417,
h2: 2562383102,
h3: 271733878,
h4: 3285377520
};
return k
}
};
k.start();
k.update = function (f, g) {
'utf8' === g && (f = d.util.encodeUtf8(f));
k.messageLength += f.length;
m.putBytes(f);
e(b, a, m);
(2048 < m.read || 0 === m.length()) && m.compact();
return k
};
k.digest = function () {
var l = k.messageLength,
g = d.util.createBuffer();
g.putBytes(m.bytes());
g.putBytes(f.substr(0, 64 - (l + 8) % 64));
g.putInt32(l >>> 29 & 255);
g.putInt32(l << 3 & 4294967295);
l = {
h0: b.h0,
h1: b.h1,
h2: b.h2,
h3: b.h3,
h4: b.h4
};
e(l, a, g);
g = d.util.createBuffer();
g.putInt32(l.h0);
g.putInt32(l.h1);
g.putInt32(l.h2);
g.putInt32(l.h3);
g.putInt32(l.h4);
return g
};
return k
}
}
if ('function' !==
typeof define) if ('object' === typeof module && module.exports) {
var E = !0;
define = function (d, b) {
b(require, module)
}
} else return 'undefined' === typeof forge && (forge = {
}),
w(forge);
var z,
F = function (d, b) {
b.exports = function (b) {
var l = z.map(function (b) {
return d(b)
}).concat(w);
b = b || {
};
b.defined = b.defined || {
};
if (b.defined.sha1) return b.sha1;
b.defined.sha1 = !0;
for (var e = 0; e < l.length; ++e) l[e](b);
return b.sha1
}
},
x = define;
define = function (d, b) {
z = 'string' === typeof d ? b.slice(2)  : d.slice(2);
if (E) return delete define,
x.apply(null, Array.prototype.slice.call(arguments, 0));
define = x;
return define.apply(null, Array.prototype.slice.call(arguments, 0))
};
define(['require',
'module',
'./util'], function () {
F.apply(null, Array.prototype.slice.call(arguments, 0))
})
}) (); (function () {
function w(d) {
var b = !1,
f = 4,
l,
e,
p,
m,
a,
k = function () {
b = !0;
p = [
0,
1,
2,
4,
8,
16,
32,
64,
128,
27,
54
];
for (var c = Array(256), d = 0; 128 > d; ++d) c[d] = d << 1,
c[d + 128] = d + 128 << 1 ^ 283;
l = Array(256);
e = Array(256);
m = Array(4);
a = Array(4);
for (d = 0; 4 > d; ++d) m[d] = Array(256),
a[d] = Array(256);
for (var f = 0, g = 0, h, n, s, k, q, d = 0; 256 > d; ++d) {
k = g ^ g << 1 ^ g << 2 ^ g << 3 ^ g << 4;
k = k >> 8 ^ k & 255 ^ 99;
l[f] = k;
e[k] = f;
q = c[k];
h = c[f];
n = c[h];
s = c[n];
q ^= q << 24 ^ k << 16 ^ k << 8 ^ k;
n = (h ^ n ^ s) << 24 ^ (f ^ s) << 16 ^ (f ^ n ^ s) << 8 ^ f ^ h ^ s;
for (var t = 0; 4 > t; ++t) m[t][f] = q,
a[t][k] = n,
q = q << 24 | q >>>
8,
n = n << 24 | n >>> 8;
0 === f ? f = g = 1 : (f = h ^ c[c[c[h ^ s]]], g ^= c[c[g]])
}
},
u = function (b, e) {
for (var d = b.slice(0), g, h = 1, n = d.length, k = f * (n + 6 + 1), m = n; m < k; ++m) g = d[m - 1],
0 === m % n ? (g = l[g >>> 16 & 255] << 24 ^ l[g >>> 8 & 255] << 16 ^ l[g & 255] << 8 ^ l[g >>> 24] ^ p[h] << 24, h++)  : 6 < n && 4 === m % n && (g = l[g >>> 24] << 24 ^ l[g >>> 16 & 255] << 16 ^ l[g >>> 8 & 255] << 8 ^ l[g & 255]),
d[m] = d[m - n] ^ g;
if (e) {
for (var h = a[0], n = a[1], q = a[2], t = a[3], B = d.slice(0), k = d.length, m = 0, u = k - f; m < k; m += f, u -= f) if (0 === m || m === k - f) B[m] = d[u],
B[m + 1] = d[u + 3],
B[m + 2] = d[u + 2],
B[m + 3] = d[u + 1];
 else for (var v = 0; v < f; ++v) g =
d[u + v],
B[m + (3 & - v)] = h[l[g >>> 24]] ^ n[l[g >>> 16 & 255]] ^ q[l[g >>> 8 & 255]] ^ t[l[g & 255]];
d = B
}
return d
},
g = function (b, d, f, g) {
var h = b.length / 4 - 1,
n,
k,
p,
q,
t;
g ? (n = a[0], k = a[1], p = a[2], q = a[3], t = e)  : (n = m[0], k = m[1], p = m[2], q = m[3], t = l);
var u,
D,
v,
J,
N,
L;
u = d[0] ^ b[0];
D = d[g ? 3 : 1] ^ b[1];
v = d[2] ^ b[2];
d = d[g ? 1 : 3] ^ b[3];
for (var C = 3, H = 1; H < h; ++H) J = n[u >>> 24] ^ k[D >>> 16 & 255] ^ p[v >>> 8 & 255] ^ q[d & 255] ^ b[++C],
N = n[D >>> 24] ^ k[v >>> 16 & 255] ^ p[d >>> 8 & 255] ^ q[u & 255] ^ b[++C],
L = n[v >>> 24] ^ k[d >>> 16 & 255] ^ p[u >>> 8 & 255] ^ q[D & 255] ^ b[++C],
d = n[d >>> 24] ^ k[u >>> 16 & 255] ^ p[D >>>
8 & 255] ^ q[v & 255] ^ b[++C],
u = J,
D = N,
v = L;
f[0] = t[u >>> 24] << 24 ^ t[D >>> 16 & 255] << 16 ^ t[v >>> 8 & 255] << 8 ^ t[d & 255] ^ b[++C];
f[g ? 3 : 1] = t[D >>> 24] << 24 ^ t[v >>> 16 & 255] << 16 ^ t[d >>> 8 & 255] << 8 ^ t[u & 255] ^ b[++C];
f[2] = t[v >>> 24] << 24 ^ t[d >>> 16 & 255] << 16 ^ t[u >>> 8 & 255] << 8 ^ t[D & 255] ^ b[++C];
f[g ? 1 : 3] = t[d >>> 24] << 24 ^ t[u >>> 16 & 255] << 16 ^ t[D >>> 8 & 255] << 8 ^ t[v & 255] ^ b[++C]
},
q = function (a, e, m, p, h) {
function n() {
if (p) for (var a = 0; a < f; ++a) G[a] = C.getInt32();
 else for (a = 0; a < f; ++a) G[a] = w[a] ^ C.getInt32();
g(N, G, K, p);
if (p) {
for (a = 0; a < f; ++a) H.putInt32(w[a] ^ K[a]);
w = G.slice(0)
} else {
for (a =
0; a < f; ++a) H.putInt32(K[a]);
w = K
}
}
function s() {
g(N, G, K, !1);
for (var a = 0; a < f; ++a) G[a] = C.getInt32();
for (a = 0; a < f; ++a) {
var b = G[a] ^ K[a];
p || (G[a] = b);
H.putInt32(b)
}
}
function q() {
g(N, G, K, !1);
for (var a = 0; a < f; ++a) G[a] = C.getInt32();
for (a = 0; a < f; ++a) H.putInt32(G[a] ^ K[a]),
G[a] = K[a]
}
function l() {
g(N, G, K, !1);
for (var a = f - 1; 0 <= a; --a) if (4294967295 === G[a]) G[a] = 0;
 else {
++G[a];
break
}
for (a = 0; a < f; ++a) H.putInt32(C.getInt32() ^ K[a])
}
var t = null;
b || k();
h = (h || 'CBC').toUpperCase();
if ('string' === typeof a && (16 === a.length || 24 === a.length ||
32 === a.length)) a = d.util.createBuffer(a);
 else if (d.util.isArray(a) && (16 === a.length || 24 === a.length || 32 === a.length)) {
var B = a;
a = d.util.createBuffer();
for (var D = 0; D < B.length; ++D) a.putByte(B[D])
}
if (!d.util.isArray(a)) {
B = a;
a = [
];
var v = B.length();
if (16 === v || 24 === v || 32 === v) for (v >>>= 2, D = 0; D < v; ++D) a.push(B.getInt32())
}
if (!d.util.isArray(a) || 4 !== a.length && 6 !== a.length && 8 !== a.length) return t;
var B = - 1 !== d.util.inArray(['CFB',
'OFB',
'CTR'], h),
J = 'CBC' === h,
N = u(a, p && !B),
L = f << 2,
C,
H,
G,
K,
w,
z,
x,
t = {
output: null
};
if ('CBC' ===
h) x = n;
 else if ('CFB' === h) x = s;
 else if ('OFB' === h) x = q;
 else if ('CTR' === h) x = l;
 else throw {
message: 'Unsupported block cipher mode of operation: "' + h + '"'
};
t.update = function (a) {
for (z || C.putBuffer(a); C.length() >= L || 0 < C.length() && z; ) x()
};
t.finish = function (a) {
var b = !0,
v = C.length() % L;
if (!p) if (a) b = a(L, C, p);
 else if (J) {
var c = C.length() === L ? L : L - C.length();
C.fillWithByte(c, c)
}
b && (z = !0, t.update());
p && (J && (b = 0 === v), b && (a ? b = a(L, H, p)  : J && (c = H.length(), c = H.at(c - 1), c > f << 2 ? b = !1 : H.truncate(c))));
!J && !a && 0 < v && H.truncate(L - v);
return b
};
t.start = function (a, b) {
null === a && (a = w.slice(0));
if ('string' === typeof a && 16 === a.length) a = d.util.createBuffer(a);
 else if (d.util.isArray(a) && 16 === a.length) {
var c = a;
a = d.util.createBuffer();
for (var v = 0; 16 > v; ++v) a.putByte(c[v])
}
d.util.isArray(a) || (c = a, a = Array(4), a[0] = c.getInt32(), a[1] = c.getInt32(), a[2] = c.getInt32(), a[3] = c.getInt32());
C = d.util.createBuffer();
H = b || d.util.createBuffer();
w = a.slice(0);
G = Array(f);
K = Array(f);
z = !1;
t.output = H;
if ( - 1 !== d.util.inArray(['CFB',
'OFB',
'CTR'], h)) {
for (v = 0; v < f; ++v) G[v] =
w[v];
w = null
}
};
null !== e && t.start(e, m);
return t
};
d.aes = d.aes || {
};
d.aes.startEncrypting = function (a, b, e, d) {
return q(a, b, e, !1, d)
};
d.aes.createEncryptionCipher = function (a, b) {
return q(a, null, null, !1, b)
};
d.aes.startDecrypting = function (a, b, e, d) {
return q(a, b, e, !0, d)
};
d.aes.createDecryptionCipher = function (a, b) {
return q(a, null, null, !0, b)
};
d.aes._expandKey = function (a, e) {
b || k();
return u(a, e)
};
d.aes._updateBlock = g
}
if ('function' !== typeof define) if ('object' === typeof module && module.exports) {
var E = !0;
define = function (d, b) {
b(require, module)
}
} else return 'undefined' === typeof forge && (forge = {
}),
w(forge);
var z,
F = function (d, b) {
b.exports = function (b) {
var l = z.map(function (b) {
return d(b)
}).concat(w);
b = b || {
};
b.defined = b.defined || {
};
if (b.defined.aes) return b.aes;
b.defined.aes = !0;
for (var e = 0; e < l.length; ++e) l[e](b);
return b.aes
}
},
x = define;
define = function (d, b) {
z = 'string' === typeof d ? b.slice(2)  : d.slice(2);
if (E) return delete define,
x.apply(null, Array.prototype.slice.call(arguments, 0));
define = x;
return define.apply(null, Array.prototype.slice.call(arguments, 0))
};
define(['require',
'module',
'./util'], function () {
F.apply(null, Array.prototype.slice.call(arguments, 0))
})
}) (); (function () {
function w(d) {
var b = d.asn1 = d.asn1 || {
};
b.Class = {
UNIVERSAL: 0,
APPLICATION: 64,
CONTEXT_SPECIFIC: 128,
PRIVATE: 192
};
b.Type = {
NONE: 0,
BOOLEAN: 1,
INTEGER: 2,
BITSTRING: 3,
OCTETSTRING: 4,
NULL: 5,
OID: 6,
ODESC: 7,
EXTERNAL: 8,
REAL: 9,
ENUMERATED: 10,
EMBEDDED: 11,
UTF8: 12,
ROID: 13,
SEQUENCE: 16,
SET: 17,
PRINTABLESTRING: 19,
IA5STRING: 22,
UTCTIME: 23,
GENERALIZEDTIME: 24,
BMPSTRING: 30
};
b.create = function (b, f, m, a) {
if (d.util.isArray(a)) {
for (var k = [
], l = 0; l < a.length; ++l) void 0 !== a[l] && k.push(a[l]);
a = k
}
return {
tagClass: b,
type: f,
constructed: m,
composed: m || d.util.isArray(a),
value: a
}
};
var f = function (b) {
var d = b.getByte();
if (128 !== d) return d & 128 ? b.getInt((d & 127) << 3)  : d
};
b.fromDer = function (e, p) {
void 0 === p && (p = !0);
'string' === typeof e && (e = d.util.createBuffer(e));
if (2 > e.length()) throw {
message: 'Too few bytes to parse DER.',
bytes: e.length()
};
var m = e.getByte(),
a = m & 192,
k = m & 31,
l = f(e);
if (e.length() < l) {
if (p) throw {
message: 'Too few bytes to read ASN.1 value.',
detail: e.length() + ' < ' + l
};
l = e.length()
}
var g,
q = 32 === (m & 32);
g = q;
if (!g && a === b.Class.UNIVERSAL && k ===
b.Type.BITSTRING && 1 < l) {
var c = e.read;
if (0 === e.getByte() && (m = e.getByte(), m &= 192, m === b.Class.UNIVERSAL || m === b.Class.CONTEXT_SPECIFIC)) try {
if (g = f(e) === l - (e.read - c)) ++c,
--l
} catch (A) {
}
e.read = c
}
if (g) if (g = [
], void 0 === l) for (; ; ) {
if (e.bytes(2) === String.fromCharCode(0, 0)) {
e.getBytes(2);
break
}
g.push(b.fromDer(e, p))
} else for (c = e.length(); 0 < l; ) g.push(b.fromDer(e, p)),
l -= c - e.length(),
c = e.length();
 else {
if (void 0 === l) {
if (p) throw {
message: 'Non-constructed ASN.1 object of indefinite length.'
};
l = e.length()
}
if (k === b.Type.BMPSTRING) for (g =
'', c = 0; c < l; c += 2) g += String.fromCharCode(e.getInt16());
 else g = e.getBytes(l)
}
return b.create(a, k, q, g)
};
b.toDer = function (e) {
var f = d.util.createBuffer(),
m = e.tagClass | e.type,
a = d.util.createBuffer();
if (e.composed) {
e.constructed ? m |= 32 : a.putByte(0);
for (var k = 0; k < e.value.length; ++k) void 0 !== e.value[k] && a.putBuffer(b.toDer(e.value[k]))
} else if (e.type === b.Type.BMPSTRING) for (k = 0; k < e.value.length; ++k) a.putInt16(e.value.charCodeAt(k));
 else a.putBytes(e.value);
f.putByte(m);
if (127 >= a.length()) f.putByte(a.length() &
127);
 else {
k = a.length();
e = '';
do e += String.fromCharCode(k & 255),
k >>>= 8;
while (0 < k);
f.putByte(e.length | 128);
for (k = e.length - 1; 0 <= k; --k) f.putByte(e.charCodeAt(k))
}
f.putBuffer(a);
return f
};
b.oidToDer = function (b) {
b = b.split('.');
var f = d.util.createBuffer();
f.putByte(40 * parseInt(b[0], 10) + parseInt(b[1], 10));
for (var m, a, k, l, g = 2; g < b.length; ++g) {
m = !0;
a = [
];
k = parseInt(b[g], 10);
do l = k & 127,
k >>>= 7,
m || (l |= 128),
a.push(l),
m = !1;
while (0 < k);
for (m = a.length - 1; 0 <= m; --m) f.putByte(a[m])
}
return f
};
b.derToOid = function (b) {
var f;
'string' ===
typeof b && (b = d.util.createBuffer(b));
var m = b.getByte();
f = Math.floor(m / 40) + '.' + m % 40;
for (var a = 0; 0 < b.length(); ) m = b.getByte(),
a <<= 7,
m & 128 ? a += m & 127 : (f += '.' + (a + m), a = 0);
return f
};
b.utcTimeToDate = function (b) {
var d = new Date,
f = parseInt(b.substr(0, 2), 10),
f = 50 <= f ? 1900 + f : 2000 + f,
a = parseInt(b.substr(2, 2), 10) - 1,
k = parseInt(b.substr(4, 2), 10),
l = parseInt(b.substr(6, 2), 10),
g = parseInt(b.substr(8, 2), 10),
q = 0;
if (11 < b.length) {
var c = b.charAt(10),
A = 10;
'+' !== c && '-' !== c && (q = parseInt(b.substr(10, 2), 10), A += 2)
}
d.setUTCFullYear(f, a, k);
d.setUTCHours(l, g, q, 0);
A && (c = b.charAt(A), '+' === c || '-' === c) && (f = parseInt(b.substr(A + 1, 2), 10), b = parseInt(b.substr(A + 4, 2), 10), b = 60000 * (60 * f + b), '+' === c ? d.setTime( + d - b)  : d.setTime( + d + b));
return d
};
b.generalizedTimeToDate = function (b) {
var d = new Date,
f = parseInt(b.substr(0, 4), 10),
a = parseInt(b.substr(4, 2), 10) - 1,
k = parseInt(b.substr(6, 2), 10),
l = parseInt(b.substr(8, 2), 10),
g = parseInt(b.substr(10, 2), 10),
q = parseInt(b.substr(12, 2), 10),
c = 0,
A = 0,
M = !1;
'Z' === b.charAt(b.length - 1) && (M = !0);
var r = b.length - 5,
h = b.charAt(r);
if ('+' === h || '-' === h) A = parseInt(b.substr(r + 1, 2), 10),
r = parseInt(b.substr(r + 4, 2), 10),
A = 60000 * (60 * A + r),
'+' === h && (A *= - 1),
M = !0;
'.' === b.charAt(14) && (c = 1000 * parseFloat(b.substr(14), 10));
M ? (d.setUTCFullYear(f, a, k), d.setUTCHours(l, g, q, c), d.setTime( + d + A))  : (d.setFullYear(f, a, k), d.setHours(l, g, q, c));
return d
};
b.dateToUtcTime = function (b) {
var d = '',
f = [
];
f.push(('' + b.getUTCFullYear()).substr(2));
f.push('' + (b.getUTCMonth() + 1));
f.push('' + b.getUTCDate());
f.push('' + b.getUTCHours());
f.push('' + b.getUTCMinutes());
f.push('' +
b.getUTCSeconds());
for (b = 0; b < f.length; ++b) 2 > f[b].length && (d += '0'),
d += f[b];
return d + 'Z'
};
b.integerToDer = function (b) {
var f = d.util.createBuffer();
if ( - 128 <= b && 128 > b) return f.putSignedInt(b, 8);
if ( - 32768 <= b && 32768 > b) return f.putSignedInt(b, 16);
if ( - 8388608 <= b && 8388608 > b) return f.putSignedInt(b, 24);
if ( - 2147483648 <= b && 2147483648 > b) return f.putSignedInt(b, 32);
throw {
message: 'Integer too large; max is 32-bits.',
integer: b
};
};
b.derToInteger = function (b) {
'string' === typeof b && (b = d.util.createBuffer(b));
var f = 8 * b.length();
if (32 < f) throw {
message: 'Integer too large; max is 32-bits.'
};
return b.getSignedInt(f)
};
b.validate = function (e, f, l, a) {
var k = !1;
if (e.tagClass !== f.tagClass && 'undefined' !== typeof f.tagClass || e.type !== f.type && 'undefined' !== typeof f.type) a && (e.tagClass !== f.tagClass && a.push('[' + f.name + '] Expected tag class "' + f.tagClass + '", got "' + e.tagClass + '"'), e.type !== f.type && a.push('[' + f.name + '] Expected type "' + f.type + '", got "' + e.type + '"'));
 else if (e.constructed === f.constructed || 'undefined' === typeof f.constructed) {
k =
!0;
if (f.value && d.util.isArray(f.value)) for (var u = 0, g = 0; k && g < f.value.length; ++g) k = f.value[g].optional || !1,
e.value[u] && ((k = b.validate(e.value[u], f.value[g], l, a)) ? ++u : f.value[g].optional && (k = !0)),
!k && a && a.push('[' + f.name + '] Tag class "' + f.tagClass + '", type "' + f.type + '" expected value length "' + f.value.length + '", got "' + e.value.length + '"');
k && l && (f.capture && (l[f.capture] = e.value), f.captureAsn1 && (l[f.captureAsn1] = e))
} else a && a.push('[' + f.name + '] Expected constructed "' + f.constructed + '", got "' + e.constructed +
'"');
return k
};
var l = /[^\\u0000-\\u00ff]/;
b.prettyPrint = function (f, p, m) {
var a = '';
p = p || 0;
m = m || 2;
0 < p && (a += '\n');
for (var k = '', u = 0; u < p * m; ++u) k += ' ';
a += k + 'Tag: ';
switch (f.tagClass) {
case b.Class.UNIVERSAL:
a += 'Universal:';
break;
case b.Class.APPLICATION:
a += 'Application:';
break;
case b.Class.CONTEXT_SPECIFIC:
a += 'Context-Specific:';
break;
case b.Class.PRIVATE:
a += 'Private:'
}
if (f.tagClass === b.Class.UNIVERSAL) switch (a += f.type, f.type) {
case b.Type.NONE:
a += ' (None)';
break;
case b.Type.BOOLEAN:
a += ' (Boolean)';
break;
case b.Type.BITSTRING:
a += ' (Bit string)';
break;
case b.Type.INTEGER:
a += ' (Integer)';
break;
case b.Type.OCTETSTRING:
a += ' (Octet string)';
break;
case b.Type.NULL:
a += ' (Null)';
break;
case b.Type.OID:
a += ' (Object Identifier)';
break;
case b.Type.ODESC:
a += ' (Object Descriptor)';
break;
case b.Type.EXTERNAL:
a += ' (External or Instance of)';
break;
case b.Type.REAL:
a += ' (Real)';
break;
case b.Type.ENUMERATED:
a += ' (Enumerated)';
break;
case b.Type.EMBEDDED:
a += ' (Embedded PDV)';
break;
case b.Type.UTF8:
a += ' (UTF8)';
break;
case b.Type.ROID:
a += ' (Relative Object Identifier)';
break;
case b.Type.SEQUENCE:
a += ' (Sequence)';
break;
case b.Type.SET:
a += ' (Set)';
break;
case b.Type.PRINTABLESTRING:
a += ' (Printable String)';
break;
case b.Type.IA5String:
a += ' (IA5String (ASCII))';
break;
case b.Type.UTCTIME:
a += ' (UTC time)';
break;
case b.Type.GENERALIZEDTIME:
a += ' (Generalized time)';
break;
case b.Type.BMPSTRING:
a += ' (BMP String)'
} else a += f.type;
a = a + '\n' + (k + 'Constructed: ' + f.constructed + '\n');
if (f.composed) {
for (var g = 0, q = '', u = 0; u < f.value.length; ++u) void 0 !==
f.value[u] && (g += 1, q += b.prettyPrint(f.value[u], p + 1, m), u + 1 < f.value.length && (q += ','));
a += k + 'Sub values: ' + g + q
} else if (a += k + 'Value: ', f.type === b.Type.OID && (p = b.derToOid(f.value), a += p, d.pki && d.pki.oids && p in d.pki.oids && (a += ' (' + d.pki.oids[p] + ')')), f.type === b.Type.INTEGER) try {
a += b.derToInteger(f.value)
} catch (c) {
a += '0x' + d.util.bytesToHex(f.value)
} else a = l.test(f.value) ? a + ('0x' + d.util.createBuffer(f.value, 'utf8').toHex())  : 0 === f.value.length ? a + '[null]' : a + f.value;
return a
}
}
if ('function' !== typeof define) if ('object' ===
typeof module && module.exports) {
var E = !0;
define = function (d, b) {
b(require, module)
}
} else return 'undefined' === typeof forge && (forge = {
}),
w(forge);
var z,
F = function (d, b) {
b.exports = function (b) {
var l = z.map(function (b) {
return d(b)
}).concat(w);
b = b || {
};
b.defined = b.defined || {
};
if (b.defined.asn1) return b.asn1;
b.defined.asn1 = !0;
for (var e = 0; e < l.length; ++e) l[e](b);
return b.asn1
}
},
x = define;
define = function (d, b) {
z = 'string' === typeof d ? b.slice(2)  : d.slice(2);
if (E) return delete define,
x.apply(null, Array.prototype.slice.call(arguments, 0));
define = x;
return define.apply(null, Array.prototype.slice.call(arguments, 0))
};
define(['require',
'module',
'./util',
'./oids'], function () {
F.apply(null, Array.prototype.slice.call(arguments, 0))
})
}) ();
(function () {
function w(d) {
function b(a, b, c) {
this.data = [
];
null != a && ('number' == typeof a ? this.fromNumber(a, b, c)  : null == b && 'string' != typeof a ? this.fromString(a, 256)  : this.fromString(a, b))
}
function f() {
return new b(null)
}
function l(a, b, c, d, h, f) {
for (; 0 <= --f; ) {
var e = b * this.data[a++] + c.data[d] + h;
h = Math.floor(e / 67108864);
c.data[d++] = e & 67108863
}
return h
}
function e(a, b, c, d, h, f) {
var e = b & 32767;
for (b >>= 15; 0 <= --f; ) {
var g = this.data[a] & 32767,
n = this.data[a++] >> 15,
k = b * g + n * e,
g = e * g + ((k & 32767) << 15) + c.data[d] + (h & 1073741823);
h = (g >>> 30) + (k >>> 15) + b * n + (h >>> 30);
c.data[d++] = g & 1073741823
}
return h
}
function p(a, b, c, d, h, f) {
var e = b & 16383;
for (b >>= 14; 0 <= --f; ) {
var g = this.data[a] & 16383,
n = this.data[a++] >> 14,
k = b * g + n * e,
g = e * g + ((k & 16383) << 14) + c.data[d] + h;
h = (g >> 28) + (k >> 14) + b * n;
c.data[d++] = g & 268435455
}
return h
}
function m(a, b) {
var c = I[a.charCodeAt(b)];
return null == c ? - 1 : c
}
function a(a) {
var b = f();
b.fromInt(a);
return b
}
function k(a) {
var b = 1,
c;
0 != (c = a >>> 16) && (a = c, b += 16);
0 != (c = a >> 8) && (a = c, b += 8);
0 != (c = a >> 4) && (a = c, b += 4);
0 != (c = a >> 2) && (a = c, b += 2);
0 !=
a >> 1 && (b += 1);
return b
}
function u(a) {
this.m = a
}
function g(a) {
this.m = a;
this.mp = a.invDigit();
this.mpl = this.mp & 32767;
this.mph = this.mp >> 15;
this.um = (1 << a.DB - 15) - 1;
this.mt2 = 2 * a.t
}
function q(a, b) {
return a & b
}
function c(a, b) {
return a | b
}
function A(a, b) {
return a ^ b
}
function M(a, b) {
return a & ~b
}
function r() {
}
function h(a) {
return a
}
function n(a) {
this.r2 = f();
this.q3 = f();
b.ONE.dlShiftTo(2 * a.t, this.r2);
this.mu = this.r2.divide(a);
this.m = a
}
function s() {
return {
nextBytes: function (a) {
for (var b = 0; b < a.length; ++b) a[b] = Math.floor(255 *
Math.random())
}
}
}
var y;
'undefined' === typeof navigator ? (b.prototype.am = p, y = 28)  : 'Microsoft Internet Explorer' == navigator.appName ? (b.prototype.am = e, y = 30)  : 'Netscape' != navigator.appName ? (b.prototype.am = l, y = 26)  : (b.prototype.am = p, y = 28);
b.prototype.DB = y;
b.prototype.DM = (1 << y) - 1;
b.prototype.DV = 1 << y;
b.prototype.FV = Math.pow(2, 52);
b.prototype.F1 = 52 - y;
b.prototype.F2 = 2 * y - 52;
var I = [
],
t;
y = 48;
for (t = 0; 9 >= t; ++t) I[y++] = t;
y = 97;
for (t = 10; 36 > t; ++t) I[y++] = t;
y = 65;
for (t = 10; 36 > t; ++t) I[y++] = t;
u.prototype.convert = function (a) {
return 0 >
a.s || 0 <= a.compareTo(this.m) ? a.mod(this.m)  : a
};
u.prototype.revert = function (a) {
return a
};
u.prototype.reduce = function (a) {
a.divRemTo(this.m, null, a)
};
u.prototype.mulTo = function (a, b, c) {
a.multiplyTo(b, c);
this.reduce(c)
};
u.prototype.sqrTo = function (a, b) {
a.squareTo(b);
this.reduce(b)
};
g.prototype.convert = function (a) {
var c = f();
a.abs().dlShiftTo(this.m.t, c);
c.divRemTo(this.m, null, c);
0 > a.s && 0 < c.compareTo(b.ZERO) && this.m.subTo(c, c);
return c
};
g.prototype.revert = function (a) {
var b = f();
a.copyTo(b);
this.reduce(b);
return b
};
g.prototype.reduce = function (a) {
for (; a.t <= this.mt2; ) a.data[a.t++] = 0;
for (var b = 0; b < this.m.t; ++b) {
var c = a.data[b] & 32767,
d = c * this.mpl + ((c * this.mph + (a.data[b] >> 15) * this.mpl & this.um) << 15) & a.DM,
c = b + this.m.t;
for (a.data[c] += this.m.am(0, d, a, b, 0, this.m.t); a.data[c] >= a.DV; ) a.data[c] -= a.DV,
a.data[++c]++
}
a.clamp();
a.drShiftTo(this.m.t, a);
0 <= a.compareTo(this.m) && a.subTo(this.m, a)
};
g.prototype.mulTo = function (a, b, c) {
a.multiplyTo(b, c);
this.reduce(c)
};
g.prototype.sqrTo = function (a, b) {
a.squareTo(b);
this.reduce(b)
};
b.prototype.copyTo =
function (a) {
for (var b = this.t - 1; 0 <= b; --b) a.data[b] = this.data[b];
a.t = this.t;
a.s = this.s
};
b.prototype.fromInt = function (a) {
this.t = 1;
this.s = 0 > a ? - 1 : 0;
0 < a ? this.data[0] = a : - 1 > a ? this.data[0] = a + this.DV : this.t = 0
};
b.prototype.fromString = function (a, c) {
var d;
if (16 == c) d = 4;
 else if (8 == c) d = 3;
 else if (256 == c) d = 8;
 else if (2 == c) d = 1;
 else if (32 == c) d = 5;
 else if (4 == c) d = 2;
 else {
this.fromRadix(a, c);
return
}
this.s = this.t = 0;
for (var h = a.length, f = !1, e = 0; 0 <= --h; ) {
var g = 8 == d ? a[h] & 255 : m(a, h);
0 > g ? '-' == a.charAt(h) && (f = !0)  : (f = !1, 0 == e ? this.data[this.t++] =
g : e + d > this.DB ? (this.data[this.t - 1] |= (g & (1 << this.DB - e) - 1) << e, this.data[this.t++] = g >> this.DB - e)  : this.data[this.t - 1] |= g << e, e += d, e >= this.DB && (e -= this.DB))
}
8 == d && 0 != (a[0] & 128) && (this.s = - 1, 0 < e && (this.data[this.t - 1] |= (1 << this.DB - e) - 1 << e));
this.clamp();
f && b.ZERO.subTo(this, this)
};
b.prototype.clamp = function () {
for (var a = this.s & this.DM; 0 < this.t && this.data[this.t - 1] == a; ) --this.t
};
b.prototype.dlShiftTo = function (a, b) {
var c;
for (c = this.t - 1; 0 <= c; --c) b.data[c + a] = this.data[c];
for (c = a - 1; 0 <= c; --c) b.data[c] = 0;
b.t = this.t +
a;
b.s = this.s
};
b.prototype.drShiftTo = function (a, b) {
for (var c = a; c < this.t; ++c) b.data[c - a] = this.data[c];
b.t = Math.max(this.t - a, 0);
b.s = this.s
};
b.prototype.lShiftTo = function (a, b) {
var c = a % this.DB,
d = this.DB - c,
h = (1 << d) - 1,
f = Math.floor(a / this.DB),
e = this.s << c & this.DM,
g;
for (g = this.t - 1; 0 <= g; --g) b.data[g + f + 1] = this.data[g] >> d | e,
e = (this.data[g] & h) << c;
for (g = f - 1; 0 <= g; --g) b.data[g] = 0;
b.data[f] = e;
b.t = this.t + f + 1;
b.s = this.s;
b.clamp()
};
b.prototype.rShiftTo = function (a, b) {
b.s = this.s;
var c = Math.floor(a / this.DB);
if (c >= this.t) b.t =
0;
 else {
var d = a % this.DB,
h = this.DB - d,
f = (1 << d) - 1;
b.data[0] = this.data[c] >> d;
for (var e = c + 1; e < this.t; ++e) b.data[e - c - 1] |= (this.data[e] & f) << h,
b.data[e - c] = this.data[e] >> d;
0 < d && (b.data[this.t - c - 1] |= (this.s & f) << h);
b.t = this.t - c;
b.clamp()
}
};
b.prototype.subTo = function (a, b) {
for (var c = 0, d = 0, h = Math.min(a.t, this.t); c < h; ) d += this.data[c] - a.data[c],
b.data[c++] = d & this.DM,
d >>= this.DB;
if (a.t < this.t) {
for (d -= a.s; c < this.t; ) d += this.data[c],
b.data[c++] = d & this.DM,
d >>= this.DB;
d += this.s
} else {
for (d += this.s; c < a.t; ) d -= a.data[c],
b.data[c++] =
d & this.DM,
d >>= this.DB;
d -= a.s
}
b.s = 0 > d ? - 1 : 0;
- 1 > d ? b.data[c++] = this.DV + d : 0 < d && (b.data[c++] = d);
b.t = c;
b.clamp()
};
b.prototype.multiplyTo = function (a, c) {
var d = this.abs(),
h = a.abs(),
f = d.t;
for (c.t = f + h.t; 0 <= --f; ) c.data[f] = 0;
for (f = 0; f < h.t; ++f) c.data[f + d.t] = d.am(0, h.data[f], c, f, 0, d.t);
c.s = 0;
c.clamp();
this.s != a.s && b.ZERO.subTo(c, c)
};
b.prototype.squareTo = function (a) {
for (var b = this.abs(), c = a.t = 2 * b.t; 0 <= --c; ) a.data[c] = 0;
for (c = 0; c < b.t - 1; ++c) {
var d = b.am(c, b.data[c], a, 2 * c, 0, 1);
(a.data[c + b.t] += b.am(c + 1, 2 * b.data[c], a, 2 *
c + 1, d, b.t - c - 1)) >= b.DV && (a.data[c + b.t] -= b.DV, a.data[c + b.t + 1] = 1)
}
0 < a.t && (a.data[a.t - 1] += b.am(c, b.data[c], a, 2 * c, 0, 1));
a.s = 0;
a.clamp()
};
b.prototype.divRemTo = function (a, c, d) {
var h = a.abs();
if (!(0 >= h.t)) {
var e = this.abs();
if (e.t < h.t) null != c && c.fromInt(0),
null != d && this.copyTo(d);
 else {
null == d && (d = f());
var g = f(),
n = this.s;
a = a.s;
var l = this.DB - k(h.data[h.t - 1]);
0 < l ? (h.lShiftTo(l, g), e.lShiftTo(l, d))  : (h.copyTo(g), e.copyTo(d));
h = g.t;
e = g.data[h - 1];
if (0 != e) {
var m = e * (1 << this.F1) + (1 < h ? g.data[h - 2] >> this.F2 : 0),
s = this.FV /
m,
m = (1 << this.F1) / m,
q = 1 << this.F2,
t = d.t,
p = t - h,
y = null == c ? f()  : c;
g.dlShiftTo(p, y);
0 <= d.compareTo(y) && (d.data[d.t++] = 1, d.subTo(y, d));
b.ONE.dlShiftTo(h, y);
for (y.subTo(g, g); g.t < h; ) g.data[g.t++] = 0;
for (; 0 <= --p; ) {
var r = d.data[--t] == e ? this.DM : Math.floor(d.data[t] * s + (d.data[t - 1] + q) * m);
if ((d.data[t] += g.am(0, r, d, p, 0, h)) < r) for (g.dlShiftTo(p, y), d.subTo(y, d); d.data[t] < --r; ) d.subTo(y, d)
}
null != c && (d.drShiftTo(h, c), n != a && b.ZERO.subTo(c, c));
d.t = h;
d.clamp();
0 < l && d.rShiftTo(l, d);
0 > n && b.ZERO.subTo(d, d)
}
}
}
};
b.prototype.invDigit =
function () {
if (1 > this.t) return 0;
var a = this.data[0];
if (0 == (a & 1)) return 0;
var b = a & 3,
b = b * (2 - (a & 15) * b) & 15,
b = b * (2 - (a & 255) * b) & 255,
b = b * (2 - ((a & 65535) * b & 65535)) & 65535,
b = b * (2 - a * b % this.DV) % this.DV;
return 0 < b ? this.DV - b : - b
};
b.prototype.isEven = function () {
return 0 == (0 < this.t ? this.data[0] & 1 : this.s)
};
b.prototype.exp = function (a, c) {
if (4294967295 < a || 1 > a) return b.ONE;
var d = f(),
h = f(),
e = c.convert(this),
g = k(a) - 1;
for (e.copyTo(d); 0 <= --g; ) if (c.sqrTo(d, h), 0 < (a & 1 << g)) c.mulTo(h, e, d);
 else var n = d,
d = h,
h = n;
return c.revert(d)
};
b.prototype.toString =
function (a) {
if (0 > this.s) return '-' + this.negate().toString(a);
if (16 == a) a = 4;
 else if (8 == a) a = 3;
 else if (2 == a) a = 1;
 else if (32 == a) a = 5;
 else if (4 == a) a = 2;
 else return this.toRadix(a);
var b = (1 << a) - 1,
c,
d = !1,
h = '',
f = this.t,
e = this.DB - f * this.DB % a;
if (0 < f--) for (e < this.DB && 0 < (c = this.data[f] >> e) && (d = !0, h = '0123456789abcdefghijklmnopqrstuvwxyz'.charAt(c)); 0 <= f; ) e < a ? (c = (this.data[f] & (1 << e) - 1) << a - e, c |= this.data[--f] >> (e += this.DB - a))  : (c = this.data[f] >> (e -= a) & b, 0 >= e && (e += this.DB, --f)),
0 < c && (d = !0),
d && (h += '0123456789abcdefghijklmnopqrstuvwxyz'.charAt(c));
return d ? h : '0'
};
b.prototype.negate = function () {
var a = f();
b.ZERO.subTo(this, a);
return a
};
b.prototype.abs = function () {
return 0 > this.s ? this.negate()  : this
};
b.prototype.compareTo = function (a) {
var b = this.s - a.s;
if (0 != b) return b;
var c = this.t,
b = c - a.t;
if (0 != b) return 0 > this.s ? - b : b;
for (; 0 <= --c; ) if (0 != (b = this.data[c] - a.data[c])) return b;
return 0
};
b.prototype.bitLength = function () {
return 0 >= this.t ? 0 : this.DB * (this.t - 1) + k(this.data[this.t - 1] ^ this.s & this.DM)
};
b.prototype.mod = function (a) {
var c = f();
this.abs().divRemTo(a, null, c);
0 > this.s && 0 < c.compareTo(b.ZERO) && a.subTo(c, c);
return c
};
b.prototype.modPowInt = function (a, b) {
var c;
c = 256 > a || b.isEven() ? new u(b)  : new g(b);
return this.exp(a, c)
};
b.ZERO = a(0);
b.ONE = a(1);
r.prototype.convert = h;
r.prototype.revert = h;
r.prototype.mulTo = function (a, b, c) {
a.multiplyTo(b, c)
};
r.prototype.sqrTo = function (a, b) {
a.squareTo(b)
};
n.prototype.convert = function (a) {
if (0 > a.s || a.t > 2 * this.m.t) return a.mod(this.m);
if (0 > a.compareTo(this.m)) return a;
var b = f();
a.copyTo(b);
this.reduce(b);
return b
};
n.prototype.revert =
function (a) {
return a
};
n.prototype.reduce = function (a) {
a.drShiftTo(this.m.t - 1, this.r2);
a.t > this.m.t + 1 && (a.t = this.m.t + 1, a.clamp());
this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
for (this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); 0 > a.compareTo(this.r2); ) a.dAddOffset(1, this.m.t + 1);
for (a.subTo(this.r2, a); 0 <= a.compareTo(this.m); ) a.subTo(this.m, a)
};
n.prototype.mulTo = function (a, b, c) {
a.multiplyTo(b, c);
this.reduce(c)
};
n.prototype.sqrTo = function (a, b) {
a.squareTo(b);
this.reduce(b)
};
var B = [
2,
3,
5,
7,
11,
13,
17,
19,
23,
29,
31,
37,
41,
43,
47,
53,
59,
61,
67,
71,
73,
79,
83,
89,
97,
101,
103,
107,
109,
113,
127,
131,
137,
139,
149,
151,
157,
163,
167,
173,
179,
181,
191,
193,
197,
199,
211,
223,
227,
229,
233,
239,
241,
251,
257,
263,
269,
271,
277,
281,
283,
293,
307,
311,
313,
317,
331,
337,
347,
349,
353,
359,
367,
373,
379,
383,
389,
397,
401,
409,
419,
421,
431,
433,
439,
443,
449,
457,
461,
463,
467,
479,
487,
491,
499,
503,
509
],
D = 67108864 / B[B.length - 1];
b.prototype.chunkSize = function (a) {
return Math.floor(Math.LN2 * this.DB / Math.log(a))
};
b.prototype.toRadix = function (b) {
null == b && (b = 10);
if (0 == this.signum() || 2 > b || 36 < b) return '0';
var c = this.chunkSize(b),
c = Math.pow(b, c),
d = a(c),
h = f(),
e = f(),
g = '';
for (this.divRemTo(d, h, e); 0 < h.signum(); ) g = (c + e.intValue()).toString(b).substr(1) + g,
h.divRemTo(d, h, e);
return e.intValue().toString(b) + g
};
b.prototype.fromRadix = function (a, c) {
this.fromInt(0);
null == c && (c = 10);
for (var d = this.chunkSize(c), h = Math.pow(c, d), f = !1, e = 0, g = 0, n = 0; n < a.length; ++n) {
var k = m(a, n);
0 > k ? '-' == a.charAt(n) && 0 == this.signum() && (f = !0)  : (g = c * g + k, ++e >= d && (this.dMultiply(h), this.dAddOffset(g, 0), g = e = 0))
}
0 < e && (this.dMultiply(Math.pow(c, e)), this.dAddOffset(g, 0));
f && b.ZERO.subTo(this, this)
};
b.prototype.fromNumber = function (a, d, h) {
if ('number' == typeof d) if (2 > a) this.fromInt(1);
 else for (this.fromNumber(a, h), this.testBit(a - 1) || this.bitwiseTo(b.ONE.shiftLeft(a - 1), c, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(d); ) this.dAddOffset(2, 0),
this.bitLength() > a && this.subTo(b.ONE.shiftLeft(a - 1), this);
 else {
h = [
];
var f = a & 7;
h.length = (a >> 3) + 1;
d.nextBytes(h);
h[0] = 0 < f ? h[0] & (1 << f) - 1 : 0;
this.fromString(h, 256)
}
};
b.prototype.bitwiseTo = function (a, b, c) {
var d,
h,
f = Math.min(a.t, this.t);
for (d = 0; d < f; ++d) c.data[d] = b(this.data[d], a.data[d]);
if (a.t < this.t) {
h = a.s & this.DM;
for (d = f; d < this.t; ++d) c.data[d] = b(this.data[d], h);
c.t = this.t
} else {
h = this.s & this.DM;
for (d = f; d < a.t; ++d) c.data[d] = b(h, a.data[d]);
c.t = a.t
}
c.s = b(this.s, a.s);
c.clamp()
};
b.prototype.changeBit = function (a, c) {
var d = b.ONE.shiftLeft(a);
this.bitwiseTo(d, c, d);
return d
};
b.prototype.addTo = function (a, b) {
for (var c = 0, d = 0, h = Math.min(a.t, this.t); c < h; ) d += this.data[c] +
a.data[c],
b.data[c++] = d & this.DM,
d >>= this.DB;
if (a.t < this.t) {
for (d += a.s; c < this.t; ) d += this.data[c],
b.data[c++] = d & this.DM,
d >>= this.DB;
d += this.s
} else {
for (d += this.s; c < a.t; ) d += a.data[c],
b.data[c++] = d & this.DM,
d >>= this.DB;
d += a.s
}
b.s = 0 > d ? - 1 : 0;
0 < d ? b.data[c++] = d : - 1 > d && (b.data[c++] = this.DV + d);
b.t = c;
b.clamp()
};
b.prototype.dMultiply = function (a) {
this.data[this.t] = this.am(0, a - 1, this, 0, 0, this.t);
++this.t;
this.clamp()
};
b.prototype.dAddOffset = function (a, b) {
if (0 != a) {
for (; this.t <= b; ) this.data[this.t++] = 0;
for (this.data[b] +=
a; this.data[b] >= this.DV; ) this.data[b] -= this.DV,
++b >= this.t && (this.data[this.t++] = 0),
++this.data[b]
}
};
b.prototype.multiplyLowerTo = function (a, b, c) {
var d = Math.min(this.t + a.t, b);
c.s = 0;
for (c.t = d; 0 < d; ) c.data[--d] = 0;
var h;
for (h = c.t - this.t; d < h; ++d) c.data[d + this.t] = this.am(0, a.data[d], c, d, 0, this.t);
for (h = Math.min(a.t, b); d < h; ++d) this.am(0, a.data[d], c, d, 0, b - d);
c.clamp()
};
b.prototype.multiplyUpperTo = function (a, b, c) {
--b;
var d = c.t = this.t + a.t - b;
for (c.s = 0; 0 <= --d; ) c.data[d] = 0;
for (d = Math.max(b - this.t, 0); d < a.t; ++d) c.data[this.t +
d - b] = this.am(b - d, a.data[d], c, 0, 0, this.t + d - b);
c.clamp();
c.drShiftTo(1, c)
};
b.prototype.modInt = function (a) {
if (0 >= a) return 0;
var b = this.DV % a,
c = 0 > this.s ? a - 1 : 0;
if (0 < this.t) if (0 == b) c = this.data[0] % a;
 else for (var d = this.t - 1; 0 <= d; --d) c = (b * c + this.data[d]) % a;
return c
};
b.prototype.millerRabin = function (a) {
var c = this.subtract(b.ONE),
d = c.getLowestSetBit();
if (0 >= d) return !1;
for (var h = c.shiftRight(d), f = s(), e, g = 0; g < a; ++g) {
do e = new b(this.bitLength(), f);
while (0 >= e.compareTo(b.ONE) || 0 <= e.compareTo(c));
e = e.modPow(h, this);
if (0 != e.compareTo(b.ONE) && 0 != e.compareTo(c)) {
for (var n = 1; n++ < d && 0 != e.compareTo(c); ) if (e = e.modPowInt(2, this), 0 == e.compareTo(b.ONE)) return !1;
if (0 != e.compareTo(c)) return !1
}
}
return !0
};
b.prototype.clone = function () {
var a = f();
this.copyTo(a);
return a
};
b.prototype.intValue = function () {
if (0 > this.s) {
if (1 == this.t) return this.data[0] - this.DV;
if (0 == this.t) return - 1
} else {
if (1 == this.t) return this.data[0];
if (0 == this.t) return 0
}
return (this.data[1] & (1 << 32 - this.DB) - 1) << this.DB | this.data[0]
};
b.prototype.byteValue = function () {
return 0 ==
this.t ? this.s : this.data[0] << 24 >> 24
};
b.prototype.shortValue = function () {
return 0 == this.t ? this.s : this.data[0] << 16 >> 16
};
b.prototype.signum = function () {
return 0 > this.s ? - 1 : 0 >= this.t || 1 == this.t && 0 >= this.data[0] ? 0 : 1
};
b.prototype.toByteArray = function () {
var a = this.t,
b = [
];
b[0] = this.s;
var c = this.DB - a * this.DB % 8,
d,
h = 0;
if (0 < a--) for (c < this.DB && (d = this.data[a] >> c) != (this.s & this.DM) >> c && (b[h++] = d | this.s << this.DB - c); 0 <= a; ) if (8 > c ? (d = (this.data[a] & (1 << c) - 1) << 8 - c, d |= this.data[--a] >> (c += this.DB - 8))  : (d = this.data[a] >> (c -=
8) & 255, 0 >= c && (c += this.DB, --a)), 0 != (d & 128) && (d |= - 256), 0 == h && (this.s & 128) != (d & 128) && ++h, 0 < h || d != this.s) b[h++] = d;
return b
};
b.prototype.equals = function (a) {
return 0 == this.compareTo(a)
};
b.prototype.min = function (a) {
return 0 > this.compareTo(a) ? this : a
};
b.prototype.max = function (a) {
return 0 < this.compareTo(a) ? this : a
};
b.prototype.and = function (a) {
var b = f();
this.bitwiseTo(a, q, b);
return b
};
b.prototype.or = function (a) {
var b = f();
this.bitwiseTo(a, c, b);
return b
};
b.prototype.xor = function (a) {
var b = f();
this.bitwiseTo(a, A, b);
return b
};
b.prototype.andNot = function (a) {
var b = f();
this.bitwiseTo(a, M, b);
return b
};
b.prototype.not = function () {
for (var a = f(), b = 0; b < this.t; ++b) a.data[b] = this.DM & ~this.data[b];
a.t = this.t;
a.s = ~this.s;
return a
};
b.prototype.shiftLeft = function (a) {
var b = f();
0 > a ? this.rShiftTo( - a, b)  : this.lShiftTo(a, b);
return b
};
b.prototype.shiftRight = function (a) {
var b = f();
0 > a ? this.lShiftTo( - a, b)  : this.rShiftTo(a, b);
return b
};
b.prototype.getLowestSetBit = function () {
for (var a = 0; a < this.t; ++a) if (0 != this.data[a]) {
var b = a * this.DB;
a = this.data[a];
if (0 == a) a = - 1;
 else {
var c = 0;
0 == (a & 65535) && (a >>= 16, c += 16);
0 == (a & 255) && (a >>= 8, c += 8);
0 == (a & 15) && (a >>= 4, c += 4);
0 == (a & 3) && (a >>= 2, c += 2);
0 == (a & 1) && ++c;
a = c
}
return b + a
}
return 0 > this.s ? this.t * this.DB : - 1
};
b.prototype.bitCount = function () {
for (var a = 0, b = this.s & this.DM, c = 0; c < this.t; ++c) {
for (var d = this.data[c] ^ b, h = 0; 0 != d; ) d &= d - 1,
++h;
a += h
}
return a
};
b.prototype.testBit = function (a) {
var b = Math.floor(a / this.DB);
return b >= this.t ? 0 != this.s : 0 != (this.data[b] & 1 << a % this.DB)
};
b.prototype.setBit = function (a) {
return this.changeBit(a, c)
};
b.prototype.clearBit = function (a) {
return this.changeBit(a, M)
};
b.prototype.flipBit = function (a) {
return this.changeBit(a, A)
};
b.prototype.add = function (a) {
var b = f();
this.addTo(a, b);
return b
};
b.prototype.subtract = function (a) {
var b = f();
this.subTo(a, b);
return b
};
b.prototype.multiply = function (a) {
var b = f();
this.multiplyTo(a, b);
return b
};
b.prototype.divide = function (a) {
var b = f();
this.divRemTo(a, b, null);
return b
};
b.prototype.remainder = function (a) {
var b = f();
this.divRemTo(a, null, b);
return b
};
b.prototype.divideAndRemainder =
function (a) {
var b = f(),
c = f();
this.divRemTo(a, b, c);
return [b,
c]
};
b.prototype.modPow = function (b, c) {
var d = b.bitLength(),
h,
e = a(1),
l;
if (0 >= d) return e;
h = 18 > d ? 1 : 48 > d ? 3 : 144 > d ? 4 : 768 > d ? 5 : 6;
l = 8 > d ? new u(c)  : c.isEven() ? new n(c)  : new g(c);
var m = [
],
s = 3,
q = h - 1,
t = (1 << h) - 1;
m[1] = l.convert(this);
if (1 < h) for (d = f(), l.sqrTo(m[1], d); s <= t; ) m[s] = f(),
l.mulTo(d, m[s - 2], m[s]),
s += 2;
for (var p = b.t - 1, y, r = !0, I = f(), d = k(b.data[p]) - 1; 0 <= p; ) {
d >= q ? y = b.data[p] >> d - q & t : (y = (b.data[p] & (1 << d + 1) - 1) << q - d, 0 < p && (y |= b.data[p - 1] >> this.DB + d - q));
for (s = h; 0 == (y & 1); ) y >>= 1,
--s;
0 > (d -= s) && (d += this.DB, --p);
if (r) m[y].copyTo(e),
r = !1;
 else {
for (; 1 < s; ) l.sqrTo(e, I),
l.sqrTo(I, e),
s -= 2;
0 < s ? l.sqrTo(e, I)  : (s = e, e = I, I = s);
l.mulTo(I, m[y], e)
}
for (; 0 <= p && 0 == (b.data[p] & 1 << d); ) l.sqrTo(e, I),
s = e,
e = I,
I = s,
0 > --d && (d = this.DB - 1, --p)
}
return l.revert(e)
};
b.prototype.modInverse = function (c) {
var d = c.isEven();
if (this.isEven() && d || 0 == c.signum()) return b.ZERO;
for (var h = c.clone(), e = this.clone(), f = a(1), g = a(0), n = a(0), k = a(1); 0 != h.signum(); ) {
for (; h.isEven(); ) h.rShiftTo(1, h),
d ? (f.isEven() && g.isEven() || (f.addTo(this, f), g.subTo(c, g)), f.rShiftTo(1, f))  : g.isEven() || g.subTo(c, g),
g.rShiftTo(1, g);
for (; e.isEven(); ) e.rShiftTo(1, e),
d ? (n.isEven() && k.isEven() || (n.addTo(this, n), k.subTo(c, k)), n.rShiftTo(1, n))  : k.isEven() || k.subTo(c, k),
k.rShiftTo(1, k);
0 <= h.compareTo(e) ? (h.subTo(e, h), d && f.subTo(n, f), g.subTo(k, g))  : (e.subTo(h, e), d && n.subTo(f, n), k.subTo(g, k))
}
if (0 != e.compareTo(b.ONE)) return b.ZERO;
if (0 <= k.compareTo(c)) return k.subtract(c);
if (0 > k.signum()) k.addTo(c, k);
 else return k;
return 0 > k.signum() ? k.add(c)  : k
};
b.prototype.pow =
function (a) {
return this.exp(a, new r)
};
b.prototype.gcd = function (a) {
var b = 0 > this.s ? this.negate()  : this.clone();
a = 0 > a.s ? a.negate()  : a.clone();
if (0 > b.compareTo(a)) {
var c = b,
b = a;
a = c
}
var c = b.getLowestSetBit(),
d = a.getLowestSetBit();
if (0 > d) return b;
c < d && (d = c);
0 < d && (b.rShiftTo(d, b), a.rShiftTo(d, a));
for (; 0 < b.signum(); ) 0 < (c = b.getLowestSetBit()) && b.rShiftTo(c, b),
0 < (c = a.getLowestSetBit()) && a.rShiftTo(c, a),
0 <= b.compareTo(a) ? (b.subTo(a, b), b.rShiftTo(1, b))  : (a.subTo(b, a), a.rShiftTo(1, a));
0 < d && a.lShiftTo(d, a);
return a
};
b.prototype.isProbablePrime = function (a) {
var b,
c = this.abs();
if (1 == c.t && c.data[0] <= B[B.length - 1]) {
for (b = 0; b < B.length; ++b) if (c.data[0] == B[b]) return !0;
return !1
}
if (c.isEven()) return !1;
for (b = 1; b < B.length; ) {
for (var d = B[b], h = b + 1; h < B.length && d < D; ) d *= B[h++];
for (d = c.modInt(d); b < h; ) if (0 == d % B[b++]) return !1
}
return c.millerRabin(a)
};
d.jsbn = d.jsbn || {
};
d.jsbn.BigInteger = b
}
if ('function' !== typeof define) if ('object' === typeof module && module.exports) {
var E = !0;
define = function (d, b) {
b(require, module)
}
} else return 'undefined' ===
typeof forge && (forge = {
}),
w(forge);
var z,
F = function (d, b) {
b.exports = function (b) {
var l = z.map(function (b) {
return d(b)
}).concat(w);
b = b || {
};
b.defined = b.defined || {
};
if (b.defined.jsbn) return b.jsbn;
b.defined.jsbn = !0;
for (var e = 0; e < l.length; ++e) l[e](b);
return b.jsbn
}
},
x = define;
define = function (d, b) {
z = 'string' === typeof d ? b.slice(2)  : d.slice(2);
if (E) return delete define,
x.apply(null, Array.prototype.slice.call(arguments, 0));
define = x;
return define.apply(null, Array.prototype.slice.call(arguments, 0))
};
define(['require',
'module'], function () {
F.apply(null, Array.prototype.slice.call(arguments, 0))
})
}) ();
(function () {
function w(d) {
var b = 'undefined' !== typeof process && process.versions && process.versions.node,
f = null;
!d.disableNativeCode && b && (f = require('crypto'));
(d.prng = d.prng || {
}).create = function (b) {
function e(b) {
if (32 <= a.pools[0].messageLength) return p(),
b();
a.seedFile(32 - a.pools[0].messageLength << 5, function (d, c) {
if (d) return b(d);
a.collect(c);
p();
b()
})
}
function p() {
var b = d.md.sha1.create();
b.update(a.pools[0].digest().getBytes());
a.pools[0].start();
for (var e = 1, c = 1; 32 > c; ++c) e = 31 === e ? 2147483648 : e << 2,
0 ===
e % a.reseeds && (b.update(a.pools[c].digest().getBytes()), a.pools[c].start());
e = b.digest().getBytes();
b.start();
b.update(e);
b = b.digest().getBytes();
a.key = a.plugin.formatKey(e);
a.seed = a.plugin.formatSeed(b);
++a.reseeds;
a.generated = 0;
a.time = + new Date
}
function m(a) {
var b = null;
if ('undefined' !== typeof window) {
var c = window.crypto || window.msCrypto;
c && c.getRandomValues && (b = function (a) {
return c.getRandomValues(a)
})
}
var e = d.util.createBuffer();
if (b) for (; e.length() < a; ) {
var f = Math.max(1, Math.min(a - e.length(), 65536) /
4),
k = new Uint32Array(Math.floor(f));
try {
for (b(k), f = 0; f < k.length; ++f) e.putInt32(k[f])
} catch (h) {
if (!('undefined' !== typeof QuotaExceededError && h instanceof QuotaExceededError)) throw h;
}
}
if (e.length() < a) for (b = Math.floor(65536 * Math.random()); e.length() < a; ) for (f = 16807 * (b & 65535), b = 16807 * (b >> 16), f += (b & 32767) << 16, f += b >> 15, f = (f & 2147483647) + (f >> 31), b = f & 4294967295, f = 0; 3 > f; ++f) k = b >>> (f << 3),
k ^= Math.floor(256 * Math.random()),
e.putByte(String.fromCharCode(k & 255));
return e.getBytes(a)
}
var a = {
plugin: b,
key: null,
seed: null,
time: null,
reseeds: 0,
generated: 0
};
b = b.md;
for (var k = Array(32), u = 0; 32 > u; ++u) k[u] = b.create();
a.pools = k;
a.pool = 0;
a.generate = function (b, f) {
function c(s) {
if (s) return f(s);
if (n.length() >= b) return f(null, n.getBytes(b));
1048576 <= a.generated && (s = + new Date, null === a.time || 100 < s - a.time) && (a.key = null);
if (null === a.key) return e(c);
s = k(a.key, a.seed);
a.generated += s.length;
n.putBytes(s);
a.key = m(k(a.key, l(a.seed)));
a.seed = h(k(a.key, a.seed));
d.util.setImmediate(c)
}
if (!f) return a.generateSync(b);
var k = a.plugin.cipher,
l =
a.plugin.increment,
m = a.plugin.formatKey,
h = a.plugin.formatSeed,
n = d.util.createBuffer();
c()
};
a.generateSync = function (b) {
for (var e = a.plugin.cipher, c = a.plugin.increment, f = a.plugin.formatKey, k = a.plugin.formatSeed, l = d.util.createBuffer(); l.length() < b; ) {
if (1048576 <= a.generated) {
var h = + new Date;
if (null === a.time || 100 < h - a.time) a.key = null
}
null === a.key && (32 <= a.pools[0].messageLength || a.collect(a.seedFileSync(32 - a.pools[0].messageLength << 5)), p());
h = e(a.key, a.seed);
a.generated += h.length;
l.putBytes(h);
a.key = f(e(a.key, c(a.seed)));
a.seed = k(e(a.key, a.seed))
}
return l.getBytes(b)
};
f ? (a.seedFile = function (a, b) {
f.randomBytes(a, function (a, d) {
if (a) return b(a);
b(null, d.toString())
})
}, a.seedFileSync = function (a) {
return f.randomBytes(a).toString()
})  : (a.seedFile = function (a, b) {
try {
b(null, m(a))
} catch (c) {
b(c)
}
}, a.seedFileSync = m);
a.collect = function (b) {
for (var d = b.length, c = 0; c < d; ++c) a.pools[a.pool].update(b.substr(c, 1)),
a.pool = 31 === a.pool ? 0 : a.pool + 1
};
a.collectInt = function (b, d) {
for (var c = '', e = 0; e < d; e += 8) c += String.fromCharCode(b >>
e & 255);
a.collect(c)
};
a.registerWorker = function (b) {
b === self ? a.seedFile = function (a, b) {
function d(a) {
a = a.data;
a.forge && a.forge.prng && (self.removeEventListener('message', d), b(a.forge.prng.err, a.forge.prng.bytes))
}
self.addEventListener('message', d);
self.postMessage({
forge: {
prng: {
needed: a
}
}
})
}
 : b.addEventListener('message', function (d) {
d = d.data;
d.forge && d.forge.prng && a.seedFile(d.forge.prng.needed, function (a, d) {
b.postMessage({
forge: {
prng: {
err: a,
bytes: d
}
}
})
})
})
};
return a
}
}
if ('function' !== typeof define) if ('object' ===
typeof module && module.exports) {
var E = !0;
define = function (d, b) {
b(require, module)
}
} else return 'undefined' === typeof forge && (forge = {
}),
w(forge);
var z,
F = function (d, b) {
b.exports = function (b) {
var l = z.map(function (b) {
return d(b)
}).concat(w);
b = b || {
};
b.defined = b.defined || {
};
if (b.defined.prng) return b.prng;
b.defined.prng = !0;
for (var e = 0; e < l.length; ++e) l[e](b);
return b.prng
}
},
x = define;
define = function (d, b) {
z = 'string' === typeof d ? b.slice(2)  : d.slice(2);
if (E) return delete define,
x.apply(null, Array.prototype.slice.call(arguments, 0));
define = x;
return define.apply(null, Array.prototype.slice.call(arguments, 0))
};
define(['require',
'module',
'./md',
'./util'], function () {
F.apply(null, Array.prototype.slice.call(arguments, 0))
})
}) ();
(function () {
function w(d) {
d.random && d.random.getBytes || function (b) {
var f = {
},
l = Array(4),
e = d.util.createBuffer();
f.formatKey = function (a) {
var b = d.util.createBuffer(a);
a = Array(4);
a[0] = b.getInt32();
a[1] = b.getInt32();
a[2] = b.getInt32();
a[3] = b.getInt32();
return d.aes._expandKey(a, !1)
};
f.formatSeed = function (a) {
var b = d.util.createBuffer(a);
a = Array(4);
a[0] = b.getInt32();
a[1] = b.getInt32();
a[2] = b.getInt32();
a[3] = b.getInt32();
return a
};
f.cipher = function (a, b) {
d.aes._updateBlock(a, b, l, !1);
e.putInt32(l[0]);
e.putInt32(l[1]);
e.putInt32(l[2]);
e.putInt32(l[3]);
return e.getBytes()
};
f.increment = function (a) {
++a[3];
return a
};
f.md = d.md.sha1;
var p = d.prng.create(f),
f = 'undefined' !== typeof process && process.versions && process.versions.node,
m = null;
if ('undefined' !== typeof window) {
var a = window.crypto || window.msCrypto;
a && a.getRandomValues && (m = function (b) {
return a.getRandomValues(b)
})
}
if (d.disableNativeCode || !f && !m) {
p.collectInt( + new Date, 32);
if ('undefined' !== typeof navigator) {
var f = '',
k;
for (k in navigator) try {
'string' == typeof navigator[k] && (f += navigator[k])
} catch (u) {
}
p.collect(f);
f = null
}
b && (b().mousemove(function (a) {
p.collectInt(a.clientX, 16);
p.collectInt(a.clientY, 16)
}), b().keypress(function (a) {
p.collectInt(a.charCode, 8)
}))
}
if (d.random) for (k in p) d.random[k] = p[k];
 else d.random = p;
d.random.getBytes = function (a, b) {
return d.random.generate(a, b)
};
d.random.getBytesSync = function (a) {
return d.random.generate(a)
}
}('undefined' !== typeof jQuery ? jQuery : null)
}
if ('function' !== typeof define) if ('object' === typeof module && module.exports) {
var E = !0;
define =
function (d, b) {
b(require, module)
}
} else return 'undefined' === typeof forge && (forge = {
}),
w(forge);
var z,
F = function (d, b) {
b.exports = function (b) {
var l = z.map(function (b) {
return d(b)
}).concat(w);
b = b || {
};
b.defined = b.defined || {
};
if (b.defined.random) return b.random;
b.defined.random = !0;
for (var e = 0; e < l.length; ++e) l[e](b);
return b.random
}
},
x = define;
define = function (d, b) {
z = 'string' === typeof d ? b.slice(2)  : d.slice(2);
if (E) return delete define,
x.apply(null, Array.prototype.slice.call(arguments, 0));
define = x;
return define.apply(null, Array.prototype.slice.call(arguments, 0))
};
define('require module ./aes ./md ./prng ./util'.split(' '), function () {
F.apply(null, Array.prototype.slice.call(arguments, 0))
})
}) ();
(function () {
function w(d) {
function b(a, b, c) {
var e = d.util.createBuffer();
b = Math.ceil(b.n.bitLength() / 8);
if (a.length > b - 11) throw {
message: 'Message is too long for PKCS#1 v1.5 padding.',
length: a.length,
max: b - 11
};
e.putByte(0);
e.putByte(c);
b = b - 3 - a.length;
if (0 === c || 1 === c) {
c = 0 === c ? 0 : 255;
for (var f = 0; f < b; ++f) e.putByte(c)
} else for (; 0 < b; ) {
for (var g = 0, k = d.random.getBytes(b), f = 0; f < b; ++f) c = k.charCodeAt(f),
0 === c ? ++g : e.putByte(c);
b = g
}
e.putByte(0);
e.putBytes(a);
return e
}
function f(a, b, c, e) {
b = Math.ceil(b.n.bitLength() /
8);
a = d.util.createBuffer(a);
var f = a.getByte(),
g = a.getByte();
if (0 !== f || c && 0 !== g && 1 !== g || !c && 2 != g || c && 0 === g && 'undefined' === typeof e) throw {
message: 'Encryption block is invalid.'
};
c = 0;
if (0 === g) for (c = b - 3 - e, e = 0; e < c; ++e) {
if (0 !== a.getByte()) throw {
message: 'Encryption block is invalid.'
};
} else if (1 === g) for (c = 0; 1 < a.length(); ) {
if (255 !== a.getByte()) {
--a.read;
break
}
++c
} else if (2 === g) for (c = 0; 1 < a.length(); ) {
if (0 === a.getByte()) {
--a.read;
break
}
++c
}
if (0 !== a.getByte() || c !== b - 3 - a.length()) throw {
message: 'Encryption block is invalid.'
};
return a.getBytes()
}
function l(a, b, c) {
function e() {
p = Math.max(1, p);
f(a.pBits, function (b, d) {
if (b) return c(b);
a.p = d;
f(a.qBits, g)
})
}
function f(b, c) {
function d() {
var c = b - 1,
e = new m(b, a.rng);
e.testBit(c) || e.bitwiseTo(m.ONE.shiftLeft(c), x, e);
e.dAddOffset(31 - e.mod(w).byteValue(), 0);
return e
}
function e(f) {
if (!s) {
--n;
var k = f.data;
if (k.found) {
for (f = 0; f < g.length; ++f) g[f].terminate();
s = !0;
return c(null, new m(k.prime, 16))
}
l.bitLength() > b && (l = d());
k = l.toString(16);
f.target.postMessage({
e: a.eInt,
hex: k,
workLoad: q
});
l.dAddOffset(r, 0)
}
}
for (var g = [
], k = 0; k < p; ++k) g[k] = new Worker(u);
for (var n = p, l = d(), k = 0; k < p; ++k) g[k].addEventListener('message', e);
var s = !1
}
function g(b, d) {
a.q = d;
if (0 > a.p.compareTo(a.q)) {
var n = a.p;
a.p = a.q;
a.q = n
}
a.p1 = a.p.subtract(m.ONE);
a.q1 = a.q.subtract(m.ONE);
a.phi = a.p1.multiply(a.q1);
0 !== a.phi.gcd(a.e).compareTo(m.ONE) ? (a.p = a.q = null, e())  : (a.n = a.p.multiply(a.q), a.n.bitLength() !== a.bits ? (a.q = null, f(a.qBits, g))  : (n = a.e.modInverse(a.phi), a.keys = {
privateKey: k.rsa.setPrivateKey(a.n, a.e, n, a.p, a.q, n.mod(a.p1), n.mod(a.q1), a.q.modInverse(a.p)),
publicKey: k.rsa.setPublicKey(a.n, a.e)
}, c(null, a.keys)))
}
'function' === typeof b && (c = b, b = {
});
if ('undefined' === typeof Worker) {
var l = function () {
if (k.rsa.stepKeyPairGenerationState(a, 10)) return c(null, a.keys);
d.util.setImmediate(l)
};
return l()
}
var p = b.workers || 2,
q = b.workLoad || 100,
r = 30 * q / 8,
u = b.workerScript || 'forge/prime.worker.js',
w = new m(null);
w.fromInt(30);
var x = function (a, b) {
return a | b
};
if ( - 1 === p) return d.util.estimateCores(function (a, b) {
a && (b = 2);
p = b - 1;
e()
});
e()
}
function e(a) {
a =
a.toString(16);
'8' <= a[0] && (a = '00' + a);
return d.util.hexToBytes(a)
}
function p(a) {
return 100 >= a ? 27 : 150 >= a ? 18 : 200 >= a ? 15 : 250 >= a ? 12 : 300 >= a ? 9 : 350 >= a ? 8 : 400 >= a ? 7 : 500 >= a ? 6 : 600 >= a ? 5 : 800 >= a ? 4 : 1250 >= a ? 3 : 2
}
if ('undefined' === typeof m) var m = d.jsbn.BigInteger;
var a = d.asn1;
d.pki = d.pki || {
};
d.pki.rsa = d.rsa = d.rsa || {
};
var k = d.pki,
u = [
6,
4,
2,
4,
2,
4,
6,
2
],
g = {
name: 'PrivateKeyInfo',
tagClass: a.Class.UNIVERSAL,
type: a.Type.SEQUENCE,
constructed: !0,
value: [
{
name: 'PrivateKeyInfo.version',
tagClass: a.Class.UNIVERSAL,
type: a.Type.INTEGER,
constructed: !1,
capture: 'privateKeyVersion'
},
{
name: 'PrivateKeyInfo.privateKeyAlgorithm',
tagClass: a.Class.UNIVERSAL,
type: a.Type.SEQUENCE,
constructed: !0,
value: [
{
name: 'AlgorithmIdentifier.algorithm',
tagClass: a.Class.UNIVERSAL,
type: a.Type.OID,
constructed: !1,
capture: 'privateKeyOid'
}
]
},
{
name: 'PrivateKeyInfo',
tagClass: a.Class.UNIVERSAL,
type: a.Type.OCTETSTRING,
constructed: !1,
capture: 'privateKey'
}
]
},
q = {
name: 'RSAPrivateKey',
tagClass: a.Class.UNIVERSAL,
type: a.Type.SEQUENCE,
constructed: !0,
value: [
{
name: 'RSAPrivateKey.version',
tagClass: a.Class.UNIVERSAL,
type: a.Type.INTEGER,
constructed: !1,
capture: 'privateKeyVersion'
},
{
name: 'RSAPrivateKey.modulus',
tagClass: a.Class.UNIVERSAL,
type: a.Type.INTEGER,
constructed: !1,
capture: 'privateKeyModulus'
},
{
name: 'RSAPrivateKey.publicExponent',
tagClass: a.Class.UNIVERSAL,
type: a.Type.INTEGER,
constructed: !1,
capture: 'privateKeyPublicExponent'
},
{
name: 'RSAPrivateKey.privateExponent',
tagClass: a.Class.UNIVERSAL,
type: a.Type.INTEGER,
constructed: !1,
capture: 'privateKeyPrivateExponent'
},
{
name: 'RSAPrivateKey.prime1',
tagClass: a.Class.UNIVERSAL,
type: a.Type.INTEGER,
constructed: !1,
capture: 'privateKeyPrime1'
},
{
name: 'RSAPrivateKey.prime2',
tagClass: a.Class.UNIVERSAL,
type: a.Type.INTEGER,
constructed: !1,
capture: 'privateKeyPrime2'
},
{
name: 'RSAPrivateKey.exponent1',
tagClass: a.Class.UNIVERSAL,
type: a.Type.INTEGER,
constructed: !1,
capture: 'privateKeyExponent1'
},
{
name: 'RSAPrivateKey.exponent2',
tagClass: a.Class.UNIVERSAL,
type: a.Type.INTEGER,
constructed: !1,
capture: 'privateKeyExponent2'
},
{
name: 'RSAPrivateKey.coefficient',
tagClass: a.Class.UNIVERSAL,
type: a.Type.INTEGER,
constructed: !1,
capture: 'privateKeyCoefficient'
}
]
},
c = {
name: 'RSAPublicKey',
tagClass: a.Class.UNIVERSAL,
type: a.Type.SEQUENCE,
constructed: !0,
value: [
{
name: 'RSAPublicKey.modulus',
tagClass: a.Class.UNIVERSAL,
type: a.Type.INTEGER,
constructed: !1,
capture: 'publicKeyModulus'
},
{
name: 'RSAPublicKey.exponent',
tagClass: a.Class.UNIVERSAL,
type: a.Type.INTEGER,
constructed: !1,
capture: 'publicKeyExponent'
}
]
},
w = d.pki.rsa.publicKeyValidator = {
name: 'SubjectPublicKeyInfo',
tagClass: a.Class.UNIVERSAL,
type: a.Type.SEQUENCE,
constructed: !0,
captureAsn1: 'subjectPublicKeyInfo',
value: [
{
name: 'SubjectPublicKeyInfo.AlgorithmIdentifier',
tagClass: a.Class.UNIVERSAL,
type: a.Type.SEQUENCE,
constructed: !0,
value: [
{
name: 'AlgorithmIdentifier.algorithm',
tagClass: a.Class.UNIVERSAL,
type: a.Type.OID,
constructed: !1,
capture: 'publicKeyOid'
}
]
},
{
name: 'SubjectPublicKeyInfo.subjectPublicKey',
tagClass: a.Class.UNIVERSAL,
type: a.Type.BITSTRING,
constructed: !1,
value: [
{
name: 'SubjectPublicKeyInfo.subjectPublicKey.RSAPublicKey',
tagClass: a.Class.UNIVERSAL,
type: a.Type.SEQUENCE,
constructed: !0,
optional: !0,
captureAsn1: 'rsaPublicKey'
}
]
}
]
},
x = function (b) {
var c;
if (b.algorithm in k.oids) c = k.oids[b.algorithm];
 else throw {
message: 'Unknown message digest algorithm.',
algorithm: b.algorithm
};
var d = a.oidToDer(c).getBytes();
c = a.create(a.Class.UNIVERSAL, a.Type.SEQUENCE, !0, [
]);
var e = a.create(a.Class.UNIVERSAL, a.Type.SEQUENCE, !0, [
]);
e.value.push(a.create(a.Class.UNIVERSAL, a.Type.OID, !1, d));
e.value.push(a.create(a.Class.UNIVERSAL, a.Type.NULL, !1, ''));
b = a.create(a.Class.UNIVERSAL, a.Type.OCTETSTRING, !1, b.digest().getBytes());
c.value.push(e);
c.value.push(b);
return a.toDer(c).getBytes()
},
r = function (a, b, c) {
if (c) b = a.modPow(b.e, b.n);
 else if (b.p && b.q) {
b.dP || (b.dP = b.d.mod(b.p.subtract(m.ONE)));
b.dQ || (b.dQ = b.d.mod(b.q.subtract(m.ONE)));
b.qInv || (b.qInv = b.q.modInverse(b.p));
c = a.mod(b.p).modPow(b.dP, b.p);
for (a = a.mod(b.q).modPow(b.dQ, b.q); 0 > c.compareTo(a); ) c = c.add(b.p);
b = c.subtract(a).multiply(b.qInv).mod(b.p).multiply(b.q).add(a)
} else b = a.modPow(b.d, b.n);
return b
};
k.rsa.encrypt = function (a, c, e) {
var f = e,
g = Math.ceil(c.n.bitLength() / 8);
!1 !== e && !0 !== e ? (f = 2 === e, e = b(a, c, e))  : (e = d.util.createBuffer(), e.putBytes(a));
a = new m(e.toHex(), 16);
c = r(a, c, f).toString(16);
f = d.util.createBuffer();
for (g -= Math.ceil(c.length / 2); 0 < g; ) f.putByte(0),
--g;
f.putBytes(d.util.hexToBytes(c));
return f.getBytes()
};
k.rsa.decrypt = function (a, b, c, e) {
var g = Math.ceil(b.n.bitLength() / 8);
if (a.length !== g) throw {
message: 'Encrypted message length is invalid.',
length: a.length,
expected: g
};
a = new m(d.util.createBuffer(a).toHex(), 16);
if (0 <= a.compareTo(b.n)) throw {
message: 'Encrypted message is invalid.'
};
a = r(a, b, c).toString(16);
for (var k = d.util.createBuffer(), g = g - Math.ceil(a.length / 2); 0 < g; ) k.putByte(0),
--g;
k.putBytes(d.util.hexToBytes(a));
return !1 !== e ? f(k.getBytes(), b, c)  : k.getBytes()
};
k.rsa.createKeyPairGenerationState = function (a, b) {
'string' === typeof a && (a = parseInt(a, 10));
a = a || 2048;
var c = {
state: 0,
bits: a,
rng: {
nextBytes: function (a) {
for (var b = d.random.getBytes(a.length), c = 0; c < a.length; ++c) a[c] = b.charCodeAt(c)
}
},
eInt: b || 65537,
e: new m(null),
p: null,
q: null,
qBits: a >> 1,
pBits: a - (a >> 1),
pqState: 0,
num: null,
keys: null
};
c.e.fromInt(c.eInt);
return c
};
k.rsa.stepKeyPairGenerationState = function (a, b) {
var c = new m(null);
c.fromInt(30);
for (var d = 0, e = function (a, b) {
return a | b
}, f = + new Date, g, l = 0; null === a.keys && (0 >= b || l < b); ) {
if (0 === a.state) {
g = null === a.p ? a.pBits : a.qBits;
var q = g - 1;
0 === a.pqState ? (a.num = new m(g, a.rng), a.num.testBit(q) || a.num.bitwiseTo(m.ONE.shiftLeft(q), e, a.num), a.num.dAddOffset(31 - a.num.mod(c).byteValue(), 0), d = 0, ++a.pqState)  : 1 === a.pqState ? a.num.bitLength() >
g ? a.pqState = 0 : a.num.isProbablePrime(p(a.num.bitLength())) ? ++a.pqState : a.num.dAddOffset(u[d++ % 8], 0)  : 2 === a.pqState ? a.pqState = 0 === a.num.subtract(m.ONE).gcd(a.e).compareTo(m.ONE) ? 3 : 0 : 3 === a.pqState && (a.pqState = 0, null === a.p ? a.p = a.num : a.q = a.num, null !== a.p && null !== a.q && ++a.state, a.num = null)
} else 1 === a.state ? (0 > a.p.compareTo(a.q) && (a.num = a.p, a.p = a.q, a.q = a.num), ++a.state)  : 2 === a.state ? (a.p1 = a.p.subtract(m.ONE), a.q1 = a.q.subtract(m.ONE), a.phi = a.p1.multiply(a.q1), ++a.state)  : 3 === a.state ? 0 === a.phi.gcd(a.e).compareTo(m.ONE) ?
++a.state : (a.p = null, a.q = null, a.state = 0)  : 4 === a.state ? (a.n = a.p.multiply(a.q), a.n.bitLength() === a.bits ? ++a.state : (a.q = null, a.state = 0))  : 5 === a.state && (g = a.e.modInverse(a.phi), a.keys = {
privateKey: k.rsa.setPrivateKey(a.n, a.e, g, a.p, a.q, g.mod(a.p1), g.mod(a.q1), a.q.modInverse(a.p)),
publicKey: k.rsa.setPublicKey(a.n, a.e)
});
g = + new Date;
l += g - f;
f = g
}
return null !== a.keys
};
k.rsa.generateKeyPair = function (a, b, c, d) {
1 === arguments.length ? 'object' === typeof a ? (c = a, a = void 0)  : 'function' === typeof a && (d = a, a = void 0)  : 2 === arguments.length ? ('number' === typeof a ? 'function' === typeof b ? d = b : c = b : (c = a, d = b, a = void 0), b = void 0)  : 3 === arguments.length && ('number' === typeof b ? 'function' === typeof c && (d = c, c = void 0)  : (d = c, c = b, b = void 0));
c = c || {
};
void 0 === a && (a = c.bits || 2048);
void 0 === b && (b = c.e || 65537);
var e = k.rsa.createKeyPairGenerationState(a, b);
if (!d) return k.rsa.stepKeyPairGenerationState(e, 0),
e.keys;
l(e, c, d)
};
k.setRsaPublicKey = k.rsa.setPublicKey = function (c, e) {
var g = {
n: c,
e: e,
encrypt: function (a, c, e) {
'string' === typeof c ? c = c.toUpperCase()  : void 0 === c && (c =
'RSAES-PKCS1-V1_5');
if ('RSAES-PKCS1-V1_5' === c) c = {
encode: function (a, c, d) {
return b(a, c, 2).getBytes()
}
};
 else if ('RSA-OAEP' === c || 'RSAES-OAEP' === c) c = {
encode: function (a, b) {
return d.pkcs1.encode_rsa_oaep(b, a, e)
}
};
 else if ( - 1 !== d.util.inArray(['RAW',
'NONE',
'NULL',
null], c)) c = {
encode: function (a) {
return a
}
};
 else throw {
message: 'Unsupported encryption scheme: "' + c + '".'
};
a = c.encode(a, g, !0);
return k.rsa.encrypt(a, g, !0)
},
verify: function (b, c, d) {
'string' === typeof d ? d = d.toUpperCase()  : void 0 === d && (d = 'RSASSA-PKCS1-V1_5');
if ('RSASSA-PKCS1-V1_5' === d) d = {
verify: function (b, c) {
c = f(c, g, !0);
var d = a.fromDer(c);
return b === d.value[1].value
}
};
 else if ('NONE' === d || 'NULL' === d || null === d) d = {
verify: function (a, b) {
b = f(b, g, !0);
return a === b
}
};
c = k.rsa.decrypt(c, g, !0, !1);
return d.verify(b, c, g.n.bitLength())
}
};
return g
};
k.setRsaPrivateKey = k.rsa.setPrivateKey = function (a, b, c, e, g, l, m, p) {
var q = {
n: a,
e: b,
d: c,
p: e,
q: g,
dP: l,
dQ: m,
qInv: p,
decrypt: function (a, b, c) {
'string' === typeof b ? b = b.toUpperCase()  : void 0 === b && (b = 'RSAES-PKCS1-V1_5');
a = k.rsa.decrypt(a, q, !1, !1);
if ('RSAES-PKCS1-V1_5' === b) b = {
decode: f
};
 else if ('RSA-OAEP' === b || 'RSAES-OAEP' === b) b = {
decode: function (a, b) {
return d.pkcs1.decode_rsa_oaep(b, a, c)
}
};
 else if ( - 1 !== d.util.inArray(['RAW',
'NONE',
'NULL',
null], b)) b = {
decode: function (a) {
return a
}
};
 else throw {
message: 'Unsupported encryption scheme: "' + b + '".'
};
return b.decode(a, q, !1)
},
sign: function (a, b) {
var c = !1;
'string' === typeof b && (b = b.toUpperCase());
if (void 0 === b || 'RSASSA-PKCS1-V1_5' === b) b = {
encode: x
},
c = 1;
 else if ('NONE' === b || 'NULL' === b || null === b) b = {
encode: function () {
return a
}
},
c = 1;
var d = b.encode(a, q.n.bitLength());
return k.rsa.encrypt(d, q, c)
}
};
return q
};
k.wrapRsaPrivateKey = function (b) {
return a.create(a.Class.UNIVERSAL, a.Type.SEQUENCE, !0, [
a.create(a.Class.UNIVERSAL, a.Type.INTEGER, !1, a.integerToDer(0).getBytes()),
a.create(a.Class.UNIVERSAL, a.Type.SEQUENCE, !0, [
a.create(a.Class.UNIVERSAL, a.Type.OID, !1, a.oidToDer(k.oids.rsaEncryption).getBytes()),
a.create(a.Class.UNIVERSAL, a.Type.NULL, !1, '')
]),
a.create(a.Class.UNIVERSAL, a.Type.OCTETSTRING, !1, a.toDer(b).getBytes())
])
};
k.privateKeyFromAsn1 =
function (b) {
var c = {
},
e = [
];
a.validate(b, g, c, e) && (b = a.fromDer(d.util.createBuffer(c.privateKey)));
c = {
};
e = [
];
if (!a.validate(b, q, c, e)) throw {
message: 'Cannot read private key. ASN.1 object does not contain an RSAPrivateKey.',
errors: e
};
var f,
l,
p,
r,
u;
b = d.util.createBuffer(c.privateKeyModulus).toHex();
e = d.util.createBuffer(c.privateKeyPublicExponent).toHex();
f = d.util.createBuffer(c.privateKeyPrivateExponent).toHex();
l = d.util.createBuffer(c.privateKeyPrime1).toHex();
p = d.util.createBuffer(c.privateKeyPrime2).toHex();
r = d.util.createBuffer(c.privateKeyExponent1).toHex();
u = d.util.createBuffer(c.privateKeyExponent2).toHex();
c = d.util.createBuffer(c.privateKeyCoefficient).toHex();
return k.setRsaPrivateKey(new m(b, 16), new m(e, 16), new m(f, 16), new m(l, 16), new m(p, 16), new m(r, 16), new m(u, 16), new m(c, 16))
};
k.privateKeyToAsn1 = k.privateKeyToRSAPrivateKey = function (b) {
return a.create(a.Class.UNIVERSAL, a.Type.SEQUENCE, !0, [
a.create(a.Class.UNIVERSAL, a.Type.INTEGER, !1, a.integerToDer(0).getBytes()),
a.create(a.Class.UNIVERSAL, a.Type.INTEGER, !1, e(b.n)),
a.create(a.Class.UNIVERSAL, a.Type.INTEGER, !1, e(b.e)),
a.create(a.Class.UNIVERSAL, a.Type.INTEGER, !1, e(b.d)),
a.create(a.Class.UNIVERSAL, a.Type.INTEGER, !1, e(b.p)),
a.create(a.Class.UNIVERSAL, a.Type.INTEGER, !1, e(b.q)),
a.create(a.Class.UNIVERSAL, a.Type.INTEGER, !1, e(b.dP)),
a.create(a.Class.UNIVERSAL, a.Type.INTEGER, !1, e(b.dQ)),
a.create(a.Class.UNIVERSAL, a.Type.INTEGER, !1, e(b.qInv))
])
};
k.publicKeyFromAsn1 = function (b) {
var e = {
},
f = [
];
if (a.validate(b, w, e, f)) {
b = a.derToOid(e.publicKeyOid);
if (b !== k.oids.rsaEncryption) throw {
message: 'Cannot read public key. Unknown OID.',
oid: b
};
b = e.rsaPublicKey
}
f = [
];
if (!a.validate(b, c, e, f)) throw {
message: 'Cannot read public key. ASN.1 object does not contain an RSAPublicKey.',
errors: f
};
b = d.util.createBuffer(e.publicKeyModulus).toHex();
e = d.util.createBuffer(e.publicKeyExponent).toHex();
return k.setRsaPublicKey(new m(b, 16), new m(e, 16))
};
k.publicKeyToAsn1 = k.publicKeyToSubjectPublicKeyInfo = function (b) {
return a.create(a.Class.UNIVERSAL, a.Type.SEQUENCE, !0, [
a.create(a.Class.UNIVERSAL, a.Type.SEQUENCE, !0, [
a.create(a.Class.UNIVERSAL, a.Type.OID, !1, a.oidToDer(k.oids.rsaEncryption).getBytes()),
a.create(a.Class.UNIVERSAL, a.Type.NULL, !1, '')
]),
a.create(a.Class.UNIVERSAL, a.Type.BITSTRING, !1, [
k.publicKeyToRSAPublicKey(b)
])
])
};
k.publicKeyToRSAPublicKey = function (b) {
return a.create(a.Class.UNIVERSAL, a.Type.SEQUENCE, !0, [
a.create(a.Class.UNIVERSAL, a.Type.INTEGER, !1, e(b.n)),
a.create(a.Class.UNIVERSAL, a.Type.INTEGER, !1, e(b.e))
])
}
}
if ('function' !== typeof define) if ('object' === typeof module && module.exports) {
var E = !0;
define = function (d, b) {
b(require, module)
}
} else return 'undefined' ===
typeof forge && (forge = {
}),
w(forge);
var z,
F = function (d, b) {
b.exports = function (b) {
var l = z.map(function (b) {
return d(b)
}).concat(w);
b = b || {
};
b.defined = b.defined || {
};
if (b.defined.rsa) return b.rsa;
b.defined.rsa = !0;
for (var e = 0; e < l.length; ++e) l[e](b);
return b.rsa
}
},
x = define;
define = function (d, b) {
z = 'string' === typeof d ? b.slice(2)  : d.slice(2);
if (E) return delete define,
x.apply(null, Array.prototype.slice.call(arguments, 0));
define = x;
return define.apply(null, Array.prototype.slice.call(arguments, 0))
};
define('require module ./asn1 ./oids ./random ./util ./jsbn ./pkcs1'.split(' '), function () {
F.apply(null, Array.prototype.slice.call(arguments, 0))
})
}) ();
(function () {
function w(d) {
var b = d.asn1,
f = d.pki = d.pki || {
};
f.pemToDer = function (b) {
b = d.pem.decode(b) [0];
if (b.procType && 'ENCRYPTED' === b.procType.type) throw {
message: 'Could not convert PEM to DER; PEM is encrypted.'
};
return d.util.createBuffer(b.body)
};
f.privateKeyFromPem = function (l) {
l = d.pem.decode(l) [0];
if ('PRIVATE KEY' !== l.type && 'RSA PRIVATE KEY' !== l.type) throw {
message: 'Could not convert private key from PEM; PEM header type is not "PRIVATE KEY" or "RSA PRIVATE KEY".',
headerType: l.type
};
if (l.procType &&
'ENCRYPTED' === l.procType.type) throw {
message: 'Could not convert private key from PEM; PEM is encrypted.'
};
l = b.fromDer(l.body);
return f.privateKeyFromAsn1(l)
};
f.privateKeyToPem = function (l, e) {
var p = {
type: 'RSA PRIVATE KEY',
body: b.toDer(f.privateKeyToAsn1(l)).getBytes()
};
return d.pem.encode(p, {
maxline: e
})
};
f.privateKeyInfoToPem = function (f, e) {
var p = {
type: 'PRIVATE KEY',
body: b.toDer(f).getBytes()
};
return d.pem.encode(p, {
maxline: e
})
}
}
if ('function' !== typeof define) if ('object' === typeof module && module.exports) {
var E =
!0;
define = function (d, b) {
b(require, module)
}
} else return 'undefined' === typeof forge && (forge = {
}),
w(forge);
var z,
F = function (d, b) {
b.exports = function (b) {
var l = z.map(function (b) {
return d(b)
}).concat(w);
b = b || {
};
b.defined = b.defined || {
};
if (b.defined.pki) return b.pki;
b.defined.pki = !0;
for (var e = 0; e < l.length; ++e) l[e](b);
return b.pki
}
},
x = define;
define = function (d, b) {
z = 'string' === typeof d ? b.slice(2)  : d.slice(2);
if (E) return delete define,
x.apply(null, Array.prototype.slice.call(arguments, 0));
define = x;
return define.apply(null, Array.prototype.slice.call(arguments, 0))
};
define('require module ./asn1 ./oids ./pbe ./pem ./pbkdf2 ./pkcs12 ./pss ./rsa ./util ./x509'.split(' '), function () {
F.apply(null, Array.prototype.slice.call(arguments, 0))
})
}) ();
;
/*! jQuery v1.11.3 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */
!function (a, b) {
'object' == typeof module && 'object' == typeof module.exports ? module.exports = a.document ? b(a, !0)  : function (a) {
if (!a.document) throw new Error('jQuery requires a window with a document');
return b(a)
}
 : b(a)
}('undefined' != typeof window ? window : this, function (a, b) {
var c = [
],
d = c.slice,
e = c.concat,
f = c.push,
g = c.indexOf,
h = {
},
i = h.toString,
j = h.hasOwnProperty,
k = {
},
l = '1.11.3',
m = function (a, b) {
return new m.fn.init(a, b)
},
n = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
o = /^-ms-/,
p = /-([\da-z])/gi,
q = function (a, b) {
return b.toUpperCase()
};
m.fn = m.prototype = {
jquery: l,
constructor: m,
selector: '',
length: 0,
toArray: function () {
return d.call(this)
},
get: function (a) {
return null != a ? 0 > a ? this[a + this.length] : this[a] : d.call(this)
},
pushStack: function (a) {
var b = m.merge(this.constructor(), a);
return b.prevObject = this,
b.context = this.context,
b
},
each: function (a, b) {
return m.each(this, a, b)
},
map: function (a) {
return this.pushStack(m.map(this, function (b, c) {
return a.call(b, c, b)
}))
},
slice: function () {
return this.pushStack(d.apply(this, arguments))
},
first: function () {
return this.eq(0)
},
last: function () {
return this.eq( - 1)
},
eq: function (a) {
var b = this.length,
c = + a + (0 > a ? b : 0);
return this.pushStack(c >= 0 && b > c ? [
this[c]
] : [
])
},
end: function () {
return this.prevObject || this.constructor(null)
},
push: f,
sort: c.sort,
splice: c.splice
},
m.extend = m.fn.extend = function () {
var a,
b,
c,
d,
e,
f,
g = arguments[0] || {
},
h = 1,
i = arguments.length,
j = !1;
for ('boolean' == typeof g && (j = g, g = arguments[h] || {
}, h++), 'object' == typeof g || m.isFunction(g) || (g = {
}), h === i && (g = this, h--); i > h; h++) if (null != (e = arguments[h])) for (d in e) a = g[d],
c = e[d],
g !== c && (j && c && (m.isPlainObject(c) || (b = m.isArray(c))) ? (b ? (b = !1, f = a && m.isArray(a) ? a : [
])  : f = a && m.isPlainObject(a) ? a : {
}, g[d] = m.extend(j, f, c))  : void 0 !== c && (g[d] = c));
return g
},
m.extend({
expando: 'jQuery' + (l + Math.random()).replace(/\D/g, ''),
isReady: !0,
error: function (a) {
throw new Error(a)
},
noop: function () {
},
isFunction: function (a) {
return 'function' === m.type(a)
},
isArray: Array.isArray || function (a) {
return 'array' === m.type(a)
},
isWindow: function (a) {
return null != a && a == a.window
},
isNumeric: function (a) {
return !m.isArray(a) && a - parseFloat(a) + 1 >= 0
},
isEmptyObject: function (a) {
var b;
for (b in a) return !1;
return !0
},
isPlainObject: function (a) {
var b;
if (!a || 'object' !== m.type(a) || a.nodeType || m.isWindow(a)) return !1;
try {
if (a.constructor && !j.call(a, 'constructor') && !j.call(a.constructor.prototype, 'isPrototypeOf')) return !1
} catch (c) {
return !1
}
if (k.ownLast) for (b in a) return j.call(a, b);
for (b in a);
return void 0 === b || j.call(a, b)
},
type: function (a) {
return null == a ? a + '' : 'object' == typeof a || 'function' == typeof a ? h[i.call(a)] || 'object' : typeof a
},
globalEval: function (b) {
b && m.trim(b) && (a.execScript || function (b) {
a.eval.call(a, b)
}) (b)
},
camelCase: function (a) {
return a.replace(o, 'ms-').replace(p, q)
},
nodeName: function (a, b) {
return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
},
each: function (a, b, c) {
var d,
e = 0,
f = a.length,
g = r(a);
if (c) {
if (g) {
for (; f > e; e++) if (d = b.apply(a[e], c), d === !1) break
} else for (e in a) if (d = b.apply(a[e], c), d === !1) break
} else if (g) {
for (; f > e; e++) if (d = b.call(a[e], e, a[e]), d === !1) break
} else for (e in a) if (d = b.call(a[e], e, a[e]), d === !1) break;
return a
},
trim: function (a) {
return null == a ? '' : (a + '').replace(n, '')
},
makeArray: function (a, b) {
var c = b || [];
return null != a && (r(Object(a)) ? m.merge(c, 'string' == typeof a ? [
a
] : a)  : f.call(c, a)),
c
},
inArray: function (a, b, c) {
var d;
if (b) {
if (g) return g.call(b, a, c);
for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c)  : c : 0; d > c; c++) if (c in b && b[c] === a) return c
}
return - 1
},
merge: function (a, b) {
var c = + b.length,
d = 0,
e = a.length;
while (c > d) a[e++] = b[d++];
if (c !== c) while (void 0 !== b[d]) a[e++] = b[d++];
return a.length = e,
a
},
grep: function (a, b, c) {
for (var d, e = [
], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f),
d !== h && e.push(a[f]);
return e
},
map: function (a, b, c) {
var d,
f = 0,
g = a.length,
h = r(a),
i = [
];
if (h) for (; g > f; f++) d = b(a[f], f, c),
null != d && i.push(d);
 else for (f in a) d = b(a[f], f, c),
null != d && i.push(d);
return e.apply([], i)
},
guid: 1,
proxy: function (a, b) {
var c,
e,
f;
return 'string' == typeof b && (f = a[b], b = a, a = f),
m.isFunction(a) ? (c = d.call(arguments, 2), e = function () {
return a.apply(b || this, c.concat(d.call(arguments)))
}, e.guid = a.guid = a.guid || m.guid++, e)  : void 0
},
now: function () {
return + new Date
},
support: k
}),
m.each('Boolean Number String Function Array Date RegExp Object Error'.split(' '), function (a, b) {
h['[object ' + b + ']'] = b.toLowerCase()
});
function r(a) {
var b = 'length' in a && a.length,
c = m.type(a);
return 'function' === c || m.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : 'array' === c || 0 === b || 'number' == typeof b && b > 0 && b - 1 in a
}
var s = function (a) {
var b,
c,
d,
e,
f,
g,
h,
i,
j,
k,
l,
m,
n,
o,
p,
q,
r,
s,
t,
u = 'sizzle' + 1 * new Date,
v = a.document,
w = 0,
x = 0,
y = ha(),
z = ha(),
A = ha(),
B = function (a, b) {
return a === b && (l = !0),
0
},
C = 1 << 31,
D = {
}.hasOwnProperty,
E = [
],
F = E.pop,
G = E.push,
H = E.push,
I = E.slice,
J = function (a, b) {
for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;
return - 1
},
K = 'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',
L = '[\\x20\\t\\r\\n\\f]',
M = '(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+',
N = M.replace('w', 'w#'),
O = '\\[' + L + '*(' + M + ')(?:' + L + '*([*^$|!~]?=)' + L + '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' + N + '))|)' + L + '*\\]',
P = ':(' + M + ')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|' + O + ')*)|.*)\\)|)',
Q = new RegExp(L + '+', 'g'),
R = new RegExp('^' + L + '+|((?:^|[^\\\\])(?:\\\\.)*)' + L + '+$', 'g'),
S = new RegExp('^' + L + '*,' + L + '*'),
T = new RegExp('^' + L + '*([>+~]|' + L + ')' + L + '*'),
U = new RegExp('=' + L + '*([^\\]\'"]*?)' + L + '*\\]', 'g'),
V = new RegExp(P),
W = new RegExp('^' + N + '$'),
X = {
ID: new RegExp('^#(' + M + ')'),
CLASS: new RegExp('^\\.(' + M + ')'),
TAG: new RegExp('^(' + M.replace('w', 'w*') + ')'),
ATTR: new RegExp('^' + O),
PSEUDO: new RegExp('^' + P),
CHILD: new RegExp('^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' + L + '*(even|odd|(([+-]|)(\\d*)n|)' + L + '*(?:([+-]|)' + L + '*(\\d+)|))' + L + '*\\)|)', 'i'),
bool: new RegExp('^(?:' + K + ')$', 'i'),
needsContext: new RegExp('^' + L + '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' + L + '*((?:-\\d)?\\d*)' + L + '*\\)|)(?=[^-]|$)', 'i')
},
Y = /^(?:input|select|textarea|button)$/i,
Z = /^h\d$/i,
$ = /^[^{]+\{\s*\[native \w/,
_ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
aa = /[+~]/,
ba = /'|\\/g,
ca = new RegExp('\\\\([\\da-f]{1,6}' + L + '?|(' + L + ')|.)', 'ig'),
da = function (a, b, c) {
var d = '0x' + b - 65536;
return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536)  : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
},
ea = function () {
m()
};
try {
H.apply(E = I.call(v.childNodes), v.childNodes),
E[v.childNodes.length].nodeType
} catch (fa) {
H = {
apply: E.length ? function (a, b) {
G.apply(a, I.call(b))
}
 : function (a, b) {
var c = a.length,
d = 0;
while (a[c++] = b[d++]);
a.length = c - 1
}
}
}
function ga(a, b, d, e) {
var f,
h,
j,
k,
l,
o,
r,
s,
w,
x;
if ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, d = d || [], k = b.nodeType, 'string' != typeof a || !a || 1 !== k && 9 !== k && 11 !== k) return d;
if (!e && p) {
if (11 !== k && (f = _.exec(a))) if (j = f[1]) {
if (9 === k) {
if (h = b.getElementById(j), !h || !h.parentNode) return d;
if (h.id === j) return d.push(h),
d
} else if (b.ownerDocument && (h = b.ownerDocument.getElementById(j)) && t(b, h) && h.id === j) return d.push(h),
d
} else {
if (f[2]) return H.apply(d, b.getElementsByTagName(a)),
d;
if ((j = f[3]) && c.getElementsByClassName) return H.apply(d, b.getElementsByClassName(j)),
d
}
if (c.qsa && (!q || !q.test(a))) {
if (s = r = u, w = b, x = 1 !== k && a, 1 === k && 'object' !== b.nodeName.toLowerCase()) {
o = g(a),
(r = b.getAttribute('id')) ? s = r.replace(ba, '\\$&')  : b.setAttribute('id', s),
s = '[id=\'' + s + '\'] ',
l = o.length;
while (l--) o[l] = s + ra(o[l]);
w = aa.test(a) && pa(b.parentNode) || b,
x = o.join(',')
}
if (x) try {
return H.apply(d, w.querySelectorAll(x)),
d
} catch (y) {
} finally {
r || b.removeAttribute('id')
}
}
}
return i(a.replace(R, '$1'), b, d, e)
}
function ha() {
var a = [
];
function b(c, e) {
return a.push(c + ' ') > d.cacheLength && delete b[a.shift()],
b[c + ' '] = e
}
return b
}
function ia(a) {
return a[u] = !0,
a
}
function ja(a) {
var b = n.createElement('div');
try {
return !!a(b)
} catch (c) {
return !1
} finally {
b.parentNode && b.parentNode.removeChild(b),
b = null
}
}
function ka(a, b) {
var c = a.split('|'),
e = a.length;
while (e--) d.attrHandle[c[e]] = b
}
function la(a, b) {
var c = b && a,
d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || C) - (~a.sourceIndex || C);
if (d) return d;
if (c) while (c = c.nextSibling) if (c === b) return - 1;
return a ? 1 : - 1
}
function ma(a) {
return function (b) {
var c = b.nodeName.toLowerCase();
return 'input' === c && b.type === a
}
}
function na(a) {
return function (b) {
var c = b.nodeName.toLowerCase();
return ('input' === c || 'button' === c) && b.type === a
}
}
function oa(a) {
return ia(function (b) {
return b = + b,
ia(function (c, d) {
var e,
f = a([], c.length, b),
g = f.length;
while (g--) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
})
})
}
function pa(a) {
return a && 'undefined' != typeof a.getElementsByTagName && a
}
c = ga.support = {
},
f = ga.isXML = function (a) {
var b = a && (a.ownerDocument || a).documentElement;
return b ? 'HTML' !== b.nodeName : !1
},
m = ga.setDocument = function (a) {
var b,
e,
g = a ? a.ownerDocument || a : v;
return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = g.documentElement, e = g.defaultView, e && e !== e.top && (e.addEventListener ? e.addEventListener('unload', ea, !1)  : e.attachEvent && e.attachEvent('onunload', ea)), p = !f(g), c.attributes = ja(function (a) {
return a.className = 'i',
!a.getAttribute('className')
}), c.getElementsByTagName = ja(function (a) {
return a.appendChild(g.createComment('')),
!a.getElementsByTagName('*').length
}), c.getElementsByClassName = $.test(g.getElementsByClassName), c.getById = ja(function (a) {
return o.appendChild(a).id = u,
!g.getElementsByName || !g.getElementsByName(u).length
}), c.getById ? (d.find.ID = function (a, b) {
if ('undefined' != typeof b.getElementById && p) {
var c = b.getElementById(a);
return c && c.parentNode ? [
c
] : [
]
}
}, d.filter.ID = function (a) {
var b = a.replace(ca, da);
return function (a) {
return a.getAttribute('id') === b
}
})  : (delete d.find.ID, d.filter.ID = function (a) {
var b = a.replace(ca, da);
return function (a) {
var c = 'undefined' != typeof a.getAttributeNode && a.getAttributeNode('id');
return c && c.value === b
}
}), d.find.TAG = c.getElementsByTagName ? function (a, b) {
return 'undefined' != typeof b.getElementsByTagName ? b.getElementsByTagName(a)  : c.qsa ? b.querySelectorAll(a)  : void 0
}
 : function (a, b) {
var c,
d = [
],
e = 0,
f = b.getElementsByTagName(a);
if ('*' === a) {
while (c = f[e++]) 1 === c.nodeType && d.push(c);
return d
}
return f
}, d.find.CLASS = c.getElementsByClassName && function (a, b) {
return p ? b.getElementsByClassName(a)  : void 0
}, r = [
], q = [
], (c.qsa = $.test(g.querySelectorAll)) && (ja(function (a) {
o.appendChild(a).innerHTML = '<a id=\'' + u + '\'></a><select id=\'' + u + '-\f]\' msallowcapture=\'\'><option selected=\'\'></option></select>',
a.querySelectorAll('[msallowcapture^=\'\']').length && q.push('[*^$]=' + L + '*(?:\'\'|"")'),
a.querySelectorAll('[selected]').length || q.push('\\[' + L + '*(?:value|' + K + ')'),
a.querySelectorAll('[id~=' + u + '-]').length || q.push('~='),
a.querySelectorAll(':checked').length || q.push(':checked'),
a.querySelectorAll('a#' + u + '+*').length || q.push('.#.+[+~]')
}), ja(function (a) {
var b = g.createElement('input');
b.setAttribute('type', 'hidden'),
a.appendChild(b).setAttribute('name', 'D'),
a.querySelectorAll('[name=d]').length && q.push('name' + L + '*[*^$|!~]?='),
a.querySelectorAll(':enabled').length || q.push(':enabled', ':disabled'),
a.querySelectorAll('*,:x'),
q.push(',.*:')
})), (c.matchesSelector = $.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ja(function (a) {
c.disconnectedMatch = s.call(a, 'div'),
s.call(a, '[s!=\'\']:x'),
r.push('!=', P)
}), q = q.length && new RegExp(q.join('|')), r = r.length && new RegExp(r.join('|')), b = $.test(o.compareDocumentPosition), t = b || $.test(o.contains) ? function (a, b) {
var c = 9 === a.nodeType ? a.documentElement : a,
d = b && b.parentNode;
return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d)  : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
}
 : function (a, b) {
if (b) while (b = b.parentNode) if (b === a) return !0;
return !1
}, B = b ? function (a, b) {
if (a === b) return l = !0,
0;
var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b)  : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === g || a.ownerDocument === v && t(v, a) ? - 1 : b === g || b.ownerDocument === v && t(v, b) ? 1 : k ? J(k, a) - J(k, b)  : 0 : 4 & d ? - 1 : 1)
}
 : function (a, b) {
if (a === b) return l = !0,
0;
var c,
d = 0,
e = a.parentNode,
f = b.parentNode,
h = [
a
],
i = [
b
];
if (!e || !f) return a === g ? - 1 : b === g ? 1 : e ? - 1 : f ? 1 : k ? J(k, a) - J(k, b)  : 0;
if (e === f) return la(a, b);
c = a;
while (c = c.parentNode) h.unshift(c);
c = b;
while (c = c.parentNode) i.unshift(c);
while (h[d] === i[d]) d++;
return d ? la(h[d], i[d])  : h[d] === v ? - 1 : i[d] === v ? 1 : 0
}, g)  : n
},
ga.matches = function (a, b) {
return ga(a, null, null, b)
},
ga.matchesSelector = function (a, b) {
if ((a.ownerDocument || a) !== n && m(a), b = b.replace(U, '=\'$1\']'), !(!c.matchesSelector || !p || r && r.test(b) || q && q.test(b))) try {
var d = s.call(a, b);
if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
} catch (e) {
}
return ga(b, n, null, [
a
]).length > 0
},
ga.contains = function (a, b) {
return (a.ownerDocument || a) !== n && m(a),
t(a, b)
},
ga.attr = function (a, b) {
(a.ownerDocument || a) !== n && m(a);
var e = d.attrHandle[b.toLowerCase()],
f = e && D.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p)  : void 0;
return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b)  : (f = a.getAttributeNode(b)) && f.specified ? f.value : null
},
ga.error = function (a) {
throw new Error('Syntax error, unrecognized expression: ' + a)
},
ga.uniqueSort = function (a) {
var b,
d = [
],
e = 0,
f = 0;
if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
while (b = a[f++]) b === a[f] && (e = d.push(f));
while (e--) a.splice(d[e], 1)
}
return k = null,
a
},
e = ga.getText = function (a) {
var b,
c = '',
d = 0,
f = a.nodeType;
if (f) {
if (1 === f || 9 === f || 11 === f) {
if ('string' == typeof a.textContent) return a.textContent;
for (a = a.firstChild; a; a = a.nextSibling) c += e(a)
} else if (3 === f || 4 === f) return a.nodeValue
} else while (b = a[d++]) c += e(b);
return c
},
d = ga.selectors = {
cacheLength: 50,
createPseudo: ia,
match: X,
attrHandle: {
},
find: {
},
relative: {
'>': {
dir: 'parentNode',
first: !0
},
' ': {
dir: 'parentNode'
},
'+': {
dir: 'previousSibling',
first: !0
},
'~': {
dir: 'previousSibling'
}
},
preFilter: {
ATTR: function (a) {
return a[1] = a[1].replace(ca, da),
a[3] = (a[3] || a[4] || a[5] || '').replace(ca, da),
'~=' === a[2] && (a[3] = ' ' + a[3] + ' '),
a.slice(0, 4)
},
CHILD: function (a) {
return a[1] = a[1].toLowerCase(),
'nth' === a[1].slice(0, 3) ? (a[3] || ga.error(a[0]), a[4] = + (a[4] ? a[5] + (a[6] || 1)  : 2 * ('even' === a[3] || 'odd' === a[3])), a[5] = + (a[7] + a[8] || 'odd' === a[3]))  : a[3] && ga.error(a[0]),
a
},
PSEUDO: function (a) {
var b,
c = !a[6] && a[2];
return X.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || '' : c && V.test(c) && (b = g(c, !0)) && (b = c.indexOf(')', c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
}
},
filter: {
TAG: function (a) {
var b = a.replace(ca, da).toLowerCase();
return '*' === a ? function () {
return !0
}
 : function (a) {
return a.nodeName && a.nodeName.toLowerCase() === b
}
},
CLASS: function (a) {
var b = y[a + ' '];
return b || (b = new RegExp('(^|' + L + ')' + a + '(' + L + '|$)')) && y(a, function (a) {
return b.test('string' == typeof a.className && a.className || 'undefined' != typeof a.getAttribute && a.getAttribute('class') || '')
})
},
ATTR: function (a, b, c) {
return function (d) {
var e = ga.attr(d, a);
return null == e ? '!=' === b : b ? (e += '', '=' === b ? e === c : '!=' === b ? e !== c : '^=' === b ? c && 0 === e.indexOf(c)  : '*=' === b ? c && e.indexOf(c) > - 1 : '$=' === b ? c && e.slice( - c.length) === c : '~=' === b ? (' ' + e.replace(Q, ' ') + ' ').indexOf(c) > - 1 : '|=' === b ? e === c || e.slice(0, c.length + 1) === c + '-' : !1)  : !0
}
},
CHILD: function (a, b, c, d, e) {
var f = 'nth' !== a.slice(0, 3),
g = 'last' !== a.slice( - 4),
h = 'of-type' === b;
return 1 === d && 0 === e ? function (a) {
return !!a.parentNode
}
 : function (b, c, i) {
var j,
k,
l,
m,
n,
o,
p = f !== g ? 'nextSibling' : 'previousSibling',
q = b.parentNode,
r = h && b.nodeName.toLowerCase(),
s = !i && !h;
if (q) {
if (f) {
while (p) {
l = b;
while (l = l[p]) if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
o = p = 'only' === a && !o && 'nextSibling'
}
return !0
}
if (o = [
g ? q.firstChild : q.lastChild
], g && s) {
k = q[u] || (q[u] = {
}),
j = k[a] || [],
n = j[0] === w && j[1],
m = j[0] === w && j[2],
l = n && q.childNodes[n];
while (l = ++n && l && l[p] || (m = n = 0) || o.pop()) if (1 === l.nodeType && ++m && l === b) {
k[a] = [
w,
n,
m
];
break
}
} else if (s && (j = (b[u] || (b[u] = {
})) [a]) && j[0] === w) m = j[1];
 else while (l = ++n && l && l[p] || (m = n = 0) || o.pop()) if ((h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) && ++m && (s && ((l[u] || (l[u] = {
})) [a] = [
w,
m
]), l === b)) break;
return m -= e,
m === d || m % d === 0 && m / d >= 0
}
}
},
PSEUDO: function (a, b) {
var c,
e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || ga.error('unsupported pseudo: ' + a);
return e[u] ? e(b)  : e.length > 1 ? (c = [
a,
a,
'',
b
], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ia(function (a, c) {
var d,
f = e(a, b),
g = f.length;
while (g--) d = J(a, f[g]),
a[d] = !(c[d] = f[g])
})  : function (a) {
return e(a, 0, c)
})  : e
}
},
pseudos: {
not: ia(function (a) {
var b = [
],
c = [
],
d = h(a.replace(R, '$1'));
return d[u] ? ia(function (a, b, c, e) {
var f,
g = d(a, null, e, [
]),
h = a.length;
while (h--) (f = g[h]) && (a[h] = !(b[h] = f))
})  : function (a, e, f) {
return b[0] = a,
d(b, null, f, c),
b[0] = null,
!c.pop()
}
}),
has: ia(function (a) {
return function (b) {
return ga(a, b).length > 0
}
}),
contains: ia(function (a) {
return a = a.replace(ca, da),
function (b) {
return (b.textContent || b.innerText || e(b)).indexOf(a) > - 1
}
}),
lang: ia(function (a) {
return W.test(a || '') || ga.error('unsupported lang: ' + a),
a = a.replace(ca, da).toLowerCase(),
function (b) {
var c;
do if (c = p ? b.lang : b.getAttribute('xml:lang') || b.getAttribute('lang')) return c = c.toLowerCase(),
c === a || 0 === c.indexOf(a + '-');
while ((b = b.parentNode) && 1 === b.nodeType);
return !1
}
}),
target: function (b) {
var c = a.location && a.location.hash;
return c && c.slice(1) === b.id
},
root: function (a) {
return a === o
},
focus: function (a) {
return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
},
enabled: function (a) {
return a.disabled === !1
},
disabled: function (a) {
return a.disabled === !0
},
checked: function (a) {
var b = a.nodeName.toLowerCase();
return 'input' === b && !!a.checked || 'option' === b && !!a.selected
},
selected: function (a) {
return a.parentNode && a.parentNode.selectedIndex,
a.selected === !0
},
empty: function (a) {
for (a = a.firstChild; a; a = a.nextSibling) if (a.nodeType < 6) return !1;
return !0
},
parent: function (a) {
return !d.pseudos.empty(a)
},
header: function (a) {
return Z.test(a.nodeName)
},
input: function (a) {
return Y.test(a.nodeName)
},
button: function (a) {
var b = a.nodeName.toLowerCase();
return 'input' === b && 'button' === a.type || 'button' === b
},
text: function (a) {
var b;
return 'input' === a.nodeName.toLowerCase() && 'text' === a.type && (null == (b = a.getAttribute('type')) || 'text' === b.toLowerCase())
},
first: oa(function () {
return [0]
}),
last: oa(function (a, b) {
return [b - 1]
}),
eq: oa(function (a, b, c) {
return [0 > c ? c + b : c]
}),
even: oa(function (a, b) {
for (var c = 0; b > c; c += 2) a.push(c);
return a
}),
odd: oa(function (a, b) {
for (var c = 1; b > c; c += 2) a.push(c);
return a
}),
lt: oa(function (a, b, c) {
for (var d = 0 > c ? c + b : c; --d >= 0; ) a.push(d);
return a
}),
gt: oa(function (a, b, c) {
for (var d = 0 > c ? c + b : c; ++d < b; ) a.push(d);
return a
})
}
},
d.pseudos.nth = d.pseudos.eq;
for (b in {
radio: !0,
checkbox: !0,
file: !0,
password: !0,
image: !0
}) d.pseudos[b] = ma(b);
for (b in {
submit: !0,
reset: !0
}) d.pseudos[b] = na(b);
function qa() {
}
qa.prototype = d.filters = d.pseudos,
d.setFilters = new qa,
g = ga.tokenize = function (a, b) {
var c,
e,
f,
g,
h,
i,
j,
k = z[a + ' '];
if (k) return b ? 0 : k.slice(0);
h = a,
i = [
],
j = d.preFilter;
while (h) {
(!c || (e = S.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [
])),
c = !1,
(e = T.exec(h)) && (c = e.shift(), f.push({
value: c,
type: e[0].replace(R, ' ')
}), h = h.slice(c.length));
for (g in d.filter) !(e = X[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({
value: c,
type: g,
matches: e
}), h = h.slice(c.length));
if (!c) break
}
return b ? h.length : h ? ga.error(a)  : z(a, i).slice(0)
};
function ra(a) {
for (var b = 0, c = a.length, d = ''; c > b; b++) d += a[b].value;
return d
}
function sa(a, b, c) {
var d = b.dir,
e = c && 'parentNode' === d,
f = x++;
return b.first ? function (b, c, f) {
while (b = b[d]) if (1 === b.nodeType || e) return a(b, c, f)
}
 : function (b, c, g) {
var h,
i,
j = [
w,
f
];
if (g) {
while (b = b[d]) if ((1 === b.nodeType || e) && a(b, c, g)) return !0
} else while (b = b[d]) if (1 === b.nodeType || e) {
if (i = b[u] || (b[u] = {
}), (h = i[d]) && h[0] === w && h[1] === f) return j[2] = h[2];
if (i[d] = j, j[2] = a(b, c, g)) return !0
}
}
}
function ta(a) {
return a.length > 1 ? function (b, c, d) {
var e = a.length;
while (e--) if (!a[e](b, c, d)) return !1;
return !0
}
 : a[0]
}
function ua(a, b, c) {
for (var d = 0, e = b.length; e > d; d++) ga(a, b[d], c);
return c
}
function va(a, b, c, d, e) {
for (var f, g = [
], h = 0, i = a.length, j = null != b; i > h; h++) (f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
return g
}
function wa(a, b, c, d, e, f) {
return d && !d[u] && (d = wa(d)),
e && !e[u] && (e = wa(e, f)),
ia(function (f, g, h, i) {
var j,
k,
l,
m = [
],
n = [
],
o = g.length,
p = f || ua(b || '*', h.nodeType ? [
h
] : h, [
]),
q = !a || !f && b ? p : va(p, m, a, h, i),
r = c ? e || (f ? a : o || d) ? [
] : g : q;
if (c && c(q, r, h, i), d) {
j = va(r, n),
d(j, [
], h, i),
k = j.length;
while (k--) (l = j[k]) && (r[n[k]] = !(q[n[k]] = l))
}
if (f) {
if (e || a) {
if (e) {
j = [
],
k = r.length;
while (k--) (l = r[k]) && j.push(q[k] = l);
e(null, r = [
], j, i)
}
k = r.length;
while (k--) (l = r[k]) && (j = e ? J(f, l)  : m[k]) > - 1 && (f[j] = !(g[j] = l))
}
} else r = va(r === g ? r.splice(o, r.length)  : r),
e ? e(null, g, r, i)  : H.apply(g, r)
})
}
function xa(a) {
for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[' '], i = g ? 1 : 0, k = sa(function (a) {
return a === b
}, h, !0), l = sa(function (a) {
return J(b, a) > - 1
}, h, !0), m = [
function (a, c, d) {
var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d)  : l(a, c, d));
return b = null,
e
}
]; f > i; i++) if (c = d.relative[a[i].type]) m = [
sa(ta(m), c)
];
 else {
if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
for (e = ++i; f > e; e++) if (d.relative[a[e].type]) break;
return wa(i > 1 && ta(m), i > 1 && ra(a.slice(0, i - 1).concat({
value: ' ' === a[i - 2].type ? '*' : ''
})).replace(R, '$1'), c, e > i && xa(a.slice(i, e)), f > e && xa(a = a.slice(e)), f > e && ra(a))
}
m.push(c)
}
return ta(m)
}
function ya(a, b) {
var c = b.length > 0,
e = a.length > 0,
f = function (f, g, h, i, k) {
var l,
m,
o,
p = 0,
q = '0',
r = f && [],
s = [
],
t = j,
u = f || e && d.find.TAG('*', k),
v = w += null == t ? 1 : Math.random() || 0.1,
x = u.length;
for (k && (j = g !== n && g); q !== x && null != (l = u[q]); q++) {
if (e && l) {
m = 0;
while (o = a[m++]) if (o(l, g, h)) {
i.push(l);
break
}
k && (w = v)
}
c && ((l = !o && l) && p--, f && r.push(l))
}
if (p += q, c && q !== p) {
m = 0;
while (o = b[m++]) o(r, s, g, h);
if (f) {
if (p > 0) while (q--) r[q] || s[q] || (s[q] = F.call(i));
s = va(s)
}
H.apply(i, s),
k && !f && s.length > 0 && p + b.length > 1 && ga.uniqueSort(i)
}
return k && (w = v, j = t),
r
};
return c ? ia(f)  : f
}
return h = ga.compile = function (a, b) {
var c,
d = [
],
e = [
],
f = A[a + ' '];
if (!f) {
b || (b = g(a)),
c = b.length;
while (c--) f = xa(b[c]),
f[u] ? d.push(f)  : e.push(f);
f = A(a, ya(e, d)),
f.selector = a
}
return f
},
i = ga.select = function (a, b, e, f) {
var i,
j,
k,
l,
m,
n = 'function' == typeof a && a,
o = !f && g(a = n.selector || a);
if (e = e || [], 1 === o.length) {
if (j = o[0] = o[0].slice(0), j.length > 2 && 'ID' === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type]) {
if (b = (d.find.ID(k.matches[0].replace(ca, da), b) || []) [0], !b) return e;
n && (b = b.parentNode),
a = a.slice(j.shift().value.length)
}
i = X.needsContext.test(a) ? 0 : j.length;
while (i--) {
if (k = j[i], d.relative[l = k.type]) break;
if ((m = d.find[l]) && (f = m(k.matches[0].replace(ca, da), aa.test(j[0].type) && pa(b.parentNode) || b))) {
if (j.splice(i, 1), a = f.length && ra(j), !a) return H.apply(e, f),
e;
break
}
}
}
return (n || h(a, o)) (f, b, !p, e, aa.test(a) && pa(b.parentNode) || b),
e
},
c.sortStable = u.split('').sort(B).join('') === u,
c.detectDuplicates = !!l,
m(),
c.sortDetached = ja(function (a) {
return 1 & a.compareDocumentPosition(n.createElement('div'))
}),
ja(function (a) {
return a.innerHTML = '<a href=\'#\'></a>',
'#' === a.firstChild.getAttribute('href')
}) || ka('type|href|height|width', function (a, b, c) {
return c ? void 0 : a.getAttribute(b, 'type' === b.toLowerCase() ? 1 : 2)
}),
c.attributes && ja(function (a) {
return a.innerHTML = '<input/>',
a.firstChild.setAttribute('value', ''),
'' === a.firstChild.getAttribute('value')
}) || ka('value', function (a, b, c) {
return c || 'input' !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
}),
ja(function (a) {
return null == a.getAttribute('disabled')
}) || ka(K, function (a, b, c) {
var d;
return c ? void 0 : a[b] === !0 ? b.toLowerCase()  : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
}),
ga
}(a);
m.find = s,
m.expr = s.selectors,
m.expr[':'] = m.expr.pseudos,
m.unique = s.uniqueSort,
m.text = s.getText,
m.isXMLDoc = s.isXML,
m.contains = s.contains;
var t = m.expr.match.needsContext,
u = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
v = /^.[^:#\[\.,]*$/;
function w(a, b, c) {
if (m.isFunction(b)) return m.grep(a, function (a, d) {
return !!b.call(a, d, a) !== c
});
if (b.nodeType) return m.grep(a, function (a) {
return a === b !== c
});
if ('string' == typeof b) {
if (v.test(b)) return m.filter(b, a, c);
b = m.filter(b, a)
}
return m.grep(a, function (a) {
return m.inArray(a, b) >= 0 !== c
})
}
m.filter = function (a, b, c) {
var d = b[0];
return c && (a = ':not(' + a + ')'),
1 === b.length && 1 === d.nodeType ? m.find.matchesSelector(d, a) ? [
d
] : [
] : m.find.matches(a, m.grep(b, function (a) {
return 1 === a.nodeType
}))
},
m.fn.extend({
find: function (a) {
var b,
c = [
],
d = this,
e = d.length;
if ('string' != typeof a) return this.pushStack(m(a).filter(function () {
for (b = 0; e > b; b++) if (m.contains(d[b], this)) return !0
}));
for (b = 0; e > b; b++) m.find(a, d[b], c);
return c = this.pushStack(e > 1 ? m.unique(c)  : c),
c.selector = this.selector ? this.selector + ' ' + a : a,
c
},
filter: function (a) {
return this.pushStack(w(this, a || [], !1))
},
not: function (a) {
return this.pushStack(w(this, a || [], !0))
},
is: function (a) {
return !!w(this, 'string' == typeof a && t.test(a) ? m(a)  : a || [], !1).length
}
});
var x,
y = a.document,
z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
A = m.fn.init = function (a, b) {
var c,
d;
if (!a) return this;
if ('string' == typeof a) {
if (c = '<' === a.charAt(0) && '>' === a.charAt(a.length - 1) && a.length >= 3 ? [
null,
a,
null
] : z.exec(a), !c || !c[1] && b) return !b || b.jquery ? (b || x).find(a)  : this.constructor(b).find(a);
if (c[1]) {
if (b = b instanceof m ? b[0] : b, m.merge(this, m.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : y, !0)), u.test(c[1]) && m.isPlainObject(b)) for (c in b) m.isFunction(this[c]) ? this[c](b[c])  : this.attr(c, b[c]);
return this
}
if (d = y.getElementById(c[2]), d && d.parentNode) {
if (d.id !== c[2]) return x.find(a);
this.length = 1,
this[0] = d
}
return this.context = y,
this.selector = a,
this
}
return a.nodeType ? (this.context = this[0] = a, this.length = 1, this)  : m.isFunction(a) ? 'undefined' != typeof x.ready ? x.ready(a)  : a(m)  : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), m.makeArray(a, this))
};
A.prototype = m.fn,
x = m(y);
var B = /^(?:parents|prev(?:Until|All))/,
C = {
children: !0,
contents: !0,
next: !0,
prev: !0
};
m.extend({
dir: function (a, b, c) {
var d = [
],
e = a[b];
while (e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !m(e).is(c))) 1 === e.nodeType && d.push(e),
e = e[b];
return d
},
sibling: function (a, b) {
for (var c = [
]; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
return c
}
}),
m.fn.extend({
has: function (a) {
var b,
c = m(a, this),
d = c.length;
return this.filter(function () {
for (b = 0; d > b; b++) if (m.contains(this, c[b])) return !0
})
},
closest: function (a, b) {
for (var c, d = 0, e = this.length, f = [
], g = t.test(a) || 'string' != typeof a ? m(a, b || this.context)  : 0; e > d; d++) for (c = this[d]; c && c !== b; c = c.parentNode) if (c.nodeType < 11 && (g ? g.index(c) > - 1 : 1 === c.nodeType && m.find.matchesSelector(c, a))) {
f.push(c);
break
}
return this.pushStack(f.length > 1 ? m.unique(f)  : f)
},
index: function (a) {
return a ? 'string' == typeof a ? m.inArray(this[0], m(a))  : m.inArray(a.jquery ? a[0] : a, this)  : this[0] && this[0].parentNode ? this.first().prevAll().length : - 1
},
add: function (a, b) {
return this.pushStack(m.unique(m.merge(this.get(), m(a, b))))
},
addBack: function (a) {
return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
}
});
function D(a, b) {
do a = a[b];
while (a && 1 !== a.nodeType);
return a
}
m.each({
parent: function (a) {
var b = a.parentNode;
return b && 11 !== b.nodeType ? b : null
},
parents: function (a) {
return m.dir(a, 'parentNode')
},
parentsUntil: function (a, b, c) {
return m.dir(a, 'parentNode', c)
},
next: function (a) {
return D(a, 'nextSibling')
},
prev: function (a) {
return D(a, 'previousSibling')
},
nextAll: function (a) {
return m.dir(a, 'nextSibling')
},
prevAll: function (a) {
return m.dir(a, 'previousSibling')
},
nextUntil: function (a, b, c) {
return m.dir(a, 'nextSibling', c)
},
prevUntil: function (a, b, c) {
return m.dir(a, 'previousSibling', c)
},
siblings: function (a) {
return m.sibling((a.parentNode || {
}).firstChild, a)
},
children: function (a) {
return m.sibling(a.firstChild)
},
contents: function (a) {
return m.nodeName(a, 'iframe') ? a.contentDocument || a.contentWindow.document : m.merge([], a.childNodes)
}
}, function (a, b) {
m.fn[a] = function (c, d) {
var e = m.map(this, b, c);
return 'Until' !== a.slice( - 5) && (d = c),
d && 'string' == typeof d && (e = m.filter(d, e)),
this.length > 1 && (C[a] || (e = m.unique(e)), B.test(a) && (e = e.reverse())),
this.pushStack(e)
}
});
var E = /\S+/g,
F = {
};
function G(a) {
var b = F[a] = {
};
return m.each(a.match(E) || [], function (a, c) {
b[c] = !0
}),
b
}
m.Callbacks = function (a) {
a = 'string' == typeof a ? F[a] || G(a)  : m.extend({
}, a);
var b,
c,
d,
e,
f,
g,
h = [
],
i = !a.once && [],
j = function (l) {
for (c = a.memory && l, d = !0, f = g || 0, g = 0, e = h.length, b = !0; h && e > f; f++) if (h[f].apply(l[0], l[1]) === !1 && a.stopOnFalse) {
c = !1;
break
}
b = !1,
h && (i ? i.length && j(i.shift())  : c ? h = [
] : k.disable())
},
k = {
add: function () {
if (h) {
var d = h.length;
!function f(b) {
m.each(b, function (b, c) {
var d = m.type(c);
'function' === d ? a.unique && k.has(c) || h.push(c)  : c && c.length && 'string' !== d && f(c)
})
}(arguments),
b ? e = h.length : c && (g = d, j(c))
}
return this
},
remove: function () {
return h && m.each(arguments, function (a, c) {
var d;
while ((d = m.inArray(c, h, d)) > - 1) h.splice(d, 1),
b && (e >= d && e--, f >= d && f--)
}),
this
},
has: function (a) {
return a ? m.inArray(a, h) > - 1 : !(!h || !h.length)
},
empty: function () {
return h = [
],
e = 0,
this
},
disable: function () {
return h = i = c = void 0,
this
},
disabled: function () {
return !h
},
lock: function () {
return i = void 0,
c || k.disable(),
this
},
locked: function () {
return !i
},
fireWith: function (a, c) {
return !h || d && !i || (c = c || [], c = [
a,
c.slice ? c.slice()  : c
], b ? i.push(c)  : j(c)),
this
},
fire: function () {
return k.fireWith(this, arguments),
this
},
fired: function () {
return !!d
}
};
return k
},
m.extend({
Deferred: function (a) {
var b = [
['resolve',
'done',
m.Callbacks('once memory'),
'resolved'],
[
'reject',
'fail',
m.Callbacks('once memory'),
'rejected'
],
[
'notify',
'progress',
m.Callbacks('memory')
]
],
c = 'pending',
d = {
state: function () {
return c
},
always: function () {
return e.done(arguments).fail(arguments),
this
},
then: function () {
var a = arguments;
return m.Deferred(function (c) {
m.each(b, function (b, f) {
var g = m.isFunction(a[b]) && a[b];
e[f[1]](function () {
var a = g && g.apply(this, arguments);
a && m.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify)  : c[f[0] + 'With'](this === d ? c.promise()  : this, g ? [
a
] : arguments)
})
}),
a = null
}).promise()
},
promise: function (a) {
return null != a ? m.extend(a, d)  : d
}
},
e = {
};
return d.pipe = d.then,
m.each(b, function (a, f) {
var g = f[2],
h = f[3];
d[f[1]] = g.add,
h && g.add(function () {
c = h
}, b[1 ^ a][2].disable, b[2][2].lock),
e[f[0]] = function () {
return e[f[0] + 'With'](this === e ? d : this, arguments),
this
},
e[f[0] + 'With'] = g.fireWith
}),
d.promise(e),
a && a.call(e, e),
e
},
when: function (a) {
var b = 0,
c = d.call(arguments),
e = c.length,
f = 1 !== e || a && m.isFunction(a.promise) ? e : 0,
g = 1 === f ? a : m.Deferred(),
h = function (a, b, c) {
return function (e) {
b[a] = this,
c[a] = arguments.length > 1 ? d.call(arguments)  : e,
c === i ? g.notifyWith(b, c)  : --f || g.resolveWith(b, c)
}
},
i,
j,
k;
if (e > 1) for (i = new Array(e), j = new Array(e), k = new Array(e); e > b; b++) c[b] && m.isFunction(c[b].promise) ? c[b].promise().done(h(b, k, c)).fail(g.reject).progress(h(b, j, i))  : --f;
return f || g.resolveWith(k, c),
g.promise()
}
});
var H;
m.fn.ready = function (a) {
return m.ready.promise().done(a),
this
},
m.extend({
isReady: !1,
readyWait: 1,
holdReady: function (a) {
a ? m.readyWait++ : m.ready(!0)
},
ready: function (a) {
if (a === !0 ? !--m.readyWait : !m.isReady) {
if (!y.body) return setTimeout(m.ready);
m.isReady = !0,
a !== !0 && --m.readyWait > 0 || (H.resolveWith(y, [
m
]), m.fn.triggerHandler && (m(y).triggerHandler('ready'), m(y).off('ready')))
}
}
});
function I() {
y.addEventListener ? (y.removeEventListener('DOMContentLoaded', J, !1), a.removeEventListener('load', J, !1))  : (y.detachEvent('onreadystatechange', J), a.detachEvent('onload', J))
}
function J() {
(y.addEventListener || 'load' === event.type || 'complete' === y.readyState) && (I(), m.ready())
}
m.ready.promise = function (b) {
if (!H) if (H = m.Deferred(), 'complete' === y.readyState) setTimeout(m.ready);
 else if (y.addEventListener) y.addEventListener('DOMContentLoaded', J, !1),
a.addEventListener('load', J, !1);
 else {
y.attachEvent('onreadystatechange', J),
a.attachEvent('onload', J);
var c = !1;
try {
c = null == a.frameElement && y.documentElement
} catch (d) {
}
c && c.doScroll && !function e() {
if (!m.isReady) {
try {
c.doScroll('left')
} catch (a) {
return setTimeout(e, 50)
}
I(),
m.ready()
}
}()
}
return H.promise(b)
};
var K = 'undefined',
L;
for (L in m(k)) break;
k.ownLast = '0' !== L,
k.inlineBlockNeedsLayout = !1,
m(function () {
var a,
b,
c,
d;
c = y.getElementsByTagName('body') [0],
c && c.style && (b = y.createElement('div'), d = y.createElement('div'), d.style.cssText = 'position:absolute;border:0;width:0;height:0;top:0;left:-9999px', c.appendChild(d).appendChild(b), typeof b.style.zoom !== K && (b.style.cssText = 'display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1', k.inlineBlockNeedsLayout = a = 3 === b.offsetWidth, a && (c.style.zoom = 1)), c.removeChild(d))
}),
function () {
var a = y.createElement('div');
if (null == k.deleteExpando) {
k.deleteExpando = !0;
try {
delete a.test
} catch (b) {
k.deleteExpando = !1
}
}
a = null
}(),
m.acceptData = function (a) {
var b = m.noData[(a.nodeName + ' ').toLowerCase()],
c = + a.nodeType || 1;
return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute('classid') === b
};
var M = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
N = /([A-Z])/g;
function O(a, b, c) {
if (void 0 === c && 1 === a.nodeType) {
var d = 'data-' + b.replace(N, '-$1').toLowerCase();
if (c = a.getAttribute(d), 'string' == typeof c) {
try {
c = 'true' === c ? !0 : 'false' === c ? !1 : 'null' === c ? null : + c + '' === c ? + c : M.test(c) ? m.parseJSON(c)  : c
} catch (e) {
}
m.data(a, b, c)
} else c = void 0
}
return c
}
function P(a) {
var b;
for (b in a) if (('data' !== b || !m.isEmptyObject(a[b])) && 'toJSON' !== b) return !1;
return !0
}
function Q(a, b, d, e) {
if (m.acceptData(a)) {
var f,
g,
h = m.expando,
i = a.nodeType,
j = i ? m.cache : a,
k = i ? a[h] : a[h] && h;
if (k && j[k] && (e || j[k].data) || void 0 !== d || 'string' != typeof b) return k || (k = i ? a[h] = c.pop() || m.guid++ : h),
j[k] || (j[k] = i ? {
}
 : {
toJSON: m.noop
}),
('object' == typeof b || 'function' == typeof b) && (e ? j[k] = m.extend(j[k], b)  : j[k].data = m.extend(j[k].data, b)),
g = j[k],
e || (g.data || (g.data = {
}), g = g.data),
void 0 !== d && (g[m.camelCase(b)] = d),
'string' == typeof b ? (f = g[b], null == f && (f = g[m.camelCase(b)]))  : f = g,
f
}
}
function R(a, b, c) {
if (m.acceptData(a)) {
var d,
e,
f = a.nodeType,
g = f ? m.cache : a,
h = f ? a[m.expando] : m.expando;
if (g[h]) {
if (b && (d = c ? g[h] : g[h].data)) {
m.isArray(b) ? b = b.concat(m.map(b, m.camelCase))  : b in d ? b = [
b
] : (b = m.camelCase(b), b = b in d ? [
b
] : b.split(' ')),
e = b.length;
while (e--) delete d[b[e]];
if (c ? !P(d)  : !m.isEmptyObject(d)) return
}(c || (delete g[h].data, P(g[h]))) && (f ? m.cleanData([a], !0)  : k.deleteExpando || g != g.window ? delete g[h] : g[h] = null)
}
}
}
m.extend({
cache: {
},
noData: {
'applet ': !0,
'embed ': !0,
'object ': 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'
},
hasData: function (a) {
return a = a.nodeType ? m.cache[a[m.expando]] : a[m.expando],
!!a && !P(a)
},
data: function (a, b, c) {
return Q(a, b, c)
},
removeData: function (a, b) {
return R(a, b)
},
_data: function (a, b, c) {
return Q(a, b, c, !0)
},
_removeData: function (a, b) {
return R(a, b, !0)
}
}),
m.fn.extend({
data: function (a, b) {
var c,
d,
e,
f = this[0],
g = f && f.attributes;
if (void 0 === a) {
if (this.length && (e = m.data(f), 1 === f.nodeType && !m._data(f, 'parsedAttrs'))) {
c = g.length;
while (c--) g[c] && (d = g[c].name, 0 === d.indexOf('data-') && (d = m.camelCase(d.slice(5)), O(f, d, e[d])));
m._data(f, 'parsedAttrs', !0)
}
return e
}
return 'object' == typeof a ? this.each(function () {
m.data(this, a)
})  : arguments.length > 1 ? this.each(function () {
m.data(this, a, b)
})  : f ? O(f, a, m.data(f, a))  : void 0
},
removeData: function (a) {
return this.each(function () {
m.removeData(this, a)
})
}
}),
m.extend({
queue: function (a, b, c) {
var d;
return a ? (b = (b || 'fx') + 'queue', d = m._data(a, b), c && (!d || m.isArray(c) ? d = m._data(a, b, m.makeArray(c))  : d.push(c)), d || [])  : void 0
},
dequeue: function (a, b) {
b = b || 'fx';
var c = m.queue(a, b),
d = c.length,
e = c.shift(),
f = m._queueHooks(a, b),
g = function () {
m.dequeue(a, b)
};
'inprogress' === e && (e = c.shift(), d--),
e && ('fx' === b && c.unshift('inprogress'), delete f.stop, e.call(a, g, f)),
!d && f && f.empty.fire()
},
_queueHooks: function (a, b) {
var c = b + 'queueHooks';
return m._data(a, c) || m._data(a, c, {
empty: m.Callbacks('once memory').add(function () {
m._removeData(a, b + 'queue'),
m._removeData(a, c)
})
})
}
}),
m.fn.extend({
queue: function (a, b) {
var c = 2;
return 'string' != typeof a && (b = a, a = 'fx', c--),
arguments.length < c ? m.queue(this[0], a)  : void 0 === b ? this : this.each(function () {
var c = m.queue(this, a, b);
m._queueHooks(this, a),
'fx' === a && 'inprogress' !== c[0] && m.dequeue(this, a)
})
},
dequeue: function (a) {
return this.each(function () {
m.dequeue(this, a)
})
},
clearQueue: function (a) {
return this.queue(a || 'fx', [
])
},
promise: function (a, b) {
var c,
d = 1,
e = m.Deferred(),
f = this,
g = this.length,
h = function () {
--d || e.resolveWith(f, [
f
])
};
'string' != typeof a && (b = a, a = void 0),
a = a || 'fx';
while (g--) c = m._data(f[g], a + 'queueHooks'),
c && c.empty && (d++, c.empty.add(h));
return h(),
e.promise(b)
}
});
var S = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
T = [
'Top',
'Right',
'Bottom',
'Left'
],
U = function (a, b) {
return a = b || a,
'none' === m.css(a, 'display') || !m.contains(a.ownerDocument, a)
},
V = m.access = function (a, b, c, d, e, f, g) {
var h = 0,
i = a.length,
j = null == c;
if ('object' === m.type(c)) {
e = !0;
for (h in c) m.access(a, b, h, c[h], !0, f, g)
} else if (void 0 !== d && (e = !0, m.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null)  : (j = b, b = function (a, b, c) {
return j.call(m(a), c)
})), b)) for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
return e ? a : j ? b.call(a)  : i ? b(a[0], c)  : f
},
W = /^(?:checkbox|radio)$/i;
!function () {
var a = y.createElement('input'),
b = y.createElement('div'),
c = y.createDocumentFragment();
if (b.innerHTML = '  <link/><table></table><a href=\'/a\'>a</a><input type=\'checkbox\'/>', k.leadingWhitespace = 3 === b.firstChild.nodeType, k.tbody = !b.getElementsByTagName('tbody').length, k.htmlSerialize = !!b.getElementsByTagName('link').length, k.html5Clone = '<:nav></:nav>' !== y.createElement('nav').cloneNode(!0).outerHTML, a.type = 'checkbox', a.checked = !0, c.appendChild(a), k.appendChecked = a.checked, b.innerHTML = '<textarea>x</textarea>', k.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue, c.appendChild(b), b.innerHTML = '<input type=\'radio\' checked=\'checked\' name=\'t\'/>', k.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, k.noCloneEvent = !0, b.attachEvent && (b.attachEvent('onclick', function () {
k.noCloneEvent = !1
}), b.cloneNode(!0).click()), null == k.deleteExpando) {
k.deleteExpando = !0;
try {
delete b.test
} catch (d) {
k.deleteExpando = !1
}
}
}(),
function () {
var b,
c,
d = y.createElement('div');
for (b in {
submit: !0,
change: !0,
focusin: !0
}) c = 'on' + b,
(k[b + 'Bubbles'] = c in a) || (d.setAttribute(c, 't'), k[b + 'Bubbles'] = d.attributes[c].expando === !1);
d = null
}();
var X = /^(?:input|select|textarea)$/i,
Y = /^key/,
Z = /^(?:mouse|pointer|contextmenu)|click/,
$ = /^(?:focusinfocus|focusoutblur)$/,
_ = /^([^.]*)(?:\.(.+)|)$/;
function aa() {
return !0
}
function ba() {
return !1
}
function ca() {
try {
return y.activeElement
} catch (a) {
}
}
m.event = {
global: {
},
add: function (a, b, c, d, e) {
var f,
g,
h,
i,
j,
k,
l,
n,
o,
p,
q,
r = m._data(a);
if (r) {
c.handler && (i = c, c = i.handler, e = i.selector),
c.guid || (c.guid = m.guid++),
(g = r.events) || (g = r.events = {
}),
(k = r.handle) || (k = r.handle = function (a) {
return typeof m === K || a && m.event.triggered === a.type ? void 0 : m.event.dispatch.apply(k.elem, arguments)
}, k.elem = a),
b = (b || '').match(E) || [''],
h = b.length;
while (h--) f = _.exec(b[h]) || [],
o = q = f[1],
p = (f[2] || '').split('.').sort(),
o && (j = m.event.special[o] || {
}, o = (e ? j.delegateType : j.bindType) || o, j = m.event.special[o] || {
}, l = m.extend({
type: o,
origType: q,
data: d,
handler: c,
guid: c.guid,
selector: e,
needsContext: e && m.expr.match.needsContext.test(e),
namespace: p.join('.')
}, i), (n = g[o]) || (n = g[o] = [
], n.delegateCount = 0, j.setup && j.setup.call(a, d, p, k) !== !1 || (a.addEventListener ? a.addEventListener(o, k, !1)  : a.attachEvent && a.attachEvent('on' + o, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? n.splice(n.delegateCount++, 0, l)  : n.push(l), m.event.global[o] = !0);
a = null
}
},
remove: function (a, b, c, d, e) {
var f,
g,
h,
i,
j,
k,
l,
n,
o,
p,
q,
r = m.hasData(a) && m._data(a);
if (r && (k = r.events)) {
b = (b || '').match(E) || [''],
j = b.length;
while (j--) if (h = _.exec(b[j]) || [], o = q = h[1], p = (h[2] || '').split('.').sort(), o) {
l = m.event.special[o] || {
},
o = (d ? l.delegateType : l.bindType) || o,
n = k[o] || [],
h = h[2] && new RegExp('(^|\\.)' + p.join('\\.(?:.*\\.|)') + '(\\.|$)'),
i = f = n.length;
while (f--) g = n[f],
!e && q !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ('**' !== d || !g.selector) || (n.splice(f, 1), g.selector && n.delegateCount--, l.remove && l.remove.call(a, g));
i && !n.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || m.removeEvent(a, o, r.handle), delete k[o])
} else for (o in k) m.event.remove(a, o + b[j], c, d, !0);
m.isEmptyObject(k) && (delete r.handle, m._removeData(a, 'events'))
}
},
trigger: function (b, c, d, e) {
var f,
g,
h,
i,
k,
l,
n,
o = [
d || y
],
p = j.call(b, 'type') ? b.type : b,
q = j.call(b, 'namespace') ? b.namespace.split('.')  : [
];
if (h = l = d = d || y, 3 !== d.nodeType && 8 !== d.nodeType && !$.test(p + m.event.triggered) && (p.indexOf('.') >= 0 && (q = p.split('.'), p = q.shift(), q.sort()), g = p.indexOf(':') < 0 && 'on' + p, b = b[m.expando] ? b : new m.Event(p, 'object' == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = q.join('.'), b.namespace_re = b.namespace ? new RegExp('(^|\\.)' + q.join('\\.(?:.*\\.|)') + '(\\.|$)')  : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [
b
] : m.makeArray(c, [
b
]), k = m.event.special[p] || {
}, e || !k.trigger || k.trigger.apply(d, c) !== !1)) {
if (!e && !k.noBubble && !m.isWindow(d)) {
for (i = k.delegateType || p, $.test(i + p) || (h = h.parentNode); h; h = h.parentNode) o.push(h),
l = h;
l === (d.ownerDocument || y) && o.push(l.defaultView || l.parentWindow || a)
}
n = 0;
while ((h = o[n++]) && !b.isPropagationStopped()) b.type = n > 1 ? i : k.bindType || p,
f = (m._data(h, 'events') || {
}) [b.type] && m._data(h, 'handle'),
f && f.apply(h, c),
f = g && h[g],
f && f.apply && m.acceptData(h) && (b.result = f.apply(h, c), b.result === !1 && b.preventDefault());
if (b.type = p, !e && !b.isDefaultPrevented() && (!k._default || k._default.apply(o.pop(), c) === !1) && m.acceptData(d) && g && d[p] && !m.isWindow(d)) {
l = d[g],
l && (d[g] = null),
m.event.triggered = p;
try {
d[p]()
} catch (r) {
}
m.event.triggered = void 0,
l && (d[g] = l)
}
return b.result
}
},
dispatch: function (a) {
a = m.event.fix(a);
var b,
c,
e,
f,
g,
h = [
],
i = d.call(arguments),
j = (m._data(this, 'events') || {
}) [a.type] || [],
k = m.event.special[a.type] || {
};
if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
h = m.event.handlers.call(this, a, j),
b = 0;
while ((f = h[b++]) && !a.isPropagationStopped()) {
a.currentTarget = f.elem,
g = 0;
while ((e = f.handlers[g++]) && !a.isImmediatePropagationStopped()) (!a.namespace_re || a.namespace_re.test(e.namespace)) && (a.handleObj = e, a.data = e.data, c = ((m.event.special[e.origType] || {
}).handle || e.handler).apply(f.elem, i), void 0 !== c && (a.result = c) === !1 && (a.preventDefault(), a.stopPropagation()))
}
return k.postDispatch && k.postDispatch.call(this, a),
a.result
}
},
handlers: function (a, b) {
var c,
d,
e,
f,
g = [
],
h = b.delegateCount,
i = a.target;
if (h && i.nodeType && (!a.button || 'click' !== a.type)) for (; i != this; i = i.parentNode || this) if (1 === i.nodeType && (i.disabled !== !0 || 'click' !== a.type)) {
for (e = [
], f = 0; h > f; f++) d = b[f],
c = d.selector + ' ',
void 0 === e[c] && (e[c] = d.needsContext ? m(c, this).index(i) >= 0 : m.find(c, this, null, [
i
]).length),
e[c] && e.push(d);
e.length && g.push({
elem: i,
handlers: e
})
}
return h < b.length && g.push({
elem: this,
handlers: b.slice(h)
}),
g
},
fix: function (a) {
if (a[m.expando]) return a;
var b,
c,
d,
e = a.type,
f = a,
g = this.fixHooks[e];
g || (this.fixHooks[e] = g = Z.test(e) ? this.mouseHooks : Y.test(e) ? this.keyHooks : {
}),
d = g.props ? this.props.concat(g.props)  : this.props,
a = new m.Event(f),
b = d.length;
while (b--) c = d[b],
a[c] = f[c];
return a.target || (a.target = f.srcElement || y),
3 === a.target.nodeType && (a.target = a.target.parentNode),
a.metaKey = !!a.metaKey,
g.filter ? g.filter(a, f)  : a
},
props: 'altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which'.split(' '),
fixHooks: {
},
keyHooks: {
props: 'char charCode key keyCode'.split(' '),
filter: function (a, b) {
return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode),
a
}
},
mouseHooks: {
props: 'button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement'.split(' '),
filter: function (a, b) {
var c,
d,
e,
f = b.button,
g = b.fromElement;
return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || y, e = d.documentElement, c = d.body, a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)),
!a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g),
a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0),
a
}
},
special: {
load: {
noBubble: !0
},
focus: {
trigger: function () {
if (this !== ca() && this.focus) try {
return this.focus(),
!1
} catch (a) {
}
},
delegateType: 'focusin'
},
blur: {
trigger: function () {
return this === ca() && this.blur ? (this.blur(), !1)  : void 0
},
delegateType: 'focusout'
},
click: {
trigger: function () {
return m.nodeName(this, 'input') && 'checkbox' === this.type && this.click ? (this.click(), !1)  : void 0
},
_default: function (a) {
return m.nodeName(a.target, 'a')
}
},
beforeunload: {
postDispatch: function (a) {
void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
}
}
},
simulate: function (a, b, c, d) {
var e = m.extend(new m.Event, c, {
type: a,
isSimulated: !0,
originalEvent: {
}
});
d ? m.event.trigger(e, null, b)  : m.event.dispatch.call(b, e),
e.isDefaultPrevented() && c.preventDefault()
}
},
m.removeEvent = y.removeEventListener ? function (a, b, c) {
a.removeEventListener && a.removeEventListener(b, c, !1)
}
 : function (a, b, c) {
var d = 'on' + b;
a.detachEvent && (typeof a[d] === K && (a[d] = null), a.detachEvent(d, c))
},
m.Event = function (a, b) {
return this instanceof m.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? aa : ba)  : this.type = a, b && m.extend(this, b), this.timeStamp = a && a.timeStamp || m.now(), void (this[m.expando] = !0))  : new m.Event(a, b)
},
m.Event.prototype = {
isDefaultPrevented: ba,
isPropagationStopped: ba,
isImmediatePropagationStopped: ba,
preventDefault: function () {
var a = this.originalEvent;
this.isDefaultPrevented = aa,
a && (a.preventDefault ? a.preventDefault()  : a.returnValue = !1)
},
stopPropagation: function () {
var a = this.originalEvent;
this.isPropagationStopped = aa,
a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
},
stopImmediatePropagation: function () {
var a = this.originalEvent;
this.isImmediatePropagationStopped = aa,
a && a.stopImmediatePropagation && a.stopImmediatePropagation(),
this.stopPropagation()
}
},
m.each({
mouseenter: 'mouseover',
mouseleave: 'mouseout',
pointerenter: 'pointerover',
pointerleave: 'pointerout'
}, function (a, b) {
m.event.special[a] = {
delegateType: b,
bindType: b,
handle: function (a) {
var c,
d = this,
e = a.relatedTarget,
f = a.handleObj;
return (!e || e !== d && !m.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b),
c
}
}
}),
k.submitBubbles || (m.event.special.submit = {
setup: function () {
return m.nodeName(this, 'form') ? !1 : void m.event.add(this, 'click._submit keypress._submit', function (a) {
var b = a.target,
c = m.nodeName(b, 'input') || m.nodeName(b, 'button') ? b.form : void 0;
c && !m._data(c, 'submitBubbles') && (m.event.add(c, 'submit._submit', function (a) {
a._submit_bubble = !0
}), m._data(c, 'submitBubbles', !0))
})
},
postDispatch: function (a) {
a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && m.event.simulate('submit', this.parentNode, a, !0))
},
teardown: function () {
return m.nodeName(this, 'form') ? !1 : void m.event.remove(this, '._submit')
}
}),
k.changeBubbles || (m.event.special.change = {
setup: function () {
return X.test(this.nodeName) ? (('checkbox' === this.type || 'radio' === this.type) && (m.event.add(this, 'propertychange._change', function (a) {
'checked' === a.originalEvent.propertyName && (this._just_changed = !0)
}), m.event.add(this, 'click._change', function (a) {
this._just_changed && !a.isTrigger && (this._just_changed = !1),
m.event.simulate('change', this, a, !0)
})), !1)  : void m.event.add(this, 'beforeactivate._change', function (a) {
var b = a.target;
X.test(b.nodeName) && !m._data(b, 'changeBubbles') && (m.event.add(b, 'change._change', function (a) {
!this.parentNode || a.isSimulated || a.isTrigger || m.event.simulate('change', this.parentNode, a, !0)
}), m._data(b, 'changeBubbles', !0))
})
},
handle: function (a) {
var b = a.target;
return this !== b || a.isSimulated || a.isTrigger || 'radio' !== b.type && 'checkbox' !== b.type ? a.handleObj.handler.apply(this, arguments)  : void 0
},
teardown: function () {
return m.event.remove(this, '._change'),
!X.test(this.nodeName)
}
}),
k.focusinBubbles || m.each({
focus: 'focusin',
blur: 'focusout'
}, function (a, b) {
var c = function (a) {
m.event.simulate(b, a.target, m.event.fix(a), !0)
};
m.event.special[b] = {
setup: function () {
var d = this.ownerDocument || this,
e = m._data(d, b);
e || d.addEventListener(a, c, !0),
m._data(d, b, (e || 0) + 1)
},
teardown: function () {
var d = this.ownerDocument || this,
e = m._data(d, b) - 1;
e ? m._data(d, b, e)  : (d.removeEventListener(a, c, !0), m._removeData(d, b))
}
}
}),
m.fn.extend({
on: function (a, b, c, d, e) {
var f,
g;
if ('object' == typeof a) {
'string' != typeof b && (c = c || b, b = void 0);
for (f in a) this.on(f, b, c, a[f], e);
return this
}
if (null == c && null == d ? (d = b, c = b = void 0)  : null == d && ('string' == typeof b ? (d = c, c = void 0)  : (d = c, c = b, b = void 0)), d === !1) d = ba;
 else if (!d) return this;
return 1 === e && (g = d, d = function (a) {
return m().off(a),
g.apply(this, arguments)
}, d.guid = g.guid || (g.guid = m.guid++)),
this.each(function () {
m.event.add(this, a, d, c, b)
})
},
one: function (a, b, c, d) {
return this.on(a, b, c, d, 1)
},
off: function (a, b, c) {
var d,
e;
if (a && a.preventDefault && a.handleObj) return d = a.handleObj,
m(a.delegateTarget).off(d.namespace ? d.origType + '.' + d.namespace : d.origType, d.selector, d.handler),
this;
if ('object' == typeof a) {
for (e in a) this.off(e, b, a[e]);
return this
}
return (b === !1 || 'function' == typeof b) && (c = b, b = void 0),
c === !1 && (c = ba),
this.each(function () {
m.event.remove(this, a, c, b)
})
},
trigger: function (a, b) {
return this.each(function () {
m.event.trigger(a, b, this)
})
},
triggerHandler: function (a, b) {
var c = this[0];
return c ? m.event.trigger(a, b, c, !0)  : void 0
}
});
function da(a) {
var b = ea.split('|'),
c = a.createDocumentFragment();
if (c.createElement) while (b.length) c.createElement(b.pop());
return c
}
var ea = 'abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video',
fa = / jQuery\d+="(?:null|\d+)"/g,
ga = new RegExp('<(?:' + ea + ')[\\s/>]', 'i'),
ha = /^\s+/,
ia = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
ja = /<([\w:]+)/,
ka = /<tbody/i,
la = /<|&#?\w+;/,
ma = /<(?:script|style|link)/i,
na = /checked\s*(?:[^=]|=\s*.checked.)/i,
oa = /^$|\/(?:java|ecma)script/i,
pa = /^true\/(.*)/,
qa = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
ra = {
option: [
1,
'<select multiple=\'multiple\'>',
'</select>'
],
legend: [
1,
'<fieldset>',
'</fieldset>'
],
area: [
1,
'<map>',
'</map>'
],
param: [
1,
'<object>',
'</object>'
],
thead: [
1,
'<table>',
'</table>'
],
tr: [
2,
'<table><tbody>',
'</tbody></table>'
],
col: [
2,
'<table><tbody></tbody><colgroup>',
'</colgroup></table>'
],
td: [
3,
'<table><tbody><tr>',
'</tr></tbody></table>'
],
_default: k.htmlSerialize ? [
0,
'',
''
] : [
1,
'X<div>',
'</div>'
]
},
sa = da(y),
ta = sa.appendChild(y.createElement('div'));
ra.optgroup = ra.option,
ra.tbody = ra.tfoot = ra.colgroup = ra.caption = ra.thead,
ra.th = ra.td;
function ua(a, b) {
var c,
d,
e = 0,
f = typeof a.getElementsByTagName !== K ? a.getElementsByTagName(b || '*')  : typeof a.querySelectorAll !== K ? a.querySelectorAll(b || '*')  : void 0;
if (!f) for (f = [
], c = a.childNodes || a; null != (d = c[e]); e++) !b || m.nodeName(d, b) ? f.push(d)  : m.merge(f, ua(d, b));
return void 0 === b || b && m.nodeName(a, b) ? m.merge([a], f)  : f
}
function va(a) {
W.test(a.type) && (a.defaultChecked = a.checked)
}
function wa(a, b) {
return m.nodeName(a, 'table') && m.nodeName(11 !== b.nodeType ? b : b.firstChild, 'tr') ? a.getElementsByTagName('tbody') [0] || a.appendChild(a.ownerDocument.createElement('tbody'))  : a
}
function xa(a) {
return a.type = (null !== m.find.attr(a, 'type')) + '/' + a.type,
a
}
function ya(a) {
var b = pa.exec(a.type);
return b ? a.type = b[1] : a.removeAttribute('type'),
a
}
function za(a, b) {
for (var c, d = 0; null != (c = a[d]); d++) m._data(c, 'globalEval', !b || m._data(b[d], 'globalEval'))
}
function Aa(a, b) {
if (1 === b.nodeType && m.hasData(a)) {
var c,
d,
e,
f = m._data(a),
g = m._data(b, f),
h = f.events;
if (h) {
delete g.handle,
g.events = {
};
for (c in h) for (d = 0, e = h[c].length; e > d; d++) m.event.add(b, c, h[c][d])
}
g.data && (g.data = m.extend({
}, g.data))
}
}
function Ba(a, b) {
var c,
d,
e;
if (1 === b.nodeType) {
if (c = b.nodeName.toLowerCase(), !k.noCloneEvent && b[m.expando]) {
e = m._data(b);
for (d in e.events) m.removeEvent(b, d, e.handle);
b.removeAttribute(m.expando)
}
'script' === c && b.text !== a.text ? (xa(b).text = a.text, ya(b))  : 'object' === c ? (b.parentNode && (b.outerHTML = a.outerHTML), k.html5Clone && a.innerHTML && !m.trim(b.innerHTML) && (b.innerHTML = a.innerHTML))  : 'input' === c && W.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value))  : 'option' === c ? b.defaultSelected = b.selected = a.defaultSelected : ('input' === c || 'textarea' === c) && (b.defaultValue = a.defaultValue)
}
}
m.extend({
clone: function (a, b, c) {
var d,
e,
f,
g,
h,
i = m.contains(a.ownerDocument, a);
if (k.html5Clone || m.isXMLDoc(a) || !ga.test('<' + a.nodeName + '>') ? f = a.cloneNode(!0)  : (ta.innerHTML = a.outerHTML, ta.removeChild(f = ta.firstChild)), !(k.noCloneEvent && k.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || m.isXMLDoc(a))) for (d = ua(f), h = ua(a), g = 0; null != (e = h[g]); ++g) d[g] && Ba(e, d[g]);
if (b) if (c) for (h = h || ua(a), d = d || ua(f), g = 0; null != (e = h[g]); g++) Aa(e, d[g]);
 else Aa(a, f);
return d = ua(f, 'script'),
d.length > 0 && za(d, !i && ua(a, 'script')),
d = h = e = null,
f
},
buildFragment: function (a, b, c, d) {
for (var e, f, g, h, i, j, l, n = a.length, o = da(b), p = [
], q = 0; n > q; q++) if (f = a[q], f || 0 === f) if ('object' === m.type(f)) m.merge(p, f.nodeType ? [
f
] : f);
 else if (la.test(f)) {
h = h || o.appendChild(b.createElement('div')),
i = (ja.exec(f) || ['',
'']) [1].toLowerCase(),
l = ra[i] || ra._default,
h.innerHTML = l[1] + f.replace(ia, '<$1></$2>') + l[2],
e = l[0];
while (e--) h = h.lastChild;
if (!k.leadingWhitespace && ha.test(f) && p.push(b.createTextNode(ha.exec(f) [0])), !k.tbody) {
f = 'table' !== i || ka.test(f) ? '<table>' !== l[1] || ka.test(f) ? 0 : h : h.firstChild,
e = f && f.childNodes.length;
while (e--) m.nodeName(j = f.childNodes[e], 'tbody') && !j.childNodes.length && f.removeChild(j)
}
m.merge(p, h.childNodes),
h.textContent = '';
while (h.firstChild) h.removeChild(h.firstChild);
h = o.lastChild
} else p.push(b.createTextNode(f));
h && o.removeChild(h),
k.appendChecked || m.grep(ua(p, 'input'), va),
q = 0;
while (f = p[q++]) if ((!d || - 1 === m.inArray(f, d)) && (g = m.contains(f.ownerDocument, f), h = ua(o.appendChild(f), 'script'), g && za(h), c)) {
e = 0;
while (f = h[e++]) oa.test(f.type || '') && c.push(f)
}
return h = null,
o
},
cleanData: function (a, b) {
for (var d, e, f, g, h = 0, i = m.expando, j = m.cache, l = k.deleteExpando, n = m.event.special; null != (d = a[h]); h++) if ((b || m.acceptData(d)) && (f = d[i], g = f && j[f])) {
if (g.events) for (e in g.events) n[e] ? m.event.remove(d, e)  : m.removeEvent(d, e, g.handle);
j[f] && (delete j[f], l ? delete d[i] : typeof d.removeAttribute !== K ? d.removeAttribute(i)  : d[i] = null, c.push(f))
}
}
}),
m.fn.extend({
text: function (a) {
return V(this, function (a) {
return void 0 === a ? m.text(this)  : this.empty().append((this[0] && this[0].ownerDocument || y).createTextNode(a))
}, null, a, arguments.length)
},
append: function () {
return this.domManip(arguments, function (a) {
if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
var b = wa(this, a);
b.appendChild(a)
}
})
},
prepend: function () {
return this.domManip(arguments, function (a) {
if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
var b = wa(this, a);
b.insertBefore(a, b.firstChild)
}
})
},
before: function () {
return this.domManip(arguments, function (a) {
this.parentNode && this.parentNode.insertBefore(a, this)
})
},
after: function () {
return this.domManip(arguments, function (a) {
this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
})
},
remove: function (a, b) {
for (var c, d = a ? m.filter(a, this)  : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || m.cleanData(ua(c)),
c.parentNode && (b && m.contains(c.ownerDocument, c) && za(ua(c, 'script')), c.parentNode.removeChild(c));
return this
},
empty: function () {
for (var a, b = 0; null != (a = this[b]); b++) {
1 === a.nodeType && m.cleanData(ua(a, !1));
while (a.firstChild) a.removeChild(a.firstChild);
a.options && m.nodeName(a, 'select') && (a.options.length = 0)
}
return this
},
clone: function (a, b) {
return a = null == a ? !1 : a,
b = null == b ? a : b,
this.map(function () {
return m.clone(this, a, b)
})
},
html: function (a) {
return V(this, function (a) {
var b = this[0] || {
},
c = 0,
d = this.length;
if (void 0 === a) return 1 === b.nodeType ? b.innerHTML.replace(fa, '')  : void 0;
if (!('string' != typeof a || ma.test(a) || !k.htmlSerialize && ga.test(a) || !k.leadingWhitespace && ha.test(a) || ra[(ja.exec(a) || ['',
'']) [1].toLowerCase()])) {
a = a.replace(ia, '<$1></$2>');
try {
for (; d > c; c++) b = this[c] || {
},
1 === b.nodeType && (m.cleanData(ua(b, !1)), b.innerHTML = a);
b = 0
} catch (e) {
}
}
b && this.empty().append(a)
}, null, a, arguments.length)
},
replaceWith: function () {
var a = arguments[0];
return this.domManip(arguments, function (b) {
a = this.parentNode,
m.cleanData(ua(this)),
a && a.replaceChild(b, this)
}),
a && (a.length || a.nodeType) ? this : this.remove()
},
detach: function (a) {
return this.remove(a, !0)
},
domManip: function (a, b) {
a = e.apply([], a);
var c,
d,
f,
g,
h,
i,
j = 0,
l = this.length,
n = this,
o = l - 1,
p = a[0],
q = m.isFunction(p);
if (q || l > 1 && 'string' == typeof p && !k.checkClone && na.test(p)) return this.each(function (c) {
var d = n.eq(c);
q && (a[0] = p.call(this, c, d.html())),
d.domManip(a, b)
});
if (l && (i = m.buildFragment(a, this[0].ownerDocument, !1, this), c = i.firstChild, 1 === i.childNodes.length && (i = c), c)) {
for (g = m.map(ua(i, 'script'), xa), f = g.length; l > j; j++) d = i,
j !== o && (d = m.clone(d, !0, !0), f && m.merge(g, ua(d, 'script'))),
b.call(this[j], d, j);
if (f) for (h = g[g.length - 1].ownerDocument, m.map(g, ya), j = 0; f > j; j++) d = g[j],
oa.test(d.type || '') && !m._data(d, 'globalEval') && m.contains(h, d) && (d.src ? m._evalUrl && m._evalUrl(d.src)  : m.globalEval((d.text || d.textContent || d.innerHTML || '').replace(qa, '')));
i = c = null
}
return this
}
}),
m.each({
appendTo: 'append',
prependTo: 'prepend',
insertBefore: 'before',
insertAfter: 'after',
replaceAll: 'replaceWith'
}, function (a, b) {
m.fn[a] = function (a) {
for (var c, d = 0, e = [
], g = m(a), h = g.length - 1; h >= d; d++) c = d === h ? this : this.clone(!0),
m(g[d]) [b](c),
f.apply(e, c.get());
return this.pushStack(e)
}
});
var Ca,
Da = {
};
function Ea(b, c) {
var d,
e = m(c.createElement(b)).appendTo(c.body),
f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : m.css(e[0], 'display');
return e.detach(),
f
}
function Fa(a) {
var b = y,
c = Da[a];
return c || (c = Ea(a, b), 'none' !== c && c || (Ca = (Ca || m('<iframe frameborder=\'0\' width=\'0\' height=\'0\'/>')).appendTo(b.documentElement), b = (Ca[0].contentWindow || Ca[0].contentDocument).document, b.write(), b.close(), c = Ea(a, b), Ca.detach()), Da[a] = c),
c
}
!function () {
var a;
k.shrinkWrapBlocks = function () {
if (null != a) return a;
a = !1;
var b,
c,
d;
return c = y.getElementsByTagName('body') [0],
c && c.style ? (b = y.createElement('div'), d = y.createElement('div'), d.style.cssText = 'position:absolute;border:0;width:0;height:0;top:0;left:-9999px', c.appendChild(d).appendChild(b), typeof b.style.zoom !== K && (b.style.cssText = '-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1', b.appendChild(y.createElement('div')).style.width = '5px', a = 3 !== b.offsetWidth), c.removeChild(d), a)  : void 0
}
}();
var Ga = /^margin/,
Ha = new RegExp('^(' + S + ')(?!px)[a-z%]+$', 'i'),
Ia,
Ja,
Ka = /^(top|right|bottom|left)$/;
a.getComputedStyle ? (Ia = function (b) {
return b.ownerDocument.defaultView.opener ? b.ownerDocument.defaultView.getComputedStyle(b, null)  : a.getComputedStyle(b, null)
}, Ja = function (a, b, c) {
var d,
e,
f,
g,
h = a.style;
return c = c || Ia(a),
g = c ? c.getPropertyValue(b) || c[b] : void 0,
c && ('' !== g || m.contains(a.ownerDocument, a) || (g = m.style(a, b)), Ha.test(g) && Ga.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)),
void 0 === g ? g : g + ''
})  : y.documentElement.currentStyle && (Ia = function (a) {
return a.currentStyle
}, Ja = function (a, b, c) {
var d,
e,
f,
g,
h = a.style;
return c = c || Ia(a),
g = c ? c[b] : void 0,
null == g && h && h[b] && (g = h[b]),
Ha.test(g) && !Ka.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left = 'fontSize' === b ? '1em' : g, g = h.pixelLeft + 'px', h.left = d, f && (e.left = f)),
void 0 === g ? g : g + '' || 'auto'
});
function La(a, b) {
return {
get: function () {
var c = a();
if (null != c) return c ? void delete this.get : (this.get = b).apply(this, arguments)
}
}
}
!function () {
var b,
c,
d,
e,
f,
g,
h;
if (b = y.createElement('div'), b.innerHTML = '  <link/><table></table><a href=\'/a\'>a</a><input type=\'checkbox\'/>', d = b.getElementsByTagName('a') [0], c = d && d.style) {
c.cssText = 'float:left;opacity:.5',
k.opacity = '0.5' === c.opacity,
k.cssFloat = !!c.cssFloat,
b.style.backgroundClip = 'content-box',
b.cloneNode(!0).style.backgroundClip = '',
k.clearCloneStyle = 'content-box' === b.style.backgroundClip,
k.boxSizing = '' === c.boxSizing || '' === c.MozBoxSizing || '' === c.WebkitBoxSizing,
m.extend(k, {
reliableHiddenOffsets: function () {
return null == g && i(),
g
},
boxSizingReliable: function () {
return null == f && i(),
f
},
pixelPosition: function () {
return null == e && i(),
e
},
reliableMarginRight: function () {
return null == h && i(),
h
}
});
function i() {
var b,
c,
d,
i;
c = y.getElementsByTagName('body') [0],
c && c.style && (b = y.createElement('div'), d = y.createElement('div'), d.style.cssText = 'position:absolute;border:0;width:0;height:0;top:0;left:-9999px', c.appendChild(d).appendChild(b), b.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute', e = f = !1, h = !0, a.getComputedStyle && (e = '1%' !== (a.getComputedStyle(b, null) || {
}).top, f = '4px' === (a.getComputedStyle(b, null) || {
width: '4px'
}).width, i = b.appendChild(y.createElement('div')), i.style.cssText = b.style.cssText = '-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0', i.style.marginRight = i.style.width = '0', b.style.width = '1px', h = !parseFloat((a.getComputedStyle(i, null) || {
}).marginRight), b.removeChild(i)), b.innerHTML = '<table><tr><td></td><td>t</td></tr></table>', i = b.getElementsByTagName('td'), i[0].style.cssText = 'margin:0;border:0;padding:0;display:none', g = 0 === i[0].offsetHeight, g && (i[0].style.display = '', i[1].style.display = 'none', g = 0 === i[0].offsetHeight), c.removeChild(d))
}
}
}(),
m.swap = function (a, b, c, d) {
var e,
f,
g = {
};
for (f in b) g[f] = a.style[f],
a.style[f] = b[f];
e = c.apply(a, d || []);
for (f in b) a.style[f] = g[f];
return e
};
var Ma = /alpha\([^)]*\)/i,
Na = /opacity\s*=\s*([^)]*)/,
Oa = /^(none|table(?!-c[ea]).+)/,
Pa = new RegExp('^(' + S + ')(.*)$', 'i'),
Qa = new RegExp('^([+-])=(' + S + ')', 'i'),
Ra = {
position: 'absolute',
visibility: 'hidden',
display: 'block'
},
Sa = {
letterSpacing: '0',
fontWeight: '400'
},
Ta = [
'Webkit',
'O',
'Moz',
'ms'
];
function Ua(a, b) {
if (b in a) return b;
var c = b.charAt(0).toUpperCase() + b.slice(1),
d = b,
e = Ta.length;
while (e--) if (b = Ta[e] + c, b in a) return b;
return d
}
function Va(a, b) {
for (var c, d, e, f = [
], g = 0, h = a.length; h > g; g++) d = a[g],
d.style && (f[g] = m._data(d, 'olddisplay'), c = d.style.display, b ? (f[g] || 'none' !== c || (d.style.display = ''), '' === d.style.display && U(d) && (f[g] = m._data(d, 'olddisplay', Fa(d.nodeName))))  : (e = U(d), (c && 'none' !== c || !e) && m._data(d, 'olddisplay', e ? c : m.css(d, 'display'))));
for (g = 0; h > g; g++) d = a[g],
d.style && (b && 'none' !== d.style.display && '' !== d.style.display || (d.style.display = b ? f[g] || '' : 'none'));
return a
}
function Wa(a, b, c) {
var d = Pa.exec(b);
return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || 'px')  : b
}
function Xa(a, b, c, d, e) {
for (var f = c === (d ? 'border' : 'content') ? 4 : 'width' === b ? 1 : 0, g = 0; 4 > f; f += 2) 'margin' === c && (g += m.css(a, c + T[f], !0, e)),
d ? ('content' === c && (g -= m.css(a, 'padding' + T[f], !0, e)), 'margin' !== c && (g -= m.css(a, 'border' + T[f] + 'Width', !0, e)))  : (g += m.css(a, 'padding' + T[f], !0, e), 'padding' !== c && (g += m.css(a, 'border' + T[f] + 'Width', !0, e)));
return g
}
function Ya(a, b, c) {
var d = !0,
e = 'width' === b ? a.offsetWidth : a.offsetHeight,
f = Ia(a),
g = k.boxSizing && 'border-box' === m.css(a, 'boxSizing', !1, f);
if (0 >= e || null == e) {
if (e = Ja(a, b, f), (0 > e || null == e) && (e = a.style[b]), Ha.test(e)) return e;
d = g && (k.boxSizingReliable() || e === a.style[b]),
e = parseFloat(e) || 0
}
return e + Xa(a, b, c || (g ? 'border' : 'content'), d, f) + 'px'
}
m.extend({
cssHooks: {
opacity: {
get: function (a, b) {
if (b) {
var c = Ja(a, 'opacity');
return '' === c ? '1' : c
}
}
}
},
cssNumber: {
columnCount: !0,
fillOpacity: !0,
flexGrow: !0,
flexShrink: !0,
fontWeight: !0,
lineHeight: !0,
opacity: !0,
order: !0,
orphans: !0,
widows: !0,
zIndex: !0,
zoom: !0
},
cssProps: {
'float': k.cssFloat ? 'cssFloat' : 'styleFloat'
},
style: function (a, b, c, d) {
if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
var e,
f,
g,
h = m.camelCase(b),
i = a.style;
if (b = m.cssProps[h] || (m.cssProps[h] = Ua(i, h)), g = m.cssHooks[b] || m.cssHooks[h], void 0 === c) return g && 'get' in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
if (f = typeof c, 'string' === f && (e = Qa.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(m.css(a, b)), f = 'number'), null != c && c === c && ('number' !== f || m.cssNumber[h] || (c += 'px'), k.clearCloneStyle || '' !== c || 0 !== b.indexOf('background') || (i[b] = 'inherit'), !(g && 'set' in g && void 0 === (c = g.set(a, c, d))))) try {
i[b] = c
} catch (j) {
}
}
},
css: function (a, b, c, d) {
var e,
f,
g,
h = m.camelCase(b);
return b = m.cssProps[h] || (m.cssProps[h] = Ua(a.style, h)),
g = m.cssHooks[b] || m.cssHooks[h],
g && 'get' in g && (f = g.get(a, !0, c)),
void 0 === f && (f = Ja(a, b, d)),
'normal' === f && b in Sa && (f = Sa[b]),
'' === c || c ? (e = parseFloat(f), c === !0 || m.isNumeric(e) ? e || 0 : f)  : f
}
}),
m.each(['height',
'width'], function (a, b) {
m.cssHooks[b] = {
get: function (a, c, d) {
return c ? Oa.test(m.css(a, 'display')) && 0 === a.offsetWidth ? m.swap(a, Ra, function () {
return Ya(a, b, d)
})  : Ya(a, b, d)  : void 0
},
set: function (a, c, d) {
var e = d && Ia(a);
return Wa(a, c, d ? Xa(a, b, d, k.boxSizing && 'border-box' === m.css(a, 'boxSizing', !1, e), e)  : 0)
}
}
}),
k.opacity || (m.cssHooks.opacity = {
get: function (a, b) {
return Na.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || '') ? 0.01 * parseFloat(RegExp.$1) + '' : b ? '1' : ''
},
set: function (a, b) {
var c = a.style,
d = a.currentStyle,
e = m.isNumeric(b) ? 'alpha(opacity=' + 100 * b + ')' : '',
f = d && d.filter || c.filter || '';
c.zoom = 1,
(b >= 1 || '' === b) && '' === m.trim(f.replace(Ma, '')) && c.removeAttribute && (c.removeAttribute('filter'), '' === b || d && !d.filter) || (c.filter = Ma.test(f) ? f.replace(Ma, e)  : f + ' ' + e)
}
}),
m.cssHooks.marginRight = La(k.reliableMarginRight, function (a, b) {
return b ? m.swap(a, {
display: 'inline-block'
}, Ja, [
a,
'marginRight'
])  : void 0
}),
m.each({
margin: '',
padding: '',
border: 'Width'
}, function (a, b) {
m.cssHooks[a + b] = {
expand: function (c) {
for (var d = 0, e = {
}, f = 'string' == typeof c ? c.split(' ')  : [
c
]; 4 > d; d++) e[a + T[d] + b] = f[d] || f[d - 2] || f[0];
return e
}
},
Ga.test(a) || (m.cssHooks[a + b].set = Wa)
}),
m.fn.extend({
css: function (a, b) {
return V(this, function (a, b, c) {
var d,
e,
f = {
},
g = 0;
if (m.isArray(b)) {
for (d = Ia(a), e = b.length; e > g; g++) f[b[g]] = m.css(a, b[g], !1, d);
return f
}
return void 0 !== c ? m.style(a, b, c)  : m.css(a, b)
}, a, b, arguments.length > 1)
},
show: function () {
return Va(this, !0)
},
hide: function () {
return Va(this)
},
toggle: function (a) {
return 'boolean' == typeof a ? a ? this.show()  : this.hide()  : this.each(function () {
U(this) ? m(this).show()  : m(this).hide()
})
}
});
function Za(a, b, c, d, e) {
return new Za.prototype.init(a, b, c, d, e)
}
m.Tween = Za,
Za.prototype = {
constructor: Za,
init: function (a, b, c, d, e, f) {
this.elem = a,
this.prop = c,
this.easing = e || 'swing',
this.options = b,
this.start = this.now = this.cur(),
this.end = d,
this.unit = f || (m.cssNumber[c] ? '' : 'px')
},
cur: function () {
var a = Za.propHooks[this.prop];
return a && a.get ? a.get(this)  : Za.propHooks._default.get(this)
},
run: function (a) {
var b,
c = Za.propHooks[this.prop];
return this.options.duration ? this.pos = b = m.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration)  : this.pos = b = a,
this.now = (this.end - this.start) * b + this.start,
this.options.step && this.options.step.call(this.elem, this.now, this),
c && c.set ? c.set(this)  : Za.propHooks._default.set(this),
this
}
},
Za.prototype.init.prototype = Za.prototype,
Za.propHooks = {
_default: {
get: function (a) {
var b;
return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = m.css(a.elem, a.prop, ''), b && 'auto' !== b ? b : 0)  : a.elem[a.prop]
},
set: function (a) {
m.fx.step[a.prop] ? m.fx.step[a.prop](a)  : a.elem.style && (null != a.elem.style[m.cssProps[a.prop]] || m.cssHooks[a.prop]) ? m.style(a.elem, a.prop, a.now + a.unit)  : a.elem[a.prop] = a.now
}
}
},
Za.propHooks.scrollTop = Za.propHooks.scrollLeft = {
set: function (a) {
a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
}
},
m.easing = {
linear: function (a) {
return a
},
swing: function (a) {
return 0.5 - Math.cos(a * Math.PI) / 2
}
},
m.fx = Za.prototype.init,
m.fx.step = {
};
var $a,
_a,
ab = /^(?:toggle|show|hide)$/,
bb = new RegExp('^(?:([+-])=|)(' + S + ')([a-z%]*)$', 'i'),
cb = /queueHooks$/,
db = [
ib
],
eb = {
'*': [
function (a, b) {
var c = this.createTween(a, b),
d = c.cur(),
e = bb.exec(b),
f = e && e[3] || (m.cssNumber[a] ? '' : 'px'),
g = (m.cssNumber[a] || 'px' !== f && + d) && bb.exec(m.css(c.elem, a)),
h = 1,
i = 20;
if (g && g[3] !== f) {
f = f || g[3],
e = e || [],
g = + d || 1;
do h = h || '.5',
g /= h,
m.style(c.elem, a, g + f);
while (h !== (h = c.cur() / d) && 1 !== h && --i)
}
return e && (g = c.start = + g || + d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : + e[2]),
c
}
]
};
function fb() {
return setTimeout(function () {
$a = void 0
}),
$a = m.now()
}
function gb(a, b) {
var c,
d = {
height: a
},
e = 0;
for (b = b ? 1 : 0; 4 > e; e += 2 - b) c = T[e],
d['margin' + c] = d['padding' + c] = a;
return b && (d.opacity = d.width = a),
d
}
function hb(a, b, c) {
for (var d, e = (eb[b] || []).concat(eb['*']), f = 0, g = e.length; g > f; f++) if (d = e[f].call(c, b, a)) return d
}
function ib(a, b, c) {
var d,
e,
f,
g,
h,
i,
j,
l,
n = this,
o = {
},
p = a.style,
q = a.nodeType && U(a),
r = m._data(a, 'fxshow');
c.queue || (h = m._queueHooks(a, 'fx'), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function () {
h.unqueued || i()
}), h.unqueued++, n.always(function () {
n.always(function () {
h.unqueued--,
m.queue(a, 'fx').length || h.empty.fire()
})
})),
1 === a.nodeType && ('height' in b || 'width' in b) && (c.overflow = [
p.overflow,
p.overflowX,
p.overflowY
], j = m.css(a, 'display'), l = 'none' === j ? m._data(a, 'olddisplay') || Fa(a.nodeName)  : j, 'inline' === l && 'none' === m.css(a, 'float') && (k.inlineBlockNeedsLayout && 'inline' !== Fa(a.nodeName) ? p.zoom = 1 : p.display = 'inline-block')),
c.overflow && (p.overflow = 'hidden', k.shrinkWrapBlocks() || n.always(function () {
p.overflow = c.overflow[0],
p.overflowX = c.overflow[1],
p.overflowY = c.overflow[2]
}));
for (d in b) if (e = b[d], ab.exec(e)) {
if (delete b[d], f = f || 'toggle' === e, e === (q ? 'hide' : 'show')) {
if ('show' !== e || !r || void 0 === r[d]) continue;
q = !0
}
o[d] = r && r[d] || m.style(a, d)
} else j = void 0;
if (m.isEmptyObject(o)) 'inline' === ('none' === j ? Fa(a.nodeName)  : j) && (p.display = j);
 else {
r ? 'hidden' in r && (q = r.hidden)  : r = m._data(a, 'fxshow', {
}),
f && (r.hidden = !q),
q ? m(a).show()  : n.done(function () {
m(a).hide()
}),
n.done(function () {
var b;
m._removeData(a, 'fxshow');
for (b in o) m.style(a, b, o[b])
});
for (d in o) g = hb(q ? r[d] : 0, d, n),
d in r || (r[d] = g.start, q && (g.end = g.start, g.start = 'width' === d || 'height' === d ? 1 : 0))
}
}
function jb(a, b) {
var c,
d,
e,
f,
g;
for (c in a) if (d = m.camelCase(c), e = b[d], f = a[c], m.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = m.cssHooks[d], g && 'expand' in g) {
f = g.expand(f),
delete a[d];
for (c in f) c in a || (a[c] = f[c], b[c] = e)
} else b[d] = e
}
function kb(a, b, c) {
var d,
e,
f = 0,
g = db.length,
h = m.Deferred().always(function () {
delete i.elem
}),
i = function () {
if (e) return !1;
for (var b = $a || fb(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
return h.notifyWith(a, [
j,
f,
c
]),
1 > f && i ? c : (h.resolveWith(a, [
j
]), !1)
},
j = h.promise({
elem: a,
props: m.extend({
}, b),
opts: m.extend(!0, {
specialEasing: {
}
}, c),
originalProperties: b,
originalOptions: c,
startTime: $a || fb(),
duration: c.duration,
tweens: [
],
createTween: function (b, c) {
var d = m.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
return j.tweens.push(d),
d
},
stop: function (b) {
var c = 0,
d = b ? j.tweens.length : 0;
if (e) return this;
for (e = !0; d > c; c++) j.tweens[c].run(1);
return b ? h.resolveWith(a, [
j,
b
])  : h.rejectWith(a, [
j,
b
]),
this
}
}),
k = j.props;
for (jb(k, j.opts.specialEasing); g > f; f++) if (d = db[f].call(j, a, k, j.opts)) return d;
return m.map(k, hb, j),
m.isFunction(j.opts.start) && j.opts.start.call(a, j),
m.fx.timer(m.extend(i, {
elem: a,
anim: j,
queue: j.opts.queue
})),
j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
}
m.Animation = m.extend(kb, {
tweener: function (a, b) {
m.isFunction(a) ? (b = a, a = [
'*'
])  : a = a.split(' ');
for (var c, d = 0, e = a.length; e > d; d++) c = a[d],
eb[c] = eb[c] || [],
eb[c].unshift(b)
},
prefilter: function (a, b) {
b ? db.unshift(a)  : db.push(a)
}
}),
m.speed = function (a, b, c) {
var d = a && 'object' == typeof a ? m.extend({
}, a)  : {
complete: c || !c && b || m.isFunction(a) && a,
duration: a,
easing: c && b || b && !m.isFunction(b) && b
};
return d.duration = m.fx.off ? 0 : 'number' == typeof d.duration ? d.duration : d.duration in m.fx.speeds ? m.fx.speeds[d.duration] : m.fx.speeds._default,
(null == d.queue || d.queue === !0) && (d.queue = 'fx'),
d.old = d.complete,
d.complete = function () {
m.isFunction(d.old) && d.old.call(this),
d.queue && m.dequeue(this, d.queue)
},
d
},
m.fn.extend({
fadeTo: function (a, b, c, d) {
return this.filter(U).css('opacity', 0).show().end().animate({
opacity: b
}, a, c, d)
},
animate: function (a, b, c, d) {
var e = m.isEmptyObject(a),
f = m.speed(b, c, d),
g = function () {
var b = kb(this, m.extend({
}, a), f);
(e || m._data(this, 'finish')) && b.stop(!0)
};
return g.finish = g,
e || f.queue === !1 ? this.each(g)  : this.queue(f.queue, g)
},
stop: function (a, b, c) {
var d = function (a) {
var b = a.stop;
delete a.stop,
b(c)
};
return 'string' != typeof a && (c = b, b = a, a = void 0),
b && a !== !1 && this.queue(a || 'fx', [
]),
this.each(function () {
var b = !0,
e = null != a && a + 'queueHooks',
f = m.timers,
g = m._data(this);
if (e) g[e] && g[e].stop && d(g[e]);
 else for (e in g) g[e] && g[e].stop && cb.test(e) && d(g[e]);
for (e = f.length; e--; ) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
(b || !c) && m.dequeue(this, a)
})
},
finish: function (a) {
return a !== !1 && (a = a || 'fx'),
this.each(function () {
var b,
c = m._data(this),
d = c[a + 'queue'],
e = c[a + 'queueHooks'],
f = m.timers,
g = d ? d.length : 0;
for (c.finish = !0, m.queue(this, a, [
]), e && e.stop && e.stop.call(this, !0), b = f.length; b--; ) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
delete c.finish
})
}
}),
m.each(['toggle',
'show',
'hide'], function (a, b) {
var c = m.fn[b];
m.fn[b] = function (a, d, e) {
return null == a || 'boolean' == typeof a ? c.apply(this, arguments)  : this.animate(gb(b, !0), a, d, e)
}
}),
m.each({
slideDown: gb('show'),
slideUp: gb('hide'),
slideToggle: gb('toggle'),
fadeIn: {
opacity: 'show'
},
fadeOut: {
opacity: 'hide'
},
fadeToggle: {
opacity: 'toggle'
}
}, function (a, b) {
m.fn[a] = function (a, c, d) {
return this.animate(b, a, c, d)
}
}),
m.timers = [
],
m.fx.tick = function () {
var a,
b = m.timers,
c = 0;
for ($a = m.now(); c < b.length; c++) a = b[c],
a() || b[c] !== a || b.splice(c--, 1);
b.length || m.fx.stop(),
$a = void 0
},
m.fx.timer = function (a) {
m.timers.push(a),
a() ? m.fx.start()  : m.timers.pop()
},
m.fx.interval = 13,
m.fx.start = function () {
_a || (_a = setInterval(m.fx.tick, m.fx.interval))
},
m.fx.stop = function () {
clearInterval(_a),
_a = null
},
m.fx.speeds = {
slow: 600,
fast: 200,
_default: 400
},
m.fn.delay = function (a, b) {
return a = m.fx ? m.fx.speeds[a] || a : a,
b = b || 'fx',
this.queue(b, function (b, c) {
var d = setTimeout(b, a);
c.stop = function () {
clearTimeout(d)
}
})
},
function () {
var a,
b,
c,
d,
e;
b = y.createElement('div'),
b.setAttribute('className', 't'),
b.innerHTML = '  <link/><table></table><a href=\'/a\'>a</a><input type=\'checkbox\'/>',
d = b.getElementsByTagName('a') [0],
c = y.createElement('select'),
e = c.appendChild(y.createElement('option')),
a = b.getElementsByTagName('input') [0],
d.style.cssText = 'top:1px',
k.getSetAttribute = 't' !== b.className,
k.style = /top/.test(d.getAttribute('style')),
k.hrefNormalized = '/a' === d.getAttribute('href'),
k.checkOn = !!a.value,
k.optSelected = e.selected,
k.enctype = !!y.createElement('form').enctype,
c.disabled = !0,
k.optDisabled = !e.disabled,
a = y.createElement('input'),
a.setAttribute('value', ''),
k.input = '' === a.getAttribute('value'),
a.value = 't',
a.setAttribute('type', 'radio'),
k.radioValue = 't' === a.value
}();
var lb = /\r/g;
m.fn.extend({
val: function (a) {
var b,
c,
d,
e = this[0];
{
if (arguments.length) return d = m.isFunction(a),
this.each(function (c) {
var e;
1 === this.nodeType && (e = d ? a.call(this, c, m(this).val())  : a, null == e ? e = '' : 'number' == typeof e ? e += '' : m.isArray(e) && (e = m.map(e, function (a) {
return null == a ? '' : a + ''
})), b = m.valHooks[this.type] || m.valHooks[this.nodeName.toLowerCase()], b && 'set' in b && void 0 !== b.set(this, e, 'value') || (this.value = e))
});
if (e) return b = m.valHooks[e.type] || m.valHooks[e.nodeName.toLowerCase()],
b && 'get' in b && void 0 !== (c = b.get(e, 'value')) ? c : (c = e.value, 'string' == typeof c ? c.replace(lb, '')  : null == c ? '' : c)
}
}
}),
m.extend({
valHooks: {
option: {
get: function (a) {
var b = m.find.attr(a, 'value');
return null != b ? b : m.trim(m.text(a))
}
},
select: {
get: function (a) {
for (var b, c, d = a.options, e = a.selectedIndex, f = 'select-one' === a.type || 0 > e, g = f ? null : [
], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++) if (c = d[i], !(!c.selected && i !== e || (k.optDisabled ? c.disabled : null !== c.getAttribute('disabled')) || c.parentNode.disabled && m.nodeName(c.parentNode, 'optgroup'))) {
if (b = m(c).val(), f) return b;
g.push(b)
}
return g
},
set: function (a, b) {
var c,
d,
e = a.options,
f = m.makeArray(b),
g = e.length;
while (g--) if (d = e[g], m.inArray(m.valHooks.option.get(d), f) >= 0) try {
d.selected = c = !0
} catch (h) {
d.scrollHeight
} else d.selected = !1;
return c || (a.selectedIndex = - 1),
e
}
}
}
}),
m.each(['radio',
'checkbox'], function () {
m.valHooks[this] = {
set: function (a, b) {
return m.isArray(b) ? a.checked = m.inArray(m(a).val(), b) >= 0 : void 0
}
},
k.checkOn || (m.valHooks[this].get = function (a) {
return null === a.getAttribute('value') ? 'on' : a.value
})
});
var mb,
nb,
ob = m.expr.attrHandle,
pb = /^(?:checked|selected)$/i,
qb = k.getSetAttribute,
rb = k.input;
m.fn.extend({
attr: function (a, b) {
return V(this, m.attr, a, b, arguments.length > 1)
},
removeAttr: function (a) {
return this.each(function () {
m.removeAttr(this, a)
})
}
}),
m.extend({
attr: function (a, b, c) {
var d,
e,
f = a.nodeType;
if (a && 3 !== f && 8 !== f && 2 !== f) return typeof a.getAttribute === K ? m.prop(a, b, c)  : (1 === f && m.isXMLDoc(a) || (b = b.toLowerCase(), d = m.attrHooks[b] || (m.expr.match.bool.test(b) ? nb : mb)), void 0 === c ? d && 'get' in d && null !== (e = d.get(a, b)) ? e : (e = m.find.attr(a, b), null == e ? void 0 : e)  : null !== c ? d && 'set' in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ''), c)  : void m.removeAttr(a, b))
},
removeAttr: function (a, b) {
var c,
d,
e = 0,
f = b && b.match(E);
if (f && 1 === a.nodeType) while (c = f[e++]) d = m.propFix[c] || c,
m.expr.match.bool.test(c) ? rb && qb || !pb.test(c) ? a[d] = !1 : a[m.camelCase('default-' + c)] = a[d] = !1 : m.attr(a, c, ''),
a.removeAttribute(qb ? c : d)
},
attrHooks: {
type: {
set: function (a, b) {
if (!k.radioValue && 'radio' === b && m.nodeName(a, 'input')) {
var c = a.value;
return a.setAttribute('type', b),
c && (a.value = c),
b
}
}
}
}
}),
nb = {
set: function (a, b, c) {
return b === !1 ? m.removeAttr(a, c)  : rb && qb || !pb.test(c) ? a.setAttribute(!qb && m.propFix[c] || c, c)  : a[m.camelCase('default-' + c)] = a[c] = !0,
c
}
},
m.each(m.expr.match.bool.source.match(/\w+/g), function (a, b) {
var c = ob[b] || m.find.attr;
ob[b] = rb && qb || !pb.test(b) ? function (a, b, d) {
var e,
f;
return d || (f = ob[b], ob[b] = e, e = null != c(a, b, d) ? b.toLowerCase()  : null, ob[b] = f),
e
}
 : function (a, b, c) {
return c ? void 0 : a[m.camelCase('default-' + b)] ? b.toLowerCase()  : null
}
}),
rb && qb || (m.attrHooks.value = {
set: function (a, b, c) {
return m.nodeName(a, 'input') ? void (a.defaultValue = b)  : mb && mb.set(a, b, c)
}
}),
qb || (mb = {
set: function (a, b, c) {
var d = a.getAttributeNode(c);
return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)),
d.value = b += '',
'value' === c || b === a.getAttribute(c) ? b : void 0
}
}, ob.id = ob.name = ob.coords = function (a, b, c) {
var d;
return c ? void 0 : (d = a.getAttributeNode(b)) && '' !== d.value ? d.value : null
}, m.valHooks.button = {
get: function (a, b) {
var c = a.getAttributeNode(b);
return c && c.specified ? c.value : void 0
},
set: mb.set
}, m.attrHooks.contenteditable = {
set: function (a, b, c) {
mb.set(a, '' === b ? !1 : b, c)
}
}, m.each(['width',
'height'], function (a, b) {
m.attrHooks[b] = {
set: function (a, c) {
return '' === c ? (a.setAttribute(b, 'auto'), c)  : void 0
}
}
})),
k.style || (m.attrHooks.style = {
get: function (a) {
return a.style.cssText || void 0
},
set: function (a, b) {
return a.style.cssText = b + ''
}
});
var sb = /^(?:input|select|textarea|button|object)$/i,
tb = /^(?:a|area)$/i;
m.fn.extend({
prop: function (a, b) {
return V(this, m.prop, a, b, arguments.length > 1)
},
removeProp: function (a) {
return a = m.propFix[a] || a,
this.each(function () {
try {
this[a] = void 0,
delete this[a]
} catch (b) {
}
})
}
}),
m.extend({
propFix: {
'for': 'htmlFor',
'class': 'className'
},
prop: function (a, b, c) {
var d,
e,
f,
g = a.nodeType;
if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !m.isXMLDoc(a),
f && (b = m.propFix[b] || b, e = m.propHooks[b]),
void 0 !== c ? e && 'set' in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && 'get' in e && null !== (d = e.get(a, b)) ? d : a[b]
},
propHooks: {
tabIndex: {
get: function (a) {
var b = m.find.attr(a, 'tabindex');
return b ? parseInt(b, 10)  : sb.test(a.nodeName) || tb.test(a.nodeName) && a.href ? 0 : - 1
}
}
}
}),
k.hrefNormalized || m.each(['href',
'src'], function (a, b) {
m.propHooks[b] = {
get: function (a) {
return a.getAttribute(b, 4)
}
}
}),
k.optSelected || (m.propHooks.selected = {
get: function (a) {
var b = a.parentNode;
return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex),
null
}
}),
m.each(['tabIndex',
'readOnly',
'maxLength',
'cellSpacing',
'cellPadding',
'rowSpan',
'colSpan',
'useMap',
'frameBorder',
'contentEditable'], function () {
m.propFix[this.toLowerCase()] = this
}),
k.enctype || (m.propFix.enctype = 'encoding');
var ub = /[\t\r\n\f]/g;
m.fn.extend({
addClass: function (a) {
var b,
c,
d,
e,
f,
g,
h = 0,
i = this.length,
j = 'string' == typeof a && a;
if (m.isFunction(a)) return this.each(function (b) {
m(this).addClass(a.call(this, b, this.className))
});
if (j) for (b = (a || '').match(E) || []; i > h; h++) if (c = this[h], d = 1 === c.nodeType && (c.className ? (' ' + c.className + ' ').replace(ub, ' ')  : ' ')) {
f = 0;
while (e = b[f++]) d.indexOf(' ' + e + ' ') < 0 && (d += e + ' ');
g = m.trim(d),
c.className !== g && (c.className = g)
}
return this
},
removeClass: function (a) {
var b,
c,
d,
e,
f,
g,
h = 0,
i = this.length,
j = 0 === arguments.length || 'string' == typeof a && a;
if (m.isFunction(a)) return this.each(function (b) {
m(this).removeClass(a.call(this, b, this.className))
});
if (j) for (b = (a || '').match(E) || []; i > h; h++) if (c = this[h], d = 1 === c.nodeType && (c.className ? (' ' + c.className + ' ').replace(ub, ' ')  : '')) {
f = 0;
while (e = b[f++]) while (d.indexOf(' ' + e + ' ') >= 0) d = d.replace(' ' + e + ' ', ' ');
g = a ? m.trim(d)  : '',
c.className !== g && (c.className = g)
}
return this
},
toggleClass: function (a, b) {
var c = typeof a;
return 'boolean' == typeof b && 'string' === c ? b ? this.addClass(a)  : this.removeClass(a)  : this.each(m.isFunction(a) ? function (c) {
m(this).toggleClass(a.call(this, c, this.className, b), b)
}
 : function () {
if ('string' === c) {
var b,
d = 0,
e = m(this),
f = a.match(E) || [];
while (b = f[d++]) e.hasClass(b) ? e.removeClass(b)  : e.addClass(b)
} else (c === K || 'boolean' === c) && (this.className && m._data(this, '__className__', this.className), this.className = this.className || a === !1 ? '' : m._data(this, '__className__') || '')
})
},
hasClass: function (a) {
for (var b = ' ' + a + ' ', c = 0, d = this.length; d > c; c++) if (1 === this[c].nodeType && (' ' + this[c].className + ' ').replace(ub, ' ').indexOf(b) >= 0) return !0;
return !1
}
}),
m.each('blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu'.split(' '), function (a, b) {
m.fn[b] = function (a, c) {
return arguments.length > 0 ? this.on(b, null, a, c)  : this.trigger(b)
}
}),
m.fn.extend({
hover: function (a, b) {
return this.mouseenter(a).mouseleave(b || a)
},
bind: function (a, b, c) {
return this.on(a, null, b, c)
},
unbind: function (a, b) {
return this.off(a, null, b)
},
delegate: function (a, b, c, d) {
return this.on(b, a, c, d)
},
undelegate: function (a, b, c) {
return 1 === arguments.length ? this.off(a, '**')  : this.off(b, a || '**', c)
}
});
var vb = m.now(),
wb = /\?/,
xb = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
m.parseJSON = function (b) {
if (a.JSON && a.JSON.parse) return a.JSON.parse(b + '');
var c,
d = null,
e = m.trim(b + '');
return e && !m.trim(e.replace(xb, function (a, b, e, f) {
return c && b && (d = 0),
0 === d ? a : (c = e || b, d += !f - !e, '')
})) ? Function('return ' + e) ()  : m.error('Invalid JSON: ' + b)
},
m.parseXML = function (b) {
var c,
d;
if (!b || 'string' != typeof b) return null;
try {
a.DOMParser ? (d = new DOMParser, c = d.parseFromString(b, 'text/xml'))  : (c = new ActiveXObject('Microsoft.XMLDOM'), c.async = 'false', c.loadXML(b))
} catch (e) {
c = void 0
}
return c && c.documentElement && !c.getElementsByTagName('parsererror').length || m.error('Invalid XML: ' + b),
c
};
var yb,
zb,
Ab = /#.*$/,
Bb = /([?&])_=[^&]*/,
Cb = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
Db = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
Eb = /^(?:GET|HEAD)$/,
Fb = /^\/\//,
Gb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
Hb = {
},
Ib = {
},
Jb = '*/'.concat('*');
try {
zb = location.href
} catch (Kb) {
zb = y.createElement('a'),
zb.href = '',
zb = zb.href
}
yb = Gb.exec(zb.toLowerCase()) || [];
function Lb(a) {
return function (b, c) {
'string' != typeof b && (c = b, b = '*');
var d,
e = 0,
f = b.toLowerCase().match(E) || [];
if (m.isFunction(c)) while (d = f[e++]) '+' === d.charAt(0) ? (d = d.slice(1) || '*', (a[d] = a[d] || []).unshift(c))  : (a[d] = a[d] || []).push(c)
}
}
function Mb(a, b, c, d) {
var e = {
},
f = a === Ib;
function g(h) {
var i;
return e[h] = !0,
m.each(a[h] || [], function (a, h) {
var j = h(b, c, d);
return 'string' != typeof j || f || e[j] ? f ? !(i = j)  : void 0 : (b.dataTypes.unshift(j), g(j), !1)
}),
i
}
return g(b.dataTypes[0]) || !e['*'] && g('*')
}
function Nb(a, b) {
var c,
d,
e = m.ajaxSettings.flatOptions || {
};
for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {
})) [d] = b[d]);
return c && m.extend(!0, a, c),
a
}
function Ob(a, b, c) {
var d,
e,
f,
g,
h = a.contents,
i = a.dataTypes;
while ('*' === i[0]) i.shift(),
void 0 === e && (e = a.mimeType || b.getResponseHeader('Content-Type'));
if (e) for (g in h) if (h[g] && h[g].test(e)) {
i.unshift(g);
break
}
if (i[0] in c) f = i[0];
 else {
for (g in c) {
if (!i[0] || a.converters[g + ' ' + i[0]]) {
f = g;
break
}
d || (d = g)
}
f = f || d
}
return f ? (f !== i[0] && i.unshift(f), c[f])  : void 0
}
function Pb(a, b, c, d) {
var e,
f,
g,
h,
i,
j = {
},
k = a.dataTypes.slice();
if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
f = k.shift();
while (f) if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift()) if ('*' === f) f = i;
 else if ('*' !== i && i !== f) {
if (g = j[i + ' ' + f] || j['* ' + f], !g) for (e in j) if (h = e.split(' '), h[1] === f && (g = j[i + ' ' + h[0]] || j['* ' + h[0]])) {
g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
break
}
if (g !== !0) if (g && a['throws']) b = g(b);
 else try {
b = g(b)
} catch (l) {
return {
state: 'parsererror',
error: g ? l : 'No conversion from ' + i + ' to ' + f
}
}
}
return {
state: 'success',
data: b
}
}
m.extend({
active: 0,
lastModified: {
},
etag: {
},
ajaxSettings: {
url: zb,
type: 'GET',
isLocal: Db.test(yb[1]),
global: !0,
processData: !0,
async: !0,
contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
accepts: {
'*': Jb,
text: 'text/plain',
html: 'text/html',
xml: 'application/xml, text/xml',
json: 'application/json, text/javascript'
},
contents: {
xml: /xml/,
html: /html/,
json: /json/
},
responseFields: {
xml: 'responseXML',
text: 'responseText',
json: 'responseJSON'
},
converters: {
'* text': String,
'text html': !0,
'text json': m.parseJSON,
'text xml': m.parseXML
},
flatOptions: {
url: !0,
context: !0
}
},
ajaxSetup: function (a, b) {
return b ? Nb(Nb(a, m.ajaxSettings), b)  : Nb(m.ajaxSettings, a)
},
ajaxPrefilter: Lb(Hb),
ajaxTransport: Lb(Ib),
ajax: function (a, b) {
'object' == typeof a && (b = a, a = void 0),
b = b || {
};
var c,
d,
e,
f,
g,
h,
i,
j,
k = m.ajaxSetup({
}, b),
l = k.context || k,
n = k.context && (l.nodeType || l.jquery) ? m(l)  : m.event,
o = m.Deferred(),
p = m.Callbacks('once memory'),
q = k.statusCode || {
},
r = {
},
s = {
},
t = 0,
u = 'canceled',
v = {
readyState: 0,
getResponseHeader: function (a) {
var b;
if (2 === t) {
if (!j) {
j = {
};
while (b = Cb.exec(f)) j[b[1].toLowerCase()] = b[2]
}
b = j[a.toLowerCase()]
}
return null == b ? null : b
},
getAllResponseHeaders: function () {
return 2 === t ? f : null
},
setRequestHeader: function (a, b) {
var c = a.toLowerCase();
return t || (a = s[c] = s[c] || a, r[a] = b),
this
},
overrideMimeType: function (a) {
return t || (k.mimeType = a),
this
},
statusCode: function (a) {
var b;
if (a) if (2 > t) for (b in a) q[b] = [
q[b],
a[b]
];
 else v.always(a[v.status]);
return this
},
abort: function (a) {
var b = a || u;
return i && i.abort(b),
x(0, b),
this
}
};
if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, k.url = ((a || k.url || zb) + '').replace(Ab, '').replace(Fb, yb[1] + '//'), k.type = b.method || b.type || k.method || k.type, k.dataTypes = m.trim(k.dataType || '*').toLowerCase().match(E) || [''], null == k.crossDomain && (c = Gb.exec(k.url.toLowerCase()), k.crossDomain = !(!c || c[1] === yb[1] && c[2] === yb[2] && (c[3] || ('http:' === c[1] ? '80' : '443')) === (yb[3] || ('http:' === yb[1] ? '80' : '443')))), k.data && k.processData && 'string' != typeof k.data && (k.data = m.param(k.data, k.traditional)), Mb(Hb, k, b, v), 2 === t) return v;
h = m.event && k.global,
h && 0 === m.active++ && m.event.trigger('ajaxStart'),
k.type = k.type.toUpperCase(),
k.hasContent = !Eb.test(k.type),
e = k.url,
k.hasContent || (k.data && (e = k.url += (wb.test(e) ? '&' : '?') + k.data, delete k.data), k.cache === !1 && (k.url = Bb.test(e) ? e.replace(Bb, '$1_=' + vb++)  : e + (wb.test(e) ? '&' : '?') + '_=' + vb++)),
k.ifModified && (m.lastModified[e] && v.setRequestHeader('If-Modified-Since', m.lastModified[e]), m.etag[e] && v.setRequestHeader('If-None-Match', m.etag[e])),
(k.data && k.hasContent && k.contentType !== !1 || b.contentType) && v.setRequestHeader('Content-Type', k.contentType),
v.setRequestHeader('Accept', k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + ('*' !== k.dataTypes[0] ? ', ' + Jb + '; q=0.01' : '')  : k.accepts['*']);
for (d in k.headers) v.setRequestHeader(d, k.headers[d]);
if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || 2 === t)) return v.abort();
u = 'abort';
for (d in {
success: 1,
error: 1,
complete: 1
}) v[d](k[d]);
if (i = Mb(Ib, k, b, v)) {
v.readyState = 1,
h && n.trigger('ajaxSend', [
v,
k
]),
k.async && k.timeout > 0 && (g = setTimeout(function () {
v.abort('timeout')
}, k.timeout));
try {
t = 1,
i.send(r, x)
} catch (w) {
if (!(2 > t)) throw w;
x( - 1, w)
}
} else x( - 1, 'No Transport');
function x(a, b, c, d) {
var j,
r,
s,
u,
w,
x = b;
2 !== t && (t = 2, g && clearTimeout(g), i = void 0, f = d || '', v.readyState = a > 0 ? 4 : 0, j = a >= 200 && 300 > a || 304 === a, c && (u = Ob(k, v, c)), u = Pb(k, u, v, j), j ? (k.ifModified && (w = v.getResponseHeader('Last-Modified'), w && (m.lastModified[e] = w), w = v.getResponseHeader('etag'), w && (m.etag[e] = w)), 204 === a || 'HEAD' === k.type ? x = 'nocontent' : 304 === a ? x = 'notmodified' : (x = u.state, r = u.data, s = u.error, j = !s))  : (s = x, (a || !x) && (x = 'error', 0 > a && (a = 0))), v.status = a, v.statusText = (b || x) + '', j ? o.resolveWith(l, [
r,
x,
v
])  : o.rejectWith(l, [
v,
x,
s
]), v.statusCode(q), q = void 0, h && n.trigger(j ? 'ajaxSuccess' : 'ajaxError', [
v,
k,
j ? r : s
]), p.fireWith(l, [
v,
x
]), h && (n.trigger('ajaxComplete', [
v,
k
]), --m.active || m.event.trigger('ajaxStop')))
}
return v
},
getJSON: function (a, b, c) {
return m.get(a, b, c, 'json')
},
getScript: function (a, b) {
return m.get(a, void 0, b, 'script')
}
}),
m.each(['get',
'post'], function (a, b) {
m[b] = function (a, c, d, e) {
return m.isFunction(c) && (e = e || d, d = c, c = void 0),
m.ajax({
url: a,
type: b,
dataType: e,
data: c,
success: d
})
}
}),
m._evalUrl = function (a) {
return m.ajax({
url: a,
type: 'GET',
dataType: 'script',
async: !1,
global: !1,
'throws': !0
})
},
m.fn.extend({
wrapAll: function (a) {
if (m.isFunction(a)) return this.each(function (b) {
m(this).wrapAll(a.call(this, b))
});
if (this[0]) {
var b = m(a, this[0].ownerDocument).eq(0).clone(!0);
this[0].parentNode && b.insertBefore(this[0]),
b.map(function () {
var a = this;
while (a.firstChild && 1 === a.firstChild.nodeType) a = a.firstChild;
return a
}).append(this)
}
return this
},
wrapInner: function (a) {
return this.each(m.isFunction(a) ? function (b) {
m(this).wrapInner(a.call(this, b))
}
 : function () {
var b = m(this),
c = b.contents();
c.length ? c.wrapAll(a)  : b.append(a)
})
},
wrap: function (a) {
var b = m.isFunction(a);
return this.each(function (c) {
m(this).wrapAll(b ? a.call(this, c)  : a)
})
},
unwrap: function () {
return this.parent().each(function () {
m.nodeName(this, 'body') || m(this).replaceWith(this.childNodes)
}).end()
}
}),
m.expr.filters.hidden = function (a) {
return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !k.reliableHiddenOffsets() && 'none' === (a.style && a.style.display || m.css(a, 'display'))
},
m.expr.filters.visible = function (a) {
return !m.expr.filters.hidden(a)
};
var Qb = /%20/g,
Rb = /\[\]$/,
Sb = /\r?\n/g,
Tb = /^(?:submit|button|image|reset|file)$/i,
Ub = /^(?:input|select|textarea|keygen)/i;
function Vb(a, b, c, d) {
var e;
if (m.isArray(b)) m.each(b, function (b, e) {
c || Rb.test(a) ? d(a, e)  : Vb(a + '[' + ('object' == typeof e ? b : '') + ']', e, c, d)
});
 else if (c || 'object' !== m.type(b)) d(a, b);
 else for (e in b) Vb(a + '[' + e + ']', b[e], c, d)
}
m.param = function (a, b) {
var c,
d = [
],
e = function (a, b) {
b = m.isFunction(b) ? b()  : null == b ? '' : b,
d[d.length] = encodeURIComponent(a) + '=' + encodeURIComponent(b)
};
if (void 0 === b && (b = m.ajaxSettings && m.ajaxSettings.traditional), m.isArray(a) || a.jquery && !m.isPlainObject(a)) m.each(a, function () {
e(this.name, this.value)
});
 else for (c in a) Vb(c, a[c], b, e);
return d.join('&').replace(Qb, '+')
},
m.fn.extend({
serialize: function () {
return m.param(this.serializeArray())
},
serializeArray: function () {
return this.map(function () {
var a = m.prop(this, 'elements');
return a ? m.makeArray(a)  : this
}).filter(function () {
var a = this.type;
return this.name && !m(this).is(':disabled') && Ub.test(this.nodeName) && !Tb.test(a) && (this.checked || !W.test(a))
}).map(function (a, b) {
var c = m(this).val();
return null == c ? null : m.isArray(c) ? m.map(c, function (a) {
return {
name: b.name,
value: a.replace(Sb, '\r\n')
}
})  : {
name: b.name,
value: c.replace(Sb, '\r\n')
}
}).get()
}
}),
m.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function () {
return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && Zb() || $b()
}
 : Zb;
var Wb = 0,
Xb = {
},
Yb = m.ajaxSettings.xhr();
a.attachEvent && a.attachEvent('onunload', function () {
for (var a in Xb) Xb[a](void 0, !0)
}),
k.cors = !!Yb && 'withCredentials' in Yb,
Yb = k.ajax = !!Yb,
Yb && m.ajaxTransport(function (a) {
if (!a.crossDomain || k.cors) {
var b;
return {
send: function (c, d) {
var e,
f = a.xhr(),
g = ++Wb;
if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields) for (e in a.xhrFields) f[e] = a.xhrFields[e];
a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType),
a.crossDomain || c['X-Requested-With'] || (c['X-Requested-With'] = 'XMLHttpRequest');
for (e in c) void 0 !== c[e] && f.setRequestHeader(e, c[e] + '');
f.send(a.hasContent && a.data || null),
b = function (c, e) {
var h,
i,
j;
if (b && (e || 4 === f.readyState)) if (delete Xb[g], b = void 0, f.onreadystatechange = m.noop, e) 4 !== f.readyState && f.abort();
 else {
j = {
},
h = f.status,
'string' == typeof f.responseText && (j.text = f.responseText);
try {
i = f.statusText
} catch (k) {
i = ''
}
h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204)  : h = j.text ? 200 : 404
}
j && d(h, i, j, f.getAllResponseHeaders())
},
a.async ? 4 === f.readyState ? setTimeout(b)  : f.onreadystatechange = Xb[g] = b : b()
},
abort: function () {
b && b(void 0, !0)
}
}
}
});
function Zb() {
try {
return new a.XMLHttpRequest
} catch (b) {
}
}
function $b() {
try {
return new a.ActiveXObject('Microsoft.XMLHTTP')
} catch (b) {
}
}
m.ajaxSetup({
accepts: {
script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
},
contents: {
script: /(?:java|ecma)script/
},
converters: {
'text script': function (a) {
return m.globalEval(a),
a
}
}
}),
m.ajaxPrefilter('script', function (a) {
void 0 === a.cache && (a.cache = !1),
a.crossDomain && (a.type = 'GET', a.global = !1)
}),
m.ajaxTransport('script', function (a) {
if (a.crossDomain) {
var b,
c = y.head || m('head') [0] || y.documentElement;
return {
send: function (d, e) {
b = y.createElement('script'),
b.async = !0,
a.scriptCharset && (b.charset = a.scriptCharset),
b.src = a.url,
b.onload = b.onreadystatechange = function (a, c) {
(c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, 'success'))
},
c.insertBefore(b, c.firstChild)
},
abort: function () {
b && b.onload(void 0, !0)
}
}
}
});
var _b = [
],
ac = /(=)\?(?=&|$)|\?\?/;
m.ajaxSetup({
jsonp: 'callback',
jsonpCallback: function () {
var a = _b.pop() || m.expando + '_' + vb++;
return this[a] = !0,
a
}
}),
m.ajaxPrefilter('json jsonp', function (b, c, d) {
var e,
f,
g,
h = b.jsonp !== !1 && (ac.test(b.url) ? 'url' : 'string' == typeof b.data && !(b.contentType || '').indexOf('application/x-www-form-urlencoded') && ac.test(b.data) && 'data');
return h || 'jsonp' === b.dataTypes[0] ? (e = b.jsonpCallback = m.isFunction(b.jsonpCallback) ? b.jsonpCallback()  : b.jsonpCallback, h ? b[h] = b[h].replace(ac, '$1' + e)  : b.jsonp !== !1 && (b.url += (wb.test(b.url) ? '&' : '?') + b.jsonp + '=' + e), b.converters['script json'] = function () {
return g || m.error(e + ' was not called'),
g[0]
}, b.dataTypes[0] = 'json', f = a[e], a[e] = function () {
g = arguments
}, d.always(function () {
a[e] = f,
b[e] && (b.jsonpCallback = c.jsonpCallback, _b.push(e)),
g && m.isFunction(f) && f(g[0]),
g = f = void 0
}), 'script')  : void 0
}),
m.parseHTML = function (a, b, c) {
if (!a || 'string' != typeof a) return null;
'boolean' == typeof b && (c = b, b = !1),
b = b || y;
var d = u.exec(a),
e = !c && [];
return d ? [
b.createElement(d[1])
] : (d = m.buildFragment([a], b, e), e && e.length && m(e).remove(), m.merge([], d.childNodes))
};
var bc = m.fn.load;
m.fn.load = function (a, b, c) {
if ('string' != typeof a && bc) return bc.apply(this, arguments);
var d,
e,
f,
g = this,
h = a.indexOf(' ');
return h >= 0 && (d = m.trim(a.slice(h, a.length)), a = a.slice(0, h)),
m.isFunction(b) ? (c = b, b = void 0)  : b && 'object' == typeof b && (f = 'POST'),
g.length > 0 && m.ajax({
url: a,
type: f,
dataType: 'html',
data: b
}).done(function (a) {
e = arguments,
g.html(d ? m('<div>').append(m.parseHTML(a)).find(d)  : a)
}).complete(c && function (a, b) {
g.each(c, e || [a.responseText,
b,
a])
}),
this
},
m.each(['ajaxStart',
'ajaxStop',
'ajaxComplete',
'ajaxError',
'ajaxSuccess',
'ajaxSend'], function (a, b) {
m.fn[b] = function (a) {
return this.on(b, a)
}
}),
m.expr.filters.animated = function (a) {
return m.grep(m.timers, function (b) {
return a === b.elem
}).length
};
var cc = a.document.documentElement;
function dc(a) {
return m.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
}
m.offset = {
setOffset: function (a, b, c) {
var d,
e,
f,
g,
h,
i,
j,
k = m.css(a, 'position'),
l = m(a),
n = {
};
'static' === k && (a.style.position = 'relative'),
h = l.offset(),
f = m.css(a, 'top'),
i = m.css(a, 'left'),
j = ('absolute' === k || 'fixed' === k) && m.inArray('auto', [
f,
i
]) > - 1,
j ? (d = l.position(), g = d.top, e = d.left)  : (g = parseFloat(f) || 0, e = parseFloat(i) || 0),
m.isFunction(b) && (b = b.call(a, c, h)),
null != b.top && (n.top = b.top - h.top + g),
null != b.left && (n.left = b.left - h.left + e),
'using' in b ? b.using.call(a, n)  : l.css(n)
}
},
m.fn.extend({
offset: function (a) {
if (arguments.length) return void 0 === a ? this : this.each(function (b) {
m.offset.setOffset(this, a, b)
});
var b,
c,
d = {
top: 0,
left: 0
},
e = this[0],
f = e && e.ownerDocument;
if (f) return b = f.documentElement,
m.contains(b, e) ? (typeof e.getBoundingClientRect !== K && (d = e.getBoundingClientRect()), c = dc(f), {
top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
})  : d
},
position: function () {
if (this[0]) {
var a,
b,
c = {
top: 0,
left: 0
},
d = this[0];
return 'fixed' === m.css(d, 'position') ? b = d.getBoundingClientRect()  : (a = this.offsetParent(), b = this.offset(), m.nodeName(a[0], 'html') || (c = a.offset()), c.top += m.css(a[0], 'borderTopWidth', !0), c.left += m.css(a[0], 'borderLeftWidth', !0)),
{
top: b.top - c.top - m.css(d, 'marginTop', !0),
left: b.left - c.left - m.css(d, 'marginLeft', !0)
}
}
},
offsetParent: function () {
return this.map(function () {
var a = this.offsetParent || cc;
while (a && !m.nodeName(a, 'html') && 'static' === m.css(a, 'position')) a = a.offsetParent;
return a || cc
})
}
}),
m.each({
scrollLeft: 'pageXOffset',
scrollTop: 'pageYOffset'
}, function (a, b) {
var c = /Y/.test(b);
m.fn[a] = function (d) {
return V(this, function (a, d, e) {
var f = dc(a);
return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void (f ? f.scrollTo(c ? m(f).scrollLeft()  : e, c ? e : m(f).scrollTop())  : a[d] = e)
}, a, d, arguments.length, null)
}
}),
m.each(['top',
'left'], function (a, b) {
m.cssHooks[b] = La(k.pixelPosition, function (a, c) {
return c ? (c = Ja(a, b), Ha.test(c) ? m(a).position() [b] + 'px' : c)  : void 0
})
}),
m.each({
Height: 'height',
Width: 'width'
}, function (a, b) {
m.each({
padding: 'inner' + a,
content: b,
'': 'outer' + a
}, function (c, d) {
m.fn[d] = function (d, e) {
var f = arguments.length && (c || 'boolean' != typeof d),
g = c || (d === !0 || e === !0 ? 'margin' : 'border');
return V(this, function (b, c, d) {
var e;
return m.isWindow(b) ? b.document.documentElement['client' + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body['scroll' + a], e['scroll' + a], b.body['offset' + a], e['offset' + a], e['client' + a]))  : void 0 === d ? m.css(b, c, g)  : m.style(b, c, d, g)
}, b, f ? d : void 0, f, null)
}
})
}),
m.fn.size = function () {
return this.length
},
m.fn.andSelf = m.fn.addBack,
'function' == typeof define && define.amd && define('jquery', [
], function () {
return m
});
var ec = a.jQuery,
fc = a.$;
return m.noConflict = function (b) {
return a.$ === m && (a.$ = fc),
b && a.jQuery === m && (a.jQuery = ec),
m
},
typeof b === K && (a.jQuery = a.$ = m),
m
});
;
(function ($) {
var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g,
meta = {
'': '\\b',
'\t': '\\t',
'\n': '\\n',
'\f': '\\f',
'\r': '\\r',
'"': '\\"',
'\\': '\\\\'
};
$.toJSON = typeof JSON === 'object' && JSON.stringify ? JSON.stringify : function (o) {
if (o === null) {
return 'null';
}
var type = typeof o;
if (type === 'undefined') {
return undefined;
}
if (type === 'number' || type === 'boolean') {
return '' + o;
}
if (type === 'string') {
return $.quoteString(o);
}
if (type === 'object') {
if (typeof o.toJSON === 'function') {
return $.toJSON(o.toJSON());
}
if (o.constructor === Date) {
var month = o.getUTCMonth() + 1,
day = o.getUTCDate(),
year = o.getUTCFullYear(),
hours = o.getUTCHours(),
minutes = o.getUTCMinutes(),
seconds = o.getUTCSeconds(),
milli = o.getUTCMilliseconds();
if (month < 10) {
month = '0' + month;
}
if (day < 10) {
day = '0' + day;
}
if (hours < 10) {
hours = '0' + hours;
}
if (minutes < 10) {
minutes = '0' + minutes;
}
if (seconds < 10) {
seconds = '0' + seconds;
}
if (milli < 100) {
milli = '0' + milli;
}
if (milli < 10) {
milli = '0' + milli;
}
return '"' + year + '-' + month + '-' + day + 'T' +
hours + ':' + minutes + ':' + seconds + '.' + milli + 'Z"';
}
if (o.constructor === Array) {
var ret = [
];
for (var i = 0; i < o.length; i++) {
ret.push($.toJSON(o[i]) || 'null');
}
return '[' + ret.join(',') + ']';
}
var name,
val,
pairs = [
];
for (var k in o) {
type = typeof k;
if (type === 'number') {
name = '"' + k + '"';
} else if (type === 'string') {
name = $.quoteString(k);
} else {
continue;
}
type = typeof o[k];
if (type === 'function' || type === 'undefined') {
continue;
}
val = $.toJSON(o[k]);
pairs.push(name + ':' + val);
}
return '{' + pairs.join(',') + '}';
}
};
$.evalJSON = typeof JSON === 'object' && JSON.parse ? JSON.parse : function (src) {
return eval('(' + src + ')');
};
$.secureEvalJSON = typeof JSON === 'object' && JSON.parse ? JSON.parse : function (src) {
var filtered = src.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, '');
if (/^[\],:{}\s]*$/.test(filtered)) {
return eval('(' + src + ')');
} else {
throw new SyntaxError('Error parsing JSON, source is not valid.');
}
};
$.quoteString = function (string) {
if (string.match(escapeable)) {
return '"' + string.replace(escapeable, function (a) {
var c = meta[a];
if (typeof c === 'string') {
return c;
}
c = a.charCodeAt();
return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
}) + '"';
}
return '"' + string + '"';
};
}) (jQuery);
;
/*! jQuery UI - v1.11.2 - 2014-11-10
* http://jqueryui.com
* Includes: core.js, widget.js, mouse.js, draggable.js, droppable.js, resizable.js, sortable.js
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */
(function (e) {
'function' == typeof define && define.amd ? define(['jquery'], e)  : e(jQuery)
}) (function (e) {
function t(t, s) {
var n,
a,
o,
r = t.nodeName.toLowerCase();
return 'area' === r ? (n = t.parentNode, a = n.name, t.href && a && 'map' === n.nodeName.toLowerCase() ? (o = e('img[usemap=\'#' + a + '\']') [0], !!o && i(o))  : !1)  : (/input|select|textarea|button|object/.test(r) ? !t.disabled : 'a' === r ? t.href || s : s) && i(t)
}
function i(t) {
return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function () {
return 'hidden' === e.css(this, 'visibility')
}).length
}
e.ui = e.ui || {
},
e.extend(e.ui, {
version: '1.11.2',
keyCode: {
BACKSPACE: 8,
COMMA: 188,
DELETE: 46,
DOWN: 40,
END: 35,
ENTER: 13,
ESCAPE: 27,
HOME: 36,
LEFT: 37,
PAGE_DOWN: 34,
PAGE_UP: 33,
PERIOD: 190,
RIGHT: 39,
SPACE: 32,
TAB: 9,
UP: 38
}
}),
e.fn.extend({
scrollParent: function (t) {
var i = this.css('position'),
s = 'absolute' === i,
n = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
a = this.parents().filter(function () {
var t = e(this);
return s && 'static' === t.css('position') ? !1 : n.test(t.css('overflow') + t.css('overflow-y') + t.css('overflow-x'))
}).eq(0);
return 'fixed' !== i && a.length ? a : e(this[0].ownerDocument || document)
},
uniqueId: function () {
var e = 0;
return function () {
return this.each(function () {
this.id || (this.id = 'ui-id-' + ++e)
})
}
}(),
removeUniqueId: function () {
return this.each(function () {
/^ui-id-\d+$/.test(this.id) && e(this).removeAttr('id')
})
}
}),
e.extend(e.expr[':'], {
data: e.expr.createPseudo ? e.expr.createPseudo(function (t) {
return function (i) {
return !!e.data(i, t)
}
})  : function (t, i, s) {
return !!e.data(t, s[3])
},
focusable: function (i) {
return t(i, !isNaN(e.attr(i, 'tabindex')))
},
tabbable: function (i) {
var s = e.attr(i, 'tabindex'),
n = isNaN(s);
return (n || s >= 0) && t(i, !n)
}
}),
e('<a>').outerWidth(1).jquery || e.each(['Width',
'Height'], function (t, i) {
function s(t, i, s, a) {
return e.each(n, function () {
i -= parseFloat(e.css(t, 'padding' + this)) || 0,
s && (i -= parseFloat(e.css(t, 'border' + this + 'Width')) || 0),
a && (i -= parseFloat(e.css(t, 'margin' + this)) || 0)
}),
i
}
var n = 'Width' === i ? [
'Left',
'Right'
] : [
'Top',
'Bottom'
],
a = i.toLowerCase(),
o = {
innerWidth: e.fn.innerWidth,
innerHeight: e.fn.innerHeight,
outerWidth: e.fn.outerWidth,
outerHeight: e.fn.outerHeight
};
e.fn['inner' + i] = function (t) {
return void 0 === t ? o['inner' + i].call(this)  : this.each(function () {
e(this).css(a, s(this, t) + 'px')
})
},
e.fn['outer' + i] = function (t, n) {
return 'number' != typeof t ? o['outer' + i].call(this, t)  : this.each(function () {
e(this).css(a, s(this, t, !0, n) + 'px')
})
}
}),
e.fn.addBack || (e.fn.addBack = function (e) {
return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
}),
e('<a>').data('a-b', 'a').removeData('a-b').data('a-b') && (e.fn.removeData = function (t) {
return function (i) {
return arguments.length ? t.call(this, e.camelCase(i))  : t.call(this)
}
}(e.fn.removeData)),
e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),
e.fn.extend({
focus: function (t) {
return function (i, s) {
return 'number' == typeof i ? this.each(function () {
var t = this;
setTimeout(function () {
e(t).focus(),
s && s.call(t)
}, i)
})  : t.apply(this, arguments)
}
}(e.fn.focus),
disableSelection: function () {
var e = 'onselectstart' in document.createElement('div') ? 'selectstart' : 'mousedown';
return function () {
return this.bind(e + '.ui-disableSelection', function (e) {
e.preventDefault()
})
}
}(),
enableSelection: function () {
return this.unbind('.ui-disableSelection')
},
zIndex: function (t) {
if (void 0 !== t) return this.css('zIndex', t);
if (this.length) for (var i, s, n = e(this[0]); n.length && n[0] !== document; ) {
if (i = n.css('position'), ('absolute' === i || 'relative' === i || 'fixed' === i) && (s = parseInt(n.css('zIndex'), 10), !isNaN(s) && 0 !== s)) return s;
n = n.parent()
}
return 0
}
}),
e.ui.plugin = {
add: function (t, i, s) {
var n,
a = e.ui[t].prototype;
for (n in s) a.plugins[n] = a.plugins[n] || [],
a.plugins[n].push([i,
s[n]])
},
call: function (e, t, i, s) {
var n,
a = e.plugins[t];
if (a && (s || e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType)) for (n = 0; a.length > n; n++) e.options[a[n][0]] && a[n][1].apply(e.element, i)
}
};
var s = 0,
n = Array.prototype.slice;
e.cleanData = function (t) {
return function (i) {
var s,
n,
a;
for (a = 0; null != (n = i[a]); a++) try {
s = e._data(n, 'events'),
s && s.remove && e(n).triggerHandler('remove')
} catch (o) {
}
t(i)
}
}(e.cleanData),
e.widget = function (t, i, s) {
var n,
a,
o,
r,
h = {
},
l = t.split('.') [0];
return t = t.split('.') [1],
n = l + '-' + t,
s || (s = i, i = e.Widget),
e.expr[':'][n.toLowerCase()] = function (t) {
return !!e.data(t, n)
},
e[l] = e[l] || {
},
a = e[l][t],
o = e[l][t] = function (e, t) {
return this._createWidget ? (arguments.length && this._createWidget(e, t), void 0)  : new o(e, t)
},
e.extend(o, a, {
version: s.version,
_proto: e.extend({
}, s),
_childConstructors: [
]
}),
r = new i,
r.options = e.widget.extend({
}, r.options),
e.each(s, function (t, s) {
return e.isFunction(s) ? (h[t] = function () {
var e = function () {
return i.prototype[t].apply(this, arguments)
},
n = function (e) {
return i.prototype[t].apply(this, e)
};
return function () {
var t,
i = this._super,
a = this._superApply;
return this._super = e,
this._superApply = n,
t = s.apply(this, arguments),
this._super = i,
this._superApply = a,
t
}
}(), void 0)  : (h[t] = s, void 0)
}),
o.prototype = e.widget.extend(r, {
widgetEventPrefix: a ? r.widgetEventPrefix || t : t
}, h, {
constructor: o,
namespace: l,
widgetName: t,
widgetFullName: n
}),
a ? (e.each(a._childConstructors, function (t, i) {
var s = i.prototype;
e.widget(s.namespace + '.' + s.widgetName, o, i._proto)
}), delete a._childConstructors)  : i._childConstructors.push(o),
e.widget.bridge(t, o),
o
},
e.widget.extend = function (t) {
for (var i, s, a = n.call(arguments, 1), o = 0, r = a.length; r > o; o++) for (i in a[o]) s = a[o][i],
a[o].hasOwnProperty(i) && void 0 !== s && (t[i] = e.isPlainObject(s) ? e.isPlainObject(t[i]) ? e.widget.extend({
}, t[i], s)  : e.widget.extend({
}, s)  : s);
return t
},
e.widget.bridge = function (t, i) {
var s = i.prototype.widgetFullName || t;
e.fn[t] = function (a) {
var o = 'string' == typeof a,
r = n.call(arguments, 1),
h = this;
return a = !o && r.length ? e.widget.extend.apply(null, [
a
].concat(r))  : a,
o ? this.each(function () {
var i,
n = e.data(this, s);
return 'instance' === a ? (h = n, !1)  : n ? e.isFunction(n[a]) && '_' !== a.charAt(0) ? (i = n[a].apply(n, r), i !== n && void 0 !== i ? (h = i && i.jquery ? h.pushStack(i.get())  : i, !1)  : void 0)  : e.error('no such method \'' + a + '\' for ' + t + ' widget instance')  : e.error('cannot call methods on ' + t + ' prior to initialization; ' + 'attempted to call method \'' + a + '\'')
})  : this.each(function () {
var t = e.data(this, s);
t ? (t.option(a || {
}), t._init && t._init())  : e.data(this, s, new i(a, this))
}),
h
}
},
e.Widget = function () {
},
e.Widget._childConstructors = [
],
e.Widget.prototype = {
widgetName: 'widget',
widgetEventPrefix: '',
defaultElement: '<div>',
options: {
disabled: !1,
create: null
},
_createWidget: function (t, i) {
i = e(i || this.defaultElement || this) [0],
this.element = e(i),
this.uuid = s++,
this.eventNamespace = '.' + this.widgetName + this.uuid,
this.bindings = e(),
this.hoverable = e(),
this.focusable = e(),
i !== this && (e.data(i, this.widgetFullName, this), this._on(!0, this.element, {
remove: function (e) {
e.target === i && this.destroy()
}
}), this.document = e(i.style ? i.ownerDocument : i.document || i), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)),
this.options = e.widget.extend({
}, this.options, this._getCreateOptions(), t),
this._create(),
this._trigger('create', null, this._getCreateEventData()),
this._init()
},
_getCreateOptions: e.noop,
_getCreateEventData: e.noop,
_create: e.noop,
_init: e.noop,
destroy: function () {
this._destroy(),
this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),
this.widget().unbind(this.eventNamespace).removeAttr('aria-disabled').removeClass(this.widgetFullName + '-disabled ' + 'ui-state-disabled'),
this.bindings.unbind(this.eventNamespace),
this.hoverable.removeClass('ui-state-hover'),
this.focusable.removeClass('ui-state-focus')
},
_destroy: e.noop,
widget: function () {
return this.element
},
option: function (t, i) {
var s,
n,
a,
o = t;
if (0 === arguments.length) return e.widget.extend({
}, this.options);
if ('string' == typeof t) if (o = {
}, s = t.split('.'), t = s.shift(), s.length) {
for (n = o[t] = e.widget.extend({
}, this.options[t]), a = 0; s.length - 1 > a; a++) n[s[a]] = n[s[a]] || {
},
n = n[s[a]];
if (t = s.pop(), 1 === arguments.length) return void 0 === n[t] ? null : n[t];
n[t] = i
} else {
if (1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t];
o[t] = i
}
return this._setOptions(o),
this
},
_setOptions: function (e) {
var t;
for (t in e) this._setOption(t, e[t]);
return this
},
_setOption: function (e, t) {
return this.options[e] = t,
'disabled' === e && (this.widget().toggleClass(this.widgetFullName + '-disabled', !!t), t && (this.hoverable.removeClass('ui-state-hover'), this.focusable.removeClass('ui-state-focus'))),
this
},
enable: function () {
return this._setOptions({
disabled: !1
})
},
disable: function () {
return this._setOptions({
disabled: !0
})
},
_on: function (t, i, s) {
var n,
a = this;
'boolean' != typeof t && (s = i, i = t, t = !1),
s ? (i = n = e(i), this.bindings = this.bindings.add(i))  : (s = i, i = this.element, n = this.widget()),
e.each(s, function (s, o) {
function r() {
return t || a.options.disabled !== !0 && !e(this).hasClass('ui-state-disabled') ? ('string' == typeof o ? a[o] : o).apply(a, arguments)  : void 0
}
'string' != typeof o && (r.guid = o.guid = o.guid || r.guid || e.guid++);
var h = s.match(/^([\w:-]*)\s*(.*)$/),
l = h[1] + a.eventNamespace,
u = h[2];
u ? n.delegate(u, l, r)  : i.bind(l, r)
})
},
_off: function (t, i) {
i = (i || '').split(' ').join(this.eventNamespace + ' ') + this.eventNamespace,
t.unbind(i).undelegate(i),
this.bindings = e(this.bindings.not(t).get()),
this.focusable = e(this.focusable.not(t).get()),
this.hoverable = e(this.hoverable.not(t).get())
},
_delay: function (e, t) {
function i() {
return ('string' == typeof e ? s[e] : e).apply(s, arguments)
}
var s = this;
return setTimeout(i, t || 0)
},
_hoverable: function (t) {
this.hoverable = this.hoverable.add(t),
this._on(t, {
mouseenter: function (t) {
e(t.currentTarget).addClass('ui-state-hover')
},
mouseleave: function (t) {
e(t.currentTarget).removeClass('ui-state-hover')
}
})
},
_focusable: function (t) {
this.focusable = this.focusable.add(t),
this._on(t, {
focusin: function (t) {
e(t.currentTarget).addClass('ui-state-focus')
},
focusout: function (t) {
e(t.currentTarget).removeClass('ui-state-focus')
}
})
},
_trigger: function (t, i, s) {
var n,
a,
o = this.options[t];
if (s = s || {
}, i = e.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], a = i.originalEvent) for (n in a) n in i || (i[n] = a[n]);
return this.element.trigger(i, s),
!(e.isFunction(o) && o.apply(this.element[0], [
i
].concat(s)) === !1 || i.isDefaultPrevented())
}
},
e.each({
show: 'fadeIn',
hide: 'fadeOut'
}, function (t, i) {
e.Widget.prototype['_' + t] = function (s, n, a) {
'string' == typeof n && (n = {
effect: n
});
var o,
r = n ? n === !0 || 'number' == typeof n ? i : n.effect || i : t;
n = n || {
},
'number' == typeof n && (n = {
duration: n
}),
o = !e.isEmptyObject(n),
n.complete = a,
n.delay && s.delay(n.delay),
o && e.effects && e.effects.effect[r] ? s[t](n)  : r !== t && s[r] ? s[r](n.duration, n.easing, a)  : s.queue(function (i) {
e(this) [t](),
a && a.call(s[0]),
i()
})
}
}),
e.widget;
var a = !1;
e(document).mouseup(function () {
a = !1
}),
e.widget('ui.mouse', {
version: '1.11.2',
options: {
cancel: 'input,textarea,button,select,option',
distance: 1,
delay: 0
},
_mouseInit: function () {
var t = this;
this.element.bind('mousedown.' + this.widgetName, function (e) {
return t._mouseDown(e)
}).bind('click.' + this.widgetName, function (i) {
return !0 === e.data(i.target, t.widgetName + '.preventClickEvent') ? (e.removeData(i.target, t.widgetName + '.preventClickEvent'), i.stopImmediatePropagation(), !1)  : void 0
}),
this.started = !1
},
_mouseDestroy: function () {
this.element.unbind('.' + this.widgetName),
this._mouseMoveDelegate && this.document.unbind('mousemove.' + this.widgetName, this._mouseMoveDelegate).unbind('mouseup.' + this.widgetName, this._mouseUpDelegate)
},
_mouseDown: function (t) {
if (!a) {
this._mouseMoved = !1,
this._mouseStarted && this._mouseUp(t),
this._mouseDownEvent = t;
var i = this,
s = 1 === t.which,
n = 'string' == typeof this.options.cancel && t.target.nodeName ? e(t.target).closest(this.options.cancel).length : !1;
return s && !n && this._mouseCapture(t) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
i.mouseDelayMet = !0
}, this.options.delay)), this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(t) !== !1, !this._mouseStarted) ? (t.preventDefault(), !0)  : (!0 === e.data(t.target, this.widgetName + '.preventClickEvent') && e.removeData(t.target, this.widgetName + '.preventClickEvent'), this._mouseMoveDelegate = function (e) {
return i._mouseMove(e)
}, this._mouseUpDelegate = function (e) {
return i._mouseUp(e)
}, this.document.bind('mousemove.' + this.widgetName, this._mouseMoveDelegate).bind('mouseup.' + this.widgetName, this._mouseUpDelegate), t.preventDefault(), a = !0, !0))  : !0
}
},
_mouseMove: function (t) {
if (this._mouseMoved) {
if (e.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button) return this._mouseUp(t);
if (!t.which) return this._mouseUp(t)
}
return (t.which || t.button) && (this._mouseMoved = !0),
this._mouseStarted ? (this._mouseDrag(t), t.preventDefault())  : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t)  : this._mouseUp(t)), !this._mouseStarted)
},
_mouseUp: function (t) {
return this.document.unbind('mousemove.' + this.widgetName, this._mouseMoveDelegate).unbind('mouseup.' + this.widgetName, this._mouseUpDelegate),
this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + '.preventClickEvent', !0), this._mouseStop(t)),
a = !1,
!1
},
_mouseDistanceMet: function (e) {
return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
},
_mouseDelayMet: function () {
return this.mouseDelayMet
},
_mouseStart: function () {
},
_mouseDrag: function () {
},
_mouseStop: function () {
},
_mouseCapture: function () {
return !0
}
}),
e.widget('ui.draggable', e.ui.mouse, {
version: '1.11.2',
widgetEventPrefix: 'drag',
options: {
addClasses: !0,
appendTo: 'parent',
axis: !1,
connectToSortable: !1,
containment: !1,
cursor: 'auto',
cursorAt: !1,
grid: !1,
handle: !1,
helper: 'original',
iframeFix: !1,
opacity: !1,
refreshPositions: !1,
revert: !1,
revertDuration: 500,
scope: 'default',
scroll: !0,
scrollSensitivity: 20,
scrollSpeed: 20,
snap: !1,
snapMode: 'both',
snapTolerance: 20,
stack: !1,
zIndex: !1,
drag: null,
start: null,
stop: null
},
_create: function () {
'original' === this.options.helper && this._setPositionRelative(),
this.options.addClasses && this.element.addClass('ui-draggable'),
this.options.disabled && this.element.addClass('ui-draggable-disabled'),
this._setHandleClassName(),
this._mouseInit()
},
_setOption: function (e, t) {
this._super(e, t),
'handle' === e && (this._removeHandleClassName(), this._setHandleClassName())
},
_destroy: function () {
return (this.helper || this.element).is('.ui-draggable-dragging') ? (this.destroyOnClear = !0, void 0)  : (this.element.removeClass('ui-draggable ui-draggable-dragging ui-draggable-disabled'), this._removeHandleClassName(), this._mouseDestroy(), void 0)
},
_mouseCapture: function (t) {
var i = this.options;
return this._blurActiveElement(t),
this.helper || i.disabled || e(t.target).closest('.ui-resizable-handle').length > 0 ? !1 : (this.handle = this._getHandle(t), this.handle ? (this._blockFrames(i.iframeFix === !0 ? 'iframe' : i.iframeFix), !0)  : !1)
},
_blockFrames: function (t) {
this.iframeBlocks = this.document.find(t).map(function () {
var t = e(this);
return e('<div>').css('position', 'absolute').appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset()) [0]
})
},
_unblockFrames: function () {
this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
},
_blurActiveElement: function (t) {
var i = this.document[0];
if (this.handleElement.is(t.target)) try {
i.activeElement && 'body' !== i.activeElement.nodeName.toLowerCase() && e(i.activeElement).blur()
} catch (s) {
}
},
_mouseStart: function (t) {
var i = this.options;
return this.helper = this._createHelper(t),
this.helper.addClass('ui-draggable-dragging'),
this._cacheHelperProportions(),
e.ui.ddmanager && (e.ui.ddmanager.current = this),
this._cacheMargins(),
this.cssPosition = this.helper.css('position'),
this.scrollParent = this.helper.scrollParent(!0),
this.offsetParent = this.helper.offsetParent(),
this.hasFixedAncestor = this.helper.parents().filter(function () {
return 'fixed' === e(this).css('position')
}).length > 0,
this.positionAbs = this.element.offset(),
this._refreshOffsets(t),
this.originalPosition = this.position = this._generatePosition(t, !1),
this.originalPageX = t.pageX,
this.originalPageY = t.pageY,
i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt),
this._setContainment(),
this._trigger('start', t) === !1 ? (this._clear(), !1)  : (this._cacheHelperProportions(), e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this._normalizeRightBottom(), this._mouseDrag(t, !0), e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t), !0)
},
_refreshOffsets: function (e) {
this.offset = {
top: this.positionAbs.top - this.margins.top,
left: this.positionAbs.left - this.margins.left,
scroll: !1,
parent: this._getParentOffset(),
relative: this._getRelativeOffset()
},
this.offset.click = {
left: e.pageX - this.offset.left,
top: e.pageY - this.offset.top
}
},
_mouseDrag: function (t, i) {
if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(t, !0), this.positionAbs = this._convertPositionTo('absolute'), !i) {
var s = this._uiHash();
if (this._trigger('drag', t, s) === !1) return this._mouseUp({
}),
!1;
this.position = s.position
}
return this.helper[0].style.left = this.position.left + 'px',
this.helper[0].style.top = this.position.top + 'px',
e.ui.ddmanager && e.ui.ddmanager.drag(this, t),
!1
},
_mouseStop: function (t) {
var i = this,
s = !1;
return e.ui.ddmanager && !this.options.dropBehaviour && (s = e.ui.ddmanager.drop(this, t)),
this.dropped && (s = this.dropped, this.dropped = !1),
'invalid' === this.options.revert && !s || 'valid' === this.options.revert && s || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
i._trigger('stop', t) !== !1 && i._clear()
})  : this._trigger('stop', t) !== !1 && this._clear(),
!1
},
_mouseUp: function (t) {
return this._unblockFrames(),
e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t),
this.handleElement.is(t.target) && this.element.focus(),
e.ui.mouse.prototype._mouseUp.call(this, t)
},
cancel: function () {
return this.helper.is('.ui-draggable-dragging') ? this._mouseUp({
})  : this._clear(),
this
},
_getHandle: function (t) {
return this.options.handle ? !!e(t.target).closest(this.element.find(this.options.handle)).length : !0
},
_setHandleClassName: function () {
this.handleElement = this.options.handle ? this.element.find(this.options.handle)  : this.element,
this.handleElement.addClass('ui-draggable-handle')
},
_removeHandleClassName: function () {
this.handleElement.removeClass('ui-draggable-handle')
},
_createHelper: function (t) {
var i = this.options,
s = e.isFunction(i.helper),
n = s ? e(i.helper.apply(this.element[0], [
t
]))  : 'clone' === i.helper ? this.element.clone().removeAttr('id')  : this.element;
return n.parents('body').length || n.appendTo('parent' === i.appendTo ? this.element[0].parentNode : i.appendTo),
s && n[0] === this.element[0] && this._setPositionRelative(),
n[0] === this.element[0] || /(fixed|absolute)/.test(n.css('position')) || n.css('position', 'absolute'),
n
},
_setPositionRelative: function () {
/^(?:r|a|f)/.test(this.element.css('position')) || (this.element[0].style.position = 'relative')
},
_adjustOffsetFromHelper: function (t) {
'string' == typeof t && (t = t.split(' ')),
e.isArray(t) && (t = {
left: + t[0],
top: + t[1] || 0
}),
'left' in t && (this.offset.click.left = t.left + this.margins.left),
'right' in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left),
'top' in t && (this.offset.click.top = t.top + this.margins.top),
'bottom' in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
},
_isRootNode: function (e) {
return /(html|body)/i.test(e.tagName) || e === this.document[0]
},
_getParentOffset: function () {
var t = this.offsetParent.offset(),
i = this.document[0];
return 'absolute' === this.cssPosition && this.scrollParent[0] !== i && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()),
this._isRootNode(this.offsetParent[0]) && (t = {
top: 0,
left: 0
}),
{
top: t.top + (parseInt(this.offsetParent.css('borderTopWidth'), 10) || 0),
left: t.left + (parseInt(this.offsetParent.css('borderLeftWidth'), 10) || 0)
}
},
_getRelativeOffset: function () {
if ('relative' !== this.cssPosition) return {
top: 0,
left: 0
};
var e = this.element.position(),
t = this._isRootNode(this.scrollParent[0]);
return {
top: e.top - (parseInt(this.helper.css('top'), 10) || 0) + (t ? 0 : this.scrollParent.scrollTop()),
left: e.left - (parseInt(this.helper.css('left'), 10) || 0) + (t ? 0 : this.scrollParent.scrollLeft())
}
},
_cacheMargins: function () {
this.margins = {
left: parseInt(this.element.css('marginLeft'), 10) || 0,
top: parseInt(this.element.css('marginTop'), 10) || 0,
right: parseInt(this.element.css('marginRight'), 10) || 0,
bottom: parseInt(this.element.css('marginBottom'), 10) || 0
}
},
_cacheHelperProportions: function () {
this.helperProportions = {
width: this.helper.outerWidth(),
height: this.helper.outerHeight()
}
},
_setContainment: function () {
var t,
i,
s,
n = this.options,
a = this.document[0];
return this.relativeContainer = null,
n.containment ? 'window' === n.containment ? (this.containment = [
e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left,
e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top,
e(window).scrollLeft() + e(window).width() - this.helperProportions.width - this.margins.left,
e(window).scrollTop() + (e(window).height() || a.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
], void 0)  : 'document' === n.containment ? (this.containment = [
0,
0,
e(a).width() - this.helperProportions.width - this.margins.left,
(e(a).height() || a.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
], void 0)  : n.containment.constructor === Array ? (this.containment = n.containment, void 0)  : ('parent' === n.containment && (n.containment = this.helper[0].parentNode), i = e(n.containment), s = i[0], s && (t = /(scroll|auto)/.test(i.css('overflow')), this.containment = [
(parseInt(i.css('borderLeftWidth'), 10) || 0) + (parseInt(i.css('paddingLeft'), 10) || 0),
(parseInt(i.css('borderTopWidth'), 10) || 0) + (parseInt(i.css('paddingTop'), 10) || 0),
(t ? Math.max(s.scrollWidth, s.offsetWidth)  : s.offsetWidth) - (parseInt(i.css('borderRightWidth'), 10) || 0) - (parseInt(i.css('paddingRight'), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right,
(t ? Math.max(s.scrollHeight, s.offsetHeight)  : s.offsetHeight) - (parseInt(i.css('borderBottomWidth'), 10) || 0) - (parseInt(i.css('paddingBottom'), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom
], this.relativeContainer = i), void 0)  : (this.containment = null, void 0)
},
_convertPositionTo: function (e, t) {
t || (t = this.position);
var i = 'absolute' === e ? 1 : - 1,
s = this._isRootNode(this.scrollParent[0]);
return {
top: t.top + this.offset.relative.top * i + this.offset.parent.top * i - ('fixed' === this.cssPosition ? - this.offset.scroll.top : s ? 0 : this.offset.scroll.top) * i,
left: t.left + this.offset.relative.left * i + this.offset.parent.left * i - ('fixed' === this.cssPosition ? - this.offset.scroll.left : s ? 0 : this.offset.scroll.left) * i
}
},
_generatePosition: function (e, t) {
var i,
s,
n,
a,
o = this.options,
r = this._isRootNode(this.scrollParent[0]),
h = e.pageX,
l = e.pageY;
return r && this.offset.scroll || (this.offset.scroll = {
top: this.scrollParent.scrollTop(),
left: this.scrollParent.scrollLeft()
}),
t && (this.containment && (this.relativeContainer ? (s = this.relativeContainer.offset(), i = [
this.containment[0] + s.left,
this.containment[1] + s.top,
this.containment[2] + s.left,
this.containment[3] + s.top
])  : i = this.containment, e.pageX - this.offset.click.left < i[0] && (h = i[0] + this.offset.click.left), e.pageY - this.offset.click.top < i[1] && (l = i[1] + this.offset.click.top), e.pageX - this.offset.click.left > i[2] && (h = i[2] + this.offset.click.left), e.pageY - this.offset.click.top > i[3] && (l = i[3] + this.offset.click.top)), o.grid && (n = o.grid[1] ? this.originalPageY + Math.round((l - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY, l = i ? n - this.offset.click.top >= i[1] || n - this.offset.click.top > i[3] ? n : n - this.offset.click.top >= i[1] ? n - o.grid[1] : n + o.grid[1] : n, a = o.grid[0] ? this.originalPageX + Math.round((h - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX, h = i ? a - this.offset.click.left >= i[0] || a - this.offset.click.left > i[2] ? a : a - this.offset.click.left >= i[0] ? a - o.grid[0] : a + o.grid[0] : a), 'y' === o.axis && (h = this.originalPageX), 'x' === o.axis && (l = this.originalPageY)),
{
top: l - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ('fixed' === this.cssPosition ? - this.offset.scroll.top : r ? 0 : this.offset.scroll.top),
left: h - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ('fixed' === this.cssPosition ? - this.offset.scroll.left : r ? 0 : this.offset.scroll.left)
}
},
_clear: function () {
this.helper.removeClass('ui-draggable-dragging'),
this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(),
this.helper = null,
this.cancelHelperRemoval = !1,
this.destroyOnClear && this.destroy()
},
_normalizeRightBottom: function () {
'y' !== this.options.axis && 'auto' !== this.helper.css('right') && (this.helper.width(this.helper.width()), this.helper.css('right', 'auto')),
'x' !== this.options.axis && 'auto' !== this.helper.css('bottom') && (this.helper.height(this.helper.height()), this.helper.css('bottom', 'auto'))
},
_trigger: function (t, i, s) {
return s = s || this._uiHash(),
e.ui.plugin.call(this, t, [
i,
s,
this
], !0),
/^(drag|start|stop)/.test(t) && (this.positionAbs = this._convertPositionTo('absolute'), s.offset = this.positionAbs),
e.Widget.prototype._trigger.call(this, t, i, s)
},
plugins: {
},
_uiHash: function () {
return {
helper: this.helper,
position: this.position,
originalPosition: this.originalPosition,
offset: this.positionAbs
}
}
}),
e.ui.plugin.add('draggable', 'connectToSortable', {
start: function (t, i, s) {
var n = e.extend({
}, i, {
item: s.element
});
s.sortables = [
],
e(s.options.connectToSortable).each(function () {
var i = e(this).sortable('instance');
i && !i.options.disabled && (s.sortables.push(i), i.refreshPositions(), i._trigger('activate', t, n))
})
},
stop: function (t, i, s) {
var n = e.extend({
}, i, {
item: s.element
});
s.cancelHelperRemoval = !1,
e.each(s.sortables, function () {
var e = this;
e.isOver ? (e.isOver = 0, s.cancelHelperRemoval = !0, e.cancelHelperRemoval = !1, e._storedCSS = {
position: e.placeholder.css('position'),
top: e.placeholder.css('top'),
left: e.placeholder.css('left')
}, e._mouseStop(t), e.options.helper = e.options._helper)  : (e.cancelHelperRemoval = !0, e._trigger('deactivate', t, n))
})
},
drag: function (t, i, s) {
e.each(s.sortables, function () {
var n = !1,
a = this;
a.positionAbs = s.positionAbs,
a.helperProportions = s.helperProportions,
a.offset.click = s.offset.click,
a._intersectsWith(a.containerCache) && (n = !0, e.each(s.sortables, function () {
return this.positionAbs = s.positionAbs,
this.helperProportions = s.helperProportions,
this.offset.click = s.offset.click,
this !== a && this._intersectsWith(this.containerCache) && e.contains(a.element[0], this.element[0]) && (n = !1),
n
})),
n ? (a.isOver || (a.isOver = 1, a.currentItem = i.helper.appendTo(a.element).data('ui-sortable-item', !0), a.options._helper = a.options.helper, a.options.helper = function () {
return i.helper[0]
}, t.target = a.currentItem[0], a._mouseCapture(t, !0), a._mouseStart(t, !0, !0), a.offset.click.top = s.offset.click.top, a.offset.click.left = s.offset.click.left, a.offset.parent.left -= s.offset.parent.left - a.offset.parent.left, a.offset.parent.top -= s.offset.parent.top - a.offset.parent.top, s._trigger('toSortable', t), s.dropped = a.element, e.each(s.sortables, function () {
this.refreshPositions()
}), s.currentItem = s.element, a.fromOutside = s), a.currentItem && (a._mouseDrag(t), i.position = a.position))  : a.isOver && (a.isOver = 0, a.cancelHelperRemoval = !0, a.options._revert = a.options.revert, a.options.revert = !1, a._trigger('out', t, a._uiHash(a)), a._mouseStop(t, !0), a.options.revert = a.options._revert, a.options.helper = a.options._helper, a.placeholder && a.placeholder.remove(), s._refreshOffsets(t), i.position = s._generatePosition(t, !0), s._trigger('fromSortable', t), s.dropped = !1, e.each(s.sortables, function () {
this.refreshPositions()
}))
})
}
}),
e.ui.plugin.add('draggable', 'cursor', {
start: function (t, i, s) {
var n = e('body'),
a = s.options;
n.css('cursor') && (a._cursor = n.css('cursor')),
n.css('cursor', a.cursor)
},
stop: function (t, i, s) {
var n = s.options;
n._cursor && e('body').css('cursor', n._cursor)
}
}),
e.ui.plugin.add('draggable', 'opacity', {
start: function (t, i, s) {
var n = e(i.helper),
a = s.options;
n.css('opacity') && (a._opacity = n.css('opacity')),
n.css('opacity', a.opacity)
},
stop: function (t, i, s) {
var n = s.options;
n._opacity && e(i.helper).css('opacity', n._opacity)
}
}),
e.ui.plugin.add('draggable', 'scroll', {
start: function (e, t, i) {
i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)),
i.scrollParentNotHidden[0] !== i.document[0] && 'HTML' !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset())
},
drag: function (t, i, s) {
var n = s.options,
a = !1,
o = s.scrollParentNotHidden[0],
r = s.document[0];
o !== r && 'HTML' !== o.tagName ? (n.axis && 'x' === n.axis || (s.overflowOffset.top + o.offsetHeight - t.pageY < n.scrollSensitivity ? o.scrollTop = a = o.scrollTop + n.scrollSpeed : t.pageY - s.overflowOffset.top < n.scrollSensitivity && (o.scrollTop = a = o.scrollTop - n.scrollSpeed)), n.axis && 'y' === n.axis || (s.overflowOffset.left + o.offsetWidth - t.pageX < n.scrollSensitivity ? o.scrollLeft = a = o.scrollLeft + n.scrollSpeed : t.pageX - s.overflowOffset.left < n.scrollSensitivity && (o.scrollLeft = a = o.scrollLeft - n.scrollSpeed)))  : (n.axis && 'x' === n.axis || (t.pageY - e(r).scrollTop() < n.scrollSensitivity ? a = e(r).scrollTop(e(r).scrollTop() - n.scrollSpeed)  : e(window).height() - (t.pageY - e(r).scrollTop()) < n.scrollSensitivity && (a = e(r).scrollTop(e(r).scrollTop() + n.scrollSpeed))), n.axis && 'y' === n.axis || (t.pageX - e(r).scrollLeft() < n.scrollSensitivity ? a = e(r).scrollLeft(e(r).scrollLeft() - n.scrollSpeed)  : e(window).width() - (t.pageX - e(r).scrollLeft()) < n.scrollSensitivity && (a = e(r).scrollLeft(e(r).scrollLeft() + n.scrollSpeed)))),
a !== !1 && e.ui.ddmanager && !n.dropBehaviour && e.ui.ddmanager.prepareOffsets(s, t)
}
}),
e.ui.plugin.add('draggable', 'snap', {
start: function (t, i, s) {
var n = s.options;
s.snapElements = [
],
e(n.snap.constructor !== String ? n.snap.items || ':data(ui-draggable)' : n.snap).each(function () {
var t = e(this),
i = t.offset();
this !== s.element[0] && s.snapElements.push({
item: this,
width: t.outerWidth(),
height: t.outerHeight(),
top: i.top,
left: i.left
})
})
},
drag: function (t, i, s) {
var n,
a,
o,
r,
h,
l,
u,
d,
c,
p,
f = s.options,
m = f.snapTolerance,
g = i.offset.left,
v = g + s.helperProportions.width,
y = i.offset.top,
b = y + s.helperProportions.height;
for (c = s.snapElements.length - 1; c >= 0; c--) h = s.snapElements[c].left - s.margins.left,
l = h + s.snapElements[c].width,
u = s.snapElements[c].top - s.margins.top,
d = u + s.snapElements[c].height,
h - m > v || g > l + m || u - m > b || y > d + m || !e.contains(s.snapElements[c].item.ownerDocument, s.snapElements[c].item) ? (s.snapElements[c].snapping && s.options.snap.release && s.options.snap.release.call(s.element, t, e.extend(s._uiHash(), {
snapItem: s.snapElements[c].item
})), s.snapElements[c].snapping = !1)  : ('inner' !== f.snapMode && (n = m >= Math.abs(u - b), a = m >= Math.abs(d - y), o = m >= Math.abs(h - v), r = m >= Math.abs(l - g), n && (i.position.top = s._convertPositionTo('relative', {
top: u - s.helperProportions.height,
left: 0
}).top), a && (i.position.top = s._convertPositionTo('relative', {
top: d,
left: 0
}).top), o && (i.position.left = s._convertPositionTo('relative', {
top: 0,
left: h - s.helperProportions.width
}).left), r && (i.position.left = s._convertPositionTo('relative', {
top: 0,
left: l
}).left)), p = n || a || o || r, 'outer' !== f.snapMode && (n = m >= Math.abs(u - y), a = m >= Math.abs(d - b), o = m >= Math.abs(h - g), r = m >= Math.abs(l - v), n && (i.position.top = s._convertPositionTo('relative', {
top: u,
left: 0
}).top), a && (i.position.top = s._convertPositionTo('relative', {
top: d - s.helperProportions.height,
left: 0
}).top), o && (i.position.left = s._convertPositionTo('relative', {
top: 0,
left: h
}).left), r && (i.position.left = s._convertPositionTo('relative', {
top: 0,
left: l - s.helperProportions.width
}).left)), !s.snapElements[c].snapping && (n || a || o || r || p) && s.options.snap.snap && s.options.snap.snap.call(s.element, t, e.extend(s._uiHash(), {
snapItem: s.snapElements[c].item
})), s.snapElements[c].snapping = n || a || o || r || p)
}
}),
e.ui.plugin.add('draggable', 'stack', {
start: function (t, i, s) {
var n,
a = s.options,
o = e.makeArray(e(a.stack)).sort(function (t, i) {
return (parseInt(e(t).css('zIndex'), 10) || 0) - (parseInt(e(i).css('zIndex'), 10) || 0)
});
o.length && (n = parseInt(e(o[0]).css('zIndex'), 10) || 0, e(o).each(function (t) {
e(this).css('zIndex', n + t)
}), this.css('zIndex', n + o.length))
}
}),
e.ui.plugin.add('draggable', 'zIndex', {
start: function (t, i, s) {
var n = e(i.helper),
a = s.options;
n.css('zIndex') && (a._zIndex = n.css('zIndex')),
n.css('zIndex', a.zIndex)
},
stop: function (t, i, s) {
var n = s.options;
n._zIndex && e(i.helper).css('zIndex', n._zIndex)
}
}),
e.ui.draggable,
e.widget('ui.droppable', {
version: '1.11.2',
widgetEventPrefix: 'drop',
options: {
accept: '*',
activeClass: !1,
addClasses: !0,
greedy: !1,
hoverClass: !1,
scope: 'default',
tolerance: 'intersect',
activate: null,
deactivate: null,
drop: null,
out: null,
over: null
},
_create: function () {
var t,
i = this.options,
s = i.accept;
this.isover = !1,
this.isout = !0,
this.accept = e.isFunction(s) ? s : function (e) {
return e.is(s)
},
this.proportions = function () {
return arguments.length ? (t = arguments[0], void 0)  : t ? t : t = {
width: this.element[0].offsetWidth,
height: this.element[0].offsetHeight
}
},
this._addToManager(i.scope),
i.addClasses && this.element.addClass('ui-droppable')
},
_addToManager: function (t) {
e.ui.ddmanager.droppables[t] = e.ui.ddmanager.droppables[t] || [],
e.ui.ddmanager.droppables[t].push(this)
},
_splice: function (e) {
for (var t = 0; e.length > t; t++) e[t] === this && e.splice(t, 1)
},
_destroy: function () {
var t = e.ui.ddmanager.droppables[this.options.scope];
this._splice(t),
this.element.removeClass('ui-droppable ui-droppable-disabled')
},
_setOption: function (t, i) {
if ('accept' === t) this.accept = e.isFunction(i) ? i : function (e) {
return e.is(i)
};
 else if ('scope' === t) {
var s = e.ui.ddmanager.droppables[this.options.scope];
this._splice(s),
this._addToManager(i)
}
this._super(t, i)
},
_activate: function (t) {
var i = e.ui.ddmanager.current;
this.options.activeClass && this.element.addClass(this.options.activeClass),
i && this._trigger('activate', t, this.ui(i))
},
_deactivate: function (t) {
var i = e.ui.ddmanager.current;
this.options.activeClass && this.element.removeClass(this.options.activeClass),
i && this._trigger('deactivate', t, this.ui(i))
},
_over: function (t) {
var i = e.ui.ddmanager.current;
i && (i.currentItem || i.element) [0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger('over', t, this.ui(i)))
},
_out: function (t) {
var i = e.ui.ddmanager.current;
i && (i.currentItem || i.element) [0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger('out', t, this.ui(i)))
},
_drop: function (t, i) {
var s = i || e.ui.ddmanager.current,
n = !1;
return s && (s.currentItem || s.element) [0] !== this.element[0] ? (this.element.find(':data(ui-droppable)').not('.ui-draggable-dragging').each(function () {
var i = e(this).droppable('instance');
return i.options.greedy && !i.options.disabled && i.options.scope === s.options.scope && i.accept.call(i.element[0], s.currentItem || s.element) && e.ui.intersect(s, e.extend(i, {
offset: i.element.offset()
}), i.options.tolerance, t) ? (n = !0, !1)  : void 0
}), n ? !1 : this.accept.call(this.element[0], s.currentItem || s.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger('drop', t, this.ui(s)), this.element)  : !1)  : !1
},
ui: function (e) {
return {
draggable: e.currentItem || e.element,
helper: e.helper,
position: e.position,
offset: e.positionAbs
}
}
}),
e.ui.intersect = function () {
function e(e, t, i) {
return e >= t && t + i > e
}
return function (t, i, s, n) {
if (!i.offset) return !1;
var a = (t.positionAbs || t.position.absolute).left + t.margins.left,
o = (t.positionAbs || t.position.absolute).top + t.margins.top,
r = a + t.helperProportions.width,
h = o + t.helperProportions.height,
l = i.offset.left,
u = i.offset.top,
d = l + i.proportions().width,
c = u + i.proportions().height;
switch (s) {
case 'fit':
return a >= l && d >= r && o >= u && c >= h;
case 'intersect':
return a + t.helperProportions.width / 2 > l && d > r - t.helperProportions.width / 2 && o + t.helperProportions.height / 2 > u && c > h - t.helperProportions.height / 2;
case 'pointer':
return e(n.pageY, u, i.proportions().height) && e(n.pageX, l, i.proportions().width);
case 'touch':
return (o >= u && c >= o || h >= u && c >= h || u > o && h > c) && (a >= l && d >= a || r >= l && d >= r || l > a && r > d);
default:
return !1
}
}
}(),
e.ui.ddmanager = {
current: null,
droppables: {
'default': [
]
},
prepareOffsets: function (t, i) {
var s,
n,
a = e.ui.ddmanager.droppables[t.options.scope] || [],
o = i ? i.type : null,
r = (t.currentItem || t.element).find(':data(ui-droppable)').addBack();
e: for (s = 0; a.length > s; s++) if (!(a[s].options.disabled || t && !a[s].accept.call(a[s].element[0], t.currentItem || t.element))) {
for (n = 0; r.length > n; n++) if (r[n] === a[s].element[0]) {
a[s].proportions().height = 0;
continue e
}
a[s].visible = 'none' !== a[s].element.css('display'),
a[s].visible && ('mousedown' === o && a[s]._activate.call(a[s], i), a[s].offset = a[s].element.offset(), a[s].proportions({
width: a[s].element[0].offsetWidth,
height: a[s].element[0].offsetHeight
}))
}
},
drop: function (t, i) {
var s = !1;
return e.each((e.ui.ddmanager.droppables[t.options.scope] || []).slice(), function () {
this.options && (!this.options.disabled && this.visible && e.ui.intersect(t, this, this.options.tolerance, i) && (s = this._drop.call(this, i) || s), !this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)))
}),
s
},
dragStart: function (t, i) {
t.element.parentsUntil('body').bind('scroll.droppable', function () {
t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, i)
})
},
drag: function (t, i) {
t.options.refreshPositions && e.ui.ddmanager.prepareOffsets(t, i),
e.each(e.ui.ddmanager.droppables[t.options.scope] || [], function () {
if (!this.options.disabled && !this.greedyChild && this.visible) {
var s,
n,
a,
o = e.ui.intersect(t, this, this.options.tolerance, i),
r = !o && this.isover ? 'isout' : o && !this.isover ? 'isover' : null;
r && (this.options.greedy && (n = this.options.scope, a = this.element.parents(':data(ui-droppable)').filter(function () {
return e(this).droppable('instance').options.scope === n
}), a.length && (s = e(a[0]).droppable('instance'), s.greedyChild = 'isover' === r)), s && 'isover' === r && (s.isover = !1, s.isout = !0, s._out.call(s, i)), this[r] = !0, this['isout' === r ? 'isover' : 'isout'] = !1, this['isover' === r ? '_over' : '_out'].call(this, i), s && 'isout' === r && (s.isout = !1, s.isover = !0, s._over.call(s, i)))
}
})
},
dragStop: function (t, i) {
t.element.parentsUntil('body').unbind('scroll.droppable'),
t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, i)
}
},
e.ui.droppable,
e.widget('ui.resizable', e.ui.mouse, {
version: '1.11.2',
widgetEventPrefix: 'resize',
options: {
alsoResize: !1,
animate: !1,
animateDuration: 'slow',
animateEasing: 'swing',
aspectRatio: !1,
autoHide: !1,
containment: !1,
ghost: !1,
grid: !1,
handles: 'e,s,se',
helper: !1,
maxHeight: null,
maxWidth: null,
minHeight: 10,
minWidth: 10,
zIndex: 90,
resize: null,
start: null,
stop: null
},
_num: function (e) {
return parseInt(e, 10) || 0
},
_isNumber: function (e) {
return !isNaN(parseInt(e, 10))
},
_hasScroll: function (t, i) {
if ('hidden' === e(t).css('overflow')) return !1;
var s = i && 'left' === i ? 'scrollLeft' : 'scrollTop',
n = !1;
return t[s] > 0 ? !0 : (t[s] = 1, n = t[s] > 0, t[s] = 0, n)
},
_create: function () {
var t,
i,
s,
n,
a,
o = this,
r = this.options;
if (this.element.addClass('ui-resizable'), e.extend(this, {
_aspectRatio: !!r.aspectRatio,
aspectRatio: r.aspectRatio,
originalElement: this.element,
_proportionallyResizeElements: [
],
_helper: r.helper || r.ghost || r.animate ? r.helper || 'ui-resizable-helper' : null
}), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(e('<div class=\'ui-wrapper\' style=\'overflow: hidden;\'></div>').css({
position: this.element.css('position'),
width: this.element.outerWidth(),
height: this.element.outerHeight(),
top: this.element.css('top'),
left: this.element.css('left')
})), this.element = this.element.parent().data('ui-resizable', this.element.resizable('instance')), this.elementIsWrapper = !0, this.element.css({
marginLeft: this.originalElement.css('marginLeft'),
marginTop: this.originalElement.css('marginTop'),
marginRight: this.originalElement.css('marginRight'),
marginBottom: this.originalElement.css('marginBottom')
}), this.originalElement.css({
marginLeft: 0,
marginTop: 0,
marginRight: 0,
marginBottom: 0
}), this.originalResizeStyle = this.originalElement.css('resize'), this.originalElement.css('resize', 'none'), this._proportionallyResizeElements.push(this.originalElement.css({
position: 'static',
zoom: 1,
display: 'block'
})), this.originalElement.css({
margin: this.originalElement.css('margin')
}), this._proportionallyResize()), this.handles = r.handles || (e('.ui-resizable-handle', this.element).length ? {
n: '.ui-resizable-n',
e: '.ui-resizable-e',
s: '.ui-resizable-s',
w: '.ui-resizable-w',
se: '.ui-resizable-se',
sw: '.ui-resizable-sw',
ne: '.ui-resizable-ne',
nw: '.ui-resizable-nw'
}
 : 'e,s,se'), this.handles.constructor === String) for ('all' === this.handles && (this.handles = 'n,e,s,w,se,sw,ne,nw'), t = this.handles.split(','), this.handles = {
}, i = 0; t.length > i; i++) s = e.trim(t[i]),
a = 'ui-resizable-' + s,
n = e('<div class=\'ui-resizable-handle ' + a + '\'></div>'),
n.css({
zIndex: r.zIndex
}),
'se' === s && n.addClass('ui-icon ui-icon-gripsmall-diagonal-se'),
this.handles[s] = '.ui-resizable-' + s,
this.element.append(n);
this._renderAxis = function (t) {
var i,
s,
n,
a;
t = t || this.element;
for (i in this.handles) this.handles[i].constructor === String && (this.handles[i] = this.element.children(this.handles[i]).first().show()),
this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (s = e(this.handles[i], this.element), a = /sw|ne|nw|se|n|s/.test(i) ? s.outerHeight()  : s.outerWidth(), n = [
'padding',
/ne|nw|n/.test(i) ? 'Top' : /se|sw|s/.test(i) ? 'Bottom' : /^e$/.test(i) ? 'Right' : 'Left'
].join(''), t.css(n, a), this._proportionallyResize()),
e(this.handles[i]).length
},
this._renderAxis(this.element),
this._handles = e('.ui-resizable-handle', this.element).disableSelection(),
this._handles.mouseover(function () {
o.resizing || (this.className && (n = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), o.axis = n && n[1] ? n[1] : 'se')
}),
r.autoHide && (this._handles.hide(), e(this.element).addClass('ui-resizable-autohide').mouseenter(function () {
r.disabled || (e(this).removeClass('ui-resizable-autohide'), o._handles.show())
}).mouseleave(function () {
r.disabled || o.resizing || (e(this).addClass('ui-resizable-autohide'), o._handles.hide())
})),
this._mouseInit()
},
_destroy: function () {
this._mouseDestroy();
var t,
i = function (t) {
e(t).removeClass('ui-resizable ui-resizable-disabled ui-resizable-resizing').removeData('resizable').removeData('ui-resizable').unbind('.resizable').find('.ui-resizable-handle').remove()
};
return this.elementIsWrapper && (i(this.element), t = this.element, this.originalElement.css({
position: t.css('position'),
width: t.outerWidth(),
height: t.outerHeight(),
top: t.css('top'),
left: t.css('left')
}).insertAfter(t), t.remove()),
this.originalElement.css('resize', this.originalResizeStyle),
i(this.originalElement),
this
},
_mouseCapture: function (t) {
var i,
s,
n = !1;
for (i in this.handles) s = e(this.handles[i]) [0],
(s === t.target || e.contains(s, t.target)) && (n = !0);
return !this.options.disabled && n
},
_mouseStart: function (t) {
var i,
s,
n,
a = this.options,
o = this.element;
return this.resizing = !0,
this._renderProxy(),
i = this._num(this.helper.css('left')),
s = this._num(this.helper.css('top')),
a.containment && (i += e(a.containment).scrollLeft() || 0, s += e(a.containment).scrollTop() || 0),
this.offset = this.helper.offset(),
this.position = {
left: i,
top: s
},
this.size = this._helper ? {
width: this.helper.width(),
height: this.helper.height()
}
 : {
width: o.width(),
height: o.height()
},
this.originalSize = this._helper ? {
width: o.outerWidth(),
height: o.outerHeight()
}
 : {
width: o.width(),
height: o.height()
},
this.sizeDiff = {
width: o.outerWidth() - o.width(),
height: o.outerHeight() - o.height()
},
this.originalPosition = {
left: i,
top: s
},
this.originalMousePosition = {
left: t.pageX,
top: t.pageY
},
this.aspectRatio = 'number' == typeof a.aspectRatio ? a.aspectRatio : this.originalSize.width / this.originalSize.height || 1,
n = e('.ui-resizable-' + this.axis).css('cursor'),
e('body').css('cursor', 'auto' === n ? this.axis + '-resize' : n),
o.addClass('ui-resizable-resizing'),
this._propagate('start', t),
!0
},
_mouseDrag: function (t) {
var i,
s,
n = this.originalMousePosition,
a = this.axis,
o = t.pageX - n.left || 0,
r = t.pageY - n.top || 0,
h = this._change[a];
return this._updatePrevProperties(),
h ? (i = h.apply(this, [
t,
o,
r
]), this._updateVirtualBoundaries(t.shiftKey), (this._aspectRatio || t.shiftKey) && (i = this._updateRatio(i, t)), i = this._respectSize(i, t), this._updateCache(i), this._propagate('resize', t), s = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), e.isEmptyObject(s) || (this._updatePrevProperties(), this._trigger('resize', t, this.ui()), this._applyChanges()), !1)  : !1
},
_mouseStop: function (t) {
this.resizing = !1;
var i,
s,
n,
a,
o,
r,
h,
l = this.options,
u = this;
return this._helper && (i = this._proportionallyResizeElements, s = i.length && /textarea/i.test(i[0].nodeName), n = s && this._hasScroll(i[0], 'left') ? 0 : u.sizeDiff.height, a = s ? 0 : u.sizeDiff.width, o = {
width: u.helper.width() - a,
height: u.helper.height() - n
}, r = parseInt(u.element.css('left'), 10) + (u.position.left - u.originalPosition.left) || null, h = parseInt(u.element.css('top'), 10) + (u.position.top - u.originalPosition.top) || null, l.animate || this.element.css(e.extend(o, {
top: h,
left: r
})), u.helper.height(u.size.height), u.helper.width(u.size.width), this._helper && !l.animate && this._proportionallyResize()),
e('body').css('cursor', 'auto'),
this.element.removeClass('ui-resizable-resizing'),
this._propagate('stop', t),
this._helper && this.helper.remove(),
!1
},
_updatePrevProperties: function () {
this.prevPosition = {
top: this.position.top,
left: this.position.left
},
this.prevSize = {
width: this.size.width,
height: this.size.height
}
},
_applyChanges: function () {
var e = {
};
return this.position.top !== this.prevPosition.top && (e.top = this.position.top + 'px'),
this.position.left !== this.prevPosition.left && (e.left = this.position.left + 'px'),
this.size.width !== this.prevSize.width && (e.width = this.size.width + 'px'),
this.size.height !== this.prevSize.height && (e.height = this.size.height + 'px'),
this.helper.css(e),
e
},
_updateVirtualBoundaries: function (e) {
var t,
i,
s,
n,
a,
o = this.options;
a = {
minWidth: this._isNumber(o.minWidth) ? o.minWidth : 0,
maxWidth: this._isNumber(o.maxWidth) ? o.maxWidth : 1 / 0,
minHeight: this._isNumber(o.minHeight) ? o.minHeight : 0,
maxHeight: this._isNumber(o.maxHeight) ? o.maxHeight : 1 / 0
},
(this._aspectRatio || e) && (t = a.minHeight * this.aspectRatio, s = a.minWidth / this.aspectRatio, i = a.maxHeight * this.aspectRatio, n = a.maxWidth / this.aspectRatio, t > a.minWidth && (a.minWidth = t), s > a.minHeight && (a.minHeight = s), a.maxWidth > i && (a.maxWidth = i), a.maxHeight > n && (a.maxHeight = n)),
this._vBoundaries = a
},
_updateCache: function (e) {
this.offset = this.helper.offset(),
this._isNumber(e.left) && (this.position.left = e.left),
this._isNumber(e.top) && (this.position.top = e.top),
this._isNumber(e.height) && (this.size.height = e.height),
this._isNumber(e.width) && (this.size.width = e.width)
},
_updateRatio: function (e) {
var t = this.position,
i = this.size,
s = this.axis;
return this._isNumber(e.height) ? e.width = e.height * this.aspectRatio : this._isNumber(e.width) && (e.height = e.width / this.aspectRatio),
'sw' === s && (e.left = t.left + (i.width - e.width), e.top = null),
'nw' === s && (e.top = t.top + (i.height - e.height), e.left = t.left + (i.width - e.width)),
e
},
_respectSize: function (e) {
var t = this._vBoundaries,
i = this.axis,
s = this._isNumber(e.width) && t.maxWidth && t.maxWidth < e.width,
n = this._isNumber(e.height) && t.maxHeight && t.maxHeight < e.height,
a = this._isNumber(e.width) && t.minWidth && t.minWidth > e.width,
o = this._isNumber(e.height) && t.minHeight && t.minHeight > e.height,
r = this.originalPosition.left + this.originalSize.width,
h = this.position.top + this.size.height,
l = /sw|nw|w/.test(i),
u = /nw|ne|n/.test(i);
return a && (e.width = t.minWidth),
o && (e.height = t.minHeight),
s && (e.width = t.maxWidth),
n && (e.height = t.maxHeight),
a && l && (e.left = r - t.minWidth),
s && l && (e.left = r - t.maxWidth),
o && u && (e.top = h - t.minHeight),
n && u && (e.top = h - t.maxHeight),
e.width || e.height || e.left || !e.top ? e.width || e.height || e.top || !e.left || (e.left = null)  : e.top = null,
e
},
_getPaddingPlusBorderDimensions: function (e) {
for (var t = 0, i = [
], s = [
e.css('borderTopWidth'),
e.css('borderRightWidth'),
e.css('borderBottomWidth'),
e.css('borderLeftWidth')
], n = [
e.css('paddingTop'),
e.css('paddingRight'),
e.css('paddingBottom'),
e.css('paddingLeft')
]; 4 > t; t++) i[t] = parseInt(s[t], 10) || 0,
i[t] += parseInt(n[t], 10) || 0;
return {
height: i[0] + i[2],
width: i[1] + i[3]
}
},
_proportionallyResize: function () {
if (this._proportionallyResizeElements.length) for (var e, t = 0, i = this.helper || this.element; this._proportionallyResizeElements.length > t; t++) e = this._proportionallyResizeElements[t],
this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(e)),
e.css({
height: i.height() - this.outerDimensions.height || 0,
width: i.width() - this.outerDimensions.width || 0
})
},
_renderProxy: function () {
var t = this.element,
i = this.options;
this.elementOffset = t.offset(),
this._helper ? (this.helper = this.helper || e('<div style=\'overflow:hidden;\'></div>'), this.helper.addClass(this._helper).css({
width: this.element.outerWidth() - 1,
height: this.element.outerHeight() - 1,
position: 'absolute',
left: this.elementOffset.left + 'px',
top: this.elementOffset.top + 'px',
zIndex: ++i.zIndex
}), this.helper.appendTo('body').disableSelection())  : this.helper = this.element
},
_change: {
e: function (e, t) {
return {
width: this.originalSize.width + t
}
},
w: function (e, t) {
var i = this.originalSize,
s = this.originalPosition;
return {
left: s.left + t,
width: i.width - t
}
},
n: function (e, t, i) {
var s = this.originalSize,
n = this.originalPosition;
return {
top: n.top + i,
height: s.height - i
}
},
s: function (e, t, i) {
return {
height: this.originalSize.height + i
}
},
se: function (t, i, s) {
return e.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [
t,
i,
s
]))
},
sw: function (t, i, s) {
return e.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [
t,
i,
s
]))
},
ne: function (t, i, s) {
return e.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [
t,
i,
s
]))
},
nw: function (t, i, s) {
return e.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [
t,
i,
s
]))
}
},
_propagate: function (t, i) {
e.ui.plugin.call(this, t, [
i,
this.ui()
]),
'resize' !== t && this._trigger(t, i, this.ui())
},
plugins: {
},
ui: function () {
return {
originalElement: this.originalElement,
element: this.element,
helper: this.helper,
position: this.position,
size: this.size,
originalSize: this.originalSize,
originalPosition: this.originalPosition
}
}
}),
e.ui.plugin.add('resizable', 'animate', {
stop: function (t) {
var i = e(this).resizable('instance'),
s = i.options,
n = i._proportionallyResizeElements,
a = n.length && /textarea/i.test(n[0].nodeName),
o = a && i._hasScroll(n[0], 'left') ? 0 : i.sizeDiff.height,
r = a ? 0 : i.sizeDiff.width,
h = {
width: i.size.width - r,
height: i.size.height - o
},
l = parseInt(i.element.css('left'), 10) + (i.position.left - i.originalPosition.left) || null,
u = parseInt(i.element.css('top'), 10) + (i.position.top - i.originalPosition.top) || null;
i.element.animate(e.extend(h, u && l ? {
top: u,
left: l
}
 : {
}), {
duration: s.animateDuration,
easing: s.animateEasing,
step: function () {
var s = {
width: parseInt(i.element.css('width'), 10),
height: parseInt(i.element.css('height'), 10),
top: parseInt(i.element.css('top'), 10),
left: parseInt(i.element.css('left'), 10)
};
n && n.length && e(n[0]).css({
width: s.width,
height: s.height
}),
i._updateCache(s),
i._propagate('resize', t)
}
})
}
}),
e.ui.plugin.add('resizable', 'containment', {
start: function () {
var t,
i,
s,
n,
a,
o,
r,
h = e(this).resizable('instance'),
l = h.options,
u = h.element,
d = l.containment,
c = d instanceof e ? d.get(0)  : /parent/.test(d) ? u.parent().get(0)  : d;
c && (h.containerElement = e(c), /document/.test(d) || d === document ? (h.containerOffset = {
left: 0,
top: 0
}, h.containerPosition = {
left: 0,
top: 0
}, h.parentData = {
element: e(document),
left: 0,
top: 0,
width: e(document).width(),
height: e(document).height() || document.body.parentNode.scrollHeight
})  : (t = e(c), i = [
], e(['Top',
'Right',
'Left',
'Bottom']).each(function (e, s) {
i[e] = h._num(t.css('padding' + s))
}), h.containerOffset = t.offset(), h.containerPosition = t.position(), h.containerSize = {
height: t.innerHeight() - i[3],
width: t.innerWidth() - i[1]
}, s = h.containerOffset, n = h.containerSize.height, a = h.containerSize.width, o = h._hasScroll(c, 'left') ? c.scrollWidth : a, r = h._hasScroll(c) ? c.scrollHeight : n, h.parentData = {
element: c,
left: s.left,
top: s.top,
width: o,
height: r
}))
},
resize: function (t) {
var i,
s,
n,
a,
o = e(this).resizable('instance'),
r = o.options,
h = o.containerOffset,
l = o.position,
u = o._aspectRatio || t.shiftKey,
d = {
top: 0,
left: 0
},
c = o.containerElement,
p = !0;
c[0] !== document && /static/.test(c.css('position')) && (d = h),
l.left < (o._helper ? h.left : 0) && (o.size.width = o.size.width + (o._helper ? o.position.left - h.left : o.position.left - d.left), u && (o.size.height = o.size.width / o.aspectRatio, p = !1), o.position.left = r.helper ? h.left : 0),
l.top < (o._helper ? h.top : 0) && (o.size.height = o.size.height + (o._helper ? o.position.top - h.top : o.position.top), u && (o.size.width = o.size.height * o.aspectRatio, p = !1), o.position.top = o._helper ? h.top : 0),
n = o.containerElement.get(0) === o.element.parent().get(0),
a = /relative|absolute/.test(o.containerElement.css('position')),
n && a ? (o.offset.left = o.parentData.left + o.position.left, o.offset.top = o.parentData.top + o.position.top)  : (o.offset.left = o.element.offset().left, o.offset.top = o.element.offset().top),
i = Math.abs(o.sizeDiff.width + (o._helper ? o.offset.left - d.left : o.offset.left - h.left)),
s = Math.abs(o.sizeDiff.height + (o._helper ? o.offset.top - d.top : o.offset.top - h.top)),
i + o.size.width >= o.parentData.width && (o.size.width = o.parentData.width - i, u && (o.size.height = o.size.width / o.aspectRatio, p = !1)),
s + o.size.height >= o.parentData.height && (o.size.height = o.parentData.height - s, u && (o.size.width = o.size.height * o.aspectRatio, p = !1)),
p || (o.position.left = o.prevPosition.left, o.position.top = o.prevPosition.top, o.size.width = o.prevSize.width, o.size.height = o.prevSize.height)
},
stop: function () {
var t = e(this).resizable('instance'),
i = t.options,
s = t.containerOffset,
n = t.containerPosition,
a = t.containerElement,
o = e(t.helper),
r = o.offset(),
h = o.outerWidth() - t.sizeDiff.width,
l = o.outerHeight() - t.sizeDiff.height;
t._helper && !i.animate && /relative/.test(a.css('position')) && e(this).css({
left: r.left - n.left - s.left,
width: h,
height: l
}),
t._helper && !i.animate && /static/.test(a.css('position')) && e(this).css({
left: r.left - n.left - s.left,
width: h,
height: l
})
}
}),
e.ui.plugin.add('resizable', 'alsoResize', {
start: function () {
var t = e(this).resizable('instance'),
i = t.options,
s = function (t) {
e(t).each(function () {
var t = e(this);
t.data('ui-resizable-alsoresize', {
width: parseInt(t.width(), 10),
height: parseInt(t.height(), 10),
left: parseInt(t.css('left'), 10),
top: parseInt(t.css('top'), 10)
})
})
};
'object' != typeof i.alsoResize || i.alsoResize.parentNode ? s(i.alsoResize)  : i.alsoResize.length ? (i.alsoResize = i.alsoResize[0], s(i.alsoResize))  : e.each(i.alsoResize, function (e) {
s(e)
})
},
resize: function (t, i) {
var s = e(this).resizable('instance'),
n = s.options,
a = s.originalSize,
o = s.originalPosition,
r = {
height: s.size.height - a.height || 0,
width: s.size.width - a.width || 0,
top: s.position.top - o.top || 0,
left: s.position.left - o.left || 0
},
h = function (t, s) {
e(t).each(function () {
var t = e(this),
n = e(this).data('ui-resizable-alsoresize'),
a = {
},
o = s && s.length ? s : t.parents(i.originalElement[0]).length ? [
'width',
'height'
] : [
'width',
'height',
'top',
'left'
];
e.each(o, function (e, t) {
var i = (n[t] || 0) + (r[t] || 0);
i && i >= 0 && (a[t] = i || null)
}),
t.css(a)
})
};
'object' != typeof n.alsoResize || n.alsoResize.nodeType ? h(n.alsoResize)  : e.each(n.alsoResize, function (e, t) {
h(e, t)
})
},
stop: function () {
e(this).removeData('resizable-alsoresize')
}
}),
e.ui.plugin.add('resizable', 'ghost', {
start: function () {
var t = e(this).resizable('instance'),
i = t.options,
s = t.size;
t.ghost = t.originalElement.clone(),
t.ghost.css({
opacity: 0.25,
display: 'block',
position: 'relative',
height: s.height,
width: s.width,
margin: 0,
left: 0,
top: 0
}).addClass('ui-resizable-ghost').addClass('string' == typeof i.ghost ? i.ghost : ''),
t.ghost.appendTo(t.helper)
},
resize: function () {
var t = e(this).resizable('instance');
t.ghost && t.ghost.css({
position: 'relative',
height: t.size.height,
width: t.size.width
})
},
stop: function () {
var t = e(this).resizable('instance');
t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0))
}
}),
e.ui.plugin.add('resizable', 'grid', {
resize: function () {
var t,
i = e(this).resizable('instance'),
s = i.options,
n = i.size,
a = i.originalSize,
o = i.originalPosition,
r = i.axis,
h = 'number' == typeof s.grid ? [
s.grid,
s.grid
] : s.grid,
l = h[0] || 1,
u = h[1] || 1,
d = Math.round((n.width - a.width) / l) * l,
c = Math.round((n.height - a.height) / u) * u,
p = a.width + d,
f = a.height + c,
m = s.maxWidth && p > s.maxWidth,
g = s.maxHeight && f > s.maxHeight,
v = s.minWidth && s.minWidth > p,
y = s.minHeight && s.minHeight > f;
s.grid = h,
v && (p += l),
y && (f += u),
m && (p -= l),
g && (f -= u),
/^(se|s|e)$/.test(r) ? (i.size.width = p, i.size.height = f)  : /^(ne)$/.test(r) ? (i.size.width = p, i.size.height = f, i.position.top = o.top - c)  : /^(sw)$/.test(r) ? (i.size.width = p, i.size.height = f, i.position.left = o.left - d)  : ((0 >= f - u || 0 >= p - l) && (t = i._getPaddingPlusBorderDimensions(this)), f - u > 0 ? (i.size.height = f, i.position.top = o.top - c)  : (f = u - t.height, i.size.height = f, i.position.top = o.top + a.height - f), p - l > 0 ? (i.size.width = p, i.position.left = o.left - d)  : (p = u - t.height, i.size.width = p, i.position.left = o.left + a.width - p))
}
}),
e.ui.resizable,
e.widget('ui.sortable', e.ui.mouse, {
version: '1.11.2',
widgetEventPrefix: 'sort',
ready: !1,
options: {
appendTo: 'parent',
axis: !1,
connectWith: !1,
containment: !1,
cursor: 'auto',
cursorAt: !1,
dropOnEmpty: !0,
forcePlaceholderSize: !1,
forceHelperSize: !1,
grid: !1,
handle: !1,
helper: 'original',
items: '> *',
opacity: !1,
placeholder: !1,
revert: !1,
scroll: !0,
scrollSensitivity: 20,
scrollSpeed: 20,
scope: 'default',
tolerance: 'intersect',
zIndex: 1000,
activate: null,
beforeStop: null,
change: null,
deactivate: null,
out: null,
over: null,
receive: null,
remove: null,
sort: null,
start: null,
stop: null,
update: null
},
_isOverAxis: function (e, t, i) {
return e >= t && t + i > e
},
_isFloating: function (e) {
return /left|right/.test(e.css('float')) || /inline|table-cell/.test(e.css('display'))
},
_create: function () {
var e = this.options;
this.containerCache = {
},
this.element.addClass('ui-sortable'),
this.refresh(),
this.floating = this.items.length ? 'x' === e.axis || this._isFloating(this.items[0].item)  : !1,
this.offset = this.element.offset(),
this._mouseInit(),
this._setHandleClassName(),
this.ready = !0
},
_setOption: function (e, t) {
this._super(e, t),
'handle' === e && this._setHandleClassName()
},
_setHandleClassName: function () {
this.element.find('.ui-sortable-handle').removeClass('ui-sortable-handle'),
e.each(this.items, function () {
(this.instance.options.handle ? this.item.find(this.instance.options.handle)  : this.item).addClass('ui-sortable-handle')
})
},
_destroy: function () {
this.element.removeClass('ui-sortable ui-sortable-disabled').find('.ui-sortable-handle').removeClass('ui-sortable-handle'),
this._mouseDestroy();
for (var e = this.items.length - 1; e >= 0; e--) this.items[e].item.removeData(this.widgetName + '-item');
return this
},
_mouseCapture: function (t, i) {
var s = null,
n = !1,
a = this;
return this.reverting ? !1 : this.options.disabled || 'static' === this.options.type ? !1 : (this._refreshItems(t), e(t.target).parents().each(function () {
return e.data(this, a.widgetName + '-item') === a ? (s = e(this), !1)  : void 0
}), e.data(t.target, a.widgetName + '-item') === a && (s = e(t.target)), s ? !this.options.handle || i || (e(this.options.handle, s).find('*').addBack().each(function () {
this === t.target && (n = !0)
}), n) ? (this.currentItem = s, this._removeCurrentsFromItems(), !0)  : !1 : !1)
},
_mouseStart: function (t, i, s) {
var n,
a,
o = this.options;
if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(t), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
top: this.offset.top - this.margins.top,
left: this.offset.left - this.margins.left
}, e.extend(this.offset, {
click: {
left: t.pageX - this.offset.left,
top: t.pageY - this.offset.top
},
parent: this._getParentOffset(),
relative: this._getRelativeOffset()
}), this.helper.css('position', 'absolute'), this.cssPosition = this.helper.css('position'), this.originalPosition = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt), this.domPosition = {
prev: this.currentItem.prev() [0],
parent: this.currentItem.parent() [0]
}, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), o.containment && this._setContainment(), o.cursor && 'auto' !== o.cursor && (a = this.document.find('body'), this.storedCursor = a.css('cursor'), a.css('cursor', o.cursor), this.storedStylesheet = e('<style>*{ cursor: ' + o.cursor + ' !important; }</style>').appendTo(a)), o.opacity && (this.helper.css('opacity') && (this._storedOpacity = this.helper.css('opacity')), this.helper.css('opacity', o.opacity)), o.zIndex && (this.helper.css('zIndex') && (this._storedZIndex = this.helper.css('zIndex')), this.helper.css('zIndex', o.zIndex)), this.scrollParent[0] !== document && 'HTML' !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger('start', t, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !s) for (n = this.containers.length - 1; n >= 0; n--) this.containers[n]._trigger('activate', t, this._uiHash(this));
return e.ui.ddmanager && (e.ui.ddmanager.current = this),
e.ui.ddmanager && !o.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t),
this.dragging = !0,
this.helper.addClass('ui-sortable-helper'),
this._mouseDrag(t),
!0
},
_mouseDrag: function (t) {
var i,
s,
n,
a,
o = this.options,
r = !1;
for (this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo('absolute'), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && 'HTML' !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - t.pageY < o.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + o.scrollSpeed : t.pageY - this.overflowOffset.top < o.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - o.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - t.pageX < o.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + o.scrollSpeed : t.pageX - this.overflowOffset.left < o.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - o.scrollSpeed))  : (t.pageY - e(document).scrollTop() < o.scrollSensitivity ? r = e(document).scrollTop(e(document).scrollTop() - o.scrollSpeed)  : e(window).height() - (t.pageY - e(document).scrollTop()) < o.scrollSensitivity && (r = e(document).scrollTop(e(document).scrollTop() + o.scrollSpeed)), t.pageX - e(document).scrollLeft() < o.scrollSensitivity ? r = e(document).scrollLeft(e(document).scrollLeft() - o.scrollSpeed)  : e(window).width() - (t.pageX - e(document).scrollLeft()) < o.scrollSensitivity && (r = e(document).scrollLeft(e(document).scrollLeft() + o.scrollSpeed))), r !== !1 && e.ui.ddmanager && !o.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t)), this.positionAbs = this._convertPositionTo('absolute'), this.options.axis && 'y' === this.options.axis || (this.helper[0].style.left = this.position.left + 'px'), this.options.axis && 'x' === this.options.axis || (this.helper[0].style.top = this.position.top + 'px'), i = this.items.length - 1; i >= 0; i--) if (s = this.items[i], n = s.item[0], a = this._intersectsWithPointer(s), a && s.instance === this.currentContainer && n !== this.currentItem[0] && this.placeholder[1 === a ? 'next' : 'prev']() [0] !== n && !e.contains(this.placeholder[0], n) && ('semi-dynamic' === this.options.type ? !e.contains(this.element[0], n)  : !0)) {
if (this.direction = 1 === a ? 'down' : 'up', 'pointer' !== this.options.tolerance && !this._intersectsWithSides(s)) break;
this._rearrange(t, s),
this._trigger('change', t, this._uiHash());
break
}
return this._contactContainers(t),
e.ui.ddmanager && e.ui.ddmanager.drag(this, t),
this._trigger('sort', t, this._uiHash()),
this.lastPositionAbs = this.positionAbs,
!1
},
_mouseStop: function (t, i) {
if (t) {
if (e.ui.ddmanager && !this.options.dropBehaviour && e.ui.ddmanager.drop(this, t), this.options.revert) {
var s = this,
n = this.placeholder.offset(),
a = this.options.axis,
o = {
};
a && 'x' !== a || (o.left = n.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)),
a && 'y' !== a || (o.top = n.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)),
this.reverting = !0,
e(this.helper).animate(o, parseInt(this.options.revert, 10) || 500, function () {
s._clear(t)
})
} else this._clear(t, i);
return !1
}
},
cancel: function () {
if (this.dragging) {
this._mouseUp({
target: null
}),
'original' === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass('ui-sortable-helper')  : this.currentItem.show();
for (var t = this.containers.length - 1; t >= 0; t--) this.containers[t]._trigger('deactivate', null, this._uiHash(this)),
this.containers[t].containerCache.over && (this.containers[t]._trigger('out', null, this._uiHash(this)), this.containers[t].containerCache.over = 0)
}
return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), 'original' !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), e.extend(this, {
helper: null,
dragging: !1,
reverting: !1,
_noFinalSort: null
}), this.domPosition.prev ? e(this.domPosition.prev).after(this.currentItem)  : e(this.domPosition.parent).prepend(this.currentItem)),
this
},
serialize: function (t) {
var i = this._getItemsAsjQuery(t && t.connected),
s = [
];
return t = t || {
},
e(i).each(function () {
var i = (e(t.item || this).attr(t.attribute || 'id') || '').match(t.expression || /(.+)[\-=_](.+)/);
i && s.push((t.key || i[1] + '[]') + '=' + (t.key && t.expression ? i[1] : i[2]))
}),
!s.length && t.key && s.push(t.key + '='),
s.join('&')
},
toArray: function (t) {
var i = this._getItemsAsjQuery(t && t.connected),
s = [
];
return t = t || {
},
i.each(function () {
s.push(e(t.item || this).attr(t.attribute || 'id') || '')
}),
s
},
_intersectsWith: function (e) {
var t = this.positionAbs.left,
i = t + this.helperProportions.width,
s = this.positionAbs.top,
n = s + this.helperProportions.height,
a = e.left,
o = a + e.width,
r = e.top,
h = r + e.height,
l = this.offset.click.top,
u = this.offset.click.left,
d = 'x' === this.options.axis || s + l > r && h > s + l,
c = 'y' === this.options.axis || t + u > a && o > t + u,
p = d && c;
return 'pointer' === this.options.tolerance || this.options.forcePointerForContainers || 'pointer' !== this.options.tolerance && this.helperProportions[this.floating ? 'width' : 'height'] > e[this.floating ? 'width' : 'height'] ? p : t + this.helperProportions.width / 2 > a && o > i - this.helperProportions.width / 2 && s + this.helperProportions.height / 2 > r && h > n - this.helperProportions.height / 2
},
_intersectsWithPointer: function (e) {
var t = 'x' === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, e.top, e.height),
i = 'y' === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, e.left, e.width),
s = t && i,
n = this._getDragVerticalDirection(),
a = this._getDragHorizontalDirection();
return s ? this.floating ? a && 'right' === a || 'down' === n ? 2 : 1 : n && ('down' === n ? 2 : 1)  : !1
},
_intersectsWithSides: function (e) {
var t = this._isOverAxis(this.positionAbs.top + this.offset.click.top, e.top + e.height / 2, e.height),
i = this._isOverAxis(this.positionAbs.left + this.offset.click.left, e.left + e.width / 2, e.width),
s = this._getDragVerticalDirection(),
n = this._getDragHorizontalDirection();
return this.floating && n ? 'right' === n && i || 'left' === n && !i : s && ('down' === s && t || 'up' === s && !t)
},
_getDragVerticalDirection: function () {
var e = this.positionAbs.top - this.lastPositionAbs.top;
return 0 !== e && (e > 0 ? 'down' : 'up')
},
_getDragHorizontalDirection: function () {
var e = this.positionAbs.left - this.lastPositionAbs.left;
return 0 !== e && (e > 0 ? 'right' : 'left')
},
refresh: function (e) {
return this._refreshItems(e),
this._setHandleClassName(),
this.refreshPositions(),
this
},
_connectWith: function () {
var e = this.options;
return e.connectWith.constructor === String ? [
e.connectWith
] : e.connectWith
},
_getItemsAsjQuery: function (t) {
function i() {
r.push(this)
}
var s,
n,
a,
o,
r = [
],
h = [
],
l = this._connectWith();
if (l && t) for (s = l.length - 1; s >= 0; s--) for (a = e(l[s]), n = a.length - 1; n >= 0; n--) o = e.data(a[n], this.widgetFullName),
o && o !== this && !o.options.disabled && h.push([e.isFunction(o.options.items) ? o.options.items.call(o.element)  : e(o.options.items, o.element).not('.ui-sortable-helper').not('.ui-sortable-placeholder'),
o]);
for (h.push([e.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
options: this.options,
item: this.currentItem
})  : e(this.options.items, this.element).not('.ui-sortable-helper').not('.ui-sortable-placeholder'),
this]), s = h.length - 1; s >= 0; s--) h[s][0].each(i);
return e(r)
},
_removeCurrentsFromItems: function () {
var t = this.currentItem.find(':data(' + this.widgetName + '-item)');
this.items = e.grep(this.items, function (e) {
for (var i = 0; t.length > i; i++) if (t[i] === e.item[0]) return !1;
return !0
})
},
_refreshItems: function (t) {
this.items = [
],
this.containers = [
this
];
var i,
s,
n,
a,
o,
r,
h,
l,
u = this.items,
d = [
[e.isFunction(this.options.items) ? this.options.items.call(this.element[0], t, {
item: this.currentItem
})  : e(this.options.items, this.element),
this]
],
c = this._connectWith();
if (c && this.ready) for (i = c.length - 1; i >= 0; i--) for (n = e(c[i]), s = n.length - 1; s >= 0; s--) a = e.data(n[s], this.widgetFullName),
a && a !== this && !a.options.disabled && (d.push([e.isFunction(a.options.items) ? a.options.items.call(a.element[0], t, {
item: this.currentItem
})  : e(a.options.items, a.element),
a]), this.containers.push(a));
for (i = d.length - 1; i >= 0; i--) for (o = d[i][1], r = d[i][0], s = 0, l = r.length; l > s; s++) h = e(r[s]),
h.data(this.widgetName + '-item', o),
u.push({
item: h,
instance: o,
width: 0,
height: 0,
left: 0,
top: 0
})
},
refreshPositions: function (t) {
this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
var i,
s,
n,
a;
for (i = this.items.length - 1; i >= 0; i--) s = this.items[i],
s.instance !== this.currentContainer && this.currentContainer && s.item[0] !== this.currentItem[0] || (n = this.options.toleranceElement ? e(this.options.toleranceElement, s.item)  : s.item, t || (s.width = n.outerWidth(), s.height = n.outerHeight()), a = n.offset(), s.left = a.left, s.top = a.top);
if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
 else for (i = this.containers.length - 1; i >= 0; i--) a = this.containers[i].element.offset(),
this.containers[i].containerCache.left = a.left,
this.containers[i].containerCache.top = a.top,
this.containers[i].containerCache.width = this.containers[i].element.outerWidth(),
this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
return this
},
_createPlaceholder: function (t) {
t = t || this;
var i,
s = t.options;
s.placeholder && s.placeholder.constructor !== String || (i = s.placeholder, s.placeholder = {
element: function () {
var s = t.currentItem[0].nodeName.toLowerCase(),
n = e('<' + s + '>', t.document[0]).addClass(i || t.currentItem[0].className + ' ui-sortable-placeholder').removeClass('ui-sortable-helper');
return 'tr' === s ? t.currentItem.children().each(function () {
e('<td>&#160;</td>', t.document[0]).attr('colspan', e(this).attr('colspan') || 1).appendTo(n)
})  : 'img' === s && n.attr('src', t.currentItem.attr('src')),
i || n.css('visibility', 'hidden'),
n
},
update: function (e, n) {
(!i || s.forcePlaceholderSize) && (n.height() || n.height(t.currentItem.innerHeight() - parseInt(t.currentItem.css('paddingTop') || 0, 10) - parseInt(t.currentItem.css('paddingBottom') || 0, 10)), n.width() || n.width(t.currentItem.innerWidth() - parseInt(t.currentItem.css('paddingLeft') || 0, 10) - parseInt(t.currentItem.css('paddingRight') || 0, 10)))
}
}),
t.placeholder = e(s.placeholder.element.call(t.element, t.currentItem)),
t.currentItem.after(t.placeholder),
s.placeholder.update(t, t.placeholder)
},
_contactContainers: function (t) {
var i,
s,
n,
a,
o,
r,
h,
l,
u,
d,
c = null,
p = null;
for (i = this.containers.length - 1; i >= 0; i--) if (!e.contains(this.currentItem[0], this.containers[i].element[0])) if (this._intersectsWith(this.containers[i].containerCache)) {
if (c && e.contains(this.containers[i].element[0], c.element[0])) continue;
c = this.containers[i],
p = i
} else this.containers[i].containerCache.over && (this.containers[i]._trigger('out', t, this._uiHash(this)), this.containers[i].containerCache.over = 0);
if (c) if (1 === this.containers.length) this.containers[p].containerCache.over || (this.containers[p]._trigger('over', t, this._uiHash(this)), this.containers[p].containerCache.over = 1);
 else {
for (n = 10000, a = null, u = c.floating || this._isFloating(this.currentItem), o = u ? 'left' : 'top', r = u ? 'width' : 'height', d = u ? 'clientX' : 'clientY', s = this.items.length - 1; s >= 0; s--) e.contains(this.containers[p].element[0], this.items[s].item[0]) && this.items[s].item[0] !== this.currentItem[0] && (h = this.items[s].item.offset() [o], l = !1, t[d] - h > this.items[s][r] / 2 && (l = !0), n > Math.abs(t[d] - h) && (n = Math.abs(t[d] - h), a = this.items[s], this.direction = l ? 'up' : 'down'));
if (!a && !this.options.dropOnEmpty) return;
if (this.currentContainer === this.containers[p]) return this.currentContainer.containerCache.over || (this.containers[p]._trigger('over', t, this._uiHash()), this.currentContainer.containerCache.over = 1),
void 0;
a ? this._rearrange(t, a, null, !0)  : this._rearrange(t, null, this.containers[p].element, !0),
this._trigger('change', t, this._uiHash()),
this.containers[p]._trigger('change', t, this._uiHash(this)),
this.currentContainer = this.containers[p],
this.options.placeholder.update(this.currentContainer, this.placeholder),
this.containers[p]._trigger('over', t, this._uiHash(this)),
this.containers[p].containerCache.over = 1
}
},
_createHelper: function (t) {
var i = this.options,
s = e.isFunction(i.helper) ? e(i.helper.apply(this.element[0], [
t,
this.currentItem
]))  : 'clone' === i.helper ? this.currentItem.clone()  : this.currentItem;
return s.parents('body').length || e('parent' !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode) [0].appendChild(s[0]),
s[0] === this.currentItem[0] && (this._storedCSS = {
width: this.currentItem[0].style.width,
height: this.currentItem[0].style.height,
position: this.currentItem.css('position'),
top: this.currentItem.css('top'),
left: this.currentItem.css('left')
}),
(!s[0].style.width || i.forceHelperSize) && s.width(this.currentItem.width()),
(!s[0].style.height || i.forceHelperSize) && s.height(this.currentItem.height()),
s
},
_adjustOffsetFromHelper: function (t) {
'string' == typeof t && (t = t.split(' ')),
e.isArray(t) && (t = {
left: + t[0],
top: + t[1] || 0
}),
'left' in t && (this.offset.click.left = t.left + this.margins.left),
'right' in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left),
'top' in t && (this.offset.click.top = t.top + this.margins.top),
'bottom' in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
},
_getParentOffset: function () {
this.offsetParent = this.helper.offsetParent();
var t = this.offsetParent.offset();
return 'absolute' === this.cssPosition && this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()),
(this.offsetParent[0] === document.body || this.offsetParent[0].tagName && 'html' === this.offsetParent[0].tagName.toLowerCase() && e.ui.ie) && (t = {
top: 0,
left: 0
}),
{
top: t.top + (parseInt(this.offsetParent.css('borderTopWidth'), 10) || 0),
left: t.left + (parseInt(this.offsetParent.css('borderLeftWidth'), 10) || 0)
}
},
_getRelativeOffset: function () {
if ('relative' === this.cssPosition) {
var e = this.currentItem.position();
return {
top: e.top - (parseInt(this.helper.css('top'), 10) || 0) + this.scrollParent.scrollTop(),
left: e.left - (parseInt(this.helper.css('left'), 10) || 0) + this.scrollParent.scrollLeft()
}
}
return {
top: 0,
left: 0
}
},
_cacheMargins: function () {
this.margins = {
left: parseInt(this.currentItem.css('marginLeft'), 10) || 0,
top: parseInt(this.currentItem.css('marginTop'), 10) || 0
}
},
_cacheHelperProportions: function () {
this.helperProportions = {
width: this.helper.outerWidth(),
height: this.helper.outerHeight()
}
},
_setContainment: function () {
var t,
i,
s,
n = this.options;
'parent' === n.containment && (n.containment = this.helper[0].parentNode),
('document' === n.containment || 'window' === n.containment) && (this.containment = [
0 - this.offset.relative.left - this.offset.parent.left,
0 - this.offset.relative.top - this.offset.parent.top,
e('document' === n.containment ? document : window).width() - this.helperProportions.width - this.margins.left,
(e('document' === n.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
]),
/^(document|window|parent)$/.test(n.containment) || (t = e(n.containment) [0], i = e(n.containment).offset(), s = 'hidden' !== e(t).css('overflow'), this.containment = [
i.left + (parseInt(e(t).css('borderLeftWidth'), 10) || 0) + (parseInt(e(t).css('paddingLeft'), 10) || 0) - this.margins.left,
i.top + (parseInt(e(t).css('borderTopWidth'), 10) || 0) + (parseInt(e(t).css('paddingTop'), 10) || 0) - this.margins.top,
i.left + (s ? Math.max(t.scrollWidth, t.offsetWidth)  : t.offsetWidth) - (parseInt(e(t).css('borderLeftWidth'), 10) || 0) - (parseInt(e(t).css('paddingRight'), 10) || 0) - this.helperProportions.width - this.margins.left,
i.top + (s ? Math.max(t.scrollHeight, t.offsetHeight)  : t.offsetHeight) - (parseInt(e(t).css('borderTopWidth'), 10) || 0) - (parseInt(e(t).css('paddingBottom'), 10) || 0) - this.helperProportions.height - this.margins.top
])
},
_convertPositionTo: function (t, i) {
i || (i = this.position);
var s = 'absolute' === t ? 1 : - 1,
n = 'absolute' !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
a = /(html|body)/i.test(n[0].tagName);
return {
top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ('fixed' === this.cssPosition ? - this.scrollParent.scrollTop()  : a ? 0 : n.scrollTop()) * s,
left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ('fixed' === this.cssPosition ? - this.scrollParent.scrollLeft()  : a ? 0 : n.scrollLeft()) * s
}
},
_generatePosition: function (t) {
var i,
s,
n = this.options,
a = t.pageX,
o = t.pageY,
r = 'absolute' !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
h = /(html|body)/i.test(r[0].tagName);
return 'relative' !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()),
this.originalPosition && (this.containment && (t.pageX - this.offset.click.left < this.containment[0] && (a = this.containment[0] + this.offset.click.left), t.pageY - this.offset.click.top < this.containment[1] && (o = this.containment[1] + this.offset.click.top), t.pageX - this.offset.click.left > this.containment[2] && (a = this.containment[2] + this.offset.click.left), t.pageY - this.offset.click.top > this.containment[3] && (o = this.containment[3] + this.offset.click.top)), n.grid && (i = this.originalPageY + Math.round((o - this.originalPageY) / n.grid[1]) * n.grid[1], o = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - n.grid[1] : i + n.grid[1] : i, s = this.originalPageX + Math.round((a - this.originalPageX) / n.grid[0]) * n.grid[0], a = this.containment ? s - this.offset.click.left >= this.containment[0] && s - this.offset.click.left <= this.containment[2] ? s : s - this.offset.click.left >= this.containment[0] ? s - n.grid[0] : s + n.grid[0] : s)),
{
top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ('fixed' === this.cssPosition ? - this.scrollParent.scrollTop()  : h ? 0 : r.scrollTop()),
left: a - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ('fixed' === this.cssPosition ? - this.scrollParent.scrollLeft()  : h ? 0 : r.scrollLeft())
}
},
_rearrange: function (e, t, i, s) {
i ? i[0].appendChild(this.placeholder[0])  : t.item[0].parentNode.insertBefore(this.placeholder[0], 'down' === this.direction ? t.item[0] : t.item[0].nextSibling),
this.counter = this.counter ? ++this.counter : 1;
var n = this.counter;
this._delay(function () {
n === this.counter && this.refreshPositions(!s)
})
},
_clear: function (e, t) {
function i(e, t, i) {
return function (s) {
i._trigger(e, s, t._uiHash(t))
}
}
this.reverting = !1;
var s,
n = [
];
if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
for (s in this._storedCSS) ('auto' === this._storedCSS[s] || 'static' === this._storedCSS[s]) && (this._storedCSS[s] = '');
this.currentItem.css(this._storedCSS).removeClass('ui-sortable-helper')
} else this.currentItem.show();
for (this.fromOutside && !t && n.push(function (e) {
this._trigger('receive', e, this._uiHash(this.fromOutside))
}), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not('.ui-sortable-helper') [0] && this.domPosition.parent === this.currentItem.parent() [0] || t || n.push(function (e) {
this._trigger('update', e, this._uiHash())
}), this !== this.currentContainer && (t || (n.push(function (e) {
this._trigger('remove', e, this._uiHash())
}), n.push(function (e) {
return function (t) {
e._trigger('receive', t, this._uiHash(this))
}
}.call(this, this.currentContainer)), n.push(function (e) {
return function (t) {
e._trigger('update', t, this._uiHash(this))
}
}.call(this, this.currentContainer)))), s = this.containers.length - 1; s >= 0; s--) t || n.push(i('deactivate', this, this.containers[s])),
this.containers[s].containerCache.over && (n.push(i('out', this, this.containers[s])), this.containers[s].containerCache.over = 0);
if (this.storedCursor && (this.document.find('body').css('cursor', this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css('opacity', this._storedOpacity), this._storedZIndex && this.helper.css('zIndex', 'auto' === this._storedZIndex ? '' : this._storedZIndex), this.dragging = !1, t || this._trigger('beforeStop', e, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null), !t) {
for (s = 0; n.length > s; s++) n[s].call(this, e);
this._trigger('stop', e, this._uiHash())
}
return this.fromOutside = !1,
!this.cancelHelperRemoval
},
_trigger: function () {
e.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
},
_uiHash: function (t) {
var i = t || this;
return {
helper: i.helper,
placeholder: i.placeholder || e([]),
position: i.position,
originalPosition: i.originalPosition,
offset: i.positionAbs,
item: i.currentItem,
sender: t ? t.element : null
}
}
})
}); ;
/*!
 * jScrollPane - v2.0.22 - 2015-04-25
 * http://jscrollpane.kelvinluck.com/
 *
 * Copyright (c) 2014 Kelvin Luck
 * Dual licensed under the MIT or GPL licenses.
 */
!function (a) {
'function' == typeof define && define.amd ? define(['jquery'], a)  : 'object' == typeof exports ? module.exports = a(require('jquery'))  : a(jQuery)
}(function (a) {
a.fn.jScrollPane = function (b) {
function c(b, c) {
function d(c) {
var f,
h,
j,
k,
l,
o,
p = !1,
q = !1;
if (N = c, void 0 === O) l = b.scrollTop(),
o = b.scrollLeft(),
b.css({
overflow: 'hidden',
padding: 0
}),
P = b.innerWidth() + ra,
Q = b.innerHeight(),
b.width(P),
O = a('<div class="jspPane" />').css('padding', qa).append(b.children()),
R = a('<div class="jspContainer" />').css({
width: P + 'px',
height: Q + 'px'
}).append(O).appendTo(b);
 else {
if (b.css('width', ''), p = N.stickToBottom && A(), q = N.stickToRight && B(), k = b.innerWidth() + ra != P || b.outerHeight() != Q, k && (P = b.innerWidth() + ra, Q = b.innerHeight(), R.css({
width: P + 'px',
height: Q + 'px'
})), !k && sa == S && O.outerHeight() == T) return void b.width(P);
sa = S,
O.css('width', ''),
b.width(P),
R.find('>.jspVerticalBar,>.jspHorizontalBar').remove().end()
}
O.css('overflow', 'auto'),
S = c.contentWidth ? c.contentWidth : O[0].scrollWidth,
T = O[0].scrollHeight,
O.css('overflow', ''),
U = S / P,
V = T / Q,
W = V > 1,
X = U > 1,
X || W ? (b.addClass('jspScrollable'), f = N.maintainPosition && ($ || ba), f && (h = y(), j = z()), e(), g(), i(), f && (w(q ? S - P : h, !1), v(p ? T - Q : j, !1)), F(), C(), L(), N.enableKeyboardNavigation && H(), N.clickOnTrack && m(), J(), N.hijackInternalLinks && K())  : (b.removeClass('jspScrollable'), O.css({
top: 0,
left: 0,
width: R.width() - ra
}), D(), G(), I(), n()),
N.autoReinitialise && !pa ? pa = setInterval(function () {
d(N)
}, N.autoReinitialiseDelay)  : !N.autoReinitialise && pa && clearInterval(pa),
l && b.scrollTop(0) && v(l, !1),
o && b.scrollLeft(0) && w(o, !1),
b.trigger('jsp-initialised', [
X || W
])
}
function e() {
W && (R.append(a('<div class="jspVerticalBar" />').append(a('<div class="jspCap jspCapTop" />'), a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragTop" />'), a('<div class="jspDragBottom" />'))), a('<div class="jspCap jspCapBottom" />'))), ca = R.find('>.jspVerticalBar'), da = ca.find('>.jspTrack'), Y = da.find('>.jspDrag'), N.showArrows && (ha = a('<a class="jspArrow jspArrowUp" />').bind('mousedown.jsp', k(0, - 1)).bind('click.jsp', E), ia = a('<a class="jspArrow jspArrowDown" />').bind('mousedown.jsp', k(0, 1)).bind('click.jsp', E), N.arrowScrollOnHover && (ha.bind('mouseover.jsp', k(0, - 1, ha)), ia.bind('mouseover.jsp', k(0, 1, ia))), j(da, N.verticalArrowPositions, ha, ia)), fa = Q, R.find('>.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow').each(function () {
fa -= a(this).outerHeight()
}), Y.hover(function () {
Y.addClass('jspHover')
}, function () {
Y.removeClass('jspHover')
}).bind('mousedown.jsp', function (b) {
a('html').bind('dragstart.jsp selectstart.jsp', E),
Y.addClass('jspActive');
var c = b.pageY - Y.position().top;
return a('html').bind('mousemove.jsp', function (a) {
p(a.pageY - c, !1)
}).bind('mouseup.jsp mouseleave.jsp', o),
!1
}), f())
}
function f() {
da.height(fa + 'px'),
$ = 0,
ea = N.verticalGutter + da.outerWidth(),
O.width(P - ea - ra);
try {
0 === ca.position().left && O.css('margin-left', ea + 'px')
} catch (a) {
}
}
function g() {
X && (R.append(a('<div class="jspHorizontalBar" />').append(a('<div class="jspCap jspCapLeft" />'), a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragLeft" />'), a('<div class="jspDragRight" />'))), a('<div class="jspCap jspCapRight" />'))), ja = R.find('>.jspHorizontalBar'), ka = ja.find('>.jspTrack'), _ = ka.find('>.jspDrag'), N.showArrows && (na = a('<a class="jspArrow jspArrowLeft" />').bind('mousedown.jsp', k( - 1, 0)).bind('click.jsp', E), oa = a('<a class="jspArrow jspArrowRight" />').bind('mousedown.jsp', k(1, 0)).bind('click.jsp', E), N.arrowScrollOnHover && (na.bind('mouseover.jsp', k( - 1, 0, na)), oa.bind('mouseover.jsp', k(1, 0, oa))), j(ka, N.horizontalArrowPositions, na, oa)), _.hover(function () {
_.addClass('jspHover')
}, function () {
_.removeClass('jspHover')
}).bind('mousedown.jsp', function (b) {
a('html').bind('dragstart.jsp selectstart.jsp', E),
_.addClass('jspActive');
var c = b.pageX - _.position().left;
return a('html').bind('mousemove.jsp', function (a) {
r(a.pageX - c, !1)
}).bind('mouseup.jsp mouseleave.jsp', o),
!1
}), la = R.innerWidth(), h())
}
function h() {
R.find('>.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow').each(function () {
la -= a(this).outerWidth()
}),
ka.width(la + 'px'),
ba = 0
}
function i() {
if (X && W) {
var b = ka.outerHeight(),
c = da.outerWidth();
fa -= b,
a(ja).find('>.jspCap:visible,>.jspArrow').each(function () {
la += a(this).outerWidth()
}),
la -= c,
Q -= c,
P -= b,
ka.parent().append(a('<div class="jspCorner" />').css('width', b + 'px')),
f(),
h()
}
X && O.width(R.outerWidth() - ra + 'px'),
T = O.outerHeight(),
V = T / Q,
X && (ma = Math.ceil(1 / U * la), ma > N.horizontalDragMaxWidth ? ma = N.horizontalDragMaxWidth : ma < N.horizontalDragMinWidth && (ma = N.horizontalDragMinWidth), _.width(ma + 'px'), aa = la - ma, s(ba)),
W && (ga = Math.ceil(1 / V * fa), ga > N.verticalDragMaxHeight ? ga = N.verticalDragMaxHeight : ga < N.verticalDragMinHeight && (ga = N.verticalDragMinHeight), Y.height(ga + 'px'), Z = fa - ga, q($))
}
function j(a, b, c, d) {
var e,
f = 'before',
g = 'after';
'os' == b && (b = /Mac/.test(navigator.platform) ? 'after' : 'split'),
b == f ? g = b : b == g && (f = b, e = c, c = d, d = e),
a[f](c) [g](d)
}
function k(a, b, c) {
return function () {
return l(a, b, this, c),
this.blur(),
!1
}
}
function l(b, c, d, e) {
d = a(d).addClass('jspActive');
var f,
g,
h = !0,
i = function () {
0 !== b && ta.scrollByX(b * N.arrowButtonSpeed),
0 !== c && ta.scrollByY(c * N.arrowButtonSpeed),
g = setTimeout(i, h ? N.initialDelay : N.arrowRepeatFreq),
h = !1
};
i(),
f = e ? 'mouseout.jsp' : 'mouseup.jsp',
e = e || a('html'),
e.bind(f, function () {
d.removeClass('jspActive'),
g && clearTimeout(g),
g = null,
e.unbind(f)
})
}
function m() {
n(),
W && da.bind('mousedown.jsp', function (b) {
if (void 0 === b.originalTarget || b.originalTarget == b.currentTarget) {
var c,
d = a(this),
e = d.offset(),
f = b.pageY - e.top - $,
g = !0,
h = function () {
var a = d.offset(),
e = b.pageY - a.top - ga / 2,
j = Q * N.scrollPagePercent,
k = Z * j / (T - Q);
if (0 > f) $ - k > e ? ta.scrollByY( - j)  : p(e);
 else {
if (!(f > 0)) return void i();
e > $ + k ? ta.scrollByY(j)  : p(e)
}
c = setTimeout(h, g ? N.initialDelay : N.trackClickRepeatFreq),
g = !1
},
i = function () {
c && clearTimeout(c),
c = null,
a(document).unbind('mouseup.jsp', i)
};
return h(),
a(document).bind('mouseup.jsp', i),
!1
}
}),
X && ka.bind('mousedown.jsp', function (b) {
if (void 0 === b.originalTarget || b.originalTarget == b.currentTarget) {
var c,
d = a(this),
e = d.offset(),
f = b.pageX - e.left - ba,
g = !0,
h = function () {
var a = d.offset(),
e = b.pageX - a.left - ma / 2,
j = P * N.scrollPagePercent,
k = aa * j / (S - P);
if (0 > f) ba - k > e ? ta.scrollByX( - j)  : r(e);
 else {
if (!(f > 0)) return void i();
e > ba + k ? ta.scrollByX(j)  : r(e)
}
c = setTimeout(h, g ? N.initialDelay : N.trackClickRepeatFreq),
g = !1
},
i = function () {
c && clearTimeout(c),
c = null,
a(document).unbind('mouseup.jsp', i)
};
return h(),
a(document).bind('mouseup.jsp', i),
!1
}
})
}
function n() {
ka && ka.unbind('mousedown.jsp'),
da && da.unbind('mousedown.jsp')
}
function o() {
a('html').unbind('dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp'),
Y && Y.removeClass('jspActive'),
_ && _.removeClass('jspActive')
}
function p(a, b) {
W && (0 > a ? a = 0 : a > Z && (a = Z), void 0 === b && (b = N.animateScroll), b ? ta.animate(Y, 'top', a, q)  : (Y.css('top', a), q(a)))
}
function q(a) {
void 0 === a && (a = Y.position().top),
R.scrollTop(0),
$ = a || 0;
var c = 0 === $,
d = $ == Z,
e = a / Z,
f = - e * (T - Q);
(ua != c || wa != d) && (ua = c, wa = d, b.trigger('jsp-arrow-change', [
ua,
wa,
va,
xa
])),
t(c, d),
O.css('top', f),
b.trigger('jsp-scroll-y', [
- f,
c,
d
]).trigger('scroll')
}
function r(a, b) {
X && (0 > a ? a = 0 : a > aa && (a = aa), void 0 === b && (b = N.animateScroll), b ? ta.animate(_, 'left', a, s)  : (_.css('left', a), s(a)))
}
function s(a) {
void 0 === a && (a = _.position().left),
R.scrollTop(0),
ba = a || 0;
var c = 0 === ba,
d = ba == aa,
e = a / aa,
f = - e * (S - P);
(va != c || xa != d) && (va = c, xa = d, b.trigger('jsp-arrow-change', [
ua,
wa,
va,
xa
])),
u(c, d),
O.css('left', f),
b.trigger('jsp-scroll-x', [
- f,
c,
d
]).trigger('scroll')
}
function t(a, b) {
N.showArrows && (ha[a ? 'addClass' : 'removeClass']('jspDisabled'), ia[b ? 'addClass' : 'removeClass']('jspDisabled'))
}
function u(a, b) {
N.showArrows && (na[a ? 'addClass' : 'removeClass']('jspDisabled'), oa[b ? 'addClass' : 'removeClass']('jspDisabled'))
}
function v(a, b) {
var c = a / (T - Q);
p(c * Z, b)
}
function w(a, b) {
var c = a / (S - P);
r(c * aa, b)
}
function x(b, c, d) {
var e,
f,
g,
h,
i,
j,
k,
l,
m,
n = 0,
o = 0;
try {
e = a(b)
} catch (p) {
return
}
for (f = e.outerHeight(), g = e.outerWidth(), R.scrollTop(0), R.scrollLeft(0); !e.is('.jspPane'); ) if (n += e.position().top, o += e.position().left, e = e.offsetParent(), /^body|html$/i.test(e[0].nodeName)) return;
h = z(),
j = h + Q,
h > n || c ? l = n - N.horizontalGutter : n + f > j && (l = n - Q + f + N.horizontalGutter),
isNaN(l) || v(l, d),
i = y(),
k = i + P,
i > o || c ? m = o - N.horizontalGutter : o + g > k && (m = o - P + g + N.horizontalGutter),
isNaN(m) || w(m, d)
}
function y() {
return - O.position().left
}
function z() {
return - O.position().top
}
function A() {
var a = T - Q;
return a > 20 && a - z() < 10
}
function B() {
var a = S - P;
return a > 20 && a - y() < 10
}
function C() {
R.unbind(za).bind(za, function (a, b, c, d) {
ba || (ba = 0),
$ || ($ = 0);
var e = ba,
f = $,
g = a.deltaFactor || N.mouseWheelSpeed;
return ta.scrollBy(c * g, - d * g, !1),
e == ba && f == $
})
}
function D() {
R.unbind(za)
}
function E() {
return !1
}
function F() {
O.find(':input,a').unbind('focus.jsp').bind('focus.jsp', function (a) {
x(a.target, !1)
})
}
function G() {
O.find(':input,a').unbind('focus.jsp')
}
function H() {
function c() {
var a = ba,
b = $;
switch (d) {
case 40:
ta.scrollByY(N.keyboardSpeed, !1);
break;
case 38:
ta.scrollByY( - N.keyboardSpeed, !1);
break;
case 34:
case 32:
ta.scrollByY(Q * N.scrollPagePercent, !1);
break;
case 33:
ta.scrollByY( - Q * N.scrollPagePercent, !1);
break;
case 39:
ta.scrollByX(N.keyboardSpeed, !1);
break;
case 37:
ta.scrollByX( - N.keyboardSpeed, !1)
}
return e = a != ba || b != $
}
var d,
e,
f = [
];
X && f.push(ja[0]),
W && f.push(ca[0]),
O.bind('focus.jsp', function () {
b.focus()
}),
b.attr('tabindex', 0).unbind('keydown.jsp keypress.jsp').bind('keydown.jsp', function (b) {
if (b.target === this || f.length && a(b.target).closest(f).length) {
var g = ba,
h = $;
switch (b.keyCode) {
case 40:
case 38:
case 34:
case 32:
case 33:
case 39:
case 37:
d = b.keyCode,
c();
break;
case 35:
v(T - Q),
d = null;
break;
case 36:
v(0),
d = null
}
return e = b.keyCode == d && g != ba || h != $,
!e
}
}).bind('keypress.jsp', function (a) {
return a.keyCode == d && c(),
!e
}), N.hideFocus ? (b.css('outline', 'none'), 'hideFocus' in R[0] && b.attr('hideFocus', !0))  : (b.css('outline', ''), 'hideFocus' in R[0] && b.attr('hideFocus', !1))
}
function I() {
b.attr('tabindex', '-1').removeAttr('tabindex').unbind('keydown.jsp keypress.jsp'),
O.unbind('.jsp')
}
function J() {
if (location.hash && location.hash.length > 1) {
var b,
c,
d = escape(location.hash.substr(1));
try {
b = a('#' + d + ', a[name="' + d + '"]')
} catch (e) {
return
}
b.length && O.find(d) && (0 === R.scrollTop() ? c = setInterval(function () {
R.scrollTop() > 0 && (x(b, !0), a(document).scrollTop(R.position().top), clearInterval(c))
}, 50)  : (x(b, !0), a(document).scrollTop(R.position().top)))
}
}
function K() {
a(document.body).data('jspHijack') || (a(document.body).data('jspHijack', !0), a(document.body).delegate('a[href*=#]', 'click', function (b) {
var c,
d,
e,
f,
g,
h,
i = this.href.substr(0, this.href.indexOf('#')),
j = location.href;
if ( - 1 !== location.href.indexOf('#') && (j = location.href.substr(0, location.href.indexOf('#'))), i === j) {
c = escape(this.href.substr(this.href.indexOf('#') + 1));
try {
d = a('#' + c + ', a[name="' + c + '"]')
} catch (k) {
return
}
d.length && (e = d.closest('.jspScrollable'), f = e.data('jsp'), f.scrollToElement(d, !0), e[0].scrollIntoView && (g = a(window).scrollTop(), h = d.offset().top, (g > h || h > g + a(window).height()) && e[0].scrollIntoView()), b.preventDefault())
}
}))
}
function L() {
var a,
b,
c,
d,
e,
f = !1;
R.unbind('touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick').bind('touchstart.jsp', function (g) {
var h = g.originalEvent.touches[0];
a = y(),
b = z(),
c = h.pageX,
d = h.pageY,
e = !1,
f = !0
}).bind('touchmove.jsp', function (g) {
if (f) {
var h = g.originalEvent.touches[0],
i = ba,
j = $;
return ta.scrollTo(a + c - h.pageX, b + d - h.pageY),
e = e || Math.abs(c - h.pageX) > 5 || Math.abs(d - h.pageY) > 5,
i == ba && j == $
}
}).bind('touchend.jsp', function (a) {
f = !1
}).bind('click.jsp-touchclick', function (a) {
return e ? (e = !1, !1)  : void 0
})
}
function M() {
var a = z(),
c = y();
b.removeClass('jspScrollable').unbind('.jsp'),
O.unbind('.jsp'),
b.replaceWith(ya.append(O.children())),
ya.scrollTop(a),
ya.scrollLeft(c),
pa && clearInterval(pa)
}
var N,
O,
P,
Q,
R,
S,
T,
U,
V,
W,
X,
Y,
Z,
$,
_,
aa,
ba,
ca,
da,
ea,
fa,
ga,
ha,
ia,
ja,
ka,
la,
ma,
na,
oa,
pa,
qa,
ra,
sa,
ta = this,
ua = !0,
va = !0,
wa = !1,
xa = !1,
ya = b.clone(!1, !1).empty(),
za = a.fn.mwheelIntent ? 'mwheelIntent.jsp' : 'mousewheel.jsp';
'border-box' === b.css('box-sizing') ? (qa = 0, ra = 0)  : (qa = b.css('paddingTop') + ' ' + b.css('paddingRight') + ' ' + b.css('paddingBottom') + ' ' + b.css('paddingLeft'), ra = (parseInt(b.css('paddingLeft'), 10) || 0) + (parseInt(b.css('paddingRight'), 10) || 0)),
a.extend(ta, {
reinitialise: function (b) {
b = a.extend({
}, N, b),
d(b)
},
scrollToElement: function (a, b, c) {
x(a, b, c)
},
scrollTo: function (a, b, c) {
w(a, c),
v(b, c)
},
scrollToX: function (a, b) {
w(a, b)
},
scrollToY: function (a, b) {
v(a, b)
},
scrollToPercentX: function (a, b) {
w(a * (S - P), b)
},
scrollToPercentY: function (a, b) {
v(a * (T - Q), b)
},
scrollBy: function (a, b, c) {
ta.scrollByX(a, c),
ta.scrollByY(b, c)
},
scrollByX: function (a, b) {
var c = y() + Math[0 > a ? 'floor' : 'ceil'](a),
d = c / (S - P);
r(d * aa, b)
},
scrollByY: function (a, b) {
var c = z() + Math[0 > a ? 'floor' : 'ceil'](a),
d = c / (T - Q);
p(d * Z, b)
},
positionDragX: function (a, b) {
r(a, b)
},
positionDragY: function (a, b) {
p(a, b)
},
animate: function (a, b, c, d) {
var e = {
};
e[b] = c,
a.animate(e, {
duration: N.animateDuration,
easing: N.animateEase,
queue: !1,
step: d
})
},
getContentPositionX: function () {
return y()
},
getContentPositionY: function () {
return z()
},
getContentWidth: function () {
return S
},
getContentHeight: function () {
return T
},
getPercentScrolledX: function () {
return y() / (S - P)
},
getPercentScrolledY: function () {
return z() / (T - Q)
},
getIsScrollableH: function () {
return X
},
getIsScrollableV: function () {
return W
},
getContentPane: function () {
return O
},
scrollToBottom: function (a) {
p(Z, a)
},
hijackInternalLinks: a.noop,
destroy: function () {
M()
}
}),
d(c)
}
return b = a.extend({
}, a.fn.jScrollPane.defaults, b),
a.each(['arrowButtonSpeed',
'trackClickSpeed',
'keyboardSpeed'], function () {
b[this] = b[this] || b.speed
}),
this.each(function () {
var d = a(this),
e = d.data('jsp');
e ? e.reinitialise(b)  : (a('script', d).filter('[type="text/javascript"],:not([type])').remove(), e = new c(d, b), d.data('jsp', e))
})
},
a.fn.jScrollPane.defaults = {
showArrows: !1,
maintainPosition: !0,
stickToBottom: !1,
stickToRight: !1,
clickOnTrack: !0,
autoReinitialise: !1,
autoReinitialiseDelay: 500,
verticalDragMinHeight: 0,
verticalDragMaxHeight: 99999,
horizontalDragMinWidth: 0,
horizontalDragMaxWidth: 99999,
contentWidth: void 0,
animateScroll: !1,
animateDuration: 300,
animateEase: 'linear',
hijackInternalLinks: !1,
verticalGutter: 4,
horizontalGutter: 4,
mouseWheelSpeed: 3,
arrowButtonSpeed: 0,
arrowRepeatFreq: 50,
arrowScrollOnHover: !1,
trackClickSpeed: 0,
trackClickRepeatFreq: 70,
verticalArrowPositions: 'split',
horizontalArrowPositions: 'split',
enableKeyboardNavigation: !0,
hideFocus: !1,
keyboardSpeed: 0,
initialDelay: 300,
speed: 30,
scrollPagePercent: 0.8
}
});
;
/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.12
 *
 * Requires: jQuery 1.2.2+
 */
!function (a) {
'function' == typeof define && define.amd ? define(['jquery'], a)  : 'object' == typeof exports ? module.exports = a : a(jQuery)
}(function (a) {
function b(b) {
var g = b || window.event,
h = i.call(arguments, 1),
j = 0,
l = 0,
m = 0,
n = 0,
o = 0,
p = 0;
if (b = a.event.fix(g), b.type = 'mousewheel', 'detail' in g && (m = - 1 * g.detail), 'wheelDelta' in g && (m = g.wheelDelta), 'wheelDeltaY' in g && (m = g.wheelDeltaY), 'wheelDeltaX' in g && (l = - 1 * g.wheelDeltaX), 'axis' in g && g.axis === g.HORIZONTAL_AXIS && (l = - 1 * m, m = 0), j = 0 === m ? l : m, 'deltaY' in g && (m = - 1 * g.deltaY, j = m), 'deltaX' in g && (l = g.deltaX, 0 === m && (j = - 1 * l)), 0 !== m || 0 !== l) {
if (1 === g.deltaMode) {
var q = a.data(this, 'mousewheel-line-height');
j *= q,
m *= q,
l *= q
} else if (2 === g.deltaMode) {
var r = a.data(this, 'mousewheel-page-height');
j *= r,
m *= r,
l *= r
}
if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? 'floor' : 'ceil'](j / f), l = Math[l >= 1 ? 'floor' : 'ceil'](l / f), m = Math[m >= 1 ? 'floor' : 'ceil'](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
var s = this.getBoundingClientRect();
o = b.clientX - s.left,
p = b.clientY - s.top
}
return b.deltaX = l,
b.deltaY = m,
b.deltaFactor = f,
b.offsetX = o,
b.offsetY = p,
b.deltaMode = 0,
h.unshift(b, j, l, m),
e && clearTimeout(e),
e = setTimeout(c, 200),
(a.event.dispatch || a.event.handle).apply(this, h)
}
}
function c() {
f = null
}
function d(a, b) {
return k.settings.adjustOldDeltas && 'mousewheel' === a.type && b % 120 === 0
}
var e,
f,
g = [
'wheel',
'mousewheel',
'DOMMouseScroll',
'MozMousePixelScroll'
],
h = 'onwheel' in document || document.documentMode >= 9 ? [
'wheel'
] : [
'mousewheel',
'DomMouseScroll',
'MozMousePixelScroll'
],
i = Array.prototype.slice;
if (a.event.fixHooks) for (var j = g.length; j; ) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
var k = a.event.special.mousewheel = {
version: '3.1.12',
setup: function () {
if (this.addEventListener) for (var c = h.length; c; ) this.addEventListener(h[--c], b, !1);
 else this.onmousewheel = b;
a.data(this, 'mousewheel-line-height', k.getLineHeight(this)),
a.data(this, 'mousewheel-page-height', k.getPageHeight(this))
},
teardown: function () {
if (this.removeEventListener) for (var c = h.length; c; ) this.removeEventListener(h[--c], b, !1);
 else this.onmousewheel = null;
a.removeData(this, 'mousewheel-line-height'),
a.removeData(this, 'mousewheel-page-height')
},
getLineHeight: function (b) {
var c = a(b),
d = c['offsetParent' in a.fn ? 'offsetParent' : 'parent']();
return d.length || (d = a('body')),
parseInt(d.css('fontSize'), 10) || parseInt(c.css('fontSize'), 10) || 16
},
getPageHeight: function (b) {
return a(b).height()
},
settings: {
adjustOldDeltas: !0,
normalizeOffset: !0
}
};
a.fn.extend({
mousewheel: function (a) {
return a ? this.bind('mousewheel', a)  : this.trigger('mousewheel')
},
unmousewheel: function (a) {
return this.unbind('mousewheel', a)
}
})
});
;
/*
	Masked Input plugin for jQuery
	Copyright (c) 2007-2013 Josh Bush (digitalbush.com)
	Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
	Version: 1.3.1
*/
(function (e) {
function t() {
var e = document.createElement('input'),
t = 'onpaste';
return e.setAttribute(t, ''),
'function' == typeof e[t] ? 'paste' : 'input'
}
var n,
a = t() + '.mask',
r = navigator.userAgent,
i = /iphone/i.test(r),
o = /android/i.test(r);
e.mask = {
definitions: {
9: '[0-9]',
a: '[A-Za-z]',
'*': '[A-Za-z0-9]'
},
dataName: 'rawMaskFn',
placeholder: '_'
},
e.fn.extend({
caret: function (e, t) {
var n;
if (0 !== this.length && !this.is(':hidden')) return 'number' == typeof e ? (t = 'number' == typeof t ? t : e, this.each(function () {
this.setSelectionRange ? this.setSelectionRange(e, t)  : this.createTextRange && (n = this.createTextRange(), n.collapse(!0), n.moveEnd('character', t), n.moveStart('character', e), n.select())
}))  : (this[0].setSelectionRange ? (e = this[0].selectionStart, t = this[0].selectionEnd)  : document.selection && document.selection.createRange && (n = document.selection.createRange(), e = 0 - n.duplicate().moveStart('character', - 100000), t = e + n.text.length), {
begin: e,
end: t
})
},
unmask: function () {
return this.trigger('unmask')
},
mask: function (t, r) {
var c,
l,
s,
u,
f,
h;
return !t && this.length > 0 ? (c = e(this[0]), c.data(e.mask.dataName) ())  : (r = e.extend({
placeholder: e.mask.placeholder,
completed: null
}, r), l = e.mask.definitions, s = [
], u = h = t.length, f = null, e.each(t.split(''), function (e, t) {
'?' == t ? (h--, u = e)  : l[t] ? (s.push(RegExp(l[t])), null === f && (f = s.length - 1))  : s.push(null)
}), this.trigger('unmask').each(function () {
function c(e) {
for (; h > ++e && !s[e]; );
return e
}
function d(e) {
for (; --e >= 0 && !s[e]; );
return e
}
function m(e, t) {
var n,
a;
if (!(0 > e)) {
for (n = e, a = c(t); h > n; n++) if (s[n]) {
if (!(h > a && s[n].test(R[a]))) break;
R[n] = R[a],
R[a] = r.placeholder,
a = c(a)
}
b(),
x.caret(Math.max(f, e))
}
}
function p(e) {
var t,
n,
a,
i;
for (t = e, n = r.placeholder; h > t; t++) if (s[t]) {
if (a = c(t), i = R[t], R[t] = n, !(h > a && s[a].test(i))) break;
n = i
}
}
function g(e) {
var t,
n,
a,
r = e.which;
8 === r || 46 === r || i && 127 === r ? (t = x.caret(), n = t.begin, a = t.end, 0 === a - n && (n = 46 !== r ? d(n)  : a = c(n - 1), a = 46 === r ? c(a)  : a), k(n, a), m(n, a - 1), e.preventDefault())  : 27 == r && (x.val(S), x.caret(0, y()), e.preventDefault())
}
function v(t) {
var n,
a,
i,
l = t.which,
u = x.caret();
t.ctrlKey || t.altKey || t.metaKey || 32 > l || l && (0 !== u.end - u.begin && (k(u.begin, u.end), m(u.begin, u.end - 1)), n = c(u.begin - 1), h > n && (a = String.fromCharCode(l), s[n].test(a) && (p(n), R[n] = a, b(), i = c(n), o ? setTimeout(e.proxy(e.fn.caret, x, i), 0)  : x.caret(i), r.completed && i >= h && r.completed.call(x))), t.preventDefault())
}
function k(e, t) {
var n;
for (n = e; t > n && h > n; n++) s[n] && (R[n] = r.placeholder)
}
function b() {
x.val(R.join(''))
}
function y(e) {
var t,
n,
a = x.val(),
i = - 1;
for (t = 0, pos = 0; h > t; t++) if (s[t]) {
for (R[t] = r.placeholder; pos++ < a.length; ) if (n = a.charAt(pos - 1), s[t].test(n)) {
R[t] = n,
i = t;
break
}
if (pos > a.length) break
} else R[t] === a.charAt(pos) && t !== u && (pos++, i = t);
return e ? b()  : u > i + 1 ? (x.val(''), k(0, h))  : (b(), x.val(x.val().substring(0, i + 1))),
u ? t : f
}
var x = e(this),
R = e.map(t.split(''), function (e) {
return '?' != e ? l[e] ? r.placeholder : e : void 0
}),
S = x.val();
x.data(e.mask.dataName, function () {
return e.map(R, function (e, t) {
return s[t] && e != r.placeholder ? e : null
}).join('')
}),
x.attr('readonly') || x.one('unmask', function () {
x.unbind('.mask').removeData(e.mask.dataName)
}).bind('focus.mask', function () {
clearTimeout(n);
var e;
S = x.val(),
e = y(),
n = setTimeout(function () {
b(),
e == t.length ? x.caret(0, e)  : x.caret(e)
}, 10)
}).bind('blur.mask', function () {
y(),
x.val() != S && x.change()
}).bind('keydown.mask', g).bind('keypress.mask', v).bind(a, function () {
setTimeout(function () {
var e = y(!0);
x.caret(e),
r.completed && e == x.val().length && r.completed.call(x)
}, 0)
}),
y()
}))
}
})
}) (jQuery);
;
(function (b) {
'function' === typeof define && define.amd ? define(['jquery'], b)  : b(jQuery)
}) (function (b) {
function d(a, b) {
if (!(!f && a.originalEvent.touches && 1 < a.originalEvent.touches.length || f && !a.isPrimary)) {
a.preventDefault();
var c;
c = f ? a.originalEvent : a.originalEvent.changedTouches ? a.originalEvent.changedTouches[0] : a;
simulatedEvent = document.createEvent('MouseEvents');
var d = window.pageXOffset,
e = window.pageYOffset,
g = c.clientX,
h = c.clientY;
if (0 === c.pageY && Math.floor(h) > Math.floor(c.pageY) || 0 === c.pageX && Math.floor(g) > Math.floor(c.pageX)) g -= d,
h -= e;
 else if (h < c.pageY - e || g < c.pageX - d) g = c.pageX - d,
h = c.pageY - e;
coord = {
clientX: g,
clientY: h
};
simulatedEvent.initMouseEvent(b, !0, !0, window, 1, c.screenX, c.screenY, coord.clientX, coord.clientY, !1, !1, !1, !1, 0, null);
a.target.dispatchEvent(simulatedEvent)
}
}
var f = window.navigator.pointerEnabled || window.navigator.msPointerEnabled;
b.support.touch = b.support.touch || ('undefined' !== typeof Modernizr ? Modernizr.touch : 'ontouchend' in document || 'createTouch' in document || f);
if (b.support.touch || navigator.msPointerEnabled) {
var e = b.ui.mouse.prototype,
k = e._mouseInit,
j;
e._touchStart = function (a) {
j || !f && !this._mouseCapture(a.originalEvent.changedTouches[0]) || (j = !0, this._touchMoved = !1, d(a, 'mouseover'), d(a, 'mousemove'), d(a, 'mousedown'))
};
e._touchMove = function (a) {
j && (this._touchMoved = !0, d(a, 'mousemove'))
};
e._touchEnd = function (a) {
j && (d(a, 'mouseup'), d(a, 'mouseout'), this._touchMoved || d(a, 'click'), j = !1)
};
e._mouseInit = function () {
this.element.off('touchstart').off('touchmove').off('touchend');
if (f) this.element.on('pointerDown', b.proxy(this, '_touchStart')).on('pointerMove', b.proxy(this, '_touchMove')).on('pointerUp', b.proxy(this, '_touchEnd')).on('MSPointerDown', b.proxy(this, '_touchStart')).on('MSPointerMove', b.proxy(this, '_touchMove')).on('MSPointerUp', b.proxy(this, '_touchEnd'));
 else this.element.on(navigator.msPointerEnabled ? 'MSPointerDown' : 'touchstart', b.proxy(this, '_touchStart')).on(navigator.msPointerEnabled ? 'MSPointerMove' : 'touchmove', b.proxy(this, '_touchMove')).on(navigator.msPointerEnabled ? 'MSPointerUp' : 'touchend', b.proxy(this, '_touchEnd')),
this.element.css({
msTouchAction: 'none'
});
k.call(this)
}
}
});
;
(function (n) {
var w = function (d, a, b, f) {
var c = qrcode(b, a);
c.addData(d);
c.make();
f = f || 0;
var e = c.getModuleCount(),
g = c.getModuleCount() + 2 * f;
this.text = d;
this.level = a;
this.version = b;
this.moduleCount = g;
this.isDark = function (a, b) {
a -= f;
b -= f;
return 0 > a || a >= e || 0 > b || b >= e ? !1 : c.isDark(a, b)
};
this.addBlank = function (a, b, c, d) {
var f = this.isDark,
e = 1 / g;
this.isDark = function (g, n) {
var q = n * e,
t = g * e,
p = q + e,
r = t + e;
return f(g, n) && (a > p || q > c || b > r || t > d)
}
}
},
p = function () {
var d = document.createElement('canvas');
return !(!d.getContext || !d.getContext('2d'))
}(),
x = '[object Opera]' !== Object.prototype.toString.call(window.opera),
r = function (d, a, b, f, c) {
b = Math.max(1, b || 1);
for (f = Math.min(40, f || 40); b <= f; b += 1) try {
return new w(d, a, b, c)
} catch (e) {
}
},
y = function (d, a, b, f, c, e, g, h) {
d.isDark(g, h) && a.rect(f, c, e, e)
},
z = function (d, a, b, f, c, e, g, h) {
var l = d.isDark;
d = f + e;
var m = c + e;
b = b.radius * e;
var k = g - 1,
n = g + 1,
p = h - 1,
s = h + 1,
r = l(g, h),
q = l(k, p);
e = l(k, h);
var t = l(k, s),
k = l(g, s),
s = l(n, s);
h = l(n, h);
n = l(n, p);
g = l(g, p);
r ? (q = !e && !g, e = !e && !k, k = !h && !k, g = !h && !g, q ? a.moveTo(f + b, c)  : a.moveTo(f, c), e ? (a.lineTo(d - b, c), a.arcTo(d, c, d, m, b))  : a.lineTo(d, c), k ? (a.lineTo(d, m - b), a.arcTo(d, m, f, m, b))  : a.lineTo(d, m), g ? (a.lineTo(f + b, m), a.arcTo(f, m, f, c, b))  : a.lineTo(f, m), q ? (a.lineTo(f, c + b), a.arcTo(f, c, d, c, b))  : a.lineTo(f, c))  : (l = e && k && t, k = h && k && s, h = h && g && n, e && g && q && (a.moveTo(f + b, c), a.lineTo(f, c), a.lineTo(f, c + b), a.arcTo(f, c, f + b, c, b)), l && (a.moveTo(d - b, c), a.lineTo(d, c), a.lineTo(d, c + b), a.arcTo(d, c, d - b, c, b)), k && (a.moveTo(d - b, m), a.lineTo(d, m), a.lineTo(d, m - b), a.arcTo(d, m, d - b, m, b)), h && (a.moveTo(f + b, m), a.lineTo(f, m), a.lineTo(f, m - b), a.arcTo(f, m, f + b, m, b)))
},
u = function (d, a) {
var b = r(a.text, a.ecLevel, a.minVersion, a.maxVersion, a.quiet);
if (!b) return null;
var f = n(d).data('qrcode', b),
c = f[0].getContext('2d');
n(a.background).is('img') ? c.drawImage(a.background, 0, 0, a.size, a.size)  : a.background && (c.fillStyle = a.background, c.fillRect(a.left, a.top, a.size, a.size));
var e = a.mode;
if (1 === e || 2 === e) {
var e = a.size,
g = 'bold ' + a.mSize * e + 'px ' + a.fontname,
h = n('<canvas/>') [0].getContext('2d');
h.font = g;
var l = h.measureText(a.label).width,
h = a.mSize,
m = l / e,
l = (1 - m) * a.mPosX,
k = (1 - h) * a.mPosY,
m = l + m,
h = k + h;
1 === a.mode ? b.addBlank(0, k - 0.01, e, h + 0.01)  : b.addBlank(l - 0.01, k - 0.01, m + 0.01, h + 0.01);
c.fillStyle = a.fontcolor;
c.font = g;
c.fillText(a.label, l * e, k * e + 0.75 * a.mSize * e)
} else if (3 === e || 4 === e) {
var e = a.size,
g = a.mSize,
h = g * (a.image.naturalWidth || 1) / (a.image.naturalHeight || 1),
l = (1 - h) * a.mPosX,
k = (1 - g) * a.mPosY,
m = l + h,
p = k + g;
3 === a.mode ? b.addBlank(0, k - 0.01, e, p + 0.01)  : b.addBlank(l - 0.01, k - 0.01, m + 0.01, p + 0.01);
c.drawImage(a.image, l * e, k * e, h * e, g * e)
}
e = b.moduleCount;
g = a.size / e;
h = y;
x && 0 < a.radius && 0.5 >= a.radius && (h = z);
c.beginPath();
for (l = 0; l < e; l += 1) for (k = 0; k < e; k += 1) h(b, c, a, a.left + k * g, a.top + l * g, g, l, k);
n(a.fill).is('img') ? (c.strokeStyle = 'rgba(0,0,0,0.5)', c.lineWidth = 2, c.stroke(), b = c.globalCompositeOperation, c.globalCompositeOperation = 'destination-out', c.fill(), c.globalCompositeOperation = b, c.clip(), c.drawImage(a.fill, 0, 0, a.size, a.size), c.restore())  : (c.fillStyle = a.fill, c.fill());
return f
},
v = function (d) {
var a = n('<canvas/>').attr('width', d.size).attr('height', d.size);
return u(a, d)
},
A = function (d) {
if (p && 'canvas' === d.render) return v(d);
if (p && 'image' === d.render) return n('<img/>').attr('src', v(d) [0].toDataURL('image/png'));
var a;
if (a = r(d.text, d.ecLevel, d.minVersion, d.maxVersion, d.quiet)) {
var b = d.size,
f = d.background,
c = Math.floor,
e = a.moduleCount,
g = c(b / e),
c = c(0.5 * (b - g * e)),
h,
b = {
position: 'relative',
left: 0,
top: 0,
padding: 0,
margin: 0,
width: b,
height: b
};
d = {
position: 'absolute',
padding: 0,
margin: 0,
width: g,
height: g,
'background-color': d.fill
};
b = n('<div/>').data('qrcode', a).css(b);
f && b.css('background-color', f);
for (f = 0; f < e; f += 1) for (h = 0; h < e; h += 1) a.isDark(f, h) && n('<div/>').css(d).css({
left: c + h * g,
top: c + f * g
}).appendTo(b);
a = b
} else a = null;
return a
},
B = {
render: 'canvas',
minVersion: 1,
maxVersion: 40,
ecLevel: 'L',
left: 0,
top: 0,
size: 200,
fill: '#000',
background: null,
text: 'no text',
radius: 0,
quiet: 0,
mode: 0,
mSize: 0.1,
mPosX: 0.5,
mPosY: 0.5,
label: 'no label',
fontname: 'sans',
fontcolor: '#000',
image: null
};
n.fn.qrcode = function (d) {
var a = n.extend({
}, B, d);
return this.each(function () {
'canvas' === this.nodeName.toLowerCase() ? u(this, a)  : n(this).append(A(a))
})
}
}) (jQuery);
;
var qrcode = function () {
function y(g, h) {
if ('undefined' == typeof g.length) throw Error(g.length + '/' + h);
var a = function () {
for (var b = 0; b < g.length && 0 == g[b]; ) b += 1;
for (var c = Array(g.length - b + h), d = 0; d < g.length - b; d += 1) c[d] = g[d + b];
return c
}(),
b = {
get: function (b) {
return a[b]
},
getLength: function () {
return a.length
},
multiply: function (f) {
for (var c = Array(b.getLength() + f.getLength() - 1), d = 0; d < b.getLength(); d += 1) for (var a = 0; a < f.getLength(); a += 1) c[d + a] ^= r.gexp(r.glog(b.get(d)) + r.glog(f.get(a)));
return y(c, 0)
},
mod: function (f) {
if (0 > b.getLength() - f.getLength()) return b;
for (var c = r.glog(b.get(0)) - r.glog(f.get(0)), d = Array(b.getLength()), a = 0; a < b.getLength(); a += 1) d[a] = b.get(a);
for (a = 0; a < f.getLength(); a += 1) d[a] ^= r.gexp(r.glog(f.get(a)) + c);
return y(d, 0).mod(f)
}
};
return b
}
var A = function (g, h) {
var a = s[h],
b = null,
f = 0,
c = null,
d = [
],
e = {
},
l = function (e, h) {
for (var m = f = 4 * g + 17, k = Array(m), n = 0; n < m; n += 1) {
k[n] = Array(m);
for (var l = 0; l < m; l += 1) k[n][l] = null
}
b = k;
z(0, 0);
z(f - 7, 0);
z(0, f - 7);
m = x.getPatternPosition(g);
for (k = 0; k < m.length; k += 1) for (n = 0; n < m.length; n += 1) {
var l = m[k],
w = m[n];
if (null == b[l][w]) for (var u = - 2; 2 >= u; u += 1) for (var p = - 2; 2 >= p; p += 1) b[l + u][w + p] = - 2 == u || 2 == u || - 2 == p || 2 == p || 0 == u && 0 == p ? !0 : !1
}
for (m = 8; m < f - 8; m += 1) null == b[m][6] && (b[m][6] = 0 == m % 2);
for (m = 8; m < f - 8; m += 1) null == b[6][m] && (b[6][m] = 0 == m % 2);
m = x.getBCHTypeInfo(a << 3 | h);
for (k = 0; 15 > k; k += 1) n = !e && 1 == (m >> k & 1),
6 > k ? b[k][8] = n : 8 > k ? b[k + 1][8] = n : b[f - 15 + k][8] = n;
for (k = 0; 15 > k; k += 1) n = !e && 1 == (m >> k & 1),
8 > k ? b[8][f - k - 1] = n : 9 > k ? b[8][15 - k - 1 + 1] = n : b[8][15 - k - 1] = n;
b[f - 8][8] = !e;
if (7 <= g) {
m = x.getBCHTypeNumber(g);
for (k = 0; 18 > k; k += 1) n = !e && 1 == (m >> k & 1),
b[Math.floor(k / 3)][k % 3 + f - 8 - 3] = n;
for (k = 0; 18 > k; k += 1) n = !e && 1 == (m >> k & 1),
b[k % 3 + f - 8 - 3][Math.floor(k / 3)] = n
}
if (null == c) {
m = D.getRSBlocks(g, a);
k = E();
for (n = 0; n < d.length; n += 1) l = d[n],
k.put(l.getMode(), 4),
k.put(l.getLength(), x.getLengthInBits(l.getMode(), g)),
l.write(k);
for (n = l = 0; n < m.length; n += 1) l += m[n].dataCount;
if (k.getLengthInBits() > 8 * l) throw Error('code length overflow. (' + k.getLengthInBits() + '>' + 8 * l + ')');
for (k.getLengthInBits() + 4 <= 8 * l && k.put(0, 4); 0 != k.getLengthInBits() % 8; ) k.putBit(!1);
for (; !(k.getLengthInBits() >= 8 * l); ) {
k.put(236, 8);
if (k.getLengthInBits() >= 8 * l) break;
k.put(17, 8)
}
for (var v = 0, l = n = 0, w = Array(m.length), u = Array(m.length), p = 0; p < m.length; p += 1) {
var r = m[p].dataCount,
s = m[p].totalCount - r,
n = Math.max(n, r),
l = Math.max(l, s);
w[p] = Array(r);
for (var q = 0; q < w[p].length; q += 1) w[p][q] = 255 & k.getBuffer() [q + v];
v += r;
q = x.getErrorCorrectPolynomial(s);
r = y(w[p], q.getLength() - 1).mod(q);
u[p] = Array(q.getLength() - 1);
for (q = 0; q < u[p].length; q += 1) s = q + r.getLength() - u[p].length,
u[p][q] = 0 <= s ? r.get(s)  : 0
}
for (q = k = 0; q < m.length; q += 1) k += m[q].totalCount;
k = Array(k);
for (q = v = 0; q < n; q += 1) for (p = 0; p < m.length; p += 1) q < w[p].length && (k[v] = w[p][q], v += 1);
for (q = 0; q < l; q += 1) for (p = 0; p < m.length; p += 1) q < u[p].length && (k[v] = u[p][q], v += 1);
c = k
}
m = c;
k = - 1;
n = f - 1;
l = 7;
w = 0;
u = x.getMaskFunction(h);
for (p = f - 1; 0 < p; p -= 2) for (6 == p && (p -= 1); ; ) {
for (q = 0; 2 > q; q += 1) null == b[n][p - q] && (v = !1, w < m.length && (v = 1 == (m[w] >>> l & 1)), u(n, p - q) && (v = !v), b[n][p - q] = v, l -= 1, - 1 == l && (w += 1, l = 7));
n += k;
if (0 > n || f <= n) {
n -= k;
k = - k;
break
}
}
},
z = function (c, d) {
for (var a = - 1; 7 >= a; a += 1) if (!( - 1 >= c + a || f <= c + a)) for (var e = - 1; 7 >= e; e += 1) - 1 >= d + e || f <= d + e || (b[c + a][d + e] = 0 <= a && 6 >= a && (0 == e || 6 == e) || 0 <= e && 6 >= e && (0 == a || 6 == a) || 2 <= a && 4 >= a && 2 <= e && 4 >= e ? !0 : !1)
};
e.addData = function (b) {
b = F(b);
d.push(b);
c = null
};
e.isDark = function (a, c) {
if (0 > a || f <= a || 0 > c || f <= c) throw Error(a + ',' + c);
return b[a][c]
};
e.getModuleCount = function () {
return f
};
e.make = function () {
for (var b = 0, a = 0, c = 0; 8 > c; c += 1) {
l(!0, c);
var d = x.getLostPoint(e);
if (0 == c || b > d) b = d,
a = c
}
l(!1, a)
};
e.createTableTag = function (b, a) {
b = b || 2;
var c;
c = '<table style=" border-width: 0px; border-style: none;';
c += ' border-collapse: collapse;';
c += ' padding: 0px; margin: ' + ('undefined' == typeof a ? 4 * b : a) + 'px;';
c += '">';
c += '<tbody>';
for (var d = 0; d < e.getModuleCount(); d += 1) {
c += '<tr>';
for (var f = 0; f < e.getModuleCount(); f += 1) c += '<td style="',
c += ' border-width: 0px; border-style: none;',
c += ' border-collapse: collapse;',
c += ' padding: 0px; margin: 0px;',
c += ' width: ' + b + 'px;',
c += ' height: ' + b + 'px;',
c += ' background-color: ',
c += e.isDark(d, f) ? '#000000' : '#ffffff',
c += ';',
c += '"/>';
c += '</tr>'
}
c += '</tbody>';
return c += '</table>'
};
e.createImgTag = function (c, b) {
c = c || 2;
b = 'undefined' == typeof b ? 4 * c : b;
var a = e.getModuleCount() * c + 2 * b,
d = b,
f = a - b;
return G(a, a, function (b, a) {
return d <= b && b < f && d <= a && a < f ? e.isDark(Math.floor((a - d) / c), Math.floor((b - d) / c)) ? 0 : 1 : 1
})
};
return e
};
A.stringToBytes = function (g) {
for (var h = [
], a = 0; a < g.length; a += 1) {
var b = g.charCodeAt(a);
h.push(b & 255)
}
return h
};
A.createStringToBytes = function (g, h) {
var a = function () {
for (var b = H(g), a = function () {
var c = b.read();
if ( - 1 == c) throw Error();
return c
}, c = 0, d = {
}; ; ) {
var e = b.read();
if ( - 1 == e) break;
var l = a(),
z = a(),
C = a(),
e = String.fromCharCode(e << 8 | l);
d[e] = z << 8 | C;
c += 1
}
if (c != h) throw Error(c + ' != ' + h);
return d
}();
return function (b) {
for (var f = [
], c = 0; c < b.length; c += 1) {
var d = b.charCodeAt(c);
128 > d ? f.push(d)  : (d = a[b.charAt(c)], 'number' == typeof d ? (d & 255) == d ? f.push(d)  : (f.push(d >>> 8), f.push(d & 255))  : f.push(63))
}
return f
}
};
var s = {
L: 1,
M: 0,
Q: 3,
H: 2
},
x = function () {
var g = [
[],
[
6,
18
],
[
6,
22
],
[
6,
26
],
[
6,
30
],
[
6,
34
],
[
6,
22,
38
],
[
6,
24,
42
],
[
6,
26,
46
],
[
6,
28,
50
],
[
6,
30,
54
],
[
6,
32,
58
],
[
6,
34,
62
],
[
6,
26,
46,
66
],
[
6,
26,
48,
70
],
[
6,
26,
50,
74
],
[
6,
30,
54,
78
],
[
6,
30,
56,
82
],
[
6,
30,
58,
86
],
[
6,
34,
62,
90
],
[
6,
28,
50,
72,
94
],
[
6,
26,
50,
74,
98
],
[
6,
30,
54,
78,
102
],
[
6,
28,
54,
80,
106
],
[
6,
32,
58,
84,
110
],
[
6,
30,
58,
86,
114
],
[
6,
34,
62,
90,
118
],
[
6,
26,
50,
74,
98,
122
],
[
6,
30,
54,
78,
102,
126
],
[
6,
26,
52,
78,
104,
130
],
[
6,
30,
56,
82,
108,
134
],
[
6,
34,
60,
86,
112,
138
],
[
6,
30,
58,
86,
114,
142
],
[
6,
34,
62,
90,
118,
146
],
[
6,
30,
54,
78,
102,
126,
150
],
[
6,
24,
50,
76,
102,
128,
154
],
[
6,
28,
54,
80,
106,
132,
158
],
[
6,
32,
58,
84,
110,
136,
162
],
[
6,
26,
54,
82,
110,
138,
166
],
[
6,
30,
58,
86,
114,
142,
170
]
],
h = {
},
a = function (b) {
for (var a = 0; 0 != b; ) a += 1,
b >>>= 1;
return a
};
h.getBCHTypeInfo = function (b) {
for (var f = b << 10; 0 <= a(f) - a(1335); ) f ^= 1335 << a(f) - a(1335);
return (b << 10 | f) ^ 21522
};
h.getBCHTypeNumber = function (b) {
for (var f = b << 12; 0 <= a(f) - a(7973); ) f ^= 7973 << a(f) - a(7973);
return b << 12 | f
};
h.getPatternPosition = function (b) {
return g[b - 1]
};
h.getMaskFunction = function (b) {
switch (b) {
case 0:
return function (b, c) {
return 0 == (b + c) % 2
};
case 1:
return function (b, c) {
return 0 == b % 2
};
case 2:
return function (b, c) {
return 0 == c % 3
};
case 3:
return function (b, c) {
return 0 == (b + c) % 3
};
case 4:
return function (b, c) {
return 0 == (Math.floor(b / 2) + Math.floor(c / 3)) % 2
};
case 5:
return function (b, c) {
return 0 == b * c % 2 + b * c % 3
};
case 6:
return function (b, c) {
return 0 == (b * c % 2 + b * c % 3) % 2
};
case 7:
return function (b, c) {
return 0 == (b * c % 3 + (b + c) % 2) % 2
};
default:
throw Error('bad maskPattern:' + b);
}
};
h.getErrorCorrectPolynomial = function (b) {
for (var a = y([1], 0), c = 0; c < b; c += 1) a = a.multiply(y([1,
r.gexp(c)], 0));
return a
};
h.getLengthInBits = function (b, a) {
if (1 <= a && 10 > a) switch (b) {
case 1:
return 10;
case 2:
return 9;
case 4:
return 8;
case 8:
return 8;
default:
throw Error('mode:' + b);
} else if (27 > a) switch (b) {
case 1:
return 12;
case 2:
return 11;
case 4:
return 16;
case 8:
return 10;
default:
throw Error('mode:' + b);
} else if (41 > a) switch (b) {
case 1:
return 14;
case 2:
return 13;
case 4:
return 16;
case 8:
return 12;
default:
throw Error('mode:' + b);
} else throw Error('type:' + a);
};
h.getLostPoint = function (b) {
for (var a = b.getModuleCount(), c = 0, d = 0; d < a; d += 1) for (var e = 0; e < a; e += 1) {
for (var l = 0, g = b.isDark(d, e), h = - 1; 1 >= h; h += 1) if (!(0 > d + h || a <= d + h)) for (var t = - 1; 1 >= t; t += 1) 0 > e + t || a <= e + t || 0 == h && 0 == t || g != b.isDark(d + h, e + t) || (l += 1);
5 < l && (c += 3 + l - 5)
}
for (d = 0; d < a - 1; d += 1) for (e = 0; e < a - 1; e += 1) if (l = 0, b.isDark(d, e) && (l += 1), b.isDark(d + 1, e) && (l += 1), b.isDark(d, e + 1) && (l += 1), b.isDark(d + 1, e + 1) && (l += 1), 0 == l || 4 == l) c += 3;
for (d = 0; d < a; d += 1) for (e = 0; e < a - 6; e += 1) b.isDark(d, e) && !b.isDark(d, e + 1) && b.isDark(d, e + 2) && b.isDark(d, e + 3) && b.isDark(d, e + 4) && !b.isDark(d, e + 5) && b.isDark(d, e + 6) && (c += 40);
for (e = 0; e < a; e += 1) for (d = 0; d < a - 6; d += 1) b.isDark(d, e) && !b.isDark(d + 1, e) && b.isDark(d + 2, e) && b.isDark(d + 3, e) && b.isDark(d + 4, e) && !b.isDark(d + 5, e) && b.isDark(d + 6, e) && (c += 40);
for (e = l = 0; e < a; e += 1) for (d = 0; d < a; d += 1) b.isDark(d, e) && (l += 1);
b = Math.abs(100 * l / a / a - 50) / 5;
return c + 10 * b
};
return h
}(),
r = function () {
for (var g = Array(256), h = Array(256), a = 0; 8 > a; a += 1) g[a] = 1 << a;
for (a = 8; 256 > a; a += 1) g[a] = g[a - 4] ^ g[a - 5] ^ g[a - 6] ^ g[a - 8];
for (a = 0; 255 > a; a += 1) h[g[a]] = a;
return {
glog: function (b) {
if (1 > b) throw Error('glog(' + b + ')');
return h[b]
},
gexp: function (b) {
for (; 0 > b; ) b += 255;
for (; 256 <= b; ) b -= 255;
return g[b]
}
}
}(),
D = function () {
var g = [
[1,
26,
19],
[
1,
26,
16
],
[
1,
26,
13
],
[
1,
26,
9
],
[
1,
44,
34
],
[
1,
44,
28
],
[
1,
44,
22
],
[
1,
44,
16
],
[
1,
70,
55
],
[
1,
70,
44
],
[
2,
35,
17
],
[
2,
35,
13
],
[
1,
100,
80
],
[
2,
50,
32
],
[
2,
50,
24
],
[
4,
25,
9
],
[
1,
134,
108
],
[
2,
67,
43
],
[
2,
33,
15,
2,
34,
16
],
[
2,
33,
11,
2,
34,
12
],
[
2,
86,
68
],
[
4,
43,
27
],
[
4,
43,
19
],
[
4,
43,
15
],
[
2,
98,
78
],
[
4,
49,
31
],
[
2,
32,
14,
4,
33,
15
],
[
4,
39,
13,
1,
40,
14
],
[
2,
121,
97
],
[
2,
60,
38,
2,
61,
39
],
[
4,
40,
18,
2,
41,
19
],
[
4,
40,
14,
2,
41,
15
],
[
2,
146,
116
],
[
3,
58,
36,
2,
59,
37
],
[
4,
36,
16,
4,
37,
17
],
[
4,
36,
12,
4,
37,
13
],
[
2,
86,
68,
2,
87,
69
],
[
4,
69,
43,
1,
70,
44
],
[
6,
43,
19,
2,
44,
20
],
[
6,
43,
15,
2,
44,
16
],
[
4,
101,
81
],
[
1,
80,
50,
4,
81,
51
],
[
4,
50,
22,
4,
51,
23
],
[
3,
36,
12,
8,
37,
13
],
[
2,
116,
92,
2,
117,
93
],
[
6,
58,
36,
2,
59,
37
],
[
4,
46,
20,
6,
47,
21
],
[
7,
42,
14,
4,
43,
15
],
[
4,
133,
107
],
[
8,
59,
37,
1,
60,
38
],
[
8,
44,
20,
4,
45,
21
],
[
12,
33,
11,
4,
34,
12
],
[
3,
145,
115,
1,
146,
116
],
[
4,
64,
40,
5,
65,
41
],
[
11,
36,
16,
5,
37,
17
],
[
11,
36,
12,
5,
37,
13
],
[
5,
109,
87,
1,
110,
88
],
[
5,
65,
41,
5,
66,
42
],
[
5,
54,
24,
7,
55,
25
],
[
11,
36,
12
],
[
5,
122,
98,
1,
123,
99
],
[
7,
73,
45,
3,
74,
46
],
[
15,
43,
19,
2,
44,
20
],
[
3,
45,
15,
13,
46,
16
],
[
1,
135,
107,
5,
136,
108
],
[
10,
74,
46,
1,
75,
47
],
[
1,
50,
22,
15,
51,
23
],
[
2,
42,
14,
17,
43,
15
],
[
5,
150,
120,
1,
151,
121
],
[
9,
69,
43,
4,
70,
44
],
[
17,
50,
22,
1,
51,
23
],
[
2,
42,
14,
19,
43,
15
],
[
3,
141,
113,
4,
142,
114
],
[
3,
70,
44,
11,
71,
45
],
[
17,
47,
21,
4,
48,
22
],
[
9,
39,
13,
16,
40,
14
],
[
3,
135,
107,
5,
136,
108
],
[
3,
67,
41,
13,
68,
42
],
[
15,
54,
24,
5,
55,
25
],
[
15,
43,
15,
10,
44,
16
],
[
4,
144,
116,
4,
145,
117
],
[
17,
68,
42
],
[
17,
50,
22,
6,
51,
23
],
[
19,
46,
16,
6,
47,
17
],
[
2,
139,
111,
7,
140,
112
],
[
17,
74,
46
],
[
7,
54,
24,
16,
55,
25
],
[
34,
37,
13
],
[
4,
151,
121,
5,
152,
122
],
[
4,
75,
47,
14,
76,
48
],
[
11,
54,
24,
14,
55,
25
],
[
16,
45,
15,
14,
46,
16
],
[
6,
147,
117,
4,
148,
118
],
[
6,
73,
45,
14,
74,
46
],
[
11,
54,
24,
16,
55,
25
],
[
30,
46,
16,
2,
47,
17
],
[
8,
132,
106,
4,
133,
107
],
[
8,
75,
47,
13,
76,
48
],
[
7,
54,
24,
22,
55,
25
],
[
22,
45,
15,
13,
46,
16
],
[
10,
142,
114,
2,
143,
115
],
[
19,
74,
46,
4,
75,
47
],
[
28,
50,
22,
6,
51,
23
],
[
33,
46,
16,
4,
47,
17
],
[
8,
152,
122,
4,
153,
123
],
[
22,
73,
45,
3,
74,
46
],
[
8,
53,
23,
26,
54,
24
],
[
12,
45,
15,
28,
46,
16
],
[
3,
147,
117,
10,
148,
118
],
[
3,
73,
45,
23,
74,
46
],
[
4,
54,
24,
31,
55,
25
],
[
11,
45,
15,
31,
46,
16
],
[
7,
146,
116,
7,
147,
117
],
[
21,
73,
45,
7,
74,
46
],
[
1,
53,
23,
37,
54,
24
],
[
19,
45,
15,
26,
46,
16
],
[
5,
145,
115,
10,
146,
116
],
[
19,
75,
47,
10,
76,
48
],
[
15,
54,
24,
25,
55,
25
],
[
23,
45,
15,
25,
46,
16
],
[
13,
145,
115,
3,
146,
116
],
[
2,
74,
46,
29,
75,
47
],
[
42,
54,
24,
1,
55,
25
],
[
23,
45,
15,
28,
46,
16
],
[
17,
145,
115
],
[
10,
74,
46,
23,
75,
47
],
[
10,
54,
24,
35,
55,
25
],
[
19,
45,
15,
35,
46,
16
],
[
17,
145,
115,
1,
146,
116
],
[
14,
74,
46,
21,
75,
47
],
[
29,
54,
24,
19,
55,
25
],
[
11,
45,
15,
46,
46,
16
],
[
13,
145,
115,
6,
146,
116
],
[
14,
74,
46,
23,
75,
47
],
[
44,
54,
24,
7,
55,
25
],
[
59,
46,
16,
1,
47,
17
],
[
12,
151,
121,
7,
152,
122
],
[
12,
75,
47,
26,
76,
48
],
[
39,
54,
24,
14,
55,
25
],
[
22,
45,
15,
41,
46,
16
],
[
6,
151,
121,
14,
152,
122
],
[
6,
75,
47,
34,
76,
48
],
[
46,
54,
24,
10,
55,
25
],
[
2,
45,
15,
64,
46,
16
],
[
17,
152,
122,
4,
153,
123
],
[
29,
74,
46,
14,
75,
47
],
[
49,
54,
24,
10,
55,
25
],
[
24,
45,
15,
46,
46,
16
],
[
4,
152,
122,
18,
153,
123
],
[
13,
74,
46,
32,
75,
47
],
[
48,
54,
24,
14,
55,
25
],
[
42,
45,
15,
32,
46,
16
],
[
20,
147,
117,
4,
148,
118
],
[
40,
75,
47,
7,
76,
48
],
[
43,
54,
24,
22,
55,
25
],
[
10,
45,
15,
67,
46,
16
],
[
19,
148,
118,
6,
149,
119
],
[
18,
75,
47,
31,
76,
48
],
[
34,
54,
24,
34,
55,
25
],
[
20,
45,
15,
61,
46,
16
]
],
h = function (b, c) {
var a = {
};
a.totalCount = b;
a.dataCount = c;
return a
},
a = {
},
b = function (a, b) {
switch (b) {
case s.L:
return g[4 * (a - 1) + 0];
case s.M:
return g[4 * (a - 1) + 1];
case s.Q:
return g[4 * (a - 1) + 2];
case s.H:
return g[4 * (a - 1) + 3]
}
};
a.getRSBlocks = function (a, c) {
var d = b(a, c);
if ('undefined' == typeof d) throw Error('bad rs block @ typeNumber:' + a + '/errorCorrectLevel:' + c);
for (var e = d.length / 3, l = [
], g = 0; g < e; g += 1) for (var r = d[3 * g + 0], t = d[3 * g + 1], m = d[3 * g + 2], k = 0; k < r; k += 1) l.push(h(t, m));
return l
};
return a
}(),
E = function () {
var g = [
],
h = 0,
a = {
getBuffer: function () {
return g
},
get: function (a) {
return 1 == (g[Math.floor(a / 8)] >>> 7 - a % 8 & 1)
},
put: function (b, f) {
for (var c = 0; c < f; c += 1) a.putBit(1 == (b >>> f - c - 1 & 1))
},
getLengthInBits: function () {
return h
},
putBit: function (a) {
var f = Math.floor(h / 8);
g.length <= f && g.push(0);
a && (g[f] |= 128 >>> h % 8);
h += 1
}
};
return a
},
F = function (g) {
var h = A.stringToBytes(g);
return {
getMode: function () {
return 4
},
getLength: function (a) {
return h.length
},
write: function (a) {
for (var b = 0; b < h.length; b += 1) a.put(h[b], 8)
}
}
},
B = function () {
var g = [
],
h = {
writeByte: function (a) {
g.push(a & 255)
},
writeShort: function (a) {
h.writeByte(a);
h.writeByte(a >>> 8)
},
writeBytes: function (a, b, f) {
b = b || 0;
f = f || a.length;
for (var c = 0; c < f; c += 1) h.writeByte(a[c + b])
},
writeString: function (a) {
for (var b = 0; b < a.length; b += 1) h.writeByte(a.charCodeAt(b))
},
toByteArray: function () {
return g
},
toString: function () {
var a;
a = '[';
for (var b = 0; b < g.length; b += 1) 0 < b && (a += ','),
a += g[b];
return a + ']'
}
};
return h
},
I = function () {
var g = 0,
h = 0,
a = 0,
b = '',
f = {
},
c = function (a) {
if (!(0 > a)) {
if (26 > a) return 65 + a;
if (52 > a) return 97 + (a - 26);
if (62 > a) return 48 + (a - 52);
if (62 == a) return 43;
if (63 == a) return 47
}
throw Error('n:' + a);
};
f.writeByte = function (d) {
g = g << 8 | d & 255;
h += 8;
for (a += 1; 6 <= h; ) b += String.fromCharCode(c(g >>> h - 6 & 63)),
h -= 6
};
f.flush = function () {
0 < h && (b += String.fromCharCode(c(g << 6 - h & 63)), h = g = 0);
if (0 != a % 3) for (var d = 3 - a % 3, e = 0; e < d; e += 1) b += '='
};
f.toString = function () {
return b
};
return f
},
H = function (g) {
var h = 0,
a = 0,
b = 0,
f = function (a) {
if (65 <= a && 90 >= a) return a - 65;
if (97 <= a && 122 >= a) return a - 97 + 26;
if (48 <= a && 57 >= a) return a - 48 + 52;
if (43 == a) return 62;
if (47 == a) return 63;
throw Error('c:' + a);
};
return {
read: function () {
for (; 8 > b; ) {
if (h >= g.length) {
if (0 == b) return - 1;
throw Error('unexpected end of file./' + b);
}
var c = g.charAt(h);
h += 1;
if ('=' == c) return b = 0,
- 1;
c.match(/^\s$/) || (a = a << 6 | f(c.charCodeAt(0)), b += 6)
}
c = a >>> b - 8 & 255;
b -= 8;
return c
}
}
},
J = function (g, h) {
var a = Array(g * h),
b = function (a) {
var b = 0,
e = 0;
return {
write: function (f, g) {
if (0 != f >>> g) throw Error('length over');
for (; 8 <= b + g; ) a.writeByte(255 & (f << b | e)),
g -= 8 - b,
f >>>= 8 - b,
b = e = 0;
e |= f << b;
b += g
},
flush: function () {
0 < b && a.writeByte(e)
}
}
},
f = function () {
var a = {
},
b = 0,
e = {
add: function (f) {
if (e.contains(f)) throw Error('dup key:' + f);
a[f] = b;
b += 1
},
size: function () {
return b
},
indexOf: function (b) {
return a[b]
},
contains: function (b) {
return 'undefined' != typeof a[b]
}
};
return e
};
return {
setPixel: function (b, d, e) {
a[d * g + b] = e
},
write: function (c) {
c.writeString('GIF87a');
c.writeShort(g);
c.writeShort(h);
c.writeByte(128);
c.writeByte(0);
c.writeByte(0);
c.writeByte(0);
c.writeByte(0);
c.writeByte(0);
c.writeByte(255);
c.writeByte(255);
c.writeByte(255);
c.writeString(',');
c.writeShort(0);
c.writeShort(0);
c.writeShort(g);
c.writeShort(h);
c.writeByte(0);
var d;
d = 3;
for (var e = f(), l = 0; 4 > l; l += 1) e.add(String.fromCharCode(l));
e.add(String.fromCharCode(4));
e.add(String.fromCharCode(5));
var l = B(),
r = b(l);
r.write(4, d);
for (var s = 0, t = String.fromCharCode(a[s]), s = s + 1; s < a.length; ) {
var m = String.fromCharCode(a[s]),
s = s + 1;
e.contains(t + m) ? t += m : (r.write(e.indexOf(t), d), 4095 > e.size() && (e.size() == 1 << d && (d += 1), e.add(t + m)), t = m)
}
r.write(e.indexOf(t), d);
r.write(5, d);
r.flush();
d = l.toByteArray();
c.writeByte(2);
for (e = 0; 255 < d.length - e; ) c.writeByte(255),
c.writeBytes(d, e, 255),
e += 255;
c.writeByte(d.length - e);
c.writeBytes(d, e, d.length - e);
c.writeByte(0);
c.writeString(';')
}
}
},
G = function (g, h, a, b) {
for (var f = J(g, h), c = 0; c < h; c += 1) for (var d = 0; d < g; d += 1) f.setPixel(d, c, a(d, c));
a = B();
f.write(a);
f = I();
a = a.toByteArray();
for (c = 0; c < a.length; c += 1) f.writeByte(a[c]);
f.flush();
a = '<img src="';
a += 'data:image/gif;base64,';
a += f;
a += '"';
a += ' width="';
a += g;
a += '"';
a += ' height="';
a += h;
a += '"';
b && (a += ' alt="', a += b, a += '"');
return a += '/>'
};
return A
}();
;
