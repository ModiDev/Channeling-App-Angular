import {Directive, ElementRef, Input} from "@angular/core";

@Directive({
  selector: "[appScrollable]",
  exportAs: "appScrollable"
})
export class ScrollableDirective {
  constructor(private elementRef: ElementRef) { }

  @Input()
  scrollUnit!: number;

  private get element() {
    return this.elementRef.nativeElement;
  }

  scroll(direction: number) {
    this.element.scrollLeft += this.scrollUnit * direction;
  }
}
