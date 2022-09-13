import { EventEmitter, Component, ElementRef, ApplicationRef, HostBinding, ViewChild, Input, Renderer2, ContentChildren, Output, Pipe, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';

const _c0 = ["temp"];
function AgVsItemComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵprojection(0);
} }
function AgVsItemComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0, 2);
} if (rf & 2) {
    ɵngcc0.ɵɵnextContext();
    const _r0 = ɵngcc0.ɵɵreference(1);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", _r0);
} }
const _c1 = ["*"];
const _c2 = ["itemsContainer"];
function AgVirtualSrollComponent_ag_vs_item_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "ag-vs-item");
    ɵngcc0.ɵɵpipe(1, "stickedClasses");
    ɵngcc0.ɵɵelementContainer(2, 4);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵclassMap(ɵngcc0.ɵɵpipeBind1(1, 9, ctx_r1.currentStickyItem.comp.el.classList.value));
    ɵngcc0.ɵɵstyleProp("top", ctx_r1.currentScroll - (ctx_r1.currentStickyItem.diffTop ? ctx_r1.currentStickyItem.diffTop : 0), "px")("height", ctx_r1.currentStickyItem.height, "px")("min-height", ctx_r1.currentStickyItem.height, "px");
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r1.currentStickyItem.comp.temp);
} }
const _c3 = function (a0) { return { "sticked-outside": a0 }; };
class AgVsRenderEvent {
    constructor(obj) {
        Object.assign(this, obj);
    }
}

class AgVsItemComponent {
    constructor(elRef, appRef) {
        this.elRef = elRef;
        this.appRef = appRef;
        this.class = true;
        this.sticky = false;
        this.viewOk = false;
        this.onStickyChange = new EventEmitter(false);
        this.isSticked = false;
    }
    get el() { return this.elRef && this.elRef.nativeElement; }
    ngOnInit() {
    }
    ngAfterViewInit() {
    }
    ngOnChanges(changes) {
        if ('sticky' in changes)
            this.onStickyChange.next(this.sticky);
    }
    forceUpdateInputs() {
        this.viewOk = false;
        this.appRef.tick();
        this.viewOk = true;
    }
    getHtml() {
        return this.el.outerHTML;
    }
}
AgVsItemComponent.ɵfac = function AgVsItemComponent_Factory(t) { return new (t || AgVsItemComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ApplicationRef)); };
AgVsItemComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AgVsItemComponent, selectors: [["ag-vs-item"]], viewQuery: function AgVsItemComponent_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵviewQuery(_c0, true);
    } if (rf & 2) {
        let _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.temp = _t.first);
    } }, hostVars: 2, hostBindings: function AgVsItemComponent_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵclassProp("ag-vs-item", ctx.class);
    } }, inputs: { sticky: "sticky" }, features: [ɵngcc0.ɵɵNgOnChangesFeature], ngContentSelectors: _c1, decls: 3, vars: 1, consts: [["temp", ""], [3, "ngTemplateOutlet", 4, "ngIf"], [3, "ngTemplateOutlet"]], template: function AgVsItemComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵtemplate(0, AgVsItemComponent_ng_template_0_Template, 1, 0, "ng-template", null, 0, ɵngcc0.ɵɵtemplateRefExtractor);
        ɵngcc0.ɵɵtemplate(2, AgVsItemComponent_ng_container_2_Template, 1, 1, "ng-container", 1);
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngIf", !ctx.isSticked);
    } }, directives: [ɵngcc1.NgIf, ɵngcc1.NgTemplateOutlet], styles: ["[_nghost-%COMP%] {\n            display: block;\n        }\n        \n        [_nghost-%COMP%]    > ng-template[_ngcontent-%COMP%] {\n            display: inherit;\n            width: inherit;\n            height: inherit;\n        }"] });
AgVsItemComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ApplicationRef }
];
AgVsItemComponent.propDecorators = {
    class: [{ type: HostBinding, args: ['class.ag-vs-item',] }],
    temp: [{ type: ViewChild, args: ['temp', { static: false },] }],
    sticky: [{ type: Input, args: ['sticky',] }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AgVsItemComponent, [{
        type: Component,
        args: [{
                selector: 'ag-vs-item',
                template: "<ng-template #temp>\n    <ng-content></ng-content>\n</ng-template>\n\n<ng-container *ngIf=\"!isSticked\" [ngTemplateOutlet]=\"temp\"></ng-container>",
                styles: [`:host {
            display: block;
        }
        
        :host > ng-template {
            display: inherit;
            width: inherit;
            height: inherit;
        }`]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc0.ApplicationRef }]; }, { class: [{
            type: HostBinding,
            args: ['class.ag-vs-item']
        }], sticky: [{
            type: Input,
            args: ['sticky']
        }], temp: [{
            type: ViewChild,
            args: ['temp', { static: false }]
        }] }); })();

class AgVirtualSrollComponent {
    constructor(elRef, renderer) {
        this.elRef = elRef;
        this.renderer = renderer;
        this.minRowHeight = 40;
        this.height = 'auto';
        this.originalItems = [];
        this.onItemsRender = new EventEmitter();
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
    get indexCurrentSticky() { return this._indexCurrentSticky; }
    set indexCurrentSticky(value) {
        this._indexCurrentSticky = value;
        let currentIsPrev = value === this.indexPrevSticky;
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
    }
    get indexPrevSticky() { return this.indexesPrevStick.length ? this.indexesPrevStick[0] : -1; }
    set indexPrevSticky(value) {
        if (value < 0) {
            if (this.indexesPrevStick.length > 0)
                this.indexesPrevStick = this.indexesPrevStick.slice(1);
        }
        else if (!this.indexesPrevStick.some(index => index === value))
            this.indexesPrevStick.push(value);
        if (this.indexesPrevStick.length)
            this.indexesPrevStick = this.indexesPrevStick.sort((a, b) => b - a);
    }
    get itemsNoSticky() { return this.currentStickyItem ? this.items.filter((item) => this.originalItems[this.currentStickyItem.index] !== item) : this.items; }
    get vsItems() { return (this.queryVsItems && this.queryVsItems.toArray()) || []; }
    get numberItemsRendred() { return this.endIndex - this.startIndex; }
    get el() { return this.elRef && this.elRef.nativeElement; }
    get itemsContainerEl() { return this.itemsContainerElRef && this.itemsContainerElRef.nativeElement; }
    ngAfterViewInit() {
        this.queryVsItems.changes.subscribe(() => this.checkStickItem(this.scrollIsUp));
    }
    ngOnInit() {
        this.renderer.listen(this.el, 'scroll', this.onScroll.bind(this));
    }
    ngOnChanges(changes) {
        setTimeout(() => {
            if ('height' in changes) {
                this.el.style.height = this.height;
            }
            if ('minRowHeight' in changes) {
                if (typeof this.minRowHeight === 'string') {
                    if (parseInt(this.minRowHeight))
                        this.minRowHeight = parseInt(this.minRowHeight);
                    else {
                        console.warn('The [min-row-height] @Input is invalid, the value must be of type "number".');
                        this.minRowHeight = 40;
                    }
                }
            }
            if ('originalItems' in changes) {
                if (!this.originalItems)
                    this.originalItems = [];
                if (this.currentAndPrevItemsAreDiff()) {
                    this.previousItemsHeight = new Array(this.originalItems.length).fill(null);
                    if (this.el.scrollTop !== 0)
                        this.el.scrollTop = 0;
                    else {
                        this.currentScroll = 0;
                        this.prepareDataItems();
                        this.checkIsTable();
                        this.queryVsItems.notifyOnChanges();
                    }
                }
                else {
                    if (this.originalItems.length > this.prevOriginalItems.length)
                        this.previousItemsHeight = this.previousItemsHeight.concat(new Array(this.originalItems.length - this.prevOriginalItems.length).fill(null));
                    this.prepareDataItems();
                    this.checkIsTable();
                    this.queryVsItems.notifyOnChanges();
                }
                this.prevOriginalItems = this.originalItems;
            }
        });
    }
    ngAfterContentChecked() {
        let currentContainerWidth = this.itemsContainerEl && this.itemsContainerEl.clientWidth;
        if (currentContainerWidth !== this.containerWidth)
            this.containerWidth = currentContainerWidth;
        this.manipuleRenderedItems();
    }
    currentAndPrevItemsAreDiff() {
        if (this.originalItems.length >= this.prevOriginalItems.length) {
            let begin = 0;
            let end = this.prevOriginalItems.length - 1;
            for (let i = begin; i <= end; i++) {
                if (this.originalItems[i] !== this.prevOriginalItems[i])
                    return true;
            }
            return false;
        }
        return true;
    }
    onScroll() {
        let up = this.el.scrollTop < this.currentScroll;
        this.currentScroll = this.el.scrollTop;
        this.prepareDataItems();
        this.isTable = this.checkIsTable();
        this.lastScrollIsUp = this.scrollIsUp;
        this.scrollIsUp = up;
        // this.queryVsItems.notifyOnChanges();
    }
    prepareDataItems() {
        this.registerCurrentItemsHeight();
        this.prepareDataVirtualScroll();
    }
    registerCurrentItemsHeight() {
        let children = this.getInsideChildrens();
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            let realIndex = this.startIndex + i;
            this.previousItemsHeight[realIndex] = child.getBoundingClientRect().height;
        }
    }
    getDimensions() {
        let dimensions = {
            contentHeight: 0,
            paddingTop: 0,
            itemsThatAreGone: 0
        };
        dimensions.contentHeight = this.originalItems.reduce((prev, curr, i) => {
            let height = this.previousItemsHeight[i];
            return prev + (height ? height : this.minRowHeight);
        }, 0);
        if (this.currentScroll >= this.minRowHeight) {
            let newPaddingTop = 0;
            let itemsThatAreGone = 0;
            let initialScroll = this.currentScroll;
            for (let h of this.previousItemsHeight) {
                let height = h ? h : this.minRowHeight;
                if (initialScroll >= height) {
                    newPaddingTop += height;
                    initialScroll -= height;
                    itemsThatAreGone++;
                }
                else
                    break;
            }
            dimensions.paddingTop = newPaddingTop;
            dimensions.itemsThatAreGone = itemsThatAreGone;
        }
        return dimensions;
    }
    prepareDataVirtualScroll() {
        let dimensions = this.getDimensions();
        this.contentHeight = dimensions.contentHeight;
        this.paddingTop = dimensions.paddingTop;
        this.startIndex = dimensions.itemsThatAreGone;
        this.endIndex = Math.min((this.startIndex + this.numberItemsCanRender()), (this.originalItems.length - 1));
        if (this.indexCurrentSticky >= 0 && (this.startIndex > this.indexCurrentSticky || this.endIndex < this.indexCurrentSticky)) {
            if (this.currentStickyItem)
                this.currentStickyItem.outside = true;
            this.items = [...this.originalItems.slice(this.startIndex, Math.min(this.endIndex + 1, this.originalItems.length)), this.originalItems[this.indexCurrentSticky]];
        }
        else {
            if (this.currentStickyItem)
                this.currentStickyItem.outside = false;
            this.items = this.originalItems.slice(this.startIndex, Math.min(this.endIndex + 1, this.originalItems.length));
        }
        this.onItemsRender.emit(new AgVsRenderEvent({
            items: this.itemsNoSticky,
            startIndex: this.startIndex,
            endIndex: this.endIndex,
            length: this.itemsNoSticky.length
        }));
        this.manipuleRenderedItems();
    }
    numberItemsCanRender() {
        return Math.floor(this.el.clientHeight / this.minRowHeight) + 2;
    }
    manipuleRenderedItems() {
        let children = this.getInsideChildrens();
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            if (child.style.display !== 'none') {
                let realIndex = this.startIndex + i;
                child.style.minHeight = `${this.minRowHeight}px`;
                child.style.height = `${this.minRowHeight}px`;
                let className = (realIndex + 1) % 2 === 0 ? 'even' : 'odd';
                let unclassName = className == 'even' ? 'odd' : 'even';
                child.classList.add(`ag-virtual-scroll-${className}`);
                child.classList.remove(`ag-virtual-scroll-${unclassName}`);
            }
        }
    }
    getInsideChildrens() {
        let childrens = this.itemsContainerEl.children;
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
    }
    checkIsTable() {
        let childrens = this.itemsContainerEl.children;
        if (childrens.length > 0) {
            if (childrens[0].tagName.toUpperCase() === 'TABLE') {
                childrens = childrens[0].children;
                if (childrens.length > 0) {
                    if (childrens[0].tagName.toUpperCase() === 'THEAD') {
                        let thead = childrens[0];
                        thead.style.transform = `translateY(${Math.abs(this.paddingTop - this.currentScroll)}px)`;
                    }
                }
                return true;
            }
        }
        return false;
    }
    checkStickItem(up) {
        if (!this.isTable && this.vsItems.length > 0) {
            this.updateVsItems().subscribe(() => {
                if (this.indexCurrentSticky >= 0) {
                    if (!this.currentStickyItem) {
                        this.findCurrentStickyByIndex(true);
                        return;
                    }
                    if (this.indexNextSticky === -1)
                        this.indexNextSticky = this.getIndexNextSticky(up);
                    if (this.currentStickIsEnded(up)) {
                        if (!up) {
                            this.indexPrevSticky = this.indexCurrentSticky;
                            this.indexCurrentSticky = this.getIndexCurrentSticky(up);
                            this.indexNextSticky = this.getIndexNextSticky(up);
                        }
                        else {
                            if (this.indexPrevSticky >= 0) {
                                this.setPrevAsCurrentSticky();
                            }
                            else {
                                this.indexCurrentSticky = this.getIndexCurrentSticky(up);
                                if (this.indexCurrentSticky >= 0)
                                    this.indexNextSticky = this.getIndexNextSticky(up);
                                else
                                    this.indexNextSticky = null;
                            }
                        }
                    }
                }
                else {
                    this.indexCurrentSticky = this.getIndexCurrentSticky(up);
                    this.indexNextSticky = this.getIndexNextSticky(up);
                }
            });
        }
        else {
            this.indexCurrentSticky = -1;
            this.indexNextSticky = -1;
        }
    }
    findCurrentStickyByIndex(afterPrev = false) {
        let vsIndex = 0;
        let lastVsIndex = this.vsItems.length - 1;
        let diffMaxItemsRender = this.vsItems.length - this.numberItemsCanRender();
        if (diffMaxItemsRender > 0 && !this.vsItems.some((vsItem, vsIndex) => this.indexCurrentSticky === (this.startIndex + vsIndex))) {
            vsIndex = lastVsIndex;
            let vsItem = this.vsItems[lastVsIndex];
            let index = this.indexCurrentSticky;
            let offsetTop = this.previousItemsHeight.slice(0, index).reduce((prev, curr) => (prev + (curr ? curr : this.minRowHeight)), 0);
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
            for (let vsItem of this.vsItems) {
                let index = this.startIndex + vsIndex;
                if (this.indexCurrentSticky === index) {
                    let offsetTop = this.previousItemsHeight.slice(0, index).reduce((prev, curr) => (prev + (curr ? curr : this.minRowHeight)), 0);
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
        if (afterPrev && this.currentStickyItem) {
            let currentHeight = this.currentStickyItem.height;
            let offsetBottom = this.paddingTop + currentHeight + Math.abs(this.el.scrollTop - this.paddingTop);
            let offsetTopNext = this.indexNextSticky >= 0 ? this.previousItemsHeight.slice(0, this.indexNextSticky).reduce((prev, curr) => (prev + (curr ? curr : this.minRowHeight)), 0) : null;
            if (offsetTopNext !== null && offsetBottom >= offsetTopNext) {
                let newDiffTop = offsetBottom - offsetTopNext;
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
    }
    setPrevAsCurrentSticky() {
        let currentSticked = this.currentStickyItem && this.currentStickyItem.comp.sticky;
        if (currentSticked)
            this.indexNextSticky = this.indexCurrentSticky;
        this.indexCurrentSticky = this.indexPrevSticky;
        this.indexPrevSticky = -1;
    }
    getIndexCurrentSticky(up) {
        let vsIndex = 0;
        for (let vsItem of this.vsItems) {
            let index = vsIndex + this.startIndex;
            let offsetTop = this.previousItemsHeight.slice(0, index).reduce((prev, curr) => (prev + (curr ? curr : this.minRowHeight)), 0);
            if (vsItem && vsItem.sticky &&
                this.el.scrollTop >= offsetTop &&
                (this.indexCurrentSticky === -1 || index !== this.indexCurrentSticky))
                return index;
            vsIndex++;
        }
        ;
        return -1;
    }
    getIndexNextSticky(up) {
        if (this.indexCurrentSticky >= 0) {
            let vsIndex = 0;
            for (let vsItem of this.vsItems.slice(0, this.numberItemsCanRender())) {
                let index = vsIndex + this.startIndex;
                if (vsItem.sticky && index > this.indexCurrentSticky)
                    return index;
                vsIndex++;
            }
        }
        return -1;
    }
    currentStickIsEnded(up) {
        let currentHeight = this.currentStickyItem.height;
        if (!up || this.currentStickyItem.diffTop > 0) {
            let offsetBottom = this.paddingTop + currentHeight + Math.abs(this.el.scrollTop - this.paddingTop);
            let offsetTopNext = this.indexNextSticky >= 0 ? this.previousItemsHeight.slice(0, this.indexNextSticky).reduce((prev, curr) => (prev + (curr ? curr : this.minRowHeight)), 0) : null;
            if (offsetTopNext !== null && offsetBottom >= offsetTopNext) {
                let newDiffTop = offsetBottom - offsetTopNext;
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
            let offsetBottom = this.paddingTop + Math.abs(this.el.scrollTop - this.paddingTop);
            if (offsetBottom <= this.currentStickyItem.offsetTop) {
                return true;
            }
        }
        return false;
    }
    updateVsItems() {
        return new Observable((subscriber) => {
            if (this.subscripAllVsItem.length) {
                this.subscripAllVsItem.forEach((item) => item.subscrip.unsubscribe());
                this.subscripAllVsItem = [];
            }
            let interval = setInterval(() => {
                let diffMaxItemsRender = this.vsItems.length - this.numberItemsCanRender();
                let lastIndex = this.vsItems.length - 1;
                let ok = this.vsItems.every((vsItem, vsIndex) => {
                    let index = this.startIndex + vsIndex;
                    if (diffMaxItemsRender > 0 && vsIndex === lastIndex)
                        index = this.indexCurrentSticky;
                    if (!this.currentStickyItem || vsItem !== this.currentStickyItem.comp)
                        vsItem.isSticked = false;
                    if (!this.subscripAllVsItem.some(item => item.comp === vsItem))
                        this.subscripAllVsItem.push({
                            comp: vsItem,
                            subscrip: vsItem.onStickyChange.subscribe((sticky) => {
                                this.onStickyComponentChanged(vsItem, index);
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
                    this.manipuleRenderedItems();
                    subscriber.next();
                }
            });
        });
    }
    onStickyComponentChanged(vsItem, index) {
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
                this.indexesPrevStick = this.indexesPrevStick.filter(indexPrev => indexPrev !== index);
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
    }
    ngOnDestroy() {
    }
}
AgVirtualSrollComponent.ɵfac = function AgVirtualSrollComponent_Factory(t) { return new (t || AgVirtualSrollComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2)); };
AgVirtualSrollComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AgVirtualSrollComponent, selectors: [["ag-virtual-scroll"]], contentQueries: function AgVirtualSrollComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵngcc0.ɵɵcontentQuery(dirIndex, AgVsItemComponent, false);
    } if (rf & 2) {
        let _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.queryVsItems = _t);
    } }, viewQuery: function AgVirtualSrollComponent_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵstaticViewQuery(_c2, true);
    } if (rf & 2) {
        let _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.itemsContainerElRef = _t.first);
    } }, inputs: { minRowHeight: ["min-row-height", "minRowHeight"], height: "height", originalItems: ["items", "originalItems"] }, outputs: { onItemsRender: "onItemsRender" }, features: [ɵngcc0.ɵɵNgOnChangesFeature], ngContentSelectors: _c1, decls: 5, vars: 8, consts: [[1, "content-height"], [1, "items-container", 3, "ngClass"], ["itemsContainer", ""], [3, "class", "top", "height", "minHeight", 4, "ngIf"], [3, "ngTemplateOutlet"]], template: function AgVirtualSrollComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵelement(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "div", 1, 2);
        ɵngcc0.ɵɵprojection(3);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵtemplate(4, AgVirtualSrollComponent_ag_vs_item_4_Template, 3, 11, "ag-vs-item", 3);
    } if (rf & 2) {
        ɵngcc0.ɵɵstyleProp("height", ctx.contentHeight, "px");
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵstyleProp("transform", "translateY(" + ctx.paddingTop + "px)");
        ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(6, _c3, ctx.currentStickyItem == null ? null : ctx.currentStickyItem.outside));
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵproperty("ngIf", (ctx.currentStickyItem == null ? null : ctx.currentStickyItem.comp) && ctx.currentStickyItem.comp.isSticked);
    } }, directives: function () { return [ɵngcc1.NgClass, ɵngcc1.NgIf, AgVsItemComponent, ɵngcc1.NgTemplateOutlet]; }, pipes: function () { return [StickedClassesPipe]; }, styles: ["[_nghost-%COMP%] {\n            display: block;\n            position: relative;\n            height: 100%;\n            width: 100%;\n            overflow-y: auto;\n        }\n\n        [_nghost-%COMP%]   .content-height[_ngcontent-%COMP%] {\n            width: 1px;\n            opacity: 0;\n        }\n\n        [_nghost-%COMP%]   .items-container[_ngcontent-%COMP%] {\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n        }\n\n        [_nghost-%COMP%]  .items-container.sticked-outside > .ag-vs-item:last-child {\n            position: absolute;\n            top: 0;\n            left: -100%;\n        }\n\n        [_nghost-%COMP%]  > .ag-vs-item {\n            position: absolute;\n            top: 0;\n            left: 0;\n            box-shadow: 0 5px 5px rgba(0, 0, 0, .1);\n            background: #FFF;\n        }"] });
AgVirtualSrollComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
AgVirtualSrollComponent.propDecorators = {
    itemsContainerElRef: [{ type: ViewChild, args: ['itemsContainer', { static: true },] }],
    queryVsItems: [{ type: ContentChildren, args: [AgVsItemComponent,] }],
    minRowHeight: [{ type: Input, args: ['min-row-height',] }],
    height: [{ type: Input, args: ['height',] }],
    originalItems: [{ type: Input, args: ['items',] }],
    onItemsRender: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AgVirtualSrollComponent, [{
        type: Component,
        args: [{
                selector: 'ag-virtual-scroll',
                template: "<div class=\"content-height\" [style.height.px]=\"contentHeight\"></div>\n<div #itemsContainer class=\"items-container\" [style.transform]=\"'translateY(' + paddingTop + 'px)'\" [ngClass]=\"{ 'sticked-outside': currentStickyItem?.outside }\">\n    <ng-content></ng-content>\n</div>\n<ag-vs-item *ngIf=\"currentStickyItem?.comp && currentStickyItem.comp.isSticked\"\n    [class]=\"currentStickyItem.comp.el.classList.value | stickedClasses\"\n    [style.top.px]=\"currentScroll - (currentStickyItem.diffTop ? currentStickyItem.diffTop : 0)\"\n    [style.height.px]=\"currentStickyItem.height\"\n    [style.minHeight.px]=\"currentStickyItem.height\"\n>\n    <ng-container [ngTemplateOutlet]=\"currentStickyItem.comp.temp\"></ng-container>\n</ag-vs-item>",
                styles: [`
        :host {
            display: block;
            position: relative;
            height: 100%;
            width: 100%;
            overflow-y: auto;
        }

        :host .content-height {
            width: 1px;
            opacity: 0;
        }

        :host .items-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        :host::ng-deep .items-container.sticked-outside > .ag-vs-item:last-child {
            position: absolute;
            top: 0;
            left: -100%;
        }

        :host::ng-deep > .ag-vs-item {
            position: absolute;
            top: 0;
            left: 0;
            box-shadow: 0 5px 5px rgba(0, 0, 0, .1);
            background: #FFF;
        }`]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc0.Renderer2 }]; }, { minRowHeight: [{
            type: Input,
            args: ['min-row-height']
        }], height: [{
            type: Input,
            args: ['height']
        }], originalItems: [{
            type: Input,
            args: ['items']
        }], onItemsRender: [{
            type: Output
        }], itemsContainerElRef: [{
            type: ViewChild,
            args: ['itemsContainer', { static: true }]
        }], queryVsItems: [{
            type: ContentChildren,
            args: [AgVsItemComponent]
        }] }); })();
