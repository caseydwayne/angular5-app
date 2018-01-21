import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FakeBackendProvider } from './http/fake-backend.interceptor';

import { AppComponent } from './app.component';
import { routing } from './routing';

import { JwtInterceptor } from './http/jwt.interceptor';
import { AuthGuard } from './http/authguard';
import { AuthenticationService } from './http/authentication.service';

import { UserService } from './user/service';
import { LoginComponent } from './user/login.component';
import { RegisterComponent } from './user/register.component';

import { EventsComponent } from './events/events.component';

import { RequestService } from './http/request.service';
import { DetailsService } from './event/details.service';

import { EventModule } from './event/event.module';
import { EventsModule } from './events/events.module';

import { OverlayModule } from '@angular/cdk/overlay';
import { OverlayComponent } from './overlay.component';
import { OverlayService } from './overlay.service';

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
    // routing,
    MaterialModule,
    OverlayModule,
    EventModule,
    EventsModule,
    ServiceWorkerModule.register( '/ngsw-worker.js', { enabled: environment.production } )
  ],
  providers: [
    // FakeBackendProvider,
    // JwtInterceptor,
    // AuthGuard,
    // AuthenticationService,
    // UserService,
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
