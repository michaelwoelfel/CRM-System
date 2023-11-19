import { Component } from '@angular/core';
import {A11yModule} from '@angular/cdk/a11y';
import { CustomerData } from '../interfaces/customer-dialog-interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseService } from '../firebase.service';



@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent {

  customer: CustomerData = {
    name: "",
    company: "",
    address: "",
    zipcode: "",
  };
constructor(public a11: A11yModule, public dialogRef: MatDialogRef<AddCustomerComponent>, public firebaseService: FirebaseService) {}

 saveCustomer() {
  console.log("currentUser is", this.customer);
  this.firebaseService.customers.push(this.customer);
 }
  

 onNoClick(): void {
  this.dialogRef.close();
}
}
