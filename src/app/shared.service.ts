import { Injectable } from '@angular/core';
import { User } from '../models/user.class';
import { Firestore, query, collection, onSnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  unsubusers;
  userID: string = '';
  userData: User[] = [];
  selectedUser: User = new User();
  
  constructor(private firestore: Firestore) { 
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

  getCleanJson(obj:User):{} {
    return {
      firstName: obj.firstName || '',
      lastName: obj.lastName || '',
      email: obj.email || '',
      birthDate: obj.birthDate || '',
      street: obj.street || '',
      zipCode: obj.zipCode || '',
      city: obj.city || ''
    }
  }

  ngonDestroy() {
    this.unsubUsers();
  }
}
