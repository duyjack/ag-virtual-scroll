import { Component, Input, ElementRef, ViewChild, Renderer2, Output, EventEmitter, ContentChildren } from '@angular/core';
import { AgVsRenderEvent } from './classes/ag-vs-render-event.class';
import { AgVsItemComponent } from './ag-vs-item/ag-vs-item.component';
import { Observable } from 'rxjs';
export class AgVirtualSrollComponent {
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
        this.queryVsItems.notifyOnChanges();
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
        console.log('this.el.clientHeight ', this.el.clientHeight);
        console.log('this.minRowHeight ', this.minRowHeight);
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
AgVirtualSrollComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
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
export class StickyItem {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWctdmlydHVhbC1zY3JvbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FnLXZpcnR1YWwtc2Nyb2xsL2FnLXZpcnR1YWwtc2Nyb2xsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUEyQyxTQUFTLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBYSxlQUFlLEVBQWtDLE1BQU0sZUFBZSxDQUFDO0FBQ3ROLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsVUFBVSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQTBDaEQsTUFBTSxPQUFPLHVCQUF1QjtJQW9GaEMsWUFDWSxLQUE4QixFQUM5QixRQUFtQjtRQURuQixVQUFLLEdBQUwsS0FBSyxDQUF5QjtRQUM5QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBakZDLGlCQUFZLEdBQVcsRUFBRSxDQUFDO1FBQ2xDLFdBQU0sR0FBVyxNQUFNLENBQUM7UUFDekIsa0JBQWEsR0FBVSxFQUFFLENBQUM7UUFFL0Isa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBd0IsQ0FBQztRQUVwRSxzQkFBaUIsR0FBVSxFQUFFLENBQUM7UUFDOUIsVUFBSyxHQUFVLEVBQUUsQ0FBQztRQUVqQixzQkFBaUIsR0FBMEQsRUFBRSxDQUFDO1FBRTlFLHdCQUFtQixHQUFXLENBQUMsQ0FBQyxDQUFDO1FBb0NqQyxvQkFBZSxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBRTdCLHFCQUFnQixHQUFhLEVBQUUsQ0FBQztRQUlqQyxrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUMxQixrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUMxQixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBRXZCLGVBQVUs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U0FBQyxnQkFBZ0I7cUJBQ3RCLEtBQUssU0FBQyxRQUFROzRCQUNkLEtBQUssU0FBQyxPQUFPOzRCQUViLE1BQU07O0FBdWpCWCxNQUFNLE9BQU8sVUFBVTtJQVVuQixZQUFZLEdBQXlCO1FBUHJDLGNBQVMsR0FBVyxDQUFDLENBQUM7UUFFdEIsWUFBTyxHQUFXLENBQUMsQ0FBQztRQUNwQixTQUFJLEdBQVksS0FBSyxDQUFBO1FBQ3JCLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUdyQixJQUFJLEdBQUc7WUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN0QyxDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgUmVuZGVyZXIyLCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBRdWVyeUxpc3QsIENvbnRlbnRDaGlsZHJlbiwgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBZ1ZzUmVuZGVyRXZlbnQgfSBmcm9tICcuL2NsYXNzZXMvYWctdnMtcmVuZGVyLWV2ZW50LmNsYXNzJztcbmltcG9ydCB7IEFnVnNJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9hZy12cy1pdGVtL2FnLXZzLWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdhZy12aXJ0dWFsLXNjcm9sbCcsXG5cdHRlbXBsYXRlVXJsOiAnLi9hZy12aXJ0dWFsLXNjcm9sbC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICAgICAgfVxuXG4gICAgICAgIDpob3N0IC5jb250ZW50LWhlaWdodCB7XG4gICAgICAgICAgICB3aWR0aDogMXB4O1xuICAgICAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgfVxuXG4gICAgICAgIDpob3N0IC5pdGVtcy1jb250YWluZXIge1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICB9XG5cbiAgICAgICAgOmhvc3Q6Om5nLWRlZXAgLml0ZW1zLWNvbnRhaW5lci5zdGlja2VkLW91dHNpZGUgPiAuYWctdnMtaXRlbTpsYXN0LWNoaWxkIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICAgIGxlZnQ6IC0xMDAlO1xuICAgICAgICB9XG5cbiAgICAgICAgOmhvc3Q6Om5nLWRlZXAgPiAuYWctdnMtaXRlbSB7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICB0b3A6IDA7XG4gICAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgICAgYm94LXNoYWRvdzogMCA1cHggNXB4IHJnYmEoMCwgMCwgMCwgLjEpO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogI0ZGRjtcbiAgICAgICAgfWBcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEFnVmlydHVhbFNyb2xsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50Q2hlY2tlZCB7XG4gICAgQFZpZXdDaGlsZCgnaXRlbXNDb250YWluZXInLCB7c3RhdGljOiB0cnVlfSkgcHJpdmF0ZSBpdGVtc0NvbnRhaW5lckVsUmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oQWdWc0l0ZW1Db21wb25lbnQpIHByaXZhdGUgcXVlcnlWc0l0ZW1zOiBRdWVyeUxpc3Q8QWdWc0l0ZW1Db21wb25lbnQ+O1xuXG4gICAgQElucHV0KCdtaW4tcm93LWhlaWdodCcpIHB1YmxpYyBtaW5Sb3dIZWlnaHQ6IG51bWJlciA9IDQwO1xuICAgIEBJbnB1dCgnaGVpZ2h0JykgcHVibGljIGhlaWdodDogc3RyaW5nID0gJ2F1dG8nO1xuICAgIEBJbnB1dCgnaXRlbXMnKSBwdWJsaWMgb3JpZ2luYWxJdGVtczogYW55W10gPSBbXTtcblxuICAgIEBPdXRwdXQoKSBwcml2YXRlIG9uSXRlbXNSZW5kZXIgPSBuZXcgRXZlbnRFbWl0dGVyPEFnVnNSZW5kZXJFdmVudDxhbnk+PigpO1xuXG4gICAgcHVibGljIHByZXZPcmlnaW5hbEl0ZW1zOiBhbnlbXSA9IFtdO1xuICAgIHB1YmxpYyBpdGVtczogYW55W10gPSBbXTtcblxuICAgIHByaXZhdGUgc3Vic2NyaXBBbGxWc0l0ZW06IHsgY29tcDogQWdWc0l0ZW1Db21wb25lbnQsIHN1YnNjcmlwOiBTdWJzY3JpcHRpb24gfVtdID0gW107XG5cbiAgICBwcml2YXRlIF9pbmRleEN1cnJlbnRTdGlja3k6IG51bWJlciA9IC0xO1xuICAgIHByaXZhdGUgZ2V0IGluZGV4Q3VycmVudFN0aWNreSgpIHsgcmV0dXJuIHRoaXMuX2luZGV4Q3VycmVudFN0aWNreTsgfVxuICAgIHByaXZhdGUgc2V0IGluZGV4Q3VycmVudFN0aWNreSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2luZGV4Q3VycmVudFN0aWNreSA9IHZhbHVlO1xuXG4gICAgICAgIGxldCBjdXJyZW50SXNQcmV2ID0gdmFsdWUgPT09IHRoaXMuaW5kZXhQcmV2U3RpY2t5O1xuXG4gICAgICAgIGlmICghY3VycmVudElzUHJldiAmJiB2YWx1ZSA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmZpbmRDdXJyZW50U3RpY2t5QnlJbmRleCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFjdXJyZW50SXNQcmV2KVxuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXhOZXh0U3RpY2t5ID0gLTE7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRTdGlja3lJdGVtKVxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0aWNreUl0ZW0uY29tcC5pc1N0aWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RpY2t5SXRlbSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByZXBhcmVEYXRhSXRlbXMoKTtcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBnZXQgaW5kZXhQcmV2U3RpY2t5KCkgeyByZXR1cm4gdGhpcy5pbmRleGVzUHJldlN0aWNrLmxlbmd0aCA/IHRoaXMuaW5kZXhlc1ByZXZTdGlja1swXSA6IC0xOyB9XG4gICAgcHJpdmF0ZSBzZXQgaW5kZXhQcmV2U3RpY2t5KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHZhbHVlIDwgMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXhlc1ByZXZTdGljay5sZW5ndGggPiAwKVxuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXhlc1ByZXZTdGljayA9IHRoaXMuaW5kZXhlc1ByZXZTdGljay5zbGljZSgxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghdGhpcy5pbmRleGVzUHJldlN0aWNrLnNvbWUoaW5kZXggPT4gaW5kZXggPT09IHZhbHVlKSlcbiAgICAgICAgICAgIHRoaXMuaW5kZXhlc1ByZXZTdGljay5wdXNoKHZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5pbmRleGVzUHJldlN0aWNrLmxlbmd0aClcbiAgICAgICAgICAgIHRoaXMuaW5kZXhlc1ByZXZTdGljayA9IHRoaXMuaW5kZXhlc1ByZXZTdGljay5zb3J0KChhLGIpID0+IGItYSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbmRleE5leHRTdGlja3k6IG51bWJlciA9IC0xO1xuXG4gICAgcHJpdmF0ZSBpbmRleGVzUHJldlN0aWNrOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgcHVibGljIGN1cnJlbnRTdGlja3lJdGVtOiBTdGlja3lJdGVtO1xuXG4gICAgcHVibGljIGN1cnJlbnRTY3JvbGw6IG51bWJlciA9IDA7XG4gICAgcHVibGljIGNvbnRlbnRIZWlnaHQ6IG51bWJlciA9IDA7XG4gICAgcHVibGljIHBhZGRpbmdUb3A6IG51bWJlciA9IDA7XG5cbiAgICBwdWJsaWMgc3RhcnRJbmRleDogbnVtYmVyID0gMDtcbiAgICBwdWJsaWMgZW5kSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBwcml2YXRlIGlzVGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgc2Nyb2xsSXNVcDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgbGFzdFNjcm9sbElzVXA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBcbiAgICBwcml2YXRlIHByZXZpb3VzSXRlbXNIZWlnaHQ6IG51bWJlcltdID0gW107XG5cbiAgICBwdWJsaWMgY29udGFpbmVyV2lkdGg6IG51bWJlciA9IDA7XG5cbiAgICBwcml2YXRlIGdldCBpdGVtc05vU3RpY2t5KCkgeyByZXR1cm4gdGhpcy5jdXJyZW50U3RpY2t5SXRlbSA/IHRoaXMuaXRlbXMuZmlsdGVyKChpdGVtKSA9PiB0aGlzLm9yaWdpbmFsSXRlbXNbdGhpcy5jdXJyZW50U3RpY2t5SXRlbS5pbmRleF0gIT09IGl0ZW0pIDogdGhpcy5pdGVtczsgfVxuXG4gICAgcHVibGljIGdldCB2c0l0ZW1zKCkgeyByZXR1cm4gKHRoaXMucXVlcnlWc0l0ZW1zICYmIHRoaXMucXVlcnlWc0l0ZW1zLnRvQXJyYXkoKSkgfHwgW107IH1cblxuICAgIHB1YmxpYyBnZXQgbnVtYmVySXRlbXNSZW5kcmVkKCk6IG51bWJlciB7IHJldHVybiB0aGlzLmVuZEluZGV4IC0gdGhpcy5zdGFydEluZGV4OyB9XG4gICAgXG4gICAgcHVibGljIGdldCBlbCgpIHsgcmV0dXJuIHRoaXMuZWxSZWYgJiYgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50OyB9XG5cbiAgICBwdWJsaWMgZ2V0IGl0ZW1zQ29udGFpbmVyRWwoKSB7IHJldHVybiB0aGlzLml0ZW1zQ29udGFpbmVyRWxSZWYgJiYgdGhpcy5pdGVtc0NvbnRhaW5lckVsUmVmLm5hdGl2ZUVsZW1lbnQ7IH1cbiAgICBcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuXHQpIHtcblx0fVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLnF1ZXJ5VnNJdGVtcy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNoZWNrU3RpY2tJdGVtKHRoaXMuc2Nyb2xsSXNVcCkpO1xuXHR9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbCwgJ3Njcm9sbCcsIHRoaXMub25TY3JvbGwuYmluZCh0aGlzKSk7XG5cdH1cblx0XG5cdG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICgnaGVpZ2h0JyBpbiBjaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5oZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCdtaW5Sb3dIZWlnaHQnIGluIGNoYW5nZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMubWluUm93SGVpZ2h0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQodGhpcy5taW5Sb3dIZWlnaHQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5Sb3dIZWlnaHQgPSBwYXJzZUludCh0aGlzLm1pblJvd0hlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdUaGUgW21pbi1yb3ctaGVpZ2h0XSBASW5wdXQgaXMgaW52YWxpZCwgdGhlIHZhbHVlIG11c3QgYmUgb2YgdHlwZSBcIm51bWJlclwiLicpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1pblJvd0hlaWdodCA9IDQwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cdFx0XHRpZiAoJ29yaWdpbmFsSXRlbXMnIGluIGNoYW5nZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3JpZ2luYWxJdGVtcylcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcmlnaW5hbEl0ZW1zID0gW107XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50QW5kUHJldkl0ZW1zQXJlRGlmZigpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNJdGVtc0hlaWdodCA9IG5ldyBBcnJheSh0aGlzLm9yaWdpbmFsSXRlbXMubGVuZ3RoKS5maWxsKG51bGwpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbC5zY3JvbGxUb3AgIT09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsLnNjcm9sbFRvcCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2Nyb2xsID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZURhdGFJdGVtcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0lzVGFibGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucXVlcnlWc0l0ZW1zLm5vdGlmeU9uQ2hhbmdlcygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcmlnaW5hbEl0ZW1zLmxlbmd0aCA+IHRoaXMucHJldk9yaWdpbmFsSXRlbXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c0l0ZW1zSGVpZ2h0ID0gdGhpcy5wcmV2aW91c0l0ZW1zSGVpZ2h0LmNvbmNhdChuZXcgQXJyYXkodGhpcy5vcmlnaW5hbEl0ZW1zLmxlbmd0aCAtIHRoaXMucHJldk9yaWdpbmFsSXRlbXMubGVuZ3RoKS5maWxsKG51bGwpKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlRGF0YUl0ZW1zKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tJc1RhYmxlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucXVlcnlWc0l0ZW1zLm5vdGlmeU9uQ2hhbmdlcygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucHJldk9yaWdpbmFsSXRlbXMgPSB0aGlzLm9yaWdpbmFsSXRlbXM7XG5cdFx0XHR9XG5cdFx0fSk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgICAgICBsZXQgY3VycmVudENvbnRhaW5lcldpZHRoID0gdGhpcy5pdGVtc0NvbnRhaW5lckVsICYmIHRoaXMuaXRlbXNDb250YWluZXJFbC5jbGllbnRXaWR0aDtcbiAgICAgICAgaWYgKGN1cnJlbnRDb250YWluZXJXaWR0aCAhPT0gdGhpcy5jb250YWluZXJXaWR0aClcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyV2lkdGggPSBjdXJyZW50Q29udGFpbmVyV2lkdGg7XG4gICAgICAgIFxuICAgICAgICB0aGlzLm1hbmlwdWxlUmVuZGVyZWRJdGVtcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3VycmVudEFuZFByZXZJdGVtc0FyZURpZmYoKSB7XG4gICAgICAgIGlmICh0aGlzLm9yaWdpbmFsSXRlbXMubGVuZ3RoID49IHRoaXMucHJldk9yaWdpbmFsSXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgYmVnaW4gPSAwO1xuICAgICAgICAgICAgbGV0IGVuZCA9IHRoaXMucHJldk9yaWdpbmFsSXRlbXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBiZWdpbjsgaSA8PSBlbmQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9yaWdpbmFsSXRlbXNbaV0gIT09IHRoaXMucHJldk9yaWdpbmFsSXRlbXNbaV0pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cblx0cHJpdmF0ZSBvblNjcm9sbCgpIHtcbiAgICAgICAgbGV0IHVwID0gdGhpcy5lbC5zY3JvbGxUb3AgPCB0aGlzLmN1cnJlbnRTY3JvbGw7XG4gICAgICAgIHRoaXMuY3VycmVudFNjcm9sbCA9IHRoaXMuZWwuc2Nyb2xsVG9wO1xuXG4gICAgICAgIHRoaXMucHJlcGFyZURhdGFJdGVtcygpO1xuICAgICAgICB0aGlzLmlzVGFibGUgPSB0aGlzLmNoZWNrSXNUYWJsZSgpO1xuICAgICAgICB0aGlzLmxhc3RTY3JvbGxJc1VwID0gdGhpcy5zY3JvbGxJc1VwO1xuICAgICAgICB0aGlzLnNjcm9sbElzVXAgPSB1cDtcbiAgICAgICAgdGhpcy5xdWVyeVZzSXRlbXMubm90aWZ5T25DaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcmVwYXJlRGF0YUl0ZW1zKCkge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyQ3VycmVudEl0ZW1zSGVpZ2h0KCk7XG4gICAgICAgIHRoaXMucHJlcGFyZURhdGFWaXJ0dWFsU2Nyb2xsKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWdpc3RlckN1cnJlbnRJdGVtc0hlaWdodCgpIHtcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5nZXRJbnNpZGVDaGlsZHJlbnMoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICAgICAgICBsZXQgcmVhbEluZGV4ID0gdGhpcy5zdGFydEluZGV4ICsgaTtcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNJdGVtc0hlaWdodFtyZWFsSW5kZXhdID0gY2hpbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREaW1lbnNpb25zKCkge1xuICAgICAgICBcbiAgICAgICAgbGV0IGRpbWVuc2lvbnMgPSB7XG4gICAgICAgICAgICBjb250ZW50SGVpZ2h0OiAwLFxuICAgICAgICAgICAgcGFkZGluZ1RvcDogMCxcbiAgICAgICAgICAgIGl0ZW1zVGhhdEFyZUdvbmU6IDBcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIGRpbWVuc2lvbnMuY29udGVudEhlaWdodCA9IHRoaXMub3JpZ2luYWxJdGVtcy5yZWR1Y2UoKHByZXYsIGN1cnIsIGkpID0+IHtcblx0XHRcdGxldCBoZWlnaHQgPSB0aGlzLnByZXZpb3VzSXRlbXNIZWlnaHRbaV07XG5cdFx0XHRyZXR1cm4gcHJldiArIChoZWlnaHQgPyBoZWlnaHQgOiB0aGlzLm1pblJvd0hlaWdodCk7XG4gICAgICAgIH0sIDApO1xuXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTY3JvbGwgPj0gdGhpcy5taW5Sb3dIZWlnaHQpIHtcbiAgICAgICAgICAgIGxldCBuZXdQYWRkaW5nVG9wID0gMDtcbiAgICAgICAgICAgIGxldCBpdGVtc1RoYXRBcmVHb25lID0gMDtcbiAgICAgICAgICAgIGxldCBpbml0aWFsU2Nyb2xsID0gdGhpcy5jdXJyZW50U2Nyb2xsO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBoIG9mIHRoaXMucHJldmlvdXNJdGVtc0hlaWdodCkge1xuICAgICAgICAgICAgICAgIGxldCBoZWlnaHQgPSBoID8gaCA6IHRoaXMubWluUm93SGVpZ2h0O1xuICAgICAgICAgICAgICAgIGlmIChpbml0aWFsU2Nyb2xsID49IGhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdQYWRkaW5nVG9wICs9IGhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFNjcm9sbCAtPSBoZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zVGhhdEFyZUdvbmUrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZGltZW5zaW9ucy5wYWRkaW5nVG9wID0gbmV3UGFkZGluZ1RvcDtcbiAgICAgICAgICAgIGRpbWVuc2lvbnMuaXRlbXNUaGF0QXJlR29uZSA9IGl0ZW1zVGhhdEFyZUdvbmU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGltZW5zaW9ucztcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBwcmVwYXJlRGF0YVZpcnR1YWxTY3JvbGwoKSB7XG4gICAgICAgIGxldCBkaW1lbnNpb25zID0gdGhpcy5nZXREaW1lbnNpb25zKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbnRlbnRIZWlnaHQgPSBkaW1lbnNpb25zLmNvbnRlbnRIZWlnaHQ7XG4gICAgICAgIHRoaXMucGFkZGluZ1RvcCA9IGRpbWVuc2lvbnMucGFkZGluZ1RvcDtcbiAgICAgICAgdGhpcy5zdGFydEluZGV4ID0gZGltZW5zaW9ucy5pdGVtc1RoYXRBcmVHb25lO1xuICAgICAgICB0aGlzLmVuZEluZGV4ID0gTWF0aC5taW4oKHRoaXMuc3RhcnRJbmRleCArIHRoaXMubnVtYmVySXRlbXNDYW5SZW5kZXIoKSksICh0aGlzLm9yaWdpbmFsSXRlbXMubGVuZ3RoIC0gMSkpO1xuXG4gICAgICAgIGlmICh0aGlzLmluZGV4Q3VycmVudFN0aWNreSA+PSAwICYmICh0aGlzLnN0YXJ0SW5kZXggPiB0aGlzLmluZGV4Q3VycmVudFN0aWNreSB8fCB0aGlzLmVuZEluZGV4IDwgdGhpcy5pbmRleEN1cnJlbnRTdGlja3kpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50U3RpY2t5SXRlbSlcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGlja3lJdGVtLm91dHNpZGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5pdGVtcyA9IFsgLi4udGhpcy5vcmlnaW5hbEl0ZW1zLnNsaWNlKHRoaXMuc3RhcnRJbmRleCwgTWF0aC5taW4odGhpcy5lbmRJbmRleCArIDEsIHRoaXMub3JpZ2luYWxJdGVtcy5sZW5ndGgpKSwgdGhpcy5vcmlnaW5hbEl0ZW1zW3RoaXMuaW5kZXhDdXJyZW50U3RpY2t5XSBdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFN0aWNreUl0ZW0pXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RpY2t5SXRlbS5vdXRzaWRlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5vcmlnaW5hbEl0ZW1zLnNsaWNlKHRoaXMuc3RhcnRJbmRleCwgTWF0aC5taW4odGhpcy5lbmRJbmRleCArIDEsIHRoaXMub3JpZ2luYWxJdGVtcy5sZW5ndGgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25JdGVtc1JlbmRlci5lbWl0KG5ldyBBZ1ZzUmVuZGVyRXZlbnQ8YW55Pih7XG4gICAgICAgICAgICBpdGVtczogdGhpcy5pdGVtc05vU3RpY2t5LFxuICAgICAgICAgICAgc3RhcnRJbmRleDogdGhpcy5zdGFydEluZGV4LFxuICAgICAgICAgICAgZW5kSW5kZXg6IHRoaXMuZW5kSW5kZXgsXG4gICAgICAgICAgICBsZW5ndGg6IHRoaXMuaXRlbXNOb1N0aWNreS5sZW5ndGhcbiAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICB0aGlzLm1hbmlwdWxlUmVuZGVyZWRJdGVtcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbnVtYmVySXRlbXNDYW5SZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuZWwuY2xpZW50SGVpZ2h0IC8gdGhpcy5taW5Sb3dIZWlnaHQpICsgMjtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1hbmlwdWxlUmVuZGVyZWRJdGVtcygpIHtcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5nZXRJbnNpZGVDaGlsZHJlbnMoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGNoaWxkID0gY2hpbGRyZW5baV0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAoY2hpbGQuc3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlYWxJbmRleCA9IHRoaXMuc3RhcnRJbmRleCArIGk7XG4gICAgICAgICAgICAgICAgY2hpbGQuc3R5bGUubWluSGVpZ2h0ID0gYCR7dGhpcy5taW5Sb3dIZWlnaHR9cHhgO1xuICAgICAgICAgICAgICAgIGNoaWxkLnN0eWxlLmhlaWdodCA9IGAke3RoaXMubWluUm93SGVpZ2h0fXB4YDtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgY2xhc3NOYW1lID0gKHJlYWxJbmRleCArIDEpICUgMiA9PT0gMCA/ICdldmVuJyA6ICdvZGQnO1xuICAgICAgICAgICAgICAgIGxldCB1bmNsYXNzTmFtZSA9IGNsYXNzTmFtZSA9PSAnZXZlbicgPyAnb2RkJyA6ICdldmVuJztcblxuICAgICAgICAgICAgICAgIGNoaWxkLmNsYXNzTGlzdC5hZGQoYGFnLXZpcnR1YWwtc2Nyb2xsLSR7Y2xhc3NOYW1lfWApO1xuICAgICAgICAgICAgICAgIGNoaWxkLmNsYXNzTGlzdC5yZW1vdmUoYGFnLXZpcnR1YWwtc2Nyb2xsLSR7dW5jbGFzc05hbWV9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEluc2lkZUNoaWxkcmVucygpOiBIVE1MQ29sbGVjdGlvbiB7XG4gICAgICAgIGxldCBjaGlsZHJlbnMgPSB0aGlzLml0ZW1zQ29udGFpbmVyRWwuY2hpbGRyZW47XG4gICAgICAgIGlmIChjaGlsZHJlbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKGNoaWxkcmVuc1swXS50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdUQUJMRScpIHtcbiAgICAgICAgICAgICAgICBjaGlsZHJlbnMgPSBjaGlsZHJlbnNbMF0uY2hpbGRyZW47XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkcmVucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZHJlbnNbMF0udGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnVEJPRFknKVxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW5zID0gY2hpbGRyZW5zWzBdLmNoaWxkcmVuO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbnMgPSBjaGlsZHJlbnNbMV0uY2hpbGRyZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNoaWxkcmVucztcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrSXNUYWJsZSgpIHtcbiAgICAgICAgbGV0IGNoaWxkcmVucyA9IHRoaXMuaXRlbXNDb250YWluZXJFbC5jaGlsZHJlbjtcbiAgICAgICAgaWYgKGNoaWxkcmVucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAoY2hpbGRyZW5zWzBdLnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ1RBQkxFJykge1xuICAgICAgICAgICAgICAgIGNoaWxkcmVucyA9IGNoaWxkcmVuc1swXS5jaGlsZHJlbjtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW5zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkcmVuc1swXS50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdUSEVBRCcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRoZWFkID0gY2hpbGRyZW5zWzBdIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhlYWQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoJHtNYXRoLmFicyh0aGlzLnBhZGRpbmdUb3AgLSB0aGlzLmN1cnJlbnRTY3JvbGwpfXB4KWA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hlY2tTdGlja0l0ZW0odXA6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzVGFibGUgJiYgdGhpcy52c0l0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVnNJdGVtcygpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXhDdXJyZW50U3RpY2t5ID49IDApIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY3VycmVudFN0aWNreUl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZEN1cnJlbnRTdGlja3lCeUluZGV4KHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXhOZXh0U3RpY2t5ID09PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXhOZXh0U3RpY2t5ID0gdGhpcy5nZXRJbmRleE5leHRTdGlja3kodXApO1xuICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50U3RpY2tJc0VuZGVkKHVwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF1cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXhQcmV2U3RpY2t5ID0gdGhpcy5pbmRleEN1cnJlbnRTdGlja3k7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleEN1cnJlbnRTdGlja3kgPSB0aGlzLmdldEluZGV4Q3VycmVudFN0aWNreSh1cCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleE5leHRTdGlja3kgPSB0aGlzLmdldEluZGV4TmV4dFN0aWNreSh1cCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pbmRleFByZXZTdGlja3kgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFByZXZBc0N1cnJlbnRTdGlja3koKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXhDdXJyZW50U3RpY2t5ID0gdGhpcy5nZXRJbmRleEN1cnJlbnRTdGlja3kodXApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmluZGV4Q3VycmVudFN0aWNreSA+PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleE5leHRTdGlja3kgPSB0aGlzLmdldEluZGV4TmV4dFN0aWNreSh1cCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXhOZXh0U3RpY2t5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ICBcbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleEN1cnJlbnRTdGlja3kgPSB0aGlzLmdldEluZGV4Q3VycmVudFN0aWNreSh1cCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXhOZXh0U3RpY2t5ID0gdGhpcy5nZXRJbmRleE5leHRTdGlja3kodXApO1xuICAgICAgICAgICAgICAgIH0gICAgICAgIFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmluZGV4Q3VycmVudFN0aWNreSA9IC0xO1xuICAgICAgICAgICAgdGhpcy5pbmRleE5leHRTdGlja3kgPSAtMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZmluZEN1cnJlbnRTdGlja3lCeUluZGV4KGFmdGVyUHJldjogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGxldCB2c0luZGV4ID0gMDtcbiAgICAgICAgbGV0IGxhc3RWc0luZGV4ID0gdGhpcy52c0l0ZW1zLmxlbmd0aCAtIDE7XG4gICAgICAgIGxldCBkaWZmTWF4SXRlbXNSZW5kZXIgPSB0aGlzLnZzSXRlbXMubGVuZ3RoIC0gdGhpcy5udW1iZXJJdGVtc0NhblJlbmRlcigpO1xuXG4gICAgICAgIGlmIChkaWZmTWF4SXRlbXNSZW5kZXIgPiAwICYmICF0aGlzLnZzSXRlbXMuc29tZSgodnNJdGVtLCB2c0luZGV4KSA9PiB0aGlzLmluZGV4Q3VycmVudFN0aWNreSA9PT0gKHRoaXMuc3RhcnRJbmRleCArIHZzSW5kZXgpKSkge1xuICAgICAgICAgICAgdnNJbmRleCA9IGxhc3RWc0luZGV4O1xuICAgICAgICAgICAgbGV0IHZzSXRlbSA9IHRoaXMudnNJdGVtc1tsYXN0VnNJbmRleF07XG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmluZGV4Q3VycmVudFN0aWNreTtcbiAgICAgICAgICAgIGxldCBvZmZzZXRUb3AgPSB0aGlzLnByZXZpb3VzSXRlbXNIZWlnaHQuc2xpY2UoMCwgaW5kZXgpLnJlZHVjZSgocHJldiwgY3VycikgPT4gKHByZXYgKyAoY3VyciA/IGN1cnIgOiB0aGlzLm1pblJvd0hlaWdodCkpLCAwKTtcbiAgICAgICAgICAgIHZzSXRlbS5pc1N0aWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RpY2t5SXRlbSA9IG5ldyBTdGlja3lJdGVtKHtcbiAgICAgICAgICAgICAgICBjb21wOiB2c0l0ZW0sXG4gICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgICAgIHZzSW5kZXg6IHZzSW5kZXgsXG4gICAgICAgICAgICAgICAgb2Zmc2V0VG9wOiBvZmZzZXRUb3AsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB2c0l0ZW0uZWwub2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgICAgICAgIG91dHNpZGU6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yKGxldCB2c0l0ZW0gb2YgdGhpcy52c0l0ZW1zKSB7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5zdGFydEluZGV4ICsgdnNJbmRleDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmluZGV4Q3VycmVudFN0aWNreSA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9mZnNldFRvcCA9IHRoaXMucHJldmlvdXNJdGVtc0hlaWdodC5zbGljZSgwLCBpbmRleCkucmVkdWNlKChwcmV2LCBjdXJyKSA9PiAocHJldiArIChjdXJyID8gY3VyciA6IHRoaXMubWluUm93SGVpZ2h0KSksIDApO1xuICAgICAgICAgICAgICAgICAgICB2c0l0ZW0uaXNTdGlja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RpY2t5SXRlbSA9IG5ldyBTdGlja3lJdGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXA6IHZzSXRlbSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZzSW5kZXg6IHZzSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXRUb3A6IG9mZnNldFRvcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogdnNJdGVtLmVsLm9mZnNldEhlaWdodFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZzSW5kZXgrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhZnRlclByZXYgJiYgdGhpcy5jdXJyZW50U3RpY2t5SXRlbSkge1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRIZWlnaHQgPSB0aGlzLmN1cnJlbnRTdGlja3lJdGVtLmhlaWdodDtcbiAgICAgICAgICAgIGxldCBvZmZzZXRCb3R0b20gPSB0aGlzLnBhZGRpbmdUb3AgKyBjdXJyZW50SGVpZ2h0ICsgTWF0aC5hYnModGhpcy5lbC5zY3JvbGxUb3AgLSB0aGlzLnBhZGRpbmdUb3ApO1xuICAgICAgICAgICAgbGV0IG9mZnNldFRvcE5leHQgPSB0aGlzLmluZGV4TmV4dFN0aWNreSA+PSAwID8gdGhpcy5wcmV2aW91c0l0ZW1zSGVpZ2h0LnNsaWNlKDAsIHRoaXMuaW5kZXhOZXh0U3RpY2t5KS5yZWR1Y2UoKHByZXYsIGN1cnIpID0+IChwcmV2ICsgKGN1cnIgPyBjdXJyIDogdGhpcy5taW5Sb3dIZWlnaHQpKSwgMCkgOiBudWxsO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAob2Zmc2V0VG9wTmV4dCAhPT0gbnVsbCAmJiBvZmZzZXRCb3R0b20gPj0gb2Zmc2V0VG9wTmV4dCkge1xuICAgICAgICAgICAgICAgIGxldCBuZXdEaWZmVG9wID0gb2Zmc2V0Qm90dG9tIC0gb2Zmc2V0VG9wTmV4dDtcbiAgICAgICAgICAgICAgICBpZiAobmV3RGlmZlRvcCA+PSBjdXJyZW50SGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0aWNreUl0ZW0uZGlmZlRvcCA9IGN1cnJlbnRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0aWNreUl0ZW0uZGlmZlRvcCA9IG5ld0RpZmZUb3A7XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0aWNreUl0ZW0uZGlmZlRvcCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFByZXZBc0N1cnJlbnRTdGlja3koKSB7XG4gICAgICAgIGxldCBjdXJyZW50U3RpY2tlZCA9IHRoaXMuY3VycmVudFN0aWNreUl0ZW0gJiYgdGhpcy5jdXJyZW50U3RpY2t5SXRlbS5jb21wLnN0aWNreTtcblxuICAgICAgICBpZiAoY3VycmVudFN0aWNrZWQpIFxuICAgICAgICAgICAgdGhpcy5pbmRleE5leHRTdGlja3kgPSB0aGlzLmluZGV4Q3VycmVudFN0aWNreTtcblxuICAgICAgICB0aGlzLmluZGV4Q3VycmVudFN0aWNreSA9IHRoaXMuaW5kZXhQcmV2U3RpY2t5O1xuICAgICAgICB0aGlzLmluZGV4UHJldlN0aWNreSA9IC0xO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SW5kZXhDdXJyZW50U3RpY2t5KHVwOiBib29sZWFuKSB7XG4gICAgICAgIGxldCB2c0luZGV4ID0gMDtcbiAgICAgICAgZm9yIChsZXQgdnNJdGVtIG9mIHRoaXMudnNJdGVtcykge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gdnNJbmRleCArIHRoaXMuc3RhcnRJbmRleDtcblxuICAgICAgICAgICAgbGV0IG9mZnNldFRvcCA9IHRoaXMucHJldmlvdXNJdGVtc0hlaWdodC5zbGljZSgwLCBpbmRleCkucmVkdWNlKChwcmV2LCBjdXJyKSA9PiAocHJldiArIChjdXJyID8gY3VyciA6IHRoaXMubWluUm93SGVpZ2h0KSksIDApO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodnNJdGVtICYmIHZzSXRlbS5zdGlja3kgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmVsLnNjcm9sbFRvcCA+PSBvZmZzZXRUb3AgJiZcbiAgICAgICAgICAgICAgICAodGhpcy5pbmRleEN1cnJlbnRTdGlja3kgPT09IC0xIHx8IGluZGV4ICE9PSB0aGlzLmluZGV4Q3VycmVudFN0aWNreSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXg7XG5cbiAgICAgICAgICAgIHZzSW5kZXgrKztcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEluZGV4TmV4dFN0aWNreSh1cDogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5pbmRleEN1cnJlbnRTdGlja3kgPj0gMCkge1xuICAgICAgICAgICAgbGV0IHZzSW5kZXggPSAwO1xuXG4gICAgICAgICAgICBmb3IgKGxldCB2c0l0ZW0gb2YgdGhpcy52c0l0ZW1zLnNsaWNlKDAsIHRoaXMubnVtYmVySXRlbXNDYW5SZW5kZXIoKSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB2c0luZGV4ICsgdGhpcy5zdGFydEluZGV4O1xuXG4gICAgICAgICAgICAgICAgaWYgKHZzSXRlbS5zdGlja3kgJiYgaW5kZXggPiB0aGlzLmluZGV4Q3VycmVudFN0aWNreSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xuXG4gICAgICAgICAgICAgICAgdnNJbmRleCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3VycmVudFN0aWNrSXNFbmRlZCh1cDogYm9vbGVhbikge1xuICAgICAgICBsZXQgY3VycmVudEhlaWdodCA9IHRoaXMuY3VycmVudFN0aWNreUl0ZW0uaGVpZ2h0O1xuICAgICAgICBcbiAgICAgICAgaWYgKCF1cCB8fCB0aGlzLmN1cnJlbnRTdGlja3lJdGVtLmRpZmZUb3AgPiAwKSB7XG4gICAgICAgICAgICBsZXQgb2Zmc2V0Qm90dG9tID0gdGhpcy5wYWRkaW5nVG9wICsgY3VycmVudEhlaWdodCArIE1hdGguYWJzKHRoaXMuZWwuc2Nyb2xsVG9wIC0gdGhpcy5wYWRkaW5nVG9wKTtcbiAgICAgICAgICAgIGxldCBvZmZzZXRUb3BOZXh0ID0gdGhpcy5pbmRleE5leHRTdGlja3kgPj0gMCA/IHRoaXMucHJldmlvdXNJdGVtc0hlaWdodC5zbGljZSgwLCB0aGlzLmluZGV4TmV4dFN0aWNreSkucmVkdWNlKChwcmV2LCBjdXJyKSA9PiAocHJldiArIChjdXJyID8gY3VyciA6IHRoaXMubWluUm93SGVpZ2h0KSksIDApIDogbnVsbDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKG9mZnNldFRvcE5leHQgIT09IG51bGwgJiYgb2Zmc2V0Qm90dG9tID49IG9mZnNldFRvcE5leHQpIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3RGlmZlRvcCA9IG9mZnNldEJvdHRvbSAtIG9mZnNldFRvcE5leHQ7XG4gICAgICAgICAgICAgICAgaWYgKG5ld0RpZmZUb3AgPj0gY3VycmVudEhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGlja3lJdGVtLmRpZmZUb3AgPSBjdXJyZW50SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGlja3lJdGVtLmRpZmZUb3AgPSBuZXdEaWZmVG9wO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGlja3lJdGVtLmRpZmZUb3AgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IG9mZnNldEJvdHRvbSA9IHRoaXMucGFkZGluZ1RvcCArIE1hdGguYWJzKHRoaXMuZWwuc2Nyb2xsVG9wIC0gdGhpcy5wYWRkaW5nVG9wKTtcbiAgICAgICAgICAgIGlmIChvZmZzZXRCb3R0b20gPD0gdGhpcy5jdXJyZW50U3RpY2t5SXRlbS5vZmZzZXRUb3ApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVWc0l0ZW1zKCkge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8dm9pZD4oKHN1YnNjcmliZXIpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN1YnNjcmlwQWxsVnNJdGVtLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3Vic2NyaXBBbGxWc0l0ZW0uZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5zdWJzY3JpcC51bnN1YnNjcmliZSgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YnNjcmlwQWxsVnNJdGVtID0gW107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZGlmZk1heEl0ZW1zUmVuZGVyID0gdGhpcy52c0l0ZW1zLmxlbmd0aCAtIHRoaXMubnVtYmVySXRlbXNDYW5SZW5kZXIoKTtcbiAgICAgICAgICAgICAgICBsZXQgbGFzdEluZGV4ID0gdGhpcy52c0l0ZW1zLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgbGV0IG9rID0gdGhpcy52c0l0ZW1zLmV2ZXJ5KCh2c0l0ZW0sIHZzSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5zdGFydEluZGV4ICsgdnNJbmRleDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlmZk1heEl0ZW1zUmVuZGVyID4gMCAmJiB2c0luZGV4ID09PSBsYXN0SW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IHRoaXMuaW5kZXhDdXJyZW50U3RpY2t5O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jdXJyZW50U3RpY2t5SXRlbSB8fCB2c0l0ZW0gIT09IHRoaXMuY3VycmVudFN0aWNreUl0ZW0uY29tcClcbiAgICAgICAgICAgICAgICAgICAgICAgIHZzSXRlbS5pc1N0aWNrZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc3Vic2NyaXBBbGxWc0l0ZW0uc29tZShpdGVtID0+IGl0ZW0uY29tcCA9PT0gdnNJdGVtKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3Vic2NyaXBBbGxWc0l0ZW0ucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcDogdnNJdGVtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwOiB2c0l0ZW0ub25TdGlja3lDaGFuZ2Uuc3Vic2NyaWJlKChzdGlja3kpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblN0aWNreUNvbXBvbmVudENoYW5nZWQodnNJdGVtLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7IHZzSXRlbS5mb3JjZVVwZGF0ZUlucHV0cygpOyB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFuaXB1bGVSZW5kZXJlZEl0ZW1zKCk7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uU3RpY2t5Q29tcG9uZW50Q2hhbmdlZCh2c0l0ZW06IEFnVnNJdGVtQ29tcG9uZW50LCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gdGhpcy5pbmRleEN1cnJlbnRTdGlja3kpIHtcbiAgICAgICAgICAgIGlmICghdnNJdGVtLnN0aWNreSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmluZGV4UHJldlN0aWNreSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UHJldkFzQ3VycmVudFN0aWNreSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleEN1cnJlbnRTdGlja3kgPSB0aGlzLmdldEluZGV4Q3VycmVudFN0aWNreShmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXhDdXJyZW50U3RpY2t5ID49IDApXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4TmV4dFN0aWNreSA9IHRoaXMuZ2V0SW5kZXhOZXh0U3RpY2t5KGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleE5leHRTdGlja3kgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgodGhpcy5pbmRleEN1cnJlbnRTdGlja3kgIT09IC0xICYmIGluZGV4IDwgdGhpcy5pbmRleEN1cnJlbnRTdGlja3kpIHx8IGluZGV4ID09PSB0aGlzLmluZGV4UHJldlN0aWNreSkge1xuICAgICAgICAgICAgaWYgKHZzSXRlbS5zdGlja3kpXG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleFByZXZTdGlja3kgPSBpbmRleDtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4ZXNQcmV2U3RpY2sgPSB0aGlzLmluZGV4ZXNQcmV2U3RpY2suZmlsdGVyKGluZGV4UHJldiA9PiBpbmRleFByZXYgIT09IGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgodGhpcy5pbmRleEN1cnJlbnRTdGlja3kgIT09IC0xICYmIGluZGV4ID4gdGhpcy5pbmRleEN1cnJlbnRTdGlja3kpIHx8IGluZGV4ID09PSB0aGlzLmluZGV4TmV4dFN0aWNreSkge1xuICAgICAgICAgICAgaWYgKHZzSXRlbS5zdGlja3kgJiYgKHRoaXMuaW5kZXhOZXh0U3RpY2t5ID09PSAtMSB8fCBpbmRleCA8IHRoaXMuaW5kZXhOZXh0U3RpY2t5KSlcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4TmV4dFN0aWNreSA9IGluZGV4O1xuICAgICAgICAgICAgZWxzZSBpZiAoIXZzSXRlbS5zdGlja3kpXG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleE5leHRTdGlja3kgPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdGhpcy5xdWVyeVZzSXRlbXMubm90aWZ5T25DaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBTdGlja3lJdGVtIHtcbiAgICBjb21wOiBBZ1ZzSXRlbUNvbXBvbmVudDtcbiAgICBpbmRleDogbnVtYmVyO1xuICAgIG9mZnNldFRvcDogbnVtYmVyID0gMDtcbiAgICB2c0luZGV4OiBudW1iZXI7XG4gICAgZGlmZlRvcDogbnVtYmVyID0gMDtcbiAgICBpc1VwOiBib29sZWFuID0gZmFsc2VcbiAgICBoZWlnaHQ6IG51bWJlciA9IDA7XG4gICAgb3V0c2lkZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3Iob2JqPzogUGFydGlhbDxTdGlja3lJdGVtPikge1xuICAgICAgICBpZiAob2JqKSBPYmplY3QuYXNzaWduKHRoaXMsIG9iaik7XG4gICAgfVxufSJdfQ==