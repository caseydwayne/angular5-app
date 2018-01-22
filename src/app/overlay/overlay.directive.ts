import { Directive, OnInit, ViewContainerRef } from '@angular/core';
// import { OverlayDirective } from './overlay.directive';

@Directive({
  selector: '[appOverlay]'
})

export class OverlayDirective implements OnInit {
  // @Input('event') event;
  constructor( public viewContainerRef: ViewContainerRef ) { }

  ngOnInit () {}

}

