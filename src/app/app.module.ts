import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule} from '@angular/router';
import { APP_ROUTES } from './app.routing';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';

import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';
import { CompanyComponent } from './components/router-outlet/company/company.component';
import { ProductsComponent } from './components/router-outlet/products/products.component';
import { ContactComponent } from './components/router-outlet/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { ShopComponent } from './components/online-shop/shop/shop.component';
import { Landing2Component } from './components/landing/landing2/landing2.component';


import { ImageSliderModule } from './modules/imageSlider/imageSlider.module';
import { RangeSliderModule } from './modules/range-slider/range-slider.module';
import { CardComponent } from './components/card-Product/card.component';
import { LineTranslatePipe } from './pipes/line-translate.pipe';
import { CardShopComponent } from './components/card-shop/card-shop.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    CompanyComponent,
    ProductsComponent,
    ContactComponent,
    ShopComponent,
    Landing2Component,
    CardComponent,
    LineTranslatePipe,
    CardShopComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TranslocoRootModule,
    RouterModule.forRoot(APP_ROUTES, {}),
    ImageSliderModule,
    RangeSliderModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
