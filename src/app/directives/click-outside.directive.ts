import {
  Directive,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';

@Directive({
  selector: '[click-outside]',
})
export class ClickOutside implements OnInit {
  public globalClick: Subscription;

  @Output('ClickOutside')
  ClickOutside: EventEmitter<Object>;

  constructor(private _elRef: ElementRef) {
    this.ClickOutside = new EventEmitter();
  }

  ngOnInit() {
    this.globalClick = fromEvent(document, 'click').subscribe(
      (event: MouseEvent) => {
        this.onGlobalClick(event);
      }
    );
  }

  onGlobalClick(event: MouseEvent) {
    if (event instanceof MouseEvent) {
      if (this.isDescendant(this._elRef.nativeElement, event.target) === true) {
        this.ClickOutside.emit({
          target: event.target || null,
          value: false,
        });
      } else {
        this.ClickOutside.emit({
          target: event.target || null,
          value: true,
        });
      }
    }
  }

  isDescendant(parent, child) {
    let node = child;
    while (node !== null) {
      if (node === parent) {
        return true;
      } else {
        node = node.parentNode;
      }
    }
    return false;
  }
}
