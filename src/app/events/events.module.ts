import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { EventsComponent } from './events.component';
import { EventsTestComponent } from './test.component';

import { EventModule } from '../event/event.module';

import { RequestService } from '../http/request.service';
import { DetailsService } from '../event/details.service';

import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    EventsComponent,
    EventsTestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    EventModule
  ],
  exports: [
    EventsComponent,
    EventsTestComponent
  ],
  providers: [
    RequestService,
    DetailsService
  ],
  entryComponents: [
  ],
  bootstrap: [ EventsComponent ]
})

export class EventsModule {

}
