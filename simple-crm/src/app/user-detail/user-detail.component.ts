import { Component } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerData } from '../interfaces/customer-dialog-interface';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
    customerId: string | null = null;
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

  
  constructor(public firebaseService: FirebaseService, private route: ActivatedRoute) {


  }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      this.customerId = paramMap.get('id');
  })
  this.customer =  this.firebaseService.customers[this.getCustomerIndexFromId(this.customerId)];
  console.log("Folgender Customer wird geladen", this.customer);
  }

  getCustomerIndexFromId(id:string | null) {
    return this.firebaseService.customers.findIndex((customer) => customer.id === id);
  }


}
