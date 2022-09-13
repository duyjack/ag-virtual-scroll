import { Pipe } from '@angular/core';
export class MathAbsPipe {
    constructor() { }
    transform(value) {
        if (value)
            return Math.abs(value);
        return value;
    }
}
MathAbsPipe.decorators = [
    { type: Pipe, args: [{
                name: 'mathAbs'
            },] }
];
MathAbsPipe.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aC1hYnMucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hZy12aXJ0dWFsLXNjcm9sbC9waXBlcy9tYXRoLWFicy5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBSXBELE1BQU0sT0FBTyxXQUFXO0lBRXJCLGdCQUFlLENBQUM7SUFFaEIsU0FBUyxDQUFDLEtBQWE7UUFDcEIsSUFBSSxLQUFLO1lBQ04sT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLE9BQU8sS0FBSyxDQUFDO0lBQ2hCLENBQUM7OztZQVhILElBQUksU0FBQztnQkFDSCxJQUFJLEVBQUUsU0FBUzthQUNqQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbkBQaXBlKHtcbiAgIG5hbWU6ICdtYXRoQWJzJ1xufSlcbmV4cG9ydCBjbGFzcyBNYXRoQWJzUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgIHRyYW5zZm9ybSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICBpZiAodmFsdWUpXG4gICAgICAgICByZXR1cm4gTWF0aC5hYnModmFsdWUpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgfVxufSJdfQ==