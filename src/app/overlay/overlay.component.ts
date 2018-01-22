import {
  Component,
  Input,
  Output,
  HostListener,
  ViewChild,
  OnInit,
  AfterViewInit
} from '@angular/core';
// import { OverlayService } from './overlay.service';
import { OverlayDirective } from './overlay.directive';

@Component({
  selector: 'app-overlay',
  template: `
    <div id="#overlay" (clickOutside)="onClickedOutside($event)">
      <div class="overlay">
        <ng-template #appOverlay appOverlay></ng-template>
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

  @ViewChild(OverlayDirective) contentWrapper: OverlayDirective;
  @ViewChild('appOverlay') wrapper;

  constructor(
  ) { }

  public onClickedOutside () { console.log('clicked outside'); }


  ngAfterViewInit() {
    // this.loadContents();
  }

  ngOnInit () {}
}

