import { Injectable } from '@angular/core';
import { CustomerData } from './interfaces/customer-dialog-interface';
import { inject } from '@angular/core';
import { Firestore, collection, doc, collectionData, onSnapshot,addDoc } from '@angular/fire/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})



export class FirebaseService {



  firestore: Firestore = inject(Firestore);
  customers: CustomerData[] = [];





  // items$;
  // items;

  customerDummyData: CustomerData[] = 
    [
      {
        "firstname": "Kathleen",
        "lastname": "Todd",
        "company": "Davis-Sullivan",
        "address": "9158 Lauren Station Apt. 503, South Jacob, WI 34475",
        "zipcode": "92719",
        "email": "candice62@yahoo.com",
        "tel": "+11138764771",
        "birthdate": "2002-04-20"
      },
      {
        "firstname": "David",
        "lastname": "Woodard",
        "company": "Hall, Sweeney and Rodriguez",
        "address": "USNS Gibson, FPO AE 98098",
        "zipcode": "22682",
        "email": "xcampbell@smith.com",
        "tel": "+11624411522",
        "birthdate": "2003-05-24"
      },
      {
        "firstname": "Andrew",
        "lastname": "Jackson",
        "company": "Williams, Lucas and Case",
        "address": "87367 Howard Harbor, Port Susanshire, NJ 55982",
        "zipcode": "23871",
        "email": "anthony78@wilson-stewart.info",
        "tel": "+16169502450",
        "birthdate": "1998-05-29"
      }
    
    
    
  ]

  unsubList;
  unsubSingle;
  ngOnInit() {

  }

  constructor() {
    this.unsubList = this.subCustomerList();
    this.unsubSingle = onSnapshot(this.getSingleDocRef("customers", "adsfasdf"), (element) => {
    });

    this.unsubSingle();

    // this.items$ = collectionData(this.getCustomersRef());
    // this.items = this.items$.subscribe((list) => {
    //   list.forEach((element) => {
 
    //   })
    //   this.items.unsubscribe();
    // });
    
  }

  ngOnDestroy() {
    this.unsubList();
   
  }

  createCustomerDummys() {

  this.customerDummyData.forEach(customer => {
    this.addCustomer(customer);
  });
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
     // Check if 'birthdate' is a Timestamp and convert to Date object
  let birthdate: Date | null = null;
  if (obj.birthdate) {
    if (obj.birthdate.seconds) { // Assuming 'birthdate' is a Timestamp
      birthdate = this.timestampToDate(obj.birthdate);
    } else if (typeof obj.birthdate === 'string') { // If 'birthdate' is a string
      birthdate = new Date(obj.birthdate);
    }
  }

    return {
      firstname: obj.firstname || "",
      lastname: obj.lastname || "", 
      company: obj.company || "",
      address: obj.address || "",
      zipcode: obj.zipcode || "",
      email: obj.email || "",
      tel: obj.tel || "",
      birthdate: birthdate,
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

timestampToDate(timestamp:Timestamp): Date {
    return timestamp.toDate();
  }
}
