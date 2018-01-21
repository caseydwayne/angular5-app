import { Routes, RouterModule } from '@angular/router';

import { EventsComponent } from './events/events.component';
import { LoginComponent } from './user/login.component';
import { RegisterComponent } from './user/register.component';
import { AuthGuard } from './http/authguard';

const appRoutes: Routes = [
  { path: '', component: EventsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot( appRoutes );
