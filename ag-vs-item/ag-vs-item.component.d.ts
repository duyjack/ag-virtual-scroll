import { ElementRef, AfterViewInit, OnChanges, SimpleChanges, OnInit, ApplicationRef, TemplateRef, EventEmitter } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class AgVsItemComponent implements OnInit, AfterViewInit, OnChanges {
    elRef: ElementRef<HTMLElement>;
    appRef: ApplicationRef;
    class: boolean;
    temp: TemplateRef<any>;
    sticky: boolean;
    get el(): HTMLElement;
    viewOk: boolean;
    onStickyChange: EventEmitter<boolean>;
    isSticked: boolean;
    constructor(elRef: ElementRef<HTMLElement>, appRef: ApplicationRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    forceUpdateInputs(): void;
    getHtml(): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<AgVsItemComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<AgVsItemComponent, "ag-vs-item", never, { "sticky": "sticky"; }, {}, never, ["*"]>;
}

//# sourceMappingURL=ag-vs-item.component.d.ts.map