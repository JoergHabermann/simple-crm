import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared.service';
import { Firestore, getDoc, doc, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
userID: any = '';
user: any= {};

constructor(private route: ActivatedRoute, public sharedService: SharedService, private firestore: Firestore) {}

ngOnInit() {  
  this.route.paramMap.subscribe( paramMap => {
    this.userID = paramMap.get('id');    
    this.getUser();
  })
}

  async getUser() {
    let object = await getDoc(doc(collection(this.firestore, 'users'), this.userID));
    this.user = this.sharedService.setUserObject(object.data(),this.userID);   
    console.log(this.user.lastName) 
  }
}
