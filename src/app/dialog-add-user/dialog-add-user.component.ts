import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatProgressBarModule,
    NgIf
    
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
})
export class DialogAddUserComponent {
  user = new User();
  birthDate: Date = new Date();
  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>,private firestore: Firestore) {}

  onNoClick() {}

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log(this.user);
    this.loading = true;
        

    addDoc(collection(this.firestore, 'users'), this.user.toJSON())
      .catch((err) => {
        console.error(err);
      })
      .then((docRef) => {
        this.loading = false;
        console.log('Document written with ID: ', docRef?.id);
        this.dialogRef.close();
      });
  }
}
