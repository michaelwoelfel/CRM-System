import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list'
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {A11yModule} from '@angular/cdk/a11y';
import { FormsModule } from '@angular/forms';
import {
  MatDialogModule,
} from '@angular/material/dialog';
import { environment } from './environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideDatabase,getDatabase } from '@angular/fire/database';










@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CustomersComponent,
    AddCustomerComponent,
    
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatExpansionModule,
    FormsModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatFormFieldModule,
    A11yModule,
    MatDialogModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),

  
   
  
   
 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
