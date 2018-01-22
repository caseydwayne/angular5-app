import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-images',
  template: `
    <ul>
      <li *ngFor="let img of images">
        <img (src)="img.src" />
      </li>
    </ul>
  `
})

export class ImageComponent implements AfterViewInit {

  constructor () {}
  image = {};
  images = [];

  ngAfterViewInit() {

  }
}
