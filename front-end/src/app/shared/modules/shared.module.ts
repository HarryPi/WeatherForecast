import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
  ]
})
export class SharedModule {
}
