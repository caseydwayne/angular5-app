import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { EventsComponent } from './events/events.component';
import { EventsListComponent } from './events/list.component';
import { EventLocationComponent } from './event/location.component';
import { EventImageComponent } from './events/eventimage.component';
import { EventComponent } from './event/event.component';
import { DetailsService } from './event/details.service';


import { OverlayModule } from '@angular/cdk/overlay';
import { OverlayComponent } from './overlay.component';
import { OverlayService } from './overlay.service';

import { RequestService } from './http/request.service';

import { MaterialModule } from './material.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    EventsListComponent,
    EventComponent,
    EventLocationComponent,
    EventImageComponent,
    OverlayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    OverlayModule,
    ServiceWorkerModule.register( '/ngsw-worker.js', { enabled: environment.production } )
  ],
  providers: [
    OverlayService,
    RequestService,
    DetailsService
  ],
  entryComponents: [
    OverlayComponent
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {

}
