import { Injectable } from '@angular/core';
import { OverlayComponent } from './overlay.component';
import { OverlayModule, Overlay } from '@angular/cdk/overlay';
import { PortalModule, ComponentPortal } from '@angular/cdk/portal';

@Injectable()
export class OverlayService {

  constructor(
    public overlay: Overlay
  ) { }

  /*
   * @method open
   * opens a new ComponentPortal using OverlayComponent and attaches it to an overlayRef
   * @param component {Component} the component to render
   * @param [data] {Any} a single property to pass to the component for use via @Input
   * @param [alias='data'] {String} the property name to assign data to (component.instance)
   * @return overlayRef {Overlay} reference to the open CDK overlay
   */

  open( component, data?: any, alias?: string ) {
    // create new overlay
    const ref = this.overlay.create();
    // dynamically attach component to portal
    const portal = new ComponentPortal(OverlayComponent);
    if ( data ) { portal.component[ alias || 'data' ] = data; }
    ref.attach( portal );
    // ref.backdropClick().subscribe( (x) => console.log('overlay backdrop clicked') );
    console.log( 'Opened Overlay Portal' );
    // load injected component/apply data param
    // this.loadContents( component, data, alias );
    // returns reference to service for access to close
    return ref;
  }

}
