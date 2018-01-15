import { Component, OnInit, HostListener,  ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-overlay',
  template: `
    <div id="overlay">
      <input (keyup.esc)=clearOverlay() type="hidden" />
      <button (click)=clearOverlay()>X</button>
      <div class="overlay">
        {{content}}
      </div>
    </div>
  `,
  styles: [
    '#overlay { position: relative; width: 100%; height: 100%; position: fixed; top: 0; left: 0; background: rgba(0,0,0,.8) }',
    '.overlay { width: 90%; height: 90%; margin: 5%; box-shadow: 0 0 2px 1px white; background-color: white',
    'button { position: absolute; top: 5%; right: 5%; border-radius: 50%'
  ]
})

export class OverlayComponent {

  @ViewChild('app-overlay', {read: ViewContainerRef}) container: ViewContainerRef;

  content = `
    <h1>Test Content</h1>
  `;



  @HostListener('keyup.esc') onKeyUp() {
    console.log( 'hostlistener keyup' );
  }

  public clearOverlay(): void {
    alert('clearing overlay');
    // this.style.display = 'none';
    // this.viewContainerRef.detach();
  }

  public showOverlay(data): void {
    this.content = data;
  }

}
