import { Component, Input, ElementRef, HostBinding, ApplicationRef, ViewChild, EventEmitter } from '@angular/core';
export class AgVsItemComponent {
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
AgVsItemComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
AgVsItemComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ApplicationRef }
];
AgVsItemComponent.propDecorators = {
    class: [{ type: HostBinding, args: ['class.ag-vs-item',] }],
    temp: [{ type: ViewChild, args: ['temp', { static: false },] }],
    sticky: [{ type: Input, args: ['sticky',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWctdnMtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYWctdmlydHVhbC1zY3JvbGwvYWctdnMtaXRlbS9hZy12cy1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQW1ELFdBQVcsRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFlLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQW1CakwsTUFBTSxPQUFPLGlCQUFpQjtJQWUxQixZQUNXLEtBQThCLEVBQzlCLE1BQXNCO1FBRHRCLFVBQUssR0FBTCxLQUFLLENBQXlCO1FBQzlCLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBaEJPLFVBQUssR0FBWSxJQUFJLENBQUM7UUFJdEMsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUl6QyxXQUFNLEdBQVksS0FBSyxDQUFDO1FBRXhCLG1CQUFjLEdBQUcsSUFBSSxZQUFZLENBQVUsS0FBSyxDQUFDLENBQUM7UUFFbEQsY0FBUyxHQUFZLEtBQUssQ0FBQztJQU1sQyxDQUFDO0lBWkQsSUFBVyxFQUFFLEtBQUssT0FBTyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztJQWNsRSxRQUFRO0lBQ1IsQ0FBQztJQUVELGVBQWU7SUFDZixDQUFDO0lBRUosV0FBVyxDQUFDLE9BQXNCO1FBQzNCLElBQUksUUFBUSxJQUFJLE9BQU87WUFDbkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFTSxpQkFBaUI7UUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRU0sT0FBTztRQUNYLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7SUFDNUIsQ0FBQzs7O1lBdkRKLFNBQVMsU0FBQztnQkFDVixRQUFRLEVBQUUsWUFBWTtnQkFDdEIsZ0tBQTBDO3lCQUVuQzs7Ozs7Ozs7VUFRRTthQUVUOzs7WUFsQjBCLFVBQVU7WUFBZ0UsY0FBYzs7O29CQW9COUcsV0FBVyxTQUFDLGtCQUFrQjttQkFFOUIsU0FBUyxTQUFDLE1BQU0sRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7cUJBRWpDLEtBQUssU0FBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBPbkluaXQsIEhvc3RCaW5kaW5nLCBBcHBsaWNhdGlvblJlZiwgVmlld0NoaWxkLCBUZW1wbGF0ZVJlZiwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBZ1ZpcnR1YWxTcm9sbENvbXBvbmVudCB9IGZyb20gJy4uL2FnLXZpcnR1YWwtc2Nyb2xsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnYWctdnMtaXRlbScsXG5cdHRlbXBsYXRlVXJsOiAnLi9hZy12cy1pdGVtLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZXM6IFtcbiAgICAgICAgYDpob3N0IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICA6aG9zdCA+IG5nLXRlbXBsYXRlIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGluaGVyaXQ7XG4gICAgICAgICAgICB3aWR0aDogaW5oZXJpdDtcbiAgICAgICAgICAgIGhlaWdodDogaW5oZXJpdDtcbiAgICAgICAgfWBcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEFnVnNJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MuYWctdnMtaXRlbScpIHB1YmxpYyBjbGFzczogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBAVmlld0NoaWxkKCd0ZW1wJywge3N0YXRpYzogZmFsc2V9KSBwdWJsaWMgdGVtcDogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBJbnB1dCgnc3RpY2t5JykgcHVibGljIHN0aWNreTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHVibGljIGdldCBlbCgpIHsgcmV0dXJuIHRoaXMuZWxSZWYgJiYgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50OyB9XG5cbiAgICBwdWJsaWMgdmlld09rOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwdWJsaWMgb25TdGlja3lDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KGZhbHNlKTtcblxuICAgIHB1YmxpYyBpc1N0aWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZWxSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICBwdWJsaWMgYXBwUmVmOiBBcHBsaWNhdGlvblJlZlxuXHQpIHtcbiAgICB9XG4gICAgXG4gICAgbmdPbkluaXQoKSB7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIH1cblx0XG5cdG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKCdzdGlja3knIGluIGNoYW5nZXMpXG4gICAgICAgICAgICB0aGlzLm9uU3RpY2t5Q2hhbmdlLm5leHQodGhpcy5zdGlja3kpO1xuICAgIH1cblxuICAgIHB1YmxpYyBmb3JjZVVwZGF0ZUlucHV0cygpIHtcbiAgICAgICAgdGhpcy52aWV3T2sgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hcHBSZWYudGljaygpO1xuICAgICAgICB0aGlzLnZpZXdPayA9IHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEh0bWwoKSB7XG4gICAgICAgcmV0dXJuIHRoaXMuZWwub3V0ZXJIVE1MO1xuICAgIH1cbn1cbiJdfQ==