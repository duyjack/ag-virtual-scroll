import { Pipe } from '@angular/core';
export class StickedClassesPipe {
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
StickedClassesPipe.decorators = [
    { type: Pipe, args: [{
                name: 'stickedClasses'
            },] }
];
StickedClassesPipe.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RpY2tlZC1jbGFzc2VzLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYWctdmlydHVhbC1zY3JvbGwvcGlwZXMvc3RpY2tlZC1jbGFzc2VzLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFJcEQsTUFBTSxPQUFPLGtCQUFrQjtJQU81QjtRQUxRLHFCQUFnQixHQUFhO1lBQ2xDLHVCQUF1QjtZQUN2Qix3QkFBd0I7U0FDMUIsQ0FBQztJQUVhLENBQUM7SUFFaEIsU0FBUyxDQUFDLE9BQWU7UUFDdEIsSUFBSSxPQUFPLEVBQUU7WUFDVixJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3RFLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2RztRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ2IsQ0FBQzs7O1lBbEJILElBQUksU0FBQztnQkFDSCxJQUFJLEVBQUUsZ0JBQWdCO2FBQ3hCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuQFBpcGUoe1xuICAgbmFtZTogJ3N0aWNrZWRDbGFzc2VzJ1xufSlcbmV4cG9ydCBjbGFzcyBTdGlja2VkQ2xhc3Nlc1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICAgcHJpdmF0ZSBleGNlcHRpb25DbGFzc2VzOiBzdHJpbmdbXSA9IFtcbiAgICAgICdhZy12aXJ0dWFsLXNjcm9sbC1vZGQnLFxuICAgICAgJ2FnLXZpcnR1YWwtc2Nyb2xsLWV2ZW4nLFxuICAgXTtcblxuICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICB0cmFuc2Zvcm0oY2xhc3Nlczogc3RyaW5nKSB7XG4gICAgICBpZiAoY2xhc3Nlcykge1xuICAgICAgICAgbGV0IHNwbGl0dGVkID0gY2xhc3Nlcy5pbmNsdWRlcygnICcpID8gY2xhc3Nlcy5zcGxpdCgnICcpIDogW2NsYXNzZXNdO1xuICAgICAgICAgcmV0dXJuIHNwbGl0dGVkLmZpbHRlcihjbGFzc05hbWUgPT4gIXRoaXMuZXhjZXB0aW9uQ2xhc3Nlcy5zb21lKGV4YyA9PiBleGMgPT09IGNsYXNzTmFtZSkpLmpvaW4oJyAnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAnJztcbiAgIH1cbn0iXX0=