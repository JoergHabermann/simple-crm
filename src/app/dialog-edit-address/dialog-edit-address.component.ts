import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../models/user.class';
import { SharedService } from '../shared.service';
import { Firestore, updateDoc, doc, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatProgressBarModule,
    NgIf,    
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss',
})
export class DialogEditAddressComponent implements OnInit {
  user: User = new User();
  loading: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<DialogEditAddressComponent>,
    public sharedService: SharedService,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    this.user = new User(this.sharedService.selectedUser);
  }

  async updateAddress() {
    this.loading = true;
    let docRef = doc(collection(this.firestore, 'users'), this.user.id);
    await updateDoc(docRef, this.sharedService.getCleanJson(this.user));
    this.loading = false;
    this.dialogRef.close();    
  }
}
