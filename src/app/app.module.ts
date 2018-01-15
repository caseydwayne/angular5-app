import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { EventsComponent } from './events/events.component';
import { EventComponent } from './event/event.component';

import { OverlayModule } from '@angular/cdk/overlay';
import { OverlayComponent } from './overlay.component';
import { OverlayService } from './overlay.service';

import { RequestService } from './http/request.service';

import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    EventComponent,
    OverlayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    OverlayModule
  ],
  providers: [
    OverlayService,
    RequestService
  ],
  entryComponents: [
    OverlayComponent
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {

}
