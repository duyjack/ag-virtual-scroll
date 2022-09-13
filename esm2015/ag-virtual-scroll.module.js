import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgVirtualSrollComponent } from './ag-virtual-scroll.component';
import { AgVsItemComponent } from './ag-vs-item/ag-vs-item.component';
import { MathAbsPipe } from './pipes/math-abs.pipe';
import { StickedClassesPipe } from './pipes/sticked-classes.pipe';
export class AgVirtualScrollModule {
}
AgVirtualScrollModule.decorators = [
    { type: NgModule, args: [{
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWctdmlydHVhbC1zY3JvbGwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FnLXZpcnR1YWwtc2Nyb2xsL2FnLXZpcnR1YWwtc2Nyb2xsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxHQUFHLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN4RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUF1QmxFLE1BQU0sT0FBTyxxQkFBcUI7OztZQXJCakMsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO2lCQUNmO2dCQUNELFlBQVksRUFBRTtvQkFDVix1QkFBdUI7b0JBQ3ZCLGlCQUFpQjtvQkFFakIsUUFBUTtvQkFDUixXQUFXO29CQUNYLGtCQUFrQjtpQkFDckI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLHVCQUF1QjtvQkFDdkIsaUJBQWlCO2lCQUNwQjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2IsdUJBQXVCO29CQUN2QixpQkFBaUI7aUJBQ3BCO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IEFnVmlydHVhbFNyb2xsQ29tcG9uZW50IH0gZnJvbSAnLi9hZy12aXJ0dWFsLXNjcm9sbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWdWc0l0ZW1Db21wb25lbnQgfSBmcm9tICcuL2FnLXZzLWl0ZW0vYWctdnMtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0aEFic1BpcGUgfSBmcm9tICcuL3BpcGVzL21hdGgtYWJzLnBpcGUnO1xuaW1wb3J0IHsgU3RpY2tlZENsYXNzZXNQaXBlIH0gZnJvbSAnLi9waXBlcy9zdGlja2VkLWNsYXNzZXMucGlwZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBBZ1ZpcnR1YWxTcm9sbENvbXBvbmVudCxcbiAgICAgICAgQWdWc0l0ZW1Db21wb25lbnQsXG5cbiAgICAgICAgLy8gUGlwZXNcbiAgICAgICAgTWF0aEFic1BpcGUsXG4gICAgICAgIFN0aWNrZWRDbGFzc2VzUGlwZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBBZ1ZpcnR1YWxTcm9sbENvbXBvbmVudCxcbiAgICAgICAgQWdWc0l0ZW1Db21wb25lbnRcbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW1xuICAgICAgICBBZ1ZpcnR1YWxTcm9sbENvbXBvbmVudCxcbiAgICAgICAgQWdWc0l0ZW1Db21wb25lbnRcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEFnVmlydHVhbFNjcm9sbE1vZHVsZSB7IH1cbiJdfQ==