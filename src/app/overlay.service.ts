import { Injectable, HostListener } from '@angular/core';
import { OverlayComponent } from './overlay.component';
import { OverlayModule, Overlay } from '@angular/cdk/overlay';
import { PortalModule, ComponentPortal } from '@angular/cdk/portal';

@Injectable()
export class OverlayService {

  constructor( private overlay: Overlay ) { }

  private overlayRef = null;

  openOverlay() {
    if ( !this.overlayRef ) {
      this.overlayRef = this.overlay.create();
    }
    const ref = this.overlayRef;
    const portal = new ComponentPortal(OverlayComponent);
    ref.attach(portal);
    console.log( 'Opened Overlay' );
  }

  closeOverlay() {
    console.log( 'Closing Portal' );
  }

}
