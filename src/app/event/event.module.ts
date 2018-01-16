import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { EventLocationComponent } from './location.component';
import { EventComponent } from './event.component';
import { EventTestComponent } from './test.component';

import { RequestService } from '../http/request.service';
import { DetailsService } from './details.service';

import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    EventComponent,
    EventLocationComponent,
    EventTestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [
    EventTestComponent
  ],
  providers: [
    RequestService,
    DetailsService
  ],
  entryComponents: [
  ],
  bootstrap: [ EventComponent ]
})

export class EventModule {

}
