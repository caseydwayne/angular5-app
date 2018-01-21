import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { UserService } from './user.service';

import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    UserService
  ],
  entryComponents: [],
  bootstrap: []
})

export class UserModule {

}
