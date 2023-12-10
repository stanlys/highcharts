import {
  Directive,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { MatButton } from '@angular/material/button';

@Directive({
  selector: `selector: button[mat-button][role],
  button[mat-raised-button][role],
  button[mat-icon-button][role],
  button[mat-fab][role],
  button[mat-mini-fab][role],
  button[mat-stroked-button][role],
  button[mat-flat-button][role]`,
})
export class AdditionmatbuttonDirective implements OnChanges {
  @Input() tooltipMessage!: string;
  @Input() isViewerDisabled!: boolean;

  constructor(private matButton: MatButton, private rerender: Renderer2) {
    this.matButton.disabled = this.isViewerDisabled;
    const div = this.rerender.createElement('div');
    this.rerender.addClass(div, 'tooltip');
    this.rerender.addClass(div, 'disabledCursor');
    const span = this.rerender.createElement('span');
    this.rerender.addClass(span, 'tooltiptext');
    this.rerender.setValue(span, this.tooltipMessage);

    this.rerender.appendChild(this.nativeElement.parentNode, div);
    this.rerender.appendChild(div, this.nativeElement);
    this.rerender.appendChild(div, span);
  }


  get nativeElement(): HTMLElement {
    return this.matButton._elementRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['isViewerDisabled'] && !changes['tooltipMessage']) {
      return;
    }
    // еще можно добавить проверки в случае изменений сообщения в tooltip
    const span = this.nativeElement.nextElementSibling;
    this.matButton.disabled = changes['isViewerDisabled'].currentValue;
    const text = this.rerender.createText(this.tooltipMessage);
    this.rerender.appendChild(span, text);
  }
}