class StickyItem {
    constructor(obj) {
        this.offsetTop = 0;
        this.diffTop = 0;
        this.isUp = false;
        this.height = 0;
        this.outside = false;
        if (obj)
            Object.assign(this, obj);
    }
}

class MathAbsPipe {
    constructor() { }
    transform(value) {
        if (value)
            return Math.abs(value);
        return value;
    }
}
MathAbsPipe.ɵfac = function MathAbsPipe_Factory(t) { return new (t || MathAbsPipe)(); };
MathAbsPipe.ɵpipe = ɵngcc0.ɵɵdefinePipe({ name: "mathAbs", type: MathAbsPipe, pure: true });
MathAbsPipe.ctorParameters = () => [];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(MathAbsPipe, [{
        type: Pipe,
        args: [{
                name: 'mathAbs'
            }]
    }], function () { return []; }, null); })();

class StickedClassesPipe {
    constructor() {
        this.exceptionClasses = [
            'ag-virtual-scroll-odd',
            'ag-virtual-scroll-even',
        ];
    }
    transform(classes) {
        if (classes) {
            let splitted = classes.includes(' ') ? classes.split(' ') : [classes];
            return splitted.filter(className => !this.exceptionClasses.some(exc => exc === className)).join(' ');
        }
        return '';
    }
}
StickedClassesPipe.ɵfac = function StickedClassesPipe_Factory(t) { return new (t || StickedClassesPipe)(); };
StickedClassesPipe.ɵpipe = ɵngcc0.ɵɵdefinePipe({ name: "stickedClasses", type: StickedClassesPipe, pure: true });
StickedClassesPipe.ctorParameters = () => [];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(StickedClassesPipe, [{
        type: Pipe,
        args: [{
                name: 'stickedClasses'
            }]
    }], function () { return []; }, null); })();

class AgVirtualScrollModule {
}
AgVirtualScrollModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: AgVirtualScrollModule });
AgVirtualScrollModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function AgVirtualScrollModule_Factory(t) { return new (t || AgVirtualScrollModule)(); }, imports: [[
            CommonModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(AgVirtualScrollModule, { declarations: function () { return [AgVirtualSrollComponent, AgVsItemComponent, MathAbsPipe, StickedClassesPipe]; }, imports: function () { return [CommonModule]; }, exports: function () { return [AgVirtualSrollComponent, AgVsItemComponent]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AgVirtualScrollModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule
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
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { AgVirtualScrollModule, AgVirtualSrollComponent, AgVsItemComponent, AgVsRenderEvent, StickyItem, MathAbsPipe as ɵa, StickedClassesPipe as ɵb };

//# sourceMappingURL=ag-virtual-scroll.js.map