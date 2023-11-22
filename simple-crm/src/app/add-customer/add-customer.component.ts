import { Component } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';
import { CustomerData } from '../interfaces/customer-dialog-interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseService } from '../firebase.service';
import { FormControl, Validators, } from '@angular/forms';
import { Inject } from '@angular/core';




@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  editMode = false;
 

  customer: CustomerData = {
    firstname: "",
    lastname: "",
    company: "",
    address: "",
    zipcode: "",
    email: "",
    tel: "",
    birthdate: null,
    id: "",
  };
  constructor( @Inject(MAT_DIALOG_DATA) public data: CustomerData ,public a11: A11yModule, public dialogRef: MatDialogRef<AddCustomerComponent>, public firebaseService: FirebaseService,  ) {

    if (data) {
      this.customer = data;
      this.editMode = true;
    }
   }

  async saveCustomer() {
    console.log("currentUser is", this.customer);
    this.firebaseService.addCustomer(this.customer);
    this.onNoClick();
  }


  updateCustomer() {
    this.firebaseService.updateCustomer(this.customer);
    this.onNoClick();
  }


 

  onNoClick(): void {
    this.dialogRef.close();
   
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
