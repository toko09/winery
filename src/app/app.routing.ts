import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { CompanyComponent } from './components/router-outlet/company/company.component';
import { ProductsComponent } from './components/router-outlet/products/products.component';
import { ContactComponent } from './components/router-outlet/contact/contact.component';

export const APP_ROUTES: Routes = [
    { path: 'home', component: LandingComponent },
    { path: 'company', component: CompanyComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'contact', component: ContactComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full'}
  
];
