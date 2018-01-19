import { Component, OnInit } from '@angular/core';
// import { OverlayService } from './overlay.service';

const ESC = 27;

@Component({
  selector: 'app-overlay',
  template: `
    <div id="#overlay">
      <div class="overlay">
        <h2>OVERLAY</h2>
        <ng-content #overlay></ng-content>
      </div>
    </div>
  `,
  styles: [
    '#overlay { position: fixed; width: 100%; height: 100%; position: fixed; top: 0; left: 0; background: rgba(0,0,0,.8) }',
    '.overlay { width: 80%; height: 80%; padding: 5%; margin: 5%; box-shadow: 0 0 2px 1px white; background-color: white; color: black;'
  ]
})

export class OverlayComponent implements OnInit {

  /*
  @HostListener('document:keydown', ['$event']) private handleKeydown(event: KeyboardEvent) {
    if ( event.keyCode === ESC ) {
      this.dialogRef.close();
    }
  }
  */


  constructor (
    // private overlay: OverlayService
  ) { }

  open () {
    // this.overlay.openOverlay();
  }

  ngOnInit () {}

}

