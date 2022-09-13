(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('ag-virtual-scroll', ['exports', '@angular/core', '@angular/common', 'rxjs'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ag-virtual-scroll'] = {}, global.ng.core, global.ng.common, global.rxjs));
}(this, (function (exports, core, common, rxjs) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var AgVsRenderEvent = /** @class */ (function () {
        function AgVsRenderEvent(obj) {
            Object.assign(this, obj);
        }
        return AgVsRenderEvent;
    }());

    var AgVsItemComponent = /** @class */ (function () {
        function AgVsItemComponent(elRef, appRef) {
            this.elRef = elRef;
            this.appRef = appRef;
            this.class = true;
            this.sticky = false;
            this.viewOk = false;
            this.onStickyChange = new core.EventEmitter(false);
            this.isSticked = false;
        }
        Object.defineProperty(AgVsItemComponent.prototype, "el", {
            get: function () { return this.elRef && this.elRef.nativeElement; },
            enumerable: false,
            configurable: true
        });
        AgVsItemComponent.prototype.ngOnInit = function () {
        };
        AgVsItemComponent.prototype.ngAfterViewInit = function () {
        };
        AgVsItemComponent.prototype.ngOnChanges = function (changes) {
            if ('sticky' in changes)
                this.onStickyChange.next(this.sticky);
        };
        AgVsItemComponent.prototype.forceUpdateInputs = function () {
            this.viewOk = false;
            this.appRef.tick();
            this.viewOk = true;
        };
        AgVsItemComponent.prototype.getHtml = function () {
            return this.el.outerHTML;
        };
        return AgVsItemComponent;
    }());
    AgVsItemComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ag-vs-item',
                    template: "<ng-template #temp>\n    <ng-content></ng-content>\n</ng-template>\n\n<ng-container *ngIf=\"!isSticked\" [ngTemplateOutlet]=\"temp\"></ng-container>",
                    styles: [":host {\n            display: block;\n        }\n        \n        :host > ng-template {\n            display: inherit;\n            width: inherit;\n            height: inherit;\n        }"]
                },] }
    ];
    AgVsItemComponent.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ApplicationRef }
    ]; };
    AgVsItemComponent.propDecorators = {
        class: [{ type: core.HostBinding, args: ['class.ag-vs-item',] }],
        temp: [{ type: core.ViewChild, args: ['temp', { static: false },] }],
        sticky: [{ type: core.Input, args: ['sticky',] }]
    };

    var AgVirtualSrollComponent = /** @class */ (function () {
        function AgVirtualSrollComponent(elRef, renderer) {
            this.elRef = elRef;
            this.renderer = renderer;
            this.minRowHeight = 40;
            this.height = 'auto';
            this.originalItems = [];
            this.onItemsRender = new core.EventEmitter();
            this.prevOriginalItems = [];
            this.items = [];
            this.subscripAllVsItem = [];
            this._indexCurrentSticky = -1;
            this.indexNextSticky = -1;
            this.indexesPrevStick = [];
            this.currentScroll = 0;
            this.contentHeight = 0;
            this.paddingTop = 0;
            this.startIndex = 0;
            this.endIndex = 0;
            this.isTable = false;
            this.scrollIsUp = false;
            this.lastScrollIsUp = false;
            this.previousItemsHeight = [];
            this.containerWidth = 0;
        }
        Object.defineProperty(AgVirtualSrollComponent.prototype, "indexCurrentSticky", {
            get: function () { return this._indexCurrentSticky; },
            set: function (value) {
                this._indexCurrentSticky = value;
                var currentIsPrev = value === this.indexPrevSticky;
                if (!currentIsPrev && value >= 0) {
                    this.findCurrentStickyByIndex();
                }
                else {
                    if (!currentIsPrev)
                        this.indexNextSticky = -1;
                    if (this.currentStickyItem)
                        this.currentStickyItem.comp.isSticked = false;
                    this.currentStickyItem = null;
                }
                this.prepareDataItems();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AgVirtualSrollComponent.prototype, "indexPrevSticky", {
            get: function () { return this.indexesPrevStick.length ? this.indexesPrevStick[0] : -1; },
            set: function (value) {
                if (value < 0) {
                    if (this.indexesPrevStick.length > 0)
                        this.indexesPrevStick = this.indexesPrevStick.slice(1);
                }
                else if (!this.indexesPrevStick.some(function (index) { return index === value; }))
                    this.indexesPrevStick.push(value);
                if (this.indexesPrevStick.length)
                    this.indexesPrevStick = this.indexesPrevStick.sort(function (a, b) { return b - a; });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AgVirtualSrollComponent.prototype, "itemsNoSticky", {
            get: function () {
                var _this = this;
                return this.currentStickyItem ? this.items.filter(function (item) { return _this.originalItems[_this.currentStickyItem.index] !== item; }) : this.items;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AgVirtualSrollComponent.prototype, "vsItems", {
            get: function () { return (this.queryVsItems && this.queryVsItems.toArray()) || []; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AgVirtualSrollComponent.prototype, "numberItemsRendred", {
            get: function () { return this.endIndex - this.startIndex; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AgVirtualSrollComponent.prototype, "el", {
            get: function () { return this.elRef && this.elRef.nativeElement; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AgVirtualSrollComponent.prototype, "itemsContainerEl", {
            get: function () { return this.itemsContainerElRef && this.itemsContainerElRef.nativeElement; },
            enumerable: false,
            configurable: true
        });
        AgVirtualSrollComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.queryVsItems.changes.subscribe(function () { return _this.checkStickItem(_this.scrollIsUp); });
        };
        AgVirtualSrollComponent.prototype.ngOnInit = function () {
            this.renderer.listen(this.el, 'scroll', this.onScroll.bind(this));
        };
        AgVirtualSrollComponent.prototype.ngOnChanges = function (changes) {
            var _this = this;
            setTimeout(function () {
                if ('height' in changes) {
                    _this.el.style.height = _this.height;
                }
                if ('minRowHeight' in changes) {
                    if (typeof _this.minRowHeight === 'string') {
                        if (parseInt(_this.minRowHeight))
                            _this.minRowHeight = parseInt(_this.minRowHeight);
                        else {
                            console.warn('The [min-row-height] @Input is invalid, the value must be of type "number".');
                            _this.minRowHeight = 40;
                        }
                    }
                }
                if ('originalItems' in changes) {
                    if (!_this.originalItems)
                        _this.originalItems = [];
                    if (_this.currentAndPrevItemsAreDiff()) {
                        _this.previousItemsHeight = new Array(_this.originalItems.length).fill(null);
                        if (_this.el.scrollTop !== 0)
                            _this.el.scrollTop = 0;
                        else {
                            _this.currentScroll = 0;
                            _this.prepareDataItems();
                            _this.checkIsTable();
                            _this.queryVsItems.notifyOnChanges();
                        }
                    }
                    else {
                        if (_this.originalItems.length > _this.prevOriginalItems.length)
                            _this.previousItemsHeight = _this.previousItemsHeight.concat(new Array(_this.originalItems.length - _this.prevOriginalItems.length).fill(null));
                        _this.prepareDataItems();
                        _this.checkIsTable();
                        _this.queryVsItems.notifyOnChanges();
                    }
                    _this.prevOriginalItems = _this.originalItems;
                }
            });
        };
        AgVirtualSrollComponent.prototype.ngAfterContentChecked = function () {
            var currentContainerWidth = this.itemsContainerEl && this.itemsContainerEl.clientWidth;
            if (currentContainerWidth !== this.containerWidth)
                this.containerWidth = currentContainerWidth;
            this.manipuleRenderedItems();
        };
        AgVirtualSrollComponent.prototype.currentAndPrevItemsAreDiff = function () {
            if (this.originalItems.length >= this.prevOriginalItems.length) {
                var begin = 0;
                var end = this.prevOriginalItems.length - 1;
                for (var i = begin; i <= end; i++) {
                    if (this.originalItems[i] !== this.prevOriginalItems[i])
                        return true;
                }
                return false;
            }
            return true;
        };
        AgVirtualSrollComponent.prototype.onScroll = function () {
            var up = this.el.scrollTop < this.currentScroll;
            this.currentScroll = this.el.scrollTop;
            this.prepareDataItems();
            this.isTable = this.checkIsTable();
            this.lastScrollIsUp = this.scrollIsUp;
            this.scrollIsUp = up;
            // this.queryVsItems.notifyOnChanges();
        };
        AgVirtualSrollComponent.prototype.prepareDataItems = function () {
            this.registerCurrentItemsHeight();
            this.prepareDataVirtualScroll();
        };
        AgVirtualSrollComponent.prototype.registerCurrentItemsHeight = function () {
            var children = this.getInsideChildrens();
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                var realIndex = this.startIndex + i;
                this.previousItemsHeight[realIndex] = child.getBoundingClientRect().height;
            }
        };
        AgVirtualSrollComponent.prototype.getDimensions = function () {
            var e_1, _b;
            var _this = this;
            var dimensions = {
                contentHeight: 0,
                paddingTop: 0,
                itemsThatAreGone: 0
            };
            dimensions.contentHeight = this.originalItems.reduce(function (prev, curr, i) {
                var height = _this.previousItemsHeight[i];
                return prev + (height ? height : _this.minRowHeight);
            }, 0);
            if (this.currentScroll >= this.minRowHeight) {
                var newPaddingTop = 0;
                var itemsThatAreGone = 0;
                var initialScroll = this.currentScroll;
                try {
                    for (var _c = __values(this.previousItemsHeight), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var h = _d.value;
                        var height = h ? h : this.minRowHeight;
                        if (initialScroll >= height) {
                            newPaddingTop += height;
                            initialScroll -= height;
                            itemsThatAreGone++;
                        }
                        else
                            break;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                dimensions.paddingTop = newPaddingTop;
                dimensions.itemsThatAreGone = itemsThatAreGone;
            }
            return dimensions;
        };
        AgVirtualSrollComponent.prototype.prepareDataVirtualScroll = function () {
            var dimensions = this.getDimensions();
            this.contentHeight = dimensions.contentHeight;
            this.paddingTop = dimensions.paddingTop;
            this.startIndex = dimensions.itemsThatAreGone;
            this.endIndex = Math.min((this.startIndex + this.numberItemsCanRender()), (this.originalItems.length - 1));
            if (this.indexCurrentSticky >= 0 && (this.startIndex > this.indexCurrentSticky || this.endIndex < this.indexCurrentSticky)) {
                if (this.currentStickyItem)
                    this.currentStickyItem.outside = true;
                this.items = __spread(this.originalItems.slice(this.startIndex, Math.min(this.endIndex + 1, this.originalItems.length)), [this.originalItems[this.indexCurrentSticky]]);
            }
            else {
                if (this.currentStickyItem)
                    this.currentStickyItem.outside = false;
                this.items = this.originalItems.slice(this.startIndex, Math.min(this.endIndex + 1, this.originalItems.length));
            }
            // console.log('this.onItemsRender ', this.onItemsRender);
            this.onItemsRender.emit(new AgVsRenderEvent({
                items: this.itemsNoSticky,
                startIndex: this.startIndex,
                endIndex: this.endIndex,
                length: this.itemsNoSticky.length
            }));
            this.manipuleRenderedItems();
        };
        AgVirtualSrollComponent.prototype.numberItemsCanRender = function () {
            console.log('this.el.clientHeight ', this.el.clientHeight);
            console.log('this.minRowHeight ', this.minRowHeight);
            return Math.floor(this.el.clientHeight / this.minRowHeight) + 2;
        };
        AgVirtualSrollComponent.prototype.manipuleRenderedItems = function () {
            var children = this.getInsideChildrens();
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (child.style.display !== 'none') {
                    var realIndex = this.startIndex + i;
                    child.style.minHeight = this.minRowHeight + "px";
                    child.style.height = this.minRowHeight + "px";
                    var className = (realIndex + 1) % 2 === 0 ? 'even' : 'odd';
                    var unclassName = className == 'even' ? 'odd' : 'even';
                    child.classList.add("ag-virtual-scroll-" + className);
                    child.classList.remove("ag-virtual-scroll-" + unclassName);
                }
            }
        };
        AgVirtualSrollComponent.prototype.getInsideChildrens = function () {
            var childrens = this.itemsContainerEl.children;
            if (childrens.length > 0) {
                if (childrens[0].tagName.toUpperCase() === 'TABLE') {
                    childrens = childrens[0].children;
                    if (childrens.length > 0) {
                        if (childrens[0].tagName.toUpperCase() === 'TBODY')
                            childrens = childrens[0].children;
                        else
                            childrens = childrens[1].children;
                    }
                }
            }
            return childrens;
        };
        AgVirtualSrollComponent.prototype.checkIsTable = function () {
            var childrens = this.itemsContainerEl.children;
            if (childrens.length > 0) {
                if (childrens[0].tagName.toUpperCase() === 'TABLE') {
                    childrens = childrens[0].children;
                    if (childrens.length > 0) {
                        if (childrens[0].tagName.toUpperCase() === 'THEAD') {
                            var thead = childrens[0];
                            thead.style.transform = "translateY(" + Math.abs(this.paddingTop - this.currentScroll) + "px)";
                        }
                    }
                    return true;
                }
            }
            return false;
        };
        AgVirtualSrollComponent.prototype.checkStickItem = function (up) {
            var _this = this;
            if (!this.isTable && this.vsItems.length > 0) {
                this.updateVsItems().subscribe(function () {
                    if (_this.indexCurrentSticky >= 0) {
                        if (!_this.currentStickyItem) {
                            _this.findCurrentStickyByIndex(true);
                            return;
                        }
                        if (_this.indexNextSticky === -1)
                            _this.indexNextSticky = _this.getIndexNextSticky(up);
                        if (_this.currentStickIsEnded(up)) {
                            if (!up) {
                                _this.indexPrevSticky = _this.indexCurrentSticky;
                                _this.indexCurrentSticky = _this.getIndexCurrentSticky(up);
                                _this.indexNextSticky = _this.getIndexNextSticky(up);
                            }
                            else {
                                if (_this.indexPrevSticky >= 0) {
                                    _this.setPrevAsCurrentSticky();
                                }
                                else {
                                    _this.indexCurrentSticky = _this.getIndexCurrentSticky(up);
                                    if (_this.indexCurrentSticky >= 0)
                                        _this.indexNextSticky = _this.getIndexNextSticky(up);
                                    else
                                        _this.indexNextSticky = null;
                                }
                            }
                        }
                    }
                    else {
                        _this.indexCurrentSticky = _this.getIndexCurrentSticky(up);
                        _this.indexNextSticky = _this.getIndexNextSticky(up);
                    }
                });
            }
            else {
                this.indexCurrentSticky = -1;
                this.indexNextSticky = -1;
            }
        };
        AgVirtualSrollComponent.prototype.findCurrentStickyByIndex = function (afterPrev) {
            var e_2, _b;
            var _this = this;
            if (afterPrev === void 0) { afterPrev = false; }
            var vsIndex = 0;
            var lastVsIndex = this.vsItems.length - 1;
            var diffMaxItemsRender = this.vsItems.length - this.numberItemsCanRender();
            if (diffMaxItemsRender > 0 && !this.vsItems.some(function (vsItem, vsIndex) { return _this.indexCurrentSticky === (_this.startIndex + vsIndex); })) {
                vsIndex = lastVsIndex;
                var vsItem = this.vsItems[lastVsIndex];
                var index = this.indexCurrentSticky;
                var offsetTop = this.previousItemsHeight.slice(0, index).reduce(function (prev, curr) { return (prev + (curr ? curr : _this.minRowHeight)); }, 0);
                vsItem.isSticked = true;
                this.currentStickyItem = new StickyItem({
                    comp: vsItem,
                    index: index,
                    vsIndex: vsIndex,
                    offsetTop: offsetTop,
                    height: vsItem.el.offsetHeight,
                    outside: true
                });
            }
            else {
                try {
                    for (var _c = __values(this.vsItems), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var vsItem = _d.value;
                        var index = this.startIndex + vsIndex;
                        if (this.indexCurrentSticky === index) {
                            var offsetTop = this.previousItemsHeight.slice(0, index).reduce(function (prev, curr) { return (prev + (curr ? curr : _this.minRowHeight)); }, 0);
                            vsItem.isSticked = true;
                            this.currentStickyItem = new StickyItem({
                                comp: vsItem,
                                index: index,
                                vsIndex: vsIndex,
                                offsetTop: offsetTop,
                                height: vsItem.el.offsetHeight
                            });
                            break;
                        }
                        vsIndex++;
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            if (afterPrev && this.currentStickyItem) {
                var currentHeight = this.currentStickyItem.height;
                var offsetBottom = this.paddingTop + currentHeight + Math.abs(this.el.scrollTop - this.paddingTop);
                var offsetTopNext = this.indexNextSticky >= 0 ? this.previousItemsHeight.slice(0, this.indexNextSticky).reduce(function (prev, curr) { return (prev + (curr ? curr : _this.minRowHeight)); }, 0) : null;
                if (offsetTopNext !== null && offsetBottom >= offsetTopNext) {
                    var newDiffTop = offsetBottom - offsetTopNext;
                    if (newDiffTop >= currentHeight) {
                        this.currentStickyItem.diffTop = currentHeight;
                        return true;
                    }
                    else
                        this.currentStickyItem.diffTop = newDiffTop;
                }
                else
                    this.currentStickyItem.diffTop = 0;
            }
        };
        AgVirtualSrollComponent.prototype.setPrevAsCurrentSticky = function () {
            var currentSticked = this.currentStickyItem && this.currentStickyItem.comp.sticky;
            if (currentSticked)
                this.indexNextSticky = this.indexCurrentSticky;
            this.indexCurrentSticky = this.indexPrevSticky;
            this.indexPrevSticky = -1;
        };
        AgVirtualSrollComponent.prototype.getIndexCurrentSticky = function (up) {
            var e_3, _b;
            var _this = this;
            var vsIndex = 0;
            try {
                for (var _c = __values(this.vsItems), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var vsItem = _d.value;
                    var index = vsIndex + this.startIndex;
                    var offsetTop = this.previousItemsHeight.slice(0, index).reduce(function (prev, curr) { return (prev + (curr ? curr : _this.minRowHeight)); }, 0);
                    if (vsItem && vsItem.sticky &&
                        this.el.scrollTop >= offsetTop &&
                        (this.indexCurrentSticky === -1 || index !== this.indexCurrentSticky))
                        return index;
                    vsIndex++;
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_3) throw e_3.error; }
            }
            ;
            return -1;
        };
        AgVirtualSrollComponent.prototype.getIndexNextSticky = function (up) {
            var e_4, _b;
            if (this.indexCurrentSticky >= 0) {
                var vsIndex = 0;
                try {
                    for (var _c = __values(this.vsItems.slice(0, this.numberItemsCanRender())), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var vsItem = _d.value;
                        var index = vsIndex + this.startIndex;
                        if (vsItem.sticky && index > this.indexCurrentSticky)
                            return index;
                        vsIndex++;
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
            return -1;
        };
        AgVirtualSrollComponent.prototype.currentStickIsEnded = function (up) {
            var _this = this;
            var currentHeight = this.currentStickyItem.height;
            if (!up || this.currentStickyItem.diffTop > 0) {
                var offsetBottom = this.paddingTop + currentHeight + Math.abs(this.el.scrollTop - this.paddingTop);
                var offsetTopNext = this.indexNextSticky >= 0 ? this.previousItemsHeight.slice(0, this.indexNextSticky).reduce(function (prev, curr) { return (prev + (curr ? curr : _this.minRowHeight)); }, 0) : null;
                if (offsetTopNext !== null && offsetBottom >= offsetTopNext) {
                    var newDiffTop = offsetBottom - offsetTopNext;
                    if (newDiffTop >= currentHeight) {
                        this.currentStickyItem.diffTop = currentHeight;
                        return true;
                    }
                    else
                        this.currentStickyItem.diffTop = newDiffTop;
                }
                else
                    this.currentStickyItem.diffTop = 0;
            }
            else {
                var offsetBottom = this.paddingTop + Math.abs(this.el.scrollTop - this.paddingTop);
                if (offsetBottom <= this.currentStickyItem.offsetTop) {
                    return true;
                }
            }
            return false;
        };
        AgVirtualSrollComponent.prototype.updateVsItems = function () {
            var _this = this;
            return new rxjs.Observable(function (subscriber) {
                if (_this.subscripAllVsItem.length) {
                    _this.subscripAllVsItem.forEach(function (item) { return item.subscrip.unsubscribe(); });
                    _this.subscripAllVsItem = [];
                }
                var interval = setInterval(function () {
                    var diffMaxItemsRender = _this.vsItems.length - _this.numberItemsCanRender();
                    var lastIndex = _this.vsItems.length - 1;
                    var ok = _this.vsItems.every(function (vsItem, vsIndex) {
                        var index = _this.startIndex + vsIndex;
                        if (diffMaxItemsRender > 0 && vsIndex === lastIndex)
                            index = _this.indexCurrentSticky;
                        if (!_this.currentStickyItem || vsItem !== _this.currentStickyItem.comp)
                            vsItem.isSticked = false;
                        if (!_this.subscripAllVsItem.some(function (item) { return item.comp === vsItem; }))
                            _this.subscripAllVsItem.push({
                                comp: vsItem,
                                subscrip: vsItem.onStickyChange.subscribe(function (sticky) {
                                    _this.onStickyComponentChanged(vsItem, index);
                                })
                            });
                        try {
                            vsItem.forceUpdateInputs();
                        }
                        catch (_a) {
                            return false;
                        }
                        return true;
                    });
                    if (ok) {
                        clearInterval(interval);
                        _this.manipuleRenderedItems();
                        subscriber.next();
                    }
                });
            });
        };
        AgVirtualSrollComponent.prototype.onStickyComponentChanged = function (vsItem, index) {
            if (index === this.indexCurrentSticky) {
                if (!vsItem.sticky) {
                    if (this.indexPrevSticky >= 0) {
                        this.setPrevAsCurrentSticky();
                    }
                    else {
                        this.indexCurrentSticky = this.getIndexCurrentSticky(false);
                        if (this.indexCurrentSticky >= 0)
                            this.indexNextSticky = this.getIndexNextSticky(false);
                        else
                            this.indexNextSticky = null;
                    }
                }
            }
            else if ((this.indexCurrentSticky !== -1 && index < this.indexCurrentSticky) || index === this.indexPrevSticky) {
                if (vsItem.sticky)
                    this.indexPrevSticky = index;
                else
                    this.indexesPrevStick = this.indexesPrevStick.filter(function (indexPrev) { return indexPrev !== index; });
            }
            else if ((this.indexCurrentSticky !== -1 && index > this.indexCurrentSticky) || index === this.indexNextSticky) {
                if (vsItem.sticky && (this.indexNextSticky === -1 || index < this.indexNextSticky))
                    this.indexNextSticky = index;
                else if (!vsItem.sticky)
                    this.indexNextSticky = -1;
            }
            else
                return;
            this.queryVsItems.notifyOnChanges();
        };
        AgVirtualSrollComponent.prototype.ngOnDestroy = function () {
        };
        return AgVirtualSrollComponent;
    }());
    AgVirtualSrollComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ag-virtual-scroll',
                    template: "<div class=\"content-height\" [style.height.px]=\"contentHeight\"></div>\n<div #itemsContainer class=\"items-container\" [style.transform]=\"'translateY(' + paddingTop + 'px)'\" [ngClass]=\"{ 'sticked-outside': currentStickyItem?.outside }\">\n    <ng-content></ng-content>\n</div>\n<ag-vs-item *ngIf=\"currentStickyItem?.comp && currentStickyItem.comp.isSticked\"\n    [class]=\"currentStickyItem.comp.el.classList.value | stickedClasses\"\n    [style.top.px]=\"currentScroll - (currentStickyItem.diffTop ? currentStickyItem.diffTop : 0)\"\n    [style.height.px]=\"currentStickyItem.height\"\n    [style.minHeight.px]=\"currentStickyItem.height\"\n>\n    <ng-container [ngTemplateOutlet]=\"currentStickyItem.comp.temp\"></ng-container>\n</ag-vs-item>",
                    styles: ["\n        :host {\n            display: block;\n            position: relative;\n            height: 100%;\n            width: 100%;\n            overflow-y: auto;\n        }\n\n        :host .content-height {\n            width: 1px;\n            opacity: 0;\n        }\n\n        :host .items-container {\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n        }\n\n        :host::ng-deep .items-container.sticked-outside > .ag-vs-item:last-child {\n            position: absolute;\n            top: 0;\n            left: -100%;\n        }\n\n        :host::ng-deep > .ag-vs-item {\n            position: absolute;\n            top: 0;\n            left: 0;\n            box-shadow: 0 5px 5px rgba(0, 0, 0, .1);\n            background: #FFF;\n        }"]
                },] }
    ];
    AgVirtualSrollComponent.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.Renderer2 }
    ]; };
    AgVirtualSrollComponent.propDecorators = {
        itemsContainerElRef: [{ type: core.ViewChild, args: ['itemsContainer', { static: true },] }],
        queryVsItems: [{ type: core.ContentChildren, args: [AgVsItemComponent,] }],
        minRowHeight: [{ type: core.Input, args: ['min-row-height',] }],
        height: [{ type: core.Input, args: ['height',] }],
        originalItems: [{ type: core.Input, args: ['items',] }],
        onItemsRender: [{ type: core.Output }]
    };
    var StickyItem = /** @class */ (function () {
        function StickyItem(obj) {
            this.offsetTop = 0;
            this.diffTop = 0;
            this.isUp = false;
            this.height = 0;
            this.outside = false;
            if (obj)
                Object.assign(this, obj);
        }
        return StickyItem;
    }());

    var MathAbsPipe = /** @class */ (function () {
        function MathAbsPipe() {
        }
        MathAbsPipe.prototype.transform = function (value) {
            if (value)
                return Math.abs(value);
            return value;
        };
        return MathAbsPipe;
    }());
    MathAbsPipe.decorators = [
        { type: core.Pipe, args: [{
                    name: 'mathAbs'
                },] }
    ];
    MathAbsPipe.ctorParameters = function () { return []; };

    var StickedClassesPipe = /** @class */ (function () {
        function StickedClassesPipe() {
            this.exceptionClasses = [
                'ag-virtual-scroll-odd',
                'ag-virtual-scroll-even',
            ];
        }
        StickedClassesPipe.prototype.transform = function (classes) {
            var _this = this;
            if (classes) {
                var splitted = classes.includes(' ') ? classes.split(' ') : [classes];
                return splitted.filter(function (className) { return !_this.exceptionClasses.some(function (exc) { return exc === className; }); }).join(' ');
            }
            return '';
        };
        return StickedClassesPipe;
    }());
    StickedClassesPipe.decorators = [
        { type: core.Pipe, args: [{
                    name: 'stickedClasses'
                },] }
    ];
    StickedClassesPipe.ctorParameters = function () { return []; };

    var AgVirtualScrollModule = /** @class */ (function () {
        function AgVirtualScrollModule() {
        }
        return AgVirtualScrollModule;
    }());
    AgVirtualScrollModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule
                    ],
                    declarations: [
                        AgVirtualSrollComponent,
                        AgVsItemComponent,
                        // Pipes
                        MathAbsPipe,
                        StickedClassesPipe
                    ],
                    exports: [
                        AgVirtualSrollComponent,
                        AgVsItemComponent
                    ],
                    entryComponents: [
                        AgVirtualSrollComponent,
                        AgVsItemComponent
                    ]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AgVirtualScrollModule = AgVirtualScrollModule;
    exports.AgVirtualSrollComponent = AgVirtualSrollComponent;
    exports.AgVsItemComponent = AgVsItemComponent;
    exports.AgVsRenderEvent = AgVsRenderEvent;
    exports.StickyItem = StickyItem;
    exports.ɵa = MathAbsPipe;
    exports.ɵb = StickedClassesPipe;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ag-virtual-scroll.umd.js.map
