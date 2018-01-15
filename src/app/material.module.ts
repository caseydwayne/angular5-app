import { NgModule } from '@angular/core';

import { MatProgressBarModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  imports: [ MatProgressBarModule, MatListModule, MatGridListModule ],
  exports: [ MatProgressBarModule, MatListModule, MatGridListModule ]
})

export class MaterialModule { }
