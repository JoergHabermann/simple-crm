import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { Firestore,query,onSnapshot } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTooltipModule, MatCardModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  userData : Array<User> = [];
  unsubusers;

  constructor(public dialog: MatDialog, private firestore: Firestore) {
    this.unsubusers = this.unsubUsers();
  }

  unsubUsers() {
    const q = query(collection(this.firestore,'users'));
    return onSnapshot(q, (list:any) => {
      console.log('Received changes from DB', list);
      this.userData = [];
      list.forEach((element:any) => {
        this.userData.push(element.data());
      });
    });
  }
  

  ngOnInit() {   
  }

  ngonDestroy() {
    this.unsubUsers();
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
