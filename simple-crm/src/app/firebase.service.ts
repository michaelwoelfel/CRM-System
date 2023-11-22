import { Injectable } from '@angular/core';
import { CustomerData } from './interfaces/customer-dialog-interface';
import { inject } from '@angular/core';
import { Firestore, collection, doc, collectionData, onSnapshot,addDoc,deleteDoc,updateDoc} from '@angular/fire/firestore';
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



  setCustomerData(obj:any,customerid:string) {
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
      id: customerid || "",
  }

}

  async addCustomer(item: CustomerData) {
    console.log("New Customer Added");
    await addDoc(this.getCustomersRef(),item).catch(
      (err) => {console.error}
    ).then (
      (docRef)=> {console.log("Document written with Id", docRef?.id)}
    )
  }


  subCustomerList() {
    return onSnapshot(this.getCustomersRef(), (list) => {
     this.customers = [];
       list.forEach(element => {
         this.customers.push(this.setCustomerData(element.data(),element.id));
         console.log("subCustomerList is triggered");
       })
     })
   }


 
    async deleteCustomer(colId: "customers", docId: string) {
    await  deleteDoc(this.getSingleDocRef(colId, docId)).catch (

      (err) => {console.log(err);}
    )

   }


   async updateCustomer(customer: CustomerData) {
    if (customer.id) {
      let docRef = this.getSingleDocRef('customers',customer.id);
      await updateDoc(docRef, this.getUpdateData(customer)).catch(
       
        (error) => { console.log(error); }
        
      );
     
    }
    console.log("Customer wurde geupdated mit ",customer);
  }

  getUpdateData(customer:CustomerData) {
    return {
      firstname: customer.firstname || "",
      lastname: customer.lastname || "", 
      company: customer.company || "",
      address: customer.address || "",
      zipcode: customer.zipcode || "",
      email: customer.email || "",
      tel: customer.tel || "",
      birthdate: customer.birthdate,
  }

}
  
  
  
  // getCleanJson(note: Note) {
  //    return {
  //     type: note.type,
  //     titel: note.titel,
  //     content: note.content,
  //     marked: note.marked,
  //    }
  // }
  // getColIdFromNote(customer: CustomerData) {
  //   if (note.type == 'note') {
  //     return 'Notes'
  //   } else {
  //     return 'Trash'
  //   }
  // }
  



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
