import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedService } from '../shared.service';
import { User } from '../../models/user.class';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,    
    FormsModule,
    MatProgressBarModule,
    NgIf,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {
user: User = new User();
loading : boolean = false;
birthDate: Date = new Date();
constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, public sharedService: SharedService) {
}

ngOnInit(): void {
  this.user = new User (this.sharedService.selectedUser);
  this.birthDate = new Date(this.user.birthDate);  
}

updateUser() {
  
}

}
