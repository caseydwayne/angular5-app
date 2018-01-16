import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { EventsComponent } from './events/events.component';
import { EventsListComponent } from './events/list.component';

import { DetailsService } from './event/details.service';

import { EventModule } from './event/event.module';
// import { EventTestComponent } from './event/test.component';


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
    // EventsComponent,
    // EventsListComponent,
    OverlayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    OverlayModule,
    EventModule,
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
