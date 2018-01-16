import { Component } from '@angular/core';

@Component({
  selector: 'app-overlay',
  template: `
    <div id="#overlay">
      <div class="overlay">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    '#overlay { position: fixed; width: 100%; height: 100%; position: fixed; top: 0; left: 0; background: rgba(0,0,0,.8) }',
    '.overlay { width: 90%; height: 90%; margin: 5%; box-shadow: 0 0 2px 1px white; background-color: white',
    'button { position: absolute; top: 5%; right: 5%; border-radius: 50%'
  ]
})

export class OverlayComponent {

  private content = 'Test Content';

}
