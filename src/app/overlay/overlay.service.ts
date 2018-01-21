import { Injectable, HostListener } from '@angular/core';
// import { OverlayComponent } from './overlay.component';
import { OverlayModule, Overlay } from '@angular/cdk/overlay';
import { PortalModule, ComponentPortal } from '@angular/cdk/portal';

@Injectable()
export class OverlayService {

  constructor( private overlay: Overlay ) { }

  private overlayRef = null;
  private portal = null;

  open( component, data?: any ) {
    // create new overlay and store reference
    if ( !this.overlayRef ) {
      this.overlayRef = this.overlay.create();
    }
    const ref = this.overlayRef;
    // dynamically attach component to portal
    const portal = new ComponentPortal(component);
    this.portal = portal;
    ref.attach( portal );
    console.log( 'Opened Overlay Portal' );
  }

  close() {
    console.log( 'Closing Overlay Portal' );
    if ( this.overlayRef && this.overlayRef.detach ) {
      this.overlayRef.detach();
      this.overlayRef = null;
    }
  }

}
