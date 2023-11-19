import { Component } from '@angular/core';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { CustomerData } from '../interfaces/customer-dialog-interface';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls:[ './customers.component.scss']
})
export class CustomersComponent {
  customer: CustomerData = {
    name: "",
    company: "",
    address: "",
    zipcode: "",
  };

  constructor(public dialog: MatDialog, ) {}

  openDialog(): void {
   this.dialog.open(AddCustomerComponent, {
    });

 

    
    
  }


  
}
