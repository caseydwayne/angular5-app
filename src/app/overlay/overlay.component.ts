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
import { OverlayService } from './overlay.service';
import { OverlayDirective } from './overlay.directive';

@Component({
  selector: 'app-overlay',
  template: `
    <div id="#overlay" (clickOutside)="onClickedOutside()">
      <div class="overlay">
        <ng-content ngTemplateOutlet="contents?contents:defaultContent"></ng-content>
        <ng-template #appOverlay appOverlay></ng-template>
        <ng-template #defaultContent>
          <p>Add content by passing a (content)="templateName"</p>
        </ng-template>
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

  @ViewChild('appOverlay') wrapper; // get appOverlay to inject content

  @Input('contents') contents: TemplateRef<any>;

  constructor(
    private resolver: ComponentFactoryResolver
  ) { }

  private overlayRef = null; // overlay reference

  /*
   * @method loadContents
   * renders the given component into an overlay component inside the #appOverlay template
   */

  private loadContents ( component, data?, alias? ) {
    // dynamically inject component into overlay template
    const componentFactory = this.resolver
      .resolveComponentFactory( component.component );
    const viewContainerRef = this.wrapper.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    // attach data property to use in component (via @Input(<key>))
    if ( data ) {
      (componentRef.instance)[ alias || 'data' ] = data;
    }
  }

  /*
   * @method close
   * detaches overlay and nulls the reference
   */

  close() {
    console.log( 'Closing Overlay Portal' );
    if ( this.overlayRef && this.overlayRef.detach ) {
      this.overlayRef.detach();
      this.overlayRef = null;
    }
  }

  onClickedOutside () {}

  @HostListener('document:keydown', ['$event']) private handleKeydown(event: KeyboardEvent) {
    const key = event.keyCode;
    if ( key === 27 ) {
      console.log('pressed escape');
      this.close();
    }
  }

  ngAfterViewInit() {
    // this.loadContents();
    console.log( this.wrapper );
    this.onClickedOutside = function() {
      console.log('clicked outside');
      this.close();
    };
  }

  ngOnInit () {
    // this.overlayRef = open
  }

}

