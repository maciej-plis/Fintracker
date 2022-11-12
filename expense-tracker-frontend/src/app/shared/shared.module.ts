import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ErrorMessagesConverterPipe } from "@shared/pipes/error-messages-converter.pipe";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule } from "@angular/material/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ConfirmationDialog } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatMomentDateModule } from "@angular/material-moment-adapter";


@NgModule({
  declarations: [
    ErrorMessagesConverterPipe,
    ConfirmationDialog
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  exports: [
    ErrorMessagesConverterPipe,
    CommonModule,
    MatInputModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMomentDateModule
  ]
})
export class SharedModule {}
