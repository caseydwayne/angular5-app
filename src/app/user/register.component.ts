import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';

import { MatSnackBar } from '@angular/material';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {

  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  register() {
    this.loading = true;
    this.userService.create(this.model)
      .subscribe(
        data => {
          // set success message and pass true parameter to persist the message after redirecting to the login page
          this.snackBar.open( 'Registration successful', 'Got it!', { panelClass: 'success' } );
          this.router.navigate(['/login']);
        },
        error => {
          this.snackBar.open( `Error: ${error}`, 'OK', { panelClass: 'error' } );
          this.loading = false;
        }
      );
    }

}
