import { Injectable } from '@angular/core';
import { CustomerData } from './interfaces/customer-dialog-interface';
import { inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})



export class FirebaseService {

  firestore: Firestore = inject(Firestore);
  ngOnInit() {

  }
 customers : CustomerData[] = [];
  constructor() { 
 
  }

 

}
