import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatProgressBarModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatListModule,
    MatGridListModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatCardModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatListModule,
    MatGridListModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatCardModule
  ]
})

export class MaterialModule { }
