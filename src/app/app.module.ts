import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { EventsComponent } from './events/events.component';

import { DetailsService } from './event/details.service';

import { EventModule } from './event/event.module';
import { EventsModule } from './events/events.module';


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
    OverlayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    OverlayModule,
    EventModule,
    EventsModule,
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
