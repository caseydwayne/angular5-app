import { Injectable, HostListener, ComponentFactoryResolver } from '@angular/core';
import { OverlayComponent } from './overlay.component';
import { OverlayModule, Overlay } from '@angular/cdk/overlay';
import { PortalModule, ComponentPortal } from '@angular/cdk/portal';

@Injectable()
export class OverlayService {

  constructor(
    private overlay: Overlay,
    private resolver: ComponentFactoryResolver
  ) { }

  private overlayRef = null; // overlay reference
  private portal = null; // portal reference

  /*
   * @method loadContents
   * renders the given component into an overlay component inside the #appOverlay template
   */

  private loadContents ( component, data?, alias? ) {
    // dynamically inject component into overlay template
    const componentFactory = this.resolver
      .resolveComponentFactory( component );
    const viewContainerRef = this.overlayRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    // attach data property to use in component (via @Input(<key>))
    if ( data ) {
      (componentRef.instance)[ alias || 'data' ] = data;
    }
  }

  /*
   * @method open
   * opens a new ComponentPortal using OverlayComponent and attaches it to an overlayRef
   * @param component {Component} the component to render
   * @param [data] {Any} a single property to pass to the component for use via @Input
   * @param [alias='data'] {String} the property name to assign data to (component.instance)
   */

  open( component, data?: any, alias?: string ) {
    // create new overlay and store reference
    if ( !this.overlayRef ) {
      this.overlayRef = this.overlay.create();
    }
    const ref = this.overlayRef;
    // dynamically attach overlay component to portal
    const portal = new ComponentPortal(OverlayComponent);
    this.portal = portal;
    ref.attach( portal );
    // ref.backdropClick().subscribe( (x) => console.log('overlay backdrop clicked') );
    console.log( 'Opened Overlay Portal' );
    // load injected component/apply data param
    // this.loadContents( component, data, alias );
    // returns reference to service for access to close
    return this;
  }

  /*
   * @method close
   * detaches overlay from app and nulls the reference
   */

  close() {
    console.log( 'Closing Overlay Portal' );
    if ( this.overlayRef && this.overlayRef.detach ) {
      this.overlayRef.detach();
      this.overlayRef = null;
    }
  }

  @HostListener('document:keydown', ['$event']) private handleKeydown(event: KeyboardEvent) {
    const key = event.keyCode;
    if ( key === 27 ) {
      console.log('pressed escape');
      this.close();
    }
  }

}
