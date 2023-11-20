import { Injectable } from '@angular/core';
import { CustomerData } from './interfaces/customer-dialog-interface';
import { inject } from '@angular/core';
import { Firestore, collection, doc, collectionData, onSnapshot,addDoc } from '@angular/fire/firestore';
import { Timestamp } from '@angular/fire/firestore';


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
 
      })
      this.items.unsubscribe();
    });
    
  }

  ngOnDestroy() {
    this.unsubList();
   
  }

  subCustomerList() {
   return onSnapshot(this.getCustomersRef(), (list) => {
    this.customers = [];
      list.forEach(element => {
        this.customers.push(this.setCustomerData(element.data()));
      })
    })
  }

  setCustomerData(obj:any) {
    return {
      firstname: obj.firstname || "",
      lastname: obj.lastname || "", 
      company: obj.company || "",
      address: obj.address || "",
      zipcode: obj.zipcode || "",
      email: obj.email || "",
      tel: obj.tel || "",
      birthdate: obj.birthdate ? this.timestampToDate(obj.birthdate) : null,
    }
  }

  async addCustomer(item: CustomerData) {
    await addDoc(this.getCustomersRef(),item).catch(
      (err) => {console.error}
    ).then (
      (docRef)=> {console.log("Document written with Id", docRef)}
    )
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

timestampToDate(timestamp: Timestamp): Date {
    return timestamp.toDate();
  }
}
