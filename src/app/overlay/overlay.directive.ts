import { Directive, HostListener, Input, Output } from '@angular/core';
import { OverlayService } from './overlay.service';

@Directive({
  selector: '[appOverlay]'
})

export class OverlayDirective {

  constructor( private overlay: OverlayService ) { }

  @Input('clickedOutside') clickedOutside;

  @Output()
  open() {
    this.overlay.open();
    console.log( 'Opened Overlay Portal' );
  }

  @Output()
  close() {
    this.overlay.close();
  }

  onClickedOutside() {
    console.log( 'clicked outside(directive)' );
    this.overlay.close();
  }

  @HostListener('document:keydown', ['$event']) private handleKeydown(event: KeyboardEvent) {
    const key = event.keyCode;
    // console.log( 'keydown', key );
    if ( key === 27 ) {
      this.close();
    }
  }

  @HostListener('document:click', ['$event']) private handleClick(event: MouseEvent) {
    // const t = event.target;
    // !$(event.target).closest('#overlay *').length;
    // console.log(t);
  }

}
