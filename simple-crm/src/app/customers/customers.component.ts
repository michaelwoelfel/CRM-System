
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { MatDialog,} from '@angular/material/dialog';
import { FirebaseService } from '../firebase.service'; 
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerData } from '../interfaces/customer-dialog-interface';






@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls:[ './customers.component.scss']
})
export class CustomersComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ELEMENT_DATA : CustomerData [];
  dataSource;
  displayedColumns: string[] = ['Firstname', 'Lastname','Company','Address','Zipcode','Email','tel','birthdate',];

 
  constructor(public dialog: MatDialog, public firebaseService: FirebaseService, ) {
    this.ELEMENT_DATA  = this.firebaseService.customers;
  this.dataSource = new MatTableDataSource<CustomerData>(this.ELEMENT_DATA);
    console.log(this.dataSource);
  }

  

  ngOnInit() {
    
   
  }
   
 

 
 
  openDialog(): void {
   this.dialog.open(AddCustomerComponent, {
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

 
  
}
