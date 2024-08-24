import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';
import { DialogAddUserComponent } from './dialog-add-user.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

describe('DialogAddUserComponent', () => {
  let component: DialogAddUserComponent;
  let fixture: ComponentFixture<DialogAddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddUserComponent, MatDialogModule],
      providers: [
        { 
        provide: ActivatedRoute, Firestore, MatDialogRef,
        useValue: []
         }
        ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
