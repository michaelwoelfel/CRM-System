import { Injectable } from '@angular/core';
import { CustomerData } from './interfaces/customer-dialog-interface';
import { inject } from '@angular/core';
import { Firestore, collection, doc, collectionData, onSnapshot } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})



export class FirebaseService {



  firestore: Firestore = inject(Firestore);
  customers: CustomerData[] = [];

  items$;
  items;

  unsubList;
  unsubSingle;
  ngOnInit() {

  }

  constructor() {

    this.unsubList = this.subCustomerList();

    this.unsubSingle = onSnapshot(this.getSingleDocRef("customers", "adsfasdf"), (element) => {
    });


    this.unsubSingle();



    this.items$ = collectionData(this.getCustomersRef());
    this.items = this.items$.subscribe((list) => {
      list.forEach((element) => {
        console.log(element);
      })
      this.items.unsubscribe();
    });
    
  }

  ngOnDestroy() {
    // this.unsubList();
   
  }

  subCustomerList() {
   return onSnapshot(this.getCustomersRef(), (list) => {
      list.forEach(element => {
        console.log(this.setCustomerData(element.data()));
      })
    })
  }

  setCustomerData(obj:any) {
    return {
      name: obj.name || "",
      company: obj.company || "",
      address: obj.address || "",
      zipcode: obj.zipcode|| "",
    }
  }



  /**This is for getting the collection "customers" from firebase */
  getCustomersRef() {
    return collection(this.firestore, 'customers');

  }
  /**Here i get the Infos about a single customer, 
  
  * colId = the id from the collection, in this case probably "customers,"
  * doc id = the specific id from a customer.
  */
  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }
}
