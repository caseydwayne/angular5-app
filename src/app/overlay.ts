import {
  Component,
  ComponentFactoryResolver,
  TemplateRef,
  Input,
  Output,
  HostListener,
  ViewChild,
  OnInit,
  AfterViewInit
} from '@angular/core';

import { OverlayModule, Overlay } from '@angular/cdk/overlay';
import { PortalModule, ComponentPortal } from '@angular/cdk/portal';
//  (clickOutside)="onClickedOutside()

/*
 * @Component Overlay
 * creates an opaque portal with a single event inside
 */

@Component({
  selector: 'app-overlay',
  template: `
    <div id="#overlay" [event]="event">
      <div class="overlay">
        <app-event [event]="event"></app-event>
      </div>
    </div>
  `,
  styles: [
    '#overlay { position: fixed; width: 100%; height: 100%; position: fixed; top: 0; left: 0; background: rgba(0,0,0,.8) }',
    '.overlay { width: 80vw; height: 80vh; padding: 5vh 5vw; margin: 5vh 5vw; }',
    '.overlay { box-shadow: 0 0 2px 1px white; background-color: rgba(255,255,255,.95); color: black; }'
  ]
})

export class OverlayComponent implements OnInit, AfterViewInit {

  @Input('event') event;

  overlayRef;

  constructor(
    public overlay: Overlay,
  ) { }

  /*
   * @method open
   * opens a new ComponentPortal using OverlayComponent and attaches it to an overlayRef
   * @param event {EventFormatted} the event to render in portal
   * @return overlayRef {Overlay} reference to the active CDK overlay
   */

  open( ) {

    // create new overlay
    const ref = this.overlay.create();

    // dynamically attach component to portal
    const portal = new ComponentPortal( OverlayComponent );

    // attach portal to overlay reference
    ref.attach( portal );

    // ref._keydownEvents.subscribe( x => console.log(x) );
    // ref.backdropClick().subscribe( (x) => console.log('overlay backdrop clicked') );
    console.log( 'Opened Overlay Portal' );
    // load injected component/apply data param
    // this.loadContents( component, data, alias );

    // returns reference to service for access to close
    return ref;
  }

  ngOnInit () {
    this.overlayRef = this.open();
  }

  ngAfterViewInit () {}

}
