import {
  Component,
  ComponentFactoryResolver,
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
    <div id="#overlay" (clickOutside)="onClickedOutside($event)">
      <div class="overlay">
        <h2>Overlay</h2>
        <!--<app-event [event]="this.event"></app-event>-->
        <ng-template appOverlay></ng-template>
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

  @Input('content') content;

  @ViewChild(OverlayDirective) contentWrapper: OverlayDirective;

  constructor(
    private overlay: OverlayService,
    private resolver: ComponentFactoryResolver
  ) { }

  @Input('clickedOutside') clickedOutside;

  loadContents ( component, data? ) {
    const componentFactory = this.resolver
      .resolveComponentFactory( component.component );
    const viewContainerRef = this.contentWrapper.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance).data = data;
  }

  @Output()
  open( component, data?: any ) {
    this.overlay.open( component, data );
    // this.loadContents( component, data );
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
    if ( key === 27 ) {
      this.close();
    }
  }

  ngAfterViewInit() {
    // this.loadContents();
  }

  ngOnInit () {}
}

