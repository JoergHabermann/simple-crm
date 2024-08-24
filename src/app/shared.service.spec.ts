import { TestBed } from '@angular/core/testing';

import { SharedService } from './shared.service';
import { Firestore, query, collection, onSnapshot } from '@angular/fire/firestore';

describe('SharedService', () => {
  let service: SharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      
      providers: [
        { 
        provide: Firestore, query, collection, onSnapshot,
        useValue: []
         }
        ]
    });
    service = TestBed.inject(SharedService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
