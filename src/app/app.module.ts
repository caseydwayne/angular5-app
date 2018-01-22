import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { EventComponent } from './event/event.component';

import { RequestService } from './http/request.service';
import { DetailsService } from './event/details.service';

import { EventModule } from './event/event.module';
import { EventsModule } from './events/events.module';

import { OverlayProvider } from './overlay/overlay.module';

import { MaterialModule } from './material.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    OverlayProvider,
    EventModule,
    EventsModule,
    ServiceWorkerModule.register( '/ngsw-worker.js', { enabled: environment.production } )
  ],
  providers: [
    RequestService,
    DetailsService
  ],
  entryComponents: [
    EventComponent
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
