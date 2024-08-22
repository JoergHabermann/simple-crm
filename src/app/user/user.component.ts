import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { Firestore, query, onSnapshot } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  userData: User[] = [];
  unsubusers;

  constructor(public dialog: MatDialog, private firestore: Firestore) {
    this.unsubusers = this.unsubUsers();
  }

  unsubUsers() {
    const q = query(collection(this.firestore, 'users'));
    return onSnapshot(q, (list: any) => {
      this.userData = [];
      list.forEach((element: any) => {
        this.userData.push(this.setUserObject(element.data(), element.id));
      });
      console.log('Received changes from DB', this.userData);
    });
  }

  setUserObject(obj: any, id: string) {
    return {
      id: id,
      firstName: obj.firstName || '',
      lastName: obj.lastName || '',
      email: obj.email || '',
      birthDate: obj.birthDate || '',
      street: obj.street || '',
      zipCode: obj.zipCode || '',
      city: obj.city || '',
    };
  }

  ngOnInit() {}

  ngonDestroy() {
    this.unsubUsers();
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
