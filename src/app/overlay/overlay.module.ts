import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { OverlayModule } from '@angular/cdk/overlay';
import { OverlayDirective } from './overlay.directive';
import { OverlayComponent } from './overlay.component';
import { OverlayService } from './overlay.service';
import { ClickOutsideModule } from 'ng-click-outside';


@NgModule({
  declarations: [
    OverlayComponent,
    OverlayDirective
  ],
  imports: [
    OverlayModule,
    ClickOutsideModule
  ],
  providers: [
    OverlayService
  ],
  entryComponents: [
    OverlayComponent
  ],
  bootstrap: [ OverlayComponent ]
})

export class OverlayProvider {

}
