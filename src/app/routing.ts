import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './user/login.component';
import { RegisterComponent } from './user/register.component';
import { AuthGuard } from './http/authguard';

const appRoutes: Routes = [

  // established routes
  { path: '', component: AppComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

export const routing = RouterModule.forRoot( appRoutes );
