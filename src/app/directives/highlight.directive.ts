import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  @Input('appHighlight')
  color: string = 'yellow';

  constructor(private el: ElementRef<HTMLElement>) {}

  highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.highlight(this.color);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.highlight('');
  }
}
