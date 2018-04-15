import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatSnackBarModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';


@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatTabsModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatTabsModule

  ],
  entryComponents: []
})
export class MaterialModule {
}
