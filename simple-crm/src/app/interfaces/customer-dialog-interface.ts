import { Timestamp } from '@angular/fire/firestore';

export interface CustomerData {

    firstname: string ;
    lastname: string ;
    company: string;
    address: string;
    zipcode: string;
    email: string;
    tel: string;
    birthdate: Date | Timestamp | null | string;
    id?: string;
  }