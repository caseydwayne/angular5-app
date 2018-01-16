import { Injectable } from '@angular/core';
import { OverlayComponent } from './overlay.component';
import { OverlayModule, Overlay } from '@angular/cdk/overlay';
import { PortalModule, ComponentPortal } from '@angular/cdk/portal';

@Injectable()
export class OverlayService {

  constructor( private overlay: Overlay ) { }

  open() {
    const ref = this.overlay.create();
    const portal = new ComponentPortal(OverlayComponent);
    ref.attach(portal);
  }

  close() {
    console.log( 'Closing Portal' );
  }

}
