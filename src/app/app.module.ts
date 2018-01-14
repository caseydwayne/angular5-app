import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { EventsComponent } from './events/events.component';

import { EventComponent } from './event/event.component';

import { RequestService } from './http/request.service';

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ RequestService ],
  bootstrap: [ AppComponent ]
})

export class AppModule {

}
