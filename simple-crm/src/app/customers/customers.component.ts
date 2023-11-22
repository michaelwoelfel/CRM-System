
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { MatDialog,} from '@angular/material/dialog';
import { FirebaseService } from '../firebase.service'; 
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerData } from '../interfaces/customer-dialog-interface';
import { MatDialogRef } from '@angular/material/dialog';
import { ref } from '@angular/fire/database';





@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls:[ './customers.component.scss']
})
export class CustomersComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ELEMENT_DATA : CustomerData [];
  dataSource;
  showprogressbar = false;
  displayedColumns: string[] = ['Firstname', 'Lastname','Company','Address','Zipcode','Email','tel','birthdate','delete',];

 
  constructor(public dialog: MatDialog, public firebaseService: FirebaseService,) {
    this.ELEMENT_DATA  = this.firebaseService.customers;
    this.dataSource = new MatTableDataSource<CustomerData>(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  


  }

  

  ngOnInit() {
   this.refreshTable();
  this.showProgressbarForTwoSeconds();
  }
   
 

 
 
  openDialog(): void {
   const dialogRef =this.dialog.open(AddCustomerComponent, {
    });
     
   dialogRef.afterClosed().subscribe(()=> {
  this.refreshTable();
    this.showProgressbarForTwoSeconds();
     });
  }



 async deleteCustomer(id:string) {
    await this.firebaseService.deleteCustomer('customers', id)
    this.refreshTable();
    this.showProgressbarForTwoSeconds();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  refreshTable() {
    this.ELEMENT_DATA  = this.firebaseService.customers;
    this.dataSource = new MatTableDataSource<CustomerData>(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  }

  showProgressbarForTwoSeconds() {
    this.showprogressbar = true;
    setTimeout(() => {
      this.showprogressbar = false;
    }, 1000);
  }

 
  
}
