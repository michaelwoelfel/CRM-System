import { Component } from '@angular/core';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { MatDialog,} from '@angular/material/dialog';
import { FirebaseService } from '../firebase.service'; 




@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls:[ './customers.component.scss']
})
export class CustomersComponent {
  dataSource;


  constructor(public dialog: MatDialog, public firebaseService: FirebaseService ) {
    this.dataSource = this.firebaseService.customers;
    console.log(this.dataSource);
  }

  displayedColumns: string[] = ['Firstname', 'Lastname','Company','Address','Zipcode','Email','tel','birthdate',];
 ngOnInit() {
  
 }
 
  openDialog(): void {
   this.dialog.open(AddCustomerComponent, {
    });
  }

  
  
}
