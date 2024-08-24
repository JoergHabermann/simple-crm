import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared.service';
import { Firestore, getDoc, doc, collection } from '@angular/fire/firestore';
import { User } from '../../models/user.class';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIcon, MatButtonModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  userID: any = '';
  user: User = new User();

  constructor(
    private route: ActivatedRoute,
    public sharedService: SharedService,
    private firestore: Firestore,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.userID = paramMap.get('id');
      this.getUser();
    });
  }

  async getUser() {
    let object = await getDoc(
      doc(collection(this.firestore, 'users'), this.userID)
    );
    this.user = this.sharedService.setUserObject(object.data(), this.userID);
    this.sharedService.selectedUser = this.user;
    console.log(this.sharedService.selectedUser);
  }

  editUser() {
    this.dialog.open(DialogEditUserComponent);
  }

  editAdress() {
    this.dialog.open(DialogEditAddressComponent);
  }
}
